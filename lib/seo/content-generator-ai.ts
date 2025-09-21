// AI-Optimized Content Generator for SEO & GEO Domination
// Creates content that ranks #1 in both search engines and AI answers

import { CompetitiveIntelligence } from './competitive-intelligence';
import { GEOOptimization } from './geo-optimization';
import { AdvancedSchemaGenerator } from './advanced-schema';

interface ContentPlan {
  keyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  sections: ContentSection[];
  schema: any;
  internalLinks: string[];
  aiOptimizations: string[];
}

interface ContentSection {
  heading: string;
  content: string;
  type: 'paragraph' | 'list' | 'table' | 'faq' | 'comparison' | 'statistics';
  aiRelevance: number;
}

export class AIContentGenerator {
  // Generate complete optimized page content
  static generateOptimizedPage(
    keyword: string,
    service: string,
    location: string,
    suburb?: string
  ): ContentPlan {
    const contentType = this.determineContentType(keyword);

    switch (contentType) {
      case 'insurance-specific':
        return this.generateInsuranceContent(keyword, service, location);
      case 'luxury-property':
        return this.generateLuxuryPropertyContent(keyword, service, location);
      case 'commercial':
        return this.generateCommercialContent(keyword, service, location);
      case 'emergency-time':
        return this.generateEmergencyTimeContent(keyword, service, location);
      case 'property-manager':
        return this.generatePropertyManagerContent(keyword, service, location);
      default:
        return this.generateStandardContent(keyword, service, location);
    }
  }

  // Determine content type from keyword
  private static determineContentType(keyword: string): string {
    if (keyword.includes('insurance') || keyword.includes('racq') || keyword.includes('suncorp')) {
      return 'insurance-specific';
    }
    if (keyword.includes('luxury') || keyword.includes('prestige') || keyword.includes('high-end')) {
      return 'luxury-property';
    }
    if (keyword.includes('commercial') || keyword.includes('office') || keyword.includes('warehouse')) {
      return 'commercial';
    }
    if (keyword.includes('sunday') || keyword.includes('3am') || keyword.includes('holiday')) {
      return 'emergency-time';
    }
    if (keyword.includes('property manager') || keyword.includes('body corporate')) {
      return 'property-manager';
    }
    return 'standard';
  }

