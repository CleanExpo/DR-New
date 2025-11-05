'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  CheckCircle, ArrowRight, Clock, Shield, AlertTriangle,
  Search, ClipboardCheck, Wrench, Sparkles, FileCheck,
  Phone, Users, Award, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  details: string;
  duration: string;
  image: string;
  icon: React.ElementType;
  keyActions: string[];
  equipment: string[];
  qualityChecks: string[];
}

interface ProcessCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  steps: ProcessStep[];
  totalDuration: string;
  priority: 'critical' | 'urgent' | 'high';
}

const processCategories: ProcessCategory[] = [
  {
    id: 'assessment',
    title: 'Initial Assessment',
    description: 'Comprehensive damage evaluation and safety assessment',
    icon: Search,
    totalDuration: '1-2 hours',
    priority: 'critical',
    steps: [
      {
        id: 'initial-assessment',
        step: 1,
        title: 'Professional Assessment',
        description: 'Comprehensive damage evaluation using thermal imaging and moisture detection',
        details: 'Our certified technicians conduct thorough property assessment to identify all affected areas, hidden moisture, and potential safety hazards. This critical first step determines the scope and approach for restoration.',
        duration: '30-60 minutes',
        image: '/images/optimised/process/3D Hazardous Cleaning.png',
        icon: Search,
        keyActions: ['Visual inspection', 'Thermal imaging scan', 'Moisture mapping', 'Safety evaluation'],
        equipment: ['Thermal cameras', 'Moisture meters', 'Documentation tools', 'Safety equipment'],
        qualityChecks: ['Complete area coverage', 'Accurate measurements', 'Safety protocols', 'Documentation complete']
      }
    ]
  },
  {
    id: 'drying',
    title: 'Structural Drying',
    description: 'Advanced drying techniques to prevent secondary damage',
    icon: TrendingUp,
    totalDuration: '3-5 days',
    priority: 'critical',
    steps: [
      {
        id: 'drying-setup',
        step: 2,
        title: 'Professional Drying Setup',
        description: 'Strategic placement of industrial dehumidifiers and air movers for optimal drying',
        details: 'Using psychrometric calculations and industry best practices, we create optimal drying conditions. Equipment is strategically placed to maximise air circulation and moisture removal while monitoring progress continuously.',
        duration: '2-4 hours setup',
        image: '/images/optimised/process/3D Emergency Squalor Cleanup.png',
        icon: TrendingUp,
        keyActions: ['Equipment placement', 'Airflow optimisation', 'Moisture monitoring', 'Progress tracking'],
        equipment: ['Industrial dehumidifiers', 'Air movers', 'Monitoring devices', 'Psychrometric tools'],
        qualityChecks: ['Optimal equipment placement', 'Proper air circulation', 'Baseline measurements', 'Safety compliance']
      }
    ]
  },
  {
    id: 'remediation',
    title: 'Remediation Process',
    description: 'Safe removal and treatment of contaminated materials',
    icon: Shield,
    totalDuration: '2-7 days',
    priority: 'urgent',
    steps: [
      {
        id: 'remediation-process',
        step: 3,
        title: 'Professional Remediation',
        description: 'Safe removal of damaged materials and contamination treatment',
        details: 'Following IICRC standards, we safely remove damaged materials, treat affected surfaces, and apply antimicrobial solutions. All work is performed under proper containment to prevent cross-contamination.',
        duration: '1-5 days',
        image: '/images/optimised/process/3D Hazardous Cleaning.png',
        icon: Shield,
        keyActions: ['Containment setup', 'Material removal', 'Surface treatment', 'Antimicrobial application'],
        equipment: ['Containment barriers', 'HEPA filtration', 'Removal tools', 'Treatment solutions'],
        qualityChecks: ['Proper containment', 'Complete removal', 'Treatment effectiveness', 'Air quality testing']
      }
    ]
  },
  {
    id: 'restoration',
    title: 'Complete Restoration',
    description: 'Full restoration to pre-loss condition',
    icon: Sparkles,
    totalDuration: '1-4 weeks',
    priority: 'high',
    steps: [
      {
        id: 'restoration-complete',
        step: 4,
        title: 'Complete Restoration',
        description: 'Full property restoration returning it to pre-loss condition',
        details: 'The final phase involves complete restoration including reconstruction, painting, flooring installation, and final cleaning. We ensure your property is returned to its original condition or better.',
        duration: '1-4 weeks',
        image: '/images/optimised/process/3D Emergency Squalor Cleanup.png',
        icon: Sparkles,
        keyActions: ['Reconstruction', 'Finishing work', 'Final cleaning', 'Quality inspection'],
        equipment: ['Construction tools', 'Finishing materials', 'Quality meters', 'Inspection equipment'],
        qualityChecks: ['Construction quality', 'Finish standards', 'Cleanliness', 'Customer approval']
      }
    ]
  },
  {
    id: 'hazardous',
    title: 'Hazardous Cleaning',
    description: 'specialised biohazard and contamination cleanup',
    icon: AlertTriangle,
    totalDuration: '1-3 days',
    priority: 'critical',
    steps: [
      {
        id: 'hazardous-cleaning',
        step: 1,
        title: 'Hazardous Material Cleanup',
        description: 'Safe handling and disposal of biohazardous materials with full safety protocols',
        details: 'specialised cleanup of biohazardous materials including bodily fluids, chemicals, and contaminated materials. Our technicians use full PPE and follow strict safety protocols for worker and occupant safety.',
        duration: '4-24 hours',
        image: '/images/optimised/process/3D Hazardous Cleaning.png',
        icon: AlertTriangle,
        keyActions: ['Safety protocols', 'Material removal', 'Decontamination', 'Proper disposal'],
        equipment: ['Full PPE', 'specialised tools', 'Decontamination solutions', 'Disposal containers'],
        qualityChecks: ['Safety compliance', 'Complete removal', 'Decontamination verification', 'Proper disposal']
      }
    ]
  },
  {
    id: 'emergency',
    title: 'Emergency Cleanup',
    description: 'Rapid response emergency cleanup services',
    icon: Clock,
    totalDuration: '4-12 hours',
    priority: 'critical',
    steps: [
      {
        id: 'emergency-cleanup',
        step: 1,
        title: 'Emergency Squalor Cleanup',
        description: 'Rapid emergency cleanup for urgent situations requiring immediate response',
        details: 'Emergency situations require immediate response to prevent further damage and health risks. Our rapid response team is equipped to handle urgent cleanup scenarios with speed and efficiency while maintaining safety standards.',
        duration: '4-12 hours',
        image: '/images/optimised/process/3D Emergency Squalor Cleanup.png',
        icon: Clock,
        keyActions: ['Rapid response', 'Emergency stabilization', 'Immediate cleanup', 'Safety securing'],
        equipment: ['Emergency vehicles', 'Rapid-deploy equipment', 'Safety gear', 'Communication tools'],
        qualityChecks: ['Response time', 'Safety measures', 'Immediate stabilization', 'Documentation']
      }
    ]
  }
];

