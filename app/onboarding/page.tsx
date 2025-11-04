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
    <>
      <Toaster position="top-right" />

      {/* Resume prompt modal */}
      {showResumePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Resume Your Application?
                </h3>
                <p className="text-sm text-gray-600">
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
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                Resume Application
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome banner */}
      {currentStep === 0 && !showResumePrompt && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Welcome to NRPG Contractor Registration
          </h1>
          <p className="text-blue-100 text-lg mb-4">
            Join Australia's premier network of restoration professionals
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm text-blue-100">Job Alerts</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">100+</div>
              <div className="text-sm text-blue-100">Active Contractors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">$50M+</div>
              <div className="text-sm text-blue-100">Jobs Completed</div>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {!showResumePrompt && (
        <ProgressBar currentStep={currentStep} totalSteps={7} steps={STEPS} />
      )}

      {/* Current step content */}
      {!showResumePrompt && <div className="mt-8">{renderStep()}</div>}

      {/* Auto-save indicator */}
      {!showResumePrompt && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Your progress is automatically saved as you complete each step
          </p>
        </div>
      )}
    </>
  );
}
