import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wesfarmers Insurance Partner | WFI, Lumley, OAMPS | Disaster Recovery',
  description: 'Wesfarmers Insurance Division partnership with Disaster Recovery. WFI, Lumley Insurance, OAMPS broker network. Silver partner since 2019.',
  keywords: ["Wesfarmers insurance", "WFI insurance", "Lumley insurance", "OAMPS", "disaster recovery partner"],
};

export default function WesfarmerslPartnerPage() {
  const wesfarmersbrands = [
    {
      name: 'WFI (Wesfarmers Federation Insurance)',
      description: 'Australia\'s leading rural and regional insurer',
      established: '1919',
      focus: 'Farm, rural business, and regional commercial insurance',
      marketShare: 'Largest rural insurer in Australia with 100+ years experience'
    },
    {
      name: 'Lumley Insurance',
      description: 'Commercial and specialty insurance provider',
      established: '1952 (NZ), 1991 (Australia)',
      focus: 'Commercial property, liability, and specialty risks',
      marketShare: 'Leading commercial insurer across Australia and New Zealand'
    },
    {
      name: 'OAMPS',
      description: 'Insurance broking and risk management',
      established: '1927',
      focus: 'Insurance broking, risk consulting, claims management',
      marketShare: 'One of Australia\'s largest insurance broker networks'
    },
    {
      name: 'Coles Insurance',
      description: 'Retail insurance partnership',
      established: '2018',
      focus: 'Home, contents, car, and travel insurance',
      marketShare: 'Major retail insurance offering through Coles supermarkets'
    }
  ];

  const wesfarmersHistory = {
    founded: '1914',
    insurance_entry: '2008',
    headquarters: 'Perth, Western Australia',
    parent: 'Wesfarmers Limited (ASX: WES)',
    revenue: '$1.9 billion (Insurance Division, 2023)',
    employees: '3,000+ (Insurance Division)'
  };

  const partnershipHighlights = [
    {
      title: 'Rural Expertise',
      description: 'Specialised capabilities for farm and agricultural claims',
      icon: TrendingUp
    },
    {
      title: 'Commercial Focus',
      description: 'Large-scale commercial restoration capabilities',
      icon: Building2
    },
    {
      title: 'National Coverage',
      description: 'Service delivery across metro and regional Australia',
      icon: Globe
    },
    {
      title: 'Broker Network',
      description: 'Direct integration with OAMPS broker network',
      icon: Users
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-900 to-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Silver Partner Since 2019</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Wesfarmers Insurance Partnership
                </h1>

                <p className="text-xl text-green-100 mb-8">
                  Preferred restoration provider for Wesfarmers Insurance Division, serving rural,
                  commercial, and retail insurance customers across Australia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Wesfarmers Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Wesfarmers Insurance</h2>
                <div className="space-y-4 text-green-100">
                  <p>
                    <strong className="text-white">Parent Company:</strong> {wesfarmersHistory.parent}
                  </p>
                  <p>
                    <strong className="text-white">Insurance Entry:</strong> {wesfarmersHistory.insurance_entry}
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> {wesfarmersHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">Division Revenue:</strong> {wesfarmersHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">Employees:</strong> {wesfarmersHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Wesfarmers Founded:</strong> {wesfarmersHistory.founded}
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
              <h2 className="text-3xl font-bold mb-8">Wesfarmers Insurance History</h2>
              <div className="prose prose-lg">
                <p>
                  Wesfarmers Limited, founded in 1914 as a farmers' cooperative in Western Australia,
                  has grown to become one of Australia's largest listed companies. The company entered
                  the insurance market in 2008 with the acquisition of OAMPS Insurance Brokers for $688 million.
                </p>
                <p>
                  In 2014, Wesfarmers significantly expanded its insurance presence by acquiring the
                  underwriting agencies of Insurance Australia Group (IAG), including WFI (Wesfarmers
                  Federation Insurance) and Lumley Insurance, for $1.845 billion. This acquisition
                  established Wesfarmers as a major player in the Australian insurance market.
                </p>
                <p>
                  WFI, originally founded in 1919, brought over a century of experience in rural and
                  regional insurance, while Lumley added strong commercial and specialty insurance capabilities.
                  The combination created a comprehensive insurance offering serving rural, commercial,
                  and retail markets.
                </p>
                <p>
                  In 2018, Wesfarmers launched Coles Insurance in partnership with Coles supermarkets,
                  extending its reach into the retail insurance market. Today, Wesfarmers Insurance
                  Division operates as a significant business unit within the Wesfarmers conglomerate,
                  which also owns Bunnings, Kmart, Target, and Officeworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wesfarmers Insurance Brands */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Wesfarmers Insurance Brands</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver specialised restoration services across all Wesfarmers insurance entities,
                with particular expertise in rural and commercial claims.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {wesfarmersbrands.map((brand, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{brand.name}</span>
                      <Building2 className="w-5 h-5 text-green-600" />
                    </CardTitle>
                    <CardDescription>
                      Established {brand.established}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{brand.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Focus:</strong> {brand.focus}</p>
                      <p><strong>Market Position:</strong> {brand.marketShare}</p>
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Wesfarmers</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Rural & Agricultural Restoration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    With WFI's focus on rural Australia, we've developed extensive capabilities for:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Farm building and shed restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Agricultural equipment decontamination</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Crop storage facility restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Livestock facility sanitisation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Remote area emergency response</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Commercial & Industrial Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Supporting Lumley's commercial insurance portfolio with:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Large-scale commercial restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Industrial equipment restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Warehouse and logistics facility recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Business interruption minimisation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Critical infrastructure restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
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
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Dedicated rural response teams</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Commercial priority service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>OAMPS broker network integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>24/7 emergency response</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Rural Claims Handled</span>
                        <span className="font-semibold">2,500+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Commercial Projects</span>
                        <span className="font-semibold">850+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">97.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '97.8%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Wesfarmers Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Priority restoration services for WFI, Lumley, and Coles Insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
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