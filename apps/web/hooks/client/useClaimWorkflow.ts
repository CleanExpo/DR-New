'use client';

import { useState, useCallback, useMemo } from 'react';

export interface ClaimFormData {
  // Step 1: Incident Details
  incidentType: string;
  incidentDate: string;
  incidentTime?: string;
  incidentDescription: string;
  urgency: 'emergency' | 'urgent' | 'normal';

  // Step 2: Property Information
  propertyId?: string;
  affectedAreas: string[];
  estimatedDamage?: string;
  safetyHazards?: boolean;
  hazardDetails?: string;

  // Step 3: Insurance Information
  insurancePolicyId?: string;
  policyNumber?: string;
  insuranceProvider?: string;
  claimNumber?: string;
  hasInsurance: boolean;

  // Step 4: Documentation
  photos: File[];
  documents: File[];
  policeReportNumber?: string;
  witnessStatements?: string;

  // Step 5: Contact & Preferences
  contactPhone: string;
  contactEmail: string;
  preferredContactMethod: 'phone' | 'email' | 'both';
  availabilityNotes?: string;
  immediateAction?: boolean;
}

export interface ClaimWorkflowStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isValid: boolean;
}

interface UseClaimWorkflowOptions {
  initialData?: Partial<ClaimFormData>;
  onSubmit?: (data: ClaimFormData) => Promise<void>;
  onStepChange?: (step: number) => void;
}

interface UseClaimWorkflowReturn {
  // Current state
  currentStep: number;
  formData: Partial<ClaimFormData>;
  steps: ClaimWorkflowStep[];
  isSubmitting: boolean;
  error: string | null;

  // Step navigation
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;

  // Form data management
  updateFormData: (data: Partial<ClaimFormData>) => void;
  resetForm: () => void;

  // Validation
  validateCurrentStep: () => boolean;
  validateStep: (step: number) => boolean;

  // Submission
  submitClaim: () => Promise<boolean>;

  // Progress
  progress: number; // 0-100
  completedSteps: number;
}

const TOTAL_STEPS = 5;

const defaultFormData: Partial<ClaimFormData> = {
  urgency: 'normal',
  affectedAreas: [],
  photos: [],
  documents: [],
  hasInsurance: false,
  preferredContactMethod: 'email',
  immediateAction: false,
};

