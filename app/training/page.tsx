import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  TrendingUp,
  Star,
  ArrowRight,
  Users,
  BookOpen,
  Shield,
  Flame,
  Droplet,
  Wind,
  FileBox,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'IICRC Training Course Catalog | CARSI Restoration Courses Australia',
  description: 'Complete IICRC training course catalog from CARSI. WRT, ASD, FSR, AMRT, CRT, OCT courses. Earn continuing education credits online with expert Master Restorer instruction.',
  keywords: 'IICRC courses, restoration training, WRT certification, ASD course, fire restoration training, mould remediation course, water damage training, CEC credits, online IICRC Australia',
  openGraph: {
    title: 'IICRC Training Course Catalog - CARSI',
    description: 'Complete catalog of IICRC-approved restoration courses',
    type: 'website',
  },
};

const courses = [
  {
    code: 'WRT',
    name: 'Water Restoration Technician',
    category: 'Water Damage',
    icon: Droplet,
    cecHours: 14,
    duration: '3 days',
    price: 895,
    level: 'Foundation',
    format: 'Online',
    color: 'blue',
    description: 'Master the fundamentals of water damage restoration including drying principles, equipment operation, and IICRC S500 standards.',
    detailedDescription: 'The WRT course is the essential foundation for any restoration professional working with water damage. You\'ll learn the science of psychrometry, proper equipment selection and placement, documentation requirements, and best practices for structural drying.',
    outcomes: [
      'Understand water damage categories (1-3) and classes (1-4)',
      'Apply psychrometry principles for effective drying',
      'Select and operate drying equipment properly',
      'Document moisture readings and drying progress',
      'Follow IICRC S500 standards and protocols',
      'Identify and mitigate secondary damage risks',
    ],
    prerequisites: 'None - Open to all restoration professionals',
    audience: 'Restoration technicians, contractors, property managers, insurance adjusters',
    includes: [
      'HD video lessons with field demonstrations',
      'Digital course manual (200+ pages)',
      'Interactive quizzes and assessments',
      'Real-world case studies',
      'Equipment operation guides',
      'IICRC certificate upon completion',
    ],
  },
  {
    code: 'ASD',
    name: 'Applied Structural Drying',
    category: 'Water Damage',
    icon: Wind,
    cecHours: 21,
    duration: '4 days',
    price: 1295,
    level: 'Advanced',
    format: 'Online',
    color: 'blue',
    description: 'Advanced training in structural drying, psychrometry applications, and complex water damage scenarios for experienced professionals.',
    detailedDescription: 'Building on WRT fundamentals, ASD dives deep into complex drying challenges. This advanced course covers specialty drying situations, building science, and the mathematical applications of psychrometry in real-world scenarios.',
    outcomes: [
      'Master advanced psychrometry calculations and applications',
      'Handle complex drying scenarios (basements, crawl spaces, etc.)',
      'Understand building materials and moisture behavior',
      'Implement specialty drying techniques',
      'Calculate drying equipment requirements accurately',
      'Troubleshoot challenging drying projects',
    ],
    prerequisites: 'WRT certification or equivalent water damage experience',
    audience: 'Experienced technicians, lead restorers, project managers',
    includes: [
      'Advanced video instruction with complex scenarios',
      'Comprehensive digital manual (300+ pages)',
      'Psychrometric calculator tools',
      'Building science reference materials',
      'Case study library',
      'IICRC certificate upon completion',
    ],
  },
  {
    code: 'FSR',
    name: 'Fire & Smoke Restoration',
    category: 'Fire Damage',
    icon: Flame,
    cecHours: 14,
    duration: '3 days',
    price: 895,
    level: 'Specialist',
    format: 'Online',
    color: 'red',
    description: 'Comprehensive fire and smoke damage restoration including cleaning techniques, deodorization, and contents restoration.',
    detailedDescription: 'Learn the science behind fire and smoke damage, from combustion chemistry to effective restoration techniques. This course covers both structural and contents restoration, with emphasis on cleaning methods and odor elimination.',
    outcomes: [
      'Understand fire behavior and smoke characteristics',
      'Assess fire and smoke damage properly',
      'Select appropriate cleaning methods and chemicals',
      'Implement effective deodorization techniques',
      'Restore contents affected by fire and smoke',
      'Follow IICRC S700 standards',
    ],
    prerequisites: 'None - Open to all restoration professionals',
    audience: 'Fire restoration specialists, general restoration contractors, contents processors',
    includes: [
      'Fire science and smoke behavior lessons',
      'Cleaning technique demonstrations',
      'Deodorization method guides',
      'Chemical safety protocols',
      'Contents restoration procedures',
      'IICRC certificate upon completion',
    ],
  },
  {
    code: 'AMRT',
    name: 'Applied Microbial Remediation',
    category: 'Mould Remediation',
    icon: AlertCircle,
    cecHours: 21,
    duration: '4 days',
    price: 1295,
    level: 'Advanced',
    format: 'Online',
    color: 'green',
    description: 'Expert-level mould assessment and remediation following IICRC S520 standards with emphasis on safety and proper protocols.',
    detailedDescription: 'Master the complexities of microbial contamination assessment and remediation. This advanced course covers S520 protocols, containment strategies, proper PPE selection, and post-remediation verification procedures.',
    outcomes: [
      'Conduct proper microbial contamination assessments',
      'Implement IICRC S520 remediation protocols',
      'Design and construct effective containment systems',
      'Select appropriate PPE for different scenarios',
      'Perform post-remediation verification',
      'Understand legal and liability considerations',
    ],
    prerequisites: 'WRT certification recommended but not required',
    audience: 'Mould remediation specialists, restoration contractors, environmental consultants',
    includes: [
      'S520 standard detailed breakdown',
      'Containment design tutorials',
      'PPE selection guides',
      'Safety protocol documentation',
      'Verification procedures',
      'IICRC certificate upon completion',
    ],
  },
  {
    code: 'CRT',
    name: 'Contents Processing Technician',
    category: 'Contents Restoration',
    icon: FileBox,
    cecHours: 14,
    duration: '3 days',
    price: 895,
    level: 'Foundation',
    format: 'Online',
    color: 'purple',
    description: 'Specialized training in cleaning, restoring, and managing contents affected by disasters including pack-out procedures.',
    detailedDescription: 'Learn professional contents restoration techniques from inventory through final delivery. This course covers cleaning methods for various materials, electronics restoration, document recovery, and proper pack-out/pack-back procedures.',
    outcomes: [
      'Create detailed contents inventories',
      'Select appropriate cleaning methods by material type',
      'Execute proper pack-out procedures',
      'Restore electronics and sensitive materials',
      'Perform document and photo recovery',
      'Manage contents storage and tracking',
    ],
    prerequisites: 'None - Open to all restoration professionals',
    audience: 'Contents technicians, restoration contractors, pack-out specialists',
    includes: [
      'Inventory management systems',
      'Cleaning method demonstrations',
      'Electronics restoration guides',
      'Document recovery techniques',
      'Storage best practices',
      'IICRC certificate upon completion',
    ],
  },
  {
    code: 'OCT',
    name: 'Odor Control Technician',
    category: 'Specialty',
    icon: Wind,
    cecHours: 7,
    duration: '2 days',
    price: 695,
    level: 'Specialist',
    format: 'Online',
    color: 'orange',
    description: 'Master odor detection, identification, and removal techniques for various contamination sources using industry best practices.',
    detailedDescription: 'Become an expert in the science of odor control. This specialized course covers odor sources, detection methods, and proven deodorization techniques for challenging scenarios including smoke, decomposition, and chemical odors.',
    outcomes: [
      'Understand odor science and source identification',
      'Use detection equipment effectively',
      'Select appropriate deodorization methods',
      'Apply chemical and thermal fogging techniques',
      'Handle specialty odor situations',
      'Verify odor elimination success',
    ],
    prerequisites: 'None - Open to all restoration professionals',
    audience: 'Restoration technicians, odor control specialists, fire restoration contractors',
    includes: [
      'Odor science fundamentals',
      'Detection equipment guides',
      'Deodorization method tutorials',
      'Chemical application safety',
      'Specialty scenario solutions',
      'IICRC certificate upon completion',
    ],
  },
];

