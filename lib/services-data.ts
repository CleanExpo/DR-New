export interface ServiceContent {
  id: string
  title: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  phoneNumber: string
  ctaText: string
  heroImage?: string
  healthWarning?: {
    title: string
    description: string
    risks: Array<{
      title: string
      description: string
    }>
  }
  whyProfessional?: {
    title: string
    description: string
  }
  commonProblems?: Array<{
    title: string
    description: string
    dangerLevel?: string
    detection?: string
    treatment?: string
    certification?: string
  }>
  process?: Array<{
    step: number
    title: string
    description: string
  }>
  excellence?: {
    title: string
    points: Array<{
      title: string
      description: string
    }>
  }
  serviceAreas?: {
    title: string
    areas: Array<{
      region: string
      highPriority: string[]
      allAreas: string[]
    }>
  }
  visualGuide?: {
    title: string
    stages: Array<{
      stage: string
      title: string
      description: string
    }>
  }
  finalCta?: {
    title: string
    description: string
    features: string[]
    servingAreas: string
  }
}

export const servicesData: ServiceContent[] = [
  {
    id: "mould-remediation",
    title: "Mould Problem? Professional Remediation Available Now!",
    heroTitle: "Professional Mould Remediation Brisbane",
    heroSubtitle: "Safe, Certified Mould Removal • IICRC Master Restorer • Health-Focused Solutions",
    heroDescription: "Phill McGurk - Master Restorer and team provide professional mould inspection, testing, removal and prevention across Brisbane, Ipswich, and Logan. Protecting your health and property.",
    phoneNumber: "+61 1300 309 361",
    ctaText: "Call +61 1300 309 361 Now",
    heroImage: "/professional-mould-remediation-specialist-performi.jpg",
    healthWarning: {
      title: "Health Warning: Mould Exposure Risks",
      description: "Mould exposure causes serious health issues including respiratory problems, allergic reactions, and toxic effects. DIY removal can spread spores and worsen contamination. Our Master Restorer team uses containment, HEPA filtration, and safe removal protocols.",
      risks: [
        {
          title: "Respiratory Issues",
          description: "Asthma attacks, chronic coughing, wheezing, difficulty breathing. Especially dangerous for children and elderly."
        },
        {
          title: "Allergic Reactions",
          description: "Skin rashes, eye irritation, nasal congestion, severe allergic responses to mould spores."
        },
        {
          title: "Toxic Effects",
          description: "Black mould (Stachybotrys) produces mycotoxins causing neurological symptoms, immune suppression."
        },
        {
          title: "Property Damage",
          description: "Structural deterioration, material destruction, decreased property value. Worsens over time."
        }
      ]
    },
    whyProfessional: {
      title: "Why Professional Mould Remediation Matters",
      description: "Don't Risk Your Health - Call Professional Mould Remediation Now. Our IICRC Master certified team uses containment barriers, negative air pressure, and HEPA filtration to safely remove mould without spreading spores. We identify the moisture source and prevent recurrence."
    },
    commonProblems: [
      {
        title: "Black Mould (Stachybotrys)",
        description: "Highly toxic black mould producing mycotoxins. Causes severe health issues including neurological symptoms. Common after water damage, flooding, high humidity. Requires professional containment and removal.",
        dangerLevel: "Extreme - Professional removal essential"
      },
      {
        title: "Ceiling & Roof Leak Mould",
        description: "Mould growth from roof leaks, ceiling water damage, poor ventilation. Common in Brisbane humidity and storm damage. Spreads rapidly through ceiling cavities. Thermal imaging to detect hidden growth.",
        detection: "Thermal imaging, moisture mapping, air quality testing"
      },
      {
        title: "Bathroom & Wall Mould",
        description: "Bathroom mould from poor ventilation, shower leaks, grout deterioration. Wall mould from condensation, plumbing leaks, rising damp. Green, white, or black varieties. Antimicrobial treatment prevents return.",
        treatment: "HEPA filtration, antimicrobial coating, moisture control"
      },
      {
        title: "Flood & Water Damage Mould",
        description: "Rapid mould growth after flooding, burst pipes, storm damage. Mould begins within 24-48 hours of water exposure. Brisbane flood zones - Hamilton, New Farm, West End. Complete structural drying prevents recurrence.",
        certification: "IICRC Master Restorer - water damage and mould specialist"
      }
    ],
    process: [
      {
        step: 1,
        title: "Inspection & Testing",
        description: "Comprehensive mould inspection, moisture mapping, air quality testing. Thermal imaging detects hidden growth."
      },
      {
        step: 2,
        title: "Containment Setup",
        description: "Physical barriers isolate affected areas. Negative air pressure prevents spore spread to clean areas."
      },
      {
        step: 3,
        title: "HEPA Filtration",
        description: "Industrial HEPA air scrubbers capture airborne spores. Continuous filtration throughout remediation."
      },
      {
        step: 4,
        title: "Safe Removal",
        description: "Careful removal of mould-contaminated materials using proper PPE. Safe disposal following regulations."
      },
      {
        step: 5,
        title: "Antimicrobial Treatment",
        description: "Professional antimicrobial application kills remaining spores. Prevents regrowth on treated surfaces."
      },
      {
        step: 6,
        title: "Structural Drying",
        description: "Complete drying of affected structures. Industrial dehumidifiers eliminate moisture - mould's source."
      },
      {
        step: 7,
        title: "Final Testing",
        description: "Post-remediation air quality testing verifies successful removal. Master Restorer certification of completion."
      },
      {
        step: 8,
        title: "Prevention Plan",
        description: "Moisture control recommendations, ventilation improvements. Prevent future mould growth with expert guidance."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk for Mould Remediation",
      points: [
        {
          title: "Master Restorer Mould Certification - Rare in Brisbane",
          description: "Phill McGurk holds IICRC Master Restorer certification with specialized mould remediation credentials. One of a limited number in Brisbane and QLD. Your health deserves master-level expertise, not basic mould removal."
        },
        {
          title: "Safe Containment & HEPA Filtration",
          description: "Professional containment barriers prevent spore spread. Negative air pressure systems. Industrial HEPA air scrubbers. Proper PPE for all technicians. Safe for occupants during and after remediation."
        },
        {
          title: "Laboratory Air Quality Testing",
          description: "Pre-remediation and post-remediation air quality testing. Laboratory analysis identifies mould species and toxicity levels. Certified completion when spore counts return to safe levels."
        },
        {
          title: "Brisbane Local - Humidity & Flood Expertise",
          description: "Based in Wacol, QLD. Expert in Brisbane's high humidity, flood zones, Queenslander homes, weather patterns. Specialist knowledge of Hamilton, Ascot, New Farm properties affected by floods and mould."
        }
      ]
    },
    serviceAreas: {
      title: "Mould Remediation Service Areas - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Mould Remediation Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Mould Contamination",
          description: "Visible mould growth, health risks from spore exposure, property damage, musty odors. Requires professional remediation."
        },
        {
          stage: "DURING",
          title: "Active Remediation",
          description: "Containment barriers, negative air pressure, HEPA filtration running. Safe removal by certified technicians with proper PPE."
        },
        {
          stage: "AFTER",
          title: "Remediation Complete",
          description: "All mould removed, air quality testing confirms safe levels. Master Restorer certified completion. Healthy indoor environment restored."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Mould Remediation Emergency?",
      description: "Protect Your Health - Professional Mould Removal Available Now. IICRC Master Restorer Phill McGurk and team provide safe, certified mould remediation. HEPA filtration. Air quality testing. Health-focused solutions. Prevent recurrence.",
      features: [
        "Master Restorer",
        "IICRC Certified",
        "HEPA Filtration",
        "Safe Removal",
        "Air Testing",
        "Certified Clean"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "water-damage-restoration",
    title: "Water Damage? Call Now - Every Minute Counts!",
    heroTitle: "Emergency Water Damage Restoration Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Insurance Approved",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid water extraction, structural drying, and mould prevention across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "+61 1300 309 361",
    ctaText: "Call +61 1300 309 361 Now",
    heroImage: "/professional-water-extraction-team-responding-to-f.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Water Damage Timeline - Time is Critical. Mould growth begins within 24-48 hours. Structural damage worsens every hour. Our Master Restorer team responds in 60 minutes to minimize damage and costs.",
      risks: [
        {
          title: "0-1 Hours - Water Spreads Rapidly",
          description: "Water penetrates porous materials, soaks into carpets, walls, furniture. Electrical hazards develop."
        },
        {
          title: "2-24 Hours - Damage Accelerates",
          description: "Drywall begins swelling. Metal surfaces start tarnishing. Furniture warping. Foul odors emerge."
        },
        {
          title: "24-48 Hours - Mould Begins Growing",
          description: "Mould and bacteria growth starts. Serious biohazard risks. Structural damage intensifies."
        },
        {
          title: "48+ Hours - Severe Contamination",
          description: "Extensive mould colonies. Structural failure risk. May require demolition. Costs multiply exponentially."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk Immediately",
      description: "Our industrial water extraction equipment and thermal imaging technology stops damage progression within the first hour. Every minute you wait costs more in repairs."
    },
    commonProblems: [
      {
        title: "Burst Pipes & Plumbing Failures",
        description: "Hot water system bursts, burst mains, pipe corrosion, freezing damage. Common in older Brisbane Queenslander homes. Causes catastrophic flooding within minutes.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Flood & Storm Water Damage",
        description: "Brisbane River flooding, storm surge, flash floods, blocked drains. Expert in Brisbane flood zones - Hamilton, New Farm, West End, Rocklea. Industrial pumps and rapid extraction.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Roof Leaks & Storm Damage",
        description: "Severe storm damage, roof penetration, ceiling collapse, gutter overflow. Emergency tarping and water extraction. Thermal imaging to detect hidden moisture.",
        treatment: "Technology: Thermal imaging, moisture meters, industrial dehumidifiers"
      },
      {
        title: "Structural Drying & Dehumidification",
        description: "Complete structural drying using industrial air movers, LGR dehumidifiers, and thermal imaging. Prevents mould growth and structural damage. IICRC Master certified processes.",
        certification: "Certification: IICRC Master Restorer - highest industry credential"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call +61 1300 309 361. Immediate triage and dispatch within minutes. Safety guidance while we travel."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess damage severity and water category."
      },
      {
        step: 3,
        title: "Water Extraction",
        description: "Industrial pumps and truck-mounted extractors remove standing water. Prevent further absorption into materials."
      },
      {
        step: 4,
        title: "Moisture Detection",
        description: "Thermal imaging and moisture meters map all affected areas. Locate hidden moisture in walls, floors, ceilings."
      },
      {
        step: 5,
        title: "Structural Drying",
        description: "Industrial air movers and LGR dehumidifiers create optimal drying conditions. Monitor daily with moisture readings."
      },
      {
        step: 6,
        title: "Sanitization",
        description: "Antimicrobial treatment prevents mould and bacteria growth. HEPA filtration for air quality. Safe for occupants."
      },
      {
        step: 7,
        title: "Final Inspection",
        description: "Master Restorer final verification. All areas returned to pre-loss moisture levels. Documentation for insurance claim."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete documentation, photos, moisture reports. Direct billing to all major insurers. No upfront costs for insurance work."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk",
      points: [
        {
          title: "Master Restorer Certified - Rare in Brisbane",
          description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in water damage restoration. One of a limited number in Brisbane and QLD. Your property deserves master-level expertise, not basic technician work."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call +61 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Industrial extraction equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - moisture reports, photos, assessor meetings. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Local - We Know Your Property",
          description: "Based in Wacol, QLD. Specialist experience with Brisbane Queenslander homes, flood zones, weather patterns, building codes. High-value Hamilton, Ascot, New Farm property expertise."
        }
      ]
    },
    serviceAreas: {
      title: "Water Damage Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Water Damage Restoration Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Initial Water Damage",
          description: "Standing water, saturated materials, immediate action required to prevent structural damage and mould growth."
        },
        {
          stage: "DURING",
          title: "Active Restoration",
          description: "Industrial air movers and dehumidifiers working 24/7. Thermal imaging monitoring. Daily moisture readings."
        },
        {
          stage: "AFTER",
          title: "Restoration Complete",
          description: "Property returned to pre-loss moisture levels. Master Restorer certified completion. Ready for rebuilding or occupancy."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Water Damage Emergency?",
      description: "Every Minute Counts - Don't Wait for Mould Growth. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Industrial equipment. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ All Insurers",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "fire-damage-restoration",
    title: "Fire Damage? Call Now - Every Minute Counts!",
    heroTitle: "Fire Damage Restoration & Smoke Remediation Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Insurance Approved",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid fire damage restoration, smoke removal, and soot cleanup across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "+61 1300 309 361",
    ctaText: "Call +61 1300 309 361 Now",
    heroImage: "/iicrc-certified-fire-damage-restoration-technician.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Fire Damage Timeline - Time is Critical. Fire and smoke damage worsens rapidly. Acidic soot causes permanent staining within hours. Our Master Restorer team responds in 60 minutes to minimize damage and costs.",
      risks: [
        {
          title: "0-2 Hours - Soot & Smoke Spread",
          description: "Acidic soot settles on all surfaces. Smoke odors penetrate porous materials. Metal surfaces begin tarnishing."
        },
        {
          title: "2-6 Hours - Staining Begins",
          description: "Plastics discolor permanently. Wooden furniture finishes yellow. Fiberglass appliances turn brown. Metals corrode."
        },
        {
          title: "6-24 Hours - Permanent Damage",
          description: "Extensive soot staining on walls and ceilings. Clothing and fabrics may be unsalvageable. Strong odor sets in."
        },
        {
          title: "24+ Hours - Severe Contamination",
          description: "Restoration costs multiply. Items require replacement instead of restoration. Structural damage from water and soot."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk Immediately",
      description: "Our specialized smoke removal equipment and HEPA filtration systems stop damage progression. We eliminate soot, smoke odors, and water damage from firefighting efforts."
    },
    commonProblems: [
      {
        title: "Residential Fire Damage",
        description: "Complete restoration for house fires, electrical fires, and structural blazes. Expert in Brisbane Queenslander homes and modern residences. Smoke removal, soot cleanup, and full reconstruction.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Kitchen & Appliance Fires",
        description: "Cooking fires, grease fires, electrical appliance fires. Specialized cleaning for cabinets, countertops, and ventilation systems. Complete odor removal from kitchen and adjacent rooms.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Smoke & Soot Removal",
        description: "Complete smoke odor elimination using thermal fogging, ozone treatment, and HEPA filtration. Professional soot cleanup from walls, ceilings, and HVAC systems. Air quality restoration.",
        treatment: "Technology: Thermal fogging, ozone treatment, HEPA air scrubbers"
      },
      {
        title: "Water Damage Mitigation",
        description: "Firefighting water extraction and structural drying. Prevent secondary damage from water, mould growth prevention. Industrial dehumidifiers and moisture monitoring. IICRC Master certified processes.",
        certification: "Certification: IICRC Master Restorer - highest industry credential"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call +61 1300 309 361. Immediate triage and dispatch within minutes. Safety guidance while we travel."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess fire and smoke damage severity."
      },
      {
        step: 3,
        title: "Property Securing",
        description: "Emergency board-up, roof tarping, security measures. Prevent further damage from weather and unauthorized entry."
      },
      {
        step: 4,
        title: "Water Extraction",
        description: "Remove firefighting water using industrial extractors. Prevent mould growth and secondary water damage."
      },
      {
        step: 5,
        title: "Soot Removal",
        description: "Professional soot cleanup from all surfaces. Specialized techniques for different soot types (dry, wet, protein)."
      },
      {
        step: 6,
        title: "Smoke Odor Removal",
        description: "Thermal fogging, ozone treatment, HEPA air scrubbers. Complete smoke odor elimination from property."
      },
      {
        step: 7,
        title: "Structural Drying",
        description: "Industrial dehumidifiers and air movers dry all affected materials. Daily moisture monitoring."
      },
      {
        step: 8,
        title: "Final Restoration",
        description: "Master Restorer final verification. Complete reconstruction and restoration. Documentation for insurance claim."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk",
      points: [
        {
          title: "Master Restorer Certified - Rare in Brisbane",
          description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in fire damage restoration. One of a limited number in Brisbane and QLD. Your property deserves master-level expertise, not basic technician work."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call +61 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Fire damage equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - damage reports, photos, assessor meetings. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Local - We Know Your Property",
          description: "Based in Wacol, QLD. Specialist experience with Brisbane Queenslander homes, building codes, insurance requirements. High-value Hamilton, Ascot, New Farm property expertise."
        }
      ]
    },
    serviceAreas: {
      title: "Fire Damage Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Fire Damage Restoration Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Initial Fire Damage",
          description: "Fire damage, smoke contamination, soot on all surfaces. Immediate action required to prevent permanent staining and odor penetration."
        },
        {
          stage: "DURING",
          title: "Active Restoration",
          description: "Soot removal, smoke odor elimination, thermal fogging. HEPA air scrubbers working 24/7. Water extraction and structural drying."
        },
        {
          stage: "AFTER",
          title: "Restoration Complete",
          description: "Property fully restored to pre-loss condition. No smoke odors, no soot staining. Master Restorer certified completion. Ready for occupancy."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Fire Damage Emergency?",
      description: "Every Hour Counts - Don't Let Soot Cause Permanent Damage. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Specialized fire damage equipment. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ All Insurers",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "storm-damage-restoration",
    title: "Storm Damage? Call Now - Every Minute Counts!",
    heroTitle: "Emergency Storm Damage Restoration Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Insurance Approved",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid storm damage assessment, emergency tarping, structural repairs, and complete restoration across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "+61 1300 309 361",
    ctaText: "Call +61 1300 309 361 Now",
    heroImage: "/severe-storm-damage-aftermath-with-emergency-resto.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Storm Damage Timeline - Time is Critical. Storm damage exposes your property to water ingress within minutes. Secondary damage worsens every hour. Our Master Restorer team responds in 60 minutes to minimize damage and costs.",
      risks: [
        {
          title: "0-1 Hours - Water Ingress Begins",
          description: "Rain enters through roof damage, broken windows, compromised walls. Immediate tarping prevents catastrophic water damage."
        },
        {
          title: "2-6 Hours - Secondary Damage",
          description: "Wind damage worsens. Loose materials become projectiles. Water penetrates deeper into structure. Emergency securing critical."
        },
        {
          title: "6-24 Hours - Structural Risks",
          description: "Weakened structures may collapse. Water causes electrical hazards. Mould growth begins in saturated areas."
        },
        {
          title: "24+ Hours - Extensive Deterioration",
          description: "Major structural damage. Complete water saturation. Mould colonies establish. Insurance complications increase dramatically."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk Immediately",
      description: "Our emergency tarping, boarding, and structural assessment stops damage progression within the first hour. Every minute you wait increases repair costs exponentially."
    },
    commonProblems: [
      {
        title: "Roof & Structural Storm Damage",
        description: "Severe wind damage, hail impact, roof penetration, ceiling collapse. Emergency tarping and structural assessment. Common during Brisbane supercells and severe weather events.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Hail & Wind Damage",
        description: "Giant hail impact, broken windows, damaged siding, compromised gutters. Brisbane is prone to supercell hailstorms with hail exceeding 10cm. Emergency boarding and weatherproofing critical.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Storm Water Ingress & Flooding",
        description: "Rain penetration through storm damage, flash flooding, gutter overflow, wall breaches. Rapid water extraction prevents mould growth and structural deterioration. Thermal imaging to detect hidden moisture.",
        treatment: "Technology: Thermal imaging, moisture meters, industrial dehumidifiers"
      },
      {
        title: "Emergency Tarping & Securing",
        description: "Immediate weatherproofing with industrial tarps, emergency boarding, debris removal, site safety. IICRC Master certified make-safe procedures prevent further damage until permanent repairs completed.",
        certification: "Certification: IICRC Master Restorer - highest industry credential"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call +61 1300 309 361. Immediate safety triage and dispatch within minutes. Guidance on temporary safety measures."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Safety assessment and hazard identification."
      },
      {
        step: 3,
        title: "Emergency Tarping",
        description: "Industrial tarps secure roof damage. Board broken windows. Prevent water ingress and further weather exposure."
      },
      {
        step: 4,
        title: "Structural Assessment",
        description: "Complete damage documentation for insurance. Thermal imaging to detect hidden damage. Safety certification of structure."
      },
      {
        step: 5,
        title: "Water Extraction",
        description: "Industrial pumps remove storm water ingress. Prevent mould growth. Extract from carpets, walls, floors immediately."
      },
      {
        step: 6,
        title: "Structural Drying",
        description: "Industrial air movers and dehumidifiers. Monitor moisture levels daily. Prevent secondary water damage and mould."
      },
      {
        step: 7,
        title: "Permanent Repairs",
        description: "Roof restoration, window replacement, structural repairs. Restore to pre-storm condition. All work guaranteed."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete documentation, photos, detailed reports. Direct billing to all major insurers. No upfront costs for insurance work."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk for Storm Damage",
      points: [
        {
          title: "Master Restorer Certified - Rare in Brisbane",
          description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in disaster restoration. One of a limited number in Brisbane and QLD. Storm damage requires master-level expertise for proper structural assessment and repair."
        },
        {
          title: "60-Minute Storm Emergency Response",
          description: "Call +61 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Emergency tarping equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete storm damage documentation - photos, assessor meetings, detailed reports. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Storm Specialists - We Know Your Weather",
          description: "Based in Wacol, QLD. Extensive experience with Brisbane supercell hailstorms, severe thunderstorms, East Coast Lows. High-value property expertise in Hamilton, Ascot, New Farm storm zones."
        }
      ]
    },
    serviceAreas: {
      title: "Storm Damage Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Storm Damage Restoration Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Initial Storm Damage",
          description: "Roof damage, broken windows, water ingress, structural compromise. Immediate action required to prevent catastrophic secondary damage."
        },
        {
          stage: "DURING",
          title: "Active Restoration",
          description: "Emergency tarping, water extraction, structural drying with industrial equipment. Daily monitoring and documentation for insurance."
        },
        {
          stage: "AFTER",
          title: "Restoration Complete",
          description: "Property fully restored to pre-storm condition. Master Restorer certified completion. All structural repairs guaranteed."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Storm Damage Emergency?",
      description: "Every Minute Counts - Don't Wait for Water Ingress. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Emergency tarping and boarding. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ All Insurers",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "sewage-remediation",
    title: "Sewage Backup? Call Now - Health Hazard Emergency!",
    heroTitle: "Emergency Sewage Remediation Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Biohazard Certified",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid sewage backup cleanup, sanitization, and biohazard remediation across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "1300 309 361",
    ctaText: "Call 1300 309 361 Now",
    heroImage: "/certified-biohazard-remediation-technician-in-prot.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Sewage Backup Health Risks - Time is Critical. Raw sewage contains dangerous bacteria, viruses, and pathogens. Health risks increase every hour. Our Master Restorer team responds in 60 minutes with proper biohazard protocols.",
      risks: [
        {
          title: "0-1 Hours - Pathogen Exposure",
          description: "E. coli, salmonella, hepatitis A, and other pathogens present. Immediate evacuation and professional cleanup required. Do not attempt DIY cleanup."
        },
        {
          title: "2-6 Hours - Bacterial Growth",
          description: "Bacteria multiply rapidly in warm conditions. Airborne pathogens spread through HVAC systems. Severe health risks to occupants."
        },
        {
          title: "6-24 Hours - Contamination Spread",
          description: "Pathogens penetrate porous materials. Structural contamination becomes extensive. Professional remediation essential for safety."
        },
        {
          title: "24+ Hours - Severe Biohazard",
          description: "Complete property contamination. Extensive structural damage. May require demolition. Health risks become extreme."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Risk Your Health - Call Master Restorer Phill McGurk Immediately",
      description: "Our certified biohazard remediation team uses proper PPE, containment barriers, and hospital-grade disinfectants. We safely remove sewage, sanitize all affected areas, and restore your property to safe conditions."
    },
    commonProblems: [
      {
        title: "Sewer Line Backups",
        description: "Main sewer line blockages, tree root intrusion, pipe collapse. Causes complete sewage backup into property. Requires immediate professional extraction and sanitization.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Toilet Overflow & Blockages",
        description: "Severe toilet blockages, septic tank failures, drain backups. Category 3 water contamination requires professional biohazard cleanup and complete sanitization.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Septic System Failures",
        description: "Septic tank overflow, drain field failures, system backups. Complete property contamination. Professional extraction, sanitization, and system repair required.",
        treatment: "Technology: Industrial extractors, hospital-grade disinfectants, HEPA air scrubbers"
      },
      {
        title: "Storm Sewer Backups",
        description: "Storm water mixing with sewage during heavy rain. Combined sewer overflow into properties. Requires immediate professional remediation and sanitization.",
        certification: "Certification: IICRC Master Restorer - biohazard remediation specialist"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call 1300 309 361. Immediate safety assessment and dispatch. Do not enter contaminated areas. Evacuate if necessary."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes with full biohazard equipment. Safety assessment and containment setup."
      },
      {
        step: 3,
        title: "Containment & Safety",
        description: "Establish containment barriers. Negative air pressure systems. Proper PPE for all technicians. Secure contaminated areas."
      },
      {
        step: 4,
        title: "Sewage Extraction",
        description: "Industrial pumps remove all sewage and contaminated water. Safe disposal following biohazard regulations. Prevent further spread."
      },
      {
        step: 5,
        title: "Complete Sanitization",
        description: "Hospital-grade disinfectants applied to all affected surfaces. Antimicrobial treatment kills all pathogens. HEPA air filtration."
      },
      {
        step: 6,
        title: "Structural Drying",
        description: "Industrial dehumidifiers and air movers. Complete drying prevents mould growth. Daily moisture monitoring."
      },
      {
        step: 7,
        title: "Final Verification",
        description: "Master Restorer final inspection. Air quality testing confirms safe conditions. Property certified safe for occupancy."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete documentation, photos, detailed reports. Direct billing to all major insurers. No upfront costs for insurance work."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk for Sewage Remediation",
      points: [
        {
          title: "Biohazard Certified - Master Restorer",
          description: "Phill McGurk holds IICRC Master Restorer certification with specialized biohazard remediation credentials. One of a limited number in Brisbane and QLD. Your health and safety require master-level expertise."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Biohazard equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - photos, assessor meetings, detailed reports. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Local - We Know Your Systems",
          description: "Based in Wacol, QLD. Specialist experience with Brisbane sewer systems, Queenslander homes, older plumbing infrastructure. High-value property expertise in Hamilton, Ascot, New Farm."
        }
      ]
    },
    serviceAreas: {
      title: "Sewage Remediation Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Sewage Remediation Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Sewage Contamination",
          description: "Raw sewage backup, health hazards, biohazard contamination. Immediate professional remediation required. Do not attempt DIY cleanup."
        },
        {
          stage: "DURING",
          title: "Active Remediation",
          description: "Containment barriers, proper PPE, sewage extraction, complete sanitization. HEPA air filtration. Safe professional cleanup."
        },
        {
          stage: "AFTER",
          title: "Remediation Complete",
          description: "All sewage removed, complete sanitization, air quality verified safe. Master Restorer certified completion. Property safe for occupancy."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Sewage Backup Emergency?",
      description: "Health Hazard - Don't Wait - Professional Biohazard Cleanup Required. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Certified biohazard remediation. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ Biohazard Certified",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "flood-water-restoration",
    title: "Flood Damage? Call Now - Every Minute Counts!",
    heroTitle: "Emergency Flood Water Restoration Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Insurance Approved",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid flood water extraction, structural drying, and complete restoration across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "1300 309 361",
    ctaText: "Call 1300 309 361 Now",
    heroImage: "/emergency-response-team-helping-flood-damaged-home.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Flood Damage Timeline - Time is Critical. Flood water causes rapid structural damage. Mould growth begins within 24-48 hours. Our Master Restorer team responds in 60 minutes to minimize damage and costs.",
      risks: [
        {
          title: "0-1 Hours - Water Penetration",
          description: "Flood water penetrates all porous materials. Carpets, drywall, insulation saturated. Electrical hazards develop immediately."
        },
        {
          title: "2-24 Hours - Structural Damage",
          description: "Drywall swelling, floor warping, foundation issues. Metal surfaces tarnishing. Furniture and contents damaged beyond repair."
        },
        {
          title: "24-48 Hours - Mould Growth",
          description: "Mould and bacteria growth begins. Serious health risks. Structural damage intensifies. Restoration costs multiply."
        },
        {
          title: "48+ Hours - Catastrophic Damage",
          description: "Extensive mould colonies. Structural failure risk. May require demolition. Complete property loss possible."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk Immediately",
      description: "Our industrial flood pumps and thermal imaging technology extract flood water and stop damage progression within the first hour. Every minute you wait increases repair costs exponentially."
    },
    commonProblems: [
      {
        title: "Brisbane River Flooding",
        description: "River overflow, storm surge, flash flooding in Brisbane flood zones. Expert in Hamilton, New Farm, West End, Rocklea. Industrial pumps and rapid extraction.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Flash Flood Damage",
        description: "Sudden flash flooding from severe storms, blocked drains, overwhelmed drainage systems. Rapid water extraction prevents structural damage and mould growth.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Groundwater Flooding",
        description: "Rising groundwater, basement flooding, crawl space flooding. Complete structural drying prevents mould and structural deterioration.",
        treatment: "Technology: Industrial pumps, thermal imaging, LGR dehumidifiers"
      },
      {
        title: "Storm Surge & Coastal Flooding",
        description: "Coastal flooding, storm surge damage, saltwater intrusion. Specialized treatment for saltwater damage. Complete restoration and structural drying.",
        certification: "Certification: IICRC Master Restorer - flood damage specialist"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call 1300 309 361. Immediate triage and dispatch. Safety guidance while we travel. Assess flood water category."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess flood damage severity and water category."
      },
      {
        step: 3,
        title: "Flood Water Extraction",
        description: "Industrial pumps and truck-mounted extractors remove all standing flood water. Prevent further absorption into materials and structure."
      },
      {
        step: 4,
        title: "Moisture Detection",
        description: "Thermal imaging and moisture meters map all affected areas. Locate hidden moisture in walls, floors, ceilings, and subfloors."
      },
      {
        step: 5,
        title: "Structural Drying",
        description: "Industrial air movers and LGR dehumidifiers create optimal drying conditions. Monitor daily with moisture readings. Prevent mould growth."
      },
      {
        step: 6,
        title: "Sanitization & Cleaning",
        description: "Antimicrobial treatment prevents mould and bacteria growth. HEPA filtration for air quality. Complete cleaning of all affected surfaces."
      },
      {
        step: 7,
        title: "Final Inspection",
        description: "Master Restorer final verification. All areas returned to pre-loss moisture levels. Documentation for insurance claim."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete documentation, photos, moisture reports. Direct billing to all major insurers. No upfront costs for insurance work."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk for Flood Restoration",
      points: [
        {
          title: "Master Restorer Certified - Rare in Brisbane",
          description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in flood damage restoration. One of a limited number in Brisbane and QLD. Your property deserves master-level expertise."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Industrial flood pumps on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - flood reports, photos, assessor meetings. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Flood Zone Specialists",
          description: "Based in Wacol, QLD. Extensive experience with Brisbane River flooding, flood zones, Queenslander homes, weather patterns. High-value property expertise in Hamilton, Ascot, New Farm flood-prone areas."
        }
      ]
    },
    serviceAreas: {
      title: "Flood Water Restoration Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Flood Water Restoration Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Initial Flood Damage",
          description: "Standing flood water, saturated materials, immediate action required to prevent structural damage and mould growth."
        },
        {
          stage: "DURING",
          title: "Active Restoration",
          description: "Industrial flood pumps extracting water, air movers and dehumidifiers working 24/7. Thermal imaging monitoring. Daily moisture readings."
        },
        {
          stage: "AFTER",
          title: "Restoration Complete",
          description: "Property returned to pre-loss moisture levels. Master Restorer certified completion. Ready for rebuilding or occupancy."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Flood Damage Emergency?",
      description: "Every Minute Counts - Don't Wait for Mould Growth. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Industrial flood pumps. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ All Insurers",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "burst-pipe-restoration",
    title: "Burst Pipe? Call Now - Every Minute Counts!",
    heroTitle: "Emergency Burst Pipe Restoration Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Insurance Approved",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid burst pipe water extraction, structural drying, and complete restoration across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "1300 309 361",
    ctaText: "Call 1300 309 361 Now",
    heroImage: "/professional-water-extraction-team-responding-to-f.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Burst Pipe Damage Timeline - Time is Critical. Burst pipes can flood your property within minutes. Water damage worsens every hour. Our Master Restorer team responds in 60 minutes to minimize damage and costs.",
      risks: [
        {
          title: "0-1 Hours - Rapid Flooding",
          description: "Burst pipe floods property rapidly. Water penetrates all areas. Electrical hazards develop. Immediate water shutoff and extraction critical."
        },
        {
          title: "2-6 Hours - Structural Damage",
          description: "Drywall swelling, floor warping, ceiling collapse risk. Furniture and contents damaged. Water spreads to adjacent rooms."
        },
        {
          title: "6-24 Hours - Mould Risk",
          description: "Mould growth begins in saturated materials. Structural damage intensifies. Restoration costs multiply significantly."
        },
        {
          title: "24+ Hours - Catastrophic Damage",
          description: "Extensive mould colonies. Structural failure risk. Complete property damage possible. May require demolition."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk Immediately",
      description: "Our industrial water extraction equipment stops damage progression within the first hour. We identify the source, extract all water, and prevent mould growth. Every minute you wait increases repair costs."
    },
    commonProblems: [
      {
        title: "Hot Water System Bursts",
        description: "Hot water system failures, pressure relief valve failures, tank corrosion. Common in older Brisbane Queenslander homes. Causes catastrophic flooding within minutes.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Burst Mains & Supply Lines",
        description: "Main water line bursts, pipe corrosion, freezing damage, high pressure failures. Rapid flooding throughout property. Immediate professional extraction required.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Plumbing Fixture Failures",
        description: "Toilet supply line bursts, washing machine hose failures, dishwasher leaks, sink supply line breaks. Rapid water damage to floors and walls.",
        treatment: "Technology: Industrial extractors, thermal imaging, LGR dehumidifiers"
      },
      {
        title: "Pipe Corrosion & Age",
        description: "Older Brisbane homes with corroded pipes, galvanized pipe failures, copper pipe pinhole leaks. Complete pipe replacement and water damage restoration.",
        certification: "Certification: IICRC Master Restorer - water damage specialist"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call 1300 309 361. Immediate triage and dispatch. Guidance on water shutoff while we travel. Safety assessment."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess burst pipe damage and water category."
      },
      {
        step: 3,
        title: "Water Extraction",
        description: "Industrial pumps and truck-mounted extractors remove all standing water. Prevent further absorption into materials and structure."
      },
      {
        step: 4,
        title: "Source Identification",
        description: "Locate burst pipe source. Temporary repair to stop water flow. Assess plumbing system for additional issues."
      },
      {
        step: 5,
        title: "Moisture Detection",
        description: "Thermal imaging and moisture meters map all affected areas. Locate hidden moisture in walls, floors, ceilings, and subfloors."
      },
      {
        step: 6,
        title: "Structural Drying",
        description: "Industrial air movers and LGR dehumidifiers create optimal drying conditions. Monitor daily with moisture readings. Prevent mould growth."
      },
      {
        step: 7,
        title: "Final Inspection",
        description: "Master Restorer final verification. All areas returned to pre-loss moisture levels. Documentation for insurance claim."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete documentation, photos, moisture reports. Direct billing to all major insurers. No upfront costs for insurance work."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk for Burst Pipe Restoration",
      points: [
        {
          title: "Master Restorer Certified - Rare in Brisbane",
          description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in water damage restoration. One of a limited number in Brisbane and QLD. Your property deserves master-level expertise."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Industrial extraction equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - damage reports, photos, assessor meetings. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Local - We Know Your Plumbing",
          description: "Based in Wacol, QLD. Specialist experience with Brisbane Queenslander homes, older plumbing systems, pipe corrosion issues. High-value property expertise in Hamilton, Ascot, New Farm."
        }
      ]
    },
    serviceAreas: {
      title: "Burst Pipe Restoration Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Burst Pipe Restoration Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Initial Burst Pipe Damage",
          description: "Standing water from burst pipe, saturated materials, immediate action required to prevent structural damage and mould growth."
        },
        {
          stage: "DURING",
          title: "Active Restoration",
          description: "Water extraction, structural drying with industrial equipment. Thermal imaging monitoring. Daily moisture readings."
        },
        {
          stage: "AFTER",
          title: "Restoration Complete",
          description: "Property returned to pre-loss moisture levels. Master Restorer certified completion. Ready for plumbing repairs and occupancy."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Burst Pipe Emergency?",
      description: "Every Minute Counts - Don't Wait for Mould Growth. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Industrial water extraction. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ All Insurers",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "commercial-water-damage",
    title: "Commercial Water Damage? Call Now - Minimize Business Downtime!",
    heroTitle: "Commercial Water Damage Restoration Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Business Continuity Focus",
    heroDescription: "Phill McGurk - Master Restorer and team provide rapid commercial water damage restoration, minimizing business downtime across Brisbane, Ipswich, and Logan. Available 24/7/365.",
    phoneNumber: "1300 309 361",
    ctaText: "Call 1300 309 361 Now",
    heroImage: "/large-scale-commercial-property-emergency-restorat.jpg",
    healthWarning: {
      title: "🚨 Why Immediate Response Matters",
      description: "Commercial Water Damage Timeline - Business Impact is Critical. Every hour of downtime costs revenue. Water damage spreads rapidly in commercial spaces. Our Master Restorer team responds in 60 minutes to minimize business disruption.",
      risks: [
        {
          title: "0-1 Hours - Business Disruption Begins",
          description: "Water spreads throughout commercial space. Operations halt. Customer impact begins. Immediate professional response critical to minimize downtime."
        },
        {
          title: "2-6 Hours - Revenue Loss",
          description: "Extended business closure. Customer service disruption. Inventory damage. Lost revenue accumulates. Structural damage worsens."
        },
        {
          title: "6-24 Hours - Major Business Impact",
          description: "Significant revenue loss. Customer dissatisfaction. Equipment damage. Mould growth begins. Insurance claim complications."
        },
        {
          title: "24+ Hours - Catastrophic Business Loss",
          description: "Extended closure required. Major revenue loss. Equipment replacement needed. Complete business disruption possible."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk Immediately",
      description: "Our commercial restoration team specializes in minimizing business downtime. We work around your operations when possible, use industrial equipment for rapid restoration, and coordinate directly with your insurance for seamless claims processing."
    },
    commonProblems: [
      {
        title: "Office Building Water Damage",
        description: "Burst pipes, HVAC failures, roof leaks in office buildings. Rapid restoration to minimize business disruption. Work around operations when possible.",
        detection: "Response: Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong"
      },
      {
        title: "Retail Store Water Damage",
        description: "Plumbing failures, roof leaks, flooding in retail spaces. Protect inventory, minimize customer disruption, rapid restoration to resume operations.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Warehouse & Industrial Water Damage",
        description: "Large-scale water damage in warehouses, manufacturing facilities. Industrial equipment for rapid extraction and drying. Protect inventory and equipment.",
        treatment: "Technology: Industrial pumps, large-scale dehumidifiers, thermal imaging"
      },
      {
        title: "Restaurant & Hospitality Water Damage",
        description: "Kitchen plumbing failures, equipment leaks, flooding. Health code compliance critical. Rapid restoration to resume food service operations.",
        certification: "Certification: IICRC Master Restorer - commercial restoration specialist"
      }
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact",
        description: "Call 1300 309 361. Immediate triage and dispatch. Assess business impact and prioritize rapid response."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess commercial water damage and business impact."
      },
      {
        step: 3,
        title: "Business Continuity Planning",
        description: "Assess operations impact. Plan restoration around business operations when possible. Minimize customer and revenue disruption."
      },
      {
        step: 4,
        title: "Water Extraction",
        description: "Industrial pumps and commercial extractors remove all standing water. Rapid extraction to minimize business downtime."
      },
      {
        step: 5,
        title: "Moisture Detection",
        description: "Thermal imaging and moisture meters map all affected commercial areas. Locate hidden moisture in walls, floors, ceilings."
      },
      {
        step: 6,
        title: "Structural Drying",
        description: "Industrial air movers and commercial dehumidifiers. Rapid drying to resume operations quickly. Monitor daily with moisture readings."
      },
      {
        step: 7,
        title: "Final Inspection",
        description: "Master Restorer final verification. All areas returned to pre-loss condition. Business ready to resume operations."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete documentation, photos, detailed reports. Direct billing to all major insurers. Business interruption claim support."
      }
    ],
    excellence: {
      title: "Why Brisbane Businesses Trust Master Restorer Phill McGurk",
      points: [
        {
          title: "Master Restorer Certified - Commercial Specialist",
          description: "Phill McGurk holds IICRC Master Restorer certification with commercial restoration expertise. One of a limited number in Brisbane and QLD. Your business deserves master-level expertise to minimize downtime."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Commercial equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete commercial claim documentation - business interruption reports, photos, assessor meetings. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Commercial Specialists",
          description: "Based in Wacol, QLD. Extensive experience with Brisbane commercial properties, office buildings, retail spaces, warehouses. High-value commercial property expertise in CBD, Hamilton, Ascot, New Farm."
        }
      ]
    },
    serviceAreas: {
      title: "Commercial Water Damage Restoration - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: Commercial Water Damage Restoration Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Initial Commercial Water Damage",
          description: "Water damage in commercial space, business operations disrupted, immediate professional restoration required to minimize downtime."
        },
        {
          stage: "DURING",
          title: "Active Restoration",
          description: "Rapid water extraction, structural drying with commercial equipment. Work around operations when possible. Daily monitoring and documentation."
        },
        {
          stage: "AFTER",
          title: "Restoration Complete",
          description: "Commercial property fully restored. Business operations ready to resume. Master Restorer certified completion. Minimal downtime achieved."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Commercial Water Damage Emergency?",
      description: "Minimize Business Downtime - Every Hour Counts. IICRC Master Restorer Phill McGurk and team respond within 60 minutes. Commercial restoration specialists. Direct insurance billing. Business continuity focus.",
      features: [
        "⚡ 60 Minutes",
        "🏆 Master Restorer",
        "🛡️ Business Focus",
        "Emergency Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  },
  {
    id: "emergency-response",
    title: "Emergency? Call Now - 24/7 Emergency Response!",
    heroTitle: "24/7 Emergency Response Brisbane",
    heroSubtitle: "60-Minute Response • IICRC Master Restorer • Available 24/7/365",
    heroDescription: "Phill McGurk - Master Restorer and team provide 24/7 emergency disaster response across Brisbane, Ipswich, and Logan. Water, fire, storm, mould - we're available whenever disaster strikes.",
    phoneNumber: "1300 309 361",
    ctaText: "Call 1300 309 361 Now",
    heroImage: "/emergency-response-lights-dramatic-background.jpg",
    healthWarning: {
      title: "🚨 Why 24/7 Emergency Response Matters",
      description: "Disaster Timeline - Every Minute Counts. Disasters don't wait for business hours. Water damage worsens every hour. Fire damage spreads. Storm damage exposes properties to further damage. Our Master Restorer team is available 24/7/365.",
      risks: [
        {
          title: "0-1 Hours - Critical Response Window",
          description: "Immediate professional response can prevent catastrophic damage. Water extraction, fire containment, storm securing - every minute matters in the first hour."
        },
        {
          title: "2-6 Hours - Damage Acceleration",
          description: "Without professional response, damage worsens rapidly. Water spreads, fire damage intensifies, storm damage exposes property to further weather."
        },
        {
          title: "6-24 Hours - Major Damage",
          description: "Extended delay causes major structural damage. Mould growth begins. Fire soot causes permanent staining. Storm damage leads to water ingress."
        },
        {
          title: "24+ Hours - Catastrophic Loss",
          description: "Extended delay can result in complete property loss. Structural failure, extensive mould, permanent fire damage, complete storm destruction possible."
        }
      ]
    },
    whyProfessional: {
      title: "Don't Wait - Call Master Restorer Phill McGurk 24/7",
      description: "Disasters happen at any time - nights, weekends, holidays. Our 24/7 emergency response team is always ready. We respond within 60 minutes, 365 days a year. Don't wait for business hours - call now."
    },
    commonProblems: [
      {
        title: "Water Damage Emergencies",
        description: "Burst pipes, flooding, water leaks - available 24/7. Rapid water extraction prevents structural damage and mould growth. Industrial equipment on every truck.",
        detection: "Response: Within 60 minutes - 24/7/365"
      },
      {
        title: "Fire Damage Emergencies",
        description: "House fires, kitchen fires, smoke damage - available 24/7. Immediate soot removal and smoke odor elimination prevents permanent damage.",
        certification: "Insurance: All major insurers approved - direct billing available"
      },
      {
        title: "Storm Damage Emergencies",
        description: "Severe storms, hail damage, wind damage - available 24/7. Emergency tarping and boarding prevents further weather damage.",
        treatment: "Technology: Emergency equipment, industrial tools, 24/7 availability"
      },
      {
        title: "Mould Emergencies",
        description: "Rapid mould growth, health concerns, extensive contamination - available 24/7. Immediate containment and assessment prevents further spread.",
        certification: "Certification: IICRC Master Restorer - 24/7 emergency specialist"
      }
    ],
    process: [
      {
        step: 1,
        title: "24/7 Emergency Call",
        description: "Call 1300 309 361 anytime - day or night, weekends, holidays. Immediate triage and dispatch. Available 24/7/365."
      },
      {
        step: 2,
        title: "60-Min On-Site",
        description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). 90 minutes for greater Brisbane, Ipswich, Logan. 24/7 availability."
      },
      {
        step: 3,
        title: "Emergency Assessment",
        description: "Immediate safety assessment and damage evaluation. Identify immediate threats and prioritize emergency response actions."
      },
      {
        step: 4,
        title: "Emergency Mitigation",
        description: "Stop damage progression immediately. Water extraction, fire containment, storm securing, mould containment - whatever the emergency requires."
      },
      {
        step: 5,
        title: "Property Securing",
        description: "Emergency board-up, tarping, securing as needed. Prevent further damage from weather, unauthorized entry, or additional hazards."
      },
      {
        step: 6,
        title: "Documentation",
        description: "Complete emergency documentation for insurance. Photos, damage reports, immediate action taken. Support insurance claims from day one."
      },
      {
        step: 7,
        title: "Restoration Planning",
        description: "Develop complete restoration plan. Coordinate with insurance. Schedule full restoration work. Minimize property loss."
      },
      {
        step: 8,
        title: "Insurance Support",
        description: "Complete emergency documentation, photos, detailed reports. Direct billing to all major insurers. No upfront costs for insurance work."
      }
    ],
    excellence: {
      title: "Why Brisbane Trusts Master Restorer Phill McGurk for 24/7 Emergency Response",
      points: [
        {
          title: "24/7/365 Availability - Always Ready",
          description: "Disasters don't wait for business hours. We're available 24 hours a day, 7 days a week, 365 days a year. Nights, weekends, holidays - we're always ready to respond."
        },
        {
          title: "60-Minute Emergency Response",
          description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Emergency equipment on every truck."
        },
        {
          title: "All Major Insurers - Direct Billing",
          description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete emergency documentation - photos, assessor meetings, detailed reports. No upfront costs for insurance work."
        },
        {
          title: "Brisbane Emergency Specialists",
          description: "Based in Wacol, QLD. Extensive experience with all types of Brisbane emergencies - water, fire, storm, mould. High-value property expertise in Hamilton, Ascot, New Farm. Always ready when disaster strikes."
        }
      ]
    },
    serviceAreas: {
      title: "24/7 Emergency Response - Brisbane, Ipswich, Logan",
      areas: [
        {
          region: "Brisbane",
          highPriority: ["Hamilton", "Ascot", "New Farm", "Toowong", "Paddington", "Bulimba"],
          allAreas: ["Brisbane CBD", "West End", "Fortitude Valley", "Milton", "South Bank", "Kangaroo Point", "Chermside", "Carindale", "Mt Gravatt", "Indooroopilly"]
        },
        {
          region: "Ipswich",
          highPriority: ["Karalee", "Brookwater", "Springfield Lakes"],
          allAreas: ["Ipswich CBD", "Springfield Central", "Redbank Plains", "Yamanto", "Goodna", "Booval", "Bundamba", "Leichhardt"]
        },
        {
          region: "Logan",
          highPriority: ["Logan Central", "Industrial Areas"],
          allAreas: ["Springwood", "Shailer Park", "Browns Plains", "Woodridge", "Loganholme", "Beenleigh", "Eagleby"]
        }
      ]
    },
    visualGuide: {
      title: "Visual Guide: 24/7 Emergency Response Process",
      stages: [
        {
          stage: "BEFORE",
          title: "Emergency Situation",
          description: "Disaster strikes - water, fire, storm, mould. Immediate professional response required. Available 24/7/365."
        },
        {
          stage: "DURING",
          title: "Active Emergency Response",
          description: "60-minute response, immediate mitigation, property securing. Stop damage progression. Available anytime."
        },
        {
          stage: "AFTER",
          title: "Emergency Secured",
          description: "Damage progression stopped. Property secured. Restoration plan in place. Master Restorer certified emergency response. Ready for full restoration."
        }
      ]
    },
    finalCta: {
      title: "Brisbane Emergency? Call 24/7 Now!",
      description: "Don't Wait - Available 24/7/365. IICRC Master Restorer Phill McGurk and team respond within 60 minutes, anytime. Water, fire, storm, mould emergencies. Direct insurance billing. No upfront costs for insurance work.",
      features: [
        "⚡ 24/7/365",
        "🏆 Master Restorer",
        "🛡️ All Insurers",
        "60-Min Response",
        "IICRC Certified",
        "Direct Billing"
      ],
      servingAreas: "Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs"
    }
  }
]

export function getServiceById(id: string): ServiceContent | undefined {
  return servicesData.find(service => service.id === id)
}

export function getAllServiceIds(): string[] {
  return servicesData.map(service => service.id)
}

