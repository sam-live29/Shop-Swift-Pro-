
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Headphones, MessageSquare, Phone, Mail, HelpCircle, Package, CreditCard, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      q: "How can I track my order in real-time?",
      a: "You can track your order by visiting the 'My Orders' section. Click on the 'Track' button to see real-time updates from our logistics partner. We also send SMS updates for every milestone: Packed, Shipped, Out for Delivery, and Delivered.",
      cat: "orders"
    },
    {
      q: "What conditions must be met for a successful return?",
      a: "Items must be returned in their original packaging with all tags, labels, and accessories intact. For electronics, the product must be in working condition and the IMEI/Serial number must match our records. Self-ship and Pickup options are available based on your location.",
      cat: "returns"
    },
    {
      q: "When will I receive my refund?",
      a: "Once the item reaches our warehouse and passes the quality check (usually within 48 hours of pickup), we initiate the refund. For UPI/Cards, it takes 5-7 business days to reflect in your account. For COD, refunds are credited to your ShopSwift Wallet or bank account.",
      cat: "payments"
    },
    {
      q: "How do I claim a product warranty?",
      a: "For products with brand warranty, you can visit the brand's authorized service center with your ShopSwift invoice. You can download the invoice from the 'My Orders' section. If you face issues with the brand, our support team can assist in escalation.",
      cat: "general"
    },
    {
      q: "What is ShopSwift Buyer Protection?",
      a: "Buyer Protection is our promise to you. If your item is significantly different from the description, arrives damaged, or never arrives, we will ensure you get a full refund or a replacement at no extra cost.",
      cat: "general"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter italic">Support Hub</h1>
        <p className="text-gray-500 text-sm mb-8 font-medium">How can we assist your shopping experience today?</p>
        
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search questions, order IDs, or policies..." 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#ff5221] rounded-2xl outline-none focus:ring-4 focus:ring-orange-50 transition-all font-bold text-sm shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: <Package />, label: 'Orders', color: 'bg-blue-50 text-blue-600' },
          { icon: <RefreshCw />, label: 'Returns', color: 'bg-red-50 text-red-600' },
          { icon: <CreditCard />, label: 'Payments', color: 'bg-green-50 text-green-600' },
          { icon: <ShieldCheck />, label: 'Security', color: 'bg-emerald-50 text-emerald-600' }
        ].map((item, idx) => (
          <button key={idx} className="p-6 bg-white border rounded-3xl flex flex-col items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all group border-gray-100">
            <div className={`p-3 rounded-2xl transition-colors ${item.color}`}>{item.icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white border rounded-[2.5rem] overflow-hidden shadow-sm mb-12 border-gray-100">
        <div className="p-6 bg-gray-50/50 border-b flex items-center justify-between">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Common Solutions</h2>
          <span className="text-[9px] font-bold text-gray-300 uppercase">Frequently Asked</span>
        </div>
        <div className="divide-y">
          {faqs.map((faq, i) => (
            <div key={i} className="group">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-800 text-sm sm:text-base pr-4 leading-tight">{faq.q}</span>
                <div className={`shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#ff5221]' : 'text-gray-300'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              {activeFaq === i && (
                <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed font-medium animate-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    {faq.a}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a3a] rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Headphones size={32} className="text-[#ff5221]" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">Direct Assistance</h3>
            <p className="text-blue-100/60 text-xs font-bold uppercase tracking-widest">Our agents are online in India.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="bg-[#ff5221] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-xl">Start Chat</button>
          <button className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Call Support</button>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mt-12 p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4 text-blue-800">
            <AlertCircle className="shrink-0" />
            <p className="text-xs font-bold uppercase tracking-tight leading-relaxed">Report a security vulnerability or unauthorized activity on your account.</p>
         </div>
         <button className="text-blue-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-200 hover:border-blue-600 transition-all">Report Fraud</button>
      </div>
    </div>
  );
};

export default HelpCenter;
