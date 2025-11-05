'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Phone, ArrowRight, Clock, Shield, AlertTriangle,
  Droplets, Flame, Bug, Building2, Biohazard,
  Trash2, CheckCircle, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconImage?: string;
  icon: React.ElementType;
  urgency: 'critical' | 'urgent' | 'high' | 'normal';
  responseTime: string;
  averageCost: string;
  features: string[];
  certifications: string[];
  healthRisks: string[];
  processSteps: string[];
  category: 'water' | 'fire' | 'mould' | 'biohazard' | 'commercial' | 'crime';
  phoneNumber: string;
}

const services: Service[] = [
  {
    id: 'water-damage',
    title: 'Water Damage Restoration',
    shortDescription: 'Fast water extraction and structural drying to prevent mould growth.',
    fullDescription: 'Professional water damage restoration using industrial-grade extraction equipment and dehumidifiers. We prevent secondary damage like mould growth through rapid response and proper drying techniques.',
    image: '/images/services/water-damage-restoration.webp',
    icon: Droplets,
    urgency: 'critical',
    responseTime: '60 minutes',
    averageCost: '$1,500 - $4,500',
    features: ['Emergency water extraction', 'Structural drying', 'Moisture monitoring', 'Mould prevention'],
    certifications: ['IICRC WRT Certified', 'Insurance Approved'],
    healthRisks: ['Mould growth within 24-48 hours', 'Structural damage', 'Electrical hazards'],
    processSteps: ['Emergency response', 'Water extraction', 'Moisture detection', 'Drying setup', 'Monitoring', 'Restoration'],
    category: 'water',
    phoneNumber: '1300309361'
  },
  {
    id: 'fire-damage',
    title: 'Fire & Smoke Damage Restoration',
    shortDescription: 'Complete fire damage restoration including smoke odor removal.',
    fullDescription: 'Comprehensive fire damage restoration covering structural cleaning, smoke odor elimination, and content restoration. Our IICRC certified technicians handle everything from minor smoke damage to major fire restoration.',
    image: '/images/services/fire-damage-restoration.webp',
    icon: Flame,
    urgency: 'urgent',
    responseTime: '90 minutes',
    averageCost: '$2,500 - $15,000',
    features: ['Smoke odor removal', 'Soot cleaning', 'Content restoration', 'Structural repairs'],
    certifications: ['IICRC FSRT Certified', 'NRCC Certified'],
    healthRisks: ['Toxic smoke residue', 'Respiratory issues', 'Carcinogenic particles'],
    processSteps: ['Assessment', 'Stabilization', 'Cleaning', 'Deodorization', 'Restoration', 'Final inspection'],
    category: 'fire',
    phoneNumber: '1300309361'
  },
  {
    id: 'mould-remediation',
    title: 'Mould Remediation',
    shortDescription: 'Safe mould removal and remediation to protect health.',
    fullDescription: 'Professional mould remediation using containment procedures and HEPA filtration. We safely remove mould colonies and implement prevention strategies to protect your health and property.',
    image: '/images/services/mould-remediation.webp',
    icon: Bug,
    urgency: 'high',
    responseTime: '2-4 hours',
    averageCost: '$1,200 - $6,000',
    features: ['Containment setup', 'HEPA air filtration', 'Safe mould removal', 'Prevention treatment'],
    certifications: ['IICRC AMRT Certified', 'Mould Specialist'],
    healthRisks: ['Respiratory problems', 'Allergic reactions', 'Toxic exposure', 'Immune system effects'],
    processSteps: ['Inspection', 'Containment', 'Air filtration', 'Removal', 'Cleaning', 'Prevention'],
    category: 'mould',
    phoneNumber: '1300309361'
  },
  {
    id: 'sewage-cleanup',
    title: 'Sewage & Sanitization',
    shortDescription: 'Emergency sewage cleanup with complete sanitization.',
    fullDescription: 'Category 3 water damage cleanup including sewage overflow, toilet backups, and contaminated water. Full sanitization and decontamination to ensure safe, healthy environment.',
    image: '/images/services/sewage-sanitisation.webp',
    icon: Biohazard,
    urgency: 'critical',
    responseTime: '30 minutes',
    averageCost: '$2,000 - $8,000',
    features: ['Sewage extraction', 'Complete sanitization', 'Decontamination', 'Odor elimination'],
    certifications: ['IICRC ASD Certified', 'Biohazard Certified'],
    healthRisks: ['Bacterial infections', 'Viral contamination', 'Parasites', 'Toxic gases'],
    processSteps: ['Safety setup', 'Extraction', 'Sanitization', 'Decontamination', 'Air treatment', 'Restoration'],
    category: 'biohazard',
    phoneNumber: '1300309361'
  },
  {
    id: 'commercial-restoration',
    title: 'Commercial Restoration',
    shortDescription: 'Business continuity focused commercial disaster recovery.',
    fullDescription: 'specialised commercial restoration services designed to minimise business downtime. From offices to warehouses, we understand the critical nature of getting your business operational quickly.',
    image: '/images/services/commercial-residential.png',
    icon: Building2,
    urgency: 'urgent',
    responseTime: '45 minutes',
    averageCost: '$5,000 - $50,000',
    features: ['24/7 emergency response', 'Business continuity planning', 'Minimal disruption', 'Insurance coordination'],
    certifications: ['IICRC Commercial Certified', 'Large Loss Specialist'],
    healthRisks: ['Business interruption', 'Revenue loss', 'Employee safety', 'Regulatory compliance'],
    processSteps: ['Emergency response', 'Damage assessment', 'Mitigation', 'Restoration planning', 'Execution', 'Completion'],
    category: 'commercial',
    phoneNumber: '1300309361'
  },
  {
    id: 'crime-scene',
    title: 'Crime Scene Remediation',
    shortDescription: 'Discreet and professional trauma scene cleanup.',
    fullDescription: 'Compassionate and professional trauma scene cleanup including crime scenes, accidents, and unattended deaths. We handle these sensitive situations with respect, discretion, and complete safety protocols.',
    image: '/images/services/crime-scene-remediation.webp',
    icon: Shield,
    urgency: 'high',
    responseTime: '60 minutes',
    averageCost: '$3,000 - $12,000',
    features: ['24/7 availability', 'Discrete service', 'Complete decontamination', 'Emotional support'],
    certifications: ['Trauma Certified', 'OSHA Compliant'],
    healthRisks: ['Bloodborne pathogens', 'Emotional trauma', 'Biohazard exposure', 'Cross-contamination'],
    processSteps: ['Assessment', 'Safety protocols', 'Decontamination', 'Sanitization', 'Restoration', 'Certification'],
    category: 'crime',
    phoneNumber: '1300309361'
  }
];

