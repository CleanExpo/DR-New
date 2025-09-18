import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Commercial Restoration Brisbane | Office & Business Recovery | 24/7 Response | 1300 309 361",
  description: "Professional commercial restoration services for Brisbane businesses. Specialising in office buildings, retail spaces, warehouses, and industrial facilities. Minimise downtime with IICRC certified restoration. Insurance approved. Call 1300 309 361.",
  keywords: ["commercial restoration brisbane", "office water damage", "business fire restoration", "warehouse flood recovery", "retail store restoration", "industrial cleaning brisbane"],
  openGraph: {
    title: "Commercial Restoration Brisbane | Business Disaster Recovery",
    description: "Expert commercial restoration services. Minimise business interruption with our rapid response team. Insurance approved restoration for all commercial properties.",
    url: "https://disasterrecovery.com.au/services/commercial-restoration",
  }
};

export default function CommercialRestorationPage() {
  return (
    <>
      <SchemaMarkup type="Service" data={{ serviceName: 'Commercial Restoration' }} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Services", url: "https://disasterrecovery.com.au/services" },
            { name: "Commercial Restoration", url: "https://disasterrecovery.com.au/services/commercial-restoration" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Commercial Restoration Service">

        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Commercial Restoration Services Brisbane
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                  Minimise business interruption with Brisbane's leading commercial restoration specialists.
                  We understand that time is money - our rapid response team works around your schedule.
                </p>

                {/* Emergency CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
                  >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    24/7 Emergency: 1300 309 361
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Get Priority Response
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Priority Response
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Insurance Liaison
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    After-Hours Service
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/hero/commercial-restoration-services.jpg"
                  alt="Commercial restoration team working in Brisbane office building"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="font-bold">Trusted by 500+ Brisbane Businesses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Continuity Focus */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Minimising Business Interruption is Our Priority</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand that every hour of downtime costs your business money. Our commercial restoration
                team works efficiently to get you operational as quickly as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl font-bold mb-2">1-2 Hours</div>
                <h3 className="text-xl font-semibold mb-2">Rapid Response Time</h3>
                <p className="text-gray-600">
                  Our commercial response team arrives within 1-2 hours of your call, 24/7/365.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl font-bold mb-2">70%</div>
                <h3 className="text-xl font-semibold mb-2">Faster Recovery</h3>
                <p className="text-gray-600">
                  Our proven processes get businesses operational 70% faster than industry average.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl font-bold mb-2">24/7</div>
                <h3 className="text-xl font-semibold mb-2">Round-the-Clock Service</h3>
                <p className="text-gray-600">
                  Disasters don't wait for business hours. Neither do we. Always available when you need us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Property Types */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Commercial Properties We Restore</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Office Buildings</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• High-rise towers</li>
                  <li>• Corporate headquarters</li>
                  <li>• Business parks</li>
                  <li>• Co-working spaces</li>
                  <li>• Professional suites</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Retail Spaces</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Shopping centres</li>
                  <li>• Retail stores</li>
                  <li>• Restaurants & cafes</li>
                  <li>• Supermarkets</li>
                  <li>• Boutique shops</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Industrial Facilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Warehouses</li>
                  <li>• Manufacturing plants</li>
                  <li>• Distribution centres</li>
                  <li>• Storage facilities</li>
                  <li>• Logistics hubs</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Healthcare Facilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Medical centres</li>
                  <li>• Dental practices</li>
                  <li>• Allied health clinics</li>
                  <li>• Aged care facilities</li>
                  <li>• Veterinary clinics</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Educational Institutions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Schools & universities</li>
                  <li>• Childcare centres</li>
                  <li>• Training facilities</li>
                  <li>• Libraries</li>
                  <li>• Research centres</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Hospitality Venues</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Hotels & motels</li>
                  <li>• Clubs & pubs</li>
                  <li>• Event venues</li>
                  <li>• Conference centres</li>
                  <li>• Resorts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Restoration Services */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Commercial Restoration Services</h2>

            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Water Damage Restoration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Commercial water damage requires immediate action to prevent business interruption
                      and secondary damage. Our team specialises in large-scale water extraction and drying.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>✓ Burst pipe and plumbing failures</li>
                      <li>✓ Roof leaks and storm damage</li>
                      <li>✓ Sprinkler system activation</li>
                      <li>✓ HVAC system leaks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Our Process:</h4>
                    <ol className="space-y-2 text-gray-600">
                      <li>1. Emergency water extraction</li>
                      <li>2. Commercial-grade dehumidification</li>
                      <li>3. Document and inventory drying</li>
                      <li>4. Anti-microbial treatment</li>
                      <li>5. Restoration and repairs</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Fire & Smoke Damage Restoration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Fire damage to commercial property requires specialised restoration to eliminate
                      smoke odours and restore the building to pre-loss condition.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>✓ Soot and smoke removal</li>
                      <li>✓ Odour neutralisation</li>
                      <li>✓ Electronics restoration</li>
                      <li>✓ HVAC system cleaning</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Specialised Services:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Thermal fogging and ozone treatment</li>
                      <li>• Document restoration and recovery</li>
                      <li>• IT equipment cleaning</li>
                      <li>• Inventory restoration</li>
                      <li>• Complete reconstruction services</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Mould Remediation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Commercial mould problems can affect employee health and productivity. Our IICRC
                      certified technicians provide comprehensive mould remediation services.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>✓ Air quality testing</li>
                      <li>✓ Containment and isolation</li>
                      <li>✓ HEPA filtration</li>
                      <li>✓ Safe mould removal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">WHS Compliance:</h4>
                    <p className="text-gray-600 mb-3">
                      All work performed in accordance with Australian WHS regulations and guidelines.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Safe work method statements</li>
                      <li>• Proper PPE and containment</li>
                      <li>• Air monitoring and clearance testing</li>
                      <li>• Complete documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Continuity Planning */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Business Continuity Support</h2>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Pre-Loss Planning</h3>
                  <p className="mb-4">
                    Partner with us before disaster strikes. Our pre-loss planning service helps
                    businesses prepare for the unexpected.
                  </p>
                  <ul className="space-y-2">
                    <li>• Emergency response planning</li>
                    <li>• Priority response agreements</li>
                    <li>• Document and data protection strategies</li>
                    <li>• Key contact protocols</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">During Restoration</h3>
                  <p className="mb-4">
                    We work around your business needs to minimise disruption during the
                    restoration process.
                  </p>
                  <ul className="space-y-2">
                    <li>• After-hours work scheduling</li>
                    <li>• Phased restoration approach</li>
                    <li>• Temporary workspace solutions</li>
                    <li>• Daily progress reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance & Documentation */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Insurance Claims Support</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">We Work With All Major Insurers</h3>
                <p className="text-gray-600 mb-4">
                  Our team has established relationships with all major commercial insurance
                  companies in Australia. We understand their requirements and processes.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Direct insurance billing available</li>
                  <li>✓ Detailed scope of works</li>
                  <li>✓ Photo and video documentation</li>
                  <li>✓ Moisture mapping and readings</li>
                  <li>✓ Complete loss inventory</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Documentation & Reporting</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive documentation ensures smooth claims processing and provides
                  you with complete transparency throughout the restoration process.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Initial assessment reports</li>
                  <li>✓ Daily progress updates</li>
                  <li>✓ Moisture tracking logs</li>
                  <li>✓ Equipment placement records</li>
                  <li>✓ Completion certificates</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
              <h3 className="text-xl font-semibold mb-4 text-center">Preferred Provider Status</h3>
              <p className="text-center text-gray-600 mb-6">
                We maintain preferred provider status with major insurers, ensuring faster
                approvals and streamlined claims processing for your business.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-gray-600">
                <span>• QBE</span>
                <span>• IAG</span>
                <span>• Allianz</span>
                <span>• Suncorp</span>
                <span>• Zurich</span>
                <span>• CGU</span>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Sectors */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Industry Expertise</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Government & Education</h3>
                <p className="text-gray-600">
                  Trusted by schools, universities, and government facilities across Brisbane
                  for sensitive restoration projects.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Corporate & Finance</h3>
                <p className="text-gray-600">
                  Providing confidential restoration services for banks, law firms, and
                  corporate headquarters with sensitive data.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Retail & Hospitality</h3>
                <p className="text-gray-600">
                  Fast-track restoration for retail stores, restaurants, and hotels to
                  minimise revenue loss and customer impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Brisbane Businesses Choose Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                  <p className="text-gray-600">
                    Over 500 successful commercial restorations completed across Brisbane,
                    with a 98% customer satisfaction rate.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Industry Certifications</h3>
                  <p className="text-gray-600">
                    IICRC certified technicians, WHS compliant procedures, and $20 million
                    public liability insurance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Equipment</h3>
                  <p className="text-gray-600">
                    Commercial-grade restoration equipment including truck-mounted extraction
                    units and industrial dehumidifiers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Local Brisbane Team</h3>
                  <p className="text-gray-600">
                    Not a franchise - we're a local Brisbane company with deep knowledge
                    of local conditions and building codes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Recent Commercial Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="font-semibold">Brisbane CBD Office Tower</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    <strong>Challenge:</strong> 15th floor pipe burst affecting 5 floors
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Solution:</strong> Overnight water extraction and drying to minimise business disruption
                  </p>
                  <p className="text-gray-600">
                    <strong>Result:</strong> Business operational within 48 hours
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-600 text-white p-4">
                  <h3 className="font-semibold">Fortitude Valley Restaurant</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    <strong>Challenge:</strong> Kitchen fire with extensive smoke damage
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Solution:</strong> Complete smoke remediation and kitchen restoration
                  </p>
                  <p className="text-gray-600">
                    <strong>Result:</strong> Reopened in 10 days with no odour issues
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-purple-600 text-white p-4">
                  <h3 className="font-semibold">Logan Warehouse Facility</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    <strong>Challenge:</strong> Storm damage and flooding to 10,000m² warehouse
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Solution:</strong> Rapid deployment of industrial drying equipment
                  </p>
                  <p className="text-gray-600">
                    <strong>Result:</strong> Full operations restored in 5 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Commercial Emergency? We're Ready 24/7</h2>
            <p className="text-xl mb-8">
              Every minute counts when your business is affected by disaster.
              Our commercial response team is standing by.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361 Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-colors"
              >
                Request Priority Response
              </Link>
            </div>
            <p className="mt-6 text-red-100">
              Direct line to our commercial restoration specialists - not a call centre
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}