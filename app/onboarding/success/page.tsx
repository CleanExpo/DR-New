'use client';

import React from 'react';
import { CheckCircle, Mail, Clock, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OnboardingSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
            <p className="text-green-100 text-lg">
              Thank you for applying to join NRPG
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* What's Next Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What happens next?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Check Your Email
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We've sent a confirmation email with your application reference number.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Verification Process
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Our team will verify your IICRC certifications, insurance documents, and ABN
                        registration. This process typically takes 24-48 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Approval Notification
                      </h3>
                      <p className="text-gray-600 text-sm">
                        You'll receive an email once your application is approved. You'll then be able to
                        access your contractor dashboard and start receiving job alerts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Your subscription will only be activated after approval
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      We may contact you if we need additional information or clarification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Check your spam folder if you don't receive our email within 10 minutes
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact Support */}
              <div className="text-center py-4">
                <p className="text-gray-600 text-sm mb-4">
                  Questions about your application?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <a href="mailto:support@nrpg.com.au">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:1300000000">
                      Call 1300 000 000
                    </a>
                  </Button>
                </div>
              </div>

              {/* Back to Home */}
              <div className="text-center pt-4 border-t border-gray-200">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    Return to Home
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Application Timeline */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Application Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>

            <div className="ml-4 border-l-2 border-gray-200 h-8" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Under Review</p>
                <p className="text-xs text-gray-500">Within 24-48 hours</p>
              </div>
            </div>

            <div className="ml-4 border-l-2 border-gray-200 h-8" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Verification Complete</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>

            <div className="ml-4 border-l-2 border-gray-200 h-8" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Account Activated</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
