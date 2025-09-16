'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionTracking } from '@/lib/conversion-tracking';

interface FormData {
  // Step 1 - Damage Assessment
  damageType: string;
  damageExtent: string;
  timeOccurred: string;

  // Step 2 - Property Details
  propertyType: string;
  propertySize: string;
  affectedAreas: string[];

  // Step 3 - Urgency
  urgencyLevel: string;
  insuranceClaim: string;
  preferredTime: string;

  // Step 4 - Contact
  name: string;
  phone: string;
  email: string;
  address: string;

  // Step 5 - Additional
  additionalInfo: string;
  photoUploaded: boolean;
  consentGiven: boolean;
}

export function MultiStepQuoteForm({ onClose }: { onClose?: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState<FormData>({
    damageType: '',
    damageExtent: '',
    timeOccurred: '',
    propertyType: '',
    propertySize: '',
    affectedAreas: [],
    urgencyLevel: '',
    insuranceClaim: '',
    preferredTime: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    additionalInfo: '',
    photoUploaded: false,
    consentGiven: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [abandonmentWarning, setAbandonmentWarning] = useState(false);
  const [stepCompletionTime, setStepCompletionTime] = useState<number[]>([]);
  const { trackConversion, trackEngagement } = useConversionTracking();

  // Track time spent on each step
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setStepCompletionTime(prev => [...prev, timeSpent]);
      trackEngagement(`form_step_${currentStep}_time_${timeSpent}s`);
    };
  }, [currentStep, trackEngagement]);

  // Abandonment prevention
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep > 1 && !showSuccess) {
        e.preventDefault();
        e.returnValue = '';
        setAbandonmentWarning(true);
        trackEngagement('form_abandonment_warning_shown');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentStep, showSuccess, trackEngagement]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.damageType) newErrors.damageType = 'Please select damage type';
        if (!formData.damageExtent) newErrors.damageExtent = 'Please indicate damage extent';
        if (!formData.timeOccurred) newErrors.timeOccurred = 'Please specify when this occurred';
        break;
      case 2:
        if (!formData.propertyType) newErrors.propertyType = 'Please select property type';
        if (!formData.propertySize) newErrors.propertySize = 'Please indicate property size';
        if (formData.affectedAreas.length === 0) newErrors.affectedAreas = 'Please select affected areas';
        break;
      case 3:
        if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Please select urgency level';
        if (!formData.insuranceClaim) newErrors.insuranceClaim = 'Please indicate insurance status';
        break;
      case 4:
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Property address is required';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      case 5:
        if (!formData.consentGiven) newErrors.consent = 'Please agree to terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      trackEngagement(`form_step_${currentStep}_completed`);
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    trackConversion('multi_step_form_completed', 100, {
      damageType: formData.damageType,
      urgencyLevel: formData.urgencyLevel,
      propertyType: formData.propertyType,
      stepsCompleted: currentStep,
      totalTimeSpent: stepCompletionTime.reduce((a, b) => a + b, 0)
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Damage Assessment';
      case 2: return 'Property Details';
      case 3: return 'Service Urgency';
      case 4: return 'Contact Information';
      case 5: return 'Final Details';
      default: return '';
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100;
  };

  const getEstimatedQuote = () => {
    let basePrice = 299;

    // Adjust based on damage type
    if (formData.damageType === 'fire') basePrice *= 1.5;
    if (formData.damageType === 'flood') basePrice *= 1.3;

    // Adjust based on extent
    if (formData.damageExtent === 'severe') basePrice *= 2;
    if (formData.damageExtent === 'moderate') basePrice *= 1.5;

    // Adjust based on urgency
    if (formData.urgencyLevel === 'immediate') basePrice *= 1.4;

    return Math.round(basePrice);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quote Request Received!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your estimated service cost: <span className="font-bold text-2xl text-green-600">${getEstimatedQuote()}</span>
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">What Happens Next:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <p className="text-gray-700">Our emergency team will call you within <strong>15 minutes</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <p className="text-gray-700">We'll dispatch the nearest available team immediately</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <p className="text-gray-700">Arrival at your property within <strong>1 hour</strong></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="tel:1300309361"
              className="bg-red-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now: 1300 309 361
            </a>

            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Get Your Free Quote</h2>
            <p className="text-blue-100">Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}</p>
          </div>
          {formData.urgencyLevel === 'immediate' && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
              PRIORITY SERVICE
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-3 bg-blue-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              className="h-full bg-gradient-to-r from-green-400 to-green-500"
            />
          </div>

          {/* Step Indicators */}
          <div className="absolute -top-1 left-0 right-0 flex justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-5 h-5 rounded-full border-2 ${
                  step <= currentStep
                    ? 'bg-green-500 border-green-400'
                    : 'bg-blue-800 border-blue-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Damage Assessment */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  What type of damage are you dealing with? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Water/Flood', 'Fire/Smoke', 'Mould', 'Storm', 'Sewage', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, damageType: type.toLowerCase().replace('/', '') })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.damageType === type.toLowerCase().replace('/', '')
                          ? 'border-blue-500 bg-blue-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl mb-2">
                        {type === 'Water/Flood' && '💧'}
                        {type === 'Fire/Smoke' && '🔥'}
                        {type === 'Mould' && '🦠'}
                        {type === 'Storm' && '⛈️'}
                        {type === 'Sewage' && '⚠️'}
                        {type === 'Other' && '❓'}
                      </span>
                      <p className="font-medium">{type}</p>
                    </button>
                  ))}
                </div>
                {errors.damageType && <p className="text-red-500 text-sm mt-2">{errors.damageType}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  How extensive is the damage? *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'minor', label: 'Minor', desc: 'Small area affected, minimal damage' },
                    { value: 'moderate', label: 'Moderate', desc: 'Multiple rooms or significant area' },
                    { value: 'severe', label: 'Severe', desc: 'Extensive damage, multiple floors' },
                    { value: 'catastrophic', label: 'Catastrophic', desc: 'Complete property damage' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.damageExtent === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="damageExtent"
                        value={option.value}
                        checked={formData.damageExtent === option.value}
                        onChange={(e) => setFormData({ ...formData, damageExtent: e.target.value })}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{option.label}</p>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                        {formData.damageExtent === option.value && (
                          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.damageExtent && <p className="text-red-500 text-sm mt-2">{errors.damageExtent}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  When did this occur? *
                </label>
                <select
                  value={formData.timeOccurred}
                  onChange={(e) => setFormData({ ...formData, timeOccurred: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time frame</option>
                  <option value="now">Happening right now</option>
                  <option value="today">Within last 24 hours</option>
                  <option value="yesterday">1-2 days ago</option>
                  <option value="thisweek">3-7 days ago</option>
                  <option value="older">More than a week ago</option>
                </select>
                {errors.timeOccurred && <p className="text-red-500 text-sm mt-2">{errors.timeOccurred}</p>}
              </div>

              {/* Live Quote Estimate */}
              {formData.damageType && formData.damageExtent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border-2 border-green-300 rounded-xl p-4"
                >
                  <p className="text-sm text-gray-600 mb-1">Preliminary estimate:</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${getEstimatedQuote()} - ${getEstimatedQuote() + 500}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    * Final quote after inspection
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Type of property *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Residential', 'Commercial', 'Industrial', 'Rental'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: type.toLowerCase() })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.propertyType === type.toLowerCase()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.propertyType && <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Property size *
                </label>
                <select
                  value={formData.propertySize}
                  onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select size</option>
                  <option value="small">Small (1-2 bedrooms)</option>
                  <option value="medium">Medium (3-4 bedrooms)</option>
                  <option value="large">Large (5+ bedrooms)</option>
                  <option value="commercial">Commercial space</option>
                </select>
                {errors.propertySize && <p className="text-red-500 text-sm mt-2">{errors.propertySize}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Affected areas (select all that apply) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'Living Room', 'Kitchen', 'Bathroom', 'Bedroom',
                    'Basement', 'Attic', 'Garage', 'Office', 'Other'
                  ].map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.affectedAreas.includes(area)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              affectedAreas: [...formData.affectedAreas, area]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              affectedAreas: formData.affectedAreas.filter(a => a !== area)
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
                {errors.affectedAreas && <p className="text-red-500 text-sm mt-2">{errors.affectedAreas}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 3: Urgency */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  How urgent is your situation? *
                </label>
                <div className="space-y-3">
                  {[
                    {
                      value: 'immediate',
                      label: 'Emergency - Need help NOW',
                      desc: 'Active damage occurring, immediate response required',
                      color: 'red'
                    },
                    {
                      value: 'today',
                      label: 'Urgent - Today',
                      desc: 'Damage has stopped but needs immediate attention',
                      color: 'orange'
                    },
                    {
                      value: 'thisweek',
                      label: 'This Week',
                      desc: 'Can wait a few days but needs attention soon',
                      color: 'yellow'
                    },
                    {
                      value: 'planning',
                      label: 'Planning/Quote Only',
                      desc: 'Getting quotes for insurance or future work',
                      color: 'green'
                    }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.urgencyLevel === option.value
                          ? `border-${option.color}-500 bg-${option.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value={option.value}
                        checked={formData.urgencyLevel === option.value}
                        onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-lg">{option.label}</p>
                          <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                        </div>
                        {formData.urgencyLevel === option.value && (
                          <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.urgencyLevel && <p className="text-red-500 text-sm mt-2">{errors.urgencyLevel}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Will you be filing an insurance claim? *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Yes', 'No', 'Not Sure'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, insuranceClaim: option.toLowerCase() })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.insuranceClaim === option.toLowerCase()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.insuranceClaim && <p className="text-red-500 text-sm mt-2">{errors.insuranceClaim}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Preferred service time
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any time</option>
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 8pm)</option>
                  <option value="weekend">Weekend</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0400 000 000"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St, Brisbane QLD 4000"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Privacy Notice:</strong> Your information is secure and will only be used to provide you with a quote and service. We never share or sell your data.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 5: Final Details */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Additional Information
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Any additional details about the damage or special requirements..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="w-5 h-5 text-blue-600 mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I agree to the terms of service and authorize Disaster Recovery Brisbane to contact me regarding my service request. I understand that I may receive calls, texts, and emails.
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
              </div>

              {/* Quote Summary */}
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Your Quote Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Damage Type:</span>
                    <span className="font-semibold">{formData.damageType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property:</span>
                    <span className="font-semibold">{formData.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgency:</span>
                    <span className="font-semibold">{formData.urgencyLevel}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Estimated Cost:</span>
                      <span className="font-bold text-green-600">${getEstimatedQuote()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentStep < totalSteps ? `${totalSteps - currentStep} steps remaining` : 'Final step'}
            </span>
          </div>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Get My Free Quote'
              )}
            </button>
          )}
        </div>

        {/* Abandonment Prevention Message */}
        {abandonmentWarning && currentStep > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-yellow-50 border border-yellow-300 rounded-lg p-3"
          >
            <p className="text-sm text-yellow-800">
              <strong>Wait!</strong> You're {Math.round(getProgressPercentage())}% complete. Finish now to lock in your quote!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}