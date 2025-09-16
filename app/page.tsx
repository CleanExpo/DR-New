import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroPremium from '@/components/sections/HeroPremium';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import EmergencyTracker from '@/components/sections/EmergencyTracker';
import ResponseTimeline from '@/components/sections/ResponseTimeline';
import TrustIndicators from '@/components/sections/TrustIndicators';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import ServiceAreaMap from '@/components/sections/ServiceAreaMap';
import Services from '@/components/sections/Services';
import LiveChat from '@/components/chat/LiveChat';
import EquipmentGallery from '@/components/gallery/EquipmentGallery';
import ProcessShowcase from '@/components/process/ProcessShowcase';

// Brand Amplification Components
import BrandAuthority from '@/components/brand/BrandAuthority';
import BrandStoryVideo from '@/components/brand/BrandStoryVideo';
import ExecutiveLeadership from '@/components/brand/ExecutiveLeadership';
import MediaPress from '@/components/brand/MediaPress';
import PartnershipsAlliances from '@/components/brand/PartnershipsAlliances';
import SocialProofAmplified from '@/components/brand/SocialProofAmplified';
import InnovationLeadership from '@/components/brand/InnovationLeadership';
import CommunityImpact from '@/components/brand/CommunityImpact';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" aria-label="Main content">
        {/* Premium Hero with Video Background */}
        <HeroPremium />

        {/* Brand Authority & Heritage - Establishes 20+ years of excellence */}
        <BrandAuthority />

        {/* Real-time Emergency Response Tracker */}
        <EmergencyTracker />

        {/* Brand Story Video - Emotional connection and heritage */}
        <BrandStoryVideo />

        {/* Interactive Service Showcase with Before/After */}
        <ServiceShowcase />

        {/* Executive Leadership - Premium positioning through leadership */}
        <ExecutiveLeadership />

        {/* Emergency Response Timeline */}
        <ResponseTimeline />

        {/* Media & Press Features - Third-party validation */}
        <MediaPress />

        {/* Trust Indicators & Certifications */}
        <TrustIndicators />

        {/* Industry Partnerships - Premium associations */}
        <PartnershipsAlliances />

        {/* Original Services Grid */}
        <Services />

        {/* Interactive Service Area Map */}
        <ServiceAreaMap />

        {/* Amplified Social Proof with Live Stats */}
        <SocialProofAmplified />

        {/* Innovation & Environmental Leadership */}
        <InnovationLeadership />

        {/* Testimonials & Case Studies Carousel */}
        <TestimonialsCarousel />

        {/* Community Impact & Social Responsibility */}
        <CommunityImpact />

        {/* Equipment Gallery */}
        <EquipmentGallery />

        {/* Process Showcase */}
        <ProcessShowcase />

        {/* Voice Search Optimized Quick Answers */}
        <section className="section-padding bg-primary-50" aria-labelledby="quick-answers-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="quick-answers-heading" className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Emergency Disaster Recovery Questions Answered
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get instant answers to emergency disaster recovery questions for Brisbane, Ipswich, and Logan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Who can help with flood damage right now?</h3>
                <div className="quick-answer bg-primary-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-900 font-medium">Disaster Recovery Brisbane provides 24/7 emergency flood damage response with rapid triage system. Call 1300 309 361 immediately.</p>
                </div>
                <p className="text-gray-600 text-sm">Available across Brisbane, Ipswich, and Logan with certified IICRC technicians.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How quickly can someone fix water damage?</h3>
                <div className="quick-answer bg-primary-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-900 font-medium">Water damage repair begins with rapid emergency response. Complete restoration takes 3-7 days depending on damage severity.</p>
                </div>
                <p className="text-gray-600 text-sm">Emergency water extraction prevents further damage and mould growth.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What should I do if my house floods?</h3>
                <div className="quick-answer bg-primary-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-900 font-medium">Ensure safety, call 1300 309 361 immediately, document damage, avoid standing water, and remove valuables safely.</p>
                </div>
                <p className="text-gray-600 text-sm">Our emergency team provides step-by-step guidance during your call.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-white" aria-labelledby="why-choose-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-2 mb-4">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-primary-700 font-semibold">Why Choose Us</span>
              </div>

              <h2 id="why-choose-heading" className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Brisbane's Fastest Emergency Response Team
              </h2>

              <div className="quick-answer bg-primary-50 p-6 rounded-lg mb-6 max-w-4xl mx-auto">
                <p className="text-xl text-gray-900 font-medium">
                  Disaster Recovery Brisbane is Brisbane's fastest emergency response team with certified IICRC technicians,
                  rapid triage system, and 15+ years experience serving Brisbane, Ipswich, and Logan.
                </p>
              </div>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                When disaster strikes, you need experienced professionals who understand the urgency
                and have the expertise to restore your property quickly and completely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">IICRC Certified</h3>
                <p className="text-gray-600">Our technicians are certified by the Institute of Inspection, Cleaning and Restoration Certification.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Emergency</h3>
                <p className="text-gray-600">Round-the-clock emergency response team ready to respond within 1 hour.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.5-5A7.5 7.5 0 0 1 19 12H5a7.5 7.5 0 0 1 12.5-5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Insurance Direct</h3>
                <p className="text-gray-600">We work directly with your insurance company to streamline the claims process.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Experts</h3>
                <p className="text-gray-600">15+ years serving Brisbane communities with personalized, professional service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-gray-50" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="testimonials-heading" className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what Brisbane property owners say about our restoration services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Outstanding service! When our office flooded after the storm, they arrived within 45 minutes and had everything under control. Professional, efficient, and helped us get back to business quickly."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Sarah Mitchell</p>
                  <p className="text-sm text-gray-600">Business Owner, Brisbane CBD</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "The team handled our fire damage with such care and professionalism. They worked directly with our insurance and kept us informed every step of the way. Couldn't be happier with the results."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">David Chen</p>
                  <p className="text-sm text-gray-600">Homeowner, Ipswich</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Discovered mould in our home and panicked. These guys were amazing - thorough inspection, complete removal, and prevention advice. Haven't had any issues since. Highly recommend!"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Jennifer Walsh</p>
                  <p className="text-sm text-gray-600">Property Manager, Logan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="emergency-contact" className="section-padding bg-gradient-to-br from-primary-900 to-primary-800 text-white" aria-labelledby="emergency-cta-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h2 id="emergency-cta-heading" className="text-3xl lg:text-5xl font-bold mb-6">
              Don't Let Disaster Damage Get Worse
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every minute counts when dealing with water, fire, or mould damage. Our emergency response team
              is standing by to minimize damage and begin restoration immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:1300309361"
                className="emergency-phone bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-6 px-10 rounded-xl transition-all duration-200 flex items-center space-x-3 text-lg shadow-2xl hover:shadow-3xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm opacity-90">Emergency Hotline</div>
                  <div className="text-xl font-bold">1300 309 361</div>
                </div>
              </a>

              <div className="flex flex-col items-center">
                <div className="text-primary-200 font-semibold mb-2">Or Email Us</div>
                <a
                  href="mailto:admin@disasterrecovery.com.au"
                  className="text-white hover:text-primary-200 transition-colors font-semibold"
                >
                  admin@disasterrecovery.com.au
                </a>
              </div>

              <Link
                href="/pricing"
                className="bg-transparent text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200 border-2 border-white"
              >
                View Transparent Pricing
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-primary-700 text-primary-200">
              <p className="text-lg">
                <strong>Available 24/7/365</strong> • <strong className="response-time">Rapid Triage System</strong> • <strong className="service-area">Brisbane, Ipswich & Logan</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Live Chat Widget */}
      <LiveChat />
    </>
  );
}