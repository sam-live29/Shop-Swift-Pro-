
import React, { useEffect } from 'react';
// Added Clock and Zap to the import list from lucide-react
import { Info, ShieldCheck, Truck, RotateCcw, Ruler, Lock, FileText, Cookie, AlertCircle, Scale, Globe, CreditCard, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StaticInfoProps {
  title: string;
  type: 'about' | 'legal' | 'shipping' | 'returns' | 'size' | 'privacy' | 'terms' | 'cookies';
}

const StaticInfo: React.FC<StaticInfoProps> = ({ title, type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getIcon = () => {
    switch (type) {
      case 'about': return <Info size={32} className="text-[#2874f0]" />;
      case 'legal': return <ShieldCheck size={32} className="text-gray-800" />;
      case 'shipping': return <Truck size={32} className="text-orange-500" />;
      case 'returns': return <RotateCcw size={32} className="text-red-500" />;
      case 'size': return <Ruler size={32} className="text-blue-500" />;
      case 'privacy': return <Lock size={32} className="text-emerald-500" />;
      case 'terms': return <FileText size={32} className="text-indigo-500" />;
      case 'cookies': return <Cookie size={32} className="text-amber-500" />;
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-8">
            <p className="text-gray-600 font-medium">Last Updated: October 2024</p>
            <p className="text-gray-700 leading-relaxed">ShopSwift knows that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This Privacy Notice describes how ShopSwift India and its affiliates collect and process your personal information through ShopSwift websites, devices, products, services, and applications.</p>
            
            <section>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">1. Information We Collect</h3>
              <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5">
                <li><span className="font-bold text-gray-800">Information You Give Us:</span> We receive and store any information you provide in relation to ShopSwift Services (e.g., name, address, phone number).</li>
                <li><span className="font-bold text-gray-800">Automatic Information:</span> We automatically collect and store certain types of information about your use of ShopSwift Services, including information about your interaction with content and services available through ShopSwift.</li>
                <li><span className="font-bold text-gray-800">Information from Other Sources:</span> We might receive information about you from other sources, such as updated delivery and address information from our carriers.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">2. Purpose of Processing</h3>
              <p className="text-sm text-gray-600 mb-4">We process your personal information to operate, provide, develop, and improve the products and services that we offer our customers. These purposes include:</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="p-4 bg-gray-50 rounded-xl text-xs font-bold text-gray-700 border border-gray-100">Purchase and delivery of products and services</li>
                <li className="p-4 bg-gray-50 rounded-xl text-xs font-bold text-gray-700 border border-gray-100">Provide, troubleshoot, and improve ShopSwift Services</li>
                <li className="p-4 bg-gray-50 rounded-xl text-xs font-bold text-gray-700 border border-gray-100">Recommendations and personalization</li>
                <li className="p-4 bg-gray-50 rounded-xl text-xs font-bold text-gray-700 border border-gray-100">Comply with legal obligations and fraud prevention</li>
              </ul>
            </section>

            <section className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
               <div className="flex gap-4">
                  <ShieldCheck className="text-emerald-600 shrink-0" size={24} />
                  <div>
                    <h4 className="text-sm font-black text-emerald-900 uppercase mb-1">Your Privacy Rights</h4>
                    <p className="text-xs text-emerald-800/80 leading-relaxed">You have the right to access, correct, or delete your personal data. You can manage these settings directly in your Account dashboard or contact our Data Protection Officer.</p>
                  </div>
               </div>
            </section>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-8">
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-8">
               <div className="flex gap-4 italic font-bold text-orange-900 text-sm">
                  <Scale size={24} className="shrink-0" />
                  <p>PLEASE READ THESE CONDITIONS OF USE CAREFULLY. BY USING SHOPSWIFT SERVICES, YOU AGREE TO BE BOUND BY THESE CONDITIONS.</p>
               </div>
            </div>

            <section>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">1. Electronic Communications</h3>
              <p className="text-sm text-gray-600 leading-relaxed">When you use ShopSwift Services, or send e-mails, text messages, and other communications from your desktop or mobile device to us, you may be communicating with us electronically. You consent to receive communications from us electronically, such as e-mails, texts, mobile push notices, or notices and messages on this site.</p>
            </section>

            <section>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">2. Your Account</h3>
              <p className="text-sm text-gray-600 leading-relaxed">You may need your own ShopSwift account to use certain ShopSwift Services, and you may be required to be logged in to the account and have a valid payment method associated with it. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</p>
            </section>

            <section>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">3. Product Descriptions</h3>
              <p className="text-sm text-gray-600 leading-relaxed italic">ShopSwift attempts to be as accurate as possible. However, ShopSwift does not warrant that product descriptions or other content of any ShopSwift Service is accurate, complete, reliable, current, or error-free. If a product offered by ShopSwift itself is not as described, your sole remedy is to return it in unused condition.</p>
            </section>
          </div>
        );

      case 'returns':
        return (
          <div className="space-y-8">
            <p className="text-gray-700 leading-relaxed">ShopSwift's returns and exchange policy gives you an option to return or exchange items purchased on ShopSwift for any reason within the specified return/exchange period. We only ask that you don't use the product and preserve its original condition, tags, and packaging.</p>
            
            <div className="grid gap-6">
              {[
                { title: "Mobiles & Tablets", period: "7 Days", type: "Replacement Only", desc: "In case of manufacturing defects or physical damage at the time of delivery." },
                { title: "Fashion & Lifestyle", period: "30 Days", type: "Refund or Exchange", desc: "Items must be unworn, unwashed with original tags attached." },
                { title: "Electronics & Appliances", period: "10 Days", type: "Replacement Only", desc: "Brand assistance required for large appliances and installation-based products." },
                { title: "Home Decor & Furniture", period: "7 Days", type: "Refund or Replacement", desc: "Return allowed if the product received is damaged or not as described." }
              ].map((cat, i) => (
                <div key={i} className="bg-white border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow border-gray-100">
                  <div className="sm:w-1/3">
                    <h4 className="font-black text-gray-900 uppercase tracking-tight mb-1">{cat.title}</h4>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase">
                       <Clock size={12} /> {cat.period} Window
                    </div>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-xs font-black text-[#ff5221] uppercase mb-2">{cat.type}</p>
                    <p className="text-sm text-gray-500 font-medium">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
               <h4 className="text-sm font-black text-blue-900 uppercase mb-3 flex items-center gap-2">
                 <AlertCircle size={18} /> Non-Returnable Categories
               </h4>
               <p className="text-xs text-blue-800 font-medium leading-relaxed">For hygiene and safety reasons, certain categories such as Lingerie, Beauty products, Personal Care items, and Perishables are not eligible for returns once the seal is broken or the product is used.</p>
            </section>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">Delivery Guidelines</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">Our standard shipping typically takes 3-5 business days. For ShopSwift Plus members, we offer priority 24-hour delivery in select metro cities (Mumbai, Delhi, Bengaluru, Hyderabad, Kolkata, Chennai).</p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <Zap className="text-yellow-500 mb-3" size={24} fill="currentColor" />
                    <h5 className="font-black text-gray-900 text-xs uppercase mb-1">Priority Ship</h5>
                    <p className="text-[11px] text-gray-500 font-medium italic">Orders placed before 2 PM are eligible for same-day processing.</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <Truck className="text-[#2874f0] mb-3" size={24} />
                    <h5 className="font-black text-gray-900 text-xs uppercase mb-1">Real-Time Tracking</h5>
                    <p className="text-[11px] text-gray-500 font-medium italic">Full visibility from warehouse dispatch to doorstep delivery.</p>
                 </div>
              </div>
            </section>

            <section className="border-t pt-8">
               <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">Shipping Charges</h3>
               <div className="overflow-hidden border rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 font-black uppercase text-[10px] text-gray-400">
                      <tr>
                        <th className="p-4 border-r">Order Value</th>
                        <th className="p-4 border-r">Standard</th>
                        <th className="p-4">Priority (Plus Only)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-bold text-gray-700">
                      <tr><td className="p-4 border-r">Under ₹499</td><td className="p-4 border-r">₹40</td><td className="p-4">₹20</td></tr>
                      <tr><td className="p-4 border-r">Above ₹499</td><td className="p-4 border-r">FREE</td><td className="p-4">FREE</td></tr>
                    </tbody>
                  </table>
               </div>
            </section>
          </div>
        );

      case 'size':
        return (
          <section className="mb-10">
            <h2 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-widest border-b pb-2">Apparel Size Guide</h2>
            <div className="overflow-x-auto border rounded-xl mb-4">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 font-black uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="p-4 border-r">Size (INT)</th>
                    <th className="p-4 border-r">Chest (Inches)</th>
                    <th className="p-4">Waist (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-bold text-gray-700">
                  <tr><td className="p-4 border-r">S</td><td className="p-4 border-r">36 - 38</td><td className="p-4">30 - 32</td></tr>
                  <tr><td className="p-4 border-r">M</td><td className="p-4 border-r">38 - 40</td><td className="p-4">32 - 34</td></tr>
                  <tr><td className="p-4 border-r">L</td><td className="p-4 border-r">40 - 42</td><td className="p-4">34 - 36</td></tr>
                  <tr><td className="p-4 border-r">XL</td><td className="p-4 border-r">42 - 44</td><td className="p-4">36 - 38</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic">* Measurements may vary slightly by brand.</p>
          </section>
        );

      default:
        return (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-widest border-b pb-2">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                ShopSwift is India's most customer-centric marketplace. We started with a simple idea: to bring the world's best products to every Indian doorstep at the most competitive prices, backed by a world-class support infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-widest border-b pb-2">Core Principles</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="font-bold mb-2 uppercase text-[10px] text-[#ff5221] tracking-widest">Trust & Safety</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">We prioritize our users' data security above all else, ensuring transparency and reliability in every single interaction.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="font-bold mb-2 uppercase text-[10px] text-[#ff5221] tracking-widest">Innovation</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">We continuously leverage cutting-edge AI and logistics tech to make shopping faster, smarter, and safer for Indians.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-widest border-b pb-2">Anti-Counterfeit Commitment</h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                ShopSwift has zero tolerance for counterfeit products. We work directly with brands and authorized distributors to ensure every item sold on our platform is 100% authentic. Sellers found violating this policy are permanently banned and reported to regulatory authorities.
              </p>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-12 animate-fade-in">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          {getIcon()}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 uppercase tracking-tighter text-center italic">{title}</h1>
        <div className="mt-2 w-20 h-1.5 bg-[#ff5221] rounded-full"></div>
      </div>

      <div className="bg-white border rounded-3xl p-8 sm:p-12 shadow-sm animate-in fade-in duration-500 overflow-hidden relative">
        {renderContent()}

        <div className="bg-gray-900 rounded-3xl p-8 text-center text-white mt-16 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Still have questions?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('/help')} className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all shadow-sm">View Full FAQ</button>
                <button onClick={() => navigate('/contact')} className="bg-[#ff5221] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all">Contact Us</button>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-40 grayscale pointer-events-none">
         <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"><CreditCard size={14}/> PCI-DSS</div>
         <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={14}/> Secure Connect</div>
         <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"><Globe size={14}/> ISO 27001</div>
      </div>
    </div>
  );
};

export default StaticInfo;
