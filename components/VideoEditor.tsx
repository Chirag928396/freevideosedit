"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Scissors, Plus, Trash2 } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { useFFmpeg } from "@/hooks/useFFmpeg";

interface CutRange {
  id: number;
  start: number;
  end: number;
}

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [cutRanges, setCutRanges] = useState<CutRange[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionPreviewEnd, setSelectionPreviewEnd] = useState<number | null>(
    null
  );
  const [pendingSelectionStart, setPendingSelectionStart] = useState<
    number | null
  >(null);
  const [editingValues, setEditingValues] = useState<
    Record<number, { start: string; end: string }>
  >({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loaded, removePortions, isProcessing, progress } = useFFmpeg();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setCutRanges([]);
      setEditingValues({});
    }
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
          : r
      )
    );
  };

  const appendCutRange = (rawStart: number, rawEnd: number) => {
    const start = Math.max(0, Math.min(rawStart, rawEnd));
    const end = Math.min(duration, Math.max(rawStart, rawEnd));
    if (end - start < 0.5) return false;

    setCutRanges((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
      const nextRange = {
        id: newId,
        start: Math.floor(start),
        end: Math.ceil(end),
      };
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
      alert("Please add at least one cut");
      return;
    }

    try {
      console.log("Starting export with cuts:", cutRanges);
      console.log("Video duration:", duration);
      const outputBlob = await removePortions(videoFile, cutRanges, duration);
      const url = URL.createObjectURL(outputBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `edited-${videoFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to process video: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 shadow-2xl">
      {!videoUrl ? (
        <label htmlFor="video-upload" className="cursor-pointer block">
          <div className="border-2 border-dashed border-zinc-700/50 rounded-xl p-16 hover:border-primary hover:bg-zinc-800/30 transition-all duration-300 text-center group">
            <Upload className="w-16 h-16 text-zinc-600 group-hover:text-primary mx-auto mb-4 transition-colors" />
            <p className="text-white font-semibold mb-2 text-lg">
              Click to upload video
            </p>
            <p className="text-zinc-500 text-sm">MP4, WebM, MOV • Max 500MB</p>
          </div>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      ) : (
        <div className="space-y-5">
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
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
                <div className="flex justify-between text-base text-zinc-400 mb-3">
                  <span className="text-primary">
                    {formatTime(currentTime)}
                  </span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="text-center mb-3">
                  <span className="text-sm text-zinc-500">
                    Drag to highlight or click once to set start and again to
                    set end
                  </span>
                </div>
                {pendingSelectionStart !== null && (
                  <p className="text-center text-amber-400 text-sm mb-3">
                    Start marked at {formatTime(pendingSelectionStart)} – click
                    end point to create a cut
                  </p>
                )}
                <div
                  className="h-10 bg-zinc-900/80 rounded-lg relative cursor-crosshair select-none overflow-hidden border border-zinc-700/30 shadow-inner"
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const time = clampTime(
                      ((e.clientX - rect.left) / rect.width) * duration
                    );
                    setIsSelecting(true);
                    setSelectionStart(time);
                    setSelectionPreviewEnd(time);
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const time = clampTime(
                      ((e.clientX - rect.left) / rect.width) * duration
                    );
                    if (isSelecting && selectionStart !== null) {
                      setSelectionPreviewEnd(time);
                    } else if (pendingSelectionStart !== null) {
                      setSelectionPreviewEnd(time);
                    }
                  }}
                  onMouseUp={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const releasedTime = clampTime(
                      ((e.clientX - rect.left) / rect.width) * duration
                    );

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
                        const diff = Math.abs(
                          releasedTime - pendingSelectionStart
                        );
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
                  {/* Existing cut overlays */}
                  {cutRanges.map((range) => {
                    const left = (range.start / duration) * 100;
                    const width = ((range.end - range.start) / duration) * 100;
                    return (
                      <div
                        key={range.id}
                        className="absolute top-0 h-full bg-red-500/50 z-20 border-l-2 border-r-2 border-red-400"
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                    );
                  })}

                  {/* Selection preview */}
                  {selectionStart !== null && selectionPreviewEnd !== null && (
                    <div
                      className="absolute top-0 h-full bg-primary/30 z-30 border-l-2 border-r-2 border-primary"
                      style={{
                        left: `${
                          (Math.min(selectionStart, selectionPreviewEnd) /
                            duration) *
                          100
                        }%`,
                        width: `${
                          (Math.abs(selectionPreviewEnd - selectionStart) /
                            duration) *
                          100
                        }%`,
                      }}
                    />
                  )}

                  {pendingSelectionStart !== null &&
                    selectionPreviewEnd !== null &&
                    !isSelecting && (
                      <div
                        className="absolute top-0 h-full bg-primary/20 z-10"
                        style={{
                          left: `${
                            (Math.min(
                              pendingSelectionStart,
                              selectionPreviewEnd
                            ) /
                              duration) *
                            100
                          }%`,
                          width: `${
                            (Math.abs(
                              selectionPreviewEnd - pendingSelectionStart
                            ) /
                              duration) *
                            100
                          }%`,
                        }}
                      />
                    )}

                  {pendingSelectionStart !== null && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-40"
                      style={{
                        left: `${(pendingSelectionStart / duration) * 100}%`,
                      }}
                    />
                  )}

                  {/* Progress bar */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-dark rounded-lg z-0 shadow-lg shadow-primary/20"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  {/* Playhead */}
                  <div
                    className="absolute top-0 w-1 h-full bg-white shadow-lg z-50"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Cuts */}
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-semibold text-lg">Cuts</span>
                  <button
                    onClick={addCutRange}
                    className="px-4 py-2 bg-gradient-to-r from-[#ffffff] to-[#ffffff] hover:from-[#f5f5f5] hover:to-[#f5f5f5] text-black rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#ffffff]/20 transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" /> Add Cut
                  </button>
                </div>

                {cutRanges.length === 0 ? (
                  <p className="text-zinc-500 text-sm text-center py-8">
                    No cuts yet. Drag on timeline or click Add Cut
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cutRanges.map((range, i) => (
                      <div
                        key={range.id}
                        className="bg-zinc-900/60 rounded-lg p-3 flex items-center gap-3 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors"
                      >
                        <span className="bg-gradient-to-br from-red-500 to-red-600 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg">
                          {i + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={
                              editingValues[range.id]?.start ??
                              formatTime(range.start)
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingValues((prev) => ({
                                ...prev,
                                [range.id]: {
                                  start: value,
                                  end:
                                    prev[range.id]?.end ??
                                    formatTime(range.end),
                                },
                              }));
                            }}
                            onBlur={(e) => {
                              const parsed = parseTime(e.target.value);
                              if (!Number.isNaN(parsed) && parsed < range.end) {
                                updateCutRange(range.id, parsed, range.end);
                              } else {
                                setEditingValues((prev) => ({
                                  ...prev,
                                  [range.id]: {
                                    start: formatTime(range.start),
                                    end:
                                      prev[range.id]?.end ??
                                      formatTime(range.end),
                                  },
                                }));
                              }
                            }}
                            className="bg-zinc-800 border border-zinc-700/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white px-3 py-2 rounded-lg text-sm font-mono transition-all outline-none"
                            placeholder="00:00:00"
                            inputMode="numeric"
                          />
                          <input
                            type="text"
                            value={
                              editingValues[range.id]?.end ??
                              formatTime(range.end)
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingValues((prev) => ({
                                ...prev,
                                [range.id]: {
                                  start:
                                    prev[range.id]?.start ??
                                    formatTime(range.start),
                                  end: value,
                                },
                              }));
                            }}
                            onBlur={(e) => {
                              const parsed = parseTime(e.target.value);
                              if (
                                !Number.isNaN(parsed) &&
                                parsed > range.start &&
                                parsed <= duration
                              ) {
                                updateCutRange(range.id, range.start, parsed);
                              } else {
                                setEditingValues((prev) => ({
                                  ...prev,
                                  [range.id]: {
                                    start:
                                      prev[range.id]?.start ??
                                      formatTime(range.start),
                                    end: formatTime(range.end),
                                  },
                                }));
                              }
                            }}
                            className="bg-zinc-800 border border-zinc-700/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white px-3 py-2 rounded-lg text-sm font-mono transition-all outline-none"
                            placeholder="00:00:00"
                            inputMode="numeric"
                          />
                        </div>
                        <button
                          onClick={() => removeCutRange(range.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
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
                    onChange={handleFileUpload}
                  />
                </label>
                <button
                  onClick={handleExport}
                  disabled={isProcessing || !loaded || cutRanges.length === 0}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-[#ffffff] to-[#ffffff] hover:from-[#f5f5f5] hover:to-[#f5f5f5] disabled:from-zinc-700 disabled:to-zinc-700 text-black disabled:text-zinc-500 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#ffffff]/30 disabled:shadow-none transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      Processing {progress}%
                    </>
                  ) : (
                    <>
                      <Scissors className="w-5 h-5" />
                      Export Video
                    </>
                  )}
                </button>
              </div>

              {!loaded && (
                <p className="text-amber-400 text-sm text-center font-medium animate-pulse">
                  Loading FFmpeg...
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
