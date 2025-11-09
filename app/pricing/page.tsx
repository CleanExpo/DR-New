import { Metadata } from 'next';
import Link from 'next/link';
import { PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Emergency Restoration Pricing Brisbane | Transparent Costs | Insurance Billing',
  description: 'Transparent emergency restoration pricing in Brisbane. Direct insurance billing available. IICRC Master Restorer Phill McGurk. No hidden fees. Call 1300 309 361 for quote.',
  keywords: 'water damage restoration cost brisbane, fire damage restoration pricing, flood restoration cost, emergency restoration pricing brisbane',
  openGraph: {
    title: 'Emergency Restoration Pricing Brisbane | Transparent Costs',
    description: 'Transparent emergency restoration pricing. Direct insurance billing. IICRC Master Restorer serving Brisbane, Ipswich & Logan.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/pricing'
  }
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Emergency Restoration Pricing
            </h1>
            <p className="text-xl mb-8 text-red-100">
              No Hidden Fees - Direct Insurance Billing - Transparent Quotes
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-10 py-5 rounded-lg font-bold text-xl hover:bg-red-50 transition-all shadow-2xl"
            >
              <PhoneIcon className="w-6 h-6" />
              Call for Free Quote: 1300 309 361
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Service Pricing Guide
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-blue-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Water Damage</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">From $800</div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Emergency water extraction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Structural drying setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Moisture monitoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-red-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fire Damage</h3>
              <div className="text-4xl font-bold text-red-600 mb-4">From $1,500</div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Soot removal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Odor elimination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Air purification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-green-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mould Remediation</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">From $600</div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Mould inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Containment setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Safe removal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your Free Quote Now
          </h2>
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-12 py-6 rounded-lg font-bold text-2xl hover:bg-red-50 transition-all shadow-2xl"
          >
            <PhoneIcon className="w-8 h-8" />
            1300 309 361
          </a>
        </div>
      </section>
    </div>
  );
}
