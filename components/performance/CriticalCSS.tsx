/**
 * Critical CSS Component
 * Inlines critical above-the-fold CSS for faster FCP
 */

export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical Above-the-Fold Styles */

          /* Reset & Base */
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          body{font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.5;color:#1e293b}

          /* Layout */
          .container{max-width:1280px;margin:0 auto;padding:0 1.5rem}

          /* Typography */
          h1,h2,h3,h4,h5,h6{font-family:Poppins,system-ui,-apple-system,sans-serif;font-weight:700;line-height:1.2}
          h1{font-size:2.5rem}
          h2{font-size:2rem}

          /* Hero Section - Critical for LCP */
          .hero-section{position:relative;min-height:400px;display:flex;align-items:center;justify-content:center}
          .hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}

          /* Emergency Banner - Above fold */
          .emergency-banner{background:#dc2626;color:#fff;padding:1rem;text-align:center;font-weight:600}

          /* Navigation - Critical */
          .nav-header{background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1);position:sticky;top:0;z-index:50}
          .nav-container{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem}
          .nav-logo{height:40px;width:auto}

          /* Buttons - Critical CTA */
          .btn-emergency{background:#dc2626;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;display:inline-block}
          .btn-primary{background:#1d4ed8;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;display:inline-block}

          /* Loading States - Prevent CLS */
          .skeleton{background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);background-size:200% 100%;animation:skeleton-loading 1.5s ease infinite}
          @keyframes skeleton-loading{0%{background-position:-200% 0}100%{background-position:200% 0}}

          /* Font Display Optimization */
          @font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:local('Inter'),local('Inter-Regular'),url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2) format('woff2')}
          @font-face{font-family:'Poppins';font-style:normal;font-weight:700;font-display:swap;src:local('Poppins Bold'),local('Poppins-Bold'),url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format('woff2')}

          /* GPU Acceleration */
          .gpu-accelerated{transform:translateZ(0);backface-visibility:hidden;perspective:1000px}

          /* Prevent Layout Shift */
          img{max-width:100%;height:auto;display:block}

          /* Skip to main content - Accessibility */
          .skip-to-main{position:absolute;left:-9999px}
          .skip-to-main:focus{position:fixed;top:0;left:0;z-index:9999;padding:1rem;background:#1d4ed8;color:#fff;text-decoration:none}

          /* Reduced Motion Support */
          @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important}}

          /* Mobile Optimization */
          @media (max-width:768px){
            h1{font-size:2rem}
            h2{font-size:1.5rem}
            .container{padding:0 1rem}
            .hero-section{min-height:300px}
          }
        `,
      }}
    />
  );
}

export default CriticalCSS;
