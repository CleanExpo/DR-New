import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RACQ Insurance Partner | Royal Automobile Club Queensland | Disaster Recovery',
  description: 'RACQ Insurance partnership with Disaster Recovery. Queensland\'s largest mutual insurer, comprehensive home and motor insurance. Preferred restoration partner since 2010.',
  keywords: ["RACQ insurance", "Queensland insurance", "mutual insurance", "RACQ home insurance", "disaster recovery partner"],
};

export default function RACQPartnerPage() {
  const racqProducts = [
    {
      name: 'Home & Contents',
      description: 'Comprehensive home and contents insurance',
      established: 'Core product',
      focus: 'Queensland homes and investment properties',
      marketShare: 'Queensland\'s most trusted home insurer'
    },
    {
      name: 'Motor Insurance',
      description: 'Car, motorcycle, and caravan insurance',
      established: 'Foundation product',
      focus: 'Comprehensive and third-party motor insurance',
      marketShare: 'Leading motor insurer in Queensland'
    },
    {
      name: 'Business Insurance',
      description: 'Small business and commercial coverage',
      established: 'Growing segment',
      focus: 'SME business packages and liability',
      marketShare: 'Expanding commercial presence'
    },
    {
      name: 'Travel Insurance',
      description: 'Domestic and international travel coverage',
      established: 'Established product',
      focus: 'Comprehensive travel protection',
      marketShare: 'Popular with Queensland travellers'
    }
  ];

  const racqHistory = {
    founded: '1905',
    type: 'Mutual organisation',
    headquarters: 'Brisbane, Queensland',
    members: '1.7 million+',
    revenue: '$1.8 billion (2023)',
    employees: '2,500+',
    branches: '14 stores across Queensland',
    market_position: 'Queensland\'s largest club'
  };

  const partnershipHighlights = [
    {
      title: 'Queensland Focus',
      description: 'Deep local knowledge and rapid response',
      icon: Globe
    },
    {
      title: 'Member Priority',
      description: 'Fast-track service for RACQ members',
      icon: Users
    },
    {
      title: 'Storm Response',
      description: 'Specialist Queensland storm damage expertise',
      icon: TrendingUp
    },
    {
      title: 'Mutual Values',
      description: 'Aligned commitment to member outcomes',
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
            { label: 'RACQ' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Platinum Partner Since 2010</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  RACQ Insurance Partnership
                </h1>

                <p className="text-xl text-blue-100 mb-8">
                  Preferred restoration provider for RACQ, Queensland's largest mutual
                  insurer, serving over 1.7 million members with priority disaster recovery.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact RACQ Team
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
                <Image
                  src="/images/insurance-logos/RACQ Insurance.png"
                  alt="RACQ Insurance"
                  width={200}
                  height={80}
                  className="mb-6"
                />
                <h2 className="text-2xl font-bold mb-6">About RACQ</h2>
                <div className="space-y-4 text-blue-100">
                  <p>
                    <strong className="text-white">Founded:</strong> {racqHistory.founded}
                  </p>
                  <p>
                    <strong className="text-white">Type:</strong> {racqHistory.type}
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> {racqHistory.headquarters}
                  </p>
                  <p>
                    <strong className="text-white">Members:</strong> {racqHistory.members}
                  </p>
                  <p>
                    <strong className="text-white">Revenue:</strong> {racqHistory.revenue}
                  </p>
                  <p>
                    <strong className="text-white">Employees:</strong> {racqHistory.employees}
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> {racqHistory.market_position}
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
              <h2 className="text-3xl font-bold mb-8">RACQ History</h2>
              <div className="prose prose-lg">
                <p>
                  The Royal Automobile Club of Queensland (RACQ) was founded in 1905, making it one of
                  Australia's oldest motoring organisations. Initially established to represent the
                  interests of Queensland motorists, RACQ has evolved over more than a century into
                  Queensland's largest club and mutual organisation.
                </p>
                <p>
                  Starting with just a handful of members advocating for better roads and motorist rights,
                  RACQ expanded its services to include roadside assistance in the 1920s. The organisation
                  entered the insurance market in 1970, recognising the need to provide comprehensive
                  protection for its members beyond just roadside assistance.
                </p>
                <p>
                  As a mutual organisation, RACQ operates for the benefit of its members rather than
                  shareholders. This unique structure has allowed RACQ to focus on delivering value and
                  service excellence to Queensland families and businesses. Today, RACQ Insurance is one
                  of Queensland's most trusted insurers, offering home, motor, and travel insurance.
                </p>
                <p>
                  RACQ's deep understanding of Queensland's unique weather patterns and natural disaster
                  risks makes them an ideal partner for disaster recovery services. Their commitment to
                  supporting members through cyclones, floods, and storms aligns perfectly with our
                  restoration capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RACQ Insurance Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">RACQ Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver priority restoration services across RACQ's insurance portfolio,
                with special focus on Queensland's unique weather-related claims.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {racqProducts.map((product, index) => (
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
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for RACQ</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Queensland Storm Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Specialist capabilities for Queensland's severe weather:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Cyclone damage restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Flash flood recovery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Hail damage repairs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Storm surge restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Tropical moisture damage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Member Priority Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Enhanced service for RACQ's 1.7 million members:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Priority emergency response</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Dedicated RACQ claims team</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Member satisfaction guarantee</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Direct billing to RACQ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>24/7 member hotline</span>
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
                      <span>30-minute response for emergencies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Queensland-based response teams</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Storm season readiness program</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Member outcome focus</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Total Claims Handled</span>
                        <span className="font-semibold">4,200+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Storm Response</span>
                        <span className="font-semibold">1,800+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Member Satisfaction</span>
                        <span className="font-semibold">98.9%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '98.9%'}}></div>
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
            <h2 className="text-3xl font-bold mb-4">RACQ Member Emergency Line</h2>
            <p className="text-xl mb-8">
              Priority restoration services for RACQ insurance members across Queensland
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