import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroConversion from '@/components/sections/HeroConversion';
import { GuaranteesSection, RiskReversal, TrustSeals } from '@/components/conversion/GuaranteesSection';
import { ExitIntentPopup } from '@/components/conversion/ExitIntentPopup';
import { RecentActivityNotification, LiveVisitorCounter, RecentlyHelped } from '@/components/conversion/SocialProofNotifications';
import { UrgencyBar, CountdownTimer, SurgePrice } from '@/components/conversion/UrgencyComponents';
import { MultiStepQuoteForm } from '@/components/conversion/MultiStepQuoteForm';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import EmergencyTracker from '@/components/sections/EmergencyTracker';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import LiveChat from '@/components/chat/LiveChat';

export default function ConversionOptimizedHomePage() {
  return (
    <>
      <Header />

      {/* Exit Intent Popup - Triggers when user tries to leave */}
      <ExitIntentPopup />

      {/* Social Proof Notifications - Shows recent activity */}
      <RecentActivityNotification />

      <main id="main-content" role="main" aria-label="Main content">
        {/* High-Converting Hero Section */}
        <HeroConversion />

        {/* Urgency Bar - Creates immediate action pressure */}
        <section className="sticky top-0 z-40 bg-white shadow-lg py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CountdownTimer
                endTime={new Date(Date.now() + 4 * 60 * 60 * 1000)}
                offerText="Emergency Response Special - 20% OFF"
              />
              <LiveVisitorCounter />
              <SurgePrice />
            </div>
          </div>
        </section>

        {/* Real-time Emergency Response Tracker */}
        <EmergencyTracker />

        {/* Trust-Building Guarantees */}
        <GuaranteesSection />

        {/* Interactive Service Showcase */}
        <ServiceShowcase />

        {/* Risk Reversal Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <RiskReversal />
          </div>
        </section>

        {/* Multi-Step Quote Form Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Free Quote in 60 Seconds
              </h2>
              <p className="text-xl text-gray-700">
                No obligations. No hidden fees. Just honest pricing.
              </p>
            </div>
            <MultiStepQuoteForm />
          </div>
        </section>

        {/* Recently Helped Section - Social Proof */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Helping Brisbane Families Every Day
                </h2>
                <RecentlyHelped />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Live Emergency Response Status
                </h2>
                <UrgencyBar />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials with Trust Indicators */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <TestimonialsCarousel />
            <div className="mt-12">
              <TrustSeals />
            </div>
          </div>
        </section>

        {/* Final Conversion Section with Multiple CTAs */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Every Second You Wait Costs You Money
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Water damage spreads exponentially. Mould doubles every 24 hours.
              Fire residue becomes permanent after 48 hours. Act NOW before it's too late.
            </p>

            {/* Damage Cost Calculator */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Damage Cost Growing Every Hour:</h3>
              <div className="text-5xl font-bold mb-2">
                <DamageCostTicker />
              </div>
              <p className="text-sm opacity-90">
                Based on average water damage spreading at 1 sq ft per minute
              </p>
            </div>

            {/* Multiple CTA Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a
                href="tel:1300309361"
                className="bg-white text-red-600 font-bold py-6 px-8 rounded-xl shadow-2xl hover:scale-105 transition-all"
              >
                <div className="text-3xl mb-2">📞</div>
                <div className="text-lg">Call Now</div>
                <div className="text-2xl mt-1">1300 309 361</div>
              </a>

              <button className="bg-yellow-400 text-gray-900 font-bold py-6 px-8 rounded-xl shadow-2xl hover:scale-105 transition-all">
                <div className="text-3xl mb-2">💬</div>
                <div className="text-lg">Live Chat</div>
                <div className="text-sm mt-1">Instant Response</div>
              </button>

              <button className="bg-blue-600 text-white font-bold py-6 px-8 rounded-xl shadow-2xl hover:scale-105 transition-all">
                <div className="text-3xl mb-2">📋</div>
                <div className="text-lg">Quick Quote</div>
                <div className="text-sm mt-1">60 Second Form</div>
              </button>
            </div>

            {/* Urgency Reminder */}
            <div className="mt-12 animate-pulse">
              <p className="text-2xl font-bold">
                ⚠️ {Math.floor(Math.random() * 5) + 3} other properties currently waiting for service
              </p>
              <p className="text-lg mt-2 opacity-90">
                Don't lose your spot - Call immediately for priority response
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LiveChat />
    </>
  );
}

// Damage Cost Ticker Component
function DamageCostTicker() {
  const { useState, useEffect } = require('react');
  const [cost, setCost] = useState(1500);

  useEffect(() => {
    const interval = setInterval(() => {
      setCost(prev => prev + Math.floor(Math.random() * 50) + 25);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <>${cost.toLocaleString()}</>;
}