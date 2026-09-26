"use client";

import { useState, useCallback } from "react";
import { Github, Linkedin, Sparkles } from "lucide-react";
import { socialLinks, aboutText } from "@/data/portfolio";
import { LiquidText } from "@/components/ui/liquid-text";

export function HeroPanel() {
  const [liquidReady, setLiquidReady] = useState(false);
  const handleReady = useCallback(() => setLiquidReady(true), []);

  return (
    <div className="h-full flex flex-col justify-center">
      {/* Chapter label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest">
          CHAPTER 01
        </span>
        <span className="h-0.5 w-12 bg-ink dark:bg-paper" />
      </div>

      {/* Name with 3D effect */}
      <div className="relative mb-4 overflow-hidden" style={{ minHeight: 160 }}>
        <h1
          className={`font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.9] tracking-wide text-ink dark:text-paper md:transition-opacity md:duration-500 ${
            liquidReady ? "md:opacity-0" : ""
          }`}
        >
          <span className="block">AASHISH</span>
          <span className="block text-action-red mt-1">SINGHAL</span>
        </h1>
        <span className="sr-only">Aashish Singhal</span>

        <div
          className={`absolute inset-0 z-10 hidden md:block md:transition-opacity md:duration-500 ${
            liquidReady ? "md:opacity-100" : "md:opacity-0"
          }`}
        >
          <LiquidText
            text="AASHISH"
            font="Bangers, cursive"
            fontSize={240}
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
            fontSize={240}
            color="#FF2D2D"
            displacementStrength={1.0}
            displacementRadius={2.0}
            tilt={0.12}
            zoom={3.5}
            textAlign="left"
            className="h-[48%]"
          />
        </div>
      </div>

      {/* Speech bubble */}
      <div className="speech-bubble max-w-md mb-4 dark:bg-dark-surface">
        <p className="font-body text-base font-bold text-ink dark:text-paper">
          Full Stack Developer <span className="text-action-red">·</span> React
          Specialist <span className="text-action-red">·</span> Code Alchemist
        </p>
      </div>

      {/* About */}
      <p className="text-ink/70 dark:text-paper/70 text-sm leading-relaxed max-w-lg mb-4">
        {aboutText}
      </p>

      {/* Social + CTA */}
      <div className="flex gap-3 items-center">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center comic-border rounded-sm bg-paper dark:bg-dark-bg comic-hover"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center comic-border rounded-sm bg-paper dark:bg-dark-bg comic-hover"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-manga-yellow text-ink font-display text-sm tracking-wide comic-border rounded-sm">
          FULL STACK DEV <Sparkles className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
