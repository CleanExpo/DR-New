'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContractorApplication, OnboardingStatus } from '@/lib/types/contractor-onboarding';
import { ApplicationCard } from '@/components/admin/onboarding/ApplicationCard';
import { ApprovalModal } from '@/components/admin/onboarding/ApprovalModal';
import { RejectionModal } from '@/components/admin/onboarding/RejectionModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/Card';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useToast } from '@/lib/hooks/use-toast';

export default function AdminOnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [applications, setApplications] = useState<ContractorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal states
  const [selectedContractor, setSelectedContractor] = useState<ContractorApplication | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, [statusFilter, sortBy, sortOrder]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        status: statusFilter,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/admin/onboarding?${params}`);
      if (!response.ok) throw new Error('Failed to fetch applications');

      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (application: ContractorApplication) => {
    router.push(`/admin/onboarding/${application.id}`);
  };

  const handleApprove = (application: ContractorApplication) => {
    setSelectedContractor(application);
    setShowApprovalModal(true);
  };

  const handleReject = (application: ContractorApplication) => {
    setSelectedContractor(application);
    setShowRejectionModal(true);
  };

  const confirmApproval = async (notes: string) => {
    if (!selectedContractor) return;

    try {
      const response = await fetch(`/api/admin/onboarding/${selectedContractor.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvalNotes: notes }),
      });

      if (!response.ok) throw new Error('Failed to approve contractor');

      toast({
        title: 'Success',
        description: `${selectedContractor.companyProfile?.companyName || selectedContractor.username} has been approved!`,
      });

      setShowApprovalModal(false);
      setSelectedContractor(null);
      fetchApplications();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve contractor',
        variant: 'destructive',
      });
    }
  };

  const confirmRejection = async (reason: string, feedback: string, internalNotes: string) => {
    if (!selectedContractor) return;

    try {
      const response = await fetch(`/api/admin/onboarding/${selectedContractor.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, feedback, internalNotes }),
      });

      if (!response.ok) throw new Error('Failed to reject contractor');

      toast({
        title: 'Application Rejected',
        description: 'The contractor has been notified of the rejection.',
      });

      setShowRejectionModal(false);
      setSelectedContractor(null);
      fetchApplications();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject contractor',
        variant: 'destructive',
      });
    }
  };

  // Filter applications by search query
  const filteredApplications = applications.filter((app) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      app.username.toLowerCase().includes(searchLower) ||
      app.email.toLowerCase().includes(searchLower) ||
      app.companyProfile?.companyName.toLowerCase().includes(searchLower) ||
      app.companyProfile?.abn.toLowerCase().includes(searchLower)
    );
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'PENDING').length,
    underReview: applications.filter((a) => a.status === 'UNDER_REVIEW').length,
    approved: applications.filter((a) => a.status === 'APPROVED').length,
    rejected: applications.filter((a) => a.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Contractor Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and verify pending contractor registrations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total Applications
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500 mb-1">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Pending Review
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-500 mb-1">
                {stats.underReview}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Under Review
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-500 mb-1">
                {stats.approved}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Approved
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-500 mb-1">
                {stats.rejected}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Rejected
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, ABN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Submission Date</SelectItem>
              <SelectItem value="companyName">Company Name</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={fetchApplications}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>

            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

        {/* Applications List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw className="w-12 h-12 text-blue-600 dark:text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <Card className="p-16 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-6">
              <Eye className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Applications Found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'No contractor applications at this time'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onView={() => handleView(application)}
                onApprove={() => handleApprove(application)}
                onReject={() => handleReject(application)}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        {selectedContractor && (
          <>
            <ApprovalModal
              open={showApprovalModal}
              onClose={() => {
                setShowApprovalModal(false);
                setSelectedContractor(null);
              }}
              contractor={selectedContractor}
              onConfirm={confirmApproval}
            />

            <RejectionModal
              open={showRejectionModal}
              onClose={() => {
                setShowRejectionModal(false);
                setSelectedContractor(null);
              }}
              contractor={selectedContractor}
              onConfirm={confirmRejection}
            />
          </>
        )}
      </div>
    </div>
  );
}
