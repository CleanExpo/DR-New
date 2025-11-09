import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LogIn,
  UserPlus,
  BookOpen,
  GraduationCap,
  FileText,
  Download,
  TrendingUp,
  Users,
  MessageSquare,
  Bell,
  Award,
  Shield,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contractor Portal - Resources for Restoration Professionals | NRPG & CARSI',
  description: 'Access NRPG member resources, CARSI training courses, IICRC standards, technical documentation, and professional networking for restoration contractors across Australia.',
  keywords: 'contractor portal, restoration resources, NRPG members, CARSI training, IICRC standards, restoration professionals, contractor network, technical documentation',
  openGraph: {
    title: 'Contractor Portal - Professional Resources',
    description: 'Access training, resources, and networking for restoration professionals',
    type: 'website',
  },
};

const portalSections = [
  {
    icon: GraduationCap,
    title: 'CARSI Training Access',
    description: 'Access all your enrolled courses, track CEC hours, and continue your professional education.',
    features: [
      'Active course dashboard',
      'CEC hours tracking',
      'Certificate downloads',
      'Course materials library',
    ],
    cta: 'Access Training',
    href: '/carsi',
    color: 'green',
  },
  {
    icon: Users,
    title: 'NRPG Member Resources',
    description: 'Exclusive resources, templates, and tools available only to NRPG members.',
    features: [
      'Member directory search',
      'Business templates',
      'Marketing materials',
      'Industry benchmarks',
    ],
    cta: 'Member Resources',
    href: '/nrpg',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'Technical Documentation',
    description: 'Complete library of IICRC standards, restoration guides, and technical references.',
    features: [
      'IICRC S500 Water Damage',
      'IICRC S520 Mould Remediation',
      'IICRC S700 Fire & Smoke',
      'Best practice guides',
    ],
    cta: 'Browse Library',
    href: '#',
    color: 'purple',
  },
  {
    icon: MessageSquare,
    title: 'Peer Network Forum',
    description: 'Connect with fellow professionals, ask questions, and share expertise.',
    features: [
      'Technical discussions',
      'Project collaboration',
      'Equipment recommendations',
      'Problem solving community',
    ],
    cta: 'Join Discussion',
    href: '#',
    color: 'orange',
  },
];

const benefits = [
  {
    icon: Award,
    title: 'Professional Credentials',
    description: 'Maintain and showcase your IICRC certifications and continuing education.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'Access extensive library of restoration techniques and industry standards.',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Tools and resources to help grow your restoration business.',
  },
  {
    icon: Shield,
    title: 'Industry Standards',
    description: 'Stay compliant with latest IICRC and Australian standards.',
  },
];

const quickLinks = [
  { title: 'My Courses', icon: GraduationCap, href: '/carsi' },
  { title: 'Member Directory', icon: Users, href: '/nrpg' },
  { title: 'IICRC Standards', icon: FileText, href: '#' },
  { title: 'Forum', icon: MessageSquare, href: '#' },
  { title: 'My Certificates', icon: Award, href: '#' },
  { title: 'Support', icon: Bell, href: '#' },
];

