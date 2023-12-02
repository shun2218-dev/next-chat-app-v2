import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/*/home', '/*/private/', '/*/group/*'],
    },
    sitemap: 'https://next-chat-app-v2-gold.vercel.app/sitemap.xml',
  };
}