const urgencyColors = {
  critical: 'bg-red-600 text-white',
  urgent: 'bg-orange-500 text-white',
  high: 'bg-yellow-500 text-black',
  normal: 'bg-green-500 text-white'
};

const urgencyLabels = {
  critical: 'CRITICAL - Call Now',
  urgent: 'URGENT Response',
  high: 'High Priority',
  normal: 'Standard Service'
};

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-centre mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Complete Disaster Recovery Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-8"
          >
            Professional disaster recovery services across Brisbane, Ipswich, and Logan.
            IICRC certified technicians, state-of-the-art equipment, insurance approved.
          </motion.p>

          {/* Emergency Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-red-600 text-white rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-centre justify-centre gap-3 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xl font-bold">Emergency? Call Now!</span>
            </div>
            <a
              href="tel:1300309361"
              className="text-3xl font-black hover:text-red-200 transition-colors"
            >
              1300 309 361
            </a>
            <p className="text-red-100 text-sm mt-2">24/7 Emergency Response Available</p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full cursor-pointer">
                {/* Service Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Professional disaster recovery service`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Urgency Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${urgencyColors[service.urgency]} font-bold px-3 py-1`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {urgencyLabels[service.urgency]}
                    </Badge>
                  </div>

                  {/* Response Time */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900 font-semibold">
                      {service.responseTime}
                    </Badge>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                  {/* Call Button Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredService === service.id ? 1 : 0,
                      scale: hoveredService === service.id ? 1 : 0.8
                    }}
                    className="absolute inset-0 flex items-centre justify-centre"
                  >
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-2xl"
                      onClick={() => window.location.href = `tel:${service.phoneNumber}`}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>
                  </motion.div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <service.icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div className="text-right text-sm text-gray-600">
                      <div className="font-semibold text-green-600">{service.averageCost}</div>
                      <div>Typical cost</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-centre gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <Shield className="w-2 h-2 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                      onClick={() => window.location.href = `tel:${service.phoneNumber}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Call
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedService(service)}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-centre justify-centre p-4"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      className="object-cover rounded-t-2xl"
                      sizes="80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-2">{selectedService.title}</h3>
                      <p className="text-lg text-gray-200">{selectedService.fullDescription}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Service Details */}
                      <div>
                        <div className="mb-6">
                          <h4 className="font-bold text-lg text-gray-900 mb-3">Service Features</h4>
                          <ul className="space-y-2">
                            {selectedService.features.map((feature, idx) => (
                              <li key={idx} className="flex items-centre gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-bold text-lg text-gray-900 mb-3">Process Steps</h4>
                          <ol className="space-y-2">
                            {selectedService.processSteps.map((step, idx) => (
                              <li key={idx} className="flex items-centre gap-3">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-centre justify-centre text-sm font-bold">
                                  {idx + 1}
                                </div>
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Health Risks & Certifications */}
                      <div>
                        <div className="mb-6">
                          <h4 className="font-bold text-lg text-gray-900 mb-3">Health Risks</h4>
                          <ul className="space-y-2">
                            {selectedService.healthRisks.map((risk, idx) => (
                              <li key={idx} className="flex items-centre gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span className="text-gray-700">{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-bold text-lg text-gray-900 mb-3">Certifications</h4>
                          <div className="space-y-3">
                            {selectedService.certifications.map((cert, idx) => (
                              <div key={idx} className="flex items-centre gap-3">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span className="text-gray-700">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="text-centre">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {selectedService.averageCost}
                            </div>
                            <div className="text-sm text-gray-600 mb-3">Typical project cost</div>
                            <div className="text-lg font-semibold text-blue-600 mb-4">
                              {selectedService.responseTime} response time
                            </div>
                            <Button
                              size="lg"
                              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                              onClick={() => window.location.href = `tel:${selectedService.phoneNumber}`}
                            >
                              <Phone className="w-5 h-5 mr-2" />
                              Call {selectedService.phoneNumber}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200"
                  >
                    <ArrowRight className="w-6 h-6 rotate-45" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-centre bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Emergency Disaster Recovery</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Don't wait for disasters to worsen. Our certified technicians are standing by 24/7
            with professional equipment and rapid response times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-centre">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-bold"
              onClick={() => window.location.href = 'tel:1300309361'}
            >
              <Phone className="w-6 h-6 mr-3" />
              1300 309 361
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-xl font-semibold"
              onClick={() => window.location.href = '/quote'}
            >
              Get Free Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}