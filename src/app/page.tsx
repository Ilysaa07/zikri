"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Calendar, Clock, Sparkles, Navigation, Users, Share2 } from "lucide-react";
import OpeningScreen from "@/components/OpeningScreen";
import MusicPlayer from "@/components/MusicPlayer";
import ScrollReveal from "@/components/ScrollReveal";
import Countdown from "@/components/Countdown";
import FallingPetals from "@/components/FallingPetals";
import GiftSection from "@/components/GiftSection";

import WishesFeed from "@/components/WishesFeed";
import DownloadCard from "@/components/DownloadCard";
import DeveloperPanel from "@/components/DeveloperPanel";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { hideZikriPhoto, customZikriPhoto } = useDeveloperMode();

  // Lock/unlock body scroll based on cover status
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareText = `Undangan Walimatul Khitan\nAkmal Zikri Alghifari (Zikri)\n\nMinggu, 28 Juni 2026\nCafe Sorojakeun, Soreang, Bandung\n\nInfo selengkapnya silakan kunjungi:\n${window.location.origin}`;
      
      if (navigator.share) {
        navigator.share({
          title: "Undangan Khitanan Zikri",
          text: shareText,
          url: window.location.href,
        }).catch((err) => console.log(err));
      } else {
        navigator.clipboard.writeText(shareText);
        alert("Pesan undangan berhasil disalin! Silakan bagikan ke WhatsApp atau sosial media Anda.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-100 flex items-center justify-center font-sans">
      {/* Centered Mobile-First Frame */}
      <main className="w-full max-w-md bg-[#FAF7F2] min-h-screen shadow-2xl relative border-l border-r border-accent/10 flex flex-col overflow-hidden pb-12">
        {/* Floating background petals once opened */}
        {isOpen && <FallingPetals />}

        {/* Cover Envelope Screen */}
        <OpeningScreen isOpen={isOpen} onOpen={() => setIsOpen(true)} />

        {/* Audio Player controller */}
        <MusicPlayer isOpen={isOpen} />

        {isOpen && (
          <div className="flex flex-col w-full">
            {/* 1. LUXURY HERO / BANNER SECTION */}
            <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
              {/* Scoped hero animations */}
              <style>{`
                @keyframes hero-twinkle { 0%,100%{opacity:.1;transform:scale(.7)} 50%{opacity:.8;transform:scale(1.3)} }
                @keyframes scroll-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
                .hero-star { animation: hero-twinkle var(--dur,1s) var(--del,0s) ease-in-out infinite; }
                .scroll-arrow { animation: scroll-bounce 1.8s ease-in-out infinite; }
              `}</style>

              {/* Background image – slow zoom */}
              <Image src="/decor-1.png" alt="Backdrop Walimatul Khitan" fill priority sizes="450px"
                className="object-cover -z-10 brightness-[0.82] opacity-95 animate-zoom-slow" />

              {/* Vignette overlay */}
              <div className="absolute inset-0 -z-10"
                style={{background:"radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)"}} />

              {/* TOP arch band */}
              <div className="absolute top-0 left-0 right-0 pointer-events-none z-10">
                <svg viewBox="0 0 400 50" className="w-full text-[#FAF7F2]" preserveAspectRatio="none" style={{height:"50px"}}>
                  <path d="M0 0 L400 0 L400 20 Q300 50 200 30 Q100 10 0 35 Z" fill="currentColor" opacity=".1"/>
                  <path d="M0 0 L400 0 L400 8 Q300 28 200 14 Q100 0 0 18 Z" fill="currentColor" opacity=".12"/>
                </svg>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-light/60 to-transparent" />
              </div>

              {/* BOTTOM arch band */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
                <svg viewBox="0 0 400 50" className="w-full text-[#FAF7F2]" preserveAspectRatio="none" style={{height:"50px"}}>
                  <path d="M0 50 L400 50 L400 30 Q300 0 200 20 Q100 40 0 15 Z" fill="currentColor" opacity=".1"/>
                  <path d="M0 50 L400 50 L400 42 Q300 22 200 36 Q100 50 0 32 Z" fill="currentColor" opacity=".12"/>
                </svg>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-light/60 to-transparent" />
              </div>

              {/* Scattered sparkle stars */}
              {[
                {top:"12%",left:"7%",dur:"1.1s",del:"0s"},
                {top:"20%",left:"85%",dur:"0.9s",del:"0.3s"},
                {top:"70%",left:"9%",dur:"1.3s",del:"0.6s"},
                {top:"75%",left:"88%",dur:"1.0s",del:"0.1s"},
                {top:"45%",left:"4%",dur:"0.8s",del:"0.8s"},
                {top:"42%",left:"92%",dur:"1.2s",del:"0.4s"},
                {top:"88%",left:"50%",dur:"1.4s",del:"0.7s"},
                {top:"6%", left:"50%",dur:"0.85s",del:"0.5s"},
              ].map((s,i) => (
                <div key={i} className="hero-star absolute pointer-events-none z-10"
                  style={{top:s.top,left:s.left,"--dur":s.dur,"--del":s.del} as React.CSSProperties}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="#E0D3C1" opacity=".9">
                    <path d="M6 0 L7 4.5 L12 6 L7 7.5 L6 12 L5 7.5 L0 6 L5 4.5Z"/>
                  </svg>
                </div>
              ))}

              {/* Radiant glow rings behind the card */}
              <div className="absolute z-10 pointer-events-none"
                style={{width:"320px",height:"320px",
                  background:"radial-gradient(circle, rgba(197,168,128,.22) 0%, rgba(95,113,97,.08) 55%, transparent 75%)",
                  borderRadius:"50%",filter:"blur(18px)"}}>
              </div>

              {/* Zikri's Photo */}
              {!hideZikriPhoto && (
                <Image
                  src={customZikriPhoto || "/zikri.jpeg"}
                  alt="Zikri"
                  width={180}
                  height={180}
                  className="absolute z-30 rounded-full object-cover shadow-xl border-2 border-accent/50"
                  style={{top: "20%", left: "50%", transform: "translateX(-50%)"}}
                />
              )}

              {/* THE CENTRAL LUXURY CARD */}
              <ScrollReveal animation="zoom-in-up" duration={1300} className="w-full z-20 px-6">
                <div className="relative max-w-[310px] mx-auto">
                  {/* Outer glow border */}
                  <div className="absolute -inset-1.5 rounded-3xl pointer-events-none"
                    style={{background:"linear-gradient(135deg, rgba(197,168,128,.4), transparent 50%, rgba(95,113,97,.3))",borderRadius:"24px"}} />

                  <div className="relative border-2 border-double border-accent/45 bg-[#FAF7F2]/96 rounded-2xl text-center shadow-2xl backdrop-blur-md overflow-hidden">
                    {/* Gold accent top stripe */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                    <div className="p-6">
                      {/* Corner ornaments */}
                      {[["top-3 left-3","border-t border-l"],["top-3 right-3","border-t border-r"],
                        ["bottom-3 left-3","border-b border-l"],["bottom-3 right-3","border-b border-r"]].map(([pos,brd],i) => (
                        <div key={i} className={`absolute ${pos} w-4 h-4 ${brd} border-accent/55 pointer-events-none`} />
                      ))}

                      {/* Bismillah ornament */}
                      <div className="flex justify-center mb-3 text-accent-dark">
                        <svg viewBox="0 0 120 28" className="w-28 h-7 fill-current">
                          <path d="M60 4 L62.5 11 L70 11 L64 15.5 L66.5 22.5 L60 18 L53.5 22.5 L56 15.5 L50 11 L57.5 11 Z"/>
                          <circle cx="60" cy="2" r="1.8"/>
                          <path d="M10 14 H47 M73 14 H110" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                          <circle cx="10" cy="14" r="1.5" opacity=".6"/>
                          <circle cx="110" cy="14" r="1.5" opacity=".6"/>
                          <path d="M18 10 Q22 6 26 10 Q30 14 34 10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity=".5"/>
                          <path d="M86 10 Q90 6 94 10 Q98 14 102 10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity=".5"/>
                        </svg>
                      </div>

                      <span className="block font-sans text-[9px] uppercase tracking-[0.28em] font-bold text-accent-dark mb-3">
                        Walimatul Khitan
                      </span>

                      <h1 className="font-serif text-3xl font-extrabold tracking-wide text-primary-dark leading-tight mb-1.5">
                        Akmal Zikri<br />Alghifari
                      </h1>

                      {/* Floral nickname divider */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <svg width="28" height="8" viewBox="0 0 28 8" fill="none" className="text-accent">
                          <path d="M0 4 Q7 0 14 4 Q21 8 28 4" stroke="currentColor" strokeWidth="1" fill="none"/>
                          <circle cx="0" cy="4" r="1.3" fill="currentColor" opacity=".5"/>
                        </svg>
                        <p className="font-serif text-xs italic text-zinc-500">~ Zikri ~</p>
                        <svg width="28" height="8" viewBox="0 0 28 8" fill="none" className="text-accent" style={{transform:"scaleX(-1)"}}>
                          <path d="M0 4 Q7 0 14 4 Q21 8 28 4" stroke="currentColor" strokeWidth="1" fill="none"/>
                          <circle cx="0" cy="4" r="1.3" fill="currentColor" opacity=".5"/>
                        </svg>
                      </div>

                      {/* Diamond divider */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <div className="h-[1px] flex-1 bg-accent/20"/>
                        <svg width="7" height="7" viewBox="0 0 7 7" className="text-accent" fill="currentColor">
                          <path d="M3.5 0 L4.2 2.8 L7 3.5 L4.2 4.2 L3.5 7 L2.8 4.2 L0 3.5 L2.8 2.8Z"/>
                        </svg>
                        <div className="h-[1px] flex-1 bg-accent/20"/>
                      </div>

                      <p className="font-sans text-[10px] font-bold tracking-widest text-primary-dark uppercase">
                        Minggu, 28 Juni 2026
                      </p>
                    </div>

                    {/* Gold accent bottom stripe */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  </div>
                </div>
              </ScrollReveal>

              {/* Scroll-down arrow */}
              <div className="scroll-arrow absolute bottom-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1">
                <p className="text-white/60 text-[9px] uppercase tracking-widest font-sans">Gulir ke bawah</p>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/50">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </section>            {/* 2. GREETINGS & VERSE */}
            <section className="py-16 px-6 text-center space-y-10 relative overflow-hidden">
              {/* Section background dots */}
              <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle, rgba(197,168,128,.06) 1px, transparent 1px)",backgroundSize:"24px 24px"}} />

              <ScrollReveal animation="fade-in-up">
                {/* Ornamental section header */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent/40" />
                  <Sparkles className="h-4 w-4 text-accent-dark animate-pulse" />
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent/40" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary-dark">
                  Assalamu'alaikum Wr. Wb.
                </h2>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed max-w-xs mx-auto mt-4">
                  Dengan memohon rahmat dan ridho Allah SWT, kami mengharap kehadiran Bapak/Ibu/Saudara/i pada acara syukuran khitanan putra kami yang tercinta:
                </p>
              </ScrollReveal>

              <ScrollReveal animation="flip-y" delay={200}>
                <div className="space-y-3 p-6 rounded-2xl border border-accent/20 bg-white/60 backdrop-blur-sm shadow-lg relative overflow-hidden">
                  {/* Gradient top & bottom bars */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-accent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                  {/* Corner ticks */}
                  {[["top-2.5 left-2.5","border-t border-l"],["top-2.5 right-2.5","border-t border-r"],["bottom-2.5 left-2.5","border-b border-l"],["bottom-2.5 right-2.5","border-b border-r"]].map(([pos,brd],i) => (
                    <div key={i} className={`absolute ${pos} w-3.5 h-3.5 ${brd} border-accent/40 pointer-events-none`} />
                  ))}

                  <h3 className="font-serif text-2xl font-bold text-primary-dark tracking-wide">
                    Akmal Zikri Alghifari
                  </h3>

                  {/* Floral divider */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] w-10 bg-accent/25" />
                    <svg width="8" height="8" viewBox="0 0 8 8" className="text-accent-dark" fill="currentColor"><path d="M4 0L4.8 3.2 8 4 4.8 4.8 4 8 3.2 4.8 0 4 3.2 3.2Z"/></svg>
                    <div className="h-[1px] w-10 bg-accent/25" />
                  </div>

                  <p className="font-sans text-sm font-semibold text-accent-dark italic">~ Zikri ~</p>

                  <p className="font-sans text-xs text-zinc-500 max-w-xs mx-auto pt-2 leading-relaxed">
                    Putra ke-3 dari:<br />
                    <strong className="text-primary-dark block mt-1">Bapak Asep Makbul Saepuloh</strong>
                    <span className="text-[10px] text-zinc-400 font-serif my-0.5 block">&amp;</span>
                    <strong className="text-primary-dark block">Ibu Yati Suryati</strong>
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* 3. COUNTDOWN TIMER */}
            <section className="py-14 px-6 text-center space-y-7 relative overflow-hidden" style={{background:"linear-gradient(180deg, rgba(95,113,97,.04) 0%, rgba(197,168,128,.06) 100%)"}}>
              {/* Decorative big faded circle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-accent/10 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-accent/06 pointer-events-none" />

              <ScrollReveal animation="zoom-in">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-accent/40" />
                  <svg width="14" height="14" viewBox="0 0 14 14" className="text-accent-dark" fill="currentColor"><path d="M7 0L8.2 5 13 7 8.2 9 7 14 5.8 9 1 7 5.8 5Z"/></svg>
                  <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-accent/40" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-accent-dark font-semibold">
                  Menuju Hari Bahagia
                </span>
                <h3 className="font-serif text-xl font-bold text-primary-dark mt-1.5 mb-1">
                  Hitung Mundur Acara
                </h3>
              </ScrollReveal>
              <ScrollReveal animation="zoom-in-up" delay={200}>
                <Countdown />
              </ScrollReveal>
            </section>

            {/* 4. EVENT DETAILS */}
            <section className="py-16 px-6 text-center space-y-10 relative overflow-hidden">
              {/* Faint trellis background */}
              <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:"repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(197,168,128,.05) 18px, rgba(197,168,128,.05) 19px), repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(197,168,128,.05) 18px, rgba(197,168,128,.05) 19px)"}} />

              <ScrollReveal animation="fade-in-up">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" className="text-accent">
                    <path d="M0 4 Q7 0 14 4 Q21 8 28 4" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <circle cx="0" cy="4" r="1.3" fill="currentColor" opacity=".5"/>
                  </svg>
                  <svg width="8" height="8" viewBox="0 0 8 8" className="text-accent-dark" fill="currentColor"><path d="M4 0L4.8 3.2 8 4 4.8 4.8 4 8 3.2 4.8 0 4 3.2 3.2Z"/></svg>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" className="text-accent" style={{transform:"scaleX(-1)"}}>
                    <path d="M0 4 Q7 0 14 4 Q21 8 28 4" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <circle cx="0" cy="4" r="1.3" fill="currentColor" opacity=".5"/>
                  </svg>
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-accent-dark font-semibold">
                  Waktu &amp; Tempat
                </span>
                <h2 className="font-serif text-2xl font-bold text-primary-dark mt-1">
                  Detail Acara
                </h2>
              </ScrollReveal>

              {/* Event Info Card (3D Flip Animation) */}
              <ScrollReveal animation="flip-y" delay={200}>
                <div className="rounded-2xl border border-accent/20 bg-white/70 p-6 shadow-md backdrop-blur-sm space-y-6 text-left hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-accent/10 rounded-xl text-accent-dark shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-primary-dark">Hari & Tanggal</h4>
                      <p className="font-sans text-xs text-zinc-600 mt-0.5 font-medium">Minggu, 28 Juni 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-accent/10 rounded-xl text-accent-dark shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-primary-dark">Waktu</h4>
                      <p className="font-sans text-xs text-zinc-600 mt-0.5 font-medium">10.00 - 15.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-accent/10 rounded-xl text-accent-dark shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-primary-dark">Tempat & Lokasi</h4>
                      <p className="font-sans text-xs text-zinc-600 mt-0.5 font-bold">Cafe Sorojakeun</p>
                      <p className="font-sans text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                        Kp. Simpang Tengah RT 03 RW 13 Desa Parung Serab Kec. Soreang Kab. Bandung
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Interactive Maps Iframe & Buttons */}
              <ScrollReveal animation="zoom-in-up" className="space-y-5">
                <h3 className="font-serif text-base font-bold text-primary-dark">Peta Lokasi</h3>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-accent/20 shadow-md relative group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.961784462377!2d107.53026377390806!3d-7.013777368701369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ed0369791845%3A0x7451536bea7ceab!2sTeras%20Sorojakeun%20Cafe%20%26%20Space!5e0!3m2!1sid!2sid!4v1781791365721!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Cafe Sorojakeun Google Maps Location"
                  />
                  {/* Subtle map overlay for transition */}
                  <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-all duration-300" />
                </div>
                <a
                  href="https://www.google.com/maps/place/Teras+Sorojakeun+Cafe+%26+Space/@-7.0137774,107.5302638,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68ed0369791845:0x7451536bea7ceab!8m2!3d-7.0137827!4d107.5328387!16s%2Fg%2F11wj7wmwd6?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-6 py-3 text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shimmer-gold-hover"
                >
                  <Navigation className="h-4 w-4" />
                  <span>BUKA DI GOOGLE MAPS</span>
                </a>
              </ScrollReveal>
            </section>

            {/* 5. TURUT MENGUNDANG SECTION */}
            <section className="py-16 px-6 text-center space-y-6 relative overflow-hidden" style={{background:"linear-gradient(180deg, rgba(95,113,97,.05) 0%, rgba(197,168,128,.04) 100%)"}}>
              {/* Background circle ornament */}
              <div className="absolute right-0 top-0 w-40 h-40 rounded-full border border-accent/08 pointer-events-none -translate-y-1/2 translate-x-1/2" />
              <div className="absolute left-0 bottom-0 w-32 h-32 rounded-full border border-accent/08 pointer-events-none translate-y-1/2 -translate-x-1/2" />

              <ScrollReveal animation="fade-in-up">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-accent/40" />
                  <Users className="h-4 w-4 text-accent-dark" />
                  <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-accent/40" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary-dark">
                  Turut Mengundang
                </h2>
                <p className="font-sans text-[10px] text-zinc-400 tracking-wider uppercase mt-1">
                  Keluarga Besar &amp; Tokoh Masyarakat
                </p>
                {/* Floral divider */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="h-[1px] w-14 bg-accent/20" />
                  <svg width="8" height="8" viewBox="0 0 8 8" className="text-accent" fill="currentColor"><path d="M4 0L4.8 3.2 8 4 4.8 4.8 4 8 3.2 4.8 0 4 3.2 3.2Z"/></svg>
                  <div className="h-[1px] w-14 bg-accent/20" />
                </div>
              </ScrollReveal>

              {/* List of invitees with staggered reveal */}
              <div className="max-w-xs mx-auto space-y-3 pt-2 text-zinc-600 font-sans text-xs">
                <ScrollReveal animation="zoom-in" delay={100}>
                  <div className="p-3 bg-white/60 border border-accent/15 rounded-xl shadow-sm leading-relaxed hover:border-accent hover:-translate-y-0.5 transition-all duration-300">
                    <strong className="text-primary-dark text-sm">Deni Ramdani</strong>
                    <span className="block text-[10px] text-zinc-400 italic mt-0.5">Kepala Desa Parung Serab</span>
                  </div>
                </ScrollReveal>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "H. Ade Wawan Setiawan",
                    "H. Ust Wawan Setiawan",
                    "H. Yayan Suryana",
                    "Andi Permana (Adul)"
                  ].map((name, idx) => (
                    <ScrollReveal key={idx} animation="zoom-in" delay={150 + idx * 50}>
                      <div className="p-2.5 bg-white/60 border border-accent/10 rounded-xl shadow-sm flex items-center justify-center min-h-[46px] hover:border-accent hover:-translate-y-0.5 transition-all duration-300">
                        <span className="font-semibold text-[11px] text-center text-primary-dark leading-tight">{name}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. DANA GIFT SECTION */}
            <ScrollReveal animation="zoom-in-up">
              <GiftSection />
            </ScrollReveal>

            {/* 9. RSVP & WISHES FEED */}
            <section className="py-16 px-6 space-y-12 bg-[#FAF7F2] relative overflow-hidden">
              {/* Background dot grid */}
              <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle, rgba(197,168,128,.05) 1px, transparent 1px)",backgroundSize:"20px 20px"}} />

              {/* Section header */}
              <ScrollReveal animation="fade-in-up">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-accent/40" />
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-accent-dark" fill="currentColor"><path d="M6 0L7.2 4.5 12 6 7.2 7.5 6 12 4.8 7.5 0 6 4.8 4.5Z"/></svg>
                  <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-accent/40" />
                </div>
              </ScrollReveal>



              <ScrollReveal animation="zoom-in-up" delay={150}>
                <WishesFeed />
              </ScrollReveal>
            </section>

            {/* 10. PRINT INVITATION & SHARE */}
            <section className="py-12 px-6 text-center space-y-4 border-t border-accent/10">
              <ScrollReveal animation="zoom-in-up" className="space-y-4 flex flex-col items-center">
                <DownloadCard />

                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 w-full max-w-[240px] rounded-xl bg-primary-dark py-3 text-xs font-semibold tracking-wider text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer hover:bg-zinc-800"
                >
                  <Share2 className="h-4.5 w-4.5" />
                  <span>BAGIKAN LINK UNDANGAN</span>
                </button>
              </ScrollReveal>
            </section>

            {/* 11. CLOSING / FOOTER */}
            <footer className="py-16 px-6 text-center bg-primary-dark text-white space-y-8 relative overflow-hidden">
              {/* Background shimmer */}
              <div className="absolute inset-0 bg-accent/5 -z-10 animate-[pulse_6s_infinite]" />
              {/* Top floral band */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              {/* Corner sparkles */}
              {[["top-4 left-4"],["top-4 right-4"],["bottom-4 left-4"],["bottom-4 right-4"]].map(([pos],i) => (
                <svg key={i} className={`absolute ${pos} text-accent/30 pointer-events-none`} width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0L7 4.5 12 6 7 7.5 6 12 5 7.5 0 6 5 4.5Z"/>
                </svg>
              ))}

              <ScrollReveal animation="zoom-in" className="space-y-4 max-w-xs mx-auto">
                {/* Ornament above quote */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent/40" />
                  <svg width="10" height="10" viewBox="0 0 10 10" className="text-accent" fill="currentColor"><path d="M5 0L6 4 10 5 6 6 5 10 4 6 0 5 4 4Z"/></svg>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent/40" />
                </div>
                <p className="font-sans text-xs text-accent-light leading-relaxed italic">
                  {'"Tiada kebahagiaan yang lebih berarti bagi kami selain kehadiran serta doa restu Bapak/Ibu/Saudara/i sekalian."'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-10 bg-accent/30" />
                  <svg width="6" height="6" viewBox="0 0 6 6" className="text-accent" fill="currentColor"><path d="M3 0L3.6 2.4 6 3 3.6 3.6 3 6 2.4 3.6 0 3 2.4 2.4Z"/></svg>
                  <div className="h-[1px] w-10 bg-accent/30" />
                </div>
                <p className="font-serif text-lg font-semibold tracking-wide text-accent-light">
                  Wassalamu'alaikum Wr. Wb.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="zoom-in-up" delay={150} className="space-y-1">
                <p className="font-sans text-[9px] uppercase tracking-widest text-zinc-400">
                  Kami yang Berbahagia:
                </p>
                <p className="font-serif text-base font-bold text-accent-light">
                  Keluarga Bp. Asep Makbul &amp; Ibu Yati Suryati
                </p>
                <p className="font-sans text-[9px] text-zinc-500 pt-8 select-none">
                  © 2026 Ilyasaalfrdzi. Created with Love.
                </p>
              </ScrollReveal>
            </footer>
          </div>
        )}
        <DeveloperPanel />
      </main>
    </div>
  );
}
