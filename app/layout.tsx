import { Suspense } from 'react';
import type { Metadata } from 'next';
import '@/styles/fonts/soLovely.css';
import '@/styles/globals.scss';
import { Analytics } from '@vercel/analytics/react';

import Header from '@/components/header';

export const metadata: Metadata = {
  title: {
    default: 'Next Chat App',
    template: '`%s | Next Chat App',
  },
  description: 'This is a application for chatting powered by Next.js.',
  metadataBase: new URL('https://next-chat-app-v2-gold.vercel.app'),
  openGraph: {
    title: {
      default: 'Next Chat App',
      template: '`%s | Next Chat App',
    },
    description: 'This is a application for chatting powered by Next.js.',
    images: 'opengraph-image.png',
    url: 'https://next-chat-app-v2-gold.vercel.app',
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
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV !== 'production' && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script data-project-id={process.env.METICULOUS_PROJECT_ID!} src={process.env.METICULOUS_SCRIPT} />
        )}
      </head>
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
        <Analytics />
      </body>
    </html>
  );
}
