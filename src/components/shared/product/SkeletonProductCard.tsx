// components/ProductCard/SkeletonProductCard.tsx

import SkeletonBase from '@/components/skeleton/SkeletonBase';

export default function SkeletonProductCard() {
  return (
    <div className="bg-white dark:bg-pr-300">
      {/* Image placeholder with your SVG */}
      <div className="relative w-full aspect-[1/1] bg-pr-100 border-16 border-pr-100 overflow-hidden">
        <img
          src="/placeholders/coffee-placeholder.svg"
          alt="Loading coffee"
          className="absolute top-0 left-0 w-full h-full object-cover animate-pulse opacity-70"
        />
      </div>

      {/* Text placeholders */}
      <div className="mt-4 space-y-2 mb-10 p-3">
        <SkeletonBase width="w-1/4" height="h-6" />
        <SkeletonBase width="w-full" height="h-4" />
        <SkeletonBase width="w-1/2" height="h-4" />
      </div>
    </div>
  );
}
