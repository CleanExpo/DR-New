'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Loader2,
  ArrowLeft,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  FileText,
  Building2,
  Award,
  MapPin,
  TrendingUp,
  Eye,
  Star,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import DocumentUpload from '@/components/contractor/DocumentUpload';
import ServiceAreaManager from '@/components/contractor/ServiceAreaManager';

// Verification status badge component
function VerificationStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: string; icon: any; label: string }> = {
    PENDING: { variant: 'secondary', icon: Clock, label: 'Pending Review' },
    INCOMPLETE: { variant: 'destructive', icon: XCircle, label: 'Incomplete' },
    SUBMITTED: { variant: 'default', icon: FileText, label: 'Submitted' },
    UNDER_REVIEW: { variant: 'default', icon: Eye, label: 'Under Review' },
    APPROVED: { variant: 'success', icon: CheckCircle, label: 'Verified' },
    REJECTED: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
    RESUBMISSION_REQUIRED: { variant: 'warning', icon: Upload, label: 'Resubmission Required' },
    SUSPENDED: { variant: 'destructive', icon: Shield, label: 'Suspended' },
    EXPIRED: { variant: 'warning', icon: Clock, label: 'Expired' },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <Badge className={`gap-2 ${config.variant}`}>
      <Icon className="h-4 w-4" />
      {config.label}
    </Badge>
  );
}

