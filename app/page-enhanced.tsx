import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2, Zap, AlertCircle } from 'lucide-react';

// Enhanced Homepage for Disaster Recovery Brisbane
export default function HomePageEnhanced() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/fire-water-damage-restoration.jpg"
            alt="Disaster Recovery Services Brisbane - Water & Fire Damage Restoration"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 via-neutral-900/80 to-neutral-900/70" />

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-emergency-900/30 opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-20 text-center">
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emergency-600/90 backdrop-blur-sm text-white rounded-full font-bold text-sm mb-8 shadow-2xl border border-white/10 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <Clock className="w-4 h-4" />
            24/7 Emergency Response - Available Now
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
            When Disaster Strikes<br />
            <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-emergency-400 bg-clip-text text-transparent">
              Every Minute Counts
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            IICRC Master Restorer responds in <strong className="text-white">60 minutes</strong>.<br />
            Water damage. Fire damage. Storm damage.<br />
            Your Brisbane property restored to perfection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="tel:1300309361"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-emergency-600 to-emergency-700 text-white font-bold text-lg rounded-xl hover:from-emergency-700 hover:to-emergency-800 transition-all duration-300 shadow-2xl hover:shadow-emergency-500/50 hover:scale-105"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:animate-pulse">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90 font-semibold">Emergency Hotline</div>
                <div className="text-xl font-black">1300 309 361</div>
              </div>
            </Link>

            <Link
              href="/book-service"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/95 backdrop-blur-sm text-neutral-900 font-bold text-lg rounded-xl hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
            >
              Book Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Location & Credentials */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-sm font-semibold">Wacol, QLD 4076</span>
            </div>
            <span className="hidden sm:block text-white/30">|</span>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-premium-400" />
              <span className="text-sm font-semibold">IICRC & RAI Master Restorer</span>
            </div>
            <span className="hidden sm:block text-white/30">|</span>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-success-400" />
              <span className="text-sm font-semibold">60-Min Emergency Response</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar - Enhanced */}
      <section className="py-12 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-premium-500/20 rounded-2xl flex items-center justify-center border border-premium-400/30 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-premium-400" />
              </div>
              <div className="text-3xl font-black mb-2">IICRC & RAI</div>
              <div className="text-sm text-neutral-200 font-semibold">Master Certified</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-success-500/20 rounded-2xl flex items-center justify-center border border-success-400/30 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-success-400" />
              </div>
              <div className="text-3xl font-black mb-2">20+ Years</div>
              <div className="text-sm text-neutral-200 font-semibold">Brisbane & Ipswich</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black mb-2">All Insurers</div>
              <div className="text-sm text-neutral-200 font-semibold">Approved Partner</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black mb-2">500+</div>
              <div className="text-sm text-neutral-200 font-semibold">Properties Restored</div>
            </div>

            <div className="text-center group col-span-2 md:col-span-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-emergency-500/20 rounded-2xl flex items-center justify-center border border-emergency-400/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-emergency-400" />
              </div>
              <div className="text-3xl font-black mb-2">60 Minutes</div>
              <div className="text-sm text-neutral-200 font-semibold">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services - Premium Cards */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-semibold text-sm mb-6 border border-primary-200">
              <Shield className="w-4 h-4" />
              Master Restorer Services
            </div>
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Emergency Restoration<br />
              <span className="gradient-text-primary">When You Need It Most</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              IICRC Master Restorer Phill McGurk and his expert team provide 24/7 emergency response across Brisbane, Ipswich, and Logan
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Water Damage Card */}
            <div className="card-premium group">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary-200">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Water Damage Restoration
                </h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Burst pipes, flooding, storm damage. Industrial-grade pumps and drying equipment. We extract water and prevent mould growth in 60 minutes.
                </p>
                <Link
                  href="/services/water-damage-restoration"
                  className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 hover:gap-3 transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Fire Damage Card */}
            <div className="card-premium group">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-emergency-100 to-emergency-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emergency-200">
                  <svg className="w-10 h-10 text-emergency-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Fire & Smoke Damage
                </h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Complete fire restoration. Advanced smoke odour removal. Structural repairs. Contents cleaning and restoration by certified experts.
                </p>
                <Link
                  href="/services/fire-damage-restoration"
                  className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 hover:gap-3 transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Mould Remediation Card */}
            <div className="card-premium group">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-success-100 to-success-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-success-200">
                  <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Mould Remediation
                </h3>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Professional mould removal and prevention. Air quality testing. Complete decontamination. Create a health-safe environment for your family.
                </p>
                <Link
                  href="/services/mould-remediation"
                  className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 hover:gap-3 transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced Design */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-premium-50 text-premium-700 rounded-full font-semibold text-sm mb-6 border border-premium-200">
                <Award className="w-4 h-4" />
                Master Restorer Certified
              </div>
              <h2 className="heading-display text-4xl md:text-5xl mb-6">
                Why Brisbane Trusts<br />
                <span className="gradient-text-primary">Disaster Recovery</span>
              </h2>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
                One of Brisbane's few IICRC & RAI Master Restorers with over 20 years of proven experience
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Award,
                    title: 'Master Restorer Certified',
                    description: 'Phill McGurk holds both IICRC and RAI Master Restorer certifications - one of a limited number in Brisbane and QLD.',
                  },
                  {
                    icon: Shield,
                    title: 'Insurance Approved',
                    description: 'We work directly with all major insurance companies. Streamlined claims process. No upfront costs for insured work.',
                  },
                  {
                    icon: Zap,
                    title: '24/7 Emergency Response',
                    description: 'Call 1300 309 361 any time. We respond within 60 minutes to emergencies across Brisbane, Ipswich, and Logan.',
                  },
                  {
                    icon: MapPin,
                    title: 'Local Brisbane Team',
                    description: 'Based in Wacol, QLD. We know Brisbane properties, weather patterns, and insurance requirements inside out.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center border border-primary-200 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                      <p className="text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/fire-water-damage-restoration.jpg"
                  alt="Master Restorer Phill McGurk"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>

                {/* Trust Badge Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-premium-500 to-premium-700 rounded-xl flex items-center justify-center">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 text-lg">IICRC Master</div>
                        <div className="text-sm text-neutral-600">Phill McGurk</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-premium-500 text-premium-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200">
                <div className="text-4xl font-black text-primary-600 mb-1">500+</div>
                <div className="text-sm text-neutral-600 font-semibold">Properties<br />Restored</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-50 text-success-700 rounded-full font-semibold text-sm mb-6 border border-success-200">
            <MapPin className="w-4 h-4" />
            Service Coverage
          </div>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            Emergency Restoration Across<br />
            <span className="gradient-text-primary">Brisbane, Ipswich & Logan</span>
          </h2>
          <p className="text-xl text-neutral-600 mb-16 max-w-3xl mx-auto">
            60-minute emergency response to all major areas
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Brisbane',
                areas: 'Hamilton, Ascot, New Farm, Toowong, CBD, and all surrounding suburbs',
              },
              {
                title: 'Ipswich',
                areas: 'Karalee, Brookwater, Springfield Lakes, and greater Ipswich region',
              },
              {
                title: 'Logan',
                areas: 'Commercial properties and residential areas throughout Logan',
              },
            ].map((area, index) => (
              <div key={index} className="card-premium text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-200">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{area.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{area.areas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Emergency CTA */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emergency-600 via-emergency-700 to-emergency-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-sm mb-8 border border-white/20">
            <AlertCircle className="w-4 h-4 animate-pulse" />
            Emergency Situation?
          </div>

          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Experiencing a Disaster Emergency?
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-semibold">
            Every minute counts. Call now for immediate response.
          </p>

          <Link
            href="tel:1300309361"
            className="group inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-emergency-600 font-black text-2xl rounded-2xl hover:bg-neutral-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
          >
            <div className="w-16 h-16 bg-emergency-100 rounded-full flex items-center justify-center group-hover:animate-pulse">
              <Phone className="w-8 h-8 text-emergency-600" />
            </div>
            1300 309 361
          </Link>

          <p className="mt-8 text-lg text-white/80 font-semibold">
            24/7 Emergency Service • 60-Minute Response • IICRC Master Restorer
          </p>
        </div>
      </section>
    </div>
  );
}
