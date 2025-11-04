# NRPG Platform - Modern CRM Layout System

**Version**: 1.0.0
**Created**: November 2025
**Architecture**: Next.js 14 App Router + TypeScript + Tailwind CSS

---

## Overview

A comprehensive modern CRM layout system featuring collapsible sidebar navigation, dark mode support, and responsive design inspired by 2025 dashboard design trends.

## Architecture Components

### 1. Theme System

#### ThemeProvider (`components/theme/ThemeProvider.tsx`)
- Manages light/dark/system theme modes
- Persists user preference in localStorage
- Listens to system colour scheme changes
- Provides `useTheme` hook for components

#### ThemeToggle (`components/theme/ThemeToggle.tsx`)
- Animated sun/moon icon toggle
- Smooth transitions between themes
- Accessible with ARIA labels

**Usage:**
```tsx
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

// In your app
<ThemeProvider defaultTheme="system">
  {children}
</ThemeProvider>

// In components
const { theme, setTheme } = useTheme()
```

### 2. Layout Components

#### Sidebar (`components/layout/Sidebar.tsx`)
**Features:**
- Collapsible: 280px expanded, 64px collapsed
- Animated transitions with Framer Motion
- Active link highlighting
- Nested menu items with expand/collapse
- User profile section
- Logout button
- Persists state in localStorage

**Menu Structure:**
```
Dashboard
Jobs
  ├─ All Jobs
  ├─ Create Job
  └─ Emergency Queue
Schedule
  ├─ Calendar View
  ├─ Create Appointment
  └─ Optimise Routes
Invoices
  ├─ All Invoices
  ├─ Create Invoice
  └─ Financial Summary
Contractors
  ├─ All Contractors
  ├─ Matching
  └─ Subscriptions
Analytics
  ├─ Dashboard
  ├─ Reports
  └─ Revenue
Settings
```

#### Header (`components/layout/Header.tsx`)
**Features:**
- Dynamic breadcrumb navigation
- Search bar (desktop only)
- Notifications dropdown with badge
- Theme toggle button
- Mobile menu hamburger
- Syncs with sidebar collapse state

#### Admin Layout (`app/admin/layout.tsx`)
**Features:**
- Wraps all admin pages
- Manages sidebar collapse state
- Coordinates sidebar and header animations
- Includes ThemeProvider
- Responsive: drawer on mobile, fixed on desktop

### 3. Dashboard Page (`app/admin/page.tsx`)

**Sections:**
1. **Metric Cards** (4 cards)
   - Total Jobs
   - Active Jobs
   - Revenue
   - Contractors

2. **Recent Jobs Table**
   - Job ID, title, client
   - Priority badges (High/Medium/Low)
   - Status indicators
   - Dates

3. **Activity Feed**
   - Recent actions
   - Timestamps
   - Icons for activity types

4. **Quick Actions**
   - Create New Job
   - View Analytics
   - Manage Contractors

### 4. Enhanced Card Component (`components/ui/Card.tsx`)

**New Props:**
- `hover`: Enables hover lift effect
- `gradient`: Adds dark mode gradient borders

**Usage:**
```tsx
<Card hover gradient>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Colour Scheme

### Light Mode
```css
--background: #FFFFFF
--sidebar: #FFFFFF
--text: #111827
--primary: #3B82F6 (blue)
--success: #10B981 (green)
--warning: #F59E0B (amber)
--destructive: #EF4444 (red)
```

### Dark Mode
```css
--background: #0F172A
--sidebar: #1E293B
--text: #F1F5F9
--primary: #60A5FA (lighter blue)
--borders: #334155
```

## Typography System

```css
H1: text-3xl lg:text-4xl font-bold tracking-tight
H2: text-2xl lg:text-3xl font-bold tracking-tight
H3: text-xl lg:text-2xl font-bold tracking-tight
Body: text-sm lg:text-base
Small: text-xs
```

## Responsive Breakpoints

- **Mobile** (< 768px): Full-screen drawer sidebar
- **Tablet** (768px - 1024px): Fixed collapsed sidebar
- **Desktop** (> 1024px): Collapsible sidebar

## State Management

### Sidebar Collapse State
- Stored in localStorage: `nrpg-sidebar-collapsed`
- Default: `false` (expanded)
- Persists across sessions

### Theme State
- Stored in localStorage: `nrpg-theme`
- Options: `light`, `dark`, `system`
- Default: `system`

## Animation Specifications

### Sidebar Collapse
```tsx
animate={{ width: collapsed ? 64 : 280 }}
transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
```

### Theme Transitions
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Card Hover
```css
transition: all 0.3s ease-in-out
hover: transform translateY(-4px) + shadow-lg
```

## Performance Optimizations

1. **Transform over Width**: Sidebar uses `transform` for smooth 60fps animations
2. **Lazy Loading**: Chart components can be lazy loaded
3. **Memoization**: Expensive calculations memoized with `React.useMemo`
4. **CSS Variables**: All colours use CSS variables for instant theme switching

## Accessibility

- **Keyboard Navigation**: All interactive elements keyboard accessible
- **ARIA Labels**: Proper ARIA labels on buttons and toggles
- **Focus States**: Clear focus indicators
- **Screen Readers**: `sr-only` class for screen reader text
- **Colour Contrast**: WCAG AA compliant in both themes

## File Structure

```
app/
  admin/
    layout.tsx          # CRM layout wrapper
    page.tsx           # Dashboard page
    jobs/
    schedule/
    invoices/
    contractors/
    analytics/
    settings/

