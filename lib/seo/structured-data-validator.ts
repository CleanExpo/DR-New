/**
 * Structured Data Validator and Optimizer
 * Ensures all structured data follows schema.org best practices
 */

import {
  LocalBusinessSchema,
  FAQSchema,
  BreadcrumbSchema,
  ServiceSchema
} from './structured-data';

// Validation result structure
export interface ValidationResult {
  isValid: boolean;
  score: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'critical' | 'major' | 'minor';
}

export interface ValidationWarning {
  field: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
}

// Schema.org required and recommended fields
const schemaRequirements = {
  LocalBusiness: {
    required: ['@context', '@type', 'name', 'address', 'telephone'],
    recommended: ['url', 'description', 'openingHoursSpecification', 'geo', 'image', 'priceRange'],
    optional: ['email', 'sameAs', 'hasOfferCatalog', 'areaServed']
  },
  PostalAddress: {
    required: ['@type', 'streetAddress', 'addressLocality', 'addressRegion', 'postalCode'],
    recommended: ['addressCountry'],
    optional: []
  },
  GeoCoordinates: {
    required: ['@type', 'latitude', 'longitude'],
    recommended: [],
    optional: []
  },
  FAQPage: {
    required: ['@context', '@type', 'mainEntity'],
    recommended: [],
    optional: ['about', 'author']
  },
  Question: {
    required: ['@type', 'name', 'acceptedAnswer'],
    recommended: [],
    optional: ['dateCreated', 'author']
  },
  Answer: {
    required: ['@type', 'text'],
    recommended: [],
    optional: ['dateCreated', 'author']
  },
  BreadcrumbList: {
    required: ['@context', '@type', 'itemListElement'],
    recommended: [],
    optional: []
  },
  Service: {
    required: ['@context', '@type', 'name', 'provider'],
    recommended: ['description', 'areaServed'],
    optional: ['hasOfferCatalog', 'serviceType', 'availableChannel']
  }
};

// Validate LocalBusiness schema
export function validateLocalBusinessSchema(schema: LocalBusinessSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Check required fields
  for (const field of schemaRequirements.LocalBusiness.required) {
    if (!(field in schema)) {
      errors.push({
        field,
        message: `Missing required field: ${field}`,
        severity: 'critical'
      });
      score -= 15;
    }
  }

  // Validate @context
  if (schema['@context'] !== 'https://schema.org') {
    errors.push({
      field: '@context',
      message: '@context should be "https://schema.org"',
      severity: 'major'
    });
    score -= 10;
  }

  // Validate @type
  if (!['LocalBusiness', 'EmergencyService'].includes(schema['@type'])) {
    warnings.push({
      field: '@type',
      message: 'Consider using "EmergencyService" for better relevance',
      impact: 'medium'
    });
    score -= 5;
  }

  // Validate phone format
  if (schema.telephone && !schema.telephone.match(/^\+?[\d\s-()]+$/)) {
    errors.push({
      field: 'telephone',
      message: 'Phone number format invalid',
      severity: 'minor'
    });
    score -= 5;
  }

  // Validate address
  if (schema.address) {
    validatePostalAddress(schema.address, errors, warnings);
  }

  // Check recommended fields
  for (const field of schemaRequirements.LocalBusiness.recommended) {
    if (!(field in schema)) {
      warnings.push({
        field,
        message: `Missing recommended field: ${field}`,
        impact: 'low'
      });
      score -= 2;
    }
  }

  // Specific validations for disaster recovery business
  if (!schema.openingHoursSpecification || !isAlwaysOpen(schema.openingHoursSpecification)) {
    suggestions.push('Ensure 24/7 availability is clearly marked in openingHoursSpecification');
  }

  if (!schema.areaServed || schema.areaServed.length < 3) {
    suggestions.push('Include all service areas: Brisbane, Ipswich, and Logan');
  }

  if (schema.hasOfferCatalog && schema.hasOfferCatalog.itemListElement.length < 4) {
    suggestions.push('Consider adding more services to hasOfferCatalog');
  }

  // Check for Master Restorer mention
  if (!schema.name.includes('Master Restorer') && !schema.description?.includes('Master Restorer')) {
    suggestions.push('Include "Master Restorer" certification in name or description');
    score -= 5;
  }

  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    score: Math.max(0, score),
    errors,
    warnings,
    suggestions
  };
}

// Helper function to validate PostalAddress
function validatePostalAddress(
  address: unknown,
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (address['@type'] !== 'PostalAddress') {
    errors.push({
      field: 'address.@type',
      message: 'Address @type should be "PostalAddress"',
      severity: 'major'
    });
  }

  for (const field of schemaRequirements.PostalAddress.required) {
    if (field !== '@type' && !(field in address)) {
      errors.push({
        field: `address.${field}`,
        message: `Missing required address field: ${field}`,
        severity: 'major'
      });
    }
  }

  if (address.addressRegion && address.addressRegion !== 'QLD') {
    warnings.push({
      field: 'address.addressRegion',
      message: 'addressRegion should be "QLD" for Queensland',
      impact: 'low'
    });
  }

  if (address.addressCountry && address.addressCountry !== 'AU') {
    warnings.push({
      field: 'address.addressCountry',
      message: 'addressCountry should be "AU" for Australia',
      impact: 'low'
    });
  }
}

