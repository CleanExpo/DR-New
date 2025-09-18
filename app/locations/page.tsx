import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Locations | Disaster Recovery Brisbane, Ipswich & Logan',
  description: 'Disaster Recovery service locations across Brisbane, Ipswich, Logan and Southeast Queensland. 24/7 emergency response from our Wacol headquarters.',
  keywords: ["disaster recovery locations", "Brisbane emergency services", "Ipswich restoration", "Logan water damage", "Southeast Queensland"],
};

export default function LocationsPage() {
  const primaryLocations = [
    {
      name: 'Brisbane',
      slug: 'brisbane',
      description: 'Servicing all Brisbane suburbs with rapid emergency response',
      suburbs: ['Brisbane CBD', 'Fortitude Valley', 'Milton', 'Toowong', 'Indooroopilly']
    },
    {
      name: 'Ipswich',
      slug: 'ipswich',
      description: 'Complete disaster recovery services for Ipswich and surrounding areas',
      suburbs: ['Ipswich CBD', 'Booval', 'Springfield', 'Redbank', 'Goodna']
    },
    {
      name: 'Logan',
      slug: 'logan',
      description: 'Emergency restoration services throughout Logan City',
      suburbs: ['Logan Central', 'Springwood', 'Beenleigh', 'Meadowbrook', 'Shailer Park']
    }
  ];

  const brisbaneSuburbs = [
    { name: 'Ascot', slug: 'ascot' },
    { name: 'Ashgrove', slug: 'ashgrove' },
    { name: 'Bardon', slug: 'bardon' },
    { name: 'Bowen Hills', slug: 'bowen-hills' },
    { name: 'Brisbane CBD', slug: 'brisbane-cbd' },
    { name: 'Brookfield', slug: 'brookfield' },
    { name: 'Bulimba', slug: 'bulimba' },
    { name: 'Carindale', slug: 'carindale' },
    { name: 'Chapel Hill', slug: 'chapel-hill' },
    { name: 'Chermside', slug: 'chermside' },
    { name: 'Clayfield', slug: 'clayfield' },
    { name: 'Cleveland', slug: 'cleveland' },
    { name: 'Eagle Farm', slug: 'eagle-farm' },
    { name: 'Fortitude Valley', slug: 'fortitude-valley' },
    { name: 'Graceville', slug: 'graceville' },
    { name: 'Hamilton', slug: 'hamilton' },
    { name: 'Hawthorne', slug: 'hawthorne' },
    { name: 'Indooroopilly', slug: 'indooroopilly' },
    { name: 'Inala', slug: 'inala' },
    { name: 'Kangaroo Point', slug: 'kangaroo-point' },
    { name: 'Kenmore', slug: 'kenmore' },
    { name: 'Manly', slug: 'manly' },
    { name: 'Milton', slug: 'milton' },
    { name: 'Morningside', slug: 'morningside' },
    { name: 'Mt Gravatt', slug: 'mt-gravatt' },
    { name: 'New Farm', slug: 'new-farm' },
    { name: 'Newstead', slug: 'newstead' },
    { name: 'Norman Park', slug: 'norman-park' },
    { name: 'Paddington', slug: 'paddington' },
    { name: 'Spring Hill', slug: 'spring-hill' },
    { name: 'St Lucia', slug: 'st-lucia' },
    { name: 'Teneriffe', slug: 'teneriffe' },
    { name: 'Toowong', slug: 'toowong' },
    { name: 'West End', slug: 'west-end' },
    { name: 'Wynnum', slug: 'wynnum' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Service Locations' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6">
                Service Locations
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                24/7 emergency disaster recovery services across Brisbane, Ipswich, Logan and
                Southeast Queensland. Rapid response from our Wacol headquarters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  1300 309 361
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Headquarters Info */}
        <section className="py-8 bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Headquarters</p>
                  <p className="text-gray-600">4/17 Tile St, Wacol, QLD 4076</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Response Time</p>
                  <p className="text-gray-600">1 Hour Emergency Response</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Coverage</p>
                  <p className="text-gray-600">Southeast Queensland</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Service Areas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Primary Service Areas</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {primaryLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{location.name}</h3>
                  <p className="text-gray-600 mb-4">{location.description}</p>
                  <div className="text-sm text-gray-500">
                    <p className="font-semibold mb-2">Including suburbs:</p>
                    <p>{location.suburbs.join(' • ')}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Brisbane Suburbs Grid */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">Brisbane Suburbs We Service</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {brisbaneSuburbs.map((suburb) => (
                  <Link
                    key={suburb.slug}
                    href={`/locations/${suburb.slug}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <span className="text-gray-900 font-medium">{suburb.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Areas */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Extended Service Areas</h2>
              <p className="text-gray-600 mb-6">
                We also provide emergency disaster recovery services to:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Gold Coast</h3>
                  <p className="text-gray-600 text-sm">
                    Major disasters and commercial projects
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sunshine Coast</h3>
                  <p className="text-gray-600 text-sm">
                    Large-scale restoration projects
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Toowoomba</h3>
                  <p className="text-gray-600 text-sm">
                    Insurance-approved restoration services
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Moreton Bay</h3>
                  <p className="text-gray-600 text-sm">
                    Emergency response and restoration
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Redlands</h3>
                  <p className="text-gray-600 text-sm">
                    Water, fire, and mould remediation
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Scenic Rim</h3>
                  <p className="text-gray-600 text-sm">
                    Rural and regional restoration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Emergency Restoration?</h2>
            <p className="text-xl mb-8">
              We're available 24/7 across all service locations. Call now for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Request Service
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}