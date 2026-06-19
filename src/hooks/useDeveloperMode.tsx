"use client";

import { useState, useEffect, useContext, createContext, useCallback } from "react";

interface DeveloperModeContextType {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  hideZikriPhoto: boolean;
  setHideZikriPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  customZikriPhoto: string | null;
  setCustomZikriPhoto: React.Dispatch<React.SetStateAction<string | null>>;
  editingWishId: string | null;
  setEditingWishId: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeveloperModeContext = createContext<DeveloperModeContextType | undefined>(undefined);

export function DeveloperModeProvider({ children }: { children: React.ReactNode }) {
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [hideZikriPhoto, _setHideZikriPhoto] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hideZikriPhoto");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [customZikriPhoto, _setCustomZikriPhoto] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("customZikriPhoto") || null;
    }
    return null;
  });
  const [editingWishId, setEditingWishId] = useState<string | null>(null);

  const toggleDeveloperMode = useCallback(() => {
    setIsDeveloperMode((prev) => !prev);
  }, []);

  const setHideZikriPhoto = useCallback((value: React.SetStateAction<boolean>) => {
    _setHideZikriPhoto((prev) => {
      const newValue = typeof value === "function" ? (value as (prev: boolean) => boolean)(prev) : value;
      localStorage.setItem("hideZikriPhoto", JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const setCustomZikriPhoto = useCallback((value: React.SetStateAction<string | null>) => {
    _setCustomZikriPhoto((prev) => {
      const newValue = typeof value === "function" ? (value as (prev: string | null) => string | null)(prev) : value;
      if (newValue) {
        localStorage.setItem("customZikriPhoto", newValue);
      } else {
        localStorage.removeItem("customZikriPhoto");
      }
      return newValue;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleDeveloperMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDeveloperMode]);

  return (
    <DeveloperModeContext.Provider
      value={{
        isDeveloperMode,
        toggleDeveloperMode,
        hideZikriPhoto,
        setHideZikriPhoto,
        customZikriPhoto,
        setCustomZikriPhoto,
        editingWishId,
        setEditingWishId,
      }}
    >
      {children}
    </DeveloperModeContext.Provider>
  );
}

export function useDeveloperMode() {
  const context = useContext(DeveloperModeContext);
  if (!context) {
    throw new Error("useDeveloperMode must be used within a DeveloperModeProvider");
  }
  return context;
}
