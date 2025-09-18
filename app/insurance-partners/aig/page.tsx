import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIG Insurance Partner | American International Group | Disaster Recovery',
  description: 'AIG Insurance partnership with Disaster Recovery. Global insurance leader, commercial specialty risks. Trusted restoration partner since 2013.',
  keywords: ["AIG insurance", "American International Group", "commercial insurance", "specialty insurance", "disaster recovery partner"],
};

export default function AIGPartnerPage() {
  const aigProducts = [
    {
      name: 'Commercial Property',
      description: 'Large commercial and industrial property insurance',
      established: 'Core speciality',
      focus: 'High-value commercial properties, industrial facilities',
      marketShare: 'Leading commercial property insurer globally'
    },
    {
      name: 'Marine Insurance',
      description: 'Comprehensive marine and cargo coverage',
      established: 'Global leader',
      focus: 'Marine hull, cargo, energy offshore',
      marketShare: 'World\'s largest marine insurer'
    },
    {
      name: 'Aviation Insurance',
      description: 'Aircraft hull, liability, and aviation risks',
      established: 'Market pioneer',
      focus: 'Commercial aviation, aerospace, airports',
      marketShare: 'Leading global aviation insurer'
    },
    {
      name: 'Energy & Mining',
      description: 'Specialist energy and natural resources coverage',
      established: 'Industry expertise',
      focus: 'Oil & gas, mining, renewable energy',
      marketShare: 'Top 3 energy insurer worldwide'
    }
  ];

  const aigHistory = {
    founded: '1919',
    australia_entry: '1975',
    headquarters: 'Sydney, Australia',
    global_headquarters: 'New York, USA',
    revenue: '$1.8 billion AUD (Australia, 2023)',
    global_revenue: '$52.1 billion USD (Global, 2023)',
    employees: '1,200+ (Australia)',
    global_employees: '49,600+ (Global)',
    market_position: 'Leading global commercial insurer'
  };

  const partnershipHighlights = [
    {
      title: 'Specialty Expertise',
      description: 'Complex commercial and industrial restoration',
      icon: Award
    },
    {
      title: 'Global Network',
      description: 'International coverage and standards',
      icon: Globe
    },
    {
      title: 'Large Loss Management',
      description: 'Major commercial loss capabilities',
      icon: TrendingUp
    },
    {
      title: 'Risk Engineering',
      description: 'Technical risk assessment and mitigation',
      icon: Building2
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Partners', href: '/insurance-partners' },
            { label: 'AIG Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-red-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Strategic Partner Since 2013</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  AIG Insurance Partnership
                </h1>

                <p className="text-xl text-red-100 mb-8">
                  Preferred restoration provider for AIG Australia, specialising in large commercial,
                  industrial, and specialty risk insurance across complex restoration projects.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-red-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact AIG Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About AIG</h2>
                <div className="space-y-4 text-red-100">
                  <p>
                    <strong className="text-white">Founded Globally:</strong> {aigHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Australia Entry:</strong> {aigHistory.australia_entry}
                  </p>
                  <p>
                    <strong className="text-white">AU Headquarters:</strong> {aigHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">AU Revenue:</strong> {aigHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">AU Employees:</strong> {aigHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Global Revenue:</strong> {aigHistory.global_revenue}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {aigHistory.market_position}
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
              <h2 className="text-3xl font-bold mb-8">AIG in Australia</h2>
              <div className="prose prose-lg">
                <p>
                  American International Group (AIG) was founded in Shanghai in 1919 by Cornelius Vander Starr.
                  Originally established to serve American businesses in Asia, AIG has grown to become one of
                  the world's largest and most respected insurance organisations.
                </p>
                <p>
                  AIG entered the Australian market in 1975, bringing decades of international experience
                  in commercial and specialty insurance. Today, AIG Australia is a leading commercial
                  insurer, known for its expertise in complex risks and large commercial accounts.
                </p>
                <p>
                  The company specialises in commercial property, marine, aviation, energy, and other
                  specialty lines. AIG's strength lies in underwriting complex risks that require
                  sophisticated risk assessment and specialised coverage solutions.
                </p>
                <p>
                  AIG's global network and technical expertise make them an ideal partner for disaster
                  recovery services. Their focus on large commercial and industrial risks requires
                  restoration providers with the capability to handle complex, high-value projects
                  with international standards and protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AIG Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">AIG Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide expert restoration services across AIG's specialty insurance portfolio,
                handling complex commercial and industrial restoration projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {aigProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-red-600" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for AIG</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-900">Commercial & Industrial</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Supporting AIG's commercial portfolio with:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Large industrial facility restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Manufacturing plant recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Warehouse and distribution centres</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>High-tech facility decontamination</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Critical infrastructure restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-900">Specialty Risk Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Expert services for AIG's specialty sectors:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Marine vessel and cargo restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Aviation hangar and aircraft facilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Energy sector infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Mining operation recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Offshore platform restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
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
                      <span className="text-red-600 mr-2">✓</span>
                      <span>24/7 major loss response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Global restoration standards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Technical expertise certification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✓</span>
                      <span>Risk engineering collaboration</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Commercial Claims</span>
                        <span className="font-semibold">1,450+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Large Loss Projects</span>
                        <span className="font-semibold">280+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">98.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{width: '98.8%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">AIG Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Priority restoration services for AIG commercial and specialty insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors"
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