export default function ContractorPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-diagonal.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-700 hover:bg-blue-800">
              Professional Resources Hub
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Resources for Restoration Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Access NRPG member resources, CARSI training, IICRC standards, and connect
              with Australia's restoration professional community.
            </p>

            {/* Login/Register CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-lg px-8">
                <LogIn className="mr-2 h-5 w-5" />
                Member Login
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                <UserPlus className="mr-2 h-5 w-5" />
                Register Account
              </Button>
            </div>

            <p className="text-sm text-gray-400">
              Not a member yet?{' '}
              <Link href="/nrpg" className="text-blue-400 hover:underline">
                Join NRPG
              </Link>{' '}
              or{' '}
              <Link href="/carsi" className="text-green-400 hover:underline">
                enroll in CARSI courses
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-center text-lg font-semibold mb-6 text-gray-600">Quick Access</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <link.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm text-center text-gray-700 group-hover:text-blue-600">
                    {link.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portal Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Portal Features</h2>
            <p className="text-xl text-gray-600">
              Everything you need to advance your restoration career in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {portalSections.map((section, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`h-14 w-14 bg-${section.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <section.icon className={`h-7 w-7 text-${section.color}-600`} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{section.title}</CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={section.href}>
                      {section.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Join the Contractor Portal?</h2>
              <p className="text-xl text-gray-600">
                Access professional resources that help you grow your business and expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IICRC Standards Download */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                  <Download className="h-12 w-12 text-blue-900" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">IICRC Standards Library</h2>
                <p className="text-xl text-blue-100 mb-6">
                  Access the complete IICRC standards library including S500, S520, S700, and more.
                  Stay compliant and reference industry best practices on every job.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                    <Download className="mr-2 h-5 w-5" />
                    Download Standards
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Available Documents
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry News & Updates */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Industry News & Updates</h2>
              <p className="text-xl text-gray-600">
                Stay informed with the latest restoration industry news, standards updates, and best practices
              </p>
            </div>

            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">New Standard</Badge>
                      <CardTitle className="text-xl mb-2">
                        IICRC S500 5th Edition Released
                      </CardTitle>
                      <CardDescription>
                        Updated water damage restoration standard with new drying protocols and documentation requirements.
                      </CardDescription>
                    </div>
                    <Bell className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">Training Update</Badge>
                      <CardTitle className="text-xl mb-2">
                        New CARSI Course: Advanced Structural Drying
                      </CardTitle>
                      <CardDescription>
                        Now available - ASD certification course with 21 CEC hours. Learn advanced psychrometry and complex drying scenarios.
                      </CardDescription>
                    </div>
                    <Bell className="h-6 w-6 text-green-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0" asChild>
                    <Link href="/carsi">
                      Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">Community</Badge>
                      <CardTitle className="text-xl mb-2">
                        NRPG Annual Conference 2024
                      </CardTitle>
                      <CardDescription>
                        Join 300+ restoration professionals for networking, training, and industry updates. Early bird registration now open.
                      </CardDescription>
                    </div>
                    <Bell className="h-6 w-6 text-purple-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-200">
                Join Australia's leading restoration professional network and training platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* NRPG Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <CardHeader>
                  <div className="h-16 w-16 bg-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Join NRPG</CardTitle>
                  <CardDescription className="text-gray-200">
                    Access member resources, networking, and exclusive benefits for restoration professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Member directory access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Business development resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>20-40% CARSI training discounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Industry advocacy and support</span>
                    </li>
                  </ul>
                  <Button size="lg" className="w-full bg-blue-700 hover:bg-blue-800" asChild>
                    <Link href="/nrpg">
                      Join NRPG
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* CARSI Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <CardHeader>
                  <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Enroll in CARSI</CardTitle>
                  <CardDescription className="text-gray-200">
                    IICRC-approved online training courses to earn CECs and advance your certifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>6 IICRC-approved courses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Earn up to 91 CEC hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Flexible online learning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Expert Master Restorer instruction</span>
                    </li>
                  </ul>
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/carsi">
                      Browse Courses
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-gray-200 mt-8">
              Need help?{' '}
              <a href="mailto:support@nrpg.com.au" className="text-white underline hover:no-underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NRPG Contractor Portal',
            description: 'Professional resources portal for restoration contractors including training, standards, and networking',
            url: 'https://dr-new-ten.vercel.app/contractor-portal',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              category: 'Professional Services',
            },
            featureList: [
              'CARSI Training Access',
              'NRPG Member Resources',
              'IICRC Standards Library',
              'Professional Networking',
              'CEC Hours Tracking',
              'Technical Documentation',
            ],
          }),
        }}
      />
    </div>
  );
}
