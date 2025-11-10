/**
 * Type definitions for page templates
 * Fixes TS18046 "unknown type" errors
 */

// ============================================================================
// Data Visualization Types
// ============================================================================

export interface ProgressDataItem {
  label: string;
  value: number;
}

export interface BarChartDataItem {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartDataItem {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartDataPoint {
  x: number | string;
  y: number;
  label?: string;
}

export type VisualizationData =
  | ProgressDataItem[]
  | BarChartDataItem[]
  | PieChartDataItem[]
  | LineChartDataPoint[];

// ============================================================================
// Australian Schema Types
// ============================================================================

export interface AustralianSchemaParams {
  serviceName: string;
  serviceType?: string;
  description: string;
  url: string;
}

export interface SchemaOrganization {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  areaServed: {
    '@type': string;
    name: string;
    identifier?: string;
  };
  address: {
    '@type': string;
    addressCountry: string;
    addressRegion: string;
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  priceRange: string;
  paymentAccepted: string;
  currenciesAccepted: string;
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  sameAs?: string[];
}

// ============================================================================
// Location Service Page Types
// ============================================================================

export interface LocationServiceData {
  locationName: string;
  serviceName: string;
  serviceType: string;
  description: string;
  heroImage?: string;
  heroImageAlt?: string;
  responseTime?: string;
  neighborhoods?: string[];
  features?: LocationFeature[];
  faqs?: FAQItem[];
  stats?: LocationStats;
}

export interface LocationFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface LocationStats {
  propertiesRestored?: string;
  responseTime?: string;
  availability?: string;
  yearsExperience?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ============================================================================
// Australian Authority Types
// ============================================================================

export interface AuthoritySource {
  name: string;
  type: string;
  credibility: string;
  website: string;
}

export interface AustralianAuthorities {
  research: AuthoritySource[];
  certifications: string[];
  industryBodies: string[];
}

// ============================================================================
// Content Guidelines Types
// ============================================================================

export interface ContentGuidelines {
  sentenceLength: {
    max: number;
    ideal: number;
  };
  paragraphLength: {
    max: number;
    ideal: number;
  };
  readabilityScore: {
    target: number;
    gradeLevel: number;
  };
  activeVoice: {
    good: string;
    bad: string;
  };
  rules: string[];
}

// ============================================================================
// Page Metadata Types
// ============================================================================

export interface PageMetadataParams {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  image?: string;
}

// ============================================================================
// Type Guards
// ============================================================================

export function isProgressDataArray(data: unknown): data is ProgressDataItem[] {
  if (!Array.isArray(data)) {return false;}
  if (data.length === 0) {return true;}

  const firstItem = data[0];
  return (
    typeof firstItem === 'object' &&
    firstItem !== null &&
    'label' in firstItem &&
    'value' in firstItem &&
    typeof firstItem.label === 'string' &&
    typeof firstItem.value === 'number'
  );
}

export function isBarChartDataArray(data: unknown): data is BarChartDataItem[] {
  if (!Array.isArray(data)) {return false;}
  if (data.length === 0) {return true;}

  const firstItem = data[0];
  return (
    typeof firstItem === 'object' &&
    firstItem !== null &&
    'label' in firstItem &&
    'value' in firstItem &&
    typeof firstItem.label === 'string' &&
    typeof firstItem.value === 'number'
  );
}

export function isLocationServiceData(data: unknown): data is LocationServiceData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'locationName' in data &&
    'serviceName' in data &&
    typeof (data as LocationServiceData).locationName === 'string' &&
    typeof (data as LocationServiceData).serviceName === 'string'
  );
}
