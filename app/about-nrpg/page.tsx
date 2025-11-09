import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Award,
  Users,
  TrendingUp,
  Shield,
  BookOpen,
  Target,
  Heart,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Star,
  Globe,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NRPG - National Restoration Professionals Group | Mission & Leadership',
  description: 'Learn about NRPG\'s mission to elevate restoration standards across Australia. Founded by Master Restorer Phill McGurk in 2009. IICRC partnership, member benefits, and industry impact.',
  keywords: 'about NRPG, Phill McGurk, restoration professionals, IICRC partnership, restoration industry, professional network, disaster restoration',
  openGraph: {
    title: 'About NRPG - Mission & Leadership',
    description: 'Elevating restoration standards across Australia since 2009',
    type: 'website',
  },
};

const missionValues = [
  {
    icon: Shield,
    title: 'Excellence',
    description: 'Promoting the highest standards in disaster restoration through education, certification, and peer accountability.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a supportive network where restoration professionals collaborate, learn, and grow together.',
  },
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Providing world-class training and continuing education through IICRC-approved programs.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Advancing restoration science with cutting-edge techniques, technology, and industry best practices.',
  },
];

const benefits = [
  {
    category: 'Professional Development',
    items: [
      'IICRC-approved continuing education credits',
      'Access to Master Restorer mentoring',
      'Certification pathways and support',
      'Advanced training workshops',
      'Industry conference attendance',
    ],
  },
  {
    category: 'Business Resources',
    items: [
      'Marketing materials and co-op programs',
      'Business templates and documentation',
      'Insurance partnership opportunities',
      'Lead generation support',
      'Benchmarking and performance metrics',
    ],
  },
  {
    category: 'Technical Support',
    items: [
      'Complete IICRC standards library',
      'Technical consultation hotline',
      '24/7 peer network support',
      'Equipment recommendations',
      'Project troubleshooting assistance',
    ],
  },
  {
    category: 'Networking',
    items: [
      'Member directory with 500+ professionals',
      'Regional chapter meetings',
      'Online community forum',
      'Collaboration on large projects',
      'Referral network nationwide',
    ],
  },
];

const impact = [
  {
    stat: '500+',
    label: 'Active Members',
    description: 'Restoration professionals across Australia',
  },
  {
    stat: '15',
    label: 'Years',
    description: 'Elevating industry standards',
  },
  {
    stat: '95%',
    label: 'IICRC Certified',
    description: 'Members maintain current certifications',
  },
  {
    stat: '$50M+',
    label: 'Projects',
    description: 'Completed by members annually',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    company: 'Clean Slate Restoration',
    location: 'Sydney, NSW',
    quote: 'NRPG transformed my business. The training, resources, and network connections helped me grow from a solo operator to a team of 8 in just 3 years.',
  },
  {
    name: 'David Chen',
    company: 'Rapid Response Restoration',
    location: 'Melbourne, VIC',
    quote: 'The technical support and IICRC training through NRPG gave me the confidence to take on complex commercial projects. The ROI has been incredible.',
  },
  {
    name: 'Emma Thompson',
    company: 'All Weather Restoration',
    location: 'Brisbane, QLD',
    quote: 'Being part of NRPG means I\'m never alone on a tough job. The peer network and expert mentoring are invaluable for solving complex restoration challenges.',
  },
];

const joinSteps = [
  {
    step: '1',
    title: 'Choose Membership',
    description: 'Select the membership tier that fits your business needs (Associate, Professional, or Master)',
  },
  {
    step: '2',
    title: 'Complete Application',
    description: 'Submit your application with professional background and current IICRC certifications',
  },
  {
    step: '3',
    title: 'Verification',
    description: 'Our team reviews your credentials and verifies professional standing',
  },
  {
    step: '4',
    title: 'Welcome to NRPG',
    description: 'Gain immediate access to member resources, training discounts, and the professional network',
  },
];

