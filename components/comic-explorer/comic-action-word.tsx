"use client";

interface ActionWordProps {
  text: string;
  x: number;
  y: number;
  rotate: number;
  color: string;
  size: string;
}

export function ComicActionWord({ text, x, y, rotate, color, size }: ActionWordProps) {
  return (
    <span
      className={`action-word ${color} ${size} absolute opacity-15 dark:opacity-10 pointer-events-none select-none`}
      style={{ left: x, top: y, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
