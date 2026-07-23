import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { INITIAL_400_PRODUCTS, Product } from '../../data/products';
import { getSiteCMS, saveSiteCMS, SiteCMS } from '../../data/cms';

interface Order {
  id: string;
  items: any[];
  total: string;
  subtotal?: string;
  tax?: string;
  shippingCost?: string;
  couponCode?: string | null;
  customer: any;
  status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  date: string;
}

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'analytics' | 'orders' | 'products' | 'cms'>('analytics');
  const [cmsTab, setCmsTab] = useState<'general' | 'home' | 'about' | 'contact' | 'policies' | 'faq' | 'portfolio'>('general');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());
  const [productSearch, setProductSearch] = useState('');
  const [productPage, setProductPage] = useState(1);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Audio',
    stock: '20',
    imageUrl: '',
    description: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '20',
    imageUrl: '',
    description: '',
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }

    // Load orders
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {}
    }

    // Load products
    const savedProducts = localStorage.getItem('custom_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length >= 50) {
          setProducts(parsed);
        } else {
          setProducts(INITIAL_400_PRODUCTS);
          localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
        }
      } catch (e) {
        setProducts(INITIAL_400_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_400_PRODUCTS);
      localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
    }

    // Load CMS
    setCms(getSiteCMS());
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin');
  };

  const handleReset400Products = () => {
    if (confirm('Re-seed catalog with all 400 original products with images? This will overwrite your current product list.')) {
      setProducts(INITIAL_400_PRODUCTS);
      localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
      alert('✓ Successfully loaded all 400 products into Karki Store!');
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const handleClearOrders = () => {
    if (confirm('Are you sure you want to clear all order history?')) {
      localStorage.removeItem('orders');
      setOrders([]);
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return alert('No orders to export.');
    const headers = ['Order ID', 'Date', 'Customer Name', 'Customer Email', 'Status', 'Total ($)'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.date).toLocaleDateString(),
      `"${o.customer.firstName} ${o.customer.lastName}"`,
      o.customer.email,
      o.status || 'PENDING',
      o.total,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `karki_store_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteCMS(cms);
    alert('✓ All Karki Store CMS page content updated successfully!');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const product: Product = {
        id: `prod-${Date.now()}`,
        slug: slug || `product-${Date.now()}`,
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        stock: Number(newProduct.stock) || 20,
        imageUrl: newProduct.imageUrl.trim(),
        description: newProduct.description,
        rating: 4.8,
        reviewsCount: 1,
      };

      const updated = [product, ...products];
      setProducts(updated);
      localStorage.setItem('custom_products', JSON.stringify(updated));
      setNewProduct({ name: '', price: '', category: 'Audio', stock: '20', imageUrl: '', description: '' });
      alert('✓ Product added to Karki Store!');
    }
  };

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditProduct({
      name: product.name,
      price: product.price,
      category: product.category || 'Audio',
      stock: String(product.stock),
      imageUrl: product.imageUrl || product.image || '',
      description: product.description || '',
    });
  };

  const handleSaveEdit = (id: string) => {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            ...editProduct,
            stock: Number(editProduct.stock) || 0,
          }
        : p
    );
    setProducts(updated);
    localStorage.setItem('custom_products', JSON.stringify(updated));
    setEditingId(null);
    alert('✓ Product updated!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem('custom_products', JSON.stringify(updated));
    }
  };

  const filteredAdminProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );
  const adminPageSize = 15;
  const totalAdminPages = Math.ceil(filteredAdminProducts.length / adminPageSize) || 1;
  const paginatedAdminProducts = filteredAdminProducts.slice(
    (productPage - 1) * adminPageSize,
    productPage * adminPageSize
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Head>
        <title>Admin Dashboard | Karki Store Tech Marketplace</title>
      </Head>

      {/* Admin Header */}
      <nav className="border-b border-indigo-950 bg-slate-900 text-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-black">
            <img src="/karki-logo.png" alt="Karki Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-lg">KARKI<span className="text-cyan-400">STORE</span> <span className="text-xs text-indigo-300 font-normal ml-2">Master Admin</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-cyan-400">
              🌐 View Karki Store
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-4 py-1.5 text-white font-semibold text-xs hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Karki Store Control Center</h1>
            <p className="text-xs text-slate-400 mt-1">Manage 400+ catalog products, orders, portfolio & page content from backend</p>
          </div>

          <button
            onClick={handleReset400Products}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2.5 text-white font-bold text-xs hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg flex items-center gap-2"
          >
            🔄 Reset / Seed 400 Products
          </button>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-2xl bg-slate-900 p-5 shadow-xl border border-indigo-950">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Sales Revenue</p>
            <p className="text-2xl font-black text-cyan-400">${totalRevenue.toFixed(2)}</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">↑ Real-time tracking</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 shadow-xl border border-indigo-950">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</p>
            <p className="text-2xl font-black text-white">{orders.length}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">{orders.filter(o => o.status === 'PENDING').length} pending fulfillment</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 shadow-xl border border-indigo-950">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Catalog</p>
            <p className="text-2xl font-black text-indigo-400">{products.length} Items</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Across 7 categories</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 shadow-xl border border-indigo-950">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Low Stock Alerts</p>
            <p className="text-2xl font-black text-amber-400">{lowStockCount}</p>
            <p className="text-[11px] text-amber-300 font-medium mt-1">Products with ≤ 5 remaining</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setTab('analytics')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition flex-shrink-0 ${
              tab === 'analytics' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setTab('products')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition flex-shrink-0 ${
              tab === 'products' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📦 400 Products Catalog ({products.length})
          </button>
          <button
            onClick={() => setTab('orders')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition flex-shrink-0 ${
              tab === 'orders' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📋 Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setTab('cms')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition flex-shrink-0 ${
              tab === 'cms' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            🎨 Master CMS & Portfolio Editor
          </button>
        </div>

        {/* Overview Tab */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-indigo-950">
              <h2 className="text-xl font-bold text-white mb-4">Karki Store Performance Overview</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase">Average Order Value</p>
                  <p className="text-2xl font-black text-cyan-400 mt-1">${avgOrderValue.toFixed(2)}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase">Pending Orders</p>
                  <p className="text-2xl font-black text-amber-400 mt-1">
                    {orders.filter((o) => !o.status || o.status === 'PENDING').length} Orders
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase">Completed Deliveries</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    {orders.filter((o) => o.status === 'DELIVERED').length} Orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Management Tab */}
        {tab === 'products' && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Add Product Form */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-indigo-950 sticky top-24">
                <h2 className="text-lg font-bold text-white mb-4">Add Product to Karki Store</h2>
                <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Product Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Sony WH-1000XM5 Headphones"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Price ($)</label>
                      <input
                        type="text"
                        placeholder="129.99"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Stock Qty</label>
                      <input
                        type="number"
                        placeholder="20"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2 text-xs"
                    >
                      <option value="Audio">Audio</option>
                      <option value="Cameras">Cameras</option>
                      <option value="Keyboards">Keyboards</option>
                      <option value="Hubs & Power">Hubs & Power</option>
                      <option value="Monitors & Stands">Monitors & Stands</option>
                      <option value="Smartwatches & Wearables">Smartwatches & Wearables</option>
                      <option value="Accessories & Gadgets">Accessories & Gadgets</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Description</label>
                    <textarea
                      placeholder="Product details..."
                      rows={2}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-indigo-600 py-3 text-white font-bold hover:bg-indigo-500 transition shadow-md"
                  >
                    + Add to Karki Store
                  </button>
                </form>
              </div>
            </div>

            {/* Products List (400 Products Search & Pagination) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-indigo-950 flex items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="🔍 Search across catalog..."
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setProductPage(1);
                  }}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-4 py-2 text-xs"
                />
                <span className="text-xs font-bold text-cyan-400 flex-shrink-0">
                  {filteredAdminProducts.length} Items
                </span>
              </div>

              {paginatedAdminProducts.map((product) => {
                const isEditing = editingId === product.id;

                return (
                  <div key={product.id} className="rounded-2xl bg-slate-900 p-4 shadow-xl border border-slate-800">
                    {isEditing ? (
                      <div className="space-y-2 text-xs">
                        <input
                          type="text"
                          value={editProduct.name}
                          onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                          className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-1.5 font-bold"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={editProduct.price}
                            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                            className="rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-1.5"
                          />
                          <input
                            type="number"
                            value={editProduct.stock}
                            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                            className="rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-1.5"
                          />
                        </div>
                        <input
                          type="url"
                          value={editProduct.imageUrl}
                          onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                          className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-1.5"
                        />
                        <div className="flex gap-2 justify-end pt-1">
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-white font-bold text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg bg-slate-800 px-3 py-1 text-slate-300 text-xs font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-800">
                          {product.imageUrl || product.image ? (
                            <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            '📦'
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white text-xs truncate">{product.name}</h3>
                            <span className="rounded-full bg-indigo-950 text-cyan-300 border border-indigo-800 px-2 py-0.5 text-[9px] font-bold">
                              {product.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm font-black text-cyan-400">${product.price}</span>
                            <span className="text-[11px] text-slate-400">Stock: {product.stock}</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleStartEdit(product)}
                            className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1 text-slate-200 font-semibold text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="rounded-lg bg-red-950 hover:bg-red-900 text-red-300 px-3 py-1 font-semibold text-xs border border-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Admin Pagination */}
              {totalAdminPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button
                    onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                    disabled={productPage === 1}
                    className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-bold text-slate-300 disabled:opacity-30"
                  >
                    ←
                  </button>
                  <span className="text-xs font-bold text-slate-300">
                    Page {productPage} of {totalAdminPages}
                  </span>
                  <button
                    onClick={() => setProductPage((p) => Math.min(totalAdminPages, p + 1))}
                    disabled={productPage === totalAdminPages}
                    className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-bold text-slate-300 disabled:opacity-30"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Master Page CMS Tab (All Pages & Portfolio Editable) */}
        {tab === 'cms' && (
          <div className="max-w-4xl bg-slate-900 rounded-3xl p-6 border border-indigo-950 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Master Website & Portfolio CMS</h2>
              <p className="text-xs text-slate-400">Select any section below to edit text, personal portfolio, policies, and FAQs directly from the backend.</p>
            </div>

            {/* CMS Sub-tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              <button
                onClick={() => setCmsTab('general')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'general' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                🌐 Global & Header
              </button>
              <button
                onClick={() => setCmsTab('portfolio')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'portfolio' ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                👨‍💻 Founder Portfolio
              </button>
              <button
                onClick={() => setCmsTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'home' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                🏠 Home Page
              </button>
              <button
                onClick={() => setCmsTab('about')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'about' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                ℹ️ About Page
              </button>
              <button
                onClick={() => setCmsTab('contact')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'contact' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                📞 Contact Page
              </button>
              <button
                onClick={() => setCmsTab('policies')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'policies' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                📜 Legal Policies
              </button>
              <button
                onClick={() => setCmsTab('faq')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                  cmsTab === 'faq' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                ❓ FAQ Center
              </button>
            </div>

            <form onSubmit={handleSaveCMS} className="space-y-5 text-xs">
              {/* Founder Portfolio Sub-tab */}
              {cmsTab === 'portfolio' && (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Founder / Developer Name</label>
                      <input
                        type="text"
                        value={cms.portfolioName}
                        onChange={(e) => setCms({ ...cms, portfolioName: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Professional Role Title</label>
                      <input
                        type="text"
                        value={cms.portfolioRole}
                        onChange={(e) => setCms({ ...cms, portfolioRole: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Personal Biography</label>
                    <textarea
                      rows={3}
                      value={cms.portfolioBio}
                      onChange={(e) => setCms({ ...cms, portfolioBio: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">GitHub Profile Link</label>
                      <input
                        type="text"
                        value={cms.portfolioGithub}
                        onChange={(e) => setCms({ ...cms, portfolioGithub: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">LinkedIn Profile Link</label>
                      <input
                        type="text"
                        value={cms.portfolioLinkedin}
                        onChange={(e) => setCms({ ...cms, portfolioLinkedin: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Direct Contact Email</label>
                      <input
                        type="text"
                        value={cms.portfolioEmail}
                        onChange={(e) => setCms({ ...cms, portfolioEmail: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* General / Global Sub-tab */}
              {cmsTab === 'general' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Top Utility Announcement Text</label>
                    <input
                      type="text"
                      value={cms.announcementText}
                      onChange={(e) => setCms({ ...cms, announcementText: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Support Phone</label>
                      <input
                        type="text"
                        value={cms.supportPhone}
                        onChange={(e) => setCms({ ...cms, supportPhone: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Support Email</label>
                      <input
                        type="text"
                        value={cms.supportEmail}
                        onChange={(e) => setCms({ ...cms, supportEmail: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Working Hours</label>
                      <input
                        type="text"
                        value={cms.workingHours}
                        onChange={(e) => setCms({ ...cms, workingHours: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Kathmandu Head Office Address</label>
                    <input
                      type="text"
                      value={cms.officeAddress}
                      onChange={(e) => setCms({ ...cms, officeAddress: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                    />
                  </div>
                </div>
              )}

              {/* Home Page Sub-tab */}
              {cmsTab === 'home' && (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Hero Section Title</label>
                      <input
                        type="text"
                        value={cms.heroTitle}
                        onChange={(e) => setCms({ ...cms, heroTitle: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Hero CTA Button Text</label>
                      <input
                        type="text"
                        value={cms.heroCtaText}
                        onChange={(e) => setCms({ ...cms, heroCtaText: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={cms.heroSubtitle}
                      onChange={(e) => setCms({ ...cms, heroSubtitle: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                    />
                  </div>
                </div>
              )}

              {/* About Page Sub-tab */}
              {cmsTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Company Mission Statement</label>
                    <textarea
                      rows={4}
                      value={cms.aboutMission}
                      onChange={(e) => setCms({ ...cms, aboutMission: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                    />
                  </div>
                </div>
              )}

              {/* Contact Page Sub-tab */}
              {cmsTab === 'contact' && (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Contact Page Title</label>
                      <input
                        type="text"
                        value={cms.contactTitle}
                        onChange={(e) => setCms({ ...cms, contactTitle: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Contact Subtitle</label>
                      <input
                        type="text"
                        value={cms.contactSubtitle}
                        onChange={(e) => setCms({ ...cms, contactSubtitle: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Legal & Policies Sub-tab */}
              {cmsTab === 'policies' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <label className="font-bold text-cyan-400 block text-xs uppercase">Privacy Policy Content</label>
                    <textarea
                      rows={4}
                      value={cms.privacyContent}
                      onChange={(e) => setCms({ ...cms, privacyContent: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white px-3.5 py-2"
                    />
                  </div>
                </div>
              )}

              {/* FAQ Sub-tab */}
              {cmsTab === 'faq' && (
                <div className="space-y-4">
                  <div className="space-y-3 pt-2">
                    <p className="font-bold text-cyan-400 text-xs uppercase">Edit Questions & Answers ({cms.faqList.length})</p>
                    {cms.faqList.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = [...cms.faqList];
                            updated[idx].question = e.target.value;
                            setCms({ ...cms, faqList: updated });
                          }}
                          className="w-full rounded-lg bg-slate-900 border border-slate-700 text-white px-3 py-1.5 font-bold"
                        />
                        <textarea
                          rows={2}
                          value={item.answer}
                          onChange={(e) => {
                            const updated = [...cms.faqList];
                            updated[idx].answer = e.target.value;
                            setCms({ ...cms, faqList: updated });
                          }}
                          className="w-full rounded-lg bg-slate-900 border border-slate-700 text-white px-3 py-1.5"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-3.5 text-white font-bold hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg text-xs uppercase tracking-wider"
              >
                💾 Save CMS & Portfolio Settings
              </button>
            </form>
          </div>
        )}

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Orders ({orders.length})</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleExportCSV}
                  className="rounded-xl bg-indigo-600 px-4 py-1.5 text-white font-bold text-xs hover:bg-indigo-500"
                >
                  📥 Export CSV
                </button>
                <button
                  onClick={handleClearOrders}
                  className="rounded-xl border border-red-800 text-red-400 px-4 py-1.5 font-bold text-xs hover:bg-red-950"
                >
                  Clear History
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800">
                <p className="text-xs text-slate-400 font-medium">No orders received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl bg-slate-900 p-4 shadow-xl border border-indigo-950 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">#{order.id}</span>
                      <select
                        value={order.status || 'PENDING'}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="rounded text-xs font-bold px-2 py-1 border bg-slate-950 border-slate-700 text-white"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                    <p className="text-xs font-bold text-white">
                      {order.customer.firstName} {order.customer.lastName} • <span className="text-cyan-400">${order.total}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
