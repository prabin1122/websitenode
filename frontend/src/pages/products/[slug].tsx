import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import ParticleCanvas from '../../components/particle-canvas';
import LivePurchaseTicker from '../../components/live-purchase-ticker';
import { useCart } from '../../context/cart';
import { showToast } from '../../components/toast';
import { INITIAL_400_PRODUCTS, Product } from '../../data/products';

interface ProductDetails {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  category?: string;
  longDescription?: string;
  specs?: string[];
  imageUrl?: string;
  image?: string;
  stock?: number;
  rating?: number;
  reviewsCount?: number;
}

interface ProductPageProps {
  product: ProductDetails | null;
}

const NEPAL_DISTRICTS = [
  { name: 'Kathmandu Valley', time: 'Dispatches in 2 Hours (Same Day Delivery)', cost: 'Free' },
  { name: 'Pokhara & Kaski', time: '1 - 2 Days Express Shipping', cost: '$2.50' },
  { name: 'Lalitpur & Bhaktapur', time: 'Same Day Delivery', cost: 'Free' },
  { name: 'Chitwan & Bharatpur', time: '2 Days Express Courier', cost: '$3.00' },
  { name: 'Biratnagar & Sunsari', time: '2 - 3 Days Postal Express', cost: '$3.50' },
  { name: 'Butwal & Rupandehi', time: '2 Days Express Delivery', cost: '$3.00' },
  { name: 'Other 71 Nepal Districts', time: '2 - 4 Days Postal Express', cost: '$4.00' },
];

