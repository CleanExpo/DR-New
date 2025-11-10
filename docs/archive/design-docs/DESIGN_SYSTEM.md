# Disaster Recovery Brisbane - Design System Documentation

## Overview

This document outlines the comprehensive design system created for the Disaster Recovery Brisbane platform, featuring authentic disaster recovery imagery, human-centered design principles, and emergency-optimized user experience.

## 🎯 Design Principles

### 1. Authentic Over Generic
- **Real Images Only**: All imagery sourced from actual disaster recovery operations
- **No Stock Photos**: Authentic equipment, processes, and damage scenarios
- **Trust Through Transparency**: Show actual equipment, real technicians, genuine work

### 2. Emergency-First Design
- **Mobile Priority**: Designed for users in emergency situations on mobile devices
- **High Contrast**: Excellent readability under stress and poor lighting
- **Large Touch Targets**: Easy interaction for users under duress
- **Quick Actions**: Prominent emergency contact (1300 309 361)

### 3. Professional Credibility
- **IICRC Certification**: Prominently displayed throughout
- **Equipment Showcase**: Professional-grade tools and technology
- **Process Transparency**: Clear documentation of every step

## 🖼️ Image Assets & Strategy

### Image Library Structure
```
public/images/
├── hero/ (7 service-specific banners)
│   ├── biohazard-remediation-services.png
│   ├── commercial-restoration-services.jpg
│   ├── disaster-recovery-services.jpg
│   ├── fire-smoke-damage-restoration.jpg
│   ├── fire-water-damage-restoration.jpg
│   ├── mould-remediation-services.jpg
│   └── sewage-remediation-services.png
├── optimized/
│   ├── equipment/ (Professional equipment 3D renders)
│   ├── process/ (Process documentation images)
│   ├── damage/ (Damage scenario examples)
│   └── branding/ (Logo and brand assets)
├── services/ (Service category thumbnails)
└── icons/ (Warning and safety icons)
```

### Image Optimization Strategy
- **Next.js Image Component**: Automatic WebP conversion and optimization
- **Lazy Loading**: Progressive loading with blur placeholders
- **Responsive Sizing**: Multiple breakpoints for different devices
- **Alt Text Standards**: Descriptive accessibility text for all images
- **Error Handling**: Graceful fallbacks for missing images

## 🎨 Visual Design System

### Color Palette

#### Primary Colors
- **Emergency Red**: `#DC2626` - Used for emergency calls and critical alerts
- **Professional Blue**: `#2563EB` - Primary brand color, trust signals
- **Success Green**: `#16A34A` - Certifications, positive actions
- **Warning Orange**: `#EA580C` - Cautions, urgent notifications

#### Neutral Colors
- **Text Primary**: `#111827` - Main content text
- **Text Secondary**: `#6B7280` - Supporting text
- **Background**: `#F9FAFB` - Main page background
- **Card Background**: `#FFFFFF` - Component backgrounds

### Typography

#### Font Stack
- **Primary**: Inter, system-ui, sans-serif
- **Headings**: Font weights 700-900 for impact
- **Body**: Font weight 400-500 for readability
- **Emergency Text**: Font weight 700+ for visibility

#### Hierarchy
```css
/* Hero Titles */
.text-7xl md:text-8xl font-black

/* Section Headings */
.text-4xl md:text-5xl font-bold

/* Component Titles */
.text-2xl md:text-3xl font-bold

/* Body Text */
.text-lg md:text-xl

/* Emergency Contact */
.text-3xl font-black
```

### Spacing System
- **Sections**: `py-20` (80px vertical padding)
- **Components**: `p-6` or `p-8` for cards
- **Grid Gaps**: `gap-6` or `gap-8` for layouts
- **Emergency Elements**: Extra padding for touch accessibility

## 🔧 Component Architecture

### 1. RotatingHeroBanner Component
**Location**: `/components/hero/RotatingHeroBanner.tsx`

