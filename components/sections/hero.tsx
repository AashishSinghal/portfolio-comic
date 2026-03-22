"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, ArrowDown, Sparkles } from "lucide-react";
import { socialLinks, aboutText } from "@/data/portfolio";
import { LiquidText } from "@/components/ui/liquid-text";

/* Deterministic speed lines — seeded to avoid hydration mismatch */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function SpeedLines() {
  const lines = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const angle = i * 6 * (Math.PI / 180);
        const length = 800 + seededRandom(i * 7) * 400;
        return {
          x2: Math.cos(angle) * length,
          y2: Math.sin(angle) * length,
          opacity: 0.04 + seededRandom(i * 13) * 0.06,
          width: 0.5 + seededRandom(i * 19) * 2,
        };
      }),
    []
  );

  return (
    <svg
      className="speed-lines"
      viewBox="-600 -400 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {lines.map((line, i) => (
        <line
          key={i}
          x1={0}
          y1={0}
          x2={line.x2}
          y2={line.y2}
          strokeWidth={line.width}
          style={{ opacity: line.opacity }}
        />
      ))}
    </svg>
  );
}

export function HeroSection() {
  const [liquidReady, setLiquidReady] = useState(false);
  const handleReady = useCallback(() => setLiquidReady(true), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-paper dark:bg-dark-bg"
    >
      <SpeedLines />
      <div className="halftone-bg absolute inset-0" />

      {/* Decorative action words */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4, type: "spring" }}
        className="action-word text-manga-yellow text-5xl sm:text-7xl absolute top-24 right-8 sm:right-16 rotate-[12deg] z-10 opacity-20"
      >
        WHOOSH!
      </motion.span>

      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.4, type: "spring" }}
        className="action-word text-action-red text-3xl sm:text-5xl absolute bottom-32 left-6 sm:left-12 rotate-[-8deg] z-10 opacity-15"
      >
        ZAP!
      </motion.span>

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Chapter label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest">
                CHAPTER 01
              </span>
              <span className="h-0.5 w-12 bg-ink dark:bg-paper" />
            </motion.div>

            {/* Big name — static text with 3D overlay on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mb-8"
            >
              {/* Static text — always visible on mobile, fades on md+ when 3D is ready */}
              <h1
                className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-wide text-ink dark:text-paper md:transition-opacity md:duration-500 ${liquidReady ? "md:opacity-0" : ""}`}
              >
                <span className="block">AASHISH</span>
                <span className="block text-action-red mt-1">SINGHAL</span>
              </h1>
              <span className="sr-only">Aashish Singhal</span>

              {/* 3D displacement — md+ only */}
              <div
                className={`absolute inset-0 z-10 hidden md:block md:transition-opacity md:duration-500 ${liquidReady ? "md:opacity-100" : "md:opacity-0"}`}
              >
                <LiquidText
                  text="AASHISH"
                  font="Bangers, cursive"
                  fontSize={300}
                  lightColor="#0D0D0D"
                  darkColor="#FFFEF2"
                  displacementStrength={1.0}
                  displacementRadius={2.0}
                  tilt={0.12}
                  zoom={3.5}
                  textAlign="left"
                  onReady={handleReady}
                  className="h-[52%]"
                />
                <LiquidText
                  text="SINGHAL"
                  font="Bangers, cursive"
                  fontSize={300}
                  color="#FF2D2D"
                  displacementStrength={1.0}
                  displacementRadius={2.0}
                  tilt={0.12}
                  zoom={3.5}
                  textAlign="left"
                  className="h-[48%]"
                />
              </div>
            </motion.div>

            {/* Speech bubble subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="speech-bubble max-w-lg mb-8 dark:bg-dark-surface"
            >
              <p className="font-body text-lg font-bold text-ink dark:text-paper">
                Full Stack Developer{" "}
                <span className="text-action-red">·</span> React Specialist{" "}
                <span className="text-action-red">·</span> Code Alchemist
              </p>
            </motion.div>

            {/* Mini about text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-ink/70 dark:text-paper/70 max-w-lg mb-8 text-base leading-relaxed"
            >
              {aboutText}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href="#missions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-manga-yellow text-ink font-display text-lg tracking-wide comic-panel rotate-slight-right comic-hover"
              >
                VIEW MY WORK
                <Sparkles className="h-5 w-5" />
              </a>
              <a
                href="#chronicles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-panel-blue dark:bg-dark-panel text-ink dark:text-paper font-display text-lg tracking-wide comic-panel rotate-slight comic-hover"
              >
                MY JOURNEY
                <ArrowDown className="h-5 w-5" />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center comic-border rounded-sm bg-paper dark:bg-dark-surface comic-hover"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center comic-border rounded-sm bg-paper dark:bg-dark-surface comic-hover"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* Right column — XP Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="hidden lg:flex flex-col items-center shrink-0"
          >
            <div className="animate-float">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-manga-yellow"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 11%, 75% 3%, 78% 19%, 95% 20%, 88% 35%, 100% 50%, 88% 65%, 95% 80%, 78% 81%, 75% 97%, 61% 89%, 50% 100%, 39% 89%, 25% 97%, 22% 81%, 5% 80%, 12% 65%, 0% 50%, 12% 35%, 5% 20%, 22% 19%, 25% 3%, 39% 11%)",
                  }}
                />
                <div className="absolute inset-3 bg-paper dark:bg-dark-bg rounded-full comic-border flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-5xl text-action-red block leading-none">
                      4+
                    </span>
                    <span className="font-display text-sm tracking-wider text-ink dark:text-paper">
                      YEARS XP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ben-day-dots text-sky-blue w-28 h-28 rounded-full mt-4" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-display text-xs tracking-widest text-ink/50 dark:text-paper/50">
            SCROLL
          </span>
          <ArrowDown className="h-4 w-4 text-ink/50 dark:text-paper/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
