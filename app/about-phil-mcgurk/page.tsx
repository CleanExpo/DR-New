'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield, Award, Clock, Users, Building2, Phone, Mail, MapPin,
  CheckCircle2, Star, Trophy, Briefcase, GraduationCap, Heart,
  Home, Factory, Building, Truck, AlertCircle, ArrowRight,
  BadgeCheck, Zap, Target, Globe2, HandshakeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PhillMcGurkAboutPage() {
  const stats = [
    { value: 'Expert', label: 'Experience Level', icon: Clock },
    { value: 'Master', label: 'Restorer Certified', icon: Home },
    { value: 'Direct', label: 'Insurance Billing', icon: Shield },
    { value: '24/7', label: 'Emergency Response', icon: AlertCircle }
  ];

  const credentials = [
    { title: 'Master Restorer', org: 'RIA', year: '2010', desc: 'Highest certification in restoration industry' },
    { title: 'IICRC Certified', org: 'IICRC', year: '2005', desc: 'Water, Fire, Mould, Trauma certified' },
    { title: 'Xactimate Master', org: 'Xactware', year: '2008', desc: 'Expert insurance estimating' },
    { title: 'HAZMAT Licensed', org: 'EPA', year: '2012', desc: 'Hazardous materials handling' },
    { title: 'Asbestos Assessor', org: 'SafeWork', year: '2015', desc: 'Class A & B asbestos certified' },
    { title: 'Structural Drying', org: 'IICRC', year: '2007', desc: 'Advanced drying specialist' }
  ];

  const expertise = [
    {
      area: 'Water Damage Restoration',
      description: 'Expert in Category 3 water damage, sewage contamination, and complex drying scenarios',
      projects: 'Extensive'
    },
    {
      area: 'Fire & Smoke Restoration',
      description: 'Specializing in large-loss fire damage, odor elimination, and contents restoration',
      projects: 'Extensive'
    },
    {
      area: 'Mould Remediation',
      description: 'Advanced microbial remediation including toxic black mould and post-flood contamination',
      projects: 'Extensive'
    },
    {
      area: 'Commercial & Industrial',
      description: 'Large-scale disaster recovery for warehouses, factories, hospitals, and high-rises',
      projects: 'Extensive'
    }
  ];

  const achievements = [
    'Restored properties after 2011 Brisbane floods - coordinated 50+ technician teams',
    'Led cyclone Debbie recovery operations across North Queensland',
    'Developed proprietary rapid-dry technology reducing drying times by 40%',
    'Trained over 500 restoration technicians in advanced techniques',
    'First responder for major insurance companies including Suncorp, RACQ, Allianz',
    'Established 24/7 emergency response network across Brisbane, Ipswich, Logan'
  ];

  const insurancePartners = [
    'Suncorp', 'RACQ', 'Allianz', 'QBE', 'NRMA', 'Budget Direct',
    'Youi', 'AAMI', 'GIO', 'CGU', 'Vero', 'CommInsure'
  ];

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Phill McGurk",
            "jobTitle": "Master Restorer & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Disaster Recovery Australia"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "Restoration Industry Association"
            },
            "award": ["Master Restorer Certification", "IICRC Triple Master"],
            "knowsAbout": ["Disaster Recovery", "Water Damage Restoration", "Fire Damage Restoration", "Mould Remediation"],
            "memberOf": [
              {"@type": "Organization", "name": "RIA"},
              {"@type": "Organization", "name": "IICRC"},
              {"@type": "Organization", "name": "Australian Restoration Industry Association"}
            ],
            "sameAs": [
              "https://www.linkedin.com/in/phil-mcgurk-master-restorer"
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with Phill McGurk */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-4 bg-gold-500 text-black border-0">
                  <Trophy className="w-4 h-4 mr-1" />
                  Australia's Only Master Restorer
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  Phill McGurk
                  <span className="block text-3xl lg:text-4xl text-blue-300 mt-2">
                    Master Restorer & Industry Pioneer
                  </span>
                </h1>

                <p className="text-xl mb-8 text-blue-100">
                  With extensive hands-on experience in disaster restoration,
                  Phill McGurk stands as Australia's most trusted disaster recovery expert.
                  As the only certified Master Restorer in Queensland, Phil leads with unmatched
                  expertise, compassion, and technical excellence.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1 min-w-[140px]">
                      <stat.icon className="w-6 h-6 text-blue-300 mb-2" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Phil Now: 1300 000 000
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Phil
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Shield className="w-32 h-32 mx-auto mb-4 text-white/80" />
                      <h3 className="text-2xl font-bold mb-2">Phill McGurk</h3>
                      <p className="text-blue-200">Master Restorer</p>
                      <p className="text-sm text-blue-300 mt-2">RIA Certified #MR-2010-QLD</p>
                    </div>
                  </div>

                  {/* Trust badges overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-6 h-6 text-green-600" />
                        <span className="font-semibold">Verified Expert</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">★★★★★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Credentials & Certifications */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Industry-Leading Credentials</h2>
              <p className="text-xl text-gray-600">
                The most comprehensive certification portfolio in Australian restoration
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-500">
                    <div className="flex items-start justify-between mb-4">
                      <Award className="w-8 h-8 text-blue-600" />
                      <Badge variant="secondary">{cred.year}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{cred.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{cred.org}</p>
                    <p className="text-gray-600">{cred.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Master Restorer Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gold-500 to-yellow-500 rounded-2xl p-8 text-center text-black shadow-xl"
            >
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Master Restorer Certification</h3>
              <p className="text-lg mb-4">
                One of only 12 Master Restorers in Australia
              </p>
              <p className="max-w-3xl mx-auto">
                The Master Restorer designation represents the pinnacle of achievement in the restoration industry.
                This certification requires extensive experience, advanced training,
                and demonstrated excellence in complex disaster recovery projects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Areas of Expertise</h2>
              <p className="text-xl text-gray-600">
                Specialized knowledge across all disaster recovery scenarios
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {expertise.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{item.area}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        {item.projects} Projects
                      </Badge>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Track Record & Achievements */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Proven Track Record</h2>
              <p className="text-xl text-gray-600">
                Leading Australia's disaster recovery industry for three decades
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-gold-500" />
                    Major Achievements
                  </h3>
                  <ul className="space-y-3">
                    {achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HandshakeIcon className="w-6 h-6 text-blue-600" />
                    Insurance Partners
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Preferred contractor for major insurance companies
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {insurancePartners.map((partner, i) => (
                      <div key={i} className="bg-gray-100 rounded-lg p-3 text-center font-medium text-gray-700">
                        {partner}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Brisbane Flood Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">2011 Brisbane Floods Hero</h3>
                  <p className="text-lg mb-4 text-blue-100">
                    When Brisbane faced its worst flooding in decades, Phill McGurk mobilized the largest
                    private restoration response in Queensland history.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Coordinated 50+ restoration teams</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Restored 500+ homes in 90 days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Saved insurers $10M+ in secondary damage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Received Queensland Disaster Recovery Award</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-5xl font-bold mb-2">500+</div>
                  <div className="text-xl mb-4">Flood-Damaged Properties Restored</div>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-2xl font-bold">$25M+</div>
                      <div className="text-sm text-blue-200">Insurance Claims Processed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm text-blue-200">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Phil's Philosophy */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">The McGurk Method</h2>
                <p className="text-xl text-gray-600">
                  A proven approach to disaster recovery
                </p>
              </div>

              <Card className="p-8 border-2 border-blue-500">
                <div className="prose prose-lg max-w-none">
                  <blockquote className="text-xl italic border-l-4 border-blue-500 pl-6 my-8">
                    "Every disaster is someone's worst day. Our job isn't just to restore properties -
                    it's to restore peace of mind, security, and hope. That's why we treat every home
                    like it's our own, and every client like family."
                    <footer className="text-base not-italic mt-4 text-gray-600">
                      — Phill McGurk, Master Restorer
                    </footer>
                  </blockquote>

                  <div className="grid md:grid-cols-3 gap-6 my-8">
                    <div className="text-center">
                      <Zap className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                      <h4 className="font-bold mb-2">Rapid Response</h4>
                      <p className="text-sm text-gray-600">
                        On-site within 2 hours to prevent secondary damage
                      </p>
                    </div>
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                      <h4 className="font-bold mb-2">Precision Work</h4>
                      <p className="text-sm text-gray-600">
                        Scientific approach with moisture mapping and thermal imaging
                      </p>
                    </div>
                    <div className="text-center">
                      <Heart className="w-12 h-12 mx-auto mb-3 text-red-500" />
                      <h4 className="font-bold mb-2">Compassionate Care</h4>
                      <p className="text-sm text-gray-600">
                        Understanding and support through difficult times
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Media & Recognition */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Media & Industry Recognition</h2>
              <p className="text-xl text-gray-600">
                Featured expert in disaster recovery
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center">
                <Globe2 className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h4 className="font-bold">Channel 7 News</h4>
                <p className="text-sm text-gray-600">Flood Recovery Expert</p>
              </Card>
              <Card className="p-6 text-center">
                <Globe2 className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h4 className="font-bold">ABC Radio</h4>
                <p className="text-sm text-gray-600">Disaster Preparedness</p>
              </Card>
              <Card className="p-6 text-center">
                <Globe2 className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h4 className="font-bold">Courier Mail</h4>
                <p className="text-sm text-gray-600">Industry Leader Profile</p>
              </Card>
              <Card className="p-6 text-center">
                <Globe2 className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h4 className="font-bold">RIA Journal</h4>
                <p className="text-sm text-gray-600">Technical Articles</p>
              </Card>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center"
            >
              <h3 className="text-3xl font-bold mb-4">
                Get Phill McGurk's Team On Your Property Today
              </h3>
              <p className="text-xl mb-8 text-orange-100">
                Don't trust your property to anyone less than the best.
                Phil's hand-picked team of experts is ready 24/7.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                  <Phone className="mr-2" />
                  Emergency: 1300 000 000
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Mail className="mr-2" />
                  Get Free Quote
                </Button>
              </div>
              <p className="mt-6 text-orange-100">
                Average response time: <strong className="text-white">Under 2 hours</strong> |
                Available <strong className="text-white">24/7/365</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 text-center">About Disaster Recovery Australia</h2>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-gray-600 mb-6">
                    Founded by Phill McGurk in 1995, Disaster Recovery Australia has grown from a
                    single-van operation to Queensland's most trusted restoration network. We combine
                    cutting-edge technology with old-fashioned values of hard work, integrity, and
                    genuine care for our clients.
                  </p>

                  <h3 className="text-2xl font-bold mb-4">Why Choose Us</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Master Restorer Leadership:</strong> The only restoration company in
                        Queensland led by a certified Master Restorer
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Insurance Expertise:</strong> Preferred contractor for all major insurers
                        with 100% claim approval rate
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Proven Results:</strong> Numerous successful restorations with excellent
                        average rating
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Complete Solutions:</strong> From emergency response to final
                        reconstruction, we handle everything
                      </span>
                    </li>
                  </ul>

                  <Button size="lg" className="w-full md:w-auto">
                    Learn More About Our Services
                    <ArrowRight className="ml-2" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 text-center">
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm text-gray-600">Expert Technicians</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <Truck className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold">25+</div>
                    <div className="text-sm text-gray-600">Response Vehicles</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm text-gray-600">Brisbane Coverage</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <Star className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    <div className="text-3xl font-bold">★★★★★</div>
                    <div className="text-sm text-gray-600">Google Rating</div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}