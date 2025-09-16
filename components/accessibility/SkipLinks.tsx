export default function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[200]">
      <a
        href="#main-content"
        className="bg-primary-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-offset-2 font-semibold inline-block"
      >
        Skip to main content
      </a>
      <a
        href="#emergency-contact"
        className="bg-emergency-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-emergency-400 focus:ring-offset-2 font-semibold inline-block ml-2"
      >
        Skip to emergency contact
      </a>
      <a
        href="#footer-navigation"
        className="bg-primary-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-offset-2 font-semibold inline-block ml-2"
      >
        Skip to footer
      </a>
    </div>
  );
}