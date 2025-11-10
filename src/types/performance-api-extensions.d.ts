/**
 * Performance API Extensions
 * Additional properties for performance entries
 */

// Extend PerformanceEntry for LCP-specific properties
interface PerformanceEntry {
  size?: number;
  url?: string;
  renderTime?: number;
  loadTime?: number;
  processingStart?: number;
}

// Extend web-vitals module to include onFID (for backward compatibility)
declare module 'web-vitals' {
  export function onFID(callback: (metric: any) => void): void;
}

export {};
