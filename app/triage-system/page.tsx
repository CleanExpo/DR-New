import React from 'react';
import { Metadata } from 'next';
import { Phone, Shield, Clock, AlertTriangle, CheckCircle, Info, Users } from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Emergency Triage System Brisbane | Disaster Recovery Priority Assessment',
  description: 'Learn how our disaster recovery triage system prioritizes emergency response across Brisbane, Ipswich, and Logan. Critical situations get immediate 1-2 hour response.',
  keywords: 'emergency triage Brisbane, disaster recovery priority system, water damage assessment Brisbane, flood response triage, fire damage priority Queensland, 24/7 emergency assessment, Brisbane disaster triage',
  openGraph: {
    title: 'Disaster Recovery Triage System - Brisbane Emergency Response',
    description: 'Understanding our priority assessment system ensures fastest response for critical situations',
    url: 'https://disaster-recovery-seven.vercel.app/triage-system',
    type: 'article',
    images: [{
      url: '/images/triage-system.jpg',
      width: 1200,
      height: 630,
      alt: 'Brisbane Disaster Recovery Triage System'
    }]
  },
  alternates: {
    canonical: 'https://disaster-recovery-seven.vercel.app/triage-system'
  }
};

const faqs = [
  {
    question: "How does disaster recovery triage work in Brisbane?",
    answer: "Our triage system begins with a phone assessment where our Brisbane-based team evaluates your situation's urgency. We categorize emergencies into Critical (1-2 hour response), Urgent (4-6 hour response), and Standard (24-48 hour response) based on safety risks, ongoing damage, and health hazards. This ensures properties near flooding zones like Kedron Brook or homes with structural risks receive immediate attention."
  },
  {
    question: "What qualifies as a Critical Priority emergency?",
    answer: "Critical Priority is assigned when there's immediate danger to property or safety. This includes ceiling collapse risk from water saturation, active flooding threatening structural integrity (common during Brisbane River floods), electrical hazards from water infiltration, sewage overflow in living areas, or gas leaks from fire damage. These situations receive our fastest 1-2 hour response time."
  },
  {
    question: "What situations are classified as Urgent Priority?",
    answer: "Urgent Priority applies to significant ongoing damage or health concerns requiring 4-6 hour response. Examples include multiple rooms affected by water damage, visible mould growth in occupied areas (particularly dangerous in Queensland's humid climate), significant smoke damage affecting air quality, damaged flooring creating trip hazards, or water damage spreading between floors in Ipswich townhouses."
  },
  {
    question: "When is Standard Priority appropriate?",
    answer: "Standard Priority (24-48 hour response) is for contained situations where immediate danger has passed but professional attention is needed. This includes single room water damage with the leak stopped, minor smoke damage to walls, carpet water damage in non-critical areas, or preventive mould treatment. Many Logan suburban homes with minor storm damage fall into this category."
  },
  {
    question: "Why does Brisbane disaster recovery use a triage system?",
    answer: "Triage ensures our resources go where they're needed most urgently. During major events like the 2011 or 2022 Brisbane floods, hundreds of properties need help simultaneously. By prioritizing based on danger level, we prevent minor issues from becoming major disasters while immediately addressing life-threatening situations. This system has proven effective across Brisbane, Ipswich, and Logan regions."
  },
  {
    question: "How quickly will someone assess my emergency over the phone?",
    answer: "Our 24/7 phone line connects you immediately to trained assessors familiar with Brisbane's unique challenges. The initial assessment typically takes 5-10 minutes. We ask specific questions about water levels, structural damage, electrical systems, and occupant safety. Based on your answers, we assign a priority level and dispatch appropriate resources from our network across Greater Brisbane."
  },
  {
    question: "Can my priority level change after initial assessment?",
    answer: "Yes, priority levels can be upgraded if conditions worsen. For example, if water damage initially contained to one room begins spreading through ceiling spaces (common in older Queenslander homes), we immediately upgrade to higher priority. Always call back if your situation deteriorates - we monitor weather patterns and flood warnings to proactively adjust response priorities."
  },
  {
    question: "What information do I need when calling for triage assessment?",
    answer: "Have your address ready (including suburb - Brisbane, Ipswich, Logan, etc.), describe the type of damage (water, fire, mould), estimate affected area size, note any immediate safety concerns, mention if elderly or disabled residents are present, and describe when damage occurred. Photos can be texted to our assessment team for faster evaluation."
  },
  {
    question: "How does weather affect triage priorities in Brisbane?",
    answer: "During severe weather events, our triage system adapts to conditions. Properties in flood-prone areas like West End, Rocklea, or Goodna may receive preemptive priority upgrades. During storm season (October-March), we monitor BOM warnings and adjust response times accordingly. Historical flood data from 1974, 2011, and 2022 helps us predict high-risk areas."
  },
  {
    question: "Are commercial properties triaged differently than residential?",
    answer: "Commercial properties follow similar triage principles but consider business continuity factors. A flooded restaurant in Fortitude Valley might receive urgent priority due to health code requirements, while office water damage in the CBD could be standard priority if contained. We understand Brisbane's business districts and adjust response accordingly."
  },
  {
    question: "What happens after phone triage assessment?",
    answer: "Following assessment, you receive a priority designation and estimated response timeframe. Critical priorities get immediate dispatch with ETA confirmation. Our team arrives with appropriate equipment based on your phone assessment. For properties in areas like Ipswich or Logan, we coordinate with local contractors to ensure fastest possible response."
  },
  {
    question: "How does triage work during major flooding events?",
    answer: "During major floods affecting Brisbane River, Bremer River, or Logan River, we implement surge protocols. Critical priorities focus on life safety and preventing total losses. We establish staging areas in unaffected suburbs and coordinate with SES and emergency services. Our 2022 flood response helped over 500 properties using this enhanced triage system."
  },
  {
    question: "Can I request a specific response time outside the triage system?",
    answer: "While we understand urgency, our triage system ensures fairness and efficiency. We cannot bypass critical priorities for standard situations. However, we offer preventive services during quiet periods and can schedule non-emergency work. This system protects everyone - imagine if your ceiling collapse was delayed because someone jumped the queue."
  },
  {
    question: "What if I disagree with my triage priority level?",
    answer: "If you believe your priority was incorrectly assessed, request a supervisor review immediately. Provide additional information that may affect the assessment. We can conduct video assessments via smartphone for complex situations. Our goal is accurate prioritization - we'd rather re-assess than miss a critical situation in suburbs like Wynnum or Mitchelton."
  },
  {
    question: "How do you handle multiple properties from the same incident?",
    answer: "During events affecting multiple properties (apartment buildings, townhouse complexes), we assess each unit individually while coordinating response efficiently. A burst pipe in a Toowong apartment building might create different priority levels - critical for lower floors with ceiling damage, standard for upper floors with minor water intrusion."
  },
  {
    question: "Does insurance coverage affect triage priority?",
    answer: "No, triage priority is based solely on danger and damage severity, not insurance status. We assess based on safety and property preservation needs. Whether you're covered by RACQ, Suncorp, Allianz, or uninsured, you receive the same professional assessment. Insurance details are handled after emergency response."
  },
  {
    question: "How do you triage mould-related emergencies?",
    answer: "Mould triage considers exposure risk, affected area size, and vulnerable occupants. Black mould in bedrooms or living areas receives urgent priority, especially with children or elderly residents. Brisbane's humidity means mould can develop within 48 hours of water damage, so we factor growth potential into our assessment."
  }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function TriageSystemPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Shield className="h-16 w-16 text-yellow-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Emergency Triage System
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Priority-based disaster response across Brisbane, Ipswich & Logan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1300956502"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
                >
                  <Phone className="h-6 w-6" />
                  Call for Assessment: 1300 956 502
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              How Our Triage System Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-700 mb-2">Critical Priority</h3>
                <p className="text-gray-600 mb-2">1-2 Hour Response</p>
                <p className="text-sm text-gray-700">
                  Immediate danger to structure or safety. Ceiling collapse risk, active flooding, electrical hazards.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-orange-700 mb-2">Urgent Priority</h3>
                <p className="text-gray-600 mb-2">4-6 Hour Response</p>
                <p className="text-sm text-gray-700">
                  Significant ongoing damage or health risks. Multiple rooms affected, mould growth, air quality issues.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Standard Priority</h3>
                <p className="text-gray-600 mb-2">24-48 Hour Response</p>
                <p className="text-sm text-gray-700">
                  Contained damage needing professional attention. Single room affected, minor damage, preventive care.
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">The Assessment Process</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Our 24/7 Emergency Line</h4>
                    <p className="text-gray-700">Connect immediately with Brisbane-based assessment team</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">5-10 Minute Phone Assessment</h4>
                    <p className="text-gray-700">Answer specific questions about damage extent and safety concerns</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receive Priority Designation</h4>
                    <p className="text-gray-700">Get confirmed response timeframe based on severity</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Team Dispatched</h4>
                    <p className="text-gray-700">Appropriate resources deployed from nearest available team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Triage Works for Brisbane
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Fair Resource Allocation</h3>
                <p className="text-sm text-gray-700">
                  During floods affecting Rocklea, West End, and Goodna simultaneously, resources go where needed most
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <Clock className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Faster Critical Response</h3>
                <p className="text-sm text-gray-700">
                  Life-threatening situations in any suburb get immediate attention, not first-come-first-served delays
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <Shield className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Prevents Escalation</h3>
                <p className="text-sm text-gray-700">
                  Early intervention stops minor Logan water damage from becoming major structural issues
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <Info className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Clear Expectations</h3>
                <p className="text-sm text-gray-700">
                  Realistic timeframes based on actual urgency, not promises that can't be kept during disasters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions About Emergency Triage
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                    <span className="text-blue-600 shrink-0">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-6">
                    <span className="font-semibold text-green-600">A: </span>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Emergency? Get Your Priority Assessment Now
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our Brisbane team is ready 24/7 to assess your situation and dispatch appropriate help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300956502"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
              >
                <Phone className="h-6 w-6" />
                1300 956 502
              </a>
              <a
                href="/water-damage"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Water Damage Emergency
              </a>
              <a
                href="/fire-damage"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Fire Damage Emergency
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}