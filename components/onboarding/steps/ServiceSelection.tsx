'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { serviceSchema, type ServiceData, SERVICE_TYPES } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { cn } from '@/lib/utils';

export function ServiceSelection() {
  const { data, updateData, nextStep, prevStep, currentStep } = useOnboarding();

  const [selectedServices, setSelectedServices] = useState<string[]>(
    data.services?.services || []
  );

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<ServiceData>({
    resolver: zodResolver(serviceSchema),
    mode: 'onChange',
    defaultValues: {
      services: selectedServices,
    },
  });

  const toggleService = (serviceId: string) => {
    const updated = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(updated);
    setValue('services', updated, { shouldValidate: true });
  };

  const onSubmit = (formData: ServiceData) => {
    updateData('services', formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Services Offered</h2>
        <p className="text-gray-600 mb-6">
          Select all restoration services your business offers. Each service requires specific IICRC
          certifications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_TYPES.map((service) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                className={cn(
                  'relative p-4 rounded-lg border-2 transition-all duration-200 text-left',
                  {
                    'border-blue-500 bg-blue-50': isSelected,
                    'border-gray-200 bg-white hover:border-gray-300': !isSelected,
                  }
                )}
              >
                {/* Selection indicator */}
                <div
                  className={cn(
                    'absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                    {
                      'bg-blue-500 border-blue-500': isSelected,
                      'border-gray-300 bg-white': !isSelected,
                    }
                  )}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                {/* Service icon */}
                <div className="text-4xl mb-3">{service.icon}</div>

                {/* Service name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-8">
                  {service.name}
                </h3>

                {/* Required certification */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Required:</span>
                    <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded">
                      {service.requiredCert}
                    </span>
                  </div>

                  {/* Average job value */}
                  <div className="text-sm text-gray-600">
                    Avg. Job: <span className="font-medium">{service.avgJobValue}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedServices.length === 0 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              Please select at least one service to continue
            </p>
          </div>
        )}

        {selectedServices.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-medium mb-2">
              {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-blue-700">
              You'll need to provide IICRC certifications for these services in the next step.
            </p>
          </div>
        )}
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleSubmit(onSubmit)}
        onBack={prevStep}
        isValid={isValid && selectedServices.length > 0}
      />
    </form>
  );
}
