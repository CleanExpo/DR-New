'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  MapPin,
  Star,
  Award,
  Zap,
  CheckCircle,
  Loader2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Contractor {
  id: string;
  businessName: string;
  companyDescription?: string;
  companyLogoUrl?: string;
  primaryState?: string;
  yearsInBusiness?: number;
  teamSize?: number;
  serviceRadius: number;
  emergencyAvailable: boolean;
  averageRating: number;
  completedJobs: number;
  isVerified: boolean;
  serviceAreas: any[];
  certifications: any[];
}

interface ContractorSearchProps {
  onSelectContractor?: (contractor: Contractor) => void;
  showBookButton?: boolean;
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

export default function ContractorSearch({ onSelectContractor, showBookButton = true }: ContractorSearchProps) {
  const router = useRouter();
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    postcode: '',
    state: '',
    emergency: false,
    minRating: '0',
    sortBy: 'rating',
  });

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.postcode) params.append('postcode', filters.postcode);
      if (filters.state) params.append('state', filters.state);
      if (filters.emergency) params.append('emergency', 'true');
      if (filters.minRating !== '0') params.append('minRating', filters.minRating);
      params.append('verified', 'true'); // Only show verified contractors
      params.append('status', 'APPROVED'); // Only approved contractors
      params.append('sortBy', filters.sortBy);

      const response = await fetch(`/api/admin/contractors/directory?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        // Filter for approved and verified contractors
        const approvedContractors = data.contractors.filter(
          (c: any) => c.verificationStatus === 'APPROVED' && c.isActive
        );
        setContractors(approvedContractors || []);
        setTotal(approvedContractors.length || 0);
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

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    fetchContractors();
  };

  const handleBookNow = (contractor: Contractor) => {
    if (onSelectContractor) {
      onSelectContractor(contractor);
    } else {
      // Navigate to booking form with contractor pre-selected
      router.push(`/book-contractor?contractorId=${contractor.id}`);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#00BFA6]" />
            Find Verified Contractors
          </CardTitle>
          <CardDescription className="text-gray-400">
            {total} verified contractor{total !== 1 ? 's' : ''} available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="postcode" className="text-gray-300">
                Your Postcode
              </Label>
              <Input
                id="postcode"
                value={filters.postcode}
                onChange={(e) => handleFilterChange('postcode', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., 2000"
                maxLength={4}
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
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
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emergency"
                checked={filters.emergency}
                onChange={(e) => handleFilterChange('emergency', e.target.checked)}
                className="rounded border-gray-600 bg-gray-700"
              />
              <Label htmlFor="emergency" className="text-gray-300 cursor-pointer flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                Emergency Available
              </Label>
            </div>
            <Button
              onClick={handleSearch}
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white ml-auto"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contractors Grid */}
      {contractors.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 text-center text-gray-400">
            <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No contractors found</p>
            <p className="text-sm mt-2">Try adjusting your search filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contractors.map((contractor) => (
            <Card key={contractor.id} className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-xl mb-2 flex items-center gap-2">
                      {contractor.businessName}
                      {contractor.isVerified && (
                        <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6] gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </CardTitle>
                    {contractor.emergencyAvailable && (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500 gap-1 mb-2">
                        <Zap className="h-3 w-3" />
                        Emergency Available
                      </Badge>
                    )}
                    <CardDescription className="text-gray-400 text-sm line-clamp-2">
                      {contractor.companyDescription || 'Professional disaster recovery services'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                      {renderStars(Math.round(contractor.averageRating))}
                    </div>
                    <p className="text-lg font-bold text-white">{contractor.averageRating.toFixed(1)}</p>
                    <p className="text-xs text-gray-400">{contractor.completedJobs} jobs</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <p className="text-lg font-bold text-white">{contractor.serviceAreas?.length || 0}</p>
                    <p className="text-xs text-gray-400">Service areas</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                      <Award className="h-4 w-4" />
                    </div>
                    <p className="text-lg font-bold text-white">{contractor.certifications?.length || 0}</p>
                    <p className="text-xs text-gray-400">Certifications</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  {contractor.primaryState && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{contractor.primaryState} • {contractor.serviceRadius}km service radius</span>
                    </div>
                  )}
                  {contractor.yearsInBusiness && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span>{contractor.yearsInBusiness} years in business</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {showBookButton && (
                  <Button
                    onClick={() => handleBookNow(contractor)}
                    className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white"
                  >
                    Book Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
