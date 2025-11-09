import Link from 'next/link';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2, BookOpen, GraduationCap, Network } from 'lucide-react';
import { HeroImage } from '@/components/image-optimization';

/**
 * Dual-Audience Homepage for Disaster Recovery Brisbane
 * Serves both emergency service clients AND restoration contractors
 */
export default function DualAudienceHomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dual Positioning */}
      <section className="relative min-h-[700px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <HeroImage
            src="/images/hero/fire-water-damage-restoration.jpg"
            alt="Brisbane Master Restorer | IICRC Training Provider | Emergency Services & Contractor Education"
            fill
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full">
            ⭐ Brisbane's Master Restorer | IICRC Training Provider
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Brisbane's Master Restorer<br />
            <span className="text-yellow-400">Emergency Services | IICRC Training</span>
          </h1>

          <p className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto font-semibold">
            24/7 Emergency Restoration for Property Owners<br />
            Professional IICRC Training for Restoration Contractors
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-10 py-5 bg-red-700 text-white font-bold text-xl rounded-lg hover:bg-red-800 transition-all shadow-2xl hover:shadow-red-500/50 transform hover:scale-105"
            >
              <Phone className="w-6 h-6 mr-2 animate-pulse" />
              Emergency: 1300 309 361
            </Link>

            <Link
              href="/carsi"
              className="inline-flex items-center justify-center px-10 py-5 bg-blue-700 text-white font-bold text-xl rounded-lg hover:bg-blue-800 transition-all shadow-2xl transform hover:scale-105"
            >
              <GraduationCap className="w-6 h-6 mr-2" />
              IICRC Training Courses
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm">
            <span>🏆 IICRC Master Restorer</span>
            <span>•</span>
            <span>📚 CARSI Training Provider</span>
            <span>•</span>
            <span>🌐 NRPG Network</span>
          </div>
        </div>
      </section>

      {/* Audience Selector Section */}
      <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Who Are You?</h2>
            <p className="text-xl text-gray-300">Choose your path to access the right services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Client Path */}
            <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold">I Need Emergency Service</h3>
              </div>
              <p className="text-lg mb-6 text-red-100">
                Water damage, fire damage, mould, or storm damage to your Brisbane property? Get immediate help from Master Restorer Phill McGurk.
              </p>
              <ul className="space-y-2 mb-6 text-red-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>60-minute emergency response</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>24/7 availability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Direct insurance billing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>IICRC Master Restorer certified</span>
                </li>
              </ul>
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all"
              >
                Call Now: 1300 309 361
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Contractor Path */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold">I'm a Restoration Contractor</h3>
              </div>
              <p className="text-lg mb-6 text-blue-100">
                Join Australia's leading restoration professionals network. Access IICRC training, earn CECs, and grow your restoration business.
              </p>
              <ul className="space-y-2 mb-6 text-blue-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>IICRC-approved CEC courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>NRPG membership benefits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Online CARSI training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Master Restorer instruction</span>
                </li>
              </ul>
              <Link
                href="/for-contractors"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all"
              >
                Explore Contractor Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Section - Emergency Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-full">
              🚨 For Property Owners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">24/7 Emergency Restoration Services Brisbane</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IICRC Master Restorer Phill McGurk provides rapid response to water, fire, and storm damage across Brisbane, Ipswich, and Logan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-blue-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Water Damage Restoration</h3>
              <p className="text-gray-600 mb-4">
                Emergency water extraction, structural drying, flood damage restoration. 60-minute response across Brisbane metro.
              </p>
              <Link href="/emergency/water-damage-brisbane" className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center">
                24/7 Emergency Service <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Fire & Smoke Damage</h3>
              <p className="text-gray-600 mb-4">
                Complete fire restoration, smoke odor removal, soot cleanup. Thermal fogging and hydroxyl treatment available.
              </p>
              <Link href="/emergency/fire-damage-brisbane" className="text-red-600 font-bold hover:text-red-700 inline-flex items-center">
                Get Immediate Help <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Mould Remediation</h3>
              <p className="text-gray-600 mb-4">
                Professional mould removal, air quality testing, HEPA filtration. Health-safe mould remediation services.
              </p>
              <Link href="/services/mould-remediation" className="text-green-600 font-bold hover:text-green-700 inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Section - NRPG & Training */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full">
              🎓 For Restoration Contractors
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Australia's Leading Restoration Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access IICRC-approved training, earn continuing education credits (CECs), and connect with Australia's restoration network
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* NRPG Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-blue-600 mb-4">
                <Network className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">NRPG Membership</h3>
              <p className="text-gray-700 mb-4">
                National Restoration Professionals Group - Australia's premier restoration network. Connect with certified professionals, access resources, and grow your business.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Peer network access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Industry knowledge base</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Technical resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Standards and best practices</span>
                </li>
              </ul>
              <Link href="/nrpg" className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center">
                Learn About NRPG <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* CARSI Training Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-green-600 mb-4">
                <GraduationCap className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">CARSI Online Training</h3>
              <p className="text-gray-700 mb-4">
                Cleaning and Restoration Science Institute - IICRC-approved continuing education credits (CECs). Learn from Master Restorer Phill McGurk.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>IICRC CECs recognized</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Online flexible learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Master Restorer instructor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Certificate upon completion</span>
                </li>
              </ul>
              <Link href="/carsi" className="text-green-600 font-bold hover:text-green-700 inline-flex items-center">
                View IICRC Courses <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* IICRC CECs Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="text-purple-600 mb-4">
                <Award className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">IICRC CECs</h3>
              <p className="text-gray-700 mb-4">
                Maintain your IICRC certifications with continuing education credits. Stay current with industry standards and best practices.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Water Restoration (WRT)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Applied Structural Drying (ASD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Fire & Smoke Restoration (FSR)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Mould Remediation</span>
                </li>
              </ul>
              <Link href="/iicrc-cecs" className="text-purple-600 font-bold hover:text-purple-700 inline-flex items-center">
                Earn CECs Online <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* IICRC Courses List */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">IICRC-Approved CEC Courses Available</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold mb-2 text-gray-900">Water Restoration Technician (WRT) CECs</h4>
                <p className="text-gray-600 mb-3">Continuing education for IICRC WRT certification holders. Master water damage protocols.</p>
                <Link href="/training/water-restoration-wrt" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                  Course Details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold mb-2 text-gray-900">Applied Structural Drying (ASD) CECs</h4>
                <p className="text-gray-600 mb-3">Advanced drying techniques and psychrometry. Essential for serious restoration professionals.</p>
                <Link href="/training/applied-structural-drying-asd" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                  Course Details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold mb-2 text-gray-900">Fire & Smoke Restoration (FSR) CECs</h4>
                <p className="text-gray-600 mb-3">Fire damage restoration protocols, smoke odor removal, and content restoration techniques.</p>
                <Link href="/training/fire-smoke-restoration-fsr" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                  Course Details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold mb-2 text-gray-900">Mould Remediation CECs</h4>
                <p className="text-gray-600 mb-3">Safe mould removal protocols, containment strategies, and air quality management.</p>
                <Link href="/training/mould-remediation" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                  Course Details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Restorer - Dual Credentials */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-full">
              🏆 Master Restorer & IICRC Instructor
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Phill McGurk - Brisbane's Master Restorer
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              One of Brisbane and Queensland's limited IICRC and RAI Master Restorers. Over 20 years of hands-on restoration experience, now teaching the next generation of restoration professionals through NRPG and CARSI training programs.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                <div className="text-2xl font-bold mb-1">Master Restorer</div>
                <div className="text-sm text-gray-300">IICRC & RAI Certified</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <GraduationCap className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                <div className="text-2xl font-bold mb-1">IICRC Instructor</div>
                <div className="text-sm text-gray-300">Training Authority</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                <div className="text-2xl font-bold mb-1">20+ Years</div>
                <div className="text-sm text-gray-300">Industry Experience</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about-phil-mcgurk"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition-all"
              >
                About Phill McGurk
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/for-contractors"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Contractor Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTAs - Final Section */}
      <section className="py-20 bg-gradient-to-r from-red-700 via-purple-600 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Emergency CTA */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <Phone className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Emergency Restoration?</h3>
              <p className="text-gray-700 mb-6">
                Water, fire, or storm damage? Call Brisbane's Master Restorer now for 60-minute emergency response.
              </p>
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-red-700 text-white font-bold text-xl rounded-lg hover:bg-red-800 transition-all"
              >
                <Phone className="w-6 h-6 mr-2 animate-pulse" />
                1300 309 361
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                24/7 Service • Brisbane, Ipswich, Logan
              </p>
            </div>

            {/* Training CTA */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Restoration Contractor?</h3>
              <p className="text-gray-700 mb-6">
                Access IICRC-approved training, earn CECs, join NRPG, and learn from Master Restorer Phill McGurk.
              </p>
              <Link
                href="/for-contractors"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-blue-700 text-white font-bold text-xl rounded-lg hover:bg-blue-800 transition-all"
              >
                <GraduationCap className="w-6 h-6 mr-2" />
                Explore Training
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                NRPG • CARSI • IICRC CECs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
