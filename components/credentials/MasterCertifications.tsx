'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Droplet, Flame, Sparkles, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MasterCertifications = () => {
  const certifications = [
    {
      title: 'IICRC Master Restorer',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Highest level of IICRC certification - Master Water Restorer, Master Fire & Smoke Restorer, Master Textile Cleaner. One of a Limited Number of Master Restorers in Brisbane & Queensland.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-centre mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
            <Award className="w-4 h-4 mr-2" />
            Master Certified Professional
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Industry-Leading Credentials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <strong>Phill McGurk:</strong> IICRC Master Restorer
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-centre">
          {/* Certification Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <Card className="relative overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/images/phill-mcgurk-iicrc-certification.png"
                  alt="Phill McGurk IICRC Master Certifications - Master Textile Cleaner, Master Fire & Smoke Restorer, Master Water Restorer - Certificate Expiration 06/26"
                  title="IICRC Board of Directors recognises Phill McGurk for achieving the highest level of certification through continuous education and meeting the requirements of the IICRC"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  priority
                />
              </CardContent>
            </Card>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg transform rotate-3">
              <span className="font-bold text-sm">One of a Limited Number of Master Restorers in Brisbane & QLD</span>
            </div>
          </motion.div>

          {/* Certifications Details */}
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-yellow-400">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${cert.bgColor}`}>
                        <cert.icon className={`w-8 h-8 ${cert.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-centre gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {cert.title}
                          </h3>
                          <Shield className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-gray-600">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* IICRC Badge with Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 p-6 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl text-white"
            >
              <div className="flex items-centre justify-between">
                <div>
                  <h4 className="text-lg font-bold mb-2">IICRC Board of Directors</h4>
                  <p className="text-gray-300 mb-4">
                    The IICRC recognises Phill McGurk for achieving the highest level of certification through continuous education and meeting the requirements of the IICRC.
                  </p>
                  <Link
                    href="https://iicrc.org/iicrcmaster/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-centre gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                  >
                    <span className="font-semibold">Verify IICRC Master Certification</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
                <div className="text-yellow-400">
                  <Award className="w-16 h-16" />
                </div>
              </div>
              <div className="mt-4 flex items-centre justify-between">
                <div>
                  <div className="text-sm text-gray-400">
                    Certificate Holder: <span className="text-white font-semibold">Phill McGurk</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Expiration Date: <span className="text-white font-semibold">06/26</span>
                  </div>
                </div>
                <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                  Master Certified
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-centre">
            <div className="text-3xl font-bold text-gray-900">Expert</div>
            <div className="text-sm text-gray-600">Experience Level</div>
          </div>
          <div className="text-centre">
            <div className="text-3xl font-bold text-gray-900">Master</div>
            <div className="text-sm text-gray-600">Restorer Certified</div>
          </div>
          <div className="text-centre">
            <div className="text-3xl font-bold text-gray-900">$20M</div>
            <div className="text-sm text-gray-600">Insurance Coverage</div>
          </div>
          <div className="text-centre">
            <div className="text-3xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Emergency Response</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MasterCertifications;