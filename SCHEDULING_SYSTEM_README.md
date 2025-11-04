# NRPG Platform CRM - Scheduling & Calendar UI System

## Overview

Comprehensive Scheduling UI system built with Next.js 14, React Big Calendar, and shadcn/ui components. This system provides a full-featured calendar interface for managing technician appointments with conflict detection and route optimization.

## Components Created

### 1. AppointmentDetailsModal (`components/schedule/AppointmentDetailsModal.tsx`)
- Display and manage detailed appointment information
- Status update dropdown
- Cancel appointment functionality
- Work order, client, and technician details
- Actual vs. scheduled times

### 2. AvailabilityChecker (`components/schedule/AvailabilityChecker.tsx`)
- Check and display technician availability
- Visual timeline of available/booked slots
- Real-time conflict warnings

### 3. ScheduleOptimizer (`components/schedule/ScheduleOptimizer.tsx`)
- Optimize technician routes to minimize travel time
- Display appointments in optimized order
- Efficiency rating calculation
- Apply optimized schedules with one click

## Pages Created

### 1. Calendar View (`app/admin/schedule/page.tsx`)
**Route**: `/admin/schedule`

Features:
- Monthly/weekly/daily/agenda calendar views
- Color-coded by status (Scheduled: blue, In Progress: yellow, Completed: green, Cancelled: red)
- Technician filter dropdown
- Emergency appointments highlighted with red border
- Click appointments to view details
- Create appointment button

### 2. Create Appointment (`app/admin/schedule/new/page.tsx`)
**Route**: `/admin/schedule/new`

Features:
- Work order selection dropdown
- Technician selection
- Date/time pickers for start and end
- Duration calculator
- Travel time input
- Emergency flag checkbox
- Notes field
- Conflict detection with warnings
- Form validation with Zod
- Availability checker sidebar

### 3. Technician Schedule View (`app/admin/schedule/technician/[id]/page.tsx`)
**Route**: `/admin/schedule/technician/{technicianId}`

Features:
- Daily schedule grid (9 AM - 5 PM time slots)
- Available vs. booked visualization
- Summary statistics (total appointments, hours, travel time, emergencies)
- Date navigation (previous/next/today)
- Schedule optimizer sidebar
- Click appointments to view details

## Installation

Dependencies installed:
```bash
npm install react-big-calendar date-fns
```

Existing dependencies used:
- react-hook-form
- @hookform/resolvers
- zod
- lucide-react
- @radix-ui components

## API Integration

### Required API Endpoints

1. **GET /api/schedule** - Fetch appointments (with optional technicianId and date filters)
2. **POST /api/schedule** - Create new appointment
3. **GET /api/schedule/availability** - Check technician availability
4. **PATCH /api/schedule/appointments/{id}** - Update appointment
5. **DELETE /api/schedule/appointments/{id}** - Cancel appointment
6. **POST /api/schedule/optimize** - Optimize technician route
7. **GET /api/jobs** - Fetch work orders
8. **GET /api/staff** - Fetch all technicians
9. **GET /api/staff/{id}** - Fetch single technician

## Usage

### Viewing the Calendar
1. Navigate to `/admin/schedule`
2. Select view mode (month, week, day, agenda)
3. Filter by technician (optional)
4. Click appointment to view details

### Creating an Appointment
1. Click "Create Appointment" button
2. Fill in required fields (work order, technician, dates)
3. Check availability in sidebar
4. Submit form (conflict warnings will appear if applicable)

### Viewing Technician Schedule
1. Navigate to `/admin/schedule/technician/{id}`
2. View daily schedule grid
3. Navigate between dates
4. Click appointment to view details
5. Use optimizer to optimize route

## Features

 Monthly/weekly/daily calendar views (react-big-calendar)
 Color-coded by status with emergency highlighting
 Conflict detection and warnings
 Availability checking with visual timeline
 Route optimization with efficiency metrics
 Form validation with Zod
 Australian date format (DD/MM/YYYY)
 Mobile responsive
 Loading states and error handling
 Toast notifications

## Technical Stack

- **Next.js 14** - App Router with Server/Client Components
- **React Big Calendar** - Calendar component
- **date-fns** - Date formatting (en-AU locale)
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Form validation
- **TypeScript** - Full type safety

## Files Created

### Types
- `types/schedule.ts` - Appointment, TimeSlot, AvailabilityResponse, OptimizedRoute

### Components
- `components/schedule/AppointmentDetailsModal.tsx`
- `components/schedule/AvailabilityChecker.tsx`
- `components/schedule/ScheduleOptimizer.tsx`

### Pages
- `app/admin/schedule/page.tsx`
- `app/admin/schedule/new/page.tsx`
- `app/admin/schedule/technician/[id]/page.tsx`

### Utilities
- `lib/utils.ts` - cn() utility for Tailwind class merging

## Next Steps

The UI is complete and ready to integrate with the API endpoints. You may need to:

1. Ensure all API endpoints are implemented and return correct data structures
2. Add authentication/authorization to admin routes
3. Test with real data
4. Customize calendar colors and styles as needed
5. Add pagination for large appointment lists
6. Implement drag-and-drop rescheduling (optional enhancement)

---

**Version**: 1.0.0
**Status**: Complete
**Last Updated**: November 2025
