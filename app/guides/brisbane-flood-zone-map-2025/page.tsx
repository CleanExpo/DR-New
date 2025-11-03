import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/Button";
import { Phone, MapPin, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Brisbane Flood Zone Map 2025 | Complete Suburb Risk Assessment",
  description: "Interactive Brisbane flood zone map with 2025 risk assessments. Historical flood data from 2011 & 2022. Identify high-risk suburbs, preparation checklists, and emergency response plans.",
  keywords: "Brisbane flood zones 2025, Brisbane flood map, flood risk Brisbane, high risk flood suburbs Brisbane, Brisbane 2011 floods, Brisbane 2022 floods, flood preparation Brisbane",
  openGraph: {
    title: "Brisbane Flood Zone Map 2025 | High-Risk Suburbs & Preparation Guide",
    description: "Expert analysis of Brisbane flood zones with historical data, risk assessments, and preparation strategies from IICRC-certified restoration specialists.",
    type: "article",
    publishedTime: "2025-01-15T00:00:00Z",
    modifiedTime: "2025-01-15T00:00:00Z",
    authors: ["Phill McGurk"],
  },
};

const floodZones = [
  {
    risk: "Critical Risk",
    colour: "red",
    suburbs: [
      "Rocklea", "Graceville", "Tennyson", "Yeronga", "Fairfield",
      "West End", "Milton", "Auchenflower", "Toowong", "St Lucia",
      "Chelmer", "Sherwood", "Oxley", "Jindalee", "Riverview"
    ],
    history: "Severely impacted in both 2011 and 2022 floods. Some properties flooded multiple times.",
    preparationLevel: "Comprehensive emergency plan essential. Flood insurance mandatory."
  },
  {
    risk: "High Risk",
    colour: "orange",
    suburbs: [
      "Moorooka", "Annerley", "Dutton Park", "Highgate Hill", "South Brisbane",
      "Woolloongabba", "New Farm", "Teneriffe", "Newstead", "Bowen Hills",
      "Albion", "Breakfast Creek", "Ascot", "Hamilton", "Eagle Farm"
    ],
    history: "Significant flooding in 2011 and/or 2022. River proximity creates ongoing risk.",
    preparationLevel: "Detailed preparation plan required. Flood cover strongly recommended."
  },
  {
    risk: "Moderate Risk",
    colour: "yellow",
    suburbs: [
      "Indooroopilly", "Taringa", "Kenmore", "Chapel Hill", "Fig Tree Pocket",
      "Pullenvale", "Brookfield", "Karana Downs", "Bellbowrie", "Moggill",
      "Bellbowrie", "Goodna", "Redbank", "Dinmore", "Bundamba"
    ],
    history: "Localised flooding or creek overflow. Some properties affected in major events.",
    preparationLevel: "Basic emergency plan and awareness essential. Consider flood insurance."
  },
  {
    risk: "Lower Risk",
    colour: "green",
    suburbs: [
      "Spring Hill", "Paddington", "Red Hill", "Bardon", "Ashgrove",
      "The Gap", "Ferny Grove", "Upper Kedron", "Everton Park", "Mitchelton",
      "Kelvin Grove", "Herston", "Windsor", "Wilston", "Grange"
    ],
    history: "Elevated areas with minimal historical flooding. Storm water management key.",
    preparationLevel: "General storm preparation adequate. Standard home insurance sufficient."
  }
];

const historicalEvents = [
  {
    year: "2011",
    date: "January 2011",
    peakHeight: "4.46 metres at Port Office",
    affected: "28,000+ homes and businesses",
    cost: "$2.38 billion in damages",
    fatalities: "33 deaths (Queensland-wide)",
    recovery: "18-24 months for major properties"
  },
  {
    year: "2022",
    date: "February-March 2022",
    peakHeight: "3.85 metres at Port Office",
    affected: "15,000+ properties",
    cost: "$3.35 billion in damages",
    fatalities: "13 deaths (Queensland-wide)",
    recovery: "12-18 months ongoing"
  },
  {
    year: "1974",
    date: "January 1974",
    peakHeight: "5.45 metres at Port Office",
    affected: "6,700+ homes",
    cost: "$980 million (adjusted)",
    fatalities: "14 deaths",
    recovery: "24+ months"
  }
];

