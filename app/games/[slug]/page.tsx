import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Gamepad2,
  Play,
  Clock,
  Wrench,
  Tag,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { games } from "@/data/games";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return { title: "Game Not Found" };
  return {
    title: `${game.name} — Aashish Singhal`,
    description: game.description,
  };
}

const statusConfig = {
  playable: { label: "PLAYABLE", icon: Play, color: "bg-hero-green text-ink" },
  "coming-soon": { label: "COMING SOON", icon: Clock, color: "bg-manga-yellow text-ink" },
  "in-development": { label: "IN DEVELOPMENT", icon: Wrench, color: "bg-panel-pink text-ink" },
};

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  const status = statusConfig[game.status];
  const StatusIcon = status.icon;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-paper dark:bg-dark-bg">
        <div className="halftone-bg absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          {/* Back */}
          <Link
            href="/games"
            className="inline-flex items-center gap-2 font-display text-sm tracking-wide text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Games
          </Link>

          {/* Hero */}
          <div className="comic-panel-lg overflow-hidden mb-8">
            <div
              className="relative aspect-video bg-panel-blue dark:bg-dark-panel flex items-center justify-center"
            >
              {game.image ? (
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Gamepad2 className="h-24 w-24 text-ink/10 dark:text-paper/10" />
                  <span className="font-display text-lg tracking-wide text-ink/30 dark:text-paper/30">
                    SCREENSHOT COMING SOON
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Game info */}
          <div className="comic-panel p-6 sm:p-8 bg-paper dark:bg-dark-surface mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 font-display text-sm tracking-wider comic-border rounded-sm",
                  status.color
                )}
              >
                <StatusIcon className="h-4 w-4" />
                {status.label}
              </div>
              <span className="px-3 py-1 font-display text-sm tracking-wider comic-border rounded-sm bg-manga-yellow text-ink">
                {game.difficulty}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-ink dark:text-paper mb-4">
              {game.name}
            </h1>

            <p className="text-lg text-ink/80 dark:text-paper/80 mb-6 leading-relaxed">
              {game.longDescription}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-8">
              <Tag className="h-4 w-4 text-ink/40 dark:text-paper/40" />
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-bold bg-panel-green dark:bg-dark-panel border-2 border-ink/20 dark:border-paper/20 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {game.playUrl && (
                <a
                  href={game.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-hero-green text-ink font-display text-base tracking-wide comic-panel comic-hover"
                >
                  <ExternalLink className="h-5 w-5" />
                  PLAY NOW
                </a>
              )}
              {game.sourceUrl && (
                <a
                  href={game.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-paper dark:bg-dark-panel text-ink dark:text-paper font-display text-base tracking-wide comic-panel comic-hover"
                >
                  <Github className="h-5 w-5" />
                  SOURCE CODE
                </a>
              )}
              {!game.playUrl && !game.sourceUrl && (
                <div className="speech-bubble">
                  <p className="font-body text-ink dark:text-paper">
                    This game is still being built. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
