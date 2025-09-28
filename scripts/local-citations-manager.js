#!/usr/bin/env node
/**
 * Local Citations and NAP Consistency Manager
 * Generates comprehensive citation strategy for maximum local SEO impact
 */

const fs = require('fs');
const path = require('path');

class LocalCitationsManager {
  constructor() {
    this.businessData = {
      // NAP Data - MUST be consistent across ALL citations
      name: "Disaster Recovery Brisbane",
      alternateNames: [
        "Disaster Recovery Brisbane - Phill McGurk Master Restorer",
        "Master Restorer Brisbane - Disaster Recovery",
        "Phill McGurk Disaster Recovery Brisbane"
      ],
      address: {
        street: "4/17 Tile Street",
        suburb: "Wacol",
        state: "QLD",
        postcode: "4076",
        country: "Australia",
        full: "4/17 Tile Street, Wacol, QLD 4076, Australia"
      },
      phone: "1300 309 361",
      website: "https://disasterrecovery.com.au",
      email: "info@disasterrecovery.com.au",

      // Business Categories for Citations
      categories: {
        primary: "Water Damage Restoration Service",
        secondary: [
          "Fire Damage Restoration Service",
          "Mold Remediation Service",
          "Emergency Restoration Service",
          "Commercial Cleaning Service",
          "Disaster Recovery Service",
          "IICRC Certified Contractor",
          "Master Restorer Certified"
        ]
      },

      // Service Areas for Geographic Citations
      serviceAreas: [
        // Brisbane Metro
        "Brisbane City", "Hamilton", "Ascot", "New Farm", "Toowong",
        "Fortitude Valley", "Milton", "South Brisbane", "West End",
        "Paddington", "Red Hill", "Kelvin Grove", "Herston", "Newstead",
        "Teneriffe", "Kangaroo Point", "Woolloongabba", "Spring Hill",

        // Ipswich Area
        "Ipswich", "Springfield Lakes", "Brookwater", "Karalee",
        "Springfield Central", "Augustine Heights", "Redbank Plains",

        // Logan Area
        "Logan Central", "Springwood", "Shailer Park", "Daisy Hill",
        "Slacks Creek", "Woodridge", "Browns Plains"
      ],

      // Business Hours
      hours: "24/7 Emergency Service Available",

      // Key Services for Citation Descriptions
      services: [
        "24/7 Emergency Water Damage Restoration",
        "Fire Damage Cleanup and Restoration",
        "Mould Remediation and Testing",
        "Storm Damage Repair",
        "Flood Recovery Services",
        "Insurance Claim Assistance",
        "Commercial Restoration Services",
        "Residential Restoration Services",
        "IICRC Certified Restoration",
        "Master Restorer Services"
      ]
    };
  }