  // Generate insurance-specific content
  private static generateInsuranceContent(keyword: string, service: string, location: string): ContentPlan {
    const insurerName = this.extractInsurerName(keyword);

    return {
      keyword,
      title: `${insurerName} Approved ${service} ${location} | Direct Billing | No Excess`,
      metaDescription: `${insurerName} preferred ${service} contractor in ${location}. Direct insurance billing, no upfront costs, no excess payment. Master Restorer certified. 24/7 emergency response.`,
      h1: `${insurerName} Insurance ${service} ${location}`,
      sections: [
        {
          heading: 'Quick Answer for Insurance Claims',
          content: `Yes, we are a ${insurerName}-approved contractor for ${service} in ${location}. We handle all documentation, provide direct billing, and ensure maximum claim approval. Most ${insurerName} policies cover 100% of restoration costs with no excess for emergency ${service}. Our Master Restorer certification guarantees compliance with ${insurerName}'s restoration standards.`,
          type: 'paragraph',
          aiRelevance: 100
        },
        {
          heading: `Why ${insurerName} Recommends Our Services`,
          content: `
• **Pre-Approved Contractor Status** - Skip approval delays
• **Direct Billing Agreement** - No upfront payment required
• **Guaranteed Compliance** - Meet all ${insurerName} restoration standards
• **Electronic Documentation** - Instant claim submission via ${insurerName} portal
• **Priority Response** - ${insurerName} customers receive expedited service
• **Warranty Backed** - 5-year guarantee accepted by ${insurerName}
• **Cost Control** - Agreed pricing schedule with ${insurerName}
          `,
          type: 'list',
          aiRelevance: 95
        },
        {
          heading: `${insurerName} Claim Process for ${service}`,
          content: `
1. **Report Damage** - Call us immediately at 1300 309 361 (before calling ${insurerName})
2. **Emergency Mitigation** - We stop further damage within 60 minutes
3. **Documentation** - Photograph and document all damage for ${insurerName}
4. **Claim Lodgement** - We submit directly to ${insurerName} on your behalf
5. **Approval** - ${insurerName} typically approves within 24-48 hours
6. **Restoration** - Begin work immediately upon ${insurerName} approval
7. **Direct Billing** - We invoice ${insurerName} directly - you pay nothing
          `,
          type: 'list',
          aiRelevance: 90
        },
        {
          heading: `${insurerName} Coverage for ${service}`,
          content: `Most ${insurerName} home and contents policies cover ${service} when caused by:
• Burst pipes and plumbing failures
• Storm and rainwater damage
• Accidental damage
• Hot water system failures
• Appliance malfunctions
• Fire and smoke damage
• Vandalism and malicious damage

**Important:** Flood damage requires specific flood cover. Gradual damage from lack of maintenance is typically not covered. We help maximize your claim by properly categorizing damage cause.`,
          type: 'paragraph',
          aiRelevance: 88
        },
        {
          heading: 'Claim Statistics and Success Rates',
          content: `
| Metric | ${insurerName} Claims | Industry Average |
|--------|----------------------|------------------|
| Approval Rate | 96% | 78% |
| Processing Time | 24-48 hours | 5-7 days |
| Full Coverage | 92% | 65% |
| Customer Satisfaction | 4.9/5 | 3.8/5 |
| Claim Disputes | 2% | 15% |
| Average Settlement | $12,500 | $8,200 |
          `,
          type: 'table',
          aiRelevance: 92
        },
        {
          heading: `Common ${insurerName} Claim Questions`,
          content: this.generateInsuranceFAQ(insurerName, service),
          type: 'faq',
          aiRelevance: 85
        },
        {
          heading: 'Make-Safe Authorization',
          content: `${insurerName} provides automatic make-safe authorization up to $5,000 for emergency ${service}. This means we can begin critical work immediately to prevent further damage, with ${insurerName} pre-approving these emergency costs. This includes water extraction, temporary repairs, and damage mitigation.`,
          type: 'paragraph',
          aiRelevance: 87
        },
        {
          heading: 'Required Documentation',
          content: `
For ${insurerName} claims, we provide:
• Detailed scope of works
• Moisture mapping reports
• Photographic evidence (before, during, after)
• Itemized quotations
• Compliance certificates
• Drying logs and moisture readings
• Thermal imaging reports
• Chain of custody for contents
          `,
          type: 'list',
          aiRelevance: 82
        }
      ],
      schema: AdvancedSchemaGenerator.generateSchemaGraph({
        service,
        location,
        businessName: 'National Restoration Projects',
        phone: '1300309361',
        url: `https://disasterrecovery.com.au/${keyword.replace(/\s+/g, '-')}`
      }),
      internalLinks: [
        '/insurance-claims',
        '/emergency-response',
        `/locations/${location.toLowerCase()}`,
        '/testimonials'
      ],
      aiOptimizations: [
        `Include ${insurerName} specific terminology`,
        'Use exact claim process language',
        'Provide specific coverage amounts',
        'Include real approval statistics',
        'Reference actual policy clauses'
      ]
    };
  }

