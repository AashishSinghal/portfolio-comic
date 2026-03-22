import Link from "next/link";
import { Calendar, User, Tag } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog — Aashish Singhal",
  description: "Thoughts on web development, React, and the coding life.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-paper dark:bg-dark-bg">
        <div className="halftone-bg absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            chapter="BLOG"
            title="THE"
            highlight="SCROLL"
            highlightColor="text-action-red"
            subtitle="Thoughts, tutorials, and lessons learned on my coding adventures."
          />

          <div className="space-y-6 pb-24">
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  className="comic-panel p-6 bg-paper dark:bg-dark-surface comic-hover group"
                  style={{ transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)` }}
                >
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-paper dark:bg-paper dark:text-ink font-display text-xs tracking-wider">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-ink/50 dark:text-paper/50">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl tracking-wide text-ink dark:text-paper mb-2 group-hover:text-action-red transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-ink/70 dark:text-paper/70 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-3.5 w-3.5 text-ink/40 dark:text-paper/40" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-bold bg-panel-blue dark:bg-dark-panel border border-ink/20 dark:border-paper/20 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="comic-panel p-12 text-center bg-panel-yellow dark:bg-dark-panel">
                <p className="font-display text-2xl text-ink dark:text-paper mb-2">
                  NO POSTS YET!
                </p>
                <p className="text-ink/60 dark:text-paper/60">
                  Check back soon — new content is on the way.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
