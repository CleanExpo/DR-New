'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircle,
  Edit,
  Building2,
  Briefcase,
  Award,
  Shield,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { reviewSchema, type ReviewData, SERVICE_TYPES, COVERAGE_TIERS } from '@/lib/validation/onboarding';
import { useOnboarding } from '@/lib/contexts/OnboardingContext';
import { StepNavigation } from '../StepNavigation';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export function ReviewSubmit() {
  const { data, goToStep, currentStep, resetOnboarding } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['account']));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReviewData>({
    resolver: zodResolver(reviewSchema),
    mode: 'onChange',
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const onSubmit = async (formData: ReviewData) => {
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/contractor/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          review: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();

      toast.success('Application submitted successfully!');

      // Clear onboarding data
      resetOnboarding();

      // Redirect to success page or dashboard
      window.location.href = '/onboarding/success';
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServices = data.services?.services || [];
  const selectedTier = COVERAGE_TIERS.find((t) => t.id === data.coverage?.tier);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Review your application details before submitting. Click the edit button to make changes to any
          section.
        </p>

        <div className="space-y-4">
          {/* Account Details */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('account')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Account Details</h3>
              </div>
              {expandedSections.has('account') ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has('account') && (
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-gray-900 font-medium">{data.account?.fullName || 'N/A'}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(0)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">{data.account?.email || 'N/A'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Business Details */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('business')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
              </div>
              {expandedSections.has('business') ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has('business') && (
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Business Name</p>
                    <p className="text-gray-900 font-medium">{data.business?.businessName || 'N/A'}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(1)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ABN</p>
                    <p className="text-gray-900 font-medium">{data.business?.abn || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900 font-medium">{data.business?.businessPhone || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-gray-900 font-medium">
                    {data.business?.address?.street && data.business?.address?.suburb
                      ? `${data.business.address.street}, ${data.business.address.suburb}, ${data.business.address.state} ${data.business.address.postcode}`
                      : 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('services')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Services ({selectedServices.length})
                </h3>
              </div>
              {expandedSections.has('services') ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has('services') && (
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((serviceId) => {
                      const service = SERVICE_TYPES.find((s) => s.id === serviceId);
                      return (
                        <span
                          key={serviceId}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {service?.icon} {service?.name}
                        </span>
                      );
                    })}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(2)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Qualifications */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('qualifications')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  IICRC Qualifications ({data.qualifications?.qualifications?.length || 0})
                </h3>
              </div>
              {expandedSections.has('qualifications') ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has('qualifications') && (
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2 flex-1">
                    {data.qualifications?.qualifications?.map((qual, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-900">{qual.type}</span>
                        <span className="text-gray-500 text-sm">
                          (#{qual.certificateNumber})
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(3)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Insurance */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('insurance')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Insurance & Compliance</h3>
              </div>
              {expandedSections.has('insurance') ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has('insurance') && (
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-sm text-gray-600">Public Liability</p>
                      <p className="text-gray-900">
                        ${(data.insurance?.publicLiability?.coverageAmount || 0).toLocaleString()} - {data.insurance?.publicLiability?.provider}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Workers Compensation</p>
                      <p className="text-gray-900">{data.insurance?.workersCompensation?.provider}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(4)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Coverage */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('coverage')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Coverage & Subscription</h3>
              </div>
              {expandedSections.has('coverage') ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has('coverage') && (
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-sm text-gray-600">Plan</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTier?.name} - ${selectedTier?.price}/month
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Coverage Radius</p>
                      <p className="text-gray-900">{selectedTier?.radius}km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Base Location</p>
                      <p className="text-gray-900">{data.coverage?.baseLocation?.address || 'N/A'}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(5)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Terms */}
        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Checkbox
              id="finalTermsAccepted"
              {...register('finalTermsAccepted')}
              className={cn(errors.finalTermsAccepted && 'border-red-500')}
            />
            <div className="flex-1">
              <Label htmlFor="finalTermsAccepted" className="text-sm text-gray-700 cursor-pointer">
                I confirm that all information provided is accurate and complete. I understand that my
                application will be reviewed by the NRPG team within 24-48 hours. I agree to the{' '}
                <a href="/contractor-terms" target="_blank" className="text-blue-600 hover:underline">
                  Contractor Terms of Service
                </a>
                .
                <span className="text-red-500 ml-1">*</span>
              </Label>
              {errors.finalTermsAccepted && (
                <p className="text-sm text-red-500 mt-1">{errors.finalTermsAccepted.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submission Info */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Your application will be reviewed by our verification team</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>We'll verify your IICRC certifications and insurance documents</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>You'll receive an email within 24-48 hours with the approval status</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Once approved, you'll get access to your contractor dashboard and start receiving job alerts</span>
            </li>
          </ul>
        </div>
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={7}
        onNext={handleSubmit(onSubmit)}
        onBack={() => goToStep(5)}
        isValid={isValid}
        isSubmitting={isSubmitting}
        nextLabel="Submit Application"
      />
    </form>
  );
}
