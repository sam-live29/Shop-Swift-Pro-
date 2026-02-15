
import React, { useState, useMemo } from 'react';
import { 
  Ticket, 
  Zap, 
  Sparkles, 
  Gift, 
  ChevronRight, 
  Star, 
  Clock, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy,
  AlertCircle,
  Tag
} from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  description: string;
  longDescription: string;
  expiryDate: string; // YYYY-MM-DD
  type: 'fashion' | 'electronics' | 'new' | 'home' | 'general';
  terms: string[];
  minAmount: number;
  discountValue: string;
}

const COUPONS_DATA: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME100',
    description: 'Flat ₹100 Off on your first order',
    longDescription: 'A special gift for our newest family members. Get flat discount on your very first purchase across any category.',
    expiryDate: '2024-12-31',
    type: 'new',
    discountValue: '₹100',
    minAmount: 500,
    terms: [
      'Valid for first-time users only',
      'Minimum order value must be ₹500',
      'Cannot be combined with SuperCoin offers',
      'Valid on all prepaid payment methods'
    ]
  },
  {
    id: '2',
    code: 'STYLE25',
    description: '25% Off on Men\'s Fashion Essentials',
    longDescription: 'Upgrade your wardrobe with the latest trends. Valid on select brands including Nike, Levi\'s and Roadster.',
    expiryDate: new Date(Date.now() + 1.5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expires in 1.5 days
    type: 'fashion',
    discountValue: '25%',
    minAmount: 1499,
    terms: [
      'Valid on Men\'s Clothing & Footwear only',
      'Maximum discount up to ₹1000',
      'Not valid on "Best Price" items',
      'Applicable on exchange and returns'
    ]
  },
  {
    id: '3',
    code: 'ELECTRO',
    description: 'Extra ₹2000 Off on Gaming Laptops',
    longDescription: 'Level up your gaming setup. Extra discount over and above the existing bank offers.',
    expiryDate: '2024-11-20',
    type: 'electronics',
    discountValue: '₹2000',
    minAmount: 45000,
    terms: [
      'Valid on Laptops above ₹45,000',
      'Applicable only on Gaming Series',
      'One use per customer',
      'Valid on HDFC and ICICI cards'
    ]
  },
  {
    id: '4',
    code: 'HOMEUP',
    description: '15% Off on Premium Home Decor',
    longDescription: 'Make your living space shine. Valid on Furniture, Wall Decor and Lighting solutions.',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: 'home',
    discountValue: '15%',
    minAmount: 2000,
    terms: [
      'Minimum purchase of 2 units required',
      'Valid on IKEA and Pepperfry stores',
      'Max discount ₹500 per order',
      'Free installation still applicable'
    ]
  },
  {
    id: '5',
    code: 'SWIFTPAY',
    description: '₹50 Cashback on UPI Transactions',
    longDescription: 'Go digital and save more. Instant cashback credited to your ShopSwift wallet.',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expires in 1 day
    type: 'general',
    discountValue: '₹50',
    minAmount: 1000,
    terms: [
      'Valid only on UPI payments',
      'Cashback credited within 24 hours',
      'Applicable once per week',
      'Available for all users'
    ]
  }
];

