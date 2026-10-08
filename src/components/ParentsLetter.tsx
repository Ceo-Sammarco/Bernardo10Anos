import React, { useState, useEffect } from "react";
import { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/src/components/ui/sheet";
import { content } from "@/src/data/content";
import { sound } from "@/src/lib/sound";
import { Heart, RotateCcw, FastForward, Sparkles } from "lucide-react";

interface ParentsLetterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ParentsLetter: React.FC<ParentsLetterProps> = ({ open, onOpenChange }) => {
  const fullText = content.letter.paragraphs.join("\n\n");
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (open) {
      setDisplayedLength(0);
      setIsTyping(true);
      sound.playSparkle();
    } else {
      setIsTyping(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isTyping) return;

    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => Math.min(prev + 2, fullText.length));
      }, 22);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [open, isTyping, displayedLength, fullText.length]);

  const handleSkip = () => {
    setDisplayedLength(fullText.length);
    setIsTyping(false);
  };

  const handleRestart = () => {
    setDisplayedLength(0);
    setIsTyping(true);
  };

  const currentText = fullText.slice(0, displayedLength);
  const paragraphs = currentText.split("\n\n");

  return (
    <Sheet open={open} onOpenChange={onOpenChange} position="bottom">
      <SheetClose onClose={() => onOpenChange(false)} />

      <SheetHeader className="pr-8">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-4 h-4 fill-amber-400" />
          <span>{content.letter.subtitle}</span>
        </div>
        <SheetTitle className="text-2xl font-bold font-display text-white mt-1">
          {content.letter.title}
        </SheetTitle>
        <SheetDescription className="text-xs text-slate-400">
          De Anselmo Sammarco Nunes e Noely Oliveira Gangello
        </SheetDescription>
      </SheetHeader>

      {/* Typing letter container */}
      <div className="relative mt-3 rounded-2xl bg-gradient-to-b from-slate-950/80 to-blue-950/40 border border-slate-800 p-5 sm:p-7 text-slate-200 font-sans leading-relaxed shadow-inner">
        <div className="space-y-4 text-sm sm:text-base">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="relative leading-relaxed">
              {p}
              {idx === paragraphs.length - 1 && isTyping && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse align-middle" />
              )}
            </p>
          ))}
        </div>

        {/* Postscript & Signature */}
        {displayedLength >= fullText.length && (
          <div className="mt-6 pt-5 border-t border-slate-800 animate-in fade-in duration-500">
            <p className="text-amber-300 font-medium text-sm sm:text-base mb-2">
              {content.letter.postscript}
            </p>
            <p className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>{content.parents.signature}</span>
              <Sparkles className="w-4 h-4 text-amber-400 inline" />
            </p>
          </div>
        )}
      </div>

      {/* Action controls */}
      <div className="mt-4 flex items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          {isTyping ? (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 transition-colors"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Mostrar tudo</span>
            </button>
          ) : (
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Digitar de novo</span>
            </button>
          )}
        </div>

        <button
          onClick={() => onOpenChange(false)}
          className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-900/30 hover:bg-blue-500 active:scale-95 transition-all"
        >
          Guardar no Coração ❤️
        </button>
      </div>
    </Sheet>
  );
};
