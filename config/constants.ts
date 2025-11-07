// Application-wide constants

export const APP_NAME = 'Disaster Recovery Australia';
export const APP_DESCRIPTION = 'Brisbane, Ipswich & Logan Emergency Restoration Services';

export const CONTACT = {
  phone: '1300 309 361',
  phoneLink: 'tel:1300309361',
  email: 'admin@disasterrecovery.com.au',
  address: '4/17 Tile St, Wacol, QLD 4076',
} as const;

export const BUSINESS_INFO = {
  name: 'Disaster Recovery',
  legalName: 'Disaster Recovery Australia Pty Ltd',
  abn: 'XXX XXX XXX XXX', // Replace with actual ABN
  location: {
    address: '4/17 Tile St',
    suburb: 'Wacol',
    state: 'QLD',
    postcode: '4076',
    country: 'Australia',
  },
  coordinates: {
    lat: -27.5969,
    lng: 152.9281,
  },
} as const;

export const SERVICE_AREAS = {
  brisbane: {
    name: 'Brisbane',
    suburbs: ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'CBD'],
  },
  ipswich: {
    name: 'Ipswich',
    suburbs: ['Karalee', 'Brookwater', 'Springfield Lakes'],
  },
  logan: {
    name: 'Logan',
    suburbs: ['Logan Central', 'Springwood', 'Shailer Park'],
  },
} as const;

export const SERVICES = {
  waterDamage: {
    name: 'Water Damage Restoration',
    slug: 'water-damage-restoration',
    icon: 'water',
  },
  fireDamage: {
    name: 'Fire Damage Restoration',
    slug: 'fire-damage-restoration',
    icon: 'fire',
  },
  mouldRemediation: {
    name: 'Mould Remediation',
    slug: 'mould-remediation',
    icon: 'shield',
  },
  stormDamage: {
    name: 'Storm Damage Repair',
    slug: 'storm-damage-repair',
    icon: 'cloud',
  },
} as const;

export const SOCIAL_MEDIA = {
  facebook: 'https://www.facebook.com/DisasterRecoveryAU',
  instagram: 'https://www.instagram.com/disasterrecoveryau',
  linkedin: 'https://www.linkedin.com/company/disaster-recovery-au',
  youtube: 'https://www.youtube.com/@DisasterRecoveryAU',
} as const;

export const CERTIFICATIONS = {
  iicrc: {
    name: 'IICRC Master Restorer',
    description: 'Institute of Inspection Cleaning and Restoration Certification',
  },
} as const;

export const RESPONSE_TIME = {
  emergency: '60 minutes',
  standard: '24 hours',
} as const;

export const ROUTES = {
  home: '/',
  services: '/services',
  serviceAreas: '/service-areas',
  about: '/about-phil-mcgurk',
  contact: '/contact',
  emergency: '/emergency',
  insurance: '/insurance-claims',
  commercial: '/commercial',
  residential: '/residential',
} as const;

export const API_ROUTES = {
  contact: '/api/contact',
  booking: '/api/booking',
  emergency: '/api/emergency',
} as const;

export const METADATA = {
  siteName: APP_NAME,
  siteUrl: 'https://disasterrecovery.com.au',
  defaultTitle: `${APP_NAME} | 24/7 Emergency Restoration Services`,
  titleTemplate: `%s | ${APP_NAME}`,
  defaultDescription: APP_DESCRIPTION,
  locale: 'en_AU',
  twitterHandle: '@DisasterRecovAU',
} as const;

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;