const CouponCard: React.FC<{ coupon: Coupon }> = ({ coupon }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [copied, setCopied] = useState(false);

  const isExpiringSoon = useMemo(() => {
    const expiry = new Date(coupon.expiryDate);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return diff > 0 && diff < 2 * 24 * 60 * 60 * 1000; // Less than 48 hours
  }, [coupon.expiryDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTheme = () => {
    switch (coupon.type) {
      case 'fashion': return 'bg-pink-50 border-pink-100 text-pink-600 icon-bg-pink-100';
      case 'electronics': return 'bg-blue-50 border-blue-100 text-blue-600 icon-bg-blue-100';
      case 'new': return 'bg-emerald-50 border-emerald-100 text-emerald-600 icon-bg-emerald-100';
      case 'home': return 'bg-amber-50 border-amber-100 text-amber-600 icon-bg-amber-100';
      default: return 'bg-gray-50 border-gray-100 text-gray-600 icon-bg-gray-100';
    }
  };

  return (
    <div className={`bg-white border-2 border-dashed rounded-3xl overflow-hidden transition-all hover:shadow-xl group ${isExpiringSoon ? 'border-red-200' : 'border-gray-100 hover:border-orange-200'}`}>
      <div className="p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Left Side: Branding/Value */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-32 py-4 rounded-2xl bg-gray-50/50 relative">
          {isExpiringSoon && (
            <div className="absolute -top-3 -right-3 flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 border-2 border-white items-center justify-center">
                <Clock size={10} className="text-white" />
              </span>
            </div>
          )}
          <span className="text-3xl font-black text-gray-900 tracking-tighter">{coupon.discountValue}</span>
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Discount</span>
        </div>

        {/* Center: Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">{coupon.code}</h3>
            {isExpiringSoon && (
              <span className="bg-red-50 text-red-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-red-100 animate-pulse">
                Expiring Soon
              </span>
            )}
            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${getTheme().split(' ')[1]} ${getTheme().split(' ')[2]}`}>
              {coupon.type}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-600 mb-1">{coupon.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
             <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                <Tag size={12} /> Min. ₹{coupon.minAmount}
             </div>
             <div className="w-1 h-1 bg-gray-200 rounded-full" />
             <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${isExpiringSoon ? 'text-red-500' : 'text-gray-400'}`}>
                <Clock size={12} /> {new Date(coupon.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
             </div>
          </div>
        </div>

        {/* Right Side: CTA */}
        <div className="shrink-0 w-full md:w-auto">
          <button 
            onClick={handleCopy}
            className={`w-full md:w-32 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95 ${copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-900 text-white hover:bg-black shadow-md'}`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>
      </div>

      {/* Details Toggler */}
      <button 
        onClick={() => setShowTerms(!showTerms)}
        className="w-full py-3 bg-gray-50/50 hover:bg-gray-50 border-t flex items-center justify-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest transition-colors"
      >
        {showTerms ? 'Hide Details' : 'View Terms & Conditions'}
        {showTerms ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {/* Expanded Terms */}
      {showTerms && (
        <div className="p-6 bg-white border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
           <p className="text-xs text-gray-500 mb-4 leading-relaxed font-medium">{coupon.longDescription}</p>
           <h4 className="text-[9px] font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
             <AlertCircle size={12} className="text-orange-500" /> Usage Policy
           </h4>
           <ul className="space-y-2">
             {coupon.terms.map((term, i) => (
               <li key={i} className="flex items-start gap-2 text-[11px] text-gray-500 font-medium">
                 <div className="w-1 h-1 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                 {term}
               </li>
             ))}
           </ul>
        </div>
      )}
    </div>
  );
};

const Coupons: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Coupon['type']>('all');

  const filteredCoupons = useMemo(() => {
    if (filter === 'all') return COUPONS_DATA;
    return COUPONS_DATA.filter(c => c.type === filter);
  }, [filter]);

  const categories = [
    { id: 'all', label: 'All Coupons', icon: <Ticket size={14} /> },
    { id: 'new', label: 'Exclusive', icon: <Star size={14} /> },
    { id: 'fashion', label: 'Fashion', icon: <Tag size={14} /> },
    { id: 'electronics', label: 'Tech', icon: <Zap size={14} /> },
    { id: 'home', label: 'Home', icon: <Gift size={14} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* SuperCoins Dashboard Banner */}
      <div className="bg-gradient-to-br from-[#1a1a3a] to-[#2874f0] rounded-[2.5rem] p-8 sm:p-12 text-white mb-10 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg">
               <Sparkles size={14} fill="currentColor" /> ShopSwift Plus Rewards
            </div>
            <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter mb-4 leading-none uppercase">Coupons &<br/>SuperCoins</h1>
            <p className="text-blue-100/70 text-sm max-w-sm font-medium leading-relaxed">
              Earn coins on every order and unlock extra savings with exclusive partner coupons. 
              <span className="text-white font-bold block mt-2">100 SuperCoins = ₹100 Off</span>
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 text-center min-w-[240px] shadow-inner group">
             <div className="flex items-center justify-center gap-2 mb-2 text-blue-200">
                <Star size={16} fill="currentColor" className="text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Available Balance</span>
             </div>
             <div className="text-5xl font-black italic group-hover:scale-110 transition-transform">
               450 <span className="text-yellow-400">★</span>
             </div>
             <button className="mt-6 w-full py-2.5 bg-white text-blue-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">
                View History
             </button>
          </div>
        </div>
        
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl"></div>
      </div>

      {/* Filter Rail */}
      <div className="mb-10 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
         {categories.map(cat => (
           <button
             key={cat.id}
             onClick={() => setFilter(cat.id as any)}
             className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 flex items-center gap-2 ${filter === cat.id ? 'bg-[#ff5221] border-[#ff5221] text-white shadow-xl shadow-orange-100 -translate-y-1' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
           >
             {cat.icon}
             {cat.label}
           </button>
         ))}
      </div>

      {/* Main Coupons List */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center justify-between px-2 mb-2">
           <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <Ticket size={18} className="text-[#ff5221]" /> Available Rewards ({filteredCoupons.length})
           </h2>
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 italic">
              <Info size={14} /> Tap code to copy
           </div>
        </div>

        {filteredCoupons.length > 0 ? (
          <div className="grid gap-6">
            {filteredCoupons.map(coupon => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] py-20 text-center px-10">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket size={32} className="text-gray-200" />
             </div>
             <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight italic">No coupons found</h3>
             <p className="text-sm text-gray-400 mt-2 font-medium">Try changing your filter or check back later for new rewards.</p>
             <button onClick={() => setFilter('all')} className="mt-8 text-[#ff5221] font-black text-xs uppercase tracking-widest underline">Reset Filters</button>
          </div>
        )}
      </div>

      {/* SuperCoin Redemption Grid */}
      <div className="bg-gray-50 rounded-[3rem] p-10 sm:p-14 border border-dashed border-gray-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
           <div>
              <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Coin Rewards Store</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Exclusively for ShopSwift Plus</p>
           </div>
           <button className="text-[10px] font-black text-[#2874f0] uppercase tracking-widest flex items-center gap-1 group">
             Explore All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { label: 'Free Delivery', price: '50', icon: <Clock size={24} />, color: 'bg-blue-50 text-blue-600' },
             { label: '₹50 Gift Card', price: '200', icon: <Gift size={24} />, color: 'bg-emerald-50 text-emerald-600' },
             { label: 'YouTube Prem.', price: '500', icon: <Zap size={24} />, color: 'bg-red-50 text-red-600' },
             { label: 'Zomato Gold', price: '800', icon: <Tag size={24} />, color: 'bg-orange-50 text-orange-600' }
           ].map((item, idx) => (
             <button key={idx} className="bg-white p-6 rounded-[2rem] flex flex-col items-center gap-3 hover:shadow-2xl hover:-translate-y-2 transition-all group border border-transparent hover:border-orange-100 shadow-sm">
                <div className={`p-4 rounded-2xl transition-all group-hover:scale-110 ${item.color}`}>
                   {item.icon}
                </div>
                <div className="text-center">
                   <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{item.label}</p>
                   <div className="flex items-center justify-center gap-1 mt-1 text-[#ff5221] font-black text-[10px]">
                      {item.price} <Star size={10} fill="currentColor" />
                   </div>
                </div>
             </button>
           ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-16 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ff5221] shrink-0">
               <Info size={28} />
            </div>
            <div>
               <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight italic">Need help with coupons?</h4>
               <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-sm mt-1">Read our FAQ on how to earn more SuperCoins and apply coupon codes at checkout.</p>
            </div>
         </div>
         <button className="bg-gray-100 text-gray-800 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95">
           Visit Help Center
         </button>
      </div>
    </div>
  );
};

export default Coupons;
