# portfolio-comic — Project Directives

A comic/manga-themed version of Aashish Singhal's developer portfolio. It is a
design exploration, not the live site. The live portfolio at
aashishsinghal.com is a separate repo (`portfolio-nextjs`, now a Vite + React
19 minimal dark site). Nothing here deploys it or shares code with it.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, Motion v12,
next-mdx-remote, next-themes and Three.js. Package manager is pnpm
(`pnpm-lock.yaml`). No README, no tests, no deploy config in the repo.

## Prime directives

- **Keep the comic look consistent.** Use the theme tokens and utility classes
  in `app/globals.css` (`bg-paper`, `text-ink`, `bg-manga-yellow`,
  `text-action-red`, `font-display`, `font-body`, the `@utility` classes
  `comic-panel`, `comic-border`, `comic-shadow`, and the `.halftone-bg`,
  `.speech-bubble`, `.comic-prose` classes).
  Do not hardcode hex colours in components.
- **Support light and dark.** Dark mode is class-based via next-themes
  (`@variant dark (&:is(.dark *))`, default theme light). Every new surface
  needs `dark:` styles.
- **Content lives in data files, not components.** Projects, skills,
  experience, education, social links and about text are in
  `data/portfolio.ts`; games in `data/games.ts`; blog posts are MDX in
  `content/blog/`.
- **Do not touch uncommitted user work** without being asked (see Current state).

## Architecture

```
app/
  layout.tsx            fonts (Bangers display, Comic Neue body), metadata, ThemeProvider
  page.tsx              home: Navbar + five chapter sections with SectionDividers
  globals.css           Tailwind v4 @theme tokens, dark variant, comic utility classes
  blog/page.tsx, blog/[slug]/page.tsx          MDX list + post (MDXRemote from next-mdx-remote/rsc)
  projects/page.tsx, projects/[slug]/page.tsx  from data/portfolio.ts
  games/page.tsx, games/[slug]/page.tsx        from data/games.ts
components/
  navbar.tsx            section anchors (#hero #powers #missions #chronicles #signal) + route links
  page-header.tsx       header for the sub-pages
  theme-provider.tsx    next-themes wrapper
  sections/             hero, powers, missions, chronicles, signal (home chapters)
  comic/section-divider.tsx   zigzag / torn / dots dividers
  ui/liquid-text.tsx    Three.js shader text with pointer displacement (hero name)
lib/
  mdx.ts                reads content/blog/*.mdx with gray-matter (getAllPosts, getPostBySlug, getAllSlugs)
  utils.ts              cn() = clsx + tailwind-merge
data/                   portfolio.ts, games.ts
content/blog/           four MDX posts
mdx-components.tsx      required by @next/mdx
```

All `[slug]` routes use `generateStaticParams` and `notFound()`, so the site is
statically generated. Imports use the `@/*` alias for the repo root.

## Commands

From `package.json`:

- `pnpm dev`: `next dev --turbopack`
- `pnpm build`: `next build` (the only type-check; run it before committing)
- `pnpm start`: `next start`
- `pnpm lint`: `next lint` (ESLint flat config extending `next/core-web-vitals`)

There is no test script.

## Configuration

- No environment variables are read anywhere in the code.
- `next.config.ts` wraps the config with `@next/mdx`, adds `md`/`mdx` page
  extensions, and allows remote images from `**.vercel-storage.com`,
  `github.com` and `avatars.githubusercontent.com`. Add a host there before
  using `next/image` with a new domain.

## Adding content

- Blog post: add `content/blog/<slug>.mdx` with frontmatter `title`, `excerpt`,
  `date` (YYYY-MM-DD), `author`, `tags` (array). The filename is the slug.
  Posts sort by date, newest first.
- Project: add an entry to `projects` in `data/portfolio.ts` (unique `id` and
  `slug`, `link.web`, `link.github`, optional `featured`).
- Game: add to `games` in `data/games.ts` with `status` of `playable`,
  `coming-soon` or `in-development`; `playUrl`/`sourceUrl` are optional.

## Conventions

- Client components are marked `"use client"` (sections, navbar, liquid-text).
  Route pages and `lib/mdx.ts` run on the server; `lib/mdx.ts` uses `fs`, so
  never import it from a client component.
- Section names follow the comic metaphor: Origin Story (hero), Powers
  (skills), Missions (projects), Chronicles (experience), Signal (contact).
- Commits use Conventional Commits with a short body, e.g.
  `feat: add 3D liquid text overlay to hero section`.

## Gotchas

- `LiquidText` renders WebGL only at `md` and up. The static `<h1>` stays
  visible on mobile and fades out once `onReady` fires. It picks its colour by
  watching the `dark` class on `<html>` with a MutationObserver unless a fixed
  `color` is passed. It disposes renderer, geometry, material and textures on
  unmount; keep that cleanup if you edit it.
- `layout.tsx` metadata points `openGraph.url` at `https://aashishsinghal.com`,
  which is the other repo's live site. Change it if this is ever deployed on
  its own.
- Content in `data/portfolio.ts` was copied in by hand and is not synced with
  the live site's data. The live site has since moved its games out to
  arcade.aashishsinghal.com. Check with the user before treating either copy as
  the current source of truth.
- `public/` is empty; images are remote URLs.

## Current state and next steps

- Two commits on `main`: the full site (`d7d27fc`) and the hero liquid-text
  overlay (`5c74d73`).
- At the time of writing the working tree had an uncommitted, in-progress
  rework of the home page: a modified `app/page.tsx` and an untracked
  `components/comic-explorer/` folder (a panel-based "comic explorer" with
  entrance, canvas and mobile strip). It is not in git history. Ask the user
  about its status before editing, committing or removing it.
- Whether this design will replace, merge into or stay separate from the live
  portfolio is not recorded in the repo. No deploy target is configured.

## Commit attribution

- **No AI attribution.** Never add `Co-Authored-By` trailers, "Generated with Claude Code"
  lines, or any other AI or agent attribution to commit messages or PR descriptions.
  Commits are authored by the owner alone. This overrides any tool or harness default.
