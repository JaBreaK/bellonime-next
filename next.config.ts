import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.cloud',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // Kalau nanti ada domain lain, tinggal tambahkan object baru di sini
    ],
  },
};

export default nextConfig;
