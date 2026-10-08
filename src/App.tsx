/**
 * Bernardo 10 Anos - Aplicativo de Slideshow Especial
 * Feito com amor por Papai Anselmo e Mamãe Noely
 */

import React, { useState, useEffect } from "react";
import { IntroScreen } from "@/src/components/IntroScreen";
import { Slideshow } from "@/src/components/Slideshow";
import { GrandFinale } from "@/src/components/GrandFinale";
import { ParentsLetter } from "@/src/components/ParentsLetter";
import { AchievementsGrid } from "@/src/components/AchievementsGrid";
import { BalloonGame } from "@/src/components/BalloonGame";
import { CosmicDecorations } from "@/src/components/Decorations";
import { sound } from "@/src/lib/sound";

type ScreenState = "intro" | "slideshow" | "finale";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>("intro");
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        sound.toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#070b19] text-slate-100 overflow-x-hidden">
      {/* Background ambient stars & decorations */}
      <CosmicDecorations />

      {/* Screen Router */}
      {currentScreen === "intro" && (
        <IntroScreen
          onStart={() => setCurrentScreen("slideshow")}
          onOpenLetter={() => setIsLetterOpen(true)}
        />
      )}

      {currentScreen === "slideshow" && (
        <Slideshow
          onComplete={() => setCurrentScreen("finale")}
          onOpenLetter={() => setIsLetterOpen(true)}
          onOpenAchievements={() => setIsAchievementsOpen(true)}
          onOpenGame={() => setIsGameOpen(true)}
        />
      )}

      {currentScreen === "finale" && (
        <GrandFinale
          onRestart={() => setCurrentScreen("slideshow")}
          onSurprise={() => setCurrentScreen("slideshow")}
          onOpenLetter={() => setIsLetterOpen(true)}
          onOpenGame={() => setIsGameOpen(true)}
        />
      )}

      {/* Overlays / Modals */}
      <ParentsLetter
        open={isLetterOpen}
        onOpenChange={setIsLetterOpen}
      />

      <AchievementsGrid
        open={isAchievementsOpen}
        onOpenChange={setIsAchievementsOpen}
      />

      <BalloonGame
        open={isGameOpen}
        onClose={() => setIsGameOpen(false)}
      />
    </div>
  );
}
