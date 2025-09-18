import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Briefcase, AlertTriangle, CheckCircle, Info, DollarSign, Clock, TrendingDown, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business Interruption Insurance Guide | Australian Business Income Protection',
  description: 'Complete guide to business interruption insurance in Australia. Understand income protection, indemnity periods, additional expenses coverage, and essential policy features.',
  keywords: ["business interruption insurance Australia", "business income protection", "indemnity period", "business continuity insurance", "commercial insurance"],
};

export default function BusinessInterruptionInsurancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Guide', href: '/insurance-guide' },
            { label: 'Business Interruption Insurance' }
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
                Business Interruption Insurance
              </h1>

              <p className="text-xl text-blue-100">
                Protect your business income when disaster strikes. Understanding indemnity periods, covered expenses,
                and how business interruption insurance keeps your business financially viable during unexpected closures.
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
                  This guide provides general information about business interruption insurance in Australia.
                  Coverage varies significantly between insurers and policies. Always read your Product
                  Disclosure Statement (PDS) and consult with your commercial insurance broker for specific details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Business Interruption Insurance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What is Business Interruption Insurance?</h2>

              <div className="prose prose-lg mb-8">
                <p>
                  Business interruption insurance (also called business income insurance) provides financial protection
                  when your business operations are disrupted by covered events. It replaces lost income and covers
                  ongoing expenses when your business cannot operate normally due to property damage, natural disasters,
                  or other covered perils.
                </p>
                <p>
                  This coverage is crucial because standard commercial property insurance only covers physical damage
                  to your premises and equipment - it doesn't replace the income you lose while your business is
                  closed for repairs or rebuilding.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <h3 className="text-xl font-semibold text-red-900 mb-3">Why Every Business Needs This Coverage</h3>
                <ul className="space-y-2 text-red-800">
                  <li>• 75% of businesses that close for more than 30 days never reopen</li>
                  <li>• Average business takes 6-12 months to recover from major damage</li>
                  <li>• Fixed expenses continue even when business is closed</li>
                  <li>• Customer relationships are lost during extended closures</li>
                  <li>• Employee retention becomes difficult without income</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">What Triggers Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Fire and smoke damage to premises</li>
                      <li>• Storm and flood damage</li>
                      <li>• Burglary and malicious damage</li>
                      <li>• Machinery breakdown (if included)</li>
                      <li>• Utility disruptions (some policies)</li>
                      <li>• Government-ordered evacuations</li>
                      <li>• Access denial by authorities</li>
                      <li>• Supplier interruptions (if covered)</li>
                      <li>• Key person absence (specialist coverage)</li>
                      <li>• Cyber incidents (if included)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">Common Exclusions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Pandemics (unless specifically covered)</li>
                      <li>• Market changes or economic downturns</li>
                      <li>• Strikes and labour disputes</li>
                      <li>• Voluntary business closure</li>
                      <li>• Lack of customers (unrelated to covered event)</li>
                      <li>• Financial insolvency</li>
                      <li>• Consequential loss (unless covered)</li>
                      <li>• Wear and tear or gradual deterioration</li>
                      <li>• Routine maintenance periods</li>
                      <li>• Deliberate acts by business owners</li>
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
              {/* Lost Revenue */}
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <CardTitle className="text-xl">Lost Revenue/Gross Earnings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">Typically Covers:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Net income that would have been earned</li>
                    <li>✓ Continuing normal operating expenses</li>
                    <li>✓ Based on historical financial records</li>
                    <li>✓ Seasonal and trending adjustments</li>
                    <li>✓ Projected income for new businesses</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-blue-700">Calculation Method:</h4>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-medium">Gross Earnings = Revenue - Variable Costs</p>
                    <p className="text-gray-600 mt-1">
                      Usually based on 12-month period before loss, adjusted for trends and seasonal variations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Ongoing Expenses */}
              <Card className="border-orange-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calculator className="w-8 h-8 text-orange-600" />
                    <CardTitle className="text-xl">Ongoing Operating Expenses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">Typically Includes:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Employee wages and benefits</li>
                    <li>✓ Rent, lease, and loan payments</li>
                    <li>✓ Utilities and telecommunications</li>
                    <li>✓ Insurance premiums</li>
                    <li>✓ Professional services (accounting, legal)</li>
                    <li>✓ Equipment leases</li>
                    <li>✓ Advertising and marketing</li>
                    <li>✓ Government taxes and fees</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-red-700">Usually Excludes:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✗ Costs that cease when business stops</li>
                    <li>✗ Variable costs (raw materials, COGS)</li>
                    <li>✗ Owner's salary (depends on policy)</li>
                    <li>✗ Expenses that can be suspended</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Additional Expenses */}
              <Card className="border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <TrendingDown className="w-8 h-8 text-purple-600" />
                    <CardTitle className="text-xl">Additional Expenses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibant mb-3 text-green-700">May Cover:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Temporary relocation costs</li>
                    <li>✓ Equipment rental for temporary operations</li>
                    <li>✓ Expediting expenses (rush shipping, overtime)</li>
                    <li>✓ Additional advertising to retain customers</li>
                    <li>✓ Consultant fees for business recovery</li>
                    <li>✓ Extra transportation costs</li>
                    <li>✓ Temporary staffing costs</li>
                    <li>✓ Communication with customers/suppliers</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-blue-700">Purpose:</h4>
                  <p className="text-sm text-gray-700">
                    These expenses are designed to minimise the period of interruption and maintain customer
                    relationships. Must be reasonable and effective in reducing the overall loss.
                  </p>
                </CardContent>
              </Card>

              {/* Indemnity Period */}
              <Card className="border-red-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-red-600" />
                    <CardTitle className="text-xl">Indemnity Period</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-green-700">Key Considerations:</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    <li>✓ Maximum period benefits are paid</li>
                    <li>✓ Starts from date of loss</li>
                    <li>✓ Common periods: 12, 18, 24, 36 months</li>
                    <li>✓ Should cover full recovery time</li>
                    <li>✓ Includes time to rebuild customer base</li>
                  </ul>

                  <h4 className="font-semibold mb-3 text-amber-700">Choosing the Right Period:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Manufacturing: 18-24 months typical</li>
                    <li>• Retail/hospitality: 12-18 months</li>
                    <li>• Professional services: 12-24 months</li>
                    <li>• Restaurants: 12-18 months</li>
                    <li>• Seasonal businesses: Consider peak seasons</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Types of Business Interruption Coverage */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Business Interruption Coverage</h2>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Basic Coverage */}
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700">Basic Business Interruption</CardTitle>
                  <CardDescription>Standard coverage for direct property damage interruptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Covers Interruption From:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Direct damage to your insured property</li>
                        <li>✓ Fire, storm, theft, vandalism</li>
                        <li>✓ Water damage from burst pipes</li>
                        <li>✓ Electrical equipment damage</li>
                        <li>✓ Building structural damage</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibant mb-3 text-red-700">Limitations:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✗ Requires physical damage to trigger</li>
                        <li>✗ Doesn't cover off-premises losses</li>
                        <li>✗ No supplier/customer interruptions</li>
                        <li>✗ Limited additional expense coverage</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extended Coverage */}
              <Card className="border-blue-300 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700">Extended Business Interruption</CardTitle>
                  <CardDescription>Broader coverage including off-premises and supply chain disruptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Additional Coverage:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Supplier/vendor interruptions</li>
                        <li>✓ Customer/receiver interruptions</li>
                        <li>✓ Utility service interruptions</li>
                        <li>✓ Civil authority prohibitions</li>
                        <li>✓ Ingress/egress coverage</li>
                        <li>✓ Attraction property damage</li>
                        <li>✓ Broad additional expenses</li>
                        <li>✓ Extended indemnity periods</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-700">Specialist Extensions:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>+ Contingent business interruption</li>
                        <li>+ Denial of access coverage</li>
                        <li>+ Non-damage business interruption</li>
                        <li>+ Cyber business interruption</li>
                        <li>+ Key person coverage</li>
                        <li>+ Product contamination</li>
                        <li>+ Government action coverage</li>
                        <li>+ Communicable disease coverage</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Critical Policy Features */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Critical Policy Features to Understand</h2>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Waiting Period/Time Deductible</h3>
                    <p className="text-gray-700">
                      Most policies have a waiting period (typically 48-72 hours) before coverage begins. This prevents
                      claims for minor interruptions. Some policies offer options to reduce or eliminate waiting periods
                      for additional premium. Consider your business's ability to operate short-term without income.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Coinsurance Requirements</h3>
                    <p className="text-gray-700">
                      Many policies require you to insure a minimum percentage (typically 50-80%) of your annual gross
                      earnings. If you're underinsured, the insurer may reduce claim payments proportionally. Accurately
                      calculating your annual gross earnings is crucial.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibant mb-2">Extended Period of Indemnity</h3>
                    <p className="text-gray-700">
                      Standard policies may not cover the full time needed to rebuild your customer base after
                      reopening. Extended period coverage continues benefits beyond physical restoration to account
                      for business recovery time. This is critical for businesses with strong customer loyalty.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Seasonal Adjustments</h3>
                    <p className="text-gray-700">
                      If your business has seasonal variations, ensure the policy accounts for this in calculations.
                      A loss during peak season should be compensated at peak rates, not annual averages. Policies
                      should include trending factors for growing businesses.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Partial Resumption of Operations</h3>
                    <p className="text-gray-700">
                      If you can operate at reduced capacity, most policies reduce benefits proportionally. Understand
                      how partial operations affect your claim. Some policies provide incentives for resuming partial
                      operations quickly to minimise overall loss.
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
            <h2 className="text-3xl font-bold text-center mb-12">Business Interruption Claims Process</h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">1. Immediate Documentation</h3>
                    <p className="text-gray-700 mb-2">
                      Document the cause and extent of interruption immediately. Time stamps are critical
                      for establishing the start of the interruption period.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Photograph/video all damage</li>
                      <li>• Document when business operations ceased</li>
                      <li>• Preserve evidence of the cause</li>
                      <li>• Record all immediate expenses</li>
                      <li>• Note any partial operations that continue</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">2. Financial Documentation</h3>
                    <p className="text-gray-700 mb-2">
                      Compile comprehensive financial records to establish pre-loss earnings and
                      ongoing expenses. Historical data is crucial for claim calculations.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Previous 12-24 months' financial statements</li>
                      <li>• Tax returns and BAS statements</li>
                      <li>• Payroll records and employee contracts</li>
                      <li>• Lease agreements and loan documentation</li>
                      <li>• Supplier contracts and recurring expenses</li>
                      <li>• Business forecasts and budgets</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">3. Professional Support</h3>
                    <p className="text-gray-700 mb-2">
                      Business interruption claims are complex and often require professional assistance
                      to maximise recovery and ensure proper documentation.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Engage a loss assessor or public adjuster</li>
                      <li>• Work with your accountant for financial analysis</li>
                      <li>• Consider forensic accounting for complex claims</li>
                      <li>• Maintain detailed records of all claim-related expenses</li>
                      <li>• Regular communication with your insurance broker</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Considerations */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Industry-Specific Considerations</h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-blue-700">Manufacturing</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Longer restoration periods (18-36 months)</li>
                    <li>• Machinery breakdown coverage essential</li>
                    <li>• Supply chain interruption critical</li>
                    <li>• Customer contract penalties</li>
                    <li>• Raw material spoilage considerations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Retail/Hospitality</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Seasonal business variations important</li>
                    <li>• Customer loyalty and foot traffic</li>
                    <li>• Perishable inventory considerations</li>
                    <li>• Location-dependent income</li>
                    <li>• Tourism/event-based fluctuations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500">
                <CardContent className="p-6">
                  <h3 className="font-semibant mb-2 text-purple-700">Professional Services</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Data and records protection</li>
                    <li>• Client relationship maintenance</li>
                    <li>• Remote working capabilities</li>
                    <li>• Professional indemnity interactions</li>
                    <li>• Key person dependencies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-orange-700">Technology/Software</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cyber incident coverage essential</li>
                    <li>• Intellectual property protection</li>
                    <li>• Client data recovery costs</li>
                    <li>• Software/system restoration time</li>
                    <li>• Reputation management expenses</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-red-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-red-700">Healthcare</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Patient care continuity requirements</li>
                    <li>• Medical equipment replacement time</li>
                    <li>• Referral network considerations</li>
                    <li>• Compliance and regulatory issues</li>
                    <li>• Emergency service obligations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-yellow-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-yellow-700">Agriculture</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Seasonal and weather dependencies</li>
                    <li>• Livestock and crop considerations</li>
                    <li>• Supply chain interruptions</li>
                    <li>• Market price fluctuations</li>
                    <li>• Government support interactions</li>
                  </ul>
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
                  This guide provides general information only about business interruption insurance in Australia.
                  Insurance policies, coverage, terms, and conditions vary significantly between insurers and
                  individual policies. Business interruption claims are complex and require careful documentation
                  and professional expertise. Always read the Product Disclosure Statement (PDS) and policy
                  documents carefully. Consult with your commercial insurance broker and professional advisors
                  for advice specific to your business circumstances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Business Damaged by Disaster?</h2>
            <p className="text-xl mb-8">
              We specialise in commercial restoration and work with business interruption insurance claims.
              Our team understands the urgency of getting businesses operational again quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Call 1300 309 361
              </a>
              <Link
                href="/services/commercial-restoration"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Commercial Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}