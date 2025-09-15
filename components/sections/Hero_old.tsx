'use client';

import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2">
                <svg className="w-5 h-5 text-emergency-300 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-semibold">24/7 Emergency Response Available</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Brisbane's Premier
                <span className="block text-primary-200">Disaster Recovery</span>
                <span className="block text-emergency-300">Specialists</span>
              </h1>

              <p className="text-xl text-primary-100 leading-relaxed max-w-2xl">
                Professional water damage, fire damage restoration, and mould remediation services
                across Brisbane, Ipswich, and Logan. When disaster strikes, we respond immediately
                to minimize damage and restore your property to its pre-loss condition.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="emergency"
                size="lg"
                className="flex items-center justify-center space-x-3"
                onClick={() => window.location.href = 'tel:1300309361'}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm opacity-90">Call Emergency Line</div>
                  <div className="text-xl font-bold">1300 309 361</div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white bg-opacity-10 border-white hover:bg-white hover:text-primary-700 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Get Free Assessment
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-primary-600 border-opacity-30">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-primary-200 font-medium">IICRC Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-primary-200 font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-primary-200 font-medium">1 Hour Response</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-primary-200">Emergency Response</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">1hr</div>
                <div className="text-primary-200">Average Response</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-primary-200">Years Experience</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-primary-200">Satisfaction Rate</div>
              </div>
            </div>

            {/* Floating Emergency Card */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-emergency-600 text-white rounded-xl p-4 shadow-2xl">
              <div className="text-center">
                <div className="text-sm font-semibold mb-1">Emergency Hotline</div>
                <div className="text-2xl font-bold">1300 309 361</div>
                <div className="text-xs opacity-90">Available 24/7/365</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}