// src/components/SkeletonCard.tsx

export default function SkeletonCard() {
  return (
    <div className="space-y-2">
      {/* Kotak untuk poster */}
      <div className="aspect-[2/3] w-full bg-gray-800 rounded-md"></div>
      {/* Garis untuk judul */}
      <div className="h-4 w-3/4 bg-gray-800 rounded-md"></div>
    </div>
  );
}