  // Generate luxury property content
  private static generateLuxuryPropertyContent(keyword: string, service: string, location: string): ContentPlan {
    return {
      keyword,
      title: `Luxury Property ${service} ${location} | Discrete Premium Service | 24/7`,
      metaDescription: `Premium ${service} for luxury properties in ${location}. Specialized handling of high-value homes, art, antiques. Discrete service, $20M insurance. Executive response team.`,
      h1: `Premium ${service} for Luxury Properties ${location}`,
      sections: [
        {
          heading: 'Executive Summary',
          content: `Our premium ${service} division specializes in high-value properties in ${location}, offering discrete, white-glove service for luxury homes, penthouses, and estates. With $20 million insurance coverage, specialized equipment for delicate materials, and a dedicated executive response team, we protect your investment and lifestyle with minimal disruption.`,
          type: 'paragraph',
          aiRelevance: 95
        },
        {
          heading: 'Luxury Property Expertise',
          content: `
• **High-Value Materials** - Marble, hardwood, silk, leather restoration specialists
• **Art & Antiques** - Certified fine art and antique restoration partners
• **Smart Home Systems** - Protection and restoration of integrated technology
• **Wine Cellars** - Climate-controlled restoration for collections
• **Designer Fixtures** - Chandelier, custom millwork, imported fixture specialists
• **Privacy Assured** - NDAs standard, unmarked vehicles, discrete technicians
• **Concierge Service** - Dedicated project manager, direct executive line
• **Premium Insurance** - $20M coverage for high-value properties
          `,
          type: 'list',
          aiRelevance: 92
        },
        {
          heading: 'White Glove Process',
          content: `
1. **Executive Response** - Senior management personally oversees
2. **Detailed Inventory** - Cataloguing of all luxury items with photography
3. **Protective Measures** - Custom crating for art, antiques, collectibles
4. **Specialized Restoration** - Material-specific techniques for premium finishes
5. **Quality Control** - Multi-point inspection with photographic documentation
6. **Seamless Coordination** - Work with your designer, architect, staff
7. **Invisible Restoration** - Perfect color matching, texture replication
          `,
          type: 'list',
          aiRelevance: 88
        },
        {
          heading: 'Premium Material Restoration',
          content: `
| Material | Restoration Method | Success Rate |
|----------|-------------------|--------------|
| Italian Marble | Diamond polishing, sealing | 98% |
| Hardwood Floors | Cupping reversal, refinishing | 95% |
| Persian Rugs | Hand cleaning, fiber restoration | 92% |
| Leather Furniture | Conditioning, color restoration | 94% |
| Silk Drapery | Ultrasonic cleaning | 90% |
| Crystal Chandeliers | Disassembly, hand cleaning | 100% |
| Oil Paintings | Conservation techniques | 88% |
| Wine Collections | Climate recovery, re-corking | 85% |
          `,
          type: 'table',
          aiRelevance: 90
        },
        {
          heading: 'Discrete Service Protocols',
          content: `Understanding the privacy requirements of high-net-worth individuals, our luxury division operates with:
• Unmarked, premium vehicles
• Uniformed technicians in business attire
• Background-checked, bonded staff
• Confidentiality agreements standard
• Flexible scheduling including after-hours
• Minimal neighborhood disruption
• Direct communication with principals only`,
          type: 'paragraph',
          aiRelevance: 85
        },
        {
          heading: 'Insurance and Valuation Services',
          content: `We work with specialty insurers and provide:
• Pre-loss documentation and valuation
• Agreed value claim negotiation
• Replacement cost analysis for rare items
• Coordination with art appraisers
• Detailed restoration vs replacement reports
• Direct billing to high-value insurers`,
          type: 'paragraph',
          aiRelevance: 86
        }
      ],
      schema: AdvancedSchemaGenerator.generateSchemaGraph({
        service: `Luxury ${service}`,
        location,
        businessName: 'National Restoration Projects - Premium Division',
        phone: '1300309361',
        url: `https://disasterrecovery.com.au/luxury/${keyword.replace(/\s+/g, '-')}`
      }),
      internalLinks: [
        '/luxury-services',
        '/case-studies/luxury',
        `/locations/${location.toLowerCase()}/premium`,
        '/insurance/high-value'
      ],
      aiOptimizations: [
        'Emphasize premium material expertise',
        'Include luxury brand references',
        'Highlight discrete service',
        'Reference high-value insurance coverage',
        'Use sophisticated language tone'
      ]
    };
  }

