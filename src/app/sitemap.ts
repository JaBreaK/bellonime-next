// src/app/sitemap.ts (Versi Final dengan Tipe yang Benar)
import { MetadataRoute } from 'next';
import allAnimeService from '@/services/allAnimeService';
import genreService from '@/services/genreService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bellonime.web.id'; // Pastikan ini URL website-mu

  // 1. URL Statis
  const staticRoutes: MetadataRoute.Sitemap = [
    '/', '/ongoing', '/completed', '/schedule', '/anime', '/genres',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '/' ? 1 : 0.8,
  }));

  // 2. URL Anime
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

  // 3. URL Genre
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

  // Gabungkan semua array yang sudah punya tipe data yang benar
  return [...staticRoutes, ...animeRoutes, ...genreRoutes];
}