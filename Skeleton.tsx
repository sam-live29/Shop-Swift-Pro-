
import React, { useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

export const SkeletonPulse: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
    {children}
  </div>
);

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 z-10">
          <SkeletonPulse className="w-full h-full rounded-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-300" size={20} />
          </div>
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
          <ImageOff size={24} className="text-gray-300 mb-2" />
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Image Unreachable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
    </div>
  );
};

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-transparent p-3 h-full flex flex-col shadow-sm">
      <SkeletonPulse className="aspect-[4/5] rounded-lg mb-4 w-full" />
      <div className="flex-1 space-y-3">
        <SkeletonPulse className="h-4 w-3/4" />
        <SkeletonPulse className="h-3 w-1/2" />
        <div className="flex items-center gap-2">
          <SkeletonPulse className="h-5 w-10 rounded-md" />
          <SkeletonPulse className="h-3 w-16" />
        </div>
        <div className="flex items-baseline gap-2 pt-2">
          <SkeletonPulse className="h-6 w-20" />
          <SkeletonPulse className="h-4 w-12" />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
           <SkeletonPulse className="h-8 rounded-lg" />
           <SkeletonPulse className="h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const FilterSkeleton: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-3">
        <SkeletonPulse className="h-4 w-1/3 mb-4" />
        <div className="flex justify-between mb-4">
          <SkeletonPulse className="h-10 w-[45%] rounded-lg" />
          <SkeletonPulse className="h-10 w-[45%] rounded-lg" />
        </div>
        <SkeletonPulse className="h-1.5 w-full rounded-full" />
      </div>
      <div className="space-y-4">
        <SkeletonPulse className="h-4 w-1/2" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonPulse className="h-4 w-4 rounded" />
            <SkeletonPulse className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const BannerSkeleton: React.FC = () => (
  <SkeletonPulse className="h-44 sm:h-96 w-full rounded-xl" />
);

export const CategoryBarSkeleton: React.FC = () => (
  <div className="flex justify-start sm:justify-center gap-6 sm:gap-10 py-6 overflow-hidden">
    {[1, 2, 3, 4, 5, 6, 7].map(i => (
      <div key={i} className="flex flex-col items-center gap-4 shrink-0">
        <SkeletonPulse className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl" />
        <SkeletonPulse className="h-3 w-12" />
      </div>
    ))}
  </div>
);

export const SectionHeaderSkeleton: React.FC = () => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <SkeletonPulse className="w-10 h-10 rounded-2xl" />
      <div className="space-y-2">
        <SkeletonPulse className="h-4 w-32" />
        <SkeletonPulse className="h-2 w-24" />
      </div>
    </div>
    <SkeletonPulse className="h-8 w-24 rounded-full" />
  </div>
);

export const ProductGridSkeleton: React.FC<{ count?: number; cols?: string }> = ({ count = 6, cols = "grid-cols-2 md:grid-cols-4 lg:grid-cols-6" }) => (
  <div className={`grid ${cols} gap-4`}>
    {Array.from({ length: count }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
);
