import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/src/components/ui/Button';
import {
  Droplets, Clock, Shield, AlertTriangle, CheckCircle,
  ArrowRight, Zap, Gauge, Wind, MessageSquare, Truck,
  Timer, Activity, AlertCircle, PhoneCall
} from 'lucide-react';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Emergency Water Extraction Brisbane | 24/7 Fast Response | Disaster Recovery',
  description: 'Emergency water extraction services in Brisbane, Ipswich & Logan. 2-hour response time. Industrial pumps, rapid water removal. Call 1300 309 361 for immediate help.',
  keywords: [
    'emergency water extraction Brisbane',
    'water removal Brisbane',
    'flood water extraction',
    'burst pipe water removal',
    'emergency water pumping',
    'fast water extraction',
    '24/7 water removal',
    'industrial water extraction',
    'Brisbane water emergency',
    'Ipswich water extraction',
    'Logan water removal'
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Emergency Water Extraction Brisbane - 2 Hour Response',
    description: 'Professional emergency water extraction in Brisbane. Industrial pumps, rapid response. Prevent mould and structural damage.',
    type: 'website',
    locale: 'en_AU'
  }
};

// Structured data for local business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Emergency Water Extraction Brisbane",
  "description": "24/7 emergency water extraction services across Brisbane, Ipswich and Logan. Rapid response with industrial-grade equipment.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Australia",
    "telephone": "1300-309-361",
    "areaServed": ["Brisbane", "Ipswich", "Logan", "Gold Coast", "Sunshine Coast"]
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Brisbane"
    },
    {
      "@type": "City",
      "name": "Ipswich"
    },
    {
      "@type": "City",
      "name": "Logan"
    }
  ],
  "availableChannel": {
    "@type": "ServiceChannel",
    "availableLanguage": "English",
    "serviceLocation": {
      "@type": "Place",
      "name": "Brisbane Metro Area"
    },
    "servicePhone": "1300-309-361"
  }
};

export default function EmergencyWaterExtractionPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
        {/* Emergency Alert Banner */}
        <section className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
              <p className="font-bold text-lg">
                WATER EMERGENCY? Call 1300 309 361 - 2 Hour Response Guaranteed
              </p>
              <PhoneCall className="h-6 w-6 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative pt-20 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-semibold">
                    Emergency Water Extraction Specialists
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Emergency Water Extraction
                  <span className="block text-3xl lg:text-4xl text-blue-600 mt-2">
                    2-Hour Response • Brisbane, Ipswich, Logan
                  </span>
                </h1>

                <p className="text-xl text-blue-700 mb-8 leading-relaxed">
                  Fast water removal with <strong className="text-white">industrial pumps</strong>.
                  <span className="block mt-2">
                    Every minute counts - We extract water before <strong className="text-white">structural damage</strong> occurs.
                  </span>
                </p>

                {/* Response Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">2hr</div>
                    <div className="text-sm text-blue-700">Response Time</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">5000L</div>
                    <div className="text-sm text-blue-700">Per Hour Capacity</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-blue-700">Emergency Service</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-sm text-blue-700">Insurance Approved</div>
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
                    Online Emergency Form
                  </Link>
                </div>
              </div>

              {/* Equipment Visual */}
              <div className="relative">
                <div className="relative w-full h-[500px]">
                  <Image
                    src="/images/optimized/equipment/industrial-water-pump.png"
                    alt="Industrial water extraction equipment - emergency pumps"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-10 right-10 px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    5000L/hr
                  </div>
                  <div className="absolute bottom-10 left-10 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white font-bold">
                    2hr Response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Time Alert */}
        <section className="bg-orange-900/30 border-y border-orange-600/30 py-6">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 text-center">
              <Timer className="h-6 w-6 text-orange-600 animate-pulse" />
              <p className="text-white font-semibold">
                CRITICAL: Mould begins growing in 24-48 hours. Immediate water extraction prevents thousands in damage.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Water Extraction Process */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Emergency Water Extraction Process
            </h2>

            <div className="max-w-4xl mx-auto">
              {/* Equipment Specifications */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border border-blue-500/30">
                  <Droplets className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Extraction Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">5000L/hr</p>
                  <p className="text-sm text-blue-700">Industrial Pumps</p>
                </div>

                <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-xl p-6 border border-red-500/30">
                  <Clock className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Response</h3>
                  <p className="text-3xl font-bold text-red-600">2 Hours</p>
                  <p className="text-sm text-red-700">Emergency Call-out</p>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/30">
                  <Shield className="h-8 w-8 text-emerald-600 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Coverage</h3>
                  <p className="text-3xl font-bold text-emerald-600">24/7</p>
                  <p className="text-sm text-green-700">Emergency Service</p>
                </div>
              </div>

              {/* Process Steps */}
              <div className="space-y-6">
                {[
                  {
                    time: '0-2hr',
                    title: 'Emergency Dispatch',
                    description: 'Immediate response with industrial pumps and extraction equipment.',
                    icon: <Truck className="h-6 w-6" />,
                    colour: 'red'
                  },
                  {
                    time: '2-4hr',
                    title: 'Water Assessment',
                    description: 'Assess water category, source identification, safety evaluation.',
                    icon: <Gauge className="h-6 w-6" />,
                    colour: 'orange'
                  },
                  {
                    time: '4-8hr',
                    title: 'Bulk Water Extraction',
                    description: 'Industrial pumps remove standing water at 5000L/hour rate.',
                    icon: <Droplets className="h-6 w-6" />,
                    colour: 'blue'
                  },
                  {
                    time: '8-12hr',
                    title: 'Detail Extraction',
                    description: 'Carpet extraction, hard-to-reach areas, moisture detection.',
                    icon: <Activity className="h-6 w-6" />,
                    colour: 'green'
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-${step.colour}-500 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {step.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-white">{step.icon}</div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-blue-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Water Categories & Dangers */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Water Categories We Handle
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-white">Category 1 - Clean</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  Fresh water from burst pipes, overflow tanks, rainwater
                </p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Safe for occupants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Standard extraction methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Fastest restoration possible</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  <h3 className="text-xl font-bold text-white">Category 2 - Grey</h3>
                </div>
                <p className="text-yellow-700 mb-4">
                  Washing machine overflow, dishwasher leaks, toilet overflow
                </p>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>Contains contamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>PPE required for workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 t-yellow-600 mt-0.5" />
                    <span>Materials may need disposal</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-bold text-white">Category 3 - Black</h3>
                </div>
                <p className="text-red-700 mb-4">
                  Sewage, flood water, storm surge, contaminated sources
                </p>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Highly contaminated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Full hazmat protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Extensive material removal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Emergency Water Extraction Service Areas
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Brisbane Metro</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-blue-600 mb-2">45min</p>
                  <p className="text-blue-700">Average Response</p>
                  <p className="text-sm text-blue-700 mt-2">
                    CBD, Inner North, Inner South, Western Suburbs
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ipswich</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-blue-600 mb-2">60min</p>
                  <p className="text-blue-700">Average Response</p>
                  <p className="text-sm text-blue-700 mt-2">
                    Springfield, Redbank, Karalee, Rosewood
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Logan</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-blue-600 mb-2">75min</p>
                  <p className="text-blue-700">Average Response</p>
                  <p className="text-sm text-blue-700 mt-2">
                    Springwood, Browns Plains, Shailer Park
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-blue-600/10 rounded-xl p-6 border border-blue-600/30 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-3">
                  Complete Southeast Queensland Coverage
                </h3>
                <p className="text-blue-700">
                  From Brisbane CBD to Gold Coast, Sunshine Coast to Toowoomba -
                  Our emergency water extraction teams cover all major population centers
                  with 2-hour guaranteed response times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="py-20 bg-gradient-to-r from-red-900/80 to-orange-900/80">
          <div className="container mx-auto px-6 text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Water Emergency? Every Second Counts
            </h2>
            <p className="text-xl text-red-700 mb-8 max-w-3xl mx-auto">
              Don't wait - water damage spreads rapidly. Our emergency extraction teams
              are standing by with industrial pumps ready to deploy.
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
                Online Emergency Form
              </Button>
            </div>
            <p className="text-sm text-red-700 mt-6">
              Available 24/7 • 365 days a year • 2-hour response guarantee
            </p>
          </div>
        </section>
      </main>
    </>
  );
}