'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Phone, Shield, AlertTriangle, CheckCircle, Clock, Heart, Users, Truck } from 'lucide-react';

export default function BiohazardPage() {
  const [activeSection, setActiveSection] = useState('trauma');

  const biohazardServices = [
    {
      id: 'trauma',
      title: 'Trauma & Crime Scene Cleaning',
      description: 'Compassionate, discreet cleaning of traumatic incidents',
      icon: Heart,
      situations: [
        'Unattended death cleanup',
        'Crime scene remediation',
        'Suicide cleanup',
        'Accident scene cleaning',
        'Blood and bodily fluid removal'
      ],
      approach: 'We handle these sensitive situations with utmost respect, compassion, and professionalism.'
    },
    {
      id: 'infectious',
      title: 'Infectious Disease Control',
      description: 'Professional decontamination of infectious pathogens',
      icon: Shield,
      situations: [
        'COVID-19 decontamination',
        'MRSA and C-diff cleanup',
        'Hepatitis A, B, C cleanup',
        'HIV/AIDS decontamination',
        'Bacterial outbreak response'
      ],
      approach: 'Using hospital-grade disinfectants and EPA-approved protocols for complete pathogen elimination.'
    },
    {
      id: 'hoarding',
      title: 'Hoarding Cleanup',
      description: 'Respectful assistance for hoarding situations',
      icon: Users,
      situations: [
        'Complete property decluttering',
        'Biohazard removal from hoarded homes',
        'Animal waste remediation',
        'Structural cleaning and sanitisation',
        'Odour elimination'
      ],
      approach: 'We work with sensitivity and respect, helping families reclaim safe living spaces.'
    },
    {
      id: 'industrial',
      title: 'Industrial Accidents',
      description: 'Rapid response to workplace biohazard incidents',
      icon: Truck,
      situations: [
        'Workplace accident cleanup',
        'Chemical spill response',
        'Industrial fatality cleanup',
        'Laboratory decontamination',
        'Medical facility cleaning'
      ],
      approach: 'Ensuring workplace safety compliance and minimising business disruption.'
    }
  ];

  const safetyProtocols = [
    {
      title: 'Full PPE Equipment',
      items: [
        'Tyvek hazmat suits',
        'Respiratory protection',
        'Nitrile gloves',
        'Safety goggles',
        'Boot covers'
      ]
    },
    {
      title: 'Decontamination Process',
      items: [
        'Initial assessment & containment',
        'Removal of contaminated materials',
        'ATP testing for verification',
        'Hospital-grade disinfection',
        'Safe disposal procedures'
      ]
    },
    {
      title: 'Compliance & Certification',
      items: [
        'IICRC certified technicians',
        'EPA-approved chemicals',
        'WHS compliant procedures',
        'Medical waste disposal permits',
        'Full documentation provided'
      ]
    }
  ];

  const getCurrentService = () => biohazardServices.find(s => s.id === activeSection);

  return (
    <>
      <SchemaMarkup
        type="Service"
        data={{
          serviceName: 'Biohazard & Trauma Cleaning Services',
          provider: 'Disaster Recovery',
          areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast', 'Sunshine Coast'],
          description: 'Professional biohazard remediation and trauma cleaning services. Compassionate, discreet, and thorough decontamination by IICRC certified technicians.'
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Services", url: "https://disasterrecovery.com.au/services" },
            { name: "Biohazard Cleaning", url: "https://disasterrecovery.com.au/services/biohazard" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Biohazard & Trauma Cleaning Service">

        {/* Hero Section with Sensitivity Notice */}
        <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">

            {/* Sensitivity Notice */}
            <div className="bg-purple-800/50 backdrop-blur border border-purple-600 p-4 rounded-lg mb-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <p className="text-center">
                  <span className="font-semibold">24/7 Compassionate Support:</span> We understand you're dealing with a difficult situation.
                  Our team is here to help with discretion and respect.
                </p>
              </div>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Biohazard & Trauma<br/>
                <span className="text-purple-400">Cleaning Specialists</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Brisbane & Ipswich's trusted biohazard remediation experts. We provide compassionate,
                professional cleaning services during life's most difficult moments. IICRC certified,
                fully insured, and available 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  24/7 Support: 1300 309 361
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Request Discreet Service
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">100%</div>
                  <div className="text-sm">Discreet Service</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">IICRC</div>
                  <div className="text-sm">Certified Team</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">24/7</div>
                  <div className="text-sm">Emergency Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">$20M</div>
                  <div className="text-sm">Insurance Cover</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4">
              Professional Biohazard Services
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Every situation is handled with the highest level of professionalism,
              compassion, and attention to safety protocols.
            </p>

            {/* Service Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {biohazardServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveSection(service.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeSection === service.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50 shadow-md'
                  }`}
                >
                  {service.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Service Detail */}
            {getCurrentService() && (
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  {(() => {
                    const service = getCurrentService();
                    const Icon = service.icon;
                    return (
                      <>
                        <div className="p-4 bg-purple-100 rounded-lg">
                          <Icon className="w-10 h-10 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                          <p className="text-gray-600 text-lg mb-4">{service.description}</p>
                          <p className="text-gray-700 italic">{service.approach}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCurrentService().situations.map((situation, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{situation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Safety & Compliance */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Strict Safety & Compliance Standards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safetyProtocols.map((protocol, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl">{protocol.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {protocol.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Remediation Process
            </h2>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Initial Contact & Assessment',
                  description: 'Compassionate consultation to understand your needs. We handle all communication with discretion and respect.',
                  highlight: true
                },
                {
                  step: '02',
                  title: 'Site Containment & Safety',
                  description: 'Secure the area to prevent cross-contamination. Establish safety zones and implement proper ventilation.',
                  highlight: false
                },
                {
                  step: '03',
                  title: 'Biohazard Removal',
                  description: 'Careful removal of all biohazardous materials using proper PPE and containment procedures.',
                  highlight: false
                },
                {
                  step: '04',
                  title: 'Deep Cleaning & Disinfection',
                  description: 'Hospital-grade disinfection using EPA-approved chemicals. Multiple passes ensure complete decontamination.',
                  highlight: false
                },
                {
                  step: '05',
                  title: 'Verification & Documentation',
                  description: 'ATP testing to verify cleanliness. Provide complete documentation for insurance and peace of mind.',
                  highlight: true
                }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 mb-8">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                    step.highlight ? 'bg-purple-600' : 'bg-gray-400'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Families Trust Disaster Recovery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Compassionate Care</h3>
                <p className="text-purple-200">
                  We understand the emotional toll of these situations and provide support with empathy and respect.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Complete Discretion</h3>
                <p className="text-purple-200">
                  Unmarked vehicles, plain uniforms, and complete confidentiality throughout the entire process.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Rapid Response</h3>
                <p className="text-purple-200">
                  Available 24/7 with immediate response. We understand time is critical in these situations.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-purple-800/50 backdrop-blur rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Our Commitment to You</h3>
              <p className="text-center text-purple-200 max-w-3xl mx-auto">
                "During life's most difficult moments, you need a team you can trust completely.
                For over 13 years, we've been helping Brisbane and Ipswich families through traumatic
                situations with professionalism, compassion, and absolute discretion. We're here for
                you 24/7, and we'll handle everything so you can focus on what matters most -
                healing and moving forward."
              </p>
              <p className="text-center mt-4 font-semibold text-yellow-400">
                - Phill McGurk, Founder
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Discreet Service Across Southeast Queensland
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Brisbane CBD', 'Ipswich', 'Logan', 'Gold Coast', 'Sunshine Coast', 'Toowong', 'Fortitude Valley', 'West End'].map((area) => (
                <div key={area} className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="font-semibold text-gray-900">{area}</div>
                  <div className="text-sm text-purple-600 mt-1">24/7 Response</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Servicing all suburbs across Brisbane, Ipswich, Logan, and surrounding areas.
              </p>
              <Link
                href="/locations"
                className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2"
              >
                View All Service Areas
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Questions
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How quickly can you respond?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We're available 24/7 and can typically arrive within 2 hours of your call.
                    For urgent situations, we prioritise immediate response. Our team understands
                    the sensitive nature of these situations and will work with your timeline.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do you work with insurance companies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Yes, many insurance policies cover biohazard cleanup. We work directly with
                    all major insurance companies and can handle the claims process for you.
                    We'll provide all necessary documentation and photography for your claim.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How do you ensure complete decontamination?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We use hospital-grade disinfectants and follow strict IICRC protocols.
                    After cleaning, we perform ATP (Adenosine Triphosphate) testing to
                    scientifically verify that all biological matter has been removed.
                    You'll receive documentation confirming the area is safe.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Will neighbours know what happened?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Absolutely not. We use unmarked vehicles and our technicians wear plain
                    uniforms without company logos when requested. We understand the importance
                    of privacy and handle every situation with complete discretion.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              We're Here to Help
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              During difficult times, you need a team you can trust.
              Our compassionate professionals are available 24/7 to help you through this.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call 1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-900 transition-all border-2 border-white/30"
              >
                Request Confidential Service
              </Link>
            </div>

            <div className="mt-8 text-sm text-purple-200">
              Complete Discretion • Insurance Approved • IICRC Certified
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}