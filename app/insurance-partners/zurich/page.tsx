import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zurich Insurance Partner | Zurich Financial Services | Disaster Recovery',
  description: 'Zurich Insurance partnership with Disaster Recovery. Global insurance leader, commercial and specialty insurance. Preferred restoration contractor since 2013.',
  keywords: ["Zurich insurance", "Zurich Financial Services", "commercial insurance", "global insurer", "disaster recovery partner"],
};

export default function ZurichPartnerPage() {
  const zurichProducts = [
    {
      name: 'Commercial Property',
      description: 'Large commercial and corporate property insurance',
      established: 'Core product',
      focus: 'Major commercial buildings and industrial facilities',
      marketShare: 'Top 5 commercial property insurer globally'
    },
    {
      name: 'General Liability',
      description: 'Comprehensive liability coverage for businesses',
      established: 'Leading product',
      focus: 'Public and products liability',
      marketShare: 'Major corporate liability insurer'
    },
    {
      name: 'Construction & Engineering',
      description: 'Specialist construction and infrastructure insurance',
      established: 'Specialty focus',
      focus: 'Construction projects and engineering risks',
      marketShare: 'Leading construction insurer in Australia'
    },
    {
      name: 'Marine & Cargo',
      description: 'Marine hull, cargo, and logistics insurance',
      established: 'Global specialty',
      focus: 'Shipping, cargo, and marine liabilities',
      marketShare: 'Top global marine insurer'
    }
  ];

  const zurichHistory = {
    founded: '1872 (Global)',
    australia_entry: '1961',
    headquarters: 'North Sydney, Australia',
    global_headquarters: 'Zurich, Switzerland',
    revenue: '$4.2 billion AUD (Australia, 2023)',
    global_revenue: '$75 billion USD (Global, 2023)',
    employees: '2,000+ (Australia)',
    global_employees: '56,000+ (Global)',
    market_position: 'Top 100 global companies'
  };

  const partnershipHighlights = [
    {
      title: 'Global Standards',
      description: 'International best practices and protocols',
      icon: Globe
    },
    {
      title: 'Risk Engineering',
      description: 'Proactive risk management approach',
      icon: TrendingUp
    },
    {
      title: 'Corporate Focus',
      description: 'Large commercial loss expertise',
      icon: Building2
    },
    {
      title: 'Innovation',
      description: 'Leading edge restoration technologies',
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
            { label: 'Zurich' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-cyan-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Gold Partner Since 2013</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Zurich Insurance Partnership
                </h1>

                <p className="text-xl text-cyan-100 mb-8">
                  Preferred restoration provider for Zurich Insurance, delivering world-class
                  restoration services for commercial, corporate, and specialty insurance clients.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Zurich Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-cyan-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <Image
                  src="/images/insurance-logos/Zurich insurance.png"
                  alt="Zurich Insurance"
                  width={200}
                  height={80}
                  className="mb-6"
                />
                <h2 className="text-2xl font-bold mb-6">About Zurich</h2>
                <div className="space-y-4 text-cyan-100">
                  <p>
                    <strong className="text-white">Founded Globally:</strong> {zurichHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Australia Entry:</strong> {zurichHistory.australia_entry}
                  </p>
                  <p>
                    <strong className="text-white">AU Headquarters:</strong> {zurichHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">AU Revenue:</strong> {zurichHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">AU Employees:</strong> {zurichHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Global Revenue:</strong> {zurichHistory.global_revenue}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {zurichHistory.market_position}
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
              <h2 className="text-3xl font-bold mb-8">Zurich in Australia</h2>
              <div className="prose prose-lg">
                <p>
                  Zurich Insurance Group was founded in 1872 in Zurich, Switzerland, originally as a
                  reinsurance company for marine risks. Over its 150-year history, Zurich has grown
                  to become one of the world's largest and most respected insurance companies.
                </p>
                <p>
                  Zurich entered the Australian market in 1961, establishing operations in Sydney.
                  Through organic growth and strategic acquisitions, including the purchase of Eagle Star
                  and the general insurance business of QBE Mercantile Mutual, Zurich has built a strong
                  presence in the Australian commercial insurance market.
                </p>
                <p>
                  In Australia, Zurich focuses primarily on commercial, corporate, and specialty insurance,
                  serving businesses ranging from small enterprises to large multinational corporations.
                  The company is particularly strong in property, liability, construction, and marine insurance.
                </p>
                <p>
                  Zurich's global risk engineering expertise and commitment to innovation make them an
                  ideal partner for disaster recovery services. Their proactive approach to risk management
                  aligns perfectly with our preventive restoration capabilities, helping minimise losses
                  and speed recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zurich Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Zurich Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide specialised restoration services across Zurich's commercial and
                specialty insurance portfolio, with expertise in complex large loss management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {zurichProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-cyan-600" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Zurich</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-cyan-200">
                <CardHeader>
                  <CardTitle className="text-cyan-900">Commercial & Corporate Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Supporting Zurich's commercial insurance with:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Large commercial property restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Corporate headquarters recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Data centre and technology restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Manufacturing facility recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Supply chain restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-cyan-200">
                <CardHeader>
                  <CardTitle className="text-cyan-900">Construction & Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Expert services for Zurich's construction clients:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Construction site water damage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Temporary works failures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Infrastructure project recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Engineering equipment restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Project timeline recovery</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Risk Engineering Partnership */}
        <section className="py-16 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Risk Engineering Partnership</h2>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-lg mb-8">
                Our partnership with Zurich extends beyond restoration to proactive risk management,
                helping clients prevent losses before they occur.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Pre-Loss Services</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Risk assessments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Emergency planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Preventive maintenance</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">During Loss</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Immediate response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Loss mitigation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Business continuity</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Post-Loss</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Root cause analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Improvement recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">•</span>
                      <span>Resilience building</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full mb-4">
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
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>24/7 major loss response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Global best practices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Risk engineering integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Dedicated account management</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Commercial Claims</span>
                        <span className="font-semibold">1,850+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cyan-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Large Loss Projects</span>
                        <span className="font-semibold">320+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cyan-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">97.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cyan-600 h-2 rounded-full" style={{width: '97.3%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Zurich Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Priority restoration services for Zurich commercial and corporate insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-cyan-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-cyan-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-600 transition-colors"
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