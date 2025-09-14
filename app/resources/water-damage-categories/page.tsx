import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, Droplets, Shield, CheckCircle, XCircle, AlertTriangle, Clock, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Understanding Water Damage Categories 1, 2 & 3 | IICRC Classification Guide Australia',
  description: 'Essential guide to IICRC water damage categories for insurance claims, restoration professionals and property owners. Learn the critical differences between Category 1 clean water, Category 2 grey water, and Category 3 black water contamination for proper restoration in Australia.',
  keywords: 'water damage categories, IICRC water classification, category 1 2 3 water damage, clean water damage, grey water damage, black water damage, sewage contamination, water damage restoration Australia, insurance water damage claims, water contamination levels, water damage assessment, restoration technician guide, water damage health risks, contaminated water cleanup, water damage insurance coverage',
  openGraph: {
    title: 'Professional Guide: Water Damage Categories 1, 2 & 3 Explained',
    description: 'Critical knowledge for restoration technicians, insurance adjusters and property owners. Understanding water contamination categories saves lives and property.',
    type: 'article',
    url: 'https://disaster-recovery-seven.vercel.app/resources/water-damage-categories',
    images: [{
      url: '/images/education/understanding-water-categories.png',
      width: 1200,
      height: 630,
      alt: 'IICRC Water Damage Categories 1, 2, and 3 Classification Guide'
    }],
  },
  alternates: {
    canonical: 'https://disaster-recovery-seven.vercel.app/resources/water-damage-categories'
  }
};

// Location data for geo-targeting
const australianLocations = [
  { city: 'Sydney', state: 'NSW', population: '5.3M' },
  { city: 'Melbourne', state: 'VIC', population: '5.0M' },
  { city: 'Brisbane', state: 'QLD', population: '2.6M' },
  { city: 'Perth', state: 'WA', population: '2.1M' },
  { city: 'Adelaide', state: 'SA', population: '1.4M' },
  { city: 'Gold Coast', state: 'QLD', population: '700K' },
  { city: 'Newcastle', state: 'NSW', population: '500K' },
  { city: 'Canberra', state: 'ACT', population: '460K' },
  { city: 'Sunshine Coast', state: 'QLD', population: '350K' },
  { city: 'Wollongong', state: 'NSW', population: '300K' }
];

