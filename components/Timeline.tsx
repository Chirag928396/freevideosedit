"use client";

interface CutRange {
  id: number;
  start: number;
  end: number;
}

interface TimelineProps {
  duration: number;
  currentTime: number;
  cutRanges: CutRange[];
  pendingSelectionStart: number | null;
  selectionStart: number | null;
  selectionPreviewEnd: number | null;
  isSelecting: boolean;
  formatTime: (seconds: number) => string;
  clampTime: (value: number) => number;
  setIsSelecting: (value: boolean) => void;
  setSelectionStart: (value: number | null) => void;
  setSelectionPreviewEnd: (value: number | null) => void;
  setPendingSelectionStart: (value: number | null) => void;
  appendCutRange: (start: number, end: number) => boolean;
}

export default function Timeline({
  duration,
  currentTime,
  cutRanges,
  pendingSelectionStart,
  selectionStart,
  selectionPreviewEnd,
  isSelecting,
  formatTime,
  clampTime,
  setIsSelecting,
  setSelectionStart,
  setSelectionPreviewEnd,
  setPendingSelectionStart,
  appendCutRange,
}: TimelineProps) {
  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
      <div className="flex justify-between text-base text-zinc-400 mb-3">
        <span className="text-primary">{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="text-center mb-3">
        <span className="text-sm text-zinc-500">
          Drag to highlight or click once to set start and again to set end
        </span>
      </div>
      {pendingSelectionStart !== null && (
        <p className="text-center text-amber-400 text-sm mb-3">
          Start marked at {formatTime(pendingSelectionStart)} – click end point
          to create a cut
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
                (Math.min(selectionStart, selectionPreviewEnd) / duration) * 100
              }%`,
              width: `${
                (Math.abs(selectionPreviewEnd - selectionStart) / duration) *
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
                  (Math.min(pendingSelectionStart, selectionPreviewEnd) /
                    duration) *
                  100
                }%`,
                width: `${
                  (Math.abs(selectionPreviewEnd - pendingSelectionStart) /
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
  );
}
