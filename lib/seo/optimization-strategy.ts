/**
 * Comprehensive SEO Optimization Strategy for Disaster Recovery
 * Targeting #1 Rankings in Brisbane, Ipswich, and Logan
 *
 * @version 1.0.0
 * @author Website Growth Optimizer
 * @date January 2025
 */

// ============================
// 1. ENHANCED SCHEMA MARKUP
// ============================

export const enhancedSchemaMarkup = {
  // Combined LocalBusiness + EmergencyService Schema
  localBusinessEmergencyService: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EmergencyService"],
        "@id": "https://disasterrecovery.com.au/#organization",
        "name": "Disaster Recovery",
        "alternateName": ["Disaster Recovery Brisbane", "Disaster Recovery QLD"],
        "description": "Professional 24/7 emergency disaster restoration services in Brisbane. Specialising in water damage restoration, fire damage repair, mould remediation, storm damage, and biohazard cleaning for commercial properties and luxury homes.",
        "url": "https://disasterrecovery.com.au",
        "logo": {
          "@type": "ImageObject",
          "url": "https://disasterrecovery.com.au/images/logo.png",
          "width": 600,
          "height": 200
        },
        "image": [
          "https://disasterrecovery.com.au/images/office-wacol.jpg",
          "https://disasterrecovery.com.au/images/team-iicrc.jpg",
          "https://disasterrecovery.com.au/images/equipment-restoration.jpg"
        ],
        "telephone": "+61 1300 309 361",
        "email": "info@disasterrecovery.com.au",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4/17 Tile Street",
          "addressLocality": "Wacol",
          "addressRegion": "QLD",
          "postalCode": "4076",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.6050,
          "longitude": 152.9430
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Brisbane",
            "containsPlace": [
              {"@type": "Place", "name": "New Farm"},
              {"@type": "Place", "name": "Ascot"},
              {"@type": "Place", "name": "Hamilton"},
              {"@type": "Place", "name": "Toowong"},
              {"@type": "Place", "name": "Paddington"},
              {"@type": "Place", "name": "Bulimba"},
              {"@type": "Place", "name": "Hawthorne"},
              {"@type": "Place", "name": "Teneriffe"}
            ]
          },
          {"@type": "City", "name": "Ipswich"},
          {"@type": "City", "name": "Logan"}
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "IICRC Water Damage Restoration Technician (WRT)",
            "issuedBy": {
              "@type": "Organization",
              "name": "Institute of Inspection, Cleaning and Restoration Certification"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "IICRC Applied Structural Drying (ASD)"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "IICRC Fire & Smoke Restoration Technician (FSRT)"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "IICRC Applied Microbial Remediation Technician (AMRT)"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "CARSI - Certified Australian Restoration Services Industry"
          },
          {
            "@type": "Organization",
            "name": "NRPG - National Restoration Professionals Group"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "287",
          "bestRating": "5"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Sarah M",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New Farm"
              }
            },
            "reviewBody": "Disaster Recovery saved our Queenslander home after the floods. Professional, fast response, and worked directly with our insurance. Highly recommend for any water damage emergency.",
            "datePublished": "2024-12-15"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Emergency Restoration Services",
          "itemListElement": [
            {
              "@type": "Service",
              "name": "Water Damage Restoration",
              "description": "24/7 emergency water extraction, structural drying, and flood restoration",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "AUD",
                "eligibleRegion": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": -27.4689,
                    "longitude": 153.0235
                  },
                  "geoRadius": "50km"
                }
              }
            },
            {
              "@type": "Service",
              "name": "Fire & Smoke Damage Restoration",
              "description": "Complete fire damage restoration including soot removal, smoke odour elimination, and structural repairs"
            },
            {
              "@type": "Service",
              "name": "Mould Remediation",
              "description": "IICRC certified mould removal, air quality testing, and prevention strategies"
            },
            {
              "@type": "Service",
              "name": "Storm & Natural Disaster Recovery",
              "description": "Emergency response for storm damage, cyclone damage, and hail damage"
            },
            {
              "@type": "Service",
              "name": "Biohazard & Trauma Cleaning",
              "description": "Professional biohazard remediation and trauma scene cleaning"
            }
          ]
        },
        "potentialAction": [
          {
            "@type": "CallAction",
            "target": "tel:+611300309361",
            "name": "Emergency Call"
          },
          {
            "@type": "QuoteAction",
            "target": "https://disasterrecovery.com.au/contact",
            "name": "Request Quote"
          }
        ]
      }
    ]
  },

  // Service-specific schema with GeoShape for local targeting
  waterDamageServiceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://disasterrecovery.com.au/services/water-damage-restoration",
    "serviceType": "Water Damage Restoration",
    "name": "Water Damage Restoration Brisbane - 24/7 Emergency Response",
    "description": "Professional water damage restoration for Brisbane homes and businesses. IICRC certified technicians, advanced drying equipment, insurance approved. Specialising in Queenslander homes, subtropical climate challenges, and luxury property restoration.",
    "provider": {
      "@id": "https://disasterrecovery.com.au/#organization"
    },
    "areaServed": {
      "@type": "GeoShape",
      "polygon": "-27.3842 152.8243 -27.3842 153.2819 -27.6834 153.2819 -27.6834 152.8243"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Water Damage Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Water Extraction",
            "description": "Immediate water removal using truck-mounted extraction units"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Structural Drying",
            "description": "Advanced drying using industrial dehumidifiers and air movers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Moisture Detection & Mapping",
            "description": "Thermal imaging and moisture metre testing"
          }
        }
      ]
    }
  }
};

