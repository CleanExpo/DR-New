'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  MapPin,
  Award,
  Loader2,
  ChevronRight,
  Eye,
  Shield,
  Calendar,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  History
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Contractor {
  id: string;
  businessName: string;
  abnNumber?: string;
  verificationStatus: string;
  submittedForVerificationAt?: string;
  profileCompleteness?: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
  };
  documents: any[];
  serviceAreas: any[];
  certifications: any[];
  verificationHistory: any[];
  primaryState?: string;
  companyDescription?: string;
  yearsInBusiness?: number;
}

export default function AdminVerificationDashboard() {
  const { user } = useAuth();
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [viewingDetails, setViewingDetails] = useState(false);
  const [detailedData, setDetailedData] = useState<any>(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [activeTab, setActiveTab] = useState('submitted');
  const [actionNotes, setActionNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchContractors();
  }, [activeTab]);

  const fetchContractors = async () => {
    setLoading(true);
    try {
      const statusParam = activeTab === 'all' ? '' : `?status=${getStatusFromTab(activeTab)}`;
      const response = await fetch(`/api/admin/contractors/verification${statusParam}`);
      if (response.ok) {
        const data = await response.json();
        setContractors(data.contractors || []);
        setStatistics(data.statistics || null);
      } else {
        toast.error('Failed to load contractors');
      }
    } catch (error) {
      console.error('Error fetching contractors:', error);
      toast.error('Failed to load contractors');
    } finally {
      setLoading(false);
    }
  };

  const getStatusFromTab = (tab: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'PENDING',
      'incomplete': 'INCOMPLETE',
      'submitted': 'SUBMITTED',
      'reviewing': 'UNDER_REVIEW',
      'approved': 'APPROVED',
      'rejected': 'REJECTED',
    };
    return statusMap[tab] || '';
  };

  const viewContractorDetails = async (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setViewingDetails(true);
    setActionNotes('');
    setRejectionReason('');

    try {
      const response = await fetch(`/api/admin/contractors/verification/${contractor.id}`);
      if (response.ok) {
        const data = await response.json();
        setDetailedData(data);
      }
    } catch (error) {
      console.error('Error fetching contractor details:', error);
    }
  };

  const handleVerificationAction = async (action: string) => {
    if (!selectedContractor) return;

    if (action === 'REJECT' && !rejectionReason) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setProcessingAction(true);
    try {
      const response = await fetch(`/api/admin/contractors/verification/${selectedContractor.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          notes: actionNotes || undefined,
          rejectionReason: action === 'REJECT' ? rejectionReason : undefined,
        }),
      });

      if (response.ok) {
        toast.success(`Contractor ${action.toLowerCase()}d successfully!`);
        setViewingDetails(false);
        setSelectedContractor(null);
        await fetchContractors();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to process action');
      }
    } catch (error) {
      console.error('Error processing action:', error);
      toast.error('Failed to process action');
    } finally {
      setProcessingAction(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: string; icon: any; color: string }> = {
      PENDING: { label: 'Pending', variant: 'outline', icon: Clock, color: 'text-gray-400' },
      INCOMPLETE: { label: 'Incomplete', variant: 'outline', icon: AlertCircle, color: 'text-yellow-500' },
      SUBMITTED: { label: 'Submitted', variant: 'outline', icon: FileText, color: 'text-blue-500' },
      UNDER_REVIEW: { label: 'Under Review', variant: 'outline', icon: Eye, color: 'text-purple-500' },
      APPROVED: { label: 'Approved', variant: 'outline', icon: CheckCircle, color: 'text-green-500' },
      REJECTED: { label: 'Rejected', variant: 'outline', icon: XCircle, color: 'text-red-500' },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`border-${config.color.split('-')[1]}-500 gap-1`}>
        <Icon className={`h-3 w-3 ${config.color}`} />
        <span className={config.color}>{config.label}</span>
      </Badge>
    );
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProfileCompleteness = (contractor: Contractor): number => {
    const requiredFields = [
      contractor.businessName,
      contractor.abnNumber,
      contractor.primaryState,
      contractor.companyDescription,
      contractor.yearsInBusiness,
    ];
    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
      </div>
    );
  }

  // Detailed contractor view
  if (viewingDetails && selectedContractor) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => setViewingDetails(false)}
              className="text-gray-400 hover:text-white mb-2"
            >
              ← Back to list
            </Button>
            <h1 className="text-3xl font-bold text-white">{selectedContractor.businessName}</h1>
            <p className="text-gray-400">Verification Review</p>
          </div>
          {getStatusBadge(selectedContractor.verificationStatus)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#00BFA6]" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Business Name</Label>
                    <p className="text-white font-medium">{selectedContractor.businessName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">ABN</Label>
                    <p className="text-white font-medium">{selectedContractor.abnNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Primary State</Label>
                    <p className="text-white font-medium">{selectedContractor.primaryState || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Years in Business</Label>
                    <p className="text-white font-medium">{selectedContractor.yearsInBusiness || 'Not specified'}</p>
                  </div>
                </div>
                {selectedContractor.companyDescription && (
                  <div>
                    <Label className="text-gray-400">Company Description</Label>
                    <p className="text-gray-300 text-sm mt-1">{selectedContractor.companyDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{selectedContractor.user.email}</span>
                </div>
                {selectedContractor.user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-300">{selectedContractor.user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">
                    Registered: {formatDate(selectedContractor.user.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#00BFA6]" />
                  Documents ({selectedContractor.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedContractor.documents.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No documents uploaded</p>
                ) : (
                  <div className="space-y-3">
                    {selectedContractor.documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{doc.documentType.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-gray-400">{doc.fileName}</p>
                          {doc.expiryDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Expires: {formatDate(doc.expiryDate)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={
                            doc.status === 'APPROVED' ? 'border-green-500 text-green-500' :
                            doc.status === 'REJECTED' ? 'border-red-500 text-red-500' :
                            'border-yellow-500 text-yellow-500'
                          }>
                            {doc.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(doc.fileUrl, '_blank')}
                            className="text-[#00BFA6]"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#00BFA6]" />
                  Service Areas ({selectedContractor.serviceAreas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedContractor.serviceAreas.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No service areas defined</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedContractor.serviceAreas.map((area: any) => (
                      <div key={area.id} className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-white font-medium">{area.postcode}</p>
                        <p className="text-sm text-gray-400">{area.state}</p>
                        <p className="text-xs text-gray-500">{area.radiusKm}km radius</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verification History */}
            {selectedContractor.verificationHistory && selectedContractor.verificationHistory.length > 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <History className="h-5 w-5 text-[#00BFA6]" />
                    Verification History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedContractor.verificationHistory.map((entry: any) => (
                      <div key={entry.id} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-white font-medium">{entry.action}</p>
                            <p className="text-sm text-gray-400">
                              {entry.previousStatus} → {entry.newStatus}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              By: {entry.performedByName} • {formatDate(entry.createdAt)}
                            </p>
                          </div>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-gray-300 mt-2">{entry.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Actions */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            {detailedData && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Profile Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Profile Completeness</span>
                      <span className="text-white font-medium">{detailedData.analysis.profileCompleteness}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#00BFA6] h-2 rounded-full transition-[width]"
                        style={{ width: `${detailedData.analysis.profileCompleteness}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
                    <div>
                      <p className="text-2xl font-bold text-white">{detailedData.analysis.uploadedDocuments}</p>
                      <p className="text-xs text-gray-400">Documents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{detailedData.analysis.serviceAreaCount}</p>
                      <p className="text-xs text-gray-400">Service Areas</p>
                    </div>
                  </div>
                  {detailedData.analysis.missingDocuments.length > 0 && (
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-sm text-red-400 font-medium mb-2">Missing Documents:</p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {detailedData.analysis.missingDocuments.map((doc: string) => (
                          <li key={doc}>• {doc.replace(/_/g, ' ')}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Verification Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Verification Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="actionNotes" className="text-gray-300">
                    Internal Notes (Optional)
                  </Label>
                  <Textarea
                    id="actionNotes"
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Add any notes about this verification..."
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleVerificationAction('APPROVE')}
                    disabled={processingAction}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {processingAction ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Contractor
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleVerificationAction('MARK_UNDER_REVIEW')}
                    disabled={processingAction}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/20"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Mark Under Review
                  </Button>

                  <Button
                    onClick={() => handleVerificationAction('REQUEST_CHANGES')}
                    disabled={processingAction}
                    variant="outline"
                    className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-900/20"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Request Changes
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <Label htmlFor="rejectionReason" className="text-red-400">
                    Rejection Reason (Required if rejecting)
                  </Label>
                  <Textarea
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Explain why this contractor is being rejected..."
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                  <Button
                    onClick={() => handleVerificationAction('REJECT')}
                    disabled={processingAction}
                    variant="outline"
                    className="w-full mt-2 border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Contractor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Shield className="h-8 w-8 text-[#00BFA6]" />
          Contractor Verification Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Review and approve contractor applications</p>
        <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6] mt-2">
          NRPG Management Only
        </Badge>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-400">{statistics.pending}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-500">{statistics.incomplete}</p>
                  <p className="text-xs text-gray-500">Incomplete</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-500">{statistics.submitted}</p>
                  <p className="text-xs text-gray-500">Submitted</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-500">{statistics.underReview}</p>
                  <p className="text-xs text-gray-500">Reviewing</p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-500">{statistics.approved}</p>
                  <p className="text-xs text-gray-500">Approved</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-500">{statistics.rejected}</p>
                  <p className="text-xs text-gray-500">Rejected</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-500">{statistics.resubmitted}</p>
                  <p className="text-xs text-gray-500">Resubmitted</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="reviewing">Under Review</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {contractors.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="py-12 text-center text-gray-400">
                <Shield className="h-16 w-16 mx-auto mb-4 text-gray-600" />
                <p className="text-lg">No contractors found in this category</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contractors.map((contractor) => (
                <Card key={contractor.id} className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar>
                          <AvatarFallback className="bg-[#00BFA6] text-white">
                            {contractor.businessName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg">{contractor.businessName}</CardTitle>
                          <CardDescription className="text-gray-400 text-sm">
                            {contractor.user.email}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {getStatusBadge(contractor.verificationStatus)}
                            {contractor.submittedForVerificationAt && (
                              <span className="text-xs text-gray-500">
                                Submitted: {formatDate(contractor.submittedForVerificationAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-700">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                          <FileText className="h-4 w-4" />
                        </div>
                        <p className="text-lg font-bold text-white">{contractor.documents.length}</p>
                        <p className="text-xs text-gray-400">Documents</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <p className="text-lg font-bold text-white">{contractor.serviceAreas.length}</p>
                        <p className="text-xs text-gray-400">Areas</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                          <Award className="h-4 w-4" />
                        </div>
                        <p className="text-lg font-bold text-white">{contractor.certifications.length}</p>
                        <p className="text-xs text-gray-400">Certs</p>
                      </div>
                    </div>

                    {/* Profile Completeness */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Profile Completeness</span>
                        <span className="text-white font-medium">{calculateProfileCompleteness(contractor)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#00BFA6] h-2 rounded-full transition-[width]"
                          style={{ width: `${calculateProfileCompleteness(contractor)}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => viewContractorDetails(contractor)}
                      className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white"
                    >
                      Review Application
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
