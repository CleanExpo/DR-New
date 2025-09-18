import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'QBE Insurance Partner | QBE Insurance Group | Disaster Recovery',
  description: 'QBE Insurance partnership with Disaster Recovery. Leading Australian commercial insurer, global specialist insurance. Preferred restoration contractor since 2012.',
  keywords: ["QBE insurance", "QBE Insurance Group", "commercial insurance", "specialist insurance", "disaster recovery partner"],
};

export default function QBEPartnerPage() {
  const qbeProducts = [
    {
      name: 'Commercial Property',
      description: 'Comprehensive commercial property insurance',
      established: 'Core product',
      focus: 'Industrial, commercial and corporate property',
      marketShare: 'Top 3 commercial property insurer in Australia'
    },
    {
      name: 'Business Package',
      description: 'SME and mid-market business insurance',
      established: 'Leading product',
      focus: 'Small to medium enterprise coverage',
      marketShare: 'Major SME insurer with 500,000+ policies'
    },
    {
      name: 'Specialist Risk',
      description: 'Complex and specialist insurance solutions',
      established: 'Market leader',
      focus: 'Mining, energy, marine, aviation',
      marketShare: 'Leading specialist insurer in Australia'
    },
    {
      name: 'Strata Insurance',
      description: 'Residential and commercial strata',
      established: 'Growing segment',
      focus: 'Body corporate and strata title properties',
      marketShare: 'Major strata insurer nationally'
    }
  ];

  const qbeHistory = {
    founded: '1886',
    asx_listing: 'ASX: QBE',
    headquarters: 'Sydney, Australia',
    global_presence: '27 countries',
    revenue: '$19.7 billion USD (2023)',
    employees: '13,000+ globally',
    australian_employees: '3,500+',
    market_position: 'Top 20 global general insurers'
  };

  const partnershipHighlights = [
    {
      title: 'Commercial Expertise',
      description: 'Specialised large commercial loss capabilities',
      icon: TrendingUp
    },
    {
      title: 'Rapid Response',
      description: 'Priority response for major commercial claims',
      icon: Building2
    },
    {
      title: 'Global Standards',
      description: 'International best practices and protocols',
      icon: Globe
    },
    {
      title: 'Specialist Networks',
      description: 'Access to specialist restoration requirements',
      icon: Users
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Partners', href: '/insurance-partners' },
            { label: 'QBE Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Platinum Partner Since 2012</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  QBE Insurance Partnership
                </h1>

                <p className="text-xl text-purple-100 mb-8">
                  Preferred restoration provider for QBE Insurance Group, serving commercial,
                  specialist, and corporate insurance customers across Australia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact QBE Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About QBE Insurance</h2>
                <div className="space-y-4 text-purple-100">
                  <p>
                    <strong className="text-white">Founded:</strong> {qbeHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">ASX Listing:</strong> {qbeHistory.asx_listing}
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> {qbeHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">Global Presence:</strong> {qbeHistory.global_presence}
                  </p>
                  <p>
                    <strong className="text-white">Global Revenue:</strong> {qbeHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">Australian Employees:</strong> {qbeHistory.australian_employees}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {qbeHistory.market_position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">QBE Insurance History</h2>
              <div className="prose prose-lg">
                <p>
                  QBE Insurance Group Limited was founded in 1886 as The Queensland Insurance Company,
                  with just two employees in Townsville. The name QBE comes from merging three companies:
                  Queensland Insurance, Bankers' and Traders' Insurance, and Equitable Probate and General
                  Insurance Company.
                </p>
                <p>
                  From its Australian roots, QBE has grown to become one of the world's top 20 general
                  insurance and reinsurance companies, with operations in 27 countries. The company is
                  listed on the Australian Securities Exchange (ASX: QBE) and is headquartered in Sydney.
                </p>
                <p>
                  In Australia, QBE is a leading commercial insurer, providing insurance solutions for
                  businesses ranging from small enterprises to large multinational corporations. The company
                  specialises in commercial property, liability, marine, and specialist risk insurance.
                </p>
                <p>
                  QBE's strong focus on commercial and corporate insurance makes them a critical partner
                  for disaster recovery services. Their portfolio includes many of Australia's largest
                  commercial properties, industrial facilities, and specialist risks requiring expert
                  restoration capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QBE Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">QBE Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide specialised restoration services across QBE's commercial and specialist
                insurance portfolio, with expertise in large loss management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {qbeProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </CardTitle>
                    <CardDescription>
                      {product.established}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{product.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Focus:</strong> {product.focus}</p>
                      <p><strong>Market Position:</strong> {product.marketShare}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Specialised Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for QBE</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Commercial Property Restoration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Supporting QBE's commercial property portfolio with:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Large loss commercial restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Industrial facility recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Business interruption minimisation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Specialist equipment restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Critical infrastructure recovery</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Specialist Risk Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Expertise in QBE's specialist sectors:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Mining and resources sector</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Marine and port facilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Energy and utilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Healthcare facilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Strata and body corporate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                      <highlight.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Service Commitment</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>24/7 major loss response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Dedicated QBE account management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Specialist restoration capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>National coverage network</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Commercial Claims</span>
                        <span className="font-semibold">3,200+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Large Loss Projects</span>
                        <span className="font-semibold">450+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">98.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '98.2%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">QBE Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Priority restoration services for QBE commercial and specialist insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-600 transition-colors"
              >
                Lodge a Claim
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}