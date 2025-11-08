import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2 } from 'lucide-react';

// Homepage for Disaster Recovery Brisbane - Full website with header and navigation handled by layout.tsx
export default function HomePage() {
  // FAQ Schema Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you respond to water damage emergencies in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We respond to Brisbane water damage emergencies within 60 minutes for Brisbane CBD and inner suburbs like Hamilton, Ascot, New Farm, and Toowong. Greater Brisbane, Ipswich, and Logan receive response within 90 minutes. Call 1300 309 361 24/7 - our Master Restorer team is always ready with industrial water extraction equipment."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Phill McGurk different from other Brisbane restoration companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phill McGurk is one of Brisbane's limited IICRC Master Restorer certified professionals - the highest credential in disaster recovery. This means your property receives master-level expertise, not basic restoration. Most companies only have technician-level certification. Master Restorers have extensive experience, advanced training, and proven track records on complex high-value property restoration."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with all insurance companies in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We're approved by all major insurers including Suncorp, RACQ, Allianz, QBE, NRMA, Budget Direct, AAMI, and more. We handle direct billing - no upfront costs for insurance work. Our team manages all documentation, photos, moisture reports, and works directly with your insurance assessor to ensure smooth claim approval."
        }
      },
      {
        "@type": "Question",
        "name": "What areas of Brisbane do you service for emergency restoration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We service all Brisbane suburbs, Ipswich, and Logan. High-value suburbs like Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba get priority 60-minute response. We also cover Brisbane CBD, West End, Fortitude Valley, Chermside, Carindale, Mt Gravatt, Indooroopilly, Springfield Lakes, Karalee, Brookwater, Logan Central, Springwood, and all surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do immediately after water or fire damage in my Brisbane home?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Call us immediately at 1300 309 361 - even before your insurance company. For water damage: turn off water source if safe, move valuables to dry areas, don't use home appliances. For fire damage: don't enter until cleared by fire services, don't disturb soot or debris. We'll guide you through emergency steps and dispatch our Brisbane team within 60 minutes. Every minute counts in preventing secondary damage and mould growth."
        }
      },
      {
        "@type": "Question",
        "name": "How much does emergency restoration cost in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Costs vary by damage severity: minor water damage $1,500-$3,500, moderate $3,500-$6,000, major $6,000-$15,000+. Fire damage restoration ranges $2,000-$50,000+ depending on extent. Most Brisbane insurance policies cover disaster restoration costs. We provide free on-site assessments, detailed quotes, and handle direct insurance billing - no upfront payment required for insured work."
        }
      }
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disasterrecovery.com.au"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section - Storm & Fire Landing Page */}
      <section className="relative min-h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/landing-page-hero.png"
            alt="Water Damage Restoration Brisbane - IICRC Master Restorer - 24/7 Emergency Response"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Image already contains text and buttons - no overlay needed */}
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Brisbane Trusts Phill McGurk</h2>
            <p className="text-blue-200">Master Restorer Credentials • Proven Track Record • 24/7 Availability</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">Master Restorer</div>
              <div className="text-sm opacity-90">IICRC Certified</div>
              <div className="text-xs mt-2 text-yellow-300">Limited in QLD</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">60 Minutes</div>
              <div className="text-sm opacity-90">Response Time</div>
              <div className="text-xs mt-2 text-yellow-300">Brisbane Metro</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">All Insurers</div>
              <div className="text-sm opacity-90">Direct Billing</div>
              <div className="text-xs mt-2 text-yellow-300">No Upfront Costs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Star className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">500+ Jobs</div>
              <div className="text-sm opacity-90">Completed</div>
              <div className="text-xs mt-2 text-yellow-300">Brisbane & Ipswich</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">24/7/365</div>
              <div className="text-sm opacity-90">Emergency Service</div>
              <div className="text-xs mt-2 text-yellow-300">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-full">
              🚨 24/7 Brisbane Emergency Service
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">IICRC Master Restorer Emergency Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>Phill McGurk - IICRC Master Restorer</strong> responds to Brisbane, Ipswich & Logan emergencies with proven expertise in water, fire, and storm damage restoration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-blue-500 border-2 border-transparent">
              <div className="text-blue-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Water Damage Restoration Brisbane</h3>
              <p className="text-gray-600 mb-4">
                <strong>Emergency water extraction 24/7.</strong> Burst pipes, floods, storm water in Hamilton, Ascot, New Farm, Toowong. Industrial pumps, thermal imaging, complete structural drying. Prevent mould within hours.
              </p>
              <div className="mb-4 text-sm text-gray-700">
                ✓ 60-min response • ✓ Insurance approved • ✓ IICRC Master certified
              </div>
              <Link href="/emergency/water-damage-brisbane" className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center">
                Emergency Service <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-red-500 border-2 border-transparent">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Fire & Smoke Damage Brisbane</h3>
              <p className="text-gray-600 mb-4">
                <strong>Complete fire restoration.</strong> Kitchen fires, electrical fires, smoke odour removal. Thermal fogging, hydroxyl treatment. Ipswich, Logan, Brisbane CBD. Contents cleaning, structural repairs.
              </p>
              <div className="mb-4 text-sm text-gray-700">
                ✓ Same-day response • ✓ Smoke elimination • ✓ Contents restoration
              </div>
              <Link href="/emergency/fire-damage-brisbane" className="text-red-600 font-bold hover:text-red-700 inline-flex items-center">
                Emergency Service <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-green-500 border-2 border-transparent">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Mould Remediation Brisbane</h3>
              <p className="text-gray-600 mb-4">
                <strong>Professional mould removal.</strong> Black mould, bathroom mould, post-flood contamination. HEPA filtration, antimicrobial treatment. Air quality testing. Brisbane properties, health-safe results.
              </p>
              <div className="mb-4 text-sm text-gray-700">
                ✓ Health-safe methods • ✓ Complete removal • ✓ Prevention plan
              </div>
              <Link href="/services/mould-remediation" className="text-green-600 font-bold hover:text-green-700 inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-full">
              ⭐ Master Restorer Excellence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why High-Value Brisbane Properties Choose Phill McGurk
            </h2>
            <p className="text-xl text-gray-600">
              One of Brisbane and Queensland&apos;s Limited Master Restorer Certified Professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-yellow-500 rounded-full p-3 flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Master Restorer Certified - Rare in Brisbane</h3>
                <p className="text-gray-600">
                  <strong>Phill McGurk</strong> holds <strong>IICRC Master Restorer</strong> certification - the highest credential in disaster recovery. One of a limited number in Brisbane and QLD. Your high-value property deserves master-level expertise.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">All Major Insurers - Direct Billing</h3>
                <p className="text-gray-600">
                  Approved by <strong>Suncorp, RACQ, Allianz, QBE, NRMA</strong> and all major insurers. We handle your entire claim process - documentation, photos, moisture reports, assessor meetings. <strong>No upfront costs</strong> for insurance work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">60-Minute Emergency Response Brisbane</h3>
                <p className="text-gray-600">
                  <strong>Call 1300 309 361 - 24/7/365.</strong> Rapid response to Hamilton, Ascot, New Farm, Toowong, Brisbane CBD within 60 minutes. Every minute counts in minimizing water and fire damage. Industrial equipment on every truck.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-green-600 rounded-full p-3 flex-shrink-0">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Brisbane Local - We Know Your Property</h3>
                <p className="text-gray-600">
                  <strong>Based in Wacol, QLD.</strong> Deep knowledge of Brisbane Queenslander homes, weather patterns, flood zones, insurance requirements. Specialist experience with high-value Hamilton, Ascot, New Farm properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Brisbane, Ipswich & Logan Service Areas</h2>
            <p className="text-xl text-gray-600">Master Restorer emergency response across all Brisbane metro suburbs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Brisbane</h3>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-blue-600 mb-2">High-Value Suburbs:</p>
                <p className="text-gray-700 text-sm mb-3">Hamilton • Ascot • New Farm • Toowong • Paddington • Bulimba</p>
                <p className="font-semibold text-gray-900 mb-2">All Brisbane Areas:</p>
                <p className="text-gray-600 text-sm">CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly</p>
              </div>
              <Link href="/locations/brisbane" className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center">
                View Brisbane Coverage <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Ipswich</h3>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-purple-600 mb-2">Premium Areas:</p>
                <p className="text-gray-700 text-sm mb-3">Karalee • Brookwater • Springfield Lakes</p>
                <p className="font-semibold text-gray-900 mb-2">All Ipswich Region:</p>
                <p className="text-gray-600 text-sm">Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt</p>
              </div>
              <Link href="/locations/ipswich" className="text-purple-600 font-bold hover:text-purple-700 inline-flex items-center">
                View Ipswich Coverage <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
                <h3 className="text-2xl font-bold text-gray-900">Logan</h3>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-orange-600 mb-2">Commercial Focus:</p>
                <p className="text-gray-700 text-sm mb-3">Logan Central business district, industrial areas</p>
                <p className="font-semibold text-gray-900 mb-2">All Logan Areas:</p>
                <p className="text-gray-600 text-sm">Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby</p>
              </div>
              <Link href="/locations/logan" className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center">
                View Logan Coverage <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-700">
              <strong>Emergency Response Times:</strong> 60 minutes Brisbane CBD & inner suburbs • 90 minutes greater Brisbane, Ipswich, Logan
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Showcase Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full">
              📱 Access Emergency Services Anywhere
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Us on Mobile - 24/7 Emergency Response
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access IICRC Master Restorer Phill McGurk&apos;s emergency disaster recovery services from any device - iPhone, Android, tablet, or desktop
            </p>
          </div>

          {/* Mobile Showcase Images */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <Image
                src="/images/mobile-showcase.webp"
                alt="Disaster Recovery Brisbane mobile website displayed on iPhone and Android smartphones - IICRC Master Restorer Phill McGurk emergency services accessible 24/7 for water damage, fire damage and mould remediation across Brisbane, Ipswich and Logan"
                title="Mobile-Friendly Emergency Services | 1300 309 361 | Access Anywhere"
                width={1200}
                height={800}
                loading="lazy"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Feature Graphics */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Image
                src="/images/optimized/branding/disaster-recovery-logo.webp"
                alt="Disaster Recovery Brisbane feature - IICRC Master Restorer emergency restoration services available on all devices for immediate response"
                title="Emergency Restoration Brisbane | 1300 309 361 | Multi-Device Access"
                width={800}
                height={600}
                loading="lazy"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Image
                src="/images/disaster-response-mobile.webp"
                alt="Disaster Response Brisbane mobile emergency services - Contact IICRC Master Restorer Phill McGurk instantly from smartphone for 24/7 water damage, fire damage restoration across Brisbane, Ipswich, Logan"
                title="Mobile Emergency Response | 1300 309 361 | Instant Contact"
                width={800}
                height={600}
                loading="lazy"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Mobile Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Mobile-Optimized</h3>
              <p className="text-gray-600 text-sm">
                Fast-loading, responsive design works perfectly on all smartphones and tablets
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">One-Tap Calling</h3>
              <p className="text-gray-600 text-sm">
                Call 1300 309 361 instantly from your mobile device for emergency response
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Expert Information</h3>
              <p className="text-gray-600 text-sm">
                Access Master Restorer expertise, service details, and emergency guidance on-the-go
              </p>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Emergency? Call Now from Your Mobile
            </h3>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
              aria-label="Call 1300 309 361 for emergency service"
            >
              <Phone className="w-6 h-6 mr-2 animate-pulse" />
              1300 309 361
            </a>
            <p className="mt-4 text-red-100 text-sm">
              24/7 Emergency Response • 60-Minute Arrival Brisbane • Master Restorer Certified
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Brisbane Disaster Recovery - Common Questions
            </h2>
            <p className="text-xl text-gray-600">Expert answers from IICRC Master Restorer Phill McGurk</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>How quickly can you respond to water damage emergencies in Brisbane?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                We respond to Brisbane water damage emergencies within <strong>60 minutes for Brisbane CBD and inner suburbs</strong> like Hamilton, Ascot, New Farm, and Toowong. Greater Brisbane, Ipswich, and Logan receive response within 90 minutes. Call <strong>1300 309 361</strong> 24/7 - our Master Restorer team is always ready with industrial water extraction equipment.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>What makes Phill McGurk different from other Brisbane restoration companies?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                <strong>Phill McGurk is one of Brisbane&apos;s limited IICRC Master Restorer certified professionals</strong> - the highest credential in disaster recovery. This means your property receives master-level expertise, not basic restoration. Most companies only have technician-level certification. Master Restorers have extensive experience, advanced training, and proven track records on complex high-value property restoration.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>Do you work with all insurance companies in Brisbane?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Yes! We&apos;re <strong>approved by all major insurers</strong> including Suncorp, RACQ, Allianz, QBE, NRMA, Budget Direct, AAMI, and more. We handle <strong>direct billing - no upfront costs</strong> for insurance work. Our team manages all documentation, photos, moisture reports, and works directly with your insurance assessor to ensure smooth claim approval.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>What areas of Brisbane do you service for emergency restoration?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                We service <strong>all Brisbane suburbs, Ipswich, and Logan</strong>. High-value suburbs like Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba get priority 60-minute response. We also cover Brisbane CBD, West End, Fortitude Valley, Chermside, Carindale, Mt Gravatt, Indooroopilly, Springfield Lakes, Karalee, Brookwater, Logan Central, Springwood, and all surrounding areas.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>What should I do immediately after water or fire damage in my Brisbane home?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                <strong>Call us immediately at 1300 309 361</strong> - even before your insurance company. For water damage: turn off water source if safe, move valuables to dry areas, don&apos;t use home appliances. For fire damage: don&apos;t enter until cleared by fire services, don&apos;t disturb soot or debris. We&apos;ll guide you through emergency steps and dispatch our Brisbane team within 60 minutes. Every minute counts in preventing secondary damage and mould growth.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>How much does emergency restoration cost in Brisbane?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Costs vary by damage severity: minor water damage $1,500-$3,500, moderate $3,500-$6,000, major $6,000-$15,000+. Fire damage restoration ranges $2,000-$50,000+ depending on extent. <strong>Most Brisbane insurance policies cover disaster restoration costs</strong>. We provide free on-site assessments, detailed quotes, and handle direct insurance billing - no upfront payment required for insured work.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full animate-pulse">
              🚨 EMERGENCY? Call Master Restorer NOW
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Brisbane Water or Fire Damage Emergency?
            </h2>
            <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
              Every Minute Counts - Don&apos;t Wait
            </p>
            <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
              <strong>IICRC Master Restorer Phill McGurk</strong> and team respond within 60 minutes across Brisbane. Industrial equipment. Direct insurance billing. No upfront costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-12 py-6 bg-white text-red-600 font-bold text-2xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
                aria-label="Call 1300 309 361 for emergency service"
              >
                <Phone className="w-8 h-8 mr-3 animate-pulse" />
                1300 309 361
              </a>
              <a
                href="mailto:info@disasterrecoverybrisbane.com.au"
                className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
                aria-label="Email us for service booking"
              >
                Email for Assessment
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">⚡ 60 Minutes</div>
                <div className="text-red-100">Emergency Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">🏆 Master Restorer</div>
                <div className="text-red-100">IICRC Certified</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">🛡️ All Insurers</div>
                <div className="text-red-100">Direct Billing</div>
              </div>
            </div>

            <p className="mt-8 text-lg text-red-100">
              Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
