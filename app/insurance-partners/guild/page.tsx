import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guild Insurance Partner | Guild Insurance Limited | Disaster Recovery',
  description: 'Guild Insurance partnership with Disaster Recovery. Professional sectors specialist, education and healthcare insurer. Trusted restoration partner since 2017.',
  keywords: ["Guild insurance", "professional indemnity", "education insurance", "healthcare insurance", "disaster recovery partner"],
};

export default function GuildPartnerPage() {
  const guildProducts = [
    {
      name: 'Professional Indemnity',
      description: 'Professional liability for various industries',
      established: 'Core speciality',
      focus: 'Professionals, consultants, service providers',
      marketShare: 'Leading professional indemnity insurer'
    },
    {
      name: 'Education Sector',
      description: 'Comprehensive coverage for educational institutions',
      established: 'Market leader',
      focus: 'Schools, universities, training providers',
      marketShare: 'Major education sector insurer in Australia'
    },
    {
      name: 'Healthcare Insurance',
      description: 'Medical professional and facility coverage',
      established: 'Specialist expertise',
      focus: 'Healthcare professionals, medical facilities',
      marketShare: 'Significant healthcare insurer'
    },
    {
      name: 'Commercial Property',
      description: 'Property insurance for professional services',
      established: 'Growing segment',
      focus: 'Professional practice premises, equipment',
      marketShare: 'Niche commercial property insurer'
    }
  ];

  const guildHistory = {
    founded: '1963',
    headquarters: 'Sydney, Australia',
    founding_purpose: 'Architects\' professional indemnity',
    expansion: '1970s onwards',
    revenue: '$850 million AUD (2023)',
    employees: '950+ (Australia)',
    parent_company: 'Owned by members (mutual insurer)',
    market_position: 'Leading professional sectors specialist'
  };

  const partnershipHighlights = [
    {
      title: 'Professional Focus',
      description: 'Specialised professional sector expertise',
      icon: Award
    },
    {
      title: 'Education Expertise',
      description: 'Deep understanding of educational facilities',
      icon: Building2
    },
    {
      title: 'Healthcare Knowledge',
      description: 'Medical facility restoration capabilities',
      icon: Users
    },
    {
      title: 'Compliance Standards',
      description: 'Professional regulatory compliance',
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
            { label: 'Guild Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-teal-900 to-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Specialist Partner Since 2017</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Guild Insurance Partnership
                </h1>

                <p className="text-xl text-teal-100 mb-8">
                  Specialised restoration provider for Guild Insurance, serving professional sectors
                  including education, healthcare, and professional services across Australia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-teal-900 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Guild Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Guild Insurance</h2>
                <div className="space-y-4 text-teal-100">
                  <p>
                    <strong className="text-white">Founded:</strong> {guildHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> {guildHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">Original Focus:</strong> {guildHistory.founding_purpose}
                  </p>
                  <p>
                    <strong className="text-white">Expanded:</strong> {guildHistory.expansion}
                  </p>
                  <p>
                    <strong className="text-white">Revenue:</strong> {guildHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">Employees:</strong> {guildHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Structure:</strong> {guildHistory.parent_company}
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
              <h2 className="text-3xl font-bold mb-8">Guild Insurance History</h2>
              <div className="prose prose-lg">
                <p>
                  Guild Insurance was founded in 1963 by a group of architects who needed
                  professional indemnity insurance. Originally established to serve the
                  architectural profession, Guild has grown to become Australia's leading
                  specialist insurer for professional sectors.
                </p>
                <p>
                  From its origins in professional indemnity insurance, Guild expanded throughout
                  the 1970s and 1980s to serve a broader range of professional services including
                  engineers, consultants, healthcare professionals, and educational institutions.
                </p>
                <p>
                  Today, Guild Insurance is recognised as the specialist insurer for professional
                  sectors in Australia. The company operates as a mutual insurer, owned by its
                  members, which allows it to focus on long-term relationships and specialised
                  service rather than short-term profit maximisation.
                </p>
                <p>
                  Guild's deep understanding of professional sectors and their unique risks makes
                  them an ideal partner for disaster recovery services. Their clients often require
                  specialised restoration approaches that consider professional equipment, compliance
                  requirements, and minimal business disruption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guild Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Guild Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver specialised restoration services across Guild's professional sector
                insurance portfolio, with expertise in education, healthcare, and professional facilities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {guildProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-teal-600" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Guild</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-900">Education & Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Specialised services for Guild's education and healthcare clients:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>School and university facility restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Hospital and medical facility recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Laboratory and research equipment restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Aged care facility specialised cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Childcare centre safe restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-900">Professional Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Expert services for Guild's professional sector clients:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Architectural and engineering office restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Legal practice document recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Accounting firm confidential document handling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Professional equipment and technology recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Compliance-focused restoration processes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Performance</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {partnershipHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 rounded-full mb-4">
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
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>24/7 professional facility response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Compliance-focused restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Minimal disruption protocols</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-600 mr-2">✓</span>
                      <span>Professional equipment expertise</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Professional Claims</span>
                        <span className="font-semibold">980+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Education Facilities</span>
                        <span className="font-semibold">340+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{width: '82%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">97.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{width: '97.8%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Guild Insurance Emergency Line</h2>
            <p className="text-xl mb-8">
              Specialised restoration services for Guild professional sector insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-600 transition-colors"
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