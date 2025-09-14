import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Water Damage Restoration Brisbane | Professional Water Extraction & Drying | 1300 309 361",
  description: "Expert water damage restoration in Brisbane, Ipswich & Logan. Fast water extraction, structural drying, mould prevention. 24/7 emergency response for all water damage categories.",
  keywords: "water damage restoration brisbane, water extraction brisbane, flood damage repair, burst pipe cleanup, water damage repair ipswich logan, emergency water damage, structural drying brisbane"
};

const waterDamageCategories = [
  {
    category: "Category 1: Clean Water",
    description: "Water from clean sources that poses no substantial risk from ingestion or contact.",
    sources: [
      "Broken water supply lines",
      "Malfunctioning appliances (dishwashers, washing machines)",
      "Overflowing bathtubs or sinks (clean water only)",
      "Melting ice or snow",
      "Rainwater (before contacting building surfaces)"
    ],
    risks: "Low risk - Generally safe for contact",
    response: "Rapid extraction and drying prevent contamination",
    timeframe: "Must be addressed within 24-48 hours before degradation",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.1L6.9 8.5c-2.3 2.8-2.3 6.9 0 9.7s6.2 2.8 8.5 0L12 2.1zm0 15.4c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    ),
    color: "bg-blue-500"
  },
  {
    category: "Category 2: Grey Water",
    description: "Water containing significant chemical, biological, or physical contamination that could cause illness.",
    sources: [
      "Discharge from dishwashers, washing machines",
      "Overflowing toilets (urine only, no feces)",
      "Sump pump failures",
      "Seepage from hydrostatic pressure",
      "Broken aquariums or water beds"
    ],
    risks: "Moderate risk - Can cause illness if ingested",
    response: "Professional extraction and disinfection required",
    timeframe: "Must be addressed within 24 hours to prevent Category 3",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.61 5.64 5.36 8.04 2.35 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    ),
    color: "bg-yellow-500"
  },
  {
    category: "Category 3: Black Water",
    description: "Grossly contaminated water containing pathogenic, toxigenic, or other harmful agents.",
    sources: [
      "Sewage backups",
      "Toilet overflows with feces",
      "Flooding from rivers, streams, storm surge",
      "Ground surface water entering buildings",
      "Standing water promoting microbial growth"
    ],
    risks: "High risk - Serious illness, infection possible",
    response: "Immediate professional remediation with PPE required",
    timeframe: "Emergency response required - immediate health hazard",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z"/>
      </svg>
    ),
    color: "bg-red-500"
  }
];

const damageClasses = [
  {
    class: "Class 1",
    description: "Slow rate of evaporation",
    characteristics: "Materials with low permeance/porosity affected",
    examples: "Concrete, plywood subfloors, VCT, ceramic tile",
    dryingTime: "3-4 days typical"
  },
  {
    class: "Class 2",
    description: "Fast rate of evaporation",
    characteristics: "Water wicked up walls 12-24 inches, cushions, carpet",
    examples: "Carpet and pad, concrete, drywall, wood floors",
    dryingTime: "3-5 days typical"
  },
  {
    class: "Class 3",
    description: "Fastest rate of evaporation",
    characteristics: "Water from overhead, saturated walls/ceilings",
    examples: "Insulation, hardwood floors, plaster, brick",
    dryingTime: "5-10+ days"
  },
  {
    class: "Class 4",
    description: "Specialty drying situations",
    characteristics: "Low permeance/porosity materials requiring special methods",
    examples: "Hardwood, concrete, stone, crawlspaces",
    dryingTime: "Extended periods"
  }
];

