"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, FileVideo, Settings } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { appendProcessingHistory } from "@/lib/processingHistory";
import {
  BeforeAfterPreview,
  ProcessingHistoryPanel,
  VideoDropZone,
  VideoMetadataPanel,
} from "./VideoToolUi";

export default function VideoCompressor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [quality, setQuality] = useState<"high" | "medium" | "low">("medium");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, compressVideo } = useFFmpeg();

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const applyVideoFile = (file: File) => {
    if (!file.type.startsWith("video/")) return;
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setVideoFile(file);
    setVideoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyVideoFile(file);
  };

  const handleExport = async () => {
    if (!videoFile || !loaded) return;

    try {
      const blob = await compressVideo(videoFile, quality);

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      appendProcessingHistory({
        tool: "Compress",
        fileName: `compressed-${videoFile.name}`,
        sizeBytes: blob.size,
      });

      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${videoFile.name}`;
      a.click();
    } catch (error) {
      console.error("Export error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to process video: ${errorMessage}`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-6 shadow-sm dark:shadow-2xl">
      {!videoUrl ? (
        <VideoDropZone onVideoFile={applyVideoFile}>
        <label htmlFor="video-upload-compress" className="cursor-pointer block">
          <div className="border-2 border-dashed border-gray-200 dark:border-zinc-700/50 rounded-2xl p-16 hover:border-blue-400 dark:hover:border-white/40 hover:bg-blue-50/40 dark:hover:bg-zinc-800/30 transition-all duration-300 text-center group">
            <div className="mx-auto mb-5 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
            <p className="text-gray-400 dark:text-zinc-600 text-xs mt-4">
              MP4, WebM, MOV, AVI • Max 500MB
            </p>
          </div>
          <input
            id="video-upload-compress"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
        </VideoDropZone>
      ) : (
        <div className="space-y-6">
          <VideoMetadataPanel
            file={videoFile!}
            videoRef={videoRef}
            durationSeconds={duration}
          />

          {/* Video Preview */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-zinc-800/50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                Video Preview
              </h3>
              <div className="text-gray-500 dark:text-zinc-400 text-sm">
                Original Size: {videoFile ? formatFileSize(videoFile.size) : ""}
              </div>
            </div>

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
            </div>
          </div>

          {/* Compression Options */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-zinc-800/50 p-4">
            <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Compression Settings
            </h3>

            <div className="mb-4">
              <label className="text-gray-700 dark:text-zinc-300 text-sm mb-2 block">
                Compression Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setQuality("high")}
                  className={`px-3 py-3 rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    quality === "high"
                      ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span>High Quality</span>
                  <span className="text-xs opacity-70">Low Compression</span>
                </button>
                <button
                  onClick={() => setQuality("medium")}
                  className={`px-3 py-3 rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    quality === "medium"
                      ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span>Balanced</span>
                  <span className="text-xs opacity-70">Medium Compression</span>
                </button>
                <button
                  onClick={() => setQuality("low")}
                  className={`px-3 py-3 rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    quality === "low"
                      ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span>Small Size</span>
                  <span className="text-xs opacity-70">High Compression</span>
                </button>
              </div>
            </div>
          </div>

          <BeforeAfterPreview originalUrl={videoUrl} resultUrl={resultUrl} />

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
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) applyVideoFile(f);
                  }}
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
                    Compressing {progress}%
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Compress & Download
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <ProcessingHistoryPanel />
    </div>
  );
}
