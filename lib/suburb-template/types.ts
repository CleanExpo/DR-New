/**
 * Suburb Template System - Type Definitions
 * Scalable, reusable types for 40+ location pages
 */

export type SuburbRegion = 'inner-brisbane' | 'outer-brisbane' | 'bayside' | 'riverside' | 'hills' | 'ipswich' | 'logan' | 'central-coast';

export type DemographicType = 'residential' | 'commercial' | 'mixed' | 'luxury-residential' | 'industrial';

export type DisasterType = 'water-damage' | 'fire-damage' | 'mould' | 'storm-damage' | 'flood' | 'subsidence' | 'storm-surge';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

/**
 * Main Suburb Template Configuration
 * Defines all data required for dynamic page generation
 */
export interface SuburbTemplate {
  // Core identifiers
  name: string;
  slug: string;
  postcode: string;
  region: SuburbRegion;

  // Location data
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distanceFromHQ: number; // km from Wacol HQ
  responseTime: string; // e.g., "45-60 minutes"
  responseTimeMinutes?: number; // numeric value for sorting

  // Demographics
  demographics: {
    medianPrice?: string;
    population?: string;
    primaryPropertyTypes: string[]; // e.g., ['Queenslanders', 'modern units']
    secondaryPropertyTypes?: string[]; // e.g., ['commercial spaces']
    householdComposition?: string; // e.g., "Families, young professionals"
  };

  // Risk Profile
  disasterRisks: RiskFactor[];
  notableFeatures?: string[]; // e.g., ['near river', 'near coast', 'elevated hills']
  floodHistory?: string;
  floodZone?: RiskLevel;
  wildfirerisk?: RiskLevel;
  stormRisk?: RiskLevel;

  // USPs & Specializations
  keySpecialties: string[]; // Main services/focuses for this suburb
  uniqueCharacteristics: string[]; // What makes this suburb unique
  landmarks: string[]; // Local landmarks/attractions

  // Cross-linking
  nearbySuburbs: string[]; // Array of suburb slugs to link to
  regionParent?: string; // e.g., "brisbane", "ipswich", "logan"

  // Content overrides (optional)
  customIntro?: string;
  customCTA?: string;
  specialServices?: ServiceSpecialization[];
  mainRisksToHighlight?: string[]; // Override auto-selected risks
}

/**
 * Risk Factor Configuration
 */
export interface RiskFactor {
  type: DisasterType;
  severity: RiskLevel;
  affectedProperties: string[];
  likelihood?: 'seasonal' | 'frequent' | 'rare' | 'historical';
  historicalIncidents?: string;
}

/**
 * Service Specialization for Specific Suburbs
 */
export interface ServiceSpecialization {
  title: string;
  description: string;
  icon: string; // icon name from lucide-react
  responseTime?: string;
  features: string[];
  featured?: boolean; // highlight on page
}

/**
 * Content Block for Dynamic Generation
 */
export interface ContentBlock {
  heading: string;
  subheading?: string;
  content: string;
  icon?: string;
  sectionId?: string;
  featured?: boolean;
}

/**
 * FAQ Item
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: 'services' | 'emergency' | 'insurance' | 'prevention' | 'property-specific';
  featured?: boolean;
}

/**
 * Schema Markup Data
 */
export interface SchemaData {
  businessName: string;
  description: string;
  serviceArea: string;
  telephone: string;
  email: string;
  priceRange?: string;
  address: {
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
  services: {
    name: string;
    description: string;
  }[];
  rating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
}

/**
 * Internal Linking Strategy
 */
export interface InternalLinkingMap {
  parentRegion: string; // Link to /brisbane or /ipswich
  relatedSuburbs: Array<{
    name: string;
    slug: string;
    reason?: string; // why related (e.g., "nearby", "similar properties", "shared risk")
  }>;
  relatedServices: Array<{
    name: string;
    path: string; // /services/water-damage-restoration
  }>;
}

/**
 * SEO Configuration
 */
export interface SEOConfig {
  primaryKeyword: string; // e.g., "water damage restoration Hamilton"
  secondaryKeywords: string[];
  lsiKeywords: string[]; // Latent Semantic Indexing keywords
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl: string;
  structured: {
    schema: SchemaData;
    faqSchema?: FAQItem[];
    breadcrumbs?: string[];
  };
}

/**
 * Complete Page Configuration (what gets passed to page component)
 */
export interface SuburbPageConfig {
  suburb: SuburbTemplate;
  seo: SEOConfig;
  content: {
    heroIntro: string;
    disasterTypes: ContentBlock[];
    whyChooseUs: ContentBlock;
    emergencyResponse: ContentBlock;
    services: ContentBlock[];
    faq: FAQItem[];
    nearbyAreas: InternalLinkingMap;
  };
  design?: {
    heroGradient?: string;
    primaryColor?: string;
    accentColor?: string;
  };
}

/**
 * Content Variation Library Entry
 */
export interface ContentVariation {
  id: string;
  category: 'intro' | 'disaster' | 'faq' | 'cta' | 'why-us';
  template: string;
  tags?: string[]; // e.g., ['riverside', 'luxury', 'family']
  propertyTypes?: string[];
}

/**
 * Bulk Update Configuration
 */
export interface BulkUpdateConfig {
  suburbs: string[]; // array of suburb slugs
  updates: Partial<SuburbTemplate>;
  mergeStrategy?: 'override' | 'merge' | 'append'; // how to handle arrays
}