export default function WaterDamageCategoriesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Understanding Water Damage Categories: Essential Guide for Restoration Professionals',
    description: 'Comprehensive guide to IICRC water damage categories 1, 2, and 3 for insurance claims and restoration professionals in Australia',
    author: {
      '@type': 'Organization',
      name: 'National Restoration Platform',
      url: 'https://disaster-recovery-seven.vercel.app'
    },
    publisher: {
      '@type': 'Organization',
      name: 'National Restoration Platform',
      logo: {
        '@type': 'ImageObject',
        url: 'https://disaster-recovery-seven.vercel.app/logo.png'
      }
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://disaster-recovery-seven.vercel.app/resources/water-damage-categories'
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://disaster-recovery-seven.vercel.app/images/education/understanding-water-categories.png',
      width: 1200,
      height: 630
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Category 1 water damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Category 1 water damage involves clean water from a sanitary source like broken water supply lines, tub overflows, or appliance malfunctions. This water poses no substantial threat to humans when exposed.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is Category 2 grey water damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Category 2 water contains significant contamination and has the potential to cause discomfort or sickness if consumed. Sources include washing machine overflow, dishwasher overflow, and toilet overflow with urine but no feces.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is Category 3 black water damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Category 3 water is grossly contaminated and contains pathogenic agents. Sources include sewage, flooding from rivers or streams, and stagnant water with microbial growth. This requires immediate professional remediation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can water damage categories change over time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, water damage can deteriorate from one category to another. Category 1 can become Category 2 within 48 hours, and Category 2 can become Category 3 within 48-72 hours due to bacterial growth and contamination.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover all water damage categories?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Insurance coverage varies by policy. Most standard policies cover sudden and accidental water damage from Categories 1 and 2. Category 3 damage may require additional coverage. Always review your specific policy and document everything for claims.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/30 px-4 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">IICRC S500 Standard Reference Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Understanding Water Damage Categories:
              <span className="block text-blue-400 mt-2">The Critical Knowledge Every Professional Needs</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Learn why identifying water contamination levels can save lives, protect property,
              and ensure proper insurance claims processing across Australia
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-sm text-blue-200">Reading Time</p>
                <p className="text-2xl font-bold">8 minutes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-sm text-blue-200">Professional Level</p>
                <p className="text-2xl font-bold">Essential</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-sm text-blue-200">Last Updated</p>
                <p className="text-2xl font-bold">2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Critical Alert Section */}
      <section className="bg-red-50 border-t-4 border-red-500 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-2">
                Critical Safety Warning for Property Owners & Technicians
              </h2>
              <p className="text-red-800">
                Incorrectly identifying water damage categories can lead to serious health risks,
                improper restoration, insurance claim denials, and potential legal liability.
                Category 3 (black water) contains dangerous pathogens that require immediate
                professional intervention with proper PPE and containment procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Infographic Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Three Categories of Water Damage: Visual Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                This classification system, established by the IICRC (Institute of Inspection,
                Cleaning and Restoration Certification), is the global standard used by insurance
                companies, restoration professionals, and health departments worldwide.
              </p>
            </div>

            {/* Infographic Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/education/understanding-water-categories.png"
                alt="IICRC Water Damage Categories 1, 2, and 3 - Clean Water, Grey Water, and Black Water Classification Guide"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Category Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Category 1 */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">1</div>
                  <h3 className="text-xl font-bold text-blue-900">Clean Water</h3>
                </div>
                <p className="text-blue-800 mb-4">
                  Water from a clean source that doesn't pose substantial threat to humans.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-blue-900">Common Sources:</p>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Broken water supply lines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Tub or sink overflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Appliance malfunctions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Rainwater (not through roof)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Action Required:</strong> Extract water, dry structure within 48 hours
                  </p>
                </div>
              </div>

              {/* Category 2 */}
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">2</div>
                  <h3 className="text-xl font-bold text-yellow-900">Grey Water</h3>
                </div>
                <p className="text-yellow-800 mb-4">
                  Water containing significant contamination that could cause illness or discomfort.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-yellow-900">Common Sources:</p>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span>Washing machine overflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span>Dishwasher overflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span>Toilet overflow (urine only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span>Sump pump failures</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Action Required:</strong> Remove affected materials, sanitize, use PPE
                  </p>
                </div>
              </div>

              {/* Category 3 */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">3</div>
                  <h3 className="text-xl font-bold text-red-900">Black Water</h3>
                </div>
                <p className="text-red-800 mb-4">
                  Grossly contaminated water containing pathogenic agents and toxins.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-red-900">Common Sources:</p>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <span>Sewage backups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <span>Flooding from rivers/streams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <span>Storm surge/ground water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <span>Standing water with bacteria</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 p-3 bg-red-100 rounded-lg">
                  <p className="text-xs text-red-800">
                    <strong>Action Required:</strong> Full containment, professional remediation only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Deterioration Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Critical Time Factor: Category Deterioration
              </h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6">
                Water damage doesn't stay in the same category. Without immediate action,
                contamination levels increase rapidly:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24-48h</div>
                  <div>
                    <p className="font-semibold text-gray-900">Category 1 → Category 2</p>
                    <p className="text-sm text-gray-600">
                      Clean water becomes contaminated as bacteria multiply and materials deteriorate
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">48-72h</div>
                  <div>
                    <p className="font-semibold text-gray-900">Category 2 → Category 3</p>
                    <p className="text-sm text-gray-600">
                      Grey water becomes black water as pathogens proliferate and toxins develop
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">72h+</div>
                  <div>
                    <p className="font-semibold text-gray-900">Severe Health Hazard</p>
                    <p className="text-sm text-gray-600">
                      Mould growth begins, structural damage accelerates, remediation costs triple
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Documentation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Insurance Claims: Why Category Classification Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Typically Covered
                </h3>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">Category 1:</span>
                    <span>Sudden & accidental water damage from burst pipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">Category 2:</span>
                    <span>Appliance malfunctions and overflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">Storm Damage:</span>
                    <span>When combined with wind damage to structure</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-600" />
                  Often Excluded
                </h3>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">Category 3:</span>
                    <span>Sewage backups (requires additional coverage)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">Flooding:</span>
                    <span>Ground water and river overflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">Gradual Damage:</span>
                    <span>Long-term leaks and maintenance issues</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <p className="text-blue-900 font-semibold mb-2">Professional Tip:</p>
              <p className="text-blue-800">
                Always document the water source, category classification, and time of discovery.
                Take photos before any cleanup begins. This documentation is crucial for insurance
                claims and can mean the difference between approval and denial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Risks Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Health Risks by Water Category
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Category 1: Minimal Risk</h3>
                <p className="text-gray-700 mb-3">
                  While considered "clean," prompt action is still essential:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• No immediate health threat if skin contact occurs</li>
                  <li>• Can cause slip hazards and electrical risks</li>
                  <li>• Becomes contaminated within 48 hours</li>
                  <li>• May trigger mould growth if not dried properly</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">Category 2: Moderate Risk</h3>
                <p className="text-gray-700 mb-3">
                  Contains bacteria and viruses requiring caution:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Can cause illness if ingested or contacts open wounds</li>
                  <li>• May contain chemical contaminants</li>
                  <li>• Requires protective equipment during cleanup</li>
                  <li>• Can cause allergic reactions and respiratory issues</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-600 mb-3">Category 3: Severe Risk</h3>
                <p className="text-gray-700 mb-3">
                  Contains dangerous pathogens and toxins:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Can cause severe illness or death</li>
                  <li>• Contains E. coli, Hepatitis, and other pathogens</li>
                  <li>• Requires full PPE and professional remediation</li>
                  <li>• All porous materials must be removed and destroyed</li>
                  <li>• Can contaminate HVAC systems if not contained</li>
                </ul>
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-red-800 font-semibold">
                    ⚠️ Never attempt DIY cleanup of Category 3 water damage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Standards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              IICRC S500 Professional Standards & Requirements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Safety Protocols</h3>
                <p className="text-gray-600 text-sm">
                  Proper PPE selection, containment barriers, and negative air pressure for Categories 2 & 3
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Moisture Mapping</h3>
                <p className="text-gray-600 text-sm">
                  Document all affected areas with moisture meters and thermal imaging cameras
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Antimicrobial Application</h3>
                <p className="text-gray-600 text-sm">
                  EPA-registered antimicrobials required for Category 2 & 3 contamination
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Required Equipment by Category
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-blue-600 mb-2">Category 1</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Water extractors</li>
                    <li>• Air movers</li>
                    <li>• Dehumidifiers</li>
                    <li>• Moisture meters</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-600 mb-2">Category 2</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All Category 1 equipment</li>
                    <li>• HEPA air scrubbers</li>
                    <li>• Antimicrobial sprayers</li>
                    <li>• PPE (gloves, masks)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-2">Category 3</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All Category 2 equipment</li>
                    <li>• Full PPE suits</li>
                    <li>• Containment barriers</li>
                    <li>• Biohazard disposal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location-Based SEO Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Water Damage Restoration Services Across Australia
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our network of IICRC-certified technicians provides 24/7 emergency response
              for all water damage categories across every major city and regional area in Australia.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {australianLocations.map((location) => (
                <div key={location.city} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {location.city}, {location.state}
                      </h3>
                      <p className="text-sm text-gray-500">Population: {location.population}</p>
                    </div>
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">Category 1:</span> Same day response
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Category 2:</span> 2-hour emergency
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Category 3:</span> Immediate dispatch
                    </p>
                  </div>
                  <Link
                    href={`/locations/${location.city.toLowerCase().replace(' ', '-')}/water-damage-restoration`}
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View {location.city} Services →
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Can't find your location? We service all of Australia including regional and remote areas.
              </p>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MapPin className="h-5 w-5" />
                Find Your Local Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions About Water Damage Categories
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  What's the difference between water damage classes and categories?
                </h3>
                <p className="text-gray-600">
                  Categories (1, 2, 3) refer to water contamination levels and health risks.
                  Classes (1, 2, 3, 4) refer to the amount of water and expected evaporation rate.
                  Both are important for determining the restoration approach and equipment needed.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  Can I clean up Category 2 water damage myself?
                </h3>
                <p className="text-gray-600">
                  While small Category 2 incidents might be manageable with proper PPE and sanitization,
                  professional restoration is strongly recommended. Improper cleanup can lead to hidden
                  contamination, mould growth, and health issues that appear weeks later.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  How quickly should water damage be addressed?
                </h3>
                <p className="text-gray-600">
                  Immediately. Within the first 24-48 hours, you should extract standing water and
                  begin drying. Professional restoration should begin within 24 hours for best results.
                  Every hour counts in preventing category deterioration and secondary damage.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  Will my insurance company accept any contractor's category assessment?
                </h3>
                <p className="text-gray-600">
                  Insurance companies typically require assessment by IICRC-certified technicians.
                  These professionals have the training, equipment, and credentials to properly
                  document water categories for claim purposes. Always use certified restoration companies.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  What happens if Category 1 water isn't cleaned up quickly?
                </h3>
                <p className="text-gray-600">
                  Category 1 water begins deteriorating within 48 hours. Bacteria multiply, materials
                  break down, and contamination spreads. What starts as a simple water extraction can
                  become a complex remediation requiring material removal and antimicrobial treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experiencing Water Damage? Act Now!
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Every minute counts when dealing with water damage. Our IICRC-certified
              technicians are available 24/7 across Australia for all water damage categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/emergency"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transition-colors"
              >
                <Phone className="h-6 w-6" />
                Emergency Response
              </Link>
              <Link
                href="/services/water-damage-restoration"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Learn More About Our Services
              </Link>
            </div>
            <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-blue-200">Emergency Response</p>
              </div>
              <div>
                <p className="text-3xl font-bold">IICRC</p>
                <p className="text-blue-200">Certified Technicians</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-blue-200">Insurance Approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Water Damage Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/resources/water-damage-timeline" className="group">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600">
                    Water Damage Timeline
                  </h3>
                  <p className="text-gray-600 text-sm">
                    What happens in the first 24-72 hours after water damage occurs
                  </p>
                </div>
              </Link>
              <Link href="/resources/mould-prevention" className="group">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600">
                    Preventing Mould After Water Damage
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Essential steps to prevent mould growth following water incidents
                  </p>
                </div>
              </Link>
              <Link href="/resources/insurance-claims-guide" className="group">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600">
                    Insurance Claims Guide
                  </h3>
                  <p className="text-gray-600 text-sm">
                    How to document and file successful water damage insurance claims
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}