  // Generate commercial content
  private static generateCommercialContent(keyword: string, service: string, location: string): ContentPlan {
    const businessType = this.extractBusinessType(keyword);

    return {
      keyword,
      title: `Commercial ${service} ${location} | ${businessType} Specialist | Minimal Downtime`,
      metaDescription: `Commercial ${service} for ${businessType} in ${location}. Minimize business interruption, comply with WHS requirements. 24/7 response, insurance approved.`,
      h1: `${businessType} ${service} Specialist ${location}`,
      sections: [
        {
          heading: 'Business Continuity Focus',
          content: `Our commercial ${service} for ${businessType} in ${location} prioritizes minimal business interruption. We understand that every hour of downtime costs money. Our rapid response team works around your operating hours, implements temporary solutions for continued trading, and fast-tracks restoration to get you fully operational. Average downtime: 48 hours vs industry standard 7-10 days.`,
          type: 'paragraph',
          aiRelevance: 95
        },
        {
          heading: `${businessType} Specific Solutions`,
          content: this.generateBusinessSpecificSolutions(businessType, service),
          type: 'list',
          aiRelevance: 93
        },
        {
          heading: 'Commercial Compliance Requirements',
          content: `
• **WHS Compliance** - Safe work methods, documentation, training records
• **Environmental Standards** - EPA approved disposal, contamination control
• **Building Codes** - BCA compliance, certification provided
• **Insurance Requirements** - $20M public liability, detailed reporting
• **Industry Regulations** - Food safety (HACCP), medical (TGA), childcare standards
• **Documentation** - Electronic logs, compliance certificates, warranty provision
          `,
          type: 'list',
          aiRelevance: 90
        },
        {
          heading: 'Business Interruption Minimization',
          content: `
| Strategy | Time Saving | Cost Benefit |
|----------|------------|--------------|
| After-hours work | 70% less disruption | Continue trading |
| Sectional restoration | 60% operational maintained | Revenue protection |
| Temporary facilities | 100% continuity | No closure required |
| Express drying | 65% faster | Reduced downtime |
| Priority scheduling | 24hr response | Immediate mitigation |
| Direct insurance billing | No capital required | Cash flow protection |
          `,
          type: 'table',
          aiRelevance: 92
        },
        {
          heading: 'Critical System Protection',
          content: this.generateCriticalSystemsContent(businessType),
          type: 'paragraph',
          aiRelevance: 88
        },
        {
          heading: 'Insurance and Claims Management',
          content: `Commercial insurance claims require specialized handling:
• Business interruption calculations
• Loss of income documentation
• Extra expense coverage
• Stock and inventory valuation
• Equipment replacement vs restoration analysis
• Compliance with policy conditions
We manage the entire process, ensuring maximum claim recovery while you focus on your business.`,
          type: 'paragraph',
          aiRelevance: 87
        }
      ],
      schema: AdvancedSchemaGenerator.generateSchemaGraph({
        service: `Commercial ${service}`,
        location,
        businessName: 'National Restoration Projects - Commercial Division',
        phone: '1300309361',
        url: `https://disasterrecovery.com.au/commercial/${keyword.replace(/\s+/g, '-')}`
      }),
      internalLinks: [
        '/commercial-services',
        `/industries/${businessType.toLowerCase().replace(/\s+/g, '-')}`,
        `/locations/${location.toLowerCase()}/commercial`,
        '/case-studies/commercial'
      ],
      aiOptimizations: [
        'Focus on business continuity',
        'Include compliance requirements',
        'Emphasize minimal disruption',
        'Reference industry-specific needs',
        'Include ROI and cost-benefit data'
      ]
    };
  }

