import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Allianz Insurance Partner | Allianz Australia | Disaster Recovery',
  description: 'Allianz Australia partnership with Disaster Recovery. Global insurance leader, commercial and personal insurance. Gold restoration partner since 2014.',
  keywords: ["Allianz insurance", "Allianz Australia", "commercial insurance", "global insurer", "disaster recovery partner"],
};

export default function AllianzPartnerPage() {
  const allianzProducts = [
    {
      name: 'Commercial Insurance',
      description: 'Comprehensive business and commercial property coverage',
      established: 'Market leader',
      focus: 'SME to large corporate insurance',
      marketShare: 'Top 5 commercial insurer in Australia'
    },
    {
      name: 'Home & Contents',
      description: 'Personal lines insurance for residential properties',
      established: 'Growing segment',
      focus: 'Home, contents, and landlord insurance',
      marketShare: 'Major personal lines insurer'
    },
    {
      name: 'Motor Insurance',
      description: 'Comprehensive and third-party vehicle insurance',
      established: 'Core product',
      focus: 'Private and commercial motor',
      marketShare: 'Leading motor insurer nationally'
    },
    {
      name: 'Specialty Lines',
      description: 'Entertainment, marine, and specialty risks',
      established: 'Niche leader',
      focus: 'Film, events, marine, and unique risks',
      marketShare: 'Leading entertainment insurer in Australia'
    }
  ];

  const allianzHistory = {
    founded: '1890 (Global)',
    australia_entry: '1914',
    headquarters: 'Sydney, Australia',
    global_headquarters: 'Munich, Germany',
    revenue: '$2.1 billion AUD (Australia, 2023)',
    global_revenue: '€152.7 billion (Global, 2023)',
    employees: '2,800+ (Australia)',
    global_employees: '159,000+ (Global)',
    market_position: 'World\'s largest insurance company'
  };

  const partnershipHighlights = [
    {
      title: 'Global Standards',
      description: 'International best practices and protocols',
      icon: Globe
    },
    {
      title: 'Technology Integration',
      description: 'Digital claims and restoration tracking',
      icon: TrendingUp
    },
    {
      title: 'Commercial Focus',
      description: 'Large commercial and corporate capabilities',
      icon: Building2
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous quality control standards',
      icon: Award
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Partners', href: '/insurance-partners' },
            { label: 'Allianz' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Gold Partner Since 2014</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Allianz Australia Partnership
                </h1>

                <p className="text-xl text-blue-100 mb-8">
                  Preferred restoration provider for Allianz Australia, serving commercial,
                  personal, and specialty insurance customers nationwide.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Allianz Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Allianz</h2>
                <div className="space-y-4 text-blue-100">
                  <p>
                    <strong className="text-white">Founded Globally:</strong> {allianzHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Australia Entry:</strong> {allianzHistory.australia_entry}
                  </p>
                  <p>
                    <strong className="text-white">AU Headquarters:</strong> {allianzHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">AU Revenue:</strong> {allianzHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">AU Employees:</strong> {allianzHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Global Revenue:</strong> {allianzHistory.global_revenue}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {allianzHistory.market_position}
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
              <h2 className="text-3xl font-bold mb-8">Allianz in Australia</h2>
              <div className="prose prose-lg">
                <p>
                  Allianz has been protecting Australians since 1914, when the Allianz Group first
                  established operations in Australia. As part of the world's largest insurance company,
                  Allianz Australia combines global expertise with deep local knowledge.
                </p>
                <p>
                  Founded in Berlin in 1890, Allianz SE has grown to become a global insurance and
                  financial services powerhouse, operating in over 70 countries. In Australia, Allianz
                  has built a reputation as one of the country's leading general insurers.
                </p>
                <p>
                  The company offers a comprehensive range of insurance products including commercial
                  property, liability, motor, home and contents, travel, and specialty lines. Allianz
                  is particularly strong in commercial insurance, serving businesses from SMEs to large
                  corporations.
                </p>
                <p>
                  Allianz's commitment to innovation and customer service, combined with their global
                  resources and local expertise, makes them an ideal partner for disaster recovery
                  services. Their focus on risk management and loss prevention aligns perfectly with
                  our restoration capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Allianz Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Allianz Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver specialised restoration services across Allianz's comprehensive insurance
                portfolio, backed by global best practices and local expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {allianzProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-blue-600" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Allianz</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Commercial Property Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Supporting Allianz's commercial insurance with:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Large commercial property restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Business interruption minimisation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Industrial equipment restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Supply chain facility recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Technology and data centre restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Specialty & Entertainment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Expert services for Allianz's specialty lines:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Film and production set restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Event venue recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Marine and yacht restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Fine arts and valuable items</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>High-net-worth residential properties</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
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
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>24/7 emergency response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Digital claims integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Global restoration standards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Dedicated account management</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Total Claims Handled</span>
                        <span className="font-semibold">2,850+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Commercial Projects</span>
                        <span className="font-semibold">680+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">97.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '97.5%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Allianz Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Priority restoration services for Allianz commercial and personal insurance customers
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