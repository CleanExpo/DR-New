// Business Constants
export const BUSINESS_NAME = 'Disaster Recovery';
export const BUSINESS_SHORT_NAME = 'Disaster Recovery';
// No Email Address - online forms only
export const ONLINE_FORM_URL = '/get-help';
export const CONTRACTOR_PORTAL_URL = '/contractors';
export const EMAIL = 'contractors@disasterrecovery.com.au';

// Lead Distribution Radius Options
export const SERVICE_RADIUS_OPTIONS = [
  { value: 20, label: '20km - Local Priority' },
  { value: 25, label: '25km - Extended Local' },
  { value: 50, label: '50km - Regional' },
  { value: 100, label: '100km - Wide Area' }
];

// Contractor Requirements
export const CONTRACTOR_REQUIREMENTS = {
  certifications: ['IICRC Certified'],
  standards: 'Disaster Recovery Standards Compliant',
  membership: 'Current Disaster Recovery Network Member',
  insurance: 'Minimum $20M Public Liability',
  response: '24/7 Online Emergency Response Capability'
};
export const WEBSITE = 'https://disasterrecovery.com.au';
export const ABN = '85 151 794 142';
export const WEBSITE_DESIGNER = 'Zenith';
export const DESIGNER_URL = 'https://zenith.engineer';
export const PARENT_AGENCY = 'Unite-Group Agency';

// Social Media Configuration
export const SOCIAL_MEDIA = {
  facebook: {
    url: 'https://www.facebook.com/disasterrecoverybrisbane',
    handle: '@disasterrecoverybrisbane',
    name: 'Disaster Recovery Brisbane'
  },
  instagram: {
    url: 'https://www.instagram.com/disasterrecoverybrisbane',
    handle: '@disasterrecoverybrisbane',
    name: 'Disaster Recovery Brisbane'
  },
  linkedin: {
    url: 'https://www.linkedin.com/company/disaster-recovery-brisbane',
    handle: 'Disaster Recovery Brisbane',
    name: 'Disaster Recovery Brisbane'
  },
  youtube: {
    url: 'https://www.youtube.com/@disasterrecoverybrisbane',
    handle: '@disasterrecoverybrisbane',
    name: 'Disaster Recovery Brisbane'
  },
  tiktok: {
    url: 'https://www.tiktok.com/@disasterrecoverybrisbane',
    handle: '@disasterrecoverybrisbane',
    name: 'Disaster Recovery Brisbane'
  },
  google: {
    url: 'https://business.google.com/n/6247508497550516831',
    handle: 'Disaster Recovery Brisbane',
    name: 'Google Business Profile'
  }
};

// Social Media Content Templates
export const SOCIAL_CONTENT_TEMPLATES = {
  emergency_response: {
    facebook: "🚨 24/7 Emergency Response Available Now! Water damage? Fire damage? Mould issues? Our IICRC certified team responds within 60 minutes across Brisbane. Call now or visit our website for immediate help. #EmergencyResponse #DisasterRecovery #Brisbane",
    instagram: "Emergency response teams ready 24/7! 🚨 Swipe to see our latest restoration project in Hamilton. Professional equipment, certified technicians, insurance approved. #DisasterRecovery #Brisbane #Emergency #Restoration",
    linkedin: "Disaster Recovery Brisbane provides professional emergency restoration services with 60-minute response times. Our IICRC certified team handles water damage, fire damage, and mould remediation across Brisbane and surrounding areas.",
    youtube: "Watch our emergency response team in action! 24/7 professional disaster recovery services across Brisbane.",
    tiktok: "POV: Your house floods at 2AM 💧 But don't panic! Our emergency team responds 24/7 ⚡ #DisasterRecovery #Emergency #Brisbane"
  },
  before_after: {
    facebook: "Incredible transformation! See how our expert team restored this Brisbane home after severe water damage. From disaster to beautiful - that's what we do! Professional restoration with insurance direct billing available.",
    instagram: "Before ➡️ After magic ✨ Severe water damage restoration in New Farm. Professional equipment, certified techniques, amazing results! #BeforeAndAfter #WaterDamage #Brisbane #Restoration",
    linkedin: "Case Study: Complete water damage restoration in Brisbane's premium suburbs. Our systematic approach ensures comprehensive restoration while minimizing disruption to property owners.",
    youtube: "Dramatic before and after - see the complete restoration process from start to finish!",
    tiktok: "This water damaged home looked hopeless... but wait for the transformation! 🤯 #BeforeAndAfter #Restoration #Brisbane"
  },
  prevention_tips: {
    facebook: "💡 Prevention Tip Tuesday! Check your hot water system regularly for signs of corrosion or leaks. Early detection can save thousands in damage costs. Need professional advice? Contact our experts!",
    instagram: "Prevention is better than cure! 🏠 Simple checks you can do today to prevent water damage. Save this post for future reference! #PreventionTips #HomeOwner #Brisbane",
    linkedin: "Professional Advice: Regular building maintenance significantly reduces disaster recovery costs. Here are 5 key areas Brisbane property owners should monitor monthly.",
    youtube: "Top 5 ways to prevent water damage in your Brisbane home - expert advice from our Master Restorer!",
    tiktok: "5 seconds that could save you $50k! Check these spots in your home right now 👇 #Prevention #HomeTips #Brisbane"
  }
};

// Lead Pricing
export const LEAD_PRICE = 550;
export const LEAD_PRICE_PREMIUM = 750; // For capital cities
export const LEAD_PRICE_REGIONAL = 450; // For regional areas

