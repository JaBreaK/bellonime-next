// src/components/Footer.tsx
import Link from "next/link";
import { Github, Twitter, Instagram } from 'lucide-react'; // Import ikon

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-text-subtle border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Kolom 1: About */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-text-main">Bellonime</h3>
            <p className="text-sm">
              Website nonton anime subtitle indonesia gratis dan lengkap. Dibuat sebagai portofolio dan sarana belajar.
            </p>
          </div>
          {/* Kolom 2: Navigasi Cepat */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-text-main">Navigasi</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/ongoing" className="hover:text-primary transition-colors">Ongoing</Link></li>
              <li><Link href="/anime" className="hover:text-primary transition-colors">Daftar Anime</Link></li>
              <li><Link href="/schedule" className="hover:text-primary transition-colors">Jadwal</Link></li>
            </ul>
          </div>
          {/* Kolom 3: Sosial Media */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-text-main">Ikuti Kami</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Github size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Twitter size={24} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Bellonime. Dibuat dengan Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}