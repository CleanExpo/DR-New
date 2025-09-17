'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Disaster Recovery
          </h2>

          {/* Key Facts */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Years of Service */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                Since 2011
              </div>
              <p className="text-gray-700">
                Founded by Phill and Bronwyn McGurk
              </p>
            </div>

            {/* Service Coverage */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                50km Radius
              </div>
              <p className="text-gray-700">
                Service area from Wacol headquarters
              </p>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                1 Hour
              </div>
              <p className="text-gray-700">
                Emergency response time
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Industry Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">IICRC Certified</h4>
                <p className="text-gray-700 text-sm">
                  Institute of Inspection, Cleaning and Restoration Certification -
                  The global standard for the cleaning and restoration industry.
                </p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Master Restorer</h4>
                <p className="text-gray-700 text-sm">
                  Phill McGurk holds Master Restorer qualification,
                  demonstrating advanced expertise in restoration services.
                </p>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Insurance & Compliance
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">$20 Million Public Liability</h4>
                <p className="text-gray-700 text-sm">
                  Comprehensive insurance coverage for complete peace of mind.
                </p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">All Major Insurers</h4>
                <p className="text-gray-700 text-sm">
                  We work directly with all major insurance companies and handle claims on your behalf.
                </p>
              </div>
            </div>
          </div>

          {/* Service Commitment */}
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">24/7 Emergency Response</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Direct Service (No Contractors)</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Insurance Claims Assistance</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Quality Workmanship Guarantee</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Local Brisbane Team</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Free Assessments</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get a Free Assessment
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}