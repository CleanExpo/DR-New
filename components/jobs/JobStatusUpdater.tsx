'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  dialogue,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/lib/use-toast';
import { JobStatus } from '@/lib/types/job';
import { Loader2 } from 'lucide-react';

interface JobStatusUpdaterProps {
  jobId: string;
  currentStatus: JobStatus;
  onStatusUpdated?: (newStatus: JobStatus) => void;
}

const statusOptions: { value: JobStatus; label: string; description: string }[] = [
  {
    value: 'DRAFT',
    label: 'Draft',
    description: 'Job is being prepared and not yet scheduled'
  },
  {
    value: 'SCHEDULED',
    label: 'Scheduled',
    description: 'Job has been scheduled with a technician'
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    description: 'Technician is actively working on the job'
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    description: 'Job has been successfully completed'
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
    description: 'Job was cancelled and will not be completed'
  },
];

export function JobStatusUpdater({ jobId, currentStatus, onStatusUpdated }: JobStatusUpdaterProps) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<JobStatus>(currentStatus);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (newStatus === currentStatus) {
      toast({
        title: 'No Change',
        description: 'Please select a different status to update.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update job status');
      }

      toast({
        title: 'Status Updated',
        description: `Job status changed to ${statusOptions.find(s => s.value === newStatus)?.label}`,
      });

      setOpen(false);
      setNotes('');

      if (onStatusUpdated) {
        onStatusUpdated(newStatus);
      }

      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating job status:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update job status',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStatusLabel = statusOptions.find(s => s.value === currentStatus)?.label || currentStatus;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Job Status</DialogTitle>
          <DialogDescription>
            Change the status of this job. Current status: <strong>{currentStatusLabel}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Status Selection */}
          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select value={newStatus} onValueChange={(value) => setNewStatus(value as JobStatus)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.value === currentStatus}
                  >
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Notes <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Provide context for why the status is being changed
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setNewStatus(currentStatus);
              setNotes('');
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || newStatus === currentStatus}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Status'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
