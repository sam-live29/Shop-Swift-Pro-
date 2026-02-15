
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Truck, Package, Home, MapPin, CheckCircle2, Clock, ChevronRight, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const trackData = [
    { status: 'Order Placed', time: 'Oct 24, 10:30 AM', location: 'System', desc: 'Successfully processed and ready for packaging.', completed: true },
    { status: 'Packed', time: 'Oct 24, 02:45 PM', location: 'Warehouse, Gurgaon', desc: 'Item safely packed and labeled.', completed: true },
    { status: 'Shipped', time: 'Oct 25, 09:12 AM', location: 'Logistics Center, New Delhi', desc: 'In transit to your city.', completed: true },
    { status: 'Out for Delivery', time: 'In Progress', location: 'Hub, Kolkata', desc: 'Our courier partner is heading to your location.', completed: false },
    { status: 'Delivered', time: 'Expected by Today', location: 'Home', desc: 'Enjoy your purchase!', completed: false },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight italic">Track Order</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {id || 'OD123456789'}</p>
        </div>
      </div>

      {/* Main Status Header */}
      <div className="bg-[#1a1a3a] text-white p-6 rounded-2xl shadow-2xl mb-8 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase text-blue-300 tracking-[0.2em] mb-2">Estimated Delivery</p>
          <h2 className="text-2xl font-black italic">Today by 09:00 PM</h2>
          <div className="flex items-center gap-2 mt-4 text-xs font-bold text-orange-400">
             <Truck size={14} className="animate-bounce" /> 
             <span className="uppercase tracking-widest">Out for delivery</span>
          </div>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center relative z-10">
           <Package size={32} className="text-[#ff5221]" />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Tracking Visual Map */}
      <div className="bg-white border rounded-3xl p-6 sm:p-10 shadow-sm relative">
        <div className="absolute left-10 sm:left-14 top-14 bottom-14 w-1 bg-gray-100 rounded-full"></div>
        <div className="space-y-12">
          {trackData.map((step, idx) => (
            <div key={idx} className="flex gap-6 sm:gap-10 relative">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 flex items-center justify-center z-10 border-4 ${step.completed ? 'bg-green-600 border-green-100 text-white shadow-lg' : idx === 3 ? 'bg-[#ff5221] border-orange-100 text-white animate-pulse shadow-xl' : 'bg-white border-gray-100 text-gray-300'}`}>
                 {step.completed ? <CheckCircle2 size={18} /> : idx === 4 ? <Home size={18} /> : <Clock size={18} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <h3 className={`text-sm sm:text-lg font-black uppercase tracking-tighter ${step.completed ? 'text-gray-900' : idx === 3 ? 'text-[#ff5221]' : 'text-gray-400'}`}>
                     {step.status}
                   </h3>
                   <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{step.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                   <MapPin size={10} className="text-gray-300" />
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{step.location}</span>
                </div>
                <p className={`text-xs leading-relaxed ${step.completed ? 'text-gray-500 font-medium' : 'text-gray-300 italic'}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courier Info */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-blue-200">
               <ShieldCheck size={24} className="text-[#2874f0]" />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Partner</p>
               <h4 className="text-sm font-black text-gray-800">ShopSwift Express</h4>
            </div>
         </div>
         <button className="bg-white p-3 rounded-full text-[#2874f0] shadow-sm hover:shadow-md transition-all">
            <Phone size={20} />
         </button>
      </div>

      {/* Need Help */}
      <div className="mt-12 text-center">
         <p className="text-xs text-gray-400 font-medium mb-4">Facing issues with your delivery?</p>
         <Link to="/help" className="text-[#ff5221] font-black text-xs uppercase tracking-widest border-2 border-[#ff5221] px-8 py-3 rounded-xl hover:bg-orange-50 transition-all">Contact Support</Link>
      </div>
    </div>
  );
};

export default OrderTracking;