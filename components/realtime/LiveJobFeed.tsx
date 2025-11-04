/**
 * Live Job Feed Component
 * Real-time feed of incoming jobs for contractors
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertCircle,
  Clock,
  MapPin,
  DollarSign,
  Briefcase,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRealtimeUpdates } from '@/lib/hooks/useRealtimeUpdates';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  jobNumber: string;
  title: string;
  customerName: string;
  propertyAddress: string;
  serviceType: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  isEmergency: boolean;
  scheduledStart?: string;
  estimatedDuration?: number;
  estimatedPrice?: number;
  description?: string;
  createdAt: string;
  status: string;
}

export function LiveJobFeed() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [acceptingJob, setAcceptingJob] = useState<string | null>(null);
  const [declinedJobs, setDeclinedJobs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Real-time updates
  const { updates, isConnected } = useRealtimeUpdates({
    events: ['JOB_CREATED', 'JOB_ASSIGNED', 'EMERGENCY_JOB'],
    onConnect: () => console.log('Job feed connected to real-time updates'),
  });

  // Fetch available jobs
  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/jobs/available');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Accept job
  const acceptJob = useCallback(async (jobId: string) => {
    setAcceptingJob(jobId);
    try {
      const response = await fetch(`/api/jobs/${jobId}/accept`, {
        method: 'POST',
      });

      if (response.ok) {
        // Remove job from feed
        setJobs(prev => prev.filter(job => job.id !== jobId));

        // Show success notification
        const audio = new Audio('/sounds/success.mp3');
        audio.play().catch(() => {});
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to accept job');
      }
    } catch (error) {
      console.error('Failed to accept job:', error);
      alert('Failed to accept job. Please try again.');
    } finally {
      setAcceptingJob(null);
    }
  }, []);

  // Decline job
  const declineJob = useCallback((jobId: string) => {
    setDeclinedJobs(prev => new Set([...prev, jobId]));
    setJobs(prev => prev.filter(job => job.id !== jobId));
  }, []);

  // Handle real-time job updates
  useEffect(() => {
    if (updates.length > 0) {
      const latestUpdate = updates[updates.length - 1];

      if (latestUpdate.event === 'JOB_CREATED' || latestUpdate.event === 'EMERGENCY_JOB') {
        const newJob: Job = {
          id: latestUpdate.data.jobId,
          jobNumber: latestUpdate.data.jobNumber,
          title: latestUpdate.data.title,
          customerName: latestUpdate.data.customerName,
          propertyAddress: latestUpdate.data.propertyAddress,
          serviceType: latestUpdate.data.serviceType,
          priority: latestUpdate.data.priority,
          isEmergency: latestUpdate.event === 'EMERGENCY_JOB',
          scheduledStart: latestUpdate.data.scheduledStart,
          estimatedDuration: latestUpdate.data.estimatedDuration,
          estimatedPrice: latestUpdate.data.estimatedPrice,
          description: latestUpdate.data.description,
          createdAt: new Date().toISOString(),
          status: 'PENDING',
        };

        // Don't add if already declined
        if (!declinedJobs.has(newJob.id)) {
          setJobs(prev => [newJob, ...prev]);

          // Play sound for emergency jobs
          if (newJob.isEmergency) {
            const audio = new Audio('/sounds/emergency.mp3');
            audio.play().catch(() => {});
          }
        }
      } else if (latestUpdate.event === 'JOB_ASSIGNED') {
        // Remove assigned jobs from feed
        setJobs(prev => prev.filter(job => job.id !== latestUpdate.data.jobId));
      }
    }
  }, [updates, declinedJobs]);

  // Load initial jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'EMERGENCY':
        return 'bg-red-500';
      case 'HIGH':
        return 'bg-orange-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (priority: string): any => {
    switch (priority) {
      case 'EMERGENCY':
        return 'destructive';
      case 'HIGH':
        return 'default';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Live Job Feed
        </CardTitle>
        <div className="flex items-center gap-2">
          {isConnected && (
            <Badge variant="outline" className="gap-1">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchJobs}
            disabled={isLoading}
          >
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {jobs.filter(job => job.isEmergency).length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {jobs.filter(job => job.isEmergency).length} EMERGENCY job(s) available!
            </AlertDescription>
          </Alert>
        )}

        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading available jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No jobs available at the moment
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className={cn(
                    'relative overflow-hidden transition-all',
                    job.isEmergency && 'border-red-500 shadow-lg animate-pulse-border'
                  )}
                >
                  <div className={cn('absolute left-0 top-0 bottom-0 w-1', getPriorityColor(job.priority))} />

                  <CardContent className="p-4 pl-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            #{job.jobNumber} - {job.title}
                          </h3>
                          {job.isEmergency && (
                            <Badge variant="destructive" className="animate-pulse">
                              EMERGENCY
                            </Badge>
                          )}
                          <Badge variant={getPriorityVariant(job.priority)}>
                            {job.priority}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{job.propertyAddress}</span>
                          </div>

                          {job.scheduledStart && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>
                                {format(new Date(job.scheduledStart), 'MMM d, h:mm a')}
                                {job.estimatedDuration && ` (${job.estimatedDuration} hours)`}
                              </span>
                            </div>
                          )}

                          {job.estimatedPrice && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-3 w-3" />
                              <span>Estimated: ${job.estimatedPrice}</span>
                            </div>
                          )}
                        </div>

                        {job.description && (
                          <p className="text-sm mt-2 line-clamp-2">
                            {job.description}
                          </p>
                        )}
                      </div>

                      <div className="text-right text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => acceptJob(job.id)}
                        disabled={acceptingJob === job.id}
                      >
                        {acceptingJob === job.id ? (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            Accepting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Accept Job
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => declineJob(job.id)}
                        disabled={acceptingJob === job.id}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// Add custom animation for emergency jobs
const style = document.createElement('style');
style.innerHTML = `
  @keyframes pulse-border {
    0%, 100% { border-color: rgb(239 68 68); }
    50% { border-color: rgb(239 68 68 / 0.5); }
  }
  .animate-pulse-border {
    animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;
document.head.appendChild(style);