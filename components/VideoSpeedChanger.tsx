"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Gauge, Upload } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { appendProcessingHistory } from "@/lib/processingHistory";
import {
  BeforeAfterPreview,
  ProcessingHistoryPanel,
  VideoDropZone,
  VideoEmptyUploadVisual,
  VideoMetadataPanel,
} from "./VideoToolUi";

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

export default function VideoSpeedChanger() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, changeVideoSpeed } = useFFmpeg();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) void v.play();
    else v.pause();
  }, [isPlaying]);

  const setFile = (file: File) => {
    if (!file.type.startsWith("video/")) return;
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setVideoFile(file);
    setVideoUrl((u) => {
      if (u) URL.revokeObjectURL(u);
      return URL.createObjectURL(file);
    });
  };

  const handleExport = async () => {
    if (!videoFile || !loaded) return;
    try {
      const blob = await changeVideoSpeed(videoFile, speed);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      appendProcessingHistory({
        tool: "Change speed",
        fileName: `speed-${speed}x-${videoFile.name}.mp4`,
        sizeBytes: blob.size,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `speed-${speed}x-${videoFile.name.replace(/\.[^.]+$/, "")}.mp4`;
      a.click();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to change speed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:shadow-2xl">
        {!videoUrl ? (
          <VideoDropZone onVideoFile={setFile}>
            <label htmlFor="video-upload-speed" className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center transition-all duration-300 group hover:border-blue-400 hover:bg-blue-50/40 dark:border-zinc-700/50 dark:hover:border-white/40 dark:hover:bg-zinc-800/30">
                <VideoEmptyUploadVisual
                  icon={<Upload className="h-8 w-8 text-white" />}
                  gradientClass="bg-gradient-to-br from-cyan-500 to-blue-600"
                />
              </div>
              <input
                id="video-upload-speed"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setFile(f);
                }}
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

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
              <div className="relative overflow-hidden rounded-lg bg-black">
                <VideoPlayer
                  videoRef={videoRef}
                  videoUrl={videoUrl}
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  onTimeUpdate={() => {}}
                  onDurationChange={setDuration}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <Gauge className="h-4 w-4" />
                Playback speed
              </h3>
              <div className="flex flex-wrap gap-2">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      speed === s
                        ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            <BeforeAfterPreview
              originalUrl={videoUrl}
              resultUrl={resultUrl}
            />

            <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-zinc-700/50 dark:bg-zinc-800/50">
              <label className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-gray-100 px-5 py-3 text-center font-semibold text-gray-900 transition-all hover:scale-[1.02] hover:bg-gray-200 dark:border-white/20 dark:bg-zinc-800 dark:text-white dark:hover:border-white dark:hover:bg-zinc-700">
                New video
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setFile(f);
                  }}
                />
              </label>
              <button
                type="button"
                onClick={handleExport}
                disabled={isProcessing || !loaded}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {isProcessing ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
                    {progress}%
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Apply & download
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <ProcessingHistoryPanel />
    </div>
  );
}
