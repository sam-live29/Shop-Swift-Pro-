
import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  EyeOff, 
  Server, 
  CreditCard, 
  Truck, 
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Fingerprint,
  Database,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Security: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Lock className="text-emerald-600" size={32} />,
      title: "256-Bit SSL Encryption",
      desc: "All your data, from login credentials to payment details, is encrypted using military-grade AES-256 protocols before being stored or transmitted over our network."
    },
    {
      icon: <CreditCard className="text-emerald-600" size={32} />,
      title: "PCI-DSS Level 1 Compliant",
      desc: "Your payment information is processed through world-class secure gateways that meet the highest global security standards for financial transactions."
    },
    {
      icon: <Cpu className="text-emerald-600" size={32} />,
      title: "Automated Fraud Detection",
      desc: "Our machine learning models monitor millions of transactions daily to identify and block suspicious activity, protecting your account from unauthorized access."
    },
    {
      icon: <Fingerprint className="text-emerald-600" size={32} />,
      title: "Secure Identity Storage",
      desc: "We use isolated database clusters for sensitive identity data, ensuring that your personal profile remains strictly confidential and unreachable by external threats."
    }
  ];

  return (
    <div className="bg-emerald-50/30 min-h-screen pb-24">
      {/* Dynamic Green Hero */}
      <section className="bg-emerald-600 text-white pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 animate-fade-in">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-0 left-0 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all sm:flex hidden"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/30 shadow-2xl animate-pulse">
            <ShieldCheck size={56} className="text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic mb-6 leading-tight">
            Safety First.<br/>Always & Everywhere.
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl font-medium leading-relaxed opacity-90">
            ShopSwift is built on a zero-trust architecture. We don't just protect your data; we ensure your entire shopping ecosystem is isolated, verified, and safe.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
      </section>

      {/* Trust Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white border-2 border-emerald-100 rounded-[2.5rem] p-8 shadow-xl hover:border-emerald-400 transition-all group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-emerald-900 uppercase tracking-tight italic mb-3">{f.title}</h3>
              <p className="text-emerald-800/60 text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Trust Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-200">
                <Database size={14} /> Data Sovereignty
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-emerald-900 uppercase tracking-tighter italic mb-6 leading-tight">Your Data Never Leaves India.</h2>
              <p className="text-emerald-800/70 font-medium leading-relaxed mb-8">In compliance with the Data Protection Bill, all ShopSwift user data is stored on local servers within India. We ensure strict data localization protocols and maintain redundant backups across multiple secure facilities.</p>
              
              <ul className="space-y-4">
                 {[
                   { icon: <RefreshCw size={16}/>, text: "Regular security audits by CERT-In empaneled agencies." },
                   { icon: <ShieldAlert size={16}/>, text: "Automated bug bounty program for ethical hackers." },
                   { icon: <CheckCircle2 size={16}/>, text: "Multi-factor authentication (MFA) enabled for all accounts." }
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-xs font-bold text-emerald-900">
                      <div className="text-emerald-600">{item.icon}</div>
                      <span>{item.text}</span>
                   </li>
                 ))}
              </ul>
           </div>
           <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-6">ShopSwift Protection Plan</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">Every purchase is backed by our comprehensive protection protocols. If your order doesn't meet the high standards we've set, we'll step in.</p>
              
              <div className="space-y-4 mb-10">
                 <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-xs font-bold text-gray-500 uppercase">Item Coverage</span>
                    <span className="text-xs font-black text-emerald-400 uppercase">100% Guaranteed</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-xs font-bold text-gray-500 uppercase">Delivery Window</span>
                    <span className="text-xs font-black text-emerald-400 uppercase">Verified Tracking</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-xs font-bold text-gray-500 uppercase">Return Assistance</span>
                    <span className="text-xs font-black text-emerald-400 uppercase">Priority Support</span>
                 </div>
              </div>

              <button className="w-full bg-[#ff5221] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all">
                 Activate Full Security
              </button>
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
           </div>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="bg-white border-y-2 border-emerald-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-12">Global Compliance Standards</p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-40 grayscale">
             <div className="flex flex-col items-center gap-2"><Server size={40} /><span className="text-[10px] font-black">ISO 27001</span></div>
             <div className="flex flex-col items-center gap-2"><Lock size={40} /><span className="text-[10px] font-black">PCI-DSS</span></div>
             <div className="flex flex-col items-center gap-2"><ShieldCheck size={40} /><span className="text-[10px] font-black">GDPR READY</span></div>
             <div className="flex flex-col items-center gap-2"><CheckCircle2 size={40} /><span className="text-[10px] font-black">SOC2 TYPE II</span></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 pt-24 text-center">
        <div className="bg-emerald-900 text-white rounded-[3rem] p-12 sm:p-20 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic leading-none mb-8 relative z-10">Shop with absolute<br/>confidence.</h2>
          <p className="text-emerald-200 text-lg mb-10 max-w-lg mx-auto opacity-70 relative z-10">Our security team works around the clock to prevent fraud before it even begins. Your peace of mind is our product.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button 
              onClick={() => navigate('/')}
              className="bg-white text-emerald-900 px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              Start Shopping <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/help')}
              className="bg-emerald-800 text-white border border-emerald-700 px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all"
            >
              Learn More
            </button>
          </div>
          {/* Decorative background shield */}
          <ShieldCheck size={300} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default Security;
