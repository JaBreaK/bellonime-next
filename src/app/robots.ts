// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Contoh jika ada halaman private
    },
    sitemap: 'https://bellonime.web.id/sitemap.xml',
  };
}