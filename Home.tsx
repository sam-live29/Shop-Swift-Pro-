
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import BannerSlider from '../components/BannerSlider';
import TrustBanner from '../components/TrustBanner';
import { PRODUCTS } from '../constants';
import { Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Product } from '../types';
import { 
  BannerSkeleton, 
  CategoryBarSkeleton, 
  ProductGridSkeleton, 
  SectionHeaderSkeleton 
} from '../components/Skeleton';

interface HomeProps {
  wishlist: string[];
  onToggleWishlist: (id: string, event?: React.MouseEvent) => void;
  onAddToCart: (item: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
  comparisonList: Product[];
  onToggleComparison: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ 
  wishlist, 
  onToggleWishlist, 
  onAddToCart,
  comparisonList,
  onToggleComparison
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState('02:45:12');
  
  const [isLoading, setIsLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem('shopswift_home_visited');
    const forceSkeleton = sessionStorage.getItem('force_skeleton');
    return !hasVisited || forceSkeleton === 'true';
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('shopswift_home_visited', 'true');
        sessionStorage.removeItem('force_skeleton');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const topDeals = PRODUCTS.filter(p => p.isAssured).sort((a, b) => b.rating - a.rating).slice(0, 12);
  const fashionSpotlight = PRODUCTS.filter(p => p.category === 'fashion').slice(0, 12);
  const gadgetsSpotlight = PRODUCTS.filter(p => p.category === 'mobiles' || p.category === 'electronics').slice(0, 6);

  return (
    <div className="pb-24 bg-[#f1f3f6] overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto w-full overflow-x-hidden px-0 sm:px-2">
        <div className="py-2">
          {isLoading ? <BannerSkeleton /> : <BannerSlider />}
        </div>

        {isLoading ? (
          <div className="bg-white px-4">
            <CategoryBarSkeleton />
          </div>
        ) : (
          <CategoryBar />
        )}

        {/* Deals of the Day */}
        <section className="bg-white p-4 sm:p-6 mb-2 shadow-sm rounded-xl">
          {isLoading ? (
            <>
              <SectionHeaderSkeleton />
              <ProductGridSkeleton />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Deals of the Day</h2>
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black border border-red-100">
                    <Clock size={14} className="animate-pulse" /> {timeLeft}
                  </div>
                </div>
                <button onClick={() => navigate('/search')} className="text-[#ff5221] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {topDeals.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                    isComparing={comparisonList.some(p => p.id === product.id)}
                    onToggleComparison={onToggleComparison}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Multi-Banner Promotion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          {[
            'https://images.unsplash.com/photo-1483985988355-763728e1935b',
            'https://images.unsplash.com/photo-1556742044-3c52d6e88c62',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420'
          ].map((url, i) => (
            <div key={i} className="h-40 sm:h-56 bg-white rounded-xl overflow-hidden relative cursor-pointer shadow-sm group">
               {isLoading ? (
                 <div className="w-full h-full bg-gray-100 animate-pulse" />
               ) : (
                 <>
                  <img src={`${url}?q=80&w=600&auto=format&fit=crop`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-black/20 p-6 text-white flex flex-col justify-end">
                      <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-1">New Selection</p>
                      <p className="text-xl sm:text-2xl font-black leading-tight uppercase tracking-tighter italic">Limited Offer {i + 1}</p>
                  </div>
                 </>
               )}
            </div>
          ))}
        </div>

        {/* Gadgets Section */}
        <section className="bg-[#1a1a3a] p-6 mb-2 shadow-sm rounded-xl text-white">
           {isLoading ? (
             <>
               <SectionHeaderSkeleton />
               <ProductGridSkeleton />
             </>
           ) : (
             <>
              <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">Top Rated Tech</h2>
                    <p className="text-xs opacity-60 font-bold uppercase tracking-widest mt-1">Latest Mobiles & Accessories</p>
                  </div>
                  <button onClick={() => navigate('/search?category=mobiles')} className="bg-white text-[#1a1a3a] px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Explore Tech</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {gadgetsSpotlight.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                    />
                  ))}
              </div>
             </>
           )}
        </section>

        {/* Best of Fashion */}
        <section className="bg-white p-4 sm:p-6 mb-8 shadow-sm rounded-xl">
          {isLoading ? (
            <>
              <SectionHeaderSkeleton />
              <ProductGridSkeleton />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Best of Fashion</h2>
                <button onClick={() => navigate('/search?category=fashion')} className="text-[#ff5221] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                  See All <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {fashionSpotlight.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Company Advertisement: Security and Trusted Banner */}
        <TrustBanner />
      </div>
    </div>
  );
};

export default Home;
