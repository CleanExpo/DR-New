import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Droplets, Clock, Shield, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
  description: 'Professional water damage restoration in Brisbane, Ipswich & Logan. Fast water extraction, structural drying & mould prevention. IICRC certified. Call 1300 309 361.',
  keywords: 'water damage restoration Brisbane, flood damage repair, burst pipe emergency, water extraction, structural drying, mould prevention, Ipswich, Logan',
}

const waterCategories = [
  {
    category: 'Category 1',
    name: 'Clean Water',
    description: 'Water from clean sources like broken pipes or rainwater',
    examples: ['Burst water pipes', 'Overflowing sinks', 'Rainwater leaks'],
    risk: 'Low',
    color: 'blue'
  },
  {
    category: 'Category 2',
    name: 'Grey Water',
    description: 'Water containing some contamination that could cause illness',
    examples: ['Washing machine overflow', 'Dishwasher leaks', 'Toilet overflow (urine only)'],
    risk: 'Medium',
    color: 'gray'
  },
  {
    category: 'Category 3',
    name: 'Black Water',
    description: 'Highly contaminated water containing pathogens',
    examples: ['Sewage backup', 'Flooding from rivers', 'Standing water with microbial growth'],
    risk: 'High',
    color: 'black'
  }
]

const subServices = [
  {
    title: 'Burst Pipe Emergency',
    href: '/services/water-damage-restoration/burst-pipes',
    description: 'Immediate response for burst pipe emergencies'
  },
  {
    title: 'Flood Damage Restoration',
    href: '/services/water-damage-restoration/flood-damage',
    description: 'Complete flood recovery and restoration services'
  },
  {
    title: 'Sewage Cleanup',
    href: '/services/water-damage-restoration/sewage-cleanup',
    description: 'Safe sewage removal and sanitization'
  },
  {
    title: 'Basement Flooding',
    href: '/services/water-damage-restoration/basement-flooding',
    description: 'Basement water extraction and waterproofing'
  }
]

export default function WaterDamageRestorationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Phone className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">Water Emergency? Call Now: 1300 309 361</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
              <Droplets className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Water Damage Restoration Brisbane
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Professional water extraction, drying & restoration services for Brisbane, Ipswich & Logan.
              IICRC certified technicians available 24/7 for emergency response.
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
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-2xl text-gray-900">1 Hour</p>
              <p className="text-gray-700">Response Time</p>
            </div>
            <div>
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-2xl text-gray-900">IICRC</p>
              <p className="text-gray-700">Certified</p>
            </div>
            <div>
              <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-2xl text-gray-900">10,000+</p>
              <p className="text-gray-700">Properties Restored</p>
            </div>
            <div>
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-2xl text-gray-900">24/7</p>
              <p className="text-gray-700">Emergency Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Water Damage Restoration Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Emergency Contact', desc: 'Call us 24/7 for immediate response' },
              { step: '2', title: 'Inspection & Assessment', desc: 'Thorough damage evaluation and planning' },
              { step: '3', title: 'Water Extraction', desc: 'Remove standing water with industrial equipment' },
              { step: '4', title: 'Drying & Dehumidification', desc: 'Complete structural drying to prevent mould' },
              { step: '5', title: 'Cleaning & Sanitizing', desc: 'Professional cleaning and antimicrobial treatment' },
              { step: '6', title: 'Restoration', desc: 'Complete repairs to pre-damage condition' },
              { step: '7', title: 'Final Inspection', desc: 'Quality assurance and documentation' },
              { step: '8', title: 'Insurance Support', desc: 'Direct billing and claim assistance' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Understanding Water Damage Categories
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Different water categories require different restoration approaches. Our IICRC certified technicians
            are trained to safely handle all water damage types.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {waterCategories.map((cat) => (
              <div key={cat.category} className="bg-white rounded-lg shadow-lg p-6">
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold mb-4
                  ${cat.color === 'blue' ? 'bg-blue-500' : cat.color === 'gray' ? 'bg-gray-500' : 'bg-gray-900'}`}>
                  {cat.category}
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-gray-700 mb-4">{cat.description}</p>
                <div className="mb-4">
                  <p className="font-semibold mb-2">Examples:</p>
                  <ul className="space-y-1">
                    {cat.examples.map((example) => (
                      <li key={example} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center">
                  <AlertCircle className={`h-5 w-5 mr-2
                    ${cat.risk === 'Low' ? 'text-green-500' : cat.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`} />
                  <span className="font-semibold">Risk Level: {cat.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Specialized Water Damage Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <div className="flex items-center text-blue-600 font-semibold">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Water Damage Service Areas
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-xl mb-4 text-blue-600">Brisbane</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Brisbane CBD</li>
                <li>• Inner Suburbs</li>
                <li>• Northern Suburbs</li>
                <li>• Southern Suburbs</li>
                <li>• Eastern Suburbs</li>
                <li>• Western Suburbs</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-xl mb-4 text-blue-600">Ipswich</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Ipswich Central</li>
                <li>• Springfield Lakes</li>
                <li>• Forest Lake</li>
                <li>• Redbank Plains</li>
                <li>• Goodna</li>
                <li>• Bundamba</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-xl mb-4 text-blue-600">Logan</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Logan Central</li>
                <li>• Springwood</li>
                <li>• Underwood</li>
                <li>• Slacks Creek</li>
                <li>• Shailer Park</li>
                <li>• Beenleigh</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Water Damage Emergency? Act Fast!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every minute counts when dealing with water damage. Our rapid response team is ready 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call 1300 309 361 Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request Emergency Service
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}