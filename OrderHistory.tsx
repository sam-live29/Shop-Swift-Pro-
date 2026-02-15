
import React, { useState, useMemo } from 'react';
import { Order, CartItem } from '../types';
import { PRODUCTS } from '../constants';
import { 
  ChevronRight, Search, Filter, Info, Package, ChevronDown, 
  ChevronUp, PackageX, Truck, CheckCircle2, MapPin, Heart, 
  ShoppingBag, Sparkles, X, Edit3, Trash2, AlertTriangle, 
  MapIcon, Clock, Loader2, ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface OrderHistoryProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  wishlist?: string[];
  onAddToCart?: (item: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onUpdateOrderStatus, wishlist = [], onAddToCart }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isModifying, setIsModifying] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [modifyData, setModifyData] = useState({ address: '', quantity: 1, itemId: '' });
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const cancelReasons = [
    'Price decreased for this item',
    'Purchased by mistake',
    'Expected delivery time is too long',
    'Item not required anymore',
    'Found a better alternative',
    'Other'
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = 
        selectedStatus.length === 0 || selectedStatus.includes(order.status);
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600';
      case 'Shipped': return 'text-blue-600';
      case 'Processing': return 'text-orange-600';
      case 'Cancelled': return 'text-red-500';
      default: return 'text-gray-600';
    }
  };

  const handleCancelOrder = (id: string) => {
    if (!cancelReason) {
      alert('Please select a reason for cancellation');
      return;
    }
    setActionLoading(true);
    setTimeout(() => {
      onUpdateOrderStatus(id, 'Cancelled');
      setIsCancelling(null);
      setCancelReason('');
      setActionLoading(false);
    }, 1000);
  };

  const handleModifyOrder = (id: string) => {
    setActionLoading(true);
    setTimeout(() => {
      // Logic for generic modification feedback
      setIsModifying(null);
      setActionLoading(false);
      alert('Modifications saved successfully');
    }, 1000);
  };

  const openModify = (order: Order, item: CartItem) => {
    setModifyData({ address: 'Default Address', quantity: item.quantity, itemId: item.id });
    setIsModifying(order.id);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 pb-24 sm:pb-10">
      {/* Desktop Sidebar Filter */}
      <aside className="hidden md:block w-72 shrink-0 h-max sticky top-20">
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
            <h2 className="font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
              <Filter size={18} className="text-[#ff5221]" /> Filter Orders
            </h2>
            {(searchTerm || selectedStatus.length > 0) && (
              <button 
                onClick={clearFilters}
                className="text-[10px] font-bold text-[#ff5221] uppercase tracking-widest"
              >
                Clear
              </button>
            )}
          </div>
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-[0.2em]">Order Status</h3>
              <div className="space-y-2">
                {statuses.map(status => (
                  <label key={status} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedStatus.includes(status)}
                      onChange={() => toggleStatus(status)}
                      className="w-4 h-4 rounded text-[#ff5221] focus:ring-0" 
                    />
                    <span className={`transition-colors ${selectedStatus.includes(status) ? 'text-[#ff5221] font-bold' : 'group-hover:text-[#ff5221]'}`}>
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        {/* Search and Status Chips Bar */}
        <div className="bg-white border rounded-xl shadow-sm p-4 mb-6 space-y-4">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search by order ID or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 text-black border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-100 transition-all outline-none font-medium"
            />
            <Search className="absolute left-3 text-gray-400" size={18} />
            {searchTerm && (
               <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
               >
                 <X size={14} className="text-gray-400" />
               </button>
            )}
          </div>

          {/* Quick Filter Chips (Highly Visible on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2 pr-4 border-r mr-2 shrink-0">
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Filter:</span>
            </div>
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                  selectedStatus.includes(status)
                    ? 'bg-[#ff5221] border-[#ff5221] text-white shadow-md'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
            {(searchTerm || selectedStatus.length > 0) && (
              <button 
                onClick={clearFilters}
                className="text-[10px] font-bold text-[#2874f0] uppercase tracking-widest ml-auto shrink-0"
              >
                Reset All
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Found {filteredOrders.length} orders
            </span>
          </div>
          
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white border rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div 
                  className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors ${expandedOrder === order.id ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex gap-5">
                    <div className="bg-white border rounded-lg p-3 shrink-0 shadow-sm relative overflow-hidden">
                       <Package className="text-[#ff5221]" size={32} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 truncate">ID: {order.id}</p>
                      <p className="text-sm font-bold text-gray-800">{order.items.length} Product(s) • ₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex flex-col items-start sm:items-end">
                      <span className={`text-xs font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>{order.status}</span>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Date: {order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {order.status === 'Processing' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setIsCancelling(order.id); }}
                          className="px-3 py-1.5 border border-red-100 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest bg-red-50/30 hover:bg-red-50 transition-all flex items-center gap-1.5"
                        >
                           Cancel
                        </button>
                      )}
                      {expandedOrder === order.id ? <ChevronUp size={20} className="text-[#ff5221]" /> : <ChevronDown size={20} className="text-gray-300" />}
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t p-6 bg-gray-50/30 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                       <div>
                         <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Details & Actions</h4>
                       </div>
                       <div className="flex gap-2">
                         {order.status === 'Processing' && (
                           <button 
                             onClick={() => setIsCancelling(order.id)} 
                             className="px-4 py-2 border border-red-100 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white hover:bg-red-50 transition-all flex items-center gap-2"
                           >
                             <Trash2 size={14} /> Cancel Order
                           </button>
                         )}
                         <button onClick={() => navigate(`/tracking/${order.id}`)} className="bg-[#2874f0] text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-2">
                           <Truck size={14} /> Full Tracking
                         </button>
                       </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border group hover:border-[#ff5221] transition-all">
                          <img src={item.image} className="w-16 h-16 object-contain" alt="" />
                          <div className="flex-1 text-center sm:text-left">
                            <p className="text-sm font-bold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Quantity: <span className="font-bold text-gray-900">{item.quantity}</span> • Total: <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span></p>
                          </div>
                          <div className="flex gap-2">
                            {order.status === 'Processing' && (
                              <button 
                                onClick={() => openModify(order, item)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-50 hover:text-[#ff5221] transition-all"
                              >
                                <Edit3 size={14} /> Modify
                              </button>
                            )}
                            {onAddToCart && (
                              <button 
                                onClick={(e) => onAddToCart(item, false, e)}
                                className="bg-orange-50 text-[#ff5221] p-2 rounded-lg hover:bg-[#ff5221] hover:text-white transition-all active:scale-90"
                                title="Buy Again"
                              >
                                <ShoppingBag size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white border rounded-2xl shadow-sm py-20 text-center px-6">
              <PackageX size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-tight">No orders match filters</h3>
              <p className="text-xs text-gray-400 font-medium mb-6">Try adjusting your search or filter criteria.</p>
              <button onClick={clearFilters} className="bg-[#ff5221] text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">Reset Filters</button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: CANCEL ORDER */}
      {isCancelling && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCancelling(null)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight italic">Cancel Order?</h2>
            </div>
            
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
              Are you sure you want to cancel this order? This action cannot be undone. 
            </p>

            <div className="mb-8">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Select reason for cancellation</label>
               <div className="grid gap-2 max-h-48 overflow-y-auto no-scrollbar pr-1">
                  {cancelReasons.map(reason => (
                    <button
                      key={reason}
                      onClick={() => setCancelReason(reason)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${cancelReason === reason ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
                    >
                      {reason}
                    </button>
                  ))}
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => { setIsCancelling(null); setCancelReason(''); }} 
                className="flex-1 py-4 border rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50"
              >
                Go Back
              </button>
              <button 
                onClick={() => handleCancelOrder(isCancelling)} 
                disabled={actionLoading || !cancelReason}
                className="flex-1 py-4 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <X size={16} />} 
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MODIFY ORDER */}
      {isModifying && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModifying(null)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 text-[#ff5221] mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                <Edit3 size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight italic">Modify Order</h2>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Change Item Quantity</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setModifyData(prev => ({...prev, quantity: Math.max(1, prev.quantity - 1)}))} className="w-10 h-10 border rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-50">-</button>
                  <span className="text-lg font-black">{modifyData.quantity}</span>
                  <button onClick={() => setModifyData(prev => ({...prev, quantity: prev.quantity + 1}))} className="w-10 h-10 border rounded-lg flex items-center justify-center text-lg font-bold hover:bg-gray-50">+</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Shipping Note / Instruction</label>
                <textarea 
                  placeholder="e.g. Leave at front door" 
                  className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-[#ff5221] text-sm font-medium resize-none"
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                 <Clock size={18} className="text-blue-500" />
                 <p className="text-[10px] font-bold text-blue-700 uppercase tracking-tight leading-relaxed">Changes can only be made while the order is in "Processing" status.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModifying(null)} 
                className="flex-1 py-4 border rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleModifyOrder(isModifying)} 
                disabled={actionLoading}
                className="flex-1 py-4 bg-[#ff5221] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} 
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
