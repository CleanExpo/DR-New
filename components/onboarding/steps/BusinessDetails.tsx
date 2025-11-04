'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { businessSchema, type BusinessData, AUSTRALIAN_STATES } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { cn } from '@/lib/utils';

export function BusinessDetails() {
  const { data, updateData, nextStep, prevStep, currentStep } = useOnboarding();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<BusinessData>({
    resolver: zodResolver(businessSchema),
    mode: 'onChange',
    defaultValues: data.business as BusinessData,
  });

  const formatABN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 10);
  };

  const onSubmit = (formData: BusinessData) => {
    updateData('business', formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Business Details</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Tell us about your restoration business
        </p>

        <div className="space-y-6">
          {/* Business Name */}
          <div>
            <Label htmlFor="businessName">
              Business Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              {...register('businessName')}
              placeholder="Smith Restoration Services"
              className={cn(errors.businessName && 'border-red-500')}
            />
            {errors.businessName && (
              <p className="text-sm text-red-500 mt-1">{errors.businessName.message}</p>
            )}
          </div>

          {/* ABN */}
          <div>
            <Label htmlFor="abn">
              Australian Business Number (ABN) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="abn"
              {...register('abn')}
              placeholder="XX XXX XXX XXX"
              maxLength={14}
              onChange={(e) => {
                const formatted = formatABN(e.target.value);
                setValue('abn', formatted, { shouldValidate: true });
              }}
              className={cn(errors.abn && 'border-red-500')}
            />
            {errors.abn && (
              <p className="text-sm text-red-500 mt-1">{errors.abn.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Format: XX XXX XXX XXX (11 digits)
            </p>
          </div>

          {/* Business Phone */}
          <div>
            <Label htmlFor="businessPhone">
              Business Phone <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="businessPhone"
                {...register('businessPhone')}
                placeholder="0412345678"
                maxLength={10}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue('businessPhone', formatted, { shouldValidate: true });
                }}
                className={cn(errors.businessPhone && 'border-red-500', 'pl-10')}
              />
            </div>
            {errors.businessPhone && (
              <p className="text-sm text-red-500 mt-1">{errors.businessPhone.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Australian mobile number (10 digits starting with 04)
            </p>
          </div>

          {/* Business Address */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Business Address</h3>
            </div>

            <div>
              <Label htmlFor="street">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="street"
                {...register('address.street')}
                placeholder="123 Main Street"
                className={cn(errors.address?.street && 'border-red-500')}
              />
              {errors.address?.street && (
                <p className="text-sm text-red-500 mt-1">{errors.address.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="suburb">
                  Suburb <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="suburb"
                  {...register('address.suburb')}
                  placeholder="Brisbane"
                  className={cn(errors.address?.suburb && 'border-red-500')}
                />
                {errors.address?.suburb && (
                  <p className="text-sm text-red-500 mt-1">{errors.address.suburb.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setValue('address.state', value as any, { shouldValidate: true })}
                  defaultValue={data.business?.address?.state}
                >
                  <SelectTrigger className={cn(errors.address?.state && 'border-red-500')}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {AUSTRALIAN_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.address?.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.address.state.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="postcode">
                Postcode <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postcode"
                {...register('address.postcode')}
                placeholder="4000"
                maxLength={4}
                className={cn(errors.address?.postcode && 'border-red-500')}
              />
              {errors.address?.postcode && (
                <p className="text-sm text-red-500 mt-1">{errors.address.postcode.message}</p>
              )}
            </div>
          </div>

          {/* Years in Business */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <Label htmlFor="yearsInBusiness">
                Years in Business <span className="text-red-500">*</span>
              </Label>
              <Input
                id="yearsInBusiness"
                type="number"
                min="0"
                {...register('yearsInBusiness', { valueAsNumber: true })}
                placeholder="5"
                className={cn(errors.yearsInBusiness && 'border-red-500')}
              />
              {errors.yearsInBusiness && (
                <p className="text-sm text-red-500 mt-1">{errors.yearsInBusiness.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="employeeCount">
                Number of Employees <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue('employeeCount', value as any, { shouldValidate: true })}
                defaultValue={data.business?.employeeCount}
              >
                <SelectTrigger className={cn(errors.employeeCount && 'border-red-500')}>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 employees</SelectItem>
                  <SelectItem value="6-10">6-10 employees</SelectItem>
                  <SelectItem value="11-20">11-20 employees</SelectItem>
                  <SelectItem value="21-50">21-50 employees</SelectItem>
                  <SelectItem value="50+">50+ employees</SelectItem>
                </SelectContent>
              </Select>
              {errors.employeeCount && (
                <p className="text-sm text-red-500 mt-1">{errors.employeeCount.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleSubmit(onSubmit)}
        onBack={prevStep}
        isValid={isValid}
      />
    </form>
  );
}
