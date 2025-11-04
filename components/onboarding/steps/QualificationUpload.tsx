'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { qualificationSchema, type QualificationData, IICRC_QUALIFICATIONS } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { DocumentUpload } from '../DocumentUpload';
import { cn } from '@/lib/utils';

export function QualificationUpload() {
  const { data, updateData, nextStep, prevStep, currentStep } = useOnboarding();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<QualificationData>({
    resolver: zodResolver(qualificationSchema),
    mode: 'onChange',
    defaultValues: data.qualifications || {
      qualifications: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'qualifications',
  });

  const addQualification = () => {
    append({
      type: 'WRT' as any,
      certificateNumber: '',
      issueDate: new Date(),
      expiryDate: new Date(),
      certificateUrl: '',
      serviceTypes: [],
    });
  };

  const onSubmit = (formData: QualificationData) => {
    updateData('qualifications', formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">IICRC Qualifications</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Upload your IICRC certifications. You must have at least one valid certification.
        </p>

        <div className="space-y-6">
          {fields.map((field, index) => {
            const selectedType = watch(`qualifications.${index}.type`);
            const qualification = IICRC_QUALIFICATIONS.find((q) => q.value === selectedType);

            return (
              <div
                key={field.id}
                className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50 relative"
              >
                {/* Remove button */}
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="absolute top-3 right-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Qualification #{index + 1}
                </h3>

                <div className="space-y-4">
                  {/* Qualification Type */}
                  <div>
                    <Label>
                      Qualification Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(`qualifications.${index}.type`, value as any, {
                          shouldValidate: true,
                        })
                      }
                      defaultValue={field.type}
                    >
                      <SelectTrigger
                        className={cn(
                          errors.qualifications?.[index]?.type && 'border-red-500'
                        )}
                      >
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {IICRC_QUALIFICATIONS.map((qual) => (
                          <SelectItem key={qual.value} value={qual.value}>
                            {qual.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.qualifications?.[index]?.type && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.qualifications[index]?.type?.message}
                      </p>
                    )}
                  </div>

                  {/* Certificate Number */}
                  <div>
                    <Label>
                      Certificate Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register(`qualifications.${index}.certificateNumber`)}
                      placeholder="e.g., WRT-12345"
                      className={cn(
                        errors.qualifications?.[index]?.certificateNumber && 'border-red-500'
                      )}
                    />
                    {errors.qualifications?.[index]?.certificateNumber && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.qualifications[index]?.certificateNumber?.message}
                      </p>
                    )}
                  </div>

                  {/* Issue and Expiry Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Issue Date <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="date"
                          {...register(`qualifications.${index}.issueDate`, {
                            valueAsDate: true,
                          })}
                          className={cn(
                            errors.qualifications?.[index]?.issueDate && 'border-red-500',
                            'pl-10'
                          )}
                        />
                      </div>
                      {errors.qualifications?.[index]?.issueDate && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.qualifications[index]?.issueDate?.message}
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
                          {...register(`qualifications.${index}.expiryDate`, {
                            valueAsDate: true,
                          })}
                          className={cn(
                            errors.qualifications?.[index]?.expiryDate && 'border-red-500',
                            'pl-10'
                          )}
                        />
                      </div>
                      {errors.qualifications?.[index]?.expiryDate && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.qualifications[index]?.expiryDate?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Types Covered */}
                  {qualification && qualification.services.length > 0 && (
                    <div>
                      <Label className="mb-2 block">
                        Services Covered <span className="text-red-500">*</span>
                      </Label>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-900 mb-2">
                          This certification typically covers:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {qualification.services.map((service) => (
                            <span
                              key={service}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                            >
                              {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Certificate Upload */}
                  <DocumentUpload
                    label="Certificate Upload"
                    description="Upload a clear copy of your IICRC certificate (PDF, JPG, or PNG)"
                    accept="image/*,application/pdf"
                    maxSize={5 * 1024 * 1024}
                    onUpload={(url) =>
                      setValue(`qualifications.${index}.certificateUrl`, url, {
                        shouldValidate: true,
                      })
                    }
                    currentFile={watch(`qualifications.${index}.certificateUrl`)}
                  />
                  {errors.qualifications?.[index]?.certificateUrl && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.qualifications[index]?.certificateUrl?.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add Qualification Button */}
          <Button
            type="button"
            variant="outline"
            onClick={addQualification}
            className="w-full border-dashed border-2 h-20 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Qualification
          </Button>

          {fields.length === 0 && (
            <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <p className="text-amber-900 font-medium mb-2">No qualifications added yet</p>
              <p className="text-sm text-amber-700 mb-4">
                Click the button above to add your first IICRC qualification
              </p>
            </div>
          )}
        </div>
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleSubmit(onSubmit)}
        onBack={prevStep}
        isValid={isValid && fields.length > 0}
      />
    </form>
  );
}
