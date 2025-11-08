import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Thermometer, Droplets, Wind, TrendingDown, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Psychrometric Case Studies — Brisbane Water Damage Restoration | IICRC Master Restorer',
  description: 'Real Brisbane water damage restoration case studies showing psychrometry in action. Learn from actual jobs with detailed readings, trends, and outcomes. IICRC S500 compliant.',
  keywords: 'psychrometry case studies, Brisbane water damage, drying case studies, IICRC S500, restoration examples, moisture control, Australian climate, sub-floor drying, slab drying',
  authors: [{ name: 'Phill McGurk', url: 'https://dr-new-ten.vercel.app/about-phil-mcgurk' }],
  publisher: 'Disaster Recovery Brisbane',
  openGraph: {
    title: 'Psychrometric Case Studies — Brisbane Water Damage Restoration',
    description: 'Real-world Brisbane restoration jobs with detailed psychrometric data, trends, and outcomes from Master Restorer Phill McGurk.',
    type: 'article',
    images: [{
      url: '/images/commercial-management-brisbane.webp',
      width: 1200,
      height: 630,
      alt: 'Commercial Water Damage Restoration Brisbane - Psychrometry Case Studies'
    }],
    publishedTime: '2025-01-08T00:00:00Z',
    modifiedTime: new Date().toISOString(),
    authors: ['Phill McGurk'],
    section: 'Case Studies',
    tags: ['psychrometry', 'case studies', 'Brisbane', 'water damage', 'IICRC S500'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychrometric Case Studies — Brisbane Water Damage',
    description: 'Real Brisbane restoration jobs with detailed psychrometric data and outcomes.',
    images: ['/images/commercial-management-brisbane.webp'],
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/psychrometry"
              className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Psychrometry Guide
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Psychrometric Case Studies
            </h1>
            <p className="text-xl text-green-100">
              Real Brisbane jobs showing how psychrometry drives successful drying outcomes
            </p>
          </div>
        </div>
      </section>

      {/* Brisbane Climate Reference */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Typical Brisbane Climate Reference (Average Conditions)
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Values based on long-term Bureau of Meteorology averages for Brisbane Metro region.
            </p>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Season</th>
                    <th className="px-6 py-4 text-left font-bold">Outside Air Temp (°C)</th>
                    <th className="px-6 py-4 text-left font-bold">Relative Humidity (%)</th>
                    <th className="px-6 py-4 text-left font-bold">Moisture Content of Air (g/kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-red-50">
                    <td className="px-6 py-4 font-semibold text-red-700">Summer (Dec–Feb)</td>
                    <td className="px-6 py-4">30 – 33</td>
                    <td className="px-6 py-4">65 – 80</td>
                    <td className="px-6 py-4 font-bold text-red-600">17 – 22 g/kg</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-6 py-4 font-semibold text-orange-700">Autumn (Mar–May)</td>
                    <td className="px-6 py-4">24 – 28</td>
                    <td className="px-6 py-4">55 – 70</td>
                    <td className="px-6 py-4 font-bold text-orange-600">11 – 16 g/kg</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-6 py-4 font-semibold text-blue-700">Winter (Jun–Aug)</td>
                    <td className="px-6 py-4">18 – 23</td>
                    <td className="px-6 py-4">45 – 60</td>
                    <td className="px-6 py-4 font-bold text-blue-600">7 – 11 g/kg</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-6 py-4 font-semibold text-green-700">Spring (Sep–Nov)</td>
                    <td className="px-6 py-4">25 – 30</td>
                    <td className="px-6 py-4">50 – 65</td>
                    <td className="px-6 py-4 font-bold text-green-600">10 – 15 g/kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Case 1: Interior Drying */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-blue-600">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 rounded-full p-4">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    🏠 Case 1 — Typical Interior Drying (Lounge Room / Plasterboard Walls / Carpet)
                  </h2>
                  <p className="text-gray-600 text-lg">Class 2 Water Loss • Category 1 Clean Water</p>
                </div>
              </div>

              {/* Scenario */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scenario</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Burst washing-machine hose, Category 1 clean water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Moderate saturation of carpet, underlay and lower plasterboard (Class 2 water loss)</span>
                  </li>
                </ul>
              </div>

              {/* Initial Conditions */}
              <div className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Initial Conditions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Inside ambient:</strong> 27°C | 80% RH | 19 g/kg</li>
                  <li><strong>Outside:</strong> 30°C | 75% RH | 21 g/kg</li>
                  <li><strong>Dew Point:</strong> ≈ 23°C → risk of condensation on cooler surfaces (tiles, windows)</li>
                </ul>
              </div>

              {/* Drying Plan */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Drying Plan</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Contain affected area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Target ambient after 24h: 24°C | 50% RH | ≈ 10 g/kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Use LGR dehumidifier × 2 + 6 air-movers + low-temp heater (if needed)</span>
                  </li>
                </ul>
              </div>

              {/* Progress Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expected Readings (Progress Indicators)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">Time</th>
                        <th className="px-4 py-3 text-left font-bold">Ambient Temp (°C)</th>
                        <th className="px-4 py-3 text-left font-bold">RH (%)</th>
                        <th className="px-4 py-3 text-left font-bold">Moisture (g/kg)</th>
                        <th className="px-4 py-3 text-left font-bold">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 font-semibold">Start</td>
                        <td className="px-4 py-3">27</td>
                        <td className="px-4 py-3">80</td>
                        <td className="px-4 py-3 font-bold text-red-600">19</td>
                        <td className="px-4 py-3">Baseline, heavy moisture load</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 font-semibold">+12h</td>
                        <td className="px-4 py-3">26</td>
                        <td className="px-4 py-3">60</td>
                        <td className="px-4 py-3 font-bold text-orange-600">12</td>
                        <td className="px-4 py-3">Dehu pulls ≈ 7 g/kg water from air</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 font-semibold">+24h</td>
                        <td className="px-4 py-3">25</td>
                        <td className="px-4 py-3">52</td>
                        <td className="px-4 py-3 font-bold text-yellow-700">10</td>
                        <td className="px-4 py-3">Safe ambient; steady evaporation</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-4 py-3 font-semibold">+48h</td>
                        <td className="px-4 py-3">24</td>
                        <td className="px-4 py-3">48</td>
                        <td className="px-4 py-3 font-bold text-green-700">9</td>
                        <td className="px-4 py-3">Near-dry; surface temps &gt; dew point</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-4 py-3 font-semibold">+72h</td>
                        <td className="px-4 py-3">24</td>
                        <td className="px-4 py-3">45</td>
                        <td className="px-4 py-3 font-bold text-blue-700">8</td>
                        <td className="px-4 py-3">Final stabilised condition; materials ≈ 12% MC</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Teaching Points */}
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">Key Teaching Points</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <TrendingDown className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Inside air must reach g/kg lower than outside for water to keep leaving materials.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingDown className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span><strong>G/kg ↓ = actual proof of drying progress.</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingDown className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>When air g/kg levels off while materials still wet → add heat or increase dehu capacity.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case 2: Sub-Floor */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-green-600">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-green-100 rounded-full p-4">
                  <Wind className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    🪵 Case 2 — Sub-Floor Cavity Drying (Timber Joists / Soil Base)
                  </h2>
                  <p className="text-gray-600 text-lg">Brisbane Summer • Category 2 Water</p>
                </div>
              </div>

              {/* Scenario */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scenario</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Groundwater ingress after heavy rain (Brisbane Summer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Category 2 water, containing soil particulates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Standing water removed but crawl space air still moist</span>
                  </li>
                </ul>
              </div>

              {/* Initial Conditions */}
              <div className="mb-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Initial Conditions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Sub-floor:</strong> 23°C | 95% RH | ≈ 18 g/kg</li>
                  <li><strong>Outside air:</strong> 30°C | 70% RH | ≈ 19 g/kg</li>
                  <li><strong>Timber joists:</strong> 25% MC (target ≤ 15%)</li>
                </ul>
              </div>

              {/* Drying Plan */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Drying Plan</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Install containment skirts at vents to control air exchange</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Place desiccant dehumidifier feeding dry air (≈ 6 g/kg) into sub-floor void</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Add 3–4 small circulation fans to break stagnant air pockets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Heat mildly (≈ 25°C) using indirect heater if ambient drops below 20°C</span>
                  </li>
                </ul>
              </div>

              {/* Progress Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expected Readings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">Time</th>
                        <th className="px-4 py-3 text-left font-bold">Sub-Floor Air (°C)</th>
                        <th className="px-4 py-3 text-left font-bold">RH (%)</th>
                        <th className="px-4 py-3 text-left font-bold">g/kg</th>
                        <th className="px-4 py-3 text-left font-bold">Timber MC (%)</th>
                        <th className="px-4 py-3 text-left font-bold">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 font-semibold">Start</td>
                        <td className="px-4 py-3">23</td>
                        <td className="px-4 py-3">95</td>
                        <td className="px-4 py-3 font-bold text-red-600">18</td>
                        <td className="px-4 py-3 font-bold text-red-600">25</td>
                        <td className="px-4 py-3">Wet air from soil</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 font-semibold">+12h</td>
                        <td className="px-4 py-3">25</td>
                        <td className="px-4 py-3">75</td>
                        <td className="px-4 py-3 font-bold text-orange-600">10</td>
                        <td className="px-4 py-3 font-bold text-orange-600">21</td>
                        <td className="px-4 py-3">Air drier than outside now</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 font-semibold">+24h</td>
                        <td className="px-4 py-3">25</td>
                        <td className="px-4 py-3">65</td>
                        <td className="px-4 py-3 font-bold text-yellow-700">8</td>
                        <td className="px-4 py-3 font-bold text-yellow-700">18</td>
                        <td className="px-4 py-3">Strong vapour pull from timber</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-4 py-3 font-semibold">+48h</td>
                        <td className="px-4 py-3">26</td>
                        <td className="px-4 py-3">60</td>
                        <td className="px-4 py-3 font-bold text-green-700">7</td>
                        <td className="px-4 py-3 font-bold text-green-700">16</td>
                        <td className="px-4 py-3">Moisture trend favourable</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-4 py-3 font-semibold">+72h</td>
                        <td className="px-4 py-3">26</td>
                        <td className="px-4 py-3">55</td>
                        <td className="px-4 py-3 font-bold text-blue-700">6</td>
                        <td className="px-4 py-3 font-bold text-blue-700">14</td>
                        <td className="px-4 py-3">Job can be completed once stable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Teaching Points */}
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">Key Teaching Points</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Sub-floors need low g/kg air (≈ 6–8 g/kg) to overcome cool, moist ground conditions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>A desiccant dehu beats LGR in cool or high humidity voids.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Monitor soil temperature vs dew point to avoid condensation under joists.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case 3: Slab */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-purple-600">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-purple-100 rounded-full p-4">
                  <Thermometer className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    🧱 Case 3 — Slab-on-Ground Concrete (Commercial Office)
                  </h2>
                  <p className="text-gray-600 text-lg">Class 3 Loss • Category 1 Water • Large Area</p>
                </div>
              </div>

              {/* Scenario */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scenario</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Internal flood from pipe burst across vinyl and carpet tiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Category 1 water, Class 3 (loss extends over large area, many low-porosity materials)</span>
                  </li>
                </ul>
              </div>

              {/* Initial Conditions */}
              <div className="mb-8 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Initial Conditions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Air:</strong> 24°C | 75% RH | 13 g/kg</li>
                  <li><strong>Concrete surface temp:</strong> 21°C | ≈ dew point of air → risk of condensation</li>
                  <li><strong>Moisture in slab:</strong> 3.5% (wet by capacitance meter) | Target ≤ 1.8%</li>
                </ul>
              </div>

              {/* Drying Plan */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Drying Plan</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Raise air temp to 28°C (to increase air capacity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Maintain RH ≤ 45% (≈ 8 g/kg) with 2 LGR dehus and air movers angled across floor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Remove vinyl tiles to allow evaporation path</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Supplement with infrared heating panels to warm slab surface</span>
                  </li>
                </ul>
              </div>

              {/* Progress Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expected Readings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">Time</th>
                        <th className="px-4 py-3 text-left font-bold">Ambient (°C)</th>
                        <th className="px-4 py-3 text-left font-bold">RH (%)</th>
                        <th className="px-4 py-3 text-left font-bold">g/kg</th>
                        <th className="px-4 py-3 text-left font-bold">Slab MC (%)</th>
                        <th className="px-4 py-3 text-left font-bold">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 font-semibold">Start</td>
                        <td className="px-4 py-3">24</td>
                        <td className="px-4 py-3">75</td>
                        <td className="px-4 py-3 font-bold text-red-600">13</td>
                        <td className="px-4 py-3 font-bold text-red-600">3.5</td>
                        <td className="px-4 py-3">Cool slab, risk of condense</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 font-semibold">+12h</td>
                        <td className="px-4 py-3">27</td>
                        <td className="px-4 py-3">60</td>
                        <td className="px-4 py-3 font-bold text-orange-600">10</td>
                        <td className="px-4 py-3 font-bold text-orange-600">3.1</td>
                        <td className="px-4 py-3">Air holding more moisture</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 font-semibold">+24h</td>
                        <td className="px-4 py-3">28</td>
                        <td className="px-4 py-3">50</td>
                        <td className="px-4 py-3 font-bold text-yellow-700">8</td>
                        <td className="px-4 py-3 font-bold text-yellow-700">2.6</td>
                        <td className="px-4 py-3">Strong dry trend</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-4 py-3 font-semibold">+48h</td>
                        <td className="px-4 py-3">28</td>
                        <td className="px-4 py-3">45</td>
                        <td className="px-4 py-3 font-bold text-green-700">7</td>
                        <td className="px-4 py-3 font-bold text-green-700">2.1</td>
                        <td className="px-4 py-3">Nearly target</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-4 py-3 font-semibold">+72h</td>
                        <td className="px-4 py-3">27</td>
                        <td className="px-4 py-3">45</td>
                        <td className="px-4 py-3 font-bold text-blue-700">7</td>
                        <td className="px-4 py-3 font-bold text-blue-700">1.8</td>
                        <td className="px-4 py-3">Reached target – remove gear gradually</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Teaching Points */}
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">Key Teaching Points</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Thermometer className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Warm air reduces RH and raises vapour pressure differential.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Thermometer className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Use surface temps &gt; dew point to avoid re-wetting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Thermometer className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Always verify slab MC stability 24h after equipment removal to avoid rebound.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Targets */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              ✅ Quick Reference Targets (Brisbane Jobs)
            </h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Zone</th>
                    <th className="px-6 py-4 text-left font-bold">Typical Ambient Target</th>
                    <th className="px-6 py-4 text-left font-bold">Safe g/kg Range</th>
                    <th className="px-6 py-4 text-left font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="px-6 py-4 font-semibold">Interior drying</td>
                    <td className="px-6 py-4">23–25°C @ 45–55% RH</td>
                    <td className="px-6 py-4 font-bold text-blue-600">8 – 10 g/kg</td>
                    <td className="px-6 py-4">Normal occupied environment</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-6 py-4 font-semibold">Sub-floor</td>
                    <td className="px-6 py-4">24–26°C @ 55–65% RH</td>
                    <td className="px-6 py-4 font-bold text-green-600">6 – 8 g/kg</td>
                    <td className="px-6 py-4">Lower to overcome ground moisture</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4 font-semibold">Slab drying</td>
                    <td className="px-6 py-4">26–28°C @ 40–50% RH</td>
                    <td className="px-6 py-4 font-bold text-purple-600">7 – 9 g/kg</td>
                    <td className="px-6 py-4">Higher temp to drive moisture out of dense matrix</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="px-6 py-4 font-semibold">Post-drying stability</td>
                    <td className="px-6 py-4">22–25°C @ 45–55% RH</td>
                    <td className="px-6 py-4 font-bold text-yellow-600">8 – 10 g/kg</td>
                    <td className="px-6 py-4">Hold for 24h to confirm equilibrium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Technician Training */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              How to Teach This to Technicians
            </h2>

            <div className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20 mb-6">
              <p className="text-xl text-blue-100 mb-6">
                Print or laminate the above table and keep one in each van.
              </p>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">During monitoring, ask techs:</h3>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>&quot;What&apos;s our ambient g/kg now?&quot;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>&quot;Is it lower than yesterday?&quot;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>&quot;Are any surfaces below dew point?&quot;</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-500 text-black p-6 rounded-lg">
              <p className="text-lg font-semibold mb-3">
                Reinforce that the <strong>g/kg trend</strong>, not the RH alone, is the true measure of progress.
              </p>
              <p className="text-lg">
                Use the <strong>HAT principle</strong> daily: if the job stalls, check Heat / Airflow / Take-out Moisture balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Need Professional Water Damage Restoration?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Phill McGurk is one of Brisbane&apos;s limited IICRC Master Restorer certified professionals. Get science-based drying with full psychrometric documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg"
              >
                Call 1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Request Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
