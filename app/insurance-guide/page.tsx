import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Home, Building2, Package, Briefcase, Key, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Australian Insurance Policy Guide | Understanding Your Coverage | Disaster Recovery',
  description: 'Comprehensive guide to Australian insurance policies - Home, Contents, Building, Landlord, Business Interruption. Understand what\'s covered, must-haves, and optional extras.',
  keywords: ["Australian insurance guide", "home insurance", "contents insurance", "building insurance", "landlord insurance", "business interruption insurance", "insurance policy coverage"],
};

export default function InsuranceGuidePage() {
  const insurancePolicies = [
    {
      id: 'home-building',
      name: 'Home & Building Insurance',
      icon: Home,
      description: 'Covers the structure of your home including walls, roof, and fixed fixtures',
      link: '/insurance-guide/home-building',
      keyPoints: [
        'Covers rebuild costs, not market value',
        'Includes permanent fixtures and fittings',
        'Usually covers outbuildings like garages',
        'Essential for homeowners with mortgages'
      ]
    },
    {
      id: 'contents',
      name: 'Contents Insurance',
      icon: Package,
      description: 'Protects your personal belongings and household items',
      link: '/insurance-guide/contents',
      keyPoints: [
        'Covers furniture, electronics, clothing',
        'Portable items can be covered away from home',
        'Specified items for high-value goods',
        'Available for renters and homeowners'
      ]
    },
    {
      id: 'landlord',
      name: 'Landlord Insurance',
      icon: Key,
      description: 'Specialised coverage for investment property owners',
      link: '/insurance-guide/landlord',
      keyPoints: [
        'Rental income protection',
        'Tenant damage coverage',
        'Legal liability protection',
        'Building and contents options available'
      ]
    },
    {
      id: 'business-interruption',
      name: 'Business Interruption Insurance',
      icon: Briefcase,
      description: 'Protects business income during unexpected closures',
      link: '/insurance-guide/business-interruption',
      keyPoints: [
        'Covers lost income during closure',
        'Ongoing expenses coverage',
        'Employee wage protection',
        'Customer/supplier contract penalties'
      ]
    },
    {
      id: 'strata',
      name: 'Strata Insurance',
      icon: Building2,
      description: 'Coverage for unit owners and body corporates',
      link: '/insurance-guide/strata',
      keyPoints: [
        'Common property protection',
        'Building structure coverage',
        'Public liability included',
        'Shared by all unit owners'
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">
                Australian Insurance Policy Guide
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Understanding your insurance coverage is critical. Studies show 99% of Australians don't fully
                understand their policies. This comprehensive guide explains what's covered, what's not, and
                what you should look for in your insurance policies.
              </p>

              {/* Disclaimer Banner */}
              <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-4 max-w-4xl mx-auto">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold text-yellow-300 mb-1">Important Disclaimer</h3>
                    <p className="text-yellow-100 text-sm">
                      This guide provides general information about Australian insurance policies. Coverage details,
                      terms, and conditions vary between insurers and specific policies. Always read your Product
                      Disclosure Statement (PDS) and consult with your insurer or insurance broker for specific
                      coverage details. This information is current as of 2024 but insurance products and
                      regulations change regularly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Understanding Insurance Matters */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Why Understanding Your Insurance Matters</h2>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <h3 className="text-xl font-semibold text-red-900 mb-3">The Coverage Gap Crisis</h3>
                <ul className="space-y-2 text-red-800">
                  <li>• 80% of Australians are underinsured by an average of 30%</li>
                  <li>• 1 in 5 claims are disputed due to misunderstanding of coverage</li>
                  <li>• Average household undervalues contents by $100,000+</li>
                  <li>• Many discover exclusions only after making a claim</li>
                </ul>
              </div>

              <div className="prose prose-lg">
                <p>
                  Australian insurance policies are complex legal documents, often 50-100 pages long. Most
                  policyholders never read beyond the summary, missing critical exclusions, limits, and
                  conditions that could leave them exposed during disasters.
                </p>
                <p>
                  As restoration professionals, we see the devastating impact of inadequate coverage daily.
                  Families forced to pay tens of thousands out-of-pocket for repairs their policy doesn't
                  cover. Businesses that never recover because they didn't have interruption insurance.
                </p>
                <p>
                  This guide breaks down each type of insurance in clear, practical terms, helping you
                  understand exactly what protection you're buying and what gaps might exist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Types Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Insurance Coverage</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insurancePolicies.map((policy) => (
                <Card key={policy.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <policy.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{policy.name}</CardTitle>
                    </div>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {policy.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={policy.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Coverage Levels */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Understanding Coverage Levels</h2>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-8">
                {/* Basic Cover */}
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-700">Basic Cover</CardTitle>
                    <CardDescription>Entry-level protection with essential coverage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">Typically Includes:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>✓ Fire and smoke damage</li>
                          <li>✓ Storm and rainwater damage</li>
                          <li>✓ Lightning strikes</li>
                          <li>✓ Explosion</li>
                          <li>✓ Theft and burglary</li>
                          <li>✓ Malicious damage/vandalism</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-red-700">Usually Excludes:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>✗ Accidental damage</li>
                          <li>✗ Flood (in many policies)</li>
                          <li>✗ Portable items outside home</li>
                          <li>✗ Motor burnout</li>
                          <li>✗ Pet damage</li>
                          <li>✗ Gradual deterioration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comprehensive Cover */}
                <Card className="border-blue-300 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-700">Comprehensive Cover</CardTitle>
                    <CardDescription>Full protection with broader coverage and higher limits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">Includes Everything in Basic Plus:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>✓ Accidental damage/breakage</li>
                          <li>✓ Flood coverage (check specific policy)</li>
                          <li>✓ Portable items coverage (limited)</li>
                          <li>✓ Motor burnout</li>
                          <li>✓ Food spoilage</li>
                          <li>✓ Alternative accommodation</li>
                          <li>✓ Legal liability (higher limits)</li>
                          <li>✓ Keys and locks replacement</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-amber-700">Common Optional Extras:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>+ Specified high-value items</li>
                          <li>+ Accidental damage by pets</li>
                          <li>+ Home office equipment</li>
                          <li>+ Swimming pool/spa coverage</li>
                          <li>+ Identity theft protection</li>
                          <li>+ Domestic workers compensation</li>
                          <li>+ Increased portable items limit</li>
                          <li>+ Visitors' contents coverage</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Must-Haves */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Critical Must-Haves in Any Policy</h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">1. Adequate Sum Insured</h3>
                    <p className="text-gray-700">
                      Building: Should cover full rebuild cost including demolition, architect fees, council approvals.
                      Add 20-30% buffer for cost escalation. Use online calculators from insurers for accuracy.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">2. Flood Coverage</h3>
                    <p className="text-gray-700">
                      Since 2012 standard definition, but not all policies include it. Essential in flood-prone
                      areas. Check if it covers storm surge and overflowing waterways.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">3. Alternative Accommodation</h3>
                    <p className="text-gray-700">
                      Should be 10-20% of building sum insured or 12+ months rent. Critical if home becomes
                      uninhabitable. Check if it includes pet accommodation.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">4. Legal Liability</h3>
                    <p className="text-gray-700">
                      Minimum $20 million recommended. Covers injury to others or damage to their property.
                      Essential protection against lawsuits.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">5. Removal of Debris</h3>
                    <p className="text-gray-700">
                      Should be included in building sum insured. Can cost $20,000+ for major damage.
                      Includes safe disposal of hazardous materials like asbestos.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">6. Professional Fees</h3>
                    <p className="text-gray-700">
                      Architects, engineers, surveyors fees for rebuild. Usually 10% of building cost.
                      Essential for heritage or complex properties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Exclusions Warning */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-red-700">
              Critical Exclusions Most People Don't Know About
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-red-900 mb-4">Maintenance-Related Exclusions</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Gradual damage:</strong> Slow leaks, rising damp, wear and tear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Lack of maintenance:</strong> Blocked gutters causing overflow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Tree roots:</strong> Damage to pipes from root intrusion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Rust and corrosion:</strong> Old pipes failing</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-900 mb-4">Event-Specific Exclusions</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Actions of the sea:</strong> Coastal erosion, king tides</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Earth movement:</strong> Landslide, subsidence (unless from covered event)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Unoccupied property:</strong> Damage after 60+ days vacant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Illegal activities:</strong> Damage during illegal use of property</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-red-100 rounded-lg">
                  <p className="text-red-900 font-semibold text-center">
                    Always read the PDS "General Exclusions" section - it's typically 3-5 pages that could
                    save you tens of thousands of dollars in denied claims.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links to Detailed Guides */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Policy Guides</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/insurance-guide/home-building" className="group">
                <Card className="h-full hover:shadow-xl transition-all group-hover:border-blue-300">
                  <CardContent className="p-6">
                    <Home className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                      Home & Building Insurance
                    </h3>
                    <p className="text-gray-600">
                      Complete guide to building insurance, sum insured calculations, and coverage options
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/insurance-guide/contents" className="group">
                <Card className="h-full hover:shadow-xl transition-all group-hover:border-blue-300">
                  <CardContent className="p-6">
                    <Package className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                      Contents Insurance
                    </h3>
                    <p className="text-gray-600">
                      How to value contents, specified items, and portable coverage explained
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/insurance-guide/landlord" className="group">
                <Card className="h-full hover:shadow-xl transition-all group-hover:border-blue-300">
                  <CardContent className="p-6">
                    <Key className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                      Landlord Insurance
                    </h3>
                    <p className="text-gray-600">
                      Rental income protection, tenant damage, and investment property coverage
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/insurance-guide/business-interruption" className="group">
                <Card className="h-full hover:shadow-xl transition-all group-hover:border-blue-300">
                  <CardContent className="p-6">
                    <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                      Business Interruption
                    </h3>
                    <p className="text-gray-600">
                      Protecting business income, indemnity periods, and additional costs coverage
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/insurance-guide/strata" className="group">
                <Card className="h-full hover:shadow-xl transition-all group-hover:border-blue-300">
                  <CardContent className="p-6">
                    <Building2 className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                      Strata Insurance
                    </h3>
                    <p className="text-gray-600">
                      Understanding body corporate insurance and unit owner responsibilities
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/insurance-guide/flood-vs-storm" className="group">
                <Card className="h-full hover:shadow-xl transition-all group-hover:border-blue-300">
                  <CardContent className="p-6">
                    <Shield className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                      Flood vs Storm Damage
                    </h3>
                    <p className="text-gray-600">
                      Critical differences that affect coverage and claim outcomes
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Expert Tips */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Expert Tips from Restoration Professionals</h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Document Everything Before Disaster Strikes</h3>
                    <p className="text-gray-700">
                      Video walkthrough of your property annually. Photograph serial numbers, receipts for
                      high-value items. Store in cloud. This documentation can mean the difference between
                      full payment and significant shortfall.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Review Policy Annually</h3>
                    <p className="text-gray-700">
                      Building costs increased 20-30% in recent years. Renovations, new purchases, lifestyle
                      changes all affect coverage needs. Set calendar reminder for renewal minus 30 days.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Understand Your Excess Structure</h3>
                    <p className="text-gray-700">
                      Basic excess plus potential additional excesses (age, earthquake, flood) can add up to
                      thousands. Know total potential excess before claiming. Sometimes paying yourself is better.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Don't Underinsure to Save Premiums</h3>
                    <p className="text-gray-700">
                      Saving $200/year but being underinsured by $200,000 is false economy. Co-insurance
                      clauses mean insurers can reduce ALL claims proportionally if you're underinsured.
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
            <h2 className="text-3xl font-bold mb-4">Need Help After an Insurance Claim?</h2>
            <p className="text-xl mb-8">
              We work with all major insurers and understand policy coverage inside-out.
              Let us help maximise your claim and restore your property properly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Call 1300 309 361
              </a>
              <Link
                href="/insurance-partners"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                View Our Insurance Partners
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}