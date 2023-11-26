import { Suspense } from 'react';
import type { Metadata } from 'next';
import '@/styles/fonts/soLovely.css';
import '@/styles/globals.scss';

import Header from '@/components/header';

export const metadata: Metadata = {
  title: {
    default: 'Next Chat App',
    template: '`%s | Next Chat App',
  },
  description: 'This is a application for chatting powered by Next.js.',
  openGraph: {
    title: {
      default: 'Next Chat App',
      template: '`%s | Next Chat App',
    },
    description: 'This is a application for chatting powered by Next.js.',
    images: 'opengraph-image.png',
  },
  twitter: {
    title: {
      default: 'Next Chat App',
      template: '`%s | Next Chat App',
    },
    description: 'This is a application for chatting powered by Next.js.',
    card: 'summary_large_image',
    images: 'twitter-image.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Suspense
          fallback={
            <div>
              <div className="loader"></div>page loading...
            </div>
          }
        >
          <Header />
          <Suspense
            fallback={
              <div>
                <div className="loader"></div>
                contents loading...
              </div>
            }
          >
            {children}
          </Suspense>
        </Suspense>
      </body>
    </html>
  );
}
