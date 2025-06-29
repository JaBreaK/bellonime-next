// src/components/NavItem.tsx (Versi Upgrade dengan Active State)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // <-- Import hook baru
import type { LucideProps } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  Icon: React.ComponentType<LucideProps>;
}

export default function NavItem({ href, label, Icon }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname(); // <-- Dapatkan path URL saat ini

  // Cek apakah link ini sedang aktif
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="relative flex flex-col items-center justify-center gap-1 w-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Icon 
          className={`transition-colors ${isActive ? 'text-glow' : 'text-text-dim'}`} 
          size={24} 
        />
      </motion.div>
      
      {/* Indikator titik untuk tab yang aktif */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 h-1 w-1 bg-glow rounded-full"
          layoutId="active-indicator" // Animasi pindah antar item
        />
      )}

      {/* Tooltip untuk Desktop */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="hidden md:block absolute top-[-30px] px-2 py-1 bg-bg-off border border-primary/20 rounded-md text-xs text-text-bright shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}