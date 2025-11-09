import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/faq/FAQSection';

export const metadata: Metadata = {
  title: 'What to Do in the First 60 Minutes After Water Damage in Brisbane | IICRC Master Restorer Guide',
  description: 'Critical step-by-step actions for the first 60 minutes after water damage in Brisbane. Expert advice from IICRC Master Restorer Phill McGurk. Minimize damage, prevent mould, protect your property. 24/7 emergency help available.',
  keywords: 'water damage first steps, Brisbane water damage emergency, what to do after flood, water damage response, emergency water damage Brisbane, burst pipe emergency, ceiling leak emergency, Brisbane flood response, IICRC water damage protocol',
  openGraph: {
    title: 'First 60 Minutes After Water Damage: Brisbane Emergency Guide',
    description: 'Critical actions to take immediately after water damage strikes your Brisbane property. Master Restorer expert guidance.',
    images: ['/images/optimized/damage/3d-water-damage.webp'],
  },
};

const faqData = [
  {
    question: "What is the most important action in the first 60 minutes of water damage?",
    answer: "Stop the water source immediately if safe to do so. Turn off the main water valve for burst pipes, or isolate the affected area. Every minute of flowing water exponentially increases damage and restoration costs. If you cannot safely stop the source, evacuate and call emergency services immediately.",
    category: "Emergency Response",
    featured: true,
    schema: true
  },
  {
    question: "Should I turn off electricity during water damage?",
    answer: "YES - if water is near electrical outlets, appliances, or the electrical panel, turn off electricity at the main breaker immediately. Never walk through standing water with electricity on. If the breaker box is in the affected area, call an electrician and stay out of the area.",
    category: "Safety",
    featured: true,
    schema: true
  },
  {
    question: "Can I start cleaning up water damage myself?",
    answer: "Only clean water (Category 1) from a clean source like a broken supply line. NEVER clean grey water (appliance discharge) or black water (sewage, flooding) - these contain dangerous contaminants requiring professional biohazard protocols. Even for clean water, professional extraction prevents hidden moisture and mould growth.",
    category: "DIY vs Professional",
    featured: true,
    schema: true
  },
  {
    question: "How quickly does mould grow after water damage in Brisbane?",
    answer: "In Brisbane's subtropical climate, mould can begin growing within 24-48 hours of water damage. High humidity accelerates this. Professional water extraction and structural drying within the first few hours dramatically reduces mould risk. This is why immediate response is critical in Queensland.",
    category: "Mould Prevention",
    featured: true,
    schema: true
  },
  {
    question: "Should I call my insurance company before or after calling a restoration company?",
    answer: "Call a professional restoration company FIRST to stop ongoing damage, then notify your insurance company within 24 hours. Insurance companies expect you to mitigate damage immediately. Professional restorers like us handle all insurance documentation and communicate directly with adjusters throughout the process.",
    category: "Insurance",
    featured: true,
    schema: true
  }
];

