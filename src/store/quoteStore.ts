/**
 * Quote Store - Manage quote requests
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface QuoteFormData {
  // Contact
  name: string;
  email: string;
  phone: string;

  // Property
  propertyType: 'residential' | 'commercial' | 'industrial' | '';
  address: string;
  suburb: string;

  // Service
  serviceType: 'water-damage' | 'fire-damage' | 'mould' | 'storm-damage' | 'other' | '';
  damageExtent: 'minor' | 'moderate' | 'severe' | '';
  affectedAreas: string[];

  // Details
  description: string;
  urgency: 'immediate' | 'within-24h' | 'within-week' | 'flexible' | '';

  // Insurance
  hasInsurance: boolean;
  insuranceProvider?: string;

  // Media
  photos?: File[];
}

interface QuoteState {
  formData: QuoteFormData;
  isSubmitting: boolean;
  error: string | null;
  successMessage: string | null;

  updateFormData: (data: Partial<QuoteFormData>) => void;
  resetForm: () => void;
  setError: (error: string | null) => void;
  setSuccess: (message: string | null) => void;
  submitQuote: () => Promise<void>;
}

const initialFormData: QuoteFormData = {
  name: '',
  email: '',
  phone: '',
  propertyType: '',
  address: '',
  suburb: '',
  serviceType: '',
  damageExtent: '',
  affectedAreas: [],
  description: '',
  urgency: '',
  hasInsurance: false,
};

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      isSubmitting: false,
      error: null,
      successMessage: null,

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      resetForm: () =>
        set({
          formData: initialFormData,
          isSubmitting: false,
          error: null,
          successMessage: null,
        }),

      setError: (error) => set({ error, successMessage: null }),

      setSuccess: (message) => set({ successMessage: message, error: null }),

      submitQuote: async () => {
        const { formData } = get();

        set({ isSubmitting: true, error: null });

        try {
          const response = await fetch('/api/quotes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to submit quote request');
          }

          const result = await response.json();

          set({
            isSubmitting: false,
            successMessage: 'Quote request submitted successfully! We\'ll contact you within 2 hours.',
          });

          return result;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          set({
            isSubmitting: false,
            error: message,
          });
          throw error;
        }
      },
    }),
    {
      name: 'quote-storage',
      storage: createJSONStorage(() => sessionStorage), // Use session storage (cleared on tab close)
      partialize: (state) => ({
        formData: state.formData,
      }),
    }
  )
);
