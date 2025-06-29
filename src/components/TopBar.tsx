// src/components/TopBar.tsx
import SearchInput from './SearchInput';
import ThemeToggleButton from './ThemeToggleButton';

export default function TopBar() {
  return (
    // Kita buat sticky biar nempel di atas
    <header className="sticky top-0 z-40 bg-bg-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Kosong di kiri untuk memberi ruang */}
        <div className="flex-1"></div>
        
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