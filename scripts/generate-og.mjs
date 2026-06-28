/**
 * Pre-build script: generates OG images for all published blog posts.
 * Outputs PNG files to public/og/<slug>.png (1200×630).
 * Run automatically via `npm run build` before astro build.
 */

import { readFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import sharp from 'sharp';

const CONTENT_DIR = new URL('../src/content/blog', import.meta.url).pathname;
const OUT_DIR     = new URL('../public/og', import.meta.url).pathname;

const MONO = "'Courier New','Liberation Mono','DejaVu Sans Mono',monospace";
const W = 1200, H = 630;

// ── Frontmatter parser ──────────────────────────────────────────────────────

function parseFrontmatter(src) {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];

  const get = (key) => {
    const m = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim() : null;
  };

  const title = (get('title') ?? '').replace(/^["']|["']$/g, '');
  const draft = get('draft') === 'true';
  const pubDateRaw = get('pubDate');
  const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

  // Parse YAML array  tags:\n  - foo\n  - bar
  const tagsMatch = block.match(/^tags:\s*\n((?:\s+-\s*.+\n?)+)/m);
  const tags = tagsMatch
    ? tagsMatch[1].match(/-\s*(.+)/g)?.map((t) => t.replace(/^-\s*/, '').trim()) ?? []
    : [];

  return { title, draft, pubDate, tags };
}

// ── Text wrapping ───────────────────────────────────────────────────────────

function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── SVG builder ─────────────────────────────────────────────────────────────

function buildSvg({ title, tags, dateStr }) {
  const lines    = wrap(title, 22);
  const n        = lines.length;
  const fontSize = n === 1 ? 80 : n === 2 ? 70 : 60;
  const lineH    = Math.round(fontSize * 1.25);
  const totalH   = n * lineH;
  const titleY   = Math.round(100 + (430 - totalH) / 2 + fontSize * 0.82);

  const titleRows = lines
    .map(
      (line, i) =>
        `<text x="80" y="${titleY + i * lineH}" font-family="${MONO}" font-size="${fontSize}" font-weight="700" fill="#F0F0F0" letter-spacing="-1">${esc(line)}</text>`,
    )
    .join('\n  ');

  const tagsRow =
    tags.length > 0
      ? `<text x="80" y="605" font-family="${MONO}" font-size="14" fill="#444444" letter-spacing="2">${esc(tags.slice(0, 3).map((t) => t.toUpperCase()).join('  ·  '))}</text>`
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#111111"/>
  <text x="80" y="72" font-family="${MONO}" font-size="18" font-weight="700" fill="#F0F0F0" letter-spacing="3">AR.</text>
  <line x1="80" y1="100" x2="1120" y2="100" stroke="#2A2A2A" stroke-width="1"/>
  ${titleRows}
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#2A2A2A" stroke-width="1"/>
  <text x="80" y="572" font-family="${MONO}" font-size="15" fill="#555555">${esc(dateStr)}</text>
  ${tagsRow}
  <text x="1120" y="572" font-family="${MONO}" font-size="15" fill="#444444" text-anchor="end">amirrahim.dev</text>
</svg>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function run() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  let generated = 0;

  for (const file of files) {
    const src  = readFileSync(join(CONTENT_DIR, file), 'utf8');
    const meta = parseFrontmatter(src);

    if (meta.draft) continue;

    const slug    = basename(file, file.endsWith('.mdx') ? '.mdx' : '.md');
    const dateStr = meta.pubDate
      ? meta.pubDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';

    const svg = buildSvg({ title: meta.title || slug, tags: meta.tags || [], dateStr });
    const out = join(OUT_DIR, `${slug}.png`);

    await sharp(Buffer.from(svg)).png().toFile(out);
    console.log(`  og: ${slug}.png`);
    generated++;
  }

  if (generated === 0) {
    console.log('  og: no published posts — skipping');
  } else {
    console.log(`  og: generated ${generated} image(s)`);
  }
}

run().catch((err) => {
  console.error('generate-og failed:', err);
  process.exit(1);
});
