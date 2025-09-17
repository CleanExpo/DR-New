import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

export const metadata = {
  title: "Emergency Disaster Recovery FAQ | Brisbane Ipswich Logan | 1300 309 361",
  description: "Get instant answers to emergency disaster recovery questions. 24/7 water damage, fire damage, flood repair. Fast response times Brisbane, Ipswich, Logan. Call now for help.",
  keywords: "disaster recovery FAQ, emergency water damage help, flood damage questions, fire damage repair Brisbane, emergency restoration answers, what to do flood damage, water damage response time"
};

const faqCategories = [
  {
    category: "Emergency Response",
    faqs: [
      {
        question: "Who can help with flood damage right now?",
        answer: "Disaster Recovery Brisbane provides 24/7 emergency flood damage response across Brisbane, Ipswich, and Logan. Our rapid triage system prioritises urgent cases. Our certified technicians immediately begin water extraction and damage control.",
        voiceOptimised: "Call Disaster Recovery Brisbane at 1300 309 361 for immediate flood damage help. We provide 24/7 emergency response with priority triage across Brisbane, Ipswich, and Logan."
      },
      {
        question: "How quickly can someone fix water damage?",
        answer: "Water damage repair begins immediately with our rapid emergency response. Complete restoration typically takes 3-7 days depending on damage severity. We prioritise water extraction to prevent further damage and mould growth.",
        voiceOptimised: "Water damage repair starts with rapid triage assessment. Complete restoration takes 3 to 7 days depending on damage severity."
      },
      {
        question: "What should I do if my house floods?",
        answer: "If your house floods: 1) Ensure safety first - turn off electricity if safe to do so, 2) Call 1300 309 361 immediately for emergency response, 3) Document damage with photos for insurance, 4) Do not enter standing water, 5) Remove valuables from affected areas if safely accessible.",
        voiceOptimised: "If your house floods: ensure safety, call 1300 309 361 immediately, document damage, avoid standing water, and remove valuables safely."
      },
      {
        question: "I have water in my house who do I call?",
        answer: "Call Disaster Recovery Brisbane immediately at 1300 309 361. We provide 24/7 emergency water damage response across Brisbane, Ipswich, and Logan with rapid triage assessment. Our team handles all types of water damage from burst pipes to flooding.",
        voiceOptimised: "Call 1300 309 361 immediately for water in your house. Disaster Recovery Brisbane provides 24/7 emergency response with priority triage."
      }
    ]
  },
  {
    category: "Service Information",
    faqs: [
      {
        question: "How much does emergency water extraction cost?",
        answer: "Emergency water extraction costs vary based on damage extent and water category. We provide free emergency assessments and work directly with insurance companies. Most residential water extraction ranges from $2,000-$8,000, with exact quotes provided on-site.",
        voiceOptimised: "Emergency water extraction costs vary by damage extent. We provide free assessments and work with insurance. Typical residential costs range from $2,000 to $8,000."
      },
      {
        question: "Who provides 24 hour disaster recovery in Brisbane?",
        answer: "Disaster Recovery Brisbane provides 24/7 disaster recovery services across Brisbane, Ipswich, and Logan. We're available 365 days a year with certified IICRC technicians and rapid emergency response for all water, fire, and storm damage situations.",
        voiceOptimised: "Disaster Recovery Brisbane provides 24/7 disaster recovery across Brisbane, Ipswich, and Logan with priority triage system."
      },
      {
        question: "What is the fastest water damage response time?",
        answer: "Disaster Recovery Brisbane provides rapid response times in Brisbane with priority triage system. Our 24/7 rapid response team begins water extraction and damage control immediately to minimise property damage.",
        voiceOptimised: "Disaster Recovery Brisbane provides rapid triage response, prioritising the most urgent water damage emergencies in Brisbane."
      },
      {
        question: "How do I stop water damage from getting worse?",
        answer: "To stop water damage from worsening: 1) Call professionals immediately at 1300 309 361, 2) Turn off water source if accessible, 3) Remove standing water if safe, 4) Move furniture and belongings to dry areas, 5) Ensure good ventilation. Professional extraction within 24 hours prevents mould growth.",
        voiceOptimised: "To stop water damage worsening: call 1300 309 361 immediately, turn off water source, remove standing water safely, move belongings, and ensure ventilation."
      }
    ]
  },
  {
    category: "Local Services",
    faqs: [
      {
        question: "Best disaster recovery company Brisbane?",
        answer: "Disaster Recovery Brisbane is the region's most trusted disaster recovery company with 15+ years experience. We're IICRC certified, provide rapid emergency response, work directly with insurance, and serve Brisbane, Ipswich, and Logan with 24/7 availability.",
        voiceOptimised: "Disaster Recovery Brisbane is the region's most trusted company with 15+ years experience, IICRC certification, and rapid emergency response."
      },
      {
        question: "Water damage restoration Ipswich emergency?",
        answer: "Yes, Disaster Recovery Brisbane provides emergency water damage restoration throughout Ipswich 24/7. We prioritise urgent cases and handle all water damage categories from clean water to sewage backups with certified technicians and professional equipment.",
        voiceOptimised: "Yes, Disaster Recovery Brisbane provides 24/7 emergency water damage restoration in Ipswich with priority triage system."
      },
      {
        question: "Fire damage repair Logan after hours?",
        answer: "Disaster Recovery Brisbane provides 24/7 fire damage repair services throughout Logan. Our after-hours emergency team provides rapid response for fire damage assessment, smoke removal, and structural repairs. Call 1300 309 361 any time day or night.",
        voiceOptimised: "Yes, Disaster Recovery Brisbane provides 24/7 fire damage repair in Logan with rapid after-hours response."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
              <svg className="w-5 h-5 text-primary-300 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-sm font-semibold">Emergency Help Available 24/7</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Emergency Disaster Recovery
              <span className="block text-primary-300">Frequently Asked Questions</span>
            </h1>

            <p className="text-xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get instant answers to emergency disaster recovery questions. When disaster strikes,
              you need immediate help. Find answers now or call our 24/7 emergency hotline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <div className="text-sm opacity-90">Emergency Hotline</div>
                  <div className="font-bold">1300 309 361</div>
                </div>
              </a>
            </div>

            <div className="mt-8 text-primary-200">
              <p className="font-semibold">Available 24/7/365 • Priority Triage Response • Brisbane, Ipswich & Logan</p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-6">
                  {category.faqs.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="overflow-hidden">
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {faq.question}
                        </h3>

                        {/* Voice-optimized answer for featured snippets */}
                        <div className="bg-primary-50 rounded-lg p-6 mb-4">
                          <div className="text-sm font-semibold text-primary-700 mb-2">Quick Answer:</div>
                          <p className="text-lg text-gray-900 font-medium leading-relaxed">
                            {faq.voiceOptimized}
                          </p>
                        </div>

                        {/* Detailed answer */}
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">Detailed Information:</div>
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>

                        {/* Emergency CTA for relevant questions */}
                        {faq.question.toLowerCase().includes('flood') ||
                         faq.question.toLowerCase().includes('water') ||
                         faq.question.toLowerCase().includes('emergency') ? (
                          <div className="mt-6 p-4 bg-emergency-50 rounded-lg border border-emergency-200">
                            <div className="flex items-center text-emergency-700">
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                              </svg>
                              <span className="font-semibold">Emergency Situation?</span>
                            </div>
                            <p className="text-emergency-600 mt-1">
                              Don't wait - call our 24/7 emergency hotline now:
                              <a href="tel:1300309361" className="font-bold ml-1 hover:underline">1300 309 361</a>
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Need Help Section */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Still Need Immediate Help?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Our emergency response team is available 24/7 to answer questions and provide immediate assistance.
              Don't wait when disaster strikes - every minute counts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Immediately</h3>
                <p className="text-gray-700">24/7 emergency hotline</p>
                <a href="tel:1300309361" className="text-primary-600 font-bold text-lg">1300 309 361</a>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1 Hour Response</h3>
                <p className="text-gray-700">Guaranteed arrival time</p>
                <p className="text-primary-600 font-bold">Brisbane, Ipswich, Logan</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">IICRC Certified</h3>
                <p className="text-gray-700">Professional technicians</p>
                <p className="text-primary-600 font-bold">Insurance approved</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emergency-600 to-emergency-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Emergency Disaster Situation?</h3>
              <p className="text-emergency-100 mb-6 max-w-2xl mx-auto">
                Water damage, fire damage, flooding, or storm damage requires immediate professional response.
                Don't risk further damage or health hazards - call our emergency team now.
              </p>
              <a
                href="tel:1300309361"
                className="bg-white text-emergency-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>CALL EMERGENCY: 1300 309 361</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}