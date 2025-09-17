import type { Metadata } from "next";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Fire Damage Restoration Brisbane | Smoke & Soot Removal | 1300 309 361",
  description: "Professional fire damage restoration services in Brisbane, Ipswich & Logan. Expert smoke damage cleanup, soot removal, odor elimination. 24/7 emergency response.",
  keywords: "fire damage restoration brisbane, smoke damage cleanup, soot removal, fire restoration, structural repairs, odor removal, emergency fire damage, brisbane fire restoration, ipswich fire damage, logan fire damage",
  authors: [{ name: "Disaster Recovery Brisbane" }],
  creator: "Disaster Recovery Brisbane",
  publisher: "Disaster Recovery Brisbane",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://disasterrecoverybrisbane.com.au/services/fire-damage-restoration",
    siteName: "Disaster Recovery Brisbane",
    title: "Professional Fire Damage Restoration Brisbane | 24/7 Emergency Response",
    description: "Expert fire damage restoration across Brisbane, Ipswich & Logan. Smoke cleanup, soot removal, structural repairs. Call 1300 309 361 for immediate assistance.",
    images: [
      {
        url: "/og-fire-damage.jpg",
        width: 1200,
        height: 630,
        alt: "Fire Damage Restoration Brisbane - Professional Emergency Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Damage Restoration Brisbane | 24/7 Emergency Response",
    description: "Professional fire damage restoration services across Brisbane, Ipswich & Logan. Expert smoke and soot removal specialists.",
    images: ["/twitter-fire-damage.jpg"],
  },
};