const ProductPage: NextPage<ProductPageProps> = ({ product: initialProduct }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<ProductDetails | null>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState(NEPAL_DISTRICTS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews' | 'faq'>('overview');
  const [allProducts, setAllProducts] = useState<ProductDetails[]>(INITIAL_400_PRODUCTS);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const slug = router.query.slug as string;
    const saved = localStorage.getItem('custom_products');
    let loadedProducts: ProductDetails[] = INITIAL_400_PRODUCTS;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedProducts = parsed;
        }
      } catch (e) {}
    }
    setAllProducts(loadedProducts);

    if (slug) {
      const found = loadedProducts.find(
        (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase()
      );
      if (found) {
        setProduct(found);
        setSelectedImage(found.imageUrl || found.image || '');
      } else {
        const fallbackFound = INITIAL_400_PRODUCTS.find(
          (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase()
        );
        if (fallbackFound) {
          setProduct(fallbackFound);
          setSelectedImage(fallbackFound.imageUrl || fallbackFound.image || '');
        }
      }
    }
  }, [router.query.slug]);

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-cyan-400 font-bold text-sm">Loading Karki Store Product Specifications...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4 space-y-4">
          <div className="text-6xl">📦</div>
          <h1 className="text-3xl font-black text-white">Item Not Found in Catalog</h1>
          <p className="text-slate-400 text-xs max-w-sm">The product you are looking for is currently being updated or has moved.</p>
          <Link href="/shop" className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 font-black text-white text-xs hover:scale-105 transition shadow-2xl">
            Browse All 400 Products Marketplace →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const stockCount = product.stock !== undefined ? product.stock : 18;
  const isOutOfStock = stockCount <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      slug: product.slug,
    });
    showToast(`⚡ Added ${quantity} × "${product.name}" to your Karki Store cart!`, 'success');
  };

  const handleInstantBuy = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const specsList = product.specs || [
    '100% Genuine Karki Care Certified Authentic Item',
    'Official 1-Year Manufacturer Replacement Guarantee',
    'High-Durability Aerospace Matte Finish Housing',
    'Universal Plug & Play Compatibility across devices',
    'Free Kathmandu Valley Express Shipping Included',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>{product.name} | Karki Store Tech Marketplace</title>
        <meta name="description" content={product.description} />
      </Head>

      <ParticleCanvas />
      <LivePurchaseTicker />
      <Navigation />

      <main className="flex-1 relative z-10 mx-auto max-w-7xl px-4 py-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800 w-fit backdrop-blur-md">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-cyan-400 transition">Shop Catalog</Link>
          <span>/</span>
          <span className="text-cyan-400 font-extrabold truncate max-w-xs">{product.name}</span>
        </div>

        {/* MAIN PRODUCT HERO CONTAINER */}
        <div className="grid gap-10 lg:grid-cols-12 bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-indigo-950 shadow-2xl backdrop-blur-md">
          
          {/* LEFT 5-COL: PRODUCT MEDIA GALLERY */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-square bg-slate-950 rounded-3xl flex items-center justify-center text-7xl relative overflow-hidden border border-slate-800 shadow-2xl group">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                '📦'
              )}
              {isOutOfStock ? (
                <span className="absolute top-4 right-4 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-black px-3.5 py-1 uppercase backdrop-blur-md">
                  Out of Stock
                </span>
              ) : (
                <span className="absolute top-4 right-4 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3.5 py-1 uppercase flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  In Stock ({stockCount} Left)
                </span>
              )}
            </div>

            {/* Karki Genuine Guarantee Seal */}
            <div className="rounded-2xl bg-slate-950 p-4 border border-indigo-950 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl border border-cyan-500/30">
                🛡️
              </div>
              <div>
                <p className="text-xs font-black text-white">Karki Care Verified Authentic</p>
                <p className="text-[11px] text-slate-400">100% Original Serial Code • 1-Yr Replacement Guarantee</p>
              </div>
            </div>
          </div>

          {/* RIGHT 7-COL: PRODUCT DETAILS & PURCHASING CONTROLS */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-950 text-cyan-300 text-xs font-black px-3 py-1 rounded-full border border-indigo-800 uppercase tracking-wider">
                  {product.category || 'Audio & Sound'}
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                  ⭐ {product.rating || '4.9'} / 5 ({product.reviewsCount || 64} Verified Reviews)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Pricing Box */}
              <div className="flex items-baseline gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 w-fit">
                <span className="text-4xl font-black text-cyan-400">${product.price}</span>
                <span className="text-xs text-slate-400 line-through">${(parseFloat(product.price) * 1.25).toFixed(2)}</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">Save 20%</span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* NEPAL 77-DISTRICT DELIVERY ESTIMATOR */}
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span>🚚 Express Delivery Estimator:</span>
                </span>
                <span className="text-cyan-400 font-mono font-bold">{selectedDistrict.cost} Shipping</span>
              </div>
              <select
                value={selectedDistrict.name}
                onChange={(e) => {
                  const found = NEPAL_DISTRICTS.find((d) => d.name === e.target.value);
                  if (found) setSelectedDistrict(found);
                }}
                className="w-full rounded-xl bg-slate-900 text-slate-200 border border-slate-800 px-3 py-2 text-xs font-bold focus:border-cyan-400 outline-none"
              >
                {NEPAL_DISTRICTS.map((d, idx) => (
                  <option key={idx} value={d.name}>🇳🇵 {d.name} ({d.cost})</option>
                ))}
              </select>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span>✓ {selectedDistrict.time}</span>
              </p>
            </div>

            {/* QUANTITY & CTA ACTIONS */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300 uppercase">Quantity:</span>
                <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                    className="px-3.5 py-2 font-bold text-slate-300 hover:bg-slate-800 transition text-sm disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-black text-cyan-400 text-sm font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stockCount, q + 1))}
                    disabled={isOutOfStock}
                    className="px-3.5 py-2 font-bold text-slate-300 hover:bg-slate-800 transition text-sm disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3.5 text-white font-black text-xs transition shadow-2xl uppercase tracking-wider border border-indigo-400/30 disabled:opacity-50"
                >
                  {isOutOfStock ? 'OUT OF STOCK' : '+ ADD TO CART'}
                </button>
                <button
                  onClick={handleInstantBuy}
                  disabled={isOutOfStock}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-105 py-3.5 text-slate-950 font-black text-xs transition shadow-2xl uppercase tracking-wider border border-cyan-400 disabled:opacity-50"
                >
                  ⚡ BUY NOW (eSewa / Khalti)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SPECIFICATIONS & REVIEWS TAB NAVIGATION */}
        <section className="rounded-3xl bg-slate-900/90 p-6 sm:p-8 border border-indigo-950 shadow-2xl space-y-6 backdrop-blur-md">
          <div className="flex gap-2 border-b border-slate-800 pb-4 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-xl transition ${activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-xl transition ${activeTab === 'specs' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-xl transition ${activeTab === 'reviews' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Verified Customer Reviews (64)
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-5 py-2.5 rounded-xl transition ${activeTab === 'faq' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Warranty & Returns FAQ
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white">Full Product Overview</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {product.longDescription || `${product.name} represents the pinnacle of modern technology engineering. Designed for power users and enthusiasts across Nepal, it combines premium materials, instant connectivity, and rigorous quality testing. Every unit dispatched from our Kathmandu central hub undergoes multi-point inspection and includes the official Karki Care 1-year replacement warranty.`}
              </p>
            </div>
          )}

          {/* TAB 2: SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white">Technical Specifications Table</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="rounded-2xl bg-slate-950 p-4 border border-slate-800 flex items-center gap-3">
                    <span className="text-cyan-400 font-bold text-lg">✓</span>
                    <span className="text-xs text-slate-200 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white">Customer Ratings & Verified Feedback</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold text-xs">🇳🇵 Aarav K. (Kathmandu)</span>
                  <p className="text-xs text-slate-300">"Super fast 2-hour delivery in Kathmandu! Genuine sealed product with official warranty sticker."</p>
                  <p className="text-[10px] text-amber-400">Rating: ⭐⭐⭐⭐⭐ 5/5</p>
                </div>
                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold text-xs">🇳🇵 Bikash T. (Pokhara)</span>
                  <p className="text-xs text-slate-300">"Arrived in Pokhara in 24 hours. Paid via eSewa seamlessly. 10/10 recommended!"</p>
                  <p className="text-[10px] text-amber-400">Rating: ⭐⭐⭐⭐⭐ 5/5</p>
                </div>
                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold text-xs">🇳🇵 Pooja S. (Lalitpur)</span>
                  <p className="text-xs text-slate-300">"High quality item. Karki Care warranty gives total peace of mind!"</p>
                  <p className="text-[10px] text-amber-400">Rating: ⭐⭐⭐⭐⭐ 5/5</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-1">
                <h4 className="font-bold text-white">Q: How does the 1-Year Karki Care warranty work?</h4>
                <p className="text-slate-400">A: Every item includes a registered serial number seal. If any defect occurs within 1 year, we replace it free of charge.</p>
              </div>
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-1">
                <h4 className="font-bold text-white">Q: Which digital wallets are accepted?</h4>
                <p className="text-slate-400">A: We accept eSewa, Khalti, IME Pay, Visa/Mastercard, and Cash on Delivery (COD) across Nepal.</p>
              </div>
            </div>
          )}
        </section>

        {/* RELATED PRODUCTS SHOWCASE */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-white">Related Products You Might Like</h2>
            <Link href="/shop" className="text-xs font-bold text-cyan-400 hover:underline">
              View All 400 Items →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {allProducts
              .filter((p) => p.slug !== product.slug)
              .slice(0, 4)
              .map((related) => (
                <Link key={related.id} href={`/products/${related.slug}`} className="group block rounded-2xl bg-slate-900/90 p-4 border border-indigo-950 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 space-y-2 backdrop-blur-md">
                  <div className="aspect-square bg-slate-950 rounded-xl flex items-center justify-center text-4xl overflow-hidden border border-slate-800">
                    {related.imageUrl || related.image ? (
                      <img src={related.imageUrl || related.image} alt={related.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    ) : (
                      '📦'
                    )}
                  </div>
                  <h3 className="font-bold text-white text-xs truncate group-hover:text-cyan-400 transition">{related.name}</h3>
                  <p className="text-base font-black text-cyan-400">${related.price}</p>
                </Link>
              ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = INITIAL_400_PRODUCTS.flatMap((product) => [
    { params: { slug: product.slug } },
    { params: { slug: product.id } },
  ]);
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async (context) => {
  const slug = context.params?.slug as string;
  const product = INITIAL_400_PRODUCTS.find((p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase());

  return {
    props: {
      product: product || null,
    },
    revalidate: 60,
  };
};

export default ProductPage;
