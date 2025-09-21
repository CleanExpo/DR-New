// Local SEO Domination System for Brisbane, Ipswich, Logan Markets
// Implements hyper-local strategies for complete market dominance

interface LocalMarketData {
  suburb: string;
  postcode: string;
  population: number;
  medianPropertyValue: number;
  floodRisk: 'extreme' | 'high' | 'moderate' | 'low';
  demographics: {
    highNetWorth: boolean;
    commercialDensity: 'high' | 'medium' | 'low';
    propertyManagers: number;
    bodyCorporates: number;
  };
  competitors: string[];
  localKeywords: string[];
  landmarks: string[];
  recentDisasters: { type: string; date: string; impact: string }[];
}

interface LocalSEOStrategy {
  suburb: string;
  priority: number;
  targetKeywords: string[];
  contentStrategy: string[];
  linkBuilding: string[];
  citations: string[];
  partnerships: string[];
}

export class LocalDomination {
  // High-priority Brisbane suburbs data
  static readonly BRISBANE_SUBURBS: LocalMarketData[] = [
    {
      suburb: 'Hamilton',
      postcode: '4007',
      population: 7000,
      medianPropertyValue: 1650000,
      floodRisk: 'extreme',
      demographics: {
        highNetWorth: true,
        commercialDensity: 'medium',
        propertyManagers: 45,
        bodyCorporates: 23
      },
      competitors: ['Steamatic Brisbane North'],
      localKeywords: [
        'hamilton water damage',
        'portside wharf flooding',
        'racecourse road water restoration',
        'hamilton harbour water damage',
        'kingsford smith drive flooding'
      ],
      landmarks: ['Portside Wharf', 'Hamilton Harbour', 'Racecourse Road', 'Eagle Farm Racecourse'],
      recentDisasters: [
        { type: 'flood', date: '2022-02', impact: '2m water depth' },
        { type: 'flood', date: '2011-01', impact: '3m water depth' }
      ]
    },
    {
      suburb: 'New Farm',
      postcode: '4005',
      population: 13000,
      medianPropertyValue: 1450000,
      floodRisk: 'extreme',
      demographics: {
        highNetWorth: true,
        commercialDensity: 'high',
        propertyManagers: 67,
        bodyCorporates: 45
      },
      competitors: ['South QLD Restoration'],
      localKeywords: [
        'new farm flood restoration',
        'brunswick street water damage',
        'new farm park flooding',
        'powerhouse flooding',
        'merthyr road water damage'
      ],
      landmarks: ['Brisbane Powerhouse', 'New Farm Park', 'Brunswick Street', 'James Street'],
      recentDisasters: [
        { type: 'flood', date: '2022-02', impact: 'Complete inundation' },
        { type: 'flood', date: '2011-01', impact: '90% properties affected' }
      ]
    },
    {
      suburb: 'Toowong',
      postcode: '4066',
      population: 11500,
      medianPropertyValue: 1250000,
      floodRisk: 'high',
      demographics: {
        highNetWorth: true,
        commercialDensity: 'high',
        propertyManagers: 52,
        bodyCorporates: 38
      },
      competitors: ['NLR Restoration'],
      localKeywords: [
        'toowong water damage',
        'toowong village flooding',
        'regatta water restoration',
        'university flooding',
        'high street water damage'
      ],
      landmarks: ['Toowong Village', 'Regatta Hotel', 'University of Queensland', 'Toowong Cemetery'],
      recentDisasters: [
        { type: 'flood', date: '2022-02', impact: 'Major commercial damage' },
        { type: 'storm', date: '2023-11', impact: 'Severe wind damage' }
      ]
    },
    {
      suburb: 'West End',
      postcode: '4101',
      population: 9500,
      medianPropertyValue: 950000,
      floodRisk: 'extreme',
      demographics: {
        highNetWorth: false,
        commercialDensity: 'high',
        propertyManagers: 78,
        bodyCorporates: 56
      },
      competitors: ['Steamatic South Brisbane'],
      localKeywords: [
        'west end flood damage',
        'boundary street water restoration',
        'orleigh park flooding',
        'montague road water damage',
        'riverside drive flooding'
      ],
      landmarks: ['West End Markets', 'Boundary Street', 'Orleigh Park', 'QPAC'],
      recentDisasters: [
        { type: 'flood', date: '2022-02', impact: '80% businesses affected' },
        { type: 'flood', date: '2011-01', impact: 'Complete evacuation' }
      ]
    },
    {
      suburb: 'Ascot',
      postcode: '4007',
      population: 6000,
      medianPropertyValue: 1850000,
      floodRisk: 'moderate',
      demographics: {
        highNetWorth: true,
        commercialDensity: 'low',
        propertyManagers: 28,
        bodyCorporates: 12
      },
      competitors: [],
      localKeywords: [
        'ascot water damage restoration',
        'ascot luxury home flooding',
        'lancaster road water damage',
        'ascot heritage home restoration',
        'racecourse precinct flooding'
      ],
      landmarks: ['Eagle Farm Racecourse', 'Ascot State School', 'Oriel Park'],
      recentDisasters: [
        { type: 'storm', date: '2023-12', impact: 'Tree damage to properties' },
        { type: 'flood', date: '2022-02', impact: 'Lower lying areas affected' }
      ]
    },
    {
      suburb: 'Bulimba',
      postcode: '4171',
      population: 7200,
      medianPropertyValue: 1350000,
      floodRisk: 'high',
      demographics: {
        highNetWorth: true,
        commercialDensity: 'medium',
        propertyManagers: 41,
        bodyCorporates: 29
      },
      competitors: ['South QLD Restoration'],
      localKeywords: [
        'bulimba water damage',
        'oxford street flooding',
        'bulimba riverside restoration',
        'apollo road water damage',
        'bulimba ferry terminal flooding'
      ],
      landmarks: ['Oxford Street', 'Bulimba Memorial Park', 'Bulimba Ferry Terminal'],
      recentDisasters: [
        { type: 'flood', date: '2022-02', impact: 'Riverside properties flooded' },
        { type: 'storm', date: '2024-01', impact: 'Hail damage widespread' }
      ]
    }
  ];

