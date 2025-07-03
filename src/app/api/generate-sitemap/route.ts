// src/app/api/generate-sitemap/route.ts

import { NextResponse } from 'next/server';
import allAnimeService from '@/services/allAnimeService';
import genreService from '@/services/genreService';
import animeInfoService from '@/services/animeInfoService'; // <-- Import service baru

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fungsi untuk membuat string XML
function generateSitemapXml(routes: { url: string, lastModified: Date }[]) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  routes.forEach(route => {
    xml += `
      <url>
        <loc>${route.url}</loc>
        <lastmod>${route.lastModified.toISOString()}</lastmod>
      </url>
    `;
  });
  xml += `</urlset>`;
  return xml;
}

export async function GET() {
  const baseUrl = 'https://bellonime.web.id';

  try {
    console.log('Mulai membuat sitemap LENGKAP...');
    const staticRoutes = [/*...*/].map(route => ({ url: `${baseUrl}${route}`, lastModified: new Date() }));
    console.log('URL Statis selesai.');

    const { data: allGenreData } = await genreService();
    const genreRoutes = allGenreData?.genreList.map(genre => ({ url: `${baseUrl}/genres/${genre.genreId}`, lastModified: new Date() })) ?? [];
    console.log(`Berhasil generate ${genreRoutes.length} URL genre.`);

    const { data: allAnimeData } = await allAnimeService();
    const allAnime = allAnimeData?.list.flatMap(group => group.animeList) ?? [];
    const animeRoutes = allAnime.map(anime => ({
      url: `${baseUrl}/anime/${anime.animeId}`,
      lastModified: new Date(),
    }));
    console.log(`Berhasil generate ${animeRoutes.length} URL detail anime.`);

    // --- BAGIAN YANG DIUBAH: DARI PROMISE.ALL MENJADI LOOP SOPAN ---
    let episodeRoutes: { url: string, lastModified: Date }[] = [];
    console.log(`Mengambil detail episode dari ${allAnime.length} anime. Proses ini akan SANGAT LAMA, harap tunggu...`);
    
    for (const [index, anime] of allAnime.entries()) {
      try {
        const { data: detail } = await animeInfoService({ animeId: anime.animeId });
        if (detail?.episodeList) {
          const episodes = detail.episodeList.map(ep => ({
            url: `${baseUrl}/watch/${ep.episodeId}`,
            lastModified: new Date(),
          }));
          episodeRoutes.push(...episodes);
        }
        // Kasih jeda 50 milidetik antar request biar server nggak marah
        await sleep(50);
        console.log(`(${index + 1}/${allAnime.length}) Berhasil memproses: ${anime.title}`);

      } catch (e) {
        console.error(`Gagal memproses anime ${anime.animeId}, lanjut ke berikutnya...`, e);
      }
    }
    // -----------------------------------------------------------
    
    const allRoutes = [...staticRoutes, ...animeRoutes, ...genreRoutes, ...episodeRoutes];
    const sitemapContent = generateSitemapXml(allRoutes);
    console.log(`Sitemap selesai dibuat dengan total ${allRoutes.length} URL.`);

    return new Response(sitemapContent, {
      headers: { 'Content-Type': 'application/xml' },
    });

  } catch (error) {
    console.error(error);
    return new Response('Gagal membuat sitemap', { status: 500 });
  }
}