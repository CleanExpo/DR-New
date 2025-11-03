import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VoiceSearchOptimizedFAQ from '@/components/voice/VoiceSearchOptimizedFAQ';
import EmergencyVoiceResponse from '@/components/voice/EmergencyVoiceResponse';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '24 Hour Water Extraction Brisbane | Emergency Service',
  description: 'Emergency water extraction Brisbane available 24/7. 1-hour response guarantee from Wacol. Sunday, after-hours, public holidays. IICRC certified. Insurance approved. Call 1300 309 361.',
  keywords: ["emergency water extraction wacol", "24 hour water extraction brisbane", "after hours water damage ipswich", "sunday flood restoration brisbane", "24/7 emergency response", "water extraction wacol"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/24-7-service',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/emergency/24-7-service',
    },
  },
  openGraph: {
    title: '24 Hour Water Extraction Brisbane | Emergency Service',
    description: 'Emergency water extraction Brisbane 24/7. 1-hour response guarantee from Wacol. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/emergency/24-7-service',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/water-damage.jpg',
        width: 1200,
        height: 630,
        alt: '24 Hour Emergency Water Extraction Service Brisbane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '24 Hour Water Extraction Brisbane | Emergency Service',
    description: '24/7 emergency water extraction. 1-hour response from Wacol. Call 1300 309 361.',
    images: ['https://disasterrecovery.com.au/images/services/water-damage.jpg'],
  },
};

// Voice-optimized FAQ data
const emergencyFAQs = [
  {
    question: "Can I get emergency water extraction on Sunday in Brisbane?",
    answer: "Yes. Ring Disaster Recovery on 1300 309 361. Our team works 24 hours every day, including Sundays and public holidays. We respond within 1 hour from Wacol. Sunday water damage is just as urgent as weekday emergencies.",
    voiceKeywords: ["sunday water damage", "weekend emergency", "Brisbane sunday"],
    schema: true
  },
  {
    question: "After hours water damage Brisbane - who to ring?",
    answer: "Ring Disaster Recovery on 1300 309 361 for after-hours emergency water damage. We're available 24 hours a day, 7 days a week. We answer every call, even at 2am. Your call gets priority treatment within 1 hour.",
    voiceKeywords: ["after hours", "night emergency", "late night water damage"],
    schema: true
  },
  {
    question: "What is the emergency response time for water damage Ipswich?",
    answer: "Our response time is 1 hour maximum from our Wacol office. Ipswich is close to our base. Ring 1300 309 361 immediately and we'll dispatch our team straight away. The faster we arrive, the less damage occurs.",
    voiceKeywords: ["response time", "how fast", "Ipswich emergency"],
    schema: true
  },
  {
    question: "Is water damage covered on public holidays?",
    answer: "Yes. Water damage doesn't wait for public holidays. Ring Disaster Recovery on 1300 309 361 on any public holiday including Christmas, Boxing Day, New Year, Easter. We're fully staffed and ready to help 24/7.",
    voiceKeywords: ["public holiday", "christmas", "boxing day", "easter"],
    schema: true
  },
  {
    question: "Do you service weekend emergencies in Brisbane?",
    answer: "Yes, we work every weekend. Saturday and Sunday water damage emergencies get the same 1-hour response. Ring 1300 309 361 on weekends and our team will help. No waiting, no delays.",
    voiceKeywords: ["weekend service", "saturday service", "sunday service"],
    schema: true
  },
  {
    question: "Emergency water extraction Wacol - are you local?",
    answer: "Yes. Our office is at 4/17 Tile St, Wacol. We're based right there. For Wacol water emergencies, we can arrive in minutes. Ring 1300 309 361. We're the closest emergency response team.",
    voiceKeywords: ["wacol local", "wacol emergency", "nearby"],
    schema: true
  },
  {
    question: "What happens when I ring for emergency water damage help?",
    answer: "When you ring 1300 309 361: a real person answers your call, we ask key questions about your damage, we dispatch our nearest team immediately, we arrive within 1 hour, we start extraction and damage control straight away. No delays, no waiting.",
    voiceKeywords: ["what happens", "process", "call us", "next steps"],
    schema: true
  },
  {
    question: "Do you charge extra for after-hours water extraction?",
    answer: "Our rates are the same 24 hours a day. No extra charges for nights, weekends, or public holidays. Ring 1300 309 361 for a quote. We work directly with your insurance so you're covered.",
    voiceKeywords: ["after hours cost", "extra charges", "24 hour rates", "pricing"],
    schema: true
  }
];

