'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DamageAssessmentUpload, type DamagePhoto } from '@/components/client/DamageAssessmentUpload';

// Form validation schema
const claimSchema = z.object({
  serviceType: z.enum(['emergency', 'restoration', 'cleanup', 'inspection', 'other'], {
    required_error: 'Please select a service type',
  }),
  damageDescription: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  hasInsurance: z.enum(['yes', 'no'], {
    required_error: 'Please indicate if you have insurance',
  }),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
});

type ClaimFormData = z.infer<typeof claimSchema>;

export default function NewClaimPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<DamagePhoto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
    mode: 'onChange',
  });

  const hasInsurance = watch('hasInsurance');
  const damageDescription = watch('damageDescription');

  // Handle photo upload completion
  const handlePhotoUploadComplete = (uploadedPhotos: DamagePhoto[]) => {
    console.log('Photos uploaded:', uploadedPhotos);
  };

  // Submit claim
  const onSubmit = async (data: ClaimFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare categorized photos data
      const categorizedPhotos = photos
        .filter((p) => p.status === 'success' && p.url)
        .map((p) => ({
          url: p.url!,
          damageType: p.damageType,
          roomLocation: p.roomLocation,
          caption: p.caption,
          filename: p.file.name,
          fileSize: p.file.size,
          mimeType: p.file.type,
        }));

      // Prepare claim payload
      const claimPayload = {
        ...data,
        damagePhotos: categorizedPhotos,
      };

      // Submit to API
      const response = await fetch('/api/client/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit claim');
      }

      const result = await response.json();

      // Show success message
      setSubmitSuccess(true);

      // Redirect to claim detail page after delay
      setTimeout(() => {
        router.push(`/dashboard/client/claims/${result.claimId}`);
      }, 2000);
    } catch (error) {
      console.error('Error submitting claim:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit claim. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Claims
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Submit New Claim</h1>
        <p className="text-gray-600 mt-2">
          Provide detailed information about your damage assessment to get matched with the right contractors
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <Alert className="mb-6 border-green-600 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">
            Claim submitted successfully! Redirecting to claim details...
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {submitError && (
        <Alert className="mb-6 border-dr-emergency bg-dr-emergency/10">
          <AlertCircle className="h-5 w-5 text-dr-emergency" />
          <AlertDescription className="text-dr-emergency">
            {submitError}
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Service Type */}
        <Card>
          <CardHeader>
            <CardTitle>Service Required</CardTitle>
            <CardDescription>What type of service do you need?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="service-type">
                Service Type <span className="text-dr-emergency">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue('serviceType', value as any)}
              >
                <SelectTrigger id="service-type">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                  <SelectItem value="restoration">Restoration & Repair</SelectItem>
                  <SelectItem value="cleanup">Cleanup & Remediation</SelectItem>
                  <SelectItem value="inspection">Inspection & Assessment</SelectItem>
                  <SelectItem value="other">Other Services</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-dr-emergency">{errors.serviceType.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Damage Description */}
        <Card>
          <CardHeader>
            <CardTitle>Damage Description</CardTitle>
            <CardDescription>
              Describe the damage in detail to help contractors assess the situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="damage-description">
                Description <span className="text-dr-emergency">*</span>
              </Label>
              <Textarea
                id="damage-description"
                placeholder="Describe what happened, which areas are affected, the extent of damage, and any immediate concerns..."
                className="resize-none h-32"
                maxLength={1000}
                {...register('damageDescription')}
              />
              <div className="flex justify-between text-sm">
                {errors.damageDescription && (
                  <p className="text-dr-emergency">{errors.damageDescription.message}</p>
                )}
                <p className="text-portal-muted ml-auto">
                  {damageDescription?.length || 0}/1000 characters
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload with Categorization */}
        <DamageAssessmentUpload
          photos={photos}
          onPhotosChange={setPhotos}
          maxFiles={10}
          onUploadComplete={handlePhotoUploadComplete}
        />

        {/* Insurance Information */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
            <CardDescription>
              Do you have insurance coverage for this damage?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Has Insurance */}
            <div className="space-y-2">
              <Label>
                Insurance Coverage <span className="text-dr-emergency">*</span>
              </Label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-portal-border rounded-lg cursor-pointer hover:bg-portal-hover transition-colors">
                  <input
                    type="radio"
                    value="yes"
                    className="h-5 w-5 text-semantic-contractor focus:ring-semantic-contractor"
                    {...register('hasInsurance')}
                  />
                  <span className="text-base">Yes, I have insurance</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border border-portal-border rounded-lg cursor-pointer hover:bg-portal-hover transition-colors">
                  <input
                    type="radio"
                    value="no"
                    className="h-5 w-5 text-semantic-contractor focus:ring-semantic-contractor"
                    {...register('hasInsurance')}
                  />
                  <span className="text-base">No, I'll be paying directly</span>
                </label>
              </div>
              {errors.hasInsurance && (
                <p className="text-sm text-dr-emergency">{errors.hasInsurance.message}</p>
              )}
            </div>

            {/* Insurance Provider (conditional) */}
            {hasInsurance === 'yes' && (
              <div className="space-y-4 pt-4 border-t border-portal-border">
                <div className="space-y-2">
                  <Label htmlFor="insurance-provider">
                    Insurance Provider
                  </Label>
                  <input
                    id="insurance-provider"
                    type="text"
                    placeholder="e.g., NRMA, Allianz, QBE"
                    className="w-full px-3 py-2 border border-portal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-semantic-contractor"
                    {...register('insuranceProvider')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-number">
                    Policy Number <span className="text-portal-muted">(Optional)</span>
                  </Label>
                  <input
                    id="policy-number"
                    type="text"
                    placeholder="Your policy number"
                    className="w-full px-3 py-2 border border-portal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-semantic-contractor"
                    {...register('policyNumber')}
                  />
                  <p className="text-sm text-portal-muted">
                    This helps contractors process your claim faster
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Submitted
              </>
            ) : (
              'Submit Claim'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
