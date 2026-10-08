import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  position?: "bottom" | "right";
}

export function Sheet({ open, onOpenChange, children, position = "bottom" }: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      {/* Container */}
      <div
        className={cn(
          "fixed z-50 bg-slate-900 border-slate-700/80 text-slate-100 shadow-2xl transition-all duration-300",
          position === "bottom"
            ? "bottom-0 inset-x-0 rounded-t-3xl border-t max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
            : "right-0 inset-y-0 w-full max-w-md border-l animate-in slide-in-from-right duration-300"
        )}
      >
        {position === "bottom" && (
          <div className="sticky top-0 z-20 pt-3 pb-1 bg-slate-900/90 backdrop-blur-md flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-slate-600/70" />
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function SheetHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col space-y-2 mb-4", className)}>{children}</div>;
}

export function SheetTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn("text-xl font-bold tracking-tight text-white", className)}>{children}</h2>;
}

export function SheetDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-slate-400", className)}>{children}</p>;
}

export function SheetClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
      aria-label="Fechar"
    >
      <X className="w-5 h-5" />
    </button>
  );
}
