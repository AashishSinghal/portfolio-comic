"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  PANELS,
  SCROLL_STOPS,
  ACTION_WORDS,
  CANVAS_W,
  CANVAS_H,
  getCameraForPanel,
  getCameraZoomedOut,
} from "./config";
import { ComicPanel } from "./comic-panel";
import { ComicMinimap } from "./comic-minimap";
import { ComicPanelDots } from "./comic-panel-dots";
import { ComicActionWord } from "./comic-action-word";
import { ComicCursorTrail } from "./comic-cursor-trail";
import { HeroPanel } from "./panels/hero-panel";
import { AboutPanel } from "./panels/about-panel";
import { SkillsPanel } from "./panels/skills-panel";
import { ProjectsPanel } from "./panels/projects-panel";
import { ProjectsGridPanel } from "./panels/projects-grid-panel";
import { ExperiencePanel } from "./panels/experience-panel";
import { EducationPanel } from "./panels/education-panel";
import { ContactPanel } from "./panels/contact-panel";
import { Sun, Moon, Map } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const PANEL_CONTENT: Record<string, React.FC> = {
  hero: HeroPanel,
  about: AboutPanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  "projects-more": ProjectsGridPanel,
  experience: ExperiencePanel,
  education: EducationPanel,
  contact: ContactPanel,
};

interface ComicCanvasProps {
  ready: boolean;
}

export function ComicCanvas({ ready }: ComicCanvasProps) {
  const { scrollYProgress } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Camera targets for each scroll stop
  const targets = useMemo(() => {
    const out = getCameraZoomedOut(dims.w, dims.h);
    return [
      out,
      ...PANELS.map((p) => getCameraForPanel(p, dims.w, dims.h)),
      out,
    ];
  }, [dims]);

  const cameraX = useTransform(
    scrollYProgress,
    SCROLL_STOPS,
    targets.map((t) => t.x)
  );
  const cameraY = useTransform(
    scrollYProgress,
    SCROLL_STOPS,
    targets.map((t) => t.y)
  );
  const cameraScale = useTransform(
    scrollYProgress,
    SCROLL_STOPS,
    targets.map((t) => t.scale)
  );

  // Track which panel is currently in focus
  const [activePanel, setActivePanel] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      let closest = 0;
      let minDist = Infinity;
      for (let i = 1; i < SCROLL_STOPS.length - 1; i++) {
        const dist = Math.abs(v - SCROLL_STOPS[i]);
        if (dist < minDist) {
          minDist = dist;
          closest = i - 1;
        }
      }
      setActivePanel(closest);
    });
    return unsub;
  }, [scrollYProgress]);

  // Scroll to a panel by index
  const scrollToPanel = useCallback((panelIndex: number) => {
    const stop = SCROLL_STOPS[panelIndex + 1]; // +1 because 0 = zoomed out
    const totalScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: stop * totalScroll, behavior: "smooth" });
  }, []);

  const scrollToOverview = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!ready) return;

    const handleKey = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case "ArrowDown":
        case " ":
          e.preventDefault();
          scrollToPanel(Math.min(activePanel + 1, PANELS.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          scrollToPanel(Math.max(activePanel - 1, 0));
          break;
        case "Home":
          e.preventDefault();
          scrollToPanel(0);
          break;
        case "End":
          e.preventDefault();
          scrollToPanel(PANELS.length - 1);
          break;
        case "Escape":
          e.preventDefault();
          scrollToOverview();
          break;
        default:
          if (e.key >= "1" && e.key <= "8") {
            e.preventDefault();
            scrollToPanel(parseInt(e.key) - 1);
          }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [ready, activePanel, scrollToPanel, scrollToOverview]);

  // Konami code easter egg
  useEffect(() => {
    const code = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let pos = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === code[pos]) {
        pos++;
        if (pos === code.length) {
          pos = 0;
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 4000);
        }
      } else {
        pos = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const [konamiActive, setKonamiActive] = useState(false);

  return (
    <>
      {/* Scroll spacer */}
      <div style={{ height: "600vh" }} aria-hidden="true" />

      {/* Fixed viewport */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 10 }}>
        <motion.div
          style={{
            x: cameraX,
            y: cameraY,
            scale: cameraScale,
            width: CANVAS_W,
            height: CANVAS_H,
            transformOrigin: "0 0",
          }}
          className="will-change-transform"
        >
          {/* Canvas background */}
          <div className="absolute inset-0 bg-paper dark:bg-dark-bg" />
          <div className="halftone-bg absolute inset-0" />

          {/* Panels */}
          {PANELS.map((panel) => {
            const Content = PANEL_CONTENT[panel.id];
            return (
              <ComicPanel key={panel.id} config={panel}>
                {Content && <Content />}
              </ComicPanel>
            );
          })}

          {/* Action words */}
          {ACTION_WORDS.map((word) => (
            <ComicActionWord key={word.text} {...word} />
          ))}

          {/* Easter egg panel - hidden origin story */}
          <EasterPanel />
        </motion.div>
      </div>

      {/* Konami code reward */}
      {konamiActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 5 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-center"
          >
            <span
              className="font-display text-6xl sm:text-8xl text-manga-yellow block"
              style={{
                WebkitTextStroke: "3px #0D0D0D",
                paintOrder: "stroke fill",
                filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.5))",
              }}
            >
              SECRET LEVEL
            </span>
            <span
              className="font-display text-4xl sm:text-6xl text-action-red block mt-2"
              style={{
                WebkitTextStroke: "2px #0D0D0D",
                paintOrder: "stroke fill",
              }}
            >
              UNLOCKED!
            </span>
          </motion.div>
        </div>
      )}

      {/* Navigation overlay */}
      {ready && (
        <>
          <ComicMinimap
            activePanel={activePanel}
            onPanelClick={scrollToPanel}
            scrollProgress={scrollYProgress}
          />
          <ComicPanelDots
            activePanel={activePanel}
            onPanelClick={scrollToPanel}
          />

          {/* Floating controls (top-left) */}
          <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
            <button
              onClick={scrollToOverview}
              className="flex items-center gap-2 px-3 py-2 bg-paper dark:bg-dark-surface comic-border rounded-sm font-display text-sm tracking-wide comic-hover text-ink dark:text-paper"
              aria-label="View full map"
            >
              <Map className="h-4 w-4" />
              MAP
            </button>
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="flex h-10 w-10 items-center justify-center comic-border rounded-sm bg-manga-yellow/20 dark:bg-manga-yellow/10 comic-hover"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-manga-yellow" />
                ) : (
                  <Moon className="h-5 w-5 text-ink" />
                )}
              </button>
            )}
            {/* Sub-page links */}
            <div className="flex flex-col gap-1 mt-1">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Projects", href: "/projects" },
                { label: "Games", href: "/games" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 bg-paper dark:bg-dark-surface comic-border rounded-sm font-display text-xs tracking-wide comic-hover text-ink dark:text-paper text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <ComicCursorTrail />
        </>
      )}
    </>
  );
}

