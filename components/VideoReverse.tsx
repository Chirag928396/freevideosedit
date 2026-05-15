"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Rewind, Upload } from "lucide-react";
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

export default function VideoReverse() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [includeAudio, setIncludeAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, reverseVideo } = useFFmpeg();

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
      const blob = await reverseVideo(videoFile, includeAudio);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      appendProcessingHistory({
        tool: "Reverse video",
        fileName: `reversed-${videoFile.name}.mp4`,
        sizeBytes: blob.size,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `reversed-${videoFile.name.replace(/\.[^.]+$/, "")}.mp4`;
      a.click();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to reverse video");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:shadow-2xl">
        {!videoUrl ? (
          <VideoDropZone onVideoFile={setFile}>
            <label htmlFor="video-upload-rev" className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center transition-all duration-300 group hover:border-blue-400 hover:bg-blue-50/40 dark:border-zinc-700/50 dark:hover:border-white/40 dark:hover:bg-zinc-800/30">
                <VideoEmptyUploadVisual
                  icon={<Upload className="h-8 w-8 text-white" />}
                  gradientClass="bg-gradient-to-br from-fuchsia-600 to-purple-800"
                />
              </div>
              <input
                id="video-upload-rev"
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
            <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
              Reversing loads the entire clip in memory — use short clips in the
              browser for best results.
            </div>

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

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700/50 dark:bg-zinc-800/50">
              <input
                type="checkbox"
                checked={includeAudio}
                onChange={(e) => setIncludeAudio(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">
                Reverse audio too (slower, higher memory)
              </span>
            </label>

            <BeforeAfterPreview originalUrl={videoUrl} resultUrl={resultUrl} />

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
                    <Rewind className="h-5 w-5" />
                    Reverse & download
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
