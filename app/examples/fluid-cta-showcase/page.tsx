import { Metadata } from 'next';
import {
  FluidCTA,
  FluidCTAGroup,
  FluidEmergencyBanner,
  FluidFloatingCTA,
} from '@/components/fluid-cta';

export const metadata: Metadata = {
  title: 'Fluid CTA Animation Showcase | Disaster Recovery Brisbane',
  description: 'Interactive showcase of fluid CTA animations for emergency services',
  robots: 'noindex, nofollow', // Don't index this example page
};

/**
 * Fluid CTA Animation Showcase
 *
 * This page demonstrates all fluid CTA components in action.
 * Use this as a reference for implementing CTAs across the site.
 */
export default function FluidCTAShowcasePage() {
  return (
    <>
      {/* Emergency Banner at top */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Water Damage & Fire Restoration"
        sticky
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center text-white mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Fluid CTA Animation Showcase
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Interactive demonstrations of all fluid CTA components with various
                configurations, sizes, and animation effects.
              </p>
            </div>

            {/* Variant Examples */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Emergency Variant</h2>
                <p className="text-blue-200 text-sm mb-6">
                  Red gradient with pulse animation. Use for urgent actions like
                  emergency calls.
                </p>
                <FluidCTA
                  text="Emergency Call"
                  href="tel:1300309361"
                  variant="emergency"
                  size="lg"
                  icon="phone"
                  magnetic
                  ripple
                  pulse
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Primary Variant</h2>
                <p className="text-blue-200 text-sm mb-6">
                  Blue gradient with magnetic effect. Use for primary actions like
                  quotes or bookings.
                </p>
                <FluidCTA
                  text="Get Free Quote"
                  href="/quote"
                  variant="primary"
                  size="lg"
                  icon="arrow"
                  magnetic
                  ripple
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Secondary Variant</h2>
                <p className="text-blue-200 text-sm mb-6">
                  Gray gradient with subtle effects. Use for secondary actions like
                  "Learn More".
                </p>
                <FluidCTA
                  text="Learn More"
                  href="/about"
                  variant="secondary"
                  size="lg"
                  icon="arrow"
                  magnetic
                  ripple
                />
              </div>
            </div>

            {/* Size Examples */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Size Options
              </h2>
              <FluidCTAGroup layout="horizontal" spacing="md" align="center">
                <FluidCTA
                  text="Small"
                  href="#"
                  variant="primary"
                  size="sm"
                  icon="arrow"
                  magnetic
                />
                <FluidCTA
                  text="Medium"
                  href="#"
                  variant="primary"
                  size="md"
                  icon="arrow"
                  magnetic
                />
                <FluidCTA
                  text="Large"
                  href="#"
                  variant="primary"
                  size="lg"
                  icon="arrow"
                  magnetic
                />
                <FluidCTA
                  text="Extra Large"
                  href="#"
                  variant="primary"
                  size="xl"
                  icon="arrow"
                  magnetic
                />
              </FluidCTAGroup>
            </div>

            {/* Icon Examples */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Icon Options
              </h2>
              <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
                <FluidCTA
                  text="Call Now"
                  href="tel:1300309361"
                  variant="emergency"
                  size="lg"
                  icon="phone"
                  magnetic
                  ripple
                />
                <FluidCTA
                  text="Next Step"
                  href="#"
                  variant="primary"
                  size="lg"
                  icon="arrow"
                  magnetic
                  ripple
                />
                <FluidCTA
                  text="Alert"
                  href="#"
                  variant="emergency"
                  size="lg"
                  icon="alert"
                  magnetic
                  ripple
                />
                <FluidCTA
                  text="No Icon"
                  href="#"
                  variant="secondary"
                  size="lg"
                  icon="none"
                  magnetic
                  ripple
                />
              </FluidCTAGroup>
            </div>

            {/* CTA Group Layouts */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Horizontal Layout
                </h2>
                <FluidCTAGroup layout="horizontal" spacing="md" align="center">
                  <FluidCTA
                    text="Primary"
                    href="#"
                    variant="primary"
                    size="md"
                    magnetic
                  />
                  <FluidCTA
                    text="Secondary"
                    href="#"
                    variant="secondary"
                    size="md"
                    magnetic
                  />
                </FluidCTAGroup>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Vertical Layout
                </h2>
                <FluidCTAGroup layout="vertical" spacing="md" align="center">
                  <FluidCTA
                    text="Water Damage"
                    href="#"
                    variant="emergency"
                    size="md"
                    magnetic
                  />
                  <FluidCTA
                    text="Fire Damage"
                    href="#"
                    variant="emergency"
                    size="md"
                    magnetic
                  />
                  <FluidCTA
                    text="Storm Damage"
                    href="#"
                    variant="emergency"
                    size="md"
                    magnetic
                  />
                </FluidCTAGroup>
              </div>
            </div>

            {/* Real-world Example: Hero Section */}
            <div className="bg-gradient-to-br from-red-900/30 to-blue-900/30 rounded-xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Real-World Example: Hero Section
              </h2>
              <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                60-minute emergency response • IICRC Master Restorer • Insurance
                approved • Serving Brisbane, Ipswich & Logan
              </p>

              <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
                <FluidCTA
                  text="Call 1300 309 361 Now"
                  href="tel:1300309361"
                  variant="emergency"
                  size="xl"
                  icon="phone"
                  magnetic
                  ripple
                  pulse
                />
                <FluidCTA
                  text="Free Emergency Quote"
                  href="/quote"
                  variant="primary"
                  size="xl"
                  icon="arrow"
                  magnetic
                  ripple
                />
              </FluidCTAGroup>
            </div>

            {/* Scroll instruction */}
            <div className="text-center text-white mt-16">
              <p className="text-xl mb-4">
                👇 Scroll down to see the floating CTA appear
              </p>
              <p className="text-blue-200 text-sm">
                (Appears after scrolling 300px)
              </p>
            </div>
          </div>
        </section>

        {/* Spacer to demonstrate floating CTA */}
        <section className="py-32 bg-gradient-to-br from-blue-900 to-slate-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Keep Scrolling...
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              The floating CTA button should now be visible in the bottom-right
              corner. Try hovering over it to see the expanded information panel!
            </p>
          </div>
        </section>

        {/* Animation Details */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Animation Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  🧲 Magnetic Effect
                </h3>
                <p className="text-blue-200 text-sm">
                  Button follows your mouse cursor within a radius. Creates an
                  engaging, interactive feel.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  💧 Liquid Ripple
                </h3>
                <p className="text-blue-200 text-sm">
                  Ripple animation expands from click point. Provides satisfying
                  visual feedback.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  ✨ Smooth Gradients
                </h3>
                <p className="text-blue-200 text-sm">
                  Animated gradient sweep on hover. Creates premium, polished look.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">💫 Pulse Animation</h3>
                <p className="text-blue-200 text-sm">
                  Gentle scale animation for emergency CTAs. Draws attention without
                  being annoying.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">🎯 Focus States</h3>
                <p className="text-blue-200 text-sm">
                  Visible keyboard focus indicators. Ensures accessibility for
                  keyboard users.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">📱 Mobile Optimized</h3>
                <p className="text-blue-200 text-sm">
                  Touch-friendly interactions. Magnetic effect disabled on mobile for
                  better UX.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Tips */}
        <section className="py-20 bg-gradient-to-br from-slate-800 to-blue-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Implementation Tips
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ✅ Do's
                </h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Use <code className="bg-black/30 px-2 py-1 rounded">variant="emergency"</code> for phone calls</li>
                  <li>• Enable <code className="bg-black/30 px-2 py-1 rounded">pulse</code> on emergency CTAs</li>
                  <li>• Use <code className="bg-black/30 px-2 py-1 rounded">size="xl"</code> for hero sections</li>
                  <li>• Group related CTAs with FluidCTAGroup</li>
                  <li>• Test on mobile devices</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ⚠️ Don'ts
                </h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Don't use too many pulsing CTAs (max 1 per section)</li>
                  <li>• Don't disable <code className="bg-black/30 px-2 py-1 rounded">magnetic</code> unless needed for mobile</li>
                  <li>• Don't use <code className="bg-black/30 px-2 py-1 rounded">size="xl"</code> for every CTA</li>
                  <li>• Don't forget accessibility (always include href)</li>
                  <li>• Don't overload pages with too many CTAs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating CTA (appears after scrolling 300px) */}
      <FluidFloatingCTA
        phone="1300 309 361"
        showAfterScroll={300}
        position="bottom-right"
      />
    </>
  );
}
