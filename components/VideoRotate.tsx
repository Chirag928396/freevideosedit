"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Download, FlipHorizontal, FlipVertical, RotateCw, Upload } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg, type RotateAction } from "@/hooks/useFFmpeg";
import { appendProcessingHistory } from "@/lib/processingHistory";
import {
  BeforeAfterPreview,
  ProcessingHistoryPanel,
  VideoDropZone,
  VideoEmptyUploadVisual,
  VideoMetadataPanel,
} from "./VideoToolUi";

const ACTIONS: { id: RotateAction; label: string; icon: ReactNode }[] = [
  { id: "rotate90", label: "90° CW", icon: <RotateCw className="h-4 w-4" /> },
  { id: "rotate-90", label: "90° CCW", icon: <RotateCw className="h-4 w-4 -scale-x-100" /> },
  { id: "rotate180", label: "180°", icon: <RotateCw className="h-4 w-4" /> },
  { id: "hflip", label: "Flip H", icon: <FlipHorizontal className="h-4 w-4" /> },
  { id: "vflip", label: "Flip V", icon: <FlipVertical className="h-4 w-4" /> },
];

export default function VideoRotate() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [action, setAction] = useState<RotateAction>("rotate90");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, rotateVideo } = useFFmpeg();

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
      const blob = await rotateVideo(videoFile, action);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      appendProcessingHistory({
        tool: "Rotate / flip",
        fileName: `${action}-${videoFile.name}.mp4`,
        sizeBytes: blob.size,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `rotated-${videoFile.name.replace(/\.[^.]+$/, "")}.mp4`;
      a.click();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to rotate video");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:shadow-2xl">
        {!videoUrl ? (
          <VideoDropZone onVideoFile={setFile}>
            <label htmlFor="video-upload-rotate" className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center transition-all duration-300 group hover:border-blue-400 hover:bg-blue-50/40 dark:border-zinc-700/50 dark:hover:border-white/40 dark:hover:bg-zinc-800/30">
                <VideoEmptyUploadVisual
                  icon={<Upload className="h-8 w-8 text-white" />}
                  gradientClass="bg-gradient-to-br from-indigo-500 to-violet-600"
                />
              </div>
              <input
                id="video-upload-rotate"
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
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
                Transform
              </h3>
              <div className="flex flex-wrap gap-2">
                {ACTIONS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAction(a.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      action === a.id
                        ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {a.icon}
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

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
