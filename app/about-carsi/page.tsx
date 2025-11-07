import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Award,
  GraduationCap,
  CheckCircle2,
  Globe,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Target,
  Star,
  Shield,
  ArrowRight,
  Video,
  FileText,
  Monitor,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CARSI - IICRC-Approved Restoration Training | Cleaning & Restoration Science Institute',
  description: 'Learn about CARSI\'s mission to deliver world-class IICRC-approved restoration training. Expert instruction by Master Restorer Phill McGurk. Online continuing education for restoration professionals.',
  keywords: 'about CARSI, IICRC training, restoration education, Phill McGurk instructor, continuing education, CEC credits, online learning, restoration courses Australia',
  openGraph: {
    title: 'About CARSI - IICRC-Approved Training',
    description: 'World-class restoration training with IICRC accreditation',
    type: 'website',
  },
};

const missionPoints = [
  {
    icon: GraduationCap,
    title: 'Excellence in Education',
    description: 'Delivering world-class restoration training that meets and exceeds IICRC standards for professional development.',
  },
  {
    icon: Globe,
    title: 'Accessible Learning',
    description: 'Making IICRC-approved training accessible to restoration professionals across Australia through flexible online delivery.',
  },
  {
    icon: TrendingUp,
    title: 'Career Advancement',
    description: 'Empowering contractors to advance their careers through certification pathways and continuing education credits.',
  },
  {
    icon: Shield,
    title: 'Industry Standards',
    description: 'Promoting adherence to IICRC standards and best practices that protect both professionals and consumers.',
  },
];

const accreditationDetails = [
  {
    title: 'IICRC Approved Education Provider',
    description: 'CARSI holds official IICRC Approved Education Provider status, ensuring all courses meet rigorous international standards.',
    icon: Award,
  },
  {
    title: 'Continuing Education Credits',
    description: 'All courses award IICRC-approved CECs that automatically count toward certification maintenance requirements.',
    icon: CheckCircle2,
  },
  {
    title: 'Global Recognition',
    description: 'CARSI certifications are recognized internationally, providing credentials valued by insurers and clients worldwide.',
    icon: Globe,
  },
];

const instructorCredentials = [
  'IICRC Master Restorer (one of limited in QLD)',
  'IICRC Approved Instructor',
  '25+ years hands-on restoration experience',
  '1,000+ students trained successfully',
  'Expert in water, fire, and mould restoration',
  'Active field practitioner (not just classroom instructor)',
];

const courseDevelopment = [
  {
    step: '1',
    title: 'IICRC Standards Review',
    description: 'Course content aligned with latest IICRC standards and international best practices',
  },
  {
    step: '2',
    title: 'Real-World Application',
    description: 'Practical scenarios and case studies from actual restoration projects',
  },
  {
    step: '3',
    title: 'Expert Development',
    description: 'Created by Master Restorers with decades of field experience',
  },
  {
    step: '4',
    title: 'IICRC Approval',
    description: 'Rigorous review and approval process to award official CEC credits',
  },
];

const platformFeatures = [
  {
    icon: Video,
    title: 'HD Video Instruction',
    description: 'High-quality video lessons with real-world demonstrations and equipment operation',
  },
  {
    icon: FileText,
    title: 'Comprehensive Materials',
    description: 'Digital course manuals, reference guides, and downloadable resources',
  },
  {
    icon: Monitor,
    title: '24/7 Access',
    description: 'Learn at your own pace with unlimited access to course materials',
  },
  {
    icon: Award,
    title: 'Digital Certificates',
    description: 'Instant certificate downloads upon course completion',
  },
  {
    icon: Clock,
    title: 'Progress Tracking',
    description: 'Real-time tracking of course progress and CEC accumulation',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Access to peer network and instructor support throughout your learning',
  },
];

const successMetrics = [
  { stat: '1,000+', label: 'Students Trained' },
  { stat: '91', label: 'CEC Hours Available' },
  { stat: '98%', label: 'Pass Rate' },
  { stat: '6', label: 'IICRC Courses' },
];

