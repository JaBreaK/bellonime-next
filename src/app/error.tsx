// src/app/error.tsx
'use client'; // <-- WAJIB!

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ini ke sistem monitoring (Sentry, LogRocket, dll)
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col justify-center items-center h-[70vh] text-center">
      <AlertTriangle className="text-red-500" size={80} />
      <h1 className="mt-8 text-4xl font-display font-bold text-foreground">
        Oops! Terjadi Kesalahan
      </h1>
      <p className="mt-4 text-lg text-dim">
        Sepertinya ada yang rusak. Tim kami sudah diberi tahu.
      </p>
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => reset()}
          className="bg-primary hover:bg-glow text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="bg-card hover:bg-border text-foreground font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Kembali ke Home
        </Link>
      </div>
    </main>
  );
}