import { Metadata } from 'next';
import { CompanyAddress } from '@/components/CompanyAddress';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Disaster Recovery - Information about how we use cookies on our website.' };

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <p className="text-sm text-gray-700 mb-6">Effective Date: {new Date().toLocaleDateString('en-AU')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700">
              Cookies are small text files that are stored on your device when you visit our website. They help us
              remember your preferences and improve your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-3 text-gray-700">
              <h3 className="font-semibold">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function properly. They include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Session cookies for maintaining your login</li>
                <li>Security cookies to prevent fraud</li>
                <li>Navigation cookies to remember your preferences</li>
              </ul>

              <h3 className="font-semibold mt-4">Analytics Cookies</h3>
              <p>We use Google Analytics to understand how visitors use our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tracking page views and user behaviour</li>
                <li>Measuring campaign effectiveness</li>
                <li>Improving website performance</li>
              </ul>

              <h3 className="font-semibold mt-4">Marketing Cookies</h3>
              <p>These cookies help us show you relevant advertising:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facebook Pixel for remarketing</li>
                <li>Google Ads conversion tracking</li>
                <li>Social media sharing buttons</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How to Control Cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>Most browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>View what cookies are stored</li>
                <li>Delete cookies at any time</li>
                <li>Block cookies from specific websites</li>
                <li>Set your browser to ask before accepting cookies</li>
              </ul>
              <p className="mt-4">
                Note: Disabling cookies may affect the functionality of our website and your user experience.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>We use cookies from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics (analytics.google.com)</li>
                <li>Facebook (facebook.com)</li>
                <li>Other service providers for website functionality</li>
              </ul>
              <p className="mt-4">
                These third parties may use cookies to track your activity across multiple websites.
                Please review their privacy policies for more information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>For questions about our cookie policy:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <CompanyAddress className="text-gray-700" />
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              This Cookie Policy complies with the Australian Consumer Law and Australian Privacy Principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}