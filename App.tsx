import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
import OrderTracking from './pages/OrderTracking';
import Compare from './pages/Compare';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Account from './pages/Account';
import HelpCenter from './pages/HelpCenter';
import Coupons from './pages/Coupons';
import StaticInfo from './pages/StaticInfo';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import Solutions from './pages/Solutions';
import Security from './pages/Security';
import OrderSuccess from './pages/OrderSuccess';
import ProfileSubPages from './pages/ProfileSubPages';
import { CartItem, User, Order, Product } from './types';
import { CheckCircle, ShoppingCart, Heart, X, RefreshCw, ShoppingBag, Lightbulb } from 'lucide-react';
import { PRODUCTS } from './constants';

const ComparisonBar = ({ list, onRemove, onClear }: { list: Product[], onRemove: (p: Product) => void, onClear: () => void }) => {
  const navigate = useNavigate();
  if (list.length === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[150] border-t py-4 px-4 sm:px-8 flex items-center justify-between animate-in slide-in-from-bottom-full duration-300 max-w-full overflow-hidden safe-bottom">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar max-w-[60%] sm:max-w-none">
        {list.map(p => (
          <div key={p.id} className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 border rounded bg-white p-1 transition-transform active:scale-90">
            <img src={p.image} className="w-full h-full object-contain" alt="" />
            <button onClick={() => onRemove(p)} className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white rounded-full p-0.5 shadow-lg"><X size={10} /></button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 sm:gap-4 ml-4 shrink-0">
        <button onClick={onClear} className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500">Clear</button>
        <button onClick={() => navigate('/compare')} disabled={list.length < 2} className="bg-[#ff5221] text-white px-4 sm:px-6 py-2 rounded-lg shadow-lg hover:bg-orange-600 disabled:bg-gray-200 transition-all font-bold uppercase text-[9px] sm:text-[10px] tracking-widest">Compare Now</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notification, setNotification] = useState<{ show: boolean, message: string, type: 'cart' | 'wishlist' | 'success' } | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);
  const REFRESH_THRESHOLD = 80;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].pageY;
        isPulling.current = true;
      } else {
        isPulling.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || isRefreshing) return;
      const currentY = e.touches[0].pageY;
      const diff = currentY - startY.current;
      if (diff > 0) {
        const resistance = 0.4;
        const newPull = diff * resistance;
        setPullDistance(newPull);
        if (newPull > 10 && e.cancelable) e.preventDefault();
      } else {
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling.current || isRefreshing) return;
      if (pullDistance > REFRESH_THRESHOLD) {
        triggerRefresh();
      } else {
        setPullDistance(0);
      }
      isPulling.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing]);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setPullDistance(60);
    setTimeout(() => {
      sessionStorage.removeItem('shopswift_home_visited');
      setIsRefreshing(false);
      setPullDistance(0);
    }, 1500);
  };
  
  useEffect(() => {
    const savedCart = localStorage.getItem('shopswift_cart');
    if (savedCart) try { setCart(JSON.parse(savedCart)); } catch (e) {}
    const savedUser = localStorage.getItem('shopswift_user');
    if (savedUser) try { setUser(JSON.parse(savedUser)); } catch (e) {}
    const savedWishlist = localStorage.getItem('shopswift_wishlist');
    if (savedWishlist) try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
    const hasSeenOnboarding = localStorage.getItem('shopswift_onboarded');
    if (!hasSeenOnboarding) setShowOnboarding(true);
  }, []);

  useEffect(() => localStorage.setItem('shopswift_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('shopswift_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => { if (user) localStorage.setItem('shopswift_user', JSON.stringify(user)); else localStorage.removeItem('shopswift_user'); }, [user]);

  const triggerFlyAnimation = (event: React.MouseEvent, targetClass: string, particleClass: string, imageUrl?: string) => {
    const startX = event.clientX;
    const startY = event.clientY;
    
    const allTargets = document.querySelectorAll(`.${targetClass}`);
    let finalTarget: Element | null = allTargets[0];
    
    if (window.innerWidth < 768) {
      const mobileNav = document.querySelector('nav.fixed.bottom-0');
      const specialCartTarget = document.querySelector('.mobile-cart-target');
      
      if (targetClass === 'cart-icon-target' && specialCartTarget) {
        finalTarget = specialCartTarget;
      } else if (mobileNav) {
        const innerTarget = mobileNav.querySelector(`.${targetClass}`);
        if (innerTarget) finalTarget = innerTarget;
      }
    }
    
    if (!finalTarget) return;
    
    const rect = finalTarget.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    
    const particle = document.createElement('div');
    particle.className = particleClass;
    
    if (imageUrl) {
      particle.style.backgroundImage = `url(${imageUrl})`;
    }
    
    const size = particleClass === 'cart-flying-particle' ? 50 : 45;
    particle.style.left = `${startX - size/2}px`;
    particle.style.top = `${startY - size/2}px`;
    particle.style.setProperty('--target-x', `${targetX - startX}px`);
    particle.style.setProperty('--target-y', `${targetY - startY}px`);
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 900);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('shopswift_onboarded', 'true');
  };

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'success' = 'cart') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item: CartItem, silent: boolean = false, event?: React.MouseEvent) => {
    if (event) triggerFlyAnimation(event, 'cart-icon-target', 'cart-flying-particle', item.image);
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1, selected: true } : i);
      return [...prev, { ...item, selected: true }];
    });
    if (!silent) showToast(`${item.name} added to cart!`, 'cart');
  };

  const clearSelectedFromCart = () => {
    setCart(prev => prev.filter(item => !item.selected));
  };

  const handleLogout = () => setUser(null);
  
  const handleAddOrder = (order: Order) => { 
    if (user) setUser({ ...user, orders: [order, ...(user.orders || [])] }); 
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    if (user) {
      const updatedOrders = (user.orders || []).map(o => 
        o.id === orderId ? { ...o, status } : o
      );
      setUser({ ...user, orders: updatedOrders });
      if (status === 'Cancelled') {
        showToast('Order cancelled successfully', 'success');
      }
    }
  };

  const toggleWishlist = (productId: string, event?: React.MouseEvent) => {
    setWishlist(prev => {
      const isRemoving = prev.includes(productId);
      if (!isRemoving) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (event) triggerFlyAnimation(event, 'wishlist-icon-target', 'wishlist-flying-particle', product?.image);
        if (product) showToast(`${product.name} added to wishlist!`, 'wishlist');
      }
      return isRemoving ? prev.filter(id => id !== productId) : [...prev, productId];
    });
  };

  const toggleComparison = (product: Product) => {
    setComparisonList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 4) { alert("Max 4 products can be compared."); return prev; }
      return [...prev, product];
    });
  };

  const cartTotalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-white">
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
        {!showOnboarding && (
          <>
            <div className="ptr-indicator" style={{ height: `${pullDistance}px`, opacity: pullDistance > 10 ? 1 : 0 }}>
              <div className={`ptr-spinner ${isRefreshing ? 'ptr-loading' : ''}`} style={{ transform: isRefreshing ? 'none' : `rotate(${pullDistance * 2}deg) scale(${Math.min(1, pullDistance / REFRESH_THRESHOLD)})` }}>
                <RefreshCw size={20} strokeWidth={3} />
              </div>
            </div>
            <Header cartCount={cartTotalQuantity} user={user} onLogout={handleLogout} />
            <main className="flex-1 pb-32 md:pb-0 w-full">
              <Routes>
                <Route path="/" element={<Home wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} comparisonList={comparisonList} onToggleComparison={toggleComparison} />} />
                <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} toggleComparison={toggleComparison} comparisonList={comparisonList} wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
                <Route path="/search" element={<SearchResults wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} comparisonList={comparisonList} onToggleComparison={toggleComparison} />} />
                <Route path="/search-interface" element={<SearchPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
                <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearSelectedFromCart} user={user} onOrderSuccess={handleAddOrder} />} />
                <Route path="/compare" element={<Compare comparisonList={comparisonList} onRemove={(id) => setComparisonList(prev => prev.filter(p => p.id !== id))} onAddToCart={addToCart} />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/security" element={<Security />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup onSignup={setUser} />} />
                <Route path="/orders" element={user ? <OrderHistory orders={user.orders} onUpdateOrderStatus={handleUpdateOrderStatus} wishlist={wishlist} onAddToCart={addToCart} /> : <Navigate to="/login" />} />
                <Route path="/tracking/:id" element={<OrderTracking />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/account" element={<Account user={user} onLogout={handleLogout} />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<StaticInfo title="About Us" type="about" />} />
                <Route path="/privacy" element={<StaticInfo title="Privacy Policy" type="privacy" />} />
                <Route path="/terms" element={<StaticInfo title="Terms & Conditions" type="terms" />} />
                <Route path="/cookies" element={<StaticInfo title="Cookie Policy" type="cookies" />} />
                <Route path="/legal" element={<Security />} />
                <Route path="/shipping" element={<StaticInfo title="Shipping Information" type="shipping" />} />
                <Route path="/returns" element={<StaticInfo title="Returns & Exchange" type="returns" />} />
                <Route path="/size-charts" element={<StaticInfo title="Size Charts" type="size" />} />
                <Route path="/addresses" element={<ProfileSubPages type="addresses" user={user} />} />
                <Route path="/payments" element={<ProfileSubPages type="payments" user={user} />} />
                <Route path="/profile/edit" element={<ProfileSubPages type="edit" user={user} />} />
              </Routes>
            </main>
            <Footer />
            <ComparisonBar list={comparisonList} onRemove={toggleComparison} onClear={() => setComparisonList([])} />
            <MobileNav cartCount={cartTotalQuantity} />
            {notification && (
              <div className="fixed bottom-24 sm:bottom-20 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300 w-full max-w-sm px-4">
                <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10">
                  <div className={`${notification.type === 'wishlist' ? 'bg-red-500' : notification.type === 'success' ? 'bg-emerald-500' : 'bg-green-500'} p-2 rounded-full shrink-0`}>
                    {notification.type === 'wishlist' ? <Heart size={18} fill="currentColor" /> : notification.type === 'success' ? <CheckCircle size={18} /> : <ShoppingCart size={18} />}
                  </div>
                  <p className="text-xs font-bold flex-1">{notification.message}</p>
                  <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white"><X size={18} /></button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;