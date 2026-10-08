import React, { useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { sound } from "@/src/lib/sound";
import { content } from "@/src/data/content";
import { RotateCcw, Sparkles, Heart, Gamepad2, Gift } from "lucide-react";

interface GrandFinaleProps {
  onRestart: () => void;
  onSurprise: () => void;
  onOpenLetter: () => void;
  onOpenGame: () => void;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({
  onRestart,
  onSurprise,
  onOpenLetter,
  onOpenGame,
}) => {
  useEffect(() => {
    sound.playCelebration();

    // Multiphase confetti cannon
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#38bdf8", "#fbbf24", "#34d399", "#f43f5e", "#a855f7"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 overflow-y-auto bg-gradient-to-b from-[#050b1a] via-[#091535] to-[#040813] text-white">
      {/* Top Banner */}
      <div className="w-full max-w-lg text-center pt-safe z-10">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
          UMA DÉCADA DE AMOR E ORGULHO
        </span>
      </div>

      {/* Main Celebration Content */}
      <main className="flex flex-col items-center justify-center my-auto text-center max-w-lg z-10 py-6">
        {/* Animated Cake */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="relative mb-4 cursor-pointer select-none"
          onClick={() => {
            sound.playCelebration();
            confetti({ particleCount: 50, spread: 70, origin: { x: 0.5, y: 0.4 } });
          }}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-500/20 to-blue-500/20 border-2 border-amber-400/50 flex items-center justify-center text-6xl shadow-2xl shadow-amber-500/20">
            🎂
          </div>
          <span className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: "8s" }}>
            ✨
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight"
        >
          {content.finale.title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-base text-amber-300 font-semibold"
        >
          {content.finale.subtitle}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-slate-300 leading-relaxed max-w-md"
        >
          {content.finale.wishes}
        </motion.p>

        {/* Fun Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mt-6"
        >
          {content.funStats.map((st, i) => (
            <div
              key={i}
              className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 flex flex-col items-center justify-center shadow"
            >
              <span className="text-xl mb-1">{st.icon}</span>
              <span className="font-display text-lg font-bold text-white tabular-nums">
                {st.value}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {st.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm"
        >
          <button
            onClick={onRestart}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{content.finale.restartBtn}</span>
          </button>

          <button
            onClick={onSurprise}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 font-bold text-sm text-slate-950 shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>{content.finale.surpriseBtn}</span>
          </button>
        </motion.div>

        {/* Secondary options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 flex items-center justify-center gap-4 text-xs"
        >
          <button
            onClick={onOpenLetter}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 py-1.5 px-3 rounded-lg bg-amber-400/10 border border-amber-400/20 transition-colors"
          >
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Carta dos Pais</span>
          </button>

          <button
            onClick={onOpenGame}
            className="flex items-center gap-1.5 text-sky-300 hover:text-sky-200 py-1.5 px-3 rounded-lg bg-sky-500/10 border border-sky-400/20 transition-colors"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Estourar Balões</span>
          </button>
        </motion.div>
      </main>

      {/* Signature */}
      <footer className="w-full text-center pb-safe z-10">
        <p className="text-xs text-slate-400 font-medium">
          {content.parents.signature}
        </p>
      </footer>
    </div>
  );
};
