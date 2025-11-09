import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ServicePageLayout from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Brisbane | Smoke Cleanup | IICRC S700 Master Restorer',
  description: 'Expert fire and smoke damage restoration Brisbane. IICRC Master Restorer Phill McGurk. 24/7 emergency response. Complete soot removal, odour elimination, structural repairs. Call 1300 309 361.',
  keywords: 'fire damage restoration brisbane, smoke damage cleanup brisbane, soot removal brisbane, fire restoration brisbane, smoke odour removal brisbane, IICRC S700 brisbane, kitchen fire cleanup brisbane, bushfire damage brisbane',
  openGraph: {
    title: 'Fire Damage Restoration Brisbane | IICRC S700 Master Restorer',
    description: '24/7 fire and smoke damage restoration. Master Restorer expertise. Call 1300 309 361 now.',
    images: ['/images/optimized/damage/3D image of a house fire.png'],
    type: 'website'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/fire-damage-restoration-brisbane'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Fire Damage Restoration Brisbane",
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
  "description": "IICRC S700 Master Restorer fire and smoke damage restoration with 24/7 emergency response",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Fire Damage Restoration Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Emergency Fire Damage Response"
      },
      {
        "@type": "Service",
        "name": "Smoke Odour Elimination"
      },
      {
        "@type": "Service",
        "name": "Soot and Ash Removal"
      },
      {
        "@type": "Service",
        "name": "Structural Fire Damage Repair"
      }
    ]
  }
};