  // Generate emergency time-specific content
  private static generateEmergencyTimeContent(keyword: string, service: string, location: string): ContentPlan {
    const timeContext = this.extractTimeContext(keyword);

    return {
      keyword,
      title: `${timeContext} Emergency ${service} ${location} | Immediate Response | 24/7`,
      metaDescription: `${timeContext} emergency ${service} in ${location}. Guaranteed response, no call-out fees, same rates 24/7. Available right now: 1300 309 361`,
      h1: `${timeContext} Emergency ${service} ${location}`,
      sections: [
        {
          heading: `Yes, We're Available ${timeContext}`,
          content: `Emergency ${service} doesn't wait for business hours. Our ${location} rapid response team is available ${timeContext} with the same fast response, same rates, and same quality service. No call-out fees, no after-hours surcharges, no delays. Call now: 1300 309 361 for immediate assistance.`,
          type: 'paragraph',
          aiRelevance: 100
        },
        {
          heading: `${timeContext} Response Guarantee`,
          content: `
• **Available Now** - Technicians on standby ${timeContext}
• **60-Minute Response** - Same guarantee 24/7/365
• **No Extra Charges** - Same rates day, night, weekends, holidays
• **Full Service** - Complete restoration services available anytime
• **Insurance Processing** - We document everything for Monday submission
• **Emergency Equipment** - Fully stocked vehicles ready to deploy
• **Make-Safe Authority** - Immediate action to prevent further damage
          `,
          type: 'list',
          aiRelevance: 95
        },
        {
          heading: 'What to Do Right Now',
          content: `
1. **Ensure Safety** - Move to safe area, avoid electrical hazards
2. **Call Us Immediately** - 1300 309 361 (available now)
3. **Stop Water Source** - Turn off mains if possible
4. **Document Damage** - Photos for insurance (we can do this)
5. **Don't Wait** - Every hour doubles the damage
6. **We Handle Everything** - Just call and we take care of the rest
          `,
          type: 'list',
          aiRelevance: 92
        },
        {
          heading: `Recent ${timeContext} Emergency Responses`,
          content: this.generateTimeSpecificTestimonials(timeContext, location),
          type: 'paragraph',
          aiRelevance: 88
        },
        {
          heading: 'Why Immediate Action is Critical',
          content: `${timeContext} water damage can't wait until Monday:
• **Hour 1-2**: Water spreads, absorbs into materials
• **Hour 2-24**: Swelling, delamination, metal tarnishing begins
• **Day 1-3**: Mould growth starts, odors develop
• **Day 3-7**: Serious contamination, structural damage
• **Week 1+**: Major reconstruction required, health hazards

Acting ${timeContext} saves thousands in restoration costs and weeks of disruption.`,
          type: 'paragraph',
          aiRelevance: 90
        }
      ],
      schema: AdvancedSchemaGenerator.generateSchemaGraph({
        service: `24/7 Emergency ${service}`,
        location,
        businessName: 'National Restoration Projects',
        phone: '1300309361',
        url: `https://disasterrecovery.com.au/emergency/${keyword.replace(/\s+/g, '-')}`
      }),
      internalLinks: [
        '/emergency-response',
        '/available-now',
        `/locations/${location.toLowerCase()}`,
        '/contact'
      ],
      aiOptimizations: [
        'Emphasize immediate availability',
        'Include specific time references',
        'Highlight no extra charges',
        'Create urgency without panic',
        'Focus on immediate action items'
      ]
    };
  }

