import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';
import {
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Shield,
  FileText,
  Network,
  Star,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NRPG - National Restoration Professionals Group | Australia\'s Leading Network',
  description: 'Join Australia\'s premier restoration professionals network. Access industry standards, IICRC partnership, technical resources, and connect with certified Master Restorers across the nation.',
  keywords: 'NRPG, National Restoration Professionals Group, restoration contractors, IICRC Australia, disaster restoration network, professional restorers, water damage professionals, fire restoration contractors',
  openGraph: {
    title: 'NRPG - National Restoration Professionals Group',
    description: 'Australia\'s Leading Restoration Professionals Network',
    type: 'website',
  },
};

const benefits = [
  {
    icon: Award,
    title: 'IICRC Partnership',
    description: 'Direct access to IICRC standards, certifications, and continuing education credits through our partnership.',
  },
  {
    icon: BookOpen,
    title: 'Technical Resources',
    description: 'Comprehensive library of restoration techniques, industry best practices, and technical documentation.',
  },
  {
    icon: Network,
    title: 'Professional Network',
    description: 'Connect with certified professionals, share knowledge, and collaborate on complex restoration projects.',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Marketing support, lead generation opportunities, and business development resources for members.',
  },
  {
    icon: Shield,
    title: 'Industry Standards',
    description: 'Stay compliant with latest Australian standards and international best practices in restoration.',
  },
  {
    icon: FileText,
    title: 'Documentation Templates',
    description: 'Access proven templates for quotes, reports, safety protocols, and insurance documentation.',
  },
];

const membershipTiers = [
  {
    name: 'Associate Member',
    price: '$495',
    period: 'per year',
    features: [
      'Access to member directory',
      'Basic technical resources',
      'Industry news and updates',
      'Community forum access',
      'Monthly newsletter',
    ],
  },
  {
    name: 'Professional Member',
    price: '$995',
    period: 'per year',
    popular: true,
    features: [
      'All Associate benefits',
      'CARSI training discounts (20%)',
      'Advanced technical library',
      'Certification support',
      'Priority member support',
      'Marketing co-op opportunities',
      'Quarterly webinars',
    ],
  },
  {
    name: 'Master Member',
    price: '$1,995',
    period: 'per year',
    features: [
      'All Professional benefits',
      'CARSI training discounts (40%)',
      'Master Restorer pathway',
      'One-on-one mentoring',
      'Speaking opportunities',
      'Advanced certifications',
      'Leadership council access',
      'Premium listing in directory',
    ],
  },
];

const stats = [
  { label: 'Active Members', value: '500+' },
  { label: 'States Covered', value: '8' },
  { label: 'IICRC Certified', value: '95%' },
  { label: 'Years Experience', value: '15+' },
];

export default function NRPGPage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="nrpg" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-diagonal.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
              Est. 2009 - Trusted by 500+ Professionals
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Australia's Leading Restoration Professionals Network
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join the premier network of certified disaster restoration contractors.
              Access IICRC training, industry standards, and connect with Australia's best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8">
                Join NRPG Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" asChild>
                <Link href="/about-nrpg">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is NRPG */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">What is NRPG?</h2>
              <p className="text-xl text-gray-600">
                The National Restoration Professionals Group (NRPG) is Australia's premier membership
                organization for disaster restoration contractors and professionals.
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded in 2009 by Master Restorer Phill McGurk, NRPG brings together the best restoration
                professionals across Australia. We provide access to IICRC-accredited training, industry
                standards, technical resources, and a network of certified professionals committed to excellence.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our partnership with the IICRC (Institute of Inspection, Cleaning and Restoration Certification)
                ensures members stay at the forefront of restoration science and maintain the highest industry
                standards. Through CARSI (Cleaning and Restoration Science Institute), we deliver world-class
                continuing education and certification programs.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <Award className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">IICRC Approved Education Provider</h3>
                  <p className="text-gray-700">
                    NRPG is an official IICRC Approved Education Provider, offering accredited courses
                    and continuing education credits (CECs) to maintain your professional certifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Contractors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Benefits for Contractors</h2>
            <p className="text-xl text-gray-600">
              Everything you need to grow your restoration business and maintain professional excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Membership Options</h2>
            <p className="text-xl text-gray-600">
              Choose the membership level that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-blue-600 border-2 shadow-xl' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-6">
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-gray-600 ml-2">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    {tier.popular ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IICRC Partnership */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                <Award className="h-10 w-10 text-blue-900" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6">IICRC Partnership Excellence</h2>
            <p className="text-xl text-blue-100 mb-8">
              As an IICRC Approved Education Provider, NRPG delivers internationally recognized
              certifications and continuing education that keeps you at the forefront of restoration science.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Star className="h-8 w-8 mb-3 mx-auto" />
                <h3 className="font-bold mb-2">Accredited Training</h3>
                <p className="text-blue-100">IICRC-approved courses and certifications</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Star className="h-8 w-8 mb-3 mx-auto" />
                <h3 className="font-bold mb-2">CECs Available</h3>
                <p className="text-blue-100">Maintain your professional credentials</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Star className="h-8 w-8 mb-3 mx-auto" />
                <h3 className="font-bold mb-2">Global Standards</h3>
                <p className="text-blue-100">International best practices and protocols</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Directory Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Connect with Members</h2>
              <p className="text-xl text-gray-600">
                Access our directory of certified restoration professionals across Australia
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-center gap-6 mb-6">
                <Users className="h-12 w-12 text-blue-600" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Member Directory</h3>
                  <p className="text-gray-600">
                    Search and connect with 500+ certified restoration professionals
                  </p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Filter by location, specialty, and certification level</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Direct contact with verified professionals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Collaborate on large-scale projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Referral network for out-of-area work</span>
                </li>
              </ul>
              <Button className="w-full" size="lg" asChild>
                <Link href="/contractor-portal">Access Member Directory</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Australia's Best?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join 500+ restoration professionals who trust NRPG for training, resources, and professional growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Join NRPG Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/training">View Training Courses</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Questions? Contact us at{' '}
              <a href="mailto:info@nrpg.com.au" className="text-blue-600 hover:underline">
                info@nrpg.com.au
              </a>{' '}
              or call{' '}
              <a href="tel:1300123456" className="text-blue-600 hover:underline">
                1300 123 456
              </a>
            </p>
          </div>
        </div>
      </section>

      </div>
    </>
  );
}
