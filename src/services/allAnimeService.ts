// src/services/allAnimeService.ts (INI FILE BARU)

import skuy from '@/utils/skuy';
import type { AllAnimes } from '@/types'; // Pastikan AllAnimes di-export dari types

export default async function allAnimeService() {
  console.log("Mencoba mengambil data SEMUA ANIME untuk sitemap..."); // Log untuk debugging
  const result = await skuy<AllAnimes>("/anime");
  return result;
}