/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMIC EXPLORER — Panel & Camera Config
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface PanelConfig {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  color: string;
}

export const CANVAS_W = 4000;
export const CANVAS_H = 3500;

export const PANELS: PanelConfig[] = [
  { id: "hero", label: "Origin Story", x: 1400, y: 100, width: 1100, height: 700, rotate: -1, color: "paper" },
  { id: "about", label: "About Me", x: 400, y: 50, width: 700, height: 500, rotate: 2, color: "panel-blue" },
  { id: "skills", label: "Powers", x: 100, y: 800, width: 1100, height: 850, rotate: -1.5, color: "panel-yellow" },
  { id: "projects", label: "Missions", x: 1300, y: 1000, width: 1200, height: 700, rotate: 1, color: "panel-green" },
  { id: "projects-more", label: "More Missions", x: 2700, y: 700, width: 800, height: 550, rotate: -2, color: "panel-pink" },
  { id: "experience", label: "Battle Log", x: 200, y: 1900, width: 1000, height: 900, rotate: 1.5, color: "panel-blue" },
  { id: "education", label: "Training Arc", x: 1400, y: 2100, width: 650, height: 500, rotate: -1, color: "panel-pink" },
  { id: "contact", label: "Signal", x: 2400, y: 1900, width: 900, height: 600, rotate: 2, color: "panel-yellow" },
];

/* scrollYProgress stops: [zoomed-out, hero, about, skills, projects, projects-more, experience, education, contact, zoomed-out] */
export const SCROLL_STOPS = [0, 0.05, 0.18, 0.30, 0.44, 0.54, 0.66, 0.76, 0.88, 1.0];

export const ACTION_WORDS = [
  { text: "WHOOSH!", x: 2650, y: 480, rotate: 12, color: "text-manga-yellow", size: "text-7xl" },
  { text: "POW!", x: 1250, y: 830, rotate: -8, color: "text-action-red", size: "text-8xl" },
  { text: "ZAP!", x: 2200, y: 1650, rotate: 15, color: "text-sky-blue", size: "text-6xl" },
  { text: "BOOM!", x: 800, y: 1700, rotate: -12, color: "text-hero-green", size: "text-7xl" },
  { text: "CRACK!", x: 3400, y: 1400, rotate: 6, color: "text-manga-yellow", size: "text-5xl" },
];

export function getCameraForPanel(p: PanelConfig, vw: number, vh: number) {
  const cx = p.x + p.width / 2;
  const cy = p.y + p.height / 2;
  const pad = 0.82;
  const scale = Math.min((vw * pad) / p.width, (vh * pad) / p.height, 1.15);
  return { x: vw / 2 - cx * scale, y: vh / 2 - cy * scale, scale };
}

export function getCameraZoomedOut(vw: number, vh: number) {
  const pad = 0.9;
  const scale = Math.min((vw * pad) / CANVAS_W, (vh * pad) / CANVAS_H);
  const cx = CANVAS_W / 2;
  const cy = CANVAS_H / 2;
  return { x: vw / 2 - cx * scale, y: vh / 2 - cy * scale, scale };
}
