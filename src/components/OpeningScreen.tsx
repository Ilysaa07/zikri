"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MailOpen } from "lucide-react";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";

interface OpeningScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function OpeningScreen({ onOpen, isOpen }: OpeningScreenProps) {
  const [guestName, setGuestName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get("to");
      if (toParam) {
        return decodeURIComponent(toParam);
      }
    }
    return "Tamu Undangan";
  });
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { hideZikriPhoto, customZikriPhoto } = useDeveloperMode();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenClick = () => {
    onOpen();
    setTimeout(() => setIsDismissed(true), 1100);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col text-center transition-all duration-1000 ease-in-out overflow-hidden ${
        isOpen
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(197,168,128,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 50% 100%, rgba(95,113,97,0.10) 0%, transparent 60%),
          #FAF7F2
        `,
      }}
    >
      {/* ── SCOPED KEYFRAMES ── */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes twinkle   { 0%,100% { opacity:.15; transform:scale(.8); } 50% { opacity:.85; transform:scale(1.2); } }
        @keyframes breathe   { 0%,100% { transform:scale(1); } 50% { transform:scale(1.07); } }
        .spin-slow { animation: spin-slow 18s linear infinite; }
        .spin-rev  { animation: spin-rev  12s linear infinite; }
        .breathe   { animation: breathe  3s ease-in-out infinite; }
      `}</style>

      {/* ── CORNER MEDALLIONS ── */}
      {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} pointer-events-none`}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none"
            className="text-accent/30"
            style={{ transform: `rotate(${i * 90}deg)` }}>
            <path d="M0 0 Q36 0 36 36 Q36 0 72 0" stroke="currentColor" strokeWidth="0.8" fill="none"/>
            <path d="M0 0 Q0 36 36 36 Q0 36 0 72" stroke="currentColor" strokeWidth="0.8" fill="none"/>
            <circle cx="8"  cy="8"  r="2.5" fill="currentColor" opacity=".5"/>
            <circle cx="20" cy="5"  r="1.2" fill="currentColor" opacity=".4"/>
            <circle cx="5"  cy="20" r="1.2" fill="currentColor" opacity=".4"/>
            <path d="M2 2 L14 2 L2 14 Z" fill="currentColor" opacity=".12"/>
          </svg>
        </div>
      ))}

      {/* ── SCATTERED SPARKLE DOTS ── */}
      {[
        {top:"14%",left:"8%",d:"0.3s",s:"0.9s"},
        {top:"22%",left:"88%",d:"0s",s:"1.1s"},
        {top:"52%",left:"5%",d:"0.7s",s:"0.8s"},
        {top:"68%",left:"92%",d:"0.2s",s:"1.3s"},
        {top:"38%",left:"90%",d:"0.9s",s:"1.0s"},
        {top:"82%",left:"10%",d:"0.5s",s:"0.75s"},
        {top:"78%",left:"80%",d:"1.1s",s:"1.2s"},
        {top:"10%",left:"55%",d:"0.4s",s:"0.95s"},
      ].map((sp,i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{top:sp.top, left:sp.left}}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{animation:`twinkle ${sp.s} ${sp.d} ease-in-out infinite`}}>
            <path d="M7 0 L7.8 5.5 L13 7 L7.8 8.5 L7 14 L6.2 8.5 L1 7 L6.2 5.5 Z"
              fill="#C5A880" opacity=".9"/>
          </svg>
        </div>
      ))}

      {/* ── TOP DECORATIVE ARCH BAND ── */}
      <div className="relative w-full flex justify-center pointer-events-none">
        <svg viewBox="0 0 400 40" className="w-full h-10 text-accent/20" preserveAspectRatio="none">
          <path d="M0 40 Q100 0 200 20 Q300 40 400 0 L400 0 L0 0 Z" fill="currentColor"/>
        </svg>
        <div className={`absolute top-3 left-1/2 -translate-x-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1000 ${mounted ? "w-48 opacity-100" : "w-0 opacity-0"}`} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-4">

        {/* Walimatul Khitan label */}
        <p className={`font-sans text-[10px] uppercase tracking-[0.28em] font-bold text-primary-dark/60 mb-5 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          ﷽ Walimatul Khitan ﷽
        </p>

        {/* ── DECORATIVE HALO CIRCLE ── */}
        <div className={`relative flex items-center justify-center mb-7 transition-all duration-[1200ms] ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          {/* Outer glow ring – spins */}
          <div className="absolute w-52 h-52 rounded-full spin-slow" style={{background:"conic-gradient(from 0deg, transparent 0%, rgba(197,168,128,.15) 25%, transparent 50%, rgba(95,113,97,.12) 75%, transparent 100%)"}} />
          {/* Middle dashed ring – counter-spin */}
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-accent/25 spin-rev" />
          {/* Solid border ring */}
          <div className="absolute w-40 h-40 rounded-full border border-accent/20 bg-white/40 shadow-inner" />
          {/* Inner dashed */}
          <div className="absolute w-34 h-34 rounded-full border border-dashed border-accent/15" />
          {/* Zikri's Photo */}
          {!hideZikriPhoto && (
            <Image
              src={customZikriPhoto || "/zikri.jpeg"}
              alt="Zikri"
              width={100}
              height={100}
              className="rounded-full object-cover w-24 h-24 shadow-lg"
            />
          )}
          {/* Diamond sparkles on ring */}
          {[0,90,180,270].map((deg,i) => (
            <div key={i} className="absolute w-40 h-40 rounded-full" style={{transform:`rotate(${deg}deg)`}}>
              <svg className="absolute -top-2 left-1/2 -translate-x-1/2 text-accent-dark" width="10" height="10" viewBox="0 0 10 10">
                <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4Z" fill="currentColor" opacity=".6"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Child Name */}
        <h1 className={`font-serif text-3xl font-bold tracking-wide text-primary-dark mb-1 transition-all duration-[1000ms] delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Akmal Zikri Alghifari
        </h1>

        {/* Nickname with floral dividers */}
        <div className={`flex items-center gap-2 mb-7 transition-all duration-[1000ms] delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <svg width="32" height="10" viewBox="0 0 32 10" fill="none" className="text-accent">
            <path d="M0 5 Q8 0 16 5 Q24 0 32 5" stroke="currentColor" strokeWidth="1" fill="none"/>
            <circle cx="0" cy="5" r="1.5" fill="currentColor" opacity=".5"/>
            <circle cx="32" cy="5" r="1.5" fill="currentColor" opacity=".5"/>
          </svg>
          <p className="font-serif text-sm italic text-zinc-500">~ Zikri ~</p>
          <svg width="32" height="10" viewBox="0 0 32 10" fill="none" className="text-accent" style={{transform:"scaleX(-1)"}}>
            <path d="M0 5 Q8 0 16 5 Q24 0 32 5" stroke="currentColor" strokeWidth="1" fill="none"/>
            <circle cx="0" cy="5" r="1.5" fill="currentColor" opacity=".5"/>
            <circle cx="32" cy="5" r="1.5" fill="currentColor" opacity=".5"/>
          </svg>
        </div>

        {/* ── GUEST CARD ── */}
        <div className={`w-full max-w-sm relative transition-all duration-[1200ms] delay-500 ${mounted ? "opacity-100 [transform:perspective(1200px)_rotateX(0deg)_translateY(0px)]" : "opacity-0 [transform:perspective(1200px)_rotateX(18deg)_translateY(24px)]"}`}>
          {/* Outer glow frame */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-primary/10 blur-sm pointer-events-none" />
          <div className="relative rounded-2xl border border-accent/25 bg-white/80 p-5 shadow-xl backdrop-blur-md overflow-hidden">
            {/* Accent top stripe */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
            {/* Coin ornament */}
            <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
                <path d="M7 0 L8 5 L13 7 L8 9 L7 14 L6 9 L1 7 L6 5Z" fill="currentColor" opacity=".7"/>
              </svg>
            </div>

            <p className="font-sans text-[10px] tracking-widest text-zinc-400 uppercase mb-2">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="font-serif text-xl font-bold text-primary-dark mb-2 drop-shadow-sm">
              {guestName}
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-[1px] flex-1 bg-accent/20" />
              <svg width="8" height="8" viewBox="0 0 8 8" className="text-accent" fill="currentColor">
                <path d="M4 0 L4.8 3.2 L8 4 L4.8 4.8 L4 8 L3.2 4.8 L0 4 L3.2 3.2Z"/>
              </svg>
              <div className="h-[1px] flex-1 bg-accent/20" />
            </div>
            <p className="font-sans text-[10px] text-zinc-400 italic">
              *Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="flex flex-col items-center pb-10 px-6 gap-5">
        <div className={`transition-all duration-[1000ms] delay-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <button
            onClick={handleOpenClick}
            className="group relative flex items-center gap-2.5 rounded-full bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/15" />
            <MailOpen className="h-4 w-4 transition-transform group-hover:rotate-12 relative z-10" />
            <span className="relative z-10">Buka Undangan</span>
            <span className="absolute -inset-[3px] rounded-full border border-accent/35 animate-ping opacity-20" />
          </button>
        </div>

        {/* Bottom arch band */}
        <div className={`h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1000 delay-700 ${mounted ? "w-40 opacity-100" : "w-0 opacity-0"}`} />
      </div>

      {/* ── BOTTOM DECORATIVE ARCH ── */}
      <div className="relative w-full pointer-events-none">
        <svg viewBox="0 0 400 36" className="w-full h-9 text-accent/15" preserveAspectRatio="none">
          <path d="M0 0 Q100 36 200 18 Q300 0 400 36 L400 36 L0 36 Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}
