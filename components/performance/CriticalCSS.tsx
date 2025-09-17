import Script from 'next/script';

const criticalCSS = `
/* Critical CSS for above-the-fold content */
.antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.bg-gray-50 { background-color: #f9fafb; }
.text-gray-900 { color: #111827; }

/* Hero Section Critical Styles */
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
.from-gray-50 { --tw-gradient-from: #f9fafb; --tw-gradient-to: rgb(249 250 251 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-white { --tw-gradient-to: #fff; }

/* Typography Critical */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
.font-bold { font-weight: 700; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-gray-700 { color: #374151; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }

/* Layout Critical */
.max-w-4xl { max-width: 56rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.text-center { text-align: center; }

/* Button Critical */
.inline-flex { display: inline-flex; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.bg-red-600 { background-color: #dc2626; }
.text-white { color: #fff; }
.font-semibold { font-weight: 600; }
.rounded-lg { border-radius: 0.5rem; }

/* CTA Button Hover */
.hover\\:bg-red-700:hover { background-color: #b91c1c; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }

/* Grid Critical */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-4 { gap: 1rem; }

/* Responsive - Mobile First */
@media (min-width: 640px) {
  .sm\\:flex-row { flex-direction: row; }
}

@media (min-width: 768px) {
  .md\\:text-5xl { font-size: 3rem; line-height: 1; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* Emergency Phone Number Styling */
.emergency-phone {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: #dc2626;
  text-decoration: none;
}

.emergency-phone:hover {
  color: #b91c1c;
}

/* Skip Links for Accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 1000;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
}

.skip-link:focus {
  top: 6px;
}
`;

export default function CriticalCSS() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: criticalCSS
        }}
      />

      {/* Preload key fonts for performance */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Load remaining CSS asynchronously after page load */}
      <Script
        id="load-full-css"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Load full CSS after critical rendering
            if ('requestIdleCallback' in window) {
              requestIdleCallback(function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/css/full-styles.css';
                link.media = 'all';
                document.head.appendChild(link);
              });
            } else {
              setTimeout(function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/css/full-styles.css';
                link.media = 'all';
                document.head.appendChild(link);
              }, 1000);
            }
          `
        }}
      />
    </>
  );
}