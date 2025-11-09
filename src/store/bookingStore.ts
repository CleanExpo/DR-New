/**
 * Booking Store - Manage emergency service bookings
 * Uses Zustand for lightweight state management
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface BookingFormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Location
  address: string;
  suburb: string;
  postcode: string;
  region: 'Brisbane' | 'Ipswich' | 'Logan' | '';

  // Emergency Details
  serviceType: 'water-damage' | 'fire-damage' | 'mould' | 'storm-damage' | '';
  urgency: 'emergency' | 'urgent' | 'scheduled' | '';
  description: string;

  // Insurance
  hasInsurance: boolean;
  insuranceProvider: string;
  claimNumber: string;

  // Scheduling
  preferredDate?: string;
  preferredTime?: string;

  // Additional
  images?: File[];
  notes?: string;
}

interface BookingState {
  // Form data
  formData: BookingFormData;

  // UI state
  currentStep: number;
  isSubmitting: boolean;
  error: string | null;

  // Actions
  updateFormData: (data: Partial<BookingFormData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
  setError: (error: string | null) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  submitBooking: () => Promise<void>;
}

const initialFormData: BookingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  suburb: '',
  postcode: '',
  region: '',
  serviceType: '',
  urgency: '',
  description: '',
  hasInsurance: false,
  insuranceProvider: '',
  claimNumber: '',
  notes: '',
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      currentStep: 1,
      isSubmitting: false,
      error: null,

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 4),
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      resetForm: () =>
        set({
          formData: initialFormData,
          currentStep: 1,
          isSubmitting: false,
          error: null,
        }),

      setError: (error) => set({ error }),

      setSubmitting: (isSubmitting) => set({ isSubmitting }),

      submitBooking: async () => {
        const { formData, setSubmitting, setError, resetForm } = get();

        setSubmitting(true);
        setError(null);

        try {
          const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to submit booking');
          }

          const result = await response.json();

          // Success - reset form
          resetForm();

          return result;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          setError(message);
          throw error;
        } finally {
          setSubmitting(false);
        }
      },
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist form data, not UI state
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);