export default function FireDamageRestorationBrisbanePage() {
  const certifications = [
    'IICRC Master Restorer',
    'IICRC S700 - Fire & Smoke',
    'IICRC FSRT Certified',
    'HAZMAT Licensed',
    'IICRC OCT - Odour Control'
  ];

  const relatedServices = [
    {
      title: 'Water Damage Restoration Brisbane',
      href: '/services/water-damage-restoration-brisbane',
      image: '/images/optimized/damage/3d-water-damage.webp'
    },
    {
      title: 'Mould Remediation Brisbane',
      href: '/services/mould-remediation-brisbane',
      image: '/images/optimized/damage/3d-mould-damage.webp'
    },
    {
      title: 'Storm Damage Repair Brisbane',
      href: '/services/storm-damage-repair-brisbane',
      image: '/images/optimized/damage/3D-Storm-Damage.webp'
    }
  ];

  const faqs = [
    {
      question: "How quickly can you respond to fire damage in Brisbane?",
      answer: "We provide 24/7 emergency fire damage response across Brisbane, Ipswich, and Logan. As a local Master Restorer, Phill McGurk typically arrives within 60-90 minutes of your call. Immediate response is critical - acidic smoke residues become more corrosive with time, and secondary damage from firefighting water can worsen quickly."
    },
    {
      question: "What does IICRC S700 certification mean for fire restoration?",
      answer: "IICRC S700 is the industry gold standard for fire and smoke damage restoration. It establishes professional protocols for assessment, cleaning methods, deodorization techniques, and structural restoration. As a Master Restorer, Phill McGurk holds the highest level of S700 certification, meaning advanced expertise in complex fire scenarios and all major restoration disciplines."
    },
    {
      question: "Can you remove smoke odours permanently from Brisbane properties?",
      answer: "Yes. We use multiple proven IICRC S700 methods: thermal fogging (penetrates porous materials), ozone treatment (molecular odour breakdown), hydroxyl generators (safe for occupied spaces), and specialized cleaning agents. Brisbane's climate can make smoke odours worse - our Master Restorer expertise ensures complete elimination."
    },
    {
      question: "Do you handle fire damage insurance claims in Brisbane?",
      answer: "Absolutely. We work directly with all major Brisbane insurers including RACQ, Suncorp, NRMA, Allianz, and QBE. As a Master Restorer, our IICRC S700-compliant documentation is trusted by insurance companies, leading to faster approvals and fewer disputes. We provide Xactimate estimates, complete photo documentation, and handle all adjuster communication."
    },
    {
      question: "Can you restore contents damaged by smoke and soot?",
      answer: "Yes, we provide specialized contents restoration using ultrasonic cleaning, controlled atmosphere drying, and IICRC-approved cleaning techniques. Items assessed individually - we can often restore electronics, furniture, documents, and artwork that appear beyond repair. Pack-out and secure storage available during structural restoration."
    },
    {
      question: "What types of fire damage do you restore in Brisbane?",
      answer: "All types: structural fires (residential and commercial), kitchen fires, electrical fires, bushfire damage, smoke damage without direct fire, and adjacent property smoke infiltration. Brisbane bushfire risk areas require specialized expertise - our Master Restorer certification covers wildfire restoration protocols."
    },
    {
      question: "How do you handle water damage from firefighting in Brisbane properties?",
      answer: "Fire restoration includes immediate water extraction and drying from firefighting efforts. We're dual-certified in both Fire/Smoke Restoration (FSRT) and Water Damage Restoration (WRT), meaning we address both fire damage AND secondary water damage in one comprehensive response. Critical in Brisbane's humid climate to prevent mould within 24-48 hours."
    },
    {
      question: "Can you restore heritage Queenslander homes after fire damage?",
      answer: "Yes, Brisbane's heritage Queenslanders require specialized fire restoration. We understand VJ walls, timber construction, ornate fretwork, and heritage-appropriate repairs. Master Restorer certification includes advanced training in preserving character features while meeting modern fire safety standards. Experience with Paddington, Red Hill, Hamilton heritage properties."
    }
  ];

  return (
    <ServicePageLayout
      title="Fire Damage Restoration Brisbane"
      description="IICRC S700 Master Restorer Phill McGurk - Complete fire and smoke damage restoration. 24/7 emergency response across Brisbane, Ipswich, Logan. Soot removal, odour elimination, structural repairs."
      heroImage="/images/optimized/damage/3D image of a house fire.png"
      heroImageAlt="Fire damage restoration Brisbane - IICRC Master Restorer emergency response"
      certifications={certifications}
      responseTime="60-90 Minutes"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Hero Section */}
      <section className="mb-16 r6-fade-in">
        <div className="r6-glass-card r6-glow-blue p-8 border-l-4 border-red-600">
          <h1 className="r6-heading-xl r6-gradient-text mb-6">
            Fire & Smoke Damage Restoration Brisbane - IICRC S700 Master Restorer
          </h1>
          <p className="r6-text-lead text-gray-700 mb-6">
            Fire damage extends far beyond visible flames and charring. Smoke, soot, and acidic residues penetrate deep into building materials, HVAC systems, and contents, causing ongoing corrosive damage even after the fire is extinguished. Brisbane properties need IICRC S700 Master Restorer expertise for complete, proper fire restoration - not just surface cleanup.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 r6-glass-subtle rounded-lg border border-red-500/30">
              <div className="text-3xl font-bold text-red-600">24/7</div>
              <div className="text-sm text-gray-700">Emergency Response</div>
            </div>
            <div className="text-center p-4 r6-glass-subtle rounded-lg border border-red-500/30">
              <div className="text-3xl font-bold text-red-600">S700</div>
              <div className="text-sm text-gray-700">Master Certified</div>
            </div>
            <div className="text-center p-4 r6-glass-subtle rounded-lg border border-red-500/30">
              <div className="text-3xl font-bold text-red-600">100%</div>
              <div className="text-sm text-gray-700">Odour Elimination</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-600/10 border border-red-500/30 rounded">
            <span className="r6-pulse-dot bg-red-600"></span>
            <p className="text-white font-semibold">Fire Emergency? Call 1300 309 361 Now - Immediate Master Restorer Response</p>
          </div>
        </div>
      </section>

      {/* Why Master Restorer for Fire Damage */}
      <section className="mb-16 r6-fade-in-delay-1">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Why Fire Damage Requires a Master Restorer
        </h2>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 text-lg">
            Fire restoration is the most complex disaster recovery discipline. It requires expertise in structural assessment, chemistry (soot types, smoke behavior), advanced cleaning techniques, specialized equipment, and odour elimination science. Only Master Restorers possess ALL major certifications plus proven experience in complex fire scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-xl font-bold text-white mb-4">Fire Damage Is Multi-Discipline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold">Fire & Smoke Restoration (FSRT):</span>
                  <span className="text-gray-700"> Soot removal, odour elimination per S700</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold">Water Damage Restoration (WRT):</span>
                  <span className="text-gray-700"> Firefighting water extraction and drying</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold">Structural Drying (ASD):</span>
                  <span className="text-gray-700"> Complete building envelope drying</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold">Odour Control (OCT):</span>
                  <span className="text-gray-700"> Permanent smoke odour elimination</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-semibold">Mould Remediation (AMRT):</span>
                  <span className="text-gray-700"> Prevention from firefighting water</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-600/10 border border-red-500/30 rounded">
              <p className="text-sm text-white">
                <strong>Master Restorer = ALL Certifications:</strong> Standard technicians may hold 1-2 certifications. Master Restorers have complete expertise across all disaster restoration disciplines.
              </p>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <h3 className="text-xl font-bold text-white mb-4">Brisbane Fire Damage Challenges</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span><strong className="text-white">Humid Subtropical Climate:</strong> Accelerates corrosion from acidic smoke residues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span><strong className="text-white">Queenslander Timber Construction:</strong> Smoke penetrates porous VJ walls and timber deeply</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span><strong className="text-white">Bushfire Risk Areas:</strong> Ipswich, Logan fringe suburbs require wildfire expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span><strong className="text-white">Heritage Properties:</strong> Paddington, Red Hill require specialized restoration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span><strong className="text-white">Secondary Water Damage:</strong> Firefighting causes immediate mould risk in Brisbane humidity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* IICRC S700 Fire Restoration Process */}
      <section className="mb-16 r6-fade-in-delay-2">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Our IICRC S700 Fire Restoration Process
        </h2>

        <div className="space-y-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card rounded-full flex items-center justify-center border-2 border-red-600 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">1</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Emergency Response & Safety Assessment</h3>
                <p className="text-gray-700 mb-3">
                  24/7 emergency dispatch - typically arrive within 60-90 minutes across Brisbane metro. First priority is safety assessment: structural integrity, air quality, electrical hazards, and contamination levels. Emergency board-up and tarping prevents weather damage and unauthorized entry.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="text-sm p-2 r6-glass-subtle rounded border border-red-500/20">
                    <span className="text-white font-semibold">✓</span> Structural safety inspection
                  </div>
                  <div className="text-sm p-2 r6-glass-subtle rounded border border-red-500/20">
                    <span className="text-white font-semibold">✓</span> Emergency board-up/tarping
                  </div>
                  <div className="text-sm p-2 r6-glass-subtle rounded border border-red-500/20">
                    <span className="text-white font-semibold">✓</span> Air quality monitoring
                  </div>
                  <div className="text-sm p-2 r6-glass-subtle rounded border border-red-500/20">
                    <span className="text-white font-semibold">✓</span> Hazard identification
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card rounded-full flex items-center justify-center border-2 border-red-600 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">2</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Comprehensive Fire Damage Assessment</h3>
                <p className="text-gray-700 mb-3">
                  IICRC S700 requires detailed damage documentation. We assess smoke penetration (thermal imaging), soot type (protein, synthetic, combination), water damage from firefighting, structural damage, and contents restoration potential. Complete photo/video documentation for insurance claims.
                </p>
                <div className="r6-glass-subtle border-l-4 border-red-600 p-3">
                  <span className="text-white font-semibold">Master Restorer Advantage:</span>
                  <span className="text-gray-700"> Insurance companies trust our assessments, reducing disputes and delays</span>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card rounded-full flex items-center justify-center border-2 border-red-600 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">3</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Water Extraction & Structural Drying</h3>
                <p className="text-gray-700 mb-3">
                  Firefighting often causes extensive water damage. Immediate extraction prevents secondary damage and mould growth. Our dual WRT/ASD certification means proper structural drying following IICRC S500 standards - critical in Brisbane's humid climate where mould can colonize within 24-48 hours.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="text-center p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Extraction</div>
                    <div className="text-xs text-gray-700">Truck-mounted units</div>
                  </div>
                  <div className="text-center p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Dehumidification</div>
                    <div className="text-xs text-gray-700">LGR systems</div>
                  </div>
                  <div className="text-center p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Monitoring</div>
                    <div className="text-xs text-gray-700">Daily moisture readings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card rounded-full flex items-center justify-center border-2 border-red-600 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">4</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Soot & Smoke Residue Removal</h3>
                <p className="text-gray-700 mb-3">
                  Different soot types require different cleaning methods per IICRC S700. Protein fires (kitchen) leave sticky residues. Synthetic material fires produce heavy soot. We use specialized dry cleaning sponges, HEPA vacuums, and appropriate chemical cleaners for each surface type.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">→</span>
                    <span>Walls, ceilings: Dry chemical sponges, specialized cleaning agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">→</span>
                    <span>HVAC systems: Complete duct cleaning prevents re-contamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">→</span>
                    <span>Contents: Ultrasonic cleaning, controlled atmosphere processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">→</span>
                    <span>Structural: Sandblasting, soda blasting for severe char</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card rounded-full flex items-center justify-center border-2 border-red-600 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">5</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Complete Smoke Odour Elimination</h3>
                <p className="text-gray-700 mb-3">
                  Smoke odours can't just be masked - they must be eliminated at the molecular level. We use multiple IICRC OCT-approved methods depending on odour severity and affected materials:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="r6-glass-subtle border border-red-500/20 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">Thermal Fogging</h4>
                    <p className="text-sm text-gray-700">Microscopic droplets penetrate same pathways as smoke, neutralizing odours in porous materials (timber, VJ walls, insulation)</p>
                  </div>
                  <div className="r6-glass-subtle border border-red-500/20 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">Ozone Treatment</h4>
                    <p className="text-sm text-gray-700">High-output generators break down odour molecules permanently. Requires unoccupied space. Severe smoke damage.</p>
                  </div>
                  <div className="r6-glass-subtle border border-red-500/20 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">Hydroxyl Generators</h4>
                    <p className="text-sm text-gray-700">Safe for occupied spaces. Continuous treatment during restoration. Natural odour breakdown process.</p>
                  </div>
                  <div className="r6-glass-subtle border border-red-500/20 p-3 rounded">
                    <h4 className="font-semibold text-white mb-2">Specialized Sealers</h4>
                    <p className="text-sm text-gray-700">Shellac-based sealers for porous materials when cleaning alone insufficient. Encapsulates residual odours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 r6-glass-card rounded-full flex items-center justify-center border-2 border-red-600 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">6</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Structural Restoration & Reconstruction</h3>
                <p className="text-gray-700 mb-3">
                  Complete restoration to pre-loss condition or better. From minor drywall replacement to major structural reconstruction. Brisbane heritage Queenslanders receive specialized attention: VJ wall replacement, timber matching, ornate fretwork restoration, and heritage-appropriate finishes.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                  <div className="p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Minor Repairs</div>
                    <div className="text-xs text-gray-700">Drywall, paint, trim</div>
                  </div>
                  <div className="p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Major Repairs</div>
                    <div className="text-xs text-gray-700">Framing, roofing, electrical</div>
                  </div>
                  <div className="p-2 r6-glass-subtle rounded">
                    <div className="text-sm font-semibold text-white">Reconstruction</div>
                    <div className="text-xs text-gray-700">Complete rebuilds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Fire Damage */}
      <section className="mb-16 r6-fade-in-delay-3">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Brisbane Fire Damage Scenarios We Restore
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Kitchen Fires Brisbane</h3>
            <p className="text-gray-700 text-sm mb-3">
              Grease fires, cooking accidents. Protein-based smoke creates sticky, pungent residues. Requires specialized cleaning agents and complete HVAC cleaning. Common in residential properties.
            </p>
            <div className="text-sm text-red-600 font-semibold">Protein Smoke Specialist</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Electrical Fires</h3>
            <p className="text-gray-700 text-sm mb-3">
              Wiring faults, overloaded circuits, appliance failures. Produces synthetic smoke with heavy soot. Requires electrical safety inspection, specialized electronic cleaning, and proper system verification.
            </p>
            <div className="text-sm text-red-600 font-semibold">Electrical Safety Certified</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Structural House Fires</h3>
            <p className="text-gray-700 text-sm mb-3">
              Complete or partial structural fires. May include roof damage, extensive smoke penetration, water damage from firefighting. Brisbane Queenslanders require specialized timber restoration expertise.
            </p>
            <div className="text-sm text-red-600 font-semibold">Complete Reconstruction</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smoke Damage (No Direct Fire)</h3>
            <p className="text-gray-700 text-sm mb-3">
              Neighboring property fires, contained fires in other rooms/units. Smoke infiltration without direct fire damage. Specialized cleaning and deodorization without structural repairs.
            </p>
            <div className="text-sm text-red-600 font-semibold">Odour Elimination Experts</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Bushfire Damage - Ipswich/Logan</h3>
            <p className="text-gray-700 text-sm mb-3">
              Queensland bushfire risk areas. Ember damage, radiant heat damage, extensive smoke infiltration. Requires wildfire restoration protocols, external cleaning, and landscape debris removal.
            </p>
            <div className="text-sm text-red-600 font-semibold">Wildfire Certified</div>
          </div>

          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Commercial Fire Damage</h3>
            <p className="text-gray-700 text-sm mb-3">
              Brisbane CBD, Fortitude Valley offices, retail, restaurants. After-hours response, minimal business interruption, compliance with commercial fire codes. Direct insurance billing available.
            </p>
            <div className="text-sm text-red-600 font-semibold">24/7 Commercial Response</div>
          </div>
        </div>
      </section>

      {/* Brisbane Service Areas */}
      <section className="mb-16 r6-fade-in-delay-4">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Fire Damage Restoration Service Areas
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-red-600 mb-4">Brisbane Metro</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Hamilton - Riverside properties</li>
              <li>Ascot - Heritage Queenslanders</li>
              <li>New Farm - High-value residential</li>
              <li>Paddington - Heritage homes</li>
              <li>Toowong - Mixed residential</li>
              <li>Brisbane CBD - Commercial</li>
              <li>Fortitude Valley - Entertainment</li>
              <li>West End - High-density</li>
              <li>Bulimba - Riverside estates</li>
              <li>Indooroopilly - Western suburbs</li>
            </ul>
          </div>

          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-red-600 mb-4">Ipswich Region</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Karalee - Acreage properties</li>
              <li>Brookwater - Premium estates</li>
              <li>Springfield Lakes - Growth area</li>
              <li>Springfield Central - Commercial</li>
              <li>Ipswich CBD - Business district</li>
              <li>Goodna - Mixed residential</li>
              <li>Bushfire risk fringe areas</li>
            </ul>
          </div>

          <div className="r6-glass-card r6-glow-subtle p-6">
            <h3 className="text-xl font-bold text-red-600 mb-4">Logan Region</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Logan Central - Commercial</li>
              <li>Springwood - Residential</li>
              <li>Shailer Park - Suburbs</li>
              <li>Bushfire interface zones</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 r6-glass-card r6-glow-blue border-l-4 border-red-600 p-6">
          <p className="text-gray-700">
            <span className="font-bold text-white">24/7 Emergency Response:</span> Fire damage requires immediate response. Call 1300 309 361 anytime - Phill McGurk (Master Restorer) responds directly, not call center staff. Typical arrival time 60-90 minutes across Brisbane, Ipswich, Logan.
          </p>
        </div>
      </section>

      {/* Insurance Claims */}
      <section className="mb-16 r6-fade-in-delay-5">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Fire Damage Insurance Claims Brisbane
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="r6-card-premium p-6">
            <h3 className="text-xl font-bold text-white mb-4">We Work With All Brisbane Insurers</h3>
            <p className="text-gray-700 mb-6">
              RACQ, Suncorp, NRMA, Allianz, QBE, CGU, and all major insurance companies. As an IICRC S700 Master Restorer, our documentation is trusted and accepted, leading to faster claim approvals and fewer disputes.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Complete S700 Documentation:</span>
                  <span className="text-gray-700"> Photos, videos, detailed damage assessment</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Xactimate Estimates:</span>
                  <span className="text-gray-700"> Industry-standard pricing all insurers accept</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-semibold">Direct Billing:</span>
                  <span className="text-gray-700"> Minimize your out-of-pocket expenses</span>
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

          <div className="r6-glass-card r6-glow-subtle p-6 border border-red-500/20">
            <h3 className="text-xl font-bold text-red-600 mb-4">Master Restorer = Faster Claims</h3>
            <p className="text-gray-700 mb-4">
              Insurance companies recognize and trust Master Restorer certifications. Our IICRC S700-compliant assessments are accepted without question, reducing back-and-forth and speeding your claim.
            </p>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-600/10 rounded">
                <div className="font-semibold text-white mb-1">Emergency Mitigation Coverage</div>
                <div className="text-gray-700">Most policies cover immediate fire mitigation. We begin work immediately and coordinate with your adjuster.</div>
              </div>

              <div className="p-3 bg-red-600/10 rounded">
                <div className="font-semibold text-white mb-1">Section 54 Rights (QLD)</div>
                <div className="text-gray-700">You choose your contractor - insurers can't force you to use their cheapest option. Choose quality.</div>
              </div>

              <div className="p-3 bg-red-600/10 rounded">
                <div className="font-semibold text-white mb-1">Contents Restoration</div>
                <div className="text-gray-700">We work with contents insurers for smoke-damaged belongings - often saving items deemed "total loss."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="mb-16">
        <div className="r6-glass-card border-2 border-red-600 p-8 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Fire Damage Emergency? Call Now
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Smoke residues become more corrosive every hour. Don't delay - call Master Restorer Phill McGurk immediately for emergency fire restoration across Brisbane, Ipswich, Logan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all shadow-lg"
              aria-label="Call 1300 309 361 for emergency fire damage restoration"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              1300 309 361
            </a>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all border-2 border-red-600"
            >
              Start Insurance Claim
            </Link>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            24/7/365 Emergency Response • IICRC S700 Master Restorer • Brisbane Local
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}
