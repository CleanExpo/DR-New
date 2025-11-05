import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, Eye, Zap, CheckCircle, Download, FileText, Star, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thermal Imaging Moisture Detection Brisbane | IICRC Certified Water Damage Assessment',
  description: 'Professional thermal imaging and moisture detection Brisbane. IICRC certified Master Restorer using FLIR thermal cameras for accurate water damage assessment. Hamilton, Ascot, Ipswich water damage detection.',
  keywords: 'thermal imaging water damage Brisbane, moisture detection equipment Brisbane, FLIR thermal camera water damage, IICRC moisture assessment Brisbane, professional water damage detection Hamilton Ascot'
};

export default function ThermalImagingMoistureDetectionBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Thermometer className="h-16 w-16 mr-4 text-red-400" />
              <Eye className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Thermal Imaging & Moisture Detection
              <span className="block text-blue-400">Brisbane Water Damage Assessment</span>
            </h1>
            <p className="text-xl mb-8">
              See what's hidden behind walls, ceilings, and floors. IICRC certified Master Restorer Phill McGurk
              uses advanced FLIR thermal imaging and precision moisture detection equipment for accurate
              water damage assessment throughout Brisbane, Hamilton, Ascot, and Ipswich.
            </p>

            <div className="bg-blue-600 p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">📞 Professional Assessment Line</p>
              <p className="text-xl">[Assessment Number]</p>
              <p className="text-lg">Thermal imaging available 24/7 for emergencies</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Award className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                <p className="font-bold">IICRC Certified</p>
                <p className="text-sm">Master Restorer Level</p>
              </div>
              <div>
                <Thermometer className="h-10 w-10 mx-auto mb-2 text-red-400" />
                <p className="font-bold">FLIR Thermal Cameras</p>
                <p className="text-sm">Professional grade equipment</p>
              </div>
              <div>
                <Eye className="h-10 w-10 mx-auto mb-2 text-green-400" />
                <p className="font-bold">Hidden Water Detection</p>
                <p className="text-sm">See behind walls & ceilings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Thermal Imaging */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Advanced Thermal Imaging Technology for Water Damage Detection
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Thermometer className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">How Thermal Imaging Works</h3>
                <p className="text-lg mb-4">
                  Thermal imaging cameras detect infrared radiation (heat) emitted by all objects.
                  Water has different thermal properties than dry materials, making it visible
                  to trained technicians using professional FLIR thermal cameras.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Detects temperature variations as small as 0.1°C</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Non-invasive assessment method</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Real-time visual feedback</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Accurate moisture mapping</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Eye className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">What Thermal Imaging Reveals</h3>
                <p className="text-lg mb-4">
                  Professional thermal imaging reveals water damage that's invisible to the naked eye,
                  allowing for targeted, cost-effective restoration rather than exploratory demolition.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Hidden water behind walls and ceilings</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Wet insulation in cavity walls</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Plumbing leaks within walls</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Roof leak water migration paths</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* IICRC Standards */}
            <Card className="p-8 bg-blue-50">
              <div className="text-centre mb-6">
                <Award className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold">IICRC S500 Standard Compliance</h3>
              </div>
              <p className="text-lg text-centre mb-6">
                Our thermal imaging and moisture detection protocols comply with IICRC S500 Standard for
                Professional Water Damage Restoration, ensuring accurate assessment and documentation.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-centre">
                <div>
                  <h4 className="font-bold mb-2">Moisture Mapping</h4>
                  <p className="text-sm">Detailed thermal maps showing moisture extent and severity levels</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Documentation Standards</h4>
                  <p className="text-sm">Professional reports meeting insurance and restoration industry requirements</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Monitoring Protocols</h4>
                  <p className="text-sm">Ongoing thermal monitoring during drying process to ensure completion</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Equipment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Professional Grade Detection Equipment
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="text-centre mb-4">
                  <Thermometer className="h-12 w-12 mx-auto text-red-600 mb-2" />
                  <h3 className="text-lg font-bold">FLIR Thermal Cameras</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Professional infrared imaging</li>
                  <li>• High resolution thermal detection</li>
                  <li>• Real-time temperature measurement</li>
                  <li>• Digital thermal image recording</li>
                  <li>• Temperature range: -40°C to +1000°C</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="text-centre mb-4">
                  <Zap className="h-12 w-12 mx-auto text-yellow-600 mb-2" />
                  <h3 className="text-lg font-bold">Moisture Meters</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Pin-type moisture meters</li>
                  <li>• Non-invasive moisture detection</li>
                  <li>• Digital moisture percentage readings</li>
                  <li>• Material-specific calibration</li>
                  <li>• Deep wall moisture measurement</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="text-centre mb-4">
                  <Eye className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                  <h3 className="text-lg font-bold">Hygrometers</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Relative humidity measurement</li>
                  <li>• Temperature and humidity logging</li>
                  <li>• Psychrometric calculations</li>
                  <li>• Dew point determination</li>
                  <li>• Environmental condition monitoring</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="text-centre mb-4">
                  <FileText className="h-12 w-12 mx-auto text-green-600 mb-2" />
                  <h3 className="text-lg font-bold">Data Loggers</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Continuous monitoring capability</li>
                  <li>• 24/7 data collection</li>
                  <li>• Historical trend analysis</li>
                  <li>• Remote monitoring options</li>
                  <li>• Professional reporting software</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="text-centre mb-4">
                  <Star className="h-12 w-12 mx-auto text-purple-600 mb-2" />
                  <h3 className="text-lg font-bold">Penetrating Radar</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Sub-surface water detection</li>
                  <li>• Concrete slab moisture assessment</li>
                  <li>• Wall cavity water detection</li>
                  <li>• Non-destructive investigation</li>
                  <li>• Structural moisture mapping</li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="text-centre mb-4">
                  <CheckCircle className="h-12 w-12 mx-auto text-teal-600 mb-2" />
                  <h3 className="text-lg font-bold">Air Quality Monitors</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Indoor air quality assessment</li>
                  <li>• Mould spore detection</li>
                  <li>• Volatile organic compound testing</li>
                  <li>• Particle count monitoring</li>
                  <li>• Environmental safety verification</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Professional Water Damage Assessment Process
            </h2>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-centre">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-centre justify-centre mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-lg font-bold mb-3">Initial Visual Assessment</h3>
                <p className="text-sm">
                  Comprehensive visual inspection to identify obvious water damage,
                  potential moisture sources, and areas requiring thermal investigation.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-centre justify-centre mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-lg font-bold mb-3">Thermal Imaging Survey</h3>
                <p className="text-sm">
                  Systematic thermal imaging of all suspected areas using professional
                  FLIR cameras to reveal hidden moisture and water migration patterns.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-centre justify-centre mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-lg font-bold mb-3">Moisture Verification</h3>
                <p className="text-sm">
                  Direct moisture measurement using calibrated meters to confirm
                  thermal imaging findings and quantify moisture levels.
                </p>
              </Card>

              <Card className="p-6 text-centre">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-centre justify-centre mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-lg font-bold mb-3">Professional Reporting</h3>
                <p className="text-sm">
                  Comprehensive assessment report with thermal images, moisture maps,
                  and detailed restoration recommendations.
                </p>
              </Card>
            </div>

            {/* Benefits of Professional Assessment */}
            <Card className="p-8 bg-green-50">
              <h3 className="text-2xl font-bold text-centre mb-6">
                Benefits of Professional Thermal Assessment
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-3 text-green-800">Cost Savings</h4>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Eliminates unnecessary exploratory demolition</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Targets restoration to affected areas only</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Reduces overall project costs</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Minimizes business/living disruption</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-3 text-blue-800">Accuracy & Speed</h4>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Immediate moisture detection results</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Comprehensive moisture mapping</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Faster project completion</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Prevents secondary damage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Brisbane Service Areas */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Thermal Imaging Services Throughout Brisbane
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Brisbane Premium Suburbs</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Thermometer className="h-4 w-4 text-red-600 mr-2" />
                    <span>Hamilton waterfront properties</span>
                  </li>
                  <li className="flex items-centre">
                    <Thermometer className="h-4 w-4 text-red-600 mr-2" />
                    <span>Ascot heritage homes</span>
                  </li>
                  <li className="flex items-centre">
                    <Thermometer className="h-4 w-4 text-red-600 mr-2" />
                    <span>New Farm luxury apartments</span>
                  </li>
                  <li className="flex items-centre">
                    <Thermometer className="h-4 w-4 text-red-600 mr-2" />
                    <span>Bulimba riverside properties</span>
                  </li>
                  <li className="flex items-centre">
                    <Thermometer className="h-4 w-4 text-red-600 mr-2" />
                    <span>Toowong executive homes</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-800">Ipswich Region</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Eye className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Karalee acreage properties</span>
                  </li>
                  <li className="flex items-centre">
                    <Eye className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Brookwater golf course estates</span>
                  </li>
                  <li className="flex items-centre">
                    <Eye className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Springfield Lakes developments</span>
                  </li>
                  <li className="flex items-centre">
                    <Eye className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Augustine Heights new builds</span>
                  </li>
                  <li className="flex items-centre">
                    <Eye className="h-4 w-4 text-blue-600 mr-2" />
                    <span>All Ipswich commercial</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Commercial & Logan</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Brisbane CBD buildings</span>
                  </li>
                  <li className="flex items-centre">
                    <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Industrial complexes</span>
                  </li>
                  <li className="flex items-centre">
                    <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Logan commercial properties</span>
                  </li>
                  <li className="flex items-centre">
                    <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Retail and office spaces</span>
                  </li>
                  <li className="flex items-centre">
                    <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Multi-story buildings</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-centre">
              <p className="text-lg mb-4">
                <strong>Emergency thermal assessment available 24/7</strong>
              </p>
              <p className="text-sm text-gray-600">
                Professional grade equipment and IICRC certified assessment throughout Brisbane metro area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Professional Thermal Imaging Assessment
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get accurate moisture detection and comprehensive water damage assessment
            from IICRC certified Master Restorer Phill McGurk. Professional thermal imaging
            services available 24/7 throughout Brisbane.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Thermometer className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-bold mb-2">Professional Assessment</h3>
              <p>FLIR thermal cameras & precision equipment</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Award className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">IICRC Certified</h3>
              <p>Master Restorer level expertise</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <FileText className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
              <p>Professional documentation for insurance</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[ASSESSMENT_NUMBER]">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-4 mr-4">
                📞 Book Thermal Assessment
              </Button>
            </Link>
            <Link href="/emergency">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                Emergency Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <h2 className="text-3xl font-bold mb-12">
              Technical Resources & Guides
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Thermal Imaging Guide for Property Owners
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to understanding thermal imaging technology and moisture detection for water damage assessment.
                </p>
                <Button className="w-full">Download Technical Guide</Button>
              </Card>

              <Card className="p-6">
                <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  IICRC S500 Assessment Checklist
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional checklist based on IICRC standards for water damage assessment and documentation.
                </p>
                <Button className="w-full">Download Checklist</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}