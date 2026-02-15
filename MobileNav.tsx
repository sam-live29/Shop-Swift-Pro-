import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, Heart, User, ShoppingBag, X, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface MobileNavProps {
  cartCount: number;
}

const MobileNav: React.FC<MobileNavProps> = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeIconIdx, setActiveIconIdx] = useState(0);

  // Cycling icon logic for the "Dynamic Display"
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIconIdx((prev) => (prev + 1) % CATEGORIES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (id: string) => {
    setIsDrawerOpen(false);
    navigate(`/search?category=${id}`);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-[100] h-16 px-4 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.05)] safe-bottom">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#ff5221]' : 'text-gray-400'}`
          }
        >
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        {/* Dynamic Categories Button */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className={`flex flex-col items-center gap-1 transition-all ${isDrawerOpen ? 'text-[#ff5221]' : 'text-gray-400'}`}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Animated cycling category icon */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform animate-in zoom-in fade-in">
               <span className="text-xl leading-none grayscale-[0.5] group-hover:grayscale-0">
                 {CATEGORIES[activeIconIdx].icon}
               </span>
            </div>
            {/* Small corner grid indicator */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <LayoutGrid size={10} className="text-[#ff5221]" />
            </div>
          </div>
          <span className="text-[10px] font-medium">Categories</span>
        </button>

        <div className="relative -mt-10">
          <button 
            onClick={() => navigate('/cart')}
            className="cart-icon-target mobile-cart-target w-14 h-14 bg-[#ff5221] rounded-full flex items-center justify-center text-white shadow-xl transform active:scale-90 transition-transform"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[#ff5221] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#ff5221]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <NavLink 
          to="/wishlist" 
          className={({ isActive }) => 
            `wishlist-icon-target flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#ff5221]' : 'text-gray-400'}`
          }
        >
          <Heart size={22} />
          <span className="text-[10px] font-medium">Wishlist</span>
        </NavLink>

        <NavLink 
          to="/account" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#ff5221]' : 'text-gray-400'}`
          }
        >
          <User size={22} />
          <span className="text-[10px] font-medium">Account</span>
        </NavLink>
      </nav>

      {/* Categories Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className="relative bg-white rounded-t-[2.5rem] shadow-2xl w-full max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-full duration-500 ease-out">
            {/* Handle Bar */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
            
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-xl text-[#ff5221]">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">All Categories</h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">Explore our wide selection</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-full transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6">
              {/* Featured / Trending Section inside drawer */}
              <div className="bg-gradient-to-br from-[#1a1a3a] to-[#2874f0] rounded-2xl p-5 mb-8 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-100">Recommended for You</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight leading-tight">Festival Offers<br/>Live Now!</h3>
                  <button 
                    onClick={() => { setIsDrawerOpen(false); navigate('/offers'); }}
                    className="mt-4 bg-white text-[#2874f0] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                  >
                    View Deals
                  </button>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>

              {/* Main Category Grid */}
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl border border-transparent active:border-[#ff5221] active:bg-orange-50 transition-all group animate-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-12 h-12 object-contain mix-blend-multiply" 
                      />
                    </div>
                    <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight text-center">
                      {cat.name}
                    </span>
                    <div className="mt-2 flex items-center gap-1 text-[8px] font-black text-[#2874f0] uppercase tracking-tighter opacity-0 group-active:opacity-100 transition-opacity">
                      Shop Now <ChevronRight size={10} />
                    </div>
                  </button>
                ))}
                
                {/* View Full Page Shortcut */}
                <button 
                  onClick={() => { setIsDrawerOpen(false); navigate('/categories'); }}
                  className="col-span-2 mt-2 py-4 bg-white border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-gray-400 hover:text-[#2874f0] hover:border-blue-100 hover:bg-blue-50 transition-all"
                >
                  <LayoutGrid size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Open Full Directory</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t safe-bottom">
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">
                 ShopSwift Guarantee • Easy 7-Day Returns
               </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;