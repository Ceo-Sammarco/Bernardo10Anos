import React from "react";
import { motion } from "motion/react";

export const CosmicDecorations: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Subtle radial ambient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

      {/* Floating Constellation Stars */}
      <motion.div
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-8 text-amber-300 text-lg select-none"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-28 right-12 text-sky-300 text-sm select-none"
      >
        ★
      </motion.div>

      <motion.div
        animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-24 right-8 text-amber-200 text-base select-none"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-20 left-10 text-cyan-300 text-xs select-none"
      >
        ★
      </motion.div>

      {/* Corner floating adventure accents */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 4, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-6 right-28 opacity-30 text-2xl select-none"
        title="Foguete Espacial"
      >
        🚀
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="hidden md:block absolute bottom-12 left-28 opacity-25 text-2xl select-none"
        title="Craque do Futebol"
      >
        ⚽
      </motion.div>
    </div>
  );
};
