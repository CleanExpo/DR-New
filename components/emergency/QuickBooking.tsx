'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface BookingData {
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  urgency: 'emergency' | 'urgent' | 'standard';
  description: string;
}

const SERVICE_OPTIONS = [
  'Water Damage - Emergency',
  'Fire Damage - Emergency',
  'Mould Remediation',
  'Storm Damage',
  'Sewage Cleanup',
  'Other Emergency',
];

export function QuickBooking({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    address: '',
    serviceType: SERVICE_OPTIONS[0],
    urgency: 'emergency',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setStep('success');

    // Reset after 5 seconds
    setTimeout(() => {
      setIsOpen(false);
      setStep('form');
      setFormData({
        name: '',
        phone: '',
        address: '',
        serviceType: SERVICE_OPTIONS[0],
        urgency: 'emergency',
        description: '',
      });
    }, 5000);
  };

  const urgencyConfig = {
    emergency: {
      label: 'Emergency (Immediate)',
      color: 'emergency',
      icon: <AlertCircle className="w-4 h-4" />,
    },
    urgent: {
      label: 'Urgent (Within 4 hours)',
      color: 'primary',
      icon: <Clock className="w-4 h-4" />,
    },
    standard: {
      label: 'Standard (Within 24 hours)',
      color: 'success',
      icon: <Calendar className="w-4 h-4" />,
    },
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-emergency-600 hover:bg-emergency-700 text-white rounded-full shadow-2xl p-4 transition-colors group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Quick emergency booking"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          <span className="hidden sm:block font-semibold pr-2">
            Emergency Booking
          </span>
        </div>

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-emergency-400 rounded-full -z-10"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {step === 'form' ? (
                  <>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emergency-600 to-emergency-700 px-6 py-8 text-white relative">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        aria-label="Close"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <h2 className="text-2xl font-bold mb-2">
                        Emergency Service Request
                      </h2>
                      <p className="text-emergency-100">
                        Fill out the form below or call{' '}
                        <a href="tel:1300309361" className="font-bold underline">
                          1300 309 361
                        </a>
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                      {/* Urgency Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-neutral-900 mb-3">
                          Urgency Level *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {Object.entries(urgencyConfig).map(([key, config]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, urgency: key as any })
                              }
                              className={`p-4 rounded-lg border-2 transition-all text-left ${
                                formData.urgency === key
                                  ? `border-${config.color}-600 bg-${config.color}-50`
                                  : 'border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {config.icon}
                                <span className="text-sm font-semibold text-neutral-900">
                                  {config.label}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Type */}
                      <div>
                        <label htmlFor="serviceType" className="block text-sm font-semibold text-neutral-900 mb-2">
                          Service Type *
                        </label>
                        <select
                          id="serviceType"
                          value={formData.serviceType}
                          onChange={(e) =>
                            setFormData({ ...formData, serviceType: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                          required
                        >
                          {SERVICE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                            required
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-neutral-900 mb-2">
                          Property Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                          placeholder="123 Main St, Brisbane QLD 4000"
                          required
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-neutral-900 mb-2">
                          Brief Description
                        </label>
                        <textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors resize-none"
                          placeholder="Describe the damage and any immediate concerns..."
                        />
                      </div>

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-emergency-600 hover:bg-emergency-700 disabled:bg-neutral-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5" />
                              Request Emergency Service
                            </>
                          )}
                        </button>

                        <a
                          href="tel:1300309361"
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Phone className="w-5 h-5" />
                          Call Now Instead
                        </a>
                      </div>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <div className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <div className="w-20 h-20 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      Request Received!
                    </h3>
                    <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                      Our emergency team will contact you within 5 minutes at{' '}
                      <strong>{formData.phone}</strong>
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-primary-900">
                        <strong>Response Time:</strong>{' '}
                        {formData.urgency === 'emergency'
                          ? 'Within 60 minutes'
                          : formData.urgency === 'urgent'
                          ? 'Within 4 hours'
                          : 'Within 24 hours'}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
