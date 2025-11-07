// Performance monitoring utility
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const tcpTime = perfData.connectEnd - perfData.connectStart;
      const requestTime = perfData.responseEnd - perfData.requestStart;
      const domProcessing = perfData.domComplete - perfData.domLoading;
      
      return {
        pageLoadTime: pageLoadTime / 1000, // Convert to seconds
        dnsTime: dnsTime / 1000,
        tcpTime: tcpTime / 1000,
        requestTime: requestTime / 1000,
        domProcessing: domProcessing / 1000 };
    }
    return null;
  },
  
  // Measure First Contentful Paint
  measureFCP() {
    if (typeof window !== 'undefined' && window.performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp ? fcp.startTime / 1000 : null;
    }
    return null;
  },
  
  // Measure Largest Contentful Paint
  measureLCP() {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } else {
        resolve(null);
      }
    });
  },
  
  // Log performance metrics
  async logMetrics() {
    const pageLoad = this.measurePageLoad();
    const fcp = this.measureFCP();
    const lcp = await this.measureLCP();
    
    console.group('🚀 Performance Metrics');
    if (pageLoad) {
      , 's');
      , 's');
      , 's');
      , 's');
      , 's');
    }
    if (fcp) {
      , 's');
    }
    if (lcp) {
      .toFixed(2), 's');
    }
    console.groupEnd();
    
    return { pageLoad, fcp, lcp };
  }
};