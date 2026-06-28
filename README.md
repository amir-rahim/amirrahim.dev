# amirrahim.dev

Personal website for [amirrahim.dev](https://amirrahim.dev) — resume, blog, and project showcase.

Built with **Astro 7** (static SSG), deployed to **Cloudflare Pages**.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 7 (static output) |
| Styling | Vanilla CSS with custom properties |
| Content | MDX via `@astrojs/mdx` |
| Fonts | Self-hosted via `@fontsource` (Inter, JetBrains Mono) |
| RSS | `@astrojs/rss` |
| Sitemap | `@astrojs/sitemap` |
| Deployment | Cloudflare Pages |

---

## Local development

```sh
npm install
npx astro dev --background   # start dev server in background
npx astro dev stop           # stop it
npx astro dev logs           # tail logs
npm run build                # production build → dist/
npm run preview              # preview the production build
```

Dev server runs at `http://localhost:4321`.

---

## Project structure

```
src/
├── components/
│   ├── BlogCard.astro        row-based blog post list item
│   ├── Footer.astro          site footer with disclaimer + links
│   ├── FormattedDate.astro   locale date formatter
│   ├── Nav.astro             sticky nav bar with theme toggle
│   └── ProjectCard.astro     border-collapse project grid cell
│
├── config/
│   └── site.ts              ← EDIT THIS FIRST: name, description, social links
│
├── content/
│   ├── blog/                ← add .md or .mdx files here for blog posts
│   └── projects/            ← add .md or .mdx files here for project entries
│
├── data/
│   └── resume.ts            ← structured CV data (experience, skills, education)
│
├── layouts/
│   ├── BaseLayout.astro      HTML shell, SEO meta, theme init, scroll reveal
│   └── BlogPost.astro        individual blog post wrapper
│
├── pages/
│   ├── index.astro           home — two-slide hero + projects + blog
│   ├── resume.astro          CV page (reads from src/data/resume.ts)
│   ├── contact.astro         contact page (reads from src/config/site.ts)
│   ├── blog/
│   │   ├── index.astro       blog listing
│   │   └── [...slug].astro   individual post page
│   ├── projects/
│   │   └── index.astro       projects listing
│   └── rss.xml.js            RSS feed
│
└── styles/
    └── global.css            design tokens, reset, shared utility classes
```

---

## Editing your content

### Personal details
Edit `src/config/site.ts` — name, one-line description, social URLs, nav order.

### CV / Resume
Edit `src/data/resume.ts` — typed interfaces enforce structure. Replace every `PLACEHOLDER` string.

### Hero statement (slide 2)
Edit the `statement` object near the top of `src/pages/index.astro`:
```ts
const statement = {
  lines: ['Your first line', 'your second line.'],
  current: 'Role · Company · City',
  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
};
```

### Blog posts
Create files in `src/content/blog/`. Required frontmatter:
```yaml
---
title: Post title
description: One-sentence summary
pubDate: 2026-01-01
tags: [engineering, systems]
draft: false
---
```

### Projects
Create files in `src/content/projects/`. Required frontmatter:
```yaml
---
title: Project name
summary: One-sentence description
order: 1
tech: [Go, Kubernetes]
url: https://example.com   # optional
repo: https://github.com/… # optional
featured: true             # shows on home page
draft: false
---
```

---

## Design system

Swiss/systematic style — monochrome, hairline rules, monospace labels.

- **Palette**: `--color-text`, `--color-text-muted`, `--color-text-faint`, `--color-rule`, `--color-rule-heavy`
- **Fonts**: `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
- **Key class**: `.label` — mono uppercase 11px, used for all metadata
- **Layout**: `.page-wrap` — max-width 1200px, centred, side gutters
- **Grid rows**: `.doc-rows > .doc-row > .row-num + .row-body` — 40px left gutter with hairline borders
- **Project/focus grids**: border-collapse technique — parent has `border-top + border-left`, cells have `border-right + border-bottom`

Light and dark mode are both supported. Theme is stored in `localStorage` and applied before first paint to avoid flash.

---

## Constraints

- Do **not** re-initialise git or force-push
- Do **not** touch DNS, Cloudflare, or deployment config
- Do **not** add analytics or third-party scripts without explicit instruction
- Do **not** hardcode personal details — keep them in `src/config/site.ts` or `src/data/resume.ts`
