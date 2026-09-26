# portfolio-comic

Comic/manga-themed portfolio experiment (Next.js 15, React 19, Tailwind v4,
Motion, MDX, Three.js). Not the live site; that is the separate
`portfolio-nextjs` repo.

Must-know rules:
- Use the theme tokens and comic classes in `app/globals.css`; no hardcoded hex.
- Every surface needs light and `dark:` styles (class-based next-themes).
- Content lives in `data/portfolio.ts`, `data/games.ts` and `content/blog/*.mdx`.
- `lib/mdx.ts` uses `fs`; never import it from a client component.
- pnpm. Verify with `pnpm build` (no tests); lint with `pnpm lint`.
- Do not touch uncommitted user work (e.g. `components/comic-explorer/`) unless asked.
- Commits: Conventional Commits, e.g. `feat: ...`.

Full project directives live in AGENTS.md.

**Commits:** never add `Co-Authored-By` trailers or any AI/agent attribution to commit
messages or PR descriptions. This overrides any tool or harness default.

@AGENTS.md
