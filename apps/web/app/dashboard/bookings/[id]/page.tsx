// @ts-nocheck
'use client';

/**
 * CONN-024: Booking Detail Management
 * CONN-025: Booking Assignment (admin only)
 *
 * GET /api/bookings/[id]  - fetch booking details
 * PATCH /api/bookings/[id] - update notes / date / status
 * DELETE /api/bookings/[id] - cancel booking
 * POST /api/bookings/[id]/assign - assign contractor (admin)
 * DELETE /api/bookings/[id]/assign - remove assignment (admin)
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  MapPin,
  Star,
  Trash2,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  XCircle,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingContractor {
  id: string;
  businessName: string;
  averageRating: number | null;
  completedJobs: number;
  operatingStates: string[];
  australianSpecialties: string[];
}

interface BookingPayment {
  id: string;
  amountAUD: number;
  status: string;
  createdAt: string;
}

interface Booking {
  id: string;
  australianServiceType: string;
  status: string;
  scheduledDate: string | null;
  streetAddress: string;
  serviceSuburb: string;
  serviceState: string;
  servicePostcode: string;
  clientNotes: string | null;
  estimatedCostAUD: number | null;
  contractor: BookingContractor | null;
  payments: BookingPayment[];
  createdAt: string;
  updatedAt: string;
}

interface ContractorOption {
  id: string;
  businessName: string;
  averageRating: number | null;
  isVerified: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  PENDING:     { label: 'Pending',     variant: 'outline' },
  CONFIRMED:   { label: 'Confirmed',   variant: 'default' },
  IN_PROGRESS: { label: 'In Progress', variant: 'secondary' },
  COMPLETED:   { label: 'Completed',   variant: 'default' },
  CANCELLED:   { label: 'Cancelled',   variant: 'destructive' },
  DISPUTED:    { label: 'Disputed',    variant: 'destructive' },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-AU', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatServiceType(type: string): string {
  return type
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const bookingId = params.id as string;

  const isAdmin = user?.userType === 'ADMIN' || user?.userType === 'SUPER_ADMIN';

  // Booking state
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit form state
  const [editNotes, setEditNotes] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [saving, setSaving] = useState(false);

  // Assignment state (admin only)
  const [contractors, setContractors] = useState<ContractorOption[]>([]);
  const [selectedContractorId, setSelectedContractorId] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [loadingContractors, setLoadingContractors] = useState(false);

  // Cancel booking state
  const [cancelling, setCancelling] = useState(false);

  // ── Fetch booking ────────────────────────────────────────────────────────────

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bookings/${bookingId}`, { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to load booking');
        return;
      }

      const b: Booking = data.data;
      setBooking(b);
      setEditNotes(b.clientNotes || '');
      setEditDate(b.scheduledDate ? b.scheduledDate.slice(0, 16) : '');
      setEditStatus(b.status);
    } catch {
      setError('Failed to load booking');
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch available contractors (admin) ──────────────────────────────────────

  const fetchContractors = async () => {
    if (!isAdmin) return;
    try {
      setLoadingContractors(true);
      const res = await fetch('/api/contractors?verified=true&take=100', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setContractors(data.data || data.contractors || []);
      }
    } catch {
      // non-critical — silently ignore
    } finally {
      setLoadingContractors(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    fetchContractors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  // ── Save edits ───────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: Record<string, unknown> = {};
      if (editNotes !== (booking?.clientNotes || '')) body.clientNotes = editNotes;
      if (editDate && editDate !== (booking?.scheduledDate?.slice(0, 16) || '')) {
        body.scheduledDate = editDate;
      }
      if (isAdmin && editStatus !== booking?.status) body.status = editStatus;

      if (Object.keys(body).length === 0) {
        toast.info('No changes to save');
        return;
      }

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to update booking');
        return;
      }

      toast.success('Booking updated');
      await fetchBooking();
    } finally {
      setSaving(false);
    }
  };

  // ── Cancel booking ───────────────────────────────────────────────────────────

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to cancel booking');
        return;
      }

      toast.success('Booking cancelled');
      router.push('/dashboard');
    } finally {
      setCancelling(false);
    }
  };

  // ── Assign contractor (admin) ────────────────────────────────────────────────

  const handleAssign = async () => {
    if (!selectedContractorId) {
      toast.error('Please select a contractor');
      return;
    }
    setAssigning(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorId: selectedContractorId }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to assign contractor');
        return;
      }

      toast.success('Contractor assigned');
      setSelectedContractorId('');
      await fetchBooking();
    } finally {
      setAssigning(false);
    }
  };

  // ── Remove assignment (admin) ────────────────────────────────────────────────

  const handleUnassign = async () => {
    setAssigning(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/assign`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to remove assignment');
        return;
      }

      toast.success('Contractor removed');
      await fetchBooking();
    } finally {
      setAssigning(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <XCircle className="size-12 text-destructive" />
        <p className="text-lg font-medium text-destructive">{error || 'Booking not found'}</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="size-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[booking.status] ?? { label: booking.status, variant: 'outline' };
  const canCancel = booking.status !== 'IN_PROGRESS' && booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Booking Detail</h1>
          <p className="text-sm text-muted-foreground font-mono">{booking.id}</p>
        </div>
        <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
      </div>

      {/* ── Overview card ──────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="size-5 text-primary" />
            Service Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <Building2 className="size-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <p className="font-medium">Service Type</p>
              <p className="text-muted-foreground">{formatServiceType(booking.australianServiceType)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="size-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <p className="font-medium">Scheduled Date</p>
              <p className="text-muted-foreground">{formatDate(booking.scheduledDate)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="size-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-muted-foreground">
                {booking.streetAddress}, {booking.serviceSuburb} {booking.serviceState} {booking.servicePostcode}
              </p>
            </div>
          </div>

          {booking.estimatedCostAUD != null && (
            <div className="flex items-start gap-2">
              <DollarSign className="size-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Estimated Cost</p>
                <p className="text-muted-foreground">
                  ${Number(booking.estimatedCostAUD).toLocaleString('en-AU', { minimumFractionDigits: 2 })} AUD
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2">
            <Clock className="size-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <p className="font-medium">Created</p>
              <p className="text-muted-foreground">{formatDate(booking.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Contractor card ────────────────────────────────────────────────────── */}
      {booking.contractor && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="size-5 text-primary" />
              Assigned Contractor
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <User className="size-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Business</p>
                <p className="text-muted-foreground">{booking.contractor.businessName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="size-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Rating</p>
                <p className="text-muted-foreground">
                  {booking.contractor.averageRating != null
                    ? `${Number(booking.contractor.averageRating).toFixed(1)} / 5`
                    : '—'}
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium">Completed Jobs</p>
              <p className="text-muted-foreground">{booking.contractor.completedJobs}</p>
            </div>
            <div>
              <p className="font-medium">States</p>
              <p className="text-muted-foreground">{booking.contractor.operatingStates.join(', ') || '—'}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Edit form ──────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit Booking</CardTitle>
          <CardDescription>Update notes, reschedule, or change status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="booking-notes">Client Notes</Label>
            <Textarea
              id="booking-notes"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Add any notes about this booking…"
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking-date">Reschedule Date &amp; Time</Label>
            <Input
              id="booking-date"
              type="datetime-local"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          </div>

          {isAdmin && (
            <div className="space-y-1.5">
              <Label htmlFor="booking-status">Status (admin)</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger id="booking-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                    <SelectItem key={val} value={val}>{cfg.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
              Save Changes
            </Button>

            {canCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={cancelling}>
                    {cancelling ? (
                      <Loader2 className="size-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="size-4 mr-2" />
                    )}
                    Cancel Booking
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently cancel the booking. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Yes, Cancel Booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Assignment panel (admin only) ─────────────────────────────────────── */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="size-5 text-primary" />
              Contractor Assignment
            </CardTitle>
            <CardDescription>
              Assign or reassign a verified contractor to this booking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {booking.contractor ? (
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{booking.contractor.businessName}</p>
                  <p className="text-xs text-muted-foreground">Currently assigned</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" disabled={assigning}>
                      <UserMinus className="size-4 mr-1.5" />
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove contractor assignment?</AlertDialogTitle>
                      <AlertDialogDescription>
                        The booking will revert to Pending status and the contractor will be unlinked.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Assignment</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUnassign}>
                        Remove Assignment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No contractor assigned yet.</p>
            )}

            <Separator />

            <div className="space-y-3">
              <Label htmlFor="contractor-select">
                {booking.contractor ? 'Reassign to a different contractor' : 'Assign a contractor'}
              </Label>
              <div className="flex gap-2">
                <Select
                  value={selectedContractorId}
                  onValueChange={setSelectedContractorId}
                  disabled={loadingContractors}
                >
                  <SelectTrigger id="contractor-select" className="flex-1">
                    <SelectValue placeholder={loadingContractors ? 'Loading…' : 'Select contractor'} />
                  </SelectTrigger>
                  <SelectContent>
                    {contractors.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.businessName}
                        {c.averageRating != null && ` — ${Number(c.averageRating).toFixed(1)}★`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAssign} disabled={assigning || !selectedContractorId}>
                  {assigning ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <UserPlus className="size-4" />
                  )}
                  <span className="ml-1.5">Assign</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Payments card ──────────────────────────────────────────────────────── */}
      {booking.payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="size-5 text-primary" />
              Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {booking.payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="font-medium">
                      ${Number(p.amountAUD).toLocaleString('en-AU', { minimumFractionDigits: 2 })} AUD
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(p.createdAt)}</p>
                  </div>
                  <Badge variant={p.status === 'PAID' ? 'default' : 'outline'}>{p.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
