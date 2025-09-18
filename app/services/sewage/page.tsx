import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Phone, AlertTriangle, Shield, Clock, CheckCircle, Droplets, Home, AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sewage Cleanup Services | Emergency Contamination Control',
  description: 'Emergency sewage cleanup Brisbane, Ipswich & Logan. Raw sewage removal, sanitisation, contamination control. Health-focused, insurance approved. 24/7 response. Call 1300 309 361.',
  keywords: ["sewage cleanup","raw sewage removal","black water damage","sewage backup","contamination control","sanitisation services"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/services/sewage',
    },
  },
  openGraph: {
    title: 'Sewage Cleanup Services | Emergency Contamination Control',
    description: 'Emergency sewage cleanup Brisbane, Ipswich & Logan. Raw sewage removal, sanitisation, contamination control. Health-focused, insurance approved. 24/7 ...',
    url: 'https://disasterrecovery.com.au/services/sewage',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/sewage.jpg',
        width: 1200,
        height: 630,
        alt: 'Sewage Cleanup Services | Emergency Contamination Control',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sewage Cleanup Services | Emergency Contamination Control',
    description: 'Emergency sewage cleanup Brisbane, Ipswich & Logan. Raw sewage removal, sanitisation, contamination control. Health-focused, insurance approved. 24/7 ...',
    images: ['https://disasterrecovery.com.au/images/services/sewage.jpg'],
  },
};

