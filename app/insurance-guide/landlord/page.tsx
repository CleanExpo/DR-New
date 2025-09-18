import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Key, AlertTriangle, CheckCircle, Info, DollarSign, Shield, Users, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Landlord Insurance Guide | Australian Rental Property Protection',
  description: 'Complete guide to landlord insurance in Australia. Understand rental income protection, tenant damage coverage, liability protection, and essential policy features.',
  keywords: ["landlord insurance Australia", "rental property insurance", "tenant damage", "rental income protection", "investment property insurance"],
};

export default function LandlordInsurancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Guide', href: '/insurance-guide' },
            { label: 'Landlord Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link href="/insurance-guide" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
                ← Back to Insurance Guide
              </Link>

              <h1 className="text-5xl font-bold mb-6">
                Landlord Insurance Guide
              </h1>

              <p className="text-xl text-blue-100">
                Protect your investment property with comprehensive landlord insurance. Understanding rental income
                protection, tenant damage coverage, and liability protection for Australian property investors.
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
                  This guide provides general information about landlord insurance in Australia.
                  Coverage varies significantly between insurers and policies. Always read your Product
                  Disclosure Statement (PDS) and consult with your insurer for specific details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Landlord Insurance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What is Landlord Insurance?</h2>

              <div className="prose prose-lg mb-8">
                <p>
                  Landlord insurance is specialised coverage designed for investment property owners who rent their
                  properties to tenants. It provides protection beyond standard home and building insurance, covering
                  unique risks associated with rental properties including tenant damage, rental income loss, and
                  landlord-specific liability.
                </p>
                <p>
                  Unlike regular home insurance, landlord insurance recognises that investment properties face different
                  risks - from tenant damage to rental income interruption when properties become uninhabitable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Core Coverage Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Building structure and permanent fixtures</li>
                      <li>• Loss of rental income (rent default)</li>
                      <li>• Tenant damage (malicious and accidental)</li>
                      <li>• Landlord contents (if provided)</li>
                      <li>• Legal liability to tenants and visitors</li>
                      <li>• Alternative accommodation costs</li>
                      <li>• Loss of rent during repairs</li>
                      <li>• Tenant bond default shortfall</li>
                      <li>• Emergency repairs and call-outs</li>
                      <li>• Legal expenses for tenant disputes</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">Key Differences from Home Insurance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Covers rental income protection</li>
                      <li>• Includes tenant-caused damage</li>
                      <li>• Higher liability limits typically required</li>
                      <li>• May cover landlord-owned contents</li>
                      <li>• Includes legal expenses for disputes</li>
                      <li>• Different vacancy conditions</li>
                      <li>• Property manager coverage options</li>
                      <li>• Tenant selection protection</li>
                      <li>• Usually higher premiums than home insurance</li>
                      <li>• May require property inspections</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Core Coverage Components */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Core Coverage Components</h2>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Rental Income Protection */}
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl">Rental Income Protection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">Typically Covers:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Tenant rent default (up to specified period)</li>
                    <li>✓ Loss of rent during property repairs</li>
                    <li>✓ Rental income during uninhabitable periods</li>
                    <li>✓ Tenant early termination (some policies)</li>
                    <li>✓ Death of tenant scenario coverage</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-red-700">Common Exclusions:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✗ Voluntary rent reductions</li>
                    <li>✗ Vacancy between tenancies</li>
                    <li>✗ Rent disputes (policy dependent)</li>
                    <li>✗ Property improvements causing vacancy</li>
                    <li>✗ Market rent reductions</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tenant Damage Coverage */}
              <Card className="border-orange-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-orange-600" />
                    <CardTitle className="text-xl">Tenant Damage Coverage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">Typically Covers:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Malicious damage by tenants</li>
                    <li>✓ Accidental damage by tenants</li>
                    <li>✓ Damage by tenant's visitors</li>
                    <li>✓ Pet damage (if pets allowed)</li>
                    <li>✓ Damage beyond normal wear and tear</li>
                    <li>✓ Theft by tenants (some policies)</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-red-700">Not Usually Covered:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✗ Normal wear and tear</li>
                    <li>✗ Damage from poor maintenance</li>
                    <li>✗ Gradual deterioration</li>
                    <li>✗ Unauthorised modifications by tenant</li>
                    <li>✗ Motor vehicle damage</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Liability Protection */}
              <Card className="border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <CardTitle className="text-xl">Liability Protection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">Covers Claims For:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Tenant injury on property</li>
                    <li>✓ Visitor injury due to property defects</li>
                    <li>✓ Property damage to neighbours</li>
                    <li>✓ Legal costs for liability claims</li>
                    <li>✓ Compensation payments</li>
                    <li>✓ Professional indemnity (some policies)</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-amber-700">Recommended Minimums:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• $20 million public liability minimum</li>
                    <li>• Higher limits for commercial properties</li>
                    <li>• Professional indemnity if self-managing</li>
                    <li>• Legal expenses cover included</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Landlord Contents */}
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Home className="w-8 h-8 text-green-600" />
                    <CardTitle className="text-xl">Landlord Contents (Optional)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">May Include:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Furniture and appliances provided</li>
                    <li>✓ Window furnishings (blinds, curtains)</li>
                    <li>✓ Garden equipment and tools</li>
                    <li>✓ Outdoor furniture</li>
                    <li>✓ Maintenance equipment</li>
                    <li>✓ Keys and locks replacement</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-blue-700">Coverage Options:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Replacement value or agreed value</li>
                    <li>• Specified items for high-value goods</li>
                    <li>• Portable items coverage</li>
                    <li>• Tenant damage to contents</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Policy Features Comparison */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Essential vs Comprehensive Coverage</h2>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Essential Coverage */}
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700">Essential Landlord Cover</CardTitle>
                  <CardDescription>Basic protection for investment properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Typically Includes:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Building structure coverage</li>
                        <li>✓ Basic tenant damage protection</li>
                        <li>✓ $10-20 million public liability</li>
                        <li>✓ Loss of rent (4-12 weeks)</li>
                        <li>✓ Emergency repairs</li>
                        <li>✓ Standard storm/fire/theft cover</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700">Usually Excludes:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✗ Accidental damage</li>
                        <li>✗ Extended rental income protection</li>
                        <li>✗ Landlord contents</li>
                        <li>✗ Legal expenses</li>
                        <li>✗ Tenant bond default</li>
                        <li>✗ Flood (check carefully)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comprehensive Coverage */}
              <Card className="border-blue-300 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700">Comprehensive Landlord Cover</CardTitle>
                  <CardDescription>Full protection with enhanced features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Includes Everything in Essential Plus:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Accidental damage coverage</li>
                        <li>✓ Extended rental income (26+ weeks)</li>
                        <li>✓ Landlord contents coverage</li>
                        <li>✓ Legal expenses for disputes</li>
                        <li>✓ Tenant bond default coverage</li>
                        <li>✓ Flood coverage (if available)</li>
                        <li>✓ Alternative accommodation costs</li>
                        <li>✓ Emergency tradespeople access</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-700">Premium Add-Ons Available:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>+ Rent guarantee insurance</li>
                        <li>+ Property manager protection</li>
                        <li>+ Specified high-value items</li>
                        <li>+ Loss of rent for renovations</li>
                        <li>+ Tenant selection cover</li>
                        <li>+ Professional property advice</li>
                        <li>+ 24/7 emergency assistance</li>
                        <li>+ Property compliance support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Critical Considerations */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-red-700">
              Critical Considerations for Landlords
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white border border-red-200 rounded-xl p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Vacancy Periods and Coverage</h3>
                    <p className="text-gray-700">
                      Most policies have specific conditions about vacant properties. Typical limits are 60-90 days
                      vacant before coverage restrictions apply. Some insurers require notification of vacancy.
                      Check if Airbnb/short-term rentals are covered - many standard policies exclude them.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Tenant Screening and Policy Conditions</h3>
                    <p className="text-gray-700">
                      Some insurers require specific tenant screening processes. Failure to follow these can void
                      claims. This includes credit checks, reference verification, and sometimes income requirements.
                      Document your screening process thoroughly.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Property Management Requirements</h3>
                    <p className="text-gray-700">
                      Some policies require professional property management for certain claim types. Others offer
                      discounts for professional management. If self-managing, ensure you understand all legal
                      obligations and compliance requirements.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Rental Income Calculation</h3>
                    <p className="text-gray-700">
                      Income protection is usually based on market rent, not actual rent charged. If you're charging
                      below market rates to family or friends, you may not be covered for full market rent loss.
                      Regular market appraisals help establish correct coverage levels.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Maintenance and Safety Obligations</h3>
                    <p className="text-gray-700">
                      Landlords have specific safety obligations (smoke alarms, electrical safety switches, etc.).
                      Failure to meet these can void coverage. Keep detailed maintenance records and safety
                      certificates. Regular property inspections are often required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Claims Process for Landlords</h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">1. Immediate Actions</h3>
                    <p className="text-gray-700 mb-2">
                      Contact emergency services if required, then secure the property. Take photos before
                      any cleanup. Contact your insurer within 24-48 hours.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Document all damage with photos/video</li>
                      <li>• Preserve evidence of cause</li>
                      <li>• Make property safe but don't start repairs</li>
                      <li>• Notify tenants if property uninhabitable</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">2. Documentation Required</h3>
                    <p className="text-gray-700 mb-2">
                      Compile all relevant documentation including lease agreements, bond records,
                      inspection reports, and proof of rental income.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Current lease agreement and bond receipt</li>
                      <li>• Recent property inspection reports</li>
                      <li>• Rental payment history</li>
                      <li>• Tenant contact details and references</li>
                      <li>• Police reports (if applicable)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibant mb-2">3. Working with Tenants</h3>
                    <p className="text-gray-700 mb-2">
                      Maintain professional relationships. Document all communications. Follow proper
                      legal procedures for accessing property and managing tenant obligations.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Provide proper notice for inspections</li>
                      <li>• Document tenant cooperation or non-cooperation</li>
                      <li>• Handle alternative accommodation professionally</li>
                      <li>• Maintain tenant privacy during repairs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Tips */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Expert Tips for Landlords</h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Document Everything</h3>
                  <p className="text-gray-700 text-sm">
                    Keep detailed records of all tenant interactions, property inspections, maintenance,
                    and rent payments. Digital documentation with timestamps is best practice.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Regular Property Inspections</h3>
                  <p className="text-gray-700 text-sm">
                    Conduct routine inspections (with proper notice) to identify maintenance issues early.
                    Most insurers expect 3-6 monthly inspections for optimal coverage.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibant mb-2 text-green-700">Understand Your State Laws</h3>
                  <p className="text-gray-700 text-sm">
                    Tenancy laws vary significantly between Australian states. Ensure your policy aligns
                    with local requirements for bond holding, notices, and tenant rights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Review Coverage Annually</h3>
                  <p className="text-gray-700 text-sm">
                    Property values, rental rates, and replacement costs change. Review your coverage
                    limits annually and adjust for renovations or market changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Disclaimer and Legal */}
        <section className="py-12 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This guide provides general information only about landlord insurance in Australia.
                  Insurance policies, coverage, terms, and conditions vary significantly between insurers
                  and individual policies. Always read the Product Disclosure Statement (PDS) and policy
                  documents carefully. Consult with your insurance broker or insurer for advice specific
                  to your circumstances. Consider seeking professional legal and financial advice regarding
                  your insurance needs and property investment strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Damage to Your Investment Property?</h2>
            <p className="text-xl mb-8">
              We work with landlords and insurance companies to restore rental properties quickly
              and minimise income loss. Our team understands landlord insurance claims inside-out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Call 1300 309 361
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Get Expert Advice
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}