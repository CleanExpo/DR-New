import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Phone, Wind, AlertTriangle, CheckCircle2, Info, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "Mould Prevention Queensland Climate 2025 | Expert Guide",
  description: "Complete mould prevention guide for Queensland's humid subtropical climate. Seasonal risks, prevention strategies, health warnings, DIY vs professional assessment. IICRC-certified expertise.",
  keywords: "mould prevention Queensland, Brisbane mould prevention, Queensland climate mould, humidity control Brisbane, mould remediation Queensland, toxic mould Brisbane",
  openGraph: {
    title: "Mould Prevention Queensland Climate | 5 Signs You Need Professional Help",
    description: "Expert mould prevention strategies for Queensland's challenging climate. IICRC-certified advice from specialists who've remediated 2,000+ Queensland properties.",
    type: "article",
    publishedTime: "2025-01-15T00:00:00Z",
    modifiedTime: "2025-01-15T00:00:00Z",
    authors: ["Phill McGurk"],
  },
};

const queenslandClimate = {
  temperature: {
    summer: "Average 25-31°C (December-February)",
    winter: "Average 15-22°C (June-August)",
    humidity: "60-80% year-round, 85%+ during wet season"
  },
  rainfall: {
    annual: "1,000-1,800mm Brisbane metro (varies by suburb)",
    wetSeason: "November-April (70% of annual rainfall)",
    drySeason: "May-October (lower but still significant rainfall)"
  },
  mouldRisk: {
    critical: "November-March (hot + humid + rain = perfect mould conditions)",
    high: "April, October (transition periods with variable conditions)",
    moderate: "May-September (cooler but still humid - mould grows year-round)"
  }
};

const mouldTypes = [
  {
    name: "Aspergillus",
    appearance: "Green, yellow, or white powdery growth",
    locations: "Air conditioning systems, damp walls, bathrooms",
    health: "Respiratory infections, allergic reactions, asthma triggers",
    toxicity: "Moderate-High (some species produce mycotoxins)",
    prevalence: "Most common indoor mould in Queensland (60%+ of samples)"
  },
  {
    name: "Stachybotrys (Black Mould)",
    appearance: "Dark black or greenish-black slimy patches",
    locations: "Water-damaged drywall, ceiling tiles, wood, paper",
    health: "Severe respiratory issues, neurological symptoms, chronic fatigue",
    toxicity: "High (produces trichothecene mycotoxins)",
    prevalence: "Less common but dangerous - found in 8-12% of water-damaged properties"
  },
  {
    name: "Penicillium",
    appearance: "Blue or green velvety growth",
    locations: "Carpets, wallpaper, insulation, fabrics, water-damaged materials",
    health: "Allergic reactions, sinus infections, lung inflammation",
    toxicity: "Low-Moderate (generally less toxic but still problematic)",
    prevalence: "Very common - second most frequent type in Queensland (40%+ of samples)"
  },
  {
    name: "Cladosporium",
    appearance: "Olive-green to brown or black spots",
    locations: "Window frames, wooden surfaces, fabrics, outdoor areas",
    health: "Asthma triggers, skin infections, respiratory problems",
    toxicity: "Low (rarely produces toxins but highly allergenic)",
    prevalence: "Common outdoor mould that enters buildings (25-30% of indoor samples)"
  },
  {
    name: "Alternaria",
    appearance: "Dark brown to black spots with fuzzy texture",
    locations: "Showers, bathtubs, window sills, damp carpets",
    health: "Severe asthma attacks, allergic rhinitis, respiratory distress",
    toxicity: "Moderate (strong allergen, especially dangerous for asthmatics)",
    prevalence: "Common in Brisbane bathrooms and humid areas (20-25% of samples)"
  }
];

const healthWarnings = [
  {
    severity: "Emergency - Seek Immediate Medical Attention",
    symptoms: [
      "Difficulty breathing or shortness of breath at rest",
      "Chest pain or tightness",
      "Severe asthma attack not responding to inhaler",
      "High fever (over 39°C) with respiratory symptoms",
      "Coughing up blood",
      "Confusion, dizziness, or loss of consciousness"
    ],
    action: "Call 000 immediately. Mould can cause severe allergic reactions and respiratory distress in sensitive individuals."
  },
  {
    severity: "Urgent - See Doctor Within 24 Hours",
    symptoms: [
      "Persistent cough lasting 2+ weeks in mouldy environment",
      "Worsening asthma or new onset of wheezing",
      "Chronic sinus infections or nasal congestion",
      "Recurring headaches, especially when at home",
      "Skin rashes or irritation that won't heal",
      "Chronic fatigue or brain fog (difficulty concentrating)"
    ],
    action: "Book GP appointment urgently. Request mould exposure testing. Vacate property if possible until professional remediation completed."
  },
  {
    severity: "Monitor - Track Symptoms and Consider Medical Review",
    symptoms: [
      "Mild allergic reactions (sneezing, watery eyes, runny nose)",
      "Occasional skin irritation or rashes",
      "Musty odour in living areas",
      "Visible mould growth less than 1 square metre",
      "Increased allergy symptoms when at home vs away",
      "Sleep disturbances or morning congestion"
    ],
    action: "Document symptoms, take photos of mould, consider air quality testing. DIY removal may be possible for small areas. Monitor for worsening."
  }
];

