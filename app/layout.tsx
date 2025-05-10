import './globals.css';
import './snigdha-theme.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { MobileCheck } from '@/components/mobile-check';

export const metadata: Metadata = {
  title: 'Eshan Roy | Portfolio',
  description: 'Personal portfolio website of Eshan Roy, showcasing skills, projects and experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sf-pro">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MobileCheck>
            {children}
          </MobileCheck>
        </ThemeProvider>
      </body>
    </html>
  );
}