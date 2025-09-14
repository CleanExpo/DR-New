import { Metadata } from 'next'
import Link from 'next/link'
import {
  Droplets,
  Flame,
  Wind,
  AlertTriangle,
  Home,
  Phone,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Emergency Restoration Services | Disaster Recovery Brisbane',
  description: 'Complete disaster recovery services for Brisbane, Ipswich & Logan. Water damage, fire restoration, mould remediation, storm damage & biohazard cleaning. 24/7 emergency response.',
  keywords: 'disaster recovery services, water damage restoration, fire damage repair, mould remediation, storm damage, biohazard cleaning, Brisbane, Ipswich, Logan',
}

const services = [
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage-restoration',
    icon: Droplets,
    description: 'Swift water extraction, drying & restoration for floods, burst pipes & leaks',
    features: ['24/7 Emergency Response', 'Water Extraction', 'Structural Drying', 'Mould Prevention'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Fire Damage Restoration',
    href: '/services/fire-damage-restoration',
    icon: Flame,
    description: 'Complete fire & smoke damage restoration for residential & commercial properties',
    features: ['Smoke Removal', 'Soot Cleaning', 'Odor Elimination', 'Structural Repairs'],
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Mould Remediation',
    href: '/services/mould-remediation',
    icon: Home,
    description: 'Professional mould removal & prevention with air quality restoration',
    features: ['Black Mould Removal', 'Air Quality Testing', 'Containment', 'Prevention Plans'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Storm Damage Restoration',
    href: '/services/storm-damage',
    icon: Wind,
    description: 'Emergency storm damage repairs for roofs, windows & structural damage',
    features: ['Emergency Tarping', 'Debris Removal', 'Roof Repairs', 'Window Boarding'],
    color: 'from-gray-500 to-slate-500'
  },
  {
    title: 'Biohazard Cleaning',
    href: '/services/biohazard-cleaning',
    icon: AlertTriangle,
    description: 'Specialist biohazard & trauma scene cleaning with complete discretion',
    features: ['Trauma Cleaning', 'Crime Scene Cleanup', 'Hoarding Cleanup', 'Infectious Disease'],
    color: 'from-purple-500 to-pink-500'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Phone className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">24/7 Emergency Response: 1300 309 361</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Disaster Recovery Services
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive restoration solutions for Brisbane, Ipswich & Logan's high-value properties.
              IICRC certified technicians available 24/7 for emergency response.
            </p>
          </div>

          {/* Service Areas Banner */}
          <div className="bg-blue-50 rounded-xl p-6 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">Servicing:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white px-4 py-2 rounded-full text-blue-600 font-medium">Brisbane CBD & Suburbs</span>
                <span className="bg-white px-4 py-2 rounded-full text-blue-600 font-medium">Ipswich & Western Corridor</span>
                <span className="bg-white px-4 py-2 rounded-full text-blue-600 font-medium">Logan & Southern Brisbane</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative p-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Brisbane Trusts Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">1hr</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Rapid Response</h3>
              <p className="text-gray-600">Guaranteed 1-hour emergency response across Brisbane, Ipswich & Logan</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-600">24/7</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Always Available</h3>
              <p className="text-gray-600">Round-the-clock emergency services, 365 days a year</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">IICRC</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Certified Experts</h3>
              <p className="text-gray-600">IICRC certified technicians with latest restoration technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Emergency? We're Here to Help
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't wait for damage to worsen. Our expert team is standing by 24/7 for immediate response.
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
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request Service Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}