const preventionStrategies = {
  ventilation: [
    {
      area: "Bathrooms",
      issue: "Steam from showers creates 85%+ humidity - perfect for mould",
      solutions: [
        "Install exhaust fan with minimum 250 cubic metres/hour capacity",
        "Run fan during shower and for 30 minutes after",
        "Open windows during and after showering if weather permits",
        "Wipe down shower walls/glass after each use (removes 60% of moisture)",
        "Leave bathroom door open when not in use to improve airflow",
        "Consider heated towel rails (reduce humidity by warming air)"
      ],
      cost: "$200-$1,500 for quality exhaust fan installed"
    },
    {
      area: "Kitchen",
      issue: "Cooking generates steam and moisture, particularly from boiling",
      solutions: [
        "Use rangehood over cooktop - vent outside, not recirculating",
        "Run rangehood on high when boiling, steaming, or using dishwasher",
        "Cover pots when cooking to contain steam",
        "Wipe down splashback and surfaces after cooking",
        "Open windows while cooking and for 15 minutes after",
        "Check under sink regularly for leaks (common mould source)"
      ],
      cost: "$300-$2,000 for ducted rangehood system"
    },
    {
      area: "Bedrooms",
      issue: "Humans exhale moisture - 2 people = 1 litre overnight. Closed rooms = condensation",
      solutions: [
        "Open windows morning and evening for cross-ventilation (even briefly)",
        "Position beds away from external walls to prevent condensation",
        "Use ceiling fans to circulate air (reduces condensation by 30-40%)",
        "Keep wardrobes slightly open or use ventilated wardrobe doors",
        "Don't dry clothes in bedroom - moisture goes into air/walls",
        "Consider dehumidifier if persistently humid (45-55% target humidity)"
      ],
      cost: "$100-$800 for dehumidifier + electricity costs"
    },
    {
      area: "Subfloor/Crawl Spaces",
      issue: "Ground moisture rises through soil - enclosed subfloor areas trap humidity",
      solutions: [
        "Install subfloor vents (minimum 2 per 25m² floor area, Queensland code)",
        "Lay plastic moisture barrier over exposed soil in crawl spaces",
        "Ensure adequate clearance - minimum 400mm ground to joists",
        "Install whirlybird vents or powered extraction fans",
        "Regular inspection for standing water, blocked vents, termites",
        "Consider subfloor dehumidification system for chronic issues"
      ],
      cost: "$500-$5,000 depending on access and extent of work"
    },
    {
      area: "Roof Spaces/Attics",
      issue: "Hot air rises carrying moisture. Poor ventilation = condensation on roof timbers",
      solutions: [
        "Install roof vents (whirlybirds, ridge vents, gable vents)",
        "Ensure soffit vents not blocked by insulation",
        "Add sarking or reflective insulation to reduce condensation",
        "Check for roof leaks annually (especially after storms)",
        "Ensure bathroom/kitchen exhaust fans vent outside, not into roof space",
        "Consider solar-powered roof ventilation fans"
      ],
      cost: "$300-$3,000 for ventilation improvements"
    }
  ],
  seasonal: {
    wetSeason: [
      "Run dehumidifiers continuously (empty daily or use continuous drainage)",
      "Increase air conditioning use - cooling removes moisture from air",
      "Open windows only during dry periods (morning humidity often 80%+)",
      "Wipe down windows daily to remove condensation",
      "Check vulnerable areas weekly (bathrooms, laundries, under sinks)",
      "Don't dry clothes indoors - use outdoor line or dryer vented outside",
      "Inspect roof/gutters after every significant rain event",
      "Keep interior doors open to promote air circulation throughout home"
    ],
    drySeason: [
      "Deep clean all mould-prone areas while humidity lower",
      "Repair any leaks, drainage issues, or building defects identified",
      "Service air conditioning systems before hot weather returns",
      "Professional mould inspection if any concerns (easier remediation when dry)",
      "Seal gaps around windows, doors where moisture could enter",
      "Paint or treat previously mouldy areas with mould-inhibiting products",
      "Update ventilation systems if needed (easier installation in dry weather)",
      "Review and improve problem areas before wet season begins again"
    ]
  }
};

