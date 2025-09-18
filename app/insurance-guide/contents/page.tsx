import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertTriangle, CheckCircle, Shield, FileText, Home, DollarSign, AlertCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contents Insurance Guide | What\'s Covered & Claims | Disaster Recovery',
  description: 'Complete guide to contents insurance in Australia. Learn what\'s covered, what\'s not, how to make claims, and essential tips for protecting your belongings.',
  keywords: ["contents insurance", "home contents cover", "personal property insurance", "contents claims", "insurance guide"],
};

export default function ContentsInsurancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Guide', href: '/insurance-guide' },
            { label: 'Contents Insurance' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6">
                Contents Insurance Guide
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Understanding your contents insurance coverage is crucial when disaster strikes.
                Learn what's covered, what's not, and how to ensure you're properly protected.
              </p>
              <div className="bg-yellow-500/20 border-l-4 border-yellow-400 p-4 rounded">
                <p className="flex items-start">
                  <AlertTriangle className="w-6 h-6 mr-2 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Important:</strong> This guide provides general information only. Always
                    read your specific Product Disclosure Statement (PDS) for exact coverage details.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Contents Insurance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">What is Contents Insurance?</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Contents insurance protects your personal belongings inside your home against damage,
                loss, or theft. This includes furniture, appliances, electronics, clothing, jewellery,
                and other personal items. Unlike building insurance which covers the structure,
                contents insurance covers everything you could take with you if you moved.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                    Generally Covered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Furniture and furnishings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Electrical appliances and electronics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Clothing and personal items</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Jewellery and valuables (up to limits)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Tools and sporting equipment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Carpets and curtains (if tenant)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                    Usually Not Covered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Motor vehicles and motorcycles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Damage from wear and tear</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Pest and vermin damage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Intentional damage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Items used for business (unless declared)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Illegal items or activities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Types */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Types of Contents Coverage</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle>Replacement Value</CardTitle>
                  <CardDescription>New for old coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Most modern policies offer replacement value coverage, meaning damaged items
                    are replaced with new equivalents regardless of the age of the damaged item.
                  </p>
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm">
                      <strong>Example:</strong> Your 5-year-old TV is destroyed. Insurance pays
                      for a brand new TV of similar quality and features.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle>Indemnity Value</CardTitle>
                  <CardDescription>Actual cash value coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Indemnity policies pay the current market value of items, taking into account
                    age and depreciation. These policies typically have lower premiums.
                  </p>
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm">
                      <strong>Example:</strong> Your 5-year-old TV is destroyed. Insurance pays
                      what the TV was worth at the time of loss, considering depreciation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Important Considerations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Key Considerations</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
                    Sum Insured
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The sum insured is the maximum amount your insurer will pay for all contents
                    claims. It's crucial to accurately calculate the value of your belongings:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Use online calculators provided by insurers</li>
                    <li>Create a detailed home inventory with photos</li>
                    <li>Update annually and after major purchases</li>
                    <li>Consider inflation and replacement costs</li>
                    <li>Don't forget items in garage, shed, or storage</li>
                  </ul>
                  <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-sm">
                      <strong>Warning:</strong> Underinsurance can result in reduced claim payments.
                      If you're underinsured by 20%, your claim may be reduced by 20%.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-600" />
                    Specified Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Most policies have sub-limits for valuable items. You may need to specify
                    high-value items separately:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Common Sub-limits:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Jewellery: $5,000 per item</li>
                        <li>• Watches: $5,000 per item</li>
                        <li>• Collections: $10,000 total</li>
                        <li>• Cash: $500</li>
                        <li>• Electronics: $3,000 per item</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Items to Specify:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Engagement rings</li>
                        <li>• Expensive watches</li>
                        <li>• Artwork and antiques</li>
                        <li>• High-end cameras</li>
                        <li>• Musical instruments</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Excess/Deductible
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The excess is the amount you pay towards each claim. Higher excess = lower premiums:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Standard excess: Usually $500-$1,000</li>
                    <li>Additional excesses may apply for certain claims</li>
                    <li>Some policies have different excesses for different perils</li>
                    <li>Consider your ability to pay excess when choosing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Making a Claim */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Making a Contents Insurance Claim</h2>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Step-by-Step Claims Process</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2">Ensure Safety First</h4>
                    <p className="text-gray-600">
                      Make sure you and your family are safe. Call emergency services if needed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2">Document Everything</h4>
                    <p className="text-gray-600">
                      Take photos and videos of all damage. Don't throw anything away until advised.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2">Contact Your Insurer</h4>
                    <p className="text-gray-600">
                      Call your insurance company as soon as possible. Most have 24/7 claim lines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2">Complete Claim Forms</h4>
                    <p className="text-gray-600">
                      Provide detailed lists of damaged items with approximate values and age.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2">Provide Proof of Ownership</h4>
                    <p className="text-gray-600">
                      Receipts, bank statements, photos, warranties can all serve as proof.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    6
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-2">Assessment and Settlement</h4>
                    <p className="text-gray-600">
                      An assessor may visit for large claims. Settlement follows approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Essential Tips</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create a Home Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Document all belongings with photos, receipts, and serial numbers.
                    Store this information securely in the cloud.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Review Annually</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Update your sum insured yearly to account for new purchases and inflation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Understand Exclusions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Read your PDS carefully to understand what's not covered and consider
                    additional coverage if needed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Security Discounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Installing security systems, smoke alarms, and deadlocks can reduce premiums.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bundle Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Combining contents with building insurance often provides discounts and
                    simplified claims.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Keep Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Maintain receipts, warranties, and photos of valuable items for easier claims.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Important Disclaimer</h3>
                <p className="text-sm text-gray-700">
                  This guide provides general information about contents insurance in Australia.
                  Coverage details, limits, and exclusions vary significantly between insurers and
                  policies. Always read your Product Disclosure Statement (PDS) and policy documents
                  carefully. Consider seeking professional advice for your specific situation.
                  This information is current as of January 2025 and may change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with a Contents Claim?</h2>
            <p className="text-xl mb-8">
              Our team specialises in contents restoration and works directly with all major insurers.
              We can help document damage and manage your claim process.
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
                Get Expert Help
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}