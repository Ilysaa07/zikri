"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date("2026-06-28T10:00:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      
      if (difference <= 0) {
        setIsEventStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="flex justify-center gap-3 py-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/50 border border-accent/10 animate-pulse" />
        ))}
      </div>
    );
  }

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      {isEventStarted ? (
        <div className="rounded-2xl border border-accent/20 bg-white/50 px-6 py-4 text-center backdrop-blur-sm shadow-md">
          <p className="font-serif text-base font-semibold text-accent-dark animate-pulse">
            Hari Bahagia Sedang Berlangsung!
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-2 px-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-accent/30 bg-white/70 shadow-md backdrop-blur-sm relative transition-all duration-300 hover:scale-105 group"
            >
              {/* Inner dashed ring ornament */}
              <div className="absolute inset-1 rounded-full border border-dashed border-accent/15 pointer-events-none group-hover:border-accent/30 transition-colors duration-300" />
              
              <span className="font-serif text-lg md:text-xl font-extrabold text-primary-dark leading-none z-10">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-widest text-zinc-400 mt-1 z-10">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-zinc-400 italic text-center mt-4">
        *Acara dimulai pada pukul 10.00 WIB
      </p>
    </div>
  );
}
