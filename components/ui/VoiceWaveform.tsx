"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

interface VoiceWaveformProps {
  active?: boolean;
  speaker?: "sara" | "prospect" | "idle";
  height?: number;
  bars?: number;
  dark?: boolean;
  className?: string;
}

function deterministicAmp(i: number, total: number): number {
  const norm = i / Math.max(1, total - 1);
  const envelope = Math.sin(norm * Math.PI);
  const wave = Math.abs(
    Math.sin(i * 0.62) * 0.55 + Math.cos(i * 1.13) * 0.35 + Math.sin(i * 0.25) * 0.25
  );
  return Math.max(0.16, Math.min(1, envelope * (0.28 + wave * 0.72)));
}

export function VoiceWaveform({
  active = true,
  speaker = "sara",
  height = 48,
  bars = 48,
  dark = false,
  className = "",
}: VoiceWaveformProps) {
  const barData = useMemo(() => {
    return Array.from({ length: bars }, (_, i) => {
      const base = deterministicAmp(i, bars);
      const secondary = deterministicAmp((i + 7) % bars, bars);
      // Round to 2 decimal places deterministically for identical SSR & client hydration
      const opacity = Number((0.38 + base * 0.62).toFixed(2));
      return { i, base, secondary, opacity };
    });
  }, [bars]);

  const isIdle = !active || speaker === "idle";
  const isSara = speaker === "sara";

  const barColor = isIdle
    ? dark
      ? "rgba(255,255,255,0.24)"
      : "#D1D5DB"
    : isSara
    ? "#FF6428"
    : dark
    ? "#E5E7EB"
    : "#111111";

  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ height }}
      role="img"
      aria-label={
        isIdle
          ? "Paused voice waveform"
          : `Live voice waveform showing ${isSara ? "SARA speaking" : "prospect speaking"}`
      }
    >
      <div
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-px ${
          dark ? "bg-white/10" : "bg-[#E5E7EB]"
        }`}
      />

      <div className="relative z-10 w-full h-full flex items-center justify-between gap-[3px] px-0.5">
        {barData.map(({ i, base, secondary, opacity }) => {
          const minH = Math.max(4, Math.round(height * 0.14));
          const maxH = Math.max(minH + 2, Math.round(height * (0.2 + base * 0.72)));
          const midH = Math.max(minH + 2, Math.round(height * (0.18 + secondary * 0.56)));
          const pausedH = Math.max(4, Math.round(height * (0.14 + base * 0.24)));

          return (
            <motion.span
              key={i}
              className="flex-1 rounded-full block max-w-[3px]"
              style={{
                backgroundColor: barColor,
                opacity: isIdle ? 0.5 : opacity,
              }}
              initial={{ height: pausedH }}
              animate={
                isIdle
                  ? { height: pausedH }
                  : {
                      height: [minH, maxH, midH, Math.round(maxH * 0.85), minH],
                    }
              }
              transition={
                isIdle
                  ? { duration: 0.25 }
                  : {
                      duration: isSara ? 1.05 + (i % 5) * 0.14 : 1.25 + (i % 4) * 0.16,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: Number(((i % 9) * 0.055).toFixed(3)),
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
