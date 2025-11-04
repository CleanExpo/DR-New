/**
 * Suburb Template System - Main Exports
 * Centralized access to all template generation utilities
 */

// Type exports
export * from './types';

// Data exports
export {
  allSuburbData,
  getSuburbData,
  getSuburbsByRegion,
  getNearbySuburbNames,
  getAllSuburbSlugs,
  getCoverageStatistics,
} from './suburb-data';

// Content generation exports
export {
  generateIntro,
  generateDisasterTypesSection,
  generateWhyChooseUs,
  generateFAQs,
  generateEmergencyResponse,
  generateServicesSection,
  generateNearbySuburbsText,
  selectContentVariations,
} from './content-generator';

// Schema markup exports
export {
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateOrganizationSchema,
  generateHowToSchema,
  generateVideoSchema,
  generateEventSchema,
  generateWebPageSchema,
  generateAllSchemas,
  formatSchemaForScript,
} from './schema-generator';

// SEO exports
export {
  generateSEOConfig,
  generateInternalLinkingMap,
  generateSitemapEntry,
  generateRobotsMeta,
  generateCanonicalUrl,
  generateOpenGraphTags,
  generateTwitterCardTags,
  generateHreflangTags,
  generateSearchQueries,
  generateCompleteSEOPackage,
} from './seo-generator';

// Component exports
export {
  SuburbPageTemplate,
  generateSuburbMetadata,
  type SuburbPageProps,
} from './SuburbPageTemplate';

/**
 * Convenience function: Generate complete page configuration
 */
export function generateCompleteSuburbPageConfig(suburbSlug: string) {
  const { getSuburbData, getNearbySuburbNames } = require('./suburb-data');
  const {
    generateIntro,
    generateDisasterTypesSection,
    generateWhyChooseUs,
    generateFAQs,
    generateEmergencyResponse,
    generateServicesSection,
  } = require('./content-generator');
  const { generateInternalLinkingMap } = require('./seo-generator');

  const suburb = getSuburbData(suburbSlug);
  if (!suburb) {
    throw new Error(`Suburb not found: ${suburbSlug}`);
  }

  const suburbNames = getNearbySuburbNames(suburbSlug);

  return {
    suburb,
    content: {
      intro: generateIntro(suburb),
      disasterTypes: generateDisasterTypesSection(suburb),
      whyChooseUs: generateWhyChooseUs(suburb),
      faqs: generateFAQs(suburb),
      emergencyResponse: generateEmergencyResponse(suburb),
      services: generateServicesSection(suburb),
      internalLinks: generateInternalLinkingMap(suburb, suburbNames),
    },
  };
}
