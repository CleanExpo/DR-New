import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IAG Insurance Partner | Insurance Australia Group | Disaster Recovery',
  description: 'IAG - Insurance Australia Group partnership with Disaster Recovery. NRMA, CGU, SGIO, SGIC, Swann Insurance and more. Preferred restoration contractor since 2015.',
  keywords: ["IAG insurance", "Insurance Australia Group", "NRMA Insurance", "CGU", "SGIO", "SGIC", "Swann Insurance", "disaster recovery partner"],
};

export default function IAGPartnerPage() {
  const iagBrands = [
    {
      name: 'NRMA Insurance',
      description: 'Leading general insurance provider in NSW and Queensland',
      established: '1925',
      focus: 'Motor, home and business insurance',
      marketShare: '8.4% of Australian general insurance market'
    },
    {
      name: 'CGU Insurance',
      description: 'Commercial and personal insurance specialist',
      established: '1851',
      focus: 'Business, farm, and specialist insurance',
      marketShare: 'Largest intermediated commercial insurer in Australia'
    },
    {
      name: 'SGIO',
      description: 'Western Australia\'s leading general insurer',
      established: '1926',
      focus: 'Motor and home insurance in WA',
      marketShare: 'Largest motor insurer in Western Australia'
    },
    {
      name: 'SGIC',
      description: 'South Australia\'s trusted insurance provider',
      established: '1971',
      focus: 'Motor and home insurance in SA',
      marketShare: 'Leading insurer in South Australia'
    },
    {
      name: 'Swann Insurance',
      description: 'Specialist motorcycle and scooter insurance',
      established: '1984',
      focus: 'Motorcycle, scooter and specialist vehicle insurance',
      marketShare: 'Australia\'s leading motorcycle insurer'
    },
    {
      name: 'WFI Insurance',
      description: 'Rural and regional Australia specialist',
      established: '1919',
      focus: 'Farm, crop, and rural business insurance',
      marketShare: 'Leading rural insurer in Australia'
    }
  ];

  const partnershipBenefits = [
    {
      title: 'Rapid Response Network',
      description: 'Direct integration with IAG\'s claim systems for immediate deployment',
      icon: TrendingUp
    },
    {
      title: 'Dedicated Account Management',
      description: 'Specialised teams for each IAG brand ensuring consistent service delivery',
      icon: Users
    },
    {
      title: 'Technology Integration',
      description: 'API connections for real-time updates and seamless claim processing',
      icon: Globe
    },
    {
      title: 'Quality Assurance',
      description: 'Regular audits and performance reviews maintaining highest standards',
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
            { label: 'IAG Insurance' }
          ]}
        />
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Preferred Restoration Partner Since 2015</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  IAG Insurance Partnership
                </h1>

                <p className="text-xl text-blue-100 mb-8">
                  Trusted by Insurance Australia Group and all their subsidiaries for comprehensive
                  disaster recovery and restoration services across Australia.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Our IAG Team
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
                <h2 className="text-2xl font-bold mb-6">About IAG</h2>
                <div className="space-y-4 text-blue-100">
                  <p>
                    <strong className="text-white">Founded:</strong> 1999 (through merger)
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> Sydney, Australia
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> Largest general insurance group in Australia and New Zealand
                  </p>
                  <p>
                    <strong className="text-white">Customers:</strong> Over 8.5 million
                  </p>
                  <p>
                    <strong className="text-white">Employees:</strong> 15,000+ across Australia and New Zealand
                  </p>
                  <p>
                    <strong className="text-white">Annual GWP:</strong> $13.3 billion (2023)
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
              <h2 className="text-3xl font-bold mb-8">IAG Company History</h2>
              <div className="prose prose-lg">
                <p>
                  Insurance Australia Group (IAG) was formed in 1999 through the merger of NRMA Insurance,
                  SGIO and SGIC. Since its formation, IAG has grown to become the largest general insurance
                  group in Australia and New Zealand, with a growing presence in Asia.
                </p>
                <p>
                  The group's history dates back to 1851 with the establishment of some of its subsidiary
                  brands. Over the decades, IAG has built a portfolio of trusted insurance brands that
                  serve millions of customers across personal and commercial insurance markets.
                </p>
                <p>
                  Today, IAG is an ASX 20 company with operations throughout Australia, New Zealand and Asia.
                  The group's purpose is to make your world a safer place, whether that's through supporting
                  communities in times of need, helping people manage risk, or working with partners like
                  Disaster Recovery to restore homes and businesses after disasters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IAG Brands */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">IAG Insurance Brands</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We proudly serve all IAG subsidiaries with specialised restoration services tailored to each brand's unique requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iagBrands.map((brand, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{brand.name}</span>
                      <Building2 className="w-5 h-5 text-blue-600" />
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

        {/* Partnership Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Partnership Excellence</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipBenefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Commitment */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to IAG Policyholders</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Service Standards</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Priority response for all IAG brand policyholders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Direct billing arrangements with all IAG entities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Dedicated IAG relationship managers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Real-time claim status updates</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">98.7%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '98.7%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Response Time Compliance</span>
                        <span className="font-semibold">99.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '99.2%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">First-Time Fix Rate</span>
                        <span className="font-semibold">94.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '94.5%'}}></div>
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
            <h2 className="text-3xl font-bold mb-4">IAG Policyholder Emergency Line</h2>
            <p className="text-xl mb-8">
              24/7 priority response for all IAG insurance brand customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
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