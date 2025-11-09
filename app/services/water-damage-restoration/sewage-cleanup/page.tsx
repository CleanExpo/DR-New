import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle, Shield, Zap, Droplets, Clock, Heart,
  AlertCircle, CheckCircle, ArrowRight, Activity,
  MessageSquare, PhoneCall, Biohazard, Wind, Gauge
} from 'lucide-react';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Sewage Cleanup Brisbane | Emergency Sewage Removal | Disaster Recovery',
  description: 'Professional sewage cleanup & removal in Brisbane, Ipswich & Logan. Category 3 water damage specialists. Hazmat protocols, full decontamination. Call 1300 309 361 - 24/7 emergency.',
  keywords: [
    'sewage cleanup Brisbane',
    'sewage removal Brisbane',
    'toilet overflow cleanup',
    'blackwater cleanup',
    'category 3 water damage',
    'sewage backup cleanup',
    'bathroom flooding cleanup',
    'contaminated water removal',
    'sewage decontamination',
    'Brisbane sewage emergency',
    'Ipswich sewage cleanup',
    'Logan sewage removal'
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Emergency Sewage Cleanup Brisbane - 24/7 Hazmat Response',
    description: 'Professional sewage cleanup with full hazmat protocols. Safe decontamination and restoration.',
    type: 'website',
    locale: 'en_AU'
  }
};

// Structured data for sewage cleanup service
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sewage Cleanup Services Brisbane",
  "description": "Emergency sewage cleanup and decontamination services across Brisbane, Ipswich and Logan. Category 3 water damage specialists with hazmat protocols.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Australia",
    "telephone": "1300-309-361",
    "areaServed": ["Brisbane", "Ipswich", "Logan", "Gold Coast", "Sunshine Coast"]
  },
  "serviceType": "Sewage Cleanup",
  "availableChannel": {
    "@type": "ServiceChannel",
    "availableLanguage": "English",
    "servicePhone": "1300-309-361"
  }
};

