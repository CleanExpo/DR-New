/**
 * Type definitions for the page generation system
 */

export interface LocationData {
  id: string;
  name: string;
  slug: string;
  state: string;
  city?: string;
  suburb?: string;
  suburbs?: string[]; // For areas that service multiple suburbs
  postcode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  population?: number;
  disasterRisk?: DisasterRisk[];
  demographics?: Demographics;
  viewport?: {
    northeast: { lat: number; lng: number; };
    southwest: { lat: number; lng: number; };
  };
}

export interface DisasterRisk {
  type: 'flood' | 'bushfire' | 'cyclone' | 'storm' | 'drought';
  level: 'low' | 'medium' | 'high' | 'extreme';
  seasonality?: string[];
  historicalEvents?: number;
}

export interface Demographics {
  medianAge?: number;
  medianIncome?: number;
  propertyTypes?: {
    residential: number;
    commercial: number;
    industrial: number;
  };
}

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  subcategories?: string[];
  description: string;
  keywords: string[];
  equipment?: string[];
  certifications?: string[];
  averageResponseTime?: number;
  averageCost?: CostRange;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  priority: number;
}

export interface CostRange {
  min: number;
  max: number;
  unit: 'hour' | 'sqm' | 'project';
}

export interface ContractorData {
  id: string;
  businessName: string;
  abn: string;
  email?: string;
  phone?: string;
  location: LocationData;
  serviceRadius: number; // in kilometers
  services: ServiceData[];
  certifications: Certification[];
  rating?: number;
  reviewCount?: number;
  responseTime: {
    emergency: number; // in hours
    standard: number; // in hours
  };
  capacity: {
    current: number;
    max: number;
  };
  insuranceProviders?: string[];
  established?: Date;
  employees?: number;
  equipment?: string[];
  caseStudies?: CaseStudy[];
  fraudDetectionLog?: Array<{ timestamp: Date; reason: string; }>;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  validUntil?: Date;
  verificationUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  location: string;
  service: string;
  beforeImages?: string[];
  afterImages?: string[];
  duration: number;
  outcome: string;
  testimonial?: string;
}

export interface PageTemplate {
  id: string;
  name: string;
  type: 'location' | 'service' | 'location-service' | 'emergency' | 'cost' | 'industry';
  sections: TemplateSection[];
  schemaType: SchemaType;
  contentBlocks: ContentBlock[];
}

export interface TemplateSection {
  id: string;
  type: 'hero' | 'stats' | 'services' | 'contractors' | 'testimonials' | 'cta' | 'faq' | 'content';
  order: number;
  config?: Record<string, any>;
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'image' | 'video' | 'map' | 'form' | 'schema';
  content?: string;
  template?: string;
  variables?: string[];
}

export type SchemaType =
  | 'LocalBusiness'
  | 'Service'
  | 'FAQPage'
  | 'HowTo'
  | 'Review'
  | 'AggregateRating'
  | 'Organization'
  | 'WebPage';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  canonicalUrl?: string;
  images?: string[];
  author?: string;
  publishedDate?: Date;
  modifiedDate?: Date;
}

export interface GeneratedContent {
  html: string;
  markdown?: string;
  components?: React.ComponentType[];
  data?: Record<string, any>;
}

export interface PageGenerationOptions {
  includeSchema?: boolean;
  includeMap?: boolean;
  includeFAQ?: boolean;
  includeReviews?: boolean;
  includeContractors?: boolean;
  includeCaseStudies?: boolean;
  includeEmergencyInfo?: boolean;
  includePricing?: boolean;
}

export interface ContentGenerationContext {
  location: LocationData;
  service?: ServiceData;
  contractors?: ContractorData[];
  template: PageTemplate;
  seoData: SEOData;
  options?: PageGenerationOptions;
}

export interface SchemaGenerationContext {
  location: LocationData;
  service?: ServiceData;
  contractors?: ContractorData[];
  type: SchemaType;
}

export interface LocationService {
  location: LocationData;
  service: ServiceData;
  contractors: ContractorData[];
  availability: 'available' | 'limited' | 'unavailable';
  averageResponseTime: number;
  averageRating: number;
  totalReviews: number;
}