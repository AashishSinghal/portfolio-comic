import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Star } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { projects } from "@/data/portfolio";

export const metadata = {
  title: "Projects — Aashish Singhal",
  description: "All projects built and shipped by Aashish Singhal.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-paper dark:bg-dark-bg">
        <div className="halftone-bg absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            chapter="PROJECTS"
            title="ALL"
            highlight="MISSIONS"
            highlightColor="text-sky-blue"
            subtitle="Every project I've built, shipped, and unleashed upon the world."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <article
                  className="comic-panel overflow-hidden bg-paper dark:bg-dark-surface comic-hover h-full flex flex-col"
                  style={{ transform: `rotate(${i % 3 === 0 ? -0.5 : i % 3 === 1 ? 0 : 0.5}deg)` }}
                >
                  <div
                    className="relative h-48 overflow-hidden"
                    style={{ borderBottom: "3px solid var(--color-ink)" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-manga-yellow comic-border rounded-full">
                        <Star className="h-3.5 w-3.5 text-ink fill-ink" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-display text-xl tracking-wide text-ink dark:text-paper mb-2 group-hover:text-action-red transition-colors">
                      {project.name}
                    </h2>
                    <p className="text-sm text-ink/70 dark:text-paper/70 mb-4 line-clamp-2 flex-1">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-bold bg-panel-blue dark:bg-dark-panel border border-ink/20 dark:border-paper/20 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
