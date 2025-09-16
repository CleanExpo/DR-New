import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Disaster Recovery Logan | Water Fire Damage Restoration | 1300 309 361",
  description: "24/7 emergency disaster recovery services in Logan City. Professional water damage, fire damage restoration & mould remediation. 1-hour response guaranteed.",
  keywords: ["disaster recovery logan", "water damage restoration logan", "fire damage logan", "emergency restoration logan", "flood damage logan", "storm damage logan", "logan restoration services", "logan city disaster recovery"],
  openGraph: {
    title: "Disaster Recovery Logan - 24/7 Emergency Response",
    description: "Professional disaster recovery services throughout Logan City. Water damage, fire restoration, mould remediation. Call 1300 309 361 for immediate help.",
    url: "https://disasterrecoverybrisbane.com.au/locations/logan",
    siteName: "Disaster Recovery Brisbane",
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: "https://disasterrecoverybrisbane.com.au/locations/logan",
  }
};

export default function LoganLocationPage() {
  const loganSuburbs = [
    "Logan Central", "Beenleigh", "Bethania", "Boronia Heights", "Browns Plains",
    "Berrinba", "Carbrook", "Cornubia", "Crestmead", "Daisy Hill",
    "Eagleby", "Edens Landing", "Greenbank", "Heritage Park", "Hillcrest",
    "Holmview", "Kingston", "Loganholme", "Loganlea", "Logan Reserve",
    "Logan Village", "Marsden", "Meadowbrook", "Mount Warren Park", "Park Ridge",
    "Priestdale", "Regents Park", "Rochedale South", "Shailer Park", "Slacks Creek",
    "Springwood", "Tanah Merah", "Underwood", "Waterford", "Waterford West",
    "Windaroo", "Woodridge", "Yarrabilba"
  ];

  const emergencyServices = [
    {
      name: "Water Damage Restoration",
      description: "Rapid water extraction, drying, and restoration for floods and leaks",
      icon: "💧",
      link: "/services/water-damage-restoration"
    },
    {
      name: "Fire & Smoke Damage",
      description: "Complete fire restoration including structure, contents, and odor removal",
      icon: "🔥",
      link: "/services/fire-damage-restoration"
    },
    {
      name: "Mould Remediation",
      description: "Safe mould removal and prevention for healthy indoor air quality",
      icon: "🦠",
      link: "/services/mould-remediation"
    },
    {
      name: "Storm & Flood Recovery",
      description: "Emergency response for storm damage and Logan River flooding",
      icon: "⛈️",
      link: "/services/storm-damage"
    }
  ];

  const localRisks = [
    {
      risk: "Logan River Flooding",
      description: "Properties near the Logan River are at risk during heavy rainfall and flood events",
      preparation: "Install flood barriers, elevate electrical systems, and maintain adequate insurance coverage"
    },
    {
      risk: "Severe Storm Activity",
      description: "Logan experiences intense summer storms with damaging winds and hail",
      preparation: "Secure outdoor items, maintain trees, and ensure roof integrity before storm season"
    },
    {
      risk: "Urban Flash Flooding",
      description: "Rapid development has increased flash flooding risk in many Logan suburbs",
      preparation: "Keep drains clear, install proper drainage, and have sandbags ready during wet season"
    },
    {
      risk: "Industrial Incidents",
      description: "Logan's industrial areas may require specialized biohazard and chemical cleanup",
      preparation: "Know evacuation routes and maintain emergency contact information"
    }
  ];

  const serviceHighlights = [
    {
      title: "Fastest Response in Logan",
      description: "Our Logan-based team arrives within 1 hour, 24/7",
      icon: "⚡"
    },
    {
      title: "Insurance Specialists",
      description: "We work directly with all major insurance companies",
      icon: "📋"
    },
    {
      title: "Advanced Equipment",
      description: "Industrial-grade drying and restoration technology",
      icon: "🔧"
    },
    {
      title: "IICRC Certified",
      description: "Internationally recognized restoration standards",
      icon: "🏆"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Disaster Recovery Services Logan City
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
              <p className="text-sm mt-3 text-gray-600">
                Serving all Logan City suburbs with rapid emergency response
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ IICRC Certified</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ Insurance Approved</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ Local Logan Team</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">✅ Industrial Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage Area */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Coverage Across Logan City
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
            {loganSuburbs.map((suburb) => (
              <div key={suburb} className="bg-blue-50 px-3 py-2 rounded text-center text-sm hover:bg-blue-100 transition-colors">
                {suburb}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">
            Plus all surrounding areas within Logan City Council boundaries
          </p>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Emergency Restoration Services in Logan
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Professional disaster recovery services available 24/7. Our Logan team specializes in residential, commercial, and industrial restoration with guaranteed 1-hour response times.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {emergencyServices.map((service) => (
              <Card key={service.name} className="hover:shadow-xl transition-all duration-300">
                <Link href={service.link}>
                  <div className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
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

      {/* Service Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Logan Residents Trust Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {serviceHighlights.map((highlight) => (
              <div key={highlight.title} className="text-center">
                <div className="text-5xl mb-4">{highlight.icon}</div>
                <h3 className="font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Risks & Preparation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Logan-Specific Disaster Risks & Prevention
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {localRisks.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  {item.risk}
                </h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <div className="bg-green-50 rounded p-4 border-l-4 border-green-500">
                  <p className="text-sm font-semibold text-green-700 mb-1">Prevention Strategy:</p>
                  <p className="text-sm text-gray-600">{item.preparation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial & Commercial */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Commercial & Industrial Restoration
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-700 mb-8">
              Logan's diverse economy requires specialized restoration services. We provide:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Commercial Properties</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Retail stores and shopping centers</li>
                  <li>• Office buildings and warehouses</li>
                  <li>• Restaurants and food facilities</li>
                  <li>• Medical and healthcare facilities</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Industrial Facilities</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Manufacturing plants</li>
                  <li>• Distribution centers</li>
                  <li>• Chemical spill cleanup</li>
                  <li>• Heavy machinery restoration</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent Emergency Response in Logan
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <p className="text-sm text-gray-500 mb-2">Springwood</p>
              <p className="font-semibold mb-2">Commercial Water Damage</p>
              <p className="text-sm text-gray-600">Response time: 40 minutes</p>
              <p className="text-sm text-green-600 mt-2">✓ Business reopened in 3 days</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500 mb-2">Beenleigh</p>
              <p className="font-semibold mb-2">Residential Fire Restoration</p>
              <p className="text-sm text-gray-600">Response time: 50 minutes</p>
              <p className="text-sm text-green-600 mt-2">✓ Family back home in 2 weeks</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500 mb-2">Browns Plains</p>
              <p className="font-semibold mb-2">Storm & Flood Damage</p>
              <p className="text-sm text-gray-600">Response time: 30 minutes</p>
              <p className="text-sm text-green-600 mt-2">✓ Emergency tarping within 2 hours</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Emergency Disaster Recovery in Logan?
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
          <p className="mt-8 text-sm opacity-75">
            Proudly serving Logan City for over 10 years with professional disaster recovery services
          </p>
        </div>
      </section>
    </main>
  );
}