import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createPersonJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
  createProfilePageJsonLd,
} from '../../lib/metadata';
import {
  identity,
  CANONICAL_PERSON_ID,
  CANONICAL_ORGANIZATION_ID,
  CANONICAL_WEBSITE_ID,
  CANONICAL_PROFILE_PAGE_ID,
} from '../../lib/identity';

test('JSON-LD — Person Entity Specification', () => {
  const person = createPersonJsonLd();

  assert.equal(person['@context'], 'https://schema.org');
  assert.equal(person['@type'], 'Person');
  assert.equal(person['@id'], CANONICAL_PERSON_ID);
  assert.equal(person.name, 'Eshan Roy');
  assert.equal(person.alternateName, 'eshanized');
  assert.equal(person.url, 'https://eshanized.is-a.dev/');
  assert.equal(person.jobTitle, 'Founder & CEO, Systems Engineer');
  assert.equal(person.description, identity.biography);
  assert.equal(person.image, 'https://eshanized.is-a.dev/images/eshan-roy-1x1.jpg');

  // worksFor connection
  assert.equal(person.worksFor['@type'], 'Organization');
  assert.equal(person.worksFor['@id'], CANONICAL_ORGANIZATION_ID);
  assert.equal(person.worksFor.name, 'Tonmoy Infrastructure & Vision');
  assert.equal(person.worksFor.url, 'https://tonmoyinfrastructure.org');

  // sameAs contains verified profiles
  assert.ok(Array.isArray(person.sameAs));
  assert.ok(person.sameAs.includes('https://github.com/eshanized'));
  assert.ok(person.sameAs.includes('https://gitlab.com/eshanized'));
  assert.ok(person.sameAs.includes('https://dev.to/eshanized'));
  assert.ok(person.sameAs.includes('https://about.me/eshanized'));

  // knowsAbout
  assert.deepEqual(person.knowsAbout, [
    'Operating systems engineering',
    'Autonomous AI engineering systems',
    'Developer infrastructure',
    'Open-source software',
    'Distributed systems',
  ]);
});

test('JSON-LD — Organization Entity Specification', () => {
  const org = createOrganizationJsonLd();

  assert.equal(org['@context'], 'https://schema.org');
  assert.equal(org['@type'], 'Organization');
  assert.equal(org['@id'], CANONICAL_ORGANIZATION_ID);
  assert.equal(org.name, 'Tonmoy Infrastructure & Vision');
  assert.equal(org.url, 'https://tonmoyinfrastructure.org');

  // founder references Person entity
  assert.equal(org.founder['@type'], 'Person');
  assert.equal(org.founder['@id'], CANONICAL_PERSON_ID);
  assert.equal(org.founder.name, 'Eshan Roy');
  assert.equal(org.founder.alternateName, 'eshanized');
});

test('JSON-LD — WebSite Entity Specification', () => {
  const website = createWebsiteJsonLd();

  assert.equal(website['@context'], 'https://schema.org');
  assert.equal(website['@type'], 'WebSite');
  assert.equal(website['@id'], CANONICAL_WEBSITE_ID);
  assert.equal(website.url, 'https://eshanized.is-a.dev/');
  assert.equal(website.publisher['@id'], CANONICAL_PERSON_ID);
  assert.equal(website.author['@id'], CANONICAL_PERSON_ID);
});

test('JSON-LD — ProfilePage Entity Specification', () => {
  const profilePage = createProfilePageJsonLd();

  assert.equal(profilePage['@context'], 'https://schema.org');
  assert.equal(profilePage['@type'], 'ProfilePage');
  assert.equal(profilePage['@id'], CANONICAL_PROFILE_PAGE_ID);
  assert.equal(profilePage.url, 'https://eshanized.is-a.dev/about');
  assert.equal(profilePage.isPartOf['@id'], CANONICAL_WEBSITE_ID);

  // mainEntity connects to Person
  assert.equal(profilePage.mainEntity['@type'], 'Person');
  assert.equal(profilePage.mainEntity['@id'], CANONICAL_PERSON_ID);
  assert.equal(profilePage.mainEntity.name, 'Eshan Roy');
  assert.equal(profilePage.mainEntity.alternateName, 'eshanized');
  assert.equal(profilePage.mainEntity.worksFor['@id'], CANONICAL_ORGANIZATION_ID);
});
