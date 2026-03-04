'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
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
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  DollarSign,
  FileText,
  Upload,
  Download,
  Image,
  File,
  CreditCard,
  Building2,
  User,
  Calendar,
  MapPin,
  Wrench,
  Printer,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimDetail {
  id: string;
  claimNumber: string | null;
  policyNumber: string;
  status: string;
  damageDescription: string;
  totalClaimAmountAUD: number;
  approvedAmountAUD: number | null;
  paymentAmountAUD: number | null;
  damagePhotos: string[];
  invoiceUrl: string | null;
  estimateUrl: string | null;
  additionalDocuments: string[];
  denialReason: string | null;
  insuranceProvider: {
    name: string;
    code: string;
    contactEmail: string;
    contactPhone: string;
  };
  booking: {
    id: string;
    australianServiceType: string;
    description: string;
    streetAddress: string;
    serviceSuburb: string;
    servicePostcode: string;
    serviceState: string;
    estimatedCostAUD: number;
    finalCostAUD: number | null;
    status: string;
    contractor: {
      businessName: string;
    } | null;
  } | null;
  timeline: {
    created: string;
    submitted: string | null;
    reviewed: string | null;
    approved: string | null;
    denied: string | null;
    paid: string | null;
  };
}

interface ClaimDocument {
  id: string;
  name: string;
  category: string;
  url: string;
  uploadedAt: string;
}

interface ClaimReport {
  generatedAt: string;
  claimId: string;
  claimNumber: string | null;
  status: string;
  client: { name: string; email: string; address: string };
  insurance: { provider: string; policyNumber: string };
  damage: { description: string; photoCount: number };
  financials: {
    totalClaimAmount: number;
    approvedAmount: number | null;
    paymentAmount: number | null;
    estimatedJobCost: number | null;
    finalJobCost: number | null;
  };
  job: {
    id: string;
    serviceType: string;
    status: string;
    contractor: { businessName: string } | null;
  } | null;
  timeline: Record<string, string | null>;
}

interface PageProps {
  params: Promise<{ claimId: string }>;
}

const STATUS_CONFIG: Record<string, {
  label: string;
  bg: string;
  text: string;
  icon: typeof Clock;
  description: string;
}> = {
  DRAFT: { label: 'Draft', bg: 'bg-white/10', text: 'text-white/60', icon: FileText, description: 'Claim has been created but not yet submitted' },
  SUBMITTED: { label: 'Submitted', bg: 'bg-blue-500/20', text: 'text-blue-300', icon: Clock, description: 'Claim submitted to insurance provider' },
  UNDER_REVIEW: { label: 'Under Review', bg: 'bg-amber-500/20', text: 'text-amber-300', icon: Eye, description: 'Insurance provider is reviewing your claim' },
  APPROVED: { label: 'Approved', bg: 'bg-emerald-500/20', text: 'text-emerald-300', icon: CheckCircle, description: 'Claim has been approved' },
  PARTIALLY_APPROVED: { label: 'Partially Approved', bg: 'bg-cyan-500/20', text: 'text-cyan-300', icon: AlertCircle, description: 'Claim partially approved' },
  DENIED: { label: 'Denied', bg: 'bg-red-500/20', text: 'text-red-300', icon: XCircle, description: 'Claim has been denied' },
  PAYMENT_PROCESSED: { label: 'Payment Processed', bg: 'bg-emerald-500/20', text: 'text-emerald-300', icon: CreditCard, description: 'Payment has been processed' },
  CLOSED: { label: 'Closed', bg: 'bg-white/10', text: 'text-white/40', icon: CheckCircle, description: 'Claim is closed' },
};

const TIMELINE_STEPS = [
  { key: 'created', label: 'Created' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'approved', label: 'Approved' },
  { key: 'paid', label: 'Paid' },
];

