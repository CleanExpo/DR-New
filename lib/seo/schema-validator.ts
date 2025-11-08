/**
 * Schema Validation Utility
 * Validates Schema.org structured data for correctness
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface SchemaValidationOptions {
  strict?: boolean;
  checkRequired?: boolean;
  checkRecommended?: boolean;
}

const DEFAULT_OPTIONS: SchemaValidationOptions = {
  strict: false,
  checkRequired: true,
  checkRecommended: true
};

/**
 * Validate LocalBusiness schema
 */
export function validateLocalBusinessSchema(schema: any, options: SchemaValidationOptions = DEFAULT_OPTIONS): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Required fields
  const requiredFields = ['@context', '@type', 'name', 'address', 'telephone'];

  if (options.checkRequired) {
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`Missing required field: ${field}`);
        result.valid = false;
      }
    });
  }

  // Recommended fields
  const recommendedFields = ['url', 'email', 'geo', 'openingHoursSpecification', 'areaServed'];

  if (options.checkRecommended) {
    recommendedFields.forEach(field => {
      if (!schema[field]) {
        result.warnings.push(`Missing recommended field: ${field}`);
      }
    });
  }

  // Validate @type
  if (schema['@type'] !== 'LocalBusiness') {
    result.errors.push(`Invalid @type: expected "LocalBusiness", got "${schema['@type']}"`);
    result.valid = false;
  }

  // Validate address
  if (schema.address) {
    const addressRequired = ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry'];
    addressRequired.forEach(field => {
      if (!schema.address[field]) {
        result.errors.push(`Missing required address field: ${field}`);
        result.valid = false;
      }
    });
  }

  // Validate geo coordinates
  if (schema.geo) {
    if (!schema.geo.latitude || !schema.geo.longitude) {
      result.errors.push('Geo coordinates must include both latitude and longitude');
      result.valid = false;
    }

    // Validate coordinate ranges
    const lat = parseFloat(schema.geo.latitude);
    const lng = parseFloat(schema.geo.longitude);

    if (lat < -90 || lat > 90) {
      result.errors.push(`Invalid latitude: ${lat} (must be between -90 and 90)`);
      result.valid = false;
    }

    if (lng < -180 || lng > 180) {
      result.errors.push(`Invalid longitude: ${lng} (must be between -180 and 180)`);
      result.valid = false;
    }
  }

  // Validate telephone format
  if (schema.telephone && !schema.telephone.match(/^\+?\d{1,3}[-\s]?\d{3,4}[-\s]?\d{3}[-\s]?\d{3,4}$/)) {
    result.warnings.push('Telephone should be in international format (e.g., +61-1300-309-361)');
  }

  return result;
}

/**
 * Validate Person schema
 */
export function validatePersonSchema(schema: any, options: SchemaValidationOptions = DEFAULT_OPTIONS): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Required fields
  const requiredFields = ['@context', '@type', 'name'];

  if (options.checkRequired) {
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`Missing required field: ${field}`);
        result.valid = false;
      }
    });
  }

  // Recommended fields
  const recommendedFields = ['jobTitle', 'description', 'url', 'worksFor'];

  if (options.checkRecommended) {
    recommendedFields.forEach(field => {
      if (!schema[field]) {
        result.warnings.push(`Missing recommended field: ${field}`);
      }
    });
  }

  // Validate @type
  if (schema['@type'] !== 'Person') {
    result.errors.push(`Invalid @type: expected "Person", got "${schema['@type']}"`);
    result.valid = false;
  }

  return result;
}

/**
 * Validate Service schema
 */
export function validateServiceSchema(schema: any, options: SchemaValidationOptions = DEFAULT_OPTIONS): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Required fields
  const requiredFields = ['@context', '@type', 'name', 'serviceType', 'provider'];

  if (options.checkRequired) {
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`Missing required field: ${field}`);
        result.valid = false;
      }
    });
  }

  // Recommended fields
  const recommendedFields = ['description', 'areaServed', 'offers'];

  if (options.checkRecommended) {
    recommendedFields.forEach(field => {
      if (!schema[field]) {
        result.warnings.push(`Missing recommended field: ${field}`);
      }
    });
  }

  // Validate @type
  if (schema['@type'] !== 'Service') {
    result.errors.push(`Invalid @type: expected "Service", got "${schema['@type']}"`);
    result.valid = false;
  }

  return result;
}

