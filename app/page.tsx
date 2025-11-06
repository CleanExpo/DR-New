import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2 } from 'lucide-react';

// Homepage for Disaster Recovery Brisbane - Full website with header and navigation handled by layout.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/fire-water-damage-restoration.jpg"
            alt="Disaster Recovery Services Brisbane - Water & Fire Damage Restoration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            When Disaster Strikes Your Brisbane Home,<br />
            Every Minute Counts
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Master Restorer responds in 60 minutes. Water damage. Fire damage. Storm damage.<br />
            Your home restored to perfection. Guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency: Call 1300 309 361
            </Link>

            <Link
              href="/book-service"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Assessment
            </Link>
          </div>

          <p className="text-sm opacity-90">
            <MapPin className="w-4 h-4 inline mr-1" />
            4/17 Tile St, Wacol, QLD 4076 | 24/7 Emergency Response
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">IICRC & RAI Master</div>
              <div className="text-sm opacity-90">Double Certified</div>
            </div>
            <div>
              <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">20+ Years</div>
              <div className="text-sm opacity-90">Brisbane & Ipswich</div>
            </div>
            <div>
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">All Major Insurers</div>
              <div className="text-sm opacity-90">Approved Partner</div>
            </div>
            <div>
              <Users className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">500+ Properties</div>
              <div className="text-sm opacity-90">Successfully Restored</div>
            </div>
            <div>
              <Building2 className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold mb-1">60-Min Response</div>
              <div className="text-sm opacity-90">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Emergency Restoration Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IICRC Master Restorer Phill McGurk and his team provide 24/7 emergency response across Brisbane, Ipswich, and Logan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Water Damage Restoration</h3>
              <p className="text-gray-600 mb-4">
                Burst pipes, flooding, storm damage. Industrial pumps and drying equipment. We extract water and prevent mould growth.
              </p>
              <Link href="/services/water-damage-restoration" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Fire & Smoke Damage</h3>
              <p className="text-gray-600 mb-4">
                Complete fire restoration. Smoke odour removal. Structural repairs. Contents cleaning and restoration.
              </p>
              <Link href="/services/fire-damage-restoration" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Mould Remediation</h3>
              <p className="text-gray-600 mb-4">
                Professional mould removal and prevention. Air quality testing. Complete decontamination. Health-safe environment.
              </p>
              <Link href="/services/mould-remediation" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Brisbane Trusts Disaster Recovery</h2>
            <p className="text-xl text-gray-600">One of Brisbane's few IICRC Master Restorers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Master Restorer Certified</h3>
                <p className="text-gray-600">
                  Phill McGurk holds both IICRC and RAI Master Restorer certifications - one of a limited number in Brisbane and QLD.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Insurance Approved</h3>
                <p className="text-gray-600">
                  We work directly with all major insurance companies. Streamlined claims process. No upfront costs for insured work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">24/7 Emergency Response</h3>
                <p className="text-gray-600">
                  Call 1300 309 361 any time. We respond within 60 minutes to emergencies across Brisbane, Ipswich, and Logan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Local Brisbane Team</h3>
                <p className="text-gray-600">
                  Based in Wacol, QLD. We know Brisbane properties, weather patterns, and insurance requirements inside out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Areas</h2>
          <p className="text-xl text-gray-600 mb-8">Emergency restoration across Brisbane, Ipswich, and Logan</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-3">Brisbane</h3>
              <p className="text-gray-600">Hamilton, Ascot, New Farm, Toowong, CBD, and all surrounding suburbs</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Ipswich</h3>
              <p className="text-gray-600">Karalee, Brookwater, Springfield Lakes, and greater Ipswich region</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Logan</h3>
              <p className="text-gray-600">Commercial properties and residential areas throughout Logan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-red-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Experiencing a Disaster Emergency?</h2>
          <p className="text-2xl mb-8">Every minute counts. Call now for immediate response.</p>
          <Link
            href="tel:1300309361"
            className="inline-flex items-center justify-center px-12 py-5 bg-white text-red-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Phone className="w-6 h-6 mr-3" />
            1300 309 361
          </Link>
          <p className="mt-6 text-lg opacity-90">24/7 Emergency Service | 60-Minute Response</p>
        </div>
      </section>
    </div>
  );
}