  generateCitationTargets() {
    return [
      // Tier 1 - Critical Australian Directories
      {
        platform: "Google Business Profile",
        url: "https://business.google.com",
        priority: "Critical",
        domain_authority: 100,
        australia_specific: true,
        category: "Google Services",
        submission_type: "Manual",
        estimated_time: "30 minutes",
        notes: "Most important citation - controls local pack rankings"
      },
      {
        platform: "Yellow Pages Australia",
        url: "https://www.yellowpages.com.au",
        priority: "Critical",
        domain_authority: 85,
        australia_specific: true,
        category: "Major Directory",
        submission_type: "Manual",
        estimated_time: "20 minutes",
        notes: "Australia's premier business directory"
      },
      {
        platform: "True Local",
        url: "https://www.truelocal.com.au",
        priority: "High",
        domain_authority: 70,
        australia_specific: true,
        category: "Local Directory",
        submission_type: "Manual",
        estimated_time: "15 minutes",
        notes: "Major Australian local business platform"
      },
      {
        platform: "Whereis",
        url: "https://www.whereis.com",
        priority: "High",
        domain_authority: 75,
        australia_specific: true,
        category: "Maps/Directory",
        submission_type: "Manual",
        estimated_time: "15 minutes",
        notes: "Popular Australian mapping service"
      },

      // Tier 2 - Industry-Specific Citations
      {
        platform: "IICRC Find a Professional",
        url: "https://www.iicrc.org/find-professional",
        priority: "Critical",
        domain_authority: 65,
        australia_specific: false,
        category: "Industry Association",
        submission_type: "Manual",
        estimated_time: "25 minutes",
        notes: "Industry certification directory - critical for credibility"
      },
      {
        platform: "Restoration Industry Association",
        url: "https://www.restorationindustry.org",
        priority: "High",
        domain_authority: 55,
        australia_specific: false,
        category: "Industry Association",
        submission_type: "Manual",
        estimated_time: "20 minutes",
        notes: "Industry-specific authority building"
      },

      // Tier 3 - Regional Australian Directories
      {
        platform: "Hotfrog Australia",
        url: "https://www.hotfrog.com.au",
        priority: "Medium",
        domain_authority: 60,
        australia_specific: true,
        category: "Business Directory",
        submission_type: "Manual",
        estimated_time: "10 minutes",
        notes: "Well-established Australian business directory"
      },
      {
        platform: "StartLocal",
        url: "https://www.startlocal.com.au",
        priority: "Medium",
        domain_authority: 50,
        australia_specific: true,
        category: "Local Directory",
        submission_type: "Manual",
        estimated_time: "10 minutes",
        notes: "Australian local business focus"
      },
      {
        platform: "Local Business Guide",
        url: "https://www.localbusinessguide.com.au",
        priority: "Medium",
        domain_authority: 45,
        australia_specific: true,
        category: "Business Directory",
        submission_type: "Manual",
        estimated_time: "10 minutes",
        notes: "Australian local business platform"
      },

      // Tier 4 - Government and Local Authority Citations
      {
        platform: "Brisbane City Council Business Directory",
        url: "https://www.brisbane.qld.gov.au",
        priority: "High",
        domain_authority: 90,
        australia_specific: true,
        category: "Government",
        submission_type: "Manual",
        estimated_time: "20 minutes",
        notes: "Local government authority - high trust signal"
      },
      {
        platform: "Ipswich City Council Business Directory",
        url: "https://www.ipswich.qld.gov.au",
        priority: "High",
        domain_authority: 80,
        australia_specific: true,
        category: "Government",
        submission_type: "Manual",
        estimated_time: "20 minutes",
        notes: "Service area government listing"
      },
      {
        platform: "Logan City Council Business Directory",
        url: "https://www.logan.qld.gov.au",
        priority: "High",
        domain_authority: 80,
        australia_specific: true,
        category: "Government",
        submission_type: "Manual",
        estimated_time: "20 minutes",
        notes: "Service area government listing"
      },

      // Tier 5 - Review and Social Platforms
      {
        platform: "Yelp Australia",
        url: "https://www.yelp.com.au",
        priority: "Medium",
        domain_authority: 85,
        australia_specific: true,
        category: "Review Platform",
        submission_type: "Manual",
        estimated_time: "15 minutes",
        notes: "Important for reviews and social proof"
      },
      {
        platform: "Facebook Business",
        url: "https://www.facebook.com/business",
        priority: "High",
        domain_authority: 95,
        australia_specific: false,
        category: "Social Platform",
        submission_type: "Manual",
        estimated_time: "30 minutes",
        notes: "Major social signal and customer communication"
      },

      // Tier 6 - Additional Australian Directories
      {
        platform: "White Pages Australia",
        url: "https://www.whitepages.com.au",
        priority: "Medium",
        domain_authority: 75,
        australia_specific: true,
        category: "Directory",
        submission_type: "Manual",
        estimated_time: "10 minutes",
        notes: "Established Australian directory"
      },
      {
        platform: "Aussie Web",
        url: "https://www.aussieweb.com.au",
        priority: "Low",
        domain_authority: 40,
        australia_specific: true,
        category: "Directory",
        submission_type: "Manual",
        estimated_time: "10 minutes",
        notes: "Australian web directory"
      },
      {
        platform: "Business.gov.au",
        url: "https://www.business.gov.au",
        priority: "Medium",
        domain_authority: 95,
        australia_specific: true,
        category: "Government",
        submission_type: "Manual",
        estimated_time: "15 minutes",
        notes: "Federal government business portal"
      },

      // Tier 7 - Specialized Emergency Services Directories
      {
        platform: "Emergency Services Directory",
        url: "https://www.emergencyservices.com.au",
        priority: "Medium",
        domain_authority: 35,
        australia_specific: true,
        category: "Emergency Services",
        submission_type: "Manual",
        estimated_time: "15 minutes",
        notes: "Industry-specific emergency services"
      },
      {
        platform: "RESTORE Australian Directory",
        url: "https://www.restore.org.au",
        priority: "Medium",
        domain_authority: 40,
        australia_specific: true,
        category: "Industry Directory",
        submission_type: "Manual",
        estimated_time: "15 minutes",
        notes: "Restoration industry focus"
      }
    ];
  }

