'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Home, Droplets, AlertCircle } from 'lucide-react';

interface PricingOption {
  id: string;
  label: string;
  value: string;
}

const SERVICE_TYPES: PricingOption[] = [
  { id: 'water', label: 'Water Damage Restoration', value: 'water' },
  { id: 'fire', label: 'Fire Damage Restoration', value: 'fire' },
  { id: 'mould', label: 'Mould Remediation', value: 'mould' },
  { id: 'storm', label: 'Storm Damage Repair', value: 'storm' },
];

const PROPERTY_SIZES: PricingOption[] = [
  { id: 'small', label: 'Small (< 100m²)', value: 'small' },
  { id: 'medium', label: 'Medium (100-200m²)', value: 'medium' },
  { id: 'large', label: 'Large (200-400m²)', value: 'large' },
  { id: 'xlarge', label: 'Very Large (> 400m²)', value: 'xlarge' },
];

const DAMAGE_LEVELS: PricingOption[] = [
  { id: 'minor', label: 'Minor - Localized damage', value: 'minor' },
  { id: 'moderate', label: 'Moderate - Multiple areas', value: 'moderate' },
  { id: 'severe', label: 'Severe - Extensive damage', value: 'severe' },
  { id: 'catastrophic', label: 'Catastrophic - Whole property', value: 'catastrophic' },
];

const URGENCY_LEVELS: PricingOption[] = [
  { id: 'standard', label: 'Standard (within 24 hours)', value: 'standard' },
  { id: 'urgent', label: 'Urgent (within 4 hours)', value: 'urgent' },
  { id: 'emergency', label: 'Emergency (immediate)', value: 'emergency' },
];

interface PriceEstimate {
  min: number;
  max: number;
  urgencyMultiplier: number;
}

function calculateEstimate(
  serviceType: string,
  propertySize: string,
  damageLevel: string,
  urgency: string
): PriceEstimate {
  // Base prices by service type
  const baseRates: Record<string, number> = {
    water: 150,
    fire: 200,
    mould: 120,
    storm: 180,
  };

  // Size multipliers
  const sizeMultipliers: Record<string, number> = {
    small: 1,
    medium: 1.8,
    large: 3.2,
    xlarge: 5,
  };

  // Damage level multipliers
  const damageMultipliers: Record<string, { min: number; max: number }> = {
    minor: { min: 1, max: 2 },
    moderate: { min: 2, max: 4 },
    severe: { min: 4, max: 8 },
    catastrophic: { min: 8, max: 15 },
  };

  // Urgency multipliers
  const urgencyMultipliers: Record<string, number> = {
    standard: 1,
    urgent: 1.3,
    emergency: 1.5,
  };

  const base = baseRates[serviceType] || 150;
  const sizeMultiplier = sizeMultipliers[propertySize] || 1;
  const damageRange = damageMultipliers[damageLevel] || { min: 1, max: 2 };
  const urgencyMultiplier = urgencyMultipliers[urgency] || 1;

  const min = Math.round(base * sizeMultiplier * damageRange.min * urgencyMultiplier / 100) * 100;
  const max = Math.round(base * sizeMultiplier * damageRange.max * urgencyMultiplier / 100) * 100;

  return { min, max, urgencyMultiplier };
}

export function PricingCalculator({ className = '' }: { className?: string }) {
  const [serviceType, setServiceType] = useState('water');
  const [propertySize, setPropertySize] = useState('medium');
  const [damageLevel, setDamageLevel] = useState('moderate');
  const [urgency, setUrgency] = useState('standard');
  const [hasInsurance, setHasInsurance] = useState(true);

  const estimate = useMemo(
    () => calculateEstimate(serviceType, propertySize, damageLevel, urgency),
    [serviceType, propertySize, damageLevel, urgency]
  );

  return (
    <div className={`bg-white rounded-xl shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <DollarSign className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Instant Quote Estimator</h2>
        </div>
        <p className="text-primary-100">
          Get an estimated cost range for your restoration project
        </p>
      </div>

      {/* Calculator Form */}
      <div className="p-6 space-y-6">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-3">
            Service Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SERVICE_TYPES.map((option) => (
              <button
                key={option.id}
                onClick={() => setServiceType(option.value)}
                className={`p-4 text-left rounded-lg border-2 transition-all ${
                  serviceType === option.value
                    ? 'border-primary-600 bg-primary-50 shadow-md'
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                aria-pressed={serviceType === option.value}
              >
                <span className="text-sm font-medium text-neutral-900">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Property Size */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-3">
            <Home className="inline w-4 h-4 mr-1" />
            Property Size
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROPERTY_SIZES.map((option) => (
              <button
                key={option.id}
                onClick={() => setPropertySize(option.value)}
                className={`p-3 text-center rounded-lg border-2 transition-all ${
                  propertySize === option.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                aria-pressed={propertySize === option.value}
              >
                <span className="text-xs font-medium text-neutral-900 block">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Damage Level */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-3">
            <Droplets className="inline w-4 h-4 mr-1" />
            Damage Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DAMAGE_LEVELS.map((option) => (
              <button
                key={option.id}
                onClick={() => setDamageLevel(option.value)}
                className={`p-3 text-left rounded-lg border-2 transition-all ${
                  damageLevel === option.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                aria-pressed={damageLevel === option.value}
              >
                <span className="text-sm font-medium text-neutral-900">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-3">
            <AlertCircle className="inline w-4 h-4 mr-1" />
            Response Time
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {URGENCY_LEVELS.map((option) => (
              <button
                key={option.id}
                onClick={() => setUrgency(option.value)}
                className={`p-3 text-center rounded-lg border-2 transition-all ${
                  urgency === option.value
                    ? option.value === 'emergency'
                      ? 'border-emergency-600 bg-emergency-50'
                      : 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                aria-pressed={urgency === option.value}
              >
                <span className="text-sm font-medium text-neutral-900">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
          <input
            type="checkbox"
            id="insurance"
            checked={hasInsurance}
            onChange={(e) => setHasInsurance(e.target.checked)}
            className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="insurance" className="text-sm font-medium text-neutral-900 cursor-pointer">
            I have insurance coverage
          </label>
        </div>

        {/* Estimate Result */}
        <motion.div
          className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={`${estimate.min}-${estimate.max}`}
        >
          <p className="text-sm font-semibold text-primary-900 mb-3">
            Estimated Cost Range
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-primary-900">
              ${estimate.min.toLocaleString()}
            </span>
            <span className="text-2xl text-primary-700">-</span>
            <span className="text-4xl font-bold text-primary-900">
              ${estimate.max.toLocaleString()}
            </span>
          </div>

          {hasInsurance && (
            <div className="flex items-start gap-2 p-3 bg-success-50 border border-success-200 rounded-lg mb-4">
              <svg className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-success-900">
                <strong>Insurance covered:</strong> Most costs may be covered by your insurance. We work directly with all major insurers.
              </p>
            </div>
          )}

          <div className="space-y-2 text-sm text-primary-800">
            <p>• Free initial inspection and assessment</p>
            <p>• IICRC Master Restorer certification</p>
            <p>• Direct insurance billing available</p>
            <p>• 24/7 emergency response</p>
          </div>

          <a
            href="tel:1300309361"
            className="mt-6 block w-full bg-emergency-600 hover:bg-emergency-700 text-white text-center font-semibold py-4 px-6 rounded-lg transition-colors shadow-lg"
          >
            Call Now for Accurate Quote: 1300 309 361
          </a>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-600 text-center">
          * Estimates are indicative only. Final costs depend on actual site assessment. All prices in AUD.
        </p>
      </div>
    </div>
  );
}