const categoryColors = {
  'Water Damage': 'blue',
  'Fire Damage': 'red',
  'Mould Remediation': 'green',
  'Contents Restoration': 'purple',
  'Specialty': 'orange',
};

const benefits = [
  {
    icon: Award,
    title: 'IICRC Approved',
    description: 'All courses award official IICRC continuing education credits',
  },
  {
    icon: Users,
    title: 'Expert Instruction',
    description: 'Learn from IICRC Master Restorer Phill McGurk',
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Study at your own pace with 24/7 online access',
  },
  {
    icon: Shield,
    title: 'Industry Standards',
    description: 'Master IICRC standards and best practices',
  },
];

export default function TrainingPage() {
  const totalCECs = courses.reduce((sum, course) => sum + course.cecHours, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-diagonal.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-purple-600 hover:bg-purple-700 text-lg py-2 px-4">
                <Award className="h-5 w-5 mr-2" />
                IICRC-Approved Course Catalog
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              IICRC Restoration Training Courses
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Earn up to {totalCECs} continuing education credits with expert-led, IICRC-approved
              online courses. Master water, fire, mould, and contents restoration.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">{courses.length}</div>
                <div className="text-sm text-purple-200">IICRC Courses</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">{totalCECs}</div>
                <div className="text-sm text-purple-200">CEC Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-purple-200">Online</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete Course Catalog</h2>
            <p className="text-xl text-gray-600">
              Choose from 6 IICRC-approved courses across all restoration disciplines
            </p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="md:flex">
                  {/* Course Header Section */}
                  <div className={`md:w-1/3 bg-gradient-to-br from-${course.color}-900 to-${course.color}-800 text-white p-8`}>
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <Badge className={`bg-${course.color}-600 mb-4`}>
                          {course.category}
                        </Badge>
                        <div className="h-16 w-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                          <course.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-3xl font-bold mb-2">{course.code}</h3>
                        <p className="text-xl text-gray-100">{course.name}</p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5" />
                          <div>
                            <div className="font-bold">{course.cecHours} CEC Hours</div>
                            <div className="text-sm text-gray-200">IICRC Credits</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5" />
                          <div>
                            <div className="font-bold">{course.duration}</div>
                            <div className="text-sm text-gray-200">Course Duration</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-5 w-5" />
                          <div>
                            <div className="font-bold">{course.level}</div>
                            <div className="text-sm text-gray-200">Skill Level</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5" />
                          <div>
                            <div className="font-bold">{course.format}</div>
                            <div className="text-sm text-gray-200">Learning Format</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/20">
                        <div className="text-4xl font-bold mb-1">${course.price}</div>
                        <div className="text-sm text-gray-200">AUD + GST</div>
                      </div>
                    </div>
                  </div>

                  {/* Course Content Section */}
                  <div className="md:w-2/3 p-8">
                    <div className="mb-6">
                      <h4 className="text-2xl font-bold mb-3">Course Overview</h4>
                      <p className="text-gray-700 mb-4">{course.description}</p>
                      <p className="text-gray-600">{course.detailedDescription}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3">Learning Outcomes</h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {course.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold mb-2">Prerequisites</h4>
                        <p className="text-sm text-gray-600">{course.prerequisites}</p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Who Should Attend</h4>
                        <p className="text-sm text-gray-600">{course.audience}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold mb-3">Course Includes</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {course.includes.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="lg" className="flex-1">
                        Enroll Now - ${course.price}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button size="lg" variant="outline" className="flex-1">
                        Download Syllabus
                      </Button>
                    </div>

                    <p className="text-sm text-gray-500 mt-4 text-center">
                      NRPG members save 20-40% •{' '}
                      <Link href="/nrpg" className="text-purple-600 hover:underline">
                        Join NRPG
                      </Link>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Your IICRC Instructor</h2>
              <p className="text-xl text-gray-600">
                Learn from one of Queensland's most experienced Master Restorers
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-purple-900 to-purple-800 text-white p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-16 w-16 text-purple-900" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Phill McGurk</h3>
                    <p className="text-purple-100 mb-1">IICRC Master Restorer</p>
                    <p className="text-purple-200 text-sm">IICRC Approved Instructor</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="prose prose-lg mb-6">
                    <p className="text-gray-700 mb-4">
                      Phill McGurk is one of a limited number of IICRC Master Restorers in Queensland,
                      bringing over 25 years of hands-on restoration experience to every CARSI course.
                    </p>
                    <p className="text-gray-700">
                      As an IICRC Approved Instructor and active restoration practitioner, Phill combines
                      real-world expertise with comprehensive knowledge of IICRC standards, ensuring you
                      learn both theory and practical application.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">25+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">Master</div>
                      <div className="text-sm text-gray-600">IICRC Level</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">1,000+</div>
                      <div className="text-sm text-gray-600">Students Trained</div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Start Earning Your CECs Today</h2>
            <p className="text-xl text-purple-100 mb-8">
              Maintain your IICRC certifications and advance your restoration career with
              expert-led online training. Join 1,000+ professionals who trust CARSI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8" asChild>
                <Link href="/contractor-portal">
                  Access Learning Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" asChild>
                <Link href="/nrpg">Get Member Discounts</Link>
              </Button>
            </div>
            <p className="text-sm text-purple-200 mt-6">
              Questions? Email{' '}
              <a href="mailto:training@carsi.com.au" className="underline hover:no-underline">
                training@carsi.com.au
              </a>{' '}
              or call{' '}
              <a href="tel:1300123456" className="underline hover:no-underline">
                1300 123 456
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
            '@type': 'ItemList',
            name: 'IICRC Restoration Training Courses',
            description: 'Complete catalog of IICRC-approved restoration training courses',
            itemListElement: courses.map((course, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Course',
                name: `${course.code} - ${course.name}`,
                description: course.description,
                provider: {
                  '@type': 'Organization',
                  name: 'CARSI',
                },
                educationalCredentialAwarded: `${course.cecHours} IICRC Continuing Education Credits`,
                timeRequired: course.duration,
                coursePrerequisites: course.prerequisites,
                audience: {
                  '@type': 'Audience',
                  audienceType: course.audience,
                },
                offers: {
                  '@type': 'Offer',
                  price: course.price,
                  priceCurrency: 'AUD',
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