// Coverage Areas - All Australian States and Territories
export const STATES = [
  { code: 'NSW', name: 'New South Wales', capital: 'Sydney' },
  { code: 'VIC', name: 'Victoria', capital: 'Melbourne' },
  { code: 'QLD', name: 'Queensland', capital: 'Brisbane' },
  { code: 'WA', name: 'Western Australia', capital: 'Perth' },
  { code: 'SA', name: 'South Australia', capital: 'Adelaide' },
  { code: 'TAS', name: 'Tasmania', capital: 'Hobart' },
  { code: 'ACT', name: 'Australian Capital Territory', capital: 'Canberra' },
  { code: 'NT', name: 'Northern Territory', capital: 'Darwin' }
];

// Major Cities by State
export const CITIES_BY_STATE = {
  NSW: [
    'Sydney', 'Newcastle', 'Central Coast', 'Wollongong', 'Maitland',
    'Wagga Wagga', 'Albury', 'Port Macquarie', 'Tamworth', 'Orange',
    'Dubbo', 'Bathurst', 'Coffs Harbour', 'Lismore', 'Broken Hill'
  ],
  VIC: [
    'Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton',
    'Mildura', 'Warrnambool', 'Traralgon', 'Wangaratta', 'Horsham',
    'Bairnsdale', 'Sale', 'Moe', 'Morwell', 'Portland'
  ],
  QLD: [
    'Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns',
    'Toowoomba', 'Rockhampton', 'Mackay', 'Bundaberg', 'Hervey Bay',
    'Gladstone', 'Maryborough', 'Mount Isa', 'Gympie', 'Caboolture'
  ],
  WA: [
    'Perth', 'Bunbury', 'Kalgoorlie', 'Mandurah', 'Geraldton',
    'Albany', 'Karratha', 'Broome', 'Busselton', 'Port Hedland',
    'Esperance', 'Carnarvon', 'Newman', 'Northam', 'Merredin'
  ],
  SA: [
    'Adelaide', 'Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Lincoln',
    'Port Pirie', 'Port Augusta', 'Victor Harbor', 'Gawler', 'Mount Barker',
    'Crafers-Bridgewater', 'Renmark', 'Millicent', 'Kadina', 'Tanunda'
  ],
  TAS: [
    'Hobart', 'Launceston', 'Devonport', 'Burnie', 'Ulverstone',
    'Kingston', 'Bridgewater', 'Glenorchy', 'Clarence', 'New Norfolk',
    'Wynyard', 'George Town', 'Sorell', 'Smithton', 'Queenstown'
  ],
  ACT: [
    'Canberra', 'Belconnen', 'Tuggeranong', 'Woden Valley', 'Gungahlin',
    'Weston Creek', 'Molonglo Valley', 'Jerrabomberra'
  ],
  NT: [
    'Darwin', 'Alice Springs', 'Palmerston', 'Katherine', 'Tennant Creek',
    'Nhulunbuy', 'Wadeye', 'Jabiru', 'Yulara', 'Alyangula'
  ]
};

// Disaster Types by Region
export const REGIONAL_DISASTERS = {
  tropical: {
    regions: ['Far North QLD', 'NT', 'North WA'],
    disasters: ['Cyclones', 'Flooding', 'Storm Surge', 'Monsoon Damage']
  },
  bushfire: {
    regions: ['NSW', 'VIC', 'SA', 'TAS', 'WA'],
    disasters: ['Bushfires', 'Smoke Damage', 'Ember Attack', 'Fire Storms']
  },
  flood: {
    regions: ['QLD', 'NSW', 'VIC'],
    disasters: ['River Flooding', 'Flash Flooding', 'Storm Water', 'Dam Release']
  },
  drought: {
    regions: ['Inland NSW', 'QLD', 'SA', 'WA'],
    disasters: ['Dust Storms', 'Water Damage from Broken Pipes', 'Foundation Issues']
  },
  coastal: {
    regions: ['All Coastal Areas'],
    disasters: ['Storm Surge', 'Coastal Erosion', 'King Tides', 'Tsunami Risk']
  }
};

// Industries for Specific Pages
export const INDUSTRIES = [
  'Mining & Resources',
  'Agriculture & Farming',
  'Tourism & Hospitality',
  'Healthcare & Medical',
  'Education & Schools',
  'Government & Public Services',
  'Retail & Shopping Centres',
  'Manufacturing & Warehousing',
  'Transport & Logistics',
  'Marine & Ports',
  'Aviation & Airports',
  'Energy & Utilities'
];

// Insurance Companies for Partnership Pages
export const INSURANCE_PARTNERS = [
  'NRMA Insurance',
  'AAMI',
  'Allianz',
  'QBE',
  'Suncorp',
  'CGU',
  'Budget Direct',
  'RACQ',
  'RACV',
  'RAA',
  'RAC',
  'RACT',
  'Youi',
  'Woolworths Insurance',
  'Coles Insurance'
];

// Seasonal Disaster Patterns
export const SEASONAL_DISASTERS = {
  summer: {
    months: ['December', 'January', 'February'],
    disasters: ['Bushfires', 'Heatwave Damage', 'Thunderstorms', 'Cyclones']
  },
  autumn: {
    months: ['March', 'April', 'May'],
    disasters: ['Storm Damage', 'Flooding', 'Late Cyclones']
  },
  winter: {
    months: ['June', 'July', 'August'],
    disasters: ['Flooding', 'Wind Damage', 'Snow Damage (Alpine)', 'Pipe Bursts']
  },
  spring: {
    months: ['September', 'October', 'November'],
    disasters: ['Storm Season', 'Hail Damage', 'Early Bushfires', 'Flash Flooding']
  }
};