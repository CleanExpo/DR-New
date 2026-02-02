# Client Dashboard Integration Plan - Day 5

**Goal:** Reduce `apps/web/app/dashboard/client/page.tsx` from 4,240 lines to <500 lines

**Current Status:** 4,240 lines, 22+ useState hooks, hardcoded colors

---

## Audit Results

### Current Dashboard Structure

**Lines 1-200:** Imports and State Management (22+ useState hooks)
- Multiple useState for requests, filters, modals, analytics, notifications, etc.
- Can be consolidated with custom hooks

**Lines 200-800:** Data Fetching Functions
- `fetchServiceRequests()`, `fetchAnalytics()`, `fetchNotifications()`, etc.
- Can be moved to custom hooks

**Lines 800-1350:** Mock Data (serviceCategories, availableServices arrays)
- Should remain as is or move to separate config file

**Lines 1350-1570:** Overview Tab Render (Main Dashboard)
- **Lines 1414-1432:** Welcome Header (hardcoded gradient #00BFA6)
  - **Replace with:** `<DashboardHeader />`
- **Lines 1450-1498:** 4 Quick Stats Cards (bg-gray-800, hardcoded colors)
  - **Replace with:** `<StatsOverview />`
- **Lines 1500-1518:** Service Categories Grid
  - Keep as is (simple grid)
- **Lines 1521-1565:** Quick Actions (2 cards for Request Service & Browse)
  - **Replace with:** `<QuickActionsPanel />`

**Lines 1570-2300:** Services Tab Render
- Service listings, contractor cards
- Can use `<ServiceRequestCard />` components

**Lines 2300-3500:** Requests Tab Render
- Service request list with filters
  - **Replace with:** `<RequestsTable />` or `<ServiceRequestCard />` grid

**Lines 3500-4240:** Messages, Settings, other tabs
- Messages tab → **Replace with:** `<MessageCenter />`
- Various modals and dialogs

---

## Integration Order (Least to Most Complex)

### Phase 1: Header & Stats (High Impact, Low Risk) ✅
**Estimate:** 30 minutes

1. **Replace Welcome Header (lines 1414-1432)**
   - Import `DashboardHeader` component
   - Replace hardcoded gradient section
   - Pass user data, search handler, notification count

2. **Replace Stats Cards (lines 1450-1498)**
   - Import `StatsOverview` component
   - Map analytics data to StatItem[] interface
   - Replace 4 individual Card components

**Expected Reduction:** ~100 lines → ~20 lines

---

### Phase 2: Quick Actions (Medium Impact, Low Risk) ✅
**Estimate:** 20 minutes

1. **Replace Quick Actions (lines 1521-1565)**
   - Import `QuickActionsPanel` component
   - Create QuickAction[] array with handlers
   - Replace 2 Card components

**Expected Reduction:** ~50 lines → ~15 lines

---

### Phase 3: Service Requests Display (High Impact, Medium Risk) ✅
**Estimate:** 1 hour

1. **Replace Service Request Cards Grid**
   - Import `ServiceRequestCard` component
   - Map serviceRequests array to components
   - Add onViewDetails and onCancel handlers

2. **Or Use Requests Table**
   - Import `RequestsTable` component
   - Pass serviceRequests array
   - Handle sorting/filtering

**Expected Reduction:** ~200 lines → ~50 lines

---

### Phase 4: State Management Refactor (High Impact, High Risk) ✅
**Estimate:** 2 hours

1. **Replace useState with useServiceRequests hook**
   ```tsx
   // Before: 5+ useState for requests management
   const [serviceRequests, setServiceRequests] = useState([]);
   const [filteredRequests, setFilteredRequests] = useState([]);
   const [loadingRequests, setLoadingRequests] = useState(false);
   const [filters, setFilters] = useState({...});

   // After: 1 custom hook
   const {
     requests,
     filteredRequests,
     loading,
     filters,
     setFilters,
     refreshRequests,
     cancelRequest
   } = useServiceRequests();
   ```

2. **Replace analytics state with useClientAnalytics**
   ```tsx
   // Before: useState + fetch function
   const [analytics, setAnalytics] = useState(null);

   // After: 1 custom hook
   const { analytics, loading } = useClientAnalytics(requests);
   ```

**Expected Reduction:** ~150 lines of state management → ~20 lines

---

### Phase 5: Messaging (Medium Impact, Medium Risk) ✅
**Estimate:** 1 hour

1. **Replace Messages Tab**
   - Import `MessageCenter` component
   - Map messages/threads data structure
   - Replace entire messages tab render

**Expected Reduction:** ~200 lines → ~30 lines

---

### Phase 6: Additional Components (Low Impact, Optional) ⏳
**Estimate:** 1-2 hours

If dashboard has:
- Payment section → Use `<PaymentSummary />`
- Insurance section → Use `<InsuranceInfoCard />`
- Property section → Use `<PropertyDetailsCard />`
- Booking section → Use `<BookingCalendar />`
- Document uploads → Use `<DocumentUploadZone />`
- Activity feed → Use `<RecentActivityFeed />`
- Alerts → Use `<EmergencyAlertBanner />`

---

## Design Token Replacements

### Find & Replace (Automated)

**Hardcoded Colors → Design Tokens:**
```bash
# Background colors
bg-gray-800 → bg-portal-card
bg-gray-900 → bg-portal-bg

# Border colors
border-gray-700 → border-portal-border
border-gray-600 → border-portal-border

# Text colors
text-gray-400 → text-portal-muted
text-gray-300 → text-portal-muted
text-white → text-gray-900 (or leave as text-white for dark theme)

# Brand colors
#00BFA6 → semantic-contractor (or use as className)
bg-[#00BFA6] → bg-semantic-contractor
text-[#00BFA6] → text-semantic-contractor
border-[#00BFA6] → border-semantic-contractor
```

**Safety Check:** Test dark theme compatibility after replacements

---

## Testing Checklist

### Visual Regression Testing
- [ ] Overview tab renders correctly
- [ ] All stats display proper values
- [ ] Quick actions are clickable
- [ ] Service requests display properly
- [ ] Filters work correctly
- [ ] Messages tab functional
- [ ] Modals open/close correctly

### Responsive Design Testing
- [ ] Mobile (375px) - components stack properly
- [ ] Tablet (768px) - 2-column layouts
- [ ] Desktop (1920px) - full grid layouts

### Functional Testing
- [ ] Create new service request works
- [ ] Filter/sort requests works
- [ ] View request details works
- [ ] Cancel request works
- [ ] Send message works
- [ ] Search works
- [ ] Notifications work

### Performance Testing
- [ ] Page load time <3s
- [ ] No console errors
- [ ] No excessive re-renders
- [ ] Lighthouse Performance >90
- [ ] Lighthouse Accessibility >95

---

## Expected Final Structure

```tsx
'use client';

import { DashboardHeader } from '@/components/client/DashboardHeader';
import { StatsOverview } from '@/components/client/StatsOverview';
import { QuickActionsPanel } from '@/components/client/QuickActionsPanel';
import { ServiceRequestCard } from '@/components/client/ServiceRequestCard';
import { RequestsTable } from '@/components/client/RequestsTable';
import { MessageCenter } from '@/components/client/MessageCenter';
import { useServiceRequests } from '@/hooks/client/useServiceRequests';
import { useClientAnalytics } from '@/hooks/client/useClientAnalytics';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Custom hooks for data management
  const {
    requests,
    filteredRequests,
    loading,
    filters,
    setFilters,
    refreshRequests,
    cancelRequest
  } = useServiceRequests();

  const { analytics } = useClientAnalytics(requests);

  // Handlers
  const handleSearch = (query: string) => {
    setFilters({ ...filters, search: query });
  };

  const handleNewRequest = () => {
    // Handle new request...
  };

  // Stats data
  const stats = [
    {
      label: 'Total Requests',
      value: analytics?.overview?.totalRequests || 0,
      icon: FileText,
      trend: 'up',
      change: '+12%',
      color: 'teal',
    },
    // ... more stats
  ];

  // Quick actions
  const quickActions = [
    {
      label: 'New Request',
      icon: Plus,
      onClick: handleNewRequest,
      color: 'teal',
    },
    // ... more actions
  ];

  return (
    <ClientLayout>
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <DashboardHeader
            user={user}
            onSearch={handleSearch}
            notificationCount={5}
            onNotificationClick={() => {}}
          />

          <StatsOverview stats={stats} />

          <QuickActionsPanel actions={quickActions} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <ServiceRequestCard
                key={request.id}
                request={request}
                onViewDetails={handleViewDetails}
                onCancel={cancelRequest}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <MessageCenter
          threads={messageThreads}
          currentUserId={user.id}
          onSendMessage={handleSendMessage}
        />
      )}
    </ClientLayout>
  );
}
```

**Target Line Count:** <500 lines (90%+ reduction from 4,240 lines)

---

## Rollback Plan

1. **Git Branch:** Create `feat/dashboard-integration` branch
2. **Backup File:** Keep original as `page.tsx.backup`
3. **Feature Flag:** Wrap new dashboard in feature flag if needed
4. **Quick Rollback:** `git checkout main -- apps/web/app/dashboard/client/page.tsx`

---

**Start Time:** 2026-02-02
**Estimated Completion:** 2026-02-02 (6-8 hours)
**Status:** Ready to begin Phase 1
