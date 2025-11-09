import { Metadata } from 'next';
import Link from 'next/link';
import { PhoneIcon, ClockIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Get Emergency Help Now | Brisbane Water & Fire Damage | 24/7 Response',
  description: 'Need immediate disaster recovery help in Brisbane? IICRC Master Restorer Phill McGurk provides 24/7 emergency water damage, fire damage, and flood restoration. Call 1300 309 361.',
  keywords: 'emergency help brisbane, water damage emergency brisbane, fire damage emergency, flood help brisbane, disaster recovery help, 24/7 restoration brisbane, emergency restoration help, iicrc master restorer help',
  openGraph: {
    title: 'Get Emergency Help Now | Brisbane Disaster Recovery 24/7',
    description: 'IICRC Master Restorer providing immediate emergency help for water, fire & flood damage. 60-minute response across Brisbane, Ipswich & Logan.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/get-help'
  }
};

export default function GetHelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-red-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="font-bold text-lg">EMERGENCY ASSISTANCE AVAILABLE 24/7</span>
            <a href="tel:1300309361" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50 transition-all">
              CALL 1300 309 361
            </a>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Get Emergency Help
              <span className="block text-red-400 mt-2">Right Now</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-red-100">
              24/7 Water • Fire • Flood • Storm Damage Response
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-12 py-6 rounded-lg font-bold text-2xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105"
              >
                <PhoneIcon className="w-8 h-8" />
                1300 309 361
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            What To Do Right Now
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-blue-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-5xl">💧</div>
                <h3 className="text-2xl font-bold text-gray-900">Water Damage Emergency</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Stop the water source</strong> if safe to do so</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Turn off electricity</strong> in affected areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Move valuables</strong> to dry areas if safe</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t">
                <a
                  href="tel:1300309361"
                  className="block w-full bg-blue-700 text-white px-6 py-4 rounded-lg font-bold text-center hover:bg-blue-800 transition-all"
                >
                  Call Water Damage Team Now
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-red-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-5xl">🔥</div>
                <h3 className="text-2xl font-bold text-gray-900">Fire Damage Emergency</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Wait for fire service clearance</strong> before re-entering</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Do not disturb soot or debris</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Document all damage</strong> with photos</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t">
                <a
                  href="tel:1300309361"
                  className="block w-full bg-red-700 text-white px-6 py-4 rounded-lg font-bold text-center hover:bg-red-800 transition-all"
                >
                  Call Fire Damage Team Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Help Right Now?
          </h2>
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-12 py-6 rounded-lg font-bold text-2xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105"
          >
            <PhoneIcon className="w-8 h-8" />
            Call 1300 309 361 Now
          </a>
        </div>
      </section>
    </div>
  );
}
