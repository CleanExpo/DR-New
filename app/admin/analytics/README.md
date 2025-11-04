# Analytics Dashboard

Comprehensive analytics and reporting system for the NRPG Platform CRM.

## Overview

The Analytics Dashboard provides business intelligence, data visualisation, and reporting capabilities for monitoring platform performance, revenue, contractors, and jobs.

## Pages

### 1. Dashboard (`/admin/analytics`)
Main analytics overview with:
- **KPI Cards**: Total Revenue, Active Jobs, Contractors, Avg Completion Time
- **Revenue Trends**: 12-month line chart
- **Job Status Distribution**: Pie chart
- **Jobs by Service Type**: Horizontal bar chart
- **Contractor Performance**: Top 10 contractors
- **Monthly Trends**: Area chart (jobs created vs completed)
- **Recent Activity**: Last 20 activities

### 2. Revenue Analytics (`/admin/analytics/revenue`)
Deep dive into financial metrics:
- **6 Revenue KPIs**: Total, Subscriptions, Job Payments, Outstanding, Refunded, Net Profit
- **Revenue Breakdown**: 30-day stacked area chart
- **Payment Methods**: Pie chart distribution
- **Top Revenue Generators**: Location-based ranking
- **Revenue Forecast**: Trend prediction chart

### 3. Contractor Analytics (`/admin/analytics/contractors`)
Contractor performance metrics:
- **Summary Cards**: Total contractors, Avg rating, Response time, Utilization
- **Leaderboard**: Sortable by jobs, revenue, or rating
- **Subscription Distribution**: By tier (25km, 50km, 100km, rural)
- **Contractor Utilization**: Job distribution chart

### 4. Job Analytics (`/admin/analytics/jobs`)
Job-specific insights:
- **Job Metrics**: Total jobs, Duration, Completion rate, Emergency jobs
- **Job Timeline**: Visual timeline of recent jobs
- **Priority Distribution**: Pie chart by priority level
- **Location Distribution**: Jobs by location
- **Completion Rate Trend**: Monthly trend line
- **Duration Distribution**: Histogram of job lengths

### 5. Reports (`/admin/analytics/reports`)
Generate and download reports:
- **Report Templates**:
  - Monthly Business Summary
  - Contractor Performance Report
  - Financial Statement
  - Tax Report (GST breakdown)
  - Client Activity Report
  - Compliance Report
- **Export Formats**: PDF, CSV, Excel, JSON
- **Filters**: Date range, contractor, service type, status
- **Saved Reports**: Download history

### 6. Real-time Analytics (`/admin/analytics/realtime`)
Live dashboard with auto-updates:
- **Live Metrics**: Auto-updating every 5 seconds
  - Active users online
  - Jobs created today
  - Revenue today
  - New contractors
- **Live Activity Feed**: Real-time stream of activities
- **Live Map**: Active job locations with pulsing markers

## Components

### Reusable Chart Components

#### `MetricCard`
KPI card with value, change indicator, icon, and description.

```tsx
<MetricCard
  title="Total Revenue"
  value="$487,500"
  change={12.5}
  icon={DollarSign}
  color="text-green-600"
  description="Year to date"
/>
```

#### `RevenueLineChart`
Multi-line chart for revenue trends.

```tsx
<RevenueLineChart
  data={revenueData}
  height={350}
  colors={{
    total: '#2563eb',
    subscriptions: '#10b981',
    jobPayments: '#f59e0b',
  }}
/>
```

#### `JobPieChart`
Pie/donut chart for status or type distribution.

```tsx
<JobPieChart
  data={statusData}
  innerRadius={60}
  showLegend={true}
/>
```

#### `PerformanceBarChart`
Horizontal or vertical bar chart for performance metrics.

```tsx
<PerformanceBarChart
  data={contractorData}
  orientation="horizontal"
  gradientColors={true}
/>
```

#### `AreaChartComponent`
Stacked or overlapping area chart.

```tsx
<AreaChartComponent
  data={trendsData}
  dataKeys={[
    { key: 'created', name: 'Jobs Created', color: '#3b82f6' },
    { key: 'completed', name: 'Jobs Completed', color: '#10b981' },
  ]}
/>
```

#### `DateRangePicker`
Date range selector with presets.

```tsx
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  presets={true}
/>
```

#### `FilterPanel`
Comprehensive filter panel with multi-select.

```tsx
<FilterPanel
  config={filterConfig}
  values={filters}
  onChange={setFilters}
  onExport={handleExport}
/>
```

## Utility Functions

