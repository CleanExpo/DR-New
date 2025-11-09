/**
 * Image Preloader Component
 * Preloads critical images for better LCP
 */

'use client';

export function ImagePreloader() {
  return (
    <>
      {/* Preload hero image - Critical for LCP */}
      <link
        rel="preload"
        as="image"
        href="/images/hero/landing-page-hero.png"
        fetchPriority="high"
      />

      {/* Preload logo */}
      <link
        rel="preload"
        as="image"
        href="/logos/3D-Disaster-Recovery-Logo.png"
        fetchPriority="high"
      />

      {/* Preload critical icons as data URIs to avoid additional requests */}
      <link
        rel="preload"
        as="image"
        href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'/%3E%3C/svg%3E"
      />

      {/* Responsive image preload hints */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="
          /images/hero/landing-page-hero-640.png 640w,
          /images/hero/landing-page-hero-1080.png 1080w,
          /images/hero/landing-page-hero-1920.png 1920w
        "
        imageSizes="100vw"
        media="(max-width: 768px)"
      />
    </>
  );
}

export default ImagePreloader;