  // Ipswich target suburbs
  static readonly IPSWICH_SUBURBS: LocalMarketData[] = [
    {
      suburb: 'Springfield Lakes',
      postcode: '4300',
      population: 18500,
      medianPropertyValue: 620000,
      floodRisk: 'low',
      demographics: {
        highNetWorth: false,
        commercialDensity: 'medium',
        propertyManagers: 35,
        bodyCorporates: 42
      },
      competitors: [],
      localKeywords: [
        'springfield lakes water damage',
        'springfield central flooding',
        'orion shopping centre water damage',
        'springfield lakes estate flooding',
        'spring lake water restoration'
      ],
      landmarks: ['Orion Shopping Centre', 'Springfield Central Station', 'Robelle Domain'],
      recentDisasters: [
        { type: 'storm', date: '2024-01', impact: 'Flash flooding in estates' }
      ]
    },
    {
      suburb: 'Ipswich CBD',
      postcode: '4305',
      population: 5200,
      medianPropertyValue: 450000,
      floodRisk: 'extreme',
      demographics: {
        highNetWorth: false,
        commercialDensity: 'high',
        propertyManagers: 28,
        bodyCorporates: 15
      },
      competitors: ['Ipswich Restoration Services'],
      localKeywords: [
        'ipswich cbd flood restoration',
        'bremer river flooding ipswich',
        'nicholas street water damage',
        'ipswich mall flooding',
        'top of town water damage'
      ],
      landmarks: ['Ipswich Mall', 'Bremer River', 'Queens Park', 'Ipswich Art Gallery'],
      recentDisasters: [
        { type: 'flood', date: '2022-02', impact: 'CBD underwater' },
        { type: 'flood', date: '2011-01', impact: 'Complete inundation' }
      ]
    }
  ];

