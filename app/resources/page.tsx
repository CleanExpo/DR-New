import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Droplets, FileText, Shield, AlertCircle, Users, Clock, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Recovery Resources & Education | Professional Guides Australia',
  description: 'Essential disaster recovery resources, IICRC standards guides, insurance claim templates, and professional restoration education for property owners and technicians across Australia.',
  keywords: 'disaster recovery resources, water damage guides, fire restoration education, mould remediation standards, IICRC certification, insurance claim guides, restoration professional training, emergency response protocols',
  openGraph: {
    title: 'Professional Disaster Recovery Resources & Education',
    description: 'Comprehensive guides and resources for disaster recovery, restoration standards, and insurance claims.',
    url: 'https://disaster-recovery-seven.vercel.app/resources',
  }
};

const resources = [
  {
    id: 'water-damage-categories',
    title: 'Understanding Water Damage Categories 1, 2 & 3',
    description: 'Essential IICRC guide to water contamination levels. Critical knowledge for insurance claims and proper restoration.',
    icon: Droplets,
    href: '/resources/water-damage-categories',
    badge: 'Essential',
    readTime: '8 min',
    category: 'Education'
  },
  {
    id: 'insurance-claims',
    title: 'Insurance Claims Documentation Guide',
    description: 'Step-by-step process for documenting and filing successful disaster recovery insurance claims.',
    icon: FileText,
    href: '/resources/insurance-claims-guide',
    badge: 'Popular',
    readTime: '12 min',
    category: 'Insurance'
  },
  {
    id: 'mould-prevention',
    title: 'Preventing Mould After Water Damage',
    description: 'Professional protocols for preventing mould growth in the critical 24-72 hour window after water damage.',
    icon: Shield,
    href: '/resources/mould-prevention',
    badge: 'Critical',
    readTime: '6 min',
    category: 'Prevention'
  },
  {
    id: 'emergency-response',
    title: 'First 24 Hours: Emergency Response Guide',
    description: 'What to do immediately after disaster strikes. Time-critical actions that save property and reduce costs.',
    icon: Clock,
    href: '/resources/emergency-response-guide',
    badge: 'Urgent',
    readTime: '5 min',
    category: 'Emergency'
  },
  {
    id: 'contractor-selection',
    title: 'Choosing a Restoration Contractor',
    description: 'How to verify IICRC certification, insurance coverage, and select qualified restoration professionals.',
    icon: Users,
    href: '/resources/contractor-selection',
    badge: 'Guide',
    readTime: '10 min',
    category: 'Selection'
  },
  {
    id: 'cost-factors',
    title: 'Restoration Cost Factors & Estimates',
    description: 'Understanding pricing, insurance coverage limits, and factors affecting restoration costs.',
    icon: TrendingUp,
    href: '/resources/cost-factors',
    badge: 'Financial',
    readTime: '15 min',
    category: 'Costs'
  }
];

const categories = [
  { name: 'All Resources', count: resources.length, color: 'bg-gray-100 text-gray-800' },
  { name: 'Education', count: 1, color: 'bg-blue-100 text-blue-800' },
  { name: 'Insurance', count: 1, color: 'bg-green-100 text-green-800' },
  { name: 'Prevention', count: 1, color: 'bg-purple-100 text-purple-800' },
  { name: 'Emergency', count: 1, color: 'bg-red-100 text-red-800' },
  { name: 'Selection', count: 1, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Costs', count: 1, color: 'bg-orange-100 text-orange-800' }
];

export default function ResourcesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Disaster Recovery Resources & Education',
    description: 'Comprehensive collection of disaster recovery guides, standards, and educational resources',
    url: 'https://disaster-recovery-seven.vercel.app/resources',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: resources.map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://disaster-recovery-seven.vercel.app${resource.href}`,
        name: resource.title,
        description: resource.description
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="inline-flex items-centre gap-2 bg-blue-800/30 px-4 py-2 rounded-full mb-6">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">Professional Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Disaster Recovery Resources & Education
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert guides, IICRC standards, and essential knowledge for property owners,
              insurance professionals, and restoration technicians across Australia
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 text-centre">
                <span className="text-white text-sm font-medium">Featured Resource</span>
              </div>
              <Link href="/resources/water-damage-categories" className="block p-8 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="bg-blue-100 rounded-xl p-4">
                    <Droplets className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-centre gap-3 mb-2">
                      <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                        Essential Reading
                      </span>
                      <span className="text-gray-500 text-sm">8 min read</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Understanding Water Damage Categories 1, 2 & 3
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Critical knowledge every property owner and restoration professional needs.
                      Learn how to identify water contamination levels, understand health risks,
                      and ensure proper insurance claim documentation according to IICRC S500 standards.
                    </p>
                    <div className="flex items-centre text-blue-600 font-medium">
                      Read Complete Guide
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-centre">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${category.color} hover:opacity-90 transition-opacity`}
                >
                  {category.name}
                  <span className="ml-2 opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <Link
                    key={resource.id}
                    href={resource.href}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gray-100 group-hover:bg-blue-100 rounded-lg p-3 transition-colors">
                        <Icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-centre gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            resource.badge === 'Essential' ? 'bg-red-100 text-red-700' :
                            resource.badge === 'Popular' ? 'bg-green-100 text-green-700' :
                            resource.badge === 'Critical' ? 'bg-orange-100 text-orange-700' :
                            resource.badge === 'Urgent' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {resource.badge}
                          </span>
                          <span className="text-gray-500 text-xs">{resource.readTime} read</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-centre text-blue-600 font-medium text-sm">
                      Learn More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-centre">
              Quick Reference Guides
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-centre gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Emergency Contacts
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Emergency Services</span>
                    <span className="font-bold">000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">SES Flood/Storm</span>
                    <span className="font-bold">132 500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Poisons Information</span>
                    <span className="font-bold">13 11 26</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">24/7 Restoration</span>
                    <span className="font-bold">1300 000 000</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-centre gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Industry Standards
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Water Damage</span>
                    <span className="font-bold">IICRC S500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Mould Remediation</span>
                    <span className="font-bold">IICRC S520</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Fire/Smoke</span>
                    <span className="font-bold">IICRC S700</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Trauma/Crime Scene</span>
                    <span className="font-bold">IICRC S540</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-centre text-white">
            <h2 className="text-3xl font-bold mb-4">
              Stay Informed on Disaster Recovery
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest industry updates, safety protocols, and recovery tips
              delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-blue-200">
              Join 5,000+ property managers and restoration professionals
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}