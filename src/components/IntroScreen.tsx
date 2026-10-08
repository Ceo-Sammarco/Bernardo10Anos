import React from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Play, Sparkles, Heart } from "lucide-react";
import { content } from "@/src/data/content";
import { sound } from "@/src/lib/sound";
import { PWAInstallButton } from "./PWAInstallButton";

interface IntroScreenProps {
  onStart: () => void;
  onOpenLetter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onOpenLetter }) => {
  const handleStart = (e: React.MouseEvent) => {
    // Confetti burst from button position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ["#38bdf8", "#fbbf24", "#34d399", "#818cf8", "#f43f5e"],
    });

    sound.playCelebration();
    sound.startMusic();
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 overflow-hidden bg-gradient-to-b from-[#060d1f] via-[#091536] to-[#040814] text-white">
      {/* Top Header / PWA Install */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 pt-safe">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <span className="text-xs font-semibold tracking-widest uppercase text-sky-400/90 font-display">
            {content.intro.badge}
          </span>
        </div>
        <PWAInstallButton />
      </header>

      {/* Center Content Anchor */}
      <main className="flex flex-col items-center justify-center my-auto text-center max-w-lg z-10 px-2">
        {/* Animated 10 with Spring Motion */}
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
          className="relative mb-6 cursor-pointer select-none"
          onClick={() => {
            sound.playSparkle();
            confetti({
              particleCount: 30,
              spread: 60,
              origin: { x: 0.5, y: 0.35 },
            });
          }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 blur-2xl opacity-40 animate-pulse" />
          
          <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-slate-900/90 to-blue-950/80 border-2 border-amber-400/40 shadow-2xl shadow-blue-900/60 backdrop-blur-xl">
            <span className="font-display text-7xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
              10
            </span>
            <span className="absolute -top-3 -right-3 text-2xl animate-bounce">
              ⭐
            </span>
            <span className="absolute -bottom-2 -left-2 text-2xl animate-pulse">
              🚀
            </span>
          </div>
        </motion.div>

        {/* Title & Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
            {content.fullName}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            {content.intro.subtitle}
          </p>
        </motion.div>

        {/* Main CTA: Toque para Começar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 w-full max-w-xs"
        >
          <button
            onClick={handleStart}
            className="group relative w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-base shadow-xl shadow-blue-600/35 hover:shadow-cyan-500/40 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer overflow-hidden border border-cyan-300/30"
          >
            {/* Subtle animated light gleam */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Play className="w-5 h-5 fill-current text-white" />
            <span>Toque para Começar</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
          </button>
        </motion.div>

        {/* Quick Letter Trigger on Intro */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onOpenLetter}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-300/90 hover:text-amber-200 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Ler mensagem especial dos seus pais</span>
        </motion.button>
      </main>

      {/* Footer info: Parents' Signature */}
      <footer className="w-full text-center z-10 pb-safe">
        <p className="text-xs text-slate-400/90 font-medium tracking-wide">
          Com amor, <strong className="text-slate-200">{content.parents.father}</strong> & <strong className="text-slate-200">{content.parents.mother}</strong>
        </p>
      </footer>
    </div>
  );
};
