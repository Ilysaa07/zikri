"use client";

import React, { useState } from "react";
import { Download, X, Printer, Calendar, MapPin, Clock, QrCode } from "lucide-react";

export default function DownloadCard() {
  const [showModal, setShowModal] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="text-center py-6 w-full max-w-[240px]">
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-accent/30 bg-white/70 px-6 py-3 text-xs font-semibold tracking-widest text-accent-dark shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105 active:scale-95 cursor-pointer uppercase"
      >
        <Download className="h-4.5 w-4.5 animate-bounce" />
        <span>Cetak Kartu Undangan</span>
      </button>

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] print:hidden">
          <div className="relative w-full max-w-md rounded-2xl bg-[#FAF7F2] p-6 shadow-2xl border border-accent/20 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-serif text-lg font-bold text-primary-dark mb-1 text-center pr-6">
              Pratinjau Kartu Undangan
            </h3>
            <p className="font-sans text-[10px] text-zinc-400 mb-6 text-center pr-6">
              Gunakan opsi Cetak untuk menyimpannya sebagai file PDF di perangkat Anda.
            </p>

            {/* Print Area Container */}
            <div 
              id="printable-card"
              className="mx-auto rounded-xl border-2 border-double border-accent/40 bg-white p-6 text-center shadow-lg relative overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(197, 168, 128, 0.02) 0%, transparent 70%)`
              }}
            >
              {/* Corner Ornaments in CSS */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-accent/60" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-accent/60" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-accent/60" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-accent/60" />

              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-accent-dark mb-3.5">
                Walimatul Khitan
              </p>

              <h4 className="font-serif text-xl font-bold text-primary-dark mb-1">
                Akmal Zikri Alghifari
              </h4>
              <p className="font-sans text-xs italic text-zinc-400 mb-3.5">
                (Zikri)
              </p>

              <p className="font-sans text-[9px] text-zinc-500 mb-4 leading-relaxed px-4">
                Anak ke-3 dari Bapak Asep Makbul Saepuloh & Ibu Yati Suryati
              </p>

              <div className="h-[1px] w-16 bg-accent/20 mx-auto mb-4" />

              {/* Event Details Grid */}
              <div className="space-y-2.5 text-left text-[11px] text-zinc-600 max-w-[240px] mx-auto mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-accent-dark shrink-0" />
                  <span>Minggu, 28 Juni 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-accent-dark shrink-0" />
                  <span>Pukul 10.00 - 15.00 WIB</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent-dark shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <strong>Cafe Sorojakeun</strong><br/>
                    Kp. Simpang Tengah RT 03 RW 13 Desa Parung Serab Kec. Soreang Kab. Bandung
                  </span>
                </div>
              </div>

              {/* QR Code Gold SVG */}
              <div className="flex flex-col items-center gap-1 my-4 bg-accent/5 p-2 rounded-xl border border-accent/10 w-fit mx-auto select-none">
                <svg className="w-14 h-14 text-accent-dark" viewBox="0 0 29 29" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M1 1h7v7H1zM3 3h3v3H3zM21 1h7v7h-7zM23 3h3v3h-3zM1 21h7v7H1zM3 23h3v3H3z" fill="currentColor" />
                  <path d="M12 1h2v2h-2zM16 1h2v3h-2zM12 5h4v2h-4zM10 8h2v2h-2zM14 9h3v2h-3zM1 10h3v2H1zM6 10h2v2H6zM18 10h3v2h-3zM23 10h5v2h-5z" fill="currentColor" />
                  <path d="M10 13h2v4h-2zM14 13h4v2h-4zM20 13h3v2h-3zM25 13h3v3h-3zM10 19h3v2h-3zM15 18h2v3h-2zM19 18h4v2h-4zM25 18h3v2h-3z" fill="currentColor" />
                  <path d="M11 23h4v2h-4zM17 22h3v3h-3zM22 22h2v4h-2zM26 23h2v4h-2z" fill="currentColor" />
                  <path d="M12 26h3v2h-3zM17 26h4v2h-4zM23 27h4v1h-4z" fill="currentColor" />
                </svg>
                <span className="font-sans text-[7px] uppercase tracking-wider text-accent-dark font-semibold">Scan Maps & RSVP</span>
              </div>

              {/* VIP Hosts */}
              <div className="border-t border-accent/10 pt-3 text-[8px] text-zinc-500">
                <p className="font-sans font-bold uppercase tracking-wider text-zinc-400 mb-1 text-center">Turut Mengundang:</p>
                <p className="font-serif font-bold text-primary-dark">Bp. Deni Ramdani (Kepala Desa Parung Serab)</p>
                <p className="font-sans italic leading-tight text-zinc-500 mt-0.5">H. Ade Wawan, H. Ust Wawan, H. Yayan Suryana, Andi Permana (Adul)</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-zinc-200 bg-white py-3.5 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-3.5 text-xs font-bold text-white hover:bg-primary-dark shadow-md active:scale-95 transition-all cursor-pointer shimmer-gold-hover"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
