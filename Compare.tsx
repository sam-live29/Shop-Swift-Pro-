
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { Star, X, ShoppingCart, ArrowLeft, GitCompare, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CompareProps {
  comparisonList: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (item: CartItem, silent?: boolean, event?: React.MouseEvent) => void;
}

const Compare: React.FC<CompareProps> = ({ comparisonList, onRemove, onAddToCart }) => {
  const navigate = useNavigate();
  // Changed default to true as per user request to "show difference" immediately
  const [highlightDiff, setHighlightDiff] = useState(true);

  if (comparisonList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-32 px-4 text-center bg-white min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
           <GitCompare size={48} className="text-gray-200" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tight">Comparison list is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm">Add at least two products to start comparing their features and prices.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#ff5221] text-white px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all active:scale-95"
        >
          Discover Products
        </button>
      </div>
    );
  }

  // Derive flat specs
  const productsWithFlatSpecs = comparisonList.map(p => {
    const flatSpecs: Record<string, string> = {};
    p.specGroups.forEach(group => {
      Object.keys(group.specs).forEach(key => {
        flatSpecs[key] = group.specs[key];
      });
    });
    return { ...p, flatSpecs };
  });

  const allSpecKeys: string[] = Array.from(new Set(
    productsWithFlatSpecs.flatMap(p => Object.keys(p.flatSpecs) as string[])
  ));

  const isDifferent = (key: string) => {
    const values = productsWithFlatSpecs.map(p => p.flatSpecs[key] || '');
    return new Set(values).size > 1;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50/30 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-white border rounded-full text-gray-400 hover:text-[#ff5221] transition-all shadow-sm active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Comparison Result</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{comparisonList.length} items being compared</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border shadow-sm self-stretch sm:self-auto">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Show Differences Only</span>
           <button 
             onClick={() => setHighlightDiff(!highlightDiff)}
             className={`relative w-12 h-6 rounded-full transition-all duration-300 ${highlightDiff ? 'bg-[#ff5221]' : 'bg-gray-200'}`}
           >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md ${highlightDiff ? 'left-7' : 'left-1'}`} />
           </button>
        </div>
      </div>

      <div className="bg-white border rounded-3xl shadow-xl overflow-hidden relative">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border-collapse table-fixed min-w-[800px]">
            <thead className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md shadow-sm">
              <tr className="border-b">
                <th className="p-6 text-left w-64 border-r align-top">
                   <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 mb-2">
                      <GitCompare size={24} className="text-[#ff5221] mb-2" />
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-tight">
                        {highlightDiff ? 'Showing Differences' : 'All Specifications'}
                      </p>
                   </div>
                </th>
                {productsWithFlatSpecs.map(product => (
                  <th key={product.id} className="p-6 border-r last:border-r-0 relative group align-top">
                    <button 
                      onClick={() => onRemove(product.id)}
                      className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <X size={18} />
                    </button>
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 mb-4 flex items-center justify-center p-2 bg-gray-50 rounded-xl group-hover:scale-105 transition-transform">
                        <img src={product.image} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                      </div>
                      <Link to={`/product/${product.id}`} className="text-xs font-black text-gray-800 hover:text-[#ff5221] text-center mb-3 line-clamp-2 uppercase tracking-tight leading-tight px-2">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="bg-green-600 text-white text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-0.5">
                          {product.rating.toFixed(1)} <Star size={10} fill="currentColor" />
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">({product.reviewsCount})</span>
                      </div>
                      <p className="text-lg font-black text-gray-900 mb-4">₹{product.price.toLocaleString()}</p>
                      <button 
                        onClick={(e) => onAddToCart({ ...product, quantity: 1, selected: true }, false, e)}
                        className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
                      >
                        <ShoppingCart size={14} /> Add To Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="bg-gray-50/50">
                <td colSpan={productsWithFlatSpecs.length + 1} className="p-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">
                  Key Specifications
                </td>
              </tr>
              {allSpecKeys.map(key => {
                const diff = isDifferent(key);
                if (highlightDiff && !diff) return null;
                
                return (
                  <tr key={key} className={`group hover:bg-orange-50/30 transition-colors ${diff ? 'bg-orange-50/10' : ''}`}>
                    <td className="p-6 border-r align-top">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${diff ? 'text-[#ff5221]' : 'text-gray-400'}`}>{key}</span>
                      {diff && <div className="mt-1 flex items-center gap-1 text-[8px] font-bold text-orange-400 uppercase tracking-tighter"><Info size={10} /> Differs</div>}
                    </td>
                    {productsWithFlatSpecs.map(product => (
                      <td key={product.id} className={`p-6 border-r last:border-r-0 align-top ${diff ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                        <span className="text-xs">{product.flatSpecs[key] || <span className="text-gray-300">—</span>}</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
              
              <tr className="bg-gray-50/50">
                <td colSpan={productsWithFlatSpecs.length + 1} className="p-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">
                  Trust & Support
                </td>
              </tr>
              <tr className="group hover:bg-orange-50/30 transition-colors">
                 <td className="p-6 border-r align-top">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assurance</span>
                 </td>
                 {productsWithFlatSpecs.map(p => (
                    <td key={p.id} className="p-6 border-r last:border-r-0 align-top">
                       {p.isAssured ? (
                          <div className="flex items-center gap-1.5 text-blue-600 font-black text-[10px] uppercase italic">
                             <CheckCircle2 size={14} /> ShopSwift Assured
                          </div>
                       ) : <span className="text-gray-300">N/A</span>}
                    </td>
                 ))}
              </tr>
              <tr className="group hover:bg-orange-50/30 transition-colors">
                 <td className="p-6 border-r align-top">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Seller</span>
                 </td>
                 {productsWithFlatSpecs.map(p => (
                    <td key={p.id} className="p-6 border-r last:border-r-0 align-top">
                       <span className="text-[11px] font-bold text-gray-700">{p.sellerName}</span>
                       <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Rating: {p.sellerRating.toFixed(1)} ★</p>
                    </td>
                 ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 mb-12 flex flex-col items-center">
         <button 
           onClick={() => navigate('/')}
           className="group flex items-center gap-3 bg-white border-2 border-dashed border-gray-200 px-10 py-5 rounded-3xl text-gray-400 hover:border-[#ff5221] hover:text-[#ff5221] transition-all shadow-sm"
         >
           <span className="text-sm font-black uppercase tracking-widest">+ Add more items to compare</span>
           <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

      <section className="max-w-4xl mx-auto bg-[#1a1a3a] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic mb-4">Confused about your choice?</h3>
            <p className="text-blue-100 text-sm opacity-80 mb-8 max-w-lg leading-relaxed font-medium">Our expert shopping solutions help you find exactly what fits your lifestyle. Browse our handpicked guides and comparisons.</p>
            <Link to="/solutions" className="bg-white text-[#1a1a3a] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-50 transition-all flex items-center gap-3 w-max">
               Explore Solutions <ChevronRight size={16} />
            </Link>
         </div>
         <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-20 hidden lg:block">
            <GitCompare size={180} />
         </div>
      </section>
    </div>
  );
};

export default Compare;
