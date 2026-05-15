export const PROCESSING_HISTORY_KEY = "fve_processing_history_v1";
export const PROCESSING_HISTORY_EVENT = "fve-processing-history";

export type ProcessingHistoryEntry = {
  id: string;
  tool: string;
  fileName: string;
  /** Approximate output size in bytes if known */
  sizeBytes?: number;
  at: string;
};

const MAX_ENTRIES = 5;

export function readProcessingHistory(): ProcessingHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROCESSING_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ProcessingHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendProcessingHistory(
  entry: Omit<ProcessingHistoryEntry, "id" | "at"> & {
    id?: string;
    at?: string;
  },
): void {
  if (typeof window === "undefined") return;
  const prev = readProcessingHistory();
  const next: ProcessingHistoryEntry = {
    id: entry.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    tool: entry.tool,
    fileName: entry.fileName,
    sizeBytes: entry.sizeBytes,
    at: entry.at ?? new Date().toISOString(),
  };
  const merged = [next, ...prev.filter((e) => e.id !== next.id)].slice(
    0,
    MAX_ENTRIES,
  );
  localStorage.setItem(PROCESSING_HISTORY_KEY, JSON.stringify(merged));
  window.dispatchEvent(new CustomEvent(PROCESSING_HISTORY_EVENT));
}
