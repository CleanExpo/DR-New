'use client';

import { useEffect } from 'react';

/**
 * Font Optimization Component
 * - Preloads critical fonts
 * - Uses font-display: swap for better FCP
 * - Implements font loading API for fine control
 */
export function FontOptimization() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('fonts' in document)) return;

    // Define critical fonts to preload
    const criticalFonts = [
      { family: 'Inter', weight: '400', style: 'normal' },
      { family: 'Inter', weight: '600', style: 'normal' },
      { family: 'Inter', weight: '700', style: 'normal' },
    ];

    // Load fonts using Font Loading API
    const fontPromises = criticalFonts.map((font) => {
      return new FontFace(
        font.family,
        `local('${font.family}'), url('/fonts/${font.family.toLowerCase()}-${font.weight}.woff2') format('woff2')`,
        {
          weight: font.weight,
          style: font.style,
          display: 'swap',
        }
      ).load();
    });

    // Add loaded fonts to document
    Promise.all(fontPromises)
      .then((fonts) => {
        fonts.forEach((font) => {
          document.fonts.add(font);
        });
        console.log('[Fonts] Critical fonts loaded successfully');
      })
      .catch((error) => {
        console.error('[Fonts] Failed to load fonts:', error);
      });

    // Monitor font loading performance
    if ('PerformanceObserver' in window) {
      try {
        const fontObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('[Fonts] Font loaded:', {
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        });

        fontObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Performance observer not supported
      }
    }
  }, []);

  return (
    <>
      {/* Preconnect to font sources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Preload critical fonts */}
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/inter-400.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/inter-600.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/inter-700.woff2"
        crossOrigin="anonymous"
      />

      {/* Font face declarations with font-display: swap */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Inter'), url('/fonts/inter-400.woff2') format('woff2');
          }

          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local('Inter'), url('/fonts/inter-600.woff2') format('woff2');
          }

          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Inter'), url('/fonts/inter-700.woff2') format('woff2');
          }
        `
      }} />
    </>
  );
}

export default FontOptimization;