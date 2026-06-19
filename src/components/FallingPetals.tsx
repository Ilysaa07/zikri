"use client";

import React, { useState } from "react";

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
  rotation: string;
  color: string;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>(() => {
    // Generate petals after mount to avoid server-side matching issues
    const colorChoices = [
      "rgba(95, 113, 97, 0.15)", // Primary Sage Green
      "rgba(197, 168, 128, 0.25)", // Gold/Champagne
      "rgba(133, 150, 135, 0.15)", // Light Sage Green
    ];

    return Array.from({ length: 15 }).map((_, index) => {
      const left = Math.random() * 100; // random X position
      const delay = Math.random() * 8; // random delay before starting
      const duration = 8 + Math.random() * 10; // fall time between 8s and 18s
      const size = 6 + Math.random() * 12; // petal size
      const opacity = 0.3 + Math.random() * 0.5;
      const rotation = Math.random() * 360;
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

      return {
        id: index,
        left: `${left}%`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        size: `${size}px`,
        opacity,
        rotation: `${rotation}deg`,
        color,
      };
    });
  });

  return (
    <div className="pointer-events-none fixed inset-y-0 w-full max-w-md left-1/2 -translate-x-1/2 overflow-hidden z-20">
      {/* Dynamic Scoped Keyframes */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-5%) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(50px);
            opacity: 0;
          }
        }
        .petal {
          position: absolute;
          top: -5%;
          animation: fall linear infinite;
          border-radius: 50% 0 50% 50%; /* organic petal shape */
          transform-origin: center;
          will-change: transform, opacity;
        }
      `}</style>
      
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            backgroundColor: petal.color,
            opacity: petal.opacity,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `rotate(${petal.rotation})`,
          }}
        />
      ))}
    </div>
  );
}
