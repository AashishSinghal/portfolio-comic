"use client";

import { ExternalLink, Github, Star } from "lucide-react";
import { projects } from "@/data/portfolio";
import Image from "next/image";

export function ProjectsPanel() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-2">
          CHAPTER 03
        </span>
        <h2 className="font-display text-3xl text-ink dark:text-paper">
          TOP <span className="text-sky-blue text-comic-outline">MISSIONS</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-1">
        {featured.map((project) => (
          <div
            key={project.id}
            className="group comic-border rounded-sm overflow-hidden bg-paper dark:bg-dark-panel comic-hover flex flex-col"
          >
            <div
              className="relative h-32 overflow-hidden"
              style={{ borderBottom: "2px solid var(--color-ink)" }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="400px"
              />
              <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center bg-manga-yellow comic-border rounded-full">
                <Star className="h-3 w-3 text-ink fill-ink" />
              </div>
              <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <a
                  href={project.link.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center bg-manga-yellow text-ink comic-border rounded-sm"
                  aria-label={`Visit ${project.name}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={project.link.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center bg-paper text-ink comic-border rounded-sm"
                  aria-label={`${project.name} source`}
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="p-3 flex-1">
              <h3 className="font-display text-sm tracking-wide text-ink dark:text-paper mb-1">
                {project.name}
              </h3>
              <p className="text-xs text-ink/70 dark:text-paper/70 line-clamp-2 mb-2">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-[10px] font-bold bg-panel-blue dark:bg-dark-bg border border-ink/20 dark:border-paper/20 rounded-sm text-ink dark:text-paper"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
