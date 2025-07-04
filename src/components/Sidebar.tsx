// src/components/Sidebar.tsx (Versi App-Like)
'use client';

import Link from 'next/link';
import { Home, Clapperboard, CheckCircle2, CalendarDays, Library, Tag, Search } from 'lucide-react';
import NavItem from './NavItem'; // Kita tetap pakai NavItem yang sudah di-upgrade


// Definisikan item navigasi
const navItems = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/ongoing", label: "Ongoing", Icon: Clapperboard },
  { href: "/completed", label: "Completed", Icon: CheckCircle2 },
  { href: "/schedule", label: "Jadwal", Icon: CalendarDays },
  { href: "/anime", label: "Daftar Anime", Icon: Library },
  { href: "/genres", label: "Genre", Icon: Tag },
];

// Pisahkan search karena perilakunya beda di mobile
const searchItem = { href: "/search", label: "Search", Icon: Search };

export default function Sidebar() {
  return (
    <>
      {/* Sidebar untuk Desktop (kiri) */}
      <aside className="hidden md:flex flex-col items-center w-20 bg-bg-off border-r border-primary/10 py-4 fixed h-full z-50">
        <Link href="/" className="text-3xl font-display font-bold text-glow mb-10">
          B
        </Link>
        <nav className="flex flex-col items-center gap-8">
          {[...navItems, searchItem].map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>
      </aside>

      {/* Bottom Navigation untuk Mobile */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-off/80 backdrop-blur-lg border-t border-primary/10 z-50">
        <nav className="flex justify-around items-center h-full">
          {/* Tampilkan 5 ikon utama di mobile */}
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>
      </aside>
    </>
  );
}