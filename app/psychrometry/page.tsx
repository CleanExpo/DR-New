import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Droplets, Thermometer, Wind, Clock, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Psychrometry for Water Damage Restoration — Australia Edition | IICRC Master Restorer',
  description: 'Clear-language guide to psychrometry for water damage restoration in Australia. Learn moisture control, drying science, and IICRC S500 standards from Brisbane IICRC Master Restorer Phill McGurk.',
  keywords: 'psychrometry, water damage restoration, IICRC S500, moisture control, drying science, Australia, Brisbane, relative humidity, dew point, vapour pressure, humidity ratio, HAT principle',
  authors: [{ name: 'Phill McGurk', url: 'https://dr-new-ten.vercel.app/about-phil-mcgurk' }],
  publisher: 'Disaster Recovery Brisbane',
  openGraph: {
    title: 'Psychrometry for Water Damage Restoration — Australia Edition',
    description: 'Master the science of drying with psychrometry. Australian metric units, IICRC S500 standards, practical guidance from Master Restorer Phill McGurk.',
    type: 'article',
    images: [{
      url: '/images/education/understanding-water-categories.webp',
      width: 1200,
      height: 630,
      alt: 'Water Damage Categories and Psychrometric Principles'
    }],
    publishedTime: '2025-01-08T00:00:00Z',
    modifiedTime: new Date().toISOString(),
    authors: ['Phill McGurk'],
    section: 'Education',
    tags: ['psychrometry', 'water damage', 'IICRC S500', 'moisture control', 'Brisbane'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychrometry for Water Damage Restoration — Australia Edition',
    description: 'Master the science of drying with psychrometry. IICRC S500 standards from Brisbane Master Restorer.',
    images: ['/images/education/understanding-water-categories.webp'],
  },
};