export function useClaimWorkflow({
  initialData = {},
  onSubmit,
  onStepChange,
}: UseClaimWorkflowOptions = {}): UseClaimWorkflowReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ClaimFormData>>({
    ...defaultFormData,
    ...initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate Step 1: Incident Details
  const validateStep1 = useCallback((): boolean => {
    return !!(
      formData.incidentType &&
      formData.incidentDate &&
      formData.incidentDescription &&
      formData.incidentDescription.length >= 20 &&
      formData.urgency
    );
  }, [formData]);

  // Validate Step 2: Property Information
  const validateStep2 = useCallback((): boolean => {
    return !!(
      formData.affectedAreas &&
      formData.affectedAreas.length > 0
    );
  }, [formData]);

  // Validate Step 3: Insurance Information
  const validateStep3 = useCallback((): boolean => {
    if (formData.hasInsurance) {
      return !!(
        formData.policyNumber &&
        formData.insuranceProvider
      );
    }
    return true; // No insurance is valid
  }, [formData]);

  // Validate Step 4: Documentation
  const validateStep4 = useCallback((): boolean => {
    // At least one photo is recommended but not required
    return true;
  }, [formData]);

  // Validate Step 5: Contact & Preferences
  const validateStep5 = useCallback((): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;

    return !!(
      formData.contactEmail &&
      emailRegex.test(formData.contactEmail) &&
      formData.contactPhone &&
      phoneRegex.test(formData.contactPhone) &&
      formData.preferredContactMethod
    );
  }, [formData]);

  // Validate specific step
  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      case 5:
        return validateStep5();
      default:
        return false;
    }
  }, [validateStep1, validateStep2, validateStep3, validateStep4, validateStep5]);

  // Validate current step
  const validateCurrentStep = useCallback((): boolean => {
    return validateStep(currentStep);
  }, [currentStep, validateStep]);

  // Calculate steps metadata
  const steps = useMemo((): ClaimWorkflowStep[] => {
    return [
      {
        id: 1,
        title: 'Incident Details',
        description: 'What happened and when',
        isComplete: currentStep > 1,
        isValid: validateStep(1),
      },
      {
        id: 2,
        title: 'Property Information',
        description: 'Affected areas and damage',
        isComplete: currentStep > 2,
        isValid: validateStep(2),
      },
      {
        id: 3,
        title: 'Insurance Information',
        description: 'Policy and coverage details',
        isComplete: currentStep > 3,
        isValid: validateStep(3),
      },
      {
        id: 4,
        title: 'Documentation',
        description: 'Photos and supporting documents',
        isComplete: currentStep > 4,
        isValid: validateStep(4),
      },
      {
        id: 5,
        title: 'Contact & Preferences',
        description: 'How we can reach you',
        isComplete: currentStep > 5,
        isValid: validateStep(5),
      },
    ];
  }, [currentStep, validateStep]);

  // Calculate progress
  const progress = useMemo(() => {
    return Math.round((currentStep / TOTAL_STEPS) * 100);
  }, [currentStep]);

  // Calculate completed steps
  const completedSteps = useMemo(() => {
    return steps.filter((step) => step.isComplete).length;
  }, [steps]);

  // Navigation flags
  const canGoNext = useMemo(() => {
    return currentStep < TOTAL_STEPS && validateCurrentStep();
  }, [currentStep, validateCurrentStep]);

  const canGoPrevious = useMemo(() => {
    return currentStep > 1;
  }, [currentStep]);

  // Update form data
  const updateFormData = useCallback((data: Partial<ClaimFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setError(null);
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({ ...defaultFormData, ...initialData });
    setCurrentStep(1);
    setError(null);
    setIsSubmitting(false);
  }, [initialData]);

  // Go to specific step
  const goToStep = useCallback((step: number) => {
    if (step < 1 || step > TOTAL_STEPS) return;

    // Check if all previous steps are valid
    for (let i = 1; i < step; i++) {
      if (!validateStep(i)) {
        setError(`Please complete step ${i} before proceeding`);
        return;
      }
    }

    setCurrentStep(step);
    setError(null);
    onStepChange?.(step);
  }, [validateStep, onStepChange]);

  // Next step
  const nextStep = useCallback(() => {
    if (!canGoNext) {
      setError('Please complete all required fields before continuing');
      return;
    }

    const next = currentStep + 1;
    if (next <= TOTAL_STEPS) {
      setCurrentStep(next);
      setError(null);
      onStepChange?.(next);
    }
  }, [currentStep, canGoNext, onStepChange]);

  // Previous step
  const previousStep = useCallback(() => {
    if (canGoPrevious) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setError(null);
      onStepChange?.(prev);
    }
  }, [currentStep, canGoPrevious, onStepChange]);

  // Submit claim
  const submitClaim = useCallback(async (): Promise<boolean> => {
    // Validate all steps
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      if (!validateStep(i)) {
        setError(`Please complete step ${i}: ${steps[i - 1].title}`);
        goToStep(i);
        return false;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(formData as ClaimFormData);
      } else {
        // Default API submission
        const response = await fetch('/api/claims', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit claim');
        }
      }

      // Success
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit claim';
      setError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, steps, goToStep, onSubmit]);

  return {
    // Current state
    currentStep,
    formData,
    steps,
    isSubmitting,
    error,

    // Step navigation
    goToStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,

    // Form data management
    updateFormData,
    resetForm,

    // Validation
    validateCurrentStep,
    validateStep,

    // Submission
    submitClaim,

    // Progress
    progress,
    completedSteps,
  };
}
