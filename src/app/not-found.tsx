// src/app/not-found.tsx
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center h-[70vh] text-center">
      <FileQuestion className="text-glow" size={80} />
      <h1 className="mt-8 text-4xl font-display font-bold text-foreground">
        404 - Not Found
      </h1>
      <p className="mt-4 text-lg text-dim">
        Waduh, halaman yang lo cari sepertinya sudah pindah ke isekai. 🚛
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-glow text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-glow/20"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}