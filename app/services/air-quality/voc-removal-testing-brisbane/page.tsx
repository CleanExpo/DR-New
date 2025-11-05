import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, TestTube, AlertTriangle, Shield, CheckCircle, Phone, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VOC Removal & Testing Brisbane | Volatile Organic Compound Specialists Queensland',
  description: 'Professional VOC removal and testing Brisbane. Certified volatile organic compound testing, formaldehyde removal, paint fume extraction. NATA accredited air quality specialists serving Brisbane, Ipswich, Logan.',
  keywords: 'VOC removal Brisbane, volatile organic compound testing Brisbane, formaldehyde removal Brisbane home, paint fume removal service Brisbane, chemical odour removal Brisbane, air quality testing Brisbane'
};

export default function VOCRemovalTestingBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Wind className="h-16 w-16 mr-4 text-green-400" />
              <TestTube className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional VOC Removal & Testing
              <span className="block text-green-400">Brisbane Air Quality Specialists</span>
            </h1>
            <p className="text-xl mb-8">
              Protect your family and employees from volatile organic compounds (VOCs).
              NATA accredited testing and certified removal services for formaldehyde, paint fumes,
              chemical odours, and toxic vapours throughout Brisbane, Ipswich, and Logan.
            </p>

            <div className="bg-red-600 p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">🧪 URGENT VOC TESTING & REMOVAL</p>
              <p className="text-xl">[VOC Emergency Line]</p>
              <p className="text-lg">NATA Accredited • Same Day Service Available</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <TestTube className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                <p className="font-bold">NATA Accredited</p>
                <p className="text-sm">Certified air testing</p>
              </div>
              <div>
                <Wind className="h-10 w-10 mx-auto mb-2 text-green-400" />
                <p className="font-bold">Professional Removal</p>
                <p className="text-sm">Activated carbon systems</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">Emergency Response</p>
                <p className="text-sm">24/7 for toxic exposure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What are VOCs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Understanding Volatile Organic Compounds (VOCs) in Brisbane Homes
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">What Are VOCs?</h3>
                <p className="text-lg mb-4">
                  Volatile Organic Compounds are chemicals that easily become vapours or gases at room temperature.
                  They're released from thousands of products in your Brisbane home or office,
                  often at levels 2-5 times higher than outdoor air.
                </p>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 text-red-800">Common VOC Sources in Brisbane Homes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Paints, varnishes, and wood stains</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>New furniture and cabinetry</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Carpets, adhesives, and sealants</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Cleaning products and air fresheners</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Building materials and insulation</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Health Impacts of VOC Exposure</h3>
                <p className="text-lg mb-4">
                  VOC exposure can cause immediate symptoms and long-term health problems.
                  Brisbane's warm, humid climate can increase VOC off-gassing rates,
                  making professional testing and removal critical.
                </p>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-orange-800">Immediate Symptoms:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Headaches and dizziness</li>
                      <li>• Eye, nose, and throat irritation</li>
                      <li>• Nausea and fatigue</li>
                      <li>• Respiratory problems</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-red-800">Long-term Health Risks:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Nervous system damage</li>
                      <li>• Liver and kidney problems</li>
                      <li>• Some VOCs are carcinogenic</li>
                      <li>• Allergies and sensitivities</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Most Dangerous VOCs */}
            <Card className="p-8 bg-yellow-50">
              <h3 className="text-2xl font-bold text-centre mb-6 text-yellow-800">
                Most Dangerous VOCs Found in Brisbane Properties
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-lg font-bold mb-3 text-red-700">Formaldehyde</h4>
                  <p className="text-sm mb-3">
                    Most common indoor VOC. Found in pressed wood, insulation, fabrics.
                    Known carcinogen with strong odour.
                  </p>
                  <div className="text-xs">
                    <strong>Safe Level:</strong> &lt;0.1 ppm
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-lg font-bold mb-3 text-orange-700">Benzene</h4>
                  <p className="text-sm mb-3">
                    Found in adhesives, paints, gasoline. Sweet smell.
                    Linked to leukemia and blood disorders.
                  </p>
                  <div className="text-xs">
                    <strong>Safe Level:</strong> &lt;1 ppb
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-lg font-bold mb-3 text-purple-700">Toluene</h4>
                  <p className="text-sm mb-3">
                    Common in paints, nail polish, adhesives.
                    Affects nervous system and development.
                  </p>
                  <div className="text-xs">
                    <strong>Safe Level:</strong> &lt;300 µg/m³
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional VOC Testing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              NATA Accredited VOC Testing Brisbane
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <TestTube className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Comprehensive Air Testing</h3>
                <p className="text-lg mb-4">
                  Our NATA accredited laboratory testing identifies and quantifies over 100 different VOCs
                  commonly found in Brisbane homes and offices. Same-day emergency testing available.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>NATA certified laboratory analysis</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Comprehensive 100+ VOC panel</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Real-time air quality monitoring</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Detailed health risk assessment</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Source identification and mapping</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Award className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Professional Testing Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-4 text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-bold">Initial Assessment</h4>
                      <p className="text-sm">On-site evaluation and sampling strategy development</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-4 text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-bold">Sample Collection</h4>
                      <p className="text-sm">Strategic air sampling using calibrated equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-4 text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-bold">Laboratory Analysis</h4>
                      <p className="text-sm">NATA accredited testing for VOC identification</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-4 text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-bold">Detailed Report</h4>
                      <p className="text-sm">Comprehensive results with health risk assessment</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Testing Packages */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-l-4 border-l-blue-600">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Basic VOC Screen</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">$450</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• 25 common VOCs tested</li>
                  <li>• Single room sampling</li>
                  <li>• Basic health assessment</li>
                  <li>• 3-5 day turnaround</li>
                  <li>• Digital report</li>
                </ul>
                <Button className="w-full">Book Basic Test</Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-600 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold mb-3 text-green-800">Comprehensive VOC Analysis</h3>
                <p className="text-3xl font-bold text-green-600 mb-4">$750</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• 100+ VOCs including aldehydes</li>
                  <li>• Multi-room sampling</li>
                  <li>• Source identification</li>
                  <li>• Same/next day turnaround</li>
                  <li>• Detailed health risk report</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Book Comprehensive</Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-600">
                <h3 className="text-xl font-bold mb-3 text-purple-800">Commercial VOC Audit</h3>
                <p className="text-3xl font-bold text-purple-600 mb-4">$1,250</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Workplace compliance testing</li>
                  <li>• Multiple zone sampling</li>
                  <li>• HVAC system assessment</li>
                  <li>• Priority lab processing</li>
                  <li>• Remediation recommendations</li>
                </ul>
                <Button className="w-full">Book Commercial Audit</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* VOC Removal Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Professional VOC Removal & Air Purification Brisbane
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Wind className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Activated Carbon Air Filtration</h3>
                <p className="text-lg mb-4">
                  Professional-grade activated carbon systems specifically designed for VOC removal.
                  Our systems remove 99.9% of VOCs including formaldehyde, benzene, and toluene.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 text-green-800">Carbon Filtration Systems:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Industrial activated carbon filters</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>HEPA + carbon combination systems</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Whole-house air purification</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Portable high-capacity units</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>UV-C sterilization integration</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Source Removal & Neutralization</h3>
                <p className="text-lg mb-4">
                  Direct elimination of VOC sources combined with neutralizing treatments.
                  We target the source, not just the symptoms, for long-term air quality improvement.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800">Paint & Chemical Fume Removal:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Ozone treatment for paint fumes</li>
                      <li>• Thermal fogging neutralization</li>
                      <li>• Hydroxyl radical treatment</li>
                      <li>• Ventilation optimisation</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-purple-800">Formaldehyde Removal:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• specialised formaldehyde scavengers</li>
                      <li>• Catalytic oxidation systems</li>
                      <li>• Sealing and encapsulation</li>
                      <li>• Temperature/humidity control</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Emergency VOC Response */}
            <Card className="p-8 bg-red-50">
              <h3 className="text-2xl font-bold text-centre mb-6 text-red-800">
                Emergency VOC Response - Brisbane 24/7
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-centre">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-red-600" />
                  <h4 className="text-xl font-bold mb-2">Immediate Response</h4>
                  <p className="text-sm">
                    Chemical spills, paint fume exposure, toxic odours requiring urgent intervention.
                    On-site within 60 minutes Brisbane metro.
                  </p>
                </div>
                <div className="text-centre">
                  <Wind className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2">Emergency Ventilation</h4>
                  <p className="text-sm">
                    Rapid deployment of positive pressure ventilation, air scrubbers,
                    and emergency evacuation protocols.
                  </p>
                </div>
                <div className="text-centre">
                  <TestTube className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h4 className="text-xl font-bold mb-2">Immediate Testing</h4>
                  <p className="text-sm">
                    Real-time VOC monitoring, immediate health risk assessment,
                    and safe re-entry clearance testing.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Common VOC Scenarios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Common VOC Problems in Brisbane Properties
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-blue-800">New Construction & Renovation</h3>
                <p className="text-sm mb-3">
                  Fresh paint, new carpets, cabinets, and building materials release high levels of VOCs.
                  Brisbane's warm climate accelerates off-gassing.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Paint and primer VOCs</li>
                  <li>• Adhesive and sealant fumes</li>
                  <li>• New furniture off-gassing</li>
                  <li>• Carpet and flooring chemicals</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-green-800">Office & Workplace</h3>
                <p className="text-sm mb-3">
                  Modern offices concentrate VOCs from multiple sources: printers, furniture,
                  cleaning products, and poor ventilation.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Printer and copier emissions</li>
                  <li>• Office furniture formaldehyde</li>
                  <li>• Cleaning chemical residues</li>
                  <li>• Poor HVAC filtration</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-purple-800">Car Parks & Garages</h3>
                <p className="text-sm mb-3">
                  Petrol vapours, oil, exhaust fumes, and chemical storage create
                  concentrated VOC exposure zones.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Petrol and diesel vapours</li>
                  <li>• Motor oil and lubricants</li>
                  <li>• Paint and solvent storage</li>
                  <li>• Vehicle exhaust residues</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-red-800">Schools & Childcare</h3>
                <p className="text-sm mb-3">
                  Children are more vulnerable to VOCs. Art supplies, cleaning products,
                  and building materials require special attention.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Art and craft material fumes</li>
                  <li>• Classroom furniture emissions</li>
                  <li>• Playground equipment treatments</li>
                  <li>• Cleaning product residues</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-orange-800">Healthcare Facilities</h3>
                <p className="text-sm mb-3">
                  Medical equipment, cleaning chemicals, and sterilization processes
                  create unique VOC challenges requiring specialised solutions.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Medical equipment off-gassing</li>
                  <li>• Sterilization chemical residues</li>
                  <li>• Pharmaceutical vapours</li>
                  <li>• Disinfectant and cleaner VOCs</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-teal-800">Retail & Hospitality</h3>
                <p className="text-sm mb-3">
                  New merchandise, display materials, kitchen equipment, and frequent
                  renovations create ongoing VOC management challenges.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• New merchandise off-gassing</li>
                  <li>• Display material emissions</li>
                  <li>• Kitchen equipment vapours</li>
                  <li>• Frequent renovation impacts</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              VOC Testing & Removal Service Areas
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Brisbane Metro</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Wind className="h-4 w-4 text-green-600 mr-2" />
                    <span>Brisbane CBD & Inner City</span>
                  </li>
                  <li className="flex items-centre">
                    <Wind className="h-4 w-4 text-green-600 mr-2" />
                    <span>Hamilton & Ascot (Heritage homes)</span>
                  </li>
                  <li className="flex items-centre">
                    <Wind className="h-4 w-4 text-green-600 mr-2" />
                    <span>New Farm & Bulimba (New developments)</span>
                  </li>
                  <li className="flex items-centre">
                    <Wind className="h-4 w-4 text-green-600 mr-2" />
                    <span>Toowong & Paddington (Office buildings)</span>
                  </li>
                  <li className="flex items-centre">
                    <Wind className="h-4 w-4 text-green-600 mr-2" />
                    <span>All Brisbane suburbs</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-800">Ipswich Region</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <TestTube className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Ipswich CBD commercial</span>
                  </li>
                  <li className="flex items-centre">
                    <TestTube className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Springfield Lakes (New homes)</span>
                  </li>
                  <li className="flex items-centre">
                    <TestTube className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Brookwater (Golf course estates)</span>
                  </li>
                  <li className="flex items-centre">
                    <TestTube className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Karalee (Acreage properties)</span>
                  </li>
                  <li className="flex items-centre">
                    <TestTube className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Augustine Heights developments</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Logan & Gold Coast</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Logan Central commercial</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Springwood business district</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Shailer Park residential</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Upper Gold Coast (Nerang, Mudgeeraba)</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Industrial Logan areas</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-centre">
              <p className="text-lg mb-4">
                <strong>Emergency VOC response available 24/7 throughout service area</strong>
              </p>
              <p className="text-sm text-gray-600">
                NATA accredited testing and certified removal services for residential, commercial, and industrial properties
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            VOC Emergency or Testing Required?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't risk your health from volatile organic compound exposure. Get professional NATA accredited
            testing and certified removal services throughout Brisbane, Ipswich, and Logan.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">VOC Emergency Line</h3>
              <p className="text-3xl font-bold mb-2">[VOC Emergency]</p>
              <p>24/7 for toxic exposure incidents</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <TestTube className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Testing & Assessment</h3>
              <p className="text-3xl font-bold mb-2">Same Day</p>
              <p>NATA accredited laboratory testing</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[VOC_EMERGENCY]">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-xl px-8 py-4 mr-4">
                🧪 Emergency VOC Response
              </Button>
            </Link>
            <Link href="/book-service">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-green-700">
                Book VOC Testing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Related Air Quality Services
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-centre">
                <Wind className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-3">
                  Indoor Air Quality Testing
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive air quality assessment including VOCs, mould, allergens, and pollutants.
                </p>
                <Link href="/services/air-quality/indoor-air-quality-testing-brisbane">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-3">
                  HVAC System Cleaning
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional ductwork cleaning and HVAC decontamination to remove VOC sources.
                </p>
                <Link href="/services/hvac/duct-cleaning-brisbane">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <TestTube className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-3">
                  Mould & Moisture Assessment
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive mould testing and moisture assessment that often accompanies VOC issues.
                </p>
                <Link href="/services/mould-remediation">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}