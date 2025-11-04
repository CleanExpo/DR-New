'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  AccountData,
  BusinessData,
  ServiceData,
  QualificationData,
  InsuranceData,
  CoverageData,
  ReviewData,
} from '@/lib/validation/onboarding';

interface OnboardingContextData {
  account: Partial<AccountData>;
  business: Partial<BusinessData>;
  services: Partial<ServiceData>;
  qualifications: Partial<QualificationData>;
  insurance: Partial<InsuranceData>;
  coverage: Partial<CoverageData>;
  review: Partial<ReviewData>;
}

interface OnboardingContextType {
  data: OnboardingContextData;
  currentStep: number;
  updateData: (step: keyof OnboardingContextData, stepData: any) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
  saveProgress: () => void;
}

const defaultData: OnboardingContextData = {
  account: {},
  business: {},
  services: { services: [] },
  qualifications: { qualifications: [] },
  insurance: {
    publicLiability: {},
    workersCompensation: {},
    businessDocuments: {},
  },
  coverage: {},
  review: {},
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingContextData>(() => {
    // Load from localStorage if exists
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nrpg-onboarding-draft');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Failed to parse saved onboarding data:', error);
        }
      }
    }
    return defaultData;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStep = localStorage.getItem('nrpg-onboarding-step');
      return savedStep ? parseInt(savedStep, 10) : 0;
    }
    return 0;
  });

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('nrpg-onboarding-draft', JSON.stringify(data));
        localStorage.setItem('nrpg-onboarding-step', currentStep.toString());
      }, 500); // Debounce saves

      return () => clearTimeout(timeoutId);
    }
  }, [data, currentStep]);

  const updateData = (step: keyof OnboardingContextData, stepData: any) => {
    setData((prev) => ({
      ...prev,
      [step]: stepData,
    }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6)); // Max 7 steps (0-6)
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const resetOnboarding = () => {
    setData(defaultData);
    setCurrentStep(0);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nrpg-onboarding-draft');
      localStorage.removeItem('nrpg-onboarding-step');
    }
  };

  const saveProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nrpg-onboarding-draft', JSON.stringify(data));
      localStorage.setItem('nrpg-onboarding-step', currentStep.toString());
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        currentStep,
        updateData,
        goToStep,
        nextStep,
        prevStep,
        resetOnboarding,
        saveProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
