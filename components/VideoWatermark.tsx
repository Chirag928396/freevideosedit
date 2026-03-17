"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Droplet,
  Download,
  Type,
  Image as ImageIcon,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg } from "@/hooks/useFFmpeg";

export default function VideoWatermark() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState("Your Watermark");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImageUrl, setWatermarkImageUrl] = useState<string>("");
  const [position, setPosition] = useState<string>("bottomRight");
  const [opacity, setOpacity] = useState<number>(0.7);
  const [fontSize, setFontSize] = useState<number>(24);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, addWatermark } = useFFmpeg();

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setWatermarkImage(file);
      const url = URL.createObjectURL(file);
      setWatermarkImageUrl(url);
    }
  };

  const handleExport = async () => {
    if (!videoFile || !loaded) return;

    try {
      // Calculate scale factor between video resolution and preview size
      let scale = 1;
      if (videoRef.current) {
        const videoWidth = videoRef.current.videoWidth;
        const elementWidth = videoRef.current.getBoundingClientRect().width;
        if (elementWidth > 0) {
          scale = videoWidth / elementWidth;
        }
      }

      const blob = await addWatermark(videoFile, watermarkType, {
        text: watermarkText,
        fontSize: fontSize,
        textColor: textColor,
        imageFile: watermarkImage || undefined,
        position: position,
        opacity: opacity,
        scale: scale,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `watermarked-${videoFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to process video: ${errorMessage}`);
    }
  };

  const getPositionClasses = () => {
    const positions: Record<string, string> = {
      topLeft: "top-4 left-4",
      topCenter: "top-4 left-1/2 -translate-x-1/2",
      topRight: "top-4 right-4",
      centerLeft: "top-1/2 left-4 -translate-y-1/2",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      centerRight: "top-1/2 right-4 -translate-y-1/2",
      bottomLeft: "bottom-4 left-4",
      bottomCenter: "bottom-4 left-1/2 -translate-x-1/2",
      bottomRight: "bottom-4 right-4",
    };
    return positions[position] || positions.bottomRight;
  };

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-6 shadow-sm dark:shadow-2xl">
      {!videoUrl ? (
        <label
          htmlFor="video-upload-watermark"
          className="cursor-pointer block"
        >
          <div className="border-2 border-dashed border-gray-200 dark:border-zinc-700/50 rounded-2xl p-16 hover:border-blue-400 dark:hover:border-white/40 hover:bg-blue-50/40 dark:hover:bg-zinc-800/30 transition-all duration-300 text-center group">
            <div className="mx-auto mb-5 w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-800 dark:text-white font-bold mb-2 text-xl">
              Drop your video here
            </p>
            <p className="text-gray-500 dark:text-zinc-400 text-sm mb-5">
              or click to browse from your device
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold text-sm group-hover:bg-gray-700 dark:group-hover:bg-gray-200 transition-colors">
              <Upload className="w-4 h-4" /> Choose File
            </div>
            <p className="text-gray-400 dark:text-zinc-600 text-xs mt-4">MP4, WebM, MOV, AVI • Max 500MB</p>
          </div>
          <input
            id="video-upload-watermark"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Video Preview with Watermark Overlay */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-zinc-800/50 p-6">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-4">
              Video Preview
            </h3>
            <div className="relative bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                videoRef={videoRef}
                videoUrl={videoUrl}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onTimeUpdate={setCurrentTime}
                onDurationChange={setDuration}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Watermark Preview Overlay */}
              <div
                className={`absolute ${getPositionClasses()} pointer-events-none z-10`}
              >
                {watermarkType === "text" ? (
                  <div
                    style={{
                      opacity: opacity,
                      fontSize: `${fontSize}px`,
                      color: textColor,
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {watermarkText}
                  </div>
                ) : watermarkImageUrl ? (
                  <img
                    src={watermarkImageUrl}
                    alt="Watermark"
                    style={{
                      opacity: opacity,
                      maxWidth: "200px",
                      maxHeight: "100px",
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Watermark Options */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-zinc-800/50 p-4">
            <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-3">
              Watermark Options
            </h3>

            {/* Type Selection */}
            <div className="mb-4">
              <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                Watermark Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setWatermarkType("text")}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    watermarkType === "text"
                      ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <Type className="w-4 h-4" />
                  Text
                </button>
                <button
                  onClick={() => setWatermarkType("image")}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    watermarkType === "image"
                      ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Image
                </button>
              </div>
            </div>

            {watermarkType === "text" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="md:col-span-2">
                    <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                      Watermark Text
                    </label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                      Font Size
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-gray-500 dark:text-zinc-400 text-xs mt-1">
                      {fontSize}px
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-8 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md cursor-pointer"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                  Upload Watermark Image
                </label>
                <label className="block px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-gray-700 dark:text-zinc-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors text-center text-sm">
                  {watermarkImage ? watermarkImage.name : "Choose Image File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Position */}
            <div className="mb-3">
              <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "topLeft", label: "↖" },
                  { value: "topCenter", label: "↑" },
                  { value: "topRight", label: "↗" },
                  { value: "centerLeft", label: "←" },
                  { value: "center", label: "•" },
                  { value: "centerRight", label: "→" },
                  { value: "bottomLeft", label: "↙" },
                  { value: "bottomCenter", label: "↓" },
                  { value: "bottomRight", label: "↘" },
                ].map((pos) => (
                  <button
                    key={pos.value}
                    onClick={() => setPosition(pos.value)}
                    className={`px-2 py-2 rounded-md font-semibold text-lg transition-all ${
                      position === pos.value
                        ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div className="mb-3">
              <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Export Section */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-zinc-700/50">
            <div className="flex gap-3">
              <label
                htmlFor="video-upload-new"
                className="flex-1 px-5 py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white text-gray-900 dark:text-white rounded-lg text-center cursor-pointer font-semibold transition-all duration-200 hover:scale-[1.02]"
              >
                New Video
                <input
                  id="video-upload-new"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>
              <button
                onClick={handleExport}
                disabled={isProcessing || !loaded}
                className="flex-1 px-5 py-3 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 disabled:bg-gray-300 dark:disabled:bg-zinc-700 text-white dark:text-black disabled:text-gray-500 dark:disabled:text-zinc-500 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    Processing {progress}%
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Export Video
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
