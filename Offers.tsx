
import React from 'react';
import { Tag, Zap, Clock, Star, Gift, ChevronRight, Sparkles, CreditCard, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Offers: React.FC = () => {
  const navigate = useNavigate();
  const discountedProducts = PRODUCTS.filter(p => parseInt(p.discount || '0') > 25).slice(0, 8);

  return (
    <div className="pb-24 bg-[#f1f3f6] min-h-screen">
      {/* Hero Banner */}
      <div className="bg-[#1a1a3a] text-white p-8 sm:p-12 mb-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl">
               <Zap size={14} fill="currentColor" /> Flash Sale Ends in 04:22:15
            </div>
            <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter mb-4">FLAT 80% OFF</h1>
            <p className="text-lg opacity-80 mb-8 max-w-lg font-medium">India's biggest electronics & fashion carnival is here. Grab your favorites before they're gone!</p>
            <div className="flex gap-4 justify-center md:justify-start">
               <button className="bg-[#ff5221] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest shadow-2xl hover:bg-orange-600 transition-all active:scale-95">Explore Store</button>
            </div>
          </div>
          <div className="hidden lg:block w-72 h-72 relative">
             <div className="absolute inset-0 bg-yellow-400 rounded-3xl rotate-12 animate-pulse"></div>
             <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex flex-col items-center justify-center p-8">
                <Gift size={64} className="text-[#ff5221] mb-4" />
                <p className="text-xl font-black italic">WIN SURPRISE GIFTS!</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Bank Offers Section */}
        <section className="mb-12">
           <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-[#2874f0]" />
              <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Partner Bank Offers</h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { bank: 'HDFC Bank', offer: '10% Instant Discount', min: '₹5,000', color: 'bg-blue-600' },
                { bank: 'ICICI Bank', offer: 'Extra ₹1000 Off on EMI', min: '₹20,000', color: 'bg-orange-500' },
                { bank: 'SBI Card', offer: '5% Cashback on Mobiles', min: 'No Min.', color: 'bg-blue-800' }
              ].map((bank, i) => (
                <div key={i} className={`${bank.color} text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer`}>
                   <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase opacity-60 mb-1">{bank.bank}</p>
                      <h3 className="text-xl font-black tracking-tight mb-4">{bank.offer}</h3>
                      <p className="text-[10px] font-bold">Min. Purchase: {bank.min}</p>
                   </div>
                   <div className="absolute bottom-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                      <CreditCard size={48} />
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Hot Deals Grid */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm mb-20 border border-transparent hover:border-orange-100 transition-all">
          <div className="flex items-center justify-between mb-8 border-b pb-6">
             <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100">
                   <Tag className="text-[#ff5221]" size={24} />
                </div>
                <div>
                   <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter italic">Killer Deals</h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Handpicked for Maximum Savings</p>
                </div>
             </div>
             <button onClick={() => navigate('/search')} className="text-[#2874f0] text-xs font-black uppercase tracking-widest hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {discountedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Offers;
