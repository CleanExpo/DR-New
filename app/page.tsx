import Link from 'next/link';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2 } from 'lucide-react';
import { HeroImage } from '@/components/image-optimization';

// Homepage for Disaster Recovery Brisbane - Full website with header and navigation handled by layout.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <HeroImage
            src="/images/hero/fire-water-damage-restoration.jpg"
            alt="Emergency Disaster Recovery Brisbane - Phill McGurk IICRC Master Restorer - 24/7 Water Fire Storm Damage - Hamilton Ascot Toowong Ipswich Logan"
            fill
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/55" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full">
            ⭐ One of Brisbane's Only IICRC Master Restorers
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Brisbane Water & Fire Damage?<br />
            <span className="text-yellow-400">60-Minute Emergency Response</span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto font-semibold">
            Phill McGurk - IICRC & RAI Master Restorer - Restores Hamilton, Ascot, New Farm, Toowong & All Brisbane Properties
          </p>

          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
            24/7 emergency water extraction • Fire & smoke restoration • Storm damage repair<br />
            Direct insurance billing • No upfront costs • Brisbane, Ipswich & Logan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-500/50 transform hover:scale-105"
            >
              <Phone className="w-6 h-6 mr-2 animate-pulse" />
              CALL NOW: 1300 309 361
            </Link>

            <Link
              href="/book-service"
              className="inline-flex items-center justify-center px-10 py-5 bg-yellow-500 text-black font-bold text-xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
            >
              Get FREE Quote - 24/7
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Wacol, QLD</span>
            </div>
            <span>•</span>
            <span>⚡ 60-Min Response Brisbane</span>
            <span>•</span>
            <span>🏆 Master Restorer Certified</span>
          </div>
        </div>
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
              <div className="text-sm opacity-90">IICRC & RAI Certified</div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Master Restorer Emergency Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>Phill McGurk - IICRC & RAI Master Restorer</strong> responds to Brisbane, Ipswich & Logan emergencies with proven expertise in water, fire, and storm damage restoration
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
              One of Brisbane and Queensland's Limited Master Restorer Certified Professionals
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
                  <strong>Phill McGurk</strong> holds both <strong>IICRC Master Restorer</strong> and <strong>RAI Master Restorer</strong> certifications - the highest credentials in disaster recovery. One of a limited number in Brisbane and QLD. Your high-value property deserves master-level expertise.
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
                <strong>Phill McGurk is one of Brisbane's limited IICRC and RAI Master Restorer certified professionals</strong> - the highest credentials in disaster recovery. This means your property receives master-level expertise, not basic restoration. Most companies only have technician-level certification. Master Restorers have extensive experience, advanced training, and proven track records on complex high-value property restoration.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>Do you work with all insurance companies in Brisbane?</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Yes! We're <strong>approved by all major insurers</strong> including Suncorp, RACQ, Allianz, QBE, NRMA, Budget Direct, AAMI, and more. We handle <strong>direct billing - no upfront costs</strong> for insurance work. Our team manages all documentation, photos, moisture reports, and works directly with your insurance assessor to ensure smooth claim approval.
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
                <strong>Call us immediately at 1300 309 361</strong> - even before your insurance company. For water damage: turn off water source if safe, move valuables to dry areas, don't use home appliances. For fire damage: don't enter until cleared by fire services, don't disturb soot or debris. We'll guide you through emergency steps and dispatch our Brisbane team within 60 minutes. Every minute counts in preventing secondary damage and mould growth.
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
              Every Minute Counts - Don't Wait
            </p>
            <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
              <strong>IICRC Master Restorer Phill McGurk</strong> and team respond within 60 minutes across Brisbane. Industrial equipment. Direct insurance billing. No upfront costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-12 py-6 bg-white text-red-600 font-bold text-2xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
              >
                <Phone className="w-8 h-8 mr-3 animate-pulse" />
                1300 309 361
              </Link>
              <Link
                href="/book-service"
                className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
              >
                Book FREE Assessment
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">⚡ 60 Minutes</div>
                <div className="text-red-100">Emergency Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">🏆 Master Restorer</div>
                <div className="text-red-100">IICRC & RAI Certified</div>
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
