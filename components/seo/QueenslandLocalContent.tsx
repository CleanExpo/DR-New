'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Cloud, Home, Droplets } from 'lucide-react';

/**
 * QUEENSLAND LOCAL CONTENT COMPONENT
 * Embeds Brisbane/Queensland-specific keywords and local references
 * for maximum local search relevance signals
 */

export function BrisbaneRiverFloodingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-sm mb-4">
              <Droplets className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Brisbane River Flooding Specialists
            </h2>
            <p className="text-xl text-blue-200">
              Expert flood recovery for Brisbane's flood-prone riverside suburbs
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <p className="text-lg text-blue-100 mb-6">
              With deep knowledge of <strong>Brisbane River flooding patterns</strong> and the 2011 Queensland floods,
              we provide specialized emergency restoration for riverside properties in <strong>Hamilton, New Farm,
              West End, Toowong, and Auchenflower</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">High-Risk Brisbane Suburbs</h3>
                <ul className="space-y-2 text-blue-200">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                    <span>Hamilton riverside properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                    <span>New Farm riverside apartments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                    <span>Toowong flood zone properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" aria-hidden="true" />
                    <span>Auchenflower Brisbane River catchment</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Our Flood Recovery Expertise</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>Emergency water extraction within 60 minutes</li>
                  <li>Brisbane subtropical climate moisture control</li>
                  <li>Heritage Queenslander flood restoration</li>
                  <li>Rapid mould prevention in Queensland humidity</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function QueenslandSubtropicalClimateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Cloud className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Queensland Subtropical Climate Challenges
            </h2>
            <p className="text-xl text-gray-600">
              Specialized restoration for Southeast Queensland's unique weather patterns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Brisbane Summer Storms</h3>
              <p className="text-gray-700 mb-4">
                <strong>Southeast Queensland severe weather</strong> and <strong>Brisbane summer storm season</strong> create
                unique challenges requiring rapid emergency response.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Severe thunderstorm wind damage</li>
                <li>• Flash flooding from tropical downpours</li>
                <li>• Hail damage to roofs and properties</li>
                <li>• Lightning fire damage restoration</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tropical Moisture Control</h3>
              <p className="text-gray-700 mb-4">
                <strong>Queensland wet season</strong> and high humidity require specialized drying techniques
                to prevent mould growth in the <strong>subtropical climate</strong>.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Industrial dehumidification for humidity</li>
                <li>• Advanced moisture mapping</li>
                <li>• Rapid mould prevention protocols</li>
                <li>• Air quality restoration</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function QueenslandHeritageHomesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-amber-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Home className="w-8 h-8 text-amber-600" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Queensland Heritage Homes Restoration
            </h2>
            <p className="text-xl text-gray-600">
              Specialist restoration for Brisbane's iconic Queenslander houses
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-amber-600">
            <p className="text-lg text-gray-700 mb-6">
              Our Master Restorer has extensive experience with <strong>Brisbane Queenslander houses</strong> and
              <strong> Queensland heritage homes</strong>, understanding the unique construction methods,
              VJ walls, tongue-and-groove flooring, and traditional building materials.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Heritage Property Expertise</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>VJ wall water damage restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Tongue-and-groove floor drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Traditional timber fire restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Under-house flood cleanup (high-set)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Prestige Brisbane Suburbs</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Hamilton heritage estates</strong></li>
                  <li><strong>Ascot prestige properties</strong></li>
                  <li><strong>New Farm character homes</strong></li>
                  <li><strong>Paddington heritage Queenslanders</strong></li>
                  <li><strong>Toowong classic homes</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ALL-IN-ONE QUEENSLAND LOCAL CONTENT
 * Use this on pages where you want maximum local SEO signals
 */
export default function AllQueenslandLocalContent() {
  return (
    <>
      <BrisbaneRiverFloodingSection />
      <QueenslandSubtropicalClimateSection />
      <QueenslandHeritageHomesSection />
    </>
  );
}
