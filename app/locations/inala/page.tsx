import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Phone, Clock, MapPin, CheckCircle, AlertTriangle, Home, Users, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Recovery Inala | Emergency Water Fire Damage Services | 1300 309 361',
  description: '24/7 emergency disaster recovery in Inala. Water damage, fire restoration, mould removal. Servicing Inala, Richlands, Forest Lake. Fast response guaranteed.',
  keywords: 'disaster recovery Inala, water damage Inala, fire damage Inala, flood restoration Inala, emergency services Inala',
  openGraph: {
    title: 'Disaster Recovery Inala - 24/7 Emergency Response',
    description: 'Professional disaster restoration services in Inala and surrounding suburbs. Water damage, fire restoration, mould remediation.',
    url: 'https://disasterrecovery.com.au/locations/inala',
  }
};

export default function InalaPage() {
  const nearbySuburbs = [
    { name: 'Richlands', distance: 'Nearby' },
    { name: 'Forest Lake', distance: 'Local area' },
    { name: 'Darra', distance: 'Service area' },
    { name: 'Wacol', distance: 'HQ location' },
    { name: 'Durack', distance: 'Nearby' },
    { name: 'Doolandella', distance: 'Local area' },
    { name: 'Oxley', distance: 'Service area' },
    { name: 'Carole Park', distance: 'Service area' }
  ];

  const commonIssues = [
    {
      issue: 'Flash Flooding',
      description: 'Low-lying areas prone to rapid water accumulation during storms',
      response: 'Emergency water extraction and structural drying'
    },
    {
      issue: 'Storm Damage',
      description: 'High density housing vulnerable to severe weather events',
      response: 'Tarping, emergency repairs, and water damage mitigation'
    },
    {
      issue: 'Sewage Backups',
      description: 'Older infrastructure in established areas',
      response: 'Biohazard cleanup and complete sanitisation'
    },
    {
      issue: 'Unit Water Damage',
      description: 'Multi-level water damage in apartment complexes',
      response: 'Rapid response to prevent damage to multiple units'
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            {/* Emergency Alert */}
            <div className="bg-red-600/90 backdrop-blur p-3 rounded-lg inline-flex items-center gap-3 mb-8">
              <AlertTriangle className="w-5 h-5 text-yellow-300" />
              <span className="font-bold">Inala Emergency?</span>
              <a href="tel:1300309361" className="underline font-bold">Call 1300 309 361 Now</a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Inala<br/>
                  <span className="text-blue-400">Disaster Recovery Services</span>
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  Trusted emergency restoration services for Inala residents and businesses.
                  Rapid response for water damage, fire restoration, and flood recovery.
                  Our Wacol headquarters is nearby.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency: 1300 309 361
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
                  >
                    Get Free Quote
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white/10 backdrop-blur p-3 rounded">
                    <div className="text-2xl font-bold text-yellow-400">Quick</div>
                    <div className="text-sm">Response</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur p-3 rounded">
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-sm">Available</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur p-3 rounded">
                    <div className="text-2xl font-bold text-yellow-400">Local</div>
                    <div className="text-sm">Wacol Based</div>
                  </div>
                </div>
              </div>

              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/disaster-recovery-services.jpg"
                  alt="Disaster recovery team servicing Inala properties"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Servicing all of Inala & surrounds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Service Area */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              Servicing Inala & Surrounding Areas
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Based at our Wacol headquarters, we provide rapid emergency
              response throughout the Inala region.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {nearbySuburbs.map((suburb) => (
                <Card key={suburb.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{suburb.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">{suburb.distance}</span>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <Truck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Wacol Headquarters Advantage</h3>
                  <p className="text-gray-700">
                    Our main office and equipment depot at 4/17 Tile St, Wacol provides
                    quick response, fully stocked equipment trucks,
                    and immediate deployment of multiple crews when needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues in Inala */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Disaster Recovery Needs in Inala
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonIssues.map((item, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      {item.issue}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="pt-4 border-t">
                      <p className="font-semibold text-green-700 mb-1">Our Response:</p>
                      <p className="text-gray-700">{item.response}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Inala Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Water Damage Restoration',
                  icon: '💧',
                  features: ['Emergency extraction', 'Structural drying', 'Mould prevention', 'Insurance assistance'],
                  link: '/services/water-damage-restoration'
                },
                {
                  title: 'Fire & Smoke Damage',
                  icon: '🔥',
                  features: ['Smoke removal', 'Odour elimination', 'Contents restoration', 'Structural repairs'],
                  link: '/services/fire-damage-restoration'
                },
                {
                  title: 'Storm & Flood Response',
                  icon: '⛈️',
                  features: ['Emergency tarping', 'Water extraction', 'Debris removal', 'Complete restoration'],
                  link: '/services/storm-damage'
                }
              ].map((service) => (
                <Card key={service.title} className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.link}
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                    >
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Properties We Service in Inala
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Residential Homes</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>Single family homes</li>
                  <li>Townhouses</li>
                  <li>Duplexes</li>
                  <li>Investment properties</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">High Density Housing</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>Unit complexes</li>
                  <li>Apartment buildings</li>
                  <li>Social housing</li>
                  <li>Body corporate properties</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Commercial Properties</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>Local businesses</li>
                  <li>Shopping centres</li>
                  <li>Community facilities</li>
                  <li>Schools & childcare</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Inala Residents Choose Disaster Recovery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Local Knowledge</h3>
                  <p className="text-blue-100">
                    We understand Inala's unique challenges - from flash flooding in low-lying
                    areas to the specific needs of high-density housing complexes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Rapid Response</h3>
                  <p className="text-blue-100">
                    With our Wacol headquarters nearby, we guarantee quick
                    emergency response for all Inala properties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Insurance Approved</h3>
                  <p className="text-blue-100">
                    We work with all major insurers and handle the claims process,
                    making recovery easier during stressful times.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Community Focused</h3>
                  <p className="text-blue-100">
                    We're committed to helping the Inala community recover quickly
                    from disasters, with fair pricing and quality service for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Inala Emergency? We're Here 24/7
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Don't wait - water damage spreads quickly. Our Wacol team provides
              rapid response to your Inala property.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call 1300 309 361 Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-900 transition-all border-2 border-white/30"
              >
                Request Service Online
              </Link>
            </div>

            <div className="mt-8 text-sm text-red-200">
              Servicing Inala, Richlands, Forest Lake & surrounding suburbs
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}