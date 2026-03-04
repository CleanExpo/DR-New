'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Plus,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Calendar,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  status: 'SUBMITTED' | 'ACKNOWLEDGED' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  submittedAt: string;
  scheduledDate: string | null;
  completedAt: string | null;
  contractor: string | null;
  notes: string | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Structural',
  'Roofing',
  'Mould',
  'Water Damage',
  'HVAC',
  'Pest Control',
  'General Repair',
  'Other',
];

const PRIORITIES = [
  { value: 'LOW', label: 'Low', colour: 'text-emerald-400' },
  { value: 'MEDIUM', label: 'Medium', colour: 'text-amber-400' },
  { value: 'HIGH', label: 'High', colour: 'text-orange-400' },
  { value: 'EMERGENCY', label: 'Emergency', colour: 'text-red-400' },
];

export default function MaintenancePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'MEDIUM' as string,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch(`/api/client/properties/${id}/maintenance`);
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests || []);
        }
      } catch (err) {
        console.error('Failed to fetch maintenance requests:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();

    if (process.env.NODE_ENV === 'development') {
      setRequests([
        {
          id: 'maint-1',
          title: 'Leaking tap in bathroom',
          description: 'The hot water tap in the main bathroom has been dripping constantly for the past week.',
          category: 'Plumbing',
          priority: 'MEDIUM',
          status: 'SCHEDULED',
          submittedAt: '2025-02-20T09:00:00Z',
          scheduledDate: '2025-03-08',
          completedAt: null,
          contractor: 'Metro Plumbing',
          notes: 'Contractor confirmed for Saturday morning',
        },
        {
          id: 'maint-2',
          title: 'Mould in bedroom ceiling',
          description: 'Dark spots appearing on the bedroom ceiling corner. Possible water ingress from above.',
          category: 'Mould',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
          submittedAt: '2025-02-15T14:30:00Z',
          scheduledDate: '2025-02-25',
          completedAt: null,
          contractor: 'CleanAir Solutions',
          notes: 'Initial assessment complete. Treatment scheduled.',
        },
        {
          id: 'maint-3',
          title: 'Replace smoke detector battery',
          description: 'Smoke detector in hallway beeping intermittently - needs battery replacement.',
          category: 'General Repair',
          priority: 'LOW',
          status: 'COMPLETED',
          submittedAt: '2025-01-10T08:00:00Z',
          scheduledDate: '2025-01-12',
          completedAt: '2025-01-12T11:00:00Z',
          contractor: null,
          notes: null,
        },
        {
          id: 'maint-4',
          title: 'Power point not working',
          description: 'Double power point in the living room has stopped working. No visible damage.',
          category: 'Electrical',
          priority: 'MEDIUM',
          status: 'SUBMITTED',
          submittedAt: '2025-03-01T16:00:00Z',
          scheduledDate: null,
          completedAt: null,
          contractor: null,
          notes: null,
        },
      ]);
      setLoading(false);
    }
  }, [id]);

  const filtered = filterStatus === 'all'
    ? requests
    : requests.filter((r) => r.status === filterStatus);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/client/properties/${id}/maintenance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setRequests((prev) => [data.request, ...prev]);
        setShowNewModal(false);
        setFormData({ title: '', description: '', category: '', priority: 'MEDIUM' });
      }
    } catch (err) {
      console.error('Failed to submit request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { bg: string; text: string; icon: typeof AlertCircle }> = {
      LOW: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', icon: CheckCircle },
      MEDIUM: { bg: 'bg-amber-500/20', text: 'text-amber-300', icon: AlertCircle },
      HIGH: { bg: 'bg-orange-500/20', text: 'text-orange-300', icon: AlertTriangle },
      EMERGENCY: { bg: 'bg-red-500/20', text: 'text-red-300', icon: AlertTriangle },
    };
    const c = config[priority] || config.MEDIUM;
    const Icon = c.icon;
    return (
      <Badge className={cn(c.bg, c.text, 'border-0 rounded-sm text-[10px]')}>
        <Icon className="h-2.5 w-2.5 mr-1" />
        {priority}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      SUBMITTED: { bg: 'bg-white/10', text: 'text-white/60' },
      ACKNOWLEDGED: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
      SCHEDULED: { bg: 'bg-cyan-500/20', text: 'text-cyan-300' },
      IN_PROGRESS: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
      COMPLETED: { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
    };
    const c = config[status] || config.SUBMITTED;
    return (
      <Badge className={cn(c.bg, c.text, 'border-0 rounded-sm text-[10px]')}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const statusCounts = requests.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/dashboard/property/${id}`)}
          className="text-white/50 hover:text-white mb-6 -ml-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Property Details
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Maintenance Requests</h1>
            <p className="text-sm text-white/50 mt-1">
              {requests.length} total &middot; {statusCounts['IN_PROGRESS'] || 0} in progress
            </p>
          </div>
          <Button
            onClick={() => setShowNewModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: 'all', label: 'All' },
            { value: 'SUBMITTED', label: 'Submitted' },
            { value: 'ACKNOWLEDGED', label: 'Acknowledged' },
            { value: 'SCHEDULED', label: 'Scheduled' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'COMPLETED', label: 'Completed' },
          ].map((f) => (
            <Button
              key={f.value}
              variant="ghost"
              size="sm"
              onClick={() => setFilterStatus(f.value)}
              className={cn(
                'rounded-sm text-xs',
                filterStatus === f.value
                  ? 'bg-teal-500/20 text-teal-300'
                  : 'text-white/40 hover:text-white'
              )}
            >
              {f.label}
              {f.value !== 'all' && statusCounts[f.value] ? (
                <span className="ml-1.5 text-[10px] opacity-60">({statusCounts[f.value]})</span>
              ) : null}
            </Button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <Wrench className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/60 mb-2">No maintenance requests</h3>
            <p className="text-sm text-white/40 mb-6">
              {filterStatus !== 'all' ? 'No requests with this status' : 'Submit your first maintenance request'}
            </p>
          </div>
        )}

        {/* Request List */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((req) => (
              <Card
                key={req.id}
                className="bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] transition-colors rounded-sm"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-9 w-9 rounded-sm bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Wrench className="h-4 w-4 text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{req.title}</p>
                        <p className="text-xs text-white/40 mt-1 line-clamp-2">{req.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs text-white/30">{req.category}</span>
                          <span className="text-white/10">&middot;</span>
                          <span className="text-xs text-white/30">
                            Submitted {new Date(req.submittedAt).toLocaleDateString('en-AU')}
                          </span>
                          {req.contractor && (
                            <>
                              <span className="text-white/10">&middot;</span>
                              <span className="text-xs text-white/30">{req.contractor}</span>
                            </>
                          )}
                          {req.scheduledDate && (
                            <>
                              <span className="text-white/10">&middot;</span>
                              <span className="text-xs text-cyan-400/60 flex items-center gap-1">
                                <Calendar className="h-2.5 w-2.5" />
                                {req.scheduledDate}
                              </span>
                            </>
                          )}
                        </div>
                        {req.notes && (
                          <p className="text-xs text-white/30 mt-2 bg-white/[0.03] rounded-sm p-2 italic">
                            {req.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      {getPriorityBadge(req.priority)}
                      {getStatusBadge(req.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* New Request Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="bg-[#0a0a0a] border-white/[0.06] text-white rounded-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">New Maintenance Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white/70 text-sm">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the issue"
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide details about the maintenance issue..."
                rows={4}
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70 text-sm">Category</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/[0.06] rounded-sm">
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c} className="text-white">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Priority</Label>
                <Select
                  defaultValue="MEDIUM"
                  onValueChange={(v) => setFormData({ ...formData, priority: v })}
                >
                  <SelectTrigger className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/[0.06] rounded-sm">
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value} className="text-white">
                        <span className={p.colour}>{p.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowNewModal(false)}
                className="flex-1 text-white/60 hover:text-white rounded-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.category || submitting}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
