import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Laptop, Wind, Brain, CheckCircle, Phone, Clock, AlertTriangle, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Work From Home Air Quality Solutions Brisbane | Home Office Ventilation & Testing',
  description: 'Improve your home office air quality Brisbane. Professional testing, air purification, and ventilation solutions for work-from-home environments. Boost productivity, reduce fatigue, improve health.',
  keywords: 'work from home air quality Brisbane, home office ventilation solutions Brisbane, home workspace air purification systems Brisbane, residential office air quality testing Brisbane'
};

export default function WorkFromHomeAirQualityBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Home className="h-16 w-16 mr-4 text-purple-400" />
              <Laptop className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Work From Home Air Quality Solutions
              <span className="block text-purple-400">Brisbane Home Office Specialists</span>
            </h1>
            <p className="text-xl mb-8">
              Transform your home workspace with professional air quality solutions.
              Boost productivity, reduce fatigue, and protect your health with expert
              assessment, purification, and ventilation systems for Brisbane work-from-home professionals.
            </p>

            <div className="bg-green-600 p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">🏠 HOME OFFICE AIR ASSESSMENT</p>
              <p className="text-xl">[Home Office Air Line]</p>
              <p className="text-lg">Comprehensive Testing • Same Day Results</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Wind className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                <p className="font-bold">Air Quality Testing</p>
                <p className="text-sm">Professional assessment</p>
              </div>
              <div>
                <Brain className="h-10 w-10 mx-auto mb-2 text-purple-400" />
                <p className="font-bold">Productivity Boost</p>
                <p className="text-sm">Better air = better performance</p>
              </div>
              <div>
                <Home className="h-10 w-10 mx-auto mb-2 text-green-400" />
                <p className="font-bold">Custom Solutions</p>
                <p className="text-sm">Tailored to your space</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The WFH Air Quality Problem */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Hidden Cost of Poor Home Office Air Quality
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Brisbane WFH Air Quality Crisis</h3>
                <p className="text-lg mb-4">
                  Since COVID-19, millions of Brisbane professionals work from home. Many converted bedrooms,
                  living rooms, or garages into offices without considering air quality impacts.
                  Poor home office air reduces productivity by up to 15%.
                </p>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 text-red-800">Common WFH Air Quality Problems:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Poor ventilation in converted spaces</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>CO2 buildup from extended occupation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Electronic equipment off-gassing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Furniture and carpet emissions</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span>Printer and office supply fumes</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8">
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Productivity & Health Impact</h3>
                <p className="text-lg mb-4">
                  Research shows home office air quality directly affects cognitive function,
                  energy levels, and long-term health. Brisbane's climate compounds these issues
                  with humidity and poor ventilation.
                </p>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-orange-800">Immediate Symptoms:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Afternoon fatigue and brain fog</li>
                      <li>• Headaches during long work sessions</li>
                      <li>• Eye strain and dryness</li>
                      <li>• Difficulty concentrating</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800">Productivity Impact:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 15% reduction in cognitive performance</li>
                      <li>• Slower decision-making abilities</li>
                      <li>• Increased errors and mistakes</li>
                      <li>• Reduced creative thinking</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* CO2 Levels Info */}
            <Card className="p-8 bg-yellow-50">
              <h3 className="text-2xl font-bold text-center mb-6 text-yellow-800">
                CO2 Levels: The Hidden Productivity Killer
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="text-xl font-bold text-green-800">350-400 ppm</h4>
                  <p className="text-sm">Outdoor air (baseline)</p>
                  <p className="text-xs text-green-700">Optimal cognitive function</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h4 className="text-xl font-bold text-yellow-800">400-1000 ppm</h4>
                  <p className="text-sm">Acceptable indoor levels</p>
                  <p className="text-xs text-yellow-700">Good productivity</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                  <h4 className="text-xl font-bold text-orange-800">1000-2000 ppm</h4>
                  <p className="text-sm">Poor ventilation</p>
                  <p className="text-xs text-orange-700">15% productivity loss</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <h4 className="text-xl font-bold text-red-800">2000+ ppm</h4>
                  <p className="text-sm">Drowsiness zone</p>
                  <p className="text-xs text-red-700">Severe impairment</p>
                </div>
              </div>
              <p className="text-center mt-6 text-lg">
                <strong>Most Brisbane home offices measure 1500-3000 ppm during work hours</strong>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Assessment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Professional Home Office Air Quality Assessment
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Wind className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Comprehensive Air Testing</h3>
                <p className="text-lg mb-4">
                  Our home office air quality assessment measures all factors affecting your
                  productivity and health. Real-time monitoring during typical work hours
                  provides accurate baseline data.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>CO2 levels during work hours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>VOCs from equipment and furniture</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Particulate matter and allergens</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Humidity and temperature monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Ventilation effectiveness analysis</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <Laptop className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Productivity-Focused Analysis</h3>
                <p className="text-lg mb-4">
                  We correlate air quality data with productivity metrics, identifying
                  specific times and conditions when your home office environment
                  impacts your work performance.
                </p>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-purple-800">What We Measure:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Peak CO2 times vs energy dips</li>
                      <li>• VOC sources affecting concentration</li>
                      <li>• Optimal temperature/humidity ranges</li>
                      <li>• Air circulation effectiveness</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800">Productivity Correlation:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Best performance air quality conditions</li>
                      <li>• Times when air quality impacts focus</li>
                      <li>• Recommended break and ventilation schedules</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Assessment Packages */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-l-4 border-l-blue-600">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Basic Home Office Test</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">$350</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• 4-hour CO2 monitoring</li>
                  <li>• Basic VOC screening</li>
                  <li>• Temperature/humidity check</li>
                  <li>• Simple recommendations</li>
                  <li>• Email report</li>
                </ul>
                <Button className="w-full">Book Basic Test</Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-600 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold mb-3 text-green-800">Professional WFH Analysis</h3>
                <p className="text-3xl font-bold text-green-600 mb-4">$650</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Full day monitoring (8 hours)</li>
                  <li>• Comprehensive air quality panel</li>
                  <li>• Productivity correlation analysis</li>
                  <li>• Custom solution recommendations</li>
                  <li>• Detailed consultation report</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Book Professional</Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-600">
                <h3 className="text-xl font-bold mb-3 text-purple-800">Complete Workspace Optimization</h3>
                <p className="text-3xl font-bold text-purple-600 mb-4">$950</p>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Multi-day monitoring study</li>
                  <li>• Equipment and furniture testing</li>
                  <li>• Ventilation system assessment</li>
                  <li>• Custom air purification design</li>
                  <li>• 3-month follow-up included</li>
                </ul>
                <Button className="w-full">Book Complete Package</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions for WFH */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Proven Home Office Air Quality Solutions
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <Wind className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Ventilation & Air Circulation</h3>
                <p className="text-lg mb-4">
                  Proper ventilation is crucial for home offices. We design systems that maintain
                  optimal CO2 levels and air circulation without noise disruption to your work.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 text-green-800">Ventilation Solutions:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Silent mechanical ventilation systems</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Smart automated window openers</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Heat recovery ventilation (HRV)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Ceiling fans with air purification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span>Positive pressure systems</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8">
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Air Purification Systems</h3>
                <p className="text-lg mb-4">
                  Advanced air purification removes pollutants while maintaining quiet operation
                  essential for video calls and concentration. Systems designed specifically
                  for home office environments.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800">Desktop Air Purifiers:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Silent operation (&lt;30dB)</li>
                      <li>• HEPA + activated carbon filters</li>
                      <li>• Personal air quality zones</li>
                      <li>• USB-powered compact units</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-purple-800">Room Air Purification:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Whole room coverage systems</li>
                      <li>• VOC-specific carbon filters</li>
                      <li>• Smart air quality monitoring</li>
                      <li>• Integration with HVAC systems</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Smart Monitoring */}
            <Card className="p-8 bg-purple-50">
              <h3 className="text-2xl font-bold text-center mb-6 text-purple-800">
                Smart Air Quality Monitoring for WFH Productivity
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Laptop className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                  <h4 className="text-xl font-bold mb-2">Real-Time Monitoring</h4>
                  <p className="text-sm">
                    Desktop air quality monitors with smartphone alerts.
                    Track CO2, VOCs, and productivity correlation in real-time.
                  </p>
                </div>
                <div className="text-center">
                  <Wind className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2">Automated Response</h4>
                  <p className="text-sm">
                    Smart systems that automatically increase ventilation
                    or activate purification when air quality declines.
                  </p>
                </div>
                <div className="text-center">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h4 className="text-xl font-bold mb-2">Productivity Analytics</h4>
                  <p className="text-sm">
                    Track your most productive air quality conditions
                    and receive optimization recommendations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Common WFH Scenarios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Brisbane Work-From-Home Setups
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Converted Bedroom Office</h3>
                <p className="text-sm mb-3">
                  Most common Brisbane WFH setup. Often lacks adequate ventilation,
                  leading to CO2 buildup and poor air circulation.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-700">Common Issues:</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Single window limited ventilation</li>
                    <li>• High CO2 levels (2000+ ppm)</li>
                    <li>• Furniture and carpet off-gassing</li>
                    <li>• Poor air circulation</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-green-800">Living Room Workspace</h3>
                <p className="text-sm mb-3">
                  Open-plan areas with better natural ventilation but contamination
                  from cooking, cleaning products, and family activities.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-700">Challenges:</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Kitchen cooking fumes and odours</li>
                    <li>• Cleaning product VOCs</li>
                    <li>• Variable air quality throughout day</li>
                    <li>• Noise from ventilation systems</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-purple-800">Garage Conversion Office</h3>
                <p className="text-sm mb-3">
                  Popular in Brisbane for extra space. Often poor insulation,
                  ventilation, and lingering chemical contamination.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-purple-700">Major Concerns:</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Previous automotive chemical exposure</li>
                    <li>• Poor thermal control affecting air quality</li>
                    <li>• Concrete floor moisture issues</li>
                    <li>• Inadequate ventilation systems</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-red-800">Study/Den Conversion</h3>
                <p className="text-sm mb-3">
                  Small enclosed spaces that quickly accumulate CO2 and VOCs.
                  Often windowless or with minimal ventilation.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-red-700">Key Problems:</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Rapid CO2 accumulation</li>
                    <li>• Limited or no natural ventilation</li>
                    <li>• High equipment density</li>
                    <li>• Poor air circulation</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-orange-800">Granny Flat Office</h3>
                <p className="text-sm mb-3">
                  Separate structures often with minimal HVAC systems.
                  Can have excellent potential with proper air quality setup.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-orange-700">Opportunities:</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Isolated from household contaminants</li>
                    <li>• Potential for dedicated HVAC systems</li>
                    <li>• Fresh air access with proper design</li>
                    <li>• Customizable air quality solutions</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-teal-800">Apartment Balcony Office</h3>
                <p className="text-sm mb-3">
                  Enclosed balconies popular in Brisbane units. Glass walls
                  create greenhouse effect and air quality challenges.
                </p>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-teal-700">Unique Issues:</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Extreme temperature fluctuations</li>
                    <li>• Solar heat affecting air quality</li>
                    <li>• Limited ventilation options</li>
                    <li>• External pollution infiltration</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Work-From-Home Air Quality Service Areas
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Brisbane Inner City</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Home className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Brisbane CBD apartments</span>
                  </li>
                  <li className="flex items-center">
                    <Home className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Hamilton waterfront homes</span>
                  </li>
                  <li className="flex items-center">
                    <Home className="h-4 w-4 text-blue-600 mr-2" />
                    <span>New Farm converted spaces</span>
                  </li>
                  <li className="flex items-center">
                    <Home className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Ascot heritage home offices</span>
                  </li>
                  <li className="flex items-center">
                    <Home className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Toowong professional setups</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-800">Brisbane Suburbs</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    <span>Coorparoo family homes</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    <span>Carindale converted garages</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    <span>Chermside granny flats</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    <span>Aspley home offices</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    <span>All Brisbane metro areas</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Growth Corridors</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Laptop className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Ipswich new developments</span>
                  </li>
                  <li className="flex items-center">
                    <Laptop className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Springfield Lakes estates</span>
                  </li>
                  <li className="flex items-center">
                    <Laptop className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Logan growth areas</span>
                  </li>
                  <li className="flex items-center">
                    <Laptop className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Caboolture corridor</span>
                  </li>
                  <li className="flex items-center">
                    <Laptop className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Gold Coast hinterland</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-lg mb-4">
                <strong>Home office assessments available 7 days a week</strong>
              </p>
              <p className="text-sm text-gray-600">
                Flexible scheduling to accommodate your work-from-home routine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Transform Your Home Office Air Quality
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Boost your productivity and protect your health with professional work-from-home
            air quality solutions. Assessment, testing, and custom systems for Brisbane
            remote workers and home-based professionals.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">WFH Air Quality Line</h3>
              <p className="text-3xl font-bold mb-2">[WFH Air Line]</p>
              <p>Productivity-focused assessments</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Clock className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-3xl font-bold mb-2">7 Days</p>
              <p>Around your work schedule</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[WFH_AIR_LINE]">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-xl px-8 py-4 mr-4">
                🏠 Book Home Office Assessment
              </Button>
            </Link>
            <Link href="/book-service">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-purple-700">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Productivity Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
              Proven Results: Better Air = Better Work
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">23%</div>
                <p className="text-lg font-semibold">Productivity Increase</p>
                <p className="text-sm text-gray-600">
                  Average improvement in cognitive performance with optimized air quality
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">67%</div>
                <p className="text-lg font-semibold">Reduction in Fatigue</p>
                <p className="text-sm text-gray-600">
                  Fewer afternoon energy crashes with proper ventilation
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
                <p className="text-lg font-semibold">Fewer Sick Days</p>
                <p className="text-sm text-gray-600">
                  Improved indoor air quality reduces respiratory issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}