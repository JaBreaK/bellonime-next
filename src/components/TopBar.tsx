// src/components/TopBar.tsx
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from './SearchInput';
import ThemeToggleButton from './ThemeToggleButton';

export default function TopBar() {
  return (
    // Sticky agar nempel di atas
    <header className="sticky top-0 z-40 bg-bg-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo di kiri */}
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
        
        {/* Tombol tema di kanan */}
        <div className="flex-1 flex justify-end">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
