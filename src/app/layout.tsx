// src/app/layout.tsx
import type { Metadata } from 'next';
import { Exo_2, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-exo2',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bellonime - Experience Anime Streaming',
  description: 'Website nonton anime subtitle indonesia dengan UI/UX terbaik.',
    verification: {
    google: 'O4dWbm7nlHbWNU0LkBKPZ8QOkL0Ncc_-8Cp_g_41rgQ', // <-- KODE LO MASUK DI SINI
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo2.variable} ${inter.variable} font-sans 
  bg-white dark:bg-bg-dark 
  text-gray-800 dark:text-text-bright
  transition-colors duration-300
`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sidebar permanen di kiri (hanya desktop) & bottom nav (hanya mobile) */}
          <Sidebar />

          {/* Wrapper untuk semua konten yang ada di kanan sidebar */}
          <div className="md:pl-20"> 
            {/* TopBar baru kita untuk Search & Theme */}
            <TopBar />
            
            {/* Konten utama halaman */}
            <main className="pt-2 pb-4 pl-4 pr-4 sm:pt-3 sm:pb-6 sm:pl-6 sm:pr-6 lg:pt-4 lg:pb-8 lg:pl-8 lg:pr-8 mb-16 md:mb-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}