const diyVsProfessional = [
  {
    situation: "Small Surface Mould (Less than 1m²)",
    diy: "Generally Safe for DIY",
    conditions: [
      "Mould is on hard, non-porous surfaces (tiles, glass, sealed wood)",
      "No underlying water damage or soft/porous materials affected",
      "You have no respiratory conditions, allergies, or immune issues",
      "Mould appears recent (days/weeks, not months/years old)",
      "Contained to one small area, not spreading throughout property"
    ],
    method: [
      "Wear N95 mask, gloves, and eye protection (mould spores are harmful)",
      "Isolate area - close doors, seal vents to prevent spore spread",
      "Mix 1 part bleach to 10 parts water OR use commercial mould killer",
      "Scrub affected area thoroughly with stiff brush",
      "Dry completely using fans, dehumidifier, or natural ventilation",
      "Monitor area for 2-3 weeks - if mould returns, professional help needed"
    ],
    cost: "$20-$100 for cleaning supplies"
  },
  {
    situation: "Medium Mould Growth (1-3m²)",
    diy: "Possible DIY but Professional Assessment Recommended",
    conditions: [
      "Mould is visible surface growth only (not indicating hidden damage)",
      "You're confident in identifying and addressing moisture source",
      "Property has good ventilation that can be improved",
      "Mould hasn't penetrated porous materials (drywall, carpet, insulation)",
      "You have proper safety equipment and understand containment procedures"
    ],
    method: [
      "Get professional assessment first ($200-$500) to check for hidden mould",
      "Identify and fix moisture source BEFORE cleaning (or it returns)",
      "Proper containment - plastic sheeting, negative air pressure if possible",
      "Full PPE including respirator (N95 minimum, P2 preferred for larger areas)",
      "Remove and dispose of any porous materials affected (can't be cleaned)",
      "Professional post-remediation testing recommended ($300-$800)"
    ],
    cost: "$200-$1,000 DIY + assessment, or $1,500-$3,500 professional"
  },
  {
    situation: "Large Mould Growth (Over 3m²)",
    diy: "NOT Recommended - Professional Only",
    conditions: [
      "Always requires professional remediation - health risks too high",
      "Likely indicates significant moisture intrusion or building defects",
      "Probable hidden mould in wall cavities, subfloors, or other concealed areas",
      "High risk of mould spore spread during amateur cleanup attempts",
      "Insurance may require professional remediation for proper documentation"
    ],
    method: [
      "Contact IICRC-certified mould remediation specialist immediately",
      "Vacate property during remediation if possible (especially children, elderly, immunocompromised)",
      "Professional containment with negative air pressure and HEPA filtration",
      "Complete removal of contaminated porous materials",
      "Antimicrobial treatment of affected structural elements",
      "Post-remediation air quality testing and clearance certificate"
    ],
    cost: "$3,000-$30,000+ depending on extent (usually insurance-covered)"
  },
  {
    situation: "Mould After Flooding/Water Damage",
    diy: "NOT Recommended - Professional Only",
    conditions: [
      "Floodwater is always contaminated (sewage, chemicals, bacteria + mould)",
      "Water damage over 48 hours old = guaranteed mould growth in hidden areas",
      "Structural materials (drywall, insulation, flooring) require removal",
      "Health risks from combined bacterial and mould contamination",
      "Insurance requires professional documentation and remediation"
    ],
    method: [
      "Call Disaster Recovery immediately: 1300 309 361",
      "Do not attempt cleanup - contaminated water requires specialised handling",
      "Professional water extraction, structural drying, antimicrobial treatment",
      "Removal and disposal of contaminated materials (drywall, carpet, insulation)",
      "HEPA air filtration during all work to contain spores",
      "Moisture mapping to ensure complete drying (prevents mould return)"
    ],
    cost: "$5,000-$100,000+ depending on flood extent (insurance-covered)"
  },
  {
    situation: "Black Mould (Stachybotrys) Identified",
    diy: "NOT Recommended - Professional Only",
    conditions: [
      "Black mould produces mycotoxins - serious health hazard",
      "Requires laboratory testing to confirm species (visual ID insufficient)",
      "Professional containment essential - amateur cleanup spreads toxic spores",
      "Often indicates long-term water damage requiring structural repairs",
      "Legal liability if occupants become ill from improper remediation"
    ],
    method: [
      "Get professional mould testing to confirm species ($400-$800)",
      "IICRC-certified remediation only - requires specialised training",
      "Full containment with negative air machines and HEPA filtration",
      "Complete removal of all affected porous materials",
      "Post-remediation clearance testing mandatory (ensures safety)",
      "Address underlying moisture source or mould will return"
    ],
    cost: "$5,000-$50,000 depending on extent (often insurance-covered)"
  }
];

