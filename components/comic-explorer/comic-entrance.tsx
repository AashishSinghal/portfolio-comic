"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EntranceProps {
  onComplete: () => void;
}

export function ComicEntrance({ onComplete }: EntranceProps) {
  const [phase, setPhase] = useState<"whoosh" | "fading" | "done">("whoosh");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 1200);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="font-display text-7xl sm:text-9xl text-manga-yellow"
            style={{
              WebkitTextStroke: "3px #0D0D0D",
              paintOrder: "stroke fill",
              filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.5))",
            }}
          >
            WHOOSH!
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
