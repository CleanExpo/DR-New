'use client';

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { AccountCreation } from '@/components/onboarding/steps/AccountCreation';
import { BusinessDetails } from '@/components/onboarding/steps/BusinessDetails';
import { ServiceSelection } from '@/components/onboarding/steps/ServiceSelection';
import { QualificationUpload } from '@/components/onboarding/steps/QualificationUpload';
import { InsuranceCompliance } from '@/components/onboarding/steps/InsuranceCompliance';
import { CoverageSelection } from '@/components/onboarding/steps/CoverageSelection';
import { ReviewSubmit } from '@/components/onboarding/steps/ReviewSubmit';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const STEPS = [
  'Account',
  'Business',
  'Services',
  'Qualifications',
  'Insurance',
  'Coverage',
  'Review',
];

export default function OnboardingPage() {
  const { currentStep, data, resetOnboarding } = useOnboarding();
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [hasCheckedDraft, setHasCheckedDraft] = useState(false);

  useEffect(() => {
    // Check if there's saved progress
    if (typeof window !== 'undefined' && !hasCheckedDraft) {
      const savedData = localStorage.getItem('nrpg-onboarding-draft');
      const savedStep = localStorage.getItem('nrpg-onboarding-step');

      if (savedData && savedStep) {
        const step = parseInt(savedStep, 10);
        if (step > 0) {
          setShowResumePrompt(true);
        }
      }
      setHasCheckedDraft(true);
    }
  }, [hasCheckedDraft]);

  const handleStartFresh = () => {
    resetOnboarding();
    setShowResumePrompt(false);
  };

  const handleResume = () => {
    setShowResumePrompt(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountCreation />;
      case 1:
        return <BusinessDetails />;
      case 2:
        return <ServiceSelection />;
      case 3:
        return <QualificationUpload />;
      case 4:
        return <InsuranceCompliance />;
      case 5:
        return <CoverageSelection />;
      case 6:
        return <ReviewSubmit />;
      default:
        return <AccountCreation />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster position="top-right" />

      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 bg-[var(--mesh-gradient)] opacity-50 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-8 max-w-5xl">
        {/* Resume prompt modal */}
        {showResumePrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Resume Your Application?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We found a saved draft of your application. Would you like to continue where you left
                    off or start fresh?
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleStartFresh}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Start Fresh
                </Button>
                <Button
                  onClick={handleResume}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Resume Application
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome banner */}
        {currentStep === 0 && !showResumePrompt && (
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/30 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold">
                    NRPG Contractor Registration
                  </h1>
                  <p className="text-blue-100 text-lg mt-1">
                    Join Australia's premier network of restoration professionals
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-blue-100">Instant Job Alerts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="text-3xl font-bold mb-1">100+</div>
                  <div className="text-sm text-blue-100">Active Contractors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="text-3xl font-bold mb-1">$50M+</div>
                  <div className="text-sm text-blue-100">Jobs Completed</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main wizard card */}
        {!showResumePrompt && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
            {/* Progress bar */}
            <ProgressBar currentStep={currentStep} totalSteps={7} steps={STEPS} />

            {/* Current step content */}
            <div className="mt-8">{renderStep()}</div>

            {/* Auto-save indicator */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your progress is automatically saved
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
