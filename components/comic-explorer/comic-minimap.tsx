"use client";

import { useEffect, useState } from "react";
import { motion, type MotionValue, useTransform } from "motion/react";
import { PANELS, CANVAS_W, CANVAS_H, SCROLL_STOPS } from "./config";

interface MinimapProps {
  activePanel: number;
  onPanelClick: (index: number) => void;
  scrollProgress: MotionValue<number>;
}

const MINIMAP_W = 160;
const MINIMAP_H = 140;
const scaleX = MINIMAP_W / CANVAS_W;
const scaleY = MINIMAP_H / CANVAS_H;

const lightColors: Record<string, string> = {
  paper: "#FFFEF2",
  "panel-blue": "#E8F7FF",
  "panel-yellow": "#FFFBCC",
  "panel-green": "#E8FFE8",
  "panel-pink": "#FFE8F0",
};

const darkColors: Record<string, string> = {
  paper: "#2E2E2E",
  "panel-blue": "#333844",
  "panel-yellow": "#3A3828",
  "panel-green": "#2E3E2E",
  "panel-pink": "#3E2E34",
};

function getPanelCenter(stopIdx: number) {
  if (stopIdx === 0 || stopIdx === SCROLL_STOPS.length - 1)
    return { x: CANVAS_W / 2, y: CANVAS_H / 2 };
  const p = PANELS[stopIdx - 1];
  return { x: p.x + p.width / 2, y: p.y + p.height / 2 };
}

function interpolateViewport(v: number): { x: number; y: number } {
  let stopIdx = SCROLL_STOPS.findIndex((s) => s > v);
  if (stopIdx <= 0) stopIdx = 1;
  if (stopIdx >= SCROLL_STOPS.length) stopIdx = SCROLL_STOPS.length - 1;

  const prevStop = SCROLL_STOPS[stopIdx - 1];
  const nextStop = SCROLL_STOPS[stopIdx];
  const t = Math.min(1, Math.max(0, (v - prevStop) / (nextStop - prevStop)));

  const prev = getPanelCenter(stopIdx - 1);
  const next = getPanelCenter(stopIdx);
  return {
    x: (prev.x + (next.x - prev.x) * t) * scaleX - 15,
    y: (prev.y + (next.y - prev.y) * t) * scaleY - 10,
  };
}

export function ComicMinimap({
  activePanel,
  onPanelClick,
  scrollProgress,
}: MinimapProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const viewX = useTransform(scrollProgress, (v) => interpolateViewport(v).x);
  const viewY = useTransform(scrollProgress, (v) => interpolateViewport(v).y);

  const colors = isDark ? darkColors : lightColors;
  const strokeColor = isDark ? "#555" : "#0D0D0D";

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 hidden md:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div
        className="comic-border rounded-sm bg-paper/90 dark:bg-dark-surface/90 backdrop-blur-sm p-2 relative"
        style={{ width: MINIMAP_W + 16, height: MINIMAP_H + 16 }}
      >
        <svg
          viewBox={`0 0 ${MINIMAP_W} ${MINIMAP_H}`}
          className="w-full h-full"
        >
          {/* Panel rectangles */}
          {PANELS.map((panel, i) => (
            <rect
              key={panel.id}
              x={panel.x * scaleX}
              y={panel.y * scaleY}
              width={panel.width * scaleX}
              height={panel.height * scaleY}
              fill={colors[panel.color] || colors.paper}
              stroke={i === activePanel ? "#FF2D2D" : strokeColor}
              strokeWidth={i === activePanel ? 2 : 0.5}
              rx="1"
              className="cursor-pointer transition-all duration-200"
              onClick={() => onPanelClick(i)}
            />
          ))}

          {/* Viewport indicator */}
          <motion.rect
            x={viewX}
            y={viewY}
            width={30}
            height={20}
            fill="none"
            stroke="#FF2D2D"
            strokeWidth={1.5}
            strokeDasharray="3,2"
            rx="1"
          />
        </svg>
      </div>
    </motion.div>
  );
}
