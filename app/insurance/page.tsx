import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, CheckCircle, FileText, Shield, Clock, AlertCircle } from 'lucide-react'
import { Footer } from '@/components/footer'
import { insuranceCompanies, getInsuranceByType } from '@/lib/insurance-data'
import Link from 'next/link'

export default function InsurancePage() {
  const residentialInsurers = getInsuranceByType('residential')
  const commercialInsurers = getInsuranceByType('commercial')

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              Approved Restoration Provider
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Insurance Claims Assistance
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Expert help navigating disaster recovery insurance claims with all major Australian insurers. Direct billing available - no upfront costs for approved claims.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <FileText className="h-5 w-5" />
                <span>Complete Documentation</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Shield className="h-5 w-5" />
                <span>Direct Billing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <CheckCircle className="h-5 w-5" />
                <span>Claims Support</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: 1300 309 361
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-6 bg-transparent"
              >
                Start Your Claim
              </Button>
            </div>
            <p className="text-sm text-blue-200 pt-4">
              Emergency? We're available 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Companies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Work With All Major Australian Insurers
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {insuranceCompanies.map((insurer) => (
                <Link
                  key={insurer.id}
                  href={`/insurance/${insurer.id}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center h-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                        {insurer.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{insurer.fullName}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Don't see your insurer? We work with all Australian insurance companies.
              </p>
              <Button variant="outline" asChild>
                <a href="#contact">Contact us about your specific insurer →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Covered Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Services Covered by Insurance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We handle all types of disaster recovery and restoration services covered under your insurance policy.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Water Damage Restoration</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Burst pipes, flooding, appliance leaks, storm water intrusion
                  </p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">
                    Typically covered when sudden and accidental
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold mb-2">Services Include:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Emergency water extraction</li>
                    <li>• Structural drying</li>
                    <li>• Dehumidification</li>
                    <li>• Moisture monitoring</li>
                    <li>• Damage repair</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Fire & Smoke Damage</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Fire damage, smoke cleanup, soot removal, odor elimination
                  </p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">
                    Usually fully covered under comprehensive policies
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold mb-2">Services Include:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Smoke & soot cleanup</li>
                    <li>• Odor removal</li>
                    <li>• Structural repairs</li>
                    <li>• Content restoration</li>
                    <li>• Board-up services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Storm Damage</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Wind damage, hail damage, fallen trees, emergency repairs
                  </p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">
                    Covered under most home insurance policies
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold mb-2">Services Include:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Emergency tarping</li>
                    <li>• Tree removal</li>
                    <li>• Roof repairs</li>
                    <li>• Window replacement</li>
                    <li>• Structural restoration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mould Remediation</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Mould removal following water damage or moisture events
                  </p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">
                    Coverage depends on cause - sudden events usually covered
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold mb-2">Services Include:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Mould inspection</li>
                    <li>• Containment</li>
                    <li>• Safe removal</li>
                    <li>• HEPA air filtration</li>
                    <li>• Prevention measures</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <AlertCircle className="h-6 w-6" />
                  Important Coverage Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">
                  Coverage varies by policy. Sudden and accidental damage is typically covered by your insurer. Gradual damage or lack of maintenance may not be covered. Contact us immediately after damage occurs for best coverage outcomes. We'll help determine if your damage is covered.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Handle Your Insurance Claim
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We make the insurance claims process simple and stress-free. Here's our step-by-step approach.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Contact Us Immediately",
                  description: "Call us as soon as damage occurs. We will guide you through the initial steps and coordinate with your insurer.",
                  detail: "Call 1300 309 361 or submit online form"
                },
                {
                  step: 2,
                  title: "Professional Assessment",
                  description: "Our IICRC Master Restorer arrives on-site to assess damage, take photos, and create detailed documentation.",
                  detail: "Comprehensive damage assessment"
                },
                {
                  step: 3,
                  title: "Insurance Coordination",
                  description: "We communicate directly with your insurance adjuster, provide all required documentation, and handle the claim process.",
                  detail: "Direct insurer communication"
                },
                {
                  step: 4,
                  title: "Restoration Work",
                  description: "Approved restoration work begins. We provide regular updates to you and your insurer throughout the process.",
                  detail: "Professional restoration services"
                },
                {
                  step: 5,
                  title: "Claim Completion",
                  description: "Final inspection, completion certificate, and direct billing to your insurance company. No upfront costs.",
                  detail: "Direct billing to insurer"
                }
              ].map((item) => (
                <Card key={item.step} className="border-l-4 border-l-blue-600">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-700 mb-2">{item.description}</p>
                        <p className="text-sm text-blue-600 font-semibold">{item.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Documentation Provided
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide all documentation required by your insurance company including detailed damage assessments, moisture readings, photographic evidence, scope of work, and progress reports. Our comprehensive documentation helps ensure smooth claim approval.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Assessment & Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Pre-loss condition photographs and videos</li>
                    <li>• Detailed damage assessment reports</li>
                    <li>• Moisture readings and thermal imaging</li>
                    <li>• Scope of work and repair estimates</li>
                    <li>• Material lists and labour breakdowns</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Progress & Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Daily work progress reports</li>
                    <li>• Equipment placement diagrams</li>
                    <li>• Moisture monitoring logs</li>
                    <li>• Final completion certificates</li>
                    <li>• Post-remediation verification tests</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Insurance Claims Service
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Insurance Approved",
                  description: "Pre-approved by major insurers with established relationships and preferred provider status"
                },
                {
                  icon: FileText,
                  title: "Expert Documentation",
                  description: "Comprehensive documentation that meets insurance requirements and maximizes claim approval"
                },
                {
                  icon: CheckCircle,
                  title: "Direct Billing",
                  description: "No upfront costs - we bill your insurance company directly for approved claims"
                },
                {
                  icon: Shield,
                  title: "Claims Advocacy",
                  description: "We advocate for you throughout the claims process, ensuring fair treatment and full coverage"
                },
                {
                  icon: Clock,
                  title: "Emergency Response",
                  description: "24/7 emergency response to prevent further damage and document initial conditions immediately"
                },
                {
                  icon: CheckCircle,
                  title: "Guaranteed Work",
                  description: "All restoration work is guaranteed and warranty-backed for your peace of mind"
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-6 w-6 text-blue-600" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <AlertCircle className="h-6 w-6" />
                  Important Information About Insurance Coverage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Time is Critical:</p>
                  <p className="text-gray-800">Contact us immediately after damage occurs. Delays can affect coverage and lead to secondary damage.</p>
                </div>
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Coverage Varies:</p>
                  <p className="text-gray-800">Not all damage is covered by insurance. Sudden and accidental events are typically covered, while gradual damage may not be.</p>
                </div>
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Document Everything:</p>
                  <p className="text-gray-800">Take photos and videos before we arrive, but don't attempt cleanup as this may affect your claim.</p>
                </div>
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Professional Assessment Required:</p>
                  <p className="text-gray-800">Insurance companies typically require professional assessment and restoration for coverage approval.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Need Help With Your Insurance Claim?
            </h2>
            <p className="text-xl text-blue-100">
              Don't navigate the claims process alone. Our insurance experts are ready to help you get the coverage you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+611300309361"
                className="inline-flex items-center justify-center h-10 rounded-md px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: 1300 309 361
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-6 bg-transparent"
              >
                Start Insurance Claim
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

