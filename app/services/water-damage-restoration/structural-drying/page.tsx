import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Wind, Thermometer, Gauge, Droplets, Clock, Shield,
  AlertTriangle, CheckCircle, ArrowRight, Activity,
  MessageSquare, PhoneCall, Zap, Eye, BarChart3
} from 'lucide-react';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Structural Drying Brisbane | Professional Building Drying Services | Disaster Recovery',
  description: 'Expert structural drying services in Brisbane, Ipswich & Logan. Advanced dehumidifiers, air movers, moisture monitoring. Prevent mould and structural damage. Call 1300 309 361.',
  keywords: [
    'structural drying Brisbane',
    'building drying services',
    'dehumidification Brisbane',
    'moisture removal',
    'professional drying equipment',
    'building moisture control',
    'LGR dehumidifiers',
    'air movement systems',
    'moisture monitoring',
    'Brisbane drying services',
    'Ipswich structural drying',
    'Logan building drying'
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Professional Structural Drying Brisbane - Advanced Equipment',
    description: 'Complete structural drying using LGR dehumidifiers and industrial air movers. Prevent mould growth and structural damage.',
    type: 'website',
    locale: 'en_AU'
  }
};

// Structured data for structural drying service
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Structural Drying Services Brisbane",
  "description": "Professional structural drying services using advanced dehumidifiers and air movement systems across Brisbane, Ipswich and Logan.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Australia",
    "telephone": "1300-309-361",
    "areaServed": ["Brisbane", "Ipswich", "Logan", "Gold Coast", "Sunshine Coast"]
  },
  "serviceType": "Structural Drying",
  "availableChannel": {
    "@type": "ServiceChannel",
    "availableLanguage": "English",
    "servicePhone": "1300-309-361"
  }
};

