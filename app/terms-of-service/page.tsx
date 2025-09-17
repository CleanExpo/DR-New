import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Disaster Recovery',
  description: 'Terms of Service for Disaster Recovery - Professional disaster restoration services in Brisbane, Ipswich, and Logan.',
  robots: 'index, follow',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              <strong>Effective Date:</strong> December 1, 2024<br />
              <strong>Last Updated:</strong> December 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the services of Disaster Recovery ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our services.
              </p>
              <p>
                Our registered office is located at 4/17 Tile St, Wacol, QLD 4076, Australia. We provide professional disaster recovery and restoration services throughout Brisbane, Ipswich, Logan, and surrounding areas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Provided</h2>
              <p>Disaster Recovery provides the following services:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Water damage restoration</li>
                <li>Fire and smoke damage restoration</li>
                <li>Mould remediation</li>
                <li>Storm damage repair</li>
                <li>Biohazard and trauma cleaning</li>
                <li>Sewage cleanup</li>
                <li>Odour removal</li>
                <li>Content restoration</li>
                <li>Structural drying</li>
                <li>Emergency response services (24/7)</li>
              </ul>
              <p>
                All services are performed by IICRC and CARSI certified technicians in accordance with industry standards and Australian regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Emergency Services</h2>
              <p>
                We offer 24/7 emergency response services with a target response time of 1 hour within our primary service areas. Response times may vary based on:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Location and accessibility</li>
                <li>Weather conditions</li>
                <li>Current demand for services</li>
                <li>Traffic conditions</li>
                <li>Safety considerations</li>
              </ul>
              <p>
                While we strive to meet our response time targets, they are not guaranteed and do not constitute a contractual obligation unless specifically agreed in writing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Service Agreements and Quotes</h2>
              <p>
                <strong>Assessments:</strong> Initial assessments may be provided free of charge for emergency situations. Detailed assessments and reports may incur fees.
              </p>
              <p>
                <strong>Quotes:</strong> Written quotes are valid for 30 days unless otherwise specified. Quotes are based on visible damage and may be revised if additional damage is discovered during work.
              </p>
              <p>
                <strong>Authorisation:</strong> Work will commence only after receiving written authorisation or verbal authorisation in emergency situations, followed by written confirmation.
              </p>
              <p>
                <strong>Variations:</strong> Any changes to the agreed scope of work must be approved in writing and may result in additional charges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
              <p>
                <strong>Insurance Claims:</strong> We work directly with insurance companies and can manage the claims process on your behalf with your authorisation.
              </p>
              <p>
                <strong>Direct Payment:</strong> For non-insurance work or deductibles/excess:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Payment terms are net 14 days from invoice date unless otherwise agreed</li>
                <li>We accept cash, cheque, bank transfer, and major credit cards</li>
                <li>A deposit may be required for large projects</li>
                <li>Late payments may incur interest at the rate of 1.5% per month</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Warranties and Guarantees</h2>
              <p>
                We provide the following warranties for our work:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Workmanship warranty: 12 months from completion</li>
                <li>Mould remediation warranty: 6 months (subject to maintaining proper conditions)</li>
                <li>Structural drying warranty: 90 days</li>
              </ul>
              <p>
                Warranties are void if:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Damage recurs due to unrepaired sources of water intrusion</li>
                <li>Customer fails to maintain proper environmental conditions</li>
                <li>Additional damage occurs from new incidents</li>
                <li>Work is modified by others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Liability and Insurance</h2>
              <p>
                Disaster Recovery maintains:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>$20 million public liability insurance</li>
                <li>Professional indemnity insurance</li>
                <li>Workers' compensation insurance</li>
              </ul>
              <p>
                Our liability for any claim arising from our services is limited to the value of the services provided, except where prohibited by law. We are not liable for:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Pre-existing damage or conditions</li>
                <li>Damage caused by delays beyond our control</li>
                <li>Consequential or indirect losses</li>
                <li>Loss of profits or business interruption</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Customer Responsibilities</h2>
              <p>Customers agree to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Provide safe access to the property</li>
                <li>Disclose all known hazards and dangers</li>
                <li>Remove or secure valuable items</li>
                <li>Obtain necessary permissions from property owners if applicable</li>
                <li>Maintain insurance coverage on the property</li>
                <li>Follow our safety instructions and recommendations</li>
                <li>Promptly report any concerns or issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Health and Safety</h2>
              <p>
                We prioritise safety in all our operations. We may refuse or suspend service if:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Unsafe conditions exist that cannot be mitigated</li>
                <li>Hazardous materials are present requiring specialist handling</li>
                <li>Structural integrity is compromised</li>
                <li>Required safety equipment cannot be used effectively</li>
              </ul>
              <p>
                Customers must comply with all safety requirements, including temporary evacuation if necessary.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cancellation Policy</h2>
              <p>
                <strong>By Customer:</strong> Services may be cancelled with 24 hours notice without penalty. Cancellations with less notice may incur a callout fee.
              </p>
              <p>
                <strong>By Company:</strong> We reserve the right to cancel or refuse service for:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Safety concerns</li>
                <li>Non-payment of previous invoices</li>
                <li>Abusive or threatening behaviour</li>
                <li>Failure to provide necessary access or permissions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, and images, is the property of Disaster Recovery and protected by Australian and international copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Privacy and Confidentiality</h2>
              <p>
                We handle personal information in accordance with our Privacy Policy and Australian Privacy Principles. We maintain confidentiality regarding:
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>Customer personal information</li>
                <li>Property details and damage extent</li>
                <li>Insurance claim information</li>
                <li>Business sensitive information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Dispute Resolution</h2>
              <p>
                Any disputes arising from these Terms or our services will be resolved through:
              </p>
              <ol className="list-decimal ml-6 mb-4">
                <li>Direct negotiation between parties</li>
                <li>Mediation through a mutually agreed mediator</li>
                <li>Arbitration under the rules of the Australian Commercial Disputes Centre</li>
                <li>Legal proceedings in Queensland courts as a last resort</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
              <p>
                These Terms are governed by the laws of Queensland, Australia. You consent to the exclusive jurisdiction of the courts of Queensland for any disputes arising under these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Amendments</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us at:</p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="font-semibold">Disaster Recovery</p>
                <p>4/17 Tile St, Wacol, QLD 4076</p>
                <p>Phone: 1300 309 361</p>
                <p>Email: <a href="mailto:info@disasterrecovery.com.au" className="text-blue-600 hover:text-blue-700">info@disasterrecovery.com.au</a></p>
                <p>ABN: [To be provided]</p>
                <p>Operating Hours: 24/7 Emergency Service</p>
                <p>Office Hours: Monday-Friday 7:00 AM - 6:00 PM</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Acknowledgment</h2>
              <p>
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}