const professionalSignals = [
  {
    signal: "1. Musty Odour You Can't Locate",
    description: "Persistent mouldy smell but no visible mould = hidden growth in walls, subfloor, ceiling, or HVAC system",
    whySerious: "Indicates established mould colony producing spores continuously. Mould you can smell is releasing mycotoxins into air you're breathing. Hidden mould often covers 10-50x more area than visible surface mould.",
    action: "Professional mould inspection with thermal imaging and moisture meters ($400-$800). Can detect hidden mould without demolition.",
    urgency: "High - breathing mould spores daily causes cumulative health damage"
  },
  {
    signal: "2. Mould Returns After Cleaning",
    description: "You clean mould but it grows back within days or weeks in same location",
    whySerious: "Indicates ongoing moisture source not addressed. Surface cleaning kills visible mould but spores remain in porous materials. Moisture source (leak, condensation, poor ventilation) continues feeding mould growth cycle.",
    action: "Stop attempting DIY remediation. Professional assessment identifies moisture source and extent of contamination ($500-$1,200 including moisture mapping).",
    urgency: "Moderate-High - recurring mould spreading spores throughout property"
  },
  {
    signal: "3. Health Symptoms in Multiple Family Members",
    description: "Two or more people experiencing respiratory issues, allergies, headaches, or fatigue that improve when away from home",
    whySerious: "Strong indicator of significant mould contamination affecting indoor air quality. Children, elderly, and those with respiratory conditions most vulnerable. Long-term exposure linked to chronic respiratory disease, cognitive impairment.",
    action: "Immediate medical consultation for affected family members. Professional mould remediation and air quality testing ($2,000-$5,000 for comprehensive assessment and initial remediation).",
    urgency: "Critical - health effects can become permanent with continued exposure"
  },
  {
    signal: "4. Visible Mould on Ceiling or Walls",
    description: "Mould growth on drywall, plaster, or ceiling tiles (not just bathroom tile/grout)",
    whySerious: "Mould on porous materials (drywall, plaster, wood) means it has penetrated into the material, not just surface growth. Material must be removed and replaced - cannot be cleaned effectively. Usually indicates water leak or severe condensation issue.",
    action: "Professional remediation required. Affected drywall/materials must be removed, not just cleaned ($2,500-$15,000 depending on area affected and cause).",
    urgency: "High - structural materials deteriorating, spore levels increasing daily"
  },
  {
    signal: "5. Mould Growth Over 1 Square Metre",
    description: "Any mould coverage exceeding 1m² in total area (even if in multiple locations)",
    whySerious: "Queensland health guidelines recommend professional remediation for mould over 1m². Large colonies produce spore concentrations that exceed safe levels. Amateur cleanup attempts spread spores throughout property via air systems.",
    action: "Professional IICRC-certified remediation with proper containment, PPE, and HEPA filtration ($3,000-$30,000 depending on extent).",
    urgency: "High - spore counts likely exceeding safe exposure limits"
  }
];