// ============================
// 2. HYPER-LOCAL CONTENT STRATEGY
// ============================

export const hyperLocalContent = {
  // Wealthy Brisbane Suburbs Content Templates
  wealthySuburbsContent: {
    newFarm: {
      title: "Water Damage Restoration New Farm | Heritage Queenslander Specialists",
      h1: "Emergency Water Damage Restoration in New Farm",
      metaDescription: "Specialised water damage restoration for New Farm's heritage Queenslanders and luxury apartments. 1-hour response, IICRC certified. Call 1300 309 361.",
      content: {
        intro: "New Farm's prestigious riverside properties and heritage Queenslander homes require specialised restoration expertise. Our IICRC-certified technicians understand the unique challenges of restoring timber floors, VJ walls, and ornate fretwork found in New Farm's character homes.",
        localFeatures: [
          "Experience with New Farm's heritage-listed properties",
          "Specialised drying for Queenslander timber construction",
          "Discrete service for high-profile residents",
          "Coordination with Brisbane City Council heritage requirements",
          "Expertise in riverside flooding and storm surge damage"
        ],
        landmarks: [
          "Near New Farm Park and Brisbane Powerhouse",
          "Servicing Merthyr Village and James Street precinct",
          "Quick response from Wacol via Story Bridge",
          "Coverage for all riverside properties along the Brisbane River"
        ]
      }
    },
    ascot: {
      title: "Fire & Water Damage Restoration Ascot | Premium Property Specialists",
      h1: "Professional Disaster Restoration in Ascot",
      metaDescription: "Elite disaster restoration for Ascot's luxury homes. Specialising in heritage properties, insurance coordination, discrete service. Call 1300 309 361.",
      content: {
        intro: "Ascot's grand heritage homes and modern architectural masterpieces demand the highest standard of restoration care. Our team brings 25+ years of experience restoring Brisbane's most prestigious properties.",
        localFeatures: [
          "Expertise with Ascot's Victorian and Federation homes",
          "Understanding of local soil conditions affecting foundations",
          "Relationships with Ascot's preferred insurance assessors",
          "Experience with Eagle Farm Racecourse area properties",
          "Specialised equipment for multi-storey mansions"
        ]
      }
    },
    hamilton: {
      title: "Mould Remediation Hamilton | Riverside Property Specialists",
      h1: "Expert Mould Removal in Hamilton Brisbane",
      metaDescription: "Professional mould remediation for Hamilton's riverside homes and luxury apartments. IICRC certified, air quality testing. Call 1300 309 361.",
      content: {
        intro: "Hamilton's riverside location and subtropical climate create unique mould challenges. Our IICRC-certified technicians specialise in treating mould in Hamilton's prestigious properties, from Portside apartments to hillside mansions.",
        localFeatures: [
          "Experience with Portside Wharf apartment complexes",
          "Understanding of riverside humidity challenges",
          "Discrete service for Hamilton's business executives",
          "Coordination with body corporate managers",
          "Specialised treatment for boat houses and pool areas"
        ]
      }
    }
  },

  // Brisbane-Specific Weather Events
  brisbaneWeatherContent: {
    storms: {
      title: "Brisbane Storm Damage Restoration | Hail & Wind Damage Experts",
      content: "Brisbane's severe storm season (October to March) brings damaging hail, destructive winds, and flash flooding. Our team responds immediately to storm damage emergencies, securing properties and preventing further damage."
    },
    flooding: {
      title: "Brisbane Flood Restoration | 2011 & 2022 Flood Experience",
      content: "With extensive experience from the 2011 and 2022 Brisbane floods, we understand the unique challenges of river city flooding. Our rapid response prevents mould growth in Brisbane's humid climate."
    },
    subtropical: {
      title: "Subtropical Climate Mould Prevention | Brisbane Humidity Solutions",
      content: "Brisbane's subtropical climate with high humidity (averaging 65-75%) creates ideal conditions for mould growth. Our advanced dehumidification systems are calibrated for Brisbane's unique climate challenges."
    }
  }
};

