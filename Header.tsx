
import React, { useState, useEffect } from 'react';
import { Menu, Search, X, ChevronRight, Package, Truck, Tag, Ruler, RotateCcw, Sparkles, User as UserIcon, ShoppingCart, MapPin, Heart, Bell } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface HeaderProps {
  cartCount: number;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [locationName, setLocationName] = useState('Select Location');
  const navigate = useNavigate();

  // Mock notification count
  const notificationCount = 3;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedLocation = localStorage.getItem('shopswift_location');
    if (savedLocation) {
      setLocationName(savedLocation);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        const mockCity = "Kolkata, WB";
        setLocationName(mockCity);
        localStorage.setItem('shopswift_location', mockCity);
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const query = encodeURIComponent(searchInput.trim());
      navigate(`/search?q=${query}`);
      setSearchInput(''); 
    }
  };

  const handleHeaderClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/account');
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Home', path: '/', icon: null },
    { label: 'Flash Offers', path: '/offers', icon: <Sparkles size={18} className="text-yellow-500" /> },
    { label: 'My Orders', path: '/orders', icon: <Package size={18} className="text-blue-600" /> },
    { label: 'Track Order', path: '/orders', icon: <Truck size={18} className="text-orange-600" /> },
    { label: 'Returns & Exchange', path: '/returns', icon: <RotateCcw size={18} className="text-red-500" /> },
    { label: 'Shipping Info', path: '/shipping', icon: <Truck size={18} className="text-green-600" /> },
    { label: 'Size Charts', path: '/size-charts', icon: <Ruler size={18} className="text-indigo-600" /> },
    { label: 'All Categories', path: '/categories', icon: null },
    { label: 'My Coupons', path: '/coupons', icon: <Tag size={18} className="text-pink-500" /> },
    { label: 'Help Center', path: '/help', icon: null },
  ];

  return (
    <div className="flex flex-col w-full sticky top-0 z-[110]">
      <header className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#ff5221] shadow-lg py-1' 
          : 'bg-[#ff5221] py-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-6 shrink-0">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex flex-col items-start leading-none transition-transform active:scale-95">
              <span className="text-lg sm:text-2xl font-black text-white italic tracking-tighter">ShopSwift</span>
              <span className="text-[10px] text-white/80 font-bold italic flex items-center gap-0.5">Explore <span className="text-yellow-400">Prime</span></span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-yellow-400 group transition-all">
              <input 
                type="text" 
                placeholder="Search for products, brands and more" 
                className="flex-1 h-11 px-5 pr-10 bg-white text-gray-900 text-sm font-semibold outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button 
                  type="button" 
                  onClick={() => setSearchInput('')}
                  className="absolute right-[110px] top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="h-11 px-5 bg-[#f3f3f3] text-[#222] hover:bg-gray-200 border-l border-gray-100 flex items-center justify-center shrink-0">
                <Search size={20} strokeWidth={3} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-1 sm:gap-4 text-white shrink-0">
            <div className="flex items-center md:hidden gap-1">
              <button onClick={() => navigate('/notifications')} className="p-2 hover:bg-white/10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 relative">
                <Bell size={20} />
                {notificationCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>}
              </button>
              <button onClick={() => navigate('/search-interface')} className="p-2 hover:bg-white/10 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
                <Search size={20} />
              </button>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {!user ? (
                <Link to="/login" className="bg-white text-[#ff5221] px-8 py-1.5 rounded font-black text-sm hover:bg-gray-50 shadow-sm transition-all border border-white">Login</Link>
              ) : (
                <Link to="/account" className="flex items-center gap-1 font-bold text-sm hover:underline">
                  <UserIcon size={18} /> {user.name.split(' ')[0]}
                </Link>
              )}
              <Link to="/size-charts" className="flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform">
                <Ruler size={20} />
                <span>Size Charts</span>
              </Link>
              <Link to="/notifications" className="flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform relative">
                <Bell size={20} />
                <span>Alerts</span>
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-yellow-400 text-[#ff5221] text-[9px] font-black px-1 rounded-full border border-white shadow-sm">
                    {notificationCount}
                  </span>
                )}
              </Link>
              <Link to="/wishlist" className="wishlist-icon-target flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform relative">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link to="/cart" className="cart-icon-target flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform relative">
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#ff5221] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#ff5221] shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full bg-[#ff6a42] text-white/90 text-[10px] font-black uppercase tracking-widest px-4 py-2 flex items-center gap-2 border-t border-white/10">
        <MapPin size={12} className="text-yellow-300" />
        <span>Deliver to {locationName}</span>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 overflow-hidden">
            <div 
              onClick={handleHeaderClick}
              className="p-4 bg-[#ff5221] text-white flex items-center justify-between cursor-pointer active:bg-[#e64a1d] transition-colors"
            >
              <div className="flex items-center gap-2">
                <UserIcon size={20} />
                <span className="font-bold text-sm uppercase tracking-wide">
                  {user ? `Hello, ${user.name}` : 'Login & Signup'}
                </span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 bg-orange-50 border-b flex items-center gap-3">
               <MapPin size={16} className="text-[#ff5221]" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Delivering to</span>
                  <span className="text-xs font-bold text-gray-800">{locationName}</span>
               </div>
               <button className="ml-auto text-[10px] font-black text-[#2874f0] uppercase tracking-widest">Change</button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <nav className="divide-y divide-gray-100">
                {menuItems.map((item, i) => (
                  <Link key={i} to={item.path} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-6 py-4 text-sm font-bold text-gray-700 hover:bg-orange-50 transition-colors">
                    <div className="flex items-center gap-3">{item.icon}{item.label}</div>
                    <ChevronRight size={14} className="text-gray-300" />
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t bg-white safe-bottom">
              {user ? (
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full bg-red-50 text-red-500 py-3.5 rounded-lg font-black text-sm active:scale-95 transition-transform">Logout</button>
              ) : (
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="w-full bg-[#ff5221] text-white py-3.5 rounded-lg font-black text-sm active:scale-95 transition-transform">Login / Signup</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
