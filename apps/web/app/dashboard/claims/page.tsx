'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  Plus,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  FileText,
  ChevronRight,
  Filter,
  Eye,
  TrendingUp,
  AlertTriangle,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsuranceClaim {
  id: string;
  claimNumber: string | null;
  policyNumber: string;
  status: string;
  damageDescription: string;
  totalClaimAmountAUD: number;
  approvedAmountAUD: number | null;
  paymentAmountAUD: number | null;
  photoCount: number;
  documentCount: number;
  insuranceProvider: string;
  bookingServiceType: string | null;
  bookingDescription: string | null;
  createdAt: string;
  submittedAt: string | null;
  approvedAt: string | null;
}

const STATUS_CONFIG: Record<string, {
  label: string;
  bg: string;
  text: string;
  icon: typeof Clock;
}> = {
  DRAFT: { label: 'Draft', bg: 'bg-white/10', text: 'text-white/60', icon: FileText },
  SUBMITTED: { label: 'Submitted', bg: 'bg-blue-500/20', text: 'text-blue-300', icon: Clock },
  UNDER_REVIEW: { label: 'Under Review', bg: 'bg-amber-500/20', text: 'text-amber-300', icon: Eye },
  APPROVED: { label: 'Approved', bg: 'bg-emerald-500/20', text: 'text-emerald-300', icon: CheckCircle },
  PARTIALLY_APPROVED: { label: 'Partially Approved', bg: 'bg-cyan-500/20', text: 'text-cyan-300', icon: AlertCircle },
  DENIED: { label: 'Denied', bg: 'bg-red-500/20', text: 'text-red-300', icon: XCircle },
  PAYMENT_PROCESSED: { label: 'Payment Processed', bg: 'bg-emerald-500/20', text: 'text-emerald-300', icon: CreditCard },
  CLOSED: { label: 'Closed', bg: 'bg-white/10', text: 'text-white/40', icon: CheckCircle },
};

const SERVICE_TYPES = [
  'WATER_DAMAGE_RESTORATION',
  'FIRE_DAMAGE_RESTORATION',
  'MOULD_REMEDIATION',
  'STORM_DAMAGE',
  'FLOOD_DAMAGE',
  'STRUCTURAL_REPAIR',
  'CONTENT_RESTORATION',
  'OTHER',
];

