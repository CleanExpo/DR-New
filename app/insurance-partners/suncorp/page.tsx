import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Suncorp Insurance Partner | Suncorp Group | Disaster Recovery',
  description: 'Suncorp Group partnership with Disaster Recovery. AAMI, GIO, Apia, Shannons, Vero and more. Platinum restoration partner since 2008.',
  keywords: ["Suncorp insurance", "Suncorp Group", "AAMI", "GIO", "Apia", "Shannons", "Vero Insurance", "disaster recovery partner"],
};

export default function SuncorpPartnerPage() {
  const suncorpBrands = [
    {
      name: 'AAMI',
      description: 'Australia\'s most recognised general insurance brand',
      established: '1970',
      focus: 'Motor, home and business insurance',
      marketShare: 'Leading motor insurer with over 3 million customers'
    },
    {
      name: 'GIO',
      description: 'NSW\'s trusted insurance provider for over 95 years',
      established: '1927',
      focus: 'Comprehensive motor and home insurance in NSW',
      marketShare: 'One of NSW\'s largest general insurers'
    },
    {
      name: 'Apia',
      description: 'Specialist insurance for over 50s',
      established: '1970',
      focus: 'Tailored insurance solutions for mature Australians',
      marketShare: 'Australia\'s leading over 50s insurance specialist'
    },
    {
      name: 'Shannons',
      description: 'Insurance for motoring enthusiasts',
      established: '1971',
      focus: 'Classic cars, hot rods, and motorcycle insurance',
      marketShare: 'Australia\'s largest enthusiast vehicle insurer'
    },
    {
      name: 'Vero',
      description: 'Commercial and personal insurance solutions',
      established: '1833',
      focus: 'Business, commercial property, and liability insurance',
      marketShare: 'Top 3 commercial insurer in Australia'
    },
    {
      name: 'Bingle',
      description: 'Online direct car insurance',
      established: '2007',
      focus: 'Digital-first car insurance',
      marketShare: 'Leading online car insurance provider'
    },
    {
      name: 'Terri Scheer',
      description: 'Landlord insurance specialist',
      established: '1995',
      focus: 'Investment property and landlord insurance',
      marketShare: 'Australia\'s leading landlord insurance specialist'
    }
  ];

  const partnershipHighlights = [
    {
      title: 'Platinum Partnership',
      description: 'Highest tier partnership status with priority service agreements',
      icon: Award
    },
    {
      title: 'Integrated Systems',
      description: 'Direct API integration with Suncorp\'s claim management platform',
      icon: Globe
    },
    {
      title: 'Dedicated Teams',
      description: 'Specialised restoration teams for each Suncorp brand',
      icon: Users
    },
    {
      title: '15+ Year Partnership',
      description: 'Long-standing trusted relationship since 2008',
      icon: Calendar
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Platinum Partner Since 2008</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Suncorp Group Partnership
                </h1>

                <p className="text-xl text-orange-100 mb-8">
                  Preferred restoration provider for Suncorp Group, serving millions of policyholders
                  across Australia through their extensive portfolio of trusted insurance brands.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Suncorp Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Suncorp Group</h2>
                <div className="space-y-4 text-orange-100">
                  <p>
                    <strong className="text-white">Founded:</strong> 1902
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> Brisbane, Australia
                  </p>
                  <p>
                    <strong className="text-white">Market Position:</strong> One of Australia's largest insurers
                  </p>
                  <p>
                    <strong className="text-white">Customers:</strong> Over 9 million
                  </p>
                  <p>
                    <strong className="text-white">Employees:</strong> 13,000+ across Australia and New Zealand
                  </p>
                  <p>
                    <strong className="text-white">Annual GWP:</strong> $9.7 billion (2023)
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
              <h2 className="text-3xl font-bold mb-8">Suncorp Group History</h2>
              <div className="prose prose-lg">
                <p>
                  Suncorp Group traces its roots back to 1902 with the formation of the Queensland Farmers
                  Co-operative Association. Over more than 120 years, Suncorp has evolved from a small
                  agricultural co-operative into one of Australia and New Zealand's largest financial services
                  companies.
                </p>
                <p>
                  The modern Suncorp Group was formed through the 1996 merger of Suncorp, Metway Bank and
                  Queensland Industry Development Corporation (QIDC). This created a diversified financial
                  services company spanning insurance, banking, and wealth management.
                </p>
                <p>
                  Through strategic acquisitions including GIO (1999), AMP's general insurance business (2001),
                  and Promina Group (2007), Suncorp has built an impressive portfolio of insurance brands that
                  serve diverse customer segments across Australia and New Zealand.
                </p>
                <p>
                  Today, Suncorp Group is an ASX 20 company focused on insurance, with the recent sale of its
                  banking arm to ANZ allowing it to concentrate on being Australia's leading general insurance
                  company. The group's purpose remains to build futures and protect what matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Suncorp Brands */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Suncorp Insurance Brands</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver exceptional restoration services to all Suncorp Group brands, ensuring consistent quality across their entire portfolio.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suncorpBrands.map((brand, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{brand.name}</span>
                      <Building2 className="w-5 h-5 text-orange-600" />
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
              {partnershipHighlights.map((highlight, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4">
                      <highlight.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Excellence */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Suncorp Policyholders</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Platinum Service Standards</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Guaranteed response times for all Suncorp brands</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Direct claim lodgement through Suncorp systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Dedicated Suncorp account management team</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Brand-specific service protocols</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Regular performance reviews and quality audits</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2023 Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-semibold">99.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '99.1%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">SLA Compliance</span>
                        <span className="font-semibold">99.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '99.5%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Claims Processed</span>
                        <span className="font-semibold">15,000+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Average Response Time</span>
                        <span className="font-semibold">&lt; 45 mins</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Suncorp Policyholder Priority Line</h2>
            <p className="text-xl mb-8">
              24/7 emergency response for all Suncorp Group insurance customers
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
                className="inline-flex items-center justify-center bg-orange-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors"
              >
                Submit Claim
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}