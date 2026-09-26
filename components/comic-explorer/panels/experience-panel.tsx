"use client";

import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ExperiencePanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-2">
          CHAPTER 04
        </span>
        <h2 className="font-display text-3xl text-ink dark:text-paper flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-manga-yellow" />
          <span>
            BATTLE{" "}
            <span className="text-action-red text-comic-outline">LOG</span>
          </span>
        </h2>
      </div>

      <div className="relative flex-1 overflow-y-auto">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-ink/20 dark:bg-paper/20" />

        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div key={exp.company} className="relative pl-10">
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-[9px] top-3 h-4 w-4 rounded-full comic-border flex items-center justify-center z-10",
                  i === 0 ? "bg-manga-yellow" : "bg-paper dark:bg-dark-bg"
                )}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-ink" />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "comic-border rounded-sm p-3",
                  i === 0
                    ? "bg-panel-yellow/50 dark:bg-dark-panel"
                    : "bg-paper/50 dark:bg-dark-panel"
                )}
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-ink text-paper dark:bg-paper dark:text-ink font-display text-[10px] tracking-wider">
                    <Calendar className="h-2.5 w-2.5" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-ink/60 dark:text-paper/60">
                    <MapPin className="h-2.5 w-2.5" />
                    {exp.location}
                  </span>
                </div>
                <h4 className="font-display text-sm tracking-wide text-ink dark:text-paper">
                  {exp.role}
                </h4>
                <p className="font-display text-xs text-action-red tracking-wide mb-1">
                  @ {exp.company}
                </p>
                <p className="text-[11px] text-ink/70 dark:text-paper/70 mb-1">
                  {exp.summary}
                </p>

                {exp.highlights.length > 0 && (
                  <ul className="space-y-0.5">
                    {exp.highlights.slice(0, 3).map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-1 text-[10px] text-ink/80 dark:text-paper/80"
                      >
                        <ChevronRight className="h-3 w-3 text-manga-yellow shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
