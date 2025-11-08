import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Droplets, Zap, Wrench, Clock, Shield, AlertTriangle,
  CheckCircle, ArrowRight, Activity, MessageSquare, PhoneCall,
  Gauge, Thermometer, Wind, Home, Settings
} from 'lucide-react';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Burst Pipe Repair Brisbane | Emergency Plumbing & Water Damage | Disaster Recovery',
  description: 'Emergency burst pipe repair in Brisbane, Ipswich & Logan. 24/7 plumbing repairs plus complete water damage restoration. Stop flooding fast. Call 1300 309 361.',
  keywords: [
    'burst pipe repair Brisbane',
    'emergency plumbing Brisbane',
    'pipe leak repair',
    'water pipe burst',
    'emergency water shutoff',
    'pipe burst flooding',
    'plumbing emergency Brisbane',
    'water main break repair',
    'pipe repair Brisbane',
    'Ipswich burst pipe',
    'Logan pipe repair',
    'emergency pipe services'
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Emergency Burst Pipe Repair Brisbane - 24/7 Response',
    description: 'Fast burst pipe repair and water damage restoration. Stop flooding immediately with professional emergency response.',
    type: 'website',
    locale: 'en_AU'
  }
};

// Structured data for burst pipe repair service
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Burst Pipe Repair Services Brisbane",
  "description": "Emergency burst pipe repair and water damage restoration services across Brisbane, Ipswich and Logan. 24/7 plumbing emergency response.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Australia",
    "telephone": "1300-309-361",
    "areaServed": ["Brisbane", "Ipswich", "Logan", "Gold Coast", "Sunshine Coast"]
  },
  "serviceType": "Burst Pipe Repair",
  "availableChannel": {
    "@type": "ServiceChannel",
    "availableLanguage": "English",
    "servicePhone": "1300-309-361"
  }
};

