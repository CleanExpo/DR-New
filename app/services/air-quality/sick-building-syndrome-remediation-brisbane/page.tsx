import type { Metadata } from 'next'
import { Clock, Shield, Award, Users, AlertTriangle, CheckCircle, Phone, Star, MapPin, Thermometer, Eye, Droplets, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sick Building Syndrome Remediation Brisbane | Expert Indoor Air Quality Solutions',
  description: 'Professional sick building syndrome remediation in Brisbane. NATA accredited testing, HVAC cleaning, and complete workplace air quality restoration. 24/7 emergency response available.',
  keywords: 'sick building syndrome Brisbane, SBS remediation, indoor air quality testing, workplace air quality, building health assessment, HVAC contamination cleaning, office air quality, commercial building restoration',
  openGraph: {
    title: 'Sick Building Syndrome Remediation Brisbane | Expert Solutions',
    description: 'Professional sick building syndrome remediation with NATA accredited testing and complete air quality restoration. Emergency response available 24/7.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/air-quality/sick-building-syndrome-remediation-brisbane'
  }
}

export default function SickBuildingSyndromeRemediationBrisbane() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-centre">
            <div>
              <div className="flex items-centre gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Emergency Response Available</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sick Building Syndrome
                <span className="text-blue-300"> Remediation Brisbane</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Professional sick building syndrome remediation with NATA accredited testing and comprehensive air quality restoration. Protect your workforce and improve productivity with expert indoor environmental solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0413965292"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-centre justify-centre gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Call 0413 965 292
                </a>
                <a
                  href="#assessment"
                  className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Free Assessment
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="h-8 w-8 text-blue-300 mb-3" />
                <h3 className="font-semibold mb-2">24/7 Response</h3>
                <p className="text-blue-100 text-sm">Emergency sick building syndrome assessment and immediate remediation response</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Shield className="h-8 w-8 text-blue-300 mb-3" />
                <h3 className="font-semibold mb-2">NATA Accredited</h3>
                <p className="text-blue-100 text-sm">Certified testing protocols and scientifically proven remediation methods</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="h-8 w-8 text-blue-300 mb-3" />
                <h3 className="font-semibold mb-2">Master Restorer</h3>
                <p className="text-blue-100 text-sm">Phill McGurk - One of only a limited number of Master Restorers in Queensland</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 text-blue-300 mb-3" />
                <h3 className="font-semibold mb-2">Workplace Focus</h3>
                <p className="text-blue-100 text-sm">specialised in commercial buildings and workplace health improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding SBS Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Understanding Sick Building Syndrome
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sick Building Syndrome (SBS) affects building occupants with symptoms that improve when they leave the building. Professional remediation can restore healthy indoor environments and improve workplace productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-centre">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common SBS Symptoms</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Eye className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Eye & Respiratory Issues</h4>
                    <p className="text-gray-600">Eye irritation, dry throat, blocked nose, cough, and breathing difficulties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Thermometer className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Physical Discomfort</h4>
                    <p className="text-gray-600">Headaches, fatigue, dizziness, and difficulty concentrating</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Skin Irritation</h4>
                    <p className="text-gray-600">Dry, itchy skin and skin rashes that improve away from the building</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Primary Causes</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <ul className="space-y-3">
                  <li className="flex items-centre gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Poor ventilation and air circulation</span>
                  </li>
                  <li className="flex items-centre gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>HVAC system contamination</span>
                  </li>
                  <li className="flex items-centre gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Chemical pollutants and VOCs</span>
                  </li>
                  <li className="flex items-centre gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Biological contaminants (mould, bacteria)</span>
                  </li>
                  <li className="flex items-centre gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Inadequate fresh air supply</span>
                  </li>
                  <li className="flex items-centre gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Poor humidity control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our SBS Remediation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive assessment and remediation following NATA accredited protocols to restore healthy indoor environments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Assessment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Indoor air quality testing</li>
                <li>• HVAC system inspection</li>
                <li>• Building envelope analysis</li>
                <li>• Occupant health surveys</li>
                <li>• Moisture and humidity mapping</li>
                <li>• VOC and chemical testing</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Source Identification</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Contamination source mapping</li>
                <li>• Ventilation deficiency analysis</li>
                <li>• Biological contamination testing</li>
                <li>• Chemical pollutant identification</li>
                <li>• Building material assessment</li>
                <li>• HVAC contamination evaluation</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Remediation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HVAC system decontamination</li>
                <li>• Air filtration enhancement</li>
                <li>• Mould and bacteria removal</li>
                <li>• VOC source elimination</li>
                <li>• Ventilation optimisation</li>
                <li>• Post-remediation verification</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              specialised SBS Remediation Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for all types of commercial buildings and workplace environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Wind className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">HVAC Decontamination</h3>
              <p className="text-gray-600 mb-4">Complete cleaning and sanitization of heating, ventilation, and air conditioning systems.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ductwork cleaning and sanitization</li>
                <li>• Filter replacement and upgrading</li>
                <li>• Coil cleaning and treatment</li>
                <li>• Air handler decontamination</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Droplets className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mould Remediation</h3>
              <p className="text-gray-600 mb-4">Professional mould removal and prevention following IICRC S520 standards.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hidden mould detection</li>
                <li>• Safe mould removal</li>
                <li>• Source moisture elimination</li>
                <li>• Anti-microbial treatment</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Thermometer className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chemical Remediation</h3>
              <p className="text-gray-600 mb-4">VOC removal and chemical pollutant elimination for healthier indoor air.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• VOC source identification</li>
                <li>• Chemical pollutant removal</li>
                <li>• Formaldehyde treatment</li>
                <li>• Building material assessment</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Eye className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Air Quality Testing</h3>
              <p className="text-gray-600 mb-4">NATA accredited testing to identify all indoor air quality issues.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Comprehensive air sampling</li>
                <li>• Particle count analysis</li>
                <li>• Chemical testing</li>
                <li>• Biological contamination testing</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Shield className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Preventive Solutions</h3>
              <p className="text-gray-600 mb-4">Long-term strategies to prevent sick building syndrome recurrence.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ventilation optimisation</li>
                <li>• Humidity control systems</li>
                <li>• Air filtration upgrades</li>
                <li>• Maintenance protocols</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Users className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Workplace Consulting</h3>
              <p className="text-gray-600 mb-4">Expert consultation to improve workplace health and productivity.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Health impact assessment</li>
                <li>• Productivity correlation analysis</li>
                <li>• Workplace wellness strategies</li>
                <li>• Staff health monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Buildings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Buildings We specialise In
            </h2>
            <p className="text-xl text-gray-600">
              Expert sick building syndrome remediation for all commercial and institutional facilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Office Buildings</h3>
              <p className="text-gray-600 text-sm">High-rise offices, corporate headquarters, co-working spaces</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Healthcare Facilities</h3>
              <p className="text-gray-600 text-sm">Hospitals, clinics, aged care facilities, medical centres</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Educational Buildings</h3>
              <p className="text-gray-600 text-sm">Schools, universities, training facilities, libraries</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Government Buildings</h3>
              <p className="text-gray-600 text-sm">Municipal offices, courthouses, public facilities</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Retail Spaces</h3>
              <p className="text-gray-600 text-sm">Shopping centres, department stores, specialty retail</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Hospitality Venues</h3>
              <p className="text-gray-600 text-sm">Hotels, restaurants, conference centres, entertainment</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Industrial Facilities</h3>
              <p className="text-gray-600 text-sm">Manufacturing plants, warehouses, processing facilities</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <h3 className="font-bold text-gray-900 mb-2">Mixed-Use Buildings</h3>
              <p className="text-gray-600 text-sm">Commercial-residential, shopping complexes, business parks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our SBS Remediation Services
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading expertise and proven results in sick building syndrome remediation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Award className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Master Restorer Expertise</h3>
              <p className="text-gray-600">
                Phill McGurk is one of only a limited number of Master Restorers in Queensland, bringing unmatched expertise to sick building syndrome remediation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">NATA Accredited Testing</h3>
              <p className="text-gray-600">
                All our testing follows NATA accredited protocols, ensuring accurate identification of indoor air quality issues and contamination sources.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Clock className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Emergency Response</h3>
              <p className="text-gray-600">
                Emergency sick building syndrome assessment and immediate remediation response to protect building occupants' health and safety.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Users className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Workplace Productivity Focus</h3>
              <p className="text-gray-600">
                specialised understanding of how indoor air quality affects workplace productivity, absenteeism, and employee well-being.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <CheckCircle className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Solutions</h3>
              <p className="text-gray-600">
                Complete remediation covering all aspects of sick building syndrome from HVAC decontamination to long-term prevention strategies.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Star className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Track record of successfully resolving sick building syndrome cases and improving indoor environments for building occupants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="service-areas" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SBS Remediation Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              Professional sick building syndrome remediation throughout Brisbane and surrounding regions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <MapPin className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Brisbane CBD</h3>
              <p className="text-gray-600 mb-4">High-rise office buildings, government facilities, and commercial complexes.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Central Business District</li>
                <li>• Fortitude Valley</li>
                <li>• South Brisbane</li>
                <li>• Spring Hill</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <MapPin className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Greater Brisbane</h3>
              <p className="text-gray-600 mb-4">Suburban office parks, retail centres, and mixed-use developments.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chermside • Indooroopilly</li>
                <li>• Carindale • Garden City</li>
                <li>• Toombul • Westfield</li>
                <li>• All suburban areas</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <MapPin className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ipswich & Logan</h3>
              <p className="text-gray-600 mb-4">Industrial facilities, educational institutions, and healthcare centres.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ipswich CBD</li>
                <li>• Logan Central</li>
                <li>• Industrial estates</li>
                <li>• Educational facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Free Assessment CTA */}
      <section id="assessment" className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-centre">
          <h2 className="text-3xl font-bold mb-4">
            Free Sick Building Syndrome Assessment
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Professional evaluation of your building's indoor air quality and identification of sick building syndrome causes. No obligation assessment with detailed reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-centre">
            <a
              href="tel:0413965292"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-centre justify-centre gap-2"
            >
              <Phone className="h-5 w-5" />
              Emergency: 0413 965 292
            </a>
            <a
              href="mailto:info@dr-new-ten.vercel.app"
              className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Request Assessment
            </a>
          </div>
          <p className="text-blue-200 mt-4 text-sm">
            24/7 emergency response • NATA accredited testing • Master Restorer certified
          </p>
        </div>
      </section>
    </div>
  )
}