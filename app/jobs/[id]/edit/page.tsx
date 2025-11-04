'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/lib/use-toast';
import { Job, ServiceType, JobPriority, JobStatus } from '@/lib/types/job';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const updateJobSchema = z.object({
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
  status: z.enum(['DRAFT', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const),
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
  actualCost: z.number().positive().optional(),
  scheduledDate: z.string().optional(),
  completedDate: z.string().optional(),
  technicianId: z.string().optional(),
  notes: z.string().optional(),
});

type UpdateJobFormData = z.infer<typeof updateJobSchema>;

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

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UpdateJobFormData>({
    resolver: zodResolver(updateJobSchema),
  });

  const watchHasInsurance = watch('hasInsurance');
  const watchStatus = watch('status');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }

        const data = await response.json();
        setJob(data.job);

        // Populate form with existing data
        reset({
          title: data.job.title,
          description: data.job.description,
          clientId: data.job.clientId,
          serviceType: data.job.serviceType,
          priority: data.job.priority,
          status: data.job.status,
          isEmergency: data.job.isEmergency,
          location: data.job.location,
          address: data.job.address,
          suburb: data.job.suburb || '',
          postcode: data.job.postcode || '',
          gpsLatitude: data.job.gpsLatitude,
          gpsLongitude: data.job.gpsLongitude,
          hasInsurance: data.job.hasInsurance,
          insuranceProvider: data.job.insuranceProvider || '',
          claimNumber: data.job.claimNumber || '',
          estimatedCost: data.job.estimatedCost,
          actualCost: data.job.actualCost,
          scheduledDate: data.job.scheduledDate ? data.job.scheduledDate.slice(0, 16) : '',
          completedDate: data.job.completedDate ? data.job.completedDate.slice(0, 16) : '',
          technicianId: data.job.technicianId || '',
          notes: data.job.notes || '',
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job details',
          variant: 'destructive',
        });
        router.push('/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id, reset, router, toast]);

  const onSubmit = async (data: UpdateJobFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update job');
      }

      toast({
        title: 'Job Updated',
        description: `Job #${result.job.jobNumber} has been updated successfully`,
      });

      router.push(`/jobs/${params.id}`);
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update job',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/jobs/${params.id}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Job
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Edit Job</h1>
              <p className="text-muted-foreground mt-1">
                Job #{job.jobNumber} - {job.title}
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
                  <Input id="title" {...register('title')} />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea id="description" {...register('description')} rows={5} />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Service Type, Priority & Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">
                      Service Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('serviceType', value as ServiceType)}
                      value={watch('serviceType')}
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">
                      Priority <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('priority', value as JobPriority)}
                      value={watch('priority')}
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">
                      Status <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('status', value as JobStatus)}
                      value={watch('status')}
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="clientId">
                    Client ID <span className="text-red-500">*</span>
                  </Label>
                  <Input id="clientId" {...register('clientId')} />
                  {errors.clientId && (
                    <p className="text-sm text-red-500">{errors.clientId.message}</p>
                  )}
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
                  <Input id="location" {...register('location')} />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Full Address <span className="text-red-500">*</span>
                  </Label>
                  <Input id="address" {...register('address')} />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input id="suburb" {...register('suburb')} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input id="postcode" {...register('postcode')} />
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpsLongitude">GPS Longitude</Label>
                    <Input
                      id="gpsLongitude"
                      type="number"
                      step="any"
                      {...register('gpsLongitude', { valueAsNumber: true })}
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
                      <Input id="insuranceProvider" {...register('insuranceProvider')} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="claimNumber">Claim Number</Label>
                      <Input id="claimNumber" {...register('claimNumber')} />
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualCost">Actual Cost (AUD)</Label>
                    <Input
                      id="actualCost"
                      type="number"
                      step="0.01"
                      {...register('actualCost', { valueAsNumber: true })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Scheduled Date & Time</Label>
                    <Input id="scheduledDate" type="datetime-local" {...register('scheduledDate')} />
                  </div>

                  {watchStatus === 'COMPLETED' && (
                    <div className="space-y-2">
                      <Label htmlFor="completedDate">Completed Date & Time</Label>
                      <Input
                        id="completedDate"
                        type="datetime-local"
                        {...register('completedDate')}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicianId">Assigned Technician</Label>
                  <Input id="technicianId" {...register('technicianId')} />
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
                  <Textarea id="notes" {...register('notes')} rows={4} />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link href={`/jobs/${params.id}`}>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
