import type { Metadata } from 'next'
import { Clock, Shield, Award, Wind, AlertTriangle, CheckCircle, Phone, Star, MapPin, Thermometer, Droplets, Filter, Wrench, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Contamination Cleaning Brisbane | Professional Air System Decontamination',
  description: 'Expert HVAC contamination cleaning in Brisbane. NATA accredited testing, complete air system decontamination, and preventive maintenance. 24/7 emergency response for contaminated air systems.',
  keywords: 'HVAC contamination cleaning Brisbane, air conditioning cleaning, ductwork decontamination, HVAC system cleaning, air system restoration, commercial HVAC cleaning, mould removal HVAC, bacteria cleaning air conditioning',
  openGraph: {
    title: 'HVAC Contamination Cleaning Brisbane | Professional Air System Decontamination',
    description: 'Expert HVAC contamination cleaning with NATA accredited testing and complete air system decontamination. Emergency response available 24/7.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/air-quality/hvac-contamination-cleaning-brisbane'
  }
}

export default function HVACContaminationCleaningBrisbane() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Emergency Contamination Response</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                HVAC Contamination
                <span className="text-green-300"> Cleaning Brisbane</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Professional HVAC contamination cleaning and air system decontamination with NATA accredited testing. Restore clean, healthy air circulation to your building with expert contamination removal services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0413965292"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Call 0413 965 292
                </a>
                <a
                  href="#inspection"
                  className="bg-white hover:bg-gray-100 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Free HVAC Inspection
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="h-8 w-8 text-green-300 mb-3" />
                <h3 className="font-semibold mb-2">24/7 Response</h3>
                <p className="text-green-100 text-sm">Emergency HVAC contamination assessment and immediate cleaning response</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Shield className="h-8 w-8 text-green-300 mb-3" />
                <h3 className="font-semibold mb-2">NATA Accredited</h3>
                <p className="text-green-100 text-sm">Certified contamination testing and scientifically proven cleaning methods</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="h-8 w-8 text-green-300 mb-3" />
                <h3 className="font-semibold mb-2">Master Restorer</h3>
                <p className="text-green-100 text-sm">Phill McGurk - One of only a limited number of Master Restorers in Queensland</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Wind className="h-8 w-8 text-green-300 mb-3" />
                <h3 className="font-semibold mb-2">Complete Systems</h3>
                <p className="text-green-100 text-sm">Full HVAC system decontamination including ducts, coils, and air handlers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HVAC Contamination Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              HVAC Contamination We Clean
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional removal of all types of HVAC system contamination that can compromise indoor air quality and building occupant health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Droplets className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mould Contamination</h3>
              <p className="text-gray-600 mb-4">Comprehensive mould removal from all HVAC components including hidden growth areas.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Aspergillus species removal</li>
                <li>• Penicillium contamination</li>
                <li>• Stachybotrys (black mould)</li>
                <li>• Cladosporium cleaning</li>
                <li>• Alternaria decontamination</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Eye className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bacterial Growth</h3>
              <p className="text-gray-600 mb-4">Professional bacterial decontamination and sanitization of HVAC systems.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Legionella prevention</li>
                <li>• Pseudomonas removal</li>
                <li>• Staphylococcus cleaning</li>
                <li>• Streptococcus decontamination</li>
                <li>• E. coli elimination</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Filter className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dust & Debris</h3>
              <p className="text-gray-600 mb-4">Complete removal of accumulated dust, debris, and particulate contamination.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Construction dust removal</li>
                <li>• Fiberglass particle cleaning</li>
                <li>• Metal shaving extraction</li>
                <li>• Fabric fiber removal</li>
                <li>• General debris clearing</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Thermometer className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chemical Residues</h3>
              <p className="text-gray-600 mb-4">Safe removal of chemical contamination and volatile organic compounds.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pesticide residue removal</li>
                <li>• Paint fume contamination</li>
                <li>• Cleaning chemical buildup</li>
                <li>• VOC source elimination</li>
                <li>• Industrial chemical cleaning</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Wind className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smoke & Odors</h3>
              <p className="text-gray-600 mb-4">Professional smoke damage restoration and odor elimination from HVAC systems.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fire smoke removal</li>
                <li>• Cigarette smoke cleaning</li>
                <li>• Cooking odor elimination</li>
                <li>• Chemical odor removal</li>
                <li>• Pet odor decontamination</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Wrench className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">System Corrosion</h3>
              <p className="text-gray-600 mb-4">Treatment and prevention of HVAC system corrosion and metal contamination.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rust removal and treatment</li>
                <li>• Corrosion prevention coating</li>
                <li>• Metal particle cleaning</li>
                <li>• Scale buildup removal</li>
                <li>• Component restoration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our HVAC Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive HVAC contamination cleaning following NATA accredited protocols and industry best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">System Assessment</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Complete HVAC inspection</li>
                <li>• Contamination identification</li>
                <li>• Air quality testing</li>
                <li>• System component evaluation</li>
                <li>• Contamination mapping</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
              <div className="bg-green-100 rounded-lg p-3 w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Containment Setup</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Negative pressure containment</li>
                <li>• HEPA filtration systems</li>
                <li>• Cross-contamination prevention</li>
                <li>• Worker protection protocols</li>
                <li>• Building occupant safety</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deep Cleaning</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Ductwork decontamination</li>
                <li>• Coil cleaning and sanitization</li>
                <li>• Air handler restoration</li>
                <li>• Filter replacement</li>
                <li>• Component disinfection</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
              <div className="bg-orange-100 rounded-lg p-3 w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verification</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Post-cleaning air testing</li>
                <li>• System performance check</li>
                <li>• Contamination clearance</li>
                <li>• Quality assurance</li>
                <li>• Certification documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HVAC Components We Clean */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              HVAC Components We Clean
            </h2>
            <p className="text-xl text-gray-600">
              Complete cleaning and decontamination of all HVAC system components
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Main System Components</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Wind className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Air Handling Units (AHU)</h4>
                    <p className="text-gray-600">Complete cleaning of air handlers, fans, and housing components</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Filter className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ductwork Systems</h4>
                    <p className="text-gray-600">Supply ducts, return ducts, and exhaust ductwork decontamination</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Thermometer className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Heating & Cooling Coils</h4>
                    <p className="text-gray-600">Evaporator coils, condenser coils, and heat exchanger cleaning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Drain Pans & Lines</h4>
                    <p className="text-gray-600">Condensate drain cleaning and sanitization to prevent microbial growth</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Distribution Components</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Supply air vents and grilles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Return air vents and registers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Diffusers and air outlets</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Variable air volume (VAV) boxes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Fan coil units</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Terminal units and dampers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Mixing boxes and plenum chambers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Fresh air intake systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Technology Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional HVAC Cleaning Equipment
            </h2>
            <p className="text-xl text-gray-600">
              State-of-the-art equipment and proven cleaning technologies for complete HVAC decontamination
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Negative Pressure Systems</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HEPA-filtered air scrubbers</li>
                <li>• Portable negative air machines</li>
                <li>• Containment barrier systems</li>
                <li>• Dust and particle control</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specialized Cleaning Tools</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Pneumatic duct cleaning systems</li>
                <li>• Rotating brush technology</li>
                <li>• High-pressure washing equipment</li>
                <li>• Vacuum collection systems</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Disinfection Technology</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Hospital-grade disinfectants</li>
                <li>• UV-C sanitization systems</li>
                <li>• Fogger application equipment</li>
                <li>• Anti-microbial treatments</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Inspection Equipment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Remote visual inspection cameras</li>
                <li>• Duct inspection robots</li>
                <li>• Moisture detection meters</li>
                <li>• Air quality monitoring devices</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Testing & Verification</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Air sampling equipment</li>
                <li>• Particle counters</li>
                <li>• Surface testing kits</li>
                <li>• Airflow measurement tools</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety Equipment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Personal protective equipment</li>
                <li>• Respiratory protection systems</li>
                <li>• Containment materials</li>
                <li>• Emergency response equipment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits of Professional HVAC Cleaning
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive HVAC contamination cleaning delivers immediate and long-term benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Wind className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Improved Air Quality</h3>
              <p className="text-gray-600">
                Removal of contaminants results in cleaner, healthier indoor air for building occupants and improved respiratory health.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Star className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Energy Efficiency</h3>
              <p className="text-gray-600">
                Clean HVAC systems operate more efficiently, reducing energy consumption and lowering utility costs.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Shield className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health Protection</h3>
              <p className="text-gray-600">
                Prevents the spread of airborne contaminants and reduces the risk of respiratory illnesses and allergic reactions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Wrench className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equipment Longevity</h3>
              <p className="text-gray-600">
                Regular contamination cleaning extends HVAC equipment life and reduces the need for costly repairs and replacements.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <CheckCircle className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance Assurance</h3>
              <p className="text-gray-600">
                Meets workplace health and safety requirements and building code compliance for commercial facilities.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Eye className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Odor Elimination</h3>
              <p className="text-gray-600">
                Removes odor-causing contaminants and provides fresh, clean-smelling air throughout the building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="service-areas" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              HVAC Cleaning Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              Professional HVAC contamination cleaning throughout Brisbane and surrounding regions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <MapPin className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Brisbane CBD</h3>
              <p className="text-gray-600 mb-4">High-rise office buildings, commercial towers, and mixed-use developments.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Central Business District</li>
                <li>• Fortitude Valley</li>
                <li>• South Brisbane</li>
                <li>• Spring Hill</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <MapPin className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Greater Brisbane</h3>
              <p className="text-gray-600 mb-4">Suburban commercial complexes, retail centers, and industrial facilities.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All suburban business districts</li>
                <li>• Shopping centers</li>
                <li>• Industrial estates</li>
                <li>• Healthcare facilities</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <MapPin className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ipswich & Logan</h3>
              <p className="text-gray-600 mb-4">Manufacturing facilities, warehouses, and commercial buildings.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ipswich CBD</li>
                <li>• Logan Central</li>
                <li>• Manufacturing plants</li>
                <li>• Distribution centers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Free Inspection CTA */}
      <section id="inspection" className="py-16 bg-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Free HVAC Contamination Inspection
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Professional assessment of your HVAC system contamination with detailed reporting and cleaning recommendations. No obligation inspection with immediate response available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0413965292"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Emergency: 0413 965 292
            </a>
            <a
              href="mailto:info@disasterrecovery.com.au"
              className="bg-white hover:bg-gray-100 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Request Inspection
            </a>
          </div>
          <p className="text-green-200 mt-4 text-sm">
            24/7 emergency response • NATA accredited testing • Master Restorer certified
          </p>
        </div>
      </section>
    </div>
  )
}