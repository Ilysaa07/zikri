"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MessageSquare, Send, Search, Loader2, Calendar, X } from "lucide-react";

interface Wish {
  id: string;
  name: string;
  message: string;
  attendance: string | null;
  created_at: string;
}

export default function WishesFeed() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<string>("hadir");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to assign deterministically a premium soft color for avatars
  const getAvatarStyle = (senderName: string) => {
    const styles = [
      "bg-primary/20 text-primary-dark border border-primary/10",
      "bg-accent/25 text-accent-dark border border-accent/10",
      "bg-amber-100 text-amber-700 border border-amber-200",
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
      "bg-blue-100 text-blue-700 border border-blue-200",
      "bg-stone-200 text-stone-700 border border-stone-300",
    ];
    let hash = 0;
    for (let i = 0; i < senderName.length; i++) {
      hash += senderName.charCodeAt(i);
    }
    return styles[hash % styles.length];
  };

  const getInitial = (senderName: string) => {
    return senderName ? senderName.charAt(0).toUpperCase() : "?";
  };

  // Helper for Indonesian relative or simple date formatting
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      
      if (diffMs < 0) return "Baru saja";
      
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "Baru saja";
      if (diffMins < 60) return `${diffMins} menit yang lalu`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} jam yang lalu`;
      
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleDateString("id-ID", options);
    } catch (err) {
      return "Beberapa waktu lalu";
    }
  };

  useEffect(() => {
    const fetchWishes = async () => {
      setIsLoadingFeed(true);
      try {
        const { data, error } = await supabase
          .from("wishes")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);

        if (error) {
          console.error("Gagal memuat ucapan:", error);
        } else if (data) {
          setWishes(data);
        }
      } catch (err) {
        console.error("Network error fetching wishes:", err);
      } finally {
        setIsLoadingFeed(false);
      }
    };

    fetchWishes();

    const channel = supabase
      .channel("wishes-changes-upgrade")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          const newWish = payload.new as Wish;
          setWishes((prev) => {
            if (prev.some((w) => w.id === newWish.id)) return prev;
            return [newWish, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMsg("Nama dan ucapan harus diisi.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const wishData = {
      name: name.trim(),
      message: message.trim(),
      attendance: attendance || null,
    };

    try {
      const { data, error } = await supabase
        .from("wishes")
        .insert([wishData])
        .select();

      if (error) {
        console.error("Error inserting wish:", error);
        setErrorMsg("Gagal mengirim ucapan. Silakan coba lagi.");
      } else {
        setName("");
        setMessage("");
        if (data && data.length > 0) {
          const inserted = data[0] as Wish;
          setWishes((prev) => {
            if (prev.some((w) => w.id === inserted.id)) return prev;
            return [inserted, ...prev];
          });
        }
      }
    } catch (err) {
      console.error("Wish submission error:", err);
      setErrorMsg("Koneksi bermasalah. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredWishes = wishes.filter((wish) =>
    wish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      {/* Wish Submission Form */}
      <div className="rounded-2xl border border-accent/20 bg-white/70 p-6 shadow-md backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent/40" />

        <h3 className="font-serif text-xl font-bold text-primary-dark mb-4 text-center">
          Kirim Ucapan & Doa
        </h3>
        
        {errorMsg && (
          <div className="mb-3 rounded-lg bg-red-50 p-3 text-xs text-red-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSendWish} className="space-y-4 text-left">
          <div>
            <label htmlFor="wish-name" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Nama Anda
            </label>
            <input
              id="wish-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tuliskan nama Anda..."
              className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-2.5 text-sm text-primary-dark placeholder-zinc-400 shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="wish-attendance" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Kehadiran (Opsional)
            </label>
            <select
              id="wish-attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-2.5 text-sm text-primary-dark shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200"
            >
              <option value="hadir">Hadir</option>
              <option value="tidak_hadir">Berhalangan</option>
              <option value="ragu">Ragu-ragu</option>
            </select>
          </div>

          <div>
            <label htmlFor="wish-msg" className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Ucapan / Doa Restu
            </label>
            <textarea
              id="wish-msg"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Berikan ucapan selamat & doa restu terbaik untuk Zikri..."
              className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-2.5 text-sm text-primary-dark placeholder-zinc-400 shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold tracking-widest uppercase text-white shadow-md transition-all duration-300 hover:bg-primary-dark disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer shimmer-gold-hover"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Ucapan</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Wishes Feed Box */}
      <div className="rounded-2xl border border-accent/20 bg-white/60 p-6 shadow-md backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent/40" />

        <div className="flex items-center justify-between mb-4 border-b border-accent/10 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-accent-dark" />
            <h3 className="font-serif text-lg font-bold text-primary-dark">
              Buku Doa Tamu
            </h3>
          </div>
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent-dark">
            {wishes.length} Ucapan
          </span>
        </div>

        {/* Dynamic Search Box */}
        {wishes.length > 0 && (
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ucapan tamu..."
              className="w-full rounded-xl border border-zinc-200 bg-white/80 pl-9 pr-8 py-2 text-xs text-primary-dark placeholder-zinc-400 shadow-sm focus:border-accent focus:bg-white focus:outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 p-0.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {isLoadingFeed ? (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-accent-dark" />
            <span className="text-xs font-medium">Memuat doa-doa indah...</span>
          </div>
        ) : filteredWishes.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 italic text-xs">
            {searchQuery
              ? `Tidak menemukan ucapan dari "${searchQuery}"`
              : "Belum ada ucapan. Jadilah yang pertama mendoakan Zikri!"}
          </div>
        ) : (
          /* Scrollable feed list */
          <div className="max-h-96 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar scroll-smooth">
            {filteredWishes.map((wish) => (
              <div
                key={wish.id}
                className="group relative rounded-xl border border-accent/10 bg-white/50 p-4 text-left shadow-sm transition-all duration-300 hover:bg-white/80 hover:border-accent/20 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {/* Determined Initials Avatar */}
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold font-serif shadow-inner ${getAvatarStyle(wish.name)}`}>
                      {getInitial(wish.name)}
                    </div>
                    <span className="font-serif text-sm font-bold text-primary-dark">
                      {wish.name}
                    </span>
                  </div>

                  {wish.attendance && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                        wish.attendance === "hadir"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : wish.attendance === "tidak_hadir"
                          ? "bg-red-50 text-red-500 border border-red-100"
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}
                    >
                      {wish.attendance === "hadir"
                        ? "Hadir"
                        : wish.attendance === "tidak_hadir"
                        ? "Berhalangan"
                        : "Ragu"}
                    </span>
                  )}
                </div>

                <p className="font-sans text-xs text-zinc-600 leading-relaxed pl-9 whitespace-pre-wrap">
                  {wish.message}
                </p>

                <p className="text-[9px] text-zinc-400 text-right mt-2 pl-9 flex items-center justify-end gap-1">
                  <Calendar className="h-2.5 w-2.5" />
                  {formatTime(wish.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
