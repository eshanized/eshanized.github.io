import type { Metadata } from 'next';
import { SiteHeader } from '@/components/navigation/site-header';
import { identity, CANONICAL_PERSON_ID } from '@/lib/identity';
import { createMetadata, serializeJsonLd } from '@/lib/metadata';
import { publications } from '@/content/publications';
import { BookOpen, ExternalLink, Calendar, Tag, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Publications & Technical Writing',
  description:
    'Authoritative technical articles and publications by Eshan Roy (eshanized) on operating systems, autonomous engineering agents, and systems programming.',
  path: '/publications',
});

export default function PublicationsPage() {
  const publicationsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Technical Publications by ${identity.name} (${identity.alternateName})`,
    description: 'Authoritative publications on operating systems, autonomous agents, and software architecture.',
    itemListElement: publications.map((pub, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'TechArticle',
        headline: pub.title,
        description: pub.description,
        datePublished: pub.publishedDate,
        url: pub.url,
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          '@id': CANONICAL_PERSON_ID,
          name: identity.name,
          alternateName: identity.alternateName,
        },
        publisher: {
          '@type': 'Organization',
          name: pub.platform,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(publicationsJsonLd),
        }}
      />
      <SiteHeader backToHome />

      <main className="flex-1 bg-grain py-12 md:py-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse-coral" aria-hidden="true" />
            <span className="chapter-label">Authoritative Technical Writing</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Publications &amp; Research Notes
          </h1>
          <p className="text-base text-foreground-muted max-w-3xl leading-relaxed">
            In-depth writings on operating system architectures, autonomous AI runtime security, and developer infrastructure
            authored by <span className="text-foreground font-semibold">Eshan Roy</span> (<span className="font-mono text-coral-400">eshanized</span>).
            Each article is connected directly to the canonical Person entity.
          </p>
        </header>

        <section aria-labelledby="articles-list-heading" className="space-y-6">
          <h2 id="articles-list-heading" className="sr-only">
            Published Articles
          </h2>

          <div className="space-y-6">
            {publications.map((pub) => (
              <article
                key={pub.id}
                className="p-6 md:p-8 rounded-xl border border-border bg-card hover:border-coral-500/40 transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-foreground-subtle">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-secondary text-coral-400 font-medium">
                        {pub.platform}
                      </span>
                      <span>&bull;</span>
                      <time dateTime={pub.publishedDate} className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{pub.publishedDate}</span>
                      </time>
                    </div>
                    {pub.readingTimeMinutes && (
                      <span>{pub.readingTimeMinutes} min read</span>
                    )}
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-coral-400 transition-colors">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <span>{pub.title}</span>
                      <ExternalLink className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h3>

                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/50 text-foreground-subtle"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-foreground-subtle flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Author: {identity.name}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
