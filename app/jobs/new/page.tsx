'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/lib/use-toast';
import { CreateJobData, ServiceType, JobPriority } from '@/lib/types/job';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const createJobSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  clientId: z.string().min(1, 'Client is required'),
  serviceType: z.enum([
    'WATER_DAMAGE',
    'FIRE_DAMAGE',
    'MOULD_REMEDIATION',
    'STORM_DAMAGE',
    'BIOHAZARD',
    'SEWAGE',
    'COMMERCIAL',
    'CONTENTS_RESTORATION',
    'OTHER',
  ] as const),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'EMERGENCY'] as const),
  isEmergency: z.boolean(),
  location: z.string().min(3, 'Location is required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  suburb: z.string().optional(),
  postcode: z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits').optional().or(z.literal('')),
  gpsLatitude: z.number().min(-90).max(90).optional(),
  gpsLongitude: z.number().min(-180).max(180).optional(),
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  claimNumber: z.string().optional(),
  estimatedCost: z.number().positive().optional(),
  scheduledDate: z.string().optional(),
  technicianId: z.string().optional(),
  notes: z.string().optional(),
});

type CreateJobFormData = z.infer<typeof createJobSchema>;

const serviceTypeOptions = [
  { value: 'WATER_DAMAGE', label: 'Water Damage Restoration' },
  { value: 'FIRE_DAMAGE', label: 'Fire & Smoke Damage' },
  { value: 'MOULD_REMEDIATION', label: 'Mould Remediation' },
  { value: 'STORM_DAMAGE', label: 'Storm Damage Recovery' },
  { value: 'BIOHAZARD', label: 'Biohazard Cleaning' },
  { value: 'SEWAGE', label: 'Sewage Cleanup' },
  { value: 'COMMERCIAL', label: 'Commercial Restoration' },
  { value: 'CONTENTS_RESTORATION', label: 'Contents Restoration' },
  { value: 'OTHER', label: 'Other Service' },
];

const priorityOptions = [
  { value: 'LOW', label: 'Low', colour: 'text-gray-600' },
  { value: 'MEDIUM', label: 'Medium', colour: 'text-blue-600' },
  { value: 'HIGH', label: 'High', colour: 'text-orange-600' },
  { value: 'URGENT', label: 'Urgent', colour: 'text-red-600' },
  { value: 'EMERGENCY', label: 'Emergency', colour: 'text-red-700 font-bold' },
];

export default function CreateJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      isEmergency: false,
      hasInsurance: false,
      priority: 'MEDIUM',
      serviceType: 'WATER_DAMAGE',
    },
  });

  const watchIsEmergency = watch('isEmergency');
  const watchHasInsurance = watch('hasInsurance');

  const onSubmit = async (data: CreateJobFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create job');
      }

      toast({
        title: 'Job Created',
        description: `Job #${result.job.jobNumber} has been created successfully`,
      });

      router.push(`/jobs/${result.job.id}`);
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create job',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Jobs
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Create New Job</h1>
              <p className="text-muted-foreground mt-1">
                Fill in the details to create a new restoration job
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="e.g. Emergency water damage restoration"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe the job requirements, damage assessment, and scope of work..."
                    rows={5}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Service Type & Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">
                      Service Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('serviceType', value as ServiceType)}
                      defaultValue="WATER_DAMAGE"
                    >
                      <SelectTrigger id="serviceType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && (
                      <p className="text-sm text-red-500">{errors.serviceType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">
                      Priority <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('priority', value as JobPriority)}
                      defaultValue="MEDIUM"
                    >
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className={option.colour}>{option.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <p className="text-sm text-red-500">{errors.priority.message}</p>
                    )}
                  </div>
                </div>

                {/* Emergency Flag */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isEmergency"
                    {...register('isEmergency')}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="isEmergency" className="cursor-pointer">
                    Mark as Emergency
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientId">
                    Client <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="clientId"
                    {...register('clientId')}
                    placeholder="Client ID or reference number"
                  />
                  {errors.clientId && (
                    <p className="text-sm text-red-500">{errors.clientId.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Enter the client's ID from the CRM system
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="e.g. Brisbane CBD, Ipswich"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Full Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="123 Main Street, Brisbane QLD 4000"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input id="suburb" {...register('suburb')} placeholder="Brisbane" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input id="postcode" {...register('postcode')} placeholder="4000" />
                    {errors.postcode && (
                      <p className="text-sm text-red-500">{errors.postcode.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gpsLatitude">GPS Latitude</Label>
                    <Input
                      id="gpsLatitude"
                      type="number"
                      step="any"
                      {...register('gpsLatitude', { valueAsNumber: true })}
                      placeholder="-27.4698"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpsLongitude">GPS Longitude</Label>
                    <Input
                      id="gpsLongitude"
                      type="number"
                      step="any"
                      {...register('gpsLongitude', { valueAsNumber: true })}
                      placeholder="153.0251"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Information */}
            <Card>
              <CardHeader>
                <CardTitle>Insurance Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasInsurance"
                    {...register('hasInsurance')}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="hasInsurance" className="cursor-pointer">
                    Insurance Claim
                  </Label>
                </div>

                {watchHasInsurance && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        {...register('insuranceProvider')}
                        placeholder="e.g. QBE, Allianz, RACQ"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="claimNumber">Claim Number</Label>
                      <Input
                        id="claimNumber"
                        {...register('claimNumber')}
                        placeholder="Insurance claim reference number"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Cost & Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle>Cost & Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCost">Estimated Cost (AUD)</Label>
                    <Input
                      id="estimatedCost"
                      type="number"
                      step="0.01"
                      {...register('estimatedCost', { valueAsNumber: true })}
                      placeholder="0.00"
                    />
                    {errors.estimatedCost && (
                      <p className="text-sm text-red-500">{errors.estimatedCost.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Scheduled Date & Time</Label>
                    <Input
                      id="scheduledDate"
                      type="datetime-local"
                      {...register('scheduledDate')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicianId">Assign Technician (Optional)</Label>
                  <Input
                    id="technicianId"
                    {...register('technicianId')}
                    placeholder="Technician ID"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to assign later
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    {...register('notes')}
                    placeholder="Add any additional information, special instructions, or internal notes..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link href="/jobs">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Job'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