// Check if business is marked as always open
function isAlwaysOpen(hours: unknown[]): boolean {
  if (!hours || hours.length === 0) return false;

  const hasAllDays = hours.some(h =>
    h.dayOfWeek &&
    Array.isArray(h.dayOfWeek) &&
    h.dayOfWeek.length === 7 &&
    h.opens === '00:00' &&
    (h.closes === '23:59' || h.closes === '24:00')
  );

  return hasAllDays;
}

// Validate FAQ schema
export function validateFAQSchema(schema: FAQSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Check required fields
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push({
      field: '@context',
      message: 'Invalid or missing @context',
      severity: 'critical'
    });
    score -= 15;
  }

  if (schema['@type'] !== 'FAQPage') {
    errors.push({
      field: '@type',
      message: '@type should be "FAQPage"',
      severity: 'critical'
    });
    score -= 15;
  }

  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    errors.push({
      field: 'mainEntity',
      message: 'mainEntity must be an array of questions',
      severity: 'critical'
    });
    score -= 20;
  } else {
    // Validate each question
    schema.mainEntity.forEach((question, index) => {
      if (question['@type'] !== 'Question') {
        errors.push({
          field: `mainEntity[${index}].@type`,
          message: 'Question @type should be "Question"',
          severity: 'major'
        });
        score -= 5;
      }

      if (!question.name || question.name.length < 10) {
        errors.push({
          field: `mainEntity[${index}].name`,
          message: 'Question text too short or missing',
          severity: 'major'
        });
        score -= 5;
      }

      if (!question.acceptedAnswer || !question.acceptedAnswer.text) {
        errors.push({
          field: `mainEntity[${index}].acceptedAnswer`,
          message: 'Missing or invalid answer',
          severity: 'major'
        });
        score -= 5;
      }
    });

    // Check FAQ count
    if (schema.mainEntity.length < 3) {
      warnings.push({
        field: 'mainEntity',
        message: 'Consider adding more FAQs (minimum 3-5 recommended)',
        impact: 'medium'
      });
      score -= 5;
    }

    if (schema.mainEntity.length > 20) {
      warnings.push({
        field: 'mainEntity',
        message: 'Too many FAQs on one page (max 20 recommended)',
        impact: 'low'
      });
    }
  }

  // Check for relevant keywords in FAQs
  const hasLocationFAQ = schema.mainEntity?.some(q =>
    q.name.toLowerCase().includes('brisbane') ||
    q.name.toLowerCase().includes('ipswich') ||
    q.name.toLowerCase().includes('logan')
  );

  if (!hasLocationFAQ) {
    suggestions.push('Consider adding location-specific FAQs for local SEO');
  }

  const hasEmergencyFAQ = schema.mainEntity?.some(q =>
    q.name.toLowerCase().includes('emergency') ||
    q.name.toLowerCase().includes('24/7') ||
    q.name.toLowerCase().includes('urgent')
  );

  if (!hasEmergencyFAQ) {
    suggestions.push('Add FAQs about emergency response times and availability');
  }

  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    score: Math.max(0, score),
    errors,
    warnings,
    suggestions
  };
}

// Validate BreadcrumbList schema
export function validateBreadcrumbSchema(schema: BreadcrumbSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Basic validation
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push({
      field: '@context',
      message: 'Invalid or missing @context',
      severity: 'critical'
    });
    score -= 15;
  }

  if (schema['@type'] !== 'BreadcrumbList') {
    errors.push({
      field: '@type',
      message: '@type should be "BreadcrumbList"',
      severity: 'critical'
    });
    score -= 15;
  }

  if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
    errors.push({
      field: 'itemListElement',
      message: 'itemListElement must be an array',
      severity: 'critical'
    });
    score -= 20;
  } else {
    // Validate each breadcrumb item
    schema.itemListElement.forEach((item, index) => {
      if (item['@type'] !== 'ListItem') {
        errors.push({
          field: `itemListElement[${index}].@type`,
          message: 'Item @type should be "ListItem"',
          severity: 'major'
        });
        score -= 5;
      }

      if (!item.position || item.position !== index + 1) {
        errors.push({
          field: `itemListElement[${index}].position`,
          message: `Position should be ${index + 1}`,
          severity: 'minor'
        });
        score -= 2;
      }

      if (!item.name) {
        errors.push({
          field: `itemListElement[${index}].name`,
          message: 'Missing breadcrumb name',
          severity: 'major'
        });
        score -= 5;
      }

      // Last item shouldn't have URL
      if (index === schema.itemListElement.length - 1 && item.item) {
        warnings.push({
          field: `itemListElement[${index}].item`,
          message: 'Last breadcrumb item should not have URL',
          impact: 'low'
        });
      }

      // Other items should have URL
      if (index < schema.itemListElement.length - 1 && !item.item) {
        warnings.push({
          field: `itemListElement[${index}].item`,
          message: 'Breadcrumb item missing URL',
          impact: 'medium'
        });
        score -= 3;
      }
    });

    // Check breadcrumb depth
    if (schema.itemListElement.length > 5) {
      warnings.push({
        field: 'itemListElement',
        message: 'Breadcrumb trail too deep (max 5 levels recommended)',
        impact: 'low'
      });
    }

    // First item should be "Home"
    if (schema.itemListElement[0]?.name !== 'Home') {
      suggestions.push('First breadcrumb should typically be "Home"');
    }
  }

  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    score: Math.max(0, score),
    errors,
    warnings,
    suggestions
  };
}