const priorityColors = {
  critical: 'bg-red-600 text-white',
  urgent: 'bg-orange-500 text-white',
  high: 'bg-yellow-500 text-black'
};

export default function ProcessShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('assessment');
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);

  const currentCategory = processCategories.find(cat => cat.id === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-centre mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Professional Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-8"
          >
            IICRC certified processes ensuring quality, safety, and efficiency.
            Every step documented and verified for insurance and customer confidence.
          </motion.p>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-centre gap-6 text-sm font-medium text-gray-600"
          >
            <div className="flex items-centre gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>IICRC Certified</span>
            </div>
            <div className="flex items-centre gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Insurance Approved</span>
            </div>
            <div className="flex items-centre gap-2">
              <FileCheck className="w-5 h-5 text-purple-600" />
              <span>Fully Documented</span>
            </div>
            <div className="flex items-centre gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span>Trained Technicians</span>
            </div>
          </motion.div>
        </div>

        {/* Process Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 h-auto p-2">
              {processCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-centre gap-2 py-4 px-3 text-centre data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <category.icon className="w-5 h-5" />
                  <span className="text-xs font-medium leading-tight">{category.title}</span>
                  <Badge className={`text-xs ${priorityColors[category.priority]} px-2 py-0.5`}>
                    {category.priority}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Process Content */}
          <AnimatePresence mode="wait">
            {currentCategory && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value={selectedCategory} className="mt-0">
                  {/* Category Header */}
                  <div className="text-centre mb-12">
                    <div className="flex items-centre justify-centre gap-3 mb-4">
                      <currentCategory.icon className="w-8 h-8 text-blue-600" />
                      <h3 className="text-3xl font-bold text-gray-900">{currentCategory.title}</h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-4">{currentCategory.description}</p>
                    <div className="flex items-centre justify-centre gap-6 text-sm">
                      <div className="flex items-centre gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Duration: {currentCategory.totalDuration}</span>
                      </div>
                      <Badge className={`${priorityColors[currentCategory.priority]} font-semibold`}>
                        {currentCategory.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {currentCategory.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                          {/* Step Image */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={step.image}
                              alt={`${step.title} - Professional disaster recovery process step`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                            {/* Step Number */}
                            <div className="absolute top-4 left-4">
                              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-centre justify-centre text-xl font-bold">
                                {step.step}
                              </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute top-4 right-4">
                              <Badge variant="secondary" className="bg-white/90 text-gray-900 font-semibold">
                                <Clock className="w-3 h-3 mr-1" />
                                {step.duration}
                              </Badge>
                            </div>

                            {/* Title Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                              <p className="text-gray-200 text-sm">{step.description}</p>
                            </div>
                          </div>

                          <CardContent className="p-6">
                            {/* Detailed Description */}
                            <p className="text-gray-700 mb-6 leading-relaxed">{step.details}</p>

                            {/* Key Actions */}
                            <div className="mb-6">
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-centre gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Key Actions
                              </h5>
                              <ul className="space-y-2">
                                {step.keyActions.map((action, idx) => (
                                  <li key={idx} className="flex items-centre gap-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Equipment Used */}
                            <div className="mb-6">
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-centre gap-2">
                                <Wrench className="w-4 h-4 text-blue-600" />
                                Equipment Used
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {step.equipment.map((item, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Quality Checks */}
                            <div className="mb-6">
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-centre gap-2">
                                <FileCheck className="w-4 h-4 text-green-600" />
                                Quality Checks
                              </h5>
                              <ul className="space-y-1">
                                {step.qualityChecks.map((check, idx) => (
                                  <li key={idx} className="flex items-centre gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {check}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Button */}
                            <Button
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                              onClick={() => setSelectedStep(step)}
                            >
                              View Process Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>

        {/* Step Detail Modal */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-centre justify-centre p-4"
              onClick={() => setSelectedStep(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={selectedStep.image}
                      alt={selectedStep.title}
                      fill
                      className="object-cover rounded-t-2xl"
                      sizes="80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-centre gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-centre justify-centre text-xl font-bold">
                          {selectedStep.step}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold">{selectedStep.title}</h3>
                          <p className="text-gray-200">{selectedStep.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">{selectedStep.details}</p>

                    <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Key Actions</h4>
                        <ul className="space-y-3">
                          {selectedStep.keyActions.map((action, idx) => (
                            <li key={idx} className="flex items-centre gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Equipment</h4>
                        <div className="space-y-2">
                          {selectedStep.equipment.map((item, idx) => (
                            <div key={idx} className="flex items-centre gap-3">
                              <Wrench className="w-4 h-4 text-blue-600" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Quality Checks</h4>
                        <ul className="space-y-2">
                          {selectedStep.qualityChecks.map((check, idx) => (
                            <li key={idx} className="flex items-centre gap-3">
                              <FileCheck className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700 text-sm">{check}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 text-centre">
                      <Button
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4"
                        onClick={() => window.location.href = 'tel:1300309361'}
                      >
                        <Phone className="w-5 h-5 mr-3" />
                        Start This Process Now - 1300 309 361
                      </Button>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStep(null)}
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
          className="text-centre mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Professional Process, Guaranteed Results</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Every step documented, every process certified. Our IICRC trained technicians
              follow proven procedures for consistent, reliable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-bold"
                onClick={() => window.location.href = 'tel:1300309361'}
              >
                <Phone className="w-6 h-6 mr-3" />
                Start Process Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-xl font-semibold"
                onClick={() => window.location.href = '/quote'}
              >
                Get Process Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}