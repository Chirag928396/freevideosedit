"use client";

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { formatFileSize } from "@/lib/formatFileSize";
import {
  PROCESSING_HISTORY_EVENT,
  readProcessingHistory,
  type ProcessingHistoryEntry,
} from "@/lib/processingHistory";
import { History } from "lucide-react";

/** Wraps upload UI so drag-and-drop highlights the zone and forwards the first video file. */
export function VideoDropZone({
  children,
  onVideoFile,
  className,
}: {
  children: React.ReactNode;
  onVideoFile: (file: File) => void;
  className?: string;
}) {
  const [over, setOver] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOver(false);
      const file = Array.from(e.dataTransfer.files).find((f) =>
        f.type.startsWith("video/"),
      );
      if (file) onVideoFile(file);
    },
    [onVideoFile],
  );

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={clsx(className, over && "ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 rounded-2xl")}
    >
      {children}
    </div>
  );
}

/** File + optional HTMLVideoElement metadata (resolution, duration). */
export function VideoMetadataPanel({
  file,
  videoRef,
  durationSeconds,
}: {
  file: File;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  durationSeconds?: number;
}) {
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onMeta = () => {
      setDims({ w: el.videoWidth, h: el.videoHeight });
    };
    el.addEventListener("loadedmetadata", onMeta);
    onMeta();
    return () => el.removeEventListener("loadedmetadata", onMeta);
  }, [file, videoRef]);

  const dur =
    durationSeconds && durationSeconds > 0
      ? durationSeconds
      : videoRef.current?.duration && Number.isFinite(videoRef.current.duration)
        ? videoRef.current.duration
        : 0;

  const fmtDur = (s: number) => {
    if (!Number.isFinite(s) || s <= 0) return "—";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 text-sm dark:border-zinc-700/50 dark:bg-zinc-900/40">
      <p className="mb-2 font-semibold text-gray-900 dark:text-white">
        File details
      </p>
      <dl className="grid gap-1 text-gray-600 dark:text-zinc-400 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-zinc-500">
            Name
          </dt>
          <dd className="truncate font-medium text-gray-800 dark:text-zinc-200">
            {file.name}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-zinc-500">
            Size
          </dt>
          <dd className="font-medium">{formatFileSize(file.size)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-zinc-500">
            Duration
          </dt>
          <dd className="font-medium">{fmtDur(dur)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-zinc-500">
            Resolution
          </dt>
          <dd className="font-medium">
            {dims.w > 0 && dims.h > 0 ? `${dims.w}×${dims.h}` : "—"}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function BeforeAfterPreview({
  originalUrl,
  resultUrl,
  isVideo = true,
  /** When true, the "Result" tab renders an image (e.g. thumbnail export). */
  resultAsImage = false,
}: {
  originalUrl: string;
  resultUrl: string | null;
  isVideo?: boolean;
  resultAsImage?: boolean;
}) {
  const [which, setWhich] = useState<"original" | "result">("result");

  if (!resultUrl) return null;

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700/50 dark:bg-zinc-900/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">
          Preview: {which === "original" ? "Original" : "Result"}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setWhich("original")}
            className={clsx(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              which === "original"
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600",
            )}
          >
            Original
          </button>
          <button
            type="button"
            onClick={() => setWhich("result")}
            className={clsx(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              which === "result"
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600",
            )}
          >
            Result
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-black">
        {which === "original" && isVideo ? (
          <video
            src={originalUrl}
            controls
            className="max-h-80 w-full object-contain"
          />
        ) : which === "result" && resultAsImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resultUrl}
            alt="Result preview"
            className="max-h-80 w-full object-contain"
          />
        ) : (
          <video
            src={which === "original" ? originalUrl : resultUrl}
            controls
            className="max-h-80 w-full object-contain"
          />
        )}
      </div>
    </div>
  );
}

export function ProcessingHistoryPanel() {
  const [items, setItems] = useState<ProcessingHistoryEntry[]>([]);

  const refresh = useCallback(() => {
    setItems(readProcessingHistory());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(PROCESSING_HISTORY_EVENT, refresh);
    return () => window.removeEventListener(PROCESSING_HISTORY_EVENT, refresh);
  }, [refresh]);

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-zinc-700/50 dark:bg-zinc-900/50">
      <p className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
        <History className="h-4 w-4" />
        Recent exports
      </p>
      <ul className="space-y-2 text-sm">
        {items.map((e) => (
          <li
            key={e.id}
            className="flex flex-col gap-0.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-800/50"
          >
            <span className="font-medium text-gray-800 dark:text-zinc-200">
              {e.tool}
            </span>
            <span className="truncate text-gray-500 dark:text-zinc-400">
              {e.fileName}
            </span>
            <span className="text-xs text-gray-400 dark:text-zinc-500">
              {new Date(e.at).toLocaleString()}
              {e.sizeBytes != null && ` · ${formatFileSize(e.sizeBytes)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VideoEmptyUploadVisual({
  icon,
  gradientClass,
}: {
  icon: React.ReactNode;
  gradientClass: string;
}) {
  return (
    <>
      <div
        className={clsx(
          "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110",
          gradientClass,
        )}
      >
        {icon}
      </div>
      <p className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
        Drop your video here
      </p>
      <p className="mb-5 text-sm text-gray-500 dark:text-zinc-400">
        or click to browse from your device
      </p>
      <div className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-gray-700 dark:bg-white dark:text-black dark:group-hover:bg-gray-200">
        {icon} Choose File
      </div>
      <p className="mt-4 text-xs text-gray-400 dark:text-zinc-600">
        MP4, WebM, MOV, AVI • Processed locally in your browser
      </p>
    </>
  );
}
