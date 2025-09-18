import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, AlertTriangle, CheckCircle, Info, Users, Shield, Home, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Strata Insurance Guide | Australian Unit & Apartment Building Coverage',
  description: 'Complete guide to strata insurance in Australia. Understand body corporate insurance, unit owner responsibilities, common property coverage, and essential policy features.',
  keywords: ["strata insurance Australia", "body corporate insurance", "unit owner insurance", "apartment building insurance", "strata title insurance"],
};

export default function StrataInsurancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Guide', href: '/insurance-guide' },
            { label: 'Strata Insurance' }
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
                Strata Insurance Guide
              </h1>

              <p className="text-xl text-blue-100">
                Understanding strata insurance, body corporate responsibilities, and unit owner coverage requirements.
                Essential guide for apartment and unit owners in Australian strata title properties.
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
                  This guide provides general information about strata insurance in Australia.
                  Strata laws vary significantly between states and territories. Coverage and requirements
                  differ between insurers and body corporates. Always read your strata bylaws and insurance
                  policies carefully, and consult with your strata manager or insurance professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Strata Insurance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What is Strata Insurance?</h2>

              <div className="prose prose-lg mb-8">
                <p>
                  Strata insurance is a specialised form of building insurance that covers common property in
                  strata title buildings such as apartment blocks, unit complexes, and townhouse developments.
                  It's taken out by the body corporate (also called owners corporation or strata corporation
                  depending on your state) and covers areas owned collectively by all unit owners.
                </p>
                <p>
                  This insurance is separate from individual unit contents insurance and may not cover everything
                  within your unit. Understanding the division between body corporate insurance and your personal
                  insurance responsibilities is crucial for adequate protection.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <h3 className="text-xl font-semibant text-blue-900 mb-3">Key Legal Requirement</h3>
                <p className="text-blue-800">
                  In all Australian states and territories, body corporates are legally required to maintain
                  building insurance for the common property. This is not optional - it's a legal obligation
                  under strata legislation. Individual unit owners cannot opt out of this shared insurance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">What Strata Insurance Typically Covers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Building structure and external walls</li>
                      <li>• Common areas (lobbies, hallways, stairwells)</li>
                      <li>• Shared facilities (pools, gyms, BBQ areas)</li>
                      <li>• Lifts, intercoms, and common utilities</li>
                      <li>• Roofing, gutters, and external fixtures</li>
                      <li>• Gardens, driveways, and pathways</li>
                      <li>• Building services (plumbing, electrical mains)</li>
                      <li>• Common property contents and equipment</li>
                      <li>• Public liability for common areas</li>
                      <li>• Management liability (committee protection)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">What's Usually NOT Covered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Individual unit contents and belongings</li>
                      <li>• Personal fixtures within units</li>
                      <li>• Individual unit improvements/renovations</li>
                      <li>• Personal liability for unit owners</li>
                      <li>• Individual unit water damage (often)</li>
                      <li>• Personal vehicles in car parks</li>
                      <li>• Unit-specific electrical/plumbing issues</li>
                      <li>• Individual balcony contents</li>
                      <li>• Personal loss of use or accommodation</li>
                      <li>• Individual legal expenses</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Coverage Divisions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Understanding Coverage Divisions</h2>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Body Corporate Insurance */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-8 h-8 text-blue-600" />
                      <CardTitle className="text-xl">Body Corporate Insurance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-blue-700">Covers:</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✓ Common property structure</li>
                      <li>✓ Shared building services</li>
                      <li>✓ Common area liability</li>
                      <li>✓ Management committee protection</li>
                      <li>✓ Statutory requirements</li>
                      <li>✓ Common property contents</li>
                    </ul>

                    <h4 className="font-semibold mb-3 text-green-700">Paid By:</h4>
                    <p className="text-sm text-gray-700">
                      All unit owners through quarterly strata levies.
                      Cost shared based on unit entitlements.
                    </p>
                  </CardContent>
                </Card>

                {/* Unit Owner Insurance */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Home className="w-8 h-8 text-green-600" />
                      <CardTitle className="text-xl">Unit Owner Insurance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-green-700">Covers:</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>✓ Contents and personal belongings</li>
                      <li>✓ Unit improvements and renovations</li>
                      <li>✓ Personal liability</li>
                      <li>✓ Alternative accommodation</li>
                      <li>✓ Internal unit fixtures</li>
                      <li>✓ Loss of rent (if investment)</li>
                    </ul>

                    <h4 className="font-semibold mb-3 text-blue-700">Coverage Types:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Contents insurance (essential)</li>
                      <li>• Unit/lot owners insurance</li>
                      <li>• Landlord insurance (if renting)</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Gap Areas */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                      <CardTitle className="text-xl">Potential Gap Areas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibant mb-3 text-red-700">Common Gaps:</h4>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>⚠ Water damage between units</li>
                      <li>⚠ Unit improvements/renovations</li>
                      <li>⚠ Balcony and courtyard contents</li>
                      <li>⚠ Internal unit water pipes</li>
                      <li>⚠ Unit-specific electrical issues</li>
                      <li>⚠ Glass replacement (varies by state)</li>
                    </ul>

                    <h4 className="font-semibold mb-3 text-amber-700">Important:</h4>
                    <p className="text-sm text-gray-700">
                      Check your strata bylaws and insurance
                      policies for specific coverage boundaries.
                      Gap insurance may be available.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* State-by-State Differences */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">State-by-State Differences</h2>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-blue-700">New South Wales</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Owners Corporation</li>
                      <li>• Must insure to full replacement value</li>
                      <li>• $20M public liability minimum</li>
                      <li>• Office bearer liability included</li>
                      <li>• Building defects coverage required</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-green-700">Victoria</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Owners Corporation</li>
                      <li>• Reinstatement value required</li>
                      <li>• $10M public liability minimum</li>
                      <li>• Committee member protection</li>
                      <li>• Common property damage emphasis</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibant mb-2 text-orange-700">Queensland</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Body Corporate</li>
                      <li>• Full replacement cost required</li>
                      <li>• $10M public liability minimum</li>
                      <li>• Lot owner improvements coverage</li>
                      <li>• Caretaking/letting agent liability</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-purple-700">Western Australia</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Strata Company</li>
                      <li>• Reinstatement cost basis</li>
                      <li>• $5M public liability minimum</li>
                      <li>• Council of owners protection</li>
                      <li>• Common property focus</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-red-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-red-700">South Australia</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Strata Corporation</li>
                      <li>• Current replacement value</li>
                      <li>• Adequate public liability</li>
                      <li>• Management committee coverage</li>
                      <li>• Community property insurance</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-yellow-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-yellow-700">Tasmania & Territories</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Body Corporate (TAS/ACT/NT)</li>
                      <li>• Full reinstatement value</li>
                      <li>• Adequate public liability</li>
                      <li>• Executive committee protection</li>
                      <li>• Common property emphasis</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Strata Insurance */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Strata Insurance Coverage</h2>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Basic Strata Insurance */}
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700">Basic Strata Insurance</CardTitle>
                  <CardDescription>Minimum required coverage for body corporates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Mandatory Inclusions:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Common property building structure</li>
                        <li>✓ Public liability (state minimums)</li>
                        <li>✓ Management/committee liability</li>
                        <li>✓ Fire, storm, theft protection</li>
                        <li>✓ Basic common area contents</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibant mb-3 text-red-700">Limitations:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✗ Limited coverage amounts</li>
                        <li>✗ Basic perils only</li>
                        <li>✗ No lot owner improvements</li>
                        <li>✗ Limited business interruption</li>
                        <li>✗ Minimal additional benefits</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comprehensive Strata Insurance */}
              <Card className="border-blue-300 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700">Comprehensive Strata Insurance</CardTitle>
                  <CardDescription>Enhanced protection with broader coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Additional Features:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Accidental damage coverage</li>
                        <li>✓ Higher public liability limits</li>
                        <li>✓ Lot owner improvements coverage</li>
                        <li>✓ Loss of rent/service charges</li>
                        <li>✓ Alternative accommodation</li>
                        <li>✓ Temporary repairs and protection</li>
                        <li>✓ Professional fees coverage</li>
                        <li>✓ Removal of debris</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-700">Premium Options:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>+ Glass replacement coverage</li>
                        <li>+ Motor burnout protection</li>
                        <li>+ Cyber liability coverage</li>
                        <li>+ Employment practices liability</li>
                        <li>+ Legal expenses coverage</li>
                        <li>+ Building defects coverage</li>
                        <li>+ Contract works insurance</li>
                        <li>+ Office bearer indemnity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Claims and Issues */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Common Strata Insurance Claims and Issues</h2>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-6">
                <Card className="border-l-4 border-red-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-red-700">Water Damage Between Units</h3>
                    <p className="text-gray-700 mb-2">
                      The most common and complex strata claims. Damage can originate in one unit but affect
                      multiple units and common property. Coverage depends on cause, location, and policy terms.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-700">Usually Covered by Strata:</h5>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Burst common water pipes</li>
                          <li>• Roof leaks into units</li>
                          <li>• Common area flooding</li>
                          <li>• External water penetration</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-700">Usually Unit Owner's Responsibility:</h5>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Unit-specific plumbing failures</li>
                          <li>• Appliance overflows within unit</li>
                          <li>• Negligent water damage</li>
                          <li>• Unit renovation water damage</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-orange-700">Building Defects and Structural Issues</h3>
                    <p className="text-gray-700 mb-2">
                      Significant concern for newer strata buildings. Coverage varies widely between policies
                      and may require specific building defect insurance or warranty coverage.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Structural movement and cracking</li>
                      <li>• Waterproofing failures</li>
                      <li>• External cladding issues</li>
                      <li>• Fire safety system defects</li>
                      <li>• Common area construction defects</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibant mb-2 text-green-700">Liability Claims in Common Areas</h3>
                    <p className="text-gray-700 mb-2">
                      Body corporates face liability for injuries and damage in common areas. Adequate
                      public liability coverage and proper maintenance are essential.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Slip and fall accidents</li>
                      <li>• Pool and gymnasium injuries</li>
                      <li>• Lift malfunctions</li>
                      <li>• Balcony and stairwell accidents</li>
                      <li>• Car park incidents</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-purple-700">Glass and Glazing Claims</h3>
                    <p className="text-gray-700 mb-2">
                      Glass replacement can be expensive in modern apartment buildings. Coverage varies
                      between policies and may distinguish between accidental and storm damage.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Common area glazing and windows</li>
                      <li>• Balcony glass panels and balustrades</li>
                      <li>• Entry door glass and shopfronts</li>
                      <li>• Internal common area glass features</li>
                      <li>• Accidental vs storm damage distinctions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Unit Owner Responsibilities */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Essential Unit Owner Insurance</h2>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Contents Insurance (Essential)</h3>
                    <p className="text-gray-700">
                      Protects your personal belongings, furniture, electronics, and clothing. Strata insurance
                      does NOT cover your personal property. Choose replacement value coverage and ensure
                      adequate sum insured - most people significantly underestimate contents value.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibant mb-2">Personal Liability Insurance</h3>
                    <p className="text-gray-700">
                      Covers you for liability claims arising from within your unit or caused by your actions.
                      Strata public liability only covers common areas. Consider minimum $20 million coverage
                      for adequate protection against injury or damage claims.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Alternative Accommodation</h3>
                    <p className="text-gray-700">
                      If your unit becomes uninhabitable, strata insurance typically won't provide alternative
                      accommodation for unit owners. Your contents policy should include temporary accommodation
                      coverage - typically 10-20% of contents sum insured.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Unit Improvements and Renovations</h3>
                    <p className="text-gray-700">
                      Any improvements or renovations you make to your unit beyond the original specification
                      may not be covered by strata insurance. This includes upgraded kitchens, bathrooms,
                      flooring, lighting, and fixtures. Ensure these are covered by your personal insurance.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">Landlord Insurance (If Renting Out)</h3>
                    <p className="text-gray-700">
                      If you rent your unit, standard contents insurance won't cover landlord risks. You need
                      specific landlord insurance covering rental income loss, tenant damage, and landlord
                      liability. This is in addition to, not instead of, your personal contents coverage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Tips for Unit Owners */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Expert Tips for Unit Owners</h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Review Strata Insurance Annually</h3>
                  <p className="text-gray-700 text-sm">
                    Attend AGMs and review the body corporate's insurance arrangements. Ensure coverage
                    is adequate and understand what's covered. Ask for insurance certificates and review
                    policy summaries provided.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Understand Your Bylaws</h3>
                  <p className="text-gray-700 text-sm">
                    Read your strata bylaws carefully to understand what you're responsible for maintaining
                    and insuring. Bylaws can vary significantly between developments and may override
                    standard state legislation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibant mb-2 text-green-700">Document Unit Improvements</h3>
                  <p className="text-gray-700 text-sm">
                    Keep detailed records and receipts for all improvements and renovations. Take photos
                    before and after work. This documentation is crucial for insurance claims and
                    establishing coverage boundaries.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-green-700">Maintain Communication</h3>
                  <p className="text-gray-700 text-sm">
                    Stay engaged with your body corporate and strata manager. Report maintenance issues
                    promptly. Understand the claims process for both strata and personal insurance.
                    Build relationships with neighbours for mutual protection.
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
                  This guide provides general information only about strata insurance in Australia.
                  Strata legislation, insurance requirements, and coverage vary significantly between
                  states, territories, and individual developments. Always read your strata bylaws,
                  building insurance policies, and personal insurance policies carefully. Consult
                  with your strata manager, body corporate committee, insurance broker, or legal
                  professional for advice specific to your circumstances and development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Strata Property Damage?</h2>
            <p className="text-xl mb-8">
              We specialise in strata and apartment building restoration. Our team understands the
              complexities of body corporate insurance and can work with your strata manager and insurer.
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