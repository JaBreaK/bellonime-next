import type { Format, Quality } from '@/types';
import {  Layers } from 'lucide-react'; // Menambahkan ikon untuk visual

interface DownloadSectionProps {
  downloadUrl: {
    formats?: Format[];
    qualities?: Quality[];
  } | null;
}

export default function DownloadSection({ downloadUrl }: DownloadSectionProps) {
  // --- FUNGSI & LOGIKA ASLI ANDA (TIDAK DIUBAH) ---
  if (!downloadUrl || (!downloadUrl.formats && !downloadUrl.qualities)) {
    return null;
  }

  const allFormats = downloadUrl.formats || [{ title: 'Resolusi Tersedia', qualities: downloadUrl.qualities || [] }];
  // --- AKHIR FUNGSI & LOGIKA ASLI ANDA ---

  return (
    // Section utama dengan pemisah visual
    <div className="border-t-2 border-white/10 mt-8 pt-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 ">Link Download</h2>
      <div className="space-y-8"> {/* Memberi jarak lebih antar format/batch */}
        {allFormats.map((format, index) => (
          <div key={format.title || index}>
            {/* Judul format (untuk batch) dibuat lebih menonjol */}
            <h3 className="flex items-center gap-3 text-xl font-semibold mb-4">
              <Layers size={20} className="text-primary" />
              <span>{format.title}</span>
            </h3>
            
            <div className="space-y-5">
              {format.qualities.map((quality) => (
                // "Card" untuk setiap kualitas, dengan border, bukan background solid
                <div key={quality.title} className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground">
                    {quality.title}
                    <span className="text-sm text-text-dim ml-2">({quality.size})</span>
                  </h4>
                  {/* Grid untuk link download agar rapi dan responsif */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mt-3">
                    {quality.urls?.map(link => (
                      <a
                        key={link.title}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        // Tombol link dengan style minimalis (hover & lift effect)
                        className="
                          bg-card text-foreground font-medium
                          border border-border
                          hover:bg-primary hover:text-white hover:border-primary
                          transition-all duration-200 text-center p-2 rounded-md text-sm
                          hover:-translate-y-1
                          flex items-center justify-center gap-2
                        "
                      >
                        {/* Ikon opsional untuk memperjelas */}
                        {/* <Download size={14} /> */}
                        <span>{link.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}