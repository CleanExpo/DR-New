import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Phone, Clock, FileText, Star, DollarSign, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RACQ Approved Water Damage Restoration Contractor Brisbane | Master Restorer Phill McGurk',
  description: 'RACQ approved Master Restorer for water damage restoration Brisbane. Direct billing available. Emergency response 24/7. IICRC certified contractor for RACQ insurance claims Hamilton, Ascot, Ipswich.',
  keywords: 'RACQ approved water damage restoration Brisbane, RACQ insurance water damage contractor, RACQ preferred restoration company Queensland, emergency water damage RACQ claim Brisbane'
};

export default function RACQApprovedWaterDamageRestorationContractorBrisbanePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center mb-6">
              <Shield className="h-16 w-16 mr-4 text-yellow-400" />
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-xl">
                RACQ APPROVED
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              RACQ Approved Water Damage Restoration
              <span className="block text-yellow-400">Master Restorer Brisbane</span>
            </h1>
            <p className="text-xl mb-8">
              RACQ insurance claim? Get immediate help from Master Restorer Phill McGurk.
              RACQ approved contractor with direct billing available.
              Emergency response 24/7 throughout Brisbane, Hamilton, Ascot, and Ipswich.
            </p>

            <div className="bg-red-600 p-6 rounded-lg inline-block mb-8">
              <p className="text-2xl font-bold mb-2">🚨 RACQ EMERGENCY CLAIMS LINE</p>
              <p className="text-xl">[Emergency Number]</p>
              <p className="text-lg">Quote your RACQ claim number for priority response</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Shield className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">RACQ Approved</p>
                <p className="text-sm">Direct billing available</p>
              </div>
              <div>
                <Award className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">Master Restorer</p>
                <p className="text-sm">IICRC Certified Expert</p>
              </div>
              <div>
                <Clock className="h-10 w-10 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold">24/7 Emergency</p>
                <p className="text-sm">60-min response Brisbane</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RACQ Claims Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Streamlined RACQ Water Damage Claims Process
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 border-l-4 border-l-blue-600">
                <h3 className="text-2xl font-bold mb-4 text-blue-800">
                  Already Lodged Your RACQ Claim?
                </h3>
                <p className="text-lg mb-4">
                  If you've already contacted RACQ about your water damage, we can work directly
                  with your claim. As an approved contractor, we streamline the entire process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Provide your RACQ claim number when calling</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>We coordinate directly with RACQ assessors</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Direct billing arrangement available</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>You typically only pay your excess</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="font-bold text-blue-800">
                    Call us with your RACQ claim number: [Emergency Number]
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-l-4 border-l-green-600">
                <h3 className="text-2xl font-bold mb-4 text-green-800">
                  Haven't Contacted RACQ Yet?
                </h3>
                <p className="text-lg mb-4">
                  If water damage just occurred, call us first for emergency response,
                  then we'll help you lodge your RACQ claim correctly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Emergency response within 60 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Immediate damage mitigation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Professional documentation for RACQ</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>Assistance with claim lodgement</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="font-bold text-green-800">
                    Emergency first, claim second: [Emergency Number]
                  </p>
                </div>
              </Card>
            </div>

            {/* Step-by-step process */}
            <Card className="p-8 bg-gray-50">
              <h3 className="text-2xl font-bold text-center mb-8">
                Your RACQ Water Damage Claim Journey
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                  <h4 className="font-bold mb-2">Emergency Call</h4>
                  <p className="text-sm">Call our RACQ emergency line immediately. Water damage spreads rapidly.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                  <h4 className="font-bold mb-2">Immediate Response</h4>
                  <p className="text-sm">Master Restorer on-site within 60 minutes for damage assessment and mitigation.</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                  <h4 className="font-bold mb-2">RACQ Coordination</h4>
                  <p className="text-sm">We handle all RACQ communication, documentation, and assessor coordination.</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                  <h4 className="font-bold mb-2">Complete Restoration</h4>
                  <p className="text-sm">Full restoration with direct RACQ billing. You pay only your excess.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* RACQ Coverage Areas */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              RACQ Approved Service Coverage - Queensland
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Brisbane Metro</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Brisbane CBD & Inner City</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Hamilton & Ascot</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>New Farm & Bulimba</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Toowong & Paddington</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>All Brisbane suburbs</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-800">Ipswich Region</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Ipswich CBD</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Karalee & Brookwater</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Springfield Lakes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Augustine Heights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>All Ipswich areas</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-800">Logan & South</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Logan Central</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Springwood</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Shailer Park</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Daisy Hill</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>All Logan suburbs</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-lg mb-4">
                <strong>RACQ Members:</strong> Priority emergency response throughout our service area
              </p>
              <p className="text-sm text-gray-600">
                Not sure if we cover your area? Call with your RACQ claim number for immediate confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RACQ Billing & Costs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              RACQ Direct Billing & Cost Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-l-4 border-l-green-600">
                <DollarSign className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-green-800">Direct Billing Available</h3>
                <p className="text-lg mb-4">
                  As a RACQ approved contractor, we can arrange direct billing with RACQ,
                  meaning you typically only pay your policy excess.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>No upfront payment required (in most cases)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>We bill RACQ directly</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>You pay only your policy excess</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Transparent cost breakdown provided</span>
                  </li>
                </ul>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-800">
                    Most RACQ excesses: $500 - $2,500 depending on your policy
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-l-4 border-l-blue-600">
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-blue-800">Documentation & Reporting</h3>
                <p className="text-lg mb-4">
                  Master Restorer-level documentation ensures your RACQ claim is processed
                  quickly and without issues.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Professional damage assessment reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Detailed restoration scope of works</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Progress photography and documentation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Compliance with RACQ requirements</span>
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-800">
                    IICRC certified documentation meets all RACQ standards
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Common RACQ Water Damage Scenarios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common RACQ Water Damage Claims We Handle
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-blue-800">
                  Burst Pipes & Plumbing Failures
                </h3>
                <p className="text-sm mb-3">
                  Sudden burst pipes, hot water system failures, and appliance leaks
                  are typically covered by RACQ policies.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Internal pipe bursts</li>
                  <li>• Hot water system failure</li>
                  <li>• Washing machine/dishwasher leaks</li>
                  <li>• Toilet overflow (clean water)</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-green-800">
                  Storm & Weather Damage
                </h3>
                <p className="text-sm mb-3">
                  Brisbane storms can cause significant water entry through
                  roofs, windows, and doors.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Roof damage water entry</li>
                  <li>• Window/door seal failure</li>
                  <li>• Gutter overflow damage</li>
                  <li>• Hail damage water penetration</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-purple-800">
                  Accidental Water Damage
                </h3>
                <p className="text-sm mb-3">
                  Accidental damage from bathroom overflows, shower seal
                  failures, and similar incidents.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Bathroom flooding</li>
                  <li>• Shower screen/seal failure</li>
                  <li>• Bath overflow</li>
                  <li>• Kitchen sink overflow</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-red-800">
                  Ceiling Water Damage
                </h3>
                <p className="text-sm mb-3">
                  Water damage from above affecting ceilings, walls,
                  and contents below.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Ceiling collapse from water</li>
                  <li>• Upstairs bathroom leaks</li>
                  <li>• Roof leak ceiling damage</li>
                  <li>• Air conditioning leaks</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-orange-800">
                  Commercial Water Damage
                </h3>
                <p className="text-sm mb-3">
                  RACQ business policies cover commercial water damage
                  across various property types.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Office water damage</li>
                  <li>• Retail store flooding</li>
                  <li>• Restaurant water incidents</li>
                  <li>• Warehouse flooding</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3 text-teal-800">
                  Heritage & High-Value Properties
                </h3>
                <p className="text-sm mb-3">
                  Specialized restoration for Hamilton, Ascot heritage
                  homes and high-value properties.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Heritage home restoration</li>
                  <li>• Antique/artwork protection</li>
                  <li>• Period feature preservation</li>
                  <li>• High-value content restoration</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            RACQ Water Damage Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't let water damage costs spiral out of control. Call RACQ approved Master Restorer Phill McGurk
            for immediate response with direct billing available.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">RACQ Emergency Line</h3>
              <p className="text-3xl font-bold mb-2">[Emergency Number]</p>
              <p>Have your RACQ claim number ready</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Clock className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Response Time</h3>
              <p className="text-3xl font-bold mb-2">60 Minutes</p>
              <p>Brisbane • Hamilton • Ascot • Ipswich</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="tel:[EMERGENCY_NUMBER]">
              <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 text-2xl px-12 py-6 mr-4">
                📞 Call RACQ Emergency Line
              </Button>
            </Link>
            <Link href="/insurance/racq">
              <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-white text-white hover:bg-white hover:text-blue-700">
                RACQ Claims Information
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              RACQ Water Damage Claims FAQ
            </h2>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Do I need to call RACQ before calling you?</h3>
                <p>For emergencies, call us first to prevent further damage, then contact RACQ. We can assist with your claim lodgement and will coordinate with RACQ assessors.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">How does direct billing with RACQ work?</h3>
                <p>Once your claim is approved, we can arrange direct billing with RACQ. You'll typically only pay your policy excess, and we handle all billing directly with RACQ.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">What if RACQ wants their own quotes?</h3>
                <p>As an approved contractor, our quotes are typically accepted by RACQ. If additional quotes are required, we coordinate this process to minimize delays.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Are you available for emergency response on weekends?</h3>
                <p>Yes, our RACQ emergency line operates 24/7, including weekends and public holidays. Water damage requires immediate response regardless of the time.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}