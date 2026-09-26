"use client";

import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  angle: number;
  opacity: number;
  id: number;
}

export function ComicCursorTrail() {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const idRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    const points: TrailPoint[] = [];

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 20) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        points.push({
          x: e.clientX,
          y: e.clientY,
          angle,
          opacity: 0.4,
          id: idRef.current++,
        });
        if (points.length > 4) points.shift();
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const tick = () => {
      for (const p of points) p.opacity -= 0.02;
      while (points.length > 0 && points[0].opacity <= 0) points.shift();
      setTrails([...points]);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]" aria-hidden="true">
      {trails.map((t) => (
        <div
          key={t.id}
          className="absolute"
          style={{
            left: t.x,
            top: t.y,
            width: 2,
            height: 18,
            background: "var(--color-ink)",
            opacity: t.opacity,
            transform: `translate(-50%, -50%) rotate(${t.angle + 90}deg)`,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}