// Validate Service schema
export function validateServiceSchema(schema: ServiceSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Basic validation
  for (const field of schemaRequirements.Service.required) {
    if (!(field in schema)) {
      errors.push({
        field,
        message: `Missing required field: ${field}`,
        severity: 'critical'
      });
      score -= 15;
    }
  }

  // Validate provider
  if (schema.provider) {
    if (schema.provider['@type'] !== 'LocalBusiness') {
      errors.push({
        field: 'provider.@type',
        message: 'Provider @type should be "LocalBusiness"',
        severity: 'major'
      });
      score -= 10;
    }

    if (!schema.provider.name?.includes('Master Restorer')) {
      suggestions.push('Include "Master Restorer" in provider name');
      score -= 5;
    }

    if (!schema.provider.telephone) {
      warnings.push({
        field: 'provider.telephone',
        message: 'Provider should include telephone',
        impact: 'medium'
      });
      score -= 5;
    }
  }

  // Validate areaServed
  if (schema.areaServed) {
    if (schema.areaServed['@type'] !== 'GeoCircle') {
      warnings.push({
        field: 'areaServed.@type',
        message: 'Consider using GeoCircle for area served',
        impact: 'low'
      });
    }

    if (schema.areaServed.geoRadius) {
      const radius = parseInt(schema.areaServed.geoRadius);
      if (radius > 100) {
        warnings.push({
          field: 'areaServed.geoRadius',
          message: 'Service radius seems too large for local business',
          impact: 'medium'
        });
      }
    }
  }

  // Check for emergency service keywords
  const isEmergencyService = schema.name.toLowerCase().includes('emergency') ||
                            schema.name.toLowerCase().includes('24/7') ||
                            schema.description?.toLowerCase().includes('emergency');

  if (isEmergencyService && schema['@type'] !== 'EmergencyService') {
    suggestions.push('Consider using @type "EmergencyService" for emergency services');
  }

  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    score: Math.max(0, score),
    errors,
    warnings,
    suggestions
  };
}

// Comprehensive structured data validator
export function validateAllStructuredData(schemas: {
  localBusiness?: LocalBusinessSchema;
  faq?: FAQSchema;
  breadcrumb?: BreadcrumbSchema;
  service?: ServiceSchema;
}): {
  overallScore: number;
  results: Map<string, ValidationResult>;
  criticalIssues: string[];
  recommendations: string[];
} {
  const results = new Map<string, ValidationResult>();
  const scores: number[] = [];
  const criticalIssues: string[] = [];
  const recommendations: string[] = [];

  // Validate each schema type
  if (schemas.localBusiness) {
    const result = validateLocalBusinessSchema(schemas.localBusiness);
    results.set('LocalBusiness', result);
    scores.push(result.score);
    criticalIssues.push(...result.errors.filter(e => e.severity === 'critical').map(e => `LocalBusiness: ${e.message}`));
  }

  if (schemas.faq) {
    const result = validateFAQSchema(schemas.faq);
    results.set('FAQ', result);
    scores.push(result.score);
    criticalIssues.push(...result.errors.filter(e => e.severity === 'critical').map(e => `FAQ: ${e.message}`));
  }

  if (schemas.breadcrumb) {
    const result = validateBreadcrumbSchema(schemas.breadcrumb);
    results.set('Breadcrumb', result);
    scores.push(result.score);
    criticalIssues.push(...result.errors.filter(e => e.severity === 'critical').map(e => `Breadcrumb: ${e.message}`));
  }

  if (schemas.service) {
    const result = validateServiceSchema(schemas.service);
    results.set('Service', result);
    scores.push(result.score);
    criticalIssues.push(...result.errors.filter(e => e.severity === 'critical').map(e => `Service: ${e.message}`));
  }

  // Calculate overall score
  const overallScore = scores.length > 0
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  // Compile recommendations
  if (overallScore < 80) {
    recommendations.push('Structured data needs improvement for better search visibility');
  }
  if (!schemas.localBusiness) {
    recommendations.push('Add LocalBusiness schema for better local SEO');
  }
  if (!schemas.faq) {
    recommendations.push('Consider adding FAQ schema to relevant pages');
  }

  // Add all unique suggestions
  for (const [, result] of results) {
    recommendations.push(...result.suggestions);
  }

  return {
    overallScore,
    results,
    criticalIssues,
    recommendations: [...new Set(recommendations)] // Remove duplicates
  };
}