export default function StructuralDryingPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        {/* Emergency Banner */}
        <section className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-centre justify-centre gap-4 text-centre">
              <Wind className="h-6 w-6 animate-spin" />
              <p className="font-bold text-lg">
                Professional Structural Drying - Call 1300 309 361
              </p>
              <Thermometer className="h-6 w-6" />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative pt-20 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-centre">
              <div>
                {/* Trust Badge */}
                <div className="inline-flex items-centre gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                  <Wind className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-semibold">
                    Professional Structural Drying
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Structural Drying Services
                  <span className="block text-3xl lg:text-4xl text-blue-600 mt-2">
                    Advanced Equipment • Moisture Control • Brisbane
                  </span>
                </h1>

                <p className="text-xl text-blue-700 mb-8 leading-relaxed">
                  Professional <strong className="text-white">structural drying</strong> prevents mould.
                  <span className="block mt-2">
                    Our <strong className="text-white">LGR dehumidifiers</strong> and air movement systems
                    restore optimal moisture levels in 3-5 days.
                  </span>
                </p>

                {/* Equipment Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">90L</div>
                    <div className="text-sm text-blue-700">Per Day Removal</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">3000CFM</div>
                    <div className="text-sm text-blue-700">Air Movement</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">22-26°C</div>
                    <div className="text-sm text-blue-700">Optimal Temp</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">30-50%</div>
                    <div className="text-sm text-blue-700">Target Humidity</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="tel:1300309361"
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-bold hover:shadow-2xl transition-all text-centre"
                  >
                    <PhoneCall className="inline-block mr-2 h-5 w-5" />
                    Call 1300 309 361
                  </Link>
                  <Link
                    href="/client/instant-quote"
                    className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all text-centre"
                  >
                    <MessageSquare className="inline-block mr-2 h-5 w-5" />
                    Get Drying Quote
                  </Link>
                </div>
              </div>

              {/* Equipment Visual */}
              <div className="relative">
                <div className="relative w-full h-[500px]">
                  <Image
                    src="/images/optimised/equipment/dehumidifier-industrial.png"
                    alt="Industrial LGR dehumidifier for structural drying"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-10 right-10 px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    LGR Tech
                  </div>
                  <div className="absolute bottom-10 left-10 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    90L/Day
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Science Behind Drying */}
        <section className="bg-indigo-900/30 border-y border-indigo-600/30 py-8">
          <div className="container mx-auto px-6">
            <div className="text-centre">
              <h3 className="text-2xl font-bold text-white mb-4">The Science of Structural Drying</h3>
              <p className="text-indigo-700 max-w-4xl mx-auto">
                Effective drying requires precise control of temperature, humidity, and airflow.
                Our IICRC S500 certified process uses psychrometric principles to create optimal
                drying conditions while monitoring moisture content throughout the structure.
              </p>
            </div>
          </div>
        </section>

        {/* Drying Process & Equipment */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-centre mb-12">
              Professional Structural Drying Process
            </h2>

            <div className="max-w-6xl mx-auto">
              {/* Equipment Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border border-blue-500/30 text-centre">
                  <Wind className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Air Movers</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">3000CFM</p>
                  <p className="text-sm text-blue-700">High-velocity airflow</p>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/30 text-centre">
                  <Droplets className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">LGR Dehumidifiers</h3>
                  <p className="text-3xl font-bold text-emerald-600 mb-2">90L/Day</p>
                  <p className="text-sm text-green-700">Moisture removal</p>
                </div>

                <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-xl p-6 border border-orange-500/30 text-centre">
                  <Thermometer className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Heat Systems</h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">22-26°C</p>
                  <p className="text-sm text-orange-700">Temperature control</p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30 text-centre">
                  <Gauge className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Monitoring</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-2">24/7</p>
                  <p className="text-sm text-purple-700">Data logging</p>
                </div>
              </div>

              {/* Drying Process Steps */}
              <div className="space-y-8">
                {[
                  {
                    day: 'Day 1',
                    title: 'Initial Assessment & Setup',
                    description: 'Moisture mapping with thermal imaging, equipment placement, baseline readings.',
                    equipment: 'Thermal cameras, moisture meters',
                    icon: <Eye className="h-6 w-6" />,
                    colour: 'blue'
                  },
                  {
                    day: 'Day 2',
                    title: 'Peak Drying Phase',
                    description: 'Maximum evaporation rate achieved through optimal temperature and airflow.',
                    equipment: 'Air movers, LGR dehumidifiers, heaters',
                    icon: <Zap className="h-6 w-6" />,
                    colour: 'green'
                  },
                  {
                    day: 'Day 3-4',
                    title: 'Controlled Drying',
                    description: 'Monitored moisture reduction, equipment adjustment for material protection.',
                    equipment: 'Continuous monitoring, data loggers',
                    icon: <Activity className="h-6 w-6" />,
                    colour: 'orange'
                  },
                  {
                    day: 'Day 5',
                    title: 'Final Verification',
                    description: 'Moisture content verification, dry standard achievement, equipment removal.',
                    equipment: 'Final moisture testing',
                    icon: <CheckCircle className="h-6 w-6" />,
                    colour: 'purple'
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-8">
                    <div className={`flex-shrink-0 w-20 h-20 bg-${step.colour}-500 rounded-full flex items-centre justify-centre text-white font-bold`}>
                      {step.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-centre gap-3 mb-3">
                        <div className="text-white">{step.icon}</div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-blue-700 mb-2 text-lg">{step.description}</p>
                      <p className="text-sm text-gray-400">Equipment: {step.equipment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Material-Specific Drying */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-centre mb-12">
              Material-Specific Drying Protocols
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  material: 'Hardwood Floors',
                  dryingTime: '5-7 days',
                  technique: 'Controlled evaporation',
                  equipment: 'Mat systems, LGR dehumidifiers',
                  risk: 'Cupping and buckling'
                },
                {
                  material: 'Drywall/Plaster',
                  dryingTime: '3-5 days',
                  technique: 'Cavity drying',
                  equipment: 'Injecti-dry systems',
                  risk: 'Mould growth behind walls'
                },
                {
                  material: 'Concrete/Masonry',
                  dryingTime: '7-14 days',
                  technique: 'Deep moisture extraction',
                  equipment: 'High-capacity dehumidifiers',
                  risk: 'Efflorescence, structural damage'
                },
                {
                  material: 'Carpet/Pad',
                  dryingTime: '2-3 days',
                  technique: 'Extract and dry in place',
                  equipment: 'Carpet clamps, air movers',
                  risk: 'Delamination, shrinkage'
                },
                {
                  material: 'Insulation',
                  dryingTime: 'Usually replaced',
                  technique: 'Assessment for salvage',
                  equipment: 'Moisture detection',
                  risk: 'Mould, reduced R-value'
                },
                {
                  material: 'Structural Timber',
                  dryingTime: '10-21 days',
                  technique: 'Slow controlled drying',
                  equipment: 'Environmental control',
                  risk: 'Checking, warping, splitting'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">{item.material}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Drying Time:</span>
                      <span className="text-white font-semibold">{item.dryingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Technique:</span>
                      <span className="text-white">{item.technique}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Equipment:</span>
                      <p className="text-white mt-1">{item.equipment}</p>
                    </div>
                    <div>
                      <span className="text-red-600">Risk if not dried:</span>
                      <p className="text-red-400 mt-1">{item.risk}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monitoring & Documentation */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-centre mb-12">
              Scientific Monitoring & Documentation
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 border border-green-500/30">
                <div className="flex items-centre gap-3 mb-6">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-white">Daily Monitoring</h3>
                </div>
                <ul className="space-y-3 text-emerald-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Temperature and humidity readings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Moisture content measurements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Equipment performance checks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Progress photography</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <span>Psychrometric calculations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-8 border border-blue-500/30">
                <div className="flex items-centre gap-3 mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-white">Insurance Documentation</h3>
                </div>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>Complete drying logs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>Before and after photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>Equipment placement diagrams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>Dry standard certificates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>Cost justification reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas & Response */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-centre mb-12">
              Structural Drying Service Areas
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-centre">
                <h3 className="text-2xl font-bold text-white mb-4">Brisbane Areas</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Wind className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-700 mb-4">
                    CBD, Fortitude Valley, New Farm, West End, Milton,
                    Toowong, Indooroopilly, Chermside, Mount Gravatt
                  </p>
                  <p className="text-sm text-blue-700">
                    Professional drying equipment available within 2 hours
                  </p>
                </div>
              </div>

              <div className="text-centre">
                <h3 className="text-2xl font-bold text-white mb-4">Ipswich Areas</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Thermometer className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-700 mb-4">
                    Springfield, Redbank Plains, Karalee, Rosewood,
                    Booval, Bundamba, Raceview
                  </p>
                  <p className="text-sm text-blue-700">
                    Same-day equipment deployment and setup
                  </p>
                </div>
              </div>

              <div className="text-centre">
                <h3 className="text-2xl font-bold text-white mb-4">Logan Areas</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Gauge className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-700 mb-4">
                    Springwood, Browns Plains, Shailer Park,
                    Meadowbrook, Loganholme, Woodridge
                  </p>
                  <p className="text-sm text-blue-700">
                    Advanced monitoring systems included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900/80 to-indigo-900/80">
          <div className="container mx-auto px-6 text-centre">
            <Wind className="h-16 w-16 text-blue-500 mx-auto mb-6 animate-spin" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Professional Structural Drying Prevents Thousands in Damage
            </h2>
            <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
              Don't risk mould growth or structural damage. Our IICRC certified technicians
              use advanced drying science to restore your property safely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="inline-block px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <PhoneCall className="inline-block mr-2 h-6 w-6" />
                Call 1300 309 361
              </Link>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600 px-10 py-5 text-lg"
              >
                <MessageSquare className="inline-block mr-2 h-6 w-6" />
                Get Drying Assessment
              </Button>
            </div>
            <p className="text-sm text-blue-700 mt-6">
              IICRC S500 Certified • Advanced Equipment • Scientific Monitoring
            </p>
          </div>
        </section>
      </main>
    </>
  );
}