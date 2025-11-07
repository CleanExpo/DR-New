'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface FontConfig {
  family: string;
  weights: string[];
  display: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload: boolean;
  subsetting?: string;
}

const fontConfigs: FontConfig[] = [
  {
    family: 'Inter',
    weights: ['400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    subsetting: 'latin'
  },
  {
    family: 'Poppins',
    weights: ['300', '400', '500', '600', '700', '800'],
    display: 'swap',
    preload: true,
    subsetting: 'latin'
  }
];

export function OptimizedFonts(...args: any[]): void {
  useEffect(() => {
    // Font loading optimization
    if ('fonts' in document) {
      // Use Font Loading API for better control
      Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('600 1em Inter'),
        document.fonts.load('400 1em Poppins'),
        document.fonts.load('600 1em Poppins')
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Implement font-display swap fallback
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter-fallback';
        src: local('Arial');
        ascent-override: 90.20%;
        descent-override: 22.48%;
        line-gap-override: 0.00%;
        size-adjust: 107.40%;
      }

      @font-face {
        font-family: 'Poppins-fallback';
        src: local('Arial');
        ascent-override: 92.60%;
        descent-override: 24.40%;
        line-gap-override: 0.00%;
        size-adjust: 103.50%;
      }

      .font-inter {
        font-family: 'Inter', 'Inter-fallback', system-ui, -apple-system, sans-serif;
      }

      .font-poppins {
        font-family: 'Poppins', 'Poppins-fallback', system-ui, -apple-system, sans-serif;
      }

      /* Optimize font rendering */
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
      }

      /* Reduce CLS from font loading */
      .fonts-loaded body {
        font-synthesis: style;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch as fallback */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Load fonts with optimal strategy */}
      <Script
        id="google-fonts-preload"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            /* Critical font faces - Inter */
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            /* Critical font faces - Poppins */
            @font-face {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            @font-face {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
          `
        }}
      />

      {/* Load additional weights asynchronously */}
      <Script
        id="google-fonts-async"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Load additional font weights after page load
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                const link = document.createElement('link');
                link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;800&family=Poppins:wght@300;500;700;800&display=swap';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
              });
            } else {
              setTimeout(() => {
                const link = document.createElement('link');
                link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;800&family=Poppins:wght@300;500;700;800&display=swap';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
              }, 2000);
            }
          `
        }}
      />

      {/* Font optimization monitoring */}
      <Script
        id="font-monitoring"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Monitor font loading performance
            if ('PerformanceObserver' in window) {
              try {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.name.includes('fonts.googleapis.com') || entry.name.includes('fonts.gstatic.com')) {
                      
                      // Report to analytics if available
                      if (window.gtag) {
                        window.gtag('event', 'font_load', {
                          font_url: entry.name,
                          duration: Math.round(entry.duration)
                        });
                      }
                    }
                  }
                });
                observer.observe({ entryTypes: ['resource'] });
              } catch (e) {
                console.error('Font monitoring failed:', e);
              }
            }
          `
        }}
      />
    </>
  );
}

export default OptimizedFonts;