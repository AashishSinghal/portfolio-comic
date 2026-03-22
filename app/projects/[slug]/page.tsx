import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Star, Tag } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { projects } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — Aashish Singhal`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== slug && p.tags.some((t) => project.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-paper dark:bg-dark-bg">
        <div className="halftone-bg absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-display text-sm tracking-wide text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>

          {/* Hero image */}
          <div
            className="relative aspect-video comic-panel-lg overflow-hidden mb-8"
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
            {project.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-manga-yellow comic-border rounded-sm font-display text-sm tracking-wide">
                <Star className="h-4 w-4 text-ink fill-ink" />
                FEATURED
              </div>
            )}
          </div>

          {/* Project info */}
          <div className="comic-panel p-6 sm:p-8 bg-paper dark:bg-dark-surface mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-ink dark:text-paper mb-4">
              {project.name}
            </h1>

            <p className="text-lg text-ink/80 dark:text-paper/80 mb-6 leading-relaxed">
              {project.description || project.summary}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-8">
              <Tag className="h-4 w-4 text-ink/40 dark:text-paper/40" />
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-bold bg-panel-blue dark:bg-dark-panel border-2 border-ink/20 dark:border-paper/20 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.link.web}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-manga-yellow text-ink font-display text-base tracking-wide comic-panel comic-hover"
              >
                <ExternalLink className="h-5 w-5" />
                LIVE DEMO
              </a>
              <a
                href={project.link.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-paper dark:bg-dark-panel text-ink dark:text-paper font-display text-base tracking-wide comic-panel comic-hover"
              >
                <Github className="h-5 w-5" />
                SOURCE CODE
              </a>
            </div>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div>
              <h2 className="font-display text-2xl tracking-wide text-ink dark:text-paper mb-6">
                RELATED MISSIONS
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/projects/${r.slug}`}>
                    <div className="comic-panel p-4 bg-paper dark:bg-dark-surface comic-hover">
                      <div
                        className="relative h-28 overflow-hidden rounded-sm mb-3"
                        style={{ border: "2px solid var(--color-ink)" }}
                      >
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                      <h3 className="font-display text-base tracking-wide text-ink dark:text-paper">
                        {r.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
