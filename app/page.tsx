import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveChat from '@/components/chat/LiveChat';
import VoiceSearchOptimizedFAQ from '@/components/voice/VoiceSearchOptimizedFAQ';

// Homepage FAQs optimized for voice search
const homepageFAQs = [
  {
    question: "Hey Google, my house is flooding in Brisbane",
    answer: "Ring Disaster Recovery straight away on 1300 309 361. Turn off electricity at the main switch. Stop the water source if you can. Move valuables up high. We're in Wacol and can be there within an hour.",
    voiceKeywords: ["flooding", "emergency", "Brisbane", "help now"],
    schema: true
  },
  {
    question: "OK Google, emergency water damage Brisbane",
    answer: "For emergency water damage in Brisbane, ring 1300 309 361. Disaster Recovery provides 24-hour water extraction and drying. We're IICRC certified and insurance approved. Based in Wacol, we respond within 1 hour.",
    voiceKeywords: ["emergency", "water damage", "Brisbane", "24 hour"],
    schema: true
  },
  {
    question: "Alexa, find 24 hour flood restoration near me",
    answer: "Disaster Recovery provides 24-hour flood restoration across Brisbane. Ring 1300 309 361 any time. We have industrial pumps and drying equipment. Located at 4/17 Tile St, Wacol. Emergency response within 1 hour.",
    voiceKeywords: ["24 hour", "flood restoration", "near me", "Brisbane"],
    schema: true
  },
  {
    question: "Who is the best water damage company in Brisbane?",
    answer: "Disaster Recovery is Brisbane's trusted water damage company. IICRC certified since 2011. We work with all insurance companies. $20 million public liability. Ring 1300 309 361 for immediate help.",
    voiceKeywords: ["best", "water damage company", "Brisbane", "trusted"],
    schema: true
  },
  {
    question: "How much does flood restoration cost in Queensland?",
    answer: "Flood restoration costs vary by damage size. Most home insurance covers water damage. We provide free quotes and work directly with insurers. Ring 1300 309 361. Acting fast reduces costs significantly.",
    voiceKeywords: ["cost", "flood restoration", "Queensland", "insurance"],
    schema: true
  }
];

