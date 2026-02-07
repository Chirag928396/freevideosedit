"use client";

import { Play, Pause } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onEnded: () => void;
}

export default function VideoPlayer({
  videoUrl,
  videoRef,
  isPlaying,
  onPlayPause,
  onTimeUpdate,
  onDurationChange,
  onEnded,
}: VideoPlayerProps) {
  const [showControls, setShowControls] = useState(true);

  return (
    <div
      className="relative bg-black rounded-xl overflow-hidden shadow-2xl w-full group"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={(e) => onTimeUpdate(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => onDurationChange(e.currentTarget.duration)}
        onEnded={onEnded}
        onClick={onPlayPause}
      />

      {/* Overlay Play/Pause Button */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
        onClick={onPlayPause}
      >
        <button
          className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-900 rounded-full p-6 shadow-2xl transition-all transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            onPlayPause();
          }}
        >
          {isPlaying ? (
            <Pause className="w-10 h-10" />
          ) : (
            <Play className="w-10 h-10 ml-1" />
          )}
        </button>
      </div>
    </div>
  );
}
