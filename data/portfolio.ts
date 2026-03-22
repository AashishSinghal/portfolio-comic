/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ALL PORTFOLIO DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface Project {
  id: number;
  slug: string;
  image: string;
  name: string;
  summary: string;
  description?: string;
  tags: string[];
  link: { web: string; github: string };
  featured?: boolean;
}

export interface Skill {
  category: string;
  level: "Expert" | "Advanced" | "Intermediate";
  color: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  period: string;
  location: string;
}

export const projects: Project[] = [
  {
    id: 10,
    slug: "ai-detect",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aiDetect.png-zU5TcaxBUCAgbHi8zJviaOATHUk60u.jpeg",
    name: "AI Detect",
    summary: "An AI platform that detects objects on video feed with recording and screenshot capabilities, built with TensorFlowJS.",
    description: "AI Detect is a web-based AI platform that leverages TensorFlow.js to perform real-time object detection through your device's camera feed. Users can record video clips or take screenshots of detected objects. The application runs entirely in the browser — no server-side processing needed. Built with React and Next.js for a fast, responsive experience with TailwindCSS for the UI.",
    tags: ["TensorFlow.js", "AI/ML", "React", "Next.js"],
    link: { web: "https://ai-detect.aashishsinghal.com", github: "https://github.com/AashishSinghal/ai-detect" },
    featured: true,
  },
  {
    id: 1,
    slug: "alpha-exchange",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alphaexchange-Q0LS6M1okIgaN6UMan0wcIuUePARY1.png",
    name: "Alpha Exchange",
    summary: "Ethereum cryptocurrency exchange platform using React, Solidity smart contracts via Hardhat, with TailwindCSS.",
    description: "Alpha Exchange is a decentralized cryptocurrency exchange platform built on the Ethereum blockchain. It enables peer-to-peer trading of Ethereum using smart contracts written in Solidity and deployed via Hardhat. The frontend is built with React and TailwindCSS, offering a clean interface for connecting wallets, sending crypto, and viewing transaction history on the blockchain.",
    tags: ["Web3", "Solidity", "React", "Ethereum"],
    link: { web: "https://alpha-exchange.netlify.app", github: "https://github.com/AashishSinghal/alpha_web3.0" },
    featured: true,
  },
  {
    id: 2,
    slug: "cryptowatch",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoApp-fiOBG8FqtE1SLcbbfHYcLq8AhUZs9h.png",
    name: "CryptoWatch",
    summary: "Cryptocurrency tracking app built with React, Redux Toolkit, and Rapid API with a clean dashboard UI.",
    description: "CryptoWatch is a real-time cryptocurrency tracking dashboard that provides live prices, market caps, 24h volume, and price history charts for hundreds of cryptocurrencies. Built with React for the UI, Redux Toolkit for state management, and powered by the CoinRanking API through Rapid API. Features include search, sorting, filtering, and detailed coin statistics.",
    tags: ["React", "Redux", "TypeScript", "API"],
    link: { web: "https://crypto-app-via-rapid-api.netlify.app", github: "https://github.com/AashishSinghal/crypto-app" },
    featured: true,
  },
  {
    id: 11,
    slug: "whatsapp-clone",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Clone-5IxHxdm8lnZVawJXx995xSmia0CzqF.png",
    name: "WhatsApp Clone",
    summary: "Full-featured WhatsApp Web clone with real-time chat, user authentication, and modern web tech stack.",
    description: "A full-featured WhatsApp Web clone with Google authentication, real-time messaging powered by Firebase Firestore, online/offline status indicators, and a responsive UI that mirrors the original WhatsApp design. Supports creating new chats, sending messages in real-time, and persistent chat history.",
    tags: ["React", "Firebase", "Real-time", "Auth"],
    link: { web: "https://whatsapp-clone.aashishsinghal.com", github: "https://github.com/AashishSinghal/whatsapp-clone" },
  },
  {
    id: 12,
    slug: "telegram-clone",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Telegram-Clone-TjMz6fAcxAwhjY7FbuUJNvVD42LwlF.png",
    name: "Telegram Clone",
    summary: "Telegram Web clone implementing core messaging features with the iconic Telegram design language.",
    description: "A Telegram Web clone that replicates the iconic Telegram design language with core messaging features. Built with React and TypeScript, featuring WebSocket-based real-time communication, user authentication, message history, and a pixel-perfect recreation of Telegram's UI including the sidebar, chat view, and message bubbles.",
    tags: ["React", "TypeScript", "WebSockets", "UI/UX"],
    link: { web: "https://telegram-clone.aashishsinghal.com", github: "https://github.com/AashishSinghal/telegram-clone" },
  },
  {
    id: 3,
    slug: "blog-platform",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog-4Kl5pfuF3VXL2p19Lq6WvJAVj2kcyu.png",
    name: "Blog Platform",
    summary: "Next.js blog with Tailwind, TypeScript, GraphQL, and GraphCMS for dynamic content management.",
    description: "A modern blogging platform built with Next.js, TailwindCSS, and TypeScript. Content is managed through GraphCMS (Hygraph) and fetched via GraphQL at build time for blazing-fast static pages. Features include rich text rendering, featured images, author profiles, categories, and SEO-optimized pages with ISR (Incremental Static Regeneration).",
    tags: ["Next.js", "GraphQL", "CMS", "TypeScript"],
    link: { web: "https://cms-blog-seven.vercel.app", github: "https://github.com/AashishSinghal/cms_blog" },
  },
  {
    id: 6,
    slug: "file-encryptor",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fileEncryptor-3dkRFqpqBxKse9LejFm7ufZstTA2xg.png",
    name: "File Encryptor",
    summary: "ElectronJS desktop app for file encryption using AES algorithm. Download and try the executable!",
    description: "File Encryptor is a cross-platform desktop application built with Electron.js that provides AES-256 encryption for files. Users can encrypt and decrypt any file type with a password. The app features a clean drag-and-drop interface, progress indicators, and generates encrypted files that can only be unlocked with the correct password. Available as a downloadable executable.",
    tags: ["Electron", "AES", "JavaScript", "Desktop"],
    link: { web: "https://drive.google.com/file/d/1gwp8YrGQ85HXnRWJfP1RHAGB7qmzmyXT/view?usp=sharing", github: "https://github.com/AashishSinghal/file-encryptor" },
  },
  {
    id: 13,
    slug: "github-user-search",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/searchUser-Um4Slf8iAccPOF49Jk6iunnR74lKkr.png",
    name: "GitHub User Search",
    summary: "Advanced GitHub user search with detailed profile analytics, repository insights, and data visualization.",
    description: "An advanced GitHub user search tool that goes beyond the basic profile view. Search any GitHub username to see detailed analytics including repository language breakdown with Fusion Charts, follower/following stats, contribution activity, most starred repos, and more. Built with React and the GitHub REST API with beautiful data visualizations.",
    tags: ["React", "GitHub API", "Charts", "TypeScript"],
    link: { web: "https://github-user-search.aashishsinghal.com", github: "https://github.com/AashishSinghal/github-user-search" },
  },
  {
    id: 9,
    slug: "flappy-bird",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlappyBird-7lFXc5iGfUPhKym0Eu0EwPd4MJoolt.png",
    name: "Flappy Bird",
    summary: "Classic Flappy Bird game recreated for the web using vanilla JavaScript.",
    description: "A faithful recreation of the classic Flappy Bird mobile game, built entirely with vanilla JavaScript, HTML5 Canvas, and CSS. Features include gravity physics, pipe generation with randomized gaps, score tracking, collision detection, and game-over/restart mechanics. A fun exercise in game development fundamentals without any frameworks.",
    tags: ["JavaScript", "HTML5", "CSS3", "Game"],
    link: { web: "https://flabby-bird-using-js.netlify.app/", github: "https://github.com/AashishSinghal/FlappyBird-in-JS" },
  },
];

