"use client";

import { useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

interface CutRange {
  start: number;
  end: number;
}

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    try {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      ffmpeg.on("log", ({ message }) => {
        console.log("FFmpeg:", message);
      });

      ffmpeg.on("progress", ({ progress, time }) => {
        // If time is provided (in microseconds), use it to calculate percentage
        // Otherwise fallback to the progress value (0-1)
        // Note: progress event behavior varies by codec and operation
        let percentage = 0;

        if (typeof progress === "number" && !isNaN(progress)) {
          percentage = Math.round(progress * 100);
        }

        // Ensure percentage is valid
        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;

        setProgress(percentage);
      });

      // Load FFmpeg
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });

      setLoaded(true);
    } catch (error) {
      console.error("Failed to load FFmpeg:", error);
    }
  };

  const trimVideo = async (
    videoFile: File,
    startTime: number,
    endTime: number
  ): Promise<Blob> => {
    if (!ffmpegRef.current || !loaded) {
      throw new Error("FFmpeg is not loaded");
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.mp4";
      const outputName = "output.mp4";

      // Write input file to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      // Calculate duration
      const duration = endTime - startTime;

      // Run FFmpeg command to trim video
      await ffmpeg.exec([
        "-i",
        inputName,
        "-ss",
        startTime.toString(),
        "-t",
        duration.toString(),
        "-c",
        "copy",
        outputName,
      ]);

      // Read output file
      const data = await ffmpeg.readFile(outputName);

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);

      // Convert to Blob
      return new Blob([new Uint8Array(data as Uint8Array)], {
        type: "video/mp4",
      });
    } catch (error) {
      setIsProcessing(false);
      setProgress(0);
      throw error;
    }
  };

  // Remove multiple portions from video
  const removePortions = async (
    videoFile: File,
    cutRanges: CutRange[],
    videoDuration: number
  ): Promise<Blob> => {
    if (!ffmpegRef.current || !loaded) {
      throw new Error("FFmpeg is not loaded");
    }

    if (cutRanges.length === 0) {
      throw new Error("No portions selected to remove");
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.mp4";

      console.log("Processing video:", {
        duration: videoDuration,
        cuts: cutRanges,
      });

      // Write input file to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      // Sort cut ranges by start time
      const sortedCuts = [...cutRanges].sort((a, b) => a.start - b.start);

      // Calculate segments to KEEP (inverse of what to cut)
      const keepSegments: { start: number; end: number }[] = [];
      let currentPos = 0;

      for (const cut of sortedCuts) {
        if (cut.start > currentPos) {
          keepSegments.push({ start: currentPos, end: cut.start });
        }
        currentPos = Math.max(currentPos, cut.end);
      }

      // Add final segment if there's content after last cut
      if (currentPos < videoDuration) {
        keepSegments.push({ start: currentPos, end: videoDuration });
      }

      console.log("Segments to keep:", keepSegments);

      if (keepSegments.length === 0) {
        throw new Error("Cannot remove the entire video");
      }

      // Extract each segment with re-encoding to avoid codec issues
      const segmentFiles: string[] = [];
      for (let i = 0; i < keepSegments.length; i++) {
        const seg = keepSegments[i];
        const segmentName = `segment${i}.mp4`;
        segmentFiles.push(segmentName);

        console.log(`Extracting segment ${i}:`, seg);

        // Use re-encoding instead of copy to avoid timestamp issues
        await ffmpeg.exec([
          "-i",
          inputName,
          "-ss",
          seg.start.toString(),
          "-t",
          (seg.end - seg.start).toString(),
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-c:a",
          "aac",
          "-avoid_negative_ts",
          "make_zero",
          segmentName,
        ]);
      }

      let finalOutput: Uint8Array;

      if (segmentFiles.length === 1) {
        // Only one segment, just use it directly
        console.log("Single segment, using directly");
        finalOutput = (await ffmpeg.readFile(segmentFiles[0])) as Uint8Array;
      } else {
        // Create concat file
        console.log("Concatenating", segmentFiles.length, "segments");
        const concatContent = segmentFiles.map((f) => `file '${f}'`).join("\n");
        await ffmpeg.writeFile("concat.txt", concatContent);

        // Concatenate all segments
        await ffmpeg.exec([
          "-f",
          "concat",
          "-safe",
          "0",
          "-i",
          "concat.txt",
          "-c",
          "copy",
          "final_output.mp4",
        ]);

        finalOutput = (await ffmpeg.readFile("final_output.mp4")) as Uint8Array;

        // Clean up concat file and final output
        await ffmpeg.deleteFile("concat.txt");
        await ffmpeg.deleteFile("final_output.mp4");
      }

      // Clean up input and segment files
      await ffmpeg.deleteFile(inputName);
      for (const segFile of segmentFiles) {
        await ffmpeg.deleteFile(segFile);
      }

      console.log("Processing complete, output size:", finalOutput.length);

      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);

      return new Blob([new Uint8Array(finalOutput)], { type: "video/mp4" });
    } catch (error) {
      console.error("FFmpeg processing error:", error);
      setIsProcessing(false);
      setProgress(0);
      throw error;
    }
  };

  const textToImage = (
    text: string,
    fontSize: number,
    color: string,
    opacity: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set font to measure text
      // Using a bold font to make it more visible
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      const metrics = ctx.measureText(text);
      const width = Math.ceil(metrics.width);
      // Estimate height based on font size (approximate)
      const height = Math.ceil(fontSize * 1.5);

      // Add padding
      const padding = 10;
      canvas.width = width + padding * 2;
      canvas.height = height + padding * 2;

      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw text
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      // Draw at center
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create image from text"));
        }
      }, "image/png");
    });
  };

  const addWatermark = async (
    videoFile: File,
    watermarkType: "text" | "image",
    options: {
      text?: string;
      fontSize?: number;
      textColor?: string;
      imageFile?: File;
      position?: string;
      opacity?: number;
      scale?: number;
    }
  ): Promise<Blob> => {
    if (!ffmpegRef.current || !loaded) {
      throw new Error("FFmpeg is not loaded");
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.mp4";
      const outputName = "output.mp4";
      const watermarkName = "watermark.png";
      const scale = options.scale || 1;

      // Write input video to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      let watermarkBlob: Blob | null = null;

      if (watermarkType === "text" && options.text) {
        console.log("Generating text watermark image...");
        watermarkBlob = await textToImage(
          options.text,
          (options.fontSize || 24) * scale,
          options.textColor || "#ffffff",
          options.opacity || 1
        );
      } else if (watermarkType === "image" && options.imageFile) {
        watermarkBlob = options.imageFile;
      }

      if (watermarkBlob) {
        await ffmpeg.writeFile(watermarkName, await fetchFile(watermarkBlob));

        console.log("Adding watermark via overlay");

        // Position mapping for overlay
        const overlayPositionMap: Record<string, string> = {
          topLeft: "10:10",
          topCenter: "(W-w)/2:10",
          topRight: "W-w-10:10",
          centerLeft: "10:(H-h)/2",
          center: "(W-w)/2:(H-h)/2",
          centerRight: "W-w-10:(H-h)/2",
          bottomLeft: "10:H-h-10",
          bottomCenter: "(W-w)/2:H-h-10",
          bottomRight: "W-w-10:H-h-10",
        };

        const overlayPos =
          overlayPositionMap[options.position || "bottomRight"] ||
          overlayPositionMap.bottomRight;

        // Ensure watermark image is compatible by converting/scaling it first
        // This fixes issues where some image formats or sizes cause overlay to fail
        // Also apply opacity if it's an image watermark
        const processedWatermarkName = "processed_watermark.png";

        // Scale watermark if needed (for image type)
        // For text type, we already scaled the font size
        let scaleFilter = "";
        if (watermarkType === "image") {
          // Scale image relative to video size if needed, or keep original size
          // For now, let's just ensure it's converted to a friendly format
          // We can also apply opacity here using colorchannelmixer
        }

        // Simple overlay command first to debug
        await ffmpeg.exec([
          "-i",
          inputName,
          "-i",
          watermarkName,
          "-filter_complex",
          `[1:v]format=rgba,colorchannelmixer=aa=${
            options.opacity || 1
          }[wm];[0:v][wm]overlay=${overlayPos}`,
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-pix_fmt",
          "yuv420p",
          "-c:a",
          "copy",
          outputName,
        ]);

        await ffmpeg.deleteFile(watermarkName);
        console.log("Watermark processing complete");
      } else {
        // No watermark, just copy
        console.log("No watermark, copying video");
        await ffmpeg.exec(["-i", inputName, "-c", "copy", outputName]);
      }

      console.log("FFmpeg processing complete, reading output file...");

      // Check if file exists
      const files = await ffmpeg.listDir("/");
      console.log("Files in FFmpeg FS:", files);

      // Read output file
      const data = await ffmpeg.readFile(outputName);
      console.log("Output file size:", data.length);

      if (!data || data.length === 0) {
        throw new Error("Output file is empty");
      }

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);

      return new Blob([new Uint8Array(data as Uint8Array)], {
        type: "video/mp4",
      });
    } catch (error) {
      setIsProcessing(false);
      setProgress(0);
      throw error;
    }
  };

  const compressVideo = async (
    videoFile: File,
    quality: "high" | "medium" | "low" = "medium"
  ): Promise<Blob> => {
    if (!ffmpegRef.current || !loaded) {
      throw new Error("FFmpeg is not loaded");
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.mp4";
      const outputName = "output.mp4";

      // Write input video to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      // Map quality to CRF values
      // Lower CRF = Higher Quality, Larger Size
      // Higher CRF = Lower Quality, Smaller Size
      const crfMap = {
        high: "23", // Default H.264 quality
        medium: "28", // Good compression
        low: "32", // High compression
      };

      const crf = crfMap[quality];

      console.log(`Compressing video with quality: ${quality} (CRF: ${crf})`);

      await ffmpeg.exec([
        "-i",
        inputName,
        "-c:v",
        "libx264",
        "-crf",
        crf,
        "-preset",
        "ultrafast", // Use ultrafast for browser performance
        "-c:a",
        "aac", // Re-encode audio to ensure compatibility and compression
        "-b:a",
        "128k",
        outputName,
      ]);

      console.log("Compression complete, reading output file...");

      // Read output file
      const data = await ffmpeg.readFile(outputName);
      console.log("Output file size:", data.length);

      if (!data || data.length === 0) {
        throw new Error("Output file is empty");
      }

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);

      return new Blob([new Uint8Array(data as Uint8Array)], {
        type: "video/mp4",
      });
    } catch (error) {
      console.error("Compression error:", error);
      setIsProcessing(false);
      setProgress(0);
      throw error;
    }
  };

  const convertVideo = async (
    videoFile: File,
    format: string
  ): Promise<{ blob: Blob; filename: string }> => {
    if (!ffmpegRef.current || !loaded) {
      throw new Error("FFmpeg is not loaded");
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.mp4"; // We'll rename input to generic mp4 for simplicity, or detect ext
      const outputFilename = `output.${format}`;

      // Write input video to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      console.log(`Converting video to format: ${format}`);

      const args = ["-i", inputName];

      // Add format-specific arguments
      switch (format) {
        case "mp4":
          args.push("-c:v", "libx264", "-c:a", "aac", "-preset", "ultrafast");
          break;
        case "webm":
          args.push(
            "-c:v",
            "libvpx",
            "-c:a",
            "libvorbis",
            "-b:v",
            "1M",
            "-cpu-used",
            "5"
          );
          break;
        case "avi":
          args.push("-c:v", "libx264", "-c:a", "mp3", "-preset", "ultrafast");
          break;
        case "mov":
          args.push("-c:v", "libx264", "-c:a", "aac", "-preset", "ultrafast");
          break;
        case "mkv":
          args.push("-c:v", "libx264", "-c:a", "aac", "-preset", "ultrafast");
          break;
        case "mp3":
          args.push("-vn", "-c:a", "libmp3lame", "-q:a", "2");
          break;
        case "gif":
          // Simple GIF conversion (might be large/low quality without palette gen)
          args.push("-vf", "fps=10,scale=320:-1:flags=lanczos", "-c:v", "gif");
          break;
        default:
          // Default to copy if possible, or safe re-encode
          args.push("-c:v", "libx264", "-c:a", "aac", "-preset", "ultrafast");
      }

      args.push(outputFilename);

      await ffmpeg.exec(args);

      console.log("Conversion complete, reading output file...");

      // Read output file
      const data = await ffmpeg.readFile(outputFilename);
      console.log("Output file size:", data.length);

      if (!data || data.length === 0) {
        throw new Error("Output file is empty");
      }

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputFilename);

      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);

      const mimeTypes: Record<string, string> = {
        mp4: "video/mp4",
        webm: "video/webm",
        avi: "video/x-msvideo",
        mov: "video/quicktime",
        mkv: "video/x-matroska",
        mp3: "audio/mpeg",
        gif: "image/gif",
      };

      return {
        blob: new Blob([new Uint8Array(data as Uint8Array)], {
          type: mimeTypes[format] || "video/mp4",
        }),
        filename: `converted.${format}`,
      };
    } catch (error) {
      console.error("Conversion error:", error);
      setIsProcessing(false);
      setProgress(0);
      throw error;
    }
  };

  return {
    loaded,
    isProcessing,
    progress,
    trimVideo,
    removePortions,
    addWatermark,
    compressVideo,
    convertVideo,
  };
}
