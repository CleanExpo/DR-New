import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, Shield, Wind, CheckCircle, Phone, Clock, Award, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commercial Air Quality Restoration Brisbane | Office Building Air Testing & Improvement',
  description: 'Professional commercial air quality restoration Brisbane CBD. Office building air testing, restaurant ventilation, retail air purification. NATA accredited workplace air quality compliance specialists.',
  keywords: 'commercial air quality testing Brisbane, office building air restoration Brisbane, restaurant air quality improvement Brisbane, retail store air purification Brisbane, workplace air quality compliance Brisbane'
};

export default function CommercialAirQualityRestorationBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <div className="flex justify-centre items-centre mb-6">
              <Building className="h-16 w-16 mr-4 text-blue-400" />
              <Shield className="h-16 w-16 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Commercial Air Quality Restoration
              <span className="block text-blue-400">Brisbane Business Specialists</span>
            </h1>
            <p className="text-xl mb-8">
              Protect employees, customers, and your business reputation with professional
              commercial air quality testing, restoration, and ongoing management.
              NATA accredited services for Brisbane CBD, retail, hospitality, healthcare, and industrial facilities.
            </p>

            <div className="bg-red-600 p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">🏢 COMMERCIAL AIR EMERGENCY</p>
              <p className="text-xl">[Commercial Air Line]</p>
              <p className="text-lg">24/7 • NATA Accredited • Compliance Specialists</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-centre">
              <div>
                <Award className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                <p className="font-bold">NATA Accredited</p>
                <p className="text-sm">Certified testing lab</p>
              </div>
              <div>
                <Users className="h-10 w-10 mx-auto mb-2 text-green-400" />
                <p className="font-bold">Employee Safety</p>
                <p className="text-sm">Workplace compliance</p>
              </div>
              <div>
                <Building className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">All Industries</p>
                <p className="text-sm">Custom solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Air Quality Crisis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              The Commercial Air Quality Crisis in Brisbane
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Hidden Business Costs</h3>
                <p className="text-lg mb-4">
                  Poor commercial air quality costs Brisbane businesses millions annually through
                  reduced productivity, increased sick leave, employee turnover, and legal liability.
                  Many business owners are unaware of the scope of their air quality problems.
                </p>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 text-red-800">Business Impact:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>15-20% reduction in employee productivity</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>35% increase in sick leave usage</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Higher employee turnover rates</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Potential legal liability exposure</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Damage to company reputation</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8">
                <Building className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Brisbane Commercial Challenges</h3>
                <p className="text-lg mb-4">
                  Brisbane's subtropical climate creates unique commercial air quality challenges.
                  High humidity, temperature fluctuations, and older building stock contribute
                  to complex indoor air quality issues requiring specialised expertise.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800">Common Problems:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Mould growth in HVAC systems</li>
                      <li>• Poor ventilation in older buildings</li>
                      <li>• Chemical contamination from renovations</li>
                      <li>• Cross-contamination between tenancies</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-800">Regulatory Requirements:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Work Health & Safety Act compliance</li>
                      <li>• Building Code of Australia standards</li>
                      <li>• Industry-specific regulations</li>
                      <li>• Duty of care obligations</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Industry Statistics */}
            <Card className="p-8 bg-yellow-50">
              <h3 className="text-2xl font-bold text-centre mb-6 text-yellow-800">
                Commercial Air Quality Impact Statistics
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-centre">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">$2.3B</div>
                  <p className="text-sm font-semibold">Annual cost to Australian businesses</p>
                  <p className="text-xs text-gray-600">Lost productivity from poor air quality</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">67%</div>
                  <p className="text-sm font-semibold">Brisbane office buildings</p>
                  <p className="text-xs text-gray-600">Have poor indoor air quality</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
                  <p className="text-sm font-semibold">Employee satisfaction increase</p>
                  <p className="text-xs text-gray-600">After air quality improvement</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">43%</div>
                  <p className="text-sm font-semibold">Reduction in sick leave</p>
                  <p className="text-xs text-gray-600">With professional air management</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Brisbane Commercial Industries We Serve
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <Building className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-blue-800">Office Buildings & Corporate</h3>
                <p className="text-sm mb-3">
                  High-rise offices, corporate headquarters, coworking spaces, and business centres
                  throughout Brisbane CBD and suburban office parks.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Multi-tenancy buildings</li>
                  <li>• Executive suites and boardrooms</li>
                  <li>• Open-plan offices</li>
                  <li>• Call centres and customer service</li>
                  <li>• Legal and accounting firms</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-green-800">Healthcare Facilities</h3>
                <p className="text-sm mb-3">
                  Hospitals, medical centres, dental practices, aged care facilities,
                  and allied health clinics requiring strict air quality standards.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Operating theatres and clean rooms</li>
                  <li>• Patient wards and waiting areas</li>
                  <li>• Dental surgeries and clinics</li>
                  <li>• Pathology and radiology</li>
                  <li>• Aged care and nursing homes</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-purple-800">Educational Institutions</h3>
                <p className="text-sm mb-3">
                  Schools, universities, TAFE colleges, childcare centres, and training
                  facilities where air quality directly impacts learning outcomes.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Classrooms and lecture theatres</li>
                  <li>• Libraries and study areas</li>
                  <li>• Childcare centres and kindergartens</li>
                  <li>• Laboratories and workshops</li>
                  <li>• Staff rooms and administration</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Wind className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-orange-800">Retail & Hospitality</h3>
                <p className="text-sm mb-3">
                  Shopping centres, restaurants, hotels, entertainment venues,
                  and retail stores where customer experience depends on air quality.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Shopping centres and department stores</li>
                  <li>• Restaurants, cafes, and bars</li>
                  <li>• Hotels and accommodation</li>
                  <li>• Gyms and fitness centres</li>
                  <li>• Entertainment and gaming venues</li>
                </ul>
              </Card>

              <Card className="p-6">
                <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-red-800">Industrial & Manufacturing</h3>
                <p className="text-sm mb-3">
                  Factories, warehouses, processing plants, and industrial facilities
                  requiring specialised air quality management and compliance.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Manufacturing plants and factories</li>
                  <li>• Warehouses and distribution centres</li>
                  <li>• Food processing facilities</li>
                  <li>• Chemical and pharmaceutical plants</li>
                  <li>• Automotive and metal working</li>
                </ul>
              </Card>

              <Card className="p-6">
                <Award className="h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-teal-800">Specialty Commercial</h3>
                <p className="text-sm mb-3">
                  Unique commercial environments with specific air quality requirements
                  including laboratories, clean rooms, and specialised facilities.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Research laboratories</li>
                  <li>• Data centres and server rooms</li>
                  <li>• Broadcasting and media facilities</li>
                  <li>• Museums and galleries</li>
                  <li>• Sports and recreation facilities</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Testing Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Comprehensive Commercial Air Quality Testing
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">NATA Accredited Testing</h3>
                <p className="text-lg mb-4">
                  Our NATA accredited laboratory testing meets all Australian standards
                  for workplace air quality assessment. Comprehensive testing protocols
                  ensure regulatory compliance and employee safety.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>VOCs and chemical contamination</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Mould and microbial assessment</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Particulate matter and allergens</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Carbon dioxide and ventilation</span>
                  </li>
                  <li className="flex items-centre">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Legionella and water system testing</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Building className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Workplace Compliance Assessment</h3>
                <p className="text-lg mb-4">
                  Ensure your Brisbane business meets all Work Health & Safety requirements
                  with comprehensive compliance testing and documentation. Protect your
                  business from liability and regulatory penalties.
                </p>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-800">Compliance Testing:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• WHS Act air quality requirements</li>
                      <li>• Industry-specific standards</li>
                      <li>• Building Code compliance</li>
                      <li>• Environmental health assessments</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800">Documentation:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Detailed compliance reports</li>
                      <li>• Risk assessment documentation</li>
                      <li>• Remediation recommendations</li>
                      <li>• Ongoing monitoring plans</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Testing Packages */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-l-4 border-l-blue-600">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Basic Workplace Assessment</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">$850</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Single zone air quality testing</li>
                  <li>• Basic VOC and mould screening</li>
                  <li>• CO2 and ventilation assessment</li>
                  <li>• Compliance report</li>
                  <li>• 5-7 day turnaround</li>
                </ul>
                <Button className="w-full">Book Basic Assessment</Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-600 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold mb-3 text-green-800">Comprehensive Commercial Audit</h3>
                <p className="text-3xl font-bold text-green-600 mb-4">$1,850</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Multi-zone comprehensive testing</li>
                  <li>• Full chemical and biological panel</li>
                  <li>• HVAC system assessment</li>
                  <li>• Employee health risk analysis</li>
                  <li>• Priority lab processing</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Book Comprehensive</Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-600">
                <h3 className="text-xl font-bold mb-3 text-purple-800">Enterprise Air Quality Program</h3>
                <p className="text-3xl font-bold text-purple-600 mb-4">$3,500+</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Whole building assessment</li>
                  <li>• Ongoing monitoring program</li>
                  <li>• Staff training and education</li>
                  <li>• Quarterly compliance reviews</li>
                  <li>• Emergency response support</li>
                </ul>
                <Button className="w-full">Book Enterprise Program</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Commercial Air Quality Restoration Solutions
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Wind className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">HVAC System optimisation</h3>
                <p className="text-lg mb-4">
                  maximise your existing HVAC investment with professional optimisation,
                  cleaning, and upgrade recommendations. Improve efficiency while
                  ensuring excellent indoor air quality.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 text-blue-800">HVAC Solutions:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Duct cleaning and sanitization</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Filter upgrade and optimisation</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Ventilation rate improvements</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Smart control system integration</span>
                    </li>
                    <li className="flex items-centre">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Energy efficiency optimisation</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8">
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Commercial Air Purification</h3>
                <p className="text-lg mb-4">
                  Industrial-grade air purification systems designed for commercial environments.
                  Scalable solutions from single offices to entire buildings with
                  minimal disruption to operations.
                </p>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-800">Purification Technologies:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• HEPA filtration systems</li>
                      <li>• Activated carbon VOC removal</li>
                      <li>• UV-C germicidal treatment</li>
                      <li>• Photocatalytic oxidation</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-purple-800">Commercial Applications:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Open office environments</li>
                      <li>• Meeting rooms and boardrooms</li>
                      <li>• Reception and customer areas</li>
                      <li>• Break rooms and common areas</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Industry-Specific Solutions */}
            <Card className="p-8 bg-purple-50">
              <h3 className="text-2xl font-bold text-centre mb-6 text-purple-800">
                Industry-Specific Air Quality Solutions
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-lg font-bold mb-3 text-blue-800">Healthcare Facilities</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Infection control air systems</li>
                    <li>• Operating theatre air quality</li>
                    <li>• Patient room ventilation</li>
                    <li>• Pharmaceutical grade filtration</li>
                    <li>• Sterilization air management</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-lg font-bold mb-3 text-green-800">Food Service & Hospitality</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Commercial kitchen ventilation</li>
                    <li>• Dining area air quality</li>
                    <li>• Grease and odour management</li>
                    <li>• Food safety air systems</li>
                    <li>• Customer comfort optimisation</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="text-lg font-bold mb-3 text-orange-800">Educational Institutions</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Classroom air quality optimisation</li>
                    <li>• Laboratory fume management</li>
                    <li>• Childcare centre air safety</li>
                    <li>• Sports facility ventilation</li>
                    <li>• Student health protection</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              24/7 Commercial Air Quality Emergency Response
            </h2>

            <Card className="p-8 bg-red-50">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-centre">
                  <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-600" />
                  <h4 className="text-xl font-bold mb-2">Chemical Incidents</h4>
                  <p className="text-sm">
                    Chemical spills, gas leaks, toxic fume exposure, or hazardous material
                    contamination requiring immediate air quality intervention.
                  </p>
                </div>
                <div className="text-centre">
                  <Building className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2">Building Emergencies</h4>
                  <p className="text-sm">
                    HVAC failures, fire damage, flooding, or sudden air quality issues
                    affecting employee safety and business operations.
                  </p>
                </div>
                <div className="text-centre">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h4 className="text-xl font-bold mb-2">Compliance Emergencies</h4>
                  <p className="text-sm">
                    Urgent compliance testing for workplace safety investigations,
                    insurance claims, or regulatory inspections.
                  </p>
                </div>
              </div>
              <div className="text-centre mt-8">
                <p className="text-lg font-bold text-red-800 mb-4">
                  Emergency Response: 60 minutes Brisbane CBD • 90 minutes metro area
                </p>
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  Call Emergency Line: [Commercial Air Emergency]
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Commercial Air Quality Service Areas
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Brisbane CBD & Inner City</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Building className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Brisbane CBD high-rise offices</span>
                  </li>
                  <li className="flex items-centre">
                    <Building className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Fortitude Valley creative precincts</span>
                  </li>
                  <li className="flex items-centre">
                    <Building className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Milton professional centres</span>
                  </li>
                  <li className="flex items-centre">
                    <Building className="h-4 w-4 text-blue-600 mr-2" />
                    <span>South Brisbane office towers</span>
                  </li>
                  <li className="flex items-centre">
                    <Building className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Spring Hill medical precinct</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-800">Industrial & Commercial Hubs</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Eagle Farm industrial</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Pinkenba freight hub</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Acacia Ridge logistics</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Northgate manufacturing</span>
                  </li>
                  <li className="flex items-centre">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Port of Brisbane facilities</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Retail & Hospitality</h3>
                <ul className="space-y-2">
                  <li className="flex items-centre">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Queen Street Mall retail</span>
                  </li>
                  <li className="flex items-centre">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Chermside & Carindale centres</span>
                  </li>
                  <li className="flex items-centre">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Airport retail and hospitality</span>
                  </li>
                  <li className="flex items-centre">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Casino and entertainment</span>
                  </li>
                  <li className="flex items-centre">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Suburban shopping centres</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-centre">
              <p className="text-lg mb-4">
                <strong>Commercial air quality services available across South East Queensland</strong>
              </p>
              <p className="text-sm text-gray-600">
                Including Brisbane, Ipswich, Logan, Gold Coast, and Sunshine Coast commercial areas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Protect Your Business with Professional Air Quality Management
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't let poor air quality impact your employees, customers, or bottom line.
            Get NATA accredited testing and commercial-grade solutions from Brisbane's
            air quality specialists.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Commercial Air Quality Line</h3>
              <p className="text-3xl font-bold mb-2">[Commercial Air Line]</p>
              <p>NATA Accredited • Business Solutions</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Clock className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Emergency Response</h3>
              <p className="text-3xl font-bold mb-2">24/7 Available</p>
              <p>Chemical incidents • Building emergencies</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[COMMERCIAL_AIR_LINE]">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-xl px-8 py-4 mr-4">
                🏢 Book Commercial Assessment
              </Button>
            </Link>
            <Link href="/book-service">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-blue-700">
                Request Enterprise Quote
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
              Related Commercial Services
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-centre">
                <Wind className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-3">
                  HVAC Duct Cleaning
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional commercial ductwork cleaning and sanitization for optimal air quality.
                </p>
                <Link href="/services/hvac/commercial-duct-cleaning-brisbane">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-3">
                  Sick Building Syndrome
                </h3>
                <p className="text-gray-600 mb-4">
                  specialised assessment and remediation for workplace health issues.
                </p>
                <Link href="/services/air-quality/sick-building-syndrome-brisbane">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </Card>

              <Card className="p-6 text-centre">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold mb-3">
                  VOC Testing & Removal
                </h3>
                <p className="text-gray-600 mb-4">
                  Chemical contamination testing and removal for commercial environments.
                </p>
                <Link href="/services/air-quality/voc-removal-testing-brisbane">
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