  generateCitationTemplates() {
    const templates = {
      basic_description: `Brisbane's only Master Restorer certified professional. 24/7 emergency water damage restoration, fire damage cleanup, and mould remediation. IICRC certified. Insurance approved. Serving Brisbane, Ipswich, Logan metro areas.`,

      extended_description: `Disaster Recovery Brisbane is led by Phill McGurk, one of Queensland's limited Master Restorer certified professionals. Our IICRC certified team provides 24/7 emergency restoration services including water damage restoration, fire damage cleanup, mould remediation, storm damage repair, and insurance claim assistance.

SERVICES:
• 24/7 Emergency Water Damage Restoration
• Fire Damage Cleanup and Restoration
• Mould Remediation and Testing
• Storm Damage Repair
• Commercial & Residential Restoration
• Insurance Claim Support

CERTIFICATIONS:
• Master Restorer Certified (limited Brisbane professionals)
• IICRC Certified (Industry Gold Standard)
• Insurance Company Approved
• Queensland Licensed

SERVICE AREAS:
Brisbane Metro, Ipswich, Logan including premium suburbs Hamilton, Ascot, New Farm, Toowong, Springfield Lakes, Brookwater.

EMERGENCY RESPONSE: Within 1 hour Brisbane metro. Advanced equipment, direct insurance billing, guaranteed workmanship.

Call 1300 309 361 for immediate Master Restorer response.`,

      keyword_variations: [
        "Master Restorer Brisbane",
        "Emergency Water Damage Brisbane",
        "IICRC Certified Brisbane",
        "24/7 Restoration Brisbane",
        "Disaster Recovery Brisbane",
        "Fire Damage Restoration Brisbane",
        "Mould Remediation Brisbane",
        "Commercial Restoration Brisbane",
        "Flood Cleanup Brisbane",
        "Storm Damage Repair Brisbane"
      ],

      service_area_descriptions: {
        "Brisbane City": "Emergency restoration services for Brisbane CBD including high-rise commercial buildings and heritage properties.",
        "Hamilton": "Specialized restoration for Hamilton's executive riverfront mansions and luxury properties.",
        "Ascot": "Expert restoration services for Ascot's racing precinct and premium residential properties.",
        "New Farm": "Heritage Queenslander restoration expertise for New Farm's character homes and waterfront properties.",
        "Toowong": "University precinct restoration services with council compliance for heritage character homes.",
        "Ipswich": "Comprehensive restoration services for Ipswich metro including commercial and residential properties.",
        "Springfield Lakes": "Lakefront property restoration specialists for premium estates and golf course communities."
      }
    };

    return templates;
  }

  generateNAPConsistencyReport() {
    const napVariations = {
      correct_format: {
        name: this.businessData.name,
        address: this.businessData.address.full,
        phone: this.businessData.phone
      },

      common_variations_to_avoid: [
        {
          issue: "Inconsistent business name",
          wrong: "Disaster Recovery",
          correct: "Disaster Recovery Brisbane"
        },
        {
          issue: "Missing suite/unit number",
          wrong: "17 Tile Street, Wacol, QLD 4076",
          correct: "4/17 Tile Street, Wacol, QLD 4076"
        },
        {
          issue: "Inconsistent phone format",
          wrong: "(07) 1300 309 361",
          correct: "1300 309 361"
        },
        {
          issue: "Different address format",
          wrong: "Tile St, Wacol QLD",
          correct: "4/17 Tile Street, Wacol, QLD 4076, Australia"
        }
      ],

      citation_priority_by_nap_impact: [
        "Google Business Profile (100% impact on local rankings)",
        "Yellow Pages Australia (High authority, high visibility)",
        "Government directories (High trust signals)",
        "IICRC Professional Directory (Industry credibility)",
        "Major Australian directories (Domain authority)",
        "Review platforms (Customer interaction)",
        "Social media platforms (Brand consistency)",
        "Industry-specific directories (Niche authority)"
      ]
    };

    return napVariations;
  }