export default function SewageCleanupPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-900">
        {/* Emergency Alert Banner */}
        <section className="bg-red-700 text-white py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <Biohazard className="h-6 w-6 animate-pulse" />
              <p className="font-bold text-lg">
                SEWAGE EMERGENCY? Call 1300 309 361 - Immediate Hazmat Response
              </p>
              <AlertTriangle className="h-6 w-6 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Health Warning Banner */}
        <section className="bg-orange-600 text-white py-3">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 text-center">
              <AlertCircle className="h-5 w-5" />
              <p className="font-semibold">
                HEALTH HAZARD: Do not enter contaminated areas. Professional cleanup required.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative pt-20 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Hazmat Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-6">
                  <Biohazard className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-semibold">
                    Category 3 Water Specialists
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Emergency Sewage Cleanup
                  <span className="block text-3xl lg:text-4xl text-red-600 mt-2">
                    Hazmat Protocols • Safe Decontamination • Brisbane
                  </span>
                </h1>

                <p className="text-xl text-red-700 mb-8 leading-relaxed">
                  <strong className="text-white">Category 3 blackwater</strong> requires immediate action.
                  <span className="block mt-2">
                    Our <strong className="text-white">hazmat-certified</strong> teams safely remove
                    contaminated materials and fully decontaminate affected areas.
                  </span>
                </p>

                {/* Risk Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">E.coli</div>
                    <div className="text-sm text-red-700">Bacteria Present</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">24hr</div>
                    <div className="text-sm text-red-700">Health Risk Window</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">Hazmat</div>
                    <div className="text-sm text-red-700">PPE Required</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">2hr</div>
                    <div className="text-sm text-red-700">Response Time</div>
                  </div>
                </div>

                {/* Emergency CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="tel:1300309361"
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-bold hover:shadow-2xl transition-all text-center animate-pulse"
                  >
                    <PhoneCall className="inline-block mr-2 h-5 w-5" />
                    Emergency: 1300 309 361
                  </Link>
                  <Link
                    href="/client/instant-quote"
                    className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all text-center"
                  >
                    <MessageSquare className="inline-block mr-2 h-5 w-5" />
                    Urgent Cleanup Request
                  </Link>
                </div>

                {/* Warning */}
                <div className="mt-6 bg-red-500/20 border border-red-500 rounded-lg p-4">
                  <p className="text-white text-sm">
                    <strong>WARNING:</strong> Sewage contains dangerous pathogens including E.coli, Salmonella,
                    and Hepatitis. Do not attempt cleanup without proper hazmat equipment.
                  </p>
                </div>
              </div>

              {/* Hazmat Equipment Visual */}
              <div className="relative">
                <div className="relative w-full h-[500px]">
                  <Image
                    src="/images/optimized/equipment/hazmat-cleanup.webp"
                    alt="Hazmat sewage cleanup equipment and protective gear"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-10 right-10 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    Hazmat
                  </div>
                  <div className="absolute bottom-10 left-10 px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    Category 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Risks Alert */}
        <section className="bg-red-900/50 border-y border-red-600/50 py-8">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Sewage Contains Dangerous Pathogens
            </h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">E.coli</h4>
                <p className="text-sm text-red-300">Severe intestinal illness</p>
              </div>
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Salmonella</h4>
                <p className="text-sm text-red-300">Food poisoning, fever</p>
              </div>
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Hepatitis</h4>
                <p className="text-sm text-red-300">Liver infection, jaundice</p>
              </div>
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Parasites</h4>
                <p className="text-sm text-red-300">Intestinal worms, illness</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hazmat Cleanup Process */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Professional Sewage Decontamination Process
            </h2>

            <div className="max-w-6xl mx-auto">
              {/* Safety Equipment */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-xl p-6 border border-red-500/30 text-center">
                  <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">PPE Suits</h3>
                  <p className="text-sm text-red-700">Full body protection</p>
                </div>

                <div className="bg-gradient-to-br from-orange-900/50 to-yellow-900/50 rounded-xl p-6 border border-orange-500/30 text-center">
                  <Wind className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">HEPA Filtration</h3>
                  <p className="text-sm text-orange-700">Air purification</p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border border-blue-500/30 text-center">
                  <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Disinfectants</h3>
                  <p className="text-sm text-blue-700">Hospital-grade</p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30 text-center">
                  <Gauge className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Air Testing</h3>
                  <p className="text-sm text-purple-700">Safety verification</p>
                </div>
              </div>

              {/* Cleanup Process Steps */}
              <div className="space-y-8">
                {[
                  {
                    step: '1',
                    title: 'Site Assessment & Containment',
                    description: 'Establish contamination boundaries, don hazmat PPE, isolate affected areas.',
                    safety: 'Full body protection suits, respirators',
                    colour: 'red'
                  },
                  {
                    step: '2',
                    title: 'Contaminated Material Removal',
                    description: 'Remove all porous materials, carpets, insulation exposed to sewage.',
                    safety: 'Double-bagged disposal, hazmat protocols',
                    colour: 'orange'
                  },
                  {
                    step: '3',
                    title: 'Sewage Extraction & Cleaning',
                    description: 'Extract all contaminated water, pressure wash and scrub all surfaces.',
                    safety: 'Industrial extractors, antimicrobial cleaners',
                    colour: 'yellow'
                  },
                  {
                    step: '4',
                    title: 'Disinfection & Decontamination',
                    description: 'Apply hospital-grade disinfectants, antimicrobial treatments.',
                    safety: 'EPA-approved disinfectants, contact time protocols',
                    colour: 'green'
                  },
                  {
                    step: '5',
                    title: 'Drying & Air Filtration',
                    description: 'Complete structural drying with HEPA air scrubbers running.',
                    safety: 'Negative air pressure, continuous filtration',
                    colour: 'blue'
                  },
                  {
                    step: '6',
                    title: 'Final Decontamination & Testing',
                    description: 'Final disinfection, air quality testing, clearance certification.',
                    safety: 'Third-party verification, health clearance',
                    colour: 'purple'
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-8">
                    <div className={`flex-shrink-0 w-16 h-16 bg-${step.colour}-500 rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-red-700 mb-2 text-lg">{step.description}</p>
                      <p className="text-sm text-gray-400">
                        <strong>Safety Protocol:</strong> {step.safety}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Sewage Sources */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Common Sewage Cleanup Scenarios
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  source: 'Toilet Overflow',
                  risk: 'High',
                  description: 'Blocked toilet causing sewage backup into bathroom',
                  timeline: 'Immediate cleanup required',
                  concerns: 'E.coli, bathroom contamination'
                },
                {
                  source: 'Sewer Line Backup',
                  risk: 'Extreme',
                  description: 'Main sewer line blockage causing basement flooding',
                  timeline: '2-hour emergency response',
                  concerns: 'Multiple pathogens, structural damage'
                },
                {
                  source: 'Septic Tank Overflow',
                  risk: 'Extreme',
                  description: 'Septic system failure causing yard and home contamination',
                  timeline: 'Immediate evacuation required',
                  concerns: 'Raw sewage, environmental hazard'
                },
                {
                  source: 'Grease Trap Backup',
                  risk: 'High',
                  description: 'Commercial kitchen grease trap overflow',
                  timeline: 'Business closure until cleaned',
                  concerns: 'Health department violations'
                },
                {
                  source: 'Storm Drain Backup',
                  risk: 'Extreme',
                  description: 'Combined sewer overflow during heavy rain',
                  timeline: 'Wait for water to recede',
                  concerns: 'Mixed contamination, flooding'
                },
                {
                  source: 'Sewage Pump Failure',
                  risk: 'High',
                  description: 'Basement sewage pump malfunction causing backup',
                  timeline: 'Same-day response needed',
                  concerns: 'Electrical hazards, sewage accumulation'
                }
              ].map((scenario, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{scenario.source}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      scenario.risk === 'Extreme' ? 'bg-red-700 text-white' : 'bg-orange-600 text-white'
                    }`}>
                      {scenario.risk} Risk
                    </span>
                  </div>
                  <p className="text-red-700 mb-4">{scenario.description}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-orange-600 font-semibold">Timeline:</span>
                      <span className="text-white ml-2">{scenario.timeline}</span>
                    </div>
                    <div>
                      <span className="text-red-600 font-semibold">Health Concerns:</span>
                      <span className="text-red-400 ml-2">{scenario.concerns}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance & Documentation */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Insurance Claims & Documentation
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-8 border border-blue-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">What Insurance Covers</h3>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Sudden sewage backups from plumbing failure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Category 3 water damage restoration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Contaminated material disposal costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Structural decontamination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <span>Gradual seepage usually NOT covered</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 border border-green-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">Our Documentation</h3>
                <ul className="space-y-3 text-emerald-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Detailed contamination photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Hazmat disposal certificates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Air quality test results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Decontamination certificates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Complete cleanup timeline</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="py-20 bg-gradient-to-r from-red-900/80 to-orange-900/80">
          <div className="container mx-auto px-6 text-center">
            <Biohazard className="h-16 w-16 text-red-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Sewage Emergency? Don't Risk Your Health
            </h2>
            <p className="text-xl text-red-700 mb-8 max-w-3xl mx-auto">
              Category 3 blackwater contains dangerous pathogens that can cause serious illness.
              Our hazmat-certified teams safely decontaminate and restore your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-block px-10 py-5 bg-white text-red-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all animate-pulse"
              >
                <PhoneCall className="inline-block mr-2 h-6 w-6" />
                Emergency: 1300 309 361
              </Link>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-red-600 px-10 py-5 text-lg"
              >
                <MessageSquare className="inline-block mr-2 h-6 w-6" />
                Urgent Hazmat Response
              </Button>
            </div>
            <p className="text-sm text-red-700 mt-6">
              Hazmat Certified • Category 3 Specialists • 24/7 Emergency Response
            </p>
          </div>
        </section>
      </main>
    </>
  );
}