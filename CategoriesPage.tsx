
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, CATEGORY_METADATA } from '../constants';
import BrandLogo from '../components/BrandLogo';
import { 
  ChevronRight, Sparkles, Zap, TrendingUp, Search, 
  ArrowLeft, Tag, Star, LayoutGrid, Store, CreditCard,
  ChevronDown
} from 'lucide-react';
import { SkeletonPulse } from '../components/Skeleton';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  
  // Only show skeleton on the first visit of the session
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('shopswift_categories_visited');
  });
  
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only perform the loading simulation if it's the first visit of the session
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('shopswift_categories_visited', 'true');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    // Smooth scroll content back to top when category changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategoryId]);

  const activeCategory = useMemo(() => 
    CATEGORIES.find(c => c.id === activeCategoryId)!,
    [activeCategoryId]
  );

  const metadata = CATEGORY_METADATA[activeCategoryId];

  return (
    <div className="max-w-7xl mx-auto flex h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Left Navigation Rail - Improved with independent scroll containment */}
      <aside className="w-20 sm:w-64 border-r bg-gray-50/50 overflow-y-auto no-scrollbar shrink-0" style={{ overscrollBehaviorY: 'contain' }}>
        <div className="sticky top-0 z-20 p-4 border-b bg-white/80 backdrop-blur-md flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-[#2874f0] flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
              <LayoutGrid size={16} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 hidden sm:block">All Stores</span>
        </div>
        
        <nav className="flex flex-col py-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`group relative flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-2 sm:px-4 py-4 transition-all duration-300 ${
                activeCategoryId === cat.id 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-100/50'
              }`}
            >
              {/* Active Indicator Bar */}
              {activeCategoryId === cat.id && (
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#2874f0] rounded-r-full animate-in slide-in-from-left duration-300" />
              )}
              
              {/* Real Image Icon */}
              <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-500 transform ${
                activeCategoryId === cat.id 
                  ? 'border-[#2874f0] scale-105 shadow-md' 
                  : 'border-transparent group-hover:border-gray-200'
              }`}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
                {activeCategoryId !== cat.id && (
                  <div className="absolute inset-0 bg-black/5" />
                )}
              </div>

              {/* Text Label */}
              <div className="flex flex-col items-center sm:items-start overflow-hidden">
                <span className={`text-[9px] sm:text-xs font-black uppercase tracking-tight transition-colors duration-300 text-center sm:text-left ${
                  activeCategoryId === cat.id ? 'text-[#2874f0]' : 'text-gray-500 group-hover:text-gray-900'
                }`}>
                  {cat.name}
                </span>
                {activeCategoryId === cat.id && (
                  <span className="text-[7px] font-bold text-blue-300 uppercase hidden sm:block">Explore Now</span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area - Scroll contained separately */}
      <main 
        ref={mainContentRef}
        className="flex-1 overflow-y-auto no-scrollbar bg-white p-4 sm:p-8 scroll-smooth"
        style={{ overscrollBehaviorY: 'contain' }}
      >
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="space-y-4">
                <SkeletonPulse className="h-4 w-32" />
                <SkeletonPulse className="h-10 w-64" />
              </div>
              <SkeletonPulse className="h-48 w-full rounded-2xl" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => <SkeletonPulse key={i} className="h-32 rounded-2xl" />)}
              </div>
              <div className="space-y-4">
                <SkeletonPulse className="h-4 w-48" />
                <div className="flex gap-4">
                   {[1, 2, 3].map(i => <SkeletonPulse key={i} className="h-24 w-full rounded-2xl" />)}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#2874f0] mb-1">
                    <Sparkles size={16} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Storefront</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                    {activeCategory.name}
                  </h1>
                </div>
                <button 
                  onClick={() => navigate(`/search?category=${activeCategoryId}`)}
                  className="bg-[#2874f0] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-2"
                >
                  View All Collection <ChevronRight size={14} />
                </button>
              </div>

              {/* Promotional Banner */}
              <div 
                className="mb-8 relative rounded-3xl overflow-hidden h-40 sm:h-56 shadow-2xl group cursor-pointer" 
                onClick={() => navigate(`/search?category=${activeCategoryId}`)}
              >
                <img src={activeCategory.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-6 sm:px-12 text-white">
                   <div className="bg-yellow-400 text-black px-2 py-0.5 rounded text-[8px] font-black uppercase w-max mb-3">Live Sale</div>
                   <h3 className="text-2xl sm:text-4xl font-black uppercase italic leading-none mb-1">Up to 80% Off</h3>
                   <p className="text-xs sm:text-lg font-bold text-white/80 uppercase tracking-tight">On all {activeCategory.name} products</p>
                   <p className="text-[9px] sm:text-[11px] opacity-60 mt-4 font-black uppercase tracking-widest flex items-center gap-1">
                      Shop with SuperCoins ★ <ChevronRight size={12} />
                   </p>
                </div>
              </div>

              {/* Budget Stores Grid */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={14} className="text-[#2874f0]" /> Budget-Friendly Stores
                  </h2>
                  <div className="h-[1px] flex-1 mx-4 bg-gray-100" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {metadata.budgetFilters.map((budget, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/search?category=${activeCategoryId}&maxPrice=${budget}`)}
                      className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1 relative z-10">Starting Under</span>
                      <span className="text-2xl font-black text-gray-900 tracking-tighter relative z-10">₹{budget.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Stores */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Store size={14} className="text-[#2874f0]" /> Top Brand Stores
                  </h2>
                  <button className="text-[10px] font-black text-[#2874f0] uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1">
                  {metadata.brands.map((brand, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/search?q=${brand}`)}
                      className="shrink-0 w-32 sm:w-40 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all group"
                    >
                      <div className="h-12 sm:h-16 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <BrandLogo brand={brand} size="md" />
                      </div>
                      <div className="bg-gray-50 group-hover:bg-[#2874f0] group-hover:text-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors">
                        <span className="text-[8px] font-black uppercase tracking-tighter">Enter Store</span>
                        <ChevronRight size={10} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Groups */}
              <div className="space-y-10 pb-20">
                {metadata.groups.map((group, gIdx) => (
                  <div key={gIdx} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1.5 h-8 bg-[#2874f0] rounded-full shadow-sm shadow-blue-200"></div>
                      <h3 className="text-sm sm:text-lg font-black text-gray-900 uppercase tracking-tight italic">{group.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                      {group.items.map((item, iIdx) => (
                        <button
                          key={iIdx}
                          onClick={() => navigate(`/search?q=${encodeURIComponent(item)}`)}
                          className="p-5 rounded-2xl border border-gray-50 bg-gray-50/40 hover:bg-white hover:shadow-xl hover:border-blue-100 text-left transition-all group flex items-center justify-between"
                        >
                          <div>
                             <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-[#2874f0] transition-colors">{item}</span>
                             <div className="mt-2 flex items-center gap-1">
                                <TrendingUp size={10} className="text-orange-500" />
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Hot Pick</span>
                             </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-200 group-hover:bg-blue-50 group-hover:text-[#2874f0] transition-all">
                             <ChevronRight size={16} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Info */}
              <div className="border-t pt-16 pb-12 text-center">
                 <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="flex flex-col items-center gap-2">
                       <CreditCard className="text-[#2874f0]" size={24} />
                       <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Zero EMI</span>
                    </div>
                    <div className="w-[1px] h-10 bg-gray-100" />
                    <div className="flex flex-col items-center gap-2">
                       <Zap className="text-yellow-500" size={24} fill="currentColor" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Swift Ship</span>
                    </div>
                 </div>
                 <p className="text-[10px] text-gray-400 max-w-sm mx-auto font-medium leading-relaxed uppercase tracking-tighter">
                   Official Store of {activeCategory.name} • Certified Verified Sellers • Easy 7 Day Returns
                 </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
