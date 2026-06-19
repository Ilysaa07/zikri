"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, Gift, CreditCard, MapPin } from "lucide-react";

export default function GiftSection() {
  const [activeTab, setActiveTab] = useState<"transfer" | "physical">("transfer");
  const [copiedDana, setCopiedDana] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="relative w-full py-16 px-6 bg-white/40 border-t border-b border-accent/10">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-accent/10 rounded-full text-accent-dark animate-bounce">
            <Gift className="h-6 w-6" />
          </div>
        </div>
        
        <h2 className="font-serif text-3xl font-bold text-primary-dark mb-3">
          Kado Digital & Fisik
        </h2>
        <p className="font-sans text-xs text-zinc-500 mb-6 leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan saluran berikut:
        </p>

        {/* Tab Buttons */}
        <div className="flex rounded-xl bg-accent/5 p-1 border border-accent/15 mb-6 max-w-[320px] mx-auto">
          <button
            onClick={() => setActiveTab("transfer")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
              activeTab === "transfer"
                ? "bg-primary text-white shadow-sm"
                : "text-zinc-500 hover:text-primary-dark"
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Transfer Uang</span>
          </button>
          <button
            onClick={() => setActiveTab("physical")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
              activeTab === "physical"
                ? "bg-primary text-white shadow-sm"
                : "text-zinc-500 hover:text-primary-dark"
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Kirim Kado Fisik</span>
          </button>
        </div>

        {/* Tab Contents with entry animations */}
        <div className="transition-all duration-300">
          {activeTab === "transfer" ? (
            <div className="space-y-4 animate-[fadeIn_0.4s_ease-out]">
              {/* DANA Card */}
              <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-white/95 to-accent/5 p-5 text-left shadow-md backdrop-blur-sm">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#118EEA]/5 blur-xl" />
                
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-1.5">
                    <Image src="/dana.png" alt="DANA" width={60} height={22} className="h-5.5 w-auto" />
                    <span className="font-sans italic font-bold text-xl text-[#118EEA]">Dana</span>
                  </div>
                  <span className="text-[9px] font-bold tracking-widest text-[#118EEA] bg-[#118EEA]/10 px-2 py-0.5 rounded-full uppercase">
                    E-Wallet
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-zinc-400">Nomor HP / DANA</p>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-mono text-base font-bold text-primary-dark tracking-wide">
                        0895 3514 52433
                      </span>
                      <button
                        onClick={() => handleCopy("0895351452433", setCopiedDana)}
                        className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                          copiedDana
                            ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                            : "bg-white border-zinc-200 hover:border-accent hover:bg-accent/5 text-zinc-500"
                        }`}
                      >
                        {copiedDana ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedDana ? "Tersalin!" : "Salin"}</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-zinc-400">Atas Nama</p>
                    <p className="font-serif text-sm font-bold text-primary-dark">Yati Suryati</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Physical Address Card */
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-white/95 to-accent/5 p-5 text-left shadow-lg backdrop-blur-sm">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-accent/10 blur-xl" />
                
                <div className="flex items-center gap-2 mb-4 border-b border-accent/10 pb-3">
                  <MapPin className="h-5 w-5 text-accent-dark" />
                  <h4 className="font-serif text-base font-bold text-primary-dark">Alamat Pengiriman Kado</h4>
                </div>

                <div className="space-y-4">
                  <div className="font-sans text-xs text-zinc-600 leading-relaxed bg-white/50 border border-accent/5 p-3.5 rounded-xl">
                    <strong className="text-primary-dark block mb-1">Penerima: Asep Makbul Saepuloh (RW Asep)</strong>
                    Kp Simpang Tengah RT 3 RW 13 Desa Parung Serab Kec. Soreang Kab. Bandung (Jawa Barat - 40915)
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy("Asep Makbul Saepuloh, Kp Simpang Tengah RT 3 RW 13 Desa Parung Serab Kec. Soreang Kab. Bandung", setCopiedAddress)}
                      className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        copiedAddress
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : "bg-white border-zinc-200 hover:border-accent hover:bg-accent/5 text-zinc-600"
                      }`}
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Alamat Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Salin Alamat Rumah</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="font-sans text-[10px] text-zinc-400 mt-6 italic">
          *Kado digital atau kado fisik adalah pilihan sukarela. Doa tulus Anda tetap yang terpenting.
        </p>
      </div>
    </section>
  );
}