export default function HomePage() {
  // Generate Speakable schema for homepage
  const generateSpeakableSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Disaster Recovery - 24/7 Emergency Restoration Brisbane",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".voice-answer", "h1", "h2"]
      },
      "mainEntity": {
        "@type": "EmergencyService",
        "name": "Disaster Recovery",
        "telephone": "+61 1300 309 361",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4/17 Tile St",
          "addressLocality": "Wacol",
          "addressRegion": "QLD",
          "postalCode": "4076",
          "addressCountry": "AU"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };
  return (
    <>
      {generateSpeakableSchema()}
      <Header />
      <main id="main-content" role="main" aria-label="Main content">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/disaster-recovery-services.jpg"
              alt="Disaster Recovery Services Brisbane"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl voice-answer">
              Emergency Disaster Recovery Brisbane - Ring 1300 309 361
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg voice-answer">
              24-hour water damage, fire damage, and flood restoration.
              IICRC certified. Insurance approved. We can be there within 1 hour.
            </p>

            {/* Clear CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {/* Location */}
            <p className="text-gray-200">
              <span className="font-medium">Office:</span> 4/17 Tile St, Wacol, QLD 4076
            </p>
          </div>
        </section>

        {/* Core Services - Simple Grid */}
        <section className="py-16 bg-white" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto px-6">
            <h2 id="services-heading" className="text-3xl font-bold text-gray-900 text-center mb-4">
              Professional Restoration Services
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Specialized solutions for commercial facilities and high-value residential properties
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Commercial Water Damage",
                  description: "Rapid water extraction and structural drying to minimize business interruption.",
                  link: "/services/water-damage-restoration",
                  image: "/images/services/water-damage-restoration.webp"
                },
                {
                  title: "Fire & Smoke Restoration",
                  description: "Complete restoration services for commercial and high-value residential properties.",
                  link: "/services/fire-damage-restoration",
                  image: "/images/services/fire-damage-restoration.webp"
                },
                {
                  title: "Professional Mould Remediation",
                  description: "IICRC certified mould removal with air quality testing and prevention strategies.",
                  link: "/services/mould-remediation",
                  image: "/images/services/mould-remediation.webp"
                },
                {
                  title: "Storm & Flood Response",
                  description: "Priority emergency response for commercial facilities and premium residences.",
                  link: "/services/storm-damage",
                  image: "/images/hero/disaster-recovery-services.jpg"
                },
                {
                  title: "Biohazard & Trauma Cleaning",
                  description: "Discrete, professional cleaning services meeting all regulatory requirements.",
                  link: "/services/biohazard-cleaning",
                  image: "/images/services/crime-scene-remediation.webp"
                },
                {
                  title: "Business Continuity Solutions",
                  description: "Comprehensive restoration services designed to minimize operational downtime.",
                  link: "/services",
                  image: "/images/services/commercial-residential.png"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Service Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {service.description}
                    </p>
                    <Link
                      href={service.link}
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group"
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial & Premium Residential Focus */}
        <section className="py-16 bg-blue-50" aria-labelledby="commercial-heading">
          <div className="max-w-6xl mx-auto px-6">
            <h2 id="commercial-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
              Trusted by Brisbane's Business Leaders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Commercial & Industrial
                </h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Office Buildings & Corporate Facilities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Retail & Hospitality Venues
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Manufacturing & Warehousing
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Minimized Business Interruption
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Priority response for commercial clients to ensure business continuity
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Premium Residential
                </h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Luxury Homes & Estates
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Heritage & Architecturally Significant Properties
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    High-Value Contents Restoration
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Discrete & Professional Service
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Specialized care for Brisbane's most prestigious properties
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Certifications */}
        <section className="py-16 bg-gray-50" aria-labelledby="certifications-heading">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="certifications-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
              Certifications & Insurance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Industry Certifications
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    IICRC Certified Technicians
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Master Restorer Qualification
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Insurance Partners
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    $20 Million Public Liability
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Works with all major insurers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white" aria-labelledby="service-areas-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="service-areas-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Service Areas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Servicing premium residential areas and commercial districts across Greater Brisbane.
              24/7 emergency response for business continuity and property protection.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { name: 'Brisbane CBD', type: 'Commercial Hub' },
                { name: 'New Farm', type: 'Premium Residential' },
                { name: 'Ascot', type: 'Premium Residential' },
                { name: 'Hamilton', type: 'Premium Residential' },
                { name: 'Toowong', type: 'Premium Residential' },
                { name: 'Ipswich CBD', type: 'Commercial' },
                { name: 'Logan Central', type: 'Commercial' },
                { name: 'Industrial Areas', type: 'Commercial' }
              ].map((area) => (
                <div key={area.name} className="bg-gray-50 rounded-lg py-3 px-4">
                  <div className="text-gray-900 font-medium">{area.name}</div>
                  <div className="text-xs text-gray-500">{area.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Contact Section */}
        <section className="py-16 bg-blue-600 text-white" aria-labelledby="contact-section-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="contact-section-heading" className="text-3xl font-bold mb-4">
              Emergency? Call Now!
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Water damage? Fire damage? We answer day and night.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors border-2 border-blue-700"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Equipment Gallery */}
        <section className="py-16 bg-white" aria-labelledby="equipment-heading">
          <div className="max-w-6xl mx-auto px-6">
            <h2 id="equipment-heading" className="text-3xl font-bold text-gray-900 text-center mb-4">
              Professional Equipment
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We use industry-leading equipment to ensure fast, effective restoration
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Industrial Dehumidifiers",
                  image: "/images/optimized/equipment/3D LGR Dehumidifier.png",
                  description: "Powerful moisture extraction"
                },
                {
                  title: "Air Movers",
                  image: "/images/optimized/equipment/3D Air Mover.png",
                  description: "Rapid structural drying"
                },
                {
                  title: "HEPA Filters",
                  image: "/images/optimized/equipment/3D Hepa Filters.png",
                  description: "Clean air restoration"
                },
                {
                  title: "Thermal Foggers",
                  image: "/images/optimized/equipment/3D Thermal Fogging.png",
                  description: "Odour elimination"
                }
              ].map((equipment, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="relative h-32 w-full mb-3">
                    <Image
                      src={equipment.image}
                      alt={equipment.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {equipment.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {equipment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice Search Optimized FAQ Section */}
        <VoiceSearchOptimizedFAQ
          title="Emergency Questions - Brisbane Residents"
          faqs={homepageFAQs}
          emergencyContext={true}
        />

        {/* Company Info */}
        <section className="py-16 bg-gray-50" aria-labelledby="company-info-heading">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="company-info-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
              About Disaster Recovery
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/heroes/vehicles-fleet.jpg"
                  alt="Disaster Recovery Fleet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Phill and Bronwyn McGurk started our company in 2011. We have fixed thousands of homes.
                  We know how to clean water damage. We know how to remove fire damage.
                </p>
                <p>
                  Our team trains hard. We hold IICRC certificates. Insurance companies trust us.
                  We work from Wacol. We answer emergency calls every day.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="text-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Live Chat */}
      <LiveChat />

      <Footer />
    </>
  );
}