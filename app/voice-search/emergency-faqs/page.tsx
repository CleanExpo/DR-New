import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Phone, Clock, MapPin, AlertTriangle, Shield, DollarSign, Droplets, Flame, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Water Damage Restoration Near Me - Brisbane 24/7 | Disaster Recovery',
  description: 'Get immediate answers about emergency water damage restoration, flood repair, and disaster recovery services in Brisbane and Ipswich. Available 24/7 with 1-hour response.',
  keywords: [
    "emergency water damage restoration near me",
    "who can fix water damage today Brisbane",
    "24 hour flood restoration Brisbane",
    "best disaster recovery company near Ipswich",
    "how much does water damage restoration cost",
    "emergency restoration services Brisbane",
    "water damage repair near me now",
    "flood damage cleanup Brisbane today"
  ],
  openGraph: {
    title: 'Emergency Water Damage Restoration Near Me - Brisbane 24/7',
    description: 'Immediate emergency restoration services in Brisbane. 1-hour response, insurance approved, IICRC certified. Call 1300 309 361 now.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/voice-search/emergency-faqs',
  }
};

// Structured data for voice search optimization
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".voice-answer", ".emergency-cta"]
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who can fix water damage today in Brisbane?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disaster Recovery provides immediate water damage restoration in Brisbane with 1-hour emergency response. Our IICRC certified team is available 24/7. Call 1300 309 361 now for immediate help."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can you get to my house for water damage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We guarantee 1-hour emergency response across Brisbane, Ipswich, and Logan. Our teams are stationed strategically for rapid deployment from our Wacol headquarters."
      }
    },
    {
      "@type": "Question",
      "name": "How much does water damage restoration cost in Brisbane?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Water damage restoration in Brisbane typically costs $1,500 to $8,000 depending on severity. Category 1 clean water: $1,500-$3,000. Category 2 grey water: $3,000-$5,000. Category 3 black water: $5,000-$8,000+. Insurance usually covers most costs."
      }
    },
    {
      "@type": "Question",
      "name": "Are you available 24 hours for emergency water damage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we're available 24 hours a day, 7 days a week, 365 days a year for emergency water damage restoration across Brisbane and Ipswich. Call 1300 309 361 anytime."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you service for emergency restoration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We service all Brisbane suburbs, Ipswich, Logan, Gold Coast, and Sunshine Coast for emergency restoration. Major areas include Brisbane CBD, Indooroopilly, Carindale, Chermside, Mount Gravatt, and all surrounding suburbs."
      }
    }
  ]
};