export default function ClaimsDashboardPage() {
  const router = useRouter();
  const [claims, setClaims] = useState<InsuranceClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newClaimForm, setNewClaimForm] = useState({
    bookingId: '',
    insuranceProvider: '',
    policyNumber: '',
    totalClaimAmountAUD: '',
    damageDescription: '',
  });

  useEffect(() => {
    async function fetchClaims() {
      try {
        const url = filterStatus !== 'all'
          ? `/api/claims?status=${filterStatus}`
          : '/api/claims';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const mapped = (data.data || []).map((c: any) => ({
            id: c.id,
            claimNumber: c.claimNumber,
            policyNumber: c.policyNumber,
            status: c.status,
            damageDescription: c.damageDescription,
            totalClaimAmountAUD: Number(c.totalClaimAmountAUD),
            approvedAmountAUD: c.approvedAmountAUD ? Number(c.approvedAmountAUD) : null,
            paymentAmountAUD: c.paymentAmountAUD ? Number(c.paymentAmountAUD) : null,
            photoCount: c.damagePhotos?.length || 0,
            documentCount: (c.additionalDocuments?.length || 0) + (c.invoiceUrl ? 1 : 0) + (c.estimateUrl ? 1 : 0),
            insuranceProvider: c.insuranceProvider?.name || 'Unknown',
            bookingServiceType: c.booking?.australianServiceType || null,
            bookingDescription: c.booking?.description || null,
            createdAt: c.createdAt,
            submittedAt: c.submittedAt,
            approvedAt: c.approvedAt,
          }));
          setClaims(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch claims:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchClaims();

    if (process.env.NODE_ENV === 'development') {
      setClaims([
        {
          id: 'claim-1',
          claimNumber: 'CLM-2025-0042',
          policyNumber: 'POL-NSW-88421',
          status: 'UNDER_REVIEW',
          damageDescription: 'Significant water damage to living room and kitchen floor following burst pipe. Carpet and underlay require replacement. Subfloor damage evident.',
          totalClaimAmountAUD: 12500,
          approvedAmountAUD: null,
          paymentAmountAUD: null,
          photoCount: 8,
          documentCount: 3,
          insuranceProvider: 'NRMA Insurance',
          bookingServiceType: 'WATER_DAMAGE_RESTORATION',
          bookingDescription: 'Emergency water damage restoration - burst pipe',
          createdAt: '2025-02-15T10:00:00Z',
          submittedAt: '2025-02-16T09:00:00Z',
          approvedAt: null,
        },
        {
          id: 'claim-2',
          claimNumber: 'CLM-2025-0038',
          policyNumber: 'POL-NSW-88421',
          status: 'APPROVED',
          damageDescription: 'Storm damage to roof tiles and gutter system. Multiple tiles displaced, gutter detached on north face.',
          totalClaimAmountAUD: 8200,
          approvedAmountAUD: 7800,
          paymentAmountAUD: null,
          photoCount: 12,
          documentCount: 5,
          insuranceProvider: 'NRMA Insurance',
          bookingServiceType: 'STORM_DAMAGE',
          bookingDescription: 'Storm damage repair - roof and gutters',
          createdAt: '2025-01-20T14:30:00Z',
          submittedAt: '2025-01-21T08:00:00Z',
          approvedAt: '2025-02-05T11:00:00Z',
        },
        {
          id: 'claim-3',
          claimNumber: null,
          policyNumber: 'POL-VIC-33219',
          status: 'DRAFT',
          damageDescription: 'Mould growth discovered in bathroom ceiling and bedroom wall. Suspected water ingress from roof.',
          totalClaimAmountAUD: 4500,
          approvedAmountAUD: null,
          paymentAmountAUD: null,
          photoCount: 3,
          documentCount: 0,
          insuranceProvider: 'Allianz Australia',
          bookingServiceType: 'MOULD_REMEDIATION',
          bookingDescription: null,
          createdAt: '2025-03-01T16:00:00Z',
          submittedAt: null,
          approvedAt: null,
        },
        {
          id: 'claim-4',
          claimNumber: 'CLM-2024-0215',
          policyNumber: 'POL-NSW-88421',
          status: 'PAYMENT_PROCESSED',
          damageDescription: 'Fire damage to kitchen and adjoining laundry. Electrical fault origin. Full restoration required.',
          totalClaimAmountAUD: 35000,
          approvedAmountAUD: 32000,
          paymentAmountAUD: 32000,
          photoCount: 20,
          documentCount: 8,
          insuranceProvider: 'NRMA Insurance',
          bookingServiceType: 'FIRE_DAMAGE_RESTORATION',
          bookingDescription: 'Fire damage restoration - kitchen/laundry',
          createdAt: '2024-11-05T08:00:00Z',
          submittedAt: '2024-11-06T09:30:00Z',
          approvedAt: '2024-12-01T14:00:00Z',
        },
      ]);
      setLoading(false);
    }
  }, [filterStatus]);

  const filtered = claims.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.claimNumber?.toLowerCase().includes(q) ?? false) ||
      c.policyNumber.toLowerCase().includes(q) ||
      c.damageDescription.toLowerCase().includes(q) ||
      c.insuranceProvider.toLowerCase().includes(q)
    );
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });

  const handleSubmitClaim = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newClaimForm,
          totalClaimAmountAUD: parseFloat(newClaimForm.totalClaimAmountAUD),
          damagePhotos: [],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setShowNewClaimModal(false);
        setNewClaimForm({
          bookingId: '',
          insuranceProvider: '',
          policyNumber: '',
          totalClaimAmountAUD: '',
          damageDescription: '',
        });
        if (data.data?.claimId) {
          router.push(`/dashboard/claims/${data.data.claimId}`);
        }
      }
    } catch (err) {
      console.error('Failed to submit claim:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Summary stats
  const totalClaimed = claims.reduce((sum, c) => sum + c.totalClaimAmountAUD, 0);
  const totalApproved = claims.reduce((sum, c) => sum + (c.approvedAmountAUD || 0), 0);
  const activeClaims = claims.filter((c) => !['CLOSED', 'PAYMENT_PROCESSED', 'DENIED'].includes(c.status)).length;

  const getStatusBadge = (status: string) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.DRAFT;
    const Icon = config.icon;
    return (
      <Badge className={cn(config.bg, config.text, 'border-0 rounded-sm text-[10px]')}>
        <Icon className="h-2.5 w-2.5 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Insurance Claims</h1>
            <p className="text-sm text-white/50 mt-1">
              Manage and track your insurance claims
            </p>
          </div>
          <Button
            onClick={() => setShowNewClaimModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-sm bg-blue-500/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Active Claims</p>
                  <p className="text-lg font-bold text-white">{activeClaims}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-sm bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Total Claimed</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(totalClaimed)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-sm bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Total Approved</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(totalApproved)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search by claim number, policy, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/[0.06] text-white placeholder:text-white/30 rounded-sm"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: 'all', label: 'All' },
            { value: 'DRAFT', label: 'Draft' },
            { value: 'SUBMITTED', label: 'Submitted' },
            { value: 'UNDER_REVIEW', label: 'Under Review' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'DENIED', label: 'Denied' },
            { value: 'PAYMENT_PROCESSED', label: 'Paid' },
            { value: 'CLOSED', label: 'Closed' },
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
            <Shield className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/60 mb-2">No claims found</h3>
            <p className="text-sm text-white/40 mb-6">
              {searchQuery ? 'Try a different search term' : 'Submit your first insurance claim to get started'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowNewClaimModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Claim
              </Button>
            )}
          </div>
        )}

        {/* Claims List */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((claim) => (
              <Card
                key={claim.id}
                className="bg-white/[0.02] border-white/[0.06] hover:border-teal-500/30 transition-colors cursor-pointer rounded-sm"
                onClick={() => router.push(`/dashboard/claims/${claim.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-10 w-10 rounded-sm bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="h-5 w-5 text-teal-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-white">
                            {claim.claimNumber || 'Draft Claim'}
                          </p>
                          {getStatusBadge(claim.status)}
                        </div>
                        <p className="text-xs text-white/40 mt-1 line-clamp-2">
                          {claim.damageDescription}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                          <span className="text-xs text-white/30">{claim.insuranceProvider}</span>
                          <span className="text-white/10">&middot;</span>
                          <span className="text-xs text-white/30">Policy: {claim.policyNumber}</span>
                          {claim.bookingServiceType && (
                            <>
                              <span className="text-white/10">&middot;</span>
                              <span className="text-xs text-white/30">
                                {claim.bookingServiceType.replace(/_/g, ' ')}
                              </span>
                            </>
                          )}
                          <span className="text-white/10">&middot;</span>
                          <span className="text-xs text-white/30">{formatDate(claim.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <p className="text-sm font-medium text-white">
                        {formatCurrency(claim.totalClaimAmountAUD)}
                      </p>
                      {claim.approvedAmountAUD !== null && (
                        <p className="text-xs text-emerald-400">
                          Approved: {formatCurrency(claim.approvedAmountAUD)}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {claim.photoCount > 0 && (
                          <span className="text-[10px] text-white/30">
                            {claim.photoCount} photos
                          </span>
                        )}
                        {claim.documentCount > 0 && (
                          <span className="text-[10px] text-white/30">
                            {claim.documentCount} docs
                          </span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/20 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* New Claim Modal */}
      <Dialog open={showNewClaimModal} onOpenChange={setShowNewClaimModal}>
        <DialogContent className="bg-[#0a0a0a] border-white/[0.06] text-white rounded-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Submit Insurance Claim</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white/70 text-sm">Insurance Provider</Label>
              <Input
                value={newClaimForm.insuranceProvider}
                onChange={(e) => setNewClaimForm({ ...newClaimForm, insuranceProvider: e.target.value })}
                placeholder="e.g. NRMA Insurance"
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70 text-sm">Policy Number</Label>
                <Input
                  value={newClaimForm.policyNumber}
                  onChange={(e) => setNewClaimForm({ ...newClaimForm, policyNumber: e.target.value })}
                  placeholder="e.g. POL-NSW-88421"
                  className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Claim Amount (AUD)</Label>
                <Input
                  type="number"
                  value={newClaimForm.totalClaimAmountAUD}
                  onChange={(e) => setNewClaimForm({ ...newClaimForm, totalClaimAmountAUD: e.target.value })}
                  placeholder="0.00"
                  className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/70 text-sm">Damage Description</Label>
              <Textarea
                value={newClaimForm.damageDescription}
                onChange={(e) => setNewClaimForm({ ...newClaimForm, damageDescription: e.target.value })}
                placeholder="Describe the damage in detail..."
                rows={4}
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm resize-none"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm">Booking/Job ID (optional)</Label>
              <Input
                value={newClaimForm.bookingId}
                onChange={(e) => setNewClaimForm({ ...newClaimForm, bookingId: e.target.value })}
                placeholder="Link to an existing job"
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowNewClaimModal(false)}
                className="flex-1 text-white/60 hover:text-white rounded-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitClaim}
                disabled={!newClaimForm.insuranceProvider || !newClaimForm.policyNumber || !newClaimForm.damageDescription || submitting}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
              >
                {submitting ? 'Submitting...' : 'Submit Claim'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
