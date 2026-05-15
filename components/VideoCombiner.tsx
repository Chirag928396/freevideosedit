"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  PlayCircle,
  Layers,
  X,
  AlertCircle,
} from "lucide-react";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { appendProcessingHistory } from "@/lib/processingHistory";
import { formatFileSize } from "@/lib/formatFileSize";
import {
  BeforeAfterPreview,
  ProcessingHistoryPanel,
} from "./VideoToolUi";

interface VideoItem {
  id: string;
  file: File;
  url: string;
  duration: number | null;
  name: string;
  size: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VideoCombiner() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragSrcIdx = useRef<number>(-1);

  const { loaded, isProcessing, progress, combineVideos } = useFFmpeg();

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith("video/"));
      if (arr.length === 0) return;
      const newItems: VideoItem[] = arr.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
        duration: null,
        name: file.name,
        size: formatSize(file.size),
      }));
      setVideos((prev) => [...prev, ...newItems]);
      setOutputUrl(null);
      setError(null);
    },
    []
  );

  const handleDurationLoad = (id: string, dur: number) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, duration: dur } : v))
    );
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const item = prev.find((v) => v.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((v) => v.id !== id);
    });
    if (previewId === id) setPreviewId(null);
    setOutputUrl(null);
  };

  const moveVideo = (id: string, direction: "up" | "down") => {
    setVideos((prev) => {
      const idx = prev.findIndex((v) => v.id === id);
      if (idx === -1) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
    setOutputUrl(null);
  };

  // Drag-to-reorder handlers
  const onDragStart = (e: React.DragEvent, id: string, idx: number) => {
    setDraggingId(id);
    dragSrcIdx.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(id);
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    setVideos((prev) => {
      const srcIdx = prev.findIndex((v) => v.id === draggingId);
      const dstIdx = prev.findIndex((v) => v.id === targetId);
      if (srcIdx === -1 || dstIdx === -1) return prev;
      const arr = [...prev];
      const [item] = arr.splice(srcIdx, 1);
      arr.splice(dstIdx, 0, item);
      return arr;
    });
    setDraggingId(null);
    setDragOverId(null);
    setOutputUrl(null);
  };

  const onDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleCombine = async () => {
    if (videos.length < 2) {
      setError("Please add at least 2 videos to combine.");
      return;
    }
    setError(null);
    try {
      const blob = await combineVideos(videos.map((v) => v.file));
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      appendProcessingHistory({
        tool: "Combine videos",
        fileName: "combined-video.mp4",
        sizeBytes: blob.size,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to combine videos: ${msg}`);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = "combined-video.mp4";
    a.click();
  };

  const previewItem = previewId ? videos.find((v) => v.id === previewId) : null;
  const firstUrl = videos[0]?.url ?? "";

  return (
    <div className="space-y-4">
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-6 shadow-sm dark:shadow-2xl space-y-5">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDropZone}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group ${
          isDraggingOver
            ? "border-blue-400 bg-blue-50/40 dark:bg-blue-900/10"
            : "border-gray-200 dark:border-zinc-700/50 hover:border-blue-400 dark:hover:border-white/40 hover:bg-blue-50/30 dark:hover:bg-zinc-800/30"
        }`}
      >
        <div className="mx-auto mb-4 w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Layers className="w-7 h-7 text-white" />
        </div>
        <p className="text-gray-800 dark:text-white font-bold mb-1 text-lg">
          Drop videos here to add them
        </p>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4">
          or click to browse — MP4, MOV, AVI, WebM supported
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold text-sm group-hover:bg-gray-700 dark:group-hover:bg-gray-200 transition-colors">
          <Upload className="w-4 h-4" /> Add Videos
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {videos.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm dark:border-zinc-700/50 dark:bg-zinc-900/40">
          <p className="font-semibold text-gray-900 dark:text-white">Selection summary</p>
          <p className="text-gray-600 dark:text-zinc-400">
            {videos.length} clip{videos.length !== 1 ? "s" : ""} ·{" "}
            {formatFileSize(videos.reduce((acc, v) => acc + v.file.size, 0))} total
          </p>
        </div>
      )}

      {/* Video list */}
      {videos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white font-semibold text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-500" />
              Videos to Combine
              <span className="ml-1 text-xs font-normal text-gray-500 dark:text-zinc-500">
                ({videos.length} clips · drag to reorder)
              </span>
            </span>
            <button
              onClick={() => inputRef.current?.click()}
              className="text-sm text-violet-500 hover:text-violet-400 font-medium transition-colors flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" /> Add more
            </button>
          </div>

          {videos.map((video, idx) => (
            <div
              key={video.id}
              draggable
              onDragStart={(e) => onDragStart(e, video.id, idx)}
              onDragOver={(e) => onDragOver(e, video.id)}
              onDrop={(e) => onDrop(e, video.id)}
              onDragEnd={onDragEnd}
              className={`flex items-center gap-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-3 border transition-all duration-150 ${
                draggingId === video.id
                  ? "opacity-40 scale-95"
                  : dragOverId === video.id
                  ? "border-violet-400 dark:border-violet-500 bg-violet-50/30 dark:bg-violet-900/10"
                  : "border-gray-200 dark:border-zinc-700/30 hover:border-gray-300 dark:hover:border-zinc-600/50"
              }`}
            >
              {/* Drag handle */}
              <div className="cursor-grab active:cursor-grabbing text-gray-300 dark:text-zinc-600 hover:text-gray-500 dark:hover:text-zinc-400 transition-colors">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Index badge */}
              <span className="w-7 h-7 bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow flex-shrink-0">
                {idx + 1}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white text-sm font-medium truncate">
                  {video.name}
                </p>
                <p className="text-gray-400 dark:text-zinc-500 text-xs mt-0.5">
                  {video.size}
                  {video.duration !== null && ` · ${formatDuration(video.duration)}`}
                </p>
              </div>

              {/* Hidden video to detect duration */}
              <video
                src={video.url}
                className="hidden"
                onLoadedMetadata={(e) =>
                  handleDurationLoad(video.id, (e.target as HTMLVideoElement).duration)
                }
              />

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPreviewId(previewId === video.id ? null : video.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
                  title="Preview"
                >
                  <PlayCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveVideo(video.id, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveVideo(video.id, "down")}
                  disabled={idx === videos.length - 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeVideo(video.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inline preview */}
      {previewItem && (
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700/50 bg-black relative">
          <button
            onClick={() => setPreviewId(null)}
            className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <video
            src={previewItem.url}
            controls
            className="w-full max-h-72 object-contain"
          />
          <p className="text-xs text-center text-gray-400 dark:text-zinc-500 py-1.5">
            Preview: {previewItem.name}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Progress bar while processing */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-zinc-400">
            <span className="font-medium animate-pulse">Combining videos…</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* FFmpeg loading notice */}
      {!loaded && (
        <p className="text-amber-600 dark:text-amber-400 text-sm text-center font-medium animate-pulse">
          Loading FFmpeg… please wait
        </p>
      )}

      {/* Action buttons */}
      {videos.length >= 2 && (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setVideos([]);
              setOutputUrl(null);
              setError(null);
              setPreviewId(null);
            }}
            className="flex-1 px-5 py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white text-gray-900 dark:text-white rounded-lg text-center font-semibold transition-all duration-200 hover:scale-[1.02]"
          >
            Clear All
          </button>
          <button
            onClick={handleCombine}
            disabled={isProcessing || !loaded || videos.length < 2}
            className="flex-[2] px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-violet-500/20"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Processing {progress}%
              </>
            ) : (
              <>
                <Layers className="w-5 h-5" />
                Combine {videos.length} Videos
              </>
            )}
          </button>
        </div>
      )}

      {/* Output */}
      {outputUrl && (
        <div className="space-y-3 border-t border-gray-200 dark:border-zinc-700/50 pt-5">
          <h3 className="text-gray-900 dark:text-white font-semibold text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-500" />
            Combined Video Ready
          </h3>
          {firstUrl ? (
            <BeforeAfterPreview originalUrl={firstUrl} resultUrl={outputUrl} />
          ) : null}
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700/50 bg-black">
            <video src={outputUrl} controls className="w-full max-h-80 object-contain" />
          </div>
          <button
            onClick={handleDownload}
            className="w-full px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-violet-500/20"
          >
            <Upload className="w-5 h-5 rotate-180" />
            Download Combined Video
          </button>
        </div>
      )}
    </div>
    <ProcessingHistoryPanel />
    </div>
  );
}
