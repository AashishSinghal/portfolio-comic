"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, Shield, Flame, Database, Cloud, Smartphone } from "lucide-react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend Frameworks": <Flame className="h-5 w-5" />,
  Languages: <Zap className="h-5 w-5" />,
  Backend: <Shield className="h-5 w-5" />,
  Databases: <Database className="h-5 w-5" />,
  "DevOps & Cloud": <Cloud className="h-5 w-5" />,
  "Cross Platform": <Smartphone className="h-5 w-5" />,
};

const levelBars: Record<string, number> = {
  Expert: 5,
  Advanced: 4,
  Intermediate: 3,
};

const panelColors: Record<string, string> = {
  "manga-yellow": "bg-panel-yellow dark:bg-dark-panel",
  "sky-blue": "bg-panel-blue dark:bg-dark-panel",
  "action-red": "bg-panel-pink dark:bg-dark-panel",
  "hero-green": "bg-panel-green dark:bg-dark-panel",
};

export function PowersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="powers" className="relative py-24 bg-panel-yellow/30 dark:bg-dark-surface">
      <div className="halftone-bg absolute inset-0" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-4">
            CHAPTER 02
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink dark:text-paper">
            MY <span className="text-manga-yellow text-comic-outline">POWERS</span>
          </h2>
          <p className="mt-4 text-ink/60 dark:text-paper/60 font-body text-lg max-w-md mx-auto">
            The tech arsenal I&apos;ve mastered on my coding adventures
          </p>
        </motion.div>

        {/* Skill panels — comic grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                "comic-panel p-5 comic-hover",
                panelColors[skill.color] || "bg-paper dark:bg-dark-panel"
              )}
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center bg-ink text-paper dark:bg-paper dark:text-ink rounded-sm">
                    {categoryIcons[skill.category] || <Zap className="h-4 w-4" />}
                  </span>
                  <h3 className="font-display text-lg tracking-wide text-ink dark:text-paper">
                    {skill.category}
                  </h3>
                </div>
              </div>

              {/* Power level indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display text-xs tracking-wider text-ink/60 dark:text-paper/60">
                  LVL
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className={cn(
                        "h-3 w-6 border-2 border-ink dark:border-paper rounded-sm",
                        j < levelBars[skill.level]
                          ? `bg-${skill.color}`
                          : "bg-transparent"
                      )}
                      style={
                        j < levelBars[skill.level]
                          ? {
                              backgroundColor:
                                skill.color === "manga-yellow"
                                  ? "#FFE234"
                                  : skill.color === "sky-blue"
                                  ? "#3DBBFF"
                                  : skill.color === "action-red"
                                  ? "#FF2D2D"
                                  : "#2DD47B",
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>
                <span className="font-display text-xs tracking-wider text-ink/60 dark:text-paper/60">
                  {skill.level}
                </span>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-2.5 py-1 text-sm font-bold font-body bg-paper dark:bg-dark-bg border-2 border-ink dark:border-paper/30 rounded-sm text-ink dark:text-paper"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative action word */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.12, scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="action-word text-action-red text-6xl sm:text-8xl absolute -bottom-4 right-4 rotate-[15deg] pointer-events-none"
        >
          POW!
        </motion.span>
      </div>
    </section>
  );
}