export default function FireDamageRestorationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-red-900 to-orange-800 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-red-100 bg-opacity-20 rounded-full px-6 py-2 mb-6">
                  <svg className="w-5 h-5 text-red-200 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  <span className="text-red-100 font-semibold">Fire Damage Specialists</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Fire Damage Restoration Brisbane
                </h1>

                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  After a fire, immediate professional restoration is crucial. Our certified fire damage specialists provide comprehensive restoration services across Brisbane, Ipswich, and Logan to restore your property completely.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="tel:1300309361"
                    className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-2xl"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>Emergency: 1300 309 361</span>
                  </a>

                  <a
                    href="mailto:info@disasterrecovery.com.au"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-8 4.533L5 6.586V4zM3 8.414l8 4.533 8-4.533V18a1 1 0 01-1 1H4a1 1 0 01-1-1V8.414z"/>
                    </svg>
                    <span>Contact Us</span>
                  </a>
                </div>

                <div className="flex items-center text-red-200">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-lg font-semibold">24/7 Emergency Response • Immediate Smoke Damage Control</span>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6">Immediate Fire Damage Response</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-green-500 rounded-full p-1 mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span>Emergency board-up & securing</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-green-500 rounded-full p-1 mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span>Smoke & soot damage assessment</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-green-500 rounded-full p-1 mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span>Complete odor elimination</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-green-500 rounded-full p-1 mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span>Structural restoration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fire Damage Services */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Complete Fire Damage Solutions
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                From minor kitchen fires to major structural damage, we handle all aspects of fire restoration with specialized equipment and proven techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/services/fire-damage-restoration/smoke-damage" className="card hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.61 5.64 5.36 8.04A5.994 5.994 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 0-10h-.65zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6s4.63 1.69 5.29 4H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Smoke Damage Cleanup</h3>
                <p className="text-gray-700 text-center">Professional smoke damage restoration and complete cleaning of all affected surfaces.</p>
              </Link>

              <Link href="/services/fire-damage-restoration/soot-removal" className="card hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Soot Removal</h3>
                <p className="text-gray-700 text-center">Specialized soot cleaning techniques for all surfaces and HVAC systems.</p>
              </Link>

              <Link href="/services/fire-damage-restoration/odor-removal" className="card hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,18.5C15.5,18.5 19,16.68 19,14.5V12.5C19,10.32 15.5,8.5 12,8.5C8.5,8.5 5,10.32 5,12.5V14.5C5,16.68 8.5,18.5 12,18.5M12,7C16.42,7 20,8.79 20,11V13C20,15.21 16.42,17 12,17C7.58,17 4,15.21 4,13V11C4,8.79 7.58,7 12,7M12,10C9.24,10 7,10.9 7,12S9.24,14 12,14 17,13.1 17,12 14.76,10 12,10Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Odor Elimination</h3>
                <p className="text-gray-700 text-center">Advanced ozone and thermal fogging treatments for complete odor removal.</p>
              </Link>

              <Link href="/services/fire-damage-restoration/structural-repairs" className="card hover:shadow-xl transition-shadow duration-300 group">
                <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Structural Repairs</h3>
                <p className="text-gray-700 text-center">Complete reconstruction and restoration of fire-damaged structures.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Fire Damage Restoration Process
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                IICRC-certified technicians follow proven protocols to ensure complete fire damage restoration and safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Response</h3>
                <p className="text-gray-700">Immediate site security, board-up services, and comprehensive damage assessment.</p>
              </div>

              <div className="text-center">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smoke & Soot Removal</h3>
                <p className="text-gray-700">Professional cleaning of all smoke and soot damage using specialized techniques and equipment.</p>
              </div>

              <div className="text-center">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Odor Treatment</h3>
                <p className="text-gray-700">Advanced deodorization using ozone, thermal fogging, and hydroxyl generators.</p>
              </div>

              <div className="text-center">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Reconstruction</h3>
                <p className="text-gray-700">Complete structural repairs and restoration to pre-loss condition.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our Fire Restoration Team
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                With specialized training and advanced equipment, we provide comprehensive fire damage restoration services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">IICRC Certified Technicians</h3>
                <p className="text-gray-700">Our team holds advanced certifications in fire and smoke restoration, ensuring professional standards and best practices.</p>
              </div>

              <div className="card text-center">
                <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Equipment</h3>
                <p className="text-gray-700">State-of-the-art cleaning equipment, air scrubbers, ozone generators, and thermal fogging systems.</p>
              </div>

              <div className="card text-center">
                <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.5-5A7.5 7.5 0 0 1 19 12H5a7.5 7.5 0 0 1 12.5-5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Insurance Specialists</h3>
                <p className="text-gray-700">We work directly with insurance companies and provide detailed documentation for faster claim processing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Fire Damage Restoration Service Areas
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Professional fire damage restoration services across South East Queensland.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/locations/brisbane" className="card hover:shadow-xl transition-shadow duration-300 text-center group">
                <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Brisbane Fire Damage</h3>
                <p className="text-gray-700 mb-4">Complete fire damage restoration across all Brisbane suburbs and commercial districts.</p>
                <div className="text-red-600 font-semibold group-hover:text-red-700">View Brisbane Services →</div>
              </Link>

              <Link href="/locations/ipswich" className="card hover:shadow-xl transition-shadow duration-300 text-center group">
                <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ipswich Fire Damage</h3>
                <p className="text-gray-700 mb-4">Expert fire restoration services throughout Ipswich and surrounding communities.</p>
                <div className="text-red-600 font-semibold group-hover:text-red-700">View Ipswich Services →</div>
              </Link>

              <Link href="/locations/logan" className="card hover:shadow-xl transition-shadow duration-300 text-center group">
                <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Logan Fire Damage</h3>
                <p className="text-gray-700 mb-4">Professional fire restoration services across Logan City and surrounding areas.</p>
                <div className="text-red-600 font-semibold group-hover:text-red-700">View Logan Services →</div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-gradient-to-br from-emergency-900 to-emergency-800 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Fire Damage Emergency? We Respond Immediately
            </h2>
            <p className="text-xl text-emergency-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              After a fire, quick action is essential to prevent further damage. Our certified fire restoration specialists are ready 24/7 with the equipment and expertise needed for complete restoration.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:1300309361"
                className="bg-white text-emergency-600 hover:bg-gray-100 font-bold py-6 px-10 rounded-xl transition-all duration-200 flex items-center space-x-3 text-lg shadow-2xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm opacity-70">Emergency Hotline</div>
                  <div className="text-xl font-bold">1300 309 361</div>
                </div>
              </a>

              <div className="flex flex-col items-center">
                <div className="text-emergency-200 font-semibold mb-2">Or Email Us</div>
                <a
                  href="mailto:info@disasterrecovery.com.au"
                  className="text-white hover:text-emergency-200 transition-colors font-semibold"
                >
                  info@disasterrecovery.com.au
                </a>
              </div>

              <Link
                href="/pricing"
                className="bg-transparent text-white hover:bg-white hover:text-emergency-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200 border-2 border-white"
              >
                View Transparent Pricing
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-emergency-700 text-emergency-200">
              <p className="text-lg">
                <strong>IICRC Certified</strong> • <strong>Insurance Direct Billing</strong> • <strong>Emergency Board-Up Services</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}