'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPinIcon,
  UserIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Job } from '@/lib/types/job';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
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
  WATER_DAMAGE: 'Water Damage',
  FIRE_DAMAGE: 'Fire & Smoke',
  MOULD_REMEDIATION: 'Mould Remediation',
  STORM_DAMAGE: 'Storm Damage',
  BIOHAZARD: 'Biohazard',
  SEWAGE: 'Sewage',
  COMMERCIAL: 'Commercial',
  CONTENTS_RESTORATION: 'Contents Restoration',
  OTHER: 'Other',
};

export function JobCard({ job, onClick }: JobCardProps) {
  const priority = priorityConfig[job.priority];
  const status = statusConfig[job.status];

  return (
    <Link href={`/jobs/${job.id}`} onClick={onClick}>
      <Card className={cn(
        "hover:shadow-lg transition-all cursor-pointer border-l-4",
        priority.colour.replace('bg-', 'border-l-'),
        job.isEmergency && "ring-2 ring-red-500 ring-offset-2"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground">
                  #{job.jobNumber}
                </span>
                {job.isEmergency && (
                  <Badge variant="destructive" className="gap-1">
                    <ExclamationTriangleIcon className="w-3 h-3" />
                    EMERGENCY
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={cn(priority.colour, "text-white")}>
                {priority.label}
              </Badge>
              <Badge className={cn(status.colour, "text-white")}>
                {status.label}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Service Type */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-muted-foreground">Service:</span>
            <span>{serviceTypeLabels[job.serviceType]}</span>
          </div>

          {/* Client */}
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{job.clientName || 'Unknown Client'}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{job.location}</span>
          </div>

          {/* Technician */}
          {job.technicianName && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">
                  {job.technicianName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="truncate">{job.technicianName}</span>
            </div>
          )}

          {/* Scheduled Date */}
          {job.scheduledDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {new Date(job.scheduledDate).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}

          {/* Time since creation */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
            <ClockIcon className="w-3 h-3" />
            <span>Created {formatRelativeTime(job.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}