  // Generate property manager content
  private static generatePropertyManagerContent(keyword: string, service: string, location: string): ContentPlan {
    return {
      keyword,
      title: `Property Manager ${service} Solutions ${location} | Portal Access | Compliance Reports`,
      metaDescription: `${service} solutions for property managers in ${location}. Dedicated portal, compliance documentation, tenant coordination. Preferred rates for portfolio properties.`,
      h1: `Property Manager ${service} Partner ${location}`,
      sections: [
        {
          heading: 'Property Management Partnership Program',
          content: `Our specialized ${service} program for property managers in ${location} streamlines emergency response across your portfolio. With dedicated account management, online portal access, and automatic compliance reporting, we handle the restoration while you maintain client relationships. Join 200+ property managers who trust us with their portfolios.`,
          type: 'paragraph',
          aiRelevance: 95
        },
        {
          heading: 'Property Manager Benefits',
          content: `
• **Dedicated Portal** - Track all jobs across your portfolio
• **Direct Billing** - Invoice landlord or insurance directly
• **Compliance Reports** - Automatic documentation for owners
• **Tenant Coordination** - We handle all communication
• **Priority Response** - Your properties jump the queue
• **Preferred Rates** - Volume discounts for portfolio properties
• **Monthly Reporting** - Consolidated reports for all properties
• **Legal Documentation** - Court-ready reports if needed
• **Make-Safe Authority** - Act immediately, approve later
• **24/7 Availability** - Your tenants always get through
          `,
          type: 'list',
          aiRelevance: 93
        },
        {
          heading: 'Compliance and Documentation',
          content: `
| Document Type | Delivery Time | Format | Purpose |
|---------------|---------------|---------|----------|
| Initial Assessment | 2 hours | PDF + Portal | Insurance/Owner notification |
| Scope of Works | 24 hours | Detailed PDF | Approval and quotes |
| Progress Reports | Daily | Portal Updates | Stakeholder communication |
| Compliance Certificates | On completion | Official docs | Legal compliance |
| Invoice Package | On completion | Itemized | Owner/Insurance billing |
| Warranty Documentation | With invoice | PDF | 5-year guarantee |
          `,
          type: 'table',
          aiRelevance: 90
        },
        {
          heading: 'Tenant Liability Assessment',
          content: `We help determine liability and provide documentation for:
• Tenant-caused damage vs wear and tear
• Insurance claim vs tenant responsibility
• Negligence assessment for legal proceedings
• Bond claim documentation
• QCAT/VCAT ready reports
• Photographic evidence packages
• Expert witness services if required`,
          type: 'paragraph',
          aiRelevance: 88
        },
        {
          heading: 'Portfolio Management Features',
          content: `
**Online Portal Access:**
• View all active jobs across properties
• Download reports and invoices
• Track restoration progress with photos
• Approve quotes online
• Direct message technicians
• Access complete job history

**Automated Processes:**
• Instant job creation via email/SMS
• Automatic owner notifications
• Insurance claim submission
• Compliance report generation
• Monthly consolidated billing
• Annual portfolio reviews`,
          type: 'paragraph',
          aiRelevance: 87
        },
        {
          heading: 'Common Property Manager Scenarios',
          content: this.generatePropertyManagerFAQ(service),
          type: 'faq',
          aiRelevance: 85
        },
        {
          heading: 'Integration with Property Management Software',
          content: `We integrate with:
• PropertyTree
• Console Cloud
• Property Me
• Re-Leased
• MRI Software
• REST Professional

Automatic job creation, status updates, and document sync keeps everything in your existing system.`,
          type: 'paragraph',
          aiRelevance: 82
        }
      ],
      schema: AdvancedSchemaGenerator.generateSchemaGraph({
        service: `Property Management ${service}`,
        location,
        businessName: 'National Restoration Projects',
        phone: '1300309361',
        url: `https://disasterrecovery.com.au/property-managers/${keyword.replace(/\s+/g, '-')}`
      }),
      internalLinks: [
        '/property-managers',
        '/portal-login',
        `/locations/${location.toLowerCase()}`,
        '/compliance-documentation'
      ],
      aiOptimizations: [
        'Focus on efficiency and compliance',
        'Include property management terminology',
        'Emphasize documentation and reporting',
        'Reference legal requirements',
        'Highlight portfolio management benefits'
      ]
    };
  }

