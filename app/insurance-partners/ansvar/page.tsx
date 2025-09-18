import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ansvar Insurance Partner | Ansvar Insurance Limited | Disaster Recovery',
  description: 'Ansvar Insurance partnership with Disaster Recovery. Community sector specialist, faith-based and charitable organisation insurer. Trusted restoration partner since 2018.',
  keywords: ["Ansvar insurance", "community insurance", "church insurance", "charity insurance", "disaster recovery partner"],
};

export default function AnsvarPartnerPage() {
  const ansvarProducts = [
    {
      name: 'Community Property',
      description: 'Property insurance for community organisations',
      established: 'Core speciality',
      focus: 'Churches, community centres, charity premises',
      marketShare: 'Leading community sector property insurer'
    },
    {
      name: 'Faith-Based Insurance',
      description: 'Comprehensive coverage for religious organisations',
      established: 'Market leader',
      focus: 'Churches, religious schools, faith communities',
      marketShare: 'Australia\'s leading faith-based insurer'
    },
    {
      name: 'Care Facilities',
      description: 'Specialised coverage for care and support services',
      established: 'Specialist expertise',
      focus: 'Aged care, disability services, childcare',
      marketShare: 'Major care sector insurer'
    },
    {
      name: 'Education Sector',
      description: 'Independent schools and educational institutions',
      established: 'Growing segment',
      focus: 'Independent schools, training colleges',
      marketShare: 'Significant independent education insurer'
    }
  ];

  const ansvarHistory = {
    founded: '1961',
    headquarters: 'Sydney, Australia',
    founding_purpose: 'Seventh-day Adventist Church insurance needs',
    expansion: '1990s onwards',
    revenue: '$450 million AUD (2023)',
    employees: '650+ (Australia)',
    parent_company: 'Ansvar Insurance Limited',
    market_position: 'Leading community and faith sector specialist'
  };

  const partnershipHighlights = [
    {
      title: 'Community Focus',
      description: 'Deep understanding of community organisations',
      icon: Users
    },
    {
      title: 'Faith Sector Expertise',
      description: 'Specialised knowledge of religious facilities',
      icon: Building2
    },
    {
      title: 'Care Standards',
      description: 'Compliance with care facility regulations',
      icon: Award
    },
    {
      title: 'Educational Facilities',
      description: 'School and educational institution expertise',
      icon: TrendingUp
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Partners', href: '/insurance-partners' },
            { label: 'Ansvar Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-orange-900 to-amber-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Community Partner Since 2018</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Ansvar Insurance Partnership
                </h1>

                <p className="text-xl text-orange-100 mb-8">
                  Specialised restoration provider for Ansvar Insurance, serving community organisations,
                  faith-based institutions, care facilities, and charitable organisations across Australia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-orange-900 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Ansvar Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-orange-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Ansvar Insurance</h2>
                <div className="space-y-4 text-orange-100">
                  <p>
                    <strong className="text-white">Founded:</strong> {ansvarHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> {ansvarHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">Original Purpose:</strong> {ansvarHistory.founding_purpose}
                  </p>
                  <p>
                    <strong className="text-white">Expanded:</strong> {ansvarHistory.expansion}
                  </p>
                  <p>
                    <strong className="text-white">Revenue:</strong> {ansvarHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">Employees:</strong> {ansvarHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {ansvarHistory.market_position}
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
              <h2 className="text-3xl font-bold mb-8">Ansvar Insurance History</h2>
              <div className="prose prose-lg">
                <p>
                  Ansvar Insurance was established in 1961 to meet the specific insurance needs
                  of the Seventh-day Adventist Church in Australia. The name "Ansvar" comes from
                  a Swedish word meaning "responsibility," reflecting the company's commitment
                  to responsible service to the community sector.
                </p>
                <p>
                  From its origins serving a single religious denomination, Ansvar expanded throughout
                  the 1990s to become Australia's leading specialist insurer for the broader community
                  sector, including churches of all denominations, charities, care facilities, and
                  community organisations.
                </p>
                <p>
                  Today, Ansvar Insurance is recognised as Australia's specialist community sector
                  insurer. The company has developed deep expertise in understanding the unique
                  risks and insurance needs of faith-based organisations, charities, care providers,
                  and community groups.
                </p>
                <p>
                  Ansvar's focus on community organisations makes them an ideal partner for disaster
                  recovery services. Their clients often serve vulnerable populations and require
                  rapid restoration to continue their essential community services, often with
                  limited budgets and specific compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ansvar Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ansvar Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide compassionate and efficient restoration services across Ansvar's community
                sector insurance portfolio, understanding the unique needs of faith-based and charitable organisations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ansvarProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-orange-600" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Ansvar</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-900">Faith & Community Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Respectful restoration services for Ansvar's faith and community clients:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Church and worship facility restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Community centre and hall recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Religious artefact and asset conservation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Charity office and facility restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Heritage building preservation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-900">Care & Education Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Specialised services for Ansvar's care and education clients:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Aged care facility sanitisation and restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Disability services accommodation recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Independent school facility restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Childcare centre safe cleaning protocols</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Compliance-focused restoration processes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4">
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
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>24/7 community facility response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Respectful cultural and religious practices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Rapid service continuity restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">✓</span>
                      <span>Budget-conscious restoration solutions</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Community Claims</span>
                        <span className="font-semibold">650+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Faith-Based Projects</span>
                        <span className="font-semibold">280+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">98.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '98.5%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ansvar Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Compassionate restoration services for Ansvar community and faith-based insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
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