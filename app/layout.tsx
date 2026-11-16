import './globals.css';
import type { Metadata } from 'next';
import { Marcellus, Inter, JetBrains_Mono } from 'next/font/google';
import {
  createMetadata,
  createPersonJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
  serializeJsonLd,
} from '@/lib/metadata';

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = createPersonJsonLd();
  const organizationJsonLd = createOrganizationJsonLd();
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Authoritative Person Entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(personJsonLd),
          }}
        />
        {/* Authoritative Organization Entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd),
          }}
        />
        {/* Authoritative WebSite Entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(websiteJsonLd),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-coral-500/20 selection:text-coral-300">
        {children}
      </body>
    </html>
  );
}
