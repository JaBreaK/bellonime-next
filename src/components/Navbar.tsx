// src/components/Navbar.tsx (Versi Baru yang Canggih)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Clapperboard, CheckCircle2, CalendarDays, Library, Shapes, Search } from 'lucide-react';
import SearchInput from './SearchInput';

// Kita duplikat navItems di sini karena Navbar sekarang jadi master di mobile
const navItems = [
    { href: "/", label: "Home", Icon: Home },
    { href: "/ongoing", label: "Ongoing", Icon: Clapperboard },
    { href: "/completed", label: "Completed", Icon: CheckCircle2 },
    { href: "/schedule", label: "Jadwal", Icon: CalendarDays },
    { href: "/anime", label: "Daftar Anime", Icon: Library },
    { href: "/genres", label: "Genre", Icon: Shapes },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-bg-off/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          {/* Tombol Hamburger (hanya di mobile) */}
          <button className="md:hidden text-text-bright" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
          
          {/* Judul Halaman atau Logo (di desktop, logo ada di sidebar) */}
          <div className="hidden md:block">
            {/* Bisa diisi judul halaman dinamis nanti */}
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end">
            <SearchInput />
          </div>
        </div>
      </header>

      {/* Menu Mobile (Slide-in dari kiri) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-bg-dark z-50 p-4 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="text-2xl font-display font-bold text-glow">
                Bellonime
              </Link>
              <button className="text-text-bright" onClick={() => setIsMenuOpen(false)}>
                <X />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navItems.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg text-text-dim hover:text-glow">
                  <item.Icon size={22} />
                  {item.label}
                </Link>
              ))}
              <Link href="/search" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg text-text-dim hover:text-glow">
                  <Search size={22} />
                  Search
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}