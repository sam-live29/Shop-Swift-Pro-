
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Package, 
  Loader2, 
  Sparkles,
  Zap,
  Award,
  ShieldAlert,
  CreditCard,
  Banknote
} from 'lucide-react';

type Stage = 'processing' | 'placed' | 'success';

const OrderSuccess: React.FC = () => {
  const [stage, setStage] = useState<Stage>('processing');
  const [orderId, setOrderId] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentMode = queryParams.get('mode');
  const isCOD = paymentMode === 'cod';

  const [processingText, setProcessingText] = useState(isCOD ? 'Registering order...' : 'Initiating secure gateway...');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOrderId('OD' + Math.floor(Math.random() * 1000000000));

    // Processing Copy Sequence
    const digitalSequence = [
      'Verifying inventory...',
      'Securing payment link...',
      'Authorizing transaction...',
      'Encrypting data...'
    ];

    const codSequence = [
      'Checking availability...',
      'Validating address...',
      'Booking warehouse slot...',
      'Securing order items...'
    ];
    
    const textSequence = isCOD ? codSequence : digitalSequence;
    
    let textIdx = 0;
    const textInterval = setInterval(() => {
      textIdx = (textIdx + 1) % textSequence.length;
      setProcessingText(textSequence[textIdx]);
    }, 800);

    // Timeline for cinematic transitions
    const toPlaced = setTimeout(() => {
      setStage('placed');
      clearInterval(textInterval);
    }, 2000);

    const toSuccess = setTimeout(() => {
      setStage('success');
    }, 4500);

    return () => {
      clearTimeout(toPlaced);
      clearTimeout(toSuccess);
      clearInterval(textInterval);
    };
  }, [isCOD]);

  const getBgColor = () => {
    switch (stage) {
      case 'processing': return 'bg-white';
      case 'placed': return 'bg-[#2874f0]';
      case 'success': return 'bg-[#10b981]';
      default: return 'bg-white';
    }
  };

  return (
    <div className={`fixed inset-0 z-[2000] flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out ${getBgColor()}`}>
      
      {stage === 'success' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 rounded-full opacity-60 animate-bounce"
              style={{
                backgroundColor: ['#ffffff', '#fbbf24', '#3b82f6', '#f472b6'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-xl w-full px-6 relative z-10">
        
        {/* STAGE 1: PROCESSING (WHITE) */}
        {stage === 'processing' && (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="relative mb-12">
              <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center">
                <Loader2 size={48} className="text-[#ff5221] animate-spin" />
              </div>
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg border">
                {isCOD ? <Package size={20} className="text-[#ff5221]" /> : <ShieldAlert size={20} className="text-[#ff5221]" />}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight italic mb-4">
              {isCOD ? 'Confirming your booking' : 'Securing transaction'}
            </h2>
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               <p className="text-sm font-bold text-gray-400 tracking-widest">{processingText}</p>
            </div>
          </div>
        )}

        {/* STAGE 2: ORDER PLACED (ROYAL BLUE) */}
        {stage === 'placed' && (
          <div className="flex flex-col items-center text-center text-white animate-in zoom-in duration-700">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mb-10 border-4 border-white/30 shadow-2xl relative">
              <Package size={64} className="text-white animate-pulse" />
              <div className="absolute -top-3 -right-3 bg-yellow-400 p-2 rounded-full shadow-xl">
                 <Zap size={20} className="text-black" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight italic mb-4 leading-none">
              Order placed!
            </h1>
            <p className="text-blue-100 text-lg font-medium opacity-80 max-w-sm mb-12 leading-relaxed">
              Your items are being reserved in our central warehouse.
            </p>
            
            <div className="flex items-center gap-4 bg-white/10 px-8 py-4 rounded-2xl border border-white/20">
              {isCOD ? <Banknote size={24} className="text-blue-200" /> : <CreditCard size={24} className="text-blue-200" />}
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-widest text-blue-200">{isCOD ? 'Payment status' : 'Gateway status'}</p>
                <p className="text-sm font-bold">{isCOD ? 'Pay on delivery active' : 'Verifying payment...'}</p>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: FINAL SUCCESS (SECURE GREEN) */}
        {stage === 'success' && (
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-success-pop border border-emerald-100">
            <div className="bg-[#10b981] p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-16 -translate-x-16"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-white/20 animate-success">
                     <CheckCircle size={56} className="text-[#10b981]" strokeWidth={3} />
                  </div>
                  <h1 className="text-3xl font-bold text-white tracking-tight italic">
                    {isCOD ? 'Order confirmed!' : 'Payment successful!'}
                  </h1>
                  <p className="text-emerald-50 text-xs font-bold tracking-widest mt-2 opacity-80">
                    {isCOD ? 'Waiting for shipping' : `Transaction ID: ${Math.floor(Math.random() * 100000000)}`}
                  </p>
               </div>
            </div>

            <div className="p-10 sm:p-14">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="bg-emerald-50 border border-emerald-100 px-8 py-2 rounded-full mb-6">
                  <span className="text-[10px] font-bold text-emerald-700 tracking-widest">Order Ref: {orderId}</span>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                  Excellent! Your {isCOD ? 'order request' : 'transaction'} was verified. A digital invoice has been sent to your email.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-emerald-50 transition-colors">
                    <Truck size={24} className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] font-bold text-gray-400 tracking-widest mb-1">Shipping</p>
                    <p className="text-xs font-bold text-gray-800">Swift ship active</p>
                 </div>
                 <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-yellow-50 transition-colors">
                    <Award size={24} className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] font-bold text-gray-400 tracking-widest mb-1">Rewards</p>
                    <p className="text-xs font-bold text-gray-800">+45 SuperCoins ★</p>
                 </div>
              </div>

              <div className="space-y-4">
                <Link to="/orders" className="w-full bg-[#10b981] text-white py-5 rounded-2xl font-bold text-xs tracking-widest shadow-xl shadow-emerald-200 hover:bg-[#0da472] transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                  <ShoppingBag size={18} /> Track your order
                </Link>
                <Link to="/" className="w-full bg-white text-gray-900 border-2 border-gray-100 py-5 rounded-2xl font-bold text-xs tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                  Continue shopping <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-6 flex items-center justify-center gap-3 border-t border-emerald-50">
               <ShieldCheck size={20} className="text-emerald-600" />
               <p className="text-[9px] font-bold text-emerald-800 tracking-widest">Buyer protection solution enabled</p>
            </div>
          </div>
        )}
      </div>

      {(stage === 'placed' || stage === 'success') && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-black/5 rounded-full blur-[120px]" />
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
