import dynamic from 'next/dynamic';

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
  dynamic(() => import('react-icons/fa').then(mod => mod[iconName as keyof typeof mod]), {
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

// React Dropzone - ~50KB
export const DynamicDropzone = dynamic(
  () => import('react-dropzone').then(mod => ({ default: mod.useDropzone })),
  { ssr: false }
);

// Swiper - ~120KB
export const DynamicSwiper = dynamic(
  () => import('swiper/react').then(mod => mod.Swiper),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" /> }
);

export const DynamicSwiperSlide = dynamic(
  () => import('swiper/react').then(mod => mod.SwiperSlide),
  { ssr: false }
);

// Chart.js - ~200KB
export const DynamicChartJS = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Line),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" /> }
);

// GSAP - ~80KB (animations)
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
