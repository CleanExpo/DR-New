'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ContractorApplication } from '@/lib/types/contractor-onboarding';
import { QualificationViewer } from '@/components/admin/onboarding/QualificationViewer';
import { InsuranceViewer } from '@/components/admin/onboarding/InsuranceViewer';
import { CoverageMapViewer } from '@/components/admin/onboarding/CoverageMapViewer';
import { ApprovalModal } from '@/components/admin/onboarding/ApprovalModal';
import { RejectionModal } from '@/components/admin/onboarding/RejectionModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Building2,
  Award,
  Shield,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Edit
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from '@/lib/hooks/use-toast';
import Link from 'next/link';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;

  const [application, setApplication] = useState<ContractorApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/onboarding/${id}`);
      if (!response.ok) throw new Error('Failed to fetch application');

      const data = await response.json();
      setApplication(data);
      setAdminNotes(data.adminNotes || '');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load application details',
        variant: 'destructive',
      });
      router.push('/admin/onboarding');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyQualification = async (qualificationId: string, notes: string) => {
    try {
      const response = await fetch(
        `/api/admin/onboarding/${id}/qualifications/${qualificationId}/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) throw new Error('Failed to verify qualification');

      toast({
        title: 'Success',
        description: 'Qualification verified successfully',
      });

      fetchApplication();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify qualification',
        variant: 'destructive',
      });
    }
  };

  const handleRejectQualification = async (qualificationId: string, reason: string) => {
    try {
      const response = await fetch(
        `/api/admin/onboarding/${id}/qualifications/${qualificationId}/reject`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) throw new Error('Failed to reject qualification');

      toast({
        title: 'Qualification Rejected',
        description: 'The contractor will be notified',
      });

      fetchApplication();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject qualification',
        variant: 'destructive',
      });
    }
  };

  const handleVerifyInsurance = async (insuranceId: string, notes: string) => {
    try {
      const response = await fetch(
        `/api/admin/onboarding/${id}/insurance/${insuranceId}/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) throw new Error('Failed to verify insurance');

      toast({
        title: 'Success',
        description: 'Insurance verified successfully',
      });

      fetchApplication();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify insurance',
        variant: 'destructive',
      });
    }
  };

  const handleRejectInsurance = async (insuranceId: string, reason: string) => {
    try {
      const response = await fetch(
        `/api/admin/onboarding/${id}/insurance/${insuranceId}/reject`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) throw new Error('Failed to reject insurance');

      toast({
        title: 'Insurance Rejected',
        description: 'The contractor will be notified',
      });

      fetchApplication();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject insurance',
        variant: 'destructive',
      });
    }
  };

  const handleSaveNotes = async () => {
    try {
      setSavingNotes(true);
      const response = await fetch(`/api/admin/onboarding/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: adminNotes }),
      });

      if (!response.ok) throw new Error('Failed to save notes');

      toast({
        title: 'Success',
        description: 'Admin notes saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive',
      });
    } finally {
      setSavingNotes(false);
    }
  };

  const confirmApproval = async (notes: string) => {
    try {
      const response = await fetch(`/api/admin/onboarding/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvalNotes: notes }),
      });

      if (!response.ok) throw new Error('Failed to approve contractor');

      toast({
        title: 'Success',
        description: 'Contractor approved successfully!',
      });

      setShowApprovalModal(false);
      router.push('/admin/onboarding');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve contractor',
        variant: 'destructive',
      });
    }
  };

  const confirmRejection = async (reason: string, feedback: string, internalNotes: string) => {
    try {
      const response = await fetch(`/api/admin/onboarding/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, feedback, internalNotes }),
      });

      if (!response.ok) throw new Error('Failed to reject contractor');

      toast({
        title: 'Application Rejected',
        description: 'The contractor has been notified',
      });

      setShowRejectionModal(false);
      router.push('/admin/onboarding');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject contractor',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!application) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      PENDING: { variant: 'secondary' as const, icon: Clock },
      UNDER_REVIEW: { variant: 'default' as const, icon: AlertTriangle },
      APPROVED: { variant: 'default' as const, icon: CheckCircle2 },
      REJECTED: { variant: 'destructive' as const, icon: XCircle },
    };

    const config = variants[status] || variants.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const checklist = {
    businessDetails: !!application.companyProfile?.abnVerified,
    qualifications: application.certifications.every((c) => c.verified),
    insurance: application.insurance.every((i) => i.verified),
    references: application.references.every((r) => r.verified),
    subscription: !!application.subscription,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link href="/admin/onboarding">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {application.companyProfile?.companyName || application.username}
            </h1>
            <p className="text-sm text-gray-600">
              Submitted {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {getStatusBadge(application.status)}
          {(application.status === 'PENDING' || application.status === 'UNDER_REVIEW') && (
            <>
              <Button
                variant="default"
                onClick={() => setShowApprovalModal(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button variant="destructive" onClick={() => setShowRejectionModal(true)}>
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business Details</TabsTrigger>
          <TabsTrigger value="qualifications">
            Qualifications ({application.certifications.length})
          </TabsTrigger>
          <TabsTrigger value="insurance">
            Insurance ({application.insurance.length})
          </TabsTrigger>
          <TabsTrigger value="coverage">Coverage Area</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="text-sm font-medium">{application.username}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{application.email}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{application.mobileNumber}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Verification Checklist */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Verification Checklist</h3>
            <div className="space-y-3">
              {Object.entries(checklist).map(([key, isComplete]) => (
                <div key={key} className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={isComplete ? 'text-gray-900' : 'text-red-600'}>
                    {key === 'businessDetails' && 'Business details verified (ABN)'}
                    {key === 'qualifications' && 'All IICRC qualifications verified'}
                    {key === 'insurance' && 'Insurance policies current'}
                    {key === 'references' && 'References verified'}
                    {key === 'subscription' && 'Subscription tier selected'}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Admin Notes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="admin-notes">Admin Notes (Internal Only)</Label>
              <Button
                size="sm"
                onClick={handleSaveNotes}
                disabled={savingNotes}
              >
                <Edit className="w-4 h-4 mr-2" />
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>
            <Textarea
              id="admin-notes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={6}
              placeholder="Add internal notes about this application..."
            />
          </Card>
        </TabsContent>

        {/* Business Details Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>
            {application.companyProfile ? (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="text-base font-medium">{application.companyProfile.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trading Name</p>
                  <p className="text-base font-medium">
                    {application.companyProfile.tradingName || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ABN</p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-medium">{application.companyProfile.abn}</p>
                    {application.companyProfile.abnVerified && (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ACN</p>
                  <p className="text-base font-medium">
                    {application.companyProfile.acn || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Structure</p>
                  <p className="text-base font-medium">
                    {application.companyProfile.companyStructure}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-base font-medium">
                    {application.companyProfile.officePhone || 'N/A'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Registered Address</p>
                  <p className="text-base font-medium">
                    {application.companyProfile.registeredAddress},{' '}
                    {application.companyProfile.registeredCity}{' '}
                    {application.companyProfile.registeredState}{' '}
                    {application.companyProfile.registeredPostcode}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No company profile information available</p>
            )}
          </Card>
        </TabsContent>

        {/* Qualifications Tab */}
        <TabsContent value="qualifications" className="space-y-6">
          {application.certifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No qualifications submitted</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {application.certifications.map((cert) => (
                <QualificationViewer
                  key={cert.id}
                  qualification={cert}
                  onVerify={(notes) => handleVerifyQualification(cert.id, notes)}
                  onReject={(reason) => handleRejectQualification(cert.id, reason)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Insurance Tab */}
        <TabsContent value="insurance" className="space-y-6">
          {application.insurance.length === 0 ? (
            <Card className="p-12 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No insurance policies submitted</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {application.insurance.map((ins) => (
                <InsuranceViewer
                  key={ins.id}
                  insurance={ins}
                  onVerify={(notes) => handleVerifyInsurance(ins.id, notes)}
                  onReject={(reason) => handleRejectInsurance(ins.id, reason)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Coverage Area Tab */}
        <TabsContent value="coverage">
          {application.territories.length > 0 ? (
            <CoverageMapViewer
              contractor={application}
              baseLocation={{
                lat: application.territories[0].centerLat || -27.4698,
                lng: application.territories[0].centerLng || 153.0251,
              }}
              radius={application.territories[0].radiusKm || 50}
              nearbyContractors={[]}
            />
          ) : (
            <Card className="p-12 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No coverage area defined</p>
            </Card>
          )}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Application Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="w-px h-full bg-gray-200 mt-2" />
                </div>
                <div className="pb-8">
                  <p className="font-medium">Application Submitted</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(application.createdAt), 'PPpp')}
                  </p>
                </div>
              </div>

              {application.approvedAt && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Application Approved</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(application.approvedAt), 'PPpp')}
                    </p>
                  </div>
                </div>
              )}

              {application.rejectedAt && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Application Rejected</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(application.rejectedAt), 'PPpp')}
                    </p>
                    {application.rejectionReason && (
                      <p className="text-sm text-red-600 mt-1">
                        {application.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ApprovalModal
        open={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        contractor={application}
        onConfirm={confirmApproval}
      />

      <RejectionModal
        open={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        contractor={application}
        onConfirm={confirmRejection}
      />
    </div>
  );
}
