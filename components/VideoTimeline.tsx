"use client";

import { useRef } from "react";

interface CutRange {
  id: number;
  start: number;
  end: number;
}

interface VideoTimelineProps {
  duration: number;
  currentTime: number;
  cutRanges: CutRange[];
  activeCutId: number | null;
  onSeek: (time: number) => void;
}

export default function VideoTimeline({
  duration,
  currentTime,
  cutRanges,
  activeCutId,
  onSeek,
}: VideoTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;
    onSeek(Math.max(0, Math.min(duration, time)));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Generate time markers
  const timeMarkers = [];
  const markerCount = Math.min(10, Math.floor(duration / 5));
  for (let i = 0; i <= markerCount; i++) {
    const time = (duration / markerCount) * i;
    timeMarkers.push(time);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Timeline</span>
        <span className="text-sm text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="relative">
        <div
          ref={timelineRef}
          className="relative h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl cursor-pointer overflow-hidden border border-gray-600"
          onClick={handleTimelineClick}
        >
          {/* Background gradient showing video */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-green-800/20 to-green-900/30" />

          {/* Cut ranges (portions to remove) - shown in red */}
          {cutRanges.map((range) => (
            <div
              key={range.id}
              className={`absolute h-full transition-all ${
                activeCutId === range.id
                  ? "bg-red-500/60 border-y-2 border-red-400"
                  : "bg-red-600/40"
              }`}
              style={{
                left: `${(range.start / duration) * 100}%`,
                width: `${((range.end - range.start) / duration) * 100}%`,
              }}
            >
              {/* Stripes pattern for cut sections */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.3) 5px, rgba(0,0,0,0.3) 10px)",
                }}
              />
              {/* Cut label */}
              {((range.end - range.start) / duration) * 100 > 8 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-red-200 bg-red-900/50 px-2 py-0.5 rounded">
                    CUT
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Current time indicator */}
          <div
            className="absolute h-full w-0.5 bg-white shadow-lg z-10"
            style={{
              left: `${(currentTime / duration) * 100}%`,
            }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-xs px-2 py-0.5 rounded font-mono font-bold whitespace-nowrap">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Time markers */}
        <div className="flex justify-between text-xs text-gray-500 mt-8 px-1">
          {timeMarkers.map((time, index) => (
            <span key={index}>{formatTime(time)}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-800/50 rounded border border-green-600"></div>
          <span className="text-gray-400">Keep</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600/50 rounded border border-red-500"></div>
          <span className="text-gray-400">Remove</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-white rounded"></div>
          <span className="text-gray-400">Playhead</span>
        </div>
      </div>
    </div>
  );
}
