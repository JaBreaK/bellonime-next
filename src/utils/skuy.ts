// src/utils/skuy.ts (Versi Upgrade)

import animeConfig from '@/configs/animeConfig';
import generateUrlPath from "./generateUrlPath";
import type { Pagination } from '@/types'; // Asumsi lo punya tipe Pagination

// Interface ini sudah sempurna, JANGAN DIUBAH
interface Payload<T> {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: T;
  pagination: Pagination | null; // Asumsi lo punya tipe Pagination
}

const {
  bellonimeApi: { apiUrl, baseUrlPath },
} = animeConfig;

export default async function skuy<T>(pathname: string): Promise<Payload<T>> {
  pathname = generateUrlPath(baseUrlPath, pathname);

  const url = new URL(pathname, apiUrl).href;

  // Cukup tambahkan object kedua di fetch!
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // <-- KEKUATAN SUPER DI SINI. Cache 1 jam.
  });

  // Sedikit tambahan untuk error handling biar lebih mantap
  if (!response.ok) {
    const errorResult = await response.json();
    throw new Error(errorResult.message || "Terjadi kesalahan pada server");
  }

  const result = await response.json();
  return result;
}