  generateImplementationPlan() {
    const plan = {
      phase1_critical: {
        timeframe: "Week 1",
        priority: "Critical - Do First",
        citations: [
          "Google Business Profile",
          "Yellow Pages Australia",
          "IICRC Find a Professional",
          "Brisbane City Council Directory"
        ],
        estimated_time: "4-6 hours",
        expected_impact: "Immediate local search visibility improvement"
      },

      phase2_high: {
        timeframe: "Week 2",
        priority: "High Priority",
        citations: [
          "True Local",
          "Whereis",
          "Ipswich City Council Directory",
          "Logan City Council Directory",
          "Facebook Business"
        ],
        estimated_time: "3-4 hours",
        expected_impact: "Enhanced local authority and coverage"
      },

      phase3_medium: {
        timeframe: "Week 3-4",
        priority: "Medium Priority",
        citations: [
          "Hotfrog Australia",
          "StartLocal",
          "Yelp Australia",
          "White Pages Australia",
          "Business.gov.au"
        ],
        estimated_time: "2-3 hours",
        expected_impact: "Comprehensive citation coverage"
      },

      phase4_specialized: {
        timeframe: "Week 4-5",
        priority: "Specialized/Industry",
        citations: [
          "Restoration Industry Association",
          "Emergency Services Directory",
          "RESTORE Australian Directory",
          "Local Business Guide",
          "Aussie Web"
        ],
        estimated_time: "2-3 hours",
        expected_impact: "Industry authority and niche coverage"
      }
    };

    return plan;
  }

  async generateComprehensiveReport() {
    console.log('🏢 Generating Local Citations and NAP Consistency Strategy...\n');

    const report = {
      businessData: this.businessData,
      citationTargets: this.generateCitationTargets(),
      templates: this.generateCitationTemplates(),
      napConsistency: this.generateNAPConsistencyReport(),
      implementationPlan: this.generateImplementationPlan(),

      keyMetrics: {
        totalCitations: this.generateCitationTargets().length,
        criticalCitations: this.generateCitationTargets().filter(c => c.priority === 'Critical').length,
        highPriority: this.generateCitationTargets().filter(c => c.priority === 'High').length,
        australianSpecific: this.generateCitationTargets().filter(c => c.australia_specific).length,
        governmentCitations: this.generateCitationTargets().filter(c => c.category === 'Government').length,
        industryCitations: this.generateCitationTargets().filter(c => c.category.includes('Industry')).length
      },

      expectedResults: {
        timeframe: "4-6 weeks for full implementation",
        localRankingImprovement: "Expected 40-60% improvement in local search visibility",
        searchTerms: [
          "master restorer brisbane",
          "emergency water damage brisbane",
          "disaster recovery brisbane",
          "IICRC certified brisbane",
          "24/7 restoration brisbane"
        ],
        competitiveAdvantage: "Master Restorer certification + comprehensive citation coverage = market domination"
      }
    };

    // Save comprehensive report
    const reportPath = path.join(__dirname, '..', 'local-citations-strategy.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return report;
  }

  async run() {
    console.log('🚀 Local Citations and NAP Consistency Manager\n');
    console.log('═══════════════════════════════════════════════\n');

    const report = await this.generateComprehensiveReport();

    console.log('📊 CITATION STRATEGY OVERVIEW:');
    console.log('═════════════════════════════');
    console.log(`Total Citation Targets: ${report.keyMetrics.totalCitations}`);
    console.log(`Critical Priority: ${report.keyMetrics.criticalCitations}`);
    console.log(`High Priority: ${report.keyMetrics.highPriority}`);
    console.log(`Australia-Specific: ${report.keyMetrics.australianSpecific}`);
    console.log(`Government Citations: ${report.keyMetrics.governmentCitations}`);
    console.log(`Industry Citations: ${report.keyMetrics.industryCitations}`);

    console.log('\n🎯 NAP CONSISTENCY (CRITICAL):');
    console.log('═════════════════════════════');
    console.log(`Business Name: ${report.businessData.name}`);
    console.log(`Address: ${report.businessData.address.full}`);
    console.log(`Phone: ${report.businessData.phone}`);
    console.log(`Website: ${report.businessData.website}`);

    console.log('\n🏆 PHASE 1 - CRITICAL CITATIONS (Week 1):');
    console.log('═══════════════════════════════════════');
    report.implementationPlan.phase1_critical.citations.forEach(citation => {
      console.log(`• ${citation}`);
    });

    console.log('\n📈 EXPECTED RESULTS:');
    console.log('═══════════════════');
    console.log(`• Implementation Time: ${report.expectedResults.timeframe}`);
    console.log(`• Local Ranking Improvement: ${report.expectedResults.localRankingImprovement}`);
    console.log('• Master Restorer positioning for market domination');
    console.log('• Comprehensive Australia-wide citation coverage');

    console.log(`\n✅ Complete citation strategy saved to: local-citations-strategy.json`);
    console.log('\n📋 NEXT STEP: Begin Phase 1 critical citations immediately');

    return report;
  }
}

// Run if called directly
if (require.main === module) {
  const manager = new LocalCitationsManager();
  manager.run().catch(console.error);
}

module.exports = LocalCitationsManager;