/**
 * CLIENT DASHBOARD PREMIUM COMPONENT INTEGRATION EXAMPLE
 *
 * This file demonstrates how to use the new premium components
 * to replace the hardcoded sections in apps/web/app/dashboard/client/page.tsx
 *
 * DO NOT IMPORT THIS FILE - it's a reference/example only
 */

import { StatsOverview, StatItem } from './StatsOverview';
import { DashboardHeader } from './DashboardHeader';
import { QuickActionsPanel, QuickAction } from './QuickActionsPanel';
import { FileText, Clock, CheckCircle, TrendingUp, Plus, Search as SearchIcon, Calendar } from 'lucide-react';

// ========================================
// EXAMPLE 1: Replace Stats Cards (Lines 1450-1461)
// ========================================

// BEFORE (Current Code):
/*
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card className="bg-gray-800 border-gray-700">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Total Requests</p>
          <p className="text-2xl font-bold text-white">{analytics?.overview?.totalRequests || serviceRequests.length}</p>
        </div>
        <FileText className="h-8 w-8 text-[#00BFA6]" />
      </div>
    </CardContent>
  </Card>
  // ... 3 more duplicate cards
</div>
*/

// AFTER (Premium Components):
function ClientDashboardStatsExample({ analytics, serviceRequests }: any) {
  const stats: StatItem[] = [
    {
      label: 'Total Requests',
      value: analytics?.overview?.totalRequests || serviceRequests.length,
      icon: FileText,
      change: '+12%',
      trend: 'up',
      color: 'teal',
    },
    {
      label: 'Active Pending',
      value: analytics?.overview?.pendingRequests || serviceRequests.filter((r: any) => r.status === 'PENDING').length,
      icon: Clock,
      change: '3 new',
      trend: 'neutral',
      color: 'blue',
    },
    {
      label: 'Completed',
      value: analytics?.overview?.completedRequests || serviceRequests.filter((r: any) => r.status === 'COMPLETED').length,
      icon: CheckCircle,
      change: '+8%',
      trend: 'up',
      color: 'green',
    },
    {
      label: 'Avg Response',
      value: '2.4 hrs',
      icon: TrendingUp,
      change: '-15%',
      trend: 'down',
      color: 'yellow',
    },
  ];

  return <StatsOverview stats={stats} />;
}

// ========================================
// EXAMPLE 2: Replace Dashboard Header
// ========================================

// BEFORE (Current Code):
/*
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-3xl font-bold text-white">Client Dashboard</h1>
    <p className="text-gray-400 mt-1">Manage your requests</p>
  </div>
</div>
*/

// AFTER (Premium Component):
function ClientDashboardHeaderExample({ user, onSearch, notifications }: any) {
  return (
    <DashboardHeader
      user={user}
      onSearch={onSearch}
      notificationCount={notifications?.filter((n: any) => !n.read).length || 0}
      onNotificationClick={() => console.log('Open notifications')}
      subtitle="Manage your disaster recovery requests and track progress"
    />
  );
}

// ========================================
// EXAMPLE 3: Quick Actions Panel
// ========================================

// BEFORE (Current Code):
/*
<div className="flex gap-4">
  <Button onClick={() => setShowServiceModal(true)} className="bg-[#00BFA6]">
    <Plus className="h-4 w-4 mr-2" />
    New Request
  </Button>
  // ... more buttons
</div>
*/

// AFTER (Premium Component):
function ClientDashboardQuickActionsExample({ handlers }: any) {
  const actions: QuickAction[] = [
    {
      label: 'New Request',
      icon: Plus,
      onClick: handlers.openServiceModal,
      color: 'teal',
    },
    {
      label: 'Search Contractors',
      icon: SearchIcon,
      onClick: handlers.searchContractors,
      variant: 'outline',
    },
    {
      label: 'Schedule Visit',
      icon: Calendar,
      onClick: handlers.scheduleVisit,
      color: 'blue',
    },
  ];

  return (
    <QuickActionsPanel
      actions={actions}
      title="Quick Actions"
      description="Common tasks to get you started"
    />
  );
}

// ========================================
// FULL INTEGRATION PATTERN
// ========================================

function RefactoredClientDashboard({ user, serviceRequests, analytics }: any) {
  // Handlers
  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleOpenServiceModal = () => {
    console.log('Open service modal');
  };

  const quickActions: QuickAction[] = [
    {
      label: 'New Request',
      icon: Plus,
      onClick: handleOpenServiceModal,
      color: 'teal',
    },
    // ... more actions
  ];

  const stats: StatItem[] = [
    {
      label: 'Total Requests',
      value: serviceRequests.length,
      icon: FileText,
      change: '+12%',
      trend: 'up',
      color: 'teal',
    },
    // ... more stats
  ];

  return (
    <div className="space-y-6">
      {/* Header with search and notifications */}
      <DashboardHeader
        user={user}
        onSearch={handleSearch}
        notificationCount={5}
      />

      {/* Quick actions panel */}
      <QuickActionsPanel
        actions={quickActions}
        title="Quick Actions"
      />

      {/* Stats overview */}
      <StatsOverview stats={stats} />

      {/* Rest of dashboard content... */}
    </div>
  );
}

/**
 * BENEFITS OF PREMIUM COMPONENTS:
 *
 * 1. Code Reduction: 90%+ less code in main dashboard file
 * 2. Reusability: Same components work in Admin Dashboard
 * 3. Consistency: All stats cards use same styling
 * 4. Maintainability: Update styling in one place
 * 5. Design Tokens: No hardcoded colors (#00BFA6 → semantic-contractor)
 * 6. Premium Effects: Hover lift, gradient icons, smooth transitions
 * 7. TypeScript Safety: Props are type-checked
 * 8. Accessibility: Built on shadcn/ui components
 */

export {
  ClientDashboardStatsExample,
  ClientDashboardHeaderExample,
  ClientDashboardQuickActionsExample,
  RefactoredClientDashboard,
};
