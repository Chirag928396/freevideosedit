"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Crop, Download, Upload } from "lucide-react";
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

type RatioKey = "free" | "16:9" | "9:16" | "1:1" | "4:3";

function centeredAspectCrop(
  vw: number,
  vh: number,
  arW: number,
  arH: number,
): { w: number; h: number; x: number; y: number } {
  const target = arW / arH;
  const src = vw / vh;
  if (src > target) {
    const w = Math.floor(vh * target);
    const x = Math.floor((vw - w) / 2);
    return { w, h: vh, x, y: 0 };
  }
  const h = Math.floor(vw / target);
  const y = Math.floor((vh - h) / 2);
  return { w: vw, h, x: 0, y };
}

export default function VideoCrop() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [ratio, setRatio] = useState<RatioKey>("16:9");
  const [customW, setCustomW] = useState("");
  const [customH, setCustomH] = useState("");
  const [customX, setCustomX] = useState("0");
  const [customY, setCustomY] = useState("0");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, isProcessing, progress, cropVideo } = useFFmpeg();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () =>
      setDims({ w: v.videoWidth || 0, h: v.videoHeight || 0 });
    v.addEventListener("loadedmetadata", onMeta);
    onMeta();
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [videoUrl]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) void el.play();
    else el.pause();
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

  const cropParams = useMemo(() => {
    if (dims.w < 2 || dims.h < 2) return null;
    if (ratio === "free") {
      const w = parseInt(customW, 10);
      const h = parseInt(customH, 10);
      const x = parseInt(customX, 10) || 0;
      const y = parseInt(customY, 10) || 0;
      if (!Number.isFinite(w) || !Number.isFinite(h) || w < 2 || h < 2)
        return null;
      if (x < 0 || y < 0 || x + w > dims.w || y + h > dims.h) return null;
      return { w, h, x, y };
    }
    const map: Record<Exclude<RatioKey, "free">, [number, number]> = {
      "16:9": [16, 9],
      "9:16": [9, 16],
      "1:1": [1, 1],
      "4:3": [4, 3],
    };
    const [rw, rh] = map[ratio as Exclude<RatioKey, "free">];
    return centeredAspectCrop(dims.w, dims.h, rw, rh);
  }, [ratio, dims, customW, customH, customX, customY]);

  const handleExport = async () => {
    if (!videoFile || !loaded || !cropParams) return;
    try {
      const blob = await cropVideo(
        videoFile,
        cropParams.w,
        cropParams.h,
        cropParams.x,
        cropParams.y,
      );
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      appendProcessingHistory({
        tool: "Crop video",
        fileName: `cropped-${videoFile.name}.mp4`,
        sizeBytes: blob.size,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `cropped-${videoFile.name.replace(/\.[^.]+$/, "")}.mp4`;
      a.click();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to crop video");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:shadow-2xl">
        {!videoUrl ? (
          <VideoDropZone onVideoFile={setFile}>
            <label htmlFor="video-upload-crop" className="block cursor-pointer">
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center transition-all duration-300 group hover:border-blue-400 hover:bg-blue-50/40 dark:border-zinc-700/50 dark:hover:border-white/40 dark:hover:bg-zinc-800/30">
                <VideoEmptyUploadVisual
                  icon={<Upload className="h-8 w-8 text-white" />}
                  gradientClass="bg-gradient-to-br from-amber-500 to-orange-600"
                />
              </div>
              <input
                id="video-upload-crop"
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
                <Crop className="h-4 w-4" />
                Crop preset
              </h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {(
                  [
                    ["16:9", "16:9"],
                    ["9:16", "9:16 (vertical)"],
                    ["1:1", "1:1"],
                    ["4:3", "4:3"],
                    ["free", "Custom"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRatio(key)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      ratio === key
                        ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {ratio === "free" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm text-gray-700 dark:text-zinc-300">
                    Width (px)
                    <input
                      type="number"
                      min={2}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                      value={customW}
                      onChange={(e) => setCustomW(e.target.value)}
                    />
                  </label>
                  <label className="text-sm text-gray-700 dark:text-zinc-300">
                    Height (px)
                    <input
                      type="number"
                      min={2}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                      value={customH}
                      onChange={(e) => setCustomH(e.target.value)}
                    />
                  </label>
                  <label className="text-sm text-gray-700 dark:text-zinc-300">
                    X offset
                    <input
                      type="number"
                      min={0}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                      value={customX}
                      onChange={(e) => setCustomX(e.target.value)}
                    />
                  </label>
                  <label className="text-sm text-gray-700 dark:text-zinc-300">
                    Y offset
                    <input
                      type="number"
                      min={0}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                      value={customY}
                      onChange={(e) => setCustomY(e.target.value)}
                    />
                  </label>
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  Centered crop to{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {ratio}
                  </span>
                  {cropParams && (
                    <span className="ml-2 font-mono text-xs text-gray-500 dark:text-zinc-500">
                      ({cropParams.w}×{cropParams.h} @ {cropParams.x},{cropParams.y})
                    </span>
                  )}
                </p>
              )}
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
                disabled={isProcessing || !loaded || !cropParams}
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
                    Crop & download
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
