"use client";

import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";

export function EducationPanel() {
  return (
    <div className="h-full flex flex-col justify-center">
      <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-3 w-fit">
        TRAINING ARC
      </span>

      <h2 className="font-display text-3xl text-ink dark:text-paper flex items-center gap-2 mb-4">
        <GraduationCap className="h-6 w-6 text-sky-blue" />
        EDUCATION
      </h2>

      {education.map((edu) => (
        <div
          key={edu.school}
          className="comic-border rounded-sm p-4 bg-paper/50 dark:bg-dark-panel mb-3"
        >
          <span className="inline-block px-2 py-0.5 bg-sky-blue text-ink font-display text-xs tracking-wider mb-2">
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
        </div>
      ))}

      {/* Languages */}
      <div className="comic-border rounded-sm p-4 bg-panel-green/50 dark:bg-dark-panel">
        <h4 className="font-display text-base tracking-wide text-ink dark:text-paper mb-2">
          LANGUAGES UNLOCKED
        </h4>
        <div className="space-y-1.5">
          {[
            { lang: "Hindi", level: "NATIVE", color: "bg-manga-yellow" },
            { lang: "English", level: "FLUENT", color: "bg-sky-blue" },
            { lang: "Japanese", level: "LEARNING", color: "bg-panel-pink" },
          ].map((l) => (
            <div key={l.lang} className="flex items-center justify-between">
              <span className="font-bold text-sm text-ink dark:text-paper">
                {l.lang}
              </span>
              <span
                className={`px-2 py-0.5 ${l.color} text-ink font-display text-xs`}
              >
                {l.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
