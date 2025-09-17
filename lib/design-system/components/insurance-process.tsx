'use client'

import React, { useState } from 'react'
import {
  FileText, Camera, Phone, CheckCircle, Clock, DollarSign,
  Shield, AlertTriangle, ChevronRight, Download, ArrowRight
} from 'lucide-react'
import { designTokens } from '../core/tokens'

interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
  icon: React.ReactNode
  duration: string
  status?: 'completed' | 'current' | 'upcoming'
  tips?: string[]
  documents?: string[]
}

interface InsuranceProcessProps {
  variant?: 'timeline' | 'cards' | 'interactive'
  showTips?: boolean
  showDocuments?: boolean
  currentStep?: number
  phoneNumber?: string
  className?: string
}

/**
 * Insurance Claim Process Visualization Component
 * Clear, step-by-step guide for insurance claims with Brisbane insurers
 * Designed to reduce anxiety and build trust during stressful situations
 */
export const InsuranceProcess: React.FC<InsuranceProcessProps> = ({
  variant = 'timeline',
  showTips = true,
  showDocuments = true,
  currentStep = 0,
  phoneNumber = '1300 309 361',
  className = ''
}) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(currentStep)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const processSteps: ProcessStep[] = [
    {
      id: 'emergency',
      number: 1,
      title: 'Emergency Response',
      description: 'Call us immediately for 24/7 emergency assistance. We arrive within 1 hour to assess and start mitigation.',
      icon: <Phone className="w-6 h-6" />,
      duration: '0-1 hour',
      tips: [
        'Document initial damage with photos/videos',
        'Turn off water/electricity if safe',
        'Move valuables to safe area',
        'Keep all damaged items for assessment'
      ],
      documents: []
    },
    {
      id: 'assessment',
      number: 2,
      title: 'Damage Assessment',
      description: 'Our IICRC certified technicians conduct comprehensive damage assessment and moisture mapping.',
      icon: <FileText className="w-6 h-6" />,
      duration: '1-2 hours',
      tips: [
        'Point out all affected areas',
        'Mention pre-existing conditions',
        'Ask about the restoration timeline',
        'Request detailed scope of work'
      ],
      documents: ['Assessment Report', 'Moisture Map', 'Photo Documentation']
    },
    {
      id: 'insurance',
      number: 3,
      title: 'Insurance Coordination',
      description: 'We contact your insurer directly, submit all documentation, and manage the entire claims process.',
      icon: <Shield className="w-6 h-6" />,
      duration: '24-48 hours',
      tips: [
        'Provide policy number and insurer details',
        'We handle direct billing with insurers',
        'No upfront payment required for covered claims',
        'We negotiate on your behalf'
      ],
      documents: ['Insurance Claim Form', 'Scope of Work', 'Cost Estimate']
    },
    {
      id: 'approval',
      number: 4,
      title: 'Claim Approval',
      description: 'Insurer reviews and approves claim. We work with adjusters to ensure maximum coverage.',
      icon: <CheckCircle className="w-6 h-6" />,
      duration: '2-5 days',
      tips: [
        'We handle all adjuster meetings',
        'Additional documentation provided as needed',
        'We appeal any denied items',
        'Keep you updated throughout'
      ],
      documents: ['Approval Letter', 'Authorized Scope']
    },
    {
      id: 'restoration',
      number: 5,
      title: 'Full Restoration',
      description: 'Complete restoration work begins including water extraction, drying, cleaning, and repairs.',
      icon: <Clock className="w-6 h-6" />,
      duration: '3-14 days',
      tips: [
        'Daily progress updates provided',
        'Minimal disruption to your routine',
        'All work guaranteed',
        'Contents cleaned and restored'
      ],
      documents: ['Daily Reports', 'Progress Photos', 'Completion Certificate']
    },
    {
      id: 'completion',
      number: 6,
      title: 'Final Settlement',
      description: 'Work completed, final documentation submitted, and insurance payment processed directly.',
      icon: <DollarSign className="w-6 h-6" />,
      duration: '1-2 weeks',
      tips: [
        'Final walkthrough and sign-off',
        'Warranty documentation provided',
        'Direct settlement with insurer',
        'No out-of-pocket expenses for covered items'
      ],
      documents: ['Completion Report', 'Warranty Certificate', 'Final Invoice']
    }
  ]

  const getStepStatus = (index: number): ProcessStep['status'] => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'current'
    return 'upcoming'
  }

  if (variant === 'interactive') {
    return (
      <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Insurance Claim Process</h2>
          <p className="text-blue-100">
            We handle everything - from emergency response to final settlement
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="p-6">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gray-200">
              <div
                className="absolute top-0 left-0 w-full bg-blue-600 transition-all duration-500"
                style={{ height: `${(currentStep / (processSteps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {processSteps.map((step, index) => {
                const status = getStepStatus(index)
                const isSelected = selectedStep === index

                return (
                  <div
                    key={step.id}
                    className="relative flex gap-4 group"
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Step Number */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        status === 'completed'
                          ? 'bg-green-600 text-white'
                          : status === 'current'
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200 animate-pulse'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                      onClick={() => setSelectedStep(isSelected ? null : index)}
                    >
                      {status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <button
                        className="text-left w-full group"
                        onClick={() => setSelectedStep(isSelected ? null : index)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-semibold text-lg ${
                              status === 'current' ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              Step {step.number}: {step.title}
                            </h3>
                            <p className="text-gray-600 mt-1">{step.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Duration: {step.duration}
                            </p>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              isSelected ? 'rotate-90' : ''
                            } group-hover:text-blue-600`}
                          />
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {isSelected && (
                        <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
                          {/* Tips */}
                          {showTips && step.tips && step.tips.length > 0 && (
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Important Tips
                              </h4>
                              <ul className="space-y-1">
                                {step.tips.map((tip, i) => (
                                  <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                                    <span className="text-blue-600 mt-0.5">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Documents */}
                          {showDocuments && step.documents && step.documents.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Documents We Provide
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {step.documents.map((doc, i) => (
                                  <div
                                    key={i}
                                    className="text-sm text-gray-700 flex items-center gap-2 bg-white px-3 py-2 rounded"
                                  >
                                    <Download className="w-3 h-3 text-gray-400" />
                                    {doc}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Need help with your insurance claim?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  We work directly with all major insurers
                </p>
              </div>
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => {
            const status = getStepStatus(index)

            return (
              <div
                key={step.id}
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                  status === 'current' ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {/* Status Badge */}
                {status === 'completed' && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Completed
                  </div>
                )}
                {status === 'current' && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold animate-pulse">
                    Current Step
                  </div>
                )}

                <div className="p-6">
                  {/* Icon & Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : status === 'current'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Step {step.number}</p>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {step.duration}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Timeline variant (default)
  return (
    <div className={`${className}`}>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-200" />

        {/* Timeline Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => {
            const status = getStepStatus(index)
            const isLeft = index % 2 === 0

            return (
              <div
                key={step.id}
                className={`relative flex items-center ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : status === 'current'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{step.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-white ${
                  status === 'completed'
                    ? 'bg-green-600'
                    : status === 'current'
                    ? 'bg-blue-600 animate-pulse'
                    : 'bg-gray-400'
                }`} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}