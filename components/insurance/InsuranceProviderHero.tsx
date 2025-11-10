import { Shield, CheckCircle, FileText, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface InsuranceProviderHeroProps {
  providerName: string;
  logoPath?: string;
}

export function InsuranceProviderHero({ providerName, logoPath }: InsuranceProviderHeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="h-12 w-12 text-blue-400" />
            <span className="text-lg font-semibold bg-blue-700/50 px-4 py-2 rounded-full">
              Approved Restoration Provider
            </span>
          </div>

          {/* Logo Placeholder */}
          {logoPath ? (
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-6 shadow-xl">
                {/* Logo would go here */}
                <div className="text-4xl font-bold text-blue-900">{providerName}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold">{providerName}</div>
              </div>
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            We Work With {providerName} Insurance
          </h1>

          <p className="text-xl md:text-2xl text-center mb-10 text-blue-100">
            Preferred provider for disaster recovery and restoration services. Direct billing available - no upfront costs for approved claims.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Pre-Approved Provider</h3>
              <p className="text-sm text-blue-100">Established relationship with {providerName}</p>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
              <FileText className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Direct Billing</h3>
              <p className="text-sm text-blue-100">We bill {providerName} directly</p>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
              <Shield className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">No Upfront Costs</h3>
              <p className="text-sm text-blue-100">For approved insurance claims</p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: 1300 309 361
            </a>
            <a
              href="/contact?insurance=true"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all border-2 border-white/30"
            >
              Start Your Claim
            </a>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 text-center">
            <p className="text-blue-200 mb-2">Emergency? We're available 24/7</p>
            <div className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full">
              <Phone className="w-5 h-5" />
              <span className="font-bold">24/7 Emergency: 1300 309 361</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