export const skills: Skill[] = [
  {
    category: "Frontend Frameworks",
    level: "Expert",
    color: "manga-yellow",
    items: ["React", "Next.js", "Redux", "TailwindCSS", "React Native"],
  },
  {
    category: "Languages",
    level: "Advanced",
    color: "sky-blue",
    items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "Bash"],
  },
  {
    category: "Backend",
    level: "Advanced",
    color: "action-red",
    items: ["Node.js", "Express.js", "GraphQL", "Spring Boot", "REST APIs"],
  },
  {
    category: "Databases",
    level: "Advanced",
    color: "hero-green",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "PlanetScale"],
  },
  {
    category: "DevOps & Cloud",
    level: "Intermediate",
    color: "sky-blue",
    items: ["AWS", "Docker", "Nginx", "PM2", "Git", "GitHub Actions"],
  },
  {
    category: "Cross Platform",
    level: "Intermediate",
    color: "manga-yellow",
    items: ["React Native", "Electron", "Firebase", "Cordova"],
  },
];

export const experience: Experience[] = [
  {
    company: "Nutanix Technologies",
    role: "Member of Technical Staff 2",
    period: "Jan 2022 — Present",
    location: "Bangalore, India",
    type: "Hybrid",
    summary: "Building high-performance web apps for the Sales Portal — feature development, UI improvements, and system integrations.",
    highlights: [
      "Delivered 2 new projects with 3 quote types, reducing manual effort by 60%",
      "Led front-end migration to in-house UI library, cutting deploy errors by 40%",
      "Built Feature Flag Management Portal, reducing production errors by 50%",
      "Designed User Permission Manager and Bulk Edit functionality",
    ],
  },
  {
    company: "Celebal Technologies",
    role: "Full Stack Developer",
    period: "Jan 2021 — Nov 2021",
    location: "Jaipur, India",
    type: "Hybrid",
    summary: "MERN stack development with TypeScript, Microsoft Teams integrations, and mentoring junior developers.",
    highlights: [
      "Architected Order Management Portal for Teams App Store",
      "Built in-house HR Management Portal, boosting performance by 40%",
      "Reduced UI load time by 40%, increasing user satisfaction by 25%",
      "Mentored interns, reducing deployment time by 30%",
    ],
  },
  {
    company: "SFITY India LLP",
    role: "ReactJS Developer Intern",
    period: "Dec 2020 — Jan 2021",
    location: "Jaipur, India",
    type: "Remote",
    summary: "Developed web pages from UI designs and implemented animations using React and Next.js.",
    highlights: [],
  },
  {
    company: "Innofarms, SNL Innovations",
    role: "Front-End Developer & UI Designer Intern",
    period: "May 2020 — Jul 2020",
    location: "Jaipur, India",
    type: "Remote",
    summary: "UI/UX for a hybrid mobile app using Angular, Cordova, and Adobe XD.",
    highlights: [],
  },
];

export const education: Education[] = [
  {
    school: "Poornima College of Engineering",
    degree: "Bachelor's Degree",
    field: "Computer Science & Engineering",
    period: "2017 — 2021",
    location: "Jaipur, India",
  },
];

export const socialLinks = {
  github: "https://github.com/AashishSinghal",
  linkedin: "https://linkedin.com/in/aashishsinghal",
  twitter: "https://twitter.com/aashish_singhal",
  email: "mailto:aashishsinghalpro@gmail.com",
};

export const aboutText = `Hey there! I'm Aashish Singhal — a designer, developer, and all-around code alchemist. I've been turning caffeine into clean code for 4+ years, specializing in React, Next.js, and full-stack JavaScript. When I'm not shipping features at Nutanix, I'm probably building side projects, experimenting with AI, or learning Japanese on Duolingo.`;
