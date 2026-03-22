"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { experience, education } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ChroniclesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="chronicles" className="relative py-24 bg-panel-blue/30 dark:bg-dark-surface">
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
            CHAPTER 04
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink dark:text-paper">
            THE{" "}
            <span className="text-action-red text-comic-outline">CHRONICLES</span>
          </h2>
          <p className="mt-4 text-ink/60 dark:text-paper/60 font-body text-lg max-w-md mx-auto">
            My quest through the realms of software engineering
          </p>
        </motion.div>

        {/* Two-column: Experience + Education */}
        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          {/* Work Experience — Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-2 font-display text-2xl tracking-wide text-ink dark:text-paper mb-8"
            >
              <Briefcase className="h-6 w-6 text-manga-yellow" />
              BATTLE LOG
            </motion.h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-ink/20 dark:bg-paper/20" />

              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-[14px] top-4 h-6 w-6 rounded-full comic-border flex items-center justify-center z-10",
                        i === 0
                          ? "bg-manga-yellow"
                          : "bg-paper dark:bg-dark-bg"
                      )}
                    >
                      <div className="h-2 w-2 rounded-full bg-ink" />
                    </div>

                    {/* Card */}
                    <div
                      className={cn(
                        "comic-panel p-5 comic-hover",
                        i === 0
                          ? "bg-panel-yellow dark:bg-dark-panel"
                          : "bg-paper dark:bg-dark-panel"
                      )}
                    >
                      {/* Period badge */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-paper dark:bg-paper dark:text-ink font-display text-xs tracking-wider">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-ink/60 dark:text-paper/60">
                          <MapPin className="h-3 w-3" />
                          {exp.location} · {exp.type}
                        </span>
                      </div>

                      <h4 className="font-display text-xl tracking-wide text-ink dark:text-paper">
                        {exp.role}
                      </h4>
                      <p className="font-display text-base text-action-red tracking-wide mb-2">
                        @ {exp.company}
                      </p>
                      <p className="text-sm text-ink/70 dark:text-paper/70 mb-3">
                        {exp.summary}
                      </p>

                      {/* Highlights */}
                      {exp.highlights.length > 0 && (
                        <ul className="space-y-1.5">
                          {exp.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-ink/80 dark:text-paper/80"
                            >
                              <ChevronRight className="h-4 w-4 text-manga-yellow shrink-0 mt-0.5" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 font-display text-2xl tracking-wide text-ink dark:text-paper mb-8"
            >
              <GraduationCap className="h-6 w-6 text-sky-blue" />
              TRAINING ARC
            </motion.h3>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="comic-panel p-5 bg-panel-pink dark:bg-dark-panel comic-hover"
                >
                  <span className="inline-block px-2 py-0.5 bg-sky-blue text-ink font-display text-xs tracking-wider mb-3">
                    {edu.period}
                  </span>
                  <h4 className="font-display text-lg tracking-wide text-ink dark:text-paper mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-bold text-ink/80 dark:text-paper/80 mb-1">
                    {edu.field}
                  </p>
                  <p className="text-sm text-ink/60 dark:text-paper/60 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {edu.school}, {edu.location}
                  </p>
                </motion.div>
              ))}

              {/* Languages bonus panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="comic-panel p-5 bg-panel-green dark:bg-dark-panel comic-hover"
              >
                <h4 className="font-display text-lg tracking-wide text-ink dark:text-paper mb-3">
                  LANGUAGES UNLOCKED
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Hindi</span>
                    <span className="px-2 py-0.5 bg-manga-yellow text-ink font-display text-xs">
                      NATIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">English</span>
                    <span className="px-2 py-0.5 bg-sky-blue text-ink font-display text-xs">
                      FLUENT
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Japanese</span>
                    <span className="px-2 py-0.5 bg-panel-pink text-ink font-display text-xs">
                      LEARNING
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="action-word text-manga-yellow text-6xl sm:text-8xl absolute bottom-0 right-8 rotate-[8deg] pointer-events-none"
        >
          LEVEL UP!
        </motion.span>
      </div>
    </section>
  );
}
