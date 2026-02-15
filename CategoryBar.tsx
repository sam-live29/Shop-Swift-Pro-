
import React from 'react';
import { CATEGORIES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { SafeImage } from './Skeleton';
import { 
  ChevronRight, 
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const CategoryBar: React.FC = () => {
  const navigate = useNavigate();

  const getCategoryTheme = (id: string) => {
    switch(id) {
      case 'mobiles': return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', dot: 'bg-blue-400' };
      case 'fashion': return { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-600', dot: 'bg-pink-400' };
      case 'electronics': return { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', dot: 'bg-indigo-400' };
      case 'home': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', dot: 'bg-amber-400' };
      case 'appliances': return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', dot: 'bg-emerald-400' };
      case 'beauty': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-600', dot: 'bg-rose-400' };
      case 'toys': return { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', dot: 'bg-purple-400' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
    }
  };

  return (
    <section className="bg-white pt-8 pb-6 border-b shadow-sm relative overflow-hidden">
      <div className="max-w-7xl auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 relative z-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center shadow-sm border border-orange-100">
              <Sparkles size={18} className="text-[#ff5221]" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-gray-900 leading-none">
                Top Categories
              </h2>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
                Curated for your lifestyle
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/categories')}
            className="flex items-center gap-2 text-[10px] font-black text-[#2874f0] uppercase tracking-widest group bg-blue-50/50 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            Explore All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Container */}
        <div className="relative z-10">
          <div 
            className="flex items-start justify-start sm:justify-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar scroll-smooth snap-x pt-2 pb-6 -mx-4 px-4"
            style={{ overscrollBehaviorX: 'contain' }}
          >
            {CATEGORIES.map((cat, index) => {
              const isHot = cat.id === 'mobiles' || cat.id === 'fashion';
              const theme = getCategoryTheme(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/search?category=${cat.id}`)}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="flex flex-col items-center group cursor-pointer w-[76px] sm:w-32 shrink-0 relative active:scale-95 transition-all duration-300 animate-in fade-in slide-in-from-right-8 snap-center"
                >
                  {/* Category Image Wrapper */}
                  <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-3xl ${theme.bg} border ${theme.border} flex items-center justify-center mb-4 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-black/5 group-hover:-translate-y-2 relative overflow-visible`}>
                    
                    {/* Status Badge */}
                    {isHot && (
                      <div className="absolute -top-1 -right-1 z-[50] flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 border-2 border-white items-center justify-center shadow-lg">
                          <Zap size={10} fill="white" className="text-white" />
                        </span>
                      </div>
                    )}

                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-500">
                      <SafeImage 
                        src={cat.image} 
                        alt={cat.name}
                        className="w-full h-full object-contain filter drop-shadow-md mix-blend-multiply"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Category Label */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] sm:text-xs font-black text-gray-800 group-hover:text-[#ff5221] text-center leading-tight transition-colors uppercase tracking-tight">
                      {cat.name}
                    </span>
                    <div className="w-4 h-0.5 bg-gray-200 rounded-full group-hover:w-8 group-hover:bg-[#ff5221] transition-all duration-300" />
                  </div>
                </button>
              );
            })}
            
            {/* "View More" Link */}
            <button
              onClick={() => navigate('/categories')}
              className="flex flex-col items-center group cursor-pointer w-[76px] sm:w-32 shrink-0 snap-center animate-in fade-in slide-in-from-right-10 duration-500"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-gray-900 text-white flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-[#ff5221] group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <ChevronRight className="w-6 h-6 sm:w-10 sm:h-10 group-hover:translate-x-1 transition-transform" />
                  <span className="text-[8px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100">All</span>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-black text-gray-400 group-hover:text-gray-900 text-center uppercase tracking-tight transition-colors">
                View More
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