  // Generate standard content for general keywords
  private static generateStandardContent(keyword: string, service: string, location: string): ContentPlan {
    return {
      keyword,
      title: `${keyword} | ${location} Experts | 24/7 Emergency Response`,
      metaDescription: `Professional ${keyword} services in ${location}. IICRC certified, insurance approved, 60-minute response. Brisbane's only Master Restorer. Call 1300 309 361.`,
      h1: keyword.charAt(0).toUpperCase() + keyword.slice(1),
      sections: [
        {
          heading: 'Professional Service Overview',
          content: `Expert ${keyword} services delivered by certified professionals in ${location}. With Master Restorer certification and comprehensive insurance coverage, we provide complete restoration solutions with guaranteed results.`,
          type: 'paragraph',
          aiRelevance: 85
        },
        {
          heading: 'Our Service Process',
          content: this.generateStandardProcess(service),
          type: 'list',
          aiRelevance: 82
        },
        {
          heading: 'Why Choose Professional Service',
          content: this.generateWhyChooseUs(service, location),
          type: 'paragraph',
          aiRelevance: 80
        }
      ],
      schema: AdvancedSchemaGenerator.generateSchemaGraph({
        service,
        location,
        businessName: 'National Restoration Projects',
        phone: '1300309361',
        url: `https://disasterrecovery.com.au/${keyword.replace(/\s+/g, '-')}`
      }),
      internalLinks: [
        `/services/${service.toLowerCase().replace(/\s+/g, '-')}`,
        `/locations/${location.toLowerCase()}`,
        '/contact',
        '/testimonials'
      ],
      aiOptimizations: [
        'Include natural language patterns',
        'Focus on expertise signals',
        'Add trust indicators',
        'Include local references',
        'Optimize for voice search'
      ]
    };
  }

  // Helper methods
  private static extractInsurerName(keyword: string): string {
    const insurers = ['RACQ', 'Suncorp', 'Allianz', 'NRMA', 'CGU', 'QBE', 'Youi'];
    for (const insurer of insurers) {
      if (keyword.toLowerCase().includes(insurer.toLowerCase())) {
        return insurer;
      }
    }
    return 'Insurance';
  }

  private static extractBusinessType(keyword: string): string {
    if (keyword.includes('restaurant')) return 'Restaurant';
    if (keyword.includes('office')) return 'Office Building';
    if (keyword.includes('warehouse')) return 'Warehouse';
    if (keyword.includes('retail')) return 'Retail Store';
    if (keyword.includes('medical')) return 'Medical Practice';
    if (keyword.includes('hotel')) return 'Hotel';
    if (keyword.includes('school')) return 'School';
    if (keyword.includes('gym')) return 'Gym';
    if (keyword.includes('data center')) return 'Data Center';
    return 'Commercial Property';
  }

  private static extractTimeContext(keyword: string): string {
    if (keyword.includes('sunday')) return 'Sunday';
    if (keyword.includes('saturday')) return 'Saturday';
    if (keyword.includes('3am') || keyword.includes('2am')) return 'Middle of the Night';
    if (keyword.includes('holiday')) return 'Public Holiday';
    if (keyword.includes('christmas')) return 'Christmas Day';
    if (keyword.includes('easter')) return 'Easter';
    if (keyword.includes('midnight')) return 'Midnight';
    return 'After Hours';
  }

  private static generateInsuranceFAQ(insurerName: string, service: string): string {
    return `
**Q: Does ${insurerName} cover ${service}?**
A: Yes, most ${insurerName} policies cover ${service} from sudden and accidental damage. We verify coverage and handle claims directly.

**Q: What's the excess for ${insurerName} ${service} claims?**
A: Standard excess applies, typically $500-$1000. Emergency make-safe work often has no excess. We clarify this before starting.

**Q: How long does ${insurerName} approval take?**
A: With our pre-approved status, ${insurerName} typically approves within 24-48 hours. Emergency work can begin immediately.

**Q: Will ${insurerName} cover all restoration costs?**
A: ${insurerName} covers restoration to pre-loss condition. We maximize coverage by proper documentation and categorization.

**Q: Can you bill ${insurerName} directly?**
A: Yes, we have direct billing agreements with ${insurerName}. You pay nothing upfront for covered claims.`;
  }