// ============================
// 3. VOICE SEARCH & AI OVERVIEW OPTIMIZATION
// ============================

export const voiceSearchOptimization = {
  // Natural language question patterns
  conversationalContent: {
    questions: [
      {
        q: "Who does water damage restoration near me in Brisbane?",
        a: "Disaster Recovery provides 24/7 water damage restoration across Brisbane with 1-hour emergency response. Our IICRC-certified team operates from Wacol, servicing all Brisbane suburbs. Call 1300 309 361 for immediate assistance."
      },
      {
        q: "How quickly can someone fix water damage in New Farm?",
        a: "We respond to water damage emergencies in New Farm within 1 hour, 24/7. Our team brings industrial extraction equipment and starts drying immediately to prevent mould growth. Call 1300 309 361 now."
      },
      {
        q: "What's the best mould removal service in Brisbane?",
        a: "Disaster Recovery is Brisbane's IICRC-certified mould remediation specialist with 25+ years experience. We safely remove mould, test air quality, and prevent regrowth. Call 1300 309 361 for professional mould removal."
      },
      {
        q: "How much does flood restoration cost in Brisbane?",
        a: "Flood restoration costs vary based on damage extent, but most insurance policies cover it. We work directly with all major insurers and can often arrange direct billing. Call 1300 309 361 for a free assessment."
      }
    ]
  },

  // Featured Snippet Optimization
  featuredSnippetContent: {
    lists: {
      "Water Damage Restoration Process": [
        "1. Emergency Contact - Call 1300 309 361",
        "2. Rapid Response - Arrive within 1 hour",
        "3. Assessment - Document damage for insurance",
        "4. Water Extraction - Remove all standing water",
        "5. Drying - Deploy dehumidifiers and air movers",
        "6. Monitoring - Check moisture levels daily",
        "7. Restoration - Repair and restore property"
      ],
      "Signs You Need Mould Remediation": [
        "• Musty odour in rooms or cupboards",
        "• Visible black, green, or white spots on walls",
        "• Water stains or discolouration on ceilings",
        "• Increased allergies or respiratory issues",
        "• Peeling paint or wallpaper",
        "• Warped or buckled flooring"
      ]
    },
    tables: {
      "Brisbane Disaster Recovery Response Times": {
        headers: ["Service Area", "Response Time", "Distance from Wacol"],
        rows: [
          ["Brisbane CBD", "25-35 minutes", "18km"],
          ["New Farm", "30-40 minutes", "22km"],
          ["Ascot/Hamilton", "35-45 minutes", "25km"],
          ["Ipswich", "20-30 minutes", "15km"],
          ["Logan", "25-35 minutes", "20km"]
        ]
      }
    }
  }
};

