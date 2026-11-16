import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/navigation/site-header';
import { identity } from '@/lib/identity';
import { createMetadata, createProfilePageJsonLd, serializeJsonLd } from '@/lib/metadata';
import { flagshipProjects } from '@/content/projects';
import {
  ExternalLink,
  ShieldCheck,
  Building,
  Terminal,
  Cpu,
  BookOpen,
  ArrowRight,
  Github,
  Gitlab,
  Package,
  FileText,
  User,
} from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Biography & Leadership',
  description: identity.biography,
  path: '/about',
});

export default function AboutPage() {
  const profilePageJsonLd = createProfilePageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(profilePageJsonLd),
        }}
      />
      <SiteHeader backToHome />

      <main className="flex-1 bg-grain py-12 md:py-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full space-y-16">
        {/* Section 1: Professional Introduction */}
        <section aria-labelledby="intro-heading" className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse-coral" aria-hidden="true" />
            <span className="chapter-label">Authoritative Biography</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <h1
                id="intro-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground"
              >
                Eshan Roy
              </h1>
              <p className="font-mono text-sm uppercase tracking-wider text-coral-500">
                Known professionally as {identity.alternateName}
              </p>
              <div className="border-l-2 border-coral-500/50 pl-4 py-1">
                <p className="font-display text-lg md:text-xl text-foreground font-medium">
                  {identity.primaryRole}
                </p>
                <p className="text-sm font-mono text-foreground-subtle mt-1">
                  <a
                    href={identity.organization.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-coral-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{identity.organization.name}</span>
                    <ExternalLink className="w-3 h-3 text-coral-500" />
                  </a>
                </p>
              </div>
              <p className="text-base text-foreground-muted leading-relaxed pt-2">
                {identity.shortDescription}
              </p>
            </div>

            {/* Reused authentic professional photograph */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-card">
                <img
                  src={identity.images.portraitSquare.url}
                  alt={identity.images.portraitSquare.alt}
                  width={identity.images.portraitSquare.width}
                  height={identity.images.portraitSquare.height}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
              <span className="text-[11px] font-mono text-foreground-subtle mt-2 text-center sm:text-left">
                Verified portrait · {identity.name}
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Canonical Biography */}
        <section aria-labelledby="bio-heading" className="space-y-4 pt-8 border-t border-hairline">
          <h2 id="bio-heading" className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Biography
          </h2>
          <div className="prose prose-invert max-w-none text-foreground-muted leading-relaxed space-y-4">
            <p className="text-base sm:text-lg text-foreground-muted/90 font-sans">
              {identity.biography}
            </p>
            <p>
              As a systems engineer and technology entrepreneur, Eshan Roy has focused his work on the
              foundations of modern computing: deterministic runtime safety, distributed consensus, and operating
              system design. Through open-source architectures, he emphasizes verifiable execution over asserted
              reliability — ensuring software behavior is mathematically and cryptographically provable.
            </p>
          </div>
        </section>

        {/* Section 3 & 4: Current Professional Role & Company Leadership */}
        <section aria-labelledby="leadership-heading" className="space-y-6 pt-8 border-t border-hairline">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-coral-500" />
            <h2 id="leadership-heading" className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Current Professional Role &amp; Company Leadership
            </h2>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Founder &amp; Chief Executive Officer
                </h3>
                <p className="font-mono text-xs text-coral-500 mt-0.5">
                  Tonmoy Infrastructure &amp; Vision
                </p>
              </div>
              <a
                href={identity.organization.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-border hover:border-coral-500/40 text-foreground-muted hover:text-coral-400 transition-colors self-start sm:self-auto"
              >
                <span>tonmoyinfrastructure.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Leading the research, systems architecture, and engineering direction of Tonmoy Infrastructure &amp; Vision.
              The organization is dedicated to engineering sovereign software platforms, verifiable agent runtimes, and
              resilient distributed infrastructure designed to be understood, deployed, and depended on.
            </p>
          </div>
        </section>

        {/* Section 5: Engineering Interests & Focus Areas */}
        <section aria-labelledby="interests-heading" className="space-y-6 pt-8 border-t border-hairline">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-coral-500" />
            <h2 id="interests-heading" className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Engineering Focus Areas
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {identity.knowsAbout.map((area) => (
              <div
                key={area}
                className="p-4 rounded-lg border border-border/70 bg-secondary/20 flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0" />
                <span className="font-mono text-xs text-foreground font-medium">{area}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 & 7: Open-Source Contributions & Major Projects */}
        <section aria-labelledby="projects-heading" className="space-y-6 pt-8 border-t border-hairline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-coral-500" />
              <h2 id="projects-heading" className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Major Projects &amp; Open-Source Leadership
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs text-foreground-subtle hover:text-coral-400 transition-colors inline-flex items-center gap-1"
            >
              <span>View full directory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {identity.projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-xl border border-border bg-card flex flex-col justify-between gap-4 hover:border-coral-500/30 transition-all"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <p className="font-mono text-xs text-coral-500 mt-0.5">{project.tagline}</p>
                  <p className="text-xs text-foreground-muted mt-2.5 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/50 text-foreground-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-foreground-muted hover:text-coral-400 transition-colors"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Publications and Technical Writing */}
        <section aria-labelledby="pubs-heading" className="space-y-6 pt-8 border-t border-hairline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-coral-500" />
              <h2 id="pubs-heading" className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Publications &amp; Technical Writing
              </h2>
            </div>
            <Link
              href="/publications"
              className="font-mono text-xs text-foreground-subtle hover:text-coral-400 transition-colors inline-flex items-center gap-1"
            >
              <span>View publications index</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-sm text-foreground-muted leading-relaxed">
            Eshan Roy authors in-depth engineering analyses on systems programming, operating system
            architecture, and autonomous agent runtimes. Articles are indexed with canonical Person entity
            attribution.
          </p>
        </section>

        {/* Section 9: Verified Professional Profiles */}
        <section aria-labelledby="profiles-heading" className="space-y-6 pt-8 border-t border-hairline">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-coral-500" />
            <h2 id="profiles-heading" className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Verified Professional Profiles
            </h2>
          </div>

          <p className="text-xs font-mono text-foreground-subtle">
            The following external profiles have been verified to authoritatively represent Eshan Roy ({identity.alternateName}).
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(identity.profiles).map(([key, profile]) => (
              <a
                key={key}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg border border-border bg-card hover:border-coral-500/40 hover:bg-secondary/20 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-sm font-semibold text-foreground">
                      {profile.platform}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Verified" />
                  </div>
                  <span className="font-mono text-xs text-foreground-subtle">
                    {profile.username}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-foreground-subtle group-hover:text-coral-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </section>

        {/* Section 10: Contact and Canonical Links */}
        <section aria-labelledby="contact-heading" className="space-y-4 pt-8 border-t border-hairline pb-8">
          <h2 id="contact-heading" className="font-display text-2xl font-semibold text-foreground">
            Contact &amp; Canonical Reference
          </h2>
          <div className="p-5 rounded-xl border border-border/80 bg-secondary/10 space-y-2 text-xs font-mono text-foreground-muted">
            <p>
              <span className="text-foreground-subtle">Canonical URL:</span>{' '}
              <a href={identity.canonicalUrl} className="text-coral-400 hover:underline">
                {identity.canonicalUrl}
              </a>
            </p>
            <p>
              <span className="text-foreground-subtle">Schema.org Person URI:</span>{' '}
              <span className="text-foreground">https://eshanized.is-a.dev/#person</span>
            </p>
            <p>
              <span className="text-foreground-subtle">Organization URI:</span>{' '}
              <a href={identity.organization.url} target="_blank" rel="noopener noreferrer" className="text-coral-400 hover:underline">
                https://tonmoyinfrastructure.org/#organization
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
