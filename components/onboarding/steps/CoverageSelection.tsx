'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Check, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { coverageSchema, type CoverageData, COVERAGE_TIERS } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { CoverageMap, CoverageMapFallback } from '../CoverageMap';
import { cn } from '@/lib/utils';

export function CoverageSelection() {
  const { data, updateData, nextStep, prevStep, currentStep } = useOnboarding();

  const [selectedTier, setSelectedTier] = useState<string>(
    data.coverage?.tier || ''
  );

  const [baseLocation, setBaseLocation] = useState<{ lat: number; lng: number; address: string }>(
    data.coverage?.baseLocation || { lat: 0, lng: 0, address: '' }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CoverageData>({
    resolver: zodResolver(coverageSchema),
    mode: 'onChange',
    defaultValues: data.coverage || {},
  });

  const currentRadius = watch('coverageRadius');

  const handleTierSelect = (tierId: string) => {
    const tier = COVERAGE_TIERS.find((t) => t.id === tierId);
    if (tier) {
      setSelectedTier(tierId);
      setValue('tier', tierId as any, { shouldValidate: true });
      setValue('coverageRadius', tier.radius.toString() as any, { shouldValidate: true });
    }
  };

  const handleAddressChange = async (address: string) => {
    // In a real implementation, use Google Places Autocomplete API
    // For now, set default Brisbane coordinates
    setBaseLocation({
      lat: -27.4705,
      lng: 153.0260,
      address,
    });
    setValue('baseLocation', {
      address,
      lat: -27.4705,
      lng: 153.0260,
    }, { shouldValidate: true });
  };

  const onSubmit = (formData: CoverageData) => {
    updateData('coverage', formData);
    nextStep();
  };

  const selectedTierData = COVERAGE_TIERS.find((t) => t.id === selectedTier);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Coverage Area & Subscription</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Select your base location and coverage radius to start receiving job alerts
        </p>

        {/* Base Location */}
        <div className="space-y-4 mb-8">
          <div>
            <Label>
              Base Location Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                {...register('baseLocation.address')}
                placeholder="Enter your business address"
                onChange={(e) => handleAddressChange(e.target.value)}
                className={cn(errors.baseLocation?.address && 'border-red-500', 'pl-10')}
              />
            </div>
            {errors.baseLocation?.address && (
              <p className="text-sm text-red-500 mt-1">{errors.baseLocation.address.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              This will be the center point of your coverage radius
            </p>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            {baseLocation.lat && baseLocation.lng ? (
              <CoverageMap
                baseLocation={{ lat: baseLocation.lat, lng: baseLocation.lng }}
                radius={currentRadius ? parseInt(currentRadius) : 25}
              />
            ) : (
              <CoverageMapFallback radius={currentRadius ? parseInt(currentRadius) : 25} />
            )}
          </div>
        </div>

        {/* Coverage Tiers */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Your Coverage Tier</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COVERAGE_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              const isPopular = tier.id === 'STANDARD';

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierSelect(tier.id)}
                  className={cn(
                    'relative p-6 rounded-lg border-2 transition-all duration-200 text-left',
                    {
                      'border-blue-500 bg-blue-50 shadow-lg transform scale-105': isSelected,
                      'border-gray-200 bg-white hover:border-gray-300': !isSelected,
                    }
                  )}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Tier name */}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h4>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>

                  {/* Coverage radius */}
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{tier.radius}km coverage</span>
                  </div>

                  {/* Estimated jobs */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>{tier.estimatedJobs}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {errors.tier && (
            <p className="text-sm text-red-500">{errors.tier.message}</p>
          )}
        </div>

        {/* Summary */}
        {selectedTierData && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Selected Plan Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Plan</p>
                <p className="text-lg font-bold text-gray-900">{selectedTierData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Coverage Radius</p>
                <p className="text-lg font-bold text-gray-900">{selectedTierData.radius}km</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                <p className="text-lg font-bold text-gray-900">${selectedTierData.price}/month</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Payment will be processed in the next step. You can cancel or change your plan at any time.
            </p>
          </div>
        )}
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleSubmit(onSubmit)}
        onBack={prevStep}
        isValid={isValid && selectedTier !== ''}
      />
    </form>
  );
}
