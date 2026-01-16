/**
 * Contractor Dashboard - NRPG Growth Portal
 *
 * Premium contractor dashboard with earth-tone design system.
 * Features:
 * - Magazine-style stats cards
 * - Partnership opportunities table
 * - Featured stories and resources
 * - Brand compliance tracking
 * - Professional profile management
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  StatsCard,
  FeaturedStory,
  OpportunityTable,
  ComplianceSection,
} from '@/components/portal';
import ContractorOnboarding from '@/components/onboarding/contractor-onboarding';
import FloatingChatWidget from '@/components/floating-chat-widget';
import { EligibilityBanner } from '@/components/contractor/eligibility-banner';
import { TrendingUp, DollarSign, Briefcase, Users } from 'lucide-react';

interface DashboardStats {
  activeOpportunities: number;
  pendingBids: number;
  completedProjects: number;
  totalEarnings: number;
  conversionRate: number;
  avgProjectValue: number;
}

interface Opportunity {
  id: string;
  type: string;
  priority: 'Elite' | 'Strategic' | 'New Market' | 'Standard';
  location: string;
  distance: string;
  potentialValue: string;
  imageUrl?: string;
}

export default function ContractorDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [contractorPreferences, setContractorPreferences] = useState<any>(null);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    activeOpportunities: 0,
    pendingBids: 0,
    completedProjects: 0,
    totalEarnings: 0,
    conversionRate: 0,
    avgProjectValue: 0,
  });
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType === 'ADMIN') {
      router.push('/dashboard/admin');
    } else if (user && user.userType === 'CLIENT') {
      router.push('/dashboard/client');
    } else if (user && user.userType === 'CONTRACTOR') {
      checkOnboardingStatus();
      fetchDashboardData();
    }
  }, [user, loading, router]);

  const checkOnboardingStatus = async () => {
    try {
      setLoadingPreferences(true);
      const response = await fetch('/api/contractor/preferences', {
        cache: 'no-store',
      });

      if (response.ok) {
        const preferences = await response.json();
        setContractorPreferences(preferences);

        if (!preferences || !preferences.isOnboardingComplete) {
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } else {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setShowOnboarding(true);
    } finally {
      setLoadingPreferences(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch contractor stats
      const [statsResponse, projectsResponse] = await Promise.all([
        fetch('/api/contractor/profile', { cache: 'no-store' }),
        fetch('/api/contractor/active-projects', { cache: 'no-store' }),
      ]);

      if (statsResponse.ok) {
        const data = await statsResponse.json();
        const profile = data.profile;
        setStats((prev) => ({
          ...prev,
          completedProjects: profile?.totalJobs || 0,
          totalEarnings: profile?.totalEarnings || 0,
        }));
      }

      if (projectsResponse.ok) {
        const data = await projectsResponse.json();
        const projects = data.projects || [];
        setStats((prev) => ({
          ...prev,
          activeOpportunities: projects.length,
        }));
      }

      // Set sample opportunities for demo
      setOpportunities([
        {
          id: '1',
          type: 'Commercial Water Damage',
          priority: 'Elite',
          location: 'Sydney CBD, NSW',
          distance: '12 km away',
          potentialValue: '$45,000 - $65,000',
        },
        {
          id: '2',
          type: 'Residential Mould Remediation',
          priority: 'Strategic',
          location: 'Parramatta, NSW',
          distance: '8 km away',
          potentialValue: '$12,000 - $18,000',
        },
        {
          id: '3',
          type: 'Fire & Smoke Restoration',
          priority: 'New Market',
          location: 'Newcastle, NSW',
          distance: '95 km away',
          potentialValue: '$85,000 - $120,000',
        },
        {
          id: '4',
          type: 'Storm Damage Assessment',
          priority: 'Standard',
          location: 'Wollongong, NSW',
          distance: '45 km away',
          potentialValue: '$8,000 - $15,000',
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleOnboardingComplete = async (preferences: any) => {
    try {
      setLoadingPreferences(true);
      const response = await fetch('/api/contractor/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (response.ok) {
        const savedPreferences = await response.json();
        setContractorPreferences(savedPreferences.preferences);
        setShowOnboarding(false);
      } else {
        console.error('Failed to save contractor preferences');
      }
    } catch (error) {
      console.error('Error saving contractor preferences:', error);
    } finally {
      setLoadingPreferences(false);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setLoadingPreferences(false);
  };

  if (loading || loadingPreferences) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nrpg-teal"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Eligibility Banner */}
      <EligibilityBanner />

      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-portal-text font-heading">
            Welcome back, {user?.name?.split(' ')[0] || 'Partner'}
          </h1>
          <p className="text-portal-muted font-body mt-1">
            Here's your growth summary for today
          </p>
        </div>
        <span className="hidden md:inline-block px-4 py-2 bg-nrpg-teal/10 text-nrpg-teal text-sm font-bold font-heading rounded-full uppercase tracking-wider">
          Growth Partner
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Active Opportunities"
          value={stats.activeOpportunities.toString()}
          trend={{ value: 12, direction: 'up' }}
          icon={<Briefcase className="size-5 text-earth-primary" />}
        />
        <StatsCard
          label="Pending Bids"
          value={stats.pendingBids.toString()}
          trend={{ value: 3, direction: 'up' }}
          icon={<TrendingUp className="size-5 text-nrpg-teal" />}
        />
        <StatsCard
          label="Projects Completed"
          value={stats.completedProjects.toString()}
          sublabel="This quarter"
          icon={<Users className="size-5 text-earth-secondary" />}
        />
        <StatsCard
          label="Total Earnings"
          value={`$${stats.totalEarnings.toLocaleString()}`}
          trend={{ value: 8, direction: 'up' }}
          sublabel="YTD"
          icon={<DollarSign className="size-5 text-portal-success" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Partnership Opportunities */}
          <OpportunityTable
            opportunities={opportunities}
            title="Partnership Opportunities"
            viewAllHref="/dashboard/contractor/opportunities"
          />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-8">
          {/* Featured Story */}
          <FeaturedStory
            badge="Growth Spotlight"
            title="How Elite Partners Are Scaling to $2M+ Revenue"
            description="Discover the strategies our top-performing contractors use to grow their restoration businesses with the NRPG network."
            imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
            href="/dashboard/contractor/resources/growth-guide"
          />

          {/* Brand & Compliance */}
          <ComplianceSection
            nextSession="Dec 15, 2024"
            progress={82}
          />
        </div>
      </div>

      {/* Contractor Onboarding Modal */}
      {showOnboarding && (
        <ContractorOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Floating Chat Widget */}
      {user && (
        <FloatingChatWidget
          currentUserId={user.id}
          currentUserType={user.userType as 'CLIENT' | 'CONTRACTOR' | 'ADMIN'}
        />
      )}
    </div>
  );
}
