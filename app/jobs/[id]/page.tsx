import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JobStatusUpdater } from '@/components/jobs/JobStatusUpdater';
import {
  MapPinIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  WrenchIcon,
  PencilIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Job, JobTimeline } from '@/lib/types/job';

interface JobDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: JobDetailsPageProps): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: 'Job Not Found | NRPG Platform CRM',
    };
  }

  return {
    title: `${job.jobNumber} - ${job.title} | NRPG Platform CRM`,
    description: job.description,
  };
}

async function getJob(id: string): Promise<Job | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/jobs/${id}`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.job;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

async function getJobTimeline(jobId: string): Promise<JobTimeline[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/jobs/${jobId}/timeline`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.timeline || [];
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
}

const priorityConfig = {
  LOW: { colour: 'bg-gray-500', label: 'Low' },
  MEDIUM: { colour: 'bg-blue-500', label: 'Medium' },
  HIGH: { colour: 'bg-orange-500', label: 'High' },
  URGENT: { colour: 'bg-red-500', label: 'Urgent' },
  EMERGENCY: { colour: 'bg-red-600', label: 'Emergency' },
};

const statusConfig = {
  DRAFT: { colour: 'bg-gray-400', label: 'Draft' },
  SCHEDULED: { colour: 'bg-blue-500', label: 'Scheduled' },
  IN_PROGRESS: { colour: 'bg-yellow-500', label: 'In Progress' },
  COMPLETED: { colour: 'bg-green-500', label: 'Completed' },
  CANCELLED: { colour: 'bg-red-500', label: 'Cancelled' },
};

const serviceTypeLabels = {
  WATER_DAMAGE: 'Water Damage Restoration',
  FIRE_DAMAGE: 'Fire & Smoke Damage',
  MOULD_REMEDIATION: 'Mould Remediation',
  STORM_DAMAGE: 'Storm Damage Recovery',
  BIOHAZARD: 'Biohazard Cleaning',
  SEWAGE: 'Sewage Cleanup',
  COMMERCIAL: 'Commercial Restoration',
  CONTENTS_RESTORATION: 'Contents Restoration',
  OTHER: 'Other Service',
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const [job, timeline] = await Promise.all([
    getJob(params.id),
    getJobTimeline(params.id),
  ]);

  if (!job) {
    notFound();
  }

  const priority = priorityConfig[job.priority];
  const status = statusConfig[job.status];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Link href="/jobs">
                  <Button variant="ghost" size="sm">
                    ← Back to Jobs
                  </Button>
                </Link>
                <span className="text-sm font-mono text-muted-foreground">
                  #{job.jobNumber}
                </span>
                {job.isEmergency && (
                  <Badge variant="destructive" className="gap-1">
                    <ExclamationTriangleIcon className="w-3 h-3" />
                    EMERGENCY
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center gap-3">
                <Badge className={`${priority.colour} text-white`}>
                  {priority.label} Priority
                </Badge>
                <Badge className={`${status.colour} text-white`}>
                  {status.label}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <JobStatusUpdater jobId={job.id} currentStatus={job.status} />
              <Link href={`/jobs/${job.id}/edit`}>
                <Button variant="outline" className="gap-2">
                  <PencilIcon className="w-4 h-4" />
                  Edit Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Address</div>
                  <div className="text-base">{job.address}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Suburb</div>
                    <div className="text-base">{job.suburb || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Postcode</div>
                    <div className="text-base">{job.postcode || 'N/A'}</div>
                  </div>
                </div>
                {job.gpsLatitude && job.gpsLongitude && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">GPS Coordinates</div>
                    <div className="text-base font-mono text-sm">
                      {job.gpsLatitude.toFixed(6)}, {job.gpsLongitude.toFixed(6)}
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${job.gpsLatitude},${job.gpsLongitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Equipment & Materials */}
            {(job.equipmentUsed?.length || job.materialsUsed?.length) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WrenchIcon className="w-5 h-5" />
                    Equipment & Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {job.equipmentUsed && job.equipmentUsed.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Equipment Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.equipmentUsed.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {job.materialsUsed && job.materialsUsed.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Materials Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.materialsUsed.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                {timeline.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No activity recorded yet</p>
                ) : (
                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex gap-3 relative"
                      >
                        {index !== timeline.length - 1 && (
                          <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-border" />
                        )}
                        <div className="w-4 h-4 rounded-full bg-primary mt-1 flex-shrink-0 relative z-10" />
                        <div className="flex-1 pb-4">
                          <div className="font-medium">{item.action}</div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{item.performedByName || 'System'}</span>
                            <span>•</span>
                            <span>
                              {new Date(item.timestamp).toLocaleString('en-AU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            {job.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" />
                    Additional Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{job.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <UserIcon className="w-5 h-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Name</div>
                  <div className="text-base">{job.clientName || 'Unknown'}</div>
                </div>
                {job.clientEmail && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <a
                      href={`mailto:${job.clientEmail}`}
                      className="text-base text-blue-600 hover:underline"
                    >
                      {job.clientEmail}
                    </a>
                  </div>
                )}
                {job.clientPhone && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <a
                      href={`tel:${job.clientPhone}`}
                      className="text-base text-blue-600 hover:underline"
                    >
                      {job.clientPhone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Technician Assignment */}
            {job.technicianName && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Assigned Technician</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {job.technicianName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{job.technicianName}</div>
                      <div className="text-sm text-muted-foreground">Technician</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Service Type</div>
                  <div className="text-base">{serviceTypeLabels[job.serviceType]}</div>
                </div>
                {job.scheduledDate && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Scheduled Date</div>
                    <div className="text-base">
                      {new Date(job.scheduledDate).toLocaleString('en-AU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                )}
                {job.completedDate && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Completed Date</div>
                    <div className="text-base">
                      {new Date(job.completedDate).toLocaleString('en-AU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cost Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CurrencyDollarIcon className="w-5 h-5" />
                  Cost Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {job.estimatedCost && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Estimated Cost</div>
                    <div className="text-xl font-bold">
                      ${job.estimatedCost.toLocaleString('en-AU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                )}
                {job.actualCost && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Actual Cost</div>
                    <div className="text-xl font-bold">
                      ${job.actualCost.toLocaleString('en-AU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Insurance Information */}
            {job.hasInsurance && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheckIcon className="w-5 h-5" />
                    Insurance Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {job.insuranceProvider && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Provider</div>
                      <div className="text-base">{job.insuranceProvider}</div>
                    </div>
                  )}
                  {job.claimNumber && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Claim Number</div>
                      <div className="text-base font-mono">{job.claimNumber}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Timestamps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Created</div>
                  <div>
                    {new Date(job.createdAt).toLocaleString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Last Updated</div>
                  <div>
                    {new Date(job.updatedAt).toLocaleString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
