'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Search, Wrench, Droplets, Wind, Sparkles } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  duration: string;
}

const RESTORATION_PROCESS: ProcessStep[] = [
  {
    id: 'inspection',
    title: 'Emergency Inspection',
    description: 'Comprehensive assessment of damage extent and safety hazards',
    details: [
      'Visual inspection of all affected areas',
      'Moisture detection using thermal imaging',
      'Structural safety assessment',
      'Documentation for insurance claims',
    ],
    icon: <Search className="w-8 h-8" />,
    duration: '30-60 min',
  },
  {
    id: 'mitigation',
    title: 'Damage Mitigation',
    description: 'Immediate action to prevent further damage',
    details: [
      'Water extraction and removal',
      'Emergency board-up if required',
      'Temporary weatherproofing',
      'Content protection and removal',
    ],
    icon: <ClipboardCheck className="w-8 h-8" />,
    duration: '2-4 hours',
  },
  {
    id: 'water-removal',
    title: 'Water Extraction',
    description: 'Professional extraction of standing water',
    details: [
      'High-powered extraction equipment',
      'Complete water removal',
      'Carpet and flooring treatment',
      'Sub-floor water extraction',
    ],
    icon: <Droplets className="w-8 h-8" />,
    duration: '4-8 hours',
  },
  {
    id: 'drying',
    title: 'Structural Drying',
    description: 'Advanced drying techniques to restore moisture levels',
    details: [
      'Industrial dehumidifiers installed',
      'Air movers for circulation',
      'Daily moisture monitoring',
      'Temperature control systems',
    ],
    icon: <Wind className="w-8 h-8" />,
    duration: '3-7 days',
  },
  {
    id: 'cleaning',
    title: 'Cleaning & Sanitization',
    description: 'Professional cleaning and antimicrobial treatment',
    details: [
      'Anti-microbial treatment',
      'Odor removal and deodorization',
      'HEPA filtration',
      'Content cleaning and restoration',
    ],
    icon: <Sparkles className="w-8 h-8" />,
    duration: '1-2 days',
  },
  {
    id: 'restoration',
    title: 'Final Restoration',
    description: 'Complete restoration to pre-damage condition',
    details: [
      'Repairs to walls, floors, ceilings',
      'Painting and finishing',
      'Final inspection',
      'Quality assurance check',
    ],
    icon: <Wrench className="w-8 h-8" />,
    duration: '3-14 days',
  },
];

export function ProcessAnimator({ className = '' }: { className?: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playAnimation();
    }
  };

  const playAnimation = () => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= RESTORATION_PROCESS.length) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      setActiveStep(currentIndex);
    }, 2000);
  };

  const currentStep = RESTORATION_PROCESS[activeStep];
  if (!currentStep) {
    return null;
  }
  const progress = ((activeStep + 1) / RESTORATION_PROCESS.length) * 100;

  return (
    <div className={`bg-white rounded-xl shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Restoration Process</h2>
            <p className="text-primary-100">
              Step-by-step professional restoration
            </p>
          </div>
          <button
            onClick={handlePlayPause}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg transition-colors font-semibold"
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? 'Pause' : 'Play Tour'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-primary-800/30 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="flex overflow-x-auto scrollbar-hide">
          {RESTORATION_PROCESS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-semibold transition-colors relative ${
                activeStep === index
                  ? 'text-primary-600 bg-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              aria-current={activeStep === index ? 'step' : undefined}
            >
              <div className="flex items-center gap-2">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  activeStep === index
                    ? 'bg-primary-600 text-white'
                    : activeStep > index
                    ? 'bg-success-600 text-white'
                    : 'bg-neutral-300 text-neutral-600'
                }`}>
                  {activeStep > index ? '✓' : index + 1}
                </span>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
              {activeStep === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600"
                  layoutId="activeStepIndicator"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step Header */}
            <div className="flex items-start gap-6 mb-6">
              <motion.div
                className="flex-shrink-0 w-20 h-20 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {currentStep.icon}
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {currentStep.title}
                  </h3>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {currentStep.duration}
                  </span>
                </div>
                <p className="text-lg text-neutral-600">
                  {currentStep.description}
                </p>
              </div>
            </div>

            {/* Step Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStep.details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg
                    className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-neutral-700">{detail}</span>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-6 py-3 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous Step
              </button>

              <div className="text-sm text-neutral-600">
                Step {activeStep + 1} of {RESTORATION_PROCESS.length}
              </div>

              <button
                onClick={() =>
                  setActiveStep(
                    Math.min(RESTORATION_PROCESS.length - 1, activeStep + 1)
                  )
                }
                disabled={activeStep === RESTORATION_PROCESS.length - 1}
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <div className="bg-neutral-50 px-8 py-6 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              Need emergency restoration services?
            </p>
            <p className="text-sm text-neutral-600">
              Our IICRC Master Restorer team is ready 24/7
            </p>
          </div>
          <a
            href="tel:1300309361"
            className="w-full sm:w-auto bg-emergency-600 hover:bg-emergency-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg text-center"
          >
            Call 1300 309 361
          </a>
        </div>
      </div>
    </div>
  );
}