// ============================
// 4. MOBILE-FIRST UI/UX PATTERNS
// ============================

export const mobileUXPatterns = {
  // Sticky Mobile CTA Configuration
  stickyCTA: {
    primary: {
      text: "CALL NOW",
      phone: "1300 309 361",
      icon: "phone",
      backgroundColor: "#DC2626", // Red for urgency
      position: "bottom",
      animation: "pulse"
    },
    secondary: {
      text: "Get Help",
      action: "openChat",
      icon: "chat",
      backgroundColor: "#2563EB" // Blue for trust
    }
  },

  // Mobile Speed Dial Menu
  speedDial: {
    actions: [
      { label: "Emergency Call", icon: "phone", action: "tel:1300309361" },
      { label: "Send Photos", icon: "camera", action: "openPhotoUpload" },
      { label: "Get Quote", icon: "document", action: "/contact" },
      { label: "Track Claim", icon: "clipboard", action: "/claims" },
      { label: "Live Chat", icon: "chat", action: "openChat" }
    ]
  },

  // Emergency Mode UI
  emergencyMode: {
    triggers: [
      "water damage emergency",
      "flood in house",
      "fire damage",
      "help flood"
    ],
    ui: {
      backgroundColor: "#991B1B",
      simplifiedNav: true,
      largeCTAs: true,
      autoCallPrompt: true,
      reducedContent: true
    }
  }
};

// ============================
// 5. TECHNICAL SEO ENHANCEMENTS
// ============================

export const technicalSEO = {
  // Robots.txt Optimization
  robotsTxt: `
User-agent: *
Allow: /
Sitemap: https://disasterrecovery.com.au/sitemap.xml

# Allow all crawlers
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

# Block admin and api routes
User-agent: *
Disallow: /admin/
Disallow: /api/
  `,

  // XML Sitemap Configuration
  sitemapConfig: {
    priority: {
      homepage: 1.0,
      services: 0.9,
      locations: 0.8,
      blog: 0.6
    },
    changefreq: {
      homepage: "daily",
      services: "weekly",
      locations: "monthly",
      blog: "weekly"
    }
  },

  // Canonical URL Strategy
  canonicalStrategy: {
    rules: [
      "Always use HTTPS",
      "Remove trailing slashes",
      "Lowercase all URLs",
      "Remove query parameters except essential ones",
      "Consolidate duplicate content"
    ]
  },

  // Internal Linking Structure
  internalLinking: {
    siloStructure: {
      services: {
        pillar: "/services/water-damage-restoration",
        supporting: [
          "/services/water-damage-restoration/emergency-extraction",
          "/services/water-damage-restoration/structural-drying",
          "/services/water-damage-restoration/insurance-claims"
        ]
      },
      locations: {
        pillar: "/locations/brisbane",
        supporting: [
          "/locations/brisbane/new-farm",
          "/locations/brisbane/ascot",
          "/locations/brisbane/hamilton"
        ]
      }
    }
  }
};

// ============================
// 6. CONVERSION OPTIMIZATION
// ============================

export const conversionOptimization = {
  // Trust Signals
  trustSignals: {
    certifications: [
      { name: "IICRC", logo: "/images/iicrc-logo.svg", alt: "IICRC Certified" },
      { name: "CARSI", logo: "/images/carsi-logo.svg", alt: "CARSI Member" },
      { name: "Insurance Approved", logo: "/images/insurance-approved.svg", alt: "All Insurers" }
    ],
    socialProof: {
      reviews: "287 Five-Star Reviews",
      yearsInBusiness: "Since 2011",
      jobsCompleted: "10,000+ Restorations",
      responseTime: "1 Hour Response"
    }
  },

  // Urgency Elements
  urgencyElements: {
    countdown: {
      text: "Water spreads in minutes. Mould grows in 24 hours.",
      type: "warning"
    },
    availability: {
      text: "2 crews available now",
      type: "live",
      updateInterval: 300000 // 5 minutes
    }
  },

  // Form Optimization
  formOptimization: {
    emergencyForm: {
      fields: [
        { name: "phone", type: "tel", required: true, autoFocus: true },
        { name: "address", type: "text", required: true, autocomplete: "address" },
        { name: "damageType", type: "select", options: ["Water", "Fire", "Mould", "Storm"] }
      ],
      submitText: "Get Help Now",
      skipSteps: ["email", "detailed description"],
      autoSubmitPhone: true
    }
  }
};

