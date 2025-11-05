import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Shield, Award, CheckCircle, Phone, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Master Restorer Qualifications FAQ Brisbane | IICRC Certification Questions Answered',
  description: 'Common questions about Master Restorer qualifications Brisbane. What makes Phill McGurk different? IICRC certification requirements, costs, insurance benefits explained.',
  keywords: 'Master Restorer FAQ Brisbane, IICRC certification questions, water damage contractor qualifications Brisbane, restoration expert credentials FAQ'
};

export default function MasterRestorerQualificationsFAQBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master Restorer Qualifications FAQ
              <span className="block text-blue-400">Brisbane Water Damage Expert</span>
            </h1>
            <p className="text-xl mb-8">
              Common questions about Master Restorer certification, IICRC qualifications,
              and why it matters for your Brisbane water damage restoration project.
              Get answers from Master Restorer Phill McGurk.
            </p>

            <div className="bg-blue-600 p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">❓ Got Questions? Call Direct</p>
              <p className="text-xl">[Direct Number]</p>
              <p className="text-lg">Speak with Master Restorer Phill McGurk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* What is a Master Restorer */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-centre">
                <Shield className="h-8 w-8 mr-3" />
                What exactly is a Master Restorer and why does it matter?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  A Master Restorer is the highest level of IICRC (Institute of Inspection, Cleaning and Restoration Certification)
                  accreditation available in the restoration industry. It represents the pinnacle of professional expertise
                  and technical knowledge.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold mb-3">Master Restorer Requirements:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Minimum 5 years of restoration experience</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Multiple specialist IICRC certifications (WRT, ASD, FSRT, etc.)</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Proven track record of complex restoration projects</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Ongoing professional development and education</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Industry recognition and peer review</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg font-semibold text-blue-800">
                  In Brisbane and Queensland, there are only a limited number of Master Restorers,
                  making this certification extremely valuable for complex or high-value properties.
                </p>
              </div>
            </Card>

            {/* How many Master Restorers in Brisbane */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-green-800 flex items-centre">
                <Award className="h-8 w-8 mr-3" />
                How many Master Restorers are there in Brisbane and Queensland?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  There are only a limited number of Master Restorers certified in Brisbane and throughout Queensland.
                  This limited availability is due to the stringent requirements and advanced expertise needed
                  to achieve this certification level.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Why So Few Master Restorers?</h3>
                    <ul className="text-sm space-y-2">
                      <li>• Requires extensive experience (5+ years minimum)</li>
                      <li>• Must hold multiple specialist certifications</li>
                      <li>• Ongoing education and recertification requirements</li>
                      <li>• Peer review and industry recognition process</li>
                      <li>• Significant time and financial investment</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Benefits of Limited Numbers:</h3>
                    <ul className="text-sm space-y-2">
                      <li>• Exclusive expertise for complex projects</li>
                      <li>• Direct relationships with major insurers</li>
                      <li>• Priority access to advanced training</li>
                      <li>• Industry thought leadership recognition</li>
                      <li>• Premium project assignments</li>
                    </ul>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  This scarcity means Master Restorers like Phill McGurk are in high demand for premium properties
                  in Hamilton, Ascot, and throughout Brisbane's high-value suburbs.
                </p>
              </div>
            </Card>

            {/* Cost implications */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-800">
                Does hiring a Master Restorer cost more than a regular contractor?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  Master Restorer services often provide better value despite potentially higher upfront costs.
                  The advanced expertise typically results in:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-green-800">Cost Benefits:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Accurate initial assessment reduces scope creep</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Faster project completion times</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Reduced risk of additional damage</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Lower chance of callbacks/rework</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Better insurance claim outcomes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-blue-800">Insurance Advantages:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Preferred contractor status with major insurers</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Direct billing arrangements available</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Faster claim approvals and processing</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Comprehensive documentation reducing disputes</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Industry-standard pricing transparency</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="font-bold text-yellow-800 text-centre">
                    For insurance claims, you typically only pay your excess regardless of contractor choice.
                    Master Restorer expertise at no additional cost to you.
                  </p>
                </div>
              </div>
            </Card>

            {/* Insurance relationships */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-red-800">
                Do insurance companies prefer Master Restorers?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  Yes, major insurance companies actively prefer Master Restorers for several key reasons.
                  The advanced certification provides assurance of quality work and industry-standard practices.
                </p>
                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-red-800">Why Insurers Prefer Master Restorers:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Reduced risk of callbacks and disputes</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Industry-standard documentation quality</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Proven track record of successful projects</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Advanced technical knowledge</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Compliance with IICRC standards</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Professional liability insurance coverage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-blue-800">Insurance Company Benefits:</h3>
                    <ul className="space-y-2">
                      <li><strong>RACQ:</strong> Preferred contractor program with Master Restorers</li>
                      <li><strong>Suncorp:</strong> Fast-track approval process for certified contractors</li>
                      <li><strong>AAMI:</strong> Direct billing arrangements with Master Restorers</li>
                      <li><strong>CGU:</strong> Reduced claims processing times with certified experts</li>
                      <li><strong>Allianz:</strong> Priority contractor status for complex claims</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency response */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-orange-800">
                Is Master Restorer Phill McGurk available for emergency calls?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  Yes, Master Restorer Phill McGurk provides 24/7 emergency response throughout Brisbane,
                  Ipswich, and Logan. Emergency water damage requires immediate professional intervention
                  to prevent secondary damage and mould growth.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-orange-800">Emergency Response:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-centre">
                        <Clock className="h-5 w-5 text-orange-600 mr-2" />
                        <span>24/7 availability including weekends</span>
                      </li>
                      <li className="flex items-centre">
                        <Clock className="h-5 w-5 text-orange-600 mr-2" />
                        <span>Christmas, Easter, and public holidays</span>
                      </li>
                      <li className="flex items-centre">
                        <Clock className="h-5 w-5 text-orange-600 mr-2" />
                        <span>60-minute response Hamilton/Ascot</span>
                      </li>
                      <li className="flex items-centre">
                        <Clock className="h-5 w-5 text-orange-600 mr-2" />
                        <span>90-minute maximum Brisbane metro</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-green-800">Emergency Equipment:</h3>
                    <ul className="space-y-2">
                      <li>• Industrial water extraction equipment</li>
                      <li>• Professional dehumidifiers</li>
                      <li>• Thermal imaging cameras</li>
                      <li>• Moisture detection equipment</li>
                      <li>• Emergency power and lighting</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <p className="font-bold text-red-800 text-centre text-lg">
                    Emergency Line: [Emergency Number] - Direct to Master Restorer
                  </p>
                </div>
              </div>
            </Card>

            {/* Heritage properties */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-teal-800">
                Can Master Restorers work on heritage properties in Ascot and Hamilton?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  Yes, Master Restorer Phill McGurk specialises in heritage property restoration throughout
                  Brisbane's premium suburbs. Heritage homes require specialised knowledge and techniques
                  that only advanced certification provides.
                </p>
                <div className="space-y-6">
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-teal-800">Heritage Property Expertise:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Lime plaster restoration techniques</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Period-appropriate material sourcing</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Original timber preservation methods</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Heritage council compliance</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Character feature protection</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Traditional restoration methods</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Specialist heritage craftspeople network</span>
                        </li>
                        <li className="flex items-centre">
                          <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                          <span>Historical accuracy requirements</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-blue-800">Brisbane Heritage Areas Covered:</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Hamilton</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Waterfront heritage homes</li>
                          <li>• Character Queenslanders</li>
                          <li>• Period worker cottages</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Ascot</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Heritage listed properties</li>
                          <li>• Character homes near racecourse</li>
                          <li>• Federation-era houses</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Other Areas</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Paddington character homes</li>
                          <li>• New Farm heritage apartments</li>
                          <li>• West End heritage properties</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Documentation and reporting */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-indigo-800">
                What kind of documentation does a Master Restorer provide?
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  Master Restorer-level documentation exceeds industry standards and meets the highest
                  requirements for insurance claims, legal proceedings, and professional records.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-indigo-800">Assessment Documentation:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                        <span>Comprehensive damage assessment reports</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                        <span>Thermal imaging and moisture mapping</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                        <span>Professional photography (before/during/after)</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                        <span>Detailed scope of works</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
                        <span>Material and equipment specifications</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3 text-green-800">Progress Documentation:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Daily progress reports with photos</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Moisture monitoring charts</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Equipment placement diagrams</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Environmental monitoring logs</span>
                      </li>
                      <li className="flex items-centre">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Completion certificates</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold mb-3">Industry-Standard Compliance:</h3>
                  <p className="mb-3">All documentation complies with:</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    <li>• IICRC S500 Water Damage Standard</li>
                    <li>• IICRC S520 Mould Remediation Standard</li>
                    <li>• Australian/New Zealand Standards</li>
                    <li>• Insurance industry requirements</li>
                    <li>• Legal documentation standards</li>
                    <li>• Professional photography protocols</li>
                  </ul>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            More Questions About Master Restorer Services?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get answers directly from Master Restorer Phill McGurk. Whether it's emergency water damage
            or questions about restoration processes, we're here to help 24/7.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Speak with Master Restorer</h3>
              <p className="text-3xl font-bold mb-2">[Direct Number]</p>
              <p>Direct line to Phill McGurk</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Clock className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Emergency Response</h3>
              <p className="text-3xl font-bold mb-2">24/7 Available</p>
              <p>Including weekends & holidays</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[DIRECT_NUMBER]">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-4 mr-4">
                📞 Call Master Restorer
              </Button>
            </Link>
            <Link href="/emergency">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-blue-700">
                Emergency Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Related Resources & Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-centre">
                <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-3">
                  Master Restorer Certification Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to understanding Master Restorer qualifications and benefits.
                </p>
                <Link href="/resources/master-restorer-certification-guide">
                  <Button variant="outline">Download Guide</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <Award className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-3">
                  About Master Restorer Phill McGurk
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn about Brisbane's Master Restorer and his qualifications.
                </p>
                <Link href="/master-restorer-brisbane">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-3">
                  More Water Damage FAQs
                </h3>
                <p className="text-gray-600 mb-4">
                  Additional frequently asked questions about water damage restoration.
                </p>
                <Link href="/faq/water-damage">
                  <Button variant="outline">View FAQs</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}