export default function VoiceSearchEmergencyFAQs() {
  const emergencyQuestions = [
    {
      question: "Who can fix water damage today in Brisbane?",
      answer: "Disaster Recovery provides immediate water damage restoration in Brisbane with 1-hour emergency response. Our IICRC certified team is available 24/7. Call 1300 309 361 now for immediate help.",
      icon: Droplets,
      featured: true
    },
    {
      question: "How quickly can you get to my house for water damage?",
      answer: "We guarantee 1-hour emergency response across Brisbane, Ipswich, and Logan. Our teams are stationed strategically for rapid deployment from our Wacol headquarters.",
      icon: Clock,
      featured: true
    },
    {
      question: "Best disaster recovery company near Ipswich?",
      answer: "Disaster Recovery is Ipswich's leading restoration company with 25+ years experience, IICRC certification, and preferred contractor status with major insurers. Based locally in Wacol for fastest response.",
      icon: Shield
    },
    {
      question: "24 hour flood restoration Brisbane - who's available now?",
      answer: "Disaster Recovery operates 24/7 for flood emergencies in Brisbane. Our emergency crews are on standby right now. Call 1300 309 361 for immediate flood restoration assistance.",
      icon: AlertTriangle,
      featured: true
    },
    {
      question: "Emergency water damage restoration near me - how to find?",
      answer: "If you're in Brisbane, Ipswich, or Logan, Disaster Recovery is your nearest emergency restoration service. We're located at 4/17 Tile St, Wacol with rapid response teams throughout Southeast Queensland.",
      icon: MapPin
    },
    {
      question: "How much does water damage restoration cost in Brisbane?",
      answer: "Water damage restoration in Brisbane typically costs $1,500 to $8,000 depending on severity. Category 1 clean water: $1,500-$3,000. Category 2 grey water: $3,000-$5,000. Category 3 black water: $5,000-$8,000+. Insurance usually covers most costs.",
      icon: DollarSign,
      featured: true
    },
    {
      question: "What should I do right now about water damage?",
      answer: "Turn off water supply immediately. Switch off electricity if safe. Move valuables to dry areas. Call Disaster Recovery at 1300 309 361 for emergency response. Don't wait - mould can start within 24-48 hours.",
      icon: AlertTriangle
    },
    {
      question: "Are you available on weekends and public holidays?",
      answer: "Yes, we're available 24/7 including weekends and public holidays. Disasters don't wait for business hours. Our emergency teams are always ready. Call 1300 309 361 anytime.",
      icon: Clock
    },
    {
      question: "Do you handle insurance claims for water damage?",
      answer: "Yes, we manage the entire insurance claim process. We're preferred contractors for IAG, Suncorp, QBE, RACQ, and Allianz. We document everything and liaise directly with your insurer.",
      icon: Shield
    },
    {
      question: "Can you remove water from my carpet today?",
      answer: "Yes, we provide same-day water extraction from carpets across Brisbane. Our truck-mounted extraction units and rapid drying equipment can save most carpets if we act quickly.",
      icon: Droplets
    },
    {
      question: "Fire damage restoration Brisbane - who to call?",
      answer: "Call Disaster Recovery at 1300 309 361 for immediate fire damage restoration in Brisbane. We handle smoke damage, soot removal, odour elimination, and complete restoration. Available 24/7.",
      icon: Flame
    },
    {
      question: "Mould removal Brisbane urgent - who can help today?",
      answer: "Disaster Recovery provides urgent mould remediation in Brisbane. Our IICRC certified technicians can assess and begin remediation today. Mould is hazardous - call 1300 309 361 immediately.",
      icon: Shield
    },
    {
      question: "Sewage cleanup Brisbane emergency - who does this?",
      answer: "Disaster Recovery specialises in emergency sewage cleanup in Brisbane. This is hazardous category 3 water requiring professional biohazard cleaning. Available 24/7 - call 1300 309 361.",
      icon: AlertTriangle
    },
    {
      question: "Storm damage repairs Brisbane today - who's available?",
      answer: "Disaster Recovery provides immediate storm damage repairs across Brisbane. We handle roof tarping, water extraction, tree damage, and complete restoration. Emergency response available now.",
      icon: Home
    },
    {
      question: "How do I dry out my house after flooding?",
      answer: "Professional drying requires industrial dehumidifiers, air movers, and moisture monitoring. DIY attempts often lead to hidden moisture and mould. Call Disaster Recovery at 1300 309 361 for proper structural drying.",
      icon: Droplets
    },
    {
      question: "What's included in water damage restoration service?",
      answer: "Our service includes water extraction, structural drying, dehumidification, antimicrobial treatment, content restoration, carpet cleaning, and complete restoration. Insurance documentation included.",
      icon: Shield
    },
    {
      question: "How long does water damage restoration take?",
      answer: "Emergency water extraction takes 2-4 hours. Drying takes 3-5 days. Complete restoration including repairs takes 1-2 weeks. We provide detailed timelines after assessment.",
      icon: Clock
    },
    {
      question: "Can water damage cause structural problems?",
      answer: "Yes, water damage can weaken foundations, cause wood rot, corrode metal, and compromise structural integrity. Immediate professional restoration prevents long-term structural issues.",
      icon: Home
    },
    {
      question: "Do you work with body corporate for water damage?",
      answer: "Yes, we work extensively with body corporate, strata management, and property managers across Brisbane for water damage incidents. We handle multi-unit complexes and coordinate with all parties.",
      icon: Home
    },
    {
      question: "What suburbs do you service in Brisbane?",
      answer: "We service all Brisbane suburbs including CBD, Indooroopilly, Carindale, Chermside, Mount Gravatt, Toowong, New Farm, Ascot, Bulimba, West End, and all surrounding areas plus Ipswich and Logan.",
      icon: MapPin
    }
  ];

  // Group questions by category for better organisation
  const questionCategories = {
    immediate: emergencyQuestions.filter(q => q.featured),
    location: emergencyQuestions.filter(q => q.icon === MapPin),
    cost: emergencyQuestions.filter(q => q.icon === DollarSign),
    services: emergencyQuestions.filter(q => !q.featured && q.icon !== MapPin && q.icon !== DollarSign)
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Voice Search', href: '/voice-search' },
            { label: 'Emergency FAQs' }
          ]}
        />

        {/* Emergency Hero Section - Voice Optimized */}
        <section className="relative py-12 bg-gradient-to-r from-red-900 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Emergency Water Damage Restoration Near Me
              </h1>
              <p className="text-xl text-red-100 mb-8 voice-answer">
                Brisbane's fastest emergency restoration service - 1 hour response,
                available 24/7. Call 1300 309 361 now for immediate help.
              </p>
              <div className="emergency-cta">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center bg-white text-red-700 hover:bg-red-50 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  aria-label="Call emergency hotline 1300 309 361"
                >
                  <Phone className="w-6 h-6 mr-3 animate-pulse" />
                  <span className="text-xl">1300 309 361 - Call Now</span>
                </a>
              </div>
              <p className="mt-4 text-red-100">
                Speaking to Siri, Google, or Alexa? Say "Call Disaster Recovery Brisbane"
              </p>
            </div>
          </div>
        </section>

        {/* Quick Answer Box for Voice Search */}
        <section className="py-8 bg-blue-50 border-b-4 border-blue-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Quick Answer: Who Can Fix Water Damage Today in Brisbane?
              </h2>
              <p className="text-lg text-gray-700 voice-answer mb-4">
                <strong>Disaster Recovery</strong> provides immediate water damage restoration
                across Brisbane with 1-hour emergency response. We're IICRC certified,
                insurance approved, and available 24/7. Call <strong>1300 309 361</strong> now.
              </p>
              <div className="grid md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">1 Hour Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">IICRC Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">All Brisbane</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Asked Emergency Questions */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Emergency Restoration Questions - Quick Answers
            </h2>

            {/* Featured Emergency Questions */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-red-700 uppercase tracking-wide">
                ⚡ Most Urgent Questions
              </h3>
              <div className="space-y-4">
                {questionCategories.immediate.map((item, index) => (
                  <div key={index} className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                    <div className="flex items-start gap-3">
                      <item.icon className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-700 voice-answer">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Questions */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-green-700 uppercase tracking-wide">
                💰 Cost & Insurance Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {emergencyQuestions
                  .filter(q => q.icon === DollarSign || q.question.toLowerCase().includes('insurance'))
                  .map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 voice-answer">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Questions */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-blue-700 uppercase tracking-wide">
                📍 Service Areas & Availability
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {emergencyQuestions
                  .filter(q => q.icon === MapPin || q.question.toLowerCase().includes('suburb'))
                  .map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 voice-answer">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Service Questions */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-purple-700 uppercase tracking-wide">
                🔧 Service & Process Questions
              </h3>
              <div className="space-y-4">
                {emergencyQuestions
                  .filter(q => !q.featured && q.icon !== MapPin && q.icon !== DollarSign && !q.question.toLowerCase().includes('insurance'))
                  .map((item, index) => (
                  <details key={index} className="group bg-white rounded-lg shadow-md">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.question}
                        </h3>
                      </div>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 voice-answer">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* People Also Ask Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              People Also Ask About Emergency Restoration
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/services/water-damage" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-2">Water Damage Process</h3>
                <p className="text-gray-600">Learn about our complete water extraction and drying process</p>
              </Link>

              <Link href="/services/fire-damage" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-2">Fire & Smoke Damage</h3>
                <p className="text-gray-600">Understand fire damage restoration and smoke remediation</p>
              </Link>

              <Link href="/services/mould-remediation" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-2">Mould Removal Process</h3>
                <p className="text-gray-600">Professional mould remediation and prevention methods</p>
              </Link>

              <Link href="/insurance-guide" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-2">Insurance Claims Help</h3>
                <p className="text-gray-600">Guide to insurance claims for water and fire damage</p>
              </Link>

              <Link href="/locations/brisbane" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-2">Brisbane Service Areas</h3>
                <p className="text-gray-600">All suburbs we service across Greater Brisbane</p>
              </Link>

              <Link href="/emergency/24-7-service" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-2">24/7 Emergency Service</h3>
                <p className="text-gray-600">How our emergency response system works</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Emergency Restoration Right Now?
            </h2>
            <p className="text-xl text-blue-100 mb-8 voice-answer">
              Don't wait - water damage gets worse every hour.
              Our emergency team is standing by 24/7 across Brisbane and Ipswich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Phone className="w-6 h-6 mr-3" />
                <span className="text-xl">Call 1300 309 361</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-700 font-bold py-4 px-8 rounded-lg transition-all shadow-lg"
              >
                Online Contact Form
              </Link>
            </div>
            <p className="mt-6 text-blue-100">
              <strong>Voice Assistant Users:</strong> Say "Call Disaster Recovery emergency hotline"
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}