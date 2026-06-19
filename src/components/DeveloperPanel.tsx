"use client";

import React, { useState } from "react";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";
import { X, Eye, EyeOff, Image, Trash2, Edit2 } from "lucide-react";

export default function DeveloperPanel() {
  const {
    isDeveloperMode,
    toggleDeveloperMode,
    hideZikriPhoto,
    setHideZikriPhoto,
    customZikriPhoto,
    setCustomZikriPhoto,
  } = useDeveloperMode();

  const [photoUrlInput, setPhotoUrlInput] = useState("");

  if (!isDeveloperMode) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <div className="bg-white border border-accent/20 rounded-xl shadow-2xl p-4 w-72 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-primary-dark">
            Developer Mode
          </h3>
          <button
            onClick={toggleDeveloperMode}
            className="text-zinc-400 hover:text-zinc-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Zikri Photo Controls */}
          <div className="space-y-2 border-b border-accent/10 pb-3">
            <h4 className="font-semibold text-sm text-accent-dark">Zikri Photo</h4>
            <button
              onClick={() => setHideZikriPhoto((prev) => !prev)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent-dark text-sm font-medium transition-all"
            >
              {hideZikriPhoto ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {hideZikriPhoto ? "Tampilkan Foto" : "Sembunyikan Foto"}
            </button>

            <div className="flex gap-2">
              <input
                type="text"
                value={photoUrlInput}
                onChange={(e) => setPhotoUrlInput(e.target.value)}
                placeholder="URL Foto Baru"
                className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button
                onClick={() => {
                  if (photoUrlInput.trim()) {
                    setCustomZikriPhoto(photoUrlInput);
                    setHideZikriPhoto(false);
                  }
                }}
                className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
              >
                <Image className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setCustomZikriPhoto(null);
                setPhotoUrlInput("");
                setHideZikriPhoto(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-all"
            >
              <Trash2 className="h-4 w-4" />
              Reset Foto ke Default
            </button>
          </div>

          <p className="text-[10px] text-zinc-400 text-center">
            Tekan Ctrl+Shift+D untuk menutup panel ini
          </p>
        </div>
      </div>
    </div>
  );
}