components/
  theme/
    ThemeProvider.tsx  # Theme context provider
    ThemeToggle.tsx    # Theme toggle button
  layout/
    Sidebar.tsx        # Collapsible sidebar
    Header.tsx         # Top header with breadcrumbs
  ui/
    Card.tsx           # Enhanced card component
    button.tsx         # Button component

app/globals.css        # Global styles + CSS variables
tailwind.config.ts     # Tailwind configuration
```

## Usage Guide

### Creating New Admin Pages

1. Create page in `app/admin/[section]/page.tsx`
2. Add route to sidebar menu in `Sidebar.tsx`
3. Page automatically inherits layout and theme

**Example:**
```tsx
// app/admin/jobs/page.tsx
export default function JobsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
      {/* Content */}
    </div>
  )
}
```

### Adding New Menu Items

In `components/layout/Sidebar.tsx`:
```tsx
const menuItems: MenuItem[] = [
  // ... existing items
  {
    title: 'New Section',
    href: '/admin/new-section',
    icon: IconComponent,
    children: [ // optional nested items
      { title: 'Sub Item', href: '/admin/new-section/sub', icon: Icon }
    ]
  }
]
```

### Using Theme in Components

```tsx
'use client'

import { useTheme } from '@/components/theme/ThemeProvider'

export function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-background text-foreground">
      Current theme: {theme}
    </div>
  )
}
```

## CSS Variables Reference

All theme colours are available as CSS variables:

```css
/* Layout */
var(--background)
var(--foreground)
var(--sidebar)
var(--sidebar-foreground)
var(--sidebar-border)
var(--sidebar-hover)

/* Semantic */
var(--primary)
var(--success)
var(--warning)
var(--destructive)
var(--muted)
var(--accent)

/* Components */
var(--card)
var(--border)
var(--input)
var(--ring)
```

## Mobile Behaviour

### Tablet and Below
- Sidebar becomes full-screen overlay
- Hamburger menu in header
- Swipe gestures (future enhancement)
- Touch-optimised tap targets (44px minimum)

### Desktop
- Fixed sidebar
- Collapsible with button
- Persists state
- Keyboard shortcuts (future enhancement)

## Integration with Existing APIs

The dashboard integrates with Phase 2 APIs:

```tsx
// Example: Fetching dashboard data
const response = await fetch('/api/analytics/dashboard')
const data = await response.json()

// Data structure
{
  metrics: {
    totalJobs: number
    activeJobs: number
    revenue: number
    contractors: number
  },
  recentJobs: Job[],
  activities: Activity[]
}
```

## Future Enhancements

### Planned Features
1. **Charts Integration**: Recharts for revenue and analytics
2. **Real-time Updates**: WebSocket integration for live data
3. **Notifications System**: Full notification panel
4. **User Preferences**: Save layout preferences per user
5. **Keyboard Shortcuts**: CMD+K for quick navigation
6. **Search Enhancement**: Global search with results preview
7. **Export Functionality**: PDF/CSV export for reports
8. **Multi-language Support**: i18n integration

### Performance Goals
- Initial load: < 1s
- Sidebar animation: 60fps
- Theme switch: Instant
- Page navigation: < 200ms

## Testing Checklist

### Visual Testing
- [ ] Light mode colours correct
- [ ] Dark mode colours correct
- [ ] Sidebar collapse animation smooth
- [ ] Hover effects working
- [ ] Icons displaying correctly

### Functional Testing
- [ ] Theme persists on reload
- [ ] Sidebar state persists on reload
- [ ] Navigation works correctly
- [ ] Breadcrumbs update properly
- [ ] Mobile drawer opens/closes

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announcements
- [ ] Focus indicators visible
- [ ] Colour contrast meets WCAG AA
- [ ] ARIA labels present

### Responsive Testing
- [ ] Mobile (375px): Drawer sidebar
- [ ] Tablet (768px): Collapsed sidebar
- [ ] Desktop (1440px): Full layout
- [ ] Ultrawide (1920px+): Content centered

## Troubleshooting

### Sidebar Not Animating
- Check Framer Motion is installed: `npm install framer-motion`
- Verify `motion` components are used
- Check browser supports CSS transforms

### Theme Not Persisting
- Clear localStorage: `localStorage.removeItem('nrpg-theme')`
- Check ThemeProvider wraps your app
- Verify localStorage is available

### Icons Not Showing
- Install lucide-react: `npm install lucide-react`
- Check import paths are correct
- Verify icon names match Lucide library

### Build Errors
- Run `npm install` to ensure all dependencies
- Clear Next.js cache: `rm -rf .next`
- Check TypeScript errors: `npm run build`

## Support

For issues or questions:
- Create an issue in the repository
- Contact the development team
- Check the Next.js 14 documentation

---

**Built with:**
- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- Framer Motion 11
- Lucide React (icons)
- shadcn/ui components

**Australian English**: All content uses Australian English spelling and terminology.
