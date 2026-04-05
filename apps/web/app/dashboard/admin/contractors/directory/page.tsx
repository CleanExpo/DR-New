'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  Search,
  Filter,
  Users,
  MapPin,
  Award,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  TrendingUp,
  AlertCircle,
  Shield,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface Contractor {
  id: string;
  businessName: string;
  companyDescription?: string;
  companyLogoUrl?: string;
  primaryState?: string;
  operatingStates: string[];
  australianSpecialties: string[];
  yearsInBusiness?: number;
  teamSize?: number;
  serviceRadius: number;
  emergencyAvailable: boolean;
  emergencyResponseTime?: number;
  averageRating: number;
  completedJobs: number;
  isVerified: boolean;
  verificationStatus: string;
  abnNumber?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  profileViews: number;
  quoteRequestCount: number;
  serviceAreas: any[];
  iicrcCertifications: any[];
  documents: any[];
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  stats: {
    pendingDocuments: number;
    approvedDocuments: number;
    totalDocuments: number;
    activeCertifications: number;
    expiredCertifications: number;
    serviceAreasCount: number;
    profileCompleteness: number;
  };
}

// Australian states
const AUSTRALIAN_STATES = [
  { value: '', label: 'All States' },
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
];

// Verification statuses
const VERIFICATION_STATUSES = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'INCOMPLETE', label: 'Incomplete' },
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'UNDER_REVIEW', label: 'Under Review' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'RESUBMISSION_REQUIRED', label: 'Resubmission Required' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'EXPIRED', label: 'Expired' },
];

// Verification status badge component
function VerificationStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { className: string; icon: any; label: string }> = {
    PENDING: { className: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: Clock, label: 'Pending' },
    INCOMPLETE: { className: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle, label: 'Incomplete' },
    SUBMITTED: { className: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: FileText, label: 'Submitted' },
    UNDER_REVIEW: { className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Eye, label: 'Under Review' },
    APPROVED: { className: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle, label: 'Approved' },
    REJECTED: { className: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle, label: 'Rejected' },
    RESUBMISSION_REQUIRED: { className: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: AlertCircle, label: 'Resubmission' },
    SUSPENDED: { className: 'bg-red-500/10 text-red-400 border-red-500/20', icon: Shield, label: 'Suspended' },
    EXPIRED: { className: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: Clock, label: 'Expired' },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <Badge className={`gap-1.5 ${config.className} border`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

export default function ContractorDirectory() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    status: '',
    verified: false,
    emergency: false,
    minRating: '0',
    sortBy: 'rating',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && !['ADMIN', 'SUPER_ADMIN'].includes(user.userType)) {
      router.push('/dashboard');
      toast.error('Access denied: Admin only');
    } else if (user) {
      fetchContractors();
    }
  }, [user, loading, router]);

  const fetchContractors = async () => {
    setLoadingData(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.state) params.append('state', filters.state);
      if (filters.status) params.append('status', filters.status);
      if (filters.verified) params.append('verified', 'true');
      if (filters.emergency) params.append('emergency', 'true');
      if (filters.minRating !== '0') params.append('minRating', filters.minRating);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`/api/admin/contractors/directory?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setContractors(data.contractors || []);
        setTotal(data.total || 0);
      } else {
        toast.error('Failed to load contractors');
      }
    } catch (error) {
      console.error('Error fetching contractors:', error);
      toast.error('Failed to load contractors');
    } finally {
      setLoadingData(false);
    }
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    fetchContractors();
  };

  const handleReset = () => {
    setFilters({
      search: '',
      state: '',
      status: '',
      verified: false,
      emergency: false,
      minRating: '0',
      sortBy: 'rating',
    });
    setTimeout(fetchContractors, 100);
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          <span>Loading contractor directory...</span>
        </div>
      </div>
    );
  }

  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.userType)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-[#00BFA6] mr-3" />
            <span className="text-2xl font-bold text-white">Contractor Directory</span>
            <Badge variant="outline" className="ml-3 border-gray-600 text-gray-300">
              NRPG Management Only
            </Badge>
          </div>
          <div className="text-sm text-gray-400">
            {total} contractor{total !== 1 ? 's' : ''} found
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Search and Filters */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#00BFA6]" />
              Search & Filter Contractors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search" className="text-gray-300">
                  Search by name, ABN, or license
                </Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search contractors..."
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-300">
                  State
                </Label>
                <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {AUSTRALIAN_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value} className="text-white">
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-300">
                  Verification Status
                </Label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {VERIFICATION_STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value} className="text-white">
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="minRating" className="text-gray-300">
                  Minimum Rating
                </Label>
                <Select value={filters.minRating} onValueChange={(value) => handleFilterChange('minRating', value)}>
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="0" className="text-white">Any Rating</SelectItem>
                    <SelectItem value="4" className="text-white">4+ Stars</SelectItem>
                    <SelectItem value="4.5" className="text-white">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sortBy" className="text-gray-300">
                  Sort By
                </Label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="rating" className="text-white">Highest Rating</SelectItem>
                    <SelectItem value="newest" className="text-white">Newest First</SelectItem>
                    <SelectItem value="name" className="text-white">Name (A-Z)</SelectItem>
                    <SelectItem value="status" className="text-white">Verification Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={filters.verified}
                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700"
                  />
                  <Label htmlFor="verified" className="text-gray-300 cursor-pointer">
                    Verified Only
                  </Label>
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emergency"
                    checked={filters.emergency}
                    onChange={(e) => handleFilterChange('emergency', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700"
                  />
                  <Label htmlFor="emergency" className="text-gray-300 cursor-pointer flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Emergency Available
                  </Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contractors Grid */}
        {contractors.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="py-12">
              <div className="text-center text-gray-400">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No contractors found</p>
                <p className="text-sm mt-2">Try adjusting your search filters</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contractors.map((contractor) => (
              <Card key={contractor.id} className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">
                        {contractor.businessName}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <VerificationStatusBadge status={contractor.verificationStatus} />
                        {contractor.isVerified && (
                          <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6] gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {contractor.emergencyAvailable && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500 gap-1">
                            <Zap className="h-3 w-3" />
                            Emergency
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-gray-400 text-sm line-clamp-2">
                        {contractor.companyDescription || 'No description provided'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold">{contractor.averageRating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-gray-400">{contractor.completedJobs} jobs</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="font-bold">{contractor.stats.serviceAreasCount}</span>
                      </div>
                      <p className="text-xs text-gray-400">Service areas</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                        <Award className="h-4 w-4" />
                        <span className="font-bold">{contractor.stats.activeCertifications}</span>
                      </div>
                      <p className="text-xs text-gray-400">Certifications</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    {contractor.abnNumber && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>ABN: {contractor.abnNumber}</span>
                      </div>
                    )}
                    {contractor.licenseNumber && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span>License: {contractor.licenseNumber}</span>
                      </div>
                    )}
                    {contractor.primaryState && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{contractor.primaryState} • {contractor.serviceRadius}km radius</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-300">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span>{contractor.profileViews} profile views</span>
                    </div>
                  </div>

                  {/* Contact & Actions */}
                  <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-gray-400">{contractor.user.name}</p>
                      <p className="text-gray-400 text-xs">{contractor.user.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/admin/contractors/${contractor.id}`)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      View Details
                    </Button>
                  </div>

                  {/* Profile Completeness */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Profile Completeness</span>
                      <span>{contractor.stats.profileCompleteness}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#00BFA6] h-2 rounded-full transition-[width]"
                        style={{ width: `${contractor.stats.profileCompleteness}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
