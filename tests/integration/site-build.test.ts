import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '../../out');

test('Integration — Static Build Output Existence', () => {
  assert.ok(fs.existsSync(OUT_DIR), 'out/ directory must exist');
  assert.ok(fs.existsSync(path.join(OUT_DIR, 'index.html')), 'out/index.html must exist');
  assert.ok(fs.existsSync(path.join(OUT_DIR, 'about.html')), 'out/about.html must exist');
  assert.ok(fs.existsSync(path.join(OUT_DIR, 'projects.html')), 'out/projects.html must exist');
  assert.ok(fs.existsSync(path.join(OUT_DIR, 'publications.html')), 'out/publications.html must exist');
  assert.ok(fs.existsSync(path.join(OUT_DIR, 'sitemap.xml')), 'out/sitemap.xml must exist');
  assert.ok(fs.existsSync(path.join(OUT_DIR, 'robots.txt')), 'out/robots.txt must exist');
});

test('Integration — Image Assets in out/', () => {
  const images = [
    'images/eshan-roy.jpg',
    'images/eshan-roy-1x1.jpg',
    'images/eshan-roy-3x4.jpg',
    'images/eshan-roy-16x9.jpg',
    'og-image.png',
    'apple-touch-icon.png',
  ];

  for (const img of images) {
    const fullPath = path.join(OUT_DIR, img);
    assert.ok(fs.existsSync(fullPath), `Asset ${img} must exist in out/`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 1000, `Asset ${img} size (${stat.size} bytes) must be valid`);
  }
});

test('Integration — HTML Metadata & Schema.org in index.html', () => {
  const html = fs.readFileSync(path.join(OUT_DIR, 'index.html'), 'utf-8');

  // Title and Description
  assert.ok(html.includes('<title>Eshan Roy (eshanized) — Founder &amp; CEO, Systems Engineer</title>'));
  assert.ok(html.includes('name="description"'));
  assert.ok(html.includes('href="https://eshanized.is-a.dev/"'));

  // OpenGraph
  assert.ok(html.includes('property="og:title"'));
  assert.ok(html.includes('property="og:image"'));
  assert.ok(html.includes('https://eshanized.is-a.dev/og-image.png'));

  // Canonical Person Entity
  assert.ok(html.includes('https://eshanized.is-a.dev/#person'));
  assert.ok(html.includes('https://tonmoyinfrastructure.org/#organization'));
  assert.ok(html.includes('https://github.com/eshanized'));
  assert.ok(html.includes('https://gitlab.com/eshanized'));
});

test('Integration — ProfilePage Entity in about.html', () => {
  const html = fs.readFileSync(path.join(OUT_DIR, 'about.html'), 'utf-8');

  // Must contain ProfilePage
  assert.ok(html.includes('@type":"ProfilePage"'));
  assert.ok(html.includes('https://eshanized.is-a.dev/about#profilepage'));
  assert.ok(html.includes('mainEntity":{"@type":"Person"'));
  assert.ok(html.includes('https://eshanized.is-a.dev/#person'));
  assert.ok(html.includes('https://eshanized.is-a.dev/images/eshan-roy-1x1.jpg'));
});

test('Integration — Sitemap Content Validity', () => {
  const sitemapContent = fs.readFileSync(path.join(OUT_DIR, 'sitemap.xml'), 'utf-8');

  assert.ok(sitemapContent.includes('<loc>https://eshanized.is-a.dev/</loc>'));
  assert.ok(sitemapContent.includes('<loc>https://eshanized.is-a.dev/about</loc>'));
  assert.ok(sitemapContent.includes('<loc>https://eshanized.is-a.dev/projects</loc>'));
  assert.ok(sitemapContent.includes('<loc>https://eshanized.is-a.dev/publications</loc>'));
});
