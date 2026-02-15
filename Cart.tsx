
import React, { useState, useEffect, useMemo } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Trash2, ShieldCheck, Info, ShoppingBag, Loader2, Heart, ChevronRight, Zap, X, CheckSquare, Square } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlist?: string[];
  onToggleWishlist?: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, setCart, wishlist = [], onToggleWishlist }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist'>('cart');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const toggleSelection = (id: string) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const toggleAllSelection = (select: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected: select })));
  };

  const updateQuantity = (id: string, delta: number) => {
    setIsUpdating(id);
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
    setTimeout(() => setIsUpdating(null), 300);
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const moveToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1, selected: true } : i);
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
    if (onToggleWishlist) onToggleWishlist(product.id);
    setActiveTab('cart');
  };

  const selectedItems = useMemo(() => cart.filter(item => item.selected), [cart]);
  const allSelected = cart.length > 0 && selectedItems.length === cart.length;

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.oldPrice || item.price) * item.quantity, 0);
  const currentTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = subtotal - currentTotal;
  const delivery = (currentTotal > 500 || currentTotal === 0) ? 0 : 40;
  const finalAmount = currentTotal + delivery;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* Tab Switcher for Unified View */}
      <div className="flex mb-6 bg-white border rounded-xl overflow-hidden shadow-sm sticky top-16 z-20">
        <button 
          onClick={() => setActiveTab('cart')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'cart' ? 'bg-[#ff5221] text-white shadow-inner' : 'text-gray-500 bg-white hover:bg-gray-50'}`}
        >
          <ShoppingBag size={16} /> My Cart ({cart.length})
        </button>
        <button 
          onClick={() => setActiveTab('wishlist')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'wishlist' ? 'bg-red-500 text-white shadow-inner' : 'text-gray-500 bg-white hover:bg-gray-50'}`}
        >
          <Heart size={16} fill={activeTab === 'wishlist' ? 'currentColor' : 'none'} /> Wishlist ({wishlist.length})
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {activeTab === 'cart' ? (
            cart.length === 0 ? (
              <div className="bg-white border rounded-xl p-12 text-center shadow-sm">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Cart is Empty</h3>
                <p className="text-sm text-gray-500 mt-2 mb-8">Add something to your cart to see it here.</p>
                <Link to="/" className="inline-block bg-[#ff5221] text-white px-8 py-3 rounded-lg font-bold shadow-lg">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selection Header */}
                <div className="bg-white border rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                   <button 
                    onClick={() => toggleAllSelection(!allSelected)}
                    className="flex items-center gap-3 group"
                   >
                     <div className={`transition-colors ${allSelected ? 'text-[#ff5221]' : 'text-gray-300 group-hover:text-gray-400'}`}>
                        {allSelected ? <CheckSquare size={20} fill="currentColor" className="text-white bg-[#ff5221] rounded" /> : <Square size={20} />}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                       {allSelected ? 'Deselect All' : `Select All (${cart.length} items)`}
                     </span>
                   </button>
                   {selectedItems.length > 0 && (
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#ff5221] bg-orange-50 px-3 py-1 rounded-full animate-in fade-in zoom-in duration-300">
                        {selectedItems.length} selected for order
                     </span>
                   )}
                </div>

                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                  <div className="divide-y">
                    {cart.map(item => (
                      <div key={item.id} className={`p-4 flex gap-4 transition-all ${isUpdating === item.id ? 'opacity-50' : ''} ${!item.selected ? 'bg-gray-50/30 grayscale-[0.5]' : ''}`}>
                        {/* Item Checkbox */}
                        <div className="flex items-center">
                          <button 
                            onClick={() => toggleSelection(item.id)}
                            className={`p-1 transition-all ${item.selected ? 'text-[#ff5221]' : 'text-gray-300'}`}
                          >
                            {item.selected ? <CheckSquare size={22} fill="currentColor" className="text-white bg-[#ff5221] rounded" /> : <Square size={22} />}
                          </button>
                        </div>

                        <div className="w-20 sm:w-28 shrink-0 flex flex-col items-center gap-3">
                          <img src={item.image} className="w-full aspect-square object-contain border rounded-lg bg-white p-2" alt="" />
                          <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-200">-</button>
                            <span className="px-2 font-bold text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-200">+</button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                             <h3 className={`text-sm font-bold line-clamp-1 ${item.selected ? 'text-gray-800' : 'text-gray-400 italic'}`}>{item.name}</h3>
                             <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                          </div>
                          <div className="flex items-baseline gap-2 mb-4">
                             <span className={`text-lg font-black ${item.selected ? 'text-gray-900' : 'text-gray-400'}`}>₹{item.price.toLocaleString()}</span>
                             {item.selected && <span className="text-[10px] text-green-600 font-black uppercase tracking-widest">{item.discount}</span>}
                          </div>
                          <div className="flex items-center gap-4">
                            <button onClick={() => { if(onToggleWishlist) onToggleWishlist(item.id); removeItem(item.id); }} className="text-[10px] font-black uppercase tracking-widest text-[#2874f0] flex items-center gap-1 hover:underline">
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-white border-t sticky bottom-0 flex justify-end items-center gap-6">
                     <div className="hidden sm:block text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Total</p>
                        <p className="text-lg font-black text-gray-900">₹{finalAmount.toLocaleString()}</p>
                     </div>
                     <button 
                      onClick={() => navigate('/checkout')} 
                      disabled={selectedItems.length === 0}
                      className="bg-[#ff5221] text-white px-10 py-3 rounded-lg font-black text-xs uppercase tracking-widest shadow-xl disabled:bg-gray-300 disabled:shadow-none transition-all active:scale-95"
                     >
                       Place Order {selectedItems.length > 0 && `(${selectedItems.length})`}
                     </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            wishlistedProducts.length === 0 ? (
              <div className="bg-white border rounded-xl p-12 text-center shadow-sm">
                <Heart size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Wishlist is Empty</h3>
                <p className="text-sm text-gray-500 mt-2 mb-8">Save your favorite items here for later.</p>
                <Link to="/" className="inline-block bg-[#ff5221] text-white px-8 py-3 rounded-lg font-bold shadow-lg">Discover Products</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {wishlistedProducts.map(product => (
                  <div key={product.id} className="bg-white border rounded-xl p-3 flex flex-col gap-3 group relative">
                    <img src={product.image} className="w-full aspect-square object-contain border rounded-lg bg-gray-50 p-2" alt="" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{product.name}</h4>
                      <p className="text-sm font-black text-gray-900 mt-1">₹{product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => moveToCart(product)}
                      className="mt-auto bg-orange-50 text-[#ff5221] py-2 rounded-lg font-black text-[10px] uppercase tracking-widest border border-orange-100 hover:bg-[#ff5221] hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={12} /> Add to Cart
                    </button>
                    <button onClick={() => onToggleWishlist && onToggleWishlist(product.id)} className="absolute top-4 right-4 text-red-500 p-1 bg-white/80 rounded-full"><X size={14} /></button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Price Details Sidebar (Only for Cart) */}
        {activeTab === 'cart' && cart.length > 0 && (
          <div className="w-full lg:w-80">
            <div className="bg-white border rounded-xl shadow-sm sticky top-36 overflow-hidden">
              <div className="p-4 border-b font-black text-[10px] text-gray-400 uppercase tracking-widest flex items-center justify-between">
                <span>Selected Items Info</span>
                {selectedItems.length > 0 && <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">{selectedItems.length} Items</span>}
              </div>
              <div className="p-5 space-y-4">
                {selectedItems.length > 0 ? (
                  <>
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-green-600">
                      <span>Discount</span>
                      <span>-₹{totalSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>Shipping</span>
                      <span className={delivery === 0 ? 'text-green-600' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-baseline">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">Total Amount</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Inclusive of all taxes</span>
                      </div>
                      <span className="text-xl font-black text-gray-900">₹{finalAmount.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <Info size={24} className="mx-auto text-orange-400 mb-2" />
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">No items selected</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1">Select items to see price details</p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-green-50 border-t flex items-center gap-2">
                 <ShieldCheck size={16} className="text-green-600" />
                 <p className="text-[10px] text-green-700 font-bold uppercase tracking-tighter">Secure & Encrypted Checkout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
