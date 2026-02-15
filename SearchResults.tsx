
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import TrustBanner from '../components/TrustBanner';
import { 
  SlidersHorizontal, 
  SearchX, 
  Search, 
  Star, 
  X, 
  ChevronRight, 
  Zap,
  ShieldCheck,
  Filter,
  ArrowUpDown,
  Tag,
  RotateCcw
} from 'lucide-react';
import { FilterSkeleton, SkeletonPulse, SafeImage } from '../components/Skeleton';
import { CartItem, Product } from '../types';

const AmazonProductCard: React.FC<{
  product: Product;
  onAddToCart: (p: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
  onWishlist: (id: string, event?: React.MouseEvent) => void;
  isWishlisted: boolean;
}> = ({ product, onAddToCart, onWishlist, isWishlisted }) => {
  const navigate = useNavigate();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div 
      className="group bg-white border-b border-gray-100 p-4 flex gap-4 sm:gap-6 hover:bg-orange-50/20 transition-colors cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="w-32 h-32 sm:w-48 sm:h-48 shrink-0 bg-[#f7f7f7] rounded-xl p-3 relative flex items-center justify-center overflow-hidden border border-transparent group-hover:border-orange-100 transition-all">
        <SafeImage 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          containerClassName="w-full h-full"
        />
        {product.isAssured && (
          <div className="absolute top-0 left-0 bg-[#2874f0] text-white text-[7px] font-black px-2 py-0.5 rounded-br-lg uppercase tracking-widest z-20 shadow-sm flex items-center gap-1">
            <ShieldCheck size={8} fill="white" className="text-[#2874f0]" /> Assured
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-sm sm:text-base text-gray-900 font-bold line-clamp-2 leading-snug group-hover:text-[#ff5221] transition-colors">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-black">
              {product.rating.toFixed(1)} <Star size={10} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="text-xs text-gray-400 font-bold">
              ({product.reviewsCount.toLocaleString()} Reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
              ₹{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through font-bold">
                ₹{product.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs text-green-600 font-black uppercase tracking-tighter">
              {product.discount}
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mb-2 font-medium">
            Delivery by <span className="text-gray-900 font-bold">{formattedDate}</span> | <span className="text-green-600 font-bold italic">FREE Delivery</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ ...product, quantity: 1, selected: true }, false, e);
            }}
            className="flex-1 sm:flex-none bg-white border-2 border-gray-100 hover:border-orange-200 hover:bg-orange-50 text-gray-700 rounded-lg px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
          >
            Add To Cart
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ ...product, quantity: 1, selected: true }, true, e);
              navigate('/checkout');
            }}
            className="flex-1 sm:flex-none bg-gradient-to-r from-[#ff5221] to-[#fb641b] hover:from-[#fb641b] hover:to-[#ff5221] text-white rounded-lg px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-orange-200/50"
          >
            <Zap size={14} fill="currentColor" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

interface SearchResultsProps {
  wishlist: string[];
  onToggleWishlist: (id: string, event?: React.MouseEvent) => void;
  onAddToCart: (item: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
  comparisonList: Product[];
  onToggleComparison: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  wishlist, 
  onToggleWishlist, 
  onAddToCart,
  comparisonList,
  onToggleComparison
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [onlyAssured, setOnlyAssured] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [brandSearch, setBrandSearch] = useState('');

  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach(p => {
      const matchesSearch = query ? (p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())) : true;
      const matchesCategory = categoryParam ? p.category === categoryParam : true;
      if (matchesSearch && matchesCategory) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands).sort();
  }, [query, categoryParam]);

  const filteredBrands = availableBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));

  const filteredProducts = useMemo(() => {
    let results = PRODUCTS.filter(p => {
      const matchesSearch = query ? (p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())) : true;
      const matchesCategory = categoryParam ? p.category === categoryParam : true;
      const matchesPrice = p.price >= minPrice && (maxPrice >= 200000 ? true : p.price <= maxPrice);
      const matchesBrand = selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true;
      const matchesRating = p.rating >= minRating;
      const discountVal = parseInt(p.discount || '0');
      const matchesDiscount = discountVal >= minDiscount;
      const matchesAssured = onlyAssured ? p.isAssured : true;

      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesRating && matchesDiscount && matchesAssured;
    });

    if (sortBy === 'price-low') results.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') results.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') results.sort((a, b) => b.rating - a.rating);

    return results;
  }, [query, categoryParam, minPrice, maxPrice, selectedBrands, sortBy, minRating, minDiscount, onlyAssured]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsInitialLoading(true);
    const timer = setTimeout(() => setIsInitialLoading(false), 400);
    return () => clearTimeout(timer);
  }, [query, categoryParam]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(200000);
    setSelectedBrands([]);
    setMinRating(0);
    setMinDiscount(0);
    setOnlyAssured(false);
    setSortBy('featured');
    setBrandSearch('');
  };

  const removeBrand = (brand: string) => setSelectedBrands(prev => prev.filter(b => b !== brand));

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="p-4 space-y-8 bg-white lg:bg-transparent">
      {isMobile && (
        <div className="animate-in slide-in-from-top-2">
          <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">Sort Results By</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'featured', label: 'Featured' },
              { id: 'price-low', label: 'Price: Low' },
              { id: 'price-high', label: 'Price: High' },
              { id: 'rating', label: 'Top Rated' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id as any)}
                className={`py-3 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  sortBy === opt.id 
                    ? 'bg-[#ff5221] border-[#ff5221] text-white shadow-lg' 
                    : 'bg-white border-gray-100 text-gray-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ShopSwift Assured Toggle */}
      <div>
        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">Service Guarantee</h3>
        <label className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-2xl cursor-pointer group hover:bg-blue-50 transition-colors shadow-sm">
           <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#2874f0]" />
              <span className="text-[10px] font-black uppercase tracking-tight text-blue-900 italic">Assured Quality</span>
           </div>
           <input 
             type="checkbox" 
             checked={onlyAssured} 
             onChange={() => setOnlyAssured(!onlyAssured)}
             className="w-6 h-6 rounded-full text-[#2874f0] border-gray-200 focus:ring-0 cursor-pointer"
           />
        </label>
      </div>

      <div>
        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">Price Range (₹)</h3>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Min</label>
              <input 
                type="number" 
                value={minPrice || ''} 
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-[#ff5221]"
              />
            </div>
            <div className="pt-4 text-gray-300">—</div>
            <div className="flex-1">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Max</label>
              <input 
                type="number" 
                value={maxPrice === 200000 ? '' : maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value === '' ? 200000 : Number(e.target.value))}
                placeholder="2L+"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-[#ff5221]"
              />
            </div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="150000" 
            step="1000"
            value={maxPrice > 150000 ? 150000 : maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#ff5221]"
          />
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">Avg. Customer Review</h3>
        <div className="space-y-2">
           {[4, 3, 2].map((rating) => (
             <button
               key={rating}
               onClick={() => setMinRating(minRating === rating ? 0 : rating)}
               className={`w-full text-left flex items-center justify-between py-2.5 px-3 rounded-xl transition-all border ${minRating === rating ? 'bg-orange-50 border-orange-100 text-[#ff5221]' : 'bg-white border-transparent text-gray-600 hover:bg-gray-50'}`}
             >
                <div className="flex items-center gap-1">
                   {[1, 2, 3, 4, 5].map((s) => (
                     <Star key={s} size={14} className={s <= rating ? 'fill-current text-[#FFA41C]' : 'text-gray-200'} />
                   ))}
                   <span className="text-xs font-bold ml-1">& Up</span>
                </div>
                {minRating === rating && <X size={12} className="text-orange-300" />}
             </button>
           ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div>
        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">Minimum Discount</h3>
        <div className="grid grid-cols-2 gap-2">
           {[20, 30, 50, 70].map((d) => (
             <button
               key={d}
               onClick={() => setMinDiscount(minDiscount === d ? 0 : d)}
               className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${minDiscount === d ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
             >
               {d}% & Above
             </button>
           ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
           <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Featured Brands</h3>
           <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300" />
              <input 
                type="text" 
                placeholder="Find brand..." 
                className="pl-7 pr-2 py-1 bg-gray-50 rounded-lg text-[9px] font-bold outline-none focus:ring-1 focus:ring-orange-200 w-28"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
              />
           </div>
        </div>
        <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto no-scrollbar pr-2">
          {filteredBrands.length > 0 ? filteredBrands.map(brand => (
            <label key={brand} className={`flex items-center justify-between gap-3 cursor-pointer group py-2 px-3 rounded-lg transition-colors ${selectedBrands.includes(brand) ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded text-[#ff5221] border-gray-300 focus:ring-0" 
                />
                <span className={`text-xs font-bold ${selectedBrands.includes(brand) ? 'text-[#ff5221]' : 'text-gray-600 group-hover:text-gray-900'}`}>{brand}</span>
              </div>
            </label>
          )) : <p className="text-[10px] text-gray-300 italic py-4 text-center">No brands found</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-[#f1f3f6] min-h-screen">
      {/* LEFT SIDEBAR - FILTERS */}
      <aside className="hidden lg:block w-72 shrink-0 h-max sticky top-16 bg-white overflow-y-auto max-h-[calc(100vh-64px)] no-scrollbar border-r border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400">
               <Filter size={16} />
             </div>
             <h2 className="font-black text-xs uppercase tracking-widest text-gray-900 italic">Filter Store</h2>
          </div>
          {(minPrice > 0 || maxPrice < 200000 || selectedBrands.length > 0 || minRating > 0 || minDiscount > 0 || onlyAssured) && (
            <button onClick={handleResetFilters} className="text-[9px] font-black text-red-500 uppercase tracking-tighter hover:underline flex items-center gap-1">
               <RotateCcw size={10} /> Reset
            </button>
          )}
        </div>
        {isInitialLoading ? <FilterSkeleton /> : <FilterContent />}
      </aside>

      {/* MAIN CONTENT - RESULTS */}
      <main className="flex-1 bg-white">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-16 z-30 shadow-sm">
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 font-medium">
              <span className="font-black text-gray-900">{filteredProducts.length} Results</span> for 
              <span className="text-[#ff5221] font-black ml-1 uppercase tracking-tight italic">"{query || categoryParam || 'everything'}"</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border">
               <ArrowUpDown size={14} className="text-gray-400" />
               <select 
                 value={sortBy} 
                 onChange={(e) => setSortBy(e.target.value as any)}
                 className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-gray-700 cursor-pointer"
               >
                 <option value="featured">Featured</option>
                 <option value="price-low">Price: Low to High</option>
                 <option value="price-high">Price: High to Low</option>
                 <option value="rating">Top Customer Ratings</option>
               </select>
            </div>
            
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 bg-[#ff5221] text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all"
            >
              <SlidersHorizontal size={14} /> Filter Results
            </button>
          </div>
        </div>

        {/* ACTIVE FILTERS CHIPS */}
        {(minPrice > 0 || maxPrice < 150000 || selectedBrands.length > 0 || minRating > 0 || minDiscount > 0 || onlyAssured) && (
          <div className="px-4 py-3 bg-gray-50/50 border-b flex flex-wrap items-center gap-2">
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">Active:</span>
             {onlyAssured && (
               <button onClick={() => setOnlyAssured(false)} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#2874f0] text-[#2874f0] rounded-full text-[9px] font-black uppercase hover:bg-blue-50 transition-colors group">
                 Assured <X size={10} className="text-blue-300 group-hover:text-blue-600" />
               </button>
             )}
             {minRating > 0 && (
               <button onClick={() => setMinRating(0)} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded-full text-[9px] font-black uppercase hover:bg-yellow-50 transition-colors group">
                 {minRating}★ & Up <X size={10} className="text-yellow-300 group-hover:text-yellow-600" />
               </button>
             )}
             {minDiscount > 0 && (
               <button onClick={() => setMinDiscount(0)} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-green-400 text-green-700 rounded-full text-[9px] font-black uppercase hover:bg-green-50 transition-colors group">
                 {minDiscount}%+ Off <X size={10} className="text-green-300 group-hover:text-green-600" />
               </button>
             )}
             {selectedBrands.map(brand => (
               <button key={brand} onClick={() => removeBrand(brand)} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-[9px] font-black uppercase hover:bg-gray-50 transition-colors group">
                 {brand} <X size={10} className="text-gray-300 group-hover:text-gray-600" />
               </button>
             ))}
             {(minPrice > 0 || maxPrice < 150000) && (
               <button onClick={() => { setMinPrice(0); setMaxPrice(200000); }} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-[9px] font-black uppercase hover:bg-gray-50 transition-colors group">
                 ₹{minPrice} - ₹{maxPrice > 150000 ? '2L+' : maxPrice} <X size={10} className="text-gray-300 group-hover:text-gray-600" />
               </button>
             )}
             <button onClick={handleResetFilters} className="text-[9px] font-black text-[#ff5221] uppercase tracking-widest hover:underline ml-auto">Clear All</button>
          </div>
        )}

        <div className="flex flex-col">
          {isInitialLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-6 border-b border-gray-100 flex gap-6">
                <div className="w-32 h-32 sm:w-48 sm:h-48 shrink-0">
                  <SkeletonPulse className="w-full h-full rounded-2xl" />
                </div>
                <div className="flex-1 space-y-4 pt-4">
                  <SkeletonPulse className="h-6 w-3/4 rounded" />
                  <SkeletonPulse className="h-8 w-1/3 rounded" />
                  <div className="flex gap-2">
                    <SkeletonPulse className="h-10 w-24 rounded-lg" />
                    <SkeletonPulse className="h-10 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map(p => (
                <AmazonProductCard 
                  key={p.id} 
                  product={p} 
                  isWishlisted={wishlist.includes(p.id)}
                  onWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                />
              ))}
              <div className="bg-gray-50">
                <TrustBanner />
              </div>
            </>
          ) : (
            <div className="py-32 text-center px-4 bg-white animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchX size={48} className="text-[#ff5221] opacity-40" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight italic">Zero Matches Found</h2>
              <p className="text-sm text-gray-400 mb-10 max-w-xs mx-auto font-medium">We couldn't find anything matching your current filters. Try relaxing your budget or choosing different brands.</p>
              <button onClick={handleResetFilters} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto">
                <RotateCcw size={16} /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* MOBILE FILTERS DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[500] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2 shrink-0" />
            
            <div className="px-6 py-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-orange-50 rounded-xl text-[#ff5221]">
                   <SlidersHorizontal size={20} />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic leading-none">Refine Search</h2>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Found {filteredProducts.length} items</p>
                 </div>
              </div>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-50 rounded-full"><X size={20} className="text-gray-400" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <FilterContent isMobile={true} />
            </div>
            
            <div className="p-6 bg-white border-t safe-bottom flex gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
              <button onClick={handleResetFilters} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 active:scale-95 transition-all">Clear All</button>
              <button onClick={() => setShowMobileFilters(false)} className="flex-[2] bg-[#ff5221] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