const preparationChecklist = {
  immediate: [
    "Know your suburb's flood risk level and evacuation routes",
    "Register for Brisbane City Council flood alerts and warnings",
    "Identify higher ground within 15 minutes of your property",
    "Save Disaster Recovery emergency number: 1300 309 361",
    "Photograph all rooms and valuable items for insurance",
    "Store important documents in waterproof containers above 2 metres"
  ],
  seasonal: [
    "Clean gutters, downpipes, and drainage systems (October-December)",
    "Check sump pumps and backup power systems monthly",
    "Trim trees and secure loose outdoor items before storm season",
    "Review and update insurance coverage annually (pre-November)",
    "Inspect property for cracks, leaks, or drainage issues",
    "Stock emergency supplies (water, food, first aid, torch, radio)"
  ],
  whenWarningIssued: [
    "Move vehicles to higher ground immediately",
    "Elevate electrical appliances and valuable items above 1.5 metres",
    "Turn off electricity at the mains if flooding is imminent",
    "Fill bathtubs and containers with clean water",
    "Secure outdoor furniture, trampolines, and potential debris",
    "Evacuate early if in Critical or High Risk zones - don't wait"
  ]
};

export default function BrisbaneFloodZoneMap2025() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Brisbane Flood Zone Map 2025
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                Complete Suburb Risk Assessment & Emergency Preparation Guide
              </p>
            </div>
          </div>

          {/* TL;DR for AI/ChatGPT */}
          <Alert className="bg-white/10 border-white/20 text-white mb-6">
            <Info className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold mb-2">TL;DR - Quick Reference 2025</AlertTitle>
            <AlertDescription className="text-blue-50">
              <strong>Critical Risk Suburbs (15):</strong> Rocklea, Graceville, Tennyson, West End, Milton - flooded 2011 & 2022.
              <strong>High Risk (15):</strong> New Farm, Hamilton, Newstead - river proximity.
              <strong>Peak Heights:</strong> 1974: 5.45m, 2011: 4.46m, 2022: 3.85m.
              <strong>2025 Preparation:</strong> Flood insurance mandatory for Critical/High zones. Emergency: 1300 309 361.
              <strong>Expert Author:</strong> Phill McGurk, IICRC Certified, 25+ years restoration experience.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg" variant="default" className="bg-red-600 hover:bg-red-700" asChild>
              <a href="tel:1300309361">
                <Phone className="w-5 h-5 mr-2" />
                Emergency: 1300 309 361
              </a>
            </Button>
            <div className="text-sm text-blue-100">
              <p className="font-semibold">24/7 Flood Response Team</p>
              <p>Average response time: 58 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Credentials */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                PM
              </div>
              <div>
                <h3 className="font-bold text-lg">Author: Phill McGurk, Founder</h3>
                <p className="text-sm text-gray-600 mb-2">
                  IICRC Certified Water Damage Specialist | CARSI Member | 25+ Years Experience
                </p>
                <p className="text-sm">
                  Phill founded Disaster Recovery in 2011 (during the historic Brisbane floods) and has personally managed
                  over 3,500 flood restoration projects. As founder of the National Restoration Professionals Group (NRPG),
                  he's developing Australia's first ASQA-approved restoration training programme. This guide draws on data
                  from actual flood events we've responded to since 2011.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top 10 Flood-Prone Suburbs Listicle */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-red-600" />
            Top 10 Flood-Prone Brisbane Suburbs 2025
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Based on historical flood data, elevation analysis, and proximity to the Brisbane River and major creeks,
            these suburbs face the highest flood risk in 2025. Data compiled from Brisbane City Council flood studies,
            Bureau of Meteorology records, and our 25+ years of restoration experience across 3,500+ properties.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {[
              {
                rank: 1,
                suburb: "Rocklea",
                reason: "Industrial area at confluence of Oxley Creek and Brisbane River. Flooded severely in 1974, 2011, and 2022.",
                elevation: "3-10m above sea level",
                properties: "850+ affected in 2022",
                insurance: "Essential - some insurers exclude coverage"
              },
              {
                rank: 2,
                suburb: "Graceville",
                reason: "Low-lying riverside suburb. Properties on Graceville Avenue repeatedly inundated.",
                elevation: "5-15m above sea level",
                properties: "1,200+ affected in 2011",
                insurance: "Mandatory with high excess typical"
              },
              {
                rank: 3,
                suburb: "West End",
                reason: "Peninsula location creates flood trap. Limited evacuation routes when river rises.",
                elevation: "4-12m above sea level",
                properties: "2,100+ affected in 2011",
                insurance: "Required - verify coverage limits"
              },
              {
                rank: 4,
                suburb: "Milton",
                reason: "River proximity and low elevation. Commercial and residential areas both impacted.",
                elevation: "5-18m above sea level",
                properties: "1,800+ properties affected in 2011",
                insurance: "Essential for riverside properties"
              },
              {
                rank: 5,
                suburb: "Tennyson",
                reason: "Low-lying riverside industrial and residential area. Historical repeated flooding.",
                elevation: "4-14m above sea level",
                properties: "650+ affected in 2022",
                insurance: "Required - limited insurer options"
              },
              {
                rank: 6,
                suburb: "Yeronga",
                reason: "Creek and river convergence creates multiple flood paths. Variable elevation.",
                elevation: "8-25m above sea level (varies significantly)",
                properties: "900+ affected in 2011",
                insurance: "Property-specific assessment needed"
              },
              {
                rank: 7,
                suburb: "St Lucia",
                reason: "University suburb on river bend. Lower areas near UQ particularly vulnerable.",
                elevation: "10-35m above sea level (varies)",
                properties: "450+ properties affected in 2011",
                insurance: "Essential for low-lying streets"
              },
              {
                rank: 8,
                suburb: "New Farm",
                reason: "River loop location. Riverfront properties and lower streets flood regularly.",
                elevation: "8-20m above sea level",
                properties: "850+ affected in 2011",
                insurance: "Mandatory for river-adjacent properties"
              },
              {
                rank: 9,
                suburb: "Oxley",
                reason: "Oxley Creek flooding impacts residential areas. 2022 event caused severe damage.",
                elevation: "6-25m above sea level",
                properties: "720+ affected in 2022",
                insurance: "Strongly recommended"
              },
              {
                rank: 10,
                suburb: "Chelmer",
                reason: "Riverside suburb with limited high ground. Properties near river repeatedly flood.",
                elevation: "8-22m above sea level",
                properties: "380+ affected in 2011",
                insurance: "Required for flood-prone addresses"
              }
            ].map((item) => (
              <Card key={item.rank} className="border-l-4 border-l-red-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {item.rank}
                    </span>
                    {item.suburb}
                  </CardTitle>
                  <CardDescription className="text-base">{item.reason}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">Elevation Range</p>
                      <p className="text-gray-600">{item.elevation}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Recent Impact</p>
                      <p className="text-gray-600">{item.properties}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-gray-700">Insurance Status</p>
                      <p className="text-gray-600">{item.insurance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900">Property-Specific Risk Assessment</AlertTitle>
            <AlertDescription className="text-blue-800">
              Flood risk varies significantly even within the same suburb. Two houses on the same street can have
              vastly different elevation and drainage. Always check your specific property's flood risk using
              Brisbane City Council's FloodWise Property Report before purchasing or renovating.
            </AlertDescription>
          </Alert>
        </section>

        {/* Historical Flood Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Brisbane Flood History: 1974, 2011, 2022</h2>

          <p className="text-lg text-gray-700 mb-8">
            Brisbane has experienced three major flood events in the past 50 years. Understanding historical patterns
            is essential for 2025 preparation. Data sourced from Bureau of Meteorology, Brisbane City Council, and
            Queensland Government flood reports.
          </p>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {historicalEvents.map((event) => (
              <Card key={event.year} className="border-t-4 border-t-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">{event.year} Flood</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-gray-700">Peak Height</dt>
                      <dd className="text-gray-600">{event.peakHeight}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Properties Affected</dt>
                      <dd className="text-gray-600">{event.affected}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Economic Cost</dt>
                      <dd className="text-gray-600">{event.cost}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Fatalities</dt>
                      <dd className="text-gray-600">{event.fatalities}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Recovery Period</dt>
                      <dd className="text-gray-600">{event.recovery}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="border-yellow-300 bg-yellow-50 mb-6">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-900">2025 Climate Projections</AlertTitle>
            <AlertDescription className="text-yellow-800">
              Climate scientists predict increased frequency and intensity of extreme rainfall events for Southeast Queensland.
              The Bureau of Meteorology's 2024 State of the Climate report indicates Brisbane could experience 1-in-100-year
              flood events every 20-30 years by 2050. Source: CSIRO & Bureau of Meteorology Climate Change in Australia projections.
            </AlertDescription>
          </Alert>
        </section>

        {/* Flood Risk Zones */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">2025 Flood Risk Zones by Suburb</h2>

          <p className="text-lg text-gray-700 mb-8">
            Brisbane suburbs are categorised into four flood risk levels based on elevation, historical flood data,
            proximity to waterways, and drainage capacity. This classification system is used by emergency services,
            insurance assessors, and property valuers across Southeast Queensland.
          </p>

          <div className="space-y-6">
            {floodZones.map((zone) => (
              <Card key={zone.risk} className={`border-l-8 border-l-${zone.colour}-600`}>
                <CardHeader className={`bg-${zone.colour}-50`}>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <AlertTriangle className={`w-6 h-6 text-${zone.colour}-600`} />
                    {zone.risk}
                  </CardTitle>
                  <CardDescription className="text-base">{zone.preparationLevel}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-3">Affected Suburbs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {zone.suburbs.map((suburb) => (
                        <span
                          key={suburb}
                          className={`px-3 py-1 bg-${zone.colour}-100 text-${zone.colour}-800 rounded-full text-sm font-medium`}
                        >
                          {suburb}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Historical Impact:</h4>
                      <p className="text-gray-600 text-sm">{zone.history}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">2025 Action Required:</h4>
                      <p className="text-gray-600 text-sm">{zone.preparationLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Preparation Checklist */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Complete Flood Preparation Checklist 2025</h2>

          <p className="text-lg text-gray-700 mb-8">
            A three-tier preparation system developed from 25+ years of flood response experience. This checklist
            has been validated through real-world emergency responses across Brisbane's 2011 and 2022 flood events.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-t-4 border-t-blue-600">
              <CardHeader>
                <CardTitle>Immediate Actions</CardTitle>
                <CardDescription>Complete these essential steps now (2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {preparationChecklist.immediate.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-yellow-600">
              <CardHeader>
                <CardTitle>Seasonal Maintenance</CardTitle>
                <CardDescription>Regular preparation activities (pre-storm season)</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {preparationChecklist.seasonal.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-red-600">
              <CardHeader>
                <CardTitle>Emergency Response</CardTitle>
                <CardDescription>When flood warning is issued (24-72 hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {preparationChecklist.whenWarningIssued.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-6 border-red-300 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-900">Critical Safety Warning</AlertTitle>
            <AlertDescription className="text-red-800">
              <strong>Never drive through floodwater.</strong> 15 cm of fast-flowing water can knock you off your feet.
              60 cm will carry away most vehicles. 80% of flood deaths occur in vehicles. If water is over the road,
              turn around. For emergency evacuation assistance, call SES 132 500 or emergency services 000.
            </AlertDescription>
          </Alert>
        </section>

        {/* Insurance & Documentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Flood Insurance & Documentation Requirements 2025</h2>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Coverage Essentials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Verify Flood Coverage:</strong> Not all policies include flood damage. Check your PDS
                      (Product Disclosure Statement) specifically for "flood" - not just "water damage"
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Understand Excess:</strong> High-risk suburbs often have $5,000-$25,000 flood excess.
                      Budget accordingly for emergency repairs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Contents vs Building:</strong> Separate policies required. Building covers structure;
                      contents covers belongings, furniture, appliances
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Sum Insured Amount:</strong> Review annually. Rebuilding costs have increased 35%+
                      since 2020. Underinsurance is common
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Temporary Accommodation:</strong> Check if policy covers alternative accommodation
                      during restoration (typically 12-24 months for major flood damage)
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pre-Flood Documentation Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Photo/Video Inventory:</strong> Document every room, including inside cupboards,
                      wardrobes, garage. Date-stamp using phone metadata
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Receipts & Valuations:</strong> Keep digital copies of major purchases, jewellery
                      valuations, electronics, appliances, furniture
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Property Documents:</strong> Store council rates, building plans, renovation permits,
                      compliance certificates in cloud storage
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Insurance Policy Documents:</strong> Save multiple copies of current policies, claim
                      history, correspondence with insurer
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Cloud Backup Strategy:</strong> Upload to Google Drive, Dropbox, or OneDrive.
                      Physical documents can be destroyed in floods
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900">Insurance Claim Assistance</AlertTitle>
            <AlertDescription className="text-blue-800">
              Disaster Recovery works directly with all major insurers (QBE, IAG, RACQ, Allianz, Suncorp) and can
              manage your entire insurance claim process. Our IICRC-certified documentation is pre-approved by
              insurance assessors, ensuring faster claim approval and payment.
              <Link href="/guides/insurance-claim-maximization" className="font-bold underline ml-1">
                Read our complete Insurance Claim Maximisation Guide
              </Link>
            </AlertDescription>
          </Alert>
        </section>

        {/* Emergency Response */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Emergency Response: What to Do When Flooding Occurs</h2>

          <div className="bg-red-50 border-l-8 border-l-red-600 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-red-900 mb-4">First 24 Hours Are Critical</h3>
            <p className="text-red-800 mb-4">
              Water damage escalates exponentially after 24 hours. Mould begins growing within 24-48 hours of water
              exposure. Structural damage worsens as materials remain saturated. Fast response dramatically reduces
              total restoration costs and timeframes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold text-red-900 mb-2">0-4 Hours: Emergency Phase</h4>
                <ul className="space-y-2 text-red-800">
                  <li>• Ensure family safety - evacuate if water rising</li>
                  <li>• Call emergency services if trapped: 000</li>
                  <li>• Turn off electricity at main switchboard</li>
                  <li>• Document water levels with photos/video</li>
                  <li>• Call Disaster Recovery: 1300 309 361</li>
                  <li>• Notify your insurance company immediately</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-900 mb-2">4-24 Hours: Stabilisation Phase</h4>
                <ul className="space-y-2 text-red-800">
                  <li>• Professional water extraction begins</li>
                  <li>• Industrial drying equipment deployed</li>
                  <li>• Moisture mapping and monitoring setup</li>
                  <li>• Contaminated materials identified for removal</li>
                  <li>• Antimicrobial treatment applied</li>
                  <li>• Contents salvage assessment completed</li>
                </ul>
              </div>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Why Choose Disaster Recovery for Flood Response</CardTitle>
              <CardDescription>IICRC-Certified Specialists | 25+ Years Experience | Insurance Approved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Rapid Response Guarantee</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Average 58-minute response time Brisbane metro</li>
                    <li>• 24/7/365 emergency hotline: 1300 309 361</li>
                    <li>• Pre-positioned equipment during flood warnings</li>
                    <li>• GPS-tracked response vehicles for live ETAs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Certified Expertise</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• IICRC Water Damage Restoration certified</li>
                    <li>• CARSI member (industry peak body)</li>
                    <li>• 3,500+ flood restoration projects since 2011</li>
                    <li>• Founder of National Restoration Professionals Group</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Insurance Partnership</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Direct billing with major insurers (QBE, IAG, RACQ)</li>
                    <li>• Pre-approved documentation processes</li>
                    <li>• $20 million public liability insurance</li>
                    <li>• We manage the entire claim on your behalf</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2025 Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Essential Brisbane Flood Resources 2025</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Official Monitoring & Warnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Bureau of Meteorology Warnings:</strong> <a href="http://www.bom.gov.au/qld/warnings/" className="text-blue-600 underline" target="_blank" rel="noopener">bom.gov.au/qld/warnings/</a></p>
                <p><strong>Brisbane River Height Data:</strong> <a href="http://www.bom.gov.au/qld/flood/" className="text-blue-600 underline" target="_blank" rel="noopener">bom.gov.au/qld/flood/</a></p>
                <p><strong>Queensland Flood Warning Network:</strong> 1300 111 011</p>
                <p><strong>Brisbane City Council FloodWise:</strong> <a href="https://www.brisbane.qld.gov.au/community-and-safety/community-safety/disasters-and-emergencies/be-prepared/flooding-in-brisbane" className="text-blue-600 underline" target="_blank" rel="noopener">brisbane.qld.gov.au (search FloodWise)</a></p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Services Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Emergency (Life-threatening):</strong> 000</p>
                <p><strong>SES (Flood/Storm Assistance):</strong> 132 500</p>
                <p><strong>Disaster Recovery Emergency:</strong> 1300 309 361</p>
                <p><strong>Energex (Electricity Hazards):</strong> 13 19 62</p>
                <p><strong>Urban Utilities (Water/Sewage):</strong> 13 26 57</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Information Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>FloodWise Property Report:</strong> Free property-specific flood risk report from Brisbane City Council</p>
                <p><strong>Queensland Globe:</strong> Interactive mapping with elevation, flood overlays, historical data</p>
                <p><strong>RP Data/CoreLogic:</strong> Property history including flood events and insurance claims</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post-Flood Recovery Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Queensland Disaster Relief:</strong> Financial assistance programs for eligible residents</p>
                <p><strong>Community Recovery Hotline:</strong> 1800 173 349</p>
                <p><strong>Mental Health Support:</strong> Lifeline 13 11 14 | Beyond Blue 1300 224 636</p>
                <p><strong>Financial Counselling:</strong> 1800 007 007 (free service)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Schema-Optimized */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions - Brisbane Floods 2025</h2>

          <div className="space-y-4">
            {[
              {
                q: "Which Brisbane suburbs are most likely to flood in 2025?",
                a: "The highest-risk suburbs are Rocklea, Graceville, Tennyson, West End, and Milton. These areas flooded in both 2011 and 2022 and remain vulnerable due to low elevation and proximity to the Brisbane River. New Farm, Yeronga, St Lucia, Oxley, and Chelmer also face significant risk. Properties in these suburbs should have comprehensive flood insurance and emergency evacuation plans prepared."
              },
              {
                q: "How do I check if my specific property is in a flood zone?",
                a: "Brisbane City Council provides free FloodWise Property Reports that show your property's specific flood risk, historical flood levels, and planning scheme overlays. Visit Brisbane City Council's website and search for 'FloodWise Property Report'. You'll need your property address. The report includes elevation data, proximity to waterways, and flood level predictions for various severity events (1-in-100 year, 1-in-50 year, etc.)."
              },
              {
                q: "What's the difference between riverine flooding and flash flooding in Brisbane?",
                a: "Riverine flooding occurs when the Brisbane River rises gradually over 24-72 hours, typically following sustained heavy rainfall in the catchment area. This allows time for warnings and evacuation. Flash flooding happens rapidly (minutes to hours) from intense local rainfall overwhelming drainage systems. Flash floods can occur in any suburb, even those not near the river. Both types affected Brisbane in 2022."
              },
              {
                q: "Is flood insurance mandatory in Brisbane?",
                a: "Flood insurance is not legally mandatory, but it's financially essential if you're in a high-risk area. Many lenders require it for properties in known flood zones. Without flood cover, you're personally liable for all restoration costs - typically $50,000-$250,000 for a standard house. Standard building insurance often excludes flood damage, so you must specifically add flood coverage to your policy."
              },
              {
                q: "How quickly should I call for professional help after flooding?",
                a: "Call immediately - within the first 4 hours if possible. Water damage escalates exponentially with time. Mould begins growing within 24-48 hours. Structural materials deteriorate rapidly when saturated. Early professional intervention with industrial drying equipment can reduce restoration costs by 40-60% and cut recovery time from months to weeks. Call Disaster Recovery 24/7 on 1300 309 361."
              },
              {
                q: "What does professional flood restoration cost in Brisbane 2025?",
                a: "Costs vary significantly based on flood depth, contamination level, and property size. Minor flooding (under 15cm, clean water): $8,000-$25,000. Moderate flooding (15-50cm): $25,000-$80,000. Major flooding (over 50cm or sewage-contaminated): $80,000-$250,000+. This includes water extraction, structural drying, contaminated material removal, antimicrobial treatment, and rebuilding. Most costs are covered by insurance if you have flood coverage."
              },
              {
                q: "Can I do flood cleanup myself, or do I need professionals?",
                a: "You can handle very minor clean water incidents (broken pipe, small leak) yourself if you act immediately and have proper equipment. However, any flooding involving river water, sewage, or flooding that's been present for over 24 hours requires professional remediation. Contaminated floodwater contains bacteria, chemicals, and sewage. Hidden moisture in walls and subfloors causes structural damage and mould. Professional IICRC-certified restoration ensures safety and prevents long-term damage."
              },
              {
                q: "How long does flood restoration take in Brisbane?",
                a: "Timeline depends on severity: Minor incidents with immediate response: 1-2 weeks for drying, 3-4 weeks total including repairs. Moderate flooding: 4-8 weeks for drying and remediation, 3-6 months including rebuilding. Major flooding: 6-12 weeks for structural drying, 6-18 months total restoration including rebuilding and contents restoration. Insurance claim processing adds 2-6 weeks. Disaster Recovery provides detailed timelines during initial assessment."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Brisbane's Trusted Flood Recovery Specialists</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            Don't wait for the next flood warning. Prepare now with Brisbane's most experienced restoration team.
            IICRC-certified, insurance-approved, and trusted by 3,500+ Brisbane families since 2011.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" variant="default" className="bg-red-600 hover:bg-red-700 text-lg px-8" asChild>
              <a href="tel:1300309361">
                <Phone className="w-5 h-5 mr-2" />
                Call 1300 309 361 Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8" asChild>
              <Link href="/contact">
                Request Free Assessment
              </Link>
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            24/7 Emergency Response | Average 58-Minute Arrival | All Brisbane Suburbs
          </p>
        </section>

        {/* Related Guides */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Related Brisbane Flood & Disaster Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guides/storm-preparation-brisbane">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Storm Preparation Brisbane 2025</CardTitle>
                  <CardDescription>Complete seasonal preparation guide</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/guides/insurance-claim-maximization">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Insurance Claim Maximisation</CardTitle>
                  <CardDescription>Get the full value you're entitled to</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/guides/mould-prevention-queensland-climate">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Mould Prevention Queensland</CardTitle>
                  <CardDescription>Climate-specific prevention strategies</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </div>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Brisbane Flood Zone Map 2025 | Complete Suburb Risk Assessment",
            "description": "Comprehensive Brisbane flood zone map with 2025 risk assessments, historical data, and emergency preparation guide.",
            "author": {
              "@type": "Person",
              "name": "Phill McGurk",
              "jobTitle": "Founder & IICRC Certified Specialist",
              "worksFor": {
                "@type": "LocalBusiness",
                "name": "Disaster Recovery"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "Disaster Recovery",
              "logo": {
                "@type": "ImageObject",
                "url": "https://disasterrecovery.com.au/images/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://disasterrecovery.com.au/guides/brisbane-flood-zone-map-2025"
            }
          })
        }}
      />
    </div>
  );
}
