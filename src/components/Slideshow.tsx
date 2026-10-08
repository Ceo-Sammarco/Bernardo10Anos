import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Heart,
  Trophy,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Layers,
  Clock,
  RotateCw,
} from "lucide-react";

import rawPhotos from "@/src/data/photos.json";
import { content } from "@/src/data/content";
import { sound } from "@/src/lib/sound";
import { useTapParticles, TapParticlesOverlay } from "./ParticleBurst";

export interface PhotoItem {
  id?: string;
  src: string;
  caption?: string;
  year?: string;
  tag?: string;
}

const photos: PhotoItem[] = rawPhotos;

type TransitionEffect = "kenburns" | "fade" | "slide" | "cube" | "curtain";

const EFFECTS: { id: TransitionEffect; label: string }[] = [
  { id: "kenburns", label: "Ken Burns (Zoom)" },
  { id: "fade", label: "Suave (Fade)" },
  { id: "slide", label: "Deslizar" },
  { id: "cube", label: "Cubo 3D" },
  { id: "curtain", label: "Cortina" },
];

interface SlideshowProps {
  onComplete: () => void;
  onOpenLetter: () => void;
  onOpenAchievements: () => void;
  onOpenGame: () => void;
}

export const Slideshow: React.FC<SlideshowProps> = ({
  onComplete,
  onOpenLetter,
  onOpenAchievements,
  onOpenGame,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(5000); // 5s default
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeEffect, setActiveEffect] = useState<TransitionEffect>("kenburns");
  const [cycleEffects, setCycleEffects] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isPressing, setIsPressing] = useState(false);
  const [quotePopup, setQuotePopup] = useState<string | null>(null);
  const [spinCount, setSpinCount] = useState(0);

  // Particles on tap
  const { particles, spawnParticles } = useTapParticles();

  // Progress animation state
  const [progress, setProgress] = useState(0);
  const controlsTimeoutRef = useRef<number | null>(null);
  const pressTimerRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  // Preload next image
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % photos.length;
    if (photos[nextIdx]) {
      const img = new Image();
      img.src = photos[nextIdx].src;
    }
  }, [currentIndex]);

  // Screen WakeLock support
  useEffect(() => {
    let wakeLock: any = null;
    if ("wakeLock" in navigator && "request" in (navigator as any).wakeLock) {
      (navigator as any).wakeLock.request("screen").then((lock: any) => {
        wakeLock = lock;
      }).catch(() => {});
    }
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, []);

  // Controls auto-hide timer
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying && !isPressing) {
        setShowControls(false);
      }
    }, 4000);
  }, [isPlaying, isPressing]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [resetControlsTimeout]);

  // Main Autoplay timer & Stories progress bar
  useEffect(() => {
    if (!isPlaying || isPressing) return;

    setProgress(0);
    const stepTime = 50;
    const increment = (stepTime / speed) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, speed, isPressing]);

  // Next Slide
  const handleNext = useCallback(() => {
    setProgress(0);
    if (cycleEffects) {
      const effectKeys: TransitionEffect[] = ["kenburns", "fade", "slide", "cube", "curtain"];
      const nextEff = effectKeys[Math.floor(Math.random() * effectKeys.length)];
      setActiveEffect(nextEff);
    }

    if (currentIndex === photos.length - 1) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, cycleEffects, onComplete]);

  // Prev Slide
  const handlePrev = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, []);

  // Jump to specific slide
  const goToSlide = (index: number) => {
    setProgress(0);
    setCurrentIndex(index);
    resetControlsTimeout();
  };

  // Surprise random photo
  const handleSurprise = () => {
    sound.playCelebration();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#38bdf8", "#fbbf24", "#34d399", "#f43f5e"],
    });

    let rand = Math.floor(Math.random() * photos.length);
    if (rand === currentIndex && photos.length > 1) {
      rand = (rand + 1) % photos.length;
    }
    goToSlide(rand);
  };

  // Interactive 10-Year Badge Tap
  const handleTenBadgeTap = () => {
    sound.playSparkle();
    setSpinCount((prev) => prev + 1);
    const quote = content.quotes10Years[Math.floor(Math.random() * content.quotes10Years.length)];
    setQuotePopup(quote);
    setTimeout(() => {
      setQuotePopup(null);
    }, 3500);
  };

  // Handle Photo Tap / Hold
  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    resetControlsTimeout();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Spawn floating fun emojis
    spawnParticles(e.clientX, e.clientY, 4);

    // Left third = prev, right third = next, middle = show controls/spawn
    if (x < width * 0.28) {
      handlePrev();
    } else if (x > width * 0.72) {
      handleNext();
    }
  };

  // Long press down/up to pause/resume
  const handlePointerDown = () => {
    pressTimerRef.current = window.setTimeout(() => {
      setIsPressing(true);
    }, 200);
  };

  const handlePointerUp = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    if (isPressing) {
      setIsPressing(false);
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    resetControlsTimeout();
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
    resetControlsTimeout();
  };

  // Cycle speed (3s, 5s, 8s)
  const cycleSpeed = () => {
    const speeds = [3000, 5000, 8000];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
    resetControlsTimeout();
  };

  const currentPhoto = photos[currentIndex] || photos[0];

  // Motion variants for transition effects
  const getVariants = () => {
    switch (activeEffect) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.8 },
        };
      case "slide":
        return {
          initial: { x: "100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "-100%", opacity: 0 },
          transition: { duration: 0.6, ease: "easeInOut" },
        };
      case "cube":
        return {
          initial: { rotateY: 45, opacity: 0, scale: 0.9 },
          animate: { rotateY: 0, opacity: 1, scale: 1 },
          exit: { rotateY: -45, opacity: 0, scale: 0.9 },
          transition: { duration: 0.7 },
        };
      case "curtain":
        return {
          initial: { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
          animate: { clipPath: "inset(0 0% 0 0%)", opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.75, ease: "easeOut" },
        };
      case "kenburns":
      default:
        return {
          initial: { scale: 1, opacity: 0 },
          animate: { scale: 1.08, opacity: 1 },
          exit: { opacity: 0, scale: 1.04 },
          transition: {
            scale: { duration: speed / 1000, ease: "linear" },
            opacity: { duration: 0.7 },
          },
        };
    }
  };

  const variants = getVariants();

  return (
    <div
      onMouseMove={resetControlsTimeout}
      className="relative w-full h-screen overflow-hidden bg-black select-none flex flex-col justify-between"
    >
      {/* Floating particles layer */}
      <TapParticlesOverlay particles={particles} />

      {/* TOP HUD: Stories Progress Bar & Quick Badges */}
      <div
        className={`relative z-30 w-full pt-safe px-3 sm:px-6 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Stories progress bars */}
        <div className="flex gap-1.5 w-full py-2">
          {photos.map((_, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const barWidth = isCompleted ? "100%" : isCurrent ? `${progress}%` : "0%";

            return (
              <div
                key={idx}
                onClick={() => goToSlide(idx)}
                className="h-1 sm:h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-amber-400 transition-all duration-75"
                  style={{ width: barWidth }}
                />
              </div>
            );
          })}
        </div>

        {/* Top Header Row */}
        <div className="flex items-center justify-between mt-1 text-white">
          {/* Brand & 10 Anos interactive badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTenBadgeTap}
              className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 hover:bg-amber-400/30 active:scale-90 transition-all cursor-pointer"
              title="Toque para girar e ver uma frase especial!"
            >
              <motion.span
                animate={{ rotate: spinCount * 360 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display font-black text-amber-300 text-sm"
              >
                10 ANOS
              </motion.span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            </button>
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
              Bernardo Sammarco Gangello
            </span>
          </div>

          {/* Quick HUD Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Surprise Button */}
            <button
              onClick={handleSurprise}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/80 to-yellow-500/80 hover:brightness-110 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              title="Foto Aleatória Surpresa!"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Surpresa!</span>
            </button>

            {/* Achievements Modal Trigger */}
            <button
              onClick={onOpenAchievements}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-200 active:scale-95 transition-all cursor-pointer"
              title="Bolhas de Conquistas"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
            </button>

            {/* Balloon Game Trigger */}
            <button
              onClick={onOpenGame}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-200 active:scale-95 transition-all cursor-pointer"
              title="Mini-jogo: Estoure os Balões"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Parents Letter Trigger */}
            <button
              onClick={onOpenLetter}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-200 active:scale-95 transition-all cursor-pointer"
              title="Carta dos Pais"
            >
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote popup banner on 10-year tap */}
      <AnimatePresence>
        {quotePopup && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 inset-x-4 max-w-md mx-auto z-40 p-4 rounded-2xl bg-slate-900/95 border-2 border-amber-400 text-center shadow-2xl text-white backdrop-blur-md"
          >
            <p className="font-display font-bold text-amber-300 text-base">
              {quotePopup}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN PHOTO DISPLAY CONTAINER */}
      <div
        onClick={handlePhotoClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={variants.transition as any}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-2 sm:p-4"
          >
            {/* The Photo Image */}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption || "Bernardo 10 Anos"}
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain sm:object-cover sm:rounded-3xl rounded-2xl shadow-2xl transition-all duration-300"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.endsWith('/photos/01.jpeg') && !target.src.endsWith('/photos/01.webp')) {
                  target.src = "/photos/01.jpeg";
                }
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Hold to pause indicator */}
        {isPressing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
            <Pause className="w-3.5 h-3.5 text-amber-400" />
            <span>Pausado (segurando)</span>
          </div>
        )}

        {/* Navigation Arrows (visible on hover / desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-white/10 backdrop-blur-md transition-opacity duration-300 ${
            showControls ? "opacity-80 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Foto Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-white/10 backdrop-blur-md transition-opacity duration-300 ${
            showControls ? "opacity-80 hover:opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Próxima Foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* BOTTOM HUD: Caption & Controls */}
      <div
        className={`relative z-30 w-full pb-safe px-3 sm:px-6 transition-opacity duration-300 bg-gradient-to-t from-black via-black/80 to-transparent pt-6 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Caption Card */}
        {currentPhoto.caption && (
          <div className="max-w-2xl mx-auto mb-3 text-center sm:text-left sm:flex sm:items-center sm:justify-between p-3 sm:p-4 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md shadow-xl">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-amber-400 mb-0.5">
                {currentPhoto.tag && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px]">
                    {currentPhoto.tag}
                  </span>
                )}
                {currentPhoto.year && <span>• {currentPhoto.year}</span>}
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-snug">
                {currentPhoto.caption}
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 pl-4 whitespace-nowrap tabular-nums">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        )}

        {/* Minimalist Controls Toolbar */}
        <div className="flex items-center justify-between max-w-xl mx-auto py-1">
          {/* Left: Play/Pause & Speed */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                resetControlsTimeout();
              }}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={cycleSpeed}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              title="Velocidade das fotos"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{speed / 1000}s</span>
            </button>
          </div>

          {/* Center: Effect Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setCycleEffects(!cycleEffects);
                resetControlsTimeout();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                cycleEffects
                  ? "bg-blue-600/80 text-white border border-blue-400/40"
                  : "bg-white/10 text-slate-300 hover:text-white"
              }`}
              title="Alternar efeitos de transição automaticamente"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Efeitos:</span>
              <span>{cycleEffects ? "Automático" : activeEffect}</span>
            </button>
          </div>

          {/* Right: Audio Mute & Fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all cursor-pointer"
              title={isMuted ? "Ativar Música" : "Mudo"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
            </button>

            <button
              onClick={handleToggleFullscreen}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all cursor-pointer"
              title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
