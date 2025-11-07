'use client';

/**
 * Resource Hints Component
 * - DNS prefetch for external domains
 * - Preconnect for critical third-party origins
 * - Prefetch for next likely page navigation
 * - Preload for critical resources
 */
export function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch - Resolve DNS early for external domains */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://cloudinary.com" />
      <link rel="dns-prefetch" href="https://www.clarity.ms" />

      {/* Preconnect - Establish early connections for critical third-party origins */}
      <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Preload critical images */}
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href="/images/hero-background.webp"
        imageSrcSet="/images/hero-background-640.webp 640w, /images/hero-background-1080.webp 1080w, /images/hero-background-1920.webp 1920w"
        imageSizes="100vw"
      />

      {/* Preload critical CSS */}
      <link
        rel="preload"
        as="style"
        href="/_next/static/css/app.css"
      />

      {/* Preload critical JavaScript */}
      <link
        rel="preload"
        as="script"
        href="/_next/static/chunks/main.js"
      />

      {/* Prefetch next likely pages */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/about-phil-mcgurk" />
      <link rel="prefetch" href="/book-service" />
      <link rel="prefetch" href="/emergency/water-damage-brisbane" />

      {/* Module preload for JavaScript modules */}
      <link
        rel="modulepreload"
        href="/_next/static/chunks/framework.js"
      />
    </>
  );
}

export default ResourceHints;