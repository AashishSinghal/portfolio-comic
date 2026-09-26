"use client";

import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

export function ProjectsGridPanel() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <h2 className="font-display text-2xl text-ink dark:text-paper">
          MORE{" "}
          <span className="text-action-red text-comic-outline">MISSIONS</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 content-start">
        {rest.map((project) => (
          <div
            key={project.id}
            className="group comic-border rounded-sm p-3 bg-paper dark:bg-dark-panel comic-hover"
          >
            <h3 className="font-display text-xs tracking-wide text-ink dark:text-paper mb-1">
              {project.name}
            </h3>
            <p className="text-[10px] text-ink/70 dark:text-paper/70 line-clamp-2 mb-2">
              {project.summary}
            </p>
            <div className="flex gap-1.5">
              <a
                href={project.link.web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center bg-manga-yellow text-ink comic-border rounded-sm"
                aria-label={`Visit ${project.name}`}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={project.link.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center bg-paper dark:bg-dark-bg text-ink dark:text-paper comic-border rounded-sm"
                aria-label={`${project.name} source`}
              >
                <Github className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
