
import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCcw, Award, Star } from 'lucide-react';

const TrustBanner: React.FC = () => {
  return (
    <div className="w-full bg-white border-t border-b mt-12 mb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-100">
             <ShieldCheck size={14} fill="currentColor" /> ShopSwift Certified Security
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">Why Millions Trust Us.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-emerald-200 transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Lock size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter mb-3 italic">Secure Payments</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              We use 256-bit SSL encryption and PCI-DSS compliant gateways to ensure your transaction is 100% safe.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter mb-3 italic">Swift Delivery</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Our advanced logistics network ensures that your products reach you within 2-4 business days across India.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-orange-200 transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#ff5221] shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <RefreshCcw size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter mb-3 italic">Easy Returns</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Not happy with the purchase? Enjoy a hassle-free 7-day return policy with immediate pick-up and refund.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a3a] rounded-[3rem] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                 <Star size={16} fill="currentColor" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Premium Assurance</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic leading-none">ShopSwift Buyer Protection</h3>
              <p className="text-blue-100 text-sm mt-4 max-w-lg opacity-80 font-medium">
                Every purchase on our platform is protected by the ShopSwift Guarantee. If the product is not as described, we'll make it right.
              </p>
           </div>
           <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Total Savings</p>
              <div className="text-3xl font-black italic">₹120M+</div>
              <p className="text-[8px] font-bold text-gray-400 mt-1">Saved by our users this year</p>
           </div>
           <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
