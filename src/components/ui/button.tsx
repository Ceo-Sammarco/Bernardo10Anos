import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer select-none";

    const variantStyles = {
      default:
        "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40",
      secondary:
        "bg-slate-800 text-slate-100 border border-slate-700/60 hover:bg-slate-700 hover:border-slate-600",
      outline:
        "border border-slate-600/60 bg-transparent text-slate-200 hover:bg-white/10 hover:border-slate-400",
      ghost:
        "text-slate-300 hover:bg-white/10 hover:text-white",
      gold:
        "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-semibold shadow-lg shadow-amber-500/30 hover:brightness-110",
      danger:
        "bg-rose-600 text-white shadow-md shadow-rose-600/30 hover:bg-rose-500",
    };

    const sizeStyles = {
      default: "h-11 px-5 py-2 text-sm",
      sm: "h-9 rounded-lg px-3 text-xs",
      lg: "h-13 rounded-2xl px-8 text-base font-semibold",
      icon: "h-11 w-11 p-0 rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
