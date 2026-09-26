"use client";

import { aboutText } from "@/data/portfolio";
import { Heart, Coffee, Gamepad2, BookOpen } from "lucide-react";

export function AboutPanel() {
  return (
    <div className="h-full flex flex-col justify-center">
      <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-4 w-fit">
        WHO AM I?
      </span>

      <h2 className="font-display text-3xl lg:text-4xl text-ink dark:text-paper mb-4">
        THE <span className="text-sky-blue text-comic-outline">ORIGIN</span>{" "}
        STORY
      </h2>

      <div className="speech-bubble dark:bg-dark-panel mb-4">
        <p className="font-body text-sm text-ink dark:text-paper leading-relaxed">
          {aboutText}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <Coffee className="h-4 w-4" />, text: "Powered by caffeine" },
          { icon: <Gamepad2 className="h-4 w-4" />, text: "Side project addict" },
          { icon: <BookOpen className="h-4 w-4" />, text: "Learning Japanese" },
          { icon: <Heart className="h-4 w-4 text-action-red" />, text: "Open source fan" },
        ].map((fact) => (
          <div
            key={fact.text}
            className="flex items-center gap-2 px-2 py-1.5 bg-paper/50 dark:bg-dark-bg/50 rounded-sm border border-ink/10 dark:border-paper/10"
          >
            {fact.icon}
            <span className="text-xs font-bold text-ink dark:text-paper">
              {fact.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