  // Logan target suburbs
  static readonly LOGAN_SUBURBS: LocalMarketData[] = [
    {
      suburb: 'Springwood',
      postcode: '4127',
      population: 9800,
      medianPropertyValue: 580000,
      floodRisk: 'low',
      demographics: {
        highNetWorth: false,
        commercialDensity: 'high',
        propertyManagers: 45,
        bodyCorporates: 31
      },
      competitors: [],
      localKeywords: [
        'springwood water damage',
        'springwood mall flooding',
        'rochedale road water restoration',
        'dennis road commercial water damage',
        'springwood busway flooding'
      ],
      landmarks: ['Springwood Mall', 'Springwood Busway', 'Arndale Shopping Centre'],
      recentDisasters: [
        { type: 'storm', date: '2023-11', impact: 'Flash flooding main roads' }
      ]
    },
    {
      suburb: 'Shailer Park',
      postcode: '4128',
      population: 11500,
      medianPropertyValue: 650000,
      floodRisk: 'moderate',
      demographics: {
        highNetWorth: false,
        commercialDensity: 'low',
        propertyManagers: 32,
        bodyCorporates: 24
      },
      competitors: [],
      localKeywords: [
        'shailer park water damage',
        'hyperdome flooding',
        'bryants road water restoration',
        'shailer park estate flooding',
        'kimberley park water damage'
      ],
      landmarks: ['Hyperdome Shopping Centre', 'Shailer Park State School'],
      recentDisasters: [
        { type: 'storm', date: '2024-02', impact: 'Severe wind and water damage' }
      ]
    }
  ];

  // Generate hyper-local SEO strategy for a suburb
  static generateSuburbStrategy(suburb: LocalMarketData): LocalSEOStrategy {
    const strategy: LocalSEOStrategy = {
      suburb: suburb.suburb,
      priority: this.calculatePriority(suburb),
      targetKeywords: this.generateTargetKeywords(suburb),
      contentStrategy: this.generateContentStrategy(suburb),
      linkBuilding: this.generateLinkBuildingTargets(suburb),
      citations: this.generateCitationTargets(suburb),
      partnerships: this.generatePartnershipOpportunities(suburb)
    };

    return strategy;
  }

  // Calculate suburb priority based on opportunity
  private static calculatePriority(suburb: LocalMarketData): number {
    let score = 0;

    // High property values = higher priority
    if (suburb.medianPropertyValue > 1000000) score += 30;
    else if (suburb.medianPropertyValue > 700000) score += 20;
    else score += 10;

    // Flood risk = opportunity
    if (suburb.floodRisk === 'extreme') score += 30;
    else if (suburb.floodRisk === 'high') score += 20;
    else if (suburb.floodRisk === 'moderate') score += 10;

    // Commercial density = B2B opportunity
    if (suburb.demographics.commercialDensity === 'high') score += 20;
    else if (suburb.demographics.commercialDensity === 'medium') score += 10;

    // Property managers = recurring business
    score += Math.min(20, suburb.demographics.propertyManagers / 3);

    // Low competition = easier wins
    score += Math.max(0, 20 - (suburb.competitors.length * 5));

    return Math.min(100, score);
  }

  // Generate comprehensive keyword targets
  private static generateTargetKeywords(suburb: LocalMarketData): string[] {
    const keywords: string[] = [];

    // Primary geo-modified keywords
    keywords.push(
      `${suburb.suburb.toLowerCase()} water damage restoration`,
      `${suburb.suburb.toLowerCase()} flood restoration`,
      `${suburb.suburb.toLowerCase()} emergency water extraction`,
      `${suburb.suburb.toLowerCase()} mould remediation`,
      `${suburb.suburb.toLowerCase()} fire damage restoration`
    );

    // Postcode variations
    keywords.push(
      `water damage ${suburb.postcode}`,
      `flood restoration ${suburb.postcode}`,
      `emergency plumber ${suburb.postcode}`
    );

    // Landmark-specific keywords
    suburb.landmarks.forEach(landmark => {
      keywords.push(
        `${landmark.toLowerCase()} water damage`,
        `${landmark.toLowerCase()} flooding`
      );
    });

    // High-value property keywords if applicable
    if (suburb.demographics.highNetWorth) {
      keywords.push(
        `${suburb.suburb.toLowerCase()} luxury home water damage`,
        `${suburb.suburb.toLowerCase()} prestige property restoration`,
        `${suburb.suburb.toLowerCase()} executive flood recovery`
      );
    }

    // Commercial keywords if applicable
    if (suburb.demographics.commercialDensity !== 'low') {
      keywords.push(
        `${suburb.suburb.toLowerCase()} commercial water damage`,
        `${suburb.suburb.toLowerCase()} office flooding`,
        `${suburb.suburb.toLowerCase()} business water restoration`
      );
    }

    // Property manager keywords
    if (suburb.demographics.propertyManagers > 30) {
      keywords.push(
        `${suburb.suburb.toLowerCase()} property manager water damage`,
        `${suburb.suburb.toLowerCase()} rental property flooding`,
        `${suburb.suburb.toLowerCase()} investment property restoration`
      );
    }

    // Disaster-specific keywords
    suburb.recentDisasters.forEach(disaster => {
      keywords.push(
        `${suburb.suburb.toLowerCase()} ${disaster.type} damage`,
        `${suburb.suburb.toLowerCase()} ${disaster.type} restoration`
      );
    });

    // Emergency time-based keywords
    keywords.push(
      `24 hour ${suburb.suburb.toLowerCase()} water damage`,
      `emergency ${suburb.suburb.toLowerCase()} flooding`,
      `sunday ${suburb.suburb.toLowerCase()} water extraction`
    );

    // Insurance-specific keywords
    keywords.push(
      `${suburb.suburb.toLowerCase()} insurance water damage`,
      `racq ${suburb.suburb.toLowerCase()} flood restoration`,
      `suncorp approved ${suburb.suburb.toLowerCase()} water damage`
    );

    return keywords;
  }

