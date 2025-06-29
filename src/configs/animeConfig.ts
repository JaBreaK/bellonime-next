// src/configs/animeConfig.ts

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

// ✅ Gunakan ENV server-side only (TIDAK pakai NEXT_PUBLIC_)
const apiUrl = process.env.API_URL || "https://bellonime.vercel.app/";

const animeConfig: AnimeConfig = {
  bellonime: {
    siteName: "BeloNime",
    description:
      "Nonton anime Terbaru dan Terlengkap Sub Indo dengan kualitas terbaik dan tercepat tanpa iklan. Bellonime menyediakan anime streaming gratis. Update setiap hari. Bantu share ya teman-teman.",
    logo: "/images/logo.png",
    favicon: "/favicon.png",
    image: "/images/bellonime.png",
  },

  bellonimeApi: {
    apiUrl,
    baseUrlPath: "/otakudesu",
  },
};

export default animeConfig;
