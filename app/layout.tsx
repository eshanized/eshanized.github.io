import './globals.css';
import './snigdha-theme.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { NotificationProvider } from '@/components/ios/NotificationProvider';
import { MobileCheck } from '@/components/mobile-check';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: 'Eshan Roy | Full Stack Developer',
    template: '%s | Eshan Roy'
  },
  description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies. Explore my portfolio featuring iOS-style web applications and innovative projects.',
  keywords: [
    'Eshan Roy',
    'Full Stack Developer',
    'Web Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript',
    'Tailwind CSS',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'UI/UX Designer'
  ],
  authors: [{ name: 'Eshan Roy', url: 'https://github.com/eshanized' }],
  creator: 'Eshan Roy',
  publisher: 'Eshan Roy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eshanized.is-a.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'Eshan Roy | Full Stack Developer',
    description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies. Explore my portfolio featuring iOS-style web applications and innovative projects.',
    url: 'https://eshanized.is-a.dev',
    siteName: 'Eshan Roy Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eshan Roy - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eshan Roy | Full Stack Developer',
    description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies.',
    creator: '@eshanized',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
    other: {
      me: ['your-social-profile-url'],
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body className="font-sf-pro antialiased">
        <ThemeProvider>
          <NotificationProvider>
            <MobileCheck>
              {children}
            </MobileCheck>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}