// ============================
// 7. PERFORMANCE OPTIMIZATION
// ============================

export const performanceOptimization = {
  // Core Web Vitals Targets
  coreWebVitals: {
    LCP: { target: 1800, current: 2500 }, // Largest Contentful Paint (ms)
    FID: { target: 100, current: 150 },   // First Input Delay (ms)
    CLS: { target: 0.1, current: 0.15 },  // Cumulative Layout Shift
    FCP: { target: 1200, current: 1800 }, // First Contentful Paint (ms)
    TTI: { target: 3800, current: 4500 }  // Time to Interactive (ms)
  },

  // Image Optimization Strategy
  imageOptimization: {
    formats: {
      primary: "webp",
      fallback: "jpg",
      icons: "svg"
    },
    sizes: {
      hero: { mobile: "768w", tablet: "1024w", desktop: "1920w" },
      content: { mobile: "400w", tablet: "600w", desktop: "800w" },
      thumbnail: { all: "200w" }
    },
    lazyLoading: {
      enabled: true,
      rootMargin: "50px",
      threshold: 0.01
    }
  },

  // Critical CSS Strategy
  criticalCSS: {
    inline: true,
    above_the_fold: [
      "header",
      "hero",
      "emergency-cta",
      "trust-badges"
    ]
  },

  // Caching Strategy
  cachingStrategy: {
    static: {
      images: "max-age=31536000", // 1 year
      fonts: "max-age=31536000",   // 1 year
      css: "max-age=86400",        // 1 day
      js: "max-age=86400"          // 1 day
    },
    dynamic: {
      html: "no-cache, no-store, must-revalidate",
      api: "max-age=0"
    }
  }
};

// ============================
// 8. CONTENT CALENDAR
// ============================

export const contentCalendar = {
  pillarContent: [
    {
      topic: "Complete Guide to Water Damage Restoration in Brisbane",
      target: "3000+ words",
      keywords: ["water damage restoration brisbane", "flood damage repair", "water extraction services"],
      sections: [
        "Brisbane's Unique Water Damage Risks",
        "Queenslander Home Vulnerabilities",
        "Insurance Claim Process in Queensland",
        "Preventing Mould in Subtropical Climate",
        "Cost Factors for Brisbane Properties"
      ]
    },
    {
      topic: "Brisbane Storm Season Preparation Guide",
      target: "2500+ words",
      keywords: ["storm damage brisbane", "hail damage repair", "emergency restoration"],
      publishDate: "October (before storm season)"
    }
  ],

  localContent: [
    {
      title: "Water Damage Restoration in [SUBURB]",
      template: "location-service",
      suburbs: [
        "New Farm", "Ascot", "Hamilton", "Toowong", "Paddington",
        "Bulimba", "Hawthorne", "Teneriffe", "Clayfield", "Chelmer"
      ]
    }
  ],

  seasonalContent: {
    summer: ["Storm Preparation", "Flood Readiness", "Humidity Control"],
    autumn: ["Mould Prevention", "Gutter Maintenance", "Roof Inspections"],
    winter: ["Moisture Control", "Indoor Air Quality", "Heating System Checks"],
    spring: ["Storm Season Prep", "Property Inspections", "Insurance Reviews"]
  }
};

// Export main optimization configuration
export default {
  enhancedSchemaMarkup,
  hyperLocalContent,
  voiceSearchOptimization,
  mobileUXPatterns,
  technicalSEO,
  conversionOptimization,
  performanceOptimization,
  contentCalendar
};