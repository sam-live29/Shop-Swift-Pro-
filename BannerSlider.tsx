
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './Skeleton';

interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  badge: string;
}

const BANNERS: Banner[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop',
    title: 'THE KING SALE',
    subtitle: 'Extra 10% Instant Discount on HDFC Bank Cards*',
    cta: 'Shop the Sale',
    badge: 'Biggest Festival Sale'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    title: 'FASHION HUB',
    subtitle: 'Up to 70% Off on Top International Brands',
    cta: 'Browse Styles',
    badge: 'Trending Styles'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop',
    title: 'TECH CARNIVAL',
    subtitle: 'Latest Smartphones & Laptops Starting at ₹12,999',
    cta: 'Grab Offers',
    badge: 'New Launch'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1600&auto=format&fit=crop',
    title: 'HOME MAKEOVER',
    subtitle: 'Smart Kitchen & Appliances with Free Installation',
    cta: 'Explore All',
    badge: 'House Special'
  }
];

const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const next = (currentIndex + 1) % BANNERS.length;
        scrollToIndex(next);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleManualScroll = () => {
    if (scrollRef.current) {
      setIsAutoPlaying(false);
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  const goPrev = () => {
    setIsAutoPlaying(false);
    const next = currentIndex === 0 ? BANNERS.length - 1 : currentIndex - 1;
    scrollToIndex(next);
  };

  const goNext = () => {
    setIsAutoPlaying(false);
    const next = (currentIndex + 1) % BANNERS.length;
    scrollToIndex(next);
  };

  return (
    <div className="relative group w-full overflow-hidden sm:rounded-xl shadow-lg bg-white">
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        onScroll={handleManualScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar h-44 sm:h-96"
        style={{ scrollBehavior: 'smooth' }}
      >
        {BANNERS.map((banner) => (
          <div 
            key={banner.id} 
            className="w-full flex-shrink-0 h-full snap-center relative cursor-pointer"
          >
            <SafeImage 
              src={banner.image} 
              className="w-full h-full object-cover" 
              alt={banner.title} 
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-6 sm:px-16 text-white z-20">
              <span className="text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] mb-2 text-yellow-400 animate-in slide-in-from-left duration-500">
                {banner.badge}
              </span>
              <h1 className="text-3xl sm:text-7xl font-black italic tracking-tighter leading-none mb-2 animate-in slide-in-from-left duration-700">
                {banner.title}
              </h1>
              <p className="text-xs sm:text-xl mt-1 opacity-90 font-bold max-w-sm sm:max-w-lg animate-in slide-in-from-left duration-1000">
                {banner.subtitle}
              </p>
              <button className="mt-6 w-max bg-[#ff5221] text-white px-8 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl active:scale-95 animate-in slide-in-from-bottom duration-1000">
                {banner.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-30"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-30"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsAutoPlaying(false); scrollToIndex(i); }}
            className={`h-1.5 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-[#ff5221]' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
