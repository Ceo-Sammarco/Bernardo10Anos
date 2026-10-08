import React, { useState, useEffect, useCallback } from "react";
import { sound } from "@/src/lib/sound";

export interface TapParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji: string;
  size: number;
  rotation: number;
}

const EMOJIS = ["⭐", "🚀", "⚽", "⚡", "🎮", "🏆", "🎈", "✨", "🔥", "💫"];

export const useTapParticles = () => {
  const [particles, setParticles] = useState<TapParticle[]>([]);

  const spawnParticles = useCallback((clientX: number, clientY: number, count = 5) => {
    sound.playSparkle();
    const newItems: TapParticle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 40 + Math.random() * 80;
      newItems.push({
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60, // slight upward impulse
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: 20 + Math.random() * 16,
        rotation: (Math.random() - 0.5) * 60,
      });
    }

    setParticles((prev) => [...prev, ...newItems].slice(-30));
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 900));
    }, 900);
    return () => clearTimeout(timer);
  }, [particles]);

  return { particles, spawnParticles };
};

export const TapParticlesOverlay: React.FC<{ particles: TapParticle[] }> = ({ particles }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {particles.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute select-none transition-all duration-700 ease-out"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(${p.vx * 0.8}px, ${p.vy * 0.8}px) rotate(${p.rotation}deg)`,
              fontSize: `${p.size}px`,
              opacity: 1,
              animation: "particle-float 0.85s forwards ease-out",
            }}
          >
            {p.emoji}
          </div>
        );
      })}
      <style>{`
        @keyframes particle-float {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};