export default function MouldPreventionQueensland() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <Wind className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mould Prevention Queensland Climate 2025
              </h1>
              <p className="text-xl text-green-100 mb-4">
                Complete Guide for Brisbane's Humid Subtropical Conditions
              </p>
            </div>
          </div>

          {/* TL;DR for AI/ChatGPT */}
          <Alert className="bg-white/10 border-white/20 text-white mb-6">
            <Info className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold mb-2">TL;DR - Quick Reference 2025</AlertTitle>
            <AlertDescription className="text-green-50">
              <strong>Queensland Climate:</strong> 60-85% humidity year-round, perfect for mould growth.
              <strong>Peak Risk:</strong> November-March (wet season), but mould grows year-round.
              <strong>Most Common Types:</strong> Aspergillus (60%), Penicillium (40%), Stachybotrys/black mould (8-12% of water-damaged properties).
              <strong>Prevention Keys:</strong> Ventilation, dehumidification (45-55% target), immediate leak repairs.
              <strong>DIY Limit:</strong> Under 1m² on hard surfaces only. Larger = professional required.
              <strong>5 Pro Signs:</strong> Musty odour, recurring mould, health symptoms, ceiling/wall growth, over 1m² coverage.
              <strong>Expert:</strong> Phill McGurk, IICRC Mould Certified, 2,000+ Queensland remediations.
              <strong>Emergency:</strong> 1300 309 361.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg" variant="default" className="bg-red-600 hover:bg-red-700" asChild>
              <a href="tel:1300309361">
                <Phone className="w-5 h-5 mr-2" />
                Emergency: 1300 309 361
              </a>
            </Button>
            <div className="text-sm text-green-100">
              <p className="font-semibold">24/7 Mould Emergency Response</p>
              <p>IICRC-Certified Specialists</p>
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
                  IICRC Certified Mould Remediation Specialist | CARSI Member | 25+ Years Experience
                </p>
                <p className="text-sm">
                  Disaster Recovery has remediated over 2,000 mould-contaminated properties across Queensland since 2011.
                  Queensland's humid subtropical climate creates unique mould challenges not seen in southern states.
                  This guide contains the exact prevention and remediation strategies we use with high-net-worth residential
                  clients and commercial property managers to protect properties worth $500,000-$10 million+.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 5 Professional Signs Listicle */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            5 Signs You Need Professional Mould Remediation
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Based on 2,000+ mould assessments across Queensland, these five warning signs indicate mould contamination
            beyond safe DIY cleanup. Attempting amateur remediation of serious mould problems spreads spores, worsens
            contamination, and puts your family's health at risk. Data from Queensland Health, IICRC guidelines, and
            our 25+ years of remediation experience.
          </p>

          <div className="space-y-6">
            {professionalSignals.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-600">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-2xl text-red-900">{item.signal}</CardTitle>
                  <CardDescription className="text-base text-gray-700 mt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h4 className="font-bold text-gray-900 mb-2">Why This Is Serious:</h4>
                    <p className="text-sm text-gray-700">{item.whySerious}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded">
                      <h4 className="font-bold text-blue-900 mb-2">Recommended Action:</h4>
                      <p className="text-sm text-blue-800">{item.action}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded flex items-center">
                      <div>
                        <h4 className="font-bold text-red-900 mb-2">Urgency Level:</h4>
                        <p className="text-sm text-red-800">{item.urgency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-8 border-red-300 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-900">Health Warning: Vulnerable Groups</AlertTitle>
            <AlertDescription className="text-red-800">
              <strong>Infants, elderly, pregnant women, and anyone with respiratory conditions, allergies, or
              compromised immune systems should NEVER be exposed to mould remediation.</strong> Even "minor" DIY
              cleanup releases millions of spores into the air. Professional remediation uses containment barriers,
              negative air pressure, and HEPA filtration to prevent spore spread. Queensland Health guidelines
              recommend professional remediation for any household with vulnerable occupants, regardless of mould
              size. Call 1300 309 361 for immediate professional assessment.
            </AlertDescription>
          </Alert>
        </section>

        {/* Queensland Climate Factors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Queensland's Climate Is Perfect for Mould</h2>

          <p className="text-lg text-gray-700 mb-8">
            Queensland's humid subtropical climate creates year-round mould risk. Understanding these climate factors
            is essential for effective prevention. Data from Bureau of Meteorology, CSIRO climate research, and
            Queensland Building and Construction Commission guidelines.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="border-t-4 border-t-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-600" />
                  Humidity Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Average Humidity: 60-80% year-round</p>
                    <p className="text-gray-600">Mould grows optimally at 60%+ humidity. Queensland rarely drops below this threshold.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Wet Season: 85%+ humidity (Nov-Mar)</p>
                    <p className="text-gray-600">Critical risk period. Morning humidity often 90-95%. Perfect mould conditions.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dry Season: Still 60-75% (May-Sep)</p>
                    <p className="text-gray-600">Lower but still sufficient for mould growth. "Dry" season is relative - still humid.</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-bold text-blue-900">Target Indoor Humidity: 45-55%</p>
                    <p className="text-gray-600">Requires active dehumidification - natural ventilation insufficient in Queensland.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-green-600" />
                  Rainfall Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Annual Rainfall: 1,000-1,800mm</p>
                    <p className="text-gray-600">Brisbane metro average 1,150mm. Coastal areas higher. Significant moisture load.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Wet Season: November-April (70% of annual rain)</p>
                    <p className="text-gray-600">Intense rainfall events, flooding, high water table. Maximum mould risk period.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Storm Events: 50-150mm in single events</p>
                    <p className="text-gray-600">Severe storms deliver months of rain in hours. Overwhelms drainage, causes leaks.</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-bold text-green-900">Impact on Properties:</p>
                    <p className="text-gray-600">Roof leaks, poor drainage, rising damp, and flooding create perfect mould conditions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-orange-600">
              <CardHeader>
                <CardTitle>Temperature Ranges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Summer: 25-31°C average (Dec-Feb)</p>
                    <p className="text-gray-600">Combined with high humidity = extreme mould growth potential. Peak risk months.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Winter: 15-22°C average (Jun-Aug)</p>
                    <p className="text-gray-600">Mild winters mean mould never goes dormant. Growth slows but continues year-round.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Mould Growth Range: 10-35°C</p>
                    <p className="text-gray-600">Queensland temperature ALWAYS within mould growth range. Never freezes (unlike southern states).</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-bold text-orange-900">Key Insight:</p>
                    <p className="text-gray-600">No natural "kill-off" period. Requires year-round prevention strategies.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-600">
              <CardHeader>
                <CardTitle>Building Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Queensland Construction Styles</p>
                    <p className="text-gray-600">Traditional Queenslanders: Raised on stumps, naturally ventilated. Modern homes: Sealed, air-conditioned, prone to condensation.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Air Conditioning Dependence</p>
                    <p className="text-gray-600">Sealed homes rely on AC for dehumidification. AC failure = humidity spikes to 80%+ within hours.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Subfloor Moisture</p>
                    <p className="text-gray-600">High water table, poor drainage. Ground moisture rises through concrete slabs and stumps.</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="font-bold text-purple-900">Result:</p>
                    <p className="text-gray-600">60% of Queensland homes have mould issues. Proactive prevention essential.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900">Climate Change Impact on Queensland Mould Risk</AlertTitle>
            <AlertDescription className="text-blue-800">
              CSIRO climate projections predict increased rainfall intensity, more frequent flooding events, and
              higher average humidity for Southeast Queensland by 2030-2050. Bureau of Meteorology data shows
              Brisbane's average humidity has increased 3-5% over past 30 years. Mould problems that were once
              seasonal are now year-round. Properties built before 2010 often lack adequate ventilation for current
              climate conditions. Source: CSIRO State of the Climate 2024, BoM Climate Change Trends.
            </AlertDescription>
          </Alert>
        </section>

        {/* Common Mould Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Common Mould Types in Queensland Homes</h2>

          <p className="text-lg text-gray-700 mb-8">
            Five mould species account for 95%+ of indoor mould in Queensland properties. Understanding what you're
            dealing with helps determine appropriate response. Based on laboratory analysis of 2,000+ Queensland
            mould samples from our remediation projects.
          </p>

          <div className="space-y-4">
            {mouldTypes.map((mould, idx) => (
              <Card key={idx} className="border-l-4 border-l-green-600">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{mould.name}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        <strong>Appearance:</strong> {mould.appearance}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${
                      mould.toxicity.includes('High') ? 'bg-red-100 text-red-800' :
                      mould.toxicity.includes('Moderate') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {mould.toxicity.split(' ')[0]} Risk
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Common Locations:</h4>
                      <p className="text-sm text-gray-700">{mould.locations}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Health Effects:</h4>
                      <p className="text-sm text-gray-700">{mould.health}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Toxicity Level:</h4>
                      <p className="text-sm text-gray-700">{mould.toxicity}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Prevalence in Queensland:</h4>
                      <p className="text-sm text-gray-700">{mould.prevalence}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-6 border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-900">Visual Identification Is Insufficient</AlertTitle>
            <AlertDescription className="text-yellow-800">
              You cannot reliably identify mould species by appearance alone. Black-coloured mould is NOT always
              toxic Stachybotrys - it could be less harmful Cladosporium or Alternaria. Conversely, highly toxic
              Aspergillus often appears harmless green/white. Professional laboratory testing ($400-$800) provides
              definitive identification and guides appropriate remediation strategy. DIY mould test kits sold at
              hardware stores are unreliable and not accepted by health authorities or insurers.
            </AlertDescription>
          </Alert>
        </section>

        {/* Prevention Strategies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Comprehensive Mould Prevention Strategies</h2>

          <p className="text-lg text-gray-700 mb-8">
            Room-by-room prevention tactics developed from 25+ years managing Queensland properties. These strategies
            reduce mould risk by 80-90% when implemented consistently. Prevention costs $500-$3,000 annually;
            remediation costs $5,000-$50,000 when mould establishes.
          </p>

          <h3 className="text-2xl font-bold mb-4">Ventilation Solutions by Room</h3>

          <div className="space-y-6 mb-12">
            {preventionStrategies.ventilation.map((room, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-600">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-xl">{room.area}</CardTitle>
                  <CardDescription className="text-base">
                    <strong>Key Issue:</strong> {room.issue}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <h4 className="font-bold text-gray-900 mb-3">Prevention Solutions:</h4>
                  <ul className="space-y-2 mb-4">
                    {room.solutions.map((solution, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <p className="text-sm"><strong>Typical Cost:</strong> {room.cost}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-4">Seasonal Prevention Calendar</h3>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-t-4 border-t-red-600">
              <CardHeader>
                <CardTitle className="text-red-700">Wet Season (November-April)</CardTitle>
                <CardDescription>Critical risk period - maximum vigilance required</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {preventionStrategies.seasonal.wetSeason.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardHeader>
                <CardTitle className="text-green-700">Dry Season (May-October)</CardTitle>
                <CardDescription>Opportunity for repairs and deep prevention work</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {preventionStrategies.seasonal.drySeason.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* DIY vs Professional */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">DIY vs Professional Mould Remediation</h2>

          <p className="text-lg text-gray-700 mb-8">
            Critical decision framework based on Queensland Health guidelines, IICRC standards, and 2,000+ remediation
            projects. Making the wrong choice causes health risks, property damage, and insurance complications.
          </p>

          <div className="space-y-6">
            {diyVsProfessional.map((scenario, idx) => (
              <Card key={idx} className={`border-l-4 ${
                scenario.diy.includes('NOT') ? 'border-l-red-600' :
                scenario.diy.includes('Recommended') ? 'border-l-yellow-600' :
                'border-l-green-600'
              }`}>
                <CardHeader className={`${
                  scenario.diy.includes('NOT') ? 'bg-red-50' :
                  scenario.diy.includes('Recommended') ? 'bg-yellow-50' :
                  'bg-green-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{scenario.situation}</CardTitle>
                      <CardDescription className="text-base mt-2 font-bold">
                        {scenario.diy}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-3">Conditions/Considerations:</h4>
                    <ul className="space-y-2">
                      {scenario.conditions.map((condition, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-3">Recommended Method:</h4>
                    <ul className="space-y-2">
                      {scenario.method.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-bold text-gray-900">Typical Cost: <span className="font-normal">{scenario.cost}</span></p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health Warnings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Health Symptoms & Medical Response</h2>

          <p className="text-lg text-gray-700 mb-8">
            Three-tier medical response framework based on Queensland Health mould exposure guidelines and emergency
            medicine protocols. Mould exposure causes cumulative health damage - early intervention prevents permanent
            respiratory disease.
          </p>

          <div className="space-y-6">
            {healthWarnings.map((warning, idx) => (
              <Card key={idx} className={`border-l-4 ${
                warning.severity.includes('Emergency') ? 'border-l-red-600' :
                warning.severity.includes('Urgent') ? 'border-l-orange-600' :
                'border-l-yellow-600'
              }`}>
                <CardHeader className={`${
                  warning.severity.includes('Emergency') ? 'bg-red-50' :
                  warning.severity.includes('Urgent') ? 'bg-orange-50' :
                  'bg-yellow-50'
                }`}>
                  <CardTitle className={`text-xl ${
                    warning.severity.includes('Emergency') ? 'text-red-900' :
                    warning.severity.includes('Urgent') ? 'text-orange-900' :
                    'text-yellow-900'
                  }`}>
                    {warning.severity}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2">
                      {warning.symptoms.map((symptom, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3">
                          <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            warning.severity.includes('Emergency') ? 'text-red-600' :
                            warning.severity.includes('Urgent') ? 'text-orange-600' :
                            'text-yellow-600'
                          }`} />
                          <span className="text-sm text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-4 rounded ${
                    warning.severity.includes('Emergency') ? 'bg-red-100' :
                    warning.severity.includes('Urgent') ? 'bg-orange-100' :
                    'bg-yellow-100'
                  }`}>
                    <h4 className="font-bold text-gray-900 mb-2">Required Action:</h4>
                    <p className="text-sm text-gray-800">{warning.action}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Mould Prevention Queensland - Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Can I just paint over mould to stop it spreading?",
                a: "Absolutely not. Painting over mould doesn't kill it - mould will grow through paint within weeks. Paint traps moisture against the surface, making mould problem worse. You must: (1) Fix moisture source, (2) Remove mould completely, (3) Treat with antimicrobial solution, (4) Ensure area is completely dry, (5) Use mould-resistant primer/paint. For porous materials like drywall with mould growth, removal and replacement is the only effective solution."
              },
              {
                q: "What humidity level prevents mould growth in Queensland?",
                a: "Target 45-55% indoor humidity to prevent mould. Below 45% causes respiratory discomfort and static electricity. Above 55% allows mould growth. Queensland's outdoor humidity (60-85%+) means you cannot rely on natural ventilation alone. You MUST use air conditioning (removes moisture while cooling) and/or dehumidifiers. A $200-$800 dehumidifier costs less than a single mould remediation project ($3,000-$30,000)."
              },
              {
                q: "Does bleach kill mould?",
                a: "Bleach kills surface mould on non-porous materials (tiles, glass, sealed wood) but doesn't penetrate porous materials (drywall, grout, wood). Bleach is 90% water - it adds moisture to porous materials, feeding mould roots deep inside. Bleach also degrades quickly and doesn't prevent regrowth. Professional-grade antimicrobials penetrate porous materials and provide residual protection. For large areas or porous materials, bleach is ineffective and counterproductive."
              },
              {
                q: "How quickly does mould grow after water damage?",
                a: "Mould spores begin germinating within 24-48 hours of water exposure in Queensland's climate. Visible mould appears within 48-72 hours on porous materials. By day 7, established colonies are producing millions of spores. This is why professional water damage restoration emphasises 24-hour response time - we extract water and dry structures before mould establishes. Delayed response (3+ days) almost always requires mould remediation in addition to water damage restoration, increasing costs 200-400%."
              },
              {
                q: "Is mould covered by home insurance?",
                a: "Complex answer. Insurance typically covers mould IF it results from a covered event (storm damage, burst pipe, etc.) AND you respond quickly. Insurance generally DOES NOT cover mould from: ongoing maintenance issues (leaking roof, poor ventilation), gradual leaks, rising damp, or condensation. Key requirement: You must mitigate damage immediately. Delaying water extraction and drying allows 'preventable' mould growth that insurance may exclude. Always call professionals within 24 hours of water damage and notify insurer immediately."
              },
              {
                q: "Can air conditioning prevent mould?",
                a: "Yes, when used correctly. Air conditioning removes moisture from air (dehumidification) while cooling. To prevent mould: (1) Run AC regularly during humid periods, not just when hot, (2) Set to cooling mode (dry mode less effective), (3) Service AC annually - dirty systems grow mould that spreads through house, (4) Don't turn AC off for extended periods (humidity spikes), (5) Keep vents/filters clean. However, AC alone insufficient in very humid areas (bathrooms, laundries) - still need exhaust fans and ventilation."
              },
              {
                q: "What's the best dehumidifier for Queensland homes?",
                a: "Compressor (refrigerant) dehumidifiers for Queensland - desiccant types less effective in high temperatures. Specifications: Minimum 20-litre/day capacity for average 3-bedroom home (30L+ for larger homes or severe humidity). Features needed: Auto-restart after power failure, continuous drainage option (don't want to empty daily), humidistat (auto on/off at set humidity), washable filter. Quality brands: DeLonghi, Mitsubishi, EcoAir. Budget: $400-$1,200. Running costs: $1-3/day electricity. Position centrally with doors open for whole-house effect."
              },
              {
                q: "How do I prevent mould in wardrobes and cupboards?",
                a: "Enclosed spaces with poor airflow are mould hotspots in Queensland. Solutions: (1) Install ventilated wardrobe doors or leave doors slightly open, (2) Use rechargeable dehumidifier pods (Dri-Buddi, ThirstyHippo - replace/recharge monthly), (3) Don't overfill wardrobes - air must circulate, (4) Never store damp clothes/towels in cupboards, (5) Position wardrobes away from external walls (condensation forms on cold surfaces), (6) Consider small USB-powered wardrobe dehumidifiers ($30-$80), (7) Regular inspection and air-out sessions. For persistent issues, small fan improves circulation."
              }
            ].map((faq, idx) => (
              <Card key={idx}>
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-900 to-green-700 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Queensland's Most Experienced Mould Specialists</h2>
          <p className="text-xl text-green-100 mb-6 max-w-3xl mx-auto">
            Don't risk your family's health with DIY mould removal. Get expert assessment and IICRC-certified
            remediation from Queensland's trusted specialists. 2,000+ successful remediations since 2011.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" variant="default" className="bg-red-600 hover:bg-red-700 text-lg px-8" asChild>
              <a href="tel:1300309361">
                <Phone className="w-5 h-5 mr-2" />
                Call 1300 309 361 Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-green-900 hover:bg-green-50 text-lg px-8" asChild>
              <Link href="/contact">
                Request Free Mould Assessment
              </Link>
            </Button>
          </div>
          <p className="text-sm text-green-200 mt-6">
            24/7 Emergency Response | IICRC Certified | Insurance Approved | All Queensland
          </p>
        </section>

        {/* Related */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Related Queensland Disaster Recovery Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guides/brisbane-flood-zone-map-2025">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Brisbane Flood Zone Map 2025</CardTitle>
                  <CardDescription>Flood risk by suburb</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/guides/storm-preparation-brisbane">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Storm Preparation Brisbane</CardTitle>
                  <CardDescription>Complete seasonal checklist</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/guides/insurance-claim-maximization">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Insurance Claim Maximisation</CardTitle>
                  <CardDescription>Get maximum claim value</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Mould Prevention Queensland Climate 2025 | Complete Expert Guide",
            "description": "Comprehensive mould prevention guide for Queensland's humid subtropical climate with seasonal strategies and professional assessment criteria.",
            "author": {
              "@type": "Person",
              "name": "Phill McGurk",
              "jobTitle": "Founder & IICRC Certified Mould Specialist"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Disaster Recovery"
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })
        }}
      />
    </div>
  );
}