export default function SewageCleanupPage() {

  const sewageCategories = [
    {
      category: 'Category 1',
      title: 'Clean Water',
      severity: 'Low',
      description: 'Water from broken pipes or rain',
      response: 'Standard water extraction and drying',
      color: 'blue'
    },
    {
      category: 'Category 2',
      title: 'Grey Water',
      severity: 'Medium',
      description: 'Water from washing machines, dishwashers, or toilet overflow with urine',
      response: 'Extraction, sanitisation, and antimicrobial treatment',
      color: 'yellow'
    },
    {
      category: 'Category 3',
      title: 'Black Water',
      severity: 'HIGH',
      description: 'Sewage backup, toilet overflow with feces, or contaminated floodwater',
      response: 'Full biohazard protocol, removal of contaminated materials, complete sanitisation',
      color: 'red'
    }
  ];

  const sewageServices = [
    {
      title: 'Emergency Extraction',
      description: 'Immediate removal of sewage water',
      features: [
        'High-powered extraction equipment',
        'Containment barriers',
        'Safe disposal protocols',
        'Initial sanitisation'
      ]
    },
    {
      title: 'Contamination Removal',
      description: 'Safe removal of affected materials',
      features: [
        'Carpet and underlay removal',
        'Drywall cutting and disposal',
        'Insulation replacement',
        'Contaminated furniture handling'
      ]
    },
    {
      title: 'Deep Sanitisation',
      description: 'Hospital-grade cleaning and disinfection',
      features: [
        'EPA-approved disinfectants',
        'Antimicrobial treatments',
        'Odour neutralisation',
        'Air quality restoration'
      ]
    },
    {
      title: 'Structural Drying',
      description: 'Complete moisture elimination',
      features: [
        'Industrial dehumidifiers',
        'Air movers and fans',
        'Moisture monitoring',
        'Mould prevention treatment'
      ]
    }
  ];

  const healthRisks = [
    'E. coli bacteria',
    'Hepatitis A virus',
    'Salmonella',
    'Cryptosporidium',
    'Giardia',
    'Tetanus bacteria',
    'Various parasites',
    'Toxic gases'
  ];

  const emergencySteps = [
    {
      step: 1,
      title: 'Evacuate & Stay Safe',
      action: 'Keep everyone, especially children and pets, away from contaminated areas',
      critical: true
    },
    {
      step: 2,
      title: 'Stop the Source',
      action: 'Turn off water supply if possible. Never touch electrical equipment near water',
      critical: true
    },
    {
      step: 3,
      title: 'Call Professionals',
      action: 'Contact us immediately on 1300 309 361 - DO NOT attempt DIY cleanup',
      critical: true
    },
    {
      step: 4,
      title: 'Document for Insurance',
      action: 'Take photos from a safe distance for insurance claims',
      critical: false
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="Service"
        data={{
          serviceName: 'Sewage Cleanup & Sanitisation Services',
          provider: 'Disaster Recovery',
          areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast', 'Sunshine Coast'],
          description: 'Professional sewage cleanup and biohazard remediation services. 24/7 emergency response, complete sanitisation, and health hazard elimination by IICRC certified technicians.'
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Services", url: "https://disasterrecovery.com.au/services" },
            { name: "Sewage Cleanup", url: "https://disasterrecovery.com.au/services/sewage" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Sewage Cleanup Service">

        {/* Hero Section with Health Warning */}
        <section className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-800 text-white">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">

            {/* Health Warning Alert */}
            <div className="bg-red-600/90 backdrop-blur border border-red-500 p-4 rounded-lg mb-8 max-w-3xl mx-auto animate-pulse">
              <div className="flex items-center justify-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
                <p className="text-center font-bold">
                  HEALTH HAZARD: Sewage contains dangerous bacteria and viruses.
                  Professional cleanup is essential for your safety.
                </p>
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
              </div>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Sewage Cleanup &<br/>
                <span className="text-green-400">Biohazard Sanitisation</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Brisbane & Ipswich's certified sewage cleanup specialists. We handle the most
                hazardous situations with professional equipment, strict safety protocols, and
                complete sanitisation to protect your health and property.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency: 1300 309 361
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Get Immediate Help
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">2 Hr</div>
                  <div className="text-sm">Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">Cat 3</div>
                  <div className="text-sm">Black Water Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">100%</div>
                  <div className="text-sm">Sanitisation</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">IICRC</div>
                  <div className="text-sm">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Water Categories Explanation */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              Understanding Sewage Contamination Levels
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Not all water damage is the same. Sewage backups are Category 3 "Black Water" -
              the most dangerous type requiring immediate professional intervention.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sewageCategories.map((cat) => (
                <Card key={cat.category} className={`border-2 ${
                  cat.color === 'red' ? 'border-red-500' :
                  cat.color === 'yellow' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}>
                  <CardHeader className={`${
                    cat.color === 'red' ? 'bg-red-50' :
                    cat.color === 'yellow' ? 'bg-yellow-50' :
                    'bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{cat.category}</CardTitle>
                      <span className={`px-3 py-1 rounded text-sm font-bold ${
                        cat.color === 'red' ? 'bg-red-600 text-white' :
                        cat.color === 'yellow' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {cat.severity}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{cat.title}</h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 mb-3">{cat.description}</p>
                    <div className="pt-3 border-t">
                      <p className="text-sm font-semibold text-gray-700">Response Required:</p>
                      <p className="text-sm text-gray-600 mt-1">{cat.response}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Steps */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Sewage Backup? Take These Steps Immediately
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {emergencySteps.map((item) => (
                <Card key={item.step} className={item.critical ? 'border-2 border-red-500' : ''}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                        item.critical ? 'bg-red-600' : 'bg-green-600'
                      }`}>
                        {item.step}
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{item.action}</p>
                    {item.critical && (
                      <div className="mt-3 flex items-center gap-2 text-red-600 font-semibold">
                        <AlertCircle className="w-5 h-5" />
                        Critical for Safety
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Never Attempt DIY Sewage Cleanup</h3>
                  <p className="text-gray-700">
                    Sewage water contains harmful pathogens that can cause serious illness.
                    Professional equipment and protective gear are essential. Our IICRC certified
                    technicians follow strict biohazard protocols to ensure complete decontamination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Complete Sewage Cleanup Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sewageServices.map((service, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Droplets className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Health Risks Section */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              Why Professional Sewage Cleanup is Critical
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Sewage water poses serious health risks. Exposure can lead to severe illness or infection.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-red-700 mb-4">
                  Health Hazards in Sewage Water
                </h3>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {healthRisks.map((risk, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-red-100 rounded">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-red-900">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Our Protection Protocols</h4>
                    <p className="text-green-800 text-sm">
                      Our technicians use full PPE including hazmat suits, respirators, and protective eyewear.
                      We follow strict decontamination procedures to ensure zero cross-contamination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Causes */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Causes of Sewage Backups in Brisbane & Ipswich
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  cause: 'Tree Root Intrusion',
                  description: 'Common in older Brisbane suburbs with established trees',
                  solution: 'Pipe inspection and professional root removal'
                },
                {
                  cause: 'Blocked Sewer Lines',
                  description: 'Grease, foreign objects, or accumulated debris',
                  solution: 'High-pressure water jetting and pipe cleaning'
                },
                {
                  cause: 'Storm Water Infiltration',
                  description: 'Heavy Brisbane storms overwhelming sewer systems',
                  solution: 'Emergency pumping and system restoration'
                },
                {
                  cause: 'Pipe Collapse',
                  description: 'Aging infrastructure or ground movement',
                  solution: 'Pipe relining or replacement'
                },
                {
                  cause: 'Municipal Backup',
                  description: 'City sewer main blockages affecting multiple properties',
                  solution: 'Immediate cleanup and council coordination'
                },
                {
                  cause: 'Septic System Failure',
                  description: 'Common in Logan and rural Ipswich areas',
                  solution: 'System pumping and field restoration'
                }
              ].map((item, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gray-100">
                    <CardTitle className="text-lg">{item.cause}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="pt-3 border-t">
                      <p className="text-sm font-semibold text-green-700">Solution:</p>
                      <p className="text-sm text-gray-700 mt-1">{item.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Support */}
        <section className="py-16 bg-green-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Insurance Claims Support
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">We Handle Your Insurance Claim</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Direct Insurance Billing</div>
                      <div className="text-green-200">We work with all major insurers and handle the paperwork</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Complete Documentation</div>
                      <div className="text-green-200">Photos, moisture readings, and detailed reports for your claim</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Approved Methods</div>
                      <div className="text-green-200">IICRC S500 water damage restoration standards</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Coverage Typically Includes:</h3>
                <ul className="space-y-2">
                  {[
                    'Emergency water extraction',
                    'Contaminated material removal',
                    'Structural drying and dehumidification',
                    'Antimicrobial treatments',
                    'Content cleaning or replacement',
                    'Temporary accommodation if needed'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Sewage Cleanup FAQs
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Is sewage water really that dangerous?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Yes, extremely dangerous. Sewage contains bacteria, viruses, parasites, and fungi that
                    can cause serious illness including Hepatitis A, E. coli infections, and Tetanus.
                    Even brief exposure can lead to infection, especially through cuts or mucous membranes.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How long does sewage cleanup take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Typically 3-5 days for complete restoration. Day 1: Emergency extraction and containment.
                    Day 2-3: Removal of contaminated materials and deep cleaning. Day 4-5: Drying, final
                    sanitisation, and verification testing. Severe cases may take longer.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can I stay in my home during cleanup?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    It depends on the extent of contamination. Minor, contained incidents may allow you
                    to stay in unaffected areas. Extensive sewage backup usually requires temporary
                    relocation for your safety. We'll assess and advise based on your specific situation.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What can be saved after sewage contamination?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Non-porous materials like metal, glass, and hard plastics can usually be sanitised.
                    Porous materials like carpet, underlay, drywall, and upholstered furniture typically
                    must be disposed of. We assess each item individually and follow health department guidelines.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              24/7 Sewage Cleanup Service Areas
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Brisbane CBD', 'Ipswich', 'Logan', 'Fortitude Valley', 'West End', 'New Farm', 'Toowong', 'St Lucia'].map((area) => (
                <div key={area} className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="font-semibold text-gray-900">{area}</div>
                  <div className="text-sm text-green-600 mt-1">Emergency Response</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Rapid response to sewage emergencies across Southeast Queensland
              </p>
              <Link
                href="/locations"
                className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center gap-2"
              >
                View All Service Areas
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Sewage Emergency? Don't Risk Your Health
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Professional cleanup is essential for your safety. Our certified team
              has the equipment and expertise to handle any sewage situation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call 1300 309 361 Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-900 transition-all border-2 border-white/30"
              >
                Request Emergency Service
              </Link>
            </div>

            <div className="mt-8 text-sm text-green-200">
              24/7 Emergency Response • Insurance Approved • IICRC Certified
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}