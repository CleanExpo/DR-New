import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ServicePageLayout from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | IICRC Master Restorer | 60-Min Response',
  description: 'Expert water damage restoration Brisbane. IICRC Master Restorer Phill McGurk provides 60-minute emergency response across Brisbane, Ipswich, Logan. Call 1300 309 361 24/7.',
  keywords: 'water damage restoration brisbane, emergency flood cleanup brisbane, burst pipe repair brisbane, water extraction brisbane, IICRC master restorer brisbane, 24/7 water damage brisbane, hamilton water damage, ascot flood restoration',
  openGraph: {
    title: 'Water Damage Restoration Brisbane | IICRC Master Restorer',
    description: '60-minute emergency response. Master Restorer Phill McGurk. Brisbane, Ipswich, Logan. Call 1300 309 361.',
    images: ['/images/optimized/damage/3d-water-damage.webp'],
    type: 'website'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/water-damage-restoration-brisbane'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Water Damage Restoration Brisbane",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Disaster Recovery Brisbane - Phill McGurk Master Restorer",
    "telephone": "1300 309 361",
    "url": "https://dr-new-ten.vercel.app",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "QLD",
      "addressLocality": "Brisbane",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-27.4698",
      "longitude": "153.0251"
    }
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
  "description": "IICRC Master Restorer water damage restoration with 60-minute emergency response across Brisbane, Ipswich, and Logan",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "availabilityStarts": "00:00",
    "availabilityEnds": "23:59"
  }
};

