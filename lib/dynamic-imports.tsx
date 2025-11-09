import dynamic from 'next/dynamic';
import React from 'react';

// Code-split heavy libraries for better performance

// React Player - ~200KB
export const DynamicReactPlayer = dynamic(
  () => import('react-player').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading video player...</span>
      </div>
    ),
  }
);

// Recharts - ~150KB
export const DynamicLineChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.LineChart })),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" /> }
);

export const DynamicBarChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.BarChart })),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" /> }
);

export const DynamicPieChart = dynamic(
  () => import('recharts').then(mod => ({ default: mod.PieChart })),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" /> }
);

// React Icons - Can be large if importing full sets
export const DynamicFaIcon = (iconName: string) =>
  dynamic(() => import('react-icons/fa').then((mod: any) => mod[iconName]), {
    ssr: true,
  });

// HTML2Canvas - ~100KB
export const DynamicHtml2Canvas = dynamic(
  () => import('html2canvas').then(mod => mod.default),
  { ssr: false }
);

// jsPDF - ~150KB
export const DynamicJsPDF = dynamic(
  () => import('jspdf').then(mod => mod.jsPDF),
  { ssr: false }
);

// Framer Motion - ~60KB
export const DynamicMotion = {
  div: dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: true }),
  section: dynamic(() => import('framer-motion').then(mod => mod.motion.section), { ssr: true }),
  button: dynamic(() => import('framer-motion').then(mod => mod.motion.button), { ssr: true }),
};

// React Confetti - ~50KB
export const DynamicConfetti = dynamic(
  () => import('react-confetti').then(mod => mod.default),
  { ssr: false }
);

// React PDF - ~200KB
export const DynamicPDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
);

// GSAP - ~50KB
export const DynamicGSAP = dynamic(
  () => import('gsap').then(mod => mod.gsap),
  { ssr: false }
);

// React Lite YouTube Embed - ~20KB
export const DynamicLiteYouTube = dynamic(
  () => import('react-lite-youtube-embed').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <span className="text-white">Loading YouTube player...</span>
      </div>
    ),
  }
);

// React Google Maps - ~150KB
export const DynamicGoogleMap = dynamic(
  () => import('@react-google-maps/api').then(mod => mod.GoogleMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
  }
);

export const DynamicMarker = dynamic(
  () => import('@react-google-maps/api').then(mod => mod.Marker),
  { ssr: false }
);

// QRCode - ~30KB
export const DynamicQRCode = dynamic(
  () => import('qrcode').then(mod => mod.default),
  { ssr: false }
);

// React Day Picker - ~40KB
export const DynamicDayPicker = dynamic(
  () => import('react-day-picker').then(mod => mod.DayPicker),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" />,
  }
);

export default {
  DynamicReactPlayer,
  DynamicLineChart,
  DynamicBarChart,
  DynamicPieChart,
  DynamicFaIcon,
  DynamicHtml2Canvas,
  DynamicJsPDF,
  DynamicMotion,
  DynamicConfetti,
  DynamicPDFViewer,
  DynamicGSAP,
  DynamicLiteYouTube,
  DynamicGoogleMap,
  DynamicMarker,
  DynamicQRCode,
  DynamicDayPicker,
};
