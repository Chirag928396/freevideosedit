"use client";

import { Plus, Trash2, Scissors } from "lucide-react";

interface CutRange {
  id: number;
  start: number;
  end: number;
}

interface VideoEditorSidebarProps {
  cutRanges: CutRange[];
  duration: number;
  editingValues: Record<number, { start: string; end: string }>;
  formatTime: (seconds: number) => string;
  parseTime: (timeStr: string) => number;
  addCutRange: () => void;
  removeCutRange: (id: number) => void;
  updateCutRange: (id: number, start: number, end: number) => void;
  setEditingValues: React.Dispatch<
    React.SetStateAction<Record<number, { start: string; end: string }>>
  >;
  handleExport: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
  loaded: boolean;
  progress: number;
}

export default function VideoEditorSidebar({
  cutRanges,
  duration,
  editingValues,
  formatTime,
  parseTime,
  addCutRange,
  removeCutRange,
  updateCutRange,
  setEditingValues,
  handleExport,
  handleFileUpload,
  isProcessing,
  loaded,
  progress,
}: VideoEditorSidebarProps) {
  return (
    <div className="col-span-4 space-y-5">
      {/* Cuts Section */}
      <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-xl">Cuts</span>
          <button
            onClick={addCutRange}
            className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg text-base flex items-center gap-2 shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Add Cut
          </button>
        </div>

        {cutRanges.length === 0 ? (
          <p className="text-zinc-500 text-base text-center py-8">
            No cuts yet. Drag on timeline or click Add Cut
          </p>
        ) : (
          <div className="space-y-3">
            {cutRanges.map((range, i) => (
              <div
                key={range.id}
                className="bg-zinc-900/60 rounded-lg p-3 flex items-center gap-3 border border-zinc-700/30 hover:border-zinc-600/50 transition-colors"
              >
                <span className="bg-gradient-to-br from-red-500 to-red-600 text-white w-7 h-7 rounded-lg flex items-center justify-center text-base shadow-lg">
                  {i + 1}
                </span>
                <div className="flex-1 grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    value={
                      editingValues[range.id]?.start ?? formatTime(range.start)
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingValues((prev) => ({
                        ...prev,
                        [range.id]: {
                          start: value,
                          end: prev[range.id]?.end ?? formatTime(range.end),
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
                            end: prev[range.id]?.end ?? formatTime(range.end),
                          },
                        }));
                      }
                    }}
                    className="bg-zinc-800 border border-zinc-700/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white px-3 py-2 rounded-lg text-base transition-all outline-none"
                    placeholder="Start: 00:00:00"
                  />
                  <input
                    type="text"
                    value={
                      editingValues[range.id]?.end ?? formatTime(range.end)
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingValues((prev) => ({
                        ...prev,
                        [range.id]: {
                          start:
                            prev[range.id]?.start ?? formatTime(range.start),
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
                              prev[range.id]?.start ?? formatTime(range.start),
                            end: formatTime(range.end),
                          },
                        }));
                      }
                    }}
                    className="bg-zinc-800 border border-zinc-700/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white px-3 py-2 rounded-lg text-base transition-all outline-none"
                    placeholder="End: 00:00:00"
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

      {/* Action Buttons */}
      <div className="space-y-3">
        <label
          htmlFor="video-upload-sidebar"
          className="block w-full px-5 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 text-white rounded-lg text-center cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-lg text-lg"
        >
          New Video
          <input
            id="video-upload-sidebar"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <button
          onClick={handleExport}
          disabled={isProcessing || !loaded || cutRanges.length === 0}
          className="w-full px-5 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:shadow-none transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
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

        {!loaded && (
          <p className="text-amber-400 text-base text-center animate-pulse">
            Loading FFmpeg...
          </p>
        )}
      </div>
    </div>
  );
}
