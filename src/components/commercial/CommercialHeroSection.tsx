'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, TrendingUp, Clock, CheckCircle, FileCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CommercialHeroSection = () => {
  const commercialStats = [
    { icon: Building2, value: '500+', label: 'Commercial Properties Restored' },
    { icon: TrendingUp, value: '98%', label: 'Business Continuity Success' },
    { icon: Clock, value: '1 Hour', label: 'Emergency Response Time' },
    { icon: FileCheck, value: '$20M', label: 'Liability Coverage' }
  ];

  const clientTypes = [
    'Office Buildings',
    'Retail Centers',
    'Industrial Warehouses',
    'Hotels & Hospitality',
    'Medical Facilities',
    'Educational Institutions',
    'Government Buildings',
    'Strata Properties'
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <Shield className="w-4 h-4 mr-2" />
            Brisbane's Premier Commercial Restoration Partner
          </Badge>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Commercial Property{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              Disaster Recovery
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Specialized restoration services for Brisbane's commercial sector.
            Minimize downtime, protect assets, and ensure business continuity
            with our Master Restorer certified team.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold"
              onClick={() => window.location.href = 'tel:1300309361'}
            >
              24/7 Emergency Response
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
            >
              Get Commercial Quote
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Commercial Management Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl blur opacity-20"></div>
            <Card className="relative overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <Image
                  src="/images/commercial-management-brisbane.png"
                  alt="Disaster Recovery Commercial Management Services - Brisbane CBD, Office Buildings, Retail Centers, Industrial Properties"
                  title="Professional Commercial Property Disaster Recovery Management - 24/7 Emergency Response, Insurance Approved, Business Continuity Solutions"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    Complete Commercial Solutions
                  </h3>
                  <p className="text-gray-200 text-sm">
                    From Brisbane CBD high-rises to Logan industrial complexes,
                    we protect your commercial assets 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistics and Trust Indicators */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {commercialStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Client Types */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  We Serve All Commercial Properties
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {clientTypes.map((type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{type}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Commercial Focus Areas */}
            <Card className="border-2 border-blue-600">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Brisbane CBD & Commercial Districts
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Specialized coverage for Brisbane's key commercial areas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Brisbane CBD', 'Fortitude Valley', 'South Brisbane', 'Eight Mile Plains', 'Springwood', 'Eagle Farm'].map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance & Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-3">Insurance & Compliance</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Direct insurance billing available</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>WorkCover compliant operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>IICRC certified Master Restorer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>$20M public liability insurance</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center bg-blue-600 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Protect Your Commercial Property Investment
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join 500+ Brisbane businesses that trust us for rapid disaster response and restoration.
            Available 24/7, 365 days a year.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services/commercial">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                View Commercial Services
              </Button>
            </Link>
            <Link href="/case-studies/commercial">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                See Case Studies
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommercialHeroSection;