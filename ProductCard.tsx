
import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { Star, Heart, PackageCheck, PackageX, AlertTriangle, Zap, ShoppingCart, Check, ShieldCheck, GitCompare, RotateCcw, Store, CheckSquare, Square } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SafeImage } from './Skeleton';

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string, event?: React.MouseEvent) => void;
  onAddToCart?: (item: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
  isComparing?: boolean;
  onToggleComparison?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWishlisted = false, 
  onToggleWishlist,
  onAddToCart,
  isComparing = false,
  onToggleComparison
}) => {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const isOutOfStock = product.stock <= 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product.id, e);
  };

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (onToggleComparison) onToggleComparison(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isOutOfStock) return;
    
    setIsAdded(true);
    if (onAddToCart) onAddToCart({ ...product, quantity: 1, selected: true }, false, e);
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart({ ...product, quantity: 1, selected: true }, true);
      navigate('/checkout');
    }
  };

  const getStockStatus = () => {
    if (product.stock > 10) {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-[9px] font-bold text-green-600 uppercase tracking-tighter border border-green-100">
          <PackageCheck size={10} />
          <span>In Stock</span>
        </div>
      );
    } else if (product.stock > 0) {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-[9px] font-bold text-orange-600 uppercase tracking-tighter border border-orange-100">
          <AlertTriangle size={10} />
          <span>Low Stock ({product.stock})</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-[9px] font-bold text-red-600 uppercase tracking-tighter border border-red-100">
          <PackageX size={10} />
          <span>Out of Stock</span>
        </div>
      );
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`bg-white rounded-xl overflow-hidden group flex flex-col h-full animate-fade-in border border-transparent hover:border-gray-100 hover:shadow-lg transition-all ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      <div className="aspect-[4/5] relative bg-[#f7f7f9] p-3 flex items-center justify-center overflow-hidden rounded-t-xl">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#1a1a3a] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Flash Sale</span>
        </div>
        
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button 
            onClick={handleWishlistToggle} 
            className="p-2 bg-white rounded-full shadow-sm text-gray-300 hover:text-red-500 transition-colors active:scale-90"
            title="Add to Wishlist"
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
          </button>
        </div>

        <SafeImage 
          src={product.image} 
          className="object-contain w-full h-full transform transition-transform duration-700 ease-in-out group-hover:scale-110 mix-blend-multiply" 
          alt={product.name} 
          containerClassName="w-full h-full"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-20">
             <span className="bg-red-600 text-white px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-xl transform -rotate-12">Sold Out</span>
          </div>
        )}
      </div>

      <div className="pt-4 pb-3 px-3 flex-1 flex flex-col">
        <div className="mb-auto">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={12} className={star <= Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-200"} />
            ))}
            <span className="text-[10px] text-gray-400 ml-1 font-bold">({product.reviewsCount})</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.oldPrice && <span className="text-xs text-gray-300 line-through font-medium">₹{product.oldPrice.toLocaleString()}</span>}
              </div>
              <span className="text-[10px] text-green-600 font-bold uppercase">{product.discount}</span>
            </div>
            {getStockStatus()}
          </div>
        </div>

        {/* Seller and Improved Return Policy Section */}
        <div className="mb-3 space-y-1 bg-gray-50/50 p-2 rounded-lg border border-gray-50">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Store size={10} className="shrink-0" />
            <span className="text-[8px] font-bold uppercase tracking-tight truncate">{product.sellerName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#ff5221]">
            <RotateCcw size={10} className="shrink-0" />
            <span className="text-[8px] font-black uppercase tracking-tight">{product.returnPolicy}</span>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleAddToCart} 
              disabled={isOutOfStock || isAdded} 
              className={`text-gray-700 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1 transition-all border border-gray-200 active:scale-95 ${isOutOfStock ? 'opacity-50 cursor-not-allowed bg-gray-50' : isAdded ? 'bg-green-50 text-white border-green-50 animate-success' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />} 
              {isAdded ? 'Added' : 'Cart'}
            </button>
            <button onClick={handleBuyNow} disabled={isOutOfStock} className={`text-white py-2.5 rounded-lg font-black text-[10px] uppercase tracking-[0.1em] flex items-center justify-center gap-1 transition-all shadow-md active:scale-95 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#ff5221] to-[#fb641b] hover:shadow-lg'}`}>
              <Zap size={14} fill={isOutOfStock ? "none" : "currentColor"} /> Buy Now
            </button>
          </div>
          
          <div className="pt-2.5 border-t border-gray-50 flex items-center justify-between">
            <button 
              onClick={handleComparisonToggle} 
              className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all group/comp ${isComparing ? 'bg-blue-50/50 border-[#2874f0]/20 border' : 'hover:bg-gray-50 border border-transparent'}`}
            >
              <div className={`transition-colors ${isComparing ? 'text-[#2874f0]' : 'text-gray-300'}`}>
                {isComparing ? <CheckSquare size={16} fill="currentColor" className="text-white bg-[#2874f0] rounded-[2px]" /> : <Square size={16} />}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isComparing ? 'text-[#2874f0]' : 'text-gray-400 group-hover/comp:text-gray-600'}`}>
                {isComparing ? 'In Comparison' : 'Compare'}
              </span>
            </button>
            
            {product.isAssured && (
              <div className="flex items-center gap-0.5 bg-[#2874f0] text-white px-1.5 py-0.5 rounded-[2px] shadow-sm scale-90 origin-right">
                <ShieldCheck size={8} fill="white" className="text-[#2874f0]" />
                <span className="text-[7px] font-black italic uppercase tracking-tighter">Assured</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