export default function AboutCARSIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-diagonal.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-green-600 hover:bg-green-700 text-lg py-2 px-4">
                <Award className="h-5 w-5 mr-2" />
                IICRC Approved Education Provider
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              World-Class IICRC-Approved Restoration Training
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              CARSI (Cleaning and Restoration Science Institute) delivers expert-led, IICRC-accredited
              online training that advances careers and maintains professional excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{metric.stat}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Our Mission & Purpose</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-6">
                  CARSI was established to bridge the gap between restoration theory and real-world practice,
                  delivering IICRC-approved training that combines scientific principles with hands-on expertise.
                </p>
                <p className="text-lg text-gray-600">
                  We believe every restoration professional deserves access to world-class training that advances
                  their career, maintains their certifications, and ultimately delivers better outcomes for property
                  owners and insurers.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {missionPoints.map((point, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <point.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IICRC Accreditation */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                  <Award className="h-12 w-12 text-blue-900" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">IICRC Accreditation Excellence</h2>
              <p className="text-xl text-blue-100">
                Official IICRC Approved Education Provider status ensures the highest training standards
              </p>
            </div>

            <div className="space-y-6">
              {accreditationDetails.map((detail, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <detail.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{detail.title}</CardTitle>
                        <CardDescription className="text-blue-100">
                          {detail.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Why IICRC Accreditation Matters</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">For Professionals:</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>Credits recognized globally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>Maintain certification status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>Enhanced career opportunities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">For Clients:</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>Verified professional standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>Insurance company approved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>Quality assurance guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Qualifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Expert Instructor: Phill McGurk</h2>
              <p className="text-xl text-gray-600">
                Learn from one of Queensland's most experienced and qualified restoration professionals
              </p>
            </div>

            <Card className="overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-green-900 to-green-800 p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-16 w-16 text-green-900" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Phill McGurk</h3>
                    <p className="text-green-100 mb-1">IICRC Master Restorer</p>
                    <p className="text-green-200 text-sm">IICRC Approved Instructor</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-4">Your CARSI Instructor</h3>
                  <div className="prose prose-lg mb-6">
                    <p className="text-gray-700 mb-4">
                      Phill McGurk brings a unique combination of academic knowledge and real-world expertise
                      to CARSI training programs. As one of a limited number of IICRC Master Restorers in
                      Queensland, Phill maintains the highest level of professional certification while
                      actively working in the field.
                    </p>
                    <p className="text-gray-700">
                      Unlike classroom-only instructors, Phill's active restoration practice means students
                      learn from current, real-world challenges and solutions, not just textbook theory.
                    </p>
                  </div>

                  <h4 className="font-bold mb-3">Professional Credentials:</h4>
                  <ul className="space-y-2 mb-6">
                    {instructorCredentials.map((credential, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{credential}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full" asChild>
                    <Link href="/about-phil-mcgurk">
                      View Full Credentials
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                  <CardTitle className="text-lg">Years Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Over two decades of hands-on restoration work
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Master</div>
                  <CardTitle className="text-lg">IICRC Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Highest IICRC certification level possible
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1,000+</div>
                  <CardTitle className="text-lg">Students Trained</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Proven track record of student success
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Development Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Course Development Process</h2>
              <p className="text-xl text-gray-600">
                Every CARSI course undergoes rigorous development and IICRC approval
              </p>
            </div>

            <div className="space-y-8">
              {courseDevelopment.map((phase, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {phase.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                    <p className="text-gray-600 text-lg">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEC Importance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Continuing Education Matters</h2>
              <p className="text-xl text-gray-600">
                CECs keep you certified, credible, and competitive in the restoration industry
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Maintain Your Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    IICRC certifications require ongoing continuing education to remain current:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">14 CEC hours every 2 years (most certs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Must be from approved providers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Automatic reporting to IICRC</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Professional Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Ongoing education provides competitive advantages:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Stay current with latest techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Meet insurance company requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Demonstrate professionalism to clients</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">CARSI Makes CECs Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Monitor className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Online Flexibility</h4>
                    <p className="text-sm text-gray-600">Learn on your schedule, no travel required</p>
                  </div>
                  <div>
                    <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Automatic Credits</h4>
                    <p className="text-sm text-gray-600">CECs reported directly to IICRC</p>
                  </div>
                  <div>
                    <Star className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Expert Instruction</h4>
                    <p className="text-sm text-gray-600">Learn from Master Restorers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Online Learning Platform */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Modern Online Learning Platform</h2>
              <p className="text-xl text-gray-600">
                Accessible, intuitive, and designed for busy restoration professionals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Start Your IICRC Journey Today</h2>
            <p className="text-xl text-green-100 mb-8">
              Join 1,000+ restoration professionals who've advanced their careers through CARSI training.
              Earn CECs, maintain certifications, and master your craft with expert instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-gray-100 text-lg px-8" asChild>
                <Link href="/carsi">
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" asChild>
                <Link href="/nrpg">Join NRPG for Discounts</Link>
              </Button>
            </div>
            <p className="text-sm text-green-200 mt-6">
              NRPG members save 20-40% on all CARSI courses
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
            '@type': 'EducationalOrganization',
            name: 'CARSI - Cleaning and Restoration Science Institute',
            description: 'IICRC-approved online training and continuing education for restoration professionals',
            url: 'https://dr-new-ten.vercel.app/about-carsi',
            provider: {
              '@type': 'Organization',
              name: 'National Restoration Professionals Group',
            },
            accreditedBy: {
              '@type': 'Organization',
              name: 'IICRC',
            },
            instructor: {
              '@type': 'Person',
              name: 'Phill McGurk',
              jobTitle: 'IICRC Master Restorer',
            },
          }),
        }}
      />
    </div>
  );
}
