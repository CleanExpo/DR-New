import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';
import { Phone, Mail, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

// Generate unique SEO metadata for accessibility page
export const metadata: Metadata = generateSEO({
  title: 'Accessibility Statement | Disaster Recovery Brisbane',
  description: 'Disability access information for Disaster Recovery Brisbane. WCAG 2.1 compliant website. Accessible emergency restoration services. Call 1300 309 361.',
  keywords: [
    'accessibility statement',
    'WCAG 2.1 compliance',
    'disability access Brisbane',
    'accessible emergency services',
    'website accessibility',
  ],
  url: 'https://dr-new-ten.vercel.app/accessibility',
  ogTitle: 'Accessibility - Disaster Recovery Brisbane',
  ogDescription: 'Learn about our commitment to website accessibility and how we serve all customers including those with disabilities.',
  twitterTitle: 'Accessibility Statement',
  twitterDescription: 'WCAG 2.1 compliant site. Accessible emergency restoration services in Brisbane, Ipswich, Logan.',
  type: 'website',
});

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-centre">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-blue-100">
              Disaster Recovery Brisbane is committed to ensuring digital accessibility for people with disabilities
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Commitment */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Commitment to Accessibility
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Disaster Recovery Brisbane is committed to ensuring that our website and emergency services are accessible to all people, including those with disabilities. We continually work to improve the user experience for everyone and apply the relevant accessibility standards.
              </p>
              <p className="text-lg text-gray-700">
                We believe that emergency restoration services should be available to everyone, regardless of ability. This commitment extends to both our digital presence and our physical service delivery.
              </p>
            </div>

            {/* Conformance Status */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Conformance Status
              </h2>
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    WCAG 2.1 Level AA Compliance
                  </h3>
                  <p className="text-gray-700">
                    This website is designed to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Accessibility Features
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Keyboard Navigation</h3>
                    <p className="text-gray-700">
                      All functionality is available using a keyboard for users who cannot use a mouse.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Screen Reader Compatible</h3>
                    <p className="text-gray-700">
                      Content is structured with proper headings, landmarks, and ARIA labels for screen reader users.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Color Contrast</h3>
                    <p className="text-gray-700">
                      Text and interactive elements meet WCAG AA color contrast requirements for readability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Responsive Design</h3>
                    <p className="text-gray-700">
                      The website adapts to different screen sizes and can be zoomed up to 200% without loss of functionality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Alternative Text</h3>
                    <p className="text-gray-700">
                      Images include descriptive alternative text for users who cannot see them.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Clear Language</h3>
                    <p className="text-gray-700">
                      Content is written in clear, plain language with emergency instructions that are easy to understand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Service Accessibility */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Accessible Emergency Services
              </h2>
              <p className="text-gray-700 mb-6">
                Our commitment to accessibility extends beyond our website to our emergency restoration services:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Phone Support</h3>
                    <p className="text-gray-700">
                      Call <a href="tel:1300309361" className="text-blue-600 hover:text-blue-700 font-semibold">1300 309 361</a> to speak with a real person any time, day or night.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Multiple Contact Methods</h3>
                    <p className="text-gray-700">
                      Reach us by phone, email, or our online contact form based on your preference and needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Communication Assistance</h3>
                    <p className="text-gray-700">
                      We can communicate with support persons, carers, or interpreters to ensure you receive the help you need.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Property Access Accommodations</h3>
                    <p className="text-gray-700">
                      Our technicians are trained to work with customers with mobility challenges and other accessibility needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Technical Specifications
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Accessibility Standards:</strong> WCAG 2.1 Level AA
                </p>
                <p>
                  <strong>Technologies:</strong> HTML5, CSS3, JavaScript, React, Next.js
                </p>
                <p>
                  <strong>Compatible with:</strong> Modern browsers including Chrome, Firefox, Safari, Edge, and their mobile versions
                </p>
                <p>
                  <strong>Screen Readers Tested:</strong> NVDA, JAWS, VoiceOver
                </p>
              </div>
            </div>

            {/* Limitations and Alternatives */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Known Limitations
              </h2>
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-4">
                    While we strive for full accessibility, we acknowledge that some areas may not yet meet all standards. We are continuously working to improve the accessibility of our website.
                  </p>
                  <p className="text-gray-700">
                    If you encounter any accessibility barriers or need assistance, please contact us immediately:
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 mt-4">
                <p className="font-semibold text-gray-900 mb-2">Emergency Contact:</p>
                <p className="text-gray-700">
                  Phone: <a href="tel:1300309361" className="text-blue-600 hover:text-blue-700 font-semibold">1300 309 361</a> (24/7)
                </p>
                <p className="text-gray-700">
                  Email: <a href="mailto:info@disasterrecovery.com.au" className="text-blue-600 hover:text-blue-700">info@disasterrecovery.com.au</a>
                </p>
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Feedback and Contact
              </h2>
              <p className="text-gray-700 mb-6">
                We welcome your feedback on the accessibility of this website. Please let us know if you encounter accessibility barriers or have suggestions for improvement:
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">Phone (24/7 Emergency Line):</p>
                  <a href="tel:1300309361" className="text-blue-600 hover:text-blue-700 text-lg font-semibold">
                    1300 309 361
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <a href="mailto:info@disasterrecovery.com.au" className="text-blue-600 hover:text-blue-700">
                    info@disasterrecovery.com.au
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Office Address:</p>
                  <p className="text-gray-700">4/17 Tile St, Wacol, QLD 4076</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Response Time:</p>
                  <p className="text-gray-700">We aim to respond to accessibility feedback within 2 business days.</p>
                </div>
              </div>
            </div>

            {/* External Resources */}
            <div className="bg-gray-100 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Resources
              </h2>
              <div className="space-y-3">
                <a
                  href="https://www.w3.org/WAI/WCAG21/quickref/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-centre gap-2 text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  WCAG 2.1 Quick Reference
                </a>
                <a
                  href="https://www.vision6.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-centre gap-2 text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Vision Australia
                </a>
                <a
                  href="https://www.humanrights.gov.au/our-work/disability-rights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-centre gap-2 text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Australian Human Rights Commission - Disability Rights
                </a>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-centre mt-12 text-gray-600">
              <p className="text-sm">
                This accessibility statement was last updated on November 4, 2025.
              </p>
            </div>

            {/* Emergency CTA */}
            <div className="mt-12 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-8 text-centre">
              <h2 className="text-2xl font-bold mb-4">Need Emergency Assistance?</h2>
              <p className="text-lg mb-6">
                Our accessible 24/7 emergency line is always available
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-centre">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-centre justify-centre px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1300 309 361 Now
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-centre justify-centre px-8 py-4 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-colors"
                >
                  Contact Us Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
