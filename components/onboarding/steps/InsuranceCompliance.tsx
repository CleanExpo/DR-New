'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Calendar, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { insuranceSchema, type InsuranceData } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { DocumentUpload } from '../DocumentUpload';
import { cn } from '@/lib/utils';

export function InsuranceCompliance() {
  const { data, updateData, nextStep, prevStep, currentStep } = useOnboarding();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<InsuranceData>({
    resolver: zodResolver(insuranceSchema),
    mode: 'onChange',
    defaultValues: data.insurance || {
      publicLiability: {},
      workersCompensation: {},
      businessDocuments: {},
    },
  });

  const coverageAmount = watch('publicLiability.coverageAmount');

  const onSubmit = (formData: InsuranceData) => {
    updateData('insurance', formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Insurance & Compliance</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Provide proof of insurance and business compliance documents
        </p>

        <div className="space-y-8">
          {/* Public Liability Insurance */}
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Public Liability Insurance
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>
                    Policy Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('publicLiability.policyNumber')}
                    placeholder="PL-123456789"
                    className={cn(
                      errors.publicLiability?.policyNumber && 'border-red-500',
                      'bg-white'
                    )}
                  />
                  {errors.publicLiability?.policyNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.publicLiability.policyNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    Provider <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('publicLiability.provider')}
                    placeholder="e.g., QBE, Allianz"
                    className={cn(
                      errors.publicLiability?.provider && 'border-red-500',
                      'bg-white'
                    )}
                  />
                  {errors.publicLiability?.provider && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.publicLiability.provider.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>
                    Coverage Amount <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      {...register('publicLiability.coverageAmount', {
                        valueAsNumber: true,
                      })}
                      placeholder="10000000"
                      className={cn(
                        errors.publicLiability?.coverageAmount && 'border-red-500',
                        'pl-8 bg-white'
                      )}
                    />
                  </div>
                  {errors.publicLiability?.coverageAmount && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.publicLiability.coverageAmount.message}
                    </p>
                  )}
                  {coverageAmount && coverageAmount < 10000000 && (
                    <p className="text-sm text-amber-600 mt-1">
                      Minimum $10 million coverage required
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="date"
                      {...register('publicLiability.expiryDate', {
                        valueAsDate: true,
                      })}
                      className={cn(
                        errors.publicLiability?.expiryDate && 'border-red-500',
                        'pl-10 bg-white'
                      )}
                    />
                  </div>
                  {errors.publicLiability?.expiryDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.publicLiability.expiryDate.message}
                    </p>
                  )}
                </div>
              </div>

              <DocumentUpload
                label="Certificate of Currency"
                description="Upload your current public liability insurance certificate"
                accept="image/*,application/pdf"
                maxSize={5 * 1024 * 1024}
                onUpload={(url) =>
                  setValue('publicLiability.certificateUrl', url, {
                    shouldValidate: true,
                  })
                }
                currentFile={watch('publicLiability.certificateUrl')}
              />
              {errors.publicLiability?.certificateUrl && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.publicLiability.certificateUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* Workers Compensation Insurance */}
          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Workers Compensation Insurance
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>
                    Policy Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('workersCompensation.policyNumber')}
                    placeholder="WC-123456789"
                    className={cn(
                      errors.workersCompensation?.policyNumber && 'border-red-500',
                      'bg-white'
                    )}
                  />
                  {errors.workersCompensation?.policyNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.workersCompensation.policyNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    Provider <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('workersCompensation.provider')}
                    placeholder="e.g., WorkCover QLD"
                    className={cn(
                      errors.workersCompensation?.provider && 'border-red-500',
                      'bg-white'
                    )}
                  />
                  {errors.workersCompensation?.provider && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.workersCompensation.provider.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="date"
                    {...register('workersCompensation.expiryDate', {
                      valueAsDate: true,
                    })}
                    className={cn(
                      errors.workersCompensation?.expiryDate && 'border-red-500',
                      'pl-10 bg-white'
                    )}
                  />
                </div>
                {errors.workersCompensation?.expiryDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.workersCompensation.expiryDate.message}
                  </p>
                )}
              </div>

              <DocumentUpload
                label="Certificate of Currency"
                description="Upload your current workers compensation insurance certificate"
                accept="image/*,application/pdf"
                maxSize={5 * 1024 * 1024}
                onUpload={(url) =>
                  setValue('workersCompensation.certificateUrl', url, {
                    shouldValidate: true,
                  })
                }
                currentFile={watch('workersCompensation.certificateUrl')}
              />
              {errors.workersCompensation?.certificateUrl && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.workersCompensation.certificateUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* Business Documents */}
          <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Business Registration Documents
            </h3>

            <div className="space-y-4">
              <DocumentUpload
                label="ABN Certificate"
                description="Upload your official ABN registration certificate"
                accept="image/*,application/pdf"
                maxSize={5 * 1024 * 1024}
                onUpload={(url) =>
                  setValue('businessDocuments.abnCertificateUrl', url, {
                    shouldValidate: true,
                  })
                }
                currentFile={watch('businessDocuments.abnCertificateUrl')}
              />
              {errors.businessDocuments?.abnCertificateUrl && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.businessDocuments.abnCertificateUrl.message}
                </p>
              )}

              <DocumentUpload
                label="Business License (Optional)"
                description="Upload your business license if applicable"
                accept="image/*,application/pdf"
                maxSize={5 * 1024 * 1024}
                onUpload={(url) =>
                  setValue('businessDocuments.businessLicenseUrl', url, {
                    shouldValidate: true,
                  })
                }
                currentFile={watch('businessDocuments.businessLicenseUrl')}
                required={false}
              />
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
