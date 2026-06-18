"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isOpen: boolean;
  audioUrl?: string;
}

export default function MusicPlayer({
  isOpen,
  audioUrl = "https://cdn.wevitation.com/music/357203-KkI3tFN1.mp3#t=0",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play audio when invitation is opened
  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.muted = false;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay blocked, waiting for interaction:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 transition-all duration-500">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
      />

      {isOpen && (
        <div className="flex items-center gap-2 bg-white/85 border border-accent/20 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95">
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-[2px] h-3.5 w-4 px-0.5 select-none" aria-hidden="true">
            <span 
              className={`w-[2px] bg-accent-dark rounded-full transition-all duration-300 ${
                isPlaying ? "animate-[equalize_0.9s_ease-in-out_infinite_alternate]" : "h-1"
              }`} 
              style={{ animationDelay: "0.1s" }} 
            />
            <span 
              className={`w-[2px] bg-accent-dark rounded-full transition-all duration-300 ${
                isPlaying ? "animate-[equalize_1.2s_ease-in-out_infinite_alternate]" : "h-2"
              }`} 
              style={{ animationDelay: "0.3s" }} 
            />
            <span 
              className={`w-[2px] bg-accent-dark rounded-full transition-all duration-300 ${
                isPlaying ? "animate-[equalize_0.8s_ease-in-out_infinite_alternate]" : "h-1.5"
              }`} 
              style={{ animationDelay: "0.0s" }} 
            />
            <span 
              className={`w-[2px] bg-accent-dark rounded-full transition-all duration-300 ${
                isPlaying ? "animate-[equalize_1.1s_ease-in-out_infinite_alternate]" : "h-[3px]"
              }`} 
              style={{ animationDelay: "0.5s" }} 
            />
          </div>

          {/* Equalizer Animation Scoped Keyframes */}
          <style>{`
            @keyframes equalize {
              0% { height: 2px; }
              100% { height: 14px; }
            }
          `}</style>

          {/* Separation line */}
          <div className="h-4 w-[1px] bg-zinc-200" />

          {/* Floating toggle button */}
          <button
            onClick={togglePlay}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 text-accent-dark transition-all duration-300 cursor-pointer ${
              isPlaying ? "animate-[spin_8s_linear_infinite]" : ""
            }`}
            aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
          >
            {isPlaying ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4 text-zinc-400" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