export default function BurstPipeRepairPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900">
        {/* Emergency Alert Banner */}
        <section className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <Droplets className="h-6 w-6 animate-bounce" />
              <p className="font-bold text-lg">
                BURST PIPE EMERGENCY? Call 1300 309 361 - Stop Water Now!
              </p>
              <Zap className="h-6 w-6 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Emergency Steps Banner */}
        <section className="bg-orange-600 text-white py-3">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-6 text-center text-sm">
              <span><strong>1.</strong> Turn off water main</span>
              <span><strong>2.</strong> Call 1300 309 361</span>
              <span><strong>3.</strong> Clear area of valuables</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative pt-20 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Emergency Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-semibold">
                    Emergency Pipe Repair Specialists
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Burst Pipe Emergency Repair
                  <span className="block text-3xl lg:text-4xl text-cyan-600 mt-2">
                    Stop Flooding • Save Your Property • Brisbane
                  </span>
                </h1>

                <p className="text-xl text-cyan-700 mb-8 leading-relaxed">
                  <strong className="text-white">Burst pipes</strong> cause thousands in damage every hour.
                  <span className="block mt-2">
                    Our emergency teams <strong className="text-white">stop the water</strong> and
                    begin restoration immediately - preventing catastrophic damage.
                  </span>
                </p>

                {/* Emergency Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">60min</div>
                    <div className="text-sm text-cyan-700">Average Response</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">$5000</div>
                    <div className="text-sm text-cyan-700">Damage Per Hour</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-cyan-700">Emergency Service</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">Licensed</div>
                    <div className="text-sm text-cyan-700">Plumbers On-site</div>
                  </div>
                </div>

                {/* Emergency CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="tel:1300309361"
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-bold hover:shadow-2xl transition-all text-center animate-pulse"
                  >
                    <PhoneCall className="inline-block mr-2 h-5 w-5" />
                    Call 1300 309 361 NOW
                  </Link>
                  <Link
                    href="/client/instant-quote"
                    className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all text-center"
                  >
                    <MessageSquare className="inline-block mr-2 h-5 w-5" />
                    Emergency Repair Request
                  </Link>
                </div>

                {/* Immediate Steps */}
                <div className="mt-6 bg-cyan-500/20 border border-cyan-500 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">IMMEDIATE STEPS:</h3>
                  <ol className="text-cyan-700 text-sm space-y-1">
                    <li><strong>1.</strong> Turn off water at main meter (usually front of property)</li>
                    <li><strong>2.</strong> Turn off electricity to affected areas</li>
                    <li><strong>3.</strong> Move valuables from flood zone</li>
                    <li><strong>4.</strong> Call us immediately - every minute counts</li>
                  </ol>
                </div>
              </div>

              {/* Burst Pipe Visual */}
              <div className="relative">
                <div className="relative w-full h-[500px]">
                  <Image
                    src="/images/optimized/damage/3d-burst-water-pipe.webp"
                    alt="Burst pipe emergency repair visualization"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-10 right-10 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    Emergency
                  </div>
                  <div className="absolute bottom-10 left-10 px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    Licensed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Water Damage Prevention Alert */}
        <section className="bg-blue-900/30 border-y border-blue-600/30 py-6">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
              <p className="text-white font-semibold">
                A burst pipe can release 1,000L+ per hour. Immediate action prevents structural damage and mould growth.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Response Process */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Emergency Burst Pipe Response Protocol
            </h2>

            <div className="max-w-6xl mx-auto">
              {/* Response Time Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-xl p-6 border border-red-500/30 text-center">
                  <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Dispatch</h3>
                  <p className="text-3xl font-bold text-red-600 mb-2">15min</p>
                  <p className="text-sm text-red-700">Emergency call-out</p>
                </div>

                <div className="bg-gradient-to-br from-orange-900/50 to-yellow-900/50 rounded-xl p-6 border border-orange-500/30 text-center">
                  <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Water Stop</h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">5min</p>
                  <p className="text-sm text-orange-700">On-site arrival</p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/30 text-center">
                  <Wrench className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Repair</h3>
                  <p className="text-3xl font-bold text-cyan-600 mb-2">2-4hr</p>
                  <p className="text-sm text-cyan-700">Permanent fix</p>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/30 text-center">
                  <Droplets className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Cleanup</h3>
                  <p className="text-3xl font-bold text-emerald-600 mb-2">Same Day</p>
                  <p className="text-sm text-green-700">Water extraction</p>
                </div>
              </div>

              {/* Response Steps */}
              <div className="space-y-8">
                {[
                  {
                    time: '0-15min',
                    title: 'Emergency Dispatch',
                    description: 'Licensed plumber with repair kit dispatched immediately to your location.',
                    actions: 'Mobile workshop, pipe repair materials, water extraction equipment',
                    colour: 'red'
                  },
                  {
                    time: '15-30min',
                    title: 'Water Isolation & Assessment',
                    description: 'Stop water flow, assess damage extent, identify pipe location and type.',
                    actions: 'Main water shut-off, leak source identification, damage evaluation',
                    colour: 'orange'
                  },
                  {
                    time: '30min-2hr',
                    title: 'Emergency Water Extraction',
                    description: 'Remove standing water while pipe repair is being completed.',
                    actions: 'Industrial pumps, water extraction, protect undamaged areas',
                    colour: 'blue'
                  },
                  {
                    time: '2-4hr',
                    title: 'Pipe Repair & Testing',
                    description: 'Complete permanent pipe repair, pressure test system, restore water supply.',
                    actions: 'Pipe cutting, fitting installation, pressure testing, restoration',
                    colour: 'green'
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-8">
                    <div className={`flex-shrink-0 w-20 h-20 bg-${step.colour}-500 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {step.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-cyan-700 mb-2 text-lg">{step.description}</p>
                      <p className="text-sm text-gray-400">
                        <strong>Actions:</strong> {step.actions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Burst Pipe Causes */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Common Causes of Burst Pipes in Brisbane
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  cause: 'Freezing Weather',
                  season: 'Winter (June-August)',
                  description: 'Cold snaps cause water to freeze and expand, bursting copper pipes',
                  prevention: 'Insulate exposed pipes, leave taps dripping during cold nights',
                  urgency: 'High'
                },
                {
                  cause: 'High Water Pressure',
                  season: 'Year-round',
                  description: 'Excessive water pressure stresses joints and weak points',
                  prevention: 'Install pressure reducing valve, regular pressure monitoring',
                  urgency: 'Medium'
                },
                {
                  cause: 'Pipe Corrosion',
                  season: 'Gradual deterioration',
                  description: 'Old galvanized or copper pipes corrode and develop pinhole leaks',
                  prevention: 'Regular pipe inspections, repiping old systems',
                  urgency: 'Medium'
                },
                {
                  cause: 'Tree Root Intrusion',
                  season: 'Spring/Summer growth',
                  description: 'Tree roots infiltrate and crack underground water lines',
                  prevention: 'Root barriers, regular CCTV pipe inspections',
                  urgency: 'High'
                },
                {
                  cause: 'Ground Movement',
                  season: 'Wet/dry cycles',
                  description: 'Clay soil expansion and contraction breaks underground pipes',
                  prevention: 'Proper drainage, flexible pipe connections',
                  urgency: 'High'
                },
                {
                  cause: 'Poor Installation',
                  season: 'New construction',
                  description: 'Inadequate pipe support or improper fittings fail under pressure',
                  prevention: 'Use licensed plumbers, quality materials, proper support',
                  urgency: 'High'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{item.cause}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      item.urgency === 'High' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                    }`}>
                      {item.urgency} Risk
                    </span>
                  </div>
                  <p className="text-cyan-700 mb-4">{item.description}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-blue-600 font-semibold">Season:</span>
                      <span className="text-white ml-2">{item.season}</span>
                    </div>
                    <div>
                      <span className="text-green-600 font-semibold">Prevention:</span>
                      <span className="text-green-400 ml-2">{item.prevention}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipe Types & Repair Methods */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Pipe Types & Repair Methods
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Common Pipe Materials</h3>

                {[
                  {
                    type: 'Copper Pipes',
                    lifespan: '50-70 years',
                    common: 'Most Brisbane homes pre-2000',
                    issues: 'Corrosion, freezing damage'
                  },
                  {
                    type: 'PVC Pipes',
                    lifespan: '25-40 years',
                    common: 'Modern construction, replacements',
                    issues: 'UV damage, ground movement'
                  },
                  {
                    type: 'Galvanized Steel',
                    lifespan: '20-30 years',
                    common: 'Older homes (1950s-1980s)',
                    issues: 'Heavy corrosion, reduced flow'
                  },
                  {
                    type: 'PEX Pipes',
                    lifespan: '40-50 years',
                    common: 'Newest installations',
                    issues: 'Rare failures, quality fittings critical'
                  }
                ].map((pipe, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-lg font-bold text-white mb-2">{pipe.type}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-cyan-600">Lifespan:</span>
                        <p className="text-white">{pipe.lifespan}</p>
                      </div>
                      <div>
                        <span className="text-cyan-600">Common in:</span>
                        <p className="text-white">{pipe.common}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-orange-600">Common issues:</span>
                        <p className="text-orange-400">{pipe.issues}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Repair Methods</h3>

                {[
                  {
                    method: 'Emergency Clamp',
                    timeframe: '5-15 minutes',
                    durability: 'Temporary (days)',
                    best: 'Immediate water stoppage'
                  },
                  {
                    method: 'Pipe Sleeve Repair',
                    timeframe: '30-60 minutes',
                    durability: 'Semi-permanent (months)',
                    best: 'Hairline cracks, pinhole leaks'
                  },
                  {
                    method: 'Cut & Replace Section',
                    timeframe: '2-4 hours',
                    durability: 'Permanent (decades)',
                    best: 'Major breaks, corroded sections'
                  },
                  {
                    method: 'Complete Repipe',
                    timeframe: '1-3 days',
                    durability: 'Permanent (50+ years)',
                    best: 'Multiple failures, old systems'
                  }
                ].map((method, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-lg p-4 border border-green-500/30">
                    <h4 className="text-lg font-bold text-white mb-2">{method.method}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-600">Timeframe:</span>
                        <span className="text-white">{method.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Durability:</span>
                        <span className="text-white">{method.durability}</span>
                      </div>
                      <div>
                        <span className="text-green-600">Best for:</span>
                        <p className="text-green-400">{method.best}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Emergency Pipe Repair Service Areas
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Brisbane Metro</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Wrench className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-cyan-600 mb-2">45min</p>
                  <p className="text-cyan-700">Average Response</p>
                  <p className="text-sm text-cyan-700 mt-2">
                    All inner suburbs, CBD to Carindale
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ipswich</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Settings className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-cyan-600 mb-2">60min</p>
                  <p className="text-cyan-700">Average Response</p>
                  <p className="text-sm text-cyan-700 mt-2">
                    Springfield to Rosewood, all suburbs
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Logan</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Home className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-cyan-600 mb-2">75min</p>
                  <p className="text-cyan-700">Average Response</p>
                  <p className="text-sm text-cyan-700 mt-2">
                    Springwood to Beenleigh, all areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900/80 to-cyan-900/80">
          <div className="container mx-auto px-6 text-center">
            <Droplets className="h-16 w-16 text-cyan-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Stop the Flood - Save Your Property
            </h2>
            <p className="text-xl text-cyan-700 mb-8 max-w-3xl mx-auto">
              Every minute of delay means more damage. Our emergency plumbers carry everything
              needed to stop leaks and begin restoration immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-block px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all animate-pulse"
              >
                <PhoneCall className="inline-block mr-2 h-6 w-6" />
                Emergency: 1300 309 361
              </Link>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600 px-10 py-5 text-lg"
              >
                <MessageSquare className="inline-block mr-2 h-6 w-6" />
                Emergency Repair Form
              </Button>
            </div>
            <p className="text-sm text-cyan-700 mt-6">
              Licensed Plumbers • 24/7 Emergency Service • Complete Restoration
            </p>
          </div>
        </section>
      </main>
    </>
  );
}