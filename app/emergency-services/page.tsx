import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { FAQSchema, EmergencyHowToSchema } from '@/components/schema/VoiceSearchSchema';

export const metadata = {
  title: "Emergency Disaster Recovery Brisbane | 24/7 Response | Call 1300 309 361 Now",
  description: "EMERGENCY disaster recovery Brisbane, Ipswich, Logan. Water damage, fire damage, flood response. Available NOW 24/7. 1-hour response guarantee. Call 1300 309 361 immediately.",
  keywords: "emergency disaster recovery Brisbane, emergency water damage Brisbane, emergency flood response, emergency fire damage Brisbane, 24/7 disaster recovery, emergency restoration Brisbane, flood emergency Brisbane"
};

const emergencyServices = [
  {
    service: "Emergency Water Damage Response",
    description: "Immediate water extraction and damage control for burst pipes, flooding, and water emergencies",
    responseTime: "30-60 minutes",
    available: "24/7/365",
    coverage: "Brisbane, Ipswich, Logan",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.1L6.9 8.5c-2.3 2.8-2.3 6.9 0 9.7s6.2 2.8 8.5 0L12 2.1zm0 15.4c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    )
  },
  {
    service: "Emergency Fire Damage Response",
    description: "Immediate smoke and fire damage assessment, board-up services, and restoration planning",
    responseTime: "30-60 minutes",
    available: "24/7/365",
    coverage: "Brisbane, Ipswich, Logan",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
      </svg>
    )
  },
  {
    service: "Emergency Flood Response",
    description: "Rapid flood water extraction, contamination control, and emergency drying services",
    responseTime: "30-60 minutes",
    available: "24/7/365",
    coverage: "Brisbane, Ipswich, Logan",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.61 5.64 5.36 8.04 2.35 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    )
  },
  {
    service: "Emergency Storm Damage Response",
    description: "Immediate roof tarping, board-up, debris removal, and storm damage assessment",
    responseTime: "30-60 minutes",
    available: "24/7/365",
    coverage: "Brisbane, Ipswich, Logan",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 12h-2l1.4-2.1c.8-1.2.4-2.8-.8-3.6s-2.8-.4-3.6.8L12 10.7 10 7.1c-.8-1.2-2.4-1.6-3.6-.8s-1.6 2.4-.8 3.6L7 12H5c-1.1 0-2 .9-2 2s.9 2 2 2h2l-1.4 2.1c-.8 1.2-.4 2.8.8 3.6s2.8.4 3.6-.8L12 17.3l2 3.6c.8 1.2 2.4 1.6 3.6.8s1.6-2.4.8-3.6L17 16h2c1.1 0 2-.9 2-2s-.9-2-2-2z"/>
      </svg>
    )
  }
];

const nearMeQueries = [
  {
    query: "Emergency water damage repair near me",
    answer: "Disaster Recovery Brisbane provides emergency water damage repair across Brisbane, Ipswich, and Logan with guaranteed 1-hour response time. Call 1300 309 361 now for immediate assistance.",
    locations: ["Brisbane CBD", "South Brisbane", "West End", "Fortitude Valley", "New Farm", "Kangaroo Point"]
  },
  {
    query: "Emergency flood cleanup near me",
    answer: "Emergency flood cleanup is available 24/7 across Brisbane metro areas including Ipswich and Logan. Our certified technicians respond within 1 hour to begin water extraction and damage control.",
    locations: ["Ipswich", "Springfield", "Redbank", "Goodna", "Rosewood", "Karalee"]
  },
  {
    query: "Fire damage restoration near me emergency",
    answer: "Emergency fire damage restoration services are available immediately across Brisbane, Ipswich, and Logan. We provide 24/7 response for smoke damage, soot removal, and structural assessment.",
    locations: ["Logan", "Beenleigh", "Marsden", "Springwood", "Shailer Park", "Daisy Hill"]
  }
];

const emergencyFAQs = [
  {
    question: "Who provides emergency disaster recovery near me?",
    answer: "Disaster Recovery Brisbane provides emergency disaster recovery services across Brisbane, Ipswich, and Logan with certified IICRC technicians available 24/7. We guarantee 1-hour response time for all emergency situations including water damage, fire damage, flooding, and storm damage. Call 1300 309 361 immediately for emergency assistance."
  },
  {
    question: "How fast is emergency water damage response in Brisbane?",
    answer: "Emergency water damage response in Brisbane is available within 1 hour of your call to 1300 309 361. Our emergency team operates 24/7 across Brisbane, Ipswich, and Logan with rapid water extraction equipment ready to deploy immediately to minimize damage and prevent mould growth."
  },
  {
    question: "What should I do in a flood emergency?",
    answer: "In a flood emergency: 1) Ensure personal safety first, 2) Call Disaster Recovery Brisbane immediately at 1300 309 361, 3) Turn off electricity if safe to do so, 4) Document damage with photos, 5) Do not enter standing water, 6) Remove valuables to safe areas. Our emergency team provides guidance during your call and arrives within 1 hour."
  }
];

