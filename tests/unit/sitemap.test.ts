import test from 'node:test';
import assert from 'node:assert/strict';
import sitemap from '../../app/sitemap';
import robots from '../../app/robots';
import { CANONICAL_ORIGIN } from '../../lib/identity';

test('Sitemap — Full Indexable Routes', () => {
  const routes = sitemap();

  assert.ok(Array.isArray(routes));
  assert.equal(routes.length, 4, 'Must contain exactly the 4 canonical public routes');

  const urls = routes.map((r) => r.url);
  assert.ok(urls.includes(`${CANONICAL_ORIGIN}/`));
  assert.ok(urls.includes(`${CANONICAL_ORIGIN}/about`));
  assert.ok(urls.includes(`${CANONICAL_ORIGIN}/projects`));
  assert.ok(urls.includes(`${CANONICAL_ORIGIN}/publications`));

  // Verify all URLs are HTTPS and absolute
  for (const r of routes) {
    assert.ok(r.url.startsWith('https://'), `URL ${r.url} must be HTTPS`);
    assert.ok(r.lastModified instanceof Date, 'Must have valid Date lastModified');
  }
});

test('Robots.txt — Configuration and Sitemap Link', () => {
  const rob = robots();

  assert.equal(rob.host, CANONICAL_ORIGIN);
  assert.equal(rob.sitemap, `${CANONICAL_ORIGIN}/sitemap.xml`);
  assert.ok(Array.isArray(rob.rules));
  assert.equal(rob.rules[0].userAgent, '*');
  assert.ok(Array.isArray(rob.rules[0].allow));
  assert.ok(rob.rules[0].allow.includes('/'));
  assert.ok(rob.rules[0].allow.includes('/images/'));
});
