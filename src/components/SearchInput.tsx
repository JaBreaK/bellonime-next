// src/components/SearchInput.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/search?q=${trimmedQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari anime..."
          className="
            w-full rounded-full
            px-5 py-2.5 pr-12 text-sm
            transition-all duration-300
            
            // --- Light Mode Styles ---
            bg-white
            text-neutral-900
            border border-neutral-300
            placeholder:text-neutral-500
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500

            // --- Dark Mode Styles ---
            dark:bg-neutral-800
            dark:text-neutral-100
            dark:border-neutral-600
            dark:placeholder:text-neutral-400
            dark:focus:ring-cyan-600 dark:focus:border-cyan-600
          "
        />
        <button
          type="submit"
          aria-label="Cari"
          className="
            absolute inset-y-0 right-0
            flex items-center
            pr-4 
            transition-colors duration-200
            
            // --- Light & Dark Mode Icon Styles ---
            text-neutral-500 
            hover:text-cyan-500
            dark:text-neutral-400
            dark:hover:text-cyan-400
          "
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}