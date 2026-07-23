import type { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const Shipping: NextPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Head>
        <title>Shipping Information | ShopHub</title>
        <meta name="description" content="Shipping information and policies for ShopHub" />
      </Head>

      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-5xl font-bold mb-4">Shipping Information</h1>
            <p className="text-xl text-slate-200">Learn about our shipping options and delivery times</p>
          </div>
        </section>

        {/* Shipping Info */}
        <section className="mx-auto max-w-4xl px-4 py-20">
          <div className="space-y-12">
            {/* Shipping Options */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Shipping Options</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-6 border border-slate-200">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Standard Shipping</h3>
                  <p className="text-slate-600 mb-4">5-7 business days</p>
                  <p className="text-2xl font-bold text-slate-900">FREE</p>
                  <p className="text-sm text-slate-600 mt-2">on orders over $50</p>
                </div>

                <div className="rounded-2xl bg-white p-6 border border-blue-200 border-2">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Expedited Shipping</h3>
                  <p className="text-slate-600 mb-4">2-3 business days</p>
                  <p className="text-2xl font-bold text-slate-900">$9.99</p>
                  <p className="text-sm text-slate-600 mt-2">for most items</p>
                </div>

                <div className="rounded-2xl bg-white p-6 border border-slate-200">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Overnight Shipping</h3>
                  <p className="text-slate-600 mb-4">Next business day</p>
                  <p className="text-2xl font-bold text-slate-900">$24.99</p>
                  <p className="text-sm text-slate-600 mt-2">select items only</p>
                </div>
              </div>
            </div>

            {/* Delivery Times */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Delivery Times by Region</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border border-slate-200">
                      <th className="px-4 py-3 font-semibold text-slate-900">Region</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Standard</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Expedited</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="px-4 py-3 text-slate-900">Continental US (East)</td>
                      <td className="px-4 py-3 text-slate-600">3-5 days</td>
                      <td className="px-4 py-3 text-slate-600">1-2 days</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-4 py-3 text-slate-900">Continental US (West)</td>
                      <td className="px-4 py-3 text-slate-600">5-7 days</td>
                      <td className="px-4 py-3 text-slate-600">2-3 days</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-4 py-3 text-slate-900">Alaska & Hawaii</td>
                      <td className="px-4 py-3 text-slate-600">7-10 days</td>
                      <td className="px-4 py-3 text-slate-600">4-5 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-slate-900">Canada</td>
                      <td className="px-4 py-3 text-slate-600">7-10 days</td>
                      <td className="px-4 py-3 text-slate-600">4-5 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tracking */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Order Tracking</h2>
              <div className="rounded-2xl bg-blue-50 border border-blue-200 p-8">
                <p className="text-slate-700 mb-4">
                  Once your order ships, you'll receive an email with a tracking number. You can use this number to track your package in real-time on our website.
                </p>
                <p className="text-slate-700">
                  Tracking information is typically available within 24 hours of shipment. Most carriers provide updates throughout the delivery process.
                </p>
              </div>
            </div>

            {/* Handling Times */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Processing Times</h2>
              <div className="rounded-2xl bg-slate-100 p-8">
                <p className="text-slate-900 font-semibold mb-3">Order Processing:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>Orders are processed Monday-Friday, 9AM-5PM EST</li>
                  <li>Most orders ship within 1-2 business days</li>
                  <li>Weekends and holidays may cause delays</li>
                  <li>Large or special orders may require additional processing time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
