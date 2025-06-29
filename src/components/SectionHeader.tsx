// src/components/SectionHeader.tsx (Versi "Pinky Glow")

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  href: string;
}

export default function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    // INI PERUBAHANNYA: Tambahkan border kiri dengan warna 'glow' kita
    <div className="flex mt-10 justify-between items-center mb-6 border-l-4 border-glow pl-4">
      <h2 className="font-display text-3xl font-bold text-foreground">
        {title}
      </h2>
      <Link
        href={href}
        className="flex items-center gap-2 text-sm font-medium text-dim hover:text-glow transition-colors"
      >
        Lihat Semua <ArrowRight size={16} />
      </Link>
    </div>
  );
}