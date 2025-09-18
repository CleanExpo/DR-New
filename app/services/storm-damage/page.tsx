'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Phone, Clock, Shield, CheckCircle, AlertCircle, Truck, Home, Building } from 'lucide-react';

export default function StormDamagePage() {
  const [activeTab, setActiveTab] = useState('emergency');

  const stormServices = [
    {
      title: "Emergency Tarping & Board-Up",
      description: "Immediate protection to prevent further damage",
      icon: Shield,
      features: [
        "Roof tarping services",
        "Window boarding",
        "Structural stabilisation",
        "Emergency weatherproofing"
      ]
    },
    {
      title: "Water Extraction & Drying",
      description: "Rapid flood water removal and structural drying",
      icon: Truck,
      features: [
        "High-capacity water extraction",
        "Industrial dehumidification",
        "Moisture monitoring",
        "Structural drying equipment"
      ]
    },
    {
      title: "Structural Repairs",
      description: "Complete restoration of storm-damaged structures",
      icon: Building,
      features: [
        "Roof repairs & replacement",
        "Wall & ceiling restoration",
        "Foundation assessments",
        "Complete reconstruction"
      ]
    },
    {
      title: "Contents Restoration",
      description: "Professional restoration of damaged belongings",
      icon: Home,
      features: [
        "Furniture restoration",
        "Electronics recovery",
        "Document drying",
        "Artwork & valuables"
      ]
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      title: "Ensure Safety First",
      description: "Turn off electricity and gas. Avoid standing water that may be electrically charged.",
      urgent: true
    },
    {
      step: 2,
      title: "Document Damage",
      description: "Take photos and videos for insurance claims before moving anything.",
      urgent: false
    },
    {
      step: 3,
      title: "Call Our Emergency Team",
      description: "Contact us immediately on 1300 309 361 for rapid response.",
      urgent: true
    },
    {
      step: 4,
      title: "Prevent Further Damage",
      description: "Cover damaged areas with tarps and move valuables to safety if possible.",
      urgent: false
    }
  ];

  const stormTypes = [
    {
      type: "Cyclone & Wind Damage",
      services: ["Roof repairs", "Structural stabilisation", "Debris removal", "Window replacement"],
      responseTime: "Quick response"
    },
    {
      type: "Flood & Water Damage",
      services: ["Water extraction", "Rapid drying", "Mould prevention", "Contents recovery"],
      responseTime: "Immediate phone support"
    },
    {
      type: "Hail Damage",
      services: ["Roof assessment", "Window replacement", "Vehicle protection", "Insurance documentation"],
      responseTime: "Quick response"
    },
    {
      type: "Lightning Strike",
      services: ["Electrical safety check", "Fire damage assessment", "Structural repairs", "Smoke remediation"],
      responseTime: "Emergency phone support"
    }
  ];

  return (
    <>
      <SchemaMarkup
        type="Service"
        data={{
          serviceName: 'Storm & Flood Damage Restoration',
          provider: 'Disaster Recovery',
          areaServed: ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast', 'Sunshine Coast'],
          description: 'Professional storm damage restoration services including emergency tarping, water extraction, structural repairs and complete restoration for commercial and residential properties.'
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Services", url: "https://disasterrecovery.com.au/services" },
            { name: "Storm & Flood Damage", url: "https://disasterrecovery.com.au/services/storm-damage" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Storm & Flood Damage Restoration Service">

        {/* Hero Section with Emergency Alert */}
        <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            {/* Emergency Alert Bar */}
            <div className="bg-red-600 text-white p-4 rounded-lg mb-8 flex items-center justify-center gap-3 animate-pulse">
              <AlertCircle className="w-6 h-6" />
              <span className="font-bold">STORM EMERGENCY?</span>
              <a href="tel:1300309361" className="underline font-bold">Call 1300 309 361 NOW</a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Storm & Flood Damage<br/>
                  <span className="text-blue-400">Restoration Experts</span>
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  Brisbane & Ipswich's trusted storm damage restoration specialists.
                  IICRC certified technicians, insurance approved processes, and 24/7 emergency response
                  for both commercial facilities and residential properties.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur p-3 rounded">
                    <div className="text-2xl font-bold text-yellow-400">1 Hour</div>
                    <div className="text-sm">Response Time</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-3 rounded">
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-sm">Emergency Service</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-3 rounded">
                    <div className="text-2xl font-bold text-yellow-400">IICRC</div>
                    <div className="text-sm">Certified Team</div>
                  </div>
                </div>
              </div>

              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/storm-damage-restoration.jpg"
                  alt="Storm damage restoration team responding to emergency in Brisbane"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Response Tabs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              Complete Storm Damage Solutions
            </h2>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg shadow-md p-1 flex gap-2">
                <button
                  onClick={() => setActiveTab('emergency')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all ${
                    activeTab === 'emergency'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Emergency Response
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all ${
                    activeTab === 'services'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Our Services
                </button>
                <button
                  onClick={() => setActiveTab('process')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all ${
                    activeTab === 'process'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Storm Types
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'emergency' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencySteps.map((item) => (
                  <Card key={item.step} className={`${item.urgent ? 'border-red-500 border-2' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                          item.urgent ? 'bg-red-600' : 'bg-blue-600'
                        }`}>
                          {item.step}
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                      {item.urgent && (
                        <div className="mt-3 text-red-600 font-semibold flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Critical Action Required
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stormServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card key={service.title} className="hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Icon className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                            <CardDescription className="text-base">
                              {service.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {activeTab === 'process' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stormTypes.map((storm) => (
                  <Card key={storm.type} className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{storm.type}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600">
                          Response Time: {storm.responseTime}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {storm.services.map((service, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Queensland Storm Season Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Queensland Storm Season Preparedness
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Nov - Apr</div>
                  <div className="text-lg font-semibold mb-2">Storm Season</div>
                  <p className="text-gray-600">Peak season for cyclones, storms and flooding in Southeast Queensland</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                  <div className="text-lg font-semibold mb-2">Annual Responses</div>
                  <p className="text-gray-600">Emergency storm damage callouts across Brisbane & Ipswich</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$20M</div>
                  <div className="text-lg font-semibold mb-2">Insurance Coverage</div>
                  <p className="text-gray-600">Full public liability protection for all restoration work</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Storm Damage Response Areas
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Brisbane CBD', 'Ipswich', 'Logan', 'Fortitude Valley', 'West End', 'New Farm', 'Toowong', 'St Lucia'].map((area) => (
                <div key={area} className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="font-semibold text-gray-900">{area}</div>
                  <div className="text-sm text-gray-600 mt-1">24/7 Response</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/locations"
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2"
              >
                View All Service Areas
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Insurance Claims Support */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Insurance Claims Assistance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">We Work With All Major Insurers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Direct Insurance Billing</div>
                      <div className="text-gray-300">We handle all paperwork and liaise directly with your insurer</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Detailed Documentation</div>
                      <div className="text-gray-300">Complete photo and video evidence for your claim</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Approved Restoration Methods</div>
                      <div className="text-gray-300">IICRC certified processes accepted by all insurers</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Make Safe Authorisation</div>
                      <div className="text-gray-300">Immediate approval for emergency protection work</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Insurance Partners</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['QBE', 'IAG', 'RACQ', 'Allianz', 'Suncorp', 'AAMI'].map((insurer) => (
                    <div key={insurer} className="bg-white/10 p-3 rounded text-center font-semibold">
                      {insurer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Storm Damage FAQs
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How quickly can you respond to storm damage?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We guarantee quick emergency phone response for storm damage in Brisbane and Ipswich.
                    Our teams are on standby 24/7 during storm season and can begin coordinating make-safe work immediately.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do you work directly with insurance companies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Yes, we're approved restoration contractors for all major insurers. We handle all documentation,
                    provide detailed quotes, and can direct bill your insurance company to minimise your out-of-pocket expenses.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What should I do immediately after storm damage?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    First, ensure everyone's safety and avoid damaged areas. Turn off electricity if there's water damage.
                    Document all damage with photos, then call us on 1300 309 361. We'll guide you through emergency steps
                    and dispatch our team immediately.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can you prevent mould after flood damage?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Yes, rapid water extraction and professional drying within 24-48 hours is critical to prevent mould growth.
                    Our IICRC certified technicians use industrial dehumidifiers, air movers, and antimicrobial treatments
                    to ensure your property is thoroughly dried and protected.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Storm Damage Emergency?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Don't wait - every minute counts in preventing further damage.
              Our expert team is ready to respond immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call 1300 309 361 Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-all border-2 border-white/30"
              >
                Request Emergency Service
              </Link>
            </div>

            <div className="mt-8 text-sm text-blue-200">
              Available 24/7 • Insurance Approved • IICRC Certified
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}