  // Generate content strategy for suburb
  private static generateContentStrategy(suburb: LocalMarketData): string[] {
    const strategies: string[] = [];

    // Main suburb landing page
    strategies.push(`Create comprehensive ${suburb.suburb} disaster recovery hub page`);

    // Service-specific pages
    strategies.push(
      `${suburb.suburb} water damage restoration page`,
      `${suburb.suburb} flood recovery guide`,
      `${suburb.suburb} mould remediation service page`
    );

    // Historical disaster content
    suburb.recentDisasters.forEach(disaster => {
      strategies.push(
        `Case study: ${suburb.suburb} ${disaster.type} ${disaster.date} recovery`,
        `Lessons learned from ${suburb.suburb} ${disaster.type}`
      );
    });

    // Landmark-specific content
    suburb.landmarks.forEach(landmark => {
      strategies.push(`${landmark} area flood risk and protection guide`);
    });

    // Risk assessment content
    strategies.push(
      `${suburb.suburb} flood risk map and preparation guide`,
      `${suburb.suburb} property flood risk assessment tool`
    );

    // Local testimonials page
    strategies.push(`${suburb.suburb} customer testimonials and case studies`);

    // Property type specific
    if (suburb.demographics.highNetWorth) {
      strategies.push(
        `${suburb.suburb} luxury property restoration guide`,
        `Heritage home restoration in ${suburb.suburb}`
      );
    }

    // Commercial content if applicable
    if (suburb.demographics.commercialDensity !== 'low') {
      strategies.push(
        `${suburb.suburb} commercial property restoration`,
        `Business continuity planning for ${suburb.suburb} floods`
      );
    }

    // Property manager resources
    if (suburb.demographics.propertyManagers > 30) {
      strategies.push(
        `${suburb.suburb} property manager emergency guide`,
        `Tenant rights and restoration in ${suburb.suburb}`
      );
    }

    // Seasonal content
    strategies.push(
      `${suburb.suburb} storm season preparation checklist`,
      `La Nina impact on ${suburb.suburb} flood risk`
    );

    // Comparison content
    strategies.push(
      `${suburb.suburb} restoration companies comparison`,
      `Why choose Master Restorer for ${suburb.suburb}`
    );

    return strategies;
  }

  // Generate link building targets
  private static generateLinkBuildingTargets(suburb: LocalMarketData): string[] {
    const targets: string[] = [];

    // Local business directories
    targets.push(
      `${suburb.suburb} Chamber of Commerce listing`,
      `${suburb.suburb} Business Directory`,
      'Brisbane Business Directory listing'
    );

    // Local community sites
    targets.push(
      `${suburb.suburb} Community Facebook Group presence`,
      `${suburb.suburb} Residents Association partnership`,
      `${suburb.suburb} School P&C sponsorship`
    );

    // Property management companies
    if (suburb.demographics.propertyManagers > 30) {
      targets.push(
        'Ray White preferred contractor listing',
        'Harcourts approved vendor status',
        'LJ Hooker partnership program'
      );
    }

    // Body corporate managers
    if (suburb.demographics.bodyCorporates > 20) {
      targets.push(
        'Body Corporate Community Services listing',
        'Strata Community Association membership',
        'Building manager referral network'
      );
    }

    // Insurance company listings
    targets.push(
      'RACQ preferred repairer network',
      'Suncorp approved contractor listing',
      'Insurance broker referral programs'
    );

    // Local news and media
    targets.push(
      `${suburb.suburb} local newspaper coverage`,
      'Quest Newspapers disaster preparedness article',
      'Brisbane Times flood preparation feature'
    );

    // Government and official sites
    targets.push(
      'Brisbane City Council emergency services listing',
      'Get Ready Queensland resource listing',
      'Queensland Reconstruction Authority case study'
    );

    // Industry associations
    targets.push(
      'Master Builders Association Queensland member listing',
      'Housing Industry Association directory',
      'Restoration Industry Association profile'
    );

    return targets;
  }

