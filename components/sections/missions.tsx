"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github, Star, ChevronDown, ChevronUp } from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MissionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const displayProjects = showAll ? projects : featured;

  return (
    <section id="missions" className="relative py-24 bg-paper dark:bg-dark-bg">
      <div className="halftone-bg absolute inset-0" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-4">
            CHAPTER 03
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink dark:text-paper">
            MY <span className="text-sky-blue text-comic-outline">MISSIONS</span>
          </h2>
          <p className="mt-4 text-ink/60 dark:text-paper/60 font-body text-lg max-w-md mx-auto">
            Projects I&apos;ve built, shipped, and unleashed upon the world
          </p>
        </motion.div>

        {/* Project cards — asymmetric comic panel grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                "group comic-panel overflow-hidden comic-hover bg-paper dark:bg-dark-surface",
                i === 0 && "lg:col-span-2 lg:row-span-2",
              )}
            >
              {/* Project image */}
              <div
                className={cn(
                  "relative overflow-hidden border-b-3 border-ink",
                  i === 0 ? "h-64 lg:h-80" : "h-48"
                )}
                style={{ borderBottom: "3px solid var(--color-ink)" }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />

                {/* Featured star badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center bg-manga-yellow comic-border rounded-full">
                    <Star className="h-4 w-4 text-ink fill-ink" />
                  </div>
                )}

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a
                    href={project.link.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center bg-manga-yellow text-ink comic-border rounded-sm comic-hover"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={project.link.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center bg-paper text-ink comic-border rounded-sm comic-hover"
                    aria-label={`${project.name} source`}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Project info */}
              <div className="p-5">
                <h3 className="font-display text-xl tracking-wide text-ink dark:text-paper mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-ink/70 dark:text-paper/70 mb-4 line-clamp-2">
                  {project.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-bold font-body bg-panel-blue dark:bg-dark-panel border border-ink/20 dark:border-paper/20 rounded-sm text-ink dark:text-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more / less */}
        {rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 font-display text-lg tracking-wide comic-panel bg-paper dark:bg-dark-surface text-ink dark:text-paper comic-hover"
            >
              {showAll ? (
                <>
                  SHOW LESS <ChevronUp className="h-5 w-5" />
                </>
              ) : (
                <>
                  ALL MISSIONS ({projects.length}) <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Decorative */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ delay: 0.6, type: "spring" }}
          className="action-word text-sky-blue text-6xl sm:text-8xl absolute top-8 -left-4 rotate-[-10deg] pointer-events-none"
        >
          BOOM!
        </motion.span>
      </div>
    </section>
  );
}