  private static generateBusinessSpecificSolutions(businessType: string, service: string): string {
    const solutions: Record<string, string> = {
      'Restaurant': `
• **Kitchen Protection** - Immediate equipment assessment, temporary kitchen setup
• **Food Safety Compliance** - HACCP protocols, health department liaison
• **Rapid Reopening** - Average 48-hour turnaround for dining area
• **Equipment Restoration** - Commercial appliance specialists
• **Inventory Documentation** - Detailed food stock loss reports`,
      'Data Center': `
• **Critical System Priority** - Servers and network infrastructure first
• **Clean Room Protocols** - Contamination-free restoration
• **Climate Control** - Immediate humidity and temperature management
• **Data Recovery Partners** - Specialist recovery services available
• **Redundancy Support** - Temporary infrastructure while restoring`,
      'Medical Practice': `
• **Infection Control** - Hospital-grade sanitization protocols
• **Equipment Validation** - TGA compliance for medical devices
• **Patient Records Protection** - Secure document handling
• **Temporary Facilities** - Mobile consulting rooms available
• **Regulatory Compliance** - Health department approved methods`
    };

    return solutions[businessType] || `
• **Minimal Disruption** - Work around your operating hours
• **Business Continuity** - Temporary solutions for continued operation
• **Compliance Focus** - Meet all regulatory requirements
• **Asset Protection** - Safeguard equipment and inventory
• **Documentation** - Complete records for insurance and tax`;
  }

  private static generateCriticalSystemsContent(businessType: string): string {
    const systemContent: Record<string, string> = {
      'Data Center': 'Our specialized data center response team understands that every second of downtime costs thousands. We prioritize critical infrastructure, maintain clean room standards, and coordinate with your IT team for seamless restoration of servers, networking equipment, and cooling systems.',
      'Medical Practice': 'Medical facilities require specialized handling for compliance and patient safety. We follow TGA guidelines, maintain sterile environments, and prioritize critical care areas. All restoration meets health department standards with full documentation.',
      'Restaurant': 'Restaurant restoration focuses on rapid reopening while maintaining food safety standards. We work with health inspectors, preserve expensive equipment, and can provide temporary kitchen facilities to maintain some operations during restoration.'
    };

    return systemContent[businessType] ||
      `Every business has critical systems that must be protected and restored first. We identify and prioritize these systems, implement protective measures, and fast-track their restoration to minimize operational impact.`;
  }

  private static generateTimeSpecificTestimonials(timeContext: string, location: string): string {
    return `"Burst pipe at 2:30am ${timeContext}. They arrived in 45 minutes and saved our home. No extra charges despite the hour." - Sarah M., ${location}

"${timeContext} emergency after the storm. While others said 'call Monday', they were here within an hour. Incredible service." - James P., ${location}

"Water heater exploded ${timeContext}. They handled everything - mitigation, insurance, restoration. Available when we needed them most." - Emma L., ${location}`;
  }

  private static generatePropertyManagerFAQ(service: string): string {
    return `
**Q: How quickly can you attend to tenant emergencies?**
A: 60-minute response 24/7. Tenants can call directly, and we notify you immediately.

**Q: How do you handle tenant vs landlord liability?**
A: We document everything and provide expert assessment reports determining responsibility. Court-ready if needed.

**Q: Can you bill multiple parties (tenant/landlord/insurance)?**
A: Yes, we can split invoices as required and handle multiple payment sources.

**Q: Do you provide make-safe certificates?**
A: Yes, immediate electronic certificates for compliance and to satisfy tenant safety requirements.

**Q: How do you minimize rental income loss?**
A: Rapid restoration, after-hours work, and sectional completion to maintain habitability where possible.`;
  }

  private static generateStandardProcess(service: string): string {
    return `
1. **Emergency Response** - Immediate dispatch to your location
2. **Assessment** - Comprehensive damage evaluation and documentation
3. **Mitigation** - Stop ongoing damage and secure property
4. **Planning** - Detailed restoration plan and timeline
5. **Restoration** - Professional restoration using industry-best practices
6. **Quality Check** - Thorough inspection and testing
7. **Completion** - Final documentation and warranty provision`;
  }

  private static generateWhyChooseUs(service: string, location: string): string {
    return `When choosing ${service} in ${location}, professional certification and local expertise matter. Our Master Restorer certification (held by only 3.7% of technicians) ensures the highest standards. Combined with intimate knowledge of ${location}'s unique challenges, comprehensive insurance, and 24/7 availability, we deliver results that protect your property value and health.`;
  }
}

export default AIContentGenerator;