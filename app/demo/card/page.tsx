import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CardBottomImageDemo from '@/components/CardBottomImageDemo';

export const metadata: Metadata = {
  title: 'Card Demo | Disaster Recovery',
  description: 'Demo page for card component with bottom image',
  robots: 'noindex, nofollow',
};

export default function CardDemoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Card Component Demo
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Demo Card 1 */}
            <CardBottomImageDemo />

            {/* Demo Card 2 - with hover effect */}
            <div className="max-w-md pb-0 shadow-lg border border-gray-200 overflow-hidden rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Emergency Response</h3>
                <p className="text-sm text-gray-600 mb-4">
                  24/7 disaster recovery services with 1-hour response time across Brisbane.
                </p>
              </div>
              <div className="relative w-full h-48">
                <img
                  src="/images/hero/disaster-recovery-services.jpg"
                  alt="Emergency disaster recovery services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Demo Card 3 - with different content */}
            <div className="max-w-md pb-0 shadow-lg border border-gray-200 overflow-hidden rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Fire Damage Restoration</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Professional fire and smoke damage restoration by IICRC certified technicians.
                </p>
              </div>
              <div className="relative w-full h-48">
                <img
                  src="/images/hero/fire-smoke-damage-restoration.jpg"
                  alt="Fire and smoke damage restoration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Usage Instructions</h2>
            <div className="max-w-3xl mx-auto text-left bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">To use the CardBottomImageDemo component:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import CardBottomImageDemo from '@/components/CardBottomImageDemo';

// In your JSX:
<CardBottomImageDemo />`}
              </pre>

              <h3 className="font-semibold mt-6 mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Responsive design with max-width constraint</li>
                <li>Shadow effects for depth</li>
                <li>Optimized Next.js Image component</li>
                <li>Proper aspect ratio handling</li>
                <li>Hover effects for interactivity</li>
                <li>Overflow hidden for clean edges</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}