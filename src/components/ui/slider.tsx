import * as React from "react";
import { cn } from "@/src/lib/utils";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  label?: string;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  label,
}: SliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <div className="flex justify-between text-xs font-medium text-slate-300">
          <span>{label}</span>
          <span>{value}s</span>
        </div>
      )}
      <div className="relative flex items-center w-full select-none touch-none h-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
