"use client";

import { useState, useEffect, useCallback } from "react";
import { ComicEntrance } from "@/components/comic-explorer/comic-entrance";
import { ComicCanvas } from "@/components/comic-explorer/comic-canvas";
import { ComicMobileStrip } from "@/components/comic-explorer/comic-mobile-strip";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Lock scroll during entrance
  useEffect(() => {
    if (!mounted) return;
    if (!entranceDone && !isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entranceDone, isMobile, mounted]);

  const handleEntranceComplete = useCallback(() => {
    setEntranceDone(true);
    // Auto-scroll to hero panel after a brief pause
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: totalScroll * 0.05, behavior: "smooth" });
      });
    });
  }, []);

  // Skip entrance for reduced motion or mobile
  useEffect(() => {
    if (reducedMotion || isMobile) setEntranceDone(true);
  }, [reducedMotion, isMobile]);

  // SSR placeholder
  if (!mounted) {
    return <div className="min-h-screen bg-ink" />;
  }

  if (isMobile || reducedMotion) {
    return <ComicMobileStrip />;
  }

  return (
    <>
      {!entranceDone && (
        <ComicEntrance onComplete={handleEntranceComplete} />
      )}
      <ComicCanvas ready={entranceDone} />
    </>
  );
}
