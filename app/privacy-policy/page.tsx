import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery',
  description: 'Privacy Policy for Disaster Recovery - Learn how we protect and handle your personal information.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              <strong>Effective Date:</strong> December 1, 2024<br />
              <strong>Last Updated:</strong> December 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                Disaster Recovery ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Our office is located at 4/17 Tile St, Wacol, QLD 4076, Australia. For privacy concerns, please contact us at <a href="mailto:admin@disasterrecovery.com.au" className="text-blue-600 hover:text-blue-700">admin@disasterrecovery.com.au</a> or call 1300 309 361.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Name and contact details (email address, phone number, address)</li>
                <li>Property information related to disaster recovery services</li>
                <li>Insurance information (when relevant to claims)</li>
                <li>Payment and billing information</li>
                <li>Communications you send to us</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information about your device, including:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device identifiers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Provide, operate, and maintain our disaster recovery services</li>
                <li>Process and manage service requests and emergency responses</li>
                <li>Communicate with you about services, updates, and emergencies</li>
                <li>Process payments and send invoices</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations and insurance requirements</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Respond to customer service requests</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf</li>
                <li><strong>Insurance Companies:</strong> When processing claims related to our services</li>
                <li><strong>Professional Advisors:</strong> Lawyers, accountants, and other professional advisors</li>
                <li><strong>Government Authorities:</strong> When required by law or to protect rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
              <p>We do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure data storage systems</li>
                <li>Limited access to personal information</li>
                <li>Regular security assessments</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p>Types of cookies we use:</p>
              <ul className="list-disc ml-6 mb-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p>Under Australian Privacy Law, you have the right to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
              </ul>
              <p>
                To exercise these rights, please contact us at <a href="mailto:admin@disasterrecovery.com.au" className="text-blue-600 hover:text-blue-700">admin@disasterrecovery.com.au</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and maintained on servers located outside of Australia. We ensure that such transfers comply with applicable data protection laws and that your information remains protected.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Factors we consider include:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Legal and regulatory requirements</li>
                <li>Insurance claim periods</li>
                <li>Warranty and guarantee periods</li>
                <li>Dispute resolution timeframes</li>
                <li>Business record-keeping requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="font-semibold">Disaster Recovery</p>
                <p>4/17 Tile St, Wacol, QLD 4076</p>
                <p>Phone: 1300 309 361</p>
                <p>Email: <a href="mailto:admin@disasterrecovery.com.au" className="text-blue-600 hover:text-blue-700">admin@disasterrecovery.com.au</a></p>
                <p>ABN: [To be provided]</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Australian Privacy Principles</h2>
              <p>
                This Privacy Policy is designed to comply with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth). For more information about privacy rights in Australia, visit the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}