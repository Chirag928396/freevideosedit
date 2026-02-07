"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, FileVideo, Settings } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg } from "@/hooks/useFFmpeg";

export default function VideoCompressor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [quality, setQuality] = useState<"high" | "medium" | "low">("medium");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleExport = async () => {
    if (!videoFile || !loaded) return;

    try {
      const blob = await compressVideo(videoFile, quality);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${videoFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
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
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 shadow-2xl">
      {!videoUrl ? (
        <label htmlFor="video-upload-compress" className="cursor-pointer block">
          <div className="border-2 border-dashed border-zinc-700/50 rounded-xl p-16 hover:border-primary hover:bg-zinc-800/30 transition-all duration-300 text-center group">
            <Upload className="w-16 h-16 text-zinc-600 group-hover:text-primary mx-auto mb-4 transition-colors" />
            <p className="text-white font-semibold mb-2 text-lg">
              Click to upload video
            </p>
            <p className="text-zinc-500 text-sm">MP4, WebM, MOV • Max 500MB</p>
          </div>
          <input
            id="video-upload-compress"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Video Preview */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-lg">
                Video Preview
              </h3>
              <div className="text-zinc-400 text-sm">
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
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-4">
            <h3 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Compression Settings
            </h3>

            <div className="mb-4">
              <label className="text-zinc-300 text-sm mb-2 block">
                Compression Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setQuality("high")}
                  className={`px-3 py-3 rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    quality === "high"
                      ? "bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <span>High Quality</span>
                  <span className="text-xs opacity-70">Low Compression</span>
                </button>
                <button
                  onClick={() => setQuality("medium")}
                  className={`px-3 py-3 rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    quality === "medium"
                      ? "bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <span>Balanced</span>
                  <span className="text-xs opacity-70">Medium Compression</span>
                </button>
                <button
                  onClick={() => setQuality("low")}
                  className={`px-3 py-3 rounded-lg text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    quality === "low"
                      ? "bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <span>Small Size</span>
                  <span className="text-xs opacity-70">High Compression</span>
                </button>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50">
            <div className="flex gap-3">
              <label
                htmlFor="video-upload-new"
                className="flex-1 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 border border-[#ffffff]/30 hover:border-[#ffffff] text-white rounded-lg text-center cursor-pointer font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
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
                className="flex-1 px-5 py-3 bg-gradient-to-r from-[#ffffff] to-[#ffffff] hover:from-[#f5f5f5] hover:to-[#f5f5f5] disabled:from-zinc-700 disabled:to-zinc-700 text-black disabled:text-zinc-500 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#ffffff]/30 disabled:shadow-none transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
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
  );
}
