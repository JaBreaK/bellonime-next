// src/configs/animeConfig.ts (Versi Next.js)

// HAPUS BARIS INI:
// import { API_URL } from "astro:env/server";

interface AnimeConfig {
  bellonime: {
    siteName: string;
    description: string;
    logo: string;
    favicon: string;
    image: string;
  };

  bellonimeApi: {
    apiUrl: string;
    baseUrlPath: string;
  };
}

const animeConfig: AnimeConfig = {
  bellonime: {
    siteName: "BeloNime",
    description: "Nonton anime Terbaru dan Terlengkap Sub Indo dengan kualitas terbaik dan tercepat tanpa iklan. Bellonime menyediakan anime streaming gratis. Update setiap hari. Bantu share ya teman-teman.",
    logo: "/images/logo.png",
    favicon: "/favicon.png",
    image: "/images/bellonime.png",
  },

  bellonimeApi: {
    // UBAH BARIS INI:
    apiUrl: process.env.API_URL || "https://bellonime.vercel.app/", // Gunakan process.env
    baseUrlPath: "/otakudesu",
  },
};

export default animeConfig;