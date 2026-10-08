import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog";
import { content, Achievement } from "@/src/data/content";
import { sound } from "@/src/lib/sound";
import { Trophy, Rotate3d, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface AchievementsGridProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AchievementsGrid: React.FC<AchievementsGridProps> = ({ open, onOpenChange }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    sound.playSparkle();
    setFlippedCards((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // If all flipped, celebration!
      const totalFlipped = Object.values(next).filter(Boolean).length;
      if (totalFlipped === content.achievements.length) {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
        });
        sound.playCelebration();
      }
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Grandes Momentos de Bernardo</span>
          </div>
          <DialogTitle className="text-2xl font-bold font-display text-white">
            Bolhas de Conquistas 🏆
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-300">
            Toque em cada cartão para virar e descobrir os detalhes daquela lembrança!
          </DialogDescription>
        </DialogHeader>

        {/* Grid of 3D Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {content.achievements.map((item: Achievement) => {
            const isFlipped = !!flippedCards[item.id];

            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className="perspective-1000 h-44 cursor-pointer select-none group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-2xl ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 shadow-lg group-hover:border-cyan-400/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/40">
                        {item.age}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Rotate3d className="w-3 h-3" /> Toque para virar
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-amber-400/50 shadow-xl">
                    <div className="flex items-center justify-between text-amber-300 text-xs font-bold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Memória Especial
                      </span>
                      <span className="text-xl">{item.icon}</span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans my-auto italic">
                      "{item.backDetail}"
                    </p>

                    <div className="text-[11px] text-right text-slate-400 border-t border-slate-800/80 pt-1">
                      <span>Toque para desvirar</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
