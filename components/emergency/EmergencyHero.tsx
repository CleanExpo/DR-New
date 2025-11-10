import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmergencyHeroProps {
  title: string;
  subtitle: string;
  timeframe: string;
  responseTime: string;
  totalFee: string;
  urgencyLevel?: 'critical' | 'extreme' | 'high';
}

export function EmergencyHero({
  title,
  subtitle,
  timeframe,
  responseTime,
  totalFee,
  urgencyLevel = 'critical'
}: EmergencyHeroProps) {
  const gradientClass = urgencyLevel === 'extreme'
    ? 'from-red-900 via-orange-800 to-red-900'
    : urgencyLevel === 'critical'
    ? 'from-red-800 via-orange-700 to-red-800'
    : 'from-orange-800 via-red-700 to-orange-800';

  return (
    <>
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-4 animate-pulse sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <AlertTriangle className="h-6 w-6" />
          <span className="font-bold text-lg">EMERGENCY - CALL NOW: 1300 309 361</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${gradientClass} text-white py-16 md:py-24`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full mb-6">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold uppercase tracking-wide">24/7 Emergency Service</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              {subtitle}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-1">{responseTime}</div>
                <div className="text-orange-100">Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-1">{timeframe}</div>
                <div className="text-orange-100">Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-1">{totalFee}</div>
                <div className="text-orange-100">Total Emergency Fee</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-5 bg-white text-red-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-red-500/50 transform hover:scale-105"
              >
                <Phone className="mr-3 h-6 w-6" />
                CALL NOW: 1300 309 361
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-5 bg-orange-600 text-white rounded-lg font-bold text-xl hover:bg-orange-700 transition-all border-2 border-white/30"
              >
                Emergency Online Form
              </a>
            </div>

            {/* Insurance Notice */}
            <div className="mt-8 flex items-start gap-3 bg-green-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="text-green-400 font-bold text-lg">100% Insurance Covered</div>
              <div className="text-sm text-green-100">All emergency fees typically covered by insurance</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
