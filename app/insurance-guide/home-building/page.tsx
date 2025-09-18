import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Home, AlertTriangle, CheckCircle, Info, Calculator, Shield, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home & Building Insurance Guide | Australian Coverage Explained',
  description: 'Complete guide to Australian home and building insurance. Understand coverage, calculate sum insured, essential inclusions, and common exclusions.',
  keywords: ["home insurance Australia", "building insurance", "sum insured calculator", "rebuild cost", "home insurance coverage"],
};

export default function HomeBuildingInsurancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link href="/insurance-guide" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
                ← Back to Insurance Guide
              </Link>

              <h1 className="text-5xl font-bold mb-6">
                Home & Building Insurance
              </h1>

              <p className="text-xl text-blue-100">
                Comprehensive guide to understanding building insurance in Australia - what's covered,
                how to calculate the right amount, and critical features to look for.
              </p>
            </div>
          </div>
        </section>

        {/* Key Information Banner */}
        <section className="py-8 bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Important Note</h3>
                <p className="text-amber-800 text-sm">
                  This guide provides general information about home and building insurance in Australia.
                  Coverage varies significantly between insurers and policies. Always read your Product
                  Disclosure Statement (PDS) and consult with your insurer for specific details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Building Insurance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What is Building Insurance?</h2>

              <div className="prose prose-lg mb-8">
                <p>
                  Building insurance (also called home insurance) covers the structure of your home and
                  permanent fixtures. It's designed to protect your most valuable asset - your property -
                  from various risks and perils.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">What's Typically Covered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• The main dwelling structure</li>
                      <li>• Permanent fixtures (built-in wardrobes, kitchen cabinets)</li>
                      <li>• Outbuildings (garage, shed, granny flat)</li>
                      <li>• Permanent flooring (carpet, tiles, floorboards)</li>
                      <li>• Swimming pools and spas (in-ground)</li>
                      <li>• Fences, gates, and retaining walls</li>
                      <li>• Driveways and paths</li>
                      <li>• Fixed light fittings</li>
                      <li>• Plumbing and electrical wiring</li>
                      <li>• Solar panels (if owned)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">What's NOT Covered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Contents (furniture, appliances, personal items)</li>
                      <li>• Portable swimming pools/spas</li>
                      <li>• Garden plants and trees (unless fire damage)</li>
                      <li>• Lawns</li>
                      <li>• Temporary structures</li>
                      <li>• Motor vehicles</li>
                      <li>• Caravans and trailers</li>
                      <li>• Items not permanently attached</li>
                      <li>• Business equipment (needs separate cover)</li>
                      <li>• Wear and tear/gradual deterioration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Calculating Sum Insured */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-blue-600" />
                Calculating Your Sum Insured
              </h2>

              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-700">
                  Critical: Rebuild Cost ≠ Market Value
                </h3>
                <p className="text-gray-700 mb-6">
                  Your sum insured should reflect the cost to completely rebuild your home from scratch,
                  NOT what you paid for it or its current market value. Land value is not included.
                </p>

                <div className="bg-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Rebuild Cost Should Include:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li>✓ Demolition and debris removal</li>
                      <li>✓ Architect and engineering fees</li>
                      <li>✓ Council/planning approvals</li>
                      <li>✓ Construction costs at current rates</li>
                      <li>✓ Site preparation</li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Builder's margin</li>
                      <li>✓ GST</li>
                      <li>✓ Inflation buffer (20-30%)</li>
                      <li>✓ Upgraded building standards</li>
                      <li>✓ Landscaping restoration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>2024 Average Rebuild Costs (per m²)</CardTitle>
                  <CardDescription>Based on standard quality finishes in Australian capital cities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Basic/Standard Quality</span>
                      <span className="font-semibold">$1,800 - $2,400/m²</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Medium Quality</span>
                      <span className="font-semibold">$2,400 - $3,200/m²</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>High Quality</span>
                      <span className="font-semibold">$3,200 - $4,500/m²</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Luxury/Architecturally Designed</span>
                      <span className="font-semibold">$4,500 - $8,000+/m²</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Note:</strong> Add 10-15% for difficult access sites, 20-30% for heritage properties,
                      and consider regional variations. Use insurer calculators for accurate estimates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Types of Building Insurance Coverage</h2>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Total Replacement */}
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="text-green-800">Total Replacement Cover (Rare)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Insurers guarantee to rebuild your home regardless of cost. Very few insurers still
                    offer this due to extreme weather events and building cost escalation.
                  </p>
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold mb-2">Pros:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-3">
                      <li>Complete peace of mind</li>
                      <li>No risk of underinsurance</li>
                      <li>Covers cost escalation</li>
                    </ul>
                    <p className="font-semibold mb-2">Cons:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Very expensive premiums</li>
                      <li>Limited availability</li>
                      <li>May have strict conditions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Sum Insured */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Sum Insured Cover (Most Common)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    You nominate a maximum amount the insurer will pay. This is the standard coverage
                    type offered by most Australian insurers.
                  </p>
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold mb-2">Pros:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-3">
                      <li>More affordable premiums</li>
                      <li>Widely available</li>
                      <li>Predictable coverage amount</li>
                    </ul>
                    <p className="font-semibold mb-2">Cons:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Risk of underinsurance</li>
                      <li>Must regularly review amount</li>
                      <li>You bear cost escalation risk</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Essential Inclusions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Essential Inclusions to Look For</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alternative Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Covers temporary housing if home is uninhabitable.</p>
                  <p className="font-semibold text-blue-600">Must Have: 10-20% of sum insured or 12+ months rent</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Legal Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Protects against lawsuits for injury/damage to others.</p>
                  <p className="font-semibold text-blue-600">Must Have: Minimum $20 million cover</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Removal of Debris</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Covers demolition and safe disposal costs.</p>
                  <p className="font-semibold text-blue-600">Must Have: Included in sum insured</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Architects, engineers, surveyors for rebuild.</p>
                  <p className="font-semibold text-blue-600">Must Have: 10-15% of rebuild cost</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Flood Cover</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Protection against riverine flooding.</p>
                  <p className="font-semibold text-blue-600">Must Have: Check if included or optional</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Building Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Covers upgrades to meet new building codes.</p>
                  <p className="font-semibold text-blue-600">Must Have: Essential for older homes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Optional Extras */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Optional Extras Worth Considering</h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-6 py-2">
                  <h3 className="font-semibold mb-1">Accidental Damage</h3>
                  <p className="text-gray-700 text-sm">
                    Covers unintentional damage like putting foot through ceiling. Worth it if you have
                    children or are doing renovations. Typically adds 10-15% to premium.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-6 py-2">
                  <h3 className="font-semibold mb-1">Motor Burnout</h3>
                  <p className="text-gray-700 text-sm">
                    Covers electric motor failure in pool pumps, air conditioners. Essential if you have
                    pool or ducted air conditioning. Usually $50-100 extra per year.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-6 py-2">
                  <h3 className="font-semibold mb-1">Temporary Accommodation for Pets</h3>
                  <p className="text-gray-700 text-sm">
                    Covers kennel/cattery costs if you can't take pets to temporary accommodation.
                    Important for pet owners. Usually minimal additional cost.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-6 py-2">
                  <h3 className="font-semibold mb-1">Locks and Keys</h3>
                  <p className="text-gray-700 text-sm">
                    Covers replacement if keys are lost or stolen. Can save $500-1500 per incident.
                    Often included in comprehensive policies.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-6 py-2">
                  <h3 className="font-semibold mb-1">Environmental Upgrades</h3>
                  <p className="text-gray-700 text-sm">
                    Allows green rebuilding options (solar, rainwater tanks, insulation upgrades).
                    Good for environmentally conscious owners. May reduce future premiums.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Exclusions */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-red-700">
              Critical Exclusions You Must Understand
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-red-900 mb-4">Always Excluded</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Gradual damage:</strong>
                          <p className="text-sm text-gray-600">Rust, corrosion, slow leaks, rising damp</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Lack of maintenance:</strong>
                          <p className="text-sm text-gray-600">Blocked gutters, unmaintained roofs</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Defective workmanship:</strong>
                          <p className="text-sm text-gray-600">Poor quality repairs or construction</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Intentional damage:</strong>
                          <p className="text-sm text-gray-600">By you or invited guests</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-900 mb-4">Often Excluded (Check Policy)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Flood damage:</strong>
                          <p className="text-sm text-gray-600">May be optional extra</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Unoccupancy:</strong>
                          <p className="text-sm text-gray-600">Damage after 60+ days vacant</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Earth movement:</strong>
                          <p className="text-sm text-gray-600">Landslide, subsidence, erosion</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-sm">Tree roots:</strong>
                          <p className="text-sm text-gray-600">Damage to pipes and structures</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-red-100 rounded-lg">
                  <p className="text-red-900 text-center font-semibold">
                    These exclusions cause most claim disputes. Read your PDS "General Exclusions" section carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Money Saving Tips */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              Smart Ways to Reduce Premiums
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Increase Your Excess</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Raising excess from $500 to $1,000 can save 10-20%. Only claim for major damage.
                      Keep excess amount in emergency fund.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Install Security Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Monitored alarms, deadlocks, security screens can reduce premiums 5-15%.
                      Some insurers require these in high-risk areas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Bundle Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Combining building and contents with same insurer saves 10-20%.
                      Add car insurance for further discounts.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Pay Annually</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Annual payment saves 5-10% versus monthly. Monthly payments include
                      interest charges and fees.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Review Coverage Annually</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Remove unnecessary extras. Adjust sum insured accurately.
                      Compare quotes - loyalty doesn't pay.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Age and Claims Discounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Over 50s often get 10% discount. No-claim bonuses can save 20-30%.
                      Some insurers offer professional discounts.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help With a Building Insurance Claim?</h2>
            <p className="text-xl mb-8">
              We work with all major insurers and understand building insurance inside out.
              Let our experts help maximise your claim and restore your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Call 1300 309 361
              </a>
              <Link
                href="/insurance-guide"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Back to Insurance Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}