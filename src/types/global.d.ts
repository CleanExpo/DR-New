interface Window {
  dataLayer?: unknown[];
  clarity?: (action: string, ...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

interface PerformanceNavigationTiming {
  navigationStart?: number;
}