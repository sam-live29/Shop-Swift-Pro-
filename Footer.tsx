import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Youtube, Instagram, MapPin, Mail, 
  Phone, CreditCard, ShieldCheck, Globe, Star, Gift, 
  HelpCircle, Zap, Award 
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'ABOUT',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/about' },
        { label: 'ShopSwift Stories', path: '/about' },
        { label: 'Press', path: '/about' },
        { label: 'Wholesale', path: '/solutions' },
        { label: 'Corporate Information', path: '/security' },
      ]
    },
    {
      title: 'HELP',
      links: [
        { label: 'Payments', path: '/payments' },
        { label: 'Shipping', path: '/shipping' },
        { label: 'Cancellation & Returns', path: '/returns' },
        { label: 'FAQ', path: '/help' },
        { label: 'Report Infringement', path: '/contact' },
      ]
    },
    {
      title: 'CONSUMER POLICY',
      links: [
        { label: 'Cancellation & Returns', path: '/returns' },
        { label: 'Terms Of Use', path: '/terms' },
        { label: 'Security', path: '/security' },
        { label: 'Privacy', path: '/privacy' },
        { label: 'Sitemap', path: '/categories' },
        { label: 'Grievance Redressal', path: '/contact' },
        { label: 'EPR Compliance', path: '/legal' },
      ]
    },
  ];

  return (
    <footer className="hidden md:block bg-[#172337] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 border-b border-gray-700 pb-12">
          {/* Main Links */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path} className="text-xs font-bold text-gray-200 hover:text-white hover:underline transition-all">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">SOCIAL</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-[#2874f0] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors"><Youtube size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Mail Details */}
          <div className="lg:col-span-1 space-y-4 border-l border-gray-700 pl-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">MAIL US:</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              ShopSwift Internet Private Limited,<br />
              Park Street Mansion, 18 Park Street,<br />
              Kolkata, West Bengal, 700016,<br />
              India
            </p>
          </div>

          {/* Registered Office */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">REGISTERED OFFICE:</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              ShopSwift Internet Private Limited,<br />
              CIN : U51109WB2024PTC123456<br />
              Telephone: <span className="text-[#2874f0]">044-45614700</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 items-center">
            <Link to="/solutions" className="flex items-center gap-2 text-xs font-black text-gray-300 hover:text-white uppercase tracking-tighter">
              <Globe size={16} className="text-yellow-500" /> Become a Seller
            </Link>
            <Link to="/offers" className="flex items-center gap-2 text-xs font-black text-gray-300 hover:text-white uppercase tracking-tighter">
              <Award size={16} className="text-yellow-500" /> Advertise
            </Link>
            <Link to="/coupons" className="flex items-center gap-2 text-xs font-black text-gray-300 hover:text-white uppercase tracking-tighter">
              <Gift size={16} className="text-yellow-500" /> Gift Cards
            </Link>
            <Link to="/help" className="flex items-center gap-2 text-xs font-black text-gray-300 hover:text-white uppercase tracking-tighter">
              <HelpCircle size={16} className="text-yellow-500" /> Help Center
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <span>© 2024 ShopSwift.com</span>
            <div className="flex items-center gap-2 border-l border-gray-700 pl-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
              <CreditCard size={18} />
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
           <p className="text-[10px] text-gray-500 font-bold max-w-4xl mx-auto leading-relaxed uppercase tracking-tighter">
             Top Brands: Apple, Samsung, Vivo, Realme, Motorola, Nike, Adidas, Puma, Levi's, H&M, HP, Dell, Sony, LG, Whirlpool, IKEA, Pepperfry, LEGO, Barbie & More.
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;