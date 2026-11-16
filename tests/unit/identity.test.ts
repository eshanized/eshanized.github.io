import test from 'node:test';
import assert from 'node:assert/strict';
import {
  identity,
  CANONICAL_ORIGIN,
  CANONICAL_PERSON_ID,
  CANONICAL_ORGANIZATION_ID,
  CANONICAL_WEBSITE_ID,
  CANONICAL_PROFILE_PAGE_ID,
  VERIFIED_SAME_AS_URLS,
  getCanonicalUrl,
  validateSecureUrl,
  serializeJsonLd,
} from '../../lib/identity';

test('Identity Configuration — Approved Specification compliance', () => {
  assert.equal(identity.name, 'Eshan Roy', 'Name must be Eshan Roy');
  assert.equal(identity.alternateName, 'eshanized', 'Alternate name must be eshanized');
  assert.equal(identity.jobTitle, 'Founder & CEO, Systems Engineer', 'Job title must match specification');
  assert.equal(identity.organization.name, 'Tonmoy Infrastructure & Vision', 'Company must be Tonmoy Infrastructure & Vision');
  assert.equal(identity.organization.url, 'https://tonmoyinfrastructure.org');
  assert.equal(identity.origin, 'https://eshanized.is-a.dev');
  assert.equal(identity.canonicalUrl, 'https://eshanized.is-a.dev/');

  // Approved biography & short description
  assert.match(
    identity.biography,
    /^Eshan Roy, known professionally as eshanized, is a technology entrepreneur, systems engineer, and Founder & CEO of Tonmoy Infrastructure & Vision\./
  );
  assert.match(
    identity.shortDescription,
    /^A technology entrepreneur building operating systems, autonomous AI engineering systems, developer infrastructure and open-source software\.$/
  );

  // Focus areas (knowsAbout)
  const expectedFocus = [
    'Operating systems engineering',
    'Autonomous AI engineering systems',
    'Developer infrastructure',
    'Open-source software',
    'Distributed systems',
  ];
  assert.deepEqual(Array.from(identity.knowsAbout), expectedFocus, 'Focus areas must match specification');
});

test('Canonical URL Generator — Deterministic handling', () => {
  assert.equal(getCanonicalUrl('/'), 'https://eshanized.is-a.dev/');
  assert.equal(getCanonicalUrl(''), 'https://eshanized.is-a.dev/');
  assert.equal(getCanonicalUrl('/about'), 'https://eshanized.is-a.dev/about');
  assert.equal(getCanonicalUrl('/about/'), 'https://eshanized.is-a.dev/about');
  assert.equal(getCanonicalUrl('projects'), 'https://eshanized.is-a.dev/projects');
  assert.equal(getCanonicalUrl('/publications'), 'https://eshanized.is-a.dev/publications');
});

test('Secure URL Validation — Protocol enforcement', () => {
  assert.equal(validateSecureUrl('https://github.com/eshanized'), true);
  assert.equal(validateSecureUrl('https://eshanized.is-a.dev/'), true);
  assert.equal(validateSecureUrl('http://insecure.example.com'), false);
  assert.equal(validateSecureUrl('ftp://ftp.example.com'), false);
  assert.equal(validateSecureUrl('invalid-url-string'), false);
});

test('Verified Profiles & sameAs validation', () => {
  assert.ok(VERIFIED_SAME_AS_URLS.length >= 7, 'Must have at least 7 verified profiles');
  for (const url of VERIFIED_SAME_AS_URLS) {
    assert.ok(validateSecureUrl(url), `Profile URL ${url} must be secure HTTPS`);
    assert.match(url, /https:\/\//, `Profile URL ${url} must start with https://`);
  }

  // Ensure known authoritative profiles are present
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://github.com/eshanized'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://gitlab.com/eshanized'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://dev.to/eshanized'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://about.me/eshanized'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://crates.io/users/eshanized'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://orcid.org/0009-0007-1261-6805'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://pypi.org/user/eshanized/'));
  assert.ok(VERIFIED_SAME_AS_URLS.includes('https://x.com/eshanized'));
});

test('Image Variants — Existence and accessibility specifications', () => {
  assert.equal(identity.images.portraitSquare.width, 800);
  assert.equal(identity.images.portraitSquare.height, 800);
  assert.equal(identity.images.portraitSquare.aspectRatio, '1:1');
  assert.equal(identity.images.portraitThreeByFour.aspectRatio, '3:4');
  assert.equal(identity.images.landscapeWide.aspectRatio, '16:9');
  assert.ok(identity.images.portraitSquare.alt.length > 10, 'Alt text must be descriptive');
});

test('JSON-LD Security Escaping — Script closing protection', () => {
  const maliciousPayload = {
    malicious: '</script><script>alert("xss")</script>',
    html: '<b>bold</b> & "quotes"',
  };
  const serialized = serializeJsonLd(maliciousPayload);

  // Must not contain raw </script> or <script>
  assert.ok(!serialized.includes('</script>'), 'Must escape closing script tag');
  assert.ok(!serialized.includes('<script>'), 'Must escape opening script tag');
  assert.ok(serialized.includes('\\u003c/script\\u003e'), 'Must contain unicode-escaped closing tag');
  assert.ok(serialized.includes('\\u0026'), 'Must contain unicode-escaped ampersand');

  // Must still parse back to identical original data
  const parsed = JSON.parse(serialized);
  assert.deepEqual(parsed, maliciousPayload, 'Serialized JSON must deserialize to original data');
});
