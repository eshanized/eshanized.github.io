import test from 'node:test';
import assert from 'node:assert/strict';
import { createMetadata } from '../../lib/metadata';
import { identity, CANONICAL_ORIGIN } from '../../lib/identity';

test('Metadata Generator — Default Homepage Metadata', () => {
  const meta = createMetadata();

  assert.equal(meta.title, 'Eshan Roy (eshanized) — Founder & CEO, Systems Engineer');
  assert.equal(meta.description, identity.shortDescription);
  assert.equal(meta.metadataBase?.toString(), `${CANONICAL_ORIGIN}/`);

  // Canonical
  const canonical = (meta.alternates as any)?.canonical;
  assert.equal(canonical, 'https://eshanized.is-a.dev/');

  // OpenGraph
  assert.equal((meta.openGraph as any)?.type, 'website');
  assert.equal(meta.openGraph?.url, 'https://eshanized.is-a.dev/');
  assert.equal(meta.openGraph?.siteName, 'Eshan Roy (eshanized)');
  assert.ok(Array.isArray(meta.openGraph?.images));
  const ogImg = (meta.openGraph?.images as any)[0];
  assert.equal(ogImg.url, 'https://eshanized.is-a.dev/og-image.png');
  assert.equal(ogImg.width, 1200);
  assert.equal(ogImg.height, 630);

  // Twitter
  assert.equal((meta.twitter as any)?.card, 'summary_large_image');
  assert.equal(meta.twitter?.creator, '@eshanized');

  // Robots
  const robots = meta.robots as any;
  assert.equal(robots.index, true);
  assert.equal(robots.follow, true);
  assert.equal(robots.googleBot['max-image-preview'], 'large');
});

test('Metadata Generator — Sub-page Metadata Overrides', () => {
  const aboutMeta = createMetadata({
    title: 'Biography & Leadership',
    description: identity.biography,
    path: '/about',
  });

  assert.equal(aboutMeta.title, 'Biography & Leadership — Eshan Roy (eshanized)');
  assert.equal(aboutMeta.description, identity.biography);
  assert.equal((aboutMeta.alternates as any)?.canonical, 'https://eshanized.is-a.dev/about');
  assert.equal(aboutMeta.openGraph?.url, 'https://eshanized.is-a.dev/about');
});