export default function WaterDamagePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                  <svg className="w-5 h-5 text-blue-300 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.1L6.9 8.5c-2.3 2.8-2.3 6.9 0 9.7s6.2 2.8 8.5 0L12 2.1z"/>
                  </svg>
                  <span className="text-sm font-semibold">Expert Water Damage Restoration</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Water Damage
                  <span className="block text-blue-300">Restoration Brisbane</span>
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Understanding water damage categories is crucial for proper restoration. Our certified technicians
                  assess all water damage according to industry standards and implement appropriate restoration protocols
                  to ensure your property is safe and properly restored.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="emergency"
                    size="lg"
                    onClick={() => window.location.href = 'tel:1300309361'}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Emergency: 1300 309 361
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">1 Hour</div>
                  <div className="text-blue-200">Emergency Response</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">IICRC</div>
                  <div className="text-blue-200">Certified Technicians</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-200">Available Daily</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-blue-200">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Water Damage Categories */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Understanding Water Damage Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                The IICRC (Institute of Inspection, Cleaning and Restoration Certification) classifies water damage
                into three categories based on contamination level. Proper identification is critical for safe and
                effective restoration.
              </p>
            </div>

            <div className="space-y-8">
              {waterDamageCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex items-start">
                    <div className={`${category.color} text-white rounded-lg p-4 mr-6 flex-shrink-0`}>
                      {category.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.category}</h3>
                      <p className="text-gray-700 mb-6 text-lg leading-relaxed">{category.description}</p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Common Sources:</h4>
                          <ul className="space-y-2">
                            {category.sources.map((source, sourceIndex) => (
                              <li key={sourceIndex} className="flex items-start text-gray-700">
                                <svg className="w-4 h-4 text-primary-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {source}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Health Risk Level:</h4>
                            <p className="text-gray-700">{category.risks}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Response Required:</h4>
                            <p className="text-gray-700">{category.response}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Critical Timeframe:</h4>
                            <p className="text-gray-700 font-medium">{category.timeframe}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Damage Classes */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Water Damage Classification System
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Beyond contamination categories, water damage is also classified by the rate of evaporation
                and materials affected. This determines the drying strategy and timeline for restoration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {damageClasses.map((damageClass, index) => (
                <Card key={index} hover>
                  <div className="text-center mb-4">
                    <div className="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{damageClass.class}</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description:</h4>
                      <p className="text-gray-700">{damageClass.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Characteristics:</h4>
                      <p className="text-gray-700">{damageClass.characteristics}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Typical Examples:</h4>
                      <p className="text-gray-700">{damageClass.examples}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Typical Drying Time:</span>
                        <span className="text-primary-600 font-medium">{damageClass.dryingTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Professional Water Damage Restoration Process
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We follow IICRC standards for water damage restoration, ensuring proper assessment,
                safe remediation, and complete restoration of your property.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Contact</h3>
                <p className="text-gray-600">24/7 emergency hotline with 1-hour response guarantee across Brisbane, Ipswich, and Logan.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Assessment & Classification</h3>
                <p className="text-gray-600">Thorough inspection to determine water category, damage class, and develop restoration plan.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Water Extraction</h3>
                <p className="text-gray-600">Rapid water removal using industrial-grade extraction equipment and pumps.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Structural Drying</h3>
                <p className="text-gray-600">Professional drying using dehumidifiers, air movers, and monitoring equipment.</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">5</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cleaning & Sanitizing</h3>
                <p className="text-gray-600">Antimicrobial treatment and cleaning of affected areas to prevent mould growth.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">6</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Monitoring</h3>
                <p className="text-gray-600">Daily moisture monitoring until industry drying standards are achieved.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">7</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Restoration</h3>
                <p className="text-gray-600">Complete restoration of damaged materials to pre-loss condition.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">8</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Final Inspection</h3>
                <p className="text-gray-600">Comprehensive quality inspection and customer walkthrough before completion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="section-padding bg-gradient-to-r from-emergency-600 to-emergency-700 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Water Damage Emergency? We're Here to Help
            </h2>
            <p className="text-xl text-emergency-100 mb-8 max-w-3xl mx-auto">
              Don't let water damage get worse. Our certified technicians are available 24/7 for emergency
              water extraction and restoration across Brisbane, Ipswich, and Logan.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:1300309361"
                className="bg-white text-emergency-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>Call Now: 1300 309 361</span>
              </a>

              <div className="text-emergency-200">
                <p className="font-semibold">Available 24/7/365</p>
                <p>1 Hour Emergency Response Guaranteed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}