**Features**:
- 7 service-specific hero images that rotate every 6 seconds
- Full-screen immersive design with text overlays
- Emergency contact always visible in top-right
- Manual navigation dots for user control
- Mobile-optimized with emergency-first layout

**Usage**:
```tsx
import RotatingHeroBanner from '@/components/hero/RotatingHeroBanner';

<RotatingHeroBanner />
```

### 2. ServicesGrid Component
**Location**: `/components/services/ServicesGrid.tsx`

**Features**:
- Real service images for each disaster recovery category
- Detailed modal views with process information
- Urgency indicators (Critical, Urgent, High, Normal)
- Direct call-to-action buttons for each service
- Cost estimates and response times
- IICRC certification badges

**Usage**:
```tsx
import ServicesGrid from '@/components/services/ServicesGrid';

<ServicesGrid />
```

### 3. EquipmentGallery Component
**Location**: `/components/gallery/EquipmentGallery.tsx`

**Features**:
- Professional equipment showcase with 3D rendered images
- Category filtering (Extraction, Drying, Detection, etc.)
- Lightbox gallery with equipment specifications
- Trust-building through equipment transparency
- IICRC certification information

**Usage**:
```tsx
import EquipmentGallery from '@/components/gallery/EquipmentGallery';

<EquipmentGallery />
```

### 4. ProcessShowcase Component
**Location**: `/components/process/ProcessShowcase.tsx`

**Features**:
- Step-by-step process documentation with real images
- Tabbed interface for different process categories
- Detailed modal views for each process step
- Quality check documentation
- Equipment used for each step
- IICRC compliance information

**Usage**:
```tsx
import ProcessShowcase from '@/components/process/ProcessShowcase';

<ProcessShowcase />
```

### 5. OptimizedImage Component
**Location**: `/components/ui/OptimizedImage.tsx`

**Features**:
- Automatic WebP conversion and optimization
- Lazy loading with blur placeholders
- Error handling with professional fallbacks
- Accessibility-enhanced alt text
- Performance monitoring

**Usage**:
```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/equipment/dehumidifier.png"
  alt="Professional industrial dehumidifier for water damage restoration"
  width={400}
  height={300}
  priority={false}
/>
```

### 6. EmergencyMobileLayout Component
**Location**: `/components/ui/EmergencyMobileLayout.tsx`

**Features**:
- Sticky emergency call button on mobile
- Quick action bar at bottom of screen
- Emergency information banner
- High contrast mode for emergency situations
- Large touch targets for stressed users

**Usage**:
```tsx
import EmergencyMobileLayout from '@/components/ui/EmergencyMobileLayout';

<EmergencyMobileLayout emergencyNumber="1300309361">
  {children}
</EmergencyMobileLayout>
```

## 📱 Responsive Design Strategy

### Breakpoints
- **Mobile**: `< 768px` - Emergency-optimized layout
- **Tablet**: `768px - 1024px` - Balanced layout
- **Desktop**: `> 1024px` - Full feature layout

### Mobile-First Approach
1. **Emergency Contact**: Always visible and prominent
2. **Touch Targets**: Minimum 44px for easy tapping
3. **High Contrast**: Enhanced visibility under stress
4. **Simplified Navigation**: Quick access to critical information
5. **Reduced Cognitive Load**: Clear hierarchy and minimal distractions

### Emergency Situations Optimization
- **Floating Call Button**: Always accessible emergency contact
- **Quick Action Bar**: Essential actions at bottom of screen
- **High Contrast Text**: Readable in poor lighting conditions
- **Large Buttons**: Easy to tap under stress
- **Minimal Scrolling**: Key information above the fold

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Focus Indicators**: Clear keyboard navigation
- **Alt Text**: Descriptive text for all images
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Screen Reader Support**: ARIA labels and descriptions

### Emergency Accessibility
- **High Contrast Mode**: Enhanced visibility in emergency situations
- **Large Text Options**: Scalable text for vision difficulties
- **Simple Language**: Clear, non-technical emergency instructions
- **Voice Commands**: Compatible with voice navigation
- **Keyboard Navigation**: Full functionality without mouse

