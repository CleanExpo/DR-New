/**
 * Article Template Types & Interfaces
 * Defines structure for content generation across all template types
 */

export type ArticleStatus = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED';
export type TemplateType = 'service-pillar' | 'emergency-guide' | 'city-service' | 'faq';

/**
 * FAQ Item for structured Q&A content
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

/**
 * Internal link structure for hub-and-spoke linking
 */
export interface InternalLink {
  text: string;
  url: string;
  position: 'inline' | 'footer' | 'related';
  keyword?: string;
}

/**
 * Article section for structured content generation
 */
export interface ArticleSection {
  heading: string;
  content: string;
  wordCount: number;
  order: number;
  includeInToC?: boolean;
  schemaType?: 'HowToStep' | 'Question' | 'Text' | 'Table';
}

/**
 * Schema markup configuration
 */
export interface SchemaConfig {
  type: 'Article' | 'NewsArticle' | 'HowTo' | 'FAQ' | 'BreadcrumbList';
  author?: {
    name: string;
    url?: string;
    credentials?: string[];
  };
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

/**
 * SEO metadata for article
 */
export interface SEOMetadata {
  title: string;
  metaDescription: string;
  keywords: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  slug: string;
  internalLinks: InternalLink[];
  schema: SchemaConfig;
}

/**
 * Generated article content
 */
export interface GeneratedArticle {
  id?: string;
  title: string;
  slug: string;
  templateType: TemplateType;
  content: string;
  htmlContent?: string;
  sections: ArticleSection[];
  faqs: FAQItem[];
  wordCount: number;
  estimatedReadTime: number;
  seo: SEOMetadata;
  authorId?: string;
  authorName: string;
  authorCredentials?: string[];
  featuredImage?: string;
  status: ArticleStatus;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  scheduledFor?: Date;
  viewCount?: number;
}

/**
 * Template input parameters
 */
export interface TemplateInput {
  // Service-specific
  serviceName?: string;
  serviceCategory?: string;

  // Location-specific (for city-service template)
  cityName?: string;
  state?: string;

  // Content preferences
  tone?: 'professional' | 'friendly' | 'urgent' | 'educational';
  targetAudience?: 'homeowners' | 'property-managers' | 'insurance' | 'mixed';
  includeLocalInfo?: boolean;
  includeEstimates?: boolean;

  // SEO preferences
  primaryKeyword?: string;
  includeCase studies?: boolean;
  includePricing?: boolean;

  // Author
  authorName?: string;
  authorCredentials?: string[];
  authorBio?: string;
}

/**
 * Quality validation result
 */
export interface QualityValidationResult {
  passed: boolean;
  wordCount: number;
  wordCountValid: boolean;
  readabilityScore: number; // Flesch Reading Ease (0-100)
  readabilityValid: boolean;
  keywordDensity: {
    primary: number;
    secondary: number[];
    valid: boolean;
  };
  internalLinks: number;
  internalLinksValid: boolean;
  schemaMarkup: {
    found: string[];
    valid: boolean;
  };
  issues: string[];
  suggestions: string[];
  qualityScore: number; // 0-100
}

/**
 * Batch generation request
 */
export interface BatchGenerationRequest {
  templateType: TemplateType;
  articles: TemplateInput[];
  schedulePublishing?: boolean;
  staggerDays?: number;
  priority?: 'high' | 'normal' | 'low';
}

/**
 * Batch generation result
 */
export interface BatchGenerationResult {
  total: number;
  successful: number;
  failed: number;
  articles: GeneratedArticle[];
  errors: { input: TemplateInput; error: string }[];
  startTime: Date;
  endTime: Date;
  averageGenerationTime: number; // milliseconds
}
