'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Building2,
  Calendar,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  Shield,
  Wrench,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyDetail {
  id: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  state: string;
  propertyType: string;
  propertySize: string | null;
  buildingAge: string | null;
  isPrimary: boolean;
  securityAccess: boolean;
  petOnPremises: boolean;
  petDetails: string | null;
  accessInstructions: string | null;
  parkingAvailable: boolean;
  recommendedServices: string[];
  createdAt: string;
}

interface JobSummary {
  id: string;
  serviceType: string;
  status: string;
  date: string;
  contractor: string | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [propRes, jobsRes] = await Promise.all([
          fetch(`/api/client/properties/${id}`),
          fetch(`/api/client/properties/${id}/jobs`),
        ]);
        if (propRes.ok) {
          const data = await propRes.json();
          setProperty(data.property);
        }
        if (jobsRes.ok) {
          const data = await jobsRes.json();
          setJobs(data.jobs || []);
        }
      } catch (err) {
        console.error('Failed to fetch property:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    if (process.env.NODE_ENV === 'development') {
      setProperty({
        id,
        streetAddress: '42 Harbour Street',
        suburb: 'Sydney',
        postcode: '2000',
        state: 'NSW',
        propertyType: 'Apartment',
        propertySize: '85 sqm',
        buildingAge: '2015',
        isPrimary: true,
        securityAccess: true,
        petOnPremises: false,
        petDetails: null,
        accessInstructions: 'Intercom code: 4221. Lift to level 8.',
        parkingAvailable: true,
        recommendedServices: ['Annual mould inspection', 'Gutter cleaning'],
        createdAt: '2024-03-15T10:00:00Z',
      });
      setJobs([
        {
          id: 'job-1',
          serviceType: 'Water Damage Restoration',
          status: 'COMPLETED',
          date: '2025-01-15',
          contractor: 'Sydney Restoration Pro',
        },
        {
          id: 'job-2',
          serviceType: 'Mould Remediation',
          status: 'IN_PROGRESS',
          date: '2025-02-28',
          contractor: 'CleanAir Solutions',
        },
        {
          id: 'job-3',
          serviceType: 'Roof Inspection',
          status: 'PENDING',
          date: '2025-03-10',
          contractor: null,
        },
      ]);
      setLoading(false);
    }
  }, [id]);

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-300 border-0 rounded-sm text-[10px]">
            <CheckCircle className="h-2.5 w-2.5 mr-1" />
            Completed
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge className="bg-cyan-500/20 text-cyan-300 border-0 rounded-sm text-[10px]">
            <Clock className="h-2.5 w-2.5 mr-1" />
            In Progress
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className="bg-amber-500/20 text-amber-300 border-0 rounded-sm text-[10px]">
            <AlertCircle className="h-2.5 w-2.5 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-white/10 text-white/60 border-0 rounded-sm text-[10px]">
            {status}
          </Badge>
        );
    }
  };

  const quickLinks = [
    {
      label: 'Maintenance Requests',
      icon: Wrench,
      href: `/dashboard/property/${id}/maintenance`,
      description: 'Track and submit maintenance requests',
      colour: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Documents',
      icon: FileText,
      href: `/dashboard/property/${id}/documents`,
      description: 'Upload and manage property documents',
      colour: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Communications',
      icon: MessageSquare,
      href: `/dashboard/property/${id}/communications`,
      description: 'Messages and tenant communications',
      colour: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <Home className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white/60">Property not found</h3>
          <Button
            onClick={() => router.push('/dashboard/properties')}
            className="mt-4 bg-teal-600 hover:bg-teal-700 rounded-sm"
          >
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/properties')}
          className="text-white/50 hover:text-white mb-6 -ml-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          All Properties
        </Button>

        {/* Property Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-sm bg-teal-500/10 flex items-center justify-center shrink-0">
              <Home className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {property.streetAddress}
                </h1>
                {property.isPrimary && (
                  <Badge className="bg-teal-500/20 text-teal-300 border-0 text-[10px] rounded-sm">
                    Primary
                  </Badge>
                )}
              </div>
              <p className="text-sm text-white/50 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {property.suburb}, {property.state} {property.postcode}
              </p>
            </div>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Property Info */}
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/70">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailRow label="Type" value={property.propertyType} />
              {property.propertySize && <DetailRow label="Size" value={property.propertySize} />}
              {property.buildingAge && <DetailRow label="Year Built" value={property.buildingAge} />}
              <DetailRow label="Parking" value={property.parkingAvailable ? 'Available' : 'Not available'} />
            </CardContent>
          </Card>

          {/* Access & Safety */}
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/70">Access & Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DetailRow
                label="Security"
                value={property.securityAccess ? 'Security access required' : 'No security'}
              />
              <DetailRow
                label="Pets"
                value={
                  property.petOnPremises
                    ? property.petDetails || 'Pet on premises'
                    : 'No pets'
                }
              />
              {property.accessInstructions && (
                <div>
                  <p className="text-xs text-white/40 mb-1">Access Instructions</p>
                  <p className="text-sm text-white/80 bg-white/5 rounded-sm p-2">
                    {property.accessInstructions}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
          Property Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card
                key={link.href}
                className="bg-white/[0.02] border-white/[0.06] hover:border-teal-500/30 transition-colors cursor-pointer rounded-sm"
                onClick={() => router.push(link.href)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('h-9 w-9 rounded-sm flex items-center justify-center', link.bg)}>
                      <Icon className={cn('h-4 w-4', link.colour)} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{link.label}</p>
                      <p className="text-xs text-white/40">{link.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/20" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommended Services */}
        {property.recommendedServices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
              Recommended Services
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.recommendedServices.map((service) => (
                <Badge
                  key={service}
                  variant="outline"
                  className="border-teal-500/20 text-teal-300 rounded-sm"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Job History */}
        <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
          Job History
        </h2>
        {jobs.length === 0 ? (
          <Card className="bg-white/[0.02] border-white/[0.06] rounded-sm">
            <CardContent className="py-8 text-center">
              <Wrench className="h-8 w-8 text-white/20 mx-auto mb-3" />
              <p className="text-sm text-white/40">No jobs recorded for this property yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] transition-colors rounded-sm cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-sm bg-white/5 flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-white/40" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{job.serviceType}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-white/40">{job.date}</span>
                          {job.contractor && (
                            <>
                              <span className="text-white/20">&middot;</span>
                              <span className="text-xs text-white/40">{job.contractor}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(job.status)}
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/40">{label}</span>
      <span className="text-sm text-white/80">{value}</span>
    </div>
  );
}
