/**
 * Dynamic Imports Configuration
 *
 * This file centralizes all dynamic imports for heavy components
 * to improve initial bundle size and loading performance.
 */

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Loading component for suspense
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Analytics Components (load after interaction)
export const GoogleAnalytics = dynamic(
  () => import('@/components/analytics/GoogleAnalytics'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const GoogleTagManager = dynamic(
  () => import('@/components/analytics/GoogleTagManager'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const MicrosoftClarity = dynamic(
  () => import('@/components/analytics/MicrosoftClarity'),
  {
    ssr: false,
    loading: () => null,
  }
);

// Heavy Interactive Components
export const InteractiveMap = dynamic(
  () => import('@/components/maps/interactive-contractor-map'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const Chart3D = dynamic(
  () => import('@/src/components/Chart3D'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const ImageUpload = dynamic(
  () => import('@/src/components/ImageUpload'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Video Players
export const ReactPlayer = dynamic(
  () => import('react-player/lazy'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const YouTubeEmbed = dynamic(
  () => import('react-lite-youtube-embed'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Audio Components
export const AudioSystem = dynamic(
  () => import('@/src/components/audio/AudioSystem'),
  {
    ssr: false,
    loading: () => null,
  }
);

// Chat Components
export const EnhancedChatBot = dynamic(
  () => import('@/src/components/chat/EnhancedChatBot'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Dashboard Components
export const AdminDashboard = dynamic(
  () => import('@/src/components/admin/dashboard/AdminDashboard'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const AnalyticsDashboard = dynamic(
  () => import('@/src/components/analytics/AnalyticsDashboard'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Heavy Animation Components
export const FloatingActionButtons = dynamic(
  () => import('@/src/components/interactive/FloatingActionButtons'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const EmergencyParticleSystems = dynamic(
  () => import('@/src/components/interactive/EmergencyParticleSystems'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const Interactive3DServiceCards = dynamic(
  () => import('@/src/components/interactive/Interactive3DServiceCards'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const InteractiveBeforeAfterSlider = dynamic(
  () => import('@/src/components/interactive/InteractiveBeforeAfterSlider'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Visual Effects
export const FloodingEffect = dynamic(
  () => import('@/src/components/effects/FloodingEffect'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const LightningEffect = dynamic(
  () => import('@/src/components/effects/LightningEffect'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const WaterRippleHero = dynamic(
  () => import('@/src/components/visual-effects/WaterRippleHero'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const DryingScrollEffect = dynamic(
  () => import('@/src/components/visual-effects/DryingScrollEffect'),
  {
    ssr: false,
    loading: () => null,
  }
);

// Form Components
export const InsuranceCalculator = dynamic(
  () => import('@/src/components/emergency/InsuranceCalculator'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Search Components
export const SearchBar = dynamic(
  () => import('@/src/components/SearchBar'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// External Libraries
export const Swiper = dynamic(
  () => import('swiper/react').then(mod => mod.Swiper),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export const SwiperSlide = dynamic(
  () => import('swiper/react').then(mod => mod.SwiperSlide),
  {
    ssr: false,
    loading: () => null,
  }
);

// Charts
export const Recharts = dynamic(
  () => import('recharts'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

// Heavy External Dependencies
export const html2canvas = dynamic(
  () => import('html2canvas'),
  {
    ssr: false,
  }
);

export const jsPDF = dynamic(
  () => import('jspdf'),
  {
    ssr: false,
  }
);

// Performance Monitoring (load after app is ready)
export const PerformanceMonitor = dynamic(
  () => import('@/src/components/performance-monitor'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const WebVitalsReporter = dynamic(
  () => import('@/components/seo/WebVitalsReporter'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default {
  GoogleAnalytics,
  GoogleTagManager,
  MicrosoftClarity,
  InteractiveMap,
  Chart3D,
  ImageUpload,
  ReactPlayer,
  YouTubeEmbed,
  AudioSystem,
  EnhancedChatBot,
  AdminDashboard,
  AnalyticsDashboard,
  FloatingActionButtons,
  EmergencyParticleSystems,
  Interactive3DServiceCards,
  InteractiveBeforeAfterSlider,
  FloodingEffect,
  LightningEffect,
  WaterRippleHero,
  DryingScrollEffect,
  InsuranceCalculator,
  SearchBar,
  Swiper,
  SwiperSlide,
  Recharts,
  html2canvas,
  jsPDF,
  PerformanceMonitor,
  WebVitalsReporter,
};