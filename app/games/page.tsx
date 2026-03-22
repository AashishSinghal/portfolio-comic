import Link from "next/link";
import Image from "next/image";
import { Gamepad2, Play, Clock, Wrench } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { games } from "@/data/games";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Games — Aashish Singhal",
  description: "Browser games and interactive experiments by Aashish Singhal.",
};

const statusConfig = {
  playable: { label: "PLAY NOW", icon: Play, color: "bg-hero-green text-ink" },
  "coming-soon": { label: "COMING SOON", icon: Clock, color: "bg-manga-yellow text-ink" },
  "in-development": { label: "IN DEV", icon: Wrench, color: "bg-panel-pink text-ink" },
};

const difficultyColor = {
  Easy: "bg-hero-green",
  Medium: "bg-manga-yellow",
  Hard: "bg-action-red text-paper",
};

export default function GamesPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-paper dark:bg-dark-bg">
        <div className="halftone-bg absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            chapter="GAMES"
            title="THE"
            highlight="ARCADE"
            highlightColor="text-hero-green"
            subtitle="Browser games and interactive experiments. Play them right in your browser!"
          />

          <div className="grid sm:grid-cols-2 gap-6 pb-24">
            {games.map((game, i) => {
              const status = statusConfig[game.status];
              const StatusIcon = status.icon;

              return (
                <Link key={game.slug} href={`/games/${game.slug}`}>
                  <article
                    className="comic-panel overflow-hidden bg-paper dark:bg-dark-surface comic-hover h-full flex flex-col group"
                    style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
                  >
                    {/* Image or placeholder */}
                    <div
                      className="relative h-44 overflow-hidden bg-panel-blue dark:bg-dark-panel flex items-center justify-center"
                      style={{ borderBottom: "3px solid var(--color-ink)" }}
                    >
                      {game.image ? (
                        <Image
                          src={game.image}
                          alt={game.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      ) : (
                        <Gamepad2 className="h-16 w-16 text-ink/10 dark:text-paper/10" />
                      )}

                      {/* Status badge */}
                      <div
                        className={cn(
                          "absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 font-display text-xs tracking-wider comic-border rounded-sm",
                          status.color
                        )}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {status.label}
                      </div>

                      {/* Difficulty */}
                      <div
                        className={cn(
                          "absolute top-3 right-3 px-2 py-0.5 font-display text-xs tracking-wider comic-border rounded-sm",
                          difficultyColor[game.difficulty]
                        )}
                      >
                        {game.difficulty}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-display text-2xl tracking-wide text-ink dark:text-paper mb-2 group-hover:text-hero-green transition-colors">
                        {game.name}
                      </h2>
                      <p className="text-sm text-ink/70 dark:text-paper/70 mb-4 flex-1">
                        {game.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {game.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-bold bg-panel-green dark:bg-dark-panel border border-ink/20 dark:border-paper/20 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
