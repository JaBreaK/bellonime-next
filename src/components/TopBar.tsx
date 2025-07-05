// src/components/TopBar.tsx
'use client'; // <-- TopBar perlu jadi client component karena ThemeToggleButton ada di dalamnya

import Link from 'next/link';
import Image from 'next/image';
import SearchInput from './SearchInput';
import ThemeToggleButton from './ThemeToggleButton';
import { Coffee } from 'lucide-react'; // <-- 1. Import ikon kopi

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo di kiri (Bisa dikosongkan jika mau pakai Sidebar saja) */}
        <div className="flex-1 flex items-center">
          <Link href="/">
            <Image
              src="/favicon.ico"       // ganti ke path/logo file-mu
              alt="Logo BelloNime"
              width={32}            // atur sesuai kebutuhan
              height={32}
            />
          </Link>
        </div>
        
        {/* Search bar di tengah */}
        <div className="flex-1 flex justify-center">
          <SearchInput />
        </div>
        
        {/* Kumpulan Ikon di kanan */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {/* 2. Tambahkan tombol donasi di sini */}
          <a 
            href="https://saweria.co/adetf" // <-- GANTI DENGAN LINK DONASI LO
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full text-text-dim hover:text-foreground hover:bg-card transition-colors"
            title="Dukung dengan Kopi"
          >
            <Coffee size={20} />
          </a>

          {/* Tombol ganti tema */}
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}