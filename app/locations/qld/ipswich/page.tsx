'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  Droplets,
  Wind,
  CloudRain,
  Home
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function IpswichLocationPage() {
  // Comprehensive local SEO schema for Ipswich
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/qld/ipswich#business",
        "name": "Disaster Recovery Ipswich",
        "description": "24/7 IICRC-certified disaster restoration services in Ipswich, QLD. Expert flood damage, storm damage, water damage restoration across Greater Ipswich region including Springfield, Booval, Redbank Plains, Goodna.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/qld/ipswich",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ipswich",
          "addressRegion": "QLD",
          "postalCode": "4305",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6145,
          "longitude": 152.7578
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Ipswich"
          },
          {
            "@type": "Place",
            "name": "Springfield"
          },
          {
            "@type": "Place",
            "name": "Booval"
          },
          {
            "@type": "Place",
            "name": "Redbank Plains"
          },
          {
            "@type": "Place",
            "name": "Goodna"
          },
          {
            "@type": "Place",
            "name": "Yamanto"
          },
          {
            "@type": "Place",
            "name": "Leichhardt"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to emergencies in Ipswich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide rapid emergency response across Ipswich with 60-minute response times to most areas including Springfield, Booval, and Redbank Plains. Our Ipswich teams are equipped with specialized flood restoration equipment and understand the unique challenges of the Bremer River flood plain."
            }
          },
          {
            "@type": "Question",
            "name": "Do you service all Ipswich suburbs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we service all Ipswich suburbs including Springfield Central, Booval, Redbank Plains, Goodna, Yamanto, Leichhardt, Bundamba, Silkstone, Brassall, and surrounding areas. Our coverage extends throughout the Greater Ipswich region."
            }
          },
          {
            "@type": "Question",
            "name": "Are you experienced with Ipswich flood conditions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Our teams have extensive experience with Bremer River flooding and the unique drainage challenges in Ipswich. We understand the flood-prone areas like Goodna, North Ipswich, and riverside suburbs, and maintain specialized equipment for rapid water extraction and structural drying."
            }
          }
        ]
      }
    ]
  };

  const ipswichSuburbs = [
    { area: "Ipswich CBD", response: "60 min", population: "15,000", floodRisk: "High" },
    { area: "Springfield", response: "55 min", population: "45,000", floodRisk: "Low" },
    { area: "Booval", response: "65 min", population: "18,000", floodRisk: "Very High" },
    { area: "Redbank Plains", response: "65 min", population: "22,000", floodRisk: "Medium" },
    { area: "Goodna", response: "70 min", population: "9,000", floodRisk: "Very High" },
    { area: "Yamanto", response: "65 min", population: "14,000", floodRisk: "Medium" },
    { area: "Leichhardt", response: "60 min", population: "8,000", floodRisk: "High" },
    { area: "Bundamba", response: "65 min", population: "5,500", floodRisk: "Medium" }
  ];

  const ipswichDisasters = [
    {
      type: "Bremer River Flooding",
      frequency: "Regular wet season",
      areas: "Goodna, North Ipswich, Booval",
      season: "December-March",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Flash Flooding",
      frequency: "Summer storms",
      areas: "CBD, Railway corridors",
      season: "October-March",
      icon: <CloudRain className="w-6 h-6" />
    },
    {
      type: "Severe Storms",
      frequency: "Annual",
      areas: "All suburbs - hail risk",
      season: "October-March",
      icon: <Wind className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Queenslander Restoration",
      location: "Leichhardt",
      damage: "Roof storm damage",
      response: "55 minutes",
      outcome: "Heritage character preserved"
    },
    {
      type: "Shopping Centre",
      location: "Springfield Central",
      damage: "Water damage from roof leak",
      response: "60 minutes",
      outcome: "Trading resumed same day"
    },
    {
      type: "Industrial Facility",
      location: "Yamanto",
      damage: "Fire damage restoration",
      response: "50 minutes",
      outcome: "Production line restored"
    }
  ];

  return (
    <>
      <Script
        id="ipswich-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Local Trust Signals */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-blue-500/20 border border-blue-400 px-3 py-1 rounded-full text-sm">
                  ✓ Bremer River Specialists
                </span>
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ Springfield Ready
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ Local Expertise
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Ipswich
                <span className="block text-blue-700 text-3xl md:text-4xl mt-2">
                  Greater Ipswich Emergency Response - 60 Minutes
                </span>
              </h1>

              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                From Bremer River floods to Springfield storms - our IICRC-certified technicians
                provide <strong>rapid emergency response</strong> across Greater Ipswich.
                Extensive experience with local flood patterns and heritage Queenslander restoration.
              </p>

              {/* Ipswich-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">230K</div>
                  <div className="text-sm">Greater Ipswich</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">45+</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">60min</div>
                  <div className="text-sm">Average Response</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Ipswich Emergency
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Ipswich Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Ipswich Service Areas & Response Times
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Comprehensive coverage across Greater Ipswich region
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {ipswichSuburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{suburb.area}</h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {suburb.response} response
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    Population: {suburb.population}
                  </p>
                  <p className={`text-sm font-semibold ${
                    suburb.floodRisk === 'Very High' ? 'text-red-600' :
                    suburb.floodRisk === 'High' ? 'text-orange-600' :
                    suburb.floodRisk === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    Flood Risk: {suburb.floodRisk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Ipswich Coverage:</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Central:</strong> Ipswich CBD, North Ipswich, East Ipswich, West Ipswich •
                <strong>North:</strong> Booval, Bundamba, Leichhardt, Blackwall •
                <strong>South:</strong> Goodna, Redbank, Redbank Plains, Collingwood Park •
                <strong>East:</strong> Springfield Central, Springfield Lakes, Augustine Heights •
                <strong>West:</strong> Yamanto, Ripley, Deebing Heights, Flinders View
              </p>
            </div>
          </div>
        </section>

        {/* Ipswich Disaster Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Ipswich Disaster Response Specialties
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Expert response for Greater Ipswich's unique challenges
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {ipswichDisasters.map((disaster, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {disaster.icon}
                    </div>
                    <h3 className="text-xl font-bold">{disaster.type}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Frequency:</strong> {disaster.frequency}</p>
                    <p><strong>High-risk areas:</strong> {disaster.areas}</p>
                    <p><strong>Peak season:</strong> {disaster.season}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-red-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-red-800">Bremer River Monitoring</h3>
              <p className="text-gray-600">
                We monitor Bremer River levels and rainfall patterns 24/7, with special attention
                to flood-prone areas like Goodna, North Ipswich, and Booval. Our teams pre-position
                equipment during weather warnings for immediate deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Ipswich Emergency Responses
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <Building className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.type}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{project.location}</p>
                      <p className="text-gray-600 mb-2">{project.damage}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-green-600">✓ {project.response}</span>
                        <span className="text-green-600">✓ {project.outcome}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ipswich's Trusted Emergency Response Service
              </h2>

              <p className="text-xl mb-8 leading-relaxed">
                From historic Queenslanders in Leichhardt to modern homes in Springfield,
                from Bremer River floods to severe storms - we've protected Greater Ipswich
                properties with expert care and rapid response.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">60-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Ipswich teams know every flood-prone street and storm risk area.
                  When disaster strikes, we're ready to respond immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Get Ipswich Help Now
                </motion.a>
                <motion.a
                  href="/locations/brisbane"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Brisbane Coverage
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Ipswich postcodes: 4300-4311 • Springfield to Goodna • Yamanto to Booval</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}