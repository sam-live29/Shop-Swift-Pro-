
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowLeft, 
  TrendingUp, 
  X, 
  Clock, 
  Mic, 
  ChevronRight, 
  CornerDownLeft, 
  RotateCcw, 
  Sparkles, 
  Star, 
  Trash2, 
  Zap,
  ShoppingBag,
  History
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';

interface SuggestionItem {
  id: string;
  name: string;
  category: string;
  image: string;
  brand: string;
  price?: number;
  rating?: number;
  type: 'product' | 'category-scope' | 'history';
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const saved = localStorage.getItem('shopswift_recent_searches');
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = () => {
      if (query.trim().length > 0) {
        const q = query.toLowerCase();
        
        // Find matching categories for "In Category" suggestions
        const categoryMatches = CATEGORIES.filter(c => c.name.toLowerCase().includes(q))
          .map(c => ({
            id: c.id,
            name: `Search for "${query}" in ${c.name}`,
            category: c.id,
            image: c.image,
            brand: '',
            type: 'category-scope' as const
          }));

        // Find matching products
        const productMatches = PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        ).slice(0, 8).map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          image: p.image,
          brand: p.brand,
          price: p.price,
          rating: p.rating,
          type: 'product' as const
        }));

        setSuggestions([...categoryMatches, ...productMatches]);
      } else {
        setSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 100);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (q: string, categoryId?: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    
    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('shopswift_recent_searches', JSON.stringify(updated));
    
    const catParam = categoryId ? `&category=${categoryId}` : '';
    navigate(`/search?q=${encodeURIComponent(trimmed)}${catParam}`);
  };

  const removeRecent = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== item);
    setRecentSearches(updated);
    localStorage.setItem('shopswift_recent_searches', JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    if (window.confirm('Clear all recent search history?')) {
      setRecentSearches([]);
      localStorage.removeItem('shopswift_recent_searches');
    }
  };

  const trending = ['5G Mobiles', 'Men\'s Shoes', 'Wireless Earbuds', 'Air Conditioners', 'Smartwatches'];
  const popularBrands = ['Apple', 'Samsung', 'Nike', 'Boat', 'Sony'];

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col font-sans overflow-hidden">
      {/* Search Header */}
      <div className="flex items-center gap-1 p-2 bg-white border-b shadow-sm sticky top-0 shrink-0 z-50">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        
        <div className="flex-1 relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-gray-50 text-gray-900 py-3 pl-4 pr-12 rounded-xl border border-transparent focus:border-[#fb641b] focus:bg-white focus:ring-4 focus:ring-orange-50 outline-none text-base font-semibold transition-all shadow-inner"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          />
          <div className="absolute right-0 flex items-center pr-1 h-full">
            {query ? (
              <button onClick={() => setQuery('')} className="p-3 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            ) : (
              <div className="flex items-center">
                <button onClick={() => setIsVoiceActive(true)} className="p-2.5 text-[#fb641b] hover:bg-orange-50 rounded-full transition-colors">
                  <Mic size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voice Search Overlay (Mock) */}
      {isVoiceActive && (
        <div className="fixed inset-0 z-[300] bg-orange-600 flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
           <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
              <Mic size={40} className="relative z-10" />
           </div>
           <h2 className="text-3xl font-black italic mb-4">Listening...</h2>
           <p className="text-white/70 font-bold uppercase tracking-widest text-xs">Try saying "Mobiles under 20000"</p>
           <button 
             onClick={() => setIsVoiceActive(false)}
             className="mt-12 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
           >
             <X size={20} />
           </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
        {query.trim().length > 0 ? (
          <div className="divide-y divide-gray-100 bg-white animate-in fade-in slide-in-from-top-1 duration-200">
            {suggestions.map((suggestion, idx) => (
              <button
                key={`${suggestion.id}-${idx}`}
                onClick={() => suggestion.type === 'product' 
                  ? navigate(`/product/${suggestion.id}`) 
                  : handleSearch(query, suggestion.category)
                }
                className="w-full text-left px-4 py-4 bg-white active:bg-gray-50 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-gray-50 rounded-lg p-1 group-hover:bg-white transition-colors">
                   {suggestion.type === 'category-scope' ? (
                     <Search size={20} className="text-gray-300" />
                   ) : (
                     <img src={suggestion.image} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                   )}
                </div>
                <div className="flex-1 min-w-0">
                   <span className={`text-sm ${suggestion.type === 'category-scope' ? 'text-[#2874f0] font-black' : 'text-gray-800 font-bold'} truncate block group-hover:text-[#fb641b] transition-colors`}>
                     {suggestion.name}
                   </span>
                   {suggestion.type === 'product' ? (
                     <div className="flex items-center gap-3 mt-1">
                       <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{suggestion.brand}</span>
                       <div className="flex items-center gap-1 text-[10px] text-[#FFA41C] font-black">
                          <Star size={10} fill="currentColor" /> {suggestion.rating}
                       </div>
                       <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter">₹{suggestion.price?.toLocaleString()}</span>
                     </div>
                   ) : (
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Explore results in department</span>
                   )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[#fb641b]">
                   <span className="text-[9px] font-black uppercase tracking-widest">Go</span>
                   <CornerDownLeft size={16} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="pb-24">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section className="mb-6 bg-white border-b shadow-sm">
                <div className="px-4 py-3 flex items-center justify-between border-b">
                   <div className="flex items-center gap-2">
                     <History size={14} className="text-gray-400" />
                     <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Recent History</h3>
                   </div>
                   <button 
                     onClick={clearAllHistory}
                     className="text-[10px] font-black text-[#fb641b] uppercase tracking-widest hover:bg-orange-50 px-3 py-1 rounded transition-colors"
                   >
                     Clear All
                   </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {recentSearches.map((s, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSearch(s)}
                      className="flex items-center justify-between py-4 px-4 group cursor-pointer active:bg-gray-50 hover:bg-gray-50/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-50 rounded-full group-hover:bg-white group-hover:text-[#fb641b] transition-colors">
                           <Clock size={16} className="text-gray-400 group-hover:text-inherit" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{s}</span>
                      </div>
                      <button 
                        onClick={(e) => removeRecent(e, s)}
                        className="p-3 text-gray-300 hover:text-red-500 rounded-full hover:bg-white transition-all"
                        aria-label="Remove from history"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  {/* Prominent Clear Button for Mobile Reachability */}
                  <div className="p-4 bg-gray-50/50">
                    <button 
                      onClick={clearAllHistory}
                      className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} /> Clear All Search History
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Trending & Popular */}
            <div className="px-4 space-y-8 mt-6">
              <section>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" /> Hot & Trending
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trending.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSearch(item)}
                      className="bg-white px-5 py-2.5 rounded-xl text-xs font-black text-gray-700 border-2 border-transparent hover:border-orange-200 shadow-sm active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Zap size={12} className="text-yellow-500" fill="currentColor" /> {item}
                    </button>
                  ))}
                </div>
              </section>

              {/* Browse Brands */}
              <section>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-500" /> Popular Stores
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                   {popularBrands.map(brand => (
                     <button 
                       key={brand}
                       onClick={() => handleSearch(brand)}
                       className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95 group"
                     >
                       <span className="text-sm font-black text-gray-800 group-hover:text-[#fb641b]">{brand}</span>
                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Official Store</span>
                     </button>
                   ))}
                </div>
              </section>

              {/* Department Shortcut Icons */}
              <section>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Shop by Category</h3>
                   <button onClick={() => navigate('/categories')} className="text-[10px] font-black text-[#2874f0] uppercase tracking-widest flex items-center gap-1">See All <ChevronRight size={14} /></button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {CATEGORIES.slice(0, 8).map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => navigate(`/search?category=${cat.id}`)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border border-gray-100 flex items-center justify-center p-3 group-hover:shadow-lg group-hover:-translate-y-1 transition-all overflow-hidden relative shadow-sm">
                         <img src={cat.image} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                      </div>
                      <span className="text-[9px] font-black text-gray-500 text-center leading-tight line-clamp-2 uppercase tracking-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Account / Recommendations Banner */}
              <section 
                className="p-6 bg-gradient-to-br from-[#1a1a3a] to-[#2874f0] rounded-2xl text-white flex items-center justify-between group cursor-pointer shadow-xl overflow-hidden relative" 
                onClick={() => navigate('/account')}
              >
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-1">
                      <ShoppingBag size={14} className="text-yellow-400" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">For You</p>
                   </div>
                   <h3 className="text-xl font-black italic tracking-tighter">View Your Picks</h3>
                   <p className="text-[10px] text-blue-200 font-bold uppercase mt-1">Based on your recent activity</p>
                </div>
                <div className="relative z-10 bg-white/10 p-3 rounded-full group-hover:bg-[#fb641b] transition-colors">
                   <ChevronRight size={24} />
                </div>
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
