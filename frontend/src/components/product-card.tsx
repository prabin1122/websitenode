import Link from 'next/link';
import { useCart } from '../context/cart';
import { Product } from '../data/products';
import { showToast } from './toast';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      slug: product.slug,
    });

    showToast(`⚡ Added "${product.name}" to your Karki Store cart!`, 'success');
  };

  const discountPercent = Math.min(35, 15 + (product.name.length % 20));
  const originalPrice = (parseFloat(product.price) * (1 + discountPercent / 100)).toFixed(2);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/80 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden font-sans backdrop-blur-sm"
    >
      {/* Top Animated Badge */}
      <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
        {product.imageUrl || product.image ? (
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📦</span>
        )}

        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md z-10">
          -{discountPercent}% OFF
        </span>

        {/* Category Tag */}
        <span className="absolute top-3 right-3 bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-cyan-500/30 backdrop-blur-md z-10">
          {product.category || 'Tech'}
        </span>

        {/* HOVER OVERLAY: Hover show detailed information with glass effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 backdrop-blur-sm z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
              {product.description || 'Authentic tech product verified by Karki Store. Features enterprise-grade durability and manufacturer warranty.'}
            </p>

            <div className="flex items-center justify-between text-[11px] font-semibold pt-1 border-t border-slate-800">
              <span className="text-emerald-400 flex items-center gap-1">
                ● Stock: {product.stock || 20} In Kathmandu
              </span>
              <span className="text-amber-400 font-bold">
                ⭐ {product.rating || '4.9'} ({product.reviewsCount || 42})
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-2 text-white font-black text-xs hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg flex items-center justify-center gap-1 uppercase tracking-wider"
              >
                ⚡ Quick Add
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-slate-200 text-xs font-bold transition flex items-center justify-center"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            Official Warranty • Express Shipping
          </p>
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-cyan-400">${product.price}</span>
              <span className="text-xs text-slate-500 line-through">${originalPrice}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-xl bg-indigo-950 border border-indigo-700/60 hover:bg-indigo-900 text-cyan-300 px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400"
          >
            <span>+ Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
