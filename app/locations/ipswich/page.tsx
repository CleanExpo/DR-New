import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Disaster Recovery Ipswich | Water Fire Damage Restoration | 1300 309 361",
  description: "24/7 emergency disaster recovery services in Ipswich. Professional water damage, fire damage restoration & mould remediation. 1-hour response time guaranteed.",
  keywords: ["disaster recovery ipswich", "water damage restoration ipswich", "fire damage ipswich", "emergency restoration ipswich", "flood damage ipswich", "storm damage ipswich", "ipswich restoration services"],
  openGraph: {
    title: "Disaster Recovery Ipswich - 24/7 Emergency Response",
    description: "Professional disaster recovery services throughout Ipswich. Water damage, fire restoration, mould remediation. Call 1300 309 361 for immediate help.",
    url: "https://disasterrecoverybrisbane.com.au/locations/ipswich",
    siteName: "Disaster Recovery Brisbane",
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: "https://disasterrecoverybrisbane.com.au/locations/ipswich",
  }
};

export default function IpswichLocationPage() {
  const ipswichSuburbs = [
    "Ipswich CBD", "Booval", "Brassall", "Bundamba", "Churchill",
    "Collingwood Park", "Dinmore", "Flinders View", "Goodna", "Karalee",
    "Leichhardt", "Newtown", "North Booval", "North Ipswich", "One Mile",
    "Raceview", "Redbank", "Redbank Plains", "Riverview", "Rosewood",
    "Sadliers Crossing", "Springfield", "Springfield Lakes", "Tivoli", "Woodend"
  ];

  const emergencyServices = [
    {
      name: "Water Damage Restoration",
      description: "Burst pipes, flooding, storm damage - rapid water extraction and drying",
      icon: "💧",
      link: "/services/water-damage-restoration"
    },
    {
      name: "Fire & Smoke Damage",
      description: "Complete fire restoration including smoke and soot removal",
      icon: "🔥",
      link: "/services/fire-damage-restoration"
    },
    {
      name: "Mould Remediation",
      description: "Professional mould removal and prevention services",
      icon: "🦠",
      link: "/services/mould-remediation"
    },
    {
      name: "Storm Damage",
      description: "Emergency tarping, debris removal, and structural repairs",
      icon: "⛈️",
      link: "/services/storm-damage"
    }
  ];

  const localRisks = [
    {
      risk: "Bremer River Flooding",
      description: "Ipswich is prone to flooding from the Bremer River, particularly affecting low-lying suburbs",
      preparation: "Know your flood zone, have an evacuation plan, and store valuables above potential flood levels"
    },
    {
      risk: "Storm Season Damage",
      description: "Summer storms bring heavy rain, hail, and strong winds to the Ipswich region",
      preparation: "Regular roof inspections, gutter cleaning, and tree maintenance can prevent major damage"
    },
    {
      risk: "Heritage Building Challenges",
      description: "Ipswich's historic buildings require specialized restoration techniques",
      preparation: "Regular maintenance and professional assessments help preserve heritage properties"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Disaster Recovery Services Ipswich
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              24/7 Emergency Response • 1-Hour Arrival • Insurance Approved
            </p>

            {/* Emergency CTA */}
            <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6 mb-8">
              <p className="text-lg font-semibold mb-4">Emergency? We're Here 24/7</p>
              <a href="tel:1300309361" className="inline-block">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl">
                  <span className="animate-pulse">📞</span> 1300 309 361
                </Button>
              </a>
              <p className="text-sm mt-3 text-gray-700">
                Serving all Ipswich suburbs with rapid emergency response
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ IICRC Certified</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ Insurance Approved</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ Local Ipswich Team</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ 1-Hour Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage Area */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Servicing All Ipswich Suburbs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {ipswichSuburbs.map((suburb) => (
              <div key={suburb} className="bg-blue-50 px-3 py-2 rounded text-center text-sm hover:bg-blue-100 transition-colors">
                {suburb}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-700">
            Plus all surrounding areas within the Ipswich region
          </p>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Emergency Restoration Services in Ipswich
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Professional disaster recovery services available 24/7. Our Ipswich team responds within 1 hour to minimize damage and begin immediate restoration.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {emergencyServices.map((service) => (
              <Card key={service.name} className="hover:shadow-xl transition-all duration-300">
                <Link href={service.link}>
                  <div className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <p className="text-blue-600 font-semibold hover:underline">
                      Learn More →
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Risks & Preparation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ipswich-Specific Disaster Risks
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {localRisks.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  {item.risk}
                </h3>
                <p className="text-gray-700 mb-3">{item.description}</p>
                <div className="bg-white rounded p-4">
                  <p className="text-sm font-semibold text-green-700 mb-1">Prevention Tip:</p>
                  <p className="text-sm text-gray-700">{item.preparation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Ipswich Residents Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1h
              </div>
              <h3 className="font-semibold mb-2">1-Hour Response</h3>
              <p className="text-gray-700">Fastest emergency response time in Ipswich</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                🏠
              </div>
              <h3 className="font-semibold mb-2">Local Team</h3>
              <p className="text-gray-700">Ipswich-based technicians who know the area</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="font-semibold mb-2">Insurance Approved</h3>
              <p className="text-gray-700">Work with all major insurance companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent Emergency Response in Ipswich
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <p className="text-sm text-gray-500 mb-2">Brassall</p>
              <p className="font-semibold mb-2">Burst Pipe Water Damage</p>
              <p className="text-sm text-gray-700">Response time: 45 minutes</p>
              <p className="text-sm text-green-600 mt-2">✓ Fully restored in 4 days</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500 mb-2">Redbank Plains</p>
              <p className="font-semibold mb-2">Storm Damage Restoration</p>
              <p className="text-sm text-gray-700">Response time: 35 minutes</p>
              <p className="text-sm text-green-600 mt-2">✓ Emergency tarping same day</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500 mb-2">Springfield Lakes</p>
              <p className="font-semibold mb-2">Kitchen Fire Damage</p>
              <p className="text-sm text-gray-700">Response time: 55 minutes</p>
              <p className="text-sm text-green-600 mt-2">✓ Complete restoration in 1 week</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Emergency Disaster Recovery in Ipswich?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Available 24/7 • Insurance Approved • 1-Hour Response
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                📞 Call 1300 309 361
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                Request Quote Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}