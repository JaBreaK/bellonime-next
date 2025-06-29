// src/components/AnimatedGrid.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Definisikan varian animasi untuk container dan itemnya
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Jeda waktu antar animasi setiap kartu
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Mulai dari 20px di bawah dan transparan
  visible: {
    y: 0,
    opacity: 1, // Muncul ke posisi asli dan tidak transparan
  },
};

export default function AnimatedGrid({ children }: { children: React.ReactNode }) {
  return (
    // Ini adalah container grid kita yang sekarang punya 'motion'
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8"
      variants={containerVariants}
      initial="hidden" // Kondisi awal
      animate="visible" // Kondisi akhir saat muncul
    >
      {/* Kita bungkus setiap 'children' (yaitu setiap AnimeCard) dengan motion.div juga */}
      {React.Children.map(children, child => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}