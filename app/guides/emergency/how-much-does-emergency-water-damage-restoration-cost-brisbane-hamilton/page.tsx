import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Much Does Emergency Water Damage Restoration Cost in Brisbane Hamilton Ascot 2024',
  description: 'Emergency water damage restoration costs in Brisbane Hamilton $2,200-$35,000. Get instant quotes from Master Restorer Phill McGurk. Insurance covers most damage. Call 24/7 for Hamilton, Ascot, New Farm water emergencies.',
  keywords: 'emergency water damage restoration cost Brisbane Hamilton, water damage repair cost Ascot, emergency flood restoration price New Farm, Brisbane water damage restoration pricing 2024'
};

export default function EmergencyWaterDamageRestorationCostBrisbaneHamiltonPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <DollarSign className="h-16 w-16 mx-auto mb-6 text-green-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Emergency Water Damage Restoration Costs Brisbane Hamilton Ascot 2024
            </h1>
            <p className="text-xl mb-8">
              Complete cost breakdown for emergency water damage restoration in Brisbane's premium suburbs.
              Get transparent pricing from Queensland Master Restorer Phill McGurk covering Hamilton, Ascot, New Farm, and Bulimba.
            </p>
            <div className="bg-green-600 p-4 rounded-lg inline-block">
              <p className="text-xl font-bold">
                💡 Most water damage is insurance covered - you typically only pay your excess ($500-$2,500)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Pricing Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Water Damage Restoration Costs Brisbane Hamilton Area
          </h2>

          <div className="max-w-6xl mx-auto">
            {/* Immediate Response Costs */}
            <Card className="p-8 mb-8 border-l-4 border-l-red-600">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
                <h3 className="text-2xl font-bold text-red-800">
                  Emergency Response Costs (Available 24/7 in Hamilton)
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">Emergency Callout</h4>
                  <p className="text-3xl font-bold text-red-600 mb-2">$350</p>
                  <ul className="text-sm space-y-1">
                    <li>• 24/7 availability</li>
                    <li>• 60-90 min response Hamilton</li>
                    <li>• Initial assessment</li>
                    <li>• Emergency advice</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">Emergency Water Extraction</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$450-$850</p>
                  <ul className="text-sm space-y-1">
                    <li>• Professional extraction equipment</li>
                    <li>• Standing water removal</li>
                    <li>• Carpet water extraction</li>
                    <li>• Initial moisture assessment</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">Emergency Drying Setup</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">$1,200-$2,400</p>
                  <ul className="text-sm space-y-1">
                    <li>• Industrial dehumidifiers</li>
                    <li>• High-velocity air movers</li>
                    <li>• Moisture monitoring equipment</li>
                    <li>• 3-5 day equipment rental</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-center text-lg">
                  <strong>Minimum Emergency Response Cost Hamilton/Ascot:</strong>
                  <span className="text-2xl font-bold text-yellow-800 ml-2">$2,200</span>
                  <span className="text-sm block mt-2">(Includes callout, extraction, and initial drying setup)</span>
                </p>
              </div>
            </Card>

            {/* Complete Restoration Costs by Damage Level */}
            <Card className="p-8 mb-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">
                Complete Water Damage Restoration Costs Brisbane Premium Suburbs
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Minor Water Damage */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-green-800 mb-4">
                      Minor Water Damage (Single Room)
                    </h4>
                    <p className="text-3xl font-bold text-green-600 mb-4">$2,200 - $4,500</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">Typical Scenarios:</p>
                        <ul className="text-sm list-disc list-inside">
                          <li>Washing machine overflow</li>
                          <li>Dishwasher leak</li>
                          <li>Toilet overflow (clean water)</li>
                          <li>Small pipe leak under sink</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold">Includes:</p>
                        <ul className="text-sm list-disc list-inside">
                          <li>Water extraction</li>
                          <li>Drying equipment 3-5 days</li>
                          <li>Carpet cleaning/drying</li>
                          <li>Minor wall/floor drying</li>
                          <li>Moisture monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Moderate Water Damage */}
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-yellow-800 mb-4">
                      Moderate Water Damage (Multiple Rooms)
                    </h4>
                    <p className="text-3xl font-bold text-yellow-600 mb-4">$4,500 - $12,000</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">Typical Scenarios:</p>
                        <ul className="text-sm list-disc list-inside">
                          <li>Burst pipe in wall</li>
                          <li>Hot water system failure</li>
                          <li>Bathroom leak to rooms below</li>
                          <li>Storm water entry</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold">Includes:</p>
                        <ul className="text-sm list-disc list-inside">
                          <li>Multi-room water extraction</li>
                          <li>Wall cavity drying</li>
                          <li>Carpet replacement if needed</li>
                          <li>Drywall/plaster repairs</li>
                          <li>Extended equipment rental</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Major Water Damage */}
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-red-800 mb-4">
                    Major Water Damage (Whole House/Ceiling Collapse)
                  </h4>
                  <p className="text-3xl font-bold text-red-600 mb-4">$12,000 - $50,000+</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold mb-2">Typical Scenarios:</p>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        <li>Major pipe burst flooding house</li>
                        <li>Ceiling collapse from water damage</li>
                        <li>Storm flooding through roof</li>
                        <li>Sewer backup contamination</li>
                        <li>Multi-story water damage</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Comprehensive Restoration:</p>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        <li>Structural drying and repairs</li>
                        <li>Ceiling/wall reconstruction</li>
                        <li>Flooring replacement</li>
                        <li>Electrical system inspection</li>
                        <li>Content pack-out and storage</li>
                        <li>Mould prevention treatment</li>
                        <li>Complete property restoration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Hamilton/Ascot Premium Property Considerations */}
            <Card className="p-8 mb-8 border-l-4 border-l-purple-600">
              <h3 className="text-2xl font-bold mb-6 text-purple-800">
                Hamilton & Ascot Premium Property Considerations
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-3">Premium Finishes & Materials</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Heritage timber flooring restoration: +$150-$300/sqm</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Marble/stone surface restoration: +$200-$500/sqm</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Custom millwork/joinery: +$500-$2,000/item</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Antique/artwork restoration: Quote on assessment</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">High-Value Property Services</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>White glove content pack-out service</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Climate-controlled content storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Specialist restoration craftspeople</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>Coordination with heritage consultants</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Insurance Coverage Information */}
            <Card className="p-8 border-l-4 border-l-green-600">
              <h3 className="text-2xl font-bold mb-6 text-green-800">
                Insurance Coverage for Hamilton & Ascot Properties
              </h3>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-green-800 mb-3">
                    What's Typically Covered (Hamilton High-Value Policies)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Sudden pipe bursts</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Hot water system failures</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Storm water damage</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Appliance leaks/overflows</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Emergency accommodation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Content restoration/replacement</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Additional living expenses</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span>Professional cleaning/restoration</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-800">Standard Excess</h4>
                    <p className="text-2xl font-bold text-blue-600">$500-$1,000</p>
                    <p className="text-sm">Most Brisbane policies</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-bold text-purple-800">High-Value Excess</h4>
                    <p className="text-2xl font-bold text-purple-600">$1,000-$2,500</p>
                    <p className="text-sm">Hamilton/Ascot properties</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-bold text-green-800">Your Cost</h4>
                    <p className="text-2xl font-bold text-green-600">Excess Only</p>
                    <p className="text-sm">We bill insurance directly</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Emergency Water Damage? Get Help Now
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't let water damage costs spiral out of control. Call Queensland Master Restorer Phill McGurk
            for immediate response in Hamilton, Ascot, New Farm, and all Brisbane premium suburbs.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">24/7 Emergency Response</h3>
              <p>On-site within 60-90 minutes Hamilton</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Master Restorer Certified</h3>
              <p>Limited number in Queensland</p>
            </div>
            <div className="text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Insurance Direct Billing</h3>
              <p>You only pay your excess</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/emergency">
              <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 text-xl px-8 py-4 mr-4">
                Call Emergency Line Now
              </Button>
            </Link>
            <Link href="/book-service">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-red-900">
                Get Free Quote Online
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Related Emergency Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Emergency Checklist</h3>
              <p className="mb-4">What to do immediately when water damage occurs</p>
              <Link href="/emergency/checklists/water-damage">
                <Button variant="outline">View Checklist</Button>
              </Link>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Insurance Claims Guide</h3>
              <p className="mb-4">How to document and claim water damage</p>
              <Link href="/guides/insurance/document-water-damage-insurance">
                <Button variant="outline">Read Guide</Button>
              </Link>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3">Hamilton Service Area</h3>
              <p className="mb-4">All suburbs covered by our emergency service</p>
              <Link href="/locations/brisbane/hamilton">
                <Button variant="outline">View Coverage</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}