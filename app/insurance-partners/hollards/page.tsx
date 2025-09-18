import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hollard Insurance Partner | The Hollard Insurance Company | Disaster Recovery',
  description: 'Hollard Insurance partnership with Disaster Recovery. Specialist in white-label insurance, pet insurance, and commercial solutions. Gold partner since 2016.',
  keywords: ["Hollard insurance", "The Hollard Insurance Company", "pet insurance", "white label insurance", "disaster recovery partner"],
};

export default function HollardsPartnerPage() {
  const hollardProducts = [
    {
      name: 'Pet Insurance',
      description: 'Leading pet insurance provider in Australia',
      established: '2013 (Australia)',
      focus: 'Comprehensive pet health insurance',
      marketShare: 'One of Australia\'s fastest-growing pet insurers'
    },
    {
      name: 'Woolworths Insurance',
      description: 'White-label insurance partnership',
      established: '2014',
      focus: 'Car, home, contents, and travel insurance',
      marketShare: 'Major retail insurance partnership'
    },
    {
      name: 'Real Insurance',
      description: 'Direct-to-consumer insurance brand',
      established: 'Acquired 2017',
      focus: 'Life, income protection, funeral insurance',
      marketShare: 'Leading online direct insurer'
    },
    {
      name: 'Steadfast Underwriting Agencies',
      description: 'Commercial insurance solutions',
      established: 'Partnership 2016',
      focus: 'Specialised commercial and business insurance',
      marketShare: 'Key broker network partner'
    },
    {
      name: 'Tic:Toc Home Loans Insurance',
      description: 'Digital mortgage insurance solutions',
      established: '2017',
      focus: 'Home loan and mortgage protection',
      marketShare: 'Digital-first insurance provider'
    }
  ];

  const partnershipBenefits = [
    {
      title: 'Agile Response',
      description: 'Flexible service delivery matching Hollard\'s innovative approach',
      icon: TrendingUp
    },
    {
      title: 'Digital Integration',
      description: 'Seamless connection with Hollard\'s digital-first platforms',
      icon: Globe
    },
    {
      title: 'Specialist Teams',
      description: 'Dedicated resources for pet damage and unique claims',
      icon: Users
    },
    {
      title: 'Innovation Partners',
      description: 'Collaborative approach to new restoration technologies',
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
            { label: 'Hollard Insurance' }
          ]}
        />
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Gold Partner Since 2016</span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Hollard Insurance Partnership
                </h1>

                <p className="text-xl text-purple-100 mb-8">
                  Trusted restoration partner for The Hollard Insurance Company, supporting their
                  innovative insurance solutions across Australia with specialised restoration services.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Hollard Team
                  </Link>
                  <Link
                    href="/insurance-partners"
                    className="inline-flex items-center bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View All Partners
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">About Hollard</h2>
                <div className="space-y-4 text-purple-100">
                  <p>
                    <strong className="text-white">Founded:</strong> 1980 (South Africa), 1999 (Australia)
                  </p>
                  <p>
                    <strong className="text-white">Headquarters:</strong> Sydney, Australia
                  </p>
                  <p>
                    <strong className="text-white">Global Presence:</strong> Operations in 8 countries
                  </p>
                  <p>
                    <strong className="text-white">Customers:</strong> Over 1.8 million in Australia
                  </p>
                  <p>
                    <strong className="text-white">Specialisation:</strong> White-label and affinity insurance
                  </p>
                  <p>
                    <strong className="text-white">Annual GWP:</strong> $1.2 billion (Australia, 2023)
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
              <h2 className="text-3xl font-bold mb-8">Hollard Insurance History</h2>
              <div className="prose prose-lg">
                <p>
                  The Hollard Insurance Company was founded in Johannesburg, South Africa in 1980 by
                  Robert Enthoven. The company pioneered the concept of insurance partnerships with
                  retail brands, creating innovative distribution models that made insurance more
                  accessible to consumers.
                </p>
                <p>
                  Hollard entered the Australian market in 1999, bringing their unique partnership
                  approach to the local insurance industry. They quickly established themselves as
                  specialists in white-label insurance solutions, partnering with major retailers,
                  banks, and other organisations to offer branded insurance products.
                </p>
                <p>
                  In Australia, Hollard has become particularly known for their innovative pet insurance
                  offerings and their partnerships with major brands like Woolworths. They've also made
                  strategic acquisitions, including Real Insurance in 2017, expanding their direct-to-consumer
                  presence.
                </p>
                <p>
                  Today, Hollard is one of the largest privately-owned insurance groups internationally,
                  with a presence in multiple countries. In Australia, they continue to focus on innovation,
                  partnerships, and providing insurance solutions that meet evolving consumer needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hollard Products & Partnerships */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hollard Insurance Products</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide specialised restoration services across Hollard's diverse insurance portfolio,
                including unique capabilities for pet-related damage claims.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hollardProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <Building2 className="w-5 h-5 text-purple-600" />
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

        {/* Unique Capabilities */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Specialised Services for Hollard</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Pet Damage Restoration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    As Hollard is a leader in pet insurance, we've developed specialised capabilities for
                    pet-related property damage:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Odour elimination and sanitisation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Carpet and flooring restoration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Furniture and upholstery cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Garden and landscaping repairs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Digital-First Service Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Aligned with Hollard's digital innovation, we offer:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Online claim lodgement and tracking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Real-time photo and video updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Digital documentation and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>API integration for seamless claims processing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Excellence */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Partnership Excellence</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partnershipBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">98.5%</div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">45 min</div>
                  <div className="text-gray-600">Average Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5,000+</div>
                  <div className="text-gray-600">Claims Processed (2023)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Hollard Policyholder Support</h2>
            <p className="text-xl mb-8">
              24/7 emergency restoration services for all Hollard insurance customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-600 transition-colors"
              >
                Submit a Claim
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}