/**
 * Validate FAQPage schema
 */
export function validateFAQPageSchema(schema: any, options: SchemaValidationOptions = DEFAULT_OPTIONS): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Required fields
  if (!schema['@context']) {
    result.errors.push('Missing required field: @context');
    result.valid = false;
  }

  if (!schema['@type'] || schema['@type'] !== 'FAQPage') {
    result.errors.push(`Invalid @type: expected "FAQPage", got "${schema['@type']}"`);
    result.valid = false;
  }

  if (!schema.mainEntity || !Array.isArray(schema.mainEntity) || schema.mainEntity.length === 0) {
    result.errors.push('FAQPage must have at least one mainEntity (Question)');
    result.valid = false;
  }

  // Validate each question
  if (schema.mainEntity) {
    schema.mainEntity.forEach((question: any, index: number) => {
      if (question['@type'] !== 'Question') {
        result.errors.push(`mainEntity[${index}] must be of type "Question"`);
        result.valid = false;
      }

      if (!question.name) {
        result.errors.push(`mainEntity[${index}] missing required field: name`);
        result.valid = false;
      }

      if (!question.acceptedAnswer) {
        result.errors.push(`mainEntity[${index}] missing required field: acceptedAnswer`);
        result.valid = false;
      } else if (question.acceptedAnswer['@type'] !== 'Answer') {
        result.errors.push(`mainEntity[${index}].acceptedAnswer must be of type "Answer"`);
        result.valid = false;
      } else if (!question.acceptedAnswer.text) {
        result.errors.push(`mainEntity[${index}].acceptedAnswer missing required field: text`);
        result.valid = false;
      }
    });
  }

  return result;
}

/**
 * Validate BreadcrumbList schema
 */
export function validateBreadcrumbListSchema(schema: any, options: SchemaValidationOptions = DEFAULT_OPTIONS): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Required fields
  if (!schema['@context']) {
    result.errors.push('Missing required field: @context');
    result.valid = false;
  }

  if (!schema['@type'] || schema['@type'] !== 'BreadcrumbList') {
    result.errors.push(`Invalid @type: expected "BreadcrumbList", got "${schema['@type']}"`);
    result.valid = false;
  }

  if (!schema.itemListElement || !Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
    result.errors.push('BreadcrumbList must have at least one itemListElement');
    result.valid = false;
  }

  // Validate each item
  if (schema.itemListElement) {
    schema.itemListElement.forEach((item: any, index: number) => {
      if (item['@type'] !== 'ListItem') {
        result.errors.push(`itemListElement[${index}] must be of type "ListItem"`);
        result.valid = false;
      }

      if (!item.position) {
        result.errors.push(`itemListElement[${index}] missing required field: position`);
        result.valid = false;
      }

      if (!item.name) {
        result.errors.push(`itemListElement[${index}] missing required field: name`);
        result.valid = false;
      }

      // Position should be sequential starting from 1
      if (item.position !== index + 1) {
        result.warnings.push(`itemListElement[${index}] position should be ${index + 1}, got ${item.position}`);
      }
    });
  }

  return result;
}

/**
 * Validate any schema type
 */
export function validateSchema(schema: any, options: SchemaValidationOptions = DEFAULT_OPTIONS): ValidationResult {
  if (!schema['@type']) {
    return {
      valid: false,
      errors: ['Missing @type field'],
      warnings: []
    };
  }

  switch (schema['@type']) {
    case 'LocalBusiness':
      return validateLocalBusinessSchema(schema, options);
    case 'Person':
      return validatePersonSchema(schema, options);
    case 'Service':
      return validateServiceSchema(schema, options);
    case 'FAQPage':
      return validateFAQPageSchema(schema, options);
    case 'BreadcrumbList':
      return validateBreadcrumbListSchema(schema, options);
    default:
      return {
        valid: true,
        errors: [],
        warnings: [`Unknown schema type: ${schema['@type']} - validation skipped`]
      };
  }
}

/**
 * Print validation result to console
 */
export function printValidationResult(schemaName: string, result: ValidationResult) {
  console.log(`\n${schemaName}:`);
  console.log('─'.repeat(50));

  if (result.valid) {
    console.log('✅ Valid');
  } else {
    console.log('❌ Invalid');
  }

  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach(error => console.log(`  ❌ ${error}`));
  }

  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
  }
}
