"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "zoom-in" | "zoom-in-up" | "flip-y" | "fade-in";
  duration?: number;
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-in-up",
  duration = 800,
  delay = 0,
  threshold = 0.05,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setTimeout(() => setIsVisible(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px", // Terpicu sebelum masuk viewport sepenuhnya
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    switch (animation) {
      case "fade-in-up":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16";
      case "fade-in-left":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-16";
      case "fade-in-right":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-16";
      case "zoom-in":
        return isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90";
      case "zoom-in-up":
        return isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-16 scale-90";
      case "flip-y":
        return isVisible
          ? "opacity-100 [transform:perspective(1000px)_rotateY(0deg)]"
          : "opacity-0 [transform:perspective(1000px)_rotateY(-65deg)]";
      case "fade-in":
      default:
        return isVisible ? "opacity-100" : "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${getAnimationStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Elastic iOS-like curve
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
