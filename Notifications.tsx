
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Package, Tag, Info, ChevronRight, CheckCircle2, Trash2, BellOff, ArrowRight, Sparkles, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
  id: string;
  type: 'order' | 'offer' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  image?: string;
  targetPath: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Delivered!',
    message: 'Your order OD123456789 has been delivered. We hope you love your new purchase!',
    time: '2 hours ago',
    isRead: false,
    targetPath: '/orders'
  },
  {
    id: '2',
    type: 'offer',
    title: 'Price Drop Alert!',
    message: 'An item in your wishlist is now at its lowest price ever. Grab it before it sells out!',
    time: '5 hours ago',
    isRead: false,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200',
    targetPath: '/wishlist'
  },
  {
    id: '3',
    type: 'info',
    title: 'Security Solution',
    message: 'Your account is now protected by ShopSwift 2-Step Verification. Check your security settings.',
    time: '1 day ago',
    isRead: true,
    targetPath: '/security'
  },
  {
    id: '4',
    type: 'offer',
    title: 'Flash Sale: 80% Off!',
    message: 'The Summer Carnival is live. Apply code SWIFT80 for insane discounts on electronics.',
    time: '2 days ago',
    isRead: true,
    targetPath: '/offers'
  },
  {
    id: '5',
    type: 'order',
    title: 'Package Out For Delivery',
    message: 'Great news! Your package is with our delivery partner and will reach you by 9 PM.',
    time: '3 days ago',
    isRead: true,
    targetPath: '/orders'
  }
];

const NotificationCard: React.FC<{
  item: NotificationItem;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
  onNavigate: (path: string, id: string) => void;
}> = ({ item, onRead, onDelete, onNavigate }) => {
  const [swipeX, setSwipeX] = useState(0);
  const startX = useRef(0);
  const isSwiping = useRef(false);
  const SWIPE_THRESHOLD = -80;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    // Only swipe left
    if (diff < 0) {
      setSwipeX(Math.max(diff, -120));
    } else {
      setSwipeX(0);
    }
  };

  const handleTouchEnd = () => {
    isSwiping.current = false;
    if (swipeX < SWIPE_THRESHOLD) {
      setSwipeX(-80);
    } else {
      setSwipeX(0);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="text-blue-600" size={20} />;
      case 'offer': return <Tag className="text-green-600" size={20} />;
      default: return <ShieldCheck className="text-emerald-500" size={20} />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl group mb-3">
      {/* Delete Background Action */}
      <div className="absolute inset-0 bg-red-500 flex items-center justify-end px-8">
        <button 
          onClick={() => onDelete(item.id)}
          className="flex flex-col items-center gap-1 text-white animate-in fade-in zoom-in"
        >
          <Trash2 size={24} />
          <span className="text-[8px] font-black uppercase tracking-widest">Delete</span>
        </button>
      </div>

      {/* Foreground Content */}
      <div 
        className="relative bg-white border border-gray-100 p-4 flex gap-4 transition-transform duration-300 ease-out cursor-pointer active:bg-gray-50"
        style={{ transform: `translateX(${swipeX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => onNavigate(item.targetPath, item.id)}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
          item.type === 'order' ? 'bg-blue-50' : 
          item.type === 'offer' ? 'bg-green-50' : 'bg-emerald-50'
        }`}>
          {getIcon(item.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className={`text-sm font-black truncate pr-4 uppercase tracking-tight ${!item.isRead ? 'text-gray-900' : 'text-gray-400'}`}>
              {item.title}
            </h3>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap">{item.time}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2 font-medium">
            {item.message}
          </p>
          
          {item.image && (
            <div className="w-full h-24 rounded-xl border mb-3 overflow-hidden bg-gray-50 p-1">
              <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
          )}
          
          {!item.isRead && (
            <div className="inline-flex items-center gap-1 text-[9px] font-black text-[#ff5221] uppercase tracking-[0.2em] bg-orange-50 px-2 py-0.5 rounded">
              <Sparkles size={10} fill="currentColor" /> New Alert
            </div>
          )}
        </div>

        <div className="flex items-center self-center text-gray-200 group-hover:text-[#ff5221] transition-colors">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'offers'>('all');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'orders') return n.type === 'order';
    if (activeTab === 'offers') return n.type === 'offer';
    return true;
  });

  const displayedNotifications = filteredNotifications.slice(0, visibleCount);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNavigate = (path: string, id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    navigate(path);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic flex items-center gap-3">
            <Bell className="text-[#ff5221]" /> Alerts & Updates
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Stay updated with your activity</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={markAllRead}
            className="text-[10px] font-black text-[#2874f0] uppercase tracking-widest hover:underline"
          >
            Read All
          </button>
          <button 
            onClick={clearAll}
            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filtering Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {(['all', 'orders', 'offers'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-[#ff5221] border-[#ff5221] text-white shadow-lg' 
                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
            }`}
          >
            {tab} {tab === 'all' ? `(${notifications.length})` : ''}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {displayedNotifications.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between px-2">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Swipe left to delete</span>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tap to view</span>
            </div>
            {displayedNotifications.map(notification => (
              <NotificationCard 
                key={notification.id}
                item={notification}
                onDelete={handleDelete}
                onRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? {...n, isRead: true} : n))}
                onNavigate={handleNavigate}
              />
            ))}
            
            {visibleCount < filteredNotifications.length && (
              <button 
                onClick={() => setVisibleCount(prev => prev + 5)}
                className="w-full mt-6 py-4 bg-white border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-gray-400 hover:text-[#ff5221] hover:border-[#ff5221] transition-all group"
              >
                <span className="text-xs font-black uppercase tracking-widest">View More Activity</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] py-24 text-center px-8 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <BellOff className="text-gray-200" size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic mb-3">Silent for now.</h3>
            <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto leading-relaxed mb-10">
              We'll notify you when there's an update on your orders or a personalized offer!
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-[#ff5221] text-white px-12 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              Start Shopping <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Helpful Tip */}
      {notifications.length > 0 && (
        <div className="mt-12 bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
           <div className="p-2 bg-white rounded-lg text-[#2874f0] shadow-sm"><Info size={20} /></div>
           <div>
              <h4 className="text-xs font-black text-blue-900 uppercase tracking-tight mb-1">Pro Tip</h4>
              <p className="text-[11px] text-blue-800/70 font-medium leading-relaxed">Notifications are automatically cleared after 30 days to keep your feed clean and relevant.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