export default function WaterDamageRestorationBrisbanePage() {
  const certifications = [
    'IICRC Master Restorer',
    'ANSI/IICRC S500-2021',
    'WRT Certified',
    'ASD Certified',
    'AMRT Certified'
  ];

  const relatedServices = [
    {
      title: 'Mould Remediation Brisbane',
      href: '/services/mould-remediation-brisbane',
      image: '/images/optimized/damage/3d-mould-damage.webp'
    },
    {
      title: 'Fire Damage Restoration Brisbane',
      href: '/services/fire-damage-restoration-brisbane',
      image: '/images/optimized/damage/3D image of a house fire.png'
    },
    {
      title: 'Storm Damage Repair Brisbane',
      href: '/services/storm-damage-repair-brisbane',
      image: '/images/optimized/damage/3D-Storm-Damage.webp'
    }
  ];

  const faqs = [
    {
      question: "How quickly can you respond to water damage emergencies in Brisbane?",
      answer: "As an IICRC Master Restorer based locally, Phill McGurk provides guaranteed 60-minute response times to Brisbane CBD, Hamilton, Ascot, New Farm, Toowong, and surrounding areas. 24/7 emergency service across Brisbane, Ipswich, and Logan. Time is critical - water damage can lead to mould growth within 24-48 hours per IICRC S500 standards."
    },
    {
      question: "What areas of Brisbane do you service for water damage restoration?",
      answer: "We provide water damage restoration across all Brisbane suburbs including: Hamilton, Ascot, New Farm, Toowong, Bulimba, West End, Paddington, Fortitude Valley, Brisbane CBD, Indooroopilly, and more. We also service Ipswich (Karalee, Brookwater, Springfield Lakes) and Logan regions with rapid emergency response."
    },
    {
      question: "Why choose an IICRC Master Restorer for water damage in Brisbane?",
      answer: "Phill McGurk is one of only a limited number of IICRC Master Restorers in Queensland. This highest-level certification means advanced expertise in complex water damage scenarios, proper IICRC S500 protocols, faster insurance claim approvals, and guaranteed quality restoration. Master Restorers have ALL major certifications plus 5+ years proven experience."
    },
    {
      question: "Do you work with Brisbane insurance companies for water damage claims?",
      answer: "Yes, we work directly with all major insurers including RACQ, Suncorp, NRMA, Allianz, and more. As a Master Restorer, our detailed IICRC-compliant documentation streamlines claim approvals. We provide complete moisture mapping, photographic evidence, and Xactimate estimates. Direct insurance billing available."
    },
    {
      question: "What types of water damage do you restore in Brisbane properties?",
      answer: "We restore all water damage categories: Category 1 (clean water from burst pipes, rain), Category 2 (grey water from appliances), and Category 3 (black water from sewage, flooding). Brisbane's riverside location and Queensland climate require specialized flood restoration expertise - which Master Restorer certification provides."
    },
    {
      question: "Can you restore Queenslander homes after water damage?",
      answer: "Yes, Brisbane's iconic Queenslander homes require specialized restoration expertise. We understand elevated timber construction, VJ walls, stumps, and Brisbane's humid subtropical climate. Our Master Restorer training includes proper timber moisture management to prevent warping, mould, and structural damage unique to heritage Queenslander properties."
    }
  ];

  return (
    <ServicePageLayout
      title="Water Damage Restoration Brisbane"
      description="IICRC Master Restorer Phill McGurk - 60-minute emergency response across Brisbane, Ipswich, Logan. Expert flood cleanup, burst pipe repair, structural drying. Available 24/7."
      heroImage="/images/optimized/damage/3d-water-damage.webp"
      heroImageAlt="Water damage restoration Brisbane - IICRC Master Restorer emergency response"
      certifications={certifications}
      responseTime="60 Minutes"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Hero Section */}
      <section className="mb-16 r6-fade-in">
        <div className="r6-glass-card r6-glow-blue p-8 border-l-4 border-electric-blue">
          <h1 className="r6-heading-xl r6-gradient-text mb-6">
            Water Damage Restoration Brisbane - IICRC Master Restorer
          </h1>
          <p className="r6-text-lead text-gray-700 mb-6">
            When water damage strikes your Brisbane property, you need more than just a quick cleanup - you need a certified Master Restorer. Phill McGurk is one of only a limited number of IICRC Master Restorers in Queensland, providing the highest level of water damage restoration expertise to Brisbane, Ipswich, and Logan properties.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 r6-glass-subtle rounded-lg">
              <div className="text-3xl font-bold text-electric-blue r6-text-glow">60 Min</div>
              <div className="text-sm text-gray-700">Response Time Brisbane</div>
            </div>
            <div className="text-center p-4 r6-glass-subtle rounded-lg">
              <div className="text-3xl font-bold text-electric-blue r6-text-glow">24/7</div>
              <div className="text-sm text-gray-700">Emergency Availability</div>
            </div>
            <div className="text-center p-4 r6-glass-subtle rounded-lg">
              <div className="text-3xl font-bold text-electric-blue r6-text-glow">Master</div>
              <div className="text-sm text-gray-700">IICRC Certification</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="r6-pulse-dot"></span>
            <p className="text-white font-semibold">Emergency? Call 1300 309 361 Now - Phill Responds Directly</p>
          </div>
        </div>
      </section>

      {/* Why Master Restorer Matters */}
      <section className="mb-16 r6-fade-in-delay-1">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Why Brisbane Properties Need a Master Restorer
        </h2>
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 text-lg">
            Not all water damage restoration is equal. Brisbane's unique challenges - riverside flooding, Queensland's humid subtropical climate, heritage Queenslander homes, and tropical storm seasons - require advanced expertise beyond basic certification.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-xl font-bold text-white mb-4">IICRC Master Restorer vs Standard Technician</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">All Major Certifications:</span>
                  <span className="text-gray-700"> WRT, ASD, AMRT, FSRT - not just one or two</span>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">5+ Years Proven Experience:</span>
                  <span className="text-gray-700"> Hundreds of complex restorations</span>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Insurance Trust:</span>
                  <span className="text-gray-700"> Faster approvals, accepted estimates</span>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Complex Problem-Solving:</span>
                  <span className="text-gray-700"> Multi-discipline expertise</span>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-xl font-bold text-white mb-4">Brisbane-Specific Water Damage Expertise</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-electric-blue mr-2 r6-text-glow">•</span>
                <span><strong className="text-white">Riverside Flood Zones:</strong> Hamilton, Ascot, New Farm, Bulimba restoration</span>
              </li>
              <li className="flex items-start">
                <span className="text-electric-blue mr-2">•</span>
                <span><strong className="text-white">Queenslander Homes:</strong> Elevated timber, VJ walls, stump moisture management</span>
              </li>
              <li className="flex items-start">
                <span className="text-electric-blue mr-2">•</span>
                <span><strong className="text-white">Subtropical Climate:</strong> Rapid mould prevention in Brisbane humidity</span>
              </li>
              <li className="flex items-start">
                <span className="text-electric-blue mr-2">•</span>
                <span><strong className="text-white">Storm Season Response:</strong> November-March emergency preparedness</span>
              </li>
              <li className="flex items-start">
                <span className="text-electric-blue mr-2">•</span>
                <span><strong className="text-white">Heritage Properties:</strong> Paddington, Red Hill specialized restoration</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="mb-16 r6-fade-in-delay-2">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Brisbane Service Areas - 60-Minute Response
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-electric-blue mb-4 r6-text-glow-subtle">High Net Worth Residential</h3>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="/locations/hamilton" className="hover:text-electric-blue transition-colors">Hamilton</Link> - Riverside estates</li>
              <li><Link href="/locations/ascot" className="hover:text-electric-blue transition-colors">Ascot</Link> - Breakfast Creek area</li>
              <li><Link href="/locations/new-farm" className="hover:text-electric-blue transition-colors">New Farm</Link> - Heritage properties</li>
              <li><Link href="/locations/toowong" className="hover:text-electric-blue transition-colors">Toowong</Link> - Elevated homes</li>
              <li>Paddington - Heritage Queenslanders</li>
              <li>Bulimba - Riverside properties</li>
              <li>West End - Mixed residential</li>
            </ul>
          </div>

          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-electric-blue mb-4">Commercial & CBD</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Brisbane CBD - Office buildings</li>
              <li>Fortitude Valley - Commercial hub</li>
              <li>South Bank - High-density mixed-use</li>
              <li>Milton - Commercial district</li>
              <li>Ipswich CBD - Regional commercial</li>
              <li>Logan Central - Business district</li>
            </ul>
          </div>

          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-electric-blue mb-4">Ipswich Region</h3>
            <ul className="space-y-2 text-gray-700">
              <li><Link href="/locations/karalee" className="hover:text-electric-blue transition-colors">Karalee</Link> - Acreage properties</li>
              <li><Link href="/locations/brookwater" className="hover:text-electric-blue transition-colors">Brookwater</Link> - Premium estates</li>
              <li><Link href="/locations/springfield-lakes" className="hover:text-electric-blue transition-colors">Springfield Lakes</Link> - Growth area</li>
              <li>Springfield Central - Commercial</li>
              <li>Ipswich CBD - Business district</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 r6-glass-card r6-glow-blue border-l-4 border-electric-blue p-6">
          <p className="text-gray-700">
            <span className="font-bold text-white">Local Brisbane Expertise:</span> Unlike national franchises, Phill McGurk lives and works locally in Brisbane. This means genuine 60-minute response times, understanding of Brisbane's flood zones from 2011 and 2022 events, and knowledge of local building construction including heritage Queenslanders.
          </p>
        </div>
      </section>

      {/* Water Damage Process */}
      <section className="mb-16 r6-fade-in-delay-3">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Our IICRC S500-Compliant Water Restoration Process
        </h2>

        <div className="space-y-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                  <span className="text-xl font-bold text-electric-blue r6-text-glow">1</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Emergency Call & 60-Minute Response</h3>
                <p className="text-gray-700 mb-3">
                  Call 1300 309 361 anytime - Phill McGurk responds directly. Our emergency dispatch guarantees arrival within 60 minutes across Brisbane metro, Ipswich, and Logan. First hour is critical to prevent secondary damage and mould growth.
                </p>
                <div className="text-sm text-electric-blue font-semibold r6-text-glow-subtle">
                  Available 24/7/365 - No Subcontractors, Master Restorer Direct Response
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                  <span className="text-xl font-bold text-electric-blue">2</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Damage Assessment & Moisture Mapping</h3>
                <p className="text-gray-700 mb-3">
                  Advanced thermal imaging (FLIR cameras) and moisture meters map all affected areas. We determine water category (1, 2, or 3), assess structural damage, and create detailed restoration plan following IICRC S500 protocols. Complete photo documentation for insurance.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Thermal Imaging</div>
                    <div className="text-xs text-gray-700">Hidden moisture detection</div>
                  </div>
                  <div className="text-center p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Moisture Meters</div>
                    <div className="text-xs text-gray-700">0-100% WME range</div>
                  </div>
                  <div className="text-center p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Hygrometers</div>
                    <div className="text-xs text-gray-700">Humidity monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                  <span className="text-xl font-bold text-electric-blue">3</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Emergency Water Extraction</h3>
                <p className="text-gray-700 mb-3">
                  Truck-mounted extraction units remove thousands of gallons quickly. Powerful submersible pumps handle flooding, while specialized extractors target carpets, hardwood floors, and upholstery. Speed is critical - every hour delays structural drying by 24+ hours.
                </p>
                <div className="r6-glass-subtle border-l-4 border-electric-blue p-3">
                  <span className="text-white font-semibold">Industrial Equipment:</span>
                  <span className="text-gray-700"> 40,000 gallon/day capacity truck-mounted units - not standard shop vacs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                  <span className="text-xl font-bold text-electric-blue">4</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Structural Drying & Dehumidification</h3>
                <p className="text-gray-700 mb-3">
                  LGR dehumidifiers (185 PPD capacity) and high-velocity air movers create optimal drying conditions. Daily moisture readings ensure materials reach IICRC-specified dry levels. Critical for Brisbane's humid climate to prevent mould within 24-48 hour window.
                </p>
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 p-2 r6-glass-subtle rounded">
                    <span className="text-electric-blue font-bold r6-text-glow">✓</span>
                    <span className="text-sm text-gray-700">Industrial LGR dehumidifiers</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 r6-glass-subtle rounded">
                    <span className="text-electric-blue font-bold">✓</span>
                    <span className="text-sm text-gray-700">3,200 CFM air movers</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 r6-glass-subtle rounded">
                    <span className="text-electric-blue font-bold">✓</span>
                    <span className="text-sm text-gray-700">Daily moisture monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 r6-glass-subtle rounded">
                    <span className="text-electric-blue font-bold">✓</span>
                    <span className="text-sm text-gray-700">Psychrometric calculations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                  <span className="text-xl font-bold text-electric-blue">5</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Antimicrobial Treatment & Mould Prevention</h3>
                <p className="text-gray-700 mb-3">
                  EPA-registered antimicrobials prevent mould and bacteria growth. HEPA air scrubbers (99.97% filtration) maintain air quality. Essential in Brisbane's subtropical climate where mould can colonize within 24-48 hours per IICRC S500 standards.
                </p>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                  <span className="text-xl font-bold text-electric-blue">6</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Restoration & Reconstruction</h3>
                <p className="text-gray-700 mb-3">
                  Complete restoration to pre-loss condition. From minor drywall replacement to major reconstruction. Queenslander-specific expertise includes VJ wall replacement, timber floor restoration, stump repairs, and heritage-appropriate finishes.
                </p>
                <div className="text-sm text-electric-blue font-semibold">
                  One Master Restorer, Complete Project - No Subcontracting
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane Insurance Section */}
      <section className="mb-16 r6-fade-in-delay-4">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Insurance Claims - Brisbane, Ipswich, Logan
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="r6-card-premium p-6">
            <h3 className="text-xl font-bold text-white mb-4">We Work With All Major Insurers</h3>
            <p className="text-gray-700 mb-6">
              RACQ, Suncorp, NRMA, Allianz, QBE, CGU, and more. As a Master Restorer, our IICRC-compliant documentation is trusted by insurance companies, resulting in faster claim approvals and fewer disputes.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Direct Insurance Billing:</span>
                  <span className="text-gray-700"> Minimal out-of-pocket expense</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Xactimate Estimates:</span>
                  <span className="text-gray-700"> Industry-standard pricing accepted by all insurers</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Complete Documentation:</span>
                  <span className="text-gray-700"> Photos, moisture readings, thermal imaging</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Adjuster Communication:</span>
                  <span className="text-gray-700"> We handle all insurance correspondence</span>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-electric-blue mb-4 r6-text-glow-subtle">Section 54 Rights (Queensland)</h3>
            <p className="text-gray-700 mb-4">
              Under Queensland's Section 54 laws, you have the right to choose your own restoration contractor - insurance companies cannot force you to use their preferred provider. Choosing a Master Restorer ensures:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-electric-blue r6-text-glow">→</span>
                <span>Highest quality restoration work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-blue">→</span>
                <span>Proper IICRC S500 compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-blue">→</span>
                <span>Faster, more accurate claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-blue">→</span>
                <span>No cutting corners to save costs</span>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-electric-blue/10 border border-electric-blue/30 rounded">
              <p className="text-sm text-white">
                <strong>Know Your Rights:</strong> Don't let insurance companies pressure you into using cheaper, less-qualified contractors. Master Restorer certification means your property is restored properly the first time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Brisbane Water Damage Scenarios */}
      <section className="mb-16 r6-fade-in-delay-5">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Common Brisbane Water Damage Scenarios
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-lg font-bold text-white mb-3">Riverside Flooding</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Hamilton, Ascot, New Farm, Bulimba properties along Brisbane River. Category 3 contaminated water requires specialized protocols, complete drying, and antimicrobial treatment.
            </p>
            <div className="text-sm text-electric-blue font-semibold r6-text-glow-subtle">2011/2022 Flood Experience</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-lg font-bold text-white mb-3">Burst Pipes Brisbane</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Category 1 clean water damage from broken supply lines, hot water systems, or aging plumbing in heritage Queenslanders. Rapid extraction prevents escalation to Category 2/3.
            </p>
            <div className="text-sm text-electric-blue font-semibold">60-Min Response Critical</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-lg font-bold text-white mb-3">Storm & Roof Leaks</h3>
            <p className="text-gray-700 mb-3 text-sm">
              November-March storm season brings heavy rain, wind damage to roofs, and water infiltration. Emergency tarping, water extraction, and ceiling/wall drying prevent mould.
            </p>
            <div className="text-sm text-electric-blue font-semibold">Storm Season Specialists</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-lg font-bold text-white mb-3">Queenslander Subfloor Flooding</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Elevated homes with stumps require specialized under-house drying, stump moisture assessment, and prevention of moisture wicking into timber floors and VJ walls.
            </p>
            <div className="text-sm text-electric-blue font-semibold">Heritage Home Expertise</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-lg font-bold text-white mb-3">Appliance Leaks</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Washing machines, dishwashers, hot water systems. Category 2 grey water contains contaminants requiring PPE, disposal of porous materials, and antimicrobial treatment.
            </p>
            <div className="text-sm text-electric-blue font-semibold">24/7 Emergency Response</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-lg font-bold text-white mb-3">Commercial Water Damage</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Brisbane CBD, Fortitude Valley, Milton offices and retail. After-hours response, minimal business interruption, and rapid drying to prevent revenue loss.
            </p>
            <div className="text-sm text-electric-blue font-semibold">Commercial Specialists</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="r6-glass-card r6-glow-blue border-2 border-electric-blue p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Water Damage Emergency in Brisbane?
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Don't wait - every hour increases damage and costs. Call Master Restorer Phill McGurk now for guaranteed 60-minute response across Brisbane, Ipswich, Logan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all shadow-lg"
              aria-label="Call 1300 309 361 for emergency water damage restoration"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              1300 309 361
            </a>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-8 py-4 bg-electric-blue text-white font-bold text-xl rounded-lg hover:bg-blue-700 transition-all"
            >
              Start Online Claim
            </Link>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            Available 24/7/365 • 60-Minute Response • IICRC Master Restorer • Brisbane Local
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}
