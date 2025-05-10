import './globals.css';
import './snigdha-theme.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ios/ThemeContext';
import { NotificationProvider } from '@/components/ios/NotificationProvider';
import { MobileCheck } from '@/components/mobile-check';

export const metadata: Metadata = {
  title: 'Eshanized Web',
  description: 'Personal portfolio and projects showcase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sf-pro">
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