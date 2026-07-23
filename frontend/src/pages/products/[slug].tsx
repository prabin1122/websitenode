import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
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

const ProductPage: NextPage<ProductPageProps> = ({ product: initialProduct }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<ProductDetails | null>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState<ProductDetails[]>(INITIAL_400_PRODUCTS);

  useEffect(() => {
    const slug = router.query.slug as string;

    // Load custom products from localStorage
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

    // Look up product by slug or id
    if (slug) {
      const found = loadedProducts.find(
        (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase()
      );
      if (found) {
        setProduct(found);
      } else {
        const fallbackFound = INITIAL_400_PRODUCTS.find(
          (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase()
        );
        if (fallbackFound) setProduct(fallbackFound);
      }
    }
  }, [router.query.slug]);

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-[#f57224] font-bold text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-slate-500 mb-6 text-sm">The product you are looking for does not exist or has been removed.</p>
          <Link href="/shop" className="rounded-xl bg-[#f57224] px-6 py-3 font-bold text-white text-xs hover:bg-orange-600 transition shadow-md">
            Browse All 400 Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const stockCount = product.stock !== undefined ? product.stock : 15;
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
    showToast(`Added ${quantity} × "${product.name}" to cart!`, 'success');
  };

  const specsList = product.specs || [
    '100% Authentic Product Guarantee',
    'Full 1-Year Manufacturer Warranty',
    'High-durability premium materials',
    'Universal device compatibility',
    'Free express shipping available',
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Head>
        <title>{product.name} | Daraz ShopHub</title>
        <meta name="description" content={product.description} />
      </Head>

      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-slate-900">Shop</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          {/* Product Media Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center text-7xl relative overflow-hidden border border-slate-100 shadow-inner">
              {product.imageUrl || product.image ? (
                <img
                  src={product.imageUrl || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                '📦'
              )}
              {isOutOfStock ? (
                <span className="absolute top-4 right-4 rounded-full bg-red-600 text-white text-xs font-black px-3 py-1 uppercase">
                  Out of Stock
                </span>
              ) : stockCount <= 5 ? (
                <span className="absolute top-4 right-4 rounded-full bg-amber-500 text-white text-xs font-black px-3 py-1 uppercase">
                  Only {stockCount} left
                </span>
              ) : (
                <span className="absolute top-4 right-4 rounded-full bg-emerald-600 text-white text-xs font-black px-3 py-1 uppercase">
                  In Stock
                </span>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-orange-100 text-[#f57224] px-3 py-1 text-xs font-black uppercase">
                  {product.category || 'DarazMall'}
                </span>
                <span className="text-xs text-yellow-500 font-bold">
                  ★ {product.rating || '4.8'} ({product.reviewsCount || 42} Reviews)
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#f57224]">${product.price}</span>
                <span className="text-xs text-slate-400 font-semibold">Inclusive of all taxes</span>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700 uppercase">Quantity:</span>
                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                    className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200 transition text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-slate-900 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stockCount, q + 1))}
                    disabled={isOutOfStock}
                    className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200 transition text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 rounded-xl bg-[#f57224] py-4 text-white font-black text-sm hover:bg-orange-600 transition shadow-lg disabled:opacity-50"
                >
                  {isOutOfStock ? 'OUT OF STOCK' : '+ ADD TO CART'}
                </button>
                <Link
                  href="/checkout"
                  onClick={handleAddToCart}
                  className="rounded-xl border-2 border-slate-900 bg-slate-900 px-6 py-4 font-bold text-white text-sm hover:bg-slate-800 transition text-center"
                >
                  BUY NOW
                </Link>
              </div>
            </div>

            {/* Product Key Specs */}
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Specifications & Highlights</h3>
              <ul className="space-y-2">
                {specsList.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Overview */}
        <section className="mt-12 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-black text-slate-900 mb-3">Product Overview & Features</h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            {product.longDescription || `${product.name} is engineered to deliver peak performance and maximum reliability. Experience enterprise-grade quality with Daraz ShopHub buyer protection and fast nationwide delivery.`}
          </p>
        </section>

        {/* Related Products */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">You Might Also Like</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {allProducts
              .filter((p) => p.slug !== product.slug)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`} legacyBehavior>
                  <a className="group block rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition border border-slate-200">
                    <div className="aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center text-4xl group-hover:scale-105 transition overflow-hidden">
                      {relatedProduct.imageUrl || relatedProduct.image ? (
                        <img src={relatedProduct.imageUrl || relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover" />
                      ) : (
                        '📦'
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs group-hover:text-[#f57224] truncate">{relatedProduct.name}</h3>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{relatedProduct.description}</p>
                    <p className="text-base font-black text-[#f57224] mt-2">${relatedProduct.price}</p>
                  </a>
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
  return {
    paths: INITIAL_400_PRODUCTS.map((product) => ({ params: { slug: product.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async (context) => {
  const slug = context.params?.slug as string;
  const product = INITIAL_400_PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  return {
    props: {
      product: product || null,
    },
    revalidate: 60,
  };
};

export default ProductPage;
