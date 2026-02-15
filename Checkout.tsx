
import React, { useState, useEffect, useMemo } from 'react';
import { CartItem, User, Order } from '../types';
import { 
  CheckCircle, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Smartphone, 
  Wallet, 
  Landmark, 
  Loader2, 
  Sparkles, 
  Lock, 
  Plus, 
  MapPin, 
  Banknote,
  Building,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  user: User | null;
  onOrderSuccess: (order: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart, user, onOrderSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(user ? 2 : 1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  
  const selectedItems = useMemo(() => cart.filter(item => item.selected), [cart]);
  const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Default guest identity as requested: Sam, Kolkata, 8967301777
  const savedAddresses = [
    { id: 1, label: 'Home', name: user?.name || 'Sam', street: user?.address || 'Park Street, Kolkata', city: 'Kolkata', pincode: '700016', phone: user ? '+91 9876543210' : '+91 8967301777' },
    { id: 2, label: 'Work', name: user?.name || 'Sam', street: 'Salt Lake Sector V', city: 'Kolkata', pincode: '700091', phone: user ? '+91 8877665544' : '+91 8967301777' }
  ];

  useEffect(() => {
    if (user && step === 1) setStep(2);
  }, [user]);

  useEffect(() => {
    if (selectedItems.length === 0 && !isOrdered) {
      const timer = setTimeout(() => navigate('/cart'), 100);
      return () => clearTimeout(timer);
    }
  }, [selectedItems.length, isOrdered, navigate]);

  const handlePlaceOrder = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const newOrder: Order = {
        id: 'OD' + Math.floor(Math.random() * 1000000000),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...selectedItems],
        total: total,
        status: 'Processing'
      };

      setIsOrdered(true);
      onOrderSuccess(newOrder);
      clearCart(); // This now clears only the selected items thanks to update in App.tsx
      // Pass payment mode to OrderSuccess page for customized animation text
      navigate(`/order-success?mode=${paymentMethod}`);
    }, 1500);
  };

  if (isOrdered) {
    return (
      <div className="fixed inset-0 bg-white z-[3000] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#ff5221] mb-4" size={48} />
        <p className="font-bold tracking-tight text-gray-400 text-xs italic">
          {paymentMethod === 'cod' ? 'Confirming your order...' : 'Verifying transaction...'}
        </p>
      </div>
    );
  }

  if (selectedItems.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[70vh] bg-gray-50/50">
      <div className="flex items-center gap-2 mb-8 text-emerald-600">
        <Lock size={18} />
        <span className="text-[10px] font-bold tracking-widest italic">100% Secure checkout gateway</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {/* STEP 1: AUTHENTICATION */}
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all">
            <div className={`p-5 flex items-center justify-between ${step > 1 ? 'bg-gray-50' : 'bg-emerald-600 text-white'}`}>
              <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step > 1 ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-white text-emerald-600'}`}>1</span>
                <span className="font-bold tracking-wide text-sm">Authentication</span>
                {step > 1 && <CheckCircle size={18} className="text-emerald-600 ml-2" />}
              </div>
              {step > 1 && <p className="text-[10px] font-medium text-gray-400 lowercase">{user?.email || 'sam@example.com'}</p>}
            </div>
            {step === 1 && (
              <div className="p-8 animate-in slide-in-from-top-2">
                <p className="text-sm mb-8 text-gray-500 font-medium">Please login to access your saved addresses and ShopSwift Prime benefits.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setStep(2)} className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-xs shadow-xl hover:bg-emerald-700 active:scale-95 transition-all">Continue as Guest</button>
                  <button onClick={() => navigate('/login')} className="border-2 border-emerald-600 text-emerald-600 px-10 py-4 rounded-xl font-bold text-xs hover:bg-emerald-50 active:scale-95 transition-all">Sign In / Register</button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: DELIVERY ADDRESS */}
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all">
            <div className={`p-5 flex items-center justify-between ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
               <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step === 2 ? 'bg-white text-emerald-600' : step > 2 ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-gray-200 text-gray-500'}`}>2</span>
                <span className="font-bold tracking-wide text-sm">Delivery Destination</span>
                {step > 2 && <CheckCircle size={18} className="text-emerald-600 ml-2" />}
              </div>
              {step > 2 && (
                <button onClick={() => setStep(2)} className="text-emerald-600 border-2 border-emerald-100 px-6 py-2 rounded-xl bg-white font-bold text-[10px] hover:bg-emerald-50 transition-all">Change Address</button>
              )}
            </div>
            {step === 2 && (
              <div className="p-6 space-y-6 animate-in slide-in-from-top-2">
                {!isAddingAddress ? (
                  <>
                    <div className="grid gap-4">
                      {savedAddresses.map((addr, idx) => (
                        <div 
                          key={addr.id} 
                          onClick={() => setSelectedAddressIdx(idx)}
                          className={`p-6 border-2 rounded-2xl cursor-pointer transition-all relative ${selectedAddressIdx === idx ? 'border-emerald-600 bg-emerald-50/30 ring-4 ring-emerald-50' : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                        >
                          <div className="flex items-start gap-4">
                            <input type="radio" checked={selectedAddressIdx === idx} readOnly className="mt-1 w-5 h-5 text-emerald-600 accent-emerald-600" />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-gray-900">{addr.name}</span>
                                <span className="bg-gray-900 text-white text-[8px] font-bold px-2 py-0.5 rounded tracking-widest">{addr.label}</span>
                                <span className="font-bold text-gray-400 text-xs ml-auto">{addr.phone}</span>
                              </div>
                              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                {addr.street}, {addr.city} - <span className="font-bold text-gray-700">{addr.pincode}</span>
                              </p>
                              {selectedAddressIdx === idx && (
                                <button onClick={() => setStep(3)} className="mt-6 bg-emerald-600 text-white px-10 py-3.5 rounded-xl font-bold text-xs shadow-xl hover:bg-emerald-700 active:scale-95 transition-all">Deliver to this location</button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setIsAddingAddress(true)}
                      className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-3 text-gray-400 font-bold text-xs hover:border-emerald-600 hover:text-emerald-600 transition-all group"
                    >
                      <Plus size={18} className="group-hover:scale-125 transition-transform" /> Add new delivery point
                    </button>
                  </>
                ) : (
                  <div className="space-y-6 animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-4 mb-4">
                       <button onClick={() => setIsAddingAddress(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><ArrowLeft size={16}/></button>
                       <h3 className="font-bold text-gray-800 tracking-tight italic">New address details</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-emerald-600 font-bold text-sm" />
                      <input type="text" placeholder="Phone Number" className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-emerald-600 font-bold text-sm" />
                      <input type="text" placeholder="Pincode" className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-emerald-600 font-bold text-sm" />
                      <input type="text" placeholder="City" className="p-4 bg-gray-50 border rounded-xl outline-none focus:border-emerald-600 font-bold text-sm" />
                    </div>
                    <textarea placeholder="House No, Street, Landmark" rows={3} className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-emerald-600 font-bold text-sm resize-none" />
                    <button onClick={() => setIsAddingAddress(false)} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-xs shadow-xl">Save & deliver here</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: ORDER SUMMARY */}
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all">
            <div className={`p-5 flex items-center justify-between ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
               <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step === 3 ? 'bg-white text-emerald-600' : step > 3 ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-gray-200 text-gray-500'}`}>3</span>
                <span className="font-bold tracking-wide text-sm">Order Verification</span>
                {step > 3 && <CheckCircle size={18} className="text-emerald-600 ml-2" />}
              </div>
            </div>
            {step === 3 && (
              <div className="p-6 space-y-6 animate-in slide-in-from-top-2">
                <div className="divide-y divide-gray-50">
                  {selectedItems.map(item => (
                    <div key={item.id} className="flex gap-6 py-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 shrink-0 flex items-center justify-center border border-gray-100">
                        <img src={item.image} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                         <p className="text-[10px] font-bold text-gray-400 mt-1">{item.brand}</p>
                         <div className="flex items-center gap-3 mt-3">
                           <span className="text-sm font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                           <span className="text-xs text-gray-400 font-bold">Qty: {item.quantity}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-800 tracking-widest lowercase">Digital invoice will be sent to {user?.email || 'sam@example.com'}</span>
                   </div>
                   <button onClick={() => setStep(4)} className="bg-emerald-600 text-white px-10 py-3.5 rounded-xl font-bold text-xs shadow-xl hover:bg-emerald-700 active:scale-95 transition-all">Confirm order detail</button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: PAYMENT OPTIONS */}
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all">
             <div className={`p-5 flex items-center justify-between ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
               <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step === 4 ? 'bg-white text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>4</span>
                <span className="font-bold tracking-wide text-sm">Payment Gateway</span>
              </div>
            </div>
            {step === 4 && (
              <div className="p-6 space-y-6 animate-in slide-in-from-top-2">
                
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Digital payments</h3>
                  
                  <label className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="payment" className="mt-1 w-4 h-4 text-emerald-600 accent-emerald-600" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                    <div className="flex-1">
                      <p className="font-bold flex items-center gap-2 text-gray-900 tracking-tight italic"><Smartphone size={20} className="text-emerald-600" /> Secure UPI (GPay, PhonePe)</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-1">Instant authorization for faster shipping</p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="payment" className="mt-1 w-4 h-4 text-emerald-600 accent-emerald-600" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <div className="flex-1">
                      <p className="font-bold flex items-center gap-2 text-gray-900 tracking-tight italic"><CreditCard size={20} className="text-emerald-600" /> Credit / Debit / ATM Card</p>
                      <div className="flex gap-2 mt-2">
                        <div className="bg-gray-100 px-2 py-0.5 rounded text-[8px] font-black uppercase text-gray-400">Visa</div>
                        <div className="bg-gray-100 px-2 py-0.5 rounded text-[8px] font-black uppercase text-gray-400">Mastercard</div>
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="payment" className="mt-1 w-4 h-4 text-emerald-600 accent-emerald-600" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                    <div className="flex-1">
                      <p className="font-bold flex items-center gap-2 text-gray-900 tracking-tight italic"><Landmark size={20} className="text-emerald-600" /> Net Banking</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-1">Select from all major Indian banks</p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Pay at doorstep</h3>
                  <label className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name="payment" className="mt-1 w-4 h-4 text-emerald-600 accent-emerald-600" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <div className="flex-1">
                      <p className="font-bold flex items-center gap-2 text-gray-900 tracking-tight italic"><Banknote size={20} className="text-emerald-600" /> Cash on Delivery (COD)</p>
                      <p className="text-[9px] text-orange-600 font-bold mt-1 flex items-center gap-1"><Sparkles size={10} /> Pay when you receive the product</p>
                    </div>
                  </label>
                </div>
                
                <div className="mt-8 bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Amount payable</p>
                   <p className="text-4xl font-bold text-gray-900 mb-8 italic tracking-tighter">₹{total.toLocaleString()}</p>
                   <button 
                    onClick={handlePlaceOrder} 
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-sm tracking-wide shadow-2xl hover:bg-emerald-700 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Lock size={20} />}
                     {isProcessing 
                        ? (paymentMethod === 'cod' ? 'Confirming order...' : 'Authorizing gateway...') 
                        : (paymentMethod === 'cod' ? 'Confirm order (COD)' : 'Pay & secure order')
                     }
                   </button>
                   <p className="text-[9px] text-gray-400 font-bold tracking-widest mt-6">Secure 256-bit SSL encrypted payment</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR: PRICE DETAILS */}
        <div className="w-full lg:w-96">
           <div className="bg-white border rounded-2xl shadow-sm sticky top-24 overflow-hidden">
              <div className="p-5 border-b bg-gray-50 flex items-center gap-3">
                 <div className="w-8 h-8 bg-white border rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                    <CheckCircle size={16} />
                 </div>
                 <h2 className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Transaction summary</h2>
              </div>
              <div className="p-8 space-y-5">
                 <div className="flex justify-between text-sm font-bold text-gray-600"><span>Price ({selectedItems.length} items)</span><span>₹{total.toLocaleString()}</span></div>
                 <div className="flex justify-between text-sm text-emerald-600 font-bold"><span>Delivery charges</span><span className="italic">Free</span></div>
                 <div className="flex justify-between text-sm text-emerald-600 font-bold"><span>Packaging fee</span><span className="italic">Free</span></div>
                 <div className="border-t border-gray-100 pt-6 flex justify-between font-bold text-2xl text-gray-900 italic tracking-tighter">
                   <span>Total</span>
                   <span className="text-[#ff5221]">₹{total.toLocaleString()}</span>
                 </div>
              </div>
              <div className="bg-orange-50/50 p-5 flex items-start gap-4 border-t border-orange-100">
                 <ShieldCheck size={24} className="text-[#ff5221] shrink-0" />
                 <p className="text-[9px] text-orange-900 font-bold tracking-tight leading-relaxed">
                   ShopSwift buyer protection enabled. Authentic products and easy returns guaranteed.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
