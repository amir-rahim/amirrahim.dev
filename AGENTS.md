## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

---

## Project overview

Personal website at `amirrahim.dev` — Astro 7 static SSG, deployed to Cloudflare Pages.
Pages: Home, Resume, Blog, Projects, Contact. Content via MDX collections.

---

## Hard constraints — never violate these

- Do **not** re-initialise git (`git init`), amend published commits, or force-push
- Do **not** attempt to deploy, or touch DNS / Cloudflare / domain configuration
- Do **not** add analytics, tracking pixels, or third-party scripts without explicit instruction
- Do **not** hardcode personal details in components — all personal data lives in:
  - `src/config/site.ts` — name, description, social links
  - `src/data/resume.ts` — CV data (experience, skills, education)
  - `const statement` near the top of `src/pages/index.astro` — hero slide 2 text
- Visual redesign only — do not change routing, content collection schemas, or build config unless explicitly asked

---

## Key files

| File | Purpose |
|---|---|
| `src/config/site.ts` | Primary config — edit name, description, social URLs first |
| `src/data/resume.ts` | Typed CV data — replace all PLACEHOLDER strings |
| `src/styles/global.css` | Design tokens (CSS custom properties), reset, shared utilities |
| `src/layouts/BaseLayout.astro` | HTML shell — SEO meta, theme init script, scroll-reveal observer |
| `src/components/Nav.astro` | Sticky nav — includes theme toggle JS (clone-to-clear-listeners pattern) |
| `src/components/Footer.astro` | Footer with disclaimer row + links bar |
| `src/pages/index.astro` | Home — two-slide sticky hero + projects + blog |

---

## Design system — Swiss/systematic style

Strict monochrome, hairline rules, monospace labels. No gradients, no shadows, no rounded corners, no accent colour.

### CSS tokens (defined in `global.css`)
```
--color-bg / --color-surface / --color-text / --color-text-secondary
--color-text-muted / --color-text-faint
--color-rule (0.5px borders) / --color-rule-heavy (1.5px nav borders)
--font-sans (Inter) / --font-mono (JetBrains Mono)
--gutter-num: 40px  (numbered row left column width)
--gutter-side: clamp(1.25rem, 5vw, 3rem)  (page side padding)
```

### Shared classes
- `.label` — mono uppercase 11px, used for ALL metadata (dates, tags, section markers, nav items)
- `.page-wrap` — max-width 1200px centred with `--gutter-side` horizontal padding
- `.btn` — flat outlined button, inverts on hover, no border-radius
- `.reveal` / `.is-visible` — scroll-reveal pair (IntersectionObserver in BaseLayout)

### Doc-row grid pattern
Used on every interior page:
```html
<div class="doc-rows">          <!-- border-top: 0.5px -->
  <div class="doc-row">         <!-- border-bottom: 0.5px, grid: 40px 1fr -->
    <span class="row-num">01</span>    <!-- border-right: 0.5px -->
    <div class="row-body">...</div>
  </div>
</div>
```

### Border-collapse grid (projects, focus)
Parent gets `border-top + border-left`; cells get `border-right + border-bottom`. Eliminates double borders without CSS hacks.

### Theme toggle
Nav.astro clones the button element before adding a click listener. This wipes any duplicate listeners that accumulate across Astro View Transition page loads. Do not add the listener directly — always use the clone pattern.

---

## Hero scroll experience (index.astro)

The hero section is `260vh` tall with a sticky inner panel (`100dvh`). Two slides are absolutely positioned inside and driven by scroll progress (0 → 1):

| Progress | What's visible |
|---|---|
| 0 – 30% | Slide 1 (name, tagline, buttons) |
| 30 – 48% | Slide 1 fading + lifting out |
| 48 – 55% | Both hidden — 8-bit canvas floods (dramatic transition) |
| 55 – 68% | Slide 2 rising in (statement + current role) |
| 68 – 84% | Slide 2 fully visible |
| 84 – 98% | Slide 2 fading out |
| 100% | Hero releases, projects/blog content below |

The canvas (`<canvas id="hero-canvas">`) draws a grid of 8-bit characters (0, 1, +, ·, ×) that randomly blink. Density is driven by `window.__heroProgress` — peaks at the ~51.5% blackout window. Canvas reads `--color-text` via `getComputedStyle` and sets opacity higher in light mode (0.55 vs 0.20) since dark text on pale background needs more alpha to be visible.

Both slides use `will-change: opacity, transform`. When a slide is hidden it also receives `pointer-events: none` and `aria-hidden="true"` so it is fully inert.

All canvas and scroll animations are suppressed when `prefers-reduced-motion: reduce` is set.

---

## Astro documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
