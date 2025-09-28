'use client';

import React, { useState } from 'react';
import { AlertTriangle, Phone, Mail, MapPin, Building2, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { getAirtableClient, Lead } from '@/lib/airtable/airtable-client';

interface EmergencyLeadFormProps {
  className?: string;
  title?: string;
  urgencyLevel?: 'emergency' | 'urgent' | 'standard' | 'quote_request';
  prefilledEmergencyType?: Lead['emergency_type'];
  onSubmitSuccess?: (lead: Lead) => void;
  onSubmitError?: (error: string) => void;
}

const EmergencyLeadForm: React.FC<EmergencyLeadFormProps> = ({
  className = '',
  title = '24/7 Emergency Response',
  urgencyLevel = 'emergency',
  prefilledEmergencyType,
  onSubmitSuccess,
  onSubmitError
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property_type: 'residential' as Lead['property_type'],
    emergency_type: prefilledEmergencyType || 'water_damage' as Lead['emergency_type'],
    location: '',
    suburb: '',
    description: '',
    insurance_company: '',
    claim_number: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const urgencyConfig = {
    emergency: {
      color: 'bg-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      title: '🚨 Emergency Response Required',
      subtitle: 'Immediate 24/7 response team dispatch',
      responseTime: '30-60 minutes'
    },
    urgent: {
      color: 'bg-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: '⚡ Urgent Response Required',
      subtitle: 'Priority response within business hours',
      responseTime: '2-4 hours'
    },
    standard: {
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: '📋 Standard Service Request',
      subtitle: 'Professional assessment and quote',
      responseTime: '24-48 hours'
    },
    quote_request: {
      color: 'bg-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: '💰 Quote Request',
      subtitle: 'Detailed quote and consultation',
      responseTime: '24-48 hours'
    }
  };

  const config = urgencyConfig[urgencyLevel];

  const emergencyTypes = [
    { value: 'water_damage', label: 'Water Damage', icon: '💧', urgent: true },
    { value: 'fire_damage', label: 'Fire Damage', icon: '🔥', urgent: true },
    { value: 'mould', label: 'Mould Issues', icon: '🦠', urgent: true },
    { value: 'storm_damage', label: 'Storm Damage', icon: '⛈️', urgent: false },
    { value: 'sewage', label: 'Sewage Cleanup', icon: '⚠️', urgent: true },
    { value: 'biohazard', label: 'Biohazard Cleanup', icon: '☣️', urgent: true },
    { value: 'other', label: 'Other Emergency', icon: '🆘', urgent: false },
  ];

  const propertyTypes = [
    { value: 'residential', label: 'Residential Property' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'industrial', label: 'Industrial Facility' },
  ];

  const brisbaneSuburbs = [
    'Hamilton', 'Ascot', 'New Farm', 'Bulimba', 'Hawthorne', 'Toowong', 'Milton', 'Paddington',
    'Brisbane CBD', 'South Brisbane', 'West End', 'Fortitude Valley', 'Spring Hill', 'Kangaroo Point',
    'Woolloongabba', 'Annerley', 'Greenslopes', 'Camp Hill', 'Coorparoo', 'Norman Park',
    'Ipswich', 'Springfield', 'Brookwater', 'Karalee', 'Springfield Lakes', 'Augustine Heights',
    'Logan', 'Springwood', 'Shailer Park', 'Daisy Hill', 'Rochedale', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const airtableClient = getAirtableClient();

      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        ...formData,
        urgency: urgencyLevel,
        source: 'website',
        status: 'new',
      };

      const createdLead = await airtableClient.createLead(leadData);

      setSubmitStatus('success');
      onSubmitSuccess?.(createdLead);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          property_type: 'residential',
          emergency_type: prefilledEmergencyType || 'water_damage',
          location: '',
          suburb: '',
          description: '',
          insurance_company: '',
          claim_number: '',
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
      setErrorMessage(errorMsg);
      setSubmitStatus('error');
      onSubmitError?.(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="text-lg font-bold text-green-800">Request Submitted Successfully!</h3>
            <p className="text-green-700">Our team will contact you within {config.responseTime}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 mb-2">
            <strong>What happens next:</strong>
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Emergency response team notified immediately</li>
            <li>• Initial contact within {config.responseTime}</li>
            <li>• Professional assessment and action plan</li>
            <li>• Direct insurance billing available</li>
          </ul>
        </div>
        {urgencyLevel === 'emergency' && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-800 font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              For immediate assistance: <a href="tel:0413965292" className="underline">0413 965 292</a>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className={`${config.color} text-white p-6 rounded-t-lg`}>
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="opacity-90">{config.subtitle}</p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>Response time: {config.responseTime}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Emergency Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type of Emergency *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {emergencyTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, emergency_type: type.value as Lead['emergency_type'] }))}
                className={`p-3 border rounded-lg text-left transition-all ${
                  formData.emergency_type === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-300 hover:border-gray-400'
                } ${type.urgent ? 'ring-1 ring-red-200' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium text-sm">{type.label}</span>
                </div>
                {type.urgent && (
                  <div className="text-xs text-red-600 font-medium">Emergency</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0413 965 292"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Property Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="property_type" className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              id="property_type"
              name="property_type"
              value={formData.property_type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-2">
              Suburb *
            </label>
            <select
              id="suburb"
              name="suburb"
              value={formData.suburb}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select suburb</option>
              {brisbaneSuburbs.map((suburb) => (
                <option key={suburb} value={suburb}>
                  {suburb}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Property Address *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Street address"
          />
        </div>

        {/* Problem Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Describe the Situation *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please describe what happened, extent of damage, and any immediate concerns..."
          />
        </div>

        {/* Insurance Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="insurance_company" className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Company
            </label>
            <select
              id="insurance_company"
              name="insurance_company"
              value={formData.insurance_company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select if applicable</option>
              <option value="RACQ">RACQ</option>
              <option value="Suncorp">Suncorp</option>
              <option value="AAMI">AAMI</option>
              <option value="Allianz">Allianz</option>
              <option value="QBE">QBE</option>
              <option value="CGU">CGU</option>
              <option value="NRMA">NRMA</option>
              <option value="Budget Direct">Budget Direct</option>
              <option value="Youi">Youi</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="claim_number" className="block text-sm font-medium text-gray-700 mb-2">
              Claim Number
            </label>
            <input
              type="text"
              id="claim_number"
              name="claim_number"
              value={formData.claim_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="If already lodged"
            />
          </div>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">Submission Error</p>
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${config.color} hover:opacity-90 disabled:opacity-50 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting to CRM...
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5" />
              Submit Emergency Request
            </>
          )}
        </button>

        {/* Direct Contact for Emergencies */}
        {urgencyLevel === 'emergency' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-800">Can't wait? Call now:</span>
            </div>
            <a
              href="tel:0413965292"
              className="text-lg font-bold text-red-600 hover:text-red-700 underline"
            >
              0413 965 292
            </a>
            <p className="text-red-700 text-sm mt-1">
              24/7 emergency line - speak directly with our response team
            </p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
          <p>
            Your information will be securely stored in our CRM system and only used to provide emergency restoration services.
            We work directly with insurance companies and will protect your privacy at all times.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmergencyLeadForm;