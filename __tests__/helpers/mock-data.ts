/**
 * Mock data for testing Disaster Recovery website
 * Brisbane, Ipswich, Logan local service focus
 */

export const mockServiceAreas = {
  brisbane: {
    city: 'Brisbane',
    state: 'Queensland',
    stateCode: 'QLD',
    postcode: '4000',
    suburbs: [
      'Hamilton',
      'Ascot',
      'New Farm',
      'Toowong',
      'Fortitude Valley',
      'CBD',
      'Milton',
      'Paddington',
      'Red Hill',
      'Spring Hill',
    ],
  },
  ipswich: {
    city: 'Ipswich',
    state: 'Queensland',
    stateCode: 'QLD',
    postcode: '4305',
    suburbs: [
      'Karalee',
      'Brookwater',
      'Springfield Lakes',
      'Ipswich CBD',
      'Yamanto',
      'Leichhardt',
    ],
  },
  logan: {
    city: 'Logan',
    state: 'Queensland',
    stateCode: 'QLD',
    postcode: '4114',
    suburbs: [
      'Logan Central',
      'Springwood',
      'Underwood',
      'Slacks Creek',
      'Browns Plains',
    ],
  },
};

export const mockEmergencyServices = [
  {
    name: 'Water Damage Restoration',
    slug: 'water-damage-restoration-brisbane',
    category: 'emergency',
    description: '24/7 emergency water damage restoration services',
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    emergencyAvailable: true,
  },
  {
    name: 'Fire Damage Restoration',
    slug: 'fire-damage-restoration-brisbane',
    category: 'emergency',
    description: 'Expert fire damage restoration and recovery',
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    emergencyAvailable: true,
  },
  {
    name: 'Storm Damage Repair',
    slug: 'storm-damage-queensland',
    category: 'emergency',
    description: 'Rapid response to storm damage',
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    emergencyAvailable: true,
  },
  {
    name: 'Mould Remediation',
    slug: 'mould-remediation-brisbane',
    category: 'remediation',
    description: 'Professional mould removal and remediation',
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    emergencyAvailable: false,
  },
];

export const mockMasterRestorer = {
  name: 'Phil McGurk',
  title: 'Master Restorer',
  qualifications: [
    'IICRC Master Restorer',
    'Water Damage Restoration Technician',
    'Fire & Smoke Restoration Technician',
    'Mould Remediation Specialist',
  ],
  experience: '20+ years',
  serviceArea: 'Brisbane, Ipswich & Logan',
};

export const mockTestimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Hamilton, Brisbane',
    service: 'Water Damage Restoration',
    rating: 5,
    comment: 'Excellent emergency response. Phil and his team were professional and efficient.',
    verified: true,
  },
  {
    name: 'Michael Chen',
    location: 'Brookwater, Ipswich',
    service: 'Fire Damage Restoration',
    rating: 5,
    comment: 'Outstanding service from a Master Restorer. Highly recommend.',
    verified: true,
  },
];

export const mockInsuranceProviders = [
  'NRMA Insurance',
  'RACQ Insurance',
  'Suncorp',
  'Allianz',
  'QBE',
  'Budget Direct',
  'Youi',
  'AAMI',
];

export const mockClaimTypes = [
  'Water Damage',
  'Fire Damage',
  'Storm Damage',
  'Flood Damage',
  'Mould Remediation',
  'Smoke Damage',
  'Impact Damage',
];

export const mockBusinessHours = {
  emergency: '24/7',
  office: {
    weekdays: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 1:00 PM',
    sunday: 'Emergency Only',
  },
};

export const mockContactInfo = {
  phone: '1300 123 456',
  email: 'info@disasterrecovery.com.au',
  emergencyPhone: '1300 123 456',
  address: 'Brisbane, Queensland',
};

export const mockSchemaData = {
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Disaster Recovery Australia',
    description: 'Professional disaster recovery and restoration services',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU',
    },
    telephone: '+61-1300-123-456',
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'City', name: 'Ipswich' },
      { '@type': 'City', name: 'Logan' },
    ],
  },
};

export const mockFormData = {
  validClaim: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '0412345678',
    address: '123 Main Street, Hamilton, QLD 4007',
    serviceType: 'water-damage',
    description: 'Burst pipe in kitchen causing water damage',
    insuranceProvider: 'NRMA Insurance',
    policyNumber: 'POL123456789',
    urgency: 'emergency',
  },
  invalidClaim: {
    name: '',
    email: 'invalid-email',
    phone: '123',
    address: '',
    serviceType: '',
    description: '',
  },
};

export const mockAPIResponses = {
  searchSuccess: {
    status: 200,
    data: {
      results: [
        {
          title: 'Water Damage Restoration Brisbane',
          url: '/services/water-damage-restoration-brisbane',
          excerpt: 'Professional water damage restoration...',
        },
      ],
    },
  },
  claimSuccess: {
    status: 201,
    data: {
      success: true,
      claimId: 'CLM-2024-001',
      message: 'Claim submitted successfully',
    },
  },
  claimError: {
    status: 400,
    data: {
      success: false,
      error: 'Validation failed',
      fields: ['email', 'phone'],
    },
  },
};

export const mockPerformanceMetrics = {
  homepage: {
    lcp: 1800, // Largest Contentful Paint (ms)
    fid: 50, // First Input Delay (ms)
    cls: 0.05, // Cumulative Layout Shift
    ttfb: 200, // Time to First Byte (ms)
  },
  servicePage: {
    lcp: 2000,
    fid: 60,
    cls: 0.08,
    ttfb: 250,
  },
};

export const mockSEOData = {
  homepage: {
    title: 'Emergency Disaster Recovery Brisbane | Master Restorer | 24/7',
    description:
      'Master Restorer Phil McGurk provides 24/7 emergency disaster recovery in Brisbane, Ipswich & Logan. Water damage, fire restoration, mould remediation.',
    keywords: [
      'disaster recovery Brisbane',
      'Master Restorer Queensland',
      'emergency restoration Ipswich',
      'water damage Brisbane',
      'fire restoration Logan',
    ],
  },
};

export const mockAccessibilityData = {
  wcagLevel: 'AA',
  contrastRatio: 4.5,
  keyboardNavigable: true,
  screenReaderCompatible: true,
  ariaLabels: true,
};
