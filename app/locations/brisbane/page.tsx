import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Clock, CheckCircle, Home, Building2, Factory } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disaster Recovery Brisbane | Emergency Restoration Services',
  description: 'Brisbane\'s trusted disaster recovery experts. Water damage, fire restoration, mould remediation. Servicing CBD, inner suburbs & greater Brisbane. Call 1300 309 361.',
  keywords: 'disaster recovery Brisbane, water damage Brisbane, fire damage Brisbane, mould removal Brisbane, emergency restoration Brisbane',
}

const brisbaneSuburbs = [
  'Brisbane CBD', 'South Brisbane', 'West End', 'New Farm', 'Teneriffe', 'Fortitude Valley',
  'Spring Hill', 'Kangaroo Point', 'Woolloongabba', 'St Lucia', 'Toowong', 'Indooroopilly',
  'Paddington', 'Milton', 'Auchenflower', 'Ashgrove', 'The Gap', 'Kelvin Grove',
  'Chermside', 'Aspley', 'Clayfield', 'Hamilton', 'Ascot', 'Bulimba',
  'Morningside', 'Coorparoo', 'Camp Hill', 'Carindale', 'Mount Gravatt', 'Sunnybank'
]

const services = [
  { name: 'Water Damage Restoration', href: '/services/water-damage-restoration', icon: '💧' },
  { name: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', icon: '🔥' },
  { name: 'Mould Remediation', href: '/services/mould-remediation', icon: '🏠' },
  { name: 'Storm Damage Repair', href: '/services/storm-damage', icon: '⛈️' },
  { name: 'Biohazard Cleaning', href: '/services/biohazard-cleaning', icon: '⚠️' }
]

const propertyTypes = [
  {
    type: 'Residential',
    icon: Home,
    properties: ['Luxury Homes', 'Apartments', 'Townhouses', 'Heritage Properties', 'High-Rise Units']
  },
  {
    type: 'Commercial',
    icon: Building2,
    properties: ['Office Buildings', 'Retail Stores', 'Restaurants', 'Hotels', 'Medical Facilities']
  },
  {
    type: 'Industrial',
    icon: Factory,
    properties: ['Warehouses', 'Factories', 'Distribution Centers', 'Data Centers', 'Clean Rooms']
  }
]

export default function BrisbanePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Phone className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">Brisbane Emergency Line: 1300 309 361</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
              <MapPin className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Disaster Recovery Services Brisbane
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Brisbane's premier disaster restoration company. Serving CBD, inner suburbs, and greater Brisbane
              with 24/7 emergency response for water damage, fire restoration, and mould remediation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brisbane Trusts Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Brisbane Chooses Our Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">45-Min Response</h3>
              <p className="text-gray-700 text-sm">Rapid response across Brisbane metro</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">24/7</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Always Available</h3>
              <p className="text-gray-700 text-sm">Emergency service every day</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-purple-600">15+</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Years Experience</h3>
              <p className="text-gray-700 text-sm">Serving Brisbane since 2009</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-orange-600">100%</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Insurance Approved</h3>
              <p className="text-gray-700 text-sm">Direct insurance billing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services in Brisbane */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Brisbane Restoration Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-700 text-sm">Professional {service.name.toLowerCase()} services throughout Brisbane</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Brisbane Properties We Service
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {propertyTypes.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.type} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold">{category.type}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.properties.map((property) => (
                      <li key={property} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{property}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Brisbane Suburbs We Service
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {brisbaneSuburbs.map((suburb) => (
                <div
                  key={suburb}
                  className="bg-white px-4 py-2 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {suburb}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                <span className="font-semibold">Plus all surrounding areas within 50km of Brisbane CBD</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recent Brisbane Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="font-bold text-lg mb-2">CBD Office Tower</h3>
              <p className="text-gray-700 text-sm mb-3">Water damage restoration across 5 floors after pipe burst</p>
              <p className="text-blue-600 font-semibold">Completed in 72 hours</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="font-bold text-lg mb-2">Teneriffe Luxury Home</h3>
              <p className="text-gray-700 text-sm mb-3">Complete fire damage restoration and smoke removal</p>
              <p className="text-blue-600 font-semibold">Full restoration in 2 weeks</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🏬</div>
              <h3 className="font-bold text-lg mb-2">Fortitude Valley Restaurant</h3>
              <p className="text-gray-700 text-sm mb-3">Emergency flood damage cleanup and sanitization</p>
              <p className="text-blue-600 font-semibold">Reopened in 5 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Knowledge */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Local Brisbane Expertise
            </h2>
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4 text-blue-700">Brisbane Flood Experience</h3>
                  <p className="text-gray-700 mb-4">
                    With extensive experience from the 2011 and 2022 Brisbane floods, we understand the unique
                    challenges of flood recovery in Brisbane's river suburbs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Rapid mud and debris removal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Structural drying in humid conditions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Mould prevention strategies</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4 text-blue-700">Storm Season Ready</h3>
                  <p className="text-gray-700 mb-4">
                    Brisbane's storm season brings unique challenges. We're prepared with emergency tarping,
                    roof repairs, and water extraction services.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Emergency roof tarping</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Window boarding services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Fallen tree removal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Brisbane's Trusted Disaster Recovery Experts
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            From Wacol headquarters, we service all of Brisbane with rapid emergency response.
            Don't let damage worsen - call us now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Emergency: 1300 309 361
            </a>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View All Service Areas
            </Link>
          </div>
          <div className="mt-8 text-blue-100">
            <p className="font-semibold">Headquarters:</p>
            <p>4/17 Tile St, Wacol, QLD 4076</p>
          </div>
        </div>
      </section>
    </div>
  )
}