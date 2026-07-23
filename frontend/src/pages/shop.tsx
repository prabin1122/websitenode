import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ProductCard from '../components/product-card';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { INITIAL_400_PRODUCTS, Product } from '../data/products';

const ITEMS_PER_PAGE = 24;

const Shop: NextPage = () => {
  const [productList, setProductList] = useState<Product[]>(INITIAL_400_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 50) {
          setProductList(parsed);
        } else {
          setProductList(INITIAL_400_PRODUCTS);
          localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
        }
      } catch (e) {
        setProductList(INITIAL_400_PRODUCTS);
      }
    } else {
      setProductList(INITIAL_400_PRODUCTS);
      localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
    }
  }, []);

  const categories = [
    'All',
    'Audio',
    'Cameras',
    'Keyboards',
    'Hubs & Power',
    'Monitors & Stands',
    'Smartwatches & Wearables',
    'Accessories & Gadgets',
  ];

  const filteredProducts = productList
    .filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = (product.description || '').toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'All') {
        const cat = selectedCategory.toLowerCase();
        const pCat = (product.category || '').toLowerCase();
        const pText = `${product.name} ${product.description || ''}`.toLowerCase();

        if (cat.includes('audio') && !pCat.includes('audio') && !pText.includes('audio') && !pText.includes('headphone') && !pText.includes('speaker')) return false;
        if (cat.includes('camera') && !pCat.includes('camera') && !pText.includes('webcam') && !pText.includes('camera')) return false;
        if (cat.includes('keyboard') && !pCat.includes('keyboard') && !pText.includes('keyboard') && !pText.includes('mouse')) return false;
        if (cat.includes('hub') && !pCat.includes('hub') && !pText.includes('hub') && !pText.includes('charger') && !pText.includes('cable')) return false;
        if (cat.includes('monitor') && !pCat.includes('laptop') && !pText.includes('monitor') && !pText.includes('stand')) return false;
        if (cat.includes('smartwatch') && !pCat.includes('smartwatch') && !pText.includes('watch') && !pText.includes('ring')) return false;
        if (cat.includes('accessory') && !pCat.includes('accessory') && !pText.includes('light') && !pText.includes('case') && !pText.includes('cleaner')) return false;
      }

      // Price filter
      const priceNum = parseFloat(product.price) || 0;
      if (priceNum > maxPrice) return false;

      return true;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(1000);
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>Shop 400+ Products | Karki Store Tech Marketplace</title>
        <meta name="description" content="Explore Karki Store's catalog of 400 genuine tech items with express Nepal shipping." />
      </Head>

      <Navigation />

      <main className="flex-1">
        {/* Banner Header */}
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-950 py-10">
          <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-1">
                Karki Store <span className="text-cyan-400">400+ Products</span>
              </h1>
              <p className="text-slate-400 text-sm">Nepal's largest genuine tech catalog with live inventory tracking</p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <input
                type="text"
                placeholder="🔍 Search among 400+ items..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl bg-slate-900 border border-indigo-500/40 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950 space-y-6 sticky top-24">
                {/* Categories Filter */}
                <div>
                  <h3 className="font-bold text-cyan-400 mb-3 text-xs uppercase tracking-wider">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex justify-between items-center ${
                          selectedCategory === cat
                            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter Slider */}
                <div className="border-t border-slate-800 pt-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-cyan-400 text-xs uppercase">Max Price</h3>
                    <span className="text-xs font-black text-amber-400">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>$10</span>
                    <span>$1,000</span>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleResetFilters}
                  className="w-full rounded-xl border border-slate-700 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
                >
                  Reset All Filters
                </button>
              </div>
            </aside>

            {/* Products Grid & Pagination */}
            <div className="flex-1">
              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900 p-4 rounded-2xl border border-indigo-950 shadow-md">
                <p className="text-xs font-bold text-slate-300">
                  Showing <span className="text-cyan-400 font-black">{filteredProducts.length}</span> Karki Store products
                  {filteredProducts.length > 0 && ` (Page ${currentPage} of ${totalPages})`}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-bold text-white bg-slate-950 focus:outline-none"
                  >
                    <option value="newest">Featured / Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Products Display Grid */}
              {paginatedProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <div className="text-5xl">🔍</div>
                  <h3 className="text-lg font-bold text-white">No matching products found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try adjusting your search query, increasing your price range, or changing category filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-white font-bold text-xs hover:bg-indigo-500 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-30 transition"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs font-bold text-slate-300 px-3 py-2 bg-slate-900 rounded-xl border border-slate-800">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-30 transition"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
