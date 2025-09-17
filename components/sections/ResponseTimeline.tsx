'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineStep {
  id: number;
  time: string;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'current' | 'upcoming';
  details?: string[];
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    time: '0 min',
    title: 'Emergency Call Received',
    description: 'Your call is answered immediately by our 24/7 emergency response team',
    icon: '📞',
    status: 'completed',
    details: [
      'Incident details recorded',
      'Severity assessment completed',
      'Team dispatch initiated'
    ]
  },
  {
    id: 2,
    time: '5 min',
    title: 'Response Team Dispatched',
    description: 'Nearest available team is immediately dispatched to your location',
    icon: '🚨',
    status: 'completed',
    details: [
      'GPS tracking activated',
      'Equipment loaded',
      'ETA confirmed'
    ]
  },
  {
    id: 3,
    time: '10 min',
    title: 'Customer Contact',
    description: 'Team leader calls to confirm details and provide safety instructions',
    icon: '💬',
    status: 'current',
    details: [
      'Safety instructions provided',
      'Access arrangements confirmed',
      'Initial assessment questions'
    ]
  },
  {
    id: 4,
    time: '45-60 min',
    title: 'On-Site Arrival',
    description: 'Team arrives with all necessary equipment to begin immediate response',
    icon: '🏠',
    status: 'upcoming',
    details: [
      'Site safety assessment',
      'Equipment setup',
      'Damage documentation begins'
    ]
  },
  {
    id: 5,
    time: '90 min',
    title: 'Emergency Mitigation',
    description: 'Immediate actions taken to prevent further damage',
    icon: '🛠️',
    status: 'upcoming',
    details: [
      'Water extraction started',
      'Temporary repairs in place',
      'Valuable items protected'
    ]
  },
  {
    id: 6,
    time: '2-3 hours',
    title: 'Full Assessment',
    description: 'Complete damage assessment and restoration plan created',
    icon: '📋',
    status: 'upcoming',
    details: [
      'Detailed documentation',
      'Insurance report prepared',
      'Restoration timeline provided'
    ]
  }
];

export default function ResponseTimeline() {
  const [currentStep, setCurrentStep] = useState(2);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isInView]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(0);
    let step = 0;

    const simulationInterval = setInterval(() => {
      step++;
      setCurrentStep(step);

      if (step >= timelineSteps.length - 1) {
        clearInterval(simulationInterval);
        setIsSimulating(false);
      }
    }, 2000);
  };

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-full text-sm mb-4">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            EMERGENCY RESPONSE PROCESS
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Every Second Counts
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our streamlined emergency response process ensures the fastest possible arrival and immediate damage mitigation
          </p>
        </motion.div>

        {/* Live Timer Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="text-sm opacity-90">Average Response Time</div>
              <div className="text-3xl font-bold font-mono">{formatElapsedTime(elapsedTime)}</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 to-cyan-600"
              initial={{ height: '0%' }}
              animate={{ height: `${(currentStep / (timelineSteps.length - 1)) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-12 relative">
            {timelineSteps.map((step, index) => {
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:gap-8`}
                >
                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div
                      className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${
                        isCurrent
                          ? 'border-blue-500 shadow-blue-500/20'
                          : isCompleted
                          ? 'border-green-500 shadow-green-500/20'
                          : 'border-gray-200'
                      } relative overflow-hidden`}
                    >
                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 ${
                          index % 2 === 0 ? 'right-4' : 'left-4'
                        }`}
                      >
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            isCurrent
                              ? 'bg-blue-100 text-blue-700'
                              : isCompleted
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {isCurrent ? 'IN PROGRESS' : isCompleted ? 'COMPLETED' : 'UPCOMING'}
                        </span>
                      </div>

                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl">{step.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </div>

                      {step.details && isCurrent && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
                                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Time Badge */}
                      <div className="mt-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Circle */}
                  <div className="relative flex-shrink-0 my-4 lg:my-0">
                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                        isCurrent
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600'
                          : isCompleted
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                          : 'bg-gray-300'
                      }`}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isCompleted ? (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-white font-bold">{step.id}</span>
                      )}
                    </motion.div>

                    {/* Pulse Animation for Current Step */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-600 opacity-30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Simulation Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={startSimulation}
            disabled={isSimulating}
            className={`px-8 py-4 rounded-xl font-bold text-white shadow-2xl transition-all ${
              isSimulating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-blue-500/25'
            }`}
            whileHover={!isSimulating ? { scale: 1.05 } : {}}
            whileTap={!isSimulating ? { scale: 0.95 } : {}}
          >
            {isSimulating ? 'Simulation in Progress...' : 'Simulate Emergency Response'}
          </motion.button>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-4">Emergency? We're Ready Now</h3>
          <p className="text-xl mb-6 text-white/90">
            Our teams are standing by 24/7 to respond to your emergency
          </p>
          <motion.a
            href="tel:1300309361"
            className="inline-flex items-center gap-3 bg-white text-red-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call 1300 309 361 Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}