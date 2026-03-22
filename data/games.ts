export interface Game {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  playUrl?: string;
  sourceUrl?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "playable" | "coming-soon" | "in-development";
}

export const games: Game[] = [
  {
    slug: "flappy-bird",
    name: "Flappy Bird",
    description: "The classic Flappy Bird game recreated for the web with vanilla JS.",
    longDescription:
      "Navigate your bird through an endless series of pipes by tapping to flap. Built entirely with vanilla JavaScript and HTML5 Canvas — no frameworks, no libraries, just pure JS game dev. Features gravity physics, randomized pipe gaps, score tracking, and collision detection. How far can you fly?",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlappyBird-7lFXc5iGfUPhKym0Eu0EwPd4MJoolt.png",
    tags: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Physics"],
    playUrl: "https://flabby-bird-using-js.netlify.app/",
    sourceUrl: "https://github.com/AashishSinghal/FlappyBird-in-JS",
    difficulty: "Medium",
    status: "playable",
  },
  {
    slug: "tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Classic Tic Tac Toe with an unbeatable AI opponent using minimax algorithm.",
    longDescription:
      "A polished Tic Tac Toe game featuring both two-player and single-player modes. The AI opponent uses the minimax algorithm to play optimally — can you beat it? Features clean animations, score tracking across rounds, and a responsive design that works great on mobile.",
    image: "",
    tags: ["React", "TypeScript", "Minimax", "Game AI"],
    difficulty: "Easy",
    status: "coming-soon",
  },
  {
    slug: "snake-game",
    name: "Snake",
    description: "The retro Snake game with modern web tech, power-ups, and leaderboards.",
    longDescription:
      "A modern take on the classic Snake game. Eat food to grow longer, but don't hit yourself or the walls! This version adds power-ups (speed boost, slow-mo, ghost mode), multiple difficulty levels, and a local leaderboard. Built with HTML5 Canvas and vanilla TypeScript.",
    image: "",
    tags: ["TypeScript", "Canvas", "Game Dev", "Local Storage"],
    difficulty: "Medium",
    status: "coming-soon",
  },
  {
    slug: "memory-match",
    name: "Memory Match",
    description: "A card-flipping memory game with comic-book themed cards and timed challenges.",
    longDescription:
      "Test your memory with this card-matching game featuring comic-book themed artwork. Flip cards to find matching pairs before the timer runs out. Multiple difficulty levels increase the grid size and reduce time. Features smooth flip animations, streak bonuses, and personal best tracking.",
    image: "",
    tags: ["React", "CSS Animations", "Game Design"],
    difficulty: "Easy",
    status: "in-development",
  },
];
