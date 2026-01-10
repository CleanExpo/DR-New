/**
 * Chart Configuration and Design Tokens
 *
 * Centralized configuration for D3 charts including colors, sizes, animations
 * Uses NRPG brand colors for consistency across all visualizations
 */

// NRPG Color Palette for Charts
export const chartColors = {
  primary: '#0047FF',      // Primary blue - all standard operations
  emergency: '#DC2626',    // Emergency red - crisis situations only
  contractor: '#00BFA6',   // Contractor teal - contractor-specific
  success: '#10b981',      // Success green - positive metrics
  warning: '#F59E0B',      // Warning orange - caution indicators
  gray: '#6B7280',         // Neutral gray - secondary elements

  // Multi-series colors for comparing multiple datasets
  series: [
    '#0047FF', // Blue (primary)
    '#00BFA6', // Teal (contractor)
    '#F59E0B', // Orange (warning)
    '#10b981', // Green (success)
    '#8b5cf6', // Purple (accent)
    '#DC2626', // Red (emergency)
  ],

  // Service type colors
  services: {
    water: '#3B82F6',      // Water damage - blue
    fire: '#EA580C',       // Fire restoration - orange
    mold: '#10B981',       // Mold remediation - green
    biohazard: '#DC2626',  // Biohazard - red
  },

  // Text colors
  text: {
    primary: '#111827',    // Dark gray for primary text
    secondary: '#6B7280',  // Medium gray for secondary text
    light: '#F3F4F6',      // Light gray for light backgrounds
  },

  // Background colors
  background: {
    light: '#F9FAFB',      // Light background
    lighter: '#F3F4F6',    // Lighter background
    white: '#FFFFFF',      // White
  },
};

// Standard chart dimensions
export const chartSizes = {
  hero: { width: 1200, height: 400 },      // Homepage hero charts
  dashboard: { width: 800, height: 300 },  // Dashboard full-width charts
  card: { width: 400, height: 250 },       // Embedded in cards
  mini: { width: 200, height: 80 },        // Mini sparklines
  thumbnail: { width: 100, height: 40 },   // Tiny indicators
};

// Responsive breakpoints
export const chartBreakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

// Animation timing (milliseconds)
export const chartAnimations = {
  chartLoad: 800,      // Chart entry animation
  dataUpdate: 400,     // Data transition animation
  hover: 150,          // Hover state transition
  tooltip: 0,          // Tooltip appears instantly
};

// Chart margins (SVG padding)
export const chartMargins = {
  small: { top: 20, right: 20, bottom: 20, left: 40 },
  medium: { top: 30, right: 30, bottom: 30, left: 60 },
  large: { top: 40, right: 40, bottom: 40, left: 80 },
};

// Font configuration
export const chartFonts = {
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizes: {
    title: 16,
    label: 12,
    legend: 11,
    tooltip: 12,
    axis: 11,
  },
  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Dark mode colors (future enhancement)
export const chartColorsDark = {
  primary: '#60A5FA',      // Lighter blue for dark mode
  text: {
    primary: '#F3F4F6',    // Light text on dark
    secondary: '#D1D5DB',  // Medium light text
  },
  background: {
    light: '#1F2937',      // Dark gray background
    lighter: '#111827',    // Darker background
  },
};

// Default chart options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  animate: true,
  showLegend: true,
  showTooltip: true,
  showGrid: true,
  curved: true,  // Use curve interpolation for line charts
  rounded: true, // Round chart corners
};
