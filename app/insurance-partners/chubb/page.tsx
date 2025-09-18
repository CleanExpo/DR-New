import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chubb Insurance Partner | Chubb Limited | Disaster Recovery',
  description: 'Chubb Insurance partnership with Disaster Recovery. Global P&C insurance leader, high-net-worth and commercial specialist. Premier restoration partner since 2015.',
  keywords: ["Chubb insurance", "Chubb Limited", "high-net-worth insurance", "commercial insurance", "disaster recovery partner"],
};

export default function ChubbPartnerPage() {
  const chubbProducts = [
    {
      name: 'High-Net-Worth Personal',
      description: 'Comprehensive coverage for affluent individuals',
      established: 'Market leader',
      focus: 'High-value homes, fine arts, valuable collections',
      marketShare: 'Leading high-net-worth insurer globally'
    },
    {
      name: 'Commercial Property',
      description: 'Large commercial and corporate property insurance',
      established: 'Core expertise',
      focus: 'Mid to large-market commercial properties',
      marketShare: 'Top 3 commercial property insurer'
    },
    {
      name: 'Cyber Insurance',
      description: 'Comprehensive cyber liability and data breach coverage',
      established: 'Innovation leader',
      focus: 'Enterprise cyber risk, data protection',
      marketShare: 'Leading cyber insurer worldwide'
    },
    {
      name: 'Directors & Officers',
      description: 'Executive liability and corporate governance coverage',
      established: 'Specialty expertise',
      focus: 'Corporate executives, management liability',
      marketShare: 'Major D&O insurer globally'
    }
  ];

  const chubbHistory = {
    founded: '1985 (as ACE)',
    merger: '2016 (ACE acquired Chubb)',
    australia_entry: '1989',
    headquarters: 'Sydney, Australia',
    global_headquarters: 'Zurich, Switzerland',
    revenue: '$2.3 billion AUD (Australia, 2023)',
    global_revenue: '$42.1 billion USD (Global, 2023)',
    employees: '1,800+ (Australia)',
    global_employees: '34,000+ (Global)',
    market_position: 'World\'s largest publicly traded P&C insurer'
  };

  const partnershipHighlights = [
    {
      title: 'Premium Service',
      description: 'High-net-worth and luxury property expertise',
      icon: Award
    },
    {
      title: 'Risk Engineering',
      description: 'Advanced risk assessment and prevention',
      icon: TrendingUp
    },
    {
      title: 'Global Standards',
      description: 'International best practices and protocols',
      icon: Globe
    },
    {
      title: 'Technology Integration',
      description: 'Digital solutions and cyber restoration',
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
            { label: 'Chubb Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-slate-900 to-slate-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Premier Partner Since 2015</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Chubb Insurance Partnership
                </h1>

                <p className="text-xl text-slate-100 mb-8">
                  Premier restoration provider for Chubb Limited, specialising in high-net-worth properties,
                  large commercial accounts, and cyber incident response across Australia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Chubb Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Chubb</h2>
                <div className="space-y-4 text-slate-100">
                  <p>
                    <strong className="text-white">Founded as ACE:</strong> {chubbHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Chubb Merger:</strong> {chubbHistory.merger}
                  </p>
                  <p>
                    <strong className="text-white">Australia Entry:</strong> {chubbHistory.australia_entry}
                  </p>
                  <p>
                    <strong className="text-white">AU Headquarters:</strong> {chubbHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">AU Revenue:</strong> {chubbHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">AU Employees:</strong> {chubbHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {chubbHistory.market_position}
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
              <h2 className="text-3xl font-bold mb-8">Chubb in Australia</h2>
              <div className="prose prose-lg">
                <p>
                  Chubb Limited was formed in 2016 when ACE Limited acquired the Chubb Corporation,
                  creating the world's largest publicly traded property and casualty insurance company.
                  ACE was originally founded in 1985 as American Casualty Excess Insurance Company.
                </p>
                <p>
                  The company entered the Australian market in 1989, bringing decades of international
                  experience in commercial and specialty insurance. Today, Chubb Australia is renowned
                  for its expertise in high-net-worth personal insurance and large commercial accounts.
                </p>
                <p>
                  Chubb specialises in sophisticated insurance solutions for affluent individuals and
                  large corporations. The company is particularly known for its high-net-worth personal
                  lines, cyber insurance, and directors and officers coverage.
                </p>
                <p>
                  Chubb's focus on premium clients and complex risks makes them an ideal partner for
                  disaster recovery services. Their clientele requires the highest standards of
                  restoration, often involving valuable collections, luxury properties, and
                  time-sensitive business operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chubb Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Chubb Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver premium restoration services across Chubb's sophisticated insurance
                portfolio, with expertise in high-value and complex restoration projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {chubbProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-slate-600" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Chubb</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">High-Net-Worth Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Premium services for Chubb's affluent clientele:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Luxury residential property restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Fine arts and antique conservation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Wine cellar and collection recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Historic property preservation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Concierge-level customer service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Commercial & Cyber Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Specialised services for Chubb's commercial clients:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Large commercial property restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Data centre and IT infrastructure recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Executive office and boardroom restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Cyber incident physical response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Confidential document recovery</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 rounded-full mb-4">
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
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>24/7 premium emergency response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Concierge-level client service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Specialised restoration techniques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 mr-2">✓</span>
                      <span>Global quality standards</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">High-Value Claims</span>
                        <span className="font-semibold">1,850+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-slate-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Commercial Projects</span>
                        <span className="font-semibold">420+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-slate-600 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">99.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-slate-600 h-2 rounded-full" style={{width: '99.1%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-slate-600 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Chubb Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Premier restoration services for Chubb high-net-worth and commercial insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-slate-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-slate-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-600 transition-colors"
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