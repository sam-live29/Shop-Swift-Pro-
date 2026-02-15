
import React from 'react';
import { 
  Lightbulb, 
  ShieldCheck, 
  Zap, 
  Search, 
  ChevronRight, 
  Smartphone, 
  Tv, 
  Shirt, 
  Cpu, 
  CreditCard, 
  Lock, 
  Gift,
  HelpCircle,
  Award,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Solutions: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'mobiles', icon: <Smartphone size={32} />, title: 'Smart Device Solution', desc: 'Find the perfect 5G phone for your budget and needs.' },
    { id: 'electronics', icon: <Tv size={32} />, title: 'Home Tech Solution', desc: 'Setting up a workstation or cinema room? We can help.' },
    { id: 'fashion', icon: <Shirt size={32} />, title: 'Style Persona', desc: 'Curated wardrobes based on your occasion and size.' },
    { id: 'appliances', icon: <Cpu size={32} />, title: 'Smart Living', desc: 'Upgrade your home with energy-efficient appliances.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <div className="text-center mb-20 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-[#ff5221] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-orange-100 shadow-sm">
           <Lightbulb size={14} fill="currentColor" /> ShopSwift Solutions
        </div>
        <h1 className="text-4xl sm:text-7xl font-black text-gray-900 uppercase tracking-tighter italic mb-6">Expert Advice for<br/>Every Purchase.</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          From detailed buying guides to secure payment solutions, we provide the tools you need to shop smarter, faster, and safer.
        </p>
      </div>

      {/* Main Solution Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(`/search?category=${cat.id}`)}
            className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#ff5221] group-hover:text-white transition-all mb-6">
              {cat.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-3 leading-tight italic">{cat.title}</h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">{cat.desc}</p>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#ff5221] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
               Get Started <ArrowRight size={14} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-30" />
          </div>
        ))}
      </div>

      {/* Secure Green Section - Trust Solutions */}
      <section className="bg-emerald-50 rounded-[3rem] p-8 sm:p-16 mb-24 relative overflow-hidden border border-emerald-100">
         <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-200/50">
                  <ShieldCheck size={28} />
               </div>
               <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-emerald-900 uppercase tracking-tighter italic">Secured Shopping Solution</h2>
                  <p className="text-emerald-700 text-xs font-black uppercase tracking-widest mt-0.5">Your Safety is our #1 Priority</p>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="flex gap-5">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm"><Lock size={20} className="text-emerald-500" /></div>
                     <div>
                        <h4 className="font-black text-emerald-900 uppercase text-xs tracking-widest mb-1">PCI-DSS Payments</h4>
                        <p className="text-emerald-700/70 text-sm font-medium leading-relaxed">All transactions are encrypted with military-grade 256-bit SSL protocols.</p>
                     </div>
                  </div>
                  <div className="flex gap-5">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm"><Award size={20} className="text-emerald-500" /></div>
                     <div>
                        <h4 className="font-black text-emerald-900 uppercase text-xs tracking-widest mb-1">7-Day Guarantee</h4>
                        <p className="text-emerald-700/70 text-sm font-medium leading-relaxed">No-questions-asked refund policy if your item doesn't meet expectations.</p>
                     </div>
                  </div>
               </div>
               <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white shadow-xl">
                  <h4 className="text-lg font-black text-emerald-900 mb-4 uppercase tracking-tight italic">Buyer Protection Plus</h4>
                  <p className="text-emerald-800 text-xs mb-6 font-medium leading-relaxed">Unlock extended warranties, zero-cost EMI solutions, and priority fraud-prevention support.</p>
                  <button className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 shadow-xl transition-all active:scale-95">
                     Learn About Security
                  </button>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="absolute bottom-12 right-12 opacity-5 text-emerald-900 pointer-events-none hidden lg:block">
            <ShieldCheck size={280} />
         </div>
      </section>

      {/* Buying Assistant Section */}
      <section className="bg-gray-900 text-white rounded-[3rem] p-8 sm:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
         <div className="lg:w-1/2 relative z-10">
            <div className="flex items-center gap-2 text-yellow-400 mb-6">
               <Zap size={20} fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Quick Solution</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic leading-none mb-6">Can't Decide?<br/>Ask the Finder.</h2>
            <p className="text-gray-400 font-medium text-lg leading-relaxed mb-10">Our intelligent finder solution asks a few simple questions and recommends the best products from 10,000+ listings.</p>
            <div className="flex flex-wrap gap-4">
               <button className="bg-[#ff5221] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-orange-600 transition-all flex items-center gap-3">
                  Start Gift Finder <Gift size={18} />
               </button>
               <button onClick={() => navigate('/help')} className="bg-white/10 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20">
                  Talk to Support
               </button>
            </div>
         </div>
         <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative z-10">
            <div className="space-y-4">
               <div className="bg-white/5 p-6 rounded-3xl border border-white/10"><HelpCircle size={24} className="text-orange-400 mb-4" /><p className="text-xs font-bold">Troubleshooting</p></div>
               <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mt-8"><Search size={24} className="text-blue-400 mb-4" /><p className="text-xs font-bold">Deep Search</p></div>
            </div>
            <div className="space-y-4 pt-8">
               <div className="bg-white/5 p-6 rounded-3xl border border-white/10"><Lightbulb size={24} className="text-yellow-400 mb-4" /><p className="text-xs font-bold">Expert Picks</p></div>
               <div className="bg-white/5 p-6 rounded-3xl border border-white/10"><CreditCard size={24} className="text-emerald-400 mb-4" /><p className="text-xs font-bold">EMI Solutions</p></div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>
      </section>

      {/* Footer Solutions */}
      <div className="mt-20 border-t pt-16 grid sm:grid-cols-3 gap-12 text-center sm:text-left">
         <div>
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] mb-4">Enterprise Solutions</h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">Looking for bulk orders or corporate gifting? Our dedicated team provides tailored business solutions for GST billing and logistics.</p>
         </div>
         <div>
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] mb-4">Logistics Solution</h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">Swift-Ship ensures 99% on-time delivery across 18,000+ pincodes in India with live tracking and smart route optimization.</p>
         </div>
         <div>
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] mb-4">Seller Solutions</h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">Empowering 100,000+ local Indian sellers with advanced inventory tools, marketing insights, and fast payout cycles.</p>
         </div>
      </div>
    </div>
  );
};

export default Solutions;