export default function First60MinutesWaterDamagePage() {
  return (
    <article className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What to Do in the First 60 Minutes After Water Damage in Brisbane",
            "description": "Critical step-by-step actions for the first 60 minutes after water damage. Expert advice from IICRC Master Restorer.",
            "image": "/images/optimized/damage/3d-water-damage.webp",
            "author": {
              "@type": "Person",
              "name": "Phill McGurk",
              "jobTitle": "IICRC Master Restorer"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Disaster Recovery Brisbane",
              "logo": {
                "@type": "ImageObject",
                "url": "/images/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })
        }}
      />

      {/* Emergency Banner */}
      <div className="bg-red-700 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-bold">
            WATER DAMAGE EMERGENCY?
            <a href="tel:1300309361" className="ml-4 underline hover:text-yellow-300">
              CALL 1300 309 361 NOW - 24/7 BRISBANE RESPONSE
            </a>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-red-700 text-white px-4 py-2 rounded-full mb-6 font-semibold">
              Emergency Guide - Save This Page
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              What to Do in the First 60 Minutes After Water Damage in Brisbane
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Critical Actions That Prevent Thousands in Additional Damage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <Image
                  src="/images/optimized/certifications/iicrc-logo.webp"
                  alt="IICRC Certified"
                  width={40}
                  height={40}
                />
                <div className="text-left">
                  <p className="text-sm text-blue-300">Written by</p>
                  <p className="font-bold">Phill McGurk - IICRC Master Restorer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
              <h2 className="text-2xl font-bold text-red-900 mb-4">
                Why the First 60 Minutes Are Critical
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                Water damage doesn't wait. In the first 60 minutes after water intrusion, the difference between a minor restoration and major reconstruction is determined by the actions you take - or don't take.
              </p>
              <p className="text-gray-800 text-lg leading-relaxed">
                As an <strong>IICRC Master Restorer with over 20 years serving Brisbane</strong>, I've seen properties where immediate action saved tens of thousands of dollars, and properties where delayed response turned a $5,000 repair into a $50,000 rebuild. This guide gives you the exact protocol we teach our emergency response teams.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Water damage in Brisbane properties escalates rapidly due to our subtropical climate. Humidity, temperature, and building materials common in Queensland homes create perfect conditions for secondary damage like <strong>mould growth, structural deterioration, and electrical hazards</strong>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're dealing with a burst pipe in Hamilton, ceiling leak in Ascot, storm damage in Ipswich, or Brisbane River flooding, these first 60 minutes determine everything. Here's exactly what to do, step by step.
              </p>
            </div>
          </section>

          {/* Minute 0-5: Immediate Safety */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-8 rounded-xl mb-6">
              <h2 className="text-3xl font-bold mb-2">Minutes 0-5: IMMEDIATE SAFETY</h2>
              <p className="text-xl text-red-100">Life safety comes first - always</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border-l-4 border-red-600 p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                  Assess Personal Safety
                </h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">→</span>
                    <span><strong>Is the ceiling sagging or bulging?</strong> EVACUATE IMMEDIATELY - ceiling collapse is imminent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">→</span>
                    <span><strong>Is water near electrical outlets or appliances?</strong> DO NOT enter the area</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">→</span>
                    <span><strong>Is this sewage or contaminated water?</strong> Evacuate and call professionals - serious health hazard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">→</span>
                    <span><strong>Is water flowing rapidly?</strong> Determine if you can safely stop it</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
                <h4 className="text-xl font-bold text-yellow-900 mb-3">Brisbane-Specific Hazards:</h4>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">⚠</span>
                    <span><strong>Electrical hazards are extreme in Queensland homes</strong> - many properties have subfloor areas prone to flooding affecting electrical wiring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">⚠</span>
                    <span><strong>Heritage Queenslanders</strong> - old electrical systems may not have RCD protection, making water contact extremely dangerous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">⚠</span>
                    <span><strong>Asbestos risk</strong> - pre-1990 Brisbane homes may contain asbestos in wet areas; water damage can disturb it</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Minutes 5-10: Stop the Source */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-8 rounded-xl mb-6">
              <h2 className="text-3xl font-bold mb-2">Minutes 5-10: STOP THE WATER SOURCE</h2>
              <p className="text-xl text-blue-100">Every additional minute of water flow multiplies damage</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">If Water Source is Internal:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Burst pipe:</strong> Turn off main water valve (usually near water meter or front of property)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Toilet overflow:</strong> Turn valve behind toilet clockwise to close</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Appliance leak:</strong> Turn off appliance and its water supply valve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Hot water system burst:</strong> Turn off system and close inlet valve</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">If Water Source is External:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Roof leak:</strong> Place buckets, move valuables, document leak location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Storm water intrusion:</strong> Sand bags if available, block entry points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Flooding (Brisbane River, creeks):</strong> Follow evacuation orders, move to higher ground</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span><strong>Cannot be stopped:</strong> Call emergency restoration immediately</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-700 p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-2">Know Your Water Meter Location</h4>
              <p className="text-gray-800">
                <strong>Brisbane homes:</strong> Main water meters are typically in the front yard near the property boundary or in the garage. <strong>Apartments/Units:</strong> May be in common areas or on balconies. Locate yours NOW before emergency strikes.
              </p>
            </div>
          </section>

          {/* Minutes 10-15: Electrical Safety */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-8 rounded-xl mb-6">
              <h2 className="text-3xl font-bold mb-2">Minutes 10-15: ELECTRICAL SAFETY</h2>
              <p className="text-xl text-yellow-100">Prevent electrocution and fire hazards</p>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-2 border-yellow-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Turn Off Electricity If:</h3>
                <ul className="space-y-3 text-gray-800 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-2xl">⚡</span>
                    <span>Water is within 2 meters of electrical outlets, switches, or appliances</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-2xl">⚡</span>
                    <span>Water has reached electrical panels, meter boxes, or fuse boxes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-2xl">⚡</span>
                    <span>Ceiling water damage (wiring often runs through ceiling cavities)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-2xl">⚡</span>
                    <span>Subfloor flooding (common in Queensland elevated homes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-2xl">⚡</span>
                    <span>You smell burning or see sparks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-4">NEVER Do This:</h3>
                <ul className="space-y-3 text-gray-800 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <span>Walk through standing water with electricity on</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <span>Touch electrical appliances or switches with wet hands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <span>Access breaker box if it's in wet area (call electrician)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <span>Use electrical appliances to dry wet areas</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Minutes 15-30: Documentation */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl mb-6">
              <h2 className="text-3xl font-bold mb-2">Minutes 15-30: DOCUMENT EVERYTHING</h2>
              <p className="text-xl text-purple-100">Critical for insurance claims and restoration planning</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-purple-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Photos/Videos to Capture:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📸</span>
                    <span>Water source and cause of damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📸</span>
                    <span>Standing water depth (include ruler/measuring tape)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📸</span>
                    <span>Wet ceilings, walls, floors - close-ups and wide shots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📸</span>
                    <span>Damaged contents and belongings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📸</span>
                    <span>Serial numbers/labels of damaged appliances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">📸</span>
                    <span>Overall property condition before cleanup</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-purple-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Information to Record:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✍</span>
                    <span>Date and exact time water damage started</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✍</span>
                    <span>What caused the water damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✍</span>
                    <span>Actions you took to stop water flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✍</span>
                    <span>List of affected rooms and areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✍</span>
                    <span>Weather conditions (if storm-related)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✍</span>
                    <span>Names of anyone who witnessed the damage</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-purple-50 border-l-4 border-purple-600 p-6">
              <p className="text-gray-800 text-lg">
                <strong>Pro Tip from Master Restorer:</strong> Take photos from multiple angles and include timestamps. Insurance claims can take weeks to process - your immediate documentation is your strongest evidence of damage extent and cause.
              </p>
            </div>
          </section>

          {/* Minutes 30-45: Initial Mitigation */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-xl mb-6">
              <h2 className="text-3xl font-bold mb-2">Minutes 30-45: INITIAL MITIGATION</h2>
              <p className="text-xl text-green-100">Start reducing damage while professionals are en route</p>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Safe to Do Yourself (Category 1 Clean Water Only):</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Remove standing water with mop, towels, or wet vacuum (if electrical safety confirmed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Move furniture and valuables to dry areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Lift curtains off wet floors (tie up or drape over shower rod)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Remove small area rugs to dry area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Open windows for ventilation (if not raining)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Turn on fans and air conditioning to promote evaporation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-4">DO NOT Attempt (Requires Professional):</h3>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Category 2 or 3 water cleanup</strong> (grey/black water requires biohazard protocols)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Ceiling water extraction</strong> (structural collapse risk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Wall cavity drying</strong> (requires specialized equipment and moisture mapping)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Major contents pack-out</strong> (insurance documentation requirements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Structural repairs</strong> (must dry completely first, takes 3-5 days minimum)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Minutes 45-60: Professional Help */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-8 rounded-xl mb-6">
              <h2 className="text-3xl font-bold mb-2">Minutes 45-60: CALL PROFESSIONALS</h2>
              <p className="text-xl text-red-100">Don't wait - damage accelerates exponentially</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-red-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Call IICRC Master Restorer?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span><strong>Hidden moisture detection:</strong> Thermal imaging finds water you can't see</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span><strong>Industrial extraction:</strong> Removes 10x more water than shop vacs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span><strong>Structural drying:</strong> Prevents mould in wall/ceiling cavities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span><strong>Moisture monitoring:</strong> Daily readings ensure complete drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span><strong>Insurance documentation:</strong> Proper claims support from day one</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens When We Arrive:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">1.</span>
                    <span><strong>Immediate assessment</strong> with thermal imaging and moisture meters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">2.</span>
                    <span><strong>Water extraction</strong> begins within minutes of arrival</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">3.</span>
                    <span><strong>Affected areas mapped</strong> and documented for insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">4.</span>
                    <span><strong>Drying equipment deployed</strong> (dehumidifiers, air movers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">5.</span>
                    <span><strong>Restoration plan created</strong> with timeline and cost estimate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">6.</span>
                    <span><strong>Daily monitoring</strong> until complete structural drying achieved</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-red-700 to-red-800 text-white p-8 rounded-xl text-center">
              <h3 className="text-3xl font-bold mb-4">Brisbane Emergency Response</h3>
              <p className="text-xl mb-6">
                60-Minute Response • IICRC Master Restorer • Insurance Approved
              </p>
              <a
                href="tel:1300309361"
                className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-2xl font-bold hover:bg-gray-100 transition-colors"
              >
                CALL 1300 309 361 NOW
              </a>
              <p className="mt-4 text-red-100">
                Available 24/7/365 • Serving Brisbane, Ipswich, Logan, Gold Coast
              </p>
            </div>
          </section>

          {/* Brisbane-Specific Considerations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Brisbane-Specific Water Damage Considerations
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Subtropical Climate Challenges</h3>
                <p className="text-gray-800 mb-4">
                  Brisbane's high humidity (annual average 65%) accelerates mould growth dramatically. While IICRC standards cite 24-48 hours for mould development, Brisbane properties often show growth within 18-24 hours due to ambient moisture.
                </p>
                <p className="text-gray-800">
                  <strong>Action:</strong> Professional dehumidification is essential in Queensland - not optional. Opening windows won't be enough to prevent mould in our climate.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Queenslander Construction</h3>
                <p className="text-gray-800 mb-4">
                  Heritage Queenslanders feature elevated subfloor spaces, timber stumps, and ventilated underfloors. Water damage affects these properties differently:
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Subfloor flooding can go unnoticed but causes significant stump rot and structural damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>VJ walls wick water upward, requiring specialized drying techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Tongue-and-groove flooring can often be saved with mat drying systems if responded to quickly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Brisbane River & Creek Flooding</h3>
                <p className="text-gray-800 mb-4">
                  Properties in Hamilton, Toowong, New Farm, Milton, and other riverside suburbs face unique flood risks:
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <span><strong>Flash flooding:</strong> Brisbane can experience rapid water rise during storm events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <span><strong>Contaminated flood water:</strong> River flooding is always Category 3 (black water) requiring full biohazard protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <span><strong>Follow evacuation orders:</strong> Do not attempt to protect property if council issues evacuation warnings</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cost of Delay */}
          <section className="mb-12">
            <div className="bg-gray-900 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-center">
                The Real Cost of Delayed Response
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-500 mb-2">0-4 hrs</div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">Immediate Response</h3>
                  <ul className="text-left text-gray-300 space-y-1">
                    <li>• Minimal structural damage</li>
                    <li>• Most materials salvageable</li>
                    <li>• Low mould risk</li>
                    <li>• $3,000-$6,000 typical cost</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-500 mb-2">4-24 hrs</div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">Delayed Response</h3>
                  <ul className="text-left text-gray-300 space-y-1">
                    <li>• Moderate structural damage</li>
                    <li>• Some materials unsalvageable</li>
                    <li>• Mould growth beginning</li>
                    <li>• $8,000-$15,000 typical cost</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600 mb-2">48+ hrs</div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">No Response</h3>
                  <ul className="text-left text-gray-300 space-y-1">
                    <li>• Severe structural damage</li>
                    <li>• Major demolition required</li>
                    <li>• Extensive mould remediation</li>
                    <li>• $20,000-$50,000+ cost</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xl text-yellow-300 font-semibold">
                  Every hour of delay can add thousands to your final restoration cost
                </p>
              </div>
            </div>
          </section>

          {/* Insurance Guidance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Insurance Claims: What You Need to Know
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Restoration Company BEFORE Insurer</h3>
                <p className="text-gray-800 text-lg mb-4">
                  This surprises many people, but insurance companies expect you to <strong>mitigate damage immediately</strong>. Waiting for insurance approval before calling professionals can result in claim denial due to "failure to mitigate."
                </p>
                <p className="text-gray-800 text-lg">
                  <strong>Best Practice:</strong> Call restoration company immediately, then notify insurance within 24 hours. Professional restorers handle all insurance documentation from day one.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What Insurance Covers (Typically)</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Sudden and accidental water damage:</strong> Burst pipes, appliance malfunctions, storm damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Emergency mitigation:</strong> Immediate water extraction and drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Restoration to pre-loss condition:</strong> Repairs and reconstruction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Temporary accommodation:</strong> If property is uninhabitable during restoration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What Insurance Typically Doesn't Cover</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Flood (riverine flooding):</strong> Requires separate flood insurance policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Gradual damage:</strong> Long-term leaks due to lack of maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Preventable damage:</strong> Failure to maintain pipes, roof, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Secondary damage from delayed mitigation:</strong> Mould growth because you waited days to call professionals</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white p-12 rounded-2xl text-center">
              <h2 className="text-4xl font-bold mb-4">
                Don't Wait - Every Minute Counts
              </h2>
              <p className="text-2xl mb-8 text-red-100">
                IICRC Master Restorer Phill McGurk and team ready 24/7
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold mb-2">60 Minutes</div>
                  <div className="text-red-200">Average Brisbane Response</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7/365</div>
                  <div className="text-red-200">Emergency Availability</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">All Insurers</div>
                  <div className="text-red-200">Direct Billing Available</div>
                </div>
              </div>

              <a
                href="tel:1300309361"
                className="inline-block bg-white text-red-600 px-12 py-5 rounded-xl text-3xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl mb-4"
              >
                📞 1300 309 361
              </a>

              <p className="text-xl text-red-100">
                Brisbane • Ipswich • Logan • Gold Coast • Sunshine Coast
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection
        faqs={faqData}
        title="First 60 Minutes Water Damage FAQs"
        subtitle="Expert answers from IICRC Master Restorer Phill McGurk"
        schemaMarkup={true}
      />

      {/* Related Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Emergency Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/blog/iicrc-master-restorer-brisbane" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                IICRC Master Restorer: What It Means for Brisbane Homeowners
              </h3>
              <p className="text-gray-600 mb-4">
                Understand the significance of Master Restorer certification and why it matters for your property.
              </p>
              <span className="text-red-600 font-semibold">Read Article →</span>
            </Link>

            <Link href="/blog/brisbane-flood-zones" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Brisbane Flood Zones: Is Your Property at Risk?
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guide to Brisbane's flood-prone areas and what riverside residents need to know.
              </p>
              <span className="text-red-600 font-semibold">Read Article →</span>
            </Link>

            <Link href="/blog/mould-prevention-brisbane" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mould in Brisbane Homes: Prevention and Remediation Guide
              </h3>
              <p className="text-gray-600 mb-4">
                How to prevent and address mould growth in Queensland's subtropical climate.
              </p>
              <span className="text-red-600 font-semibold">Read Article →</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
