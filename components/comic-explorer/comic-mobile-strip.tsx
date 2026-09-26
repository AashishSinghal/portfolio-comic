"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { PANELS } from "./config";
import { HeroPanel } from "./panels/hero-panel";
import { AboutPanel } from "./panels/about-panel";
import { SkillsPanel } from "./panels/skills-panel";
import { ProjectsPanel } from "./panels/projects-panel";
import { ProjectsGridPanel } from "./panels/projects-grid-panel";
import { ExperiencePanel } from "./panels/experience-panel";
import { EducationPanel } from "./panels/education-panel";
import { ContactPanel } from "./panels/contact-panel";

const PANEL_COMPONENTS: Record<string, React.FC> = {
  hero: HeroPanel,
  about: AboutPanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  "projects-more": ProjectsGridPanel,
  experience: ExperiencePanel,
  education: EducationPanel,
  contact: ContactPanel,
};

const colorMap: Record<string, string> = {
  paper: "bg-paper dark:bg-dark-surface",
  "panel-blue": "bg-panel-blue dark:bg-dark-surface",
  "panel-yellow": "bg-panel-yellow dark:bg-dark-surface",
  "panel-green": "bg-panel-green dark:bg-dark-surface",
  "panel-pink": "bg-panel-pink dark:bg-dark-surface",
};

const heightMap: Record<string, number> = {
  hero: 520,
  about: 420,
  skills: 620,
  projects: 520,
  "projects-more": 420,
  experience: 640,
  education: 480,
  contact: 440,
};

const mobileActionWords = [
  { text: "WHOOSH!", color: "text-manga-yellow" },
  { text: "POW!", color: "text-action-red" },
  { text: "ZAP!", color: "text-sky-blue" },
  { text: "BOOM!", color: "text-hero-green" },
  { text: "CRACK!", color: "text-manga-yellow" },
  { text: "KAPOW!", color: "text-action-red" },
  { text: "WHAM!", color: "text-sky-blue" },
];

function MobilePanel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Content = PANEL_COMPONENTS[panel.id];
  const rotate = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className={`mx-3 comic-panel-lg overflow-hidden ${colorMap[panel.color]}`}
      style={{ transform: `rotate(${rotate}deg)`, minHeight: heightMap[panel.id] || 400 }}
      role="region"
      aria-label={panel.label}
    >
      <div className="halftone-bg absolute inset-0 pointer-events-none" />
      <div className="relative z-10 p-5">{Content && <Content />}</div>
    </motion.div>
  );
}

export function ComicMobileStrip() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-dark-bg pb-16">
      {/* Floating theme toggle */}
      <div className="fixed top-3 right-3 z-50">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center comic-border rounded-sm bg-paper dark:bg-dark-surface comic-hover"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-manga-yellow" />
            ) : (
              <Moon className="h-5 w-5 text-ink" />
            )}
          </button>
        )}
      </div>

      <div className="py-4 space-y-3">
        {PANELS.map((panel, i) => (
          <div key={panel.id}>
            <MobilePanel panel={panel} index={i} />
            {i < PANELS.length - 1 && mobileActionWords[i] && (
              <div className="text-center py-2">
                <span
                  className={`action-word ${mobileActionWords[i].color} text-3xl opacity-15`}
                  style={{
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 5}deg)`,
                    display: "inline-block",
                  }}
                  aria-hidden="true"
                >
                  {mobileActionWords[i].text}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-paper dark:bg-dark-surface"
        style={{ borderTop: "3px solid var(--color-ink)" }}
      >
        <div className="flex justify-around py-2">
          {[
            { label: "Hero", panel: "hero" },
            { label: "Skills", panel: "skills" },
            { label: "Work", panel: "projects" },
            { label: "XP", panel: "experience" },
            { label: "Contact", panel: "contact" },
          ].map((tab) => (
            <button
              key={tab.panel}
              onClick={() => {
                const panelCfg = PANELS.find((p) => p.id === tab.panel);
                if (panelCfg) {
                  const el = document.querySelector(
                    `[aria-label="${panelCfg.label}"]`
                  );
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="flex flex-col items-center gap-0.5 px-2 py-1 font-display text-[10px] tracking-wider text-ink dark:text-paper"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
