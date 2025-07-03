// src/app/sitemap.ts (VERSI FINAL YANG BENAR)
import { MetadataRoute } from 'next';
import allAnimeService from '@/services/allAnimeService'; // Pastikan nama file ini benar
import genreService from '@/services/genreService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bellonime.web.id'; // Ganti dengan URL lo

  // 1. Kumpulkan URL Statis
  const staticRoutes = [
    '/', '/ongoing', '/completed', '/schedule', '/anime', '/genres',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '/' ? 1 : 0.8,
  }));

  // 2. Kumpulkan URL Anime
  let animeRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await allAnimeService();
    if (data?.list) {
      const allAnime = data.list.flatMap(group => group.animeList);
      animeRoutes = allAnime.map(anime => ({
        url: `${baseUrl}/anime/${anime.animeId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Gagal fetch anime untuk sitemap:", error);
  }

  // 3. Kumpulkan URL Genre
  let genreRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await genreService();
    if (data?.genreList) {
      genreRoutes = data.genreList.map(genre => ({
        url: `${baseUrl}/genres/${genre.genreId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Gagal fetch genre untuk sitemap:", error);
  }

  // 4. GABUNGKAN SEMUANYA DI SINI
  return [...staticRoutes, ...animeRoutes, ...genreRoutes];
}