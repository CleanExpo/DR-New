import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery',
  description: 'Privacy Policy for Disaster Recovery. Learn how we collect, use, and protect your personal information in accordance with Australian privacy laws.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> 1 January 2025<br />
              <strong>Last Updated:</strong> 18 January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Disaster Recovery ("we," "our," or "us") is committed to protecting your privacy and personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                our website at disasterrecovery.com.au or use our disaster restoration services.
              </p>
              <p className="text-gray-700 mb-4">
                We comply with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) and are
                committed to respecting the privacy rights of individuals.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect the following types of personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Name and contact details (phone number, email address, postal address)</li>
                <li>Property details and damage information</li>
                <li>Insurance policy information (if applicable)</li>
                <li>Payment and billing information</li>
                <li>Communications between you and our team</li>
                <li>Photographic documentation of property damage</li>
                <li>Emergency contact information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
                <li>Location data (suburb/city level only)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Cookies</h3>
              <p className="text-gray-700 mb-4">
                We use cookies to enhance your experience on our website. Cookies are small files stored on your device
                that help us recognise you and remember your preferences. You can control cookie settings through your
                browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Providing disaster restoration services</li>
                <li>Processing emergency service requests</li>
                <li>Communicating with you about our services</li>
                <li>Coordinating with insurance companies (with your consent)</li>
                <li>Scheduling appointments and service calls</li>
                <li>Processing payments and invoicing</li>
                <li>Improving our services and customer experience</li>
                <li>Complying with legal obligations</li>
                <li>Marketing our services (with your consent)</li>
                <li>Maintaining records for warranty and guarantee purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Insurance Companies:</strong> With your explicit consent, to process claims</li>
                <li><strong>Service Providers:</strong> Trusted third parties who assist in our operations</li>
                <li><strong>Subcontractors:</strong> Specialised technicians working under our supervision</li>
                <li><strong>Legal Requirements:</strong> When required by law or court order</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
                <li><strong>Emergency Services:</strong> When necessary for health and safety</li>
              </ul>
              <p className="text-gray-700 mb-4">
                All third parties are required to maintain the confidentiality and security of your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organisational measures to protect your personal information against:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Unauthorised access or disclosure</li>
                <li>Loss, misuse, or alteration</li>
                <li>Unlawful destruction or accidental loss</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Security measures include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>SSL encryption for data transmission</li>
                <li>Secure storage systems with access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Staff training on privacy and data protection</li>
                <li>Confidentiality agreements with employees and contractors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                Under Australian privacy law, you have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
                <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
                <li><strong>Complaint:</strong> Lodge a complaint about our privacy practices</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us using the details in Section 11.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide our services and maintain warranty records</li>
                <li>Comply with legal, tax, and accounting requirements</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Support insurance claims (typically 7 years)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                After the retention period, we securely destroy or anonymise your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect
                personal information from children. If we become aware that we have collected information from a
                child under 18, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy
                practices or content of these external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                We store and process your information in Australia. If we need to transfer your information overseas,
                we will ensure appropriate safeguards are in place and comply with Australian privacy laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700">
                  <strong>Disaster Recovery</strong><br />
                  Attn: Privacy Officer<br />
                  4/17 Tile St, Wacol, QLD 4076<br />
                  Email: <a href="mailto:admin@disasterrecovery.com.au" className="text-blue-600 hover:underline">admin@disasterrecovery.com.au</a><br />
                  Phone: <a href="tel:1300309361" className="text-blue-600 hover:underline">1300 309 361</a><br />
                  Business Hours: Monday to Friday, 7:00 AM - 5:00 PM AEST
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Complaints</h2>
              <p className="text-gray-700 mb-4">
                If you believe we have breached your privacy rights, please contact us immediately. We take all
                complaints seriously and will investigate promptly. If you are not satisfied with our response,
                you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC):
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700">
                  <strong>Office of the Australian Information Commissioner</strong><br />
                  Phone: 1300 363 992<br />
                  Email: <a href="mailto:enquiries@oaic.gov.au" className="text-blue-600 hover:underline">enquiries@oaic.gov.au</a><br />
                  Website: <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.oaic.gov.au</a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. We will notify you of any material changes by posting the updated policy on our website
                with a new effective date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Consent</h2>
              <p className="text-gray-700 mb-4">
                By using our website or services, you consent to the collection, use, and disclosure of your
                information as described in this Privacy Policy. If you do not agree with this policy, please
                do not use our website or services.
              </p>
            </section>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <p className="text-center text-gray-700">
                This Privacy Policy was last updated on 18 January 2025.<br />
                For any privacy concerns, please contact our Privacy Officer immediately.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}