export default function ContractorVerificationProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [contractor, setContractor] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    // Company Profile
    companyLogoUrl: '',
    companyDescription: '',
    yearsInBusiness: '',
    teamSize: '',
    serviceRadius: '25',
    emergencyAvailable: false,
    emergencyResponseTime: '',

    // License Information
    licenseNumber: '',
    licenseState: '',
    licenseExpiry: '',

    // Business Details
    abnNumber: '',
    acnNumber: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType !== 'CONTRACTOR') {
      router.push('/dashboard/client');
    } else if (user) {
      fetchContractorData();
    }
  }, [user, loading, router]);

  const fetchContractorData = async () => {
    try {
      const response = await fetch('/api/contractor/verification/profile');
      if (response.ok) {
        const data = await response.json();
        setContractor(data.contractor);

        // Populate form with existing data
        if (data.contractor) {
          setFormData({
            companyLogoUrl: data.contractor.companyLogoUrl || '',
            companyDescription: data.contractor.companyDescription || '',
            yearsInBusiness: data.contractor.yearsInBusiness?.toString() || '',
            teamSize: data.contractor.teamSize?.toString() || '',
            serviceRadius: data.contractor.serviceRadius?.toString() || '25',
            emergencyAvailable: data.contractor.emergencyAvailable || false,
            emergencyResponseTime: data.contractor.emergencyResponseTime?.toString() || '',
            licenseNumber: data.contractor.licenseNumber || '',
            licenseState: data.contractor.licenseState || '',
            licenseExpiry: data.contractor.licenseExpiry
              ? new Date(data.contractor.licenseExpiry).toISOString().split('T')[0]
              : '',
            abnNumber: data.contractor.abnNumber || '',
            acnNumber: data.contractor.acnNumber || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching contractor data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/contractor/verification/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          yearsInBusiness: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : null,
          teamSize: formData.teamSize ? parseInt(formData.teamSize) : null,
          serviceRadius: parseInt(formData.serviceRadius),
          emergencyResponseTime: formData.emergencyResponseTime
            ? parseInt(formData.emergencyResponseTime)
            : null,
          licenseExpiry: formData.licenseExpiry ? new Date(formData.licenseExpiry) : null,
        })
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        await fetchContractorData(); // Refresh data
      } else {
        const error = await response.json();
        toast.error('Failed to update profile', {
          description: error.error || 'Please try again.'
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          <span>Loading your profile...</span>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'CONTRACTOR') {
    return null;
  }

  const completionPercentage = contractor ? calculateCompletionPercentage(contractor) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white mr-4"
              onClick={() => router.push('/dashboard/contractor')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <span className="text-2xl font-bold text-[#00BFA6]">Contractor Verification</span>
          </div>
          {contractor && (
            <VerificationStatusBadge status={contractor.verificationStatus || 'PENDING'} />
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Profile Completion Banner */}
        {contractor && completionPercentage < 100 && (
          <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Complete Your Profile</h3>
                  <p className="text-gray-300">
                    {completionPercentage}% complete - Complete your profile to get verified
                  </p>
                </div>
                <div className="text-4xl font-bold text-amber-500">{completionPercentage}%</div>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        {contractor && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Profile Views</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {contractor.profileViews || 0}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Quote Requests</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {contractor.quoteRequestCount || 0}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Average Rating</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {contractor.averageRating?.toFixed(1) || '0.0'}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed Jobs</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {contractor.completedJobs || 0}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-[#00BFA6]" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00BFA6]">
              <Building2 className="h-4 w-4 mr-2" />
              Company Profile
            </TabsTrigger>
            <TabsTrigger value="licenses" className="data-[state=active]:bg-[#00BFA6]">
              <Award className="h-4 w-4 mr-2" />
              Licenses & Docs
            </TabsTrigger>
            <TabsTrigger value="service-areas" className="data-[state=active]:bg-[#00BFA6]">
              <MapPin className="h-4 w-4 mr-2" />
              Service Areas
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#00BFA6]">
              <FileText className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Tab: Company Profile */}
          <TabsContent value="overview">
            <form onSubmit={handleSubmit}>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Company Profile</CardTitle>
                  <CardDescription className="text-gray-400">
                    Tell clients about your business and expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* ABN/ACN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="abnNumber" className="text-gray-300">
                        ABN Number *
                      </Label>
                      <Input
                        id="abnNumber"
                        value={formData.abnNumber}
                        onChange={(e) => handleInputChange('abnNumber', e.target.value)}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                        placeholder="12 345 678 901"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="acnNumber" className="text-gray-300">
                        ACN Number (if applicable)
                      </Label>
                      <Input
                        id="acnNumber"
                        value={formData.acnNumber}
                        onChange={(e) => handleInputChange('acnNumber', e.target.value)}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                        placeholder="123 456 789"
                      />
                    </div>
                  </div>

                  {/* Company Description */}
                  <div>
                    <Label htmlFor="companyDescription" className="text-gray-300">
                      Company Description *
                    </Label>
                    <Textarea
                      id="companyDescription"
                      value={formData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      className="mt-1 bg-gray-700 border-gray-600 text-white"
                      placeholder="Tell clients about your company, expertise, and what sets you apart..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Business Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="yearsInBusiness" className="text-gray-300">
                        Years in Business
                      </Label>
                      <Input
                        id="yearsInBusiness"
                        type="number"
                        value={formData.yearsInBusiness}
                        onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                        placeholder="10"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamSize" className="text-gray-300">
                        Team Size
                      </Label>
                      <Input
                        id="teamSize"
                        type="number"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                        placeholder="5"
                        min="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceRadius" className="text-gray-300">
                        Service Radius (km) *
                      </Label>
                      <Input
                        id="serviceRadius"
                        type="number"
                        value={formData.serviceRadius}
                        onChange={(e) => handleInputChange('serviceRadius', e.target.value)}
                        className="mt-1 bg-gray-700 border-gray-600 text-white"
                        placeholder="25"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Emergency Services */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="emergencyAvailable"
                        checked={formData.emergencyAvailable}
                        onChange={(e) => handleInputChange('emergencyAvailable', e.target.checked)}
                        className="rounded border-gray-600 bg-gray-700"
                      />
                      <Label htmlFor="emergencyAvailable" className="text-gray-300 cursor-pointer">
                        Available for Emergency Callouts
                      </Label>
                    </div>
                    {formData.emergencyAvailable && (
                      <div>
                        <Label htmlFor="emergencyResponseTime" className="text-gray-300">
                          Emergency Response Time (minutes)
                        </Label>
                        <Input
                          id="emergencyResponseTime"
                          type="number"
                          value={formData.emergencyResponseTime}
                          onChange={(e) => handleInputChange('emergencyResponseTime', e.target.value)}
                          className="mt-1 bg-gray-700 border-gray-600 text-white"
                          placeholder="60"
                          min="1"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-[#00BFA6] hover:bg-[#00A693] text-white px-8"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          {/* Tab: Licenses & Documents */}
          <TabsContent value="licenses">
            <DocumentUpload onDocumentUploaded={fetchContractorData} />
          </TabsContent>

          {/* Tab: Service Areas */}
          <TabsContent value="service-areas">
            <ServiceAreaManager onAreasUpdated={fetchContractorData} />
          </TabsContent>

          {/* Tab: Verification History */}
          <TabsContent value="history">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Verification History</CardTitle>
                <CardDescription className="text-gray-400">
                  Track all changes and updates to your verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-lg">No verification history yet</p>
                  <p className="text-sm mt-2">
                    All changes to your verification status will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper function to calculate profile completion percentage
function calculateCompletionPercentage(contractor: any): number {
  const fields = [
    contractor.abnNumber,
    contractor.companyDescription,
    contractor.licenseNumber,
    contractor.licenseState,
    contractor.licenseExpiry,
    contractor.yearsInBusiness,
    contractor.teamSize,
    contractor.serviceRadius,
  ];

  const completedFields = fields.filter(field => field !== null && field !== undefined && field !== '').length;
  return Math.round((completedFields / fields.length) * 100);
}
