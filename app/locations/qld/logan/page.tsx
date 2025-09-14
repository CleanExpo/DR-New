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

export default function LoganLocationPage() {
  // Comprehensive local SEO schema for Logan
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/qld/logan#business",
        "name": "Disaster Recovery Logan",
        "description": "24/7 IICRC-certified disaster restoration services in Logan City, QLD. Expert flood damage, storm damage, water damage restoration across Logan region including Beenleigh, Woodridge, Springwood, Browns Plains, Logan Central.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/qld/logan",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Logan City",
          "addressRegion": "QLD",
          "postalCode": "4114",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6386,
          "longitude": 153.1055
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
            "name": "Logan City"
          },
          {
            "@type": "Place",
            "name": "Beenleigh"
          },
          {
            "@type": "Place",
            "name": "Woodridge"
          },
          {
            "@type": "Place",
            "name": "Springwood"
          },
          {
            "@type": "Place",
            "name": "Browns Plains"
          },
          {
            "@type": "Place",
            "name": "Logan Central"
          },
          {
            "@type": "Place",
            "name": "Underwood"
          },
          {
            "@type": "Place",
            "name": "Daisy Hill"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to emergencies in Logan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide rapid emergency response across Logan City with 65-minute response times to most areas including Beenleigh, Woodridge, Springwood, and Browns Plains. Our Logan teams understand the unique flood risks from Logan River and Creek systems and maintain specialized equipment for rapid deployment."
            }
          },
          {
            "@type": "Question",
            "name": "Do you service all Logan suburbs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we service all Logan suburbs including Logan Central, Beenleigh, Woodridge, Springwood, Browns Plains, Underwood, Daisy Hill, Shailer Park, Rochedale South, and surrounding areas throughout Logan City Council area."
            }
          },
          {
            "@type": "Question",
            "name": "Are you experienced with Logan flood conditions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Our teams have extensive experience with Logan River flooding and the complex drainage challenges across Logan City. We understand flood-prone areas like Beenleigh, central Logan, and creek-adjacent suburbs, maintaining specialized flood response equipment for immediate deployment."
            }
          }
        ]
      }
    ]
  };

  const loganSuburbs = [
    { area: "Logan Central", response: "65 min", population: "18,000", floodRisk: "High" },
    { area: "Beenleigh", response: "70 min", population: "8,500", floodRisk: "Very High" },
    { area: "Woodridge", response: "60 min", population: "19,000", floodRisk: "Medium" },
    { area: "Springwood", response: "65 min", population: "8,000", floodRisk: "Medium" },
    { area: "Browns Plains", response: "65 min", population: "27,000", floodRisk: "Low" },
    { area: "Underwood", response: "55 min", population: "3,500", floodRisk: "Low" },
    { area: "Daisy Hill", response: "60 min", population: "9,000", floodRisk: "Low" },
    { area: "Shailer Park", response: "55 min", population: "9,500", floodRisk: "Low" }
  ];

  const loganDisasters = [
    {
      type: "Logan River Flooding",
      frequency: "Wet season events",
      areas: "Beenleigh, Logan Central",
      season: "December-March",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Creek Flooding",
      frequency: "Summer storms",
      areas: "Slacks Creek, Eight Mile Plains",
      season: "October-March",
      icon: <CloudRain className="w-6 h-6" />
    },
    {
      type: "Severe Storms",
      frequency: "Regular summer",
      areas: "All Logan areas",
      season: "October-March",
      icon: <Wind className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Shopping Centre",
      location: "Browns Plains",
      damage: "Storm water ingress",
      response: "60 minutes",
      outcome: "Trading resumed next day"
    },
    {
      type: "Residential Complex",
      location: "Springwood",
      damage: "Fire damage - 12 units",
      response: "55 minutes",
      outcome: "All families rehoused"
    },
    {
      type: "Industrial Warehouse",
      location: "Underwood",
      damage: "Flood damage from creek",
      response: "65 minutes",
      outcome: "Operations restored in 48hrs"
    }
  ];

  return (
    <>
      <Script
        id="logan-schema"
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
                  ✓ Logan River Specialists
                </span>
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ Multicultural Aware
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ Community Focused
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Logan
                <span className="block text-blue-700 text-3xl md:text-4xl mt-2">
                  Logan City Emergency Response - 65 Minutes
                </span>
              </h1>

              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                From Logan River floods to severe storm cells - our IICRC-certified technicians
                provide <strong>rapid emergency response</strong> across Logan City.
                Experienced with multicultural communities and local flood patterns from Beenleigh to Browns Plains.
              </p>

              {/* Logan-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">326K</div>
                  <div className="text-sm">Logan City Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">60+</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">65min</div>
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
                  Logan Emergency
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

        {/* Logan Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Logan City Service Areas & Response Times
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Comprehensive coverage across all Logan City Council areas
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {loganSuburbs.map((suburb, index) => (
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
              <h3 className="text-xl font-bold mb-3">Complete Logan Coverage:</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Central:</strong> Logan Central, Woodridge, Kingston, Slacks Creek •
                <strong>North:</strong> Underwood, Rochedale South, Priestdale, Daisy Hill •
                <strong>South:</strong> Beenleigh, Eagleby, Windaroo, Bahrs Scrub •
                <strong>East:</strong> Springwood, Shailer Park, Tanah Merah •
                <strong>West:</strong> Browns Plains, Forest Lake, Acacia Ridge, Algester
              </p>
            </div>
          </div>
        </section>

        {/* Logan Disaster Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Logan Disaster Response Specialties
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Expert response for Logan City's unique challenges
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {loganDisasters.map((disaster, index) => (
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
              <h3 className="text-xl font-bold mb-3 text-red-800">Logan River & Creek Monitoring</h3>
              <p className="text-gray-600">
                We monitor Logan River, Slacks Creek, and Eight Mile Plains Creek levels 24/7.
                Special attention to flood-prone areas like Beenleigh, Logan Central, and riverside
                suburbs with pre-positioned equipment during warnings.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Logan Emergency Responses
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
                Logan's Community-Focused Emergency Response
              </h2>

              <p className="text-xl mb-8 leading-relaxed">
                From multicultural Woodridge to growing Browns Plains,
                from Logan River floods to severe storms - we've protected Logan City
                communities with expert care, cultural sensitivity, and rapid response.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">65-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Logan teams understand the diverse communities and local flood risks.
                  When disaster strikes, we respond with expertise and cultural awareness.
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
                  Get Logan Help Now
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
                <p>Servicing all Logan postcodes: 4110-4133 • Beenleigh to Browns Plains • Underwood to Springwood</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}