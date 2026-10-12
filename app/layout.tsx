import './globals.css';
import type { Metadata } from 'next';
import { Marcellus, Inter, JetBrains_Mono } from 'next/font/google';
import { createMetadata } from '@/lib/metadata';
import {
  createPersonJsonLd,
  createWebsiteJsonLd,
  createProfilePageJsonLd,
} from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

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
  const websiteJsonLd = createWebsiteJsonLd();
  const profilePageJsonLd = createProfilePageJsonLd();

  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: '#0d0a07',
  width: 'device-width',
  initialScale: 1,
};
