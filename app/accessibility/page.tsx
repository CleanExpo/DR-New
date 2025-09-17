import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AccessibilityStatement() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" aria-label="Accessibility statement">
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Accessibility Statement
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Commitment Section */}
              <section aria-labelledby="commitment-heading">
                <h2 id="commitment-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Our Commitment to Accessibility
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Disaster Recovery Brisbane is committed to ensuring digital accessibility for people with disabilities.
                  We are continuously improving the user experience for everyone and applying the relevant accessibility standards.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  In emergency situations, accessibility is critical. We understand that disasters affect everyone,
                  including people with disabilities, and we strive to ensure our emergency services information is
                  accessible to all who need it.
                </p>
              </section>

              {/* Compliance Section */}
              <section aria-labelledby="compliance-heading" className="mt-8">
                <h2 id="compliance-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Conformance Status
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers
                  to improve accessibility for people with disabilities. It defines three levels of conformance:
                  Level A, Level AA, and Level AAA.
                </p>
                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-900 font-semibold text-lg">
                    Current Status: <span className="text-primary-700">WCAG 2.1 Level AA Compliant</span>
                  </p>
                  <p className="text-gray-700 mt-2">
                    Disaster Recovery Brisbane is partially conformant with WCAG 2.1 level AA.
                    Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
                  </p>
                </div>
              </section>

              {/* Features Section */}
              <section aria-labelledby="features-heading" className="mt-8">
                <h2 id="features-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Accessibility Features
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Skip navigation links for keyboard users to quickly access main content and emergency contacts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>High contrast emergency buttons with minimum WCAG AA color contrast ratios</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Comprehensive ARIA labels and roles for screen reader compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Keyboard navigation support for all interactive elements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Visible focus indicators on all interactive elements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Respects prefers-reduced-motion settings for users with vestibular disorders</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Semantic HTML5 structure with proper heading hierarchy</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Minimum touch target sizes of 44x44 pixels for mobile accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Descriptive alt text for all images to aid screen readers and SEO</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Live regions for dynamic content updates in the hero carousel</span>
                  </li>
                </ul>
              </section>

              {/* Technologies Section */}
              <section aria-labelledby="technologies-heading" className="mt-8">
                <h2 id="technologies-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Technologies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Accessibility of Disaster Recovery Brisbane relies on the following technologies to work with the
                  particular combination of web browser and any assistive technologies or plugins installed on your computer:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>HTML5</li>
                  <li>WAI-ARIA</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  These technologies are relied upon for conformance with the accessibility standards used.
                </p>
              </section>

              {/* Testing Section */}
              <section aria-labelledby="testing-heading" className="mt-8">
                <h2 id="testing-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Assessment Approach
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Disaster Recovery Brisbane assessed the accessibility of this website by the following approaches:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Self-evaluation using automated testing tools (axe DevTools, Lighthouse)</li>
                  <li>Manual keyboard navigation testing</li>
                  <li>Screen reader testing with NVDA and VoiceOver</li>
                  <li>Color contrast analysis</li>
                  <li>Mobile accessibility testing</li>
                </ul>
              </section>

              {/* Emergency Access Section */}
              <section aria-labelledby="emergency-heading" className="mt-8">
                <h2 id="emergency-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Emergency Assistance
                </h2>
                <div className="bg-emergency-50 border-2 border-emergency-200 rounded-lg p-6">
                  <p className="text-gray-900 font-semibold text-lg mb-3">
                    Need Immediate Help?
                  </p>
                  <p className="text-gray-700 mb-4">
                    If you need immediate emergency assistance and are having difficulty accessing our website,
                    please call us directly:
                  </p>
                  <a
                    href="tel:1300309361"
                    className="inline-flex items-center bg-emergency-700 hover:bg-emergency-800 text-white font-bold py-3 px-6 rounded-lg transition-colors emergency-focus"
                    aria-label="Call emergency number 1300 309 361"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    1300 309 361
                  </a>
                  <p className="text-gray-700 text-sm mt-3">
                    Available 24/7/365 for emergency disaster recovery services
                  </p>
                </div>
              </section>

              {/* Feedback Section */}
              <section aria-labelledby="feedback-heading" className="mt-8">
                <h2 id="feedback-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Feedback
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We welcome your feedback on the accessibility of Disaster Recovery Brisbane.
                  Please let us know if you encounter accessibility barriers:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 mr-2">Phone:</span>
                    <a href="tel:1300309361" className="text-primary-600 hover:text-primary-700 font-medium">
                      1300 309 361
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 mr-2">Email:</span>
                    <a href="mailto:info@disasterrecovery.com.au" className="text-primary-600 hover:text-primary-700 font-medium">
                      info@disasterrecovery.com.au
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 mr-2">Address:</span>
                    <span className="text-gray-700">4/17 Tile St, Wacol, QLD 4076</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  We try to respond to accessibility feedback within 2 business days.
                </p>
              </section>

              {/* Legal Section */}
              <section aria-labelledby="legal-heading" className="mt-8">
                <h2 id="legal-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Legal Requirements
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  This accessibility statement is aligned with the Disability Discrimination Act 1992 (DDA)
                  requirements in Australia. We are committed to providing equal access to our services for
                  all Australians, including those with disabilities.
                </p>
              </section>

              {/* Update Date */}
              <section className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-700 text-sm">
                  This statement was created on {new Date().toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} and last reviewed on the same date.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}