export default function AboutNRPGPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-diagonal.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-700 hover:bg-blue-800">
              Founded 2009
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Elevating Restoration Standards Across Australia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              NRPG is Australia's premier professional association for disaster restoration contractors,
              committed to excellence, education, and industry advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Our Mission & Vision</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-6">
                  NRPG exists to elevate the disaster restoration industry through professional development,
                  rigorous standards, and a commitment to excellence that protects both contractors and consumers.
                </p>
                <p className="text-lg text-gray-600">
                  We envision an industry where every restoration professional maintains the highest certifications,
                  operates with integrity, and delivers exceptional results that exceed client expectations and
                  insurance requirements.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {missionValues.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Leadership & Founder</h2>
              <p className="text-xl text-blue-100">
                Founded and led by one of Queensland's most respected restoration professionals
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-800 to-blue-900 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-16 w-16 text-blue-900" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Phill McGurk</h3>
                    <p className="text-blue-100 mb-1">IICRC Master Restorer</p>
                    <p className="text-blue-200 text-sm">Founder & President</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-4">Building Australia's Best</h3>
                  <div className="space-y-4 text-gray-200">
                    <p>
                      Phill McGurk founded NRPG in 2009 with a vision to elevate restoration standards across
                      Australia by connecting professionals, sharing knowledge, and promoting IICRC certification.
                    </p>
                    <p>
                      As one of a limited number of IICRC Master Restorers in Queensland, Phill brings over 25
                      years of hands-on restoration experience. His commitment to excellence and education has
                      shaped NRPG into Australia's leading professional restoration association.
                    </p>
                    <p>
                      Under Phill's leadership, NRPG has grown to over 500 active members, established CARSI as
                      an IICRC Approved Education Provider, and significantly raised professional standards across
                      the industry.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold mb-1">25+</div>
                      <div className="text-sm text-blue-200">Years Experience</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold mb-1">Master</div>
                      <div className="text-sm text-blue-200">IICRC Restorer</div>
                    </div>
                  </div>
                  <Button className="mt-6 w-full bg-white text-blue-900 hover:bg-gray-100" asChild>
                    <Link href="/about-phil-mcgurk">
                      View Full Credentials
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Benefits Detailed */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Comprehensive Member Benefits</h2>
              <p className="text-xl text-gray-600">
                Everything you need to grow your restoration business and professional expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefitGroup, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{benefitGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {benefitGroup.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IICRC Partnership */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <Globe className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">IICRC Partnership</h2>
              <p className="text-xl text-gray-600">
                Official IICRC Approved Education Provider bringing international standards to Australia
              </p>
            </div>

            <Card className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  NRPG's partnership with the IICRC (Institute of Inspection, Cleaning and Restoration
                  Certification) ensures our members have access to globally recognized training, certification,
                  and continuing education programs.
                </p>
                <p className="text-gray-700 mb-6">
                  Through CARSI (Cleaning and Restoration Science Institute), we deliver IICRC-approved courses
                  that award continuing education credits (CECs) required to maintain professional certifications.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">IICRC Approved</h3>
                    <p className="text-sm text-gray-600">Official education provider status</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Global Standards</h3>
                    <p className="text-sm text-gray-600">International best practices</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">CEC Credits</h3>
                    <p className="text-sm text-gray-600">Maintain professional credentials</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Industry Impact</h2>
            <p className="text-xl text-gray-600">
              15 years of elevating restoration standards across Australia
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            {impact.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{item.stat}</div>
                <div className="text-xl font-semibold mb-2">{item.label}</div>
                <div className="text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Member Success Stories</h2>
              <p className="text-xl text-gray-600">
                Hear from restoration professionals who've grown with NRPG
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic text-gray-700">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How to Join NRPG</h2>
              <p className="text-xl text-gray-600">
                Four simple steps to become part of Australia's leading restoration professional network
              </p>
            </div>

            <div className="space-y-8">
              {joinSteps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/nrpg">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Questions about membership?{' '}
                <a href="mailto:membership@nrpg.com.au" className="text-blue-600 hover:underline">
                  Contact our team
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Career?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 500+ restoration professionals committed to excellence, education, and industry leadership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8" asChild>
                <Link href="/nrpg">
                  View Membership Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" asChild>
                <Link href="/carsi">Explore CARSI Training</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'National Restoration Professionals Group (NRPG)',
            description: 'Australia\'s premier professional association for disaster restoration contractors',
            url: 'https://dr-new-ten.vercel.app/about-nrpg',
            foundingDate: '2009',
            founder: {
              '@type': 'Person',
              name: 'Phill McGurk',
              jobTitle: 'IICRC Master Restorer',
            },
            numberOfEmployees: {
              '@type': 'QuantitativeValue',
              value: 500,
            },
            areaServed: {
              '@type': 'Country',
              name: 'Australia',
            },
            memberOf: {
              '@type': 'Organization',
              name: 'IICRC',
            },
          }),
        }}
      />
    </div>
  );
}