export default function EmergencyServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Emergency Hero Section */}
        <section className="bg-gradient-to-br from-emergency-900 to-emergency-800 text-white section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                <svg className="w-5 h-5 text-emergency-300 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span className="text-sm font-semibold">24/7 EMERGENCY RESPONSE</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                EMERGENCY
                <span className="block text-emergency-300">Disaster Recovery</span>
                <span className="block text-2xl lg:text-3xl font-normal text-emergency-200">Brisbane • Ipswich • Logan</span>
              </h1>

              <div className="quick-answer bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">IMMEDIATE HELP AVAILABLE NOW</h2>
                <p className="text-xl font-medium leading-relaxed">
                  Emergency disaster recovery available 24/7 across Brisbane, Ipswich, and Logan.
                  Guaranteed 1-hour response for water damage, fire damage, flooding, and storm damage emergencies.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <a
                  href="tel:1300309361"
                  className="emergency-phone bg-white text-emergency-600 font-bold py-6 px-12 rounded-2xl text-2xl hover:bg-gray-50 transition-colors flex items-center space-x-4 shadow-2xl"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <div>
                    <div className="text-sm opacity-70">EMERGENCY HOTLINE</div>
                    <div className="font-black">1300 309 361</div>
                  </div>
                </a>

                <div className="response-time text-emergency-200 text-center">
                  <p className="text-lg font-semibold">GUARANTEED RESPONSE TIME</p>
                  <p className="text-3xl font-bold">1 HOUR OR LESS</p>
                  <p className="service-area">Serving Brisbane • Ipswich • Logan • 24/7/365</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services Grid */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Emergency Response Services Available Now
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Professional emergency disaster recovery services available 24/7 across Brisbane,
                Ipswich, and Logan with certified IICRC technicians and guaranteed rapid response.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {emergencyServices.map((service, index) => (
                <Card key={index} className="border-l-4 border-emergency-500">
                  <div className="flex items-start">
                    <div className="bg-emergency-100 text-emergency-600 rounded-lg p-4 mr-6 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.service}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>

                      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-600">Response Time</div>
                          <div className="text-lg font-bold text-emergency-600">{service.responseTime}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-600">Availability</div>
                          <div className="text-lg font-bold text-green-600">{service.available}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-600">Coverage</div>
                          <div className="text-sm font-bold text-primary-600">{service.coverage}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Near Me Voice Search Optimization */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Emergency Services "Near Me" - Brisbane Metro
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Immediate emergency response across all Brisbane metro areas including Ipswich and Logan.
                When you search for emergency help "near me", we're ready to respond within 1 hour.
              </p>
            </div>

            <div className="space-y-8">
              {nearMeQueries.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.query}</h3>

                    <div className="quick-answer bg-primary-50 rounded-lg p-6 mb-6">
                      <div className="text-sm font-semibold text-primary-700 mb-2">Immediate Answer:</div>
                      <p className="text-lg text-gray-900 font-medium leading-relaxed">{item.answer}</p>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-3">Service Areas Covered:</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {item.locations.map((location, locationIndex) => (
                          <div key={locationIndex} className="bg-white rounded px-3 py-2 text-sm text-gray-700 border">
                            {location}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-emergency-50 rounded-lg border border-emergency-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-emergency-700">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="font-semibold">Emergency Response Available Now</span>
                        </div>
                        <a
                          href="tel:1300309361"
                          className="bg-emergency-600 text-white px-4 py-2 rounded font-bold hover:bg-emergency-700 transition-colors"
                        >
                          Call 1300 309 361
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Action Steps */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                What To Do In A Disaster Emergency
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Follow these emergency steps while our team rushes to your location.
                We provide guidance during your emergency call.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-emergency-100 text-emergency-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">SAFETY FIRST</h3>
                <p className="text-gray-600">Ensure personal safety. Turn off electricity if safe. Evacuate if necessary.</p>
              </div>

              <div className="text-center">
                <div className="bg-emergency-100 text-emergency-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">CALL IMMEDIATELY</h3>
                <p className="text-gray-600">Call 1300 309 361 now. Our team responds within 1 hour, 24/7.</p>
              </div>

              <div className="text-center">
                <div className="bg-emergency-100 text-emergency-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">DOCUMENT DAMAGE</h3>
                <p className="text-gray-600">Take photos of damage for insurance. Don't move items until documented.</p>
              </div>

              <div className="text-center">
                <div className="bg-emergency-100 text-emergency-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">WAIT FOR HELP</h3>
                <p className="text-gray-600">Professionals arrive within 1 hour. We handle everything from there.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="section-padding bg-gradient-to-r from-emergency-600 to-emergency-700 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              EMERGENCY SITUATION RIGHT NOW?
            </h2>
            <p className="text-xl text-emergency-100 mb-8 max-w-3xl mx-auto">
              Don't wait. Every minute counts in disaster recovery. Our emergency team is standing by
              to respond immediately across Brisbane, Ipswich, and Logan.
            </p>

            <div className="flex flex-col items-center gap-6">
              <a
                href="tel:1300309361"
                className="bg-white text-emergency-600 font-bold py-6 px-12 rounded-2xl text-2xl hover:bg-gray-50 transition-colors flex items-center space-x-4 shadow-2xl"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <div className="text-sm opacity-70">CALL EMERGENCY NOW</div>
                  <div className="font-black">1300 309 361</div>
                </div>
              </a>

              <div className="text-emergency-200 text-center">
                <p className="text-lg font-semibold">AVAILABLE RIGHT NOW</p>
                <p className="text-xl">24 Hours • 7 Days • 365 Days</p>
                <p className="text-lg">Brisbane • Ipswich • Logan • Gold Coast • Sunshine Coast</p>
              </div>
            </div>
          </div>
        </section>

        {/* Schema Markup */}
        <FAQSchema faqs={emergencyFAQs} />
        <EmergencyHowToSchema />
      </main>
      <Footer />
    </>
  );
}