
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { 
  Star, ShoppingCart, Zap, Heart, CheckCircle, ChevronRight, Home, MapPin, 
  Award, ThumbsUp, ShieldCheck, Play, Video, Share2, MessageCircle, 
  Facebook, Instagram, Twitter, MoreHorizontal, X, Link as LinkIcon,
  MessageSquare, User as UserIcon, Truck, Calendar, Loader2, AlertCircle,
  Plus, Minus
} from 'lucide-react';
import { CartItem, Review, Product } from '../types';
import { SafeImage } from '../components/Skeleton';

interface ProductDetailProps {
  onAddToCart: (item: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
  toggleComparison: (product: Product) => void;
  comparisonList: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, event?: React.MouseEvent) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, toggleComparison, comparisonList, wishlist, onToggleWishlist }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showShare, setShowShare] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Delivery Check State
  const [pincode, setPincode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<{
    date: string;
    type: 'Express' | 'Standard' | 'Unavailable';
    cod: boolean;
  } | null>(null);
  const [pincodeError, setPincodeError] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const isComparing = comparisonList.some(p => p.id === id);
  const isWishlisted = id ? wishlist.includes(id) : false;

  useEffect(() => {
    if (id) {
      const mockReviews: Review[] = [
        { id: '1', productId: id, userName: 'Rahul Gupta', rating: 5, comment: 'Excellent product! The quality is top-notch and exactly as described. Worth every penny.', date: '2 days ago', isVerified: true, helpfulCount: 42 },
        { id: '2', productId: id, userName: 'Sneha Roy', rating: 4, comment: 'Great value for money. Delivery was fast too. The color is slightly darker than the picture but looks premium.', date: '1 week ago', isVerified: true, helpfulCount: 15 },
        { id: '3', productId: id, userName: 'Vikram Singh', rating: 5, comment: 'Best in class performance. Highly recommend it to everyone seeking quality.', date: '3 weeks ago', isVerified: true, helpfulCount: 8 }
      ];
      setReviews(mockReviews);
      window.scrollTo(0, 0);

      // Restore last checked pincode
      const savedPin = localStorage.getItem('shopswift_last_pin');
      if (savedPin) {
        setPincode(savedPin);
        handlePincodeCheck(savedPin);
      }
    }
  }, [id]);

  const handlePincodeCheck = (val?: string) => {
    const pinToCheck = val || pincode;
    if (!/^\d{6}$/.test(pinToCheck)) {
      setPincodeError('Please enter a valid 6-digit pincode');
      setDeliveryResult(null);
      return;
    }

    setPincodeError('');
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const today = new Date();
      let deliveryDays = 3;
      let type: 'Express' | 'Standard' = 'Standard';

      // Mock specific fast zones
      if (pinToCheck.startsWith('700') || pinToCheck.startsWith('110') || pinToCheck.startsWith('400')) {
        deliveryDays = 1;
        type = 'Express';
      } else if (pinToCheck.startsWith('560') || pinToCheck.startsWith('600')) {
        deliveryDays = 2;
        type = 'Express';
      }

      const delDate = new Date(today);
      delDate.setDate(today.getDate() + deliveryDays);
      
      setDeliveryResult({
        date: delDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }),
        type,
        cod: parseInt(pinToCheck) % 2 === 0 // Mock COD availability
      });
      setIsChecking(false);
      localStorage.setItem('shopswift_last_pin', pinToCheck);
    }, 800);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex !== selectedImg) {
        setSelectedImg(newIndex);
      }
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const clientWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
      setSelectedImg(index);
    }
  };

  const handleShare = async (platform?: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out this ${product?.name} on ShopSwift!`;

    if (!platform) {
      if (navigator.share) {
        try {
          await navigator.share({ title: product?.name, text: shareText, url: shareUrl });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      } else {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
      return;
    }

    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'whatsapp-biz':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied for Instagram!');
        return;
    }
    if (url) window.open(url, '_blank');
  };

  if (!product) return <div className="p-20 text-center font-bold">Product not found</div>;

  const handleAddToCart = (e: React.MouseEvent) => { 
    onAddToCart({ ...product, quantity: quantity }, false, e);
  };
  
  const handleBuyNow = (e: React.MouseEvent) => { 
    onAddToCart({ ...product, quantity: quantity }, true, e); 
    navigate('/checkout'); 
  };

  const incrementQty = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <nav className="flex items-center gap-1 text-[11px] font-bold text-gray-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/" className="hover:text-[#2874f0] flex items-center gap-1"><Home size={12} /> Home</Link>
        <ChevronRight size={12} className="shrink-0" />
        <Link to={`/search?category=${product.category}`} className="hover:text-[#2874f0]">{product.category}</Link>
        <ChevronRight size={12} className="shrink-0" />
        <span className="truncate">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-5/12">
          <div className="sticky top-24">
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => scrollToImage(idx)} 
                    className={`w-16 h-16 border-2 p-1 rounded-lg shrink-0 transition-all ${selectedImg === idx ? 'border-[#2874f0] shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <SafeImage src={img} className="w-full h-full object-contain" alt={`Thumbnail ${idx + 1}`} containerClassName="w-full h-full" />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative">
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="aspect-square bg-[#f7f7f9] border rounded-2xl relative overflow-x-auto no-scrollbar snap-x snap-mandatory flex touch-pan-x"
                >
                  {product.images.map((img, idx) => (
                    <div key={idx} className="w-full h-full shrink-0 snap-center flex items-center justify-center p-6 group">
                      <SafeImage 
                        src={img} 
                        className="w-full h-full object-contain mix-blend-multiply transform transition-transform duration-500 group-hover:scale-110" 
                        alt={`${product.name} View ${idx + 1}`} 
                        containerClassName="w-full h-full"
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex flex-row-reverse gap-3 z-10">
                  <button 
                    onClick={(e) => onToggleWishlist(product.id, e)} 
                    className={`p-3.5 rounded-full shadow-2xl transform hover:-translate-y-1 transition-all active:scale-90 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-300'}`}
                  >
                    <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  
                  <div className="relative flex flex-row-reverse items-center gap-2">
                    <button 
                      onClick={() => setShowShare(!showShare)}
                      className={`p-3.5 rounded-full shadow-2xl transform hover:-translate-y-1 transition-all active:scale-90 ${showShare ? 'bg-[#ff5221] text-white' : 'bg-white text-gray-300 hover:text-[#ff5221]'}`}
                    >
                      {showShare ? <X size={22} /> : <Share2 size={22} />}
                    </button>
                    
                    {showShare && (
                      <div className="absolute right-14 flex items-center gap-2 bg-white border border-gray-100 p-2.5 rounded-full shadow-2xl animate-in slide-in-from-right-4 duration-300">
                        <button onClick={() => handleShare('whatsapp')} className="p-2.5 bg-[#25D366] text-white rounded-full hover:scale-110 transition-transform shadow-md">
                          <MessageCircle size={18} />
                        </button>
                        <button onClick={() => handleShare('whatsapp-biz')} className="p-2.5 bg-[#128C7E] text-white rounded-full hover:scale-110 transition-transform shadow-md relative overflow-hidden">
                          <MessageCircle size={18} />
                          <div className="absolute bottom-0 right-0 bg-white text-[6px] font-bold text-[#128C7E] px-0.5 rounded-tl">B</div>
                        </button>
                        <button onClick={() => handleShare('facebook')} className="p-2.5 bg-[#1877F2] text-white rounded-full hover:scale-110 transition-transform shadow-md">
                          <Facebook size={18} />
                        </button>
                        <button onClick={() => handleShare('instagram')} className="p-2.5 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full hover:scale-110 transition-transform shadow-md">
                          <Instagram size={18} />
                        </button>
                        <button onClick={() => handleShare('twitter')} className="p-2.5 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-md">
                          <Twitter size={18} />
                        </button>
                        <div className="w-[1px] h-6 bg-gray-100 mx-1" />
                        <button onClick={() => handleShare()} className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToImage(i)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${i === selectedImg ? 'w-6 bg-[#2874f0]' : 'w-1.5 bg-gray-300'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Video size={18} className="text-[#2874f0]" />
                <h3 className="text-[10px] font-bold text-gray-400">Watch product video</h3>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border-4 border-gray-50 shadow-inner group cursor-pointer">
                <SafeImage 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop`}
                  alt="Video Poster"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-100 transition-all z-20">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                    <Play fill="white" className="text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Enhanced Quantity Selector */}
              <div className="flex items-center bg-slate-100 rounded-2xl p-1 h-[70px] sm:w-44 border border-slate-200 shadow-inner relative overflow-hidden group">
                <button 
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#ff5221] hover:bg-white/50 rounded-l-xl disabled:opacity-20 transition-all active:scale-90"
                  aria-label="Decrease Quantity"
                >
                  <Minus size={22} strokeWidth={3} />
                </button>
                
                <div className="flex-1 text-center flex flex-col justify-center bg-white mx-1 rounded-xl shadow-sm border border-slate-200 h-full overflow-hidden">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-1">Quantity</span>
                  <div className="relative h-6 flex items-center justify-center">
                    <span 
                      key={quantity} 
                      className="text-xl font-black text-gray-900 leading-none animate-in zoom-in-95 fade-in duration-200"
                    >
                      {quantity}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={incrementQty}
                  disabled={quantity >= product.stock}
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#ff5221] hover:bg-white/50 rounded-r-xl disabled:opacity-20 transition-all active:scale-90"
                  aria-label="Increase Quantity"
                >
                  <Plus size={22} strokeWidth={3} />
                </button>
              </div>

              <div className="flex-1 flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 bg-[#ff9f00] text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#f39700] shadow-lg active:scale-95 transition-all">
                  <ShoppingCart size={24} fill="currentColor" /> Add to cart
                </button>
                <button onClick={handleBuyNow} className="flex-1 bg-[#fb641b] text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#ef5d13] shadow-lg active:scale-95 transition-all">
                  <Zap size={24} fill="currentColor" /> Buy now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="text-[10px] font-bold text-[#2874f0]">{product.brand} store</span>
               {product.isAssured && (
                 <div className="flex items-center gap-1 bg-[#2874f0] text-white px-2 py-0.5 rounded shadow-sm">
                   <ShieldCheck size={10} fill="white" className="text-[#2874f0]" />
                   <span className="text-[8px] font-bold italic tracking-tighter">ShopSwift Assured</span>
                 </div>
               )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
                  {product.rating.toFixed(1)} <Star size={14} fill="currentColor" />
               </div>
               <span className="text-sm font-bold text-gray-400">{product.reviewsCount.toLocaleString()} ratings & reviews</span>
            </div>

            <div className="flex items-baseline gap-4">
               <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
               <span className="text-xl text-gray-300 line-through">₹{product.oldPrice?.toLocaleString()}</span>
               <span className="text-xl font-bold text-green-600 italic">{product.discount}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
             <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-4">Top highlights</h3>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                     <CheckCircle size={16} className="text-green-500" /> {h}
                  </li>
                ))}
             </ul>
          </div>

          {/* Improved Delivery Check Section */}
          <div className="border-y py-8 grid sm:grid-cols-2 gap-10">
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                     <MapPin size={14} className="text-[#ff5221]" /> Delivery options
                   </h4>
                </div>
                
                <div className="relative group">
                   <div className="flex items-center border-b-2 border-gray-100 focus-within:border-[#2874f0] transition-colors pb-1">
                      <input 
                        type="text" 
                        maxLength={6}
                        placeholder="Enter 6-digit pincode" 
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => e.key === 'Enter' && handlePincodeCheck()}
                        className="flex-1 bg-transparent outline-none font-bold text-sm py-1" 
                      />
                      <button 
                        onClick={() => handlePincodeCheck()}
                        disabled={isChecking || pincode.length !== 6}
                        className="text-xs font-black text-[#2874f0] uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 px-3 py-1 rounded transition-all"
                      >
                         {isChecking ? <Loader2 size={16} className="animate-spin" /> : deliveryResult ? 'Change' : 'Check'}
                      </button>
                   </div>
                   {pincodeError && (
                     <p className="text-[9px] text-red-500 font-bold mt-1.5 flex items-center gap-1">
                        <AlertCircle size={10} /> {pincodeError}
                     </p>
                   )}
                </div>

                {deliveryResult ? (
                  <div className="animate-in slide-in-from-top-2 duration-300 space-y-3">
                     <div className="flex items-center gap-3 text-gray-800">
                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                           <Truck size={18} />
                        </div>
                        <div>
                           <p className="text-xs font-bold leading-tight">
                              Delivery by <span className="text-[#2874f0]">{deliveryResult.date}</span>
                           </p>
                           <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-0.5">
                              {deliveryResult.type} Service Active
                           </p>
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 bg-gray-50 border px-2 py-1 rounded text-[9px] font-black uppercase text-gray-500">
                           <Calendar size={10} /> 7-Day Replacement
                        </div>
                        <div className={`flex items-center gap-1 border px-2 py-1 rounded text-[9px] font-black uppercase ${deliveryResult.cod ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-300 border-gray-100'}`}>
                           <ShieldCheck size={10} /> {deliveryResult.cod ? 'COD Available' : 'No COD'}
                        </div>
                     </div>
                  </div>
                ) : !isChecking && (
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                    Check delivery availability and COD options for your area by entering pincode.
                  </p>
                )}
             </div>

             <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                   <Award size={18} className="text-[#2874f0]" />
                   <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Verified Seller</h4>
                </div>
                <p className="text-sm font-black text-[#2874f0] mb-1">{product.sellerName}</p>
                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-0.5 text-xs font-bold text-gray-700">
                      {product.sellerRating.toFixed(1)} <Star size={12} className="fill-current text-blue-600" />
                   </div>
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                   <button className="text-[10px] font-black uppercase text-[#2874f0] hover:underline">View Store</button>
                </div>
             </div>
          </div>

          <div>
             <h2 className="text-xl font-bold text-gray-800 tracking-tighter italic mb-6">Product specifications</h2>
             <div className="space-y-6">
                {product.specGroups.map((group, idx) => (
                  <div key={idx} className="border rounded-xl overflow-hidden">
                     <div className="bg-gray-50 p-4 border-b">
                        <h5 className="text-[10px] font-bold text-gray-500 tracking-widest">{group.title}</h5>
                     </div>
                     <div className="divide-y">
                        {Object.entries(group.specs).map(([k, v]) => (
                          <div key={k} className="flex p-4 text-sm">
                             <span className="w-1/3 text-gray-400 font-bold">{k}</span>
                             <span className="w-2/3 text-gray-900 font-medium">{v}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Ratings & Reviews Section */}
          <div className="pt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-800 tracking-tighter italic">Ratings & reviews</h2>
              <button className="bg-white border-2 border-gray-100 px-6 py-2.5 rounded-xl font-bold text-[10px] tracking-widest hover:bg-gray-50 transition-all">Rate product</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating.toFixed(1)}</div>
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                   {[1,2,3,4,5].map(s => <Star key={s} size={20} fill={s <= Math.floor(product.rating) ? "currentColor" : "none"} />)}
                </div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest">{product.reviewsCount.toLocaleString()} reviews</p>
              </div>
              <div className="md:col-span-2 space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-gray-400 w-4">{star} ★</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${Math.random() * 60 + (star * 8)}%` }} 
                       />
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 w-8">{Math.floor(Math.random() * 500)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                <MessageSquare size={14} className="text-[#2874f0]" /> Public comments
              </h3>
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                          <UserIcon size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">{review.userName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                             <div className="bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                               {review.rating} <Star size={8} fill="currentColor" />
                             </div>
                             <span className="text-[9px] font-bold text-gray-300">{review.date}</span>
                          </div>
                       </div>
                    </div>
                    {review.isVerified && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={14} />
                        <span className="text-[8px] font-bold tracking-widest">Certified buyer</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                     <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-widest hover:text-[#2874f0] transition-colors">
                        <ThumbsUp size={14} /> Helpful ({review.helpfulCount})
                     </button>
                     <button className="text-[10px] font-bold text-gray-400 tracking-widest hover:text-[#2874f0] transition-colors">
                        Report
                     </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold tracking-widest text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all flex items-center justify-center gap-2">
                View all {product.reviewsCount.toLocaleString()} reviews <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
