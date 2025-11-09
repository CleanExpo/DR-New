'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function MobileContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    emergency: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          emergency: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Phone className="w-6 h-6 text-red-700 flex-shrink-0" />
          <div>
            <p className="font-bold text-red-900 text-lg">Emergency?</p>
            <p className="text-sm text-red-700">Call now for immediate assistance</p>
          </div>
        </div>
        <a
          href="tel:1300309361"
          className="flex items-center justify-center min-h-[52px] w-full bg-red-700 text-white font-bold text-lg rounded-xl hover:bg-red-800 active:bg-red-900 transition-colors shadow-md active:shadow-sm"
        >
          <Phone className="w-5 h-5 mr-2" />
          1300 309 361
        </a>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Callback</h2>
      <p className="text-gray-600 mb-6">We'll respond within 15 minutes during business hours</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input - Mobile optimized */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            className="w-full min-h-[52px] px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="John Smith"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              inputMode="email"
              className="w-full min-h-[52px] pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone Input - Mobile keyboard optimization */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              inputMode="tel"
              className="w-full min-h-[52px] pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="0400 000 000"
            />
          </div>
        </div>

        {/* Service Select - Touch friendly */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
            Service Required
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full min-h-[52px] pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
            >
              <option value="">Select a service...</option>
              <option value="water-damage">Water Damage Restoration</option>
              <option value="fire-damage">Fire Damage Restoration</option>
              <option value="mould-remediation">Mould Remediation</option>
              <option value="storm-damage">Storm Damage</option>
              <option value="commercial">Commercial Services</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Message Textarea - Mobile optimized */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Tell us about your situation..."
          />
        </div>

        {/* Emergency Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="emergency"
            name="emergency"
            checked={formData.emergency}
            onChange={handleChange}
            className="min-w-[24px] min-h-[24px] mt-0.5 rounded border-gray-300 text-red-700 focus:ring-2 focus:ring-red-500"
          />
          <label htmlFor="emergency" className="text-sm text-gray-700 leading-relaxed">
            This is an emergency requiring immediate response (we'll call you within 5 minutes)
          </label>
        </div>

        {/* Submit Button - Touch optimized */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[56px] bg-blue-700 text-white font-bold text-lg rounded-xl hover:bg-blue-800 active:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:shadow-md active:scale-[0.98] transform duration-150"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Request Callback
            </span>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-center">
            <p className="font-semibold">Thank you! We'll contact you shortly.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-center">
            <p className="font-semibold">Something went wrong. Please call us instead.</p>
          </div>
        )}
      </form>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Your information is secure and private</span>
        </div>
      </div>
    </div>
  );
}
