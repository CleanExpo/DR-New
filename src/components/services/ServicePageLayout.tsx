import { Clock, Shield, Award, Phone } from 'lucide-react';
import Link from 'next/link';

interface ServicePageLayoutProps {
  title?: string;
  description?: string;
  heroTitle?: string;
  heroDescription?: string;
  children: React.ReactNode;
  showEmergencyBanner?: boolean;
  showTrustIndicators?: boolean;
  serviceType?: string;
  className?: string;
}

export default function ServicePageLayout({
  title,
  description,
  heroTitle,
  heroDescription,
  children,
  showEmergencyBanner = true,
  showTrustIndicators = true,
  serviceType = 'restoration',
  className = ''
}: ServicePageLayoutProps) {
  // Use heroTitle/heroDescription if provided, otherwise fall back to title/description
  const displayTitle = heroTitle || title || 'Professional Restoration Services';
  const displayDescription = heroDescription || description || 'Expert disaster recovery and restoration services in Brisbane, Ipswich, and Logan';

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Emergency Banner */}
      {showEmergencyBanner && (
        <div className="bg-red-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">24/7 Emergency Response</span>
              <span className="hidden sm:inline">•</span>
              <a href="tel:1300900300" className="hover:underline font-bold">
                Call 1300 900 300
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {displayTitle}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {displayDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-service"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Immediate Help
              </Link>
              <a
                href="tel:1300900300"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      {showTrustIndicators && (
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Clock className="h-10 w-10 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Rapid Response</h3>
                  <p className="text-sm text-gray-600">On-site within 60 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-10 w-10 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Insurance Approved</h3>
                  <p className="text-sm text-gray-600">Work with all major insurers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-10 w-10 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Master Restorer</h3>
                  <p className="text-sm text-gray-600">IICRC Certified Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need {serviceType} Services Now?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Don't wait - water damage worsens every hour. Get professional help immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-service"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Book Emergency Service
              </Link>
              <a
                href="tel:1300900300"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                1300 900 300
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}