"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle, Loader2, Send, Users } from "lucide-react";
import confetti from "canvas-confetti";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "">("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalAttending, setTotalAttending] = useState<number | null>(null);

  const fetchTotalAttending = async () => {
    try {
      const { data, error } = await supabase
        .from("rsvps")
        .select("guests_count")
        .eq("attendance", "hadir");

      if (data) {
        const sum = data.reduce((acc, row) => acc + (row.guests_count || 1), 0);
        setTotalAttending(sum);
      }
    } catch (err) {
      console.error("Error fetching attendance sum:", err);
    }
  };

  useEffect(() => {
    fetchTotalAttending();
  }, [isSubmitted]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#C5A880", "#5F7161", "#FAF7F2", "#C0C0C0"],
      });
    } catch (err) {
      console.error("Confetti error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) {
      setErrorMsg("Nama dan konfirmasi kehadiran harus diisi.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    const rsvpData = {
      name: name.trim(),
      attendance,
      guests_count: attendance === "hadir" ? guestsCount : 0,
      phone: phone.trim() || null,
      notes: notes.trim() || null,
    };

    try {
      const { error } = await supabase.from("rsvps").insert([rsvpData]);

      if (error) {
        console.error("Supabase error:", error);
        setErrorMsg("Gagal menyimpan RSVP. Silakan coba lagi.");
      } else {
        setIsSubmitted(true);
        triggerConfetti();
        fetchTotalAttending(); // refresh live counter
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-8 text-center shadow-md backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-xl font-bold text-emerald-800 mb-2">
          RSVP Berhasil Dikirim!
        </h3>
        <p className="font-sans text-xs text-emerald-700 mb-4 leading-relaxed">
          Terima kasih atas konfirmasi kehadiran Anda. Semoga Allah SWT memudahkan langkah Anda untuk hadir di hari bahagia Zikri.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setName("");
            setAttendance("");
            setGuestsCount(1);
            setPhone("");
            setNotes("");
          }}
          className="font-sans text-xs font-semibold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
        >
          Kirim RSVP lain
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-accent/20 bg-white/70 p-6 md:p-8 shadow-lg backdrop-blur-sm relative overflow-hidden">
      {/* Decorative Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent/40" />

      <h3 className="font-serif text-2xl font-bold text-primary-dark text-center mb-1">
        Konfirmasi Kehadiran
      </h3>
      <p className="font-sans text-xs text-zinc-400 text-center mb-4">
        Mohon konfirmasikan kehadiran Anda pada formulir di bawah ini
      </p>

      {/* Live attending counter */}
      {totalAttending !== null && totalAttending > 0 && (
        <div className="flex items-center justify-center gap-1.5 rounded-full bg-accent/10 border border-accent/15 px-3 py-1.5 w-fit mx-auto mb-6 shadow-sm select-none">
          <Users className="h-3.5 w-3.5 text-accent-dark animate-pulse" />
          <span className="font-sans text-[10px] font-bold text-accent-dark tracking-wide">
            {totalAttending} ORANG TELAH KONFIRMASI HADIR
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4.5 text-left">
        {/* Name */}
        <div>
          <label htmlFor="rsvp-name" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Nama Lengkap
          </label>
          <input
            id="rsvp-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Bpk. Deni Ramdani"
            className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-primary-dark placeholder-zinc-400 shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="rsvp-phone" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Nomor WhatsApp (Opsional)
          </label>
          <input
            id="rsvp-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Contoh: 08123456789"
            className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-primary-dark placeholder-zinc-400 shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Attendance */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Konfirmasi Kehadiran
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAttendance("hadir")}
              className={`flex items-center justify-center gap-2 rounded-xl border py-3.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                attendance === "hadir"
                  ? "border-accent bg-accent/10 text-accent-dark shadow-sm scale-[1.02]"
                  : "border-zinc-200 bg-white/80 text-zinc-500 hover:border-zinc-300"
              }`}
            >
              <span>Ya, Saya Hadir</span>
            </button>
            <button
              type="button"
              onClick={() => setAttendance("tidak_hadir")}
              className={`flex items-center justify-center gap-2 rounded-xl border py-3.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                attendance === "tidak_hadir"
                  ? "border-accent bg-accent/10 text-accent-dark shadow-sm scale-[1.02]"
                  : "border-zinc-200 bg-white/80 text-zinc-500 hover:border-zinc-300"
              }`}
            >
              <span>Maaf, Berhalangan</span>
            </button>
          </div>
        </div>

        {/* Guests Count */}
        {attendance === "hadir" && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <label htmlFor="rsvp-guests" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Jumlah Tamu yang Hadir
            </label>
            <select
              id="rsvp-guests"
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-primary-dark shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Orang
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notes */}
        <div>
          <label htmlFor="rsvp-notes" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Pesan / Catatan Tambahan (Opsional)
          </label>
          <textarea
            id="rsvp-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tuliskan ucapan langsung atau pesan lainnya di sini..."
            className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-primary-dark placeholder-zinc-400 shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !attendance}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-xs font-bold tracking-widest uppercase text-white shadow-md transition-all duration-300 hover:bg-primary-dark disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer shimmer-gold-hover"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Mengirim...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>Kirim Konfirmasi</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
