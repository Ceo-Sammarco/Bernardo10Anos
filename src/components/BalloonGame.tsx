import React, { useState, useEffect, useRef } from "react";
import { sound } from "@/src/lib/sound";
import confetti from "canvas-confetti";
import { X, Trophy, Sparkles, RotateCcw } from "lucide-react";

interface Balloon {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  emoji: string;
  popped: boolean;
}

const BALLOON_COLORS = [
  "#38bdf8", // Sky blue
  "#fbbf24", // Gold
  "#34d399", // Emerald
  "#f43f5e", // Rose
  "#a855f7", // Purple
  "#3b82f6", // Royal blue
  "#fb923c", // Orange
];

interface BalloonGameProps {
  open: boolean;
  onClose: () => void;
}

export const BalloonGame: React.FC<BalloonGameProps> = ({ open, onClose }) => {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset or initialize on open
  useEffect(() => {
    if (open) {
      setScore(0);
      setGameWon(false);
      setBalloons([]);
    }
  }, [open]);

  // Balloon spawner
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length > 12) return prev; // max 12 at a time for performance

        const newBalloon: Balloon = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80, // %
          y: 105, // start slightly below viewport
          speed: 0.35 + Math.random() * 0.45,
          size: 55 + Math.random() * 25,
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          emoji: Math.random() > 0.4 ? "🎈" : "⭐",
          popped: false,
        };
        return [...prev, newBalloon];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [open]);

  // Animation frame loop to move balloons upwards
  useEffect(() => {
    if (!open) return;

    let animId: number;
    const updatePhysics = () => {
      setBalloons((prev) =>
        prev
          .map((b) => ({
            ...b,
            y: b.y - b.speed,
          }))
          .filter((b) => b.y > -20 && !b.popped)
      );
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [open]);

  const popBalloon = (id: number, x: number, y: number) => {
    sound.playPop();

    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setScore((prev) => {
      const nextScore = prev + 1;
      if (nextScore === 10) {
        setGameWon(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
        });
        sound.playCelebration();
      }
      return nextScore;
    });
  };

  const handleRestart = () => {
    setScore(0);
    setGameWon(false);
    setBalloons([]);
  };

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950 flex flex-col select-none touch-none"
    >
      {/* Top Game Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 pt-safe border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 text-sm font-bold font-display">
            <span>Balões Estourados:</span>
            <span className="text-amber-400 text-base">{score}</span>
            <span className="text-slate-400 font-normal">/ 10</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Recomeçar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors"
            title="Sair do Jogo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Playfield Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden cursor-crosshair">
        {balloons.map((b) => (
          <div
            key={b.id}
            onClick={() => popBalloon(b.id, b.x, b.y)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform active:scale-75 select-none"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size * 1.25}px`,
            }}
          >
            {/* Balloon Body */}
            <div
              className="relative w-full h-full rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-lg flex items-center justify-center transform transition-transform hover:scale-110"
              style={{
                backgroundColor: b.color,
                boxShadow: `0 8px 24px ${b.color}55`,
              }}
            >
              {/* Balloon knot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: b.color }}
              />
              {/* Balloon string */}
              <div className="absolute -bottom-6 left-1/2 w-0.5 h-5 bg-white/40 -translate-x-1/2" />
              {/* Inner shine */}
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/40 blur-[1px]" />
              <span className="text-lg opacity-90 select-none pointer-events-none">
                {b.emoji}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Instructions for Bernardo */}
      <div className="relative z-20 pb-safe text-center py-2 bg-slate-950/70 border-t border-slate-900 text-xs text-slate-400">
        🎈 Toque nos balões que sobem para estourá-los antes que sumam no céu!
      </div>

      {/* WIN MODAL when reaching 10 */}
      {gameWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-amber-400/60 p-6 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-3xl flex items-center justify-center mx-auto mb-3">
              🏆
            </div>
            <h3 className="font-display text-2xl font-black text-white">
              Parabéns, Bernardo!
            </h3>
            <p className="mt-2 text-sm text-amber-300 font-semibold">
              Você estourou 10 balões para os seus 10 anos! 🎉
            </p>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Você tem reflexos de craque! Que a sua vida seja sempre cheia de alegria, brincadeiras e celebrações como essa.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleRestart}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/30"
              >
                Jogar Novamente 🎈
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Voltar para o Slideshow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