/* Hidden easter egg panel — appears on hover of empty area */
function EasterPanel() {
  const [visible, setVisible] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  return (
    <div
      className="absolute"
      style={{ left: 3200, top: 300, width: 400, height: 300 }}
      onMouseEnter={() => {
        const timer = setTimeout(() => setVisible(true), 3000);
        setHoverTimer(timer);
      }}
      onMouseLeave={() => {
        if (hoverTimer) clearTimeout(hoverTimer);
        setHoverTimer(null);
      }}
    >
      {visible && (
        <motion.div
          initial={{ scale: 0, rotate: 10 }}
          animate={{ scale: 1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full h-full comic-panel-lg bg-panel-yellow dark:bg-dark-surface p-6 overflow-hidden"
        >
          <div className="halftone-bg absolute inset-0 pointer-events-none" />
          <div className="relative z-10">
            <span className="font-display text-xs tracking-widest text-ink/50 dark:text-paper/50">
              SECRET ORIGIN
            </span>
            <h3 className="font-display text-2xl text-ink dark:text-paper mb-2">
              THE BACKSTORY
            </h3>
            <p className="font-body text-sm text-ink/80 dark:text-paper/80 leading-relaxed">
              Before the code, there was curiosity. A kid in Jaipur who took
              apart every gadget he could find, built his first website at 16,
              and never looked back. The journey from &quot;Hello World&quot; to
              shipping production apps at scale has been one epic adventure.
            </p>
            <span className="action-word text-action-red text-2xl absolute -bottom-1 -right-1 rotate-[12deg] opacity-30">
              ORIGIN!
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
