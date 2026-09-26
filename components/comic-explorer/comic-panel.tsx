"use client";

import { cn } from "@/lib/utils";
import type { PanelConfig } from "./config";

const colorMap: Record<string, string> = {
  paper: "bg-paper dark:bg-dark-surface",
  "panel-blue": "bg-panel-blue dark:bg-dark-surface",
  "panel-yellow": "bg-panel-yellow dark:bg-dark-surface",
  "panel-green": "bg-panel-green dark:bg-dark-surface",
  "panel-pink": "bg-panel-pink dark:bg-dark-surface",
};

interface ComicPanelProps {
  config: PanelConfig;
  children: React.ReactNode;
  className?: string;
}

export function ComicPanel({ config, children, className }: ComicPanelProps) {
  return (
    <div
      className={cn(
        "absolute comic-panel-lg overflow-hidden",
        colorMap[config.color] || "bg-paper dark:bg-dark-surface",
        className
      )}
      style={{
        left: config.x,
        top: config.y,
        width: config.width,
        height: config.height,
        transform: `rotate(${config.rotate}deg)`,
      }}
      role="region"
      aria-label={config.label}
    >
      <div className="halftone-bg absolute inset-0 pointer-events-none" />
      <div className="relative z-10 h-full w-full overflow-hidden p-6">
        {children}
      </div>
    </div>
  );
}
