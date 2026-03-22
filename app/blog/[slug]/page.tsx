import { notFound } from "next/navigation";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/navbar";
import { getPostBySlug, getAllSlugs } from "@/lib/mdx";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Aashish Singhal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-paper dark:bg-dark-bg">
        <div className="halftone-bg absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-display text-sm tracking-wide text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink dark:text-paper leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 flex-wrap mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-paper dark:bg-paper dark:text-ink font-display text-xs tracking-wider">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-ink/60 dark:text-paper/60">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-ink/40 dark:text-paper/40" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-bold bg-panel-blue dark:bg-dark-panel border-2 border-ink/20 dark:border-paper/20 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Divider */}
          <div className="h-1 bg-ink dark:bg-paper/20 mb-10" />

          {/* MDX content */}
          <article className="comic-prose">
            <MDXRemote source={post.content} />
          </article>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t-3 border-ink/10 dark:border-paper/10" style={{ borderTop: "3px solid" }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-display text-base tracking-wide comic-panel bg-paper dark:bg-dark-surface text-ink dark:text-paper comic-hover"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
