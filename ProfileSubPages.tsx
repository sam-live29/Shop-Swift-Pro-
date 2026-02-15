
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { MapPin, Plus, CreditCard, Trash2, Edit2, ShieldCheck, User as UserIcon, Camera, Save, ArrowLeft, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileSubPagesProps {
  type: 'addresses' | 'payments' | 'edit';
  user: User | null;
}

const ProfileSubPages: React.FC<ProfileSubPagesProps> = ({ type, user }) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);

  useEffect(() => {
    const loc = localStorage.getItem('shopswift_location');
    if (loc) setDetectedLocation(loc);
  }, []);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Changes saved successfully!');
    }, 1000);
  };

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Saved Addresses</h1>
          <p className="text-xs text-gray-400 font-medium">Manage your delivery locations</p>
        </div>
        <button className="flex items-center gap-2 bg-[#ff5221] text-white px-6 py-2.5 rounded shadow-lg active:scale-95 transition-all text-xs font-black uppercase tracking-widest">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="space-y-4">
        {/* Detected Location Card */}
        {detectedLocation && (
          <div className="bg-orange-50 border-2 border-dashed border-[#ff5221]/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#ff5221] shadow-sm">
                   <MapPin size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#ff5221] uppercase tracking-widest">Detected Location</p>
                   <h3 className="font-bold text-gray-800">{detectedLocation}</h3>
                </div>
             </div>
             <button className="bg-white text-gray-800 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest border shadow-sm hover:bg-gray-50 transition-all">
                Use as Default
             </button>
          </div>
        )}

        {[
          { type: 'HOME', name: user.name, addr: user.address, phone: '+91 9876543210', active: true },
          { type: 'WORK', name: user.name, addr: 'Prestige Tech Park, Outer Ring Rd, Kadubeesanahalli, Bengaluru, KA 560103', phone: '+91 9876543210', active: false }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white border rounded-xl p-6 transition-all relative overflow-hidden ${item.active ? 'border-[#ff5221] shadow-md' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
               <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${item.active ? 'bg-orange-50 text-[#ff5221]' : 'bg-gray-100 text-gray-500'}`}>
                 {item.type}
               </span>
               <div className="flex gap-4">
                 <button className="text-gray-400 hover:text-[#ff5221] transition-colors"><Edit2 size={16} /></button>
                 <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
               </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.addr}</p>
            <p className="text-sm font-black text-gray-800">{item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">My Wallet & Cards</h1>
          <p className="text-xs text-gray-400 font-medium">Securely stored payment methods</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card Visual */}
        <div className="bg-gradient-to-br from-[#1a1a3a] to-[#2874f0] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <CreditCard size={32} strokeWidth={1.5} />
              <span className="text-[10px] font-black tracking-[0.2em] italic opacity-60 uppercase">Platinum Swift</span>
           </div>
           <div>
              <p className="text-xl tracking-[0.3em] font-black mb-6">•••• •••• •••• 4242</p>
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-[8px] font-black text-blue-200 uppercase tracking-widest mb-1">Valid Thru</p>
                    <p className="text-xs font-bold uppercase">12 / 28</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[8px] font-black text-blue-200 uppercase tracking-widest mb-1">Card Holder</p>
                    <p className="text-xs font-bold uppercase truncate max-w-[120px]">{user.name}</p>
                 </div>
              </div>
           </div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* UPI Shortcut */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#2874f0] transition-colors">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <Plus className="text-[#2874f0]" />
           </div>
           <h3 className="font-bold text-gray-800">Add New Card</h3>
           <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Visa, Mastercard, RuPay</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 flex items-center gap-4">
         <ShieldCheck size={24} className="text-[#2874f0] shrink-0" />
         <div className="text-[10px] text-blue-800 font-bold uppercase leading-relaxed tracking-tight">
            ShopSwift Payments is 100% PCI-DSS compliant. Your security is our highest priority.
         </div>
      </div>
    </div>
  );

  const renderEdit = () => (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Profile Details</h1>
        <p className="text-xs text-gray-400 font-medium">Keep your account info up to date</p>
      </div>
      
      <div className="flex items-center gap-8 mb-10">
         <div className="relative group cursor-pointer">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
               <UserIcon size={40} className="text-gray-300" />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
               <Camera size={20} className="text-white" />
            </div>
         </div>
         <div>
           <button className="text-[#2874f0] font-bold text-sm hover:underline">Change Profile Picture</button>
           <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">JPG, PNG or GIF. Max 1MB.</p>
         </div>
      </div>

      <form className="space-y-6">
         <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
               <input type="text" defaultValue={user.name} className="w-full h-12 px-4 bg-gray-50 border rounded outline-none focus:border-[#2874f0] font-bold text-sm transition-colors" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
               <input type="text" defaultValue="+91 9876543210" className="w-full h-12 px-4 bg-gray-50 border rounded outline-none focus:border-[#2874f0] font-bold text-sm transition-colors" />
            </div>
         </div>
         
         <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email ID</label>
            <input type="email" defaultValue={user.email} className="w-full h-12 px-4 bg-gray-50 border rounded outline-none focus:border-[#2874f0] font-bold text-sm transition-colors" />
         </div>

         <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
            <div className="flex gap-4">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className="flex-1 flex items-center justify-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50 peer-checked:bg-blue-50 transition-colors">
                  <input type="radio" name="gender" className="accent-[#2874f0]" defaultChecked={g === 'Male'} />
                  <span className="text-xs font-bold">{g}</span>
                </label>
              ))}
            </div>
         </div>

         <div className="pt-6">
            <button 
              type="button" 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-[#fb641b] text-white h-14 rounded font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {isSaving ? 'Processing...' : <><Save size={18} /> Save Changes</>}
            </button>
         </div>
      </form>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-20">
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => navigate('/account')} className="p-2 bg-white border rounded-full text-gray-400 hover:text-[#2874f0] transition-colors">
           <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Profile / {type}</span>
      </div>

      <div className="bg-white border rounded-2xl p-6 sm:p-10 shadow-sm min-h-[600px] animate-in fade-in duration-500">
        {type === 'addresses' && renderAddresses()}
        {type === 'payments' && renderPayments()}
        {type === 'edit' && renderEdit()}
      </div>
    </div>
  );
};

export default ProfileSubPages;
