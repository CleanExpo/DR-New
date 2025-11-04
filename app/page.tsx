import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2 } from 'lucide-react';

// FORCE REBUILD - SIMPLIFIED VERSION ONLY
// Last updated: ${new Date().toISOString()}
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section ONLY */}
      <section className="relative min-h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/fire-water-damage-restoration.jpg"
            alt="Water Damage Restoration - Disaster Recovery Services Brisbane"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            When Disaster Strikes Your Brisbane Home,<br />
            Every Minute Counts
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto font-medium">
            Master Restorer responds in 60 minutes. Water damage. Fire damage. Storm damage.<br />
            Your home restored to perfection. Guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Phone className="w-6 h-6 mr-2 animate-pulse" />
              Emergency: Call 1300 309 361
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 text-lg font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip - Subliminal Authority Signals */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-white text-center">
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 mb-2 text-yellow-400" />
              <p className="text-sm font-semibold">Master Restorer</p>
              <p className="text-xs opacity-90">1 of 12 in QLD</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2 text-yellow-400" />
              <p className="text-sm font-semibold">20+ Years</p>
              <p className="text-xs opacity-90">Brisbane & Ipswich</p>
            </div>
            <div className="flex flex-col items-center">
              <Building2 className="w-8 h-8 mb-2 text-yellow-400" />
              <p className="text-sm font-semibold">All Major Insurers</p>
              <p className="text-xs opacity-90">Approved Partner</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 mb-2 text-yellow-400" />
              <p className="text-sm font-semibold">500+ Properties</p>
              <p className="text-xs opacity-90">Successfully Restored</p>
            </div>
            <div className="flex flex-col items-center md:col-span-1 col-span-2">
              <Shield className="w-8 h-8 mb-2 text-yellow-400" />
              <p className="text-sm font-semibold">60-Min Response</p>
              <p className="text-xs opacity-90">Emergency Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flooding Emergency Section ONLY */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
            Flooding Emergency in Brisbane?
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Ring Disaster Recovery now: 1300 309 361. We're in Wacol. We can be there within an hour.
          </p>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">What to Do Right Now:</h3>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-red-600">1</span>
                  <div>
                    <h4 className="font-bold mb-2">Turn off electricity</h4>
                    <p className="text-sm text-gray-600">
                      Find your metre box. Switch off the main breaker straight away.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-red-600">2</span>
                  <div>
                    <h4 className="font-bold mb-2">Stop water source</h4>
                    <p className="text-sm text-gray-600">
                      Turn off your water main. It's usually near your water meter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-red-600">3</span>
                  <div>
                    <h4 className="font-bold mb-2">Move valuables</h4>
                    <p className="text-sm text-gray-600">
                      Lift furniture, electronics, and documents above water level.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-red-600 text-white rounded-lg p-6">
              <h4 className="text-xl font-bold mb-2">4. Ring Disaster Recovery now</h4>
              <p className="mb-4">Call 1300 309 361. We're in Wacol. We can be there within an hour.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-bold rounded hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Ring 1300 309 361 Now
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition-colors"
                >
                  Get Emergency Help Online
                </Link>
              </div>
            </div>

            <p className="mt-8 text-gray-700">
              <strong>We're local to Brisbane:</strong><br />
              Office: 4/17 Tile St, Wacol • 24/7 Emergency Response • IICRC Certified • Insurance Approved
            </p>
          </div>
        </div>
      </section>

      {/* The Moment It Happened - Empathy Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero/fire-water-damage-restoration.jpg"
                    alt="Understanding your disaster recovery needs"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  You Woke Up to Water Spreading Across Your Floor
                </h2>

                <div className="space-y-4 text-lg text-gray-700">
                  <p className="leading-relaxed">
                    Your first thought: <span className="font-semibold text-gray-900">"Who do I call?"</span>
                  </p>
                  <p className="leading-relaxed">
                    Your second thought: <span className="font-semibold text-gray-900">"Will my home ever be the same?"</span>
                  </p>

                  <div className="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-white rounded-r-lg shadow-sm">
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      We understand that fear.
                    </p>
                    <p className="text-gray-700">
                      We've walked 500+ Brisbane families through it. And every single one of them got their home back. Better than before.
                    </p>
                  </div>

                  <p className="leading-relaxed">
                    Your home isn't just walls and floors. It's where your children took their first steps. Where you hosted Christmas dinner. Where you feel safe.
                  </p>

                  <p className="leading-relaxed font-semibold text-gray-900">
                    That's why you need more than just repairs. You need someone who understands what's really at stake.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/about-phil-mcgurk"
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                  >
                    Meet Our Master Restorer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Suburb Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Brisbane Suburbs We Specialize In
            </h2>
            <p className="text-xl text-gray-600">
              Specialized restoration for Brisbane's most exclusive neighborhoods
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link
              href="/brisbane/new-farm"
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">New Farm</h3>
                  <p className="text-sm text-gray-600">Heritage Waterfront</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Heritage Queenslander restoration and Brisbane River flood expertise.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/brisbane/hamilton"
              className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hamilton</h3>
                  <p className="text-sm text-gray-600">Executive Riverfront</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Discrete executive response for riverfront mansions and CEO residences.
              </p>
              <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/brisbane/ascot"
              className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Ascot</h3>
                  <p className="text-sm text-gray-600">Racecourse Precinct</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Racing industry expertise and equestrian property specialists.
              </p>
              <div className="flex items-center text-yellow-600 font-medium group-hover:text-yellow-700">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/brisbane/toowong"
              className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Toowong</h3>
                  <p className="text-sm text-gray-600">Heritage Character</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Heritage Queenslander restoration with council compliance.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/springfield-lakes"
              className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Springfield Lakes</h3>
                  <p className="text-sm text-gray-600">Premium Estates</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Lakefront property and golf course estate specialists.
              </p>
              <div className="flex items-center text-teal-600 font-medium group-hover:text-teal-700">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <div className="group bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Phone className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Your Suburb</h3>
                  <p className="text-sm text-gray-600">Custom Service</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Don't see your suburb? We service all Brisbane areas.
              </p>
              <div className="flex items-center text-gray-600 font-medium group-hover:text-gray-700">
                <span>Call 1300 309 361</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/brisbane"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Brisbane Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Phill McGurk - The Mentor/Expert */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold mb-6">
                  <Award className="inline-block w-5 h-5 mr-2" />
                  Master Restorer Certified
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Meet Phill McGurk<br />
                  <span className="text-yellow-400">One of Queensland's 12 Master Restorers</span>
                </h2>

                <div className="space-y-4 text-lg">
                  <p className="leading-relaxed">
                    When your $3M home floods, you need more than a contractor.
                  </p>

                  <p className="leading-relaxed">
                    You need someone who understands period features, heritage materials, and the irreplaceable details that make your house your home.
                  </p>

                  <blockquote className="border-l-4 border-yellow-400 pl-6 py-4 my-6 italic text-xl">
                    "I've spent 20 years becoming one of the best in Brisbane. Not the cheapest. The best.
                    <br /><br />
                    Because when you're trusting someone with your most valuable asset, 'good enough' isn't good enough."
                  </blockquote>

                  <p className="text-sm text-blue-200">
                    — Phill McGurk, Master Restorer<br />
                    IICRC Certified • 20+ Years Experience • 500+ Properties Restored
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/about-phil-mcgurk"
                    className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-lg transition-colors"
                  >
                    Read Phill's Story
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call 1300 309 361
                  </Link>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero/fire-water-damage-restoration.jpg"
                    alt="Phill McGurk - Master Restorer"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white font-bold text-xl">Phill McGurk</p>
                    <p className="text-yellow-400">Master Restorer • Brisbane</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NO OTHER SECTIONS - THIS IS THE COMPLETE PAGE */}
    </div>
  );
}