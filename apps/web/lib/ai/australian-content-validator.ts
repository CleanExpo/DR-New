/**
 * Australian Content Validation Layer
 *
 * Validates AI-generated and user-submitted content for Australian compliance,
 * including spelling, terminology, currency, building codes, and regional accuracy.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  score: number; // 0-100, where 100 is perfect compliance
}

export interface ValidationContext {
  disasterType?: string;
  state?: string;
  requiresCompliance?: boolean;
  checkCosts?: boolean;
  checkBuildingCodes?: boolean;
}

// ============================================================================
// Australian Content Validator Class
// ============================================================================

export class AustralianContentValidator {
  /**
   * Validate Australian spelling and terminology
   */
  validateTerminology(content: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Critical American spellings that MUST be Australian
    const americanSpellings = [
      { us: /\bmold\b/gi, au: 'mould', severity: 'error' },
      { us: /\bcolor\b/gi, au: 'colour', severity: 'warning' },
      { us: /\bcenter\b/gi, au: 'centre', severity: 'warning' },
      { us: /\bfavor\b/gi, au: 'favour', severity: 'warning' },
      { us: /\bmeters?\b/gi, au: 'metres', severity: 'warning' },
      { us: /\bkilometers?\b/gi, au: 'kilometres', severity: 'warning' },
      { us: /\blicense\b/gi, au: 'licence', severity: 'suggestion' }, // Context-dependent
    ];

    americanSpellings.forEach(({ us, au, severity }) => {
      const matches = content.match(us);
      if (matches) {
        const message = `Use Australian spelling: "${au}" instead of "${matches[0]}"`;
        if (severity === 'error') {
          errors.push(message);
        } else if (severity === 'warning') {
          warnings.push(message);
        } else {
          suggestions.push(message);
        }
      }
    });

    // Check for "zip code" vs "postcode"
    if (/\bzip\s*code\b/gi.test(content)) {
      errors.push('Use "postcode" instead of "zip code" in Australian context');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      score: errors.length === 0 && warnings.length === 0 ? 100 : Math.max(0, 100 - (errors.length * 20 + warnings.length * 10)),
    };
  }

  /**
   * Validate currency references (must be AUD)
   */
  validateCurrency(content: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for USD references (CRITICAL ERROR)
    if (/\$\d+\s*USD/gi.test(content) || /USD\s*\$\d+/gi.test(content)) {
      errors.push('Currency must be in AUD, not USD. Replace all USD references with AUD.');
    }

    // Check for other foreign currencies
    const foreignCurrencies = ['EUR', 'GBP', 'JPY', 'CNY', 'NZD'];
    foreignCurrencies.forEach((currency) => {
      if (new RegExp(`\\b${currency}\\b`, 'gi').test(content)) {
        errors.push(`Use AUD, not ${currency}, for Australian disaster recovery costs.`);
      }
    });

    // Check for dollar amounts without AUD clarification
    const dollarMatches = content.match(/\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g);
    if (dollarMatches && dollarMatches.length > 0) {
      // Only warn if there are multiple dollar amounts and no AUD mention
      if (dollarMatches.length >= 3 && !/\bAUD\b/gi.test(content)) {
        warnings.push('Consider specifying currency as AUD for clarity (e.g., "$5,000 AUD" or "AUD $5,000")');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      score: errors.length === 0 ? 100 : 0,
    };
  }

  /**
   * Validate building codes and Australian Standards
   */
  validateBuildingCodes(content: string, disasterType?: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Define relevant standards by disaster type
    const relevantStandards: Record<string, string[]> = {
      bushfire: ['AS 3959', 'BAL', 'Bushfire Attack Level'],
      cyclone: ['AS 1170.2', 'Wind rating', 'Wind Actions'],
      hailstorm: ['AS 4040.3', 'Hail Resistance'],
      'hail-damage': ['AS 4040.3'],
      structural: ['NCC', 'BCA', 'National Construction Code'],
      'structural-damage': ['NCC', 'BCA'],
    };

    // Check if content mentions building codes
    const mentionsAS = /\bAS\s+\d{4}/gi.test(content);
    const mentionsNCC = /\bNCC\b/gi.test(content);
    const mentionsBCA = /\bBCA\b/gi.test(content);

    if (disasterType && relevantStandards[disasterType]) {
      const applicable = relevantStandards[disasterType];
      const mentionsApplicable = applicable.some((std) =>
        new RegExp(std, 'i').test(content)
      );

      if (!mentionsApplicable && (mentionsAS || mentionsNCC || mentionsBCA)) {
        suggestions.push(
          `Consider referencing ${applicable.join(' or ')} for ${disasterType} compliance`
        );
      }
    }

    // Validate AS code formats (should be AS XXXX-YYYY)
    const asCodeMatches = content.match(/\bAS\s+\d{4}(?:-\d{4})?\b/gi);
    if (asCodeMatches) {
      asCodeMatches.forEach((code) => {
        // Check if code includes year (AS XXXX-YYYY is preferred)
        if (!/AS\s+\d{4}-\d{4}/i.test(code)) {
          suggestions.push(`Specify year for ${code} (e.g., ${code}-2018)`);
        }
      });
    }

    // Check for outdated code references
    const outdatedCodes = [
      { code: 'BCA 2016', current: 'NCC 2022' },
      { code: 'AS 3959-2009', current: 'AS 3959-2018' },
    ];

    outdatedCodes.forEach(({ code, current }) => {
      if (new RegExp(code, 'gi').test(content)) {
        warnings.push(`${code} is outdated. Use ${current} instead.`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      score: warnings.length === 0 ? 100 : Math.max(0, 100 - warnings.length * 15),
    };
  }

  /**
   * Validate measurements (must be metric)
   */
  validateMeasurements(content: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for imperial measurements (CRITICAL ERROR)
    const imperialUnits = [
      { imperial: /\d+\s*(?:feet|foot|ft)\b/gi, metric: 'metres (m)' },
      { imperial: /\d+\s*(?:inches|inch|in)\b/gi, metric: 'millimetres (mm) or centimetres (cm)' },
      { imperial: /\d+\s*(?:pounds|lbs?)\b/gi, metric: 'kilograms (kg)' },
      { imperial: /\d+\s*(?:°F|fahrenheit)\b/gi, metric: 'Celsius (°C)' },
      { imperial: /\d+\s*(?:miles|mi)\b/gi, metric: 'kilometres (km)' },
    ];

    imperialUnits.forEach(({ imperial, metric }) => {
      if (imperial.test(content)) {
        errors.push(`Use metric measurements: ${metric} instead of imperial units`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions: [],
      score: errors.length === 0 ? 100 : 0,
    };
  }

  /**
   * Validate Australian geographic references
   */
  validateGeography(content: string, state?: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Valid Australian states
    const validStates = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

    // Check postcode format (must be 4 digits)
    const postcodeMatches = content.match(/\b(?:postcode|post code)\s*:?\s*(\d+)/gi);
    if (postcodeMatches) {
      postcodeMatches.forEach((match) => {
        const digits = match.match(/\d+/);
        if (digits && digits[0].length !== 4) {
          errors.push(`Australian postcodes must be exactly 4 digits, found: ${digits[0]}`);
        }
      });
    }

    // Check state abbreviations
    const stateMatches = content.match(/\b([A-Z]{2,3})\b/g);
    if (stateMatches && state) {
      const invalidStates = stateMatches.filter(
        (s) => s.length === 2 || s.length === 3
      ).filter(
        (s) => !validStates.includes(s) && s !== state
      );

      if (invalidStates.length > 0) {
        warnings.push(`Unrecognized state abbreviations: ${invalidStates.join(', ')}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      score: errors.length === 0 ? 100 : Math.max(0, 100 - errors.length * 25),
    };
  }

  /**
   * Comprehensive validation of all aspects
   */
  validate(content: string, context: ValidationContext = {}): ValidationResult {
    const results = [
      this.validateTerminology(content),
      context.checkCosts !== false ? this.validateCurrency(content) : null,
      this.validateMeasurements(content),
      context.state ? this.validateGeography(content, context.state) : null,
      context.checkBuildingCodes !== false
        ? this.validateBuildingCodes(content, context.disasterType)
        : null,
    ].filter(Boolean) as ValidationResult[];

    const allErrors = results.flatMap((r) => r.errors);
    const allWarnings = results.flatMap((r) => r.warnings);
    const allSuggestions = results.flatMap((r) => r.suggestions);

    // Calculate overall score (weighted average)
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const averageScore = results.length > 0 ? Math.round(totalScore / results.length) : 100;

    return {
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings,
      suggestions: allSuggestions,
      score: averageScore,
    };
  }

  /**
   * Generate a human-readable validation report
   */
  generateReport(result: ValidationResult): string {
    let report = '# Australian Content Validation Report\n\n';

    report += `**Compliance Score:** ${result.score}/100\n`;
    report += `**Status:** ${result.valid ? '✅ PASSED' : '❌ FAILED'}\n\n`;

    if (result.errors.length > 0) {
      report += `## ❌ Errors (${result.errors.length})\n`;
      result.errors.forEach((error, i) => {
        report += `${i + 1}. ${error}\n`;
      });
      report += '\n';
    }

    if (result.warnings.length > 0) {
      report += `## ⚠️ Warnings (${result.warnings.length})\n`;
      result.warnings.forEach((warning, i) => {
        report += `${i + 1}. ${warning}\n`;
      });
      report += '\n';
    }

    if (result.suggestions.length > 0) {
      report += `## 💡 Suggestions (${result.suggestions.length})\n`;
      result.suggestions.forEach((suggestion, i) => {
        report += `${i + 1}. ${suggestion}\n`;
      });
      report += '\n';
    }

    if (result.valid && result.errors.length === 0 && result.warnings.length === 0) {
      report += '## ✅ Perfect Compliance\n';
      report += 'Content meets all Australian standards and conventions.\n';
    }

    return report;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const australianValidator = new AustralianContentValidator();

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Quick validation function for inline use
 */
export function validateAustralianContent(
  content: string,
  context: ValidationContext = {}
): ValidationResult {
  return australianValidator.validate(content, context);
}

/**
 * Validate and throw if invalid (for strict enforcement)
 */
export function requireAustralianCompliance(
  content: string,
  context: ValidationContext = {}
): void {
  const result = australianValidator.validate(content, context);

  if (!result.valid) {
    throw new Error(
      `Australian compliance validation failed:\n${result.errors.join('\n')}`
    );
  }
}

/**
 * Auto-correct common American to Australian spellings
 */
export function autoCorrectAustralianSpelling(content: string): string {
  let corrected = content;

  const corrections: Array<{ us: RegExp; au: string }> = [
    { us: /\bmold\b/gi, au: 'mould' },
    { us: /\bcolor\b/gi, au: 'colour' },
    { us: /\bcenter\b/gi, au: 'centre' },
    { us: /\bfavor\b/gi, au: 'favour' },
    { us: /\bmeters?\b/gi, au: 'metres' },
    { us: /\bkilometers?\b/gi, au: 'kilometres' },
  ];

  corrections.forEach(({ us, au }) => {
    corrected = corrected.replace(us, (match) => {
      // Preserve case
      if (match[0] === match[0].toUpperCase()) {
        return au.charAt(0).toUpperCase() + au.slice(1);
      }
      return au;
    });
  });

  return corrected;
}
