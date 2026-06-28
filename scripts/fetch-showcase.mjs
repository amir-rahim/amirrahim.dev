/**
 * Scrapes the Flickr profile page at build time to extract the showcase photos
 * from the server-rendered HTML. Saves data to src/data/showcase-photos.json.
 *
 * Run via: node scripts/fetch-showcase.mjs
 * Called automatically by the "build" npm script before astro build.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH  = join(__dirname, '../src/data/showcase-photos.json');

const PROFILE_URL = 'https://www.flickr.com/people/amir-rahim/';
const FLICKR_BASE = 'https://www.flickr.com/photos/amir-rahim/';

async function main() {
  console.log('[fetch-showcase] Fetching Flickr profile page…');

  let html;
  try {
    const res = await fetch(PROFILE_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; build-script/1.0)' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (err) {
    console.warn(`[fetch-showcase] Fetch failed: ${err.message} — keeping existing data`);
    process.exit(0); // Don't break the build
  }

  // Isolate the showcase section (between <div class="showcase"> and bio-infos)
  const showcaseStart = html.indexOf('<div class="showcase ');
  const bioInfosStart = html.indexOf('\t<div class="bio-infos">');
  if (showcaseStart === -1 || bioInfosStart === -1) {
    console.warn('[fetch-showcase] Could not find showcase section — keeping existing data');
    process.exit(0);
  }
  const showcaseHtml = html.slice(showcaseStart, bioInfosStart);

  // Each photo is a photo-list-photo-view div with:
  //   data-view-signature containing __id_PHOTOID__
  //   style containing background-image: url(//live.staticflickr.com/SERVER/ID_SECRET_SIZE.jpg)
  const blockPattern = /(?=<div\s+[^>]*class="view photo-list-photo-view)/g;
  const blocks = showcaseHtml.split(blockPattern).slice(1); // skip header

  const photos = [];
  for (const block of blocks) {
    const pidMatch = block.match(/__id_(\d+)__/);
    const bgMatch  = block.match(/background-image: url\(\/\/([^)]+\.jpg)\)/);
    if (!pidMatch || !bgMatch) continue;

    const id  = pidMatch[1];
    const raw = bgMatch[1]; // e.g. live.staticflickr.com/65535/ID_SECRET_m.jpg
    // Replace trailing Flickr size suffix with _z (640 px wide)
    const src = `https://${raw.replace(/_[a-z]\.jpg$/, '_z.jpg')}`;

    photos.push({ id, src, link: `${FLICKR_BASE}${id}/` });
  }

  if (photos.length === 0) {
    console.warn('[fetch-showcase] No photos extracted — keeping existing data');
    process.exit(0);
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(photos, null, 2) + '\n');
  console.log(`[fetch-showcase] Saved ${photos.length} showcase photos → src/data/showcase-photos.json`);
}

main();