export default function PsychrometryPage() {
  // Schema.org structured data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalArticle',
    headline: 'Psychrometry for Water Damage Restoration — Australia Edition',
    description: 'Clear-language guide to psychrometry for water damage restoration in Australia. Learn moisture control, drying science, and IICRC S500 standards.',
    image: 'https://dr-new-ten.vercel.app/images/education/understanding-water-categories.webp',
    author: {
      '@type': 'Person',
      name: 'Phill McGurk',
      url: 'https://dr-new-ten.vercel.app/about-phil-mcgurk',
      jobTitle: 'IICRC Master Restorer',
      affiliation: {
        '@type': 'Organization',
        name: 'Disaster Recovery Brisbane',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Disaster Recovery Brisbane',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dr-new-ten.vercel.app/logos/3D-Disaster-Recovery-Logo.png',
      },
    },
    datePublished: '2025-01-08',
    dateModified: new Date().toISOString().split('T')[0],
    educationalLevel: 'Professional',
    educationalUse: ['Training', 'Professional Development'],
    about: {
      '@type': 'Thing',
      name: 'Psychrometry',
      description: 'The science of air and water vapor measurement for water damage restoration',
    },
    mentions: [
      {
        '@type': 'Thing',
        name: 'IICRC S500',
        description: 'Standard for Professional Water Damage Restoration',
      },
      {
        '@type': 'Place',
        name: 'Brisbane',
        '@id': 'https://www.wikidata.org/wiki/Q34932',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold mb-6">
              <BookOpen className="w-5 h-5" />
              IICRC S500 Reference Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Psychrometry for Water Damage Restoration — Australia Edition
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Clear-language, metric units, technician-friendly
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-8">
              The scientific study of air + water vapour. Master the principles that separate professional restoration from just &quot;pointing fans at wet surfaces&quot;.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#why-matters"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all"
              >
                Learn the Science
              </Link>
              <Link
                href="/psychrometry/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
              >
                View Case Studies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Psychrometry Matters */}
      <section id="why-matters" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Psychrometry Matters
            </h2>

            {/* Educational Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/education/understanding-water-categories.webp"
                alt="Understanding water damage categories and psychrometric principles for effective drying"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                When a property suffers water damage, the work isn&apos;t just about sucking water out or pointing fans at wet surfaces. The real game is about <strong>moisture in the air and materials</strong>—and how we control it so the building, contents and structure dry safely and thoroughly.
              </p>
              <p className="mb-6">
                Psychrometry is the scientific study of air + water vapour. In the context of the water-damage restoration industry, it helps us answer:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>How much moisture is in the air right now?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>How much more could the air hold?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>What is stopping moisture leaving the wet materials?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>How do we drive moisture out of materials into the air—and then out of the building?</span>
                </li>
              </ul>
              <p className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                <strong>By using psychrometric readings + the correct equipment + a solid process</strong> (as outlined in the IICRC S500 reference guide), your team can dry more efficiently, avoid secondary damage (mould, structural weakening, smells) and document the job thoroughly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Terms */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Key Terms (Aussie-Friendly Translations)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dry-Bulb Temperature */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-3">
                  <Thermometer className="w-8 h-8 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-900">Dry-Bulb Temperature (°C)</h3>
                </div>
                <p className="text-gray-700">
                  The temperature of the air as measured by a standard thermometer.
                </p>
              </div>

              {/* Relative Humidity */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="w-8 h-8 text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-900">Relative Humidity (RH %)</h3>
                </div>
                <p className="text-gray-700">
                  The percentage of how &quot;full&quot; the air is with water vapour compared to what it could hold at that temperature.
                </p>
              </div>

              {/* Humidity Ratio */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Wind className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-bold text-gray-900">Humidity Ratio (g/kg)</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  The actual mass of water vapour in a kilogram of dry air—how many grams of water in each kg of dry air.
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <strong>Conversion:</strong> 1 g/kg ≈ 0.14 grains per pound (imperial)
                </p>
              </div>

              {/* Dew Point */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="w-8 h-8 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900">Dew Point (°C)</h3>
                </div>
                <p className="text-gray-700">
                  The temperature at which the air becomes saturated (100% RH) and water begins to condense. If a material surface is below this temperature, moisture may condense on it—bad news.
                </p>
              </div>

              {/* Vapour Pressure */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <Wind className="w-8 h-8 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Vapour Pressure (kPa)</h3>
                </div>
                <p className="text-gray-700">
                  The &quot;push&quot; of the water-vapour in the air. Wet materials have higher vapour pressure; dry air has lower. <strong>Moisture moves from high to low vapour pressure.</strong>
                </p>
              </div>

              {/* EMC */}
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-8 h-8 text-yellow-600" />
                  <h3 className="text-xl font-bold text-gray-900">Equilibrium Moisture Content (EMC)</h3>
                </div>
                <p className="text-gray-700">
                  The moisture level at which a material neither gains nor loses moisture in the existing air conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The HAT Principle */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Three Big Levers on Every Job
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              To control drying you focus on three variables. A good mnemonic: <strong className="text-yellow-400">HAT</strong>
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">H = Heat</h3>
                <p className="text-blue-100">
                  Raise material/air temperature. Loosens moisture in wet materials and increases the &quot;bucket size&quot; of the air (warmer air can hold more water).
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">A = Air-movement</h3>
                <p className="text-blue-100">
                  Move air across surfaces. Removes the stagnant layer of saturated air on the wet surface (the boundary layer), letting fresh drier air take on moisture.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">T = Take-out moisture</h3>
                <p className="text-blue-100">
                  Dehumidify or ventilate. Reduces how full the &quot;bucket&quot; is (i.e., lowers humidity ratio/g/kg), so the air has capacity to pull more moisture.
                </p>
              </div>
            </div>

            <div className="bg-yellow-500 text-black p-6 rounded-lg">
              <p className="text-lg font-semibold">
                <strong>When you coordinate H, A, T,</strong> you build a vapour-pressure differential: from wet materials → drier air → dehumidifier/outside. <strong>That&apos;s how drying happens.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metric Job-Site Workflow */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Metric Job-Site Workflow (Aligned with IICRC S500)
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Here&apos;s how your crew should work, step by step:
            </p>

            {/* Step 1 */}
            <div className="mb-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                Initial Assessment
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Record <strong>outside air</strong>: temperature (°C), RH %. Compute grams per kilogram (g/kg) if your tools allow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Record <strong>ambient job-space air</strong>: same measurements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Record <strong>material baseline</strong>: moisture content of wet materials (e.g., wood framing, carpet padding, slab) using moisture meter/invasive test.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Identify <strong>water Category</strong> (Cat 1 clean, Cat 2 grey, Cat 3 black) and <strong>Class</strong> (I–IV) per S500 to set safety, drying complexity and equipment needs.</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="mb-8 bg-green-50 border-l-4 border-green-600 p-6 rounded">
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-3">
                <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                Set Drying Goals
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Based on materials and condition, define <strong>target moisture content</strong> (e.g., wood framing ≤ 12% MC, concrete slab moisture content trending down etc.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Choose <strong>target air-condition</strong>: ambient g/kg lower than starting value and ideally lower than outside (if outside air is drier) or isolate outside if outside is wetter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Check <strong>dew point</strong>: ensure target surfaces will remain above dew point or you risk condensation into materials.</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="mb-8 bg-purple-50 border-l-4 border-purple-600 p-6 rounded">
              <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                Design and Deploy Drying System
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Select equipment: dehumidifiers (LGR refrigerant or desiccant depending on ambient & target), heaters (safe for building materials), air-movers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Place air-movers such that air flows across surfaces: floors to ceiling, away from walls, avoid just blasting into a corner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Place dehus so inlet air is ambient job-air, outlet air is managed (exhaust or room) and ensure no short-circuiting (outlet feeding back to inlet).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Start heaters if needed: raise material and ambient air temp (consistent with safety, finishes, building integrity).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Contain space if needed: doors/windows sealed so you can control ambient conditions (especially important if outside air is humid or hot).</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="mb-8 bg-orange-50 border-l-4 border-orange-600 p-6 rounded">
              <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-3">
                <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                Daily Monitoring & Adjustments
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Each morning record: outside air (°C & RH), job ambient (°C & RH & g/kg if possible), dehu inlet/outlet (°C & RH & g/kg), material readings at same labelled spots as baseline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Check trend: is ambient g/kg going down? Is material moisture content going down? Are any surfaces dropping below dew point?</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>If ambient g/kg is flat or rising: likely infiltration of humid air, dehu undersized, or equipment mis-placed. Fix with better sealing, add capacity, correct airflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>If material MC% isn&apos;t dropping: check heat, boundary-layer removal (air-movers), hidden wet pockets, cold surfaces that may be absorbing moisture.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Document all changes: moved mover, added heater, sealed door, etc.</span>
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
              <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-3">
                <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                Close-out and Validation
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>When material moisture content meets target and ambient conditions are stable (e.g., g/kg stable over 24h), step down equipment in stages (first reduce capacity, then remove).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Do post-drying readings: ambient air, dew point, surfaces, materials. Verify no rebound (i.e., moisture rising again).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Document full log: initial, daily trend, final. Provide to client/insurer. This satisfies S500&apos;s requirement for documentation of drying.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Provide a &quot;dry and clear&quot; report/hand-over with findings, readings, and reassurance that drying goals have been met.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Aussie-Specific Enhancements */}
      <section className="py-16 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Aussie-Specific Enhancements
            </h2>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Use °C, % RH, g/kg</h3>
                <p className="text-green-100">
                  Tools often default to imperial (grains per pound). For Australia, conversion to g/kg or at least metric values helps your team stay comfortable. Many digital psychrometric calculators allow switching to metric.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Consider Local Climate</h3>
                <p className="text-green-100">
                  In Brisbane/QLD many days outside might have high RH and high g/kg, meaning outside air is worse than indoor dry air. So treat &apos;outside&apos; as likely worse unless early morning or cold front. In contrast in winter or dry inland you might bring outside air in—but only if safe.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Slab and Sub-Floor Specifics</h3>
                <p className="text-green-100">
                  Many Aussie homes have slab-on-ground, suspended timber floors with sub-floor ventilation. In slab cases you may need to control moisture coming up through the slab; psychrometric strategy still applies—but watch for capillary rise and hidden water. In sub-floors, monitor that cool soil/vapour ingress doesn&apos;t undermine your ambient air control.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Finish Materials / Heritage Homes</h3>
                <p className="text-green-100">
                  Old timber, heritage finishes, corrugated iron, and climate-driven materials respond differently. Set realistic material targets and monitor any warp/finish issues when using heat.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Power Costs and Equipment Access</h3>
                <p className="text-green-100">
                  Dehus, heaters and air-movers in Australia face high electricity rates and cord access challenges. Psychrometric tracking helps you stop machines when you&apos;ve met target, avoiding &quot;racing machines until someone feels dry&quot;.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cheat Sheet */}
      <section className="py-16 bg-yellow-500 text-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Cheat-Sheet Summary for Techs
            </h2>

            <div className="bg-white rounded-lg p-8 shadow-xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Bucket Analogy</h3>
                <p className="text-lg">Air = bucket; Warm = big bucket; Cold = small bucket.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">How Moisture Moves</h3>
                <p className="text-lg">Moisture moves from <strong>wet material (high vapour pressure)</strong> → <strong>drier air (lower vapour pressure)</strong>.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Key Job Questions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Is the air bucket partially empty? (Is ambient g/kg lower than before?)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Is moisture leaving the materials? (Are material readings trending down?)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Are my HAT levers working together? (Heat, Air-flow, Take-out)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>What&apos;s outside air doing? (If outside is worse, keep it out; if outside is better, maybe bring it in carefully)</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Daily Log</h3>
                <p className="text-lg">Outside/ambient/dehu in/out/materials → compare to yesterday → state your action.</p>
              </div>

              <div className="bg-blue-900 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Finish When:</h3>
                <p className="text-lg">
                  Materials reach target MC <strong>AND</strong> no rebound for at least 24h <strong>AND</strong> ambient g/kg stable or moving favorable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Meets S500 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why This Meets IICRC S500 Standards
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-6">
                <p className="mb-4">S500 emphasises <strong>psychrometry and the science of drying</strong>, not just &quot;blow fans&quot;.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>It demands <strong>documentation of environmental conditions</strong>, equipment performance, material response.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>It mandates <strong>realistic drying goals</strong> for materials and structural assemblies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>It requires <strong>corrective action</strong> when drying is not trending appropriately.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-600 p-8 rounded-lg">
                <p className="text-xl font-semibold text-green-900 mb-4">
                  By following the framework above, your crew is doing the science, the monitoring, the documentation, not just the &quot;machines on&quot; approach.
                </p>
                <p className="text-lg text-green-800">
                  This is what separates professional restoration from guesswork—and what builds trust with insurance assessors, property owners, and regulatory bodies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See Psychrometry in Action
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              View real-world case studies from Brisbane jobs showing how psychrometric principles deliver results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/psychrometry/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all"
              >
                View Case Studies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all"
              >
                Call 1300 309 361
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