  // Generate citation targets
  private static generateCitationTargets(suburb: LocalMarketData): string[] {
    return [
      // Primary citations
      'Google Business Profile - ' + suburb.suburb,
      'Bing Places for Business',
      'Apple Maps Connect',
      'Facebook Business Page - ' + suburb.suburb,

      // Australian directories
      'True Local - ' + suburb.suburb,
      'Yellow Pages - ' + suburb.postcode,
      'White Pages',
      'Hotfrog Australia',
      'StartLocal - ' + suburb.suburb,
      'Yelp Australia',
      'Word of Mouth Online',

      // Industry specific
      'hipages.com.au',
      'ServiceSeeking.com.au',
      'Oneflare',

      // Local citations
      suburb.suburb + ' Business Directory',
      'Brisbane Business Listings',
      'Queensland Business Directory',

      // Niche directories
      'Emergency Services Directory QLD',
      'Insurance Approved Contractors QLD',
      'Master Restorers Directory'
    ];
  }

  // Generate partnership opportunities
  private static generatePartnershipOpportunities(suburb: LocalMarketData): string[] {
    const partnerships: string[] = [];

    // Property managers
    if (suburb.demographics.propertyManagers > 30) {
      partnerships.push(
        'Property management company partnerships',
        'Real estate agency emergency contractor agreements',
        'Property investor group presentations'
      );
    }

    // Body corporates
    if (suburb.demographics.bodyCorporates > 20) {
      partnerships.push(
        'Body corporate manager relationships',
        'Strata management preferred contractor status',
        'Building management emergency response agreements'
      );
    }

    // Insurance brokers
    partnerships.push(
      'Insurance broker referral partnerships',
      'Claims management company relationships',
      'Loss assessor preferred contractor'
    );

    // Complementary businesses
    partnerships.push(
      'Plumber emergency overflow referrals',
      'Electrician water damage partnerships',
      'Builder restoration project collaboration',
      'Carpet cleaner mould referral program'
    );

    // Community organizations
    partnerships.push(
      suburb.suburb + ' Flood Action Group support',
      'Local SES unit partnership',
      'Community preparedness workshops',
      'School flood education programs'
    );

    // Commercial if applicable
    if (suburb.demographics.commercialDensity !== 'low') {
      partnerships.push(
        'Shopping centre management agreements',
        'Commercial property manager network',
        'Facilities management partnerships',
        'Business continuity consultant referrals'
      );
    }

    return partnerships;
  }

