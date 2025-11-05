'use client';

import Script from 'next/script';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
  tip?: string;
}

interface HowToSchemaProps {
  title: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT1H" for 1 hour)
  estimatedCost?: {
    value: string;
    currency: string;
  };
  supplies?: string[];
  tools?: string[];
  steps: HowToStep[];
  image?: string;
  video?: {
    name: string;
    description: string;
    thumbnailUrl: string;
    contentUrl: string;
    embedUrl?: string;
    uploadDate: string;
    duration: string;
  };
}

export default function HowToSchema({
  title,
  description,
  totalTime = "PT24H",
  estimatedCost,
  supplies = [],
  tools = [],
  steps,
  image,
  video
}: HowToSchemaProps) {

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "image": image || "https://disasterrecovery.com.au/images/process/restoration-process.jpg",
    "totalTime": totalTime,
    "estimatedCost": estimatedCost || {
      "@type": "MonetaryAmount",
      "currency": "AUD",
      "value": "Insurance Covered"
    },
    "supply": supplies.map(supply => ({
      "@type": "HowToSupply",
      "name": supply
    })),
    "tool": tools.map(tool => ({
      "@type": "HowToTool",
      "name": tool
    })),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url }),
      ...(step.tip && {
        "tip": {
          "@type": "HowToTip",
          "text": step.tip
        }
      })
    })),
    ...(video && {
      "video": {
        "@type": "VideoObject",
        "name": video.name,
        "description": video.description,
        "thumbnailUrl": video.thumbnailUrl,
        "contentUrl": video.contentUrl,
        "embedUrl": video.embedUrl,
        "uploadDate": video.uploadDate,
        "duration": video.duration
      }
    }),
    "performTime": totalTime,
    "prepTime": "PT15M",
    "yield": {
      "@type": "QuantitativeValue",
      "value": "1",
      "unitText": "fully restored property"
    }
  };

  return (
    <Script
      id={`howto-schema-${title.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
}

// Pre-configured HowTo schemas for common processes
export const WaterDamageHowTo = () => (
  <HowToSchema
    title="How to Handle Water Damage Emergency in Brisbane"
    description="Professional step-by-step guide for responding to water damage in your Brisbane property. IICRC certified process from Disaster Recovery."
    totalTime="PT48H"
    supplies={[
      "Industrial water extractors",
      "Professional dehumidifiers",
      "HEPA air scrubbers",
      "Antimicrobial treatments",
      "Moisture detection equipment"
    ]}
    tools={[
      "Thermal imaging cameras",
      "Moisture meters",
      "Hygrometers",
      "Air movers",
      "HEPA vacuums"
    ]}
    steps={[
      {
        name: "Stop the water source",
        text: "Locate and turn off the main water supply to prevent further flooding. If the source is external (storm/flood), ensure safety first.",
        tip: "Know where your main water shut-off valve is located before an emergency occurs."
      },
      {
        name: "Call Disaster Recovery",
        text: "Call 1300 309 361 immediately for professional help. Our IICRC certified team provides 24/7 emergency response with 1-hour arrival time.",
        url: "tel:1300309361"
      },
      {
        name: "Document the damage",
        text: "Take photos and videos of all affected areas for insurance purposes. Document standing water, damaged items, and affected structures.",
        tip: "Use your phone's timestamp feature to record when damage occurred."
      },
      {
        name: "Remove valuable items",
        text: "If safe, move furniture, electronics, and valuables to dry areas. Lift curtains and furniture skirts off wet floors.",
        tip: "Place aluminum foil or wood blocks under furniture legs to prevent staining."
      },
      {
        name: "Professional water extraction",
        text: "Our team uses industrial extractors to remove standing water quickly, preventing secondary damage and mould growth."
      },
      {
        name: "Structural drying",
        text: "Deploy professional dehumidifiers and air movers for 3-5 days to achieve optimal moisture levels below 16%."
      },
      {
        name: "Antimicrobial treatment",
        text: "Apply EPA-registered antimicrobials to prevent mould and bacteria growth in Brisbane's humid climate."
      },
      {
        name: "Monitoring and documentation",
        text: "Daily moisture readings and thermal imaging to ensure complete drying. Full documentation for insurance claims."
      },
      {
        name: "Final inspection",
        text: "Comprehensive inspection to ensure property is restored to pre-loss condition with warranty provided."
      }
    ]}
  />
);

export const FireDamageHowTo = () => (
  <HowToSchema
    title="Fire Damage Restoration Process in Brisbane"
    description="Professional fire and smoke damage restoration guide by Disaster Recovery. IICRC certified process for complete restoration."
    totalTime="PT72H"
    supplies={[
      "Soot removal chemicals",
      "Odour neutralisers",
      "HEPA filtration systems",
      "Protective equipment",
      "Restoration materials"
    ]}
    tools={[
      "HEPA vacuums",
      "Hydroxyl generators",
      "Ozone machines",
      "Thermal foggers",
      "Air scrubbers"
    ]}
    steps={[
      {
        name: "Ensure safety",
        text: "Wait for fire department clearance. Never enter until structure is deemed safe.",
        tip: "Keep insurance and important documents in a fireproof safe."
      },
      {
        name: "Emergency contact",
        text: "Call Disaster Recovery at 1300 309 361 for immediate response and board-up services if needed.",
        url: "tel:1300309361"
      },
      {
        name: "Assessment and inspection",
        text: "Comprehensive inspection of fire, smoke, and soot damage. Test for hidden damage in walls and HVAC systems."
      },
      {
        name: "Board-up and tarping",
        text: "Secure property with board-up services for windows/doors and roof tarping to prevent further damage."
      },
      {
        name: "Water removal",
        text: "Extract water from firefighting efforts to prevent secondary damage and mould growth."
      },
      {
        name: "Smoke and soot removal",
        text: "Use specialised equipment and techniques to remove smoke and soot from all surfaces."
      },
      {
        name: "Cleaning and sanitising",
        text: "Clean, sanitise, and deodorise all restorable items and structures using IICRC approved methods."
      },
      {
        name: "Restoration",
        text: "Complete restoration including minor repairs to full reconstruction of damaged areas."
      }
    ]}
  />
);

export const MouldRemediationHowTo = () => (
  <HowToSchema
    title="Professional Mould Remediation Process Brisbane"
    description="IICRC certified mould removal process for Brisbane's subtropical climate. Safe, thorough mould remediation by Disaster Recovery."
    totalTime="PT48H"
    estimatedCost={{
      value: "2000-8000",
      currency: "AUD"
    }}
    supplies={[
      "HEPA filtration units",
      "Antimicrobial solutions",
      "Containment barriers",
      "PPE equipment",
      "Disposal bags"
    ]}
    tools={[
      "Negative air machines",
      "HEPA vacuums",
      "Moisture meters",
      "Borescopes",
      "Air quality monitors"
    ]}
    steps={[
      {
        name: "Initial inspection",
        text: "Identify mould type, extent of growth, and moisture source. Use thermal imaging and moisture meters.",
        tip: "Mould can grow within 24-48 hours in Brisbane's humid climate."
      },
      {
        name: "Containment setup",
        text: "Install plastic sheeting barriers and negative air pressure to prevent spore spread during remediation."
      },
      {
        name: "HEPA filtration",
        text: "Deploy HEPA air scrubbers to capture airborne mould spores and maintain air quality."
      },
      {
        name: "Remove contaminated materials",
        text: "Safely remove and dispose of mould-infested materials like drywall, insulation, and carpet."
      },
      {
        name: "Clean and treat surfaces",
        text: "HEPA vacuum all surfaces, then apply antimicrobial treatments to eliminate remaining mould."
      },
      {
        name: "Dry affected areas",
        text: "Use dehumidifiers to reduce moisture levels below 50% to prevent regrowth."
      },
      {
        name: "Repair moisture source",
        text: "Fix leaks, improve ventilation, or address humidity issues causing mould growth."
      },
      {
        name: "Post-remediation verification",
        text: "Conduct air quality testing to ensure successful remediation and safe environment."
      }
    ]}
  />
);