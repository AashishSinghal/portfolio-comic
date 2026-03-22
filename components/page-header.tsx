"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface PageHeaderProps {
  chapter: string;
  title: string;
  highlight: string;
  highlightColor?: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({
  chapter,
  title,
  highlight,
  highlightColor = "text-manga-yellow",
  subtitle,
  backHref = "/",
  backLabel = "Home",
}: PageHeaderProps) {
  return (
    <div className="pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-display text-sm tracking-wide text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-4">
          {chapter}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink dark:text-paper leading-tight">
          {title}{" "}
          <span className={`${highlightColor} text-comic-outline`}>
            {highlight}
          </span>
        </h1>
        {subtitle && (
          <p className="mt-4 text-ink/60 dark:text-paper/60 font-body text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
