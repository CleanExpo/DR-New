import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2 } from 'lucide-react';

// Homepage for Disaster Recovery Brisbane with Core Web Vitals optimizations
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Optimized for LCP */}
      <section className="relative min-h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          {/* Optimized hero image with proper dimensions for CLS prevention */}
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Water Damage Restoration Brisbane - IICRC Master Restorer - 24/7 Emergency Response"
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Water Damage Restoration Brisbane | 24/7 Emergency
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            24-hour water damage, fire damage, and flood restoration. IICRC certified.<br />
            Insurance approved. We can be there within 1 hour.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all shadow-2xl"
              aria-label="Call 1300 309 361 for emergency service"
            >
              <Phone className="w-6 h-6 mr-2" aria-hidden="true" />
              📞 1300 309 361
            </a>

            <a
              href="mailto:info@disasterrecoverybrisbane.com.au"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl"
              aria-label="Email us for emergency assistance"
            >
              Emergency Email
            </a>
          </div>

          <div className="text-sm md:text-base opacity-90">
            <span>Office: 4/17 Tile St, Wacol, QLD 4076</span>
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
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <div className="text-2xl font-bold mb-1">Master Restorer</div>
              <div className="text-sm opacity-90">IICRC Certified</div>
              <div className="text-xs mt-2 text-yellow-300">Limited in QLD</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <div className="text-2xl font-bold mb-1">60 Minutes</div>
              <div className="text-sm opacity-90">Response Time</div>
              <div className="text-xs mt-2 text-yellow-300">Brisbane Metro</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <div className="text-2xl font-bold mb-1">All Insurers</div>
              <div className="text-sm opacity-90">Direct Billing</div>
              <div className="text-xs mt-2 text-yellow-300">No Upfront Costs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Star className="w-12 h-12 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <div className="text-2xl font-bold mb-1">500+ Jobs</div>
              <div className="text-sm opacity-90">Completed</div>
              <div className="text-xs mt-2 text-yellow-300">Brisbane & Ipswich</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
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
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                Emergency Service <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-red-500 border-2 border-transparent">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                Emergency Service <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-green-500 border-2 border-transparent">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                Learn More <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Showcase Section - Lazy loaded images */}
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

          {/* Mobile Showcase Images - Lazy loaded with proper dimensions */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-8 shadow-2xl" style={{ aspectRatio: '3/2' }}>
              <Image
                src="/images/mobile-showcase.webp"
                alt="Disaster Recovery Brisbane mobile website displayed on iPhone and Android smartphones - IICRC Master Restorer Phill McGurk emergency services accessible 24/7 for water damage, fire damage and mould remediation across Brisbane, Ipswich and Logan"
                title="Mobile-Friendly Emergency Services | 1300 309 361 | Access Anywhere"
                width={1200}
                height={800}
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Feature Graphics - Lazy loaded */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/images/optimized/branding/disaster-recovery-logo.webp"
                alt="Disaster Recovery Brisbane feature - IICRC Master Restorer emergency restoration services available on all devices for immediate response"
                title="Emergency Restoration Brisbane | 1300 309 361 | Multi-Device Access"
                width={800}
                height={600}
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg" style={{ aspectRatio: '4/3' }}>
              <Image
                src="/images/disaster-response-mobile.webp"
                alt="Disaster Response Brisbane mobile emergency services - Contact IICRC Master Restorer Phill McGurk instantly from smartphone for 24/7 water damage, fire damage restoration across Brisbane, Ipswich, Logan"
                title="Mobile Emergency Response | 1300 309 361 | Instant Contact"
                width={800}
                height={600}
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of homepage remains the same... */}
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
                <Phone className="w-8 h-8 mr-3 animate-pulse" aria-hidden="true" />
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
