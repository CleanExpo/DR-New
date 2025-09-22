import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';

// FORCE REBUILD - SIMPLIFIED VERSION ONLY
// Last updated: ${new Date().toISOString()}
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section ONLY */}
      <section className="relative min-h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/queensland-house-water-damage.jpg"
            alt="Queensland House - Disaster Recovery Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Water Damage Restoration<br />
            Brisbane | 24/7 Emergency
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            24-hour water damage, fire damage, and flood restoration. IICRC certified.<br />
            Insurance approved. We can be there within 1 hour.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              1300 309 361
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Emergency Contact
            </Link>
          </div>

          <p className="mt-6 text-sm">
            Office: 4/17 Tile St, Wacol, QLD 4076
          </p>
        </div>
      </section>

      {/* Flooding Emergency Section ONLY */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
            Flooding Emergency in Brisbane?
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Ring Disaster Recovery now: 1300 309 361. We're in Wacol. We can be there within an hour.
          </p>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">What to Do Right Now:</h3>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-red-600">1</span>
                  <div>
                    <h4 className="font-bold mb-2">Turn off electricity</h4>
                    <p className="text-sm text-gray-600">
                      Find your metre box. Switch off the main breaker straight away.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-red-600">2</span>
                  <div>
                    <h4 className="font-bold mb-2">Stop water source</h4>
                    <p className="text-sm text-gray-600">
                      Turn off your water main. It's usually near your water meter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-red-600">3</span>
                  <div>
                    <h4 className="font-bold mb-2">Move valuables</h4>
                    <p className="text-sm text-gray-600">
                      Lift furniture, electronics, and documents above water level.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-red-600 text-white rounded-lg p-6">
              <h4 className="text-xl font-bold mb-2">4. Ring Disaster Recovery now</h4>
              <p className="mb-4">Call 1300 309 361. We're in Wacol. We can be there within an hour.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-bold rounded hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Ring 1300 309 361 Now
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition-colors"
                >
                  Get Emergency Help Online
                </Link>
              </div>
            </div>

            <p className="mt-8 text-gray-700">
              <strong>We're local to Brisbane:</strong><br />
              Office: 4/17 Tile St, Wacol • 24/7 Emergency Response • IICRC Certified • Insurance Approved
            </p>
          </div>
        </div>
      </section>

      {/* NO OTHER SECTIONS - THIS IS THE COMPLETE PAGE */}
    </div>
  );
}