### `lib/analytics-utils.ts`

#### Currency Formatting
```typescript
formatCurrency(487500) // "$487,500"
formatCurrencyDetailed(487500.50) // "$487,500.50"
```

#### Number Formatting
```typescript
formatNumber(1500) // "1.5K"
formatNumber(2500000) // "2.5M"
```

#### Percentage Formatting
```typescript
formatPercentage(12.5) // "+12.5%"
formatPercentage(-5.2) // "-5.2%"
```

#### Duration Formatting
```typescript
formatDuration(1.5) // "1.5 hrs"
formatDuration(36) // "1d 12h"
```

#### Change Calculations
```typescript
calculateChange(current, previous) // Returns percentage
getTrendDirection(change) // 'up' | 'down' | 'neutral'
getChangeColor(change) // Tailwind color class
getChangeBgColor(change) // Tailwind background class
```

#### Data Transformation
```typescript
transformRevenueData(apiData) // Convert to chart format
transformJobStatusData(statusCounts) // Convert to pie chart format
transformContractorData(contractors) // Convert to performance chart format
```

#### Export Functions
```typescript
exportToCSV(data, filename) // Export data to CSV file
```

## API Integration

### Endpoints

#### Dashboard
```
GET /api/analytics/dashboard
Query params: dateFrom, dateTo, tenantId
Returns: KPIs and dashboard metrics
```

#### Revenue
```
GET /api/analytics/revenue
Query params: dateFrom, dateTo, groupBy
Returns: Revenue breakdown and trends
```

#### Contractors
```
GET /api/analytics/contractors
Query params: dateFrom, dateTo, sortBy
Returns: Contractor performance metrics
```

#### Jobs
```
GET /api/analytics/jobs
Query params: dateFrom, dateTo, status, serviceType
Returns: Job analytics and distribution
```

#### Export Reports
```
POST /api/analytics/reports/export
Body: { template, format, filters, dateRange }
Returns: Report file URL
```

#### Real-time (SSE)
```
GET /api/analytics/realtime
Returns: Server-Sent Events stream
```

## Styling

### Light Mode
- Grid: `#E5E7EB`
- Text: `#6B7280`
- Tooltip: White background

### Dark Mode
- Grid: `#374151`
- Text: `#9CA3AF`
- Tooltip: `#1F2937` background

### Chart Colors
```typescript
const CHART_COLORS = {
  light: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    info: '#22d3ee',
  },
};
```

## Performance Optimisation

### Implemented
- Lazy loading of charts (`React.lazy`)
- Memoisation of expensive calculations
- Code splitting per analytics page
- Debounced filter changes
- Virtual scrolling for large tables

### Caching
- API responses cached for 1 minute
- Client-side state management with React Query (recommended)

## Localisation

### Australian English
All dates, currency, and numbers formatted for Australia:
- Date format: `DD/MM/YYYY`
- Currency: AUD ($)
- Number format: Australian standard

### Time Formatting
- Relative times: "5 mins ago", "2 hours ago"
- Absolute times: Australian date format

## Future Enhancements

### Phase 2
- [ ] Google Maps integration for live job tracking
- [ ] Real-time WebSocket updates (replace mock SSE)
- [ ] Advanced filtering with saved filters
- [ ] Custom dashboard builder (drag & drop)
- [ ] Scheduled report generation
- [ ] Email delivery of reports
- [ ] Data export to accounting software

### Phase 3
- [ ] Predictive analytics with ML
- [ ] Anomaly detection
- [ ] Automated insights and recommendations
- [ ] Custom metric builder
- [ ] Multi-tenant comparison
- [ ] Mobile-optimised analytics app

## Development

### Adding New Charts
1. Create component in `components/analytics/`
2. Use Recharts library
3. Follow existing patterns for tooltips, legends, colours
4. Support light/dark mode
5. Make responsive
6. Add to exports in `components/analytics/index.ts`

### Adding New Pages
1. Create page in `app/admin/analytics/[name]/page.tsx`
2. Add route to navigation in `layout.tsx`
3. Create API route in `app/api/analytics/[name]/route.ts`
4. Update this README

### Testing
```bash
npm run dev
# Visit http://localhost:3000/admin/analytics
```

## Dependencies

### Production
- `recharts` - Chart library
- `date-fns` - Date manipulation
- `jspdf` - PDF generation
- `jspdf-autotable` - PDF tables
- `papaparse` - CSV export

### Dev Dependencies
- `@types/papaparse` - TypeScript types

## Licence

Copyright © 2025 NRPG Platform. All rights reserved.
