import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, Award, TrendingUp, Phone, Globe, Calendar, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insurance Partners | Preferred Insurance Contractors | Disaster Recovery',
  description: 'Disaster Recovery is a preferred restoration contractor for major insurance companies including IAG, Suncorp, QBE, RACQ, Allianz, and more. 24/7 emergency response.',
  keywords: ["insurance partners", "preferred contractors", "insurance restoration", "IAG", "Suncorp", "QBE", "RACQ", "disaster recovery"],
};

export default function InsurancePartnersPage() {
  const majorPartners = [
    {
      name: 'IAG Insurance',
      slug: 'iag',
      logo: '/images/insurance-logos/IAG Insurance.png',
      description: 'Australia\'s largest general insurance group',
      brands: ['NRMA', 'CGU', 'SGIO', 'SGIC', 'Swann', 'WFI'],
      partnership: 'Preferred Partner Since 2015',
      claims: '15,000+ claims handled'
    },
    {
      name: 'Suncorp Group',
      slug: 'suncorp',
      logo: '/images/insurance-logos/Suncorp Insurance.png',
      description: 'Leading insurance and financial services',
      brands: ['AAMI', 'GIO', 'Apia', 'Vero', 'Shannons', 'Bingle'],
      partnership: 'Platinum Partner Since 2008',
      claims: '20,000+ claims handled'
    },
    {
      name: 'QBE Insurance',
      slug: 'qbe',
      logo: '/images/insurance-logos/QBE Insurance.png',
      description: 'Global commercial insurance leader',
      brands: ['QBE Business', 'QBE Specialty', 'QBE Strata'],
      partnership: 'Platinum Partner Since 2012',
      claims: '12,000+ claims handled'
    },
    {
      name: 'RACQ',
      slug: 'racq',
      logo: '/images/insurance-logos/RACQ Insurance.png',
      description: 'Queensland\'s largest mutual insurer',
      brands: ['Home', 'Motor', 'Travel', 'Business'],
      partnership: 'Platinum Partner Since 2010',
      claims: '10,000+ claims handled'
    },
    {
      name: 'Allianz',
      slug: 'allianz',
      logo: '/images/insurance-logos/Allianz Insurance.png',
      description: 'World\'s largest insurance company',
      brands: ['Commercial', 'Personal', 'Specialty', 'Entertainment'],
      partnership: 'Gold Partner Since 2014',
      claims: '8,000+ claims handled'
    },
    {
      name: 'Zurich',
      slug: 'zurich',
      logo: '/images/insurance-logos/Zurich insurance.png',
      description: 'Global insurance and risk management',
      brands: ['Commercial Property', 'Construction', 'Marine', 'Liability'],
      partnership: 'Gold Partner Since 2013',
      claims: '6,000+ claims handled'
    }
  ];

  const commercialPartners = [
    {
      name: 'AIG Insurance',
      slug: 'aig',
      logo: '/images/insurance-logos/AIG Insurance.png',
      description: 'Global commercial insurance specialist',
      partnership: 'Silver Partner'
    },
    {
      name: 'Chubb Insurance',
      slug: 'chubb',
      logo: '/images/insurance-logos/Chubb Insurance.png',
      description: 'World\'s largest publicly traded P&C insurer',
      partnership: 'Silver Partner'
    },
    {
      name: 'Guild Insurance',
      slug: 'guild',
      logo: '/images/insurance-logos/Guild Insurance.png',
      description: 'Specialist professional indemnity insurer',
      partnership: 'Partner'
    },
    {
      name: 'Ansvar Insurance',
      slug: 'ansvar',
      logo: '/images/insurance-logos/Ansvar Insurance.png',
      description: 'Community and faith sector specialist',
      partnership: 'Partner'
    },
    {
      name: 'Hollard Insurance',
      slug: 'hollards',
      logo: '/images/insurance-logos/Hollard Insurance.png',
      description: 'Innovative insurance solutions provider',
      partnership: 'Gold Partner Since 2016'
    },
    {
      name: 'Wesfarmers Insurance',
      slug: 'wesfarmers',
      logo: '/images/insurance-logos/Westfarmers insurance.png',
      description: 'WFI, Lumley, OAMPS insurance group',
      partnership: 'Silver Partner Since 2019'
    }
  ];

  const benefits = [
    {
      title: 'Direct Billing',
      description: 'No upfront costs for policyholders',
      icon: CheckCircle
    },
    {
      title: 'Priority Response',
      description: '24/7 emergency service for all partners',
      icon: TrendingUp
    },
    {
      title: 'Dedicated Teams',
      description: 'Specialised teams for each insurer',
      icon: Users
    },
    {
      title: 'Digital Integration',
      description: 'Seamless claims processing systems',
      icon: Globe
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Partners' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6">
                Trusted Insurance Partners
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Disaster Recovery is a preferred restoration contractor for Australia's leading
                insurance companies. With partnerships spanning over 15 years, we deliver
                exceptional service to millions of policyholders across the nation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  1300 309 361
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Lodge a Claim
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-8 bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-900">18+</p>
                <p className="text-gray-600">Insurance Partners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-900">100,000+</p>
                <p className="text-gray-600">Claims Processed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-900">15+ Years</p>
                <p className="text-gray-600">Partnership Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-900">98.7%</p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Major Partners */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Major Insurance Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platinum and gold partnerships with Australia's largest insurers ensure
                priority service and seamless claims processing for millions of policyholders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {majorPartners.map((partner) => (
                <Link
                  key={partner.slug}
                  href={`/insurance-partners/${partner.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={120}
                          height={60}
                          className="object-contain"
                        />
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <CardTitle>{partner.name}</CardTitle>
                      <CardDescription>{partner.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-blue-600 font-semibold mb-2">
                        {partner.partnership}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        Brands: {partner.brands.join(', ')}
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        {partner.claims}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial & Specialty Partners */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Commercial & Specialty Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialised restoration services for commercial, corporate, and niche insurance markets.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercialPartners.map((partner) => (
                <Link
                  key={partner.slug}
                  href={`/insurance-partners/${partner.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={100}
                          height={50}
                          className="object-contain"
                        />
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <CardDescription>{partner.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-blue-600 font-semibold">
                        {partner.partnership}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits for Policyholders */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits for Policyholders</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Process */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How Our Insurance Partnerships Work</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Claim Lodgement</h3>
                    <p className="text-gray-600">
                      Policyholders contact their insurer to lodge a claim. The insurer immediately
                      notifies us as their preferred restoration contractor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Emergency Response</h3>
                    <p className="text-gray-600">
                      We contact the policyholder within 30 minutes and dispatch our emergency
                      response team to assess and mitigate damage immediately.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Direct Billing</h3>
                    <p className="text-gray-600">
                      We handle all paperwork and bill the insurance company directly. Policyholders
                      have no upfront costs for approved claims.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Complete Restoration</h3>
                    <p className="text-gray-600">
                      Our certified technicians complete the restoration work to the highest standards,
                      keeping both the policyholder and insurer updated throughout the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Insurance Claim Emergency?</h2>
            <p className="text-xl mb-8">
              We work with all major insurance companies. Call now for immediate assistance
              with your insurance claim.
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
                Submit Claim Online
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}