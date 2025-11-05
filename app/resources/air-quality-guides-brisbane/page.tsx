import type { Metadata } from 'next'
import { Download, FileText, Clock, Shield, Award, CheckCircle, Phone, Star, User, Building, Home, Factory } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Air Quality Guides Brisbane | Professional Indoor Air Quality Resources',
  description: 'Download free air quality improvement guides for Brisbane properties. Expert advice on VOC removal, mould prevention, HVAC maintenance, and sick building syndrome solutions.',
  keywords: 'air quality guide Brisbane, indoor air quality PDF, VOC removal guide, mould prevention guide, HVAC maintenance guide, sick building syndrome guide, air quality improvement Brisbane',
  openGraph: {
    title: 'Free Air Quality Guides Brisbane | Professional Resources',
    description: 'Download expert air quality improvement guides covering VOC removal, mould prevention, HVAC maintenance, and indoor air quality solutions.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/resources/air-quality-guides-brisbane'
  }
}

export default function AirQualityGuidesBrisbane() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-centre">
            <div>
              <div className="flex items-centre gap-2 mb-4">
                <FileText className="h-6 w-6 text-teal-300" />
                <span className="text-teal-300 font-semibold">Professional Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Free Air Quality
                <span className="text-teal-300"> Guides Brisbane</span>
              </h1>
              <p className="text-xl mb-8 text-teal-100">
                Download comprehensive air quality improvement guides written by Phill McGurk, Master Restorer. Professional advice on VOC removal, mould prevention, HVAC maintenance, and indoor air quality solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#guides"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-centre justify-centre gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Guides
                </a>
                <a
                  href="tel:0413965292"
                  className="bg-white hover:bg-gray-100 text-teal-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-centre justify-centre gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Expert Consultation
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Download className="h-8 w-8 text-teal-300 mb-3" />
                <h3 className="font-semibold mb-2">Instant Download</h3>
                <p className="text-teal-100 text-sm">Immediate access to professional air quality improvement guides</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Shield className="h-8 w-8 text-teal-300 mb-3" />
                <h3 className="font-semibold mb-2">Expert Authored</h3>
                <p className="text-teal-100 text-sm">Written by certified Master Restorer with proven expertise</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="h-8 w-8 text-teal-300 mb-3" />
                <h3 className="font-semibold mb-2">Industry Standards</h3>
                <p className="text-teal-100 text-sm">Based on NATA accredited protocols and IICRC standards</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <FileText className="h-8 w-8 text-teal-300 mb-3" />
                <h3 className="font-semibold mb-2">Comprehensive</h3>
                <p className="text-teal-100 text-sm">Complete coverage of all indoor air quality topics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Guides Section */}
      <section id="guides" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Air Quality Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides covering all aspects of indoor air quality improvement, written by industry experts and based on proven methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* VOC Removal Guide */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-centre gap-3 mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">VOC Removal Guide</h3>
                  <p className="text-gray-600 text-sm">24 pages • PDF format</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Complete guide to identifying and removing volatile organic compounds from residential and commercial properties.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>VOC identification techniques</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Testing protocols and equipment</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Removal strategies and prevention</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Health impact assessment</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2">
                <Download className="h-5 w-5" />
                Download Guide
              </button>
            </div>

            {/* Mould Prevention Guide */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-centre gap-3 mb-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Mould Prevention Guide</h3>
                  <p className="text-gray-600 text-sm">32 pages • PDF format</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive mould prevention strategies for all property types, including detection, removal, and long-term prevention.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Moisture control strategies</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Early detection methods</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Safe removal procedures</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Prevention maintenance plans</span>
                </li>
              </ul>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2">
                <Download className="h-5 w-5" />
                Download Guide
              </button>
            </div>

            {/* HVAC Maintenance Guide */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-centre gap-3 mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">HVAC Maintenance Guide</h3>
                  <p className="text-gray-600 text-sm">28 pages • PDF format</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Professional HVAC system maintenance protocols to ensure clean air circulation and prevent contamination.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Cleaning schedules and procedures</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Filter selection and replacement</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Ductwork inspection methods</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Energy efficiency optimisation</span>
                </li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2">
                <Download className="h-5 w-5" />
                Download Guide
              </button>
            </div>

            {/* Sick Building Syndrome Guide */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-centre gap-3 mb-4">
                <div className="bg-red-100 rounded-lg p-3">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Sick Building Syndrome Guide</h3>
                  <p className="text-gray-600 text-sm">20 pages • PDF format</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Complete workplace health guide covering sick building syndrome identification, remediation, and prevention strategies.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Symptom identification checklist</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Source investigation methods</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Remediation action plans</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Workplace wellness strategies</span>
                </li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2">
                <Download className="h-5 w-5" />
                Download Guide
              </button>
            </div>

            {/* Work-from-Home Air Quality Guide */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 w-fit">
                POPULAR
              </div>
              <div className="flex items-centre gap-3 mb-4">
                <div className="bg-orange-100 rounded-lg p-3">
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Work-from-Home Air Quality</h3>
                  <p className="text-gray-600 text-sm">16 pages • PDF format</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Essential guide for optimising home office air quality to improve productivity and health for remote workers.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Home office air quality assessment</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Productivity improvement strategies</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Indoor plant recommendations</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Ventilation optimisation tips</span>
                </li>
              </ul>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2">
                <Download className="h-5 w-5" />
                Download Guide
              </button>
            </div>

            {/* Complete Air Quality Handbook */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-teal-200">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 w-fit">
                COMPLETE COLLECTION
              </div>
              <div className="flex items-centre gap-3 mb-4">
                <div className="bg-teal-100 rounded-lg p-3">
                  <FileText className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Complete Air Quality Handbook</h3>
                  <p className="text-gray-600 text-sm">120+ pages • PDF format</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive handbook containing all guides plus additional professional resources and case studies.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>All individual guides included</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Bonus case studies and examples</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Professional testing protocols</span>
                </li>
                <li className="flex items-centre gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Industry standards reference</span>
                </li>
              </ul>
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-centre justify-centre gap-2">
                <Download className="h-5 w-5" />
                Download Complete Handbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Type Guides Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Property-Specific Air Quality Guides
            </h2>
            <p className="text-xl text-gray-600">
              specialised guides tailored to different property types and their unique air quality challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Residential Properties</h3>
              <p className="text-gray-600 text-sm mb-4">Single homes, apartments, townhouses, and residential complexes</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>• Home air quality testing</li>
                <li>• Family health protection</li>
                <li>• Bedroom and nursery safety</li>
                <li>• Kitchen and bathroom solutions</li>
              </ul>
              <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">Download Guide</button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <Building className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Commercial Buildings</h3>
              <p className="text-gray-600 text-sm mb-4">Offices, retail spaces, and mixed-use developments</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>• Workplace air quality management</li>
                <li>• Employee health and productivity</li>
                <li>• High-rise building challenges</li>
                <li>• Compliance requirements</li>
              </ul>
              <button className="text-green-600 font-semibold text-sm hover:text-green-700">Download Guide</button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Healthcare Facilities</h3>
              <p className="text-gray-600 text-sm mb-4">Hospitals, clinics, aged care, and medical centres</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>• Infection control protocols</li>
                <li>• Patient safety measures</li>
                <li>• specialised filtration systems</li>
                <li>• Regulatory compliance</li>
              </ul>
              <button className="text-purple-600 font-semibold text-sm hover:text-purple-700">Download Guide</button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-centre">
              <Factory className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Industrial Facilities</h3>
              <p className="text-gray-600 text-sm mb-4">Manufacturing, warehouses, and processing plants</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>• Industrial air quality monitoring</li>
                <li>• Worker safety protocols</li>
                <li>• Chemical contamination control</li>
                <li>• Production environment optimisation</li>
              </ul>
              <button className="text-orange-600 font-semibold text-sm hover:text-orange-700">Download Guide</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Download Our Guides Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Air Quality Guides
            </h2>
            <p className="text-xl text-gray-600">
              Professional expertise backed by industry certifications and proven results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Award className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Master Restorer Authored</h3>
              <p className="text-gray-600">
                Written by Phill McGurk, one of only a limited number of Master Restorers in Queensland, ensuring expert-level accuracy and practical advice.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Standards Based</h3>
              <p className="text-gray-600">
                All recommendations follow NATA accredited protocols, IICRC standards, and current industry best practices for air quality management.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Clock className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Methods and strategies tested in real-world scenarios across Brisbane's diverse property types and environmental conditions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <FileText className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                Complete coverage of all indoor air quality topics from basic prevention to advanced remediation techniques and professional protocols.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <CheckCircle className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Practical Implementation</h3>
              <p className="text-gray-600">
                Step-by-step instructions, checklists, and actionable advice that can be immediately implemented to improve air quality.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Star className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regular Updates</h3>
              <p className="text-gray-600">
                Guides are regularly updated to reflect the latest industry developments, technology advances, and regulatory changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centre mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Download Your Guides
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to access professional air quality resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-centre">
              <div className="bg-teal-100 rounded-full p-6 w-fit mx-auto mb-4">
                <span className="text-3xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Select Your Guides</h3>
              <p className="text-gray-600">
                Choose from individual guides or download the complete handbook for comprehensive coverage.
              </p>
            </div>

            <div className="text-centre">
              <div className="bg-teal-100 rounded-full p-6 w-fit mx-auto mb-4">
                <span className="text-3xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Provide Contact Details</h3>
              <p className="text-gray-600">
                Simple form with your name and email address to receive your professional air quality guides.
              </p>
            </div>

            <div className="text-centre">
              <div className="bg-teal-100 rounded-full p-6 w-fit mx-auto mb-4">
                <span className="text-3xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Access</h3>
              <p className="text-gray-600">
                Immediate download links and email delivery of your selected guides in PDF format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Consultation CTA */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-centre">
          <h2 className="text-3xl font-bold mb-4">
            Need Expert Air Quality Consultation?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            After downloading our guides, get personalized advice from Phill McGurk, Master Restorer. Professional consultation available for complex air quality challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-centre">
            <a
              href="tel:0413965292"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-centre justify-centre gap-2"
            >
              <Phone className="h-5 w-5" />
              Call 0413 965 292
            </a>
            <a
              href="mailto:info@dr-new-ten.vercel.app"
              className="bg-white hover:bg-gray-100 text-teal-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Request Consultation
            </a>
          </div>
          <p className="text-teal-200 mt-4 text-sm">
            Free guides • Expert consultation • Master Restorer certified
          </p>
        </div>
      </section>
    </div>
  )
}