export default function ClaimDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { claimId } = use(params);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [claim, setClaim] = useState<ClaimDetail | null>(null);
  const [documents, setDocuments] = useState<ClaimDocument[]>([]);
  const [report, setReport] = useState<ClaimReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('supporting');
  const [expandTimeline, setExpandTimeline] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [claimRes, docsRes] = await Promise.all([
          fetch(`/api/claims/${claimId}`),
          fetch(`/api/claims/${claimId}/documents`),
        ]);

        if (claimRes.ok) {
          const data = await claimRes.json();
          const c = data.data;
          setClaim({
            id: c.id,
            claimNumber: c.claimNumber,
            policyNumber: c.policyNumber,
            status: c.status,
            damageDescription: c.damageDescription,
            totalClaimAmountAUD: Number(c.totalClaimAmountAUD),
            approvedAmountAUD: c.approvedAmountAUD ? Number(c.approvedAmountAUD) : null,
            paymentAmountAUD: c.paymentAmountAUD ? Number(c.paymentAmountAUD) : null,
            damagePhotos: c.damagePhotos || [],
            invoiceUrl: c.invoiceUrl,
            estimateUrl: c.estimateUrl,
            additionalDocuments: c.additionalDocuments || [],
            denialReason: c.denialReason,
            insuranceProvider: c.insuranceProvider,
            booking: c.booking
              ? {
                  ...c.booking,
                  estimatedCostAUD: Number(c.booking.estimatedCostAUD),
                  finalCostAUD: c.booking.finalCostAUD ? Number(c.booking.finalCostAUD) : null,
                }
              : null,
            timeline: {
              created: c.createdAt,
              submitted: c.submittedAt,
              reviewed: c.reviewedAt,
              approved: c.approvedAt,
              denied: c.deniedAt,
              paid: c.paidAt,
            },
          });
        }

        if (docsRes.ok) {
          const data = await docsRes.json();
          setDocuments(data.documents || []);
        }
      } catch (err) {
        console.error('Failed to fetch claim:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    if (process.env.NODE_ENV === 'development') {
      setClaim({
        id: claimId,
        claimNumber: 'CLM-2025-0042',
        policyNumber: 'POL-NSW-88421',
        status: 'UNDER_REVIEW',
        damageDescription: 'Significant water damage to living room and kitchen floor following burst pipe. Carpet and underlay require replacement. Subfloor damage evident. Moisture readings above acceptable levels.',
        totalClaimAmountAUD: 12500,
        approvedAmountAUD: null,
        paymentAmountAUD: null,
        damagePhotos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg'],
        invoiceUrl: 'invoice.pdf',
        estimateUrl: 'estimate.pdf',
        additionalDocuments: ['plumber-report.pdf'],
        denialReason: null,
        insuranceProvider: {
          name: 'NRMA Insurance',
          code: 'NRMA',
          contactEmail: 'claims@nrma.com.au',
          contactPhone: '13 11 23',
        },
        booking: {
          id: 'booking-1',
          australianServiceType: 'WATER_DAMAGE_RESTORATION',
          description: 'Emergency water damage restoration - burst pipe in kitchen',
          streetAddress: '42 Harbour Street',
          serviceSuburb: 'Sydney',
          servicePostcode: '2000',
          serviceState: 'NSW',
          estimatedCostAUD: 11000,
          finalCostAUD: null,
          status: 'IN_PROGRESS',
          contractor: { businessName: 'Sydney Restoration Pro' },
        },
        timeline: {
          created: '2025-02-15T10:00:00Z',
          submitted: '2025-02-16T09:00:00Z',
          reviewed: null,
          approved: null,
          denied: null,
          paid: null,
        },
      });
      setDocuments([
        { id: 'photo-0', name: 'Damage Photo 1', category: 'Damage Photo', url: '#', uploadedAt: '2025-02-15T10:00:00Z' },
        { id: 'photo-1', name: 'Damage Photo 2', category: 'Damage Photo', url: '#', uploadedAt: '2025-02-15T10:00:00Z' },
        { id: 'photo-2', name: 'Damage Photo 3', category: 'Damage Photo', url: '#', uploadedAt: '2025-02-15T10:00:00Z' },
        { id: 'invoice', name: 'Contractor Invoice', category: 'Invoice', url: '#', uploadedAt: '2025-02-20T14:00:00Z' },
        { id: 'estimate', name: 'Cost Estimate', category: 'Quote', url: '#', uploadedAt: '2025-02-16T08:00:00Z' },
        { id: 'doc-0', name: 'Plumber Assessment Report', category: 'Supporting', url: '#', uploadedAt: '2025-02-18T11:30:00Z' },
      ]);
      setLoading(false);
    }
  }, [claimId]);

  const generateReport = async () => {
    setReportLoading(true);
    try {
      const res = await fetch(`/api/claims/${claimId}/report`);
      if (res.ok) {
        const data = await res.json();
        setReport(data.report);
        setShowReport(true);
      }
    } catch (err) {
      console.error('Failed to generate report:', err);
    } finally {
      setReportLoading(false);
    }

    if (process.env.NODE_ENV === 'development') {
      setReport({
        generatedAt: new Date().toISOString(),
        claimId: claimId,
        claimNumber: 'CLM-2025-0042',
        status: 'UNDER_REVIEW',
        client: { name: 'Jane Smith', email: 'jane@example.com', address: '42 Harbour Street, Sydney, NSW 2000' },
        insurance: { provider: 'NRMA Insurance', policyNumber: 'POL-NSW-88421' },
        damage: { description: 'Significant water damage to living room and kitchen floor following burst pipe.', photoCount: 5 },
        financials: {
          totalClaimAmount: 12500,
          approvedAmount: null,
          paymentAmount: null,
          estimatedJobCost: 11000,
          finalJobCost: null,
        },
        job: { id: 'booking-1', serviceType: 'WATER_DAMAGE_RESTORATION', status: 'IN_PROGRESS', contractor: { businessName: 'Sydney Restoration Pro' } },
        timeline: { created: '2025-02-15T10:00:00Z', submitted: '2025-02-16T09:00:00Z' },
      });
      setShowReport(true);
      setReportLoading(false);
    }
  };

  const handleDocUpload = async (url: string) => {
    try {
      const res = await fetch(`/api/claims/${claimId}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, category: uploadCategory }),
      });
      if (res.ok) {
        // Refresh documents
        const docsRes = await fetch(`/api/claims/${claimId}/documents`);
        if (docsRes.ok) {
          const data = await docsRes.json();
          setDocuments(data.documents || []);
        }
        setShowUploadModal(false);
      }
    } catch (err) {
      console.error('Failed to upload document:', err);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFileIcon = (category: string) => {
    if (category.includes('Photo')) return Image;
    return FileText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <Shield className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white/60">Claim not found</h3>
          <Button
            onClick={() => router.push('/dashboard/claims')}
            className="mt-4 bg-teal-600 hover:bg-teal-700 rounded-sm"
          >
            Back to Claims
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[claim.status] || STATUS_CONFIG.DRAFT;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/claims')}
          className="text-white/50 hover:text-white mb-6 -ml-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          All Claims
        </Button>

        {/* Claim Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-sm bg-teal-500/10 flex items-center justify-center shrink-0">
              <Shield className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {claim.claimNumber || 'Draft Claim'}
                </h1>
                <Badge className={cn(statusConfig.bg, statusConfig.text, 'border-0 rounded-sm text-xs')}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig.label}
                </Badge>
              </div>
              <p className="text-sm text-white/50 mt-1">{statusConfig.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowUploadModal(true)}
              className="text-white/60 hover:text-white rounded-sm border border-white/[0.06]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button
              onClick={generateReport}
              disabled={reportLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
            >
              <Printer className="h-4 w-4 mr-2" />
              {reportLoading ? 'Generating...' : 'Summary Report'}
            </Button>
          </div>
        </div>

        {/* Status Timeline */}
        <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm mb-6">
          <CardHeader className="pb-2">
            <button
              onClick={() => setExpandTimeline(!expandTimeline)}
              className="flex items-center justify-between w-full"
            >
              <CardTitle className="text-sm font-medium text-white/70">Claim Timeline</CardTitle>
              {expandTimeline ? (
                <ChevronUp className="h-4 w-4 text-white/30" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/30" />
              )}
            </button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-0 overflow-x-auto pb-2">
              {TIMELINE_STEPS.map((step, i) => {
                const date = claim.timeline[step.key as keyof typeof claim.timeline];
                const isComplete = !!date;
                const isDenied = step.key === 'approved' && claim.timeline.denied;
                const isCurrent =
                  isComplete &&
                  (i === TIMELINE_STEPS.length - 1 ||
                    !claim.timeline[TIMELINE_STEPS[i + 1].key as keyof typeof claim.timeline]);

                return (
                  <div key={step.key} className="flex items-center flex-1 min-w-0">
                    <div className="flex flex-col items-center min-w-[60px]">
                      <div
                        className={cn(
                          'h-6 w-6 rounded-full flex items-center justify-center text-[10px]',
                          isDenied
                            ? 'bg-red-500/20 text-red-300'
                            : isComplete
                              ? isCurrent
                                ? 'bg-teal-500 text-white'
                                : 'bg-teal-500/20 text-teal-300'
                              : 'bg-white/5 text-white/20'
                        )}
                      >
                        {isDenied ? (
                          <XCircle className="h-3 w-3" />
                        ) : isComplete ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                      <span className={cn(
                        'text-[10px] mt-1 whitespace-nowrap',
                        isComplete ? 'text-white/60' : 'text-white/20'
                      )}>
                        {isDenied ? 'Denied' : step.label}
                      </span>
                      {expandTimeline && date && (
                        <span className="text-[9px] text-white/30 mt-0.5">
                          {formatDate(date)}
                        </span>
                      )}
                    </div>
                    {i < TIMELINE_STEPS.length - 1 && (
                      <div
                        className={cn(
                          'h-[1px] flex-1 mx-1',
                          isComplete && claim.timeline[TIMELINE_STEPS[i + 1].key as keyof typeof claim.timeline]
                            ? 'bg-teal-500/40'
                            : 'bg-white/[0.06]'
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {claim.denialReason && (
              <div className="mt-3 p-3 bg-red-500/5 border border-red-500/10 rounded-sm">
                <p className="text-xs text-red-300">
                  <span className="font-medium">Denial Reason:</span> {claim.denialReason}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Financials */}
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-400" />
                Financials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">Claim Amount</span>
                <span className="text-sm font-medium text-white">{formatCurrency(claim.totalClaimAmountAUD)}</span>
              </div>
              {claim.approvedAmountAUD !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Approved Amount</span>
                  <span className="text-sm font-medium text-emerald-400">{formatCurrency(claim.approvedAmountAUD)}</span>
                </div>
              )}
              {claim.paymentAmountAUD !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Payment Received</span>
                  <span className="text-sm font-medium text-emerald-400">{formatCurrency(claim.paymentAmountAUD)}</span>
                </div>
              )}
              {claim.booking && (
                <>
                  <Separator className="bg-white/[0.06]" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40">Estimated Job Cost</span>
                    <span className="text-sm text-white/80">{formatCurrency(claim.booking.estimatedCostAUD)}</span>
                  </div>
                  {claim.booking.finalCostAUD !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/40">Final Job Cost</span>
                      <span className="text-sm text-white/80">{formatCurrency(claim.booking.finalCostAUD)}</span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Insurance Details */}
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                Insurance Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-white/40">Provider</span>
                <span className="text-sm text-white/80">{claim.insuranceProvider.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/40">Policy Number</span>
                <span className="text-sm text-white/80 font-mono">{claim.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/40">Contact</span>
                <span className="text-sm text-white/80">{claim.insuranceProvider.contactEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/40">Phone</span>
                <span className="text-sm text-white/80">{claim.insuranceProvider.contactPhone}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Damage Description */}
        <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/70">Damage Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/70 leading-relaxed">{claim.damageDescription}</p>
          </CardContent>
        </Card>

        {/* Linked Job */}
        {claim.booking && (
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-teal-400" />
                Linked Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-sm bg-teal-500/10 flex items-center justify-center shrink-0">
                  <Wrench className="h-4 w-4 text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {claim.booking.australianServiceType.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{claim.booking.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {claim.booking.streetAddress}, {claim.booking.serviceSuburb} {claim.booking.serviceState} {claim.booking.servicePostcode}
                    </span>
                    {claim.booking.contractor && (
                      <>
                        <span className="text-white/10">&middot;</span>
                        <span className="text-xs text-white/30 flex items-center gap-1">
                          <Building2 className="h-2.5 w-2.5" />
                          {claim.booking.contractor.businessName}
                        </span>
                      </>
                    )}
                    <span className="text-white/10">&middot;</span>
                    <Badge className="bg-white/10 text-white/50 border-0 rounded-sm text-[10px]">
                      {claim.booking.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">
              Documents ({documents.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUploadModal(true)}
              className="text-teal-400 hover:text-teal-300 rounded-sm text-xs"
            >
              <Upload className="h-3 w-3 mr-1" />
              Upload
            </Button>
          </div>
          {documents.length === 0 ? (
            <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
              <CardContent className="py-8 text-center">
                <FileText className="h-8 w-8 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/40">No documents uploaded yet</p>
                <Button
                  onClick={() => setShowUploadModal(true)}
                  variant="ghost"
                  className="mt-3 text-teal-400 hover:text-teal-300 text-xs rounded-sm"
                >
                  Upload your first document
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {documents.map((doc) => {
                const Icon = getFileIcon(doc.category);
                return (
                  <Card key={doc.id} className="bg-white/[0.02] border-white/[0.06] rounded-sm">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-sm bg-white/5 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-white/40" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{doc.name}</p>
                          <p className="text-[10px] text-white/30">{doc.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-white/30 hover:text-white rounded-sm"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="bg-[#0a0a0a] border-white/[0.06] text-white rounded-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white/70 text-sm">Document Category</Label>
              <Select defaultValue="supporting" onValueChange={setUploadCategory}>
                <SelectTrigger className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-white/[0.06] rounded-sm">
                  <SelectItem value="photo" className="text-white">Damage Photo</SelectItem>
                  <SelectItem value="invoice" className="text-white">Invoice</SelectItem>
                  <SelectItem value="estimate" className="text-white">Quote/Estimate</SelectItem>
                  <SelectItem value="supporting" className="text-white">Supporting Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white/70 text-sm">Document URL</Label>
              <Input
                id="doc-url"
                placeholder="Paste document URL after uploading to storage"
                className="mt-1.5 bg-white/5 border-white/[0.06] text-white rounded-sm"
              />
              <p className="text-[10px] text-white/30 mt-1">
                Upload your file to cloud storage first, then paste the URL here
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowUploadModal(false)}
                className="flex-1 text-white/60 hover:text-white rounded-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const urlInput = document.getElementById('doc-url') as HTMLInputElement;
                  if (urlInput?.value) handleDocUpload(urlInput.value);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-sm"
              >
                Add Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="bg-[#0a0a0a] border-white/[0.06] text-white rounded-sm max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-400" />
              Claim Summary Report
            </DialogTitle>
          </DialogHeader>
          {report && (
            <div className="mt-4 space-y-6">
              {/* Report Header */}
              <div className="bg-white/[0.03] rounded-sm p-4 border border-white/[0.06]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {report.claimNumber || 'Draft Claim'}
                    </h3>
                    <p className="text-xs text-white/40 mt-1">
                      Generated {formatDate(report.generatedAt)}
                    </p>
                  </div>
                  <Badge className={cn(
                    STATUS_CONFIG[report.status]?.bg || 'bg-white/10',
                    STATUS_CONFIG[report.status]?.text || 'text-white/60',
                    'border-0 rounded-sm text-xs'
                  )}>
                    {STATUS_CONFIG[report.status]?.label || report.status}
                  </Badge>
                </div>
              </div>

              {/* Client & Insurance */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Client</h4>
                  <p className="text-sm text-white">{report.client.name}</p>
                  <p className="text-xs text-white/40">{report.client.email}</p>
                  <p className="text-xs text-white/40 mt-1">{report.client.address}</p>
                </div>
                <div>
                  <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Insurance</h4>
                  <p className="text-sm text-white">{report.insurance.provider}</p>
                  <p className="text-xs text-white/40 font-mono">{report.insurance.policyNumber}</p>
                </div>
              </div>

              <Separator className="bg-white/[0.06]" />

              {/* Financials */}
              <div>
                <h4 className="text-xs text-white/50 uppercase tracking-wider mb-3">Financial Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.03] rounded-sm p-3">
                    <p className="text-[10px] text-white/40 uppercase">Claim Amount</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(report.financials.totalClaimAmount)}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-sm p-3">
                    <p className="text-[10px] text-white/40 uppercase">Approved</p>
                    <p className="text-lg font-bold text-emerald-400">
                      {report.financials.approvedAmount !== null
                        ? formatCurrency(report.financials.approvedAmount)
                        : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Damage */}
              <div>
                <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Damage Assessment</h4>
                <p className="text-sm text-white/70">{report.damage.description}</p>
                <p className="text-xs text-white/30 mt-1">{report.damage.photoCount} damage photos on file</p>
              </div>

              {/* Job */}
              {report.job && (
                <div>
                  <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Linked Job</h4>
                  <div className="bg-white/[0.03] rounded-sm p-3">
                    <p className="text-sm text-white">{report.job.serviceType.replace(/_/g, ' ')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-white/10 text-white/50 border-0 rounded-sm text-[10px]">
                        {report.job.status.replace(/_/g, ' ')}
                      </Badge>
                      {report.job.contractor && (
                        <span className="text-xs text-white/30">{report.job.contractor.businessName}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-white/[0.06]" />

              <p className="text-[10px] text-white/20 text-center">
                NRPG Disaster Recovery Platform &middot; Claim Report &middot; {formatDate(report.generatedAt)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
