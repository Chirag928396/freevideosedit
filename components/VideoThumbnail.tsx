"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Image as ImageIcon, Upload } from "lucide-react";
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

export default function VideoThumbnail() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [fmt, setFmt] = useState<"png" | "jpg">("png");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, extractThumbnail } = useFFmpeg();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) void v.play();
    else v.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (duration > 0 && time > duration) setTime(Math.min(time, duration));
  }, [duration, time]);

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
    setTime(0);
  };

  const handleExport = async () => {
    if (!videoFile || !loaded) return;
    try {
      const blob = await extractThumbnail(videoFile, time, fmt);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      appendProcessingHistory({
        tool: "Thumbnail",
        fileName: `frame-${time}s.${fmt}`,
        sizeBytes: blob.size,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `thumbnail-${time}s.${fmt}`;
      a.click();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to extract frame");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:shadow-2xl">
        {!videoUrl ? (
          <VideoDropZone onVideoFile={setFile}>
            <label htmlFor="video-upload-thumb" className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center transition-all duration-300 group hover:border-blue-400 hover:bg-blue-50/40 dark:border-zinc-700/50 dark:hover:border-white/40 dark:hover:bg-zinc-800/30">
                <VideoEmptyUploadVisual
                  icon={<Upload className="h-8 w-8 text-white" />}
                  gradientClass="bg-gradient-to-br from-rose-500 to-pink-600"
                />
              </div>
              <input
                id="video-upload-thumb"
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
                  onTimeUpdate={(t) => setTime(t)}
                  onDurationChange={setDuration}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <ImageIcon className="h-4 w-4" />
                Frame time: {time.toFixed(2)}s
              </h3>
              <input
                type="range"
                min={0}
                max={Math.max(0.01, duration || 0.01)}
                step={0.01}
                value={Math.min(time, duration || time)}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setFmt("png")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    fmt === "png"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  PNG
                </button>
                <button
                  type="button"
                  onClick={() => setFmt("jpg")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    fmt === "jpg"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  JPG
                </button>
              </div>
            </div>

            <BeforeAfterPreview
              originalUrl={videoUrl}
              resultUrl={resultUrl}
              resultAsImage
            />

            <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-zinc-700/50 dark:bg-zinc-800/50">
              <label className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-gray-100 px-5 py-3 text-center font-semibold text-gray-900 transition-all hover:scale-[1.02] dark:border-white/20 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
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
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {isProcessing ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
                    {progress}%
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Save frame
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
