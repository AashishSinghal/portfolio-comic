"use client";

import { Zap, Shield, Flame, Database, Cloud, Smartphone } from "lucide-react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend Frameworks": <Flame className="h-4 w-4" />,
  Languages: <Zap className="h-4 w-4" />,
  Backend: <Shield className="h-4 w-4" />,
  Databases: <Database className="h-4 w-4" />,
  "DevOps & Cloud": <Cloud className="h-4 w-4" />,
  "Cross Platform": <Smartphone className="h-4 w-4" />,
};

const levelBars: Record<string, number> = {
  Expert: 5,
  Advanced: 4,
  Intermediate: 3,
};

const colorHex: Record<string, string> = {
  "manga-yellow": "#FFE234",
  "sky-blue": "#3DBBFF",
  "action-red": "#FF2D2D",
  "hero-green": "#2DD47B",
};

const panelBg: Record<string, string> = {
  "manga-yellow": "bg-panel-yellow/60 dark:bg-dark-panel",
  "sky-blue": "bg-panel-blue/60 dark:bg-dark-panel",
  "action-red": "bg-panel-pink/60 dark:bg-dark-panel",
  "hero-green": "bg-panel-green/60 dark:bg-dark-panel",
};

export function SkillsPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-2">
          CHAPTER 02
        </span>
        <h2 className="font-display text-3xl text-ink dark:text-paper">
          MY <span className="text-manga-yellow text-comic-outline">POWERS</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
        {skills.map((skill) => (
          <div
            key={skill.category}
            className={cn(
              "p-3 comic-border rounded-sm",
              panelBg[skill.color] || "bg-paper dark:bg-dark-panel"
            )}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="flex h-6 w-6 items-center justify-center bg-ink text-paper dark:bg-paper dark:text-ink rounded-sm">
                {categoryIcons[skill.category] || <Zap className="h-3 w-3" />}
              </span>
              <h3 className="font-display text-xs tracking-wide text-ink dark:text-paper leading-tight">
                {skill.category}
              </h3>
            </div>

            {/* Power level */}
            <div className="flex items-center gap-1 mb-2">
              <span className="font-display text-[10px] tracking-wider text-ink/60 dark:text-paper/60">
                LVL
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-2 w-4 border border-ink dark:border-paper rounded-sm"
                    style={
                      j < levelBars[skill.level]
                        ? { backgroundColor: colorHex[skill.color] }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-1.5 py-0.5 text-[10px] font-bold bg-paper dark:bg-dark-bg border border-ink/20 dark:border-paper/20 rounded-sm text-ink dark:text-paper"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