## 🚀 Performance Optimization

### Image Optimization
- **Next.js Image Component**: Automatic optimization and WebP conversion
- **Lazy Loading**: Progressive loading as user scrolls
- **Blur Placeholders**: Smooth loading experience
- **Responsive Sizing**: Multiple image sizes for different devices
- **CDN Integration**: Fast global image delivery

### Loading Performance
- **Critical Path**: Hero images loaded with priority
- **Code Splitting**: Components loaded as needed
- **Bundle Optimization**: Minimal JavaScript for emergency pages
- **Preload Strategy**: Critical resources loaded first

### Metrics Targets
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Time to Interactive**: < 3.5 seconds
- **Cumulative Layout Shift**: < 0.1

## 🎯 Emergency UX Patterns

### 1. Emergency Contact Pattern
```tsx
// Always visible emergency contact
<a
  href="tel:1300309361"
  className="bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-2xl flex items-center gap-2"
>
  <Phone className="w-5 h-5" />
  1300 309 361
</a>
```

### 2. Urgency Indicator Pattern
```tsx
// Visual urgency communication
<Badge className="bg-red-600 text-white font-bold">
  <Clock className="w-3 h-3 mr-1" />
  CRITICAL - Call Now
</Badge>
```

### 3. Trust Signal Pattern
```tsx
// Professional credibility indicators
<div className="flex items-center gap-2">
  <Shield className="w-5 h-5 text-green-400" />
  <span>IICRC Certified</span>
</div>
```

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: Strict type checking for reliability
- **ESLint + Prettier**: Consistent code formatting
- **Component Structure**: Single responsibility principle
- **Error Boundaries**: Graceful error handling
- **Performance Monitoring**: Real-time performance tracking

### Image Guidelines
1. **File Naming**: Descriptive, lowercase, hyphen-separated
2. **Alt Text**: Specific to disaster recovery context
3. **Optimization**: Always use OptimizedImage component
4. **Fallbacks**: Provide error states for missing images
5. **Accessibility**: Include context for screen readers

### Component Guidelines
1. **Mobile-First**: Design for emergency mobile usage
2. **Accessibility**: WCAG 2.1 AA compliance minimum
3. **Performance**: Lazy load non-critical components
4. **Error Handling**: Graceful degradation
5. **Testing**: Emergency scenario testing

## 📊 Analytics & Monitoring

### Emergency Metrics
- **Emergency Call Conversions**: Track call button interactions
- **Response Time Expectations**: Monitor user engagement with timing
- **Service Category Interest**: Track which services are most viewed
- **Mobile Usage Patterns**: Emergency vs. non-emergency usage

### Performance Monitoring
- **Real User Monitoring (RUM)**: Track actual user performance
- **Core Web Vitals**: Monitor Google's performance metrics
- **Error Tracking**: Monitor and fix image loading issues
- **Accessibility Testing**: Regular automated accessibility audits

## 🚀 Deployment & Maintenance

### Image Management
1. **Regular Audits**: Monthly review of image performance
2. **CDN Optimization**: Ensure global delivery performance
3. **Format Updates**: Keep up with latest image formats (AVIF, etc.)
4. **Accessibility Reviews**: Regular alt text and contrast audits

### Component Updates
1. **Emergency Testing**: Regular emergency scenario testing
2. **Mobile Performance**: Monthly mobile performance audits
3. **Accessibility Compliance**: Quarterly WCAG compliance testing
4. **User Feedback**: Continuous improvement based on emergency usage

## 📱 Emergency Contact Information

**Primary Emergency Number**: 1300 309 361
**Service Areas**: Brisbane, Ipswich, Logan
**Response Time**: 60 minutes average
**Availability**: 24/7 Emergency Response

---

*This design system prioritizes human safety and emergency response while maintaining professional standards and authentic representation of disaster recovery services.*