  // Generate local content calendar
  static generateContentCalendar(suburb: LocalMarketData): {
    month: string;
    content: string[];
    focus: string;
  }[] {
    return [
      {
        month: 'January',
        content: [
          `${suburb.suburb} Summer Storm Damage Prevention Guide`,
          'Post-Holiday Plumbing Failure Risks',
          `New Year Water Damage Statistics ${suburb.suburb}`
        ],
        focus: 'Storm season preparation'
      },
      {
        month: 'February',
        content: [
          `${suburb.suburb} Flood Anniversary - Lessons Learned`,
          'Cyclone Season Preparation Checklist',
          `${suburb.suburb} Flood Risk Map Update`
        ],
        focus: 'Flood awareness'
      },
      {
        month: 'March',
        content: [
          `Autumn Mould Prevention ${suburb.suburb}`,
          'End of Summer Storm Damage Assessment',
          `${suburb.suburb} Property Manager Workshop`
        ],
        focus: 'Mould prevention'
      },
      {
        month: 'April',
        content: [
          `Easter Holiday Emergency Services ${suburb.suburb}`,
          'Autumn Gutter Cleaning Importance',
          `${suburb.suburb} Insurance Claim Tips`
        ],
        focus: 'Maintenance prevention'
      },
      {
        month: 'May',
        content: [
          `Winter Preparation for ${suburb.suburb} Properties`,
          'Cold Weather Pipe Protection',
          `${suburb.suburb} Commercial Property Winterization`
        ],
        focus: 'Winter preparation'
      },
      {
        month: 'June',
        content: [
          `EOFY Insurance Review for ${suburb.suburb} Property Owners`,
          'Winter Flooding Risks Brisbane',
          `${suburb.suburb} Mid-Year Disaster Statistics`
        ],
        focus: 'Insurance and compliance'
      },
      {
        month: 'July',
        content: [
          `Winter Water Damage Risks ${suburb.suburb}`,
          'Heating System Water Damage Prevention',
          `${suburb.suburb} School Holiday Emergency Services`
        ],
        focus: 'Winter emergencies'
      },
      {
        month: 'August',
        content: [
          `Spring Preparation Guide ${suburb.suburb}`,
          'Pre-Storm Season Property Inspection',
          `${suburb.suburb} Business Continuity Planning`
        ],
        focus: 'Spring preparation'
      },
      {
        month: 'September',
        content: [
          `Storm Season Approaching - ${suburb.suburb} Ready?`,
          'Spring Cleaning and Mould Prevention',
          `${suburb.suburb} Emergency Contact Update`
        ],
        focus: 'Storm season prep'
      },
      {
        month: 'October',
        content: [
          `La Nina/El Nino Impact on ${suburb.suburb}`,
          'Storm Season Insurance Check',
          `${suburb.suburb} Flood Evacuation Routes`
        ],
        focus: 'Weather pattern impacts'
      },
      {
        month: 'November',
        content: [
          `Storm Season Active - ${suburb.suburb} Emergency Guide`,
          'Recent Storm Damage Case Studies',
          `${suburb.suburb} Real-Time Weather Alerts`
        ],
        focus: 'Active storm response'
      },
      {
        month: 'December',
        content: [
          `Holiday Season Emergency Services ${suburb.suburb}`,
          'Christmas Flooding Risks',
          `${suburb.suburb} Year in Review - Disasters and Recovery`
        ],
        focus: 'Holiday emergencies'
      }
    ];
  }

  // Generate competitive analysis for suburb
  static analyzeSuburbCompetition(suburb: LocalMarketData): {
    competitor: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
  }[] {
    const analysis = [];

    suburb.competitors.forEach(competitor => {
      analysis.push({
        competitor,
        strengths: [
          'Established presence',
          'Some local recognition',
          'Basic service offering'
        ],
        weaknesses: [
          'No hyper-local content',
          'Generic service pages',
          'No Master Restorer certification',
          'Limited emergency response data',
          'Poor mobile experience',
          'No AI optimization'
        ],
        opportunities: [
          `Create ${suburb.suburb}-specific landing pages`,
          'Publish local disaster case studies',
          'Build local partnership network',
          'Dominate long-tail local keywords',
          'Create local emergency response guarantee',
          'Develop suburb-specific testimonials'
        ]
      });
    });

    return analysis;
  }

  // Generate NAP consistency checklist
  static generateNAPChecklist(suburb: LocalMarketData): {
    platform: string;
    required: boolean;
    napFormat: {
      name: string;
      address: string;
      phone: string;
    };
  }[] {
    const businessName = 'Disaster Recovery Services';
    const phone = '1300 309 361';
    const address = `Servicing ${suburb.suburb}, QLD ${suburb.postcode}`;

    return [
      {
        platform: 'Google Business Profile',
        required: true,
        napFormat: { name: `${businessName} ${suburb.suburb}`, address, phone }
      },
      {
        platform: 'Facebook',
        required: true,
        napFormat: { name: `${businessName} - ${suburb.suburb}`, address, phone }
      },
      {
        platform: 'True Local',
        required: true,
        napFormat: { name: businessName, address, phone }
      },
      {
        platform: 'Yellow Pages',
        required: true,
        napFormat: { name: businessName, address, phone }
      },
      {
        platform: 'Bing Places',
        required: true,
        napFormat: { name: `${businessName} ${suburb.suburb}`, address, phone }
      },
      {
        platform: 'Apple Maps',
        required: true,
        napFormat: { name: businessName, address, phone }
      },
      {
        platform: 'Yelp',
        required: false,
        napFormat: { name: businessName, address, phone }
      },
      {
        platform: 'hipages',
        required: true,
        napFormat: { name: businessName, address, phone }
      }
    ];
  }
}

export default LocalDomination;