export default function EmergencyWaterExtraction() {
  const generateServiceSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "serviceType": "Emergency Water Extraction",
      "areaServed": {
        "@type": "City",
        "name": "Brisbane"
      },
      "provider": {
        "@type": "LocalBusiness",
        "name": "Disaster Recovery",
        "telephone": "+61 1300 309 361",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4/17 Tile St",
          "addressLocality": "Wacol",
          "addressRegion": "QLD",
          "postalCode": "4076",
          "addressCountry": "AU"
        }
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "responseTime": "1 hour",
      "availableLanguage": {
        "@type": "Language",
        "name": "English"
      }
    };

    return JSON.stringify(schemaData);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateServiceSchema() }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="24-hour emergency water extraction service">

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/fire-water-damage-restoration.jpg"
              alt="24 hour emergency water extraction service Brisbane"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl voice-answer">
              24 Hour Emergency Water Extraction Brisbane
            </h1>

            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg voice-answer">
              Available 24/7, every day including weekends and public holidays. 1-hour response guarantee from Wacol.
              No waiting. No delays.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
                aria-label="Ring 1300 309 361 for emergency water extraction"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361 Now
              </Link>
            </div>
          </div>
        </section>

        {/* 24/7 Availability Statement */}
        <section className="py-12 bg-blue-50 border-t-4 border-red-600">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Available Every Hour, Every Day
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    24-Hour Response
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Monday to Friday: 24 hours</li>
                    <li>✓ Saturday & Sunday: 24 hours</li>
                    <li>✓ Public holidays: 24 hours</li>
                    <li>✓ Christmas & Boxing Day: 24 hours</li>
                    <li>✓ Easter: 24 hours</li>
                    <li>✓ New Year: 24 hours</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Why Speed Matters
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Water damage gets worse every hour:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 1-3 hours: Walls absorb water</li>
                    <li>• 24 hours: Mould starts growing</li>
                    <li>• 48 hours: Structural damage begins</li>
                    <li>• 72 hours: Severe mould spread</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-red-50 rounded-lg border-2 border-red-200">
                <p className="text-center text-gray-900 font-bold text-lg">
                  The faster we arrive, the less damage you'll have. Ring 1300 309 361 immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sunday/Weekend/After Hours Specific */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Emergency Service When You Need It Most
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-300">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Sunday & Weekend Emergencies
                </h3>
                <p className="text-gray-800 mb-4">
                  Water damage doesn't care about the calendar. Our team works every Saturday and Sunday.
                </p>
                <ul className="space-y-2 text-gray-800 mb-4">
                  <li>✓ Full emergency team on weekends</li>
                  <li>✓ Same 1-hour response time</li>
                  <li>✓ Water extraction equipment ready</li>
                  <li>✓ No extra weekend charges</li>
                </ul>
                <p className="font-bold text-blue-900">
                  Ring 1300 309 361 anytime
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-300">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  After Hours Water Damage
                </h3>
                <p className="text-gray-800 mb-4">
                  Flooded at 2am? Burst pipe at 11pm? We answer our emergency line 24/7.
                </p>
                <ul className="space-y-2 text-gray-800 mb-4">
                  <li>✓ Night-time water extraction</li>
                  <li>✓ 24-hour emergency hotline</li>
                  <li>✓ Real person always answers</li>
                  <li>✓ Immediate dispatch available</li>
                </ul>
                <p className="font-bold text-purple-900">
                  1300 309 361 any time, day or night
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-300">
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  Public Holiday Emergencies
                </h3>
                <p className="text-gray-800 mb-4">
                  Your home doesn't take holidays. Neither do we. Emergency service every single day.
                </p>
                <ul className="space-y-2 text-gray-800 mb-4">
                  <li>✓ Christmas Day: Available</li>
                  <li>✓ Boxing Day: Available</li>
                  <li>✓ New Year: Available</li>
                  <li>✓ All public holidays: 24 hours</li>
                </ul>
                <p className="font-bold text-green-900">
                  1300 309 361 on any holiday
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wacol Location Advantage */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Based in Wacol - Your Nearest Emergency Team
            </h2>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Our Location Matters
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our office is at 4/17 Tile St, Wacol QLD 4076. This puts us in the centre of Brisbane's service area.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Wacol emergencies:</strong> Arrive in minutes, not hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Ipswich:</strong> 15-20 minutes away</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Logan:</strong> 20-25 minutes away</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Brisbane CBD:</strong> 25-30 minutes away</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>1-hour coverage radius:</strong> All major suburbs served</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Our Equipment Always Ready
                  </h3>
                  <p className="text-gray-700 mb-4">
                    At our Wacol office, we keep emergency equipment ready 24/7:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Industrial water extractors</li>
                    <li>• Dehumidifiers and air movers</li>
                    <li>• Tarping and emergency supplies</li>
                    <li>• Moisture detection equipment</li>
                    <li>• Sanitising and cleaning chemicals</li>
                    <li>• Safety gear and protective equipment</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600 italic">
                    Everything is loaded and ready. When you ring, we dispatch immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Process - What Happens When You Call */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              When You Ring 1300 309 361
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "We Answer Immediately",
                  detail: "Real person picks up. No automated messages. You get an experienced professional."
                },
                {
                  step: 2,
                  title: "We Ask Vital Questions",
                  detail: "Where's the water? Is it still coming in? Any electrical hazards? This tells us what equipment to bring."
                },
                {
                  step: 3,
                  title: "We Dispatch Our Team",
                  detail: "Our nearest crew in the fleet gets dispatched straight away. They're equipped and ready."
                },
                {
                  step: 4,
                  title: "We Arrive Within 1 Hour",
                  detail: "From anywhere in Brisbane. Our team arrives with full equipment and starts extraction immediately."
                },
                {
                  step: 5,
                  title: "We Take Control",
                  detail: "We assess damage, stop water source, begin extraction, prevent mould, and start drying."
                },
                {
                  step: 6,
                  title: "We Work With Insurance",
                  detail: "We handle your insurance company directly. Document everything for your claim."
                }
              ].map((process) => (
                <div key={process.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-600 text-white font-bold text-lg">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-gray-700">
                      {process.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-red-50 border-l-4 border-red-600">
              <p className="text-gray-900 font-bold mb-2">
                Start Now: Ring 1300 309 361
              </p>
              <p className="text-gray-700">
                Water damage requires immediate action. Don't delay. Ring us now and we'll dispatch help within 60 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Signals - Why Choose Us */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Trust Disaster Recovery for 24-Hour Emergencies
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  IICRC Certified Team
                </h3>
                <p className="text-gray-700">
                  Our technicians hold IICRC certifications in water damage restoration. We follow industry best practices every time.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Insurance Approved
                </h3>
                <p className="text-gray-700">
                  We work directly with all major insurers: QBE, IAG, RACQ, Allianz, Suncorp and more. We manage your claim.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  25+ Years Experience
                </h3>
                <p className="text-gray-700">
                  Founded in 2011. Our team has over 25 years combined experience in disaster recovery and restoration.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  $20 Million Insurance Coverage
                </h3>
                <p className="text-gray-700">
                  We carry $20 million in public liability insurance. You're fully protected with a qualified, insured team.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Local Brisbane Based
                </h3>
                <p className="text-gray-700">
                  Not a franchise. Not a national chain. We're a local Brisbane team based in Wacol serving our community.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  No Subcontractors
                </h3>
                <p className="text-gray-700">
                  We do the work ourselves. No middlemen. No subcontractors. Direct service from our experienced team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Voice-Optimized FAQs */}
        <VoiceSearchOptimizedFAQ
          title="24-Hour Emergency Service Questions"
          faqs={emergencyFAQs}
          emergencyContext={true}
        />

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Emergency Water Damage? Don't Wait.
            </h2>
            <p className="text-xl mb-8 text-red-100">
              24-hour response team ready now. Ring immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361 Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition-colors text-lg border-2 border-red-700"
              >
                Online Enquiry
              </Link>
            </div>

            <div className="mt-8 text-red-100">
              <p className="mb-2">4/17 Tile St, Wacol, QLD 4076</p>
              <p className="mb-2">24/7 Emergency Line: 1300 309 361</p>
              <p>We answer every call. Available right now.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
