"use client";

import { motion } from "motion/react";
import { PANELS } from "./config";

interface PanelDotsProps {
  activePanel: number;
  onPanelClick: (index: number) => void;
}

const dotColors = [
  "bg-action-red",
  "bg-sky-blue",
  "bg-manga-yellow",
  "bg-hero-green",
  "bg-action-red",
  "bg-sky-blue",
  "bg-action-red",
  "bg-manga-yellow",
];

export function ComicPanelDots({ activePanel, onPanelClick }: PanelDotsProps) {
  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden md:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      {PANELS.map((panel, i) => (
        <div key={panel.id} className="relative group">
          <button
            onClick={() => onPanelClick(i)}
            className={`transition-all duration-200 comic-border rounded-sm ${
              i === activePanel
                ? `w-4 h-4 ${dotColors[i]}`
                : "w-3 h-3 bg-paper dark:bg-dark-surface hover:scale-125"
            }`}
            aria-label={`Go to ${panel.label}`}
          />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-ink text-paper dark:bg-paper dark:text-ink font-display text-xs tracking-wide whitespace-nowrap rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {panel.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
