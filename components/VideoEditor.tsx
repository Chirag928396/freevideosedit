"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Scissors, Plus, Trash2, CheckCircle2, Film, Layers } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg } from "@/hooks/useFFmpeg";

interface CutRange {
  id: number;
  start: number;
  end: number;
}

type TrimMode = "trim" | "cut";

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [cutRanges, setCutRanges] = useState<CutRange[]>([]);
  const [trimMode, setTrimMode] = useState<TrimMode>("trim");
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionPreviewEnd, setSelectionPreviewEnd] = useState<number | null>(null);
  const [pendingSelectionStart, setPendingSelectionStart] = useState<number | null>(null);
  const [editingValues, setEditingValues] = useState<Record<number, { start: string; end: string }>>({});
  const [isDragging, setIsDragging] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, trimVideo, removePortions, isProcessing, progress } = useFFmpeg();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const parseTime = (timeStr: string): number => {
    const cleaned = timeStr.trim();
    if (!cleaned) return NaN;
    const parts = cleaned.split(":").map((p) => p.trim());

    const toNumber = (value: string) => {
      const num = Number(value);
      return Number.isFinite(num) && num >= 0 ? Math.floor(num) : NaN;
    };

    if (parts.length === 3) {
      const [h, m, s] = parts.map(toNumber);
      if ([h, m, s].some((n) => Number.isNaN(n))) return NaN;
      return h * 3600 + m * 60 + s;
    }

    if (parts.length === 2) {
      const [m, s] = parts.map(toNumber);
      if ([m, s].some((n) => Number.isNaN(n))) return NaN;
      return m * 60 + s;
    }

    if (parts.length === 1) {
      const seconds = toNumber(parts[0]);
      return Number.isNaN(seconds) ? NaN : seconds;
    }

    return NaN;
  };

  const clampTime = (value: number) => {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(duration, value));
  };

  // Reset cuts if mode changes
  useEffect(() => {
    if (trimMode === "trim") {
      setCutRanges([]);
    }
  }, [trimMode]);

  useEffect(() => {
    setEditingValues((prev) => {
      const next: Record<number, { start: string; end: string }> = {};
      cutRanges.forEach((range) => {
        next[range.id] = {
          start: formatTime(range.start),
          end: formatTime(range.end),
        };
      });
      return next;
    });
  }, [cutRanges]);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setCutRanges([]);
      setEditingValues({});
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const addCutRange = () => {
    const start = Math.floor(currentTime);
    const end = Math.min(start + 5, Math.floor(duration));
    if (end - start < 1) return;
    appendCutRange(start, end);
  };

  const removeCutRange = (id: number) => {
    setCutRanges((prev) => prev.filter((r) => r.id !== id));
  };

  const updateCutRange = (id: number, start: number, end: number) => {
    const clampedStart = clampTime(start);
    const clampedEnd = clampTime(end);
    if (clampedEnd <= clampedStart) return;

    setCutRanges((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              start: Math.floor(clampedStart),
              end: Math.ceil(clampedEnd),
            }
          : r,
      ),
    );
  };

  const appendCutRange = (rawStart: number, rawEnd: number) => {
    const start = Math.max(0, Math.min(rawStart, rawEnd));
    const end = Math.min(duration, Math.max(rawStart, rawEnd));
    if (end - start < 0.5) return false;

    setCutRanges((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
      const nextRange = { id: newId, start: Math.floor(start), end: Math.ceil(end) };
      
      if (trimMode === "trim") {
        // In Trim mode, we only allow 1 range to keep
        return [nextRange];
      }
      return [...prev, nextRange];
    });

    return true;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleExport = async () => {
    if (!videoFile || !loaded || cutRanges.length === 0) {
      alert(trimMode === "trim" ? "Please select a portion to keep" : "Please add at least one cut to remove");
      return;
    }

    try {
      let outputBlob: Blob;

      if (trimMode === "trim") {
        const range = cutRanges[0];
        console.log("Starting trim (keep) with range:", range);
        outputBlob = await trimVideo(videoFile, range.start, range.end);
      } else {
        console.log("Starting export (remove) with cuts:", cutRanges);
        outputBlob = await removePortions(videoFile, cutRanges, duration);
      }

      const url = URL.createObjectURL(outputBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${trimMode === "trim" ? "trimmed" : "cut"}-${videoFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to process video: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-6 shadow-sm dark:shadow-2xl">
      {!videoUrl ? (
        <label
          htmlFor="video-upload"
          className="cursor-pointer block"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`border-2 border-dashed rounded-2xl p-16 transition-all duration-300 text-center group ${
              isDragging
                ? "border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 scale-[1.02]"
                : "border-gray-200 dark:border-zinc-700/50 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-purple-50/20 dark:hover:bg-zinc-800/50"
            }`}
          >
            <div className="mx-auto mb-5 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-800 dark:text-white font-bold mb-2 text-xl">
              {isDragging ? "Drop video to upload" : "Drop your video here"}
            </p>
            <p className="text-gray-500 dark:text-zinc-400 text-sm mb-5">
              or click to browse from your device
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-semibold text-sm group-hover:bg-gray-800 dark:group-hover:bg-gray-100 transition-colors shadow-md">
              <Upload className="w-4 h-4" /> Choose File
            </div>
            <p className="text-gray-400 dark:text-zinc-600 text-xs mt-4">
              MP4, WebM, MOV, AVI • Max 500MB
            </p>
          </div>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={onFileInputChange}
          />
        </label>
      ) : (
        <div className="space-y-5">
          {/* Mode Switcher */}
          <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-xl p-1 w-full max-w-sm mx-auto shadow-inner border border-gray-200 dark:border-zinc-700/50">
            <button
              onClick={() => setTrimMode("trim")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                trimMode === "trim"
                  ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow"
                  : "text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <Scissors className="w-4 h-4" />
              Trim (Keep)
            </button>
            <button
              onClick={() => setTrimMode("cut")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                trimMode === "cut"
                  ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow"
                  : "text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Cut (Remove)
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-zinc-400 font-medium">
            {trimMode === "trim" 
              ? "Select the portion of the video you want to keep." 
              : "Select one or multiple portions to cut out and remove."}
          </p>

          <VideoPlayer
            videoUrl={videoUrl}
            videoRef={videoRef}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onTimeUpdate={setCurrentTime}
            onDurationChange={setDuration}
            onEnded={() => setIsPlaying(false)}
          />

          {duration > 0 && (
            <>
              {/* Timeline with Range Selection */}
              <div className="bg-gray-100 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-zinc-700/50">
                <div className="flex justify-between text-base text-gray-600 dark:text-zinc-400 mb-3">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    {formatTime(currentTime)}
                  </span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="text-center mb-3">
                  <span className="text-sm text-gray-500 dark:text-zinc-500">
                    Drag to highlight or click once to set start and again to set end
                  </span>
                </div>
                {pendingSelectionStart !== null && (
                  <p className="text-center text-amber-600 dark:text-amber-400 text-sm mb-3">
                    Start marked at {formatTime(pendingSelectionStart)} – click end point to finish
                  </p>
                )}
                
                <div
                  className={`h-12 bg-gray-200 dark:bg-zinc-900/80 rounded-xl relative cursor-crosshair select-none overflow-hidden border border-gray-300 dark:border-zinc-700/50 shadow-inner ${trimMode === "trim" && cutRanges.length === 1 ? "opacity-90" : ""}`}
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const time = clampTime(((e.clientX - rect.left) / rect.width) * duration);
                    setIsSelecting(true);
                    setSelectionStart(time);
                    setSelectionPreviewEnd(time);
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const time = clampTime(((e.clientX - rect.left) / rect.width) * duration);
                    if (isSelecting && selectionStart !== null) {
                      setSelectionPreviewEnd(time);
                    } else if (pendingSelectionStart !== null) {
                      setSelectionPreviewEnd(time);
                    }
                  }}
                  onMouseUp={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const releasedTime = clampTime(((e.clientX - rect.left) / rect.width) * duration);

                    let handled = false;

                    if (isSelecting && selectionStart !== null) {
                      const diff = Math.abs(releasedTime - selectionStart);
                      if (diff >= 0.5) {
                        handled = appendCutRange(selectionStart, releasedTime);
                      }
                    }

                    if (!handled) {
                      if (pendingSelectionStart === null) {
                        setPendingSelectionStart(releasedTime);
                      } else {
                        const diff = Math.abs(releasedTime - pendingSelectionStart);
                        if (diff >= 0.5) {
                          appendCutRange(pendingSelectionStart, releasedTime);
                          setPendingSelectionStart(null);
                        } else {
                          setPendingSelectionStart(releasedTime);
                        }
                      }
                    }

                    setIsSelecting(false);
                    setSelectionStart(null);
                    setSelectionPreviewEnd(null);
                  }}
                  onMouseLeave={() => {
                    setIsSelecting(false);
                    setSelectionStart(null);
                    if (pendingSelectionStart === null) {
                      setSelectionPreviewEnd(null);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    setPendingSelectionStart(null);
                    setSelectionPreviewEnd(null);
                  }}
                >
                  {/* Dimming backgrounds for trim mode */ }
                  {trimMode === "trim" && cutRanges.length === 1 && (
                    <>
                       <div 
                         className="absolute top-0 bottom-0 left-0 bg-black/40 z-10 pointer-events-none"
                         style={{ width: `${(cutRanges[0].start / duration) * 100}%` }}
                       />
                       <div 
                         className="absolute top-0 bottom-0 right-0 bg-black/40 z-10 pointer-events-none"
                         style={{ left: `${(cutRanges[0].end / duration) * 100}%`, width: `${(1 - cutRanges[0].end / duration) * 100}%` }}
                       />
                    </>
                  )}

                  {/* Existing cut overlays */}
                  {cutRanges.map((range) => {
                    const left = (range.start / duration) * 100;
                    const width = ((range.end - range.start) / duration) * 100;
                    const OverlayClass = trimMode === "trim" 
                      ? "bg-gradient-to-r from-purple-500/40 to-blue-500/40 border-l-2 border-r-2 border-purple-400" 
                      : "bg-red-500/50 border-l-2 border-r-2 border-red-400";
                    return (
                      <div
                        key={range.id}
                        className={`absolute top-0 h-full z-20 ${OverlayClass}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                    );
                  })}

                  {/* Selection preview */}
                  {(selectionStart !== null || pendingSelectionStart !== null) && selectionPreviewEnd !== null && (
                    <div
                      className={`absolute top-0 h-full z-30 opacity-70 ${trimMode === "trim" ? "bg-purple-400/40 border-l-2 border-r-2 border-purple-400" : "bg-red-400/40 border-l-2 border-r-2 border-red-400"}`}
                      style={{
                        left: `${(Math.min(selectionStart ?? pendingSelectionStart!, selectionPreviewEnd) / duration) * 100}%`,
                        width: `${(Math.abs(selectionPreviewEnd - (selectionStart ?? pendingSelectionStart!)) / duration) * 100}%`,
                      }}
                    />
                  )}

                  {pendingSelectionStart !== null && (
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-amber-400 z-40"
                      style={{ left: `${(pendingSelectionStart / duration) * 100}%` }}
                    />
                  )}

                  {/* Progress bar */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-300 dark:from-zinc-700 to-gray-400 dark:to-zinc-600 opacity-30 z-0"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  {/* Playhead */}
                  <div
                    className="absolute top-0 w-1.5 h-full bg-white shadow-xl z-50 rounded-full border border-gray-300 dark:border-zinc-600"
                    style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translateX(-50%)' }}
                  />
                </div>
              </div>

              {/* Cuts */}
              <div className="bg-gray-100 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-zinc-700/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-900 dark:text-white font-semibold text-lg flex items-center gap-2">
                    {trimMode === "trim" ? <CheckCircle2 className="w-5 h-5 text-purple-500" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                    {trimMode === "trim" ? "Keep Portion" : "Portions to Remove"}
                  </span>
                  
                  {trimMode === "cut" && (
                    <button
                      onClick={addCutRange}
                      className="px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-black rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="w-4 h-4" /> Add Cut
                    </button>
                  )}
                </div>

                {cutRanges.length === 0 ? (
                  <p className="text-gray-500 dark:text-zinc-500 text-sm text-center py-6 bg-white dark:bg-zinc-900/40 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700">
                    {trimMode === "trim" ? "Drag on timeline to select the part you want to keep." : "Drag on timeline to select a part to remove, or click Add Cut."}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cutRanges.map((range, i) => (
                      <div
                        key={range.id}
                        className={`bg-white dark:bg-zinc-900/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-4 border transition-colors ${trimMode === "trim" ? "border-purple-200 dark:border-purple-900/30 shadow-sm" : "border-red-200 dark:border-red-900/30"}`}
                      >
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                           {trimMode === "cut" && (
                             <span className="bg-gradient-to-br from-red-500 to-red-600 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg flex-shrink-0">
                               {i + 1}
                             </span>
                           )}
                           <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                             {trimMode === "trim" ? "Start" : ""}
                           </span>
                        </div>
                        
                        <div className="flex-1 flex items-center gap-3 w-full">
                          <input
                            type="text"
                            value={editingValues[range.id]?.start ?? formatTime(range.start)}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingValues((prev) => ({ ...prev, [range.id]: { start: value, end: prev[range.id]?.end ?? formatTime(range.end) } }));
                            }}
                            onBlur={(e) => {
                              const parsed = parseTime(e.target.value);
                              if (!Number.isNaN(parsed) && parsed < range.end) {
                                updateCutRange(range.id, parsed, range.end);
                              } else {
                                setEditingValues((prev) => ({ ...prev, [range.id]: { start: formatTime(range.start), end: prev[range.id]?.end ?? formatTime(range.end) } }));
                              }
                            }}
                            className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700/50 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-gray-900 dark:text-white px-3 py-2.5 rounded-lg text-sm font-mono transition-all outline-none text-center"
                            placeholder="00:00:00"
                            inputMode="numeric"
                          />
                          <span className="text-gray-400">to</span>
                          <input
                            type="text"
                            value={editingValues[range.id]?.end ?? formatTime(range.end)}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingValues((prev) => ({ ...prev, [range.id]: { start: prev[range.id]?.start ?? formatTime(range.start), end: value } }));
                            }}
                            onBlur={(e) => {
                              const parsed = parseTime(e.target.value);
                              if (!Number.isNaN(parsed) && parsed > range.start && parsed <= duration) {
                                updateCutRange(range.id, range.start, parsed);
                              } else {
                                setEditingValues((prev) => ({ ...prev, [range.id]: { start: prev[range.id]?.start ?? formatTime(range.start), end: formatTime(range.end) } }));
                              }
                            }}
                            className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700/50 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-gray-900 dark:text-white px-3 py-2.5 rounded-lg text-sm font-mono transition-all outline-none text-center"
                            placeholder="00:00:00"
                            inputMode="numeric"
                          />
                        </div>

                        {trimMode === "cut" && (
                          <button
                            onClick={() => removeCutRange(range.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 p-2.5 rounded-lg transition-all w-full sm:w-auto flex justify-center mt-2 sm:mt-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress UI */}
              {isProcessing && (
                <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-700/50">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                       <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full" />
                       Processing Video...
                    </span>
                    <span className="text-purple-600 dark:text-purple-400">{progress.toFixed()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <label
                  htmlFor="video-upload-new"
                  className="flex-1 px-5 py-3.5 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-xl text-center cursor-pointer font-semibold transition-all duration-200 hover:shadow-md active:scale-95"
                >
                  New Video
                  <input
                    id="video-upload-new"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={onFileInputChange}
                  />
                </label>
                <button
                  onClick={handleExport}
                  disabled={isProcessing || !loaded || cutRanges.length === 0}
                  className="flex-[2] px-5 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-zinc-700 dark:disabled:to-zinc-800 text-white disabled:text-gray-500 dark:disabled:text-zinc-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none"
                >
                  {isProcessing ? (
                     "Exporting..."
                  ) : (
                    <>
                      <Scissors className="w-5 h-5" />
                      {trimMode === "trim" ? "Trim & Export" : "Cut & Export"}
                    </>
                  )}
                </button>
              </div>

              {!loaded && (
                <p className="text-amber-600 dark:text-amber-400 text-sm text-center font-medium animate-pulse">
                  Loading FFmpeg Engine...
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
