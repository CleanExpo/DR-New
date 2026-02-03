#!/usr/bin/env ts-node
/**
 * Australian Source Validation Script
 * 
 * Validates all training modules for Australian compliance:
 * - Only .gov.au and approved industry sources
 * - Australian English terminology
 * - Required context (Sydney/Melbourne/Brisbane examples)
 * - ABS statistics references
 * 
 * Usage: npx ts-node scripts/validate-australian-sources.ts [module-path]
 * Exit code: 0 = all valid, 1 = validation errors found
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================================================================
// TYPES
// ============================================================================

interface ValidationResult {
  valid: boolean;
  filePath: string;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  stats: ValidationStats;
}

interface ValidationError {
  type: 'source' | 'terminology' | 'context' | 'statistics' | 'structure';
  message: string;
  line?: number;
  suggestion?: string;
}

interface ValidationWarning {
  type: 'source' | 'terminology' | 'context' | 'statistics';
  message: string;
  line?: number;
}

interface ValidationStats {
  totalLines: number;
  govAuSources: number;
  totalSources: number;
  australianTerms: number;
  prohibitedTerms: number;
  locationReferences: number;
}

interface AustralianSourcesConfig {
  whitelist: {
    government: { domains: Array<{ domain: string; category: string }> };
    industry: { domains: Array<{ domain: string; category: string }> };
    insurance: { domains: Array<{ domain: string; category: string }> };
    standards: { domains: Array<{ domain: string; category: string }> };
  };
  blacklist: {
    domains: Array<{ domain: string; reason: string; suggestedAlternative?: string }>;
  };
  validationRules: {
    minimumGovAuSources: number;
    minimumTotalSources: number;
    prohibitedTerms: string[];
    requiredAustralianTerms: string[];
  };
  australianContext: {
    requiredLocations: string[];
  };
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG_PATH = path.join(process.cwd(), 'lib', 'training', 'australian-sources.json');
const MODULES_PATH = path.join(process.cwd(), '..', '..', 'NRPG-Onboarding-Framework', 'contractor-onboarding');

// Default configuration if file not found
const DEFAULT_CONFIG: AustralianSourcesConfig = {
  whitelist: {
    government: { domains: [{ domain: '*.gov.au', category: 'government' }] },
    industry: { domains: [{ domain: 'ria.org.au', category: 'industry' }] },
    insurance: { domains: [{ domain: 'codeofpractice.com.au', category: 'insurance' }] },
    standards: { domains: [{ domain: 'standards.org.au', category: 'standards' }] },
  },
  blacklist: {
    domains: [
      { domain: 'iicrc.org', reason: 'Use iicrc.org.au', suggestedAlternative: 'iicrc.org.au' },
      { domain: 'osha.gov', reason: 'Use safeworkaustralia.gov.au', suggestedAlternative: 'safeworkaustralia.gov.au' },
    ],
  },
  validationRules: {
    minimumGovAuSources: 3,
    minimumTotalSources: 5,
    prohibitedTerms: ['OSHA', 'Fahrenheit', 'inches', 'feet', 'gallons'],
    requiredAustralianTerms: ['WorkSafe', 'Celsius', 'millimetres', 'metres', 'litres'],
  },
  australianContext: {
    requiredLocations: ['Sydney', 'Melbourne', 'Brisbane'],
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function loadConfig(): AustralianSourcesConfig {
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(content) as AustralianSourcesConfig;
  } catch (error) {
    console.warn(`⚠️  Could not load config from ${CONFIG_PATH}, using defaults`);
    return DEFAULT_CONFIG;
  }
}

function isGovAuDomain(url: string): boolean {
  return url.includes('.gov.au');
}

function isWhitelistedDomain(url: string, config: AustralianSourcesConfig): boolean {
  const allDomains = [
    ...config.whitelist.government.domains,
    ...config.whitelist.industry.domains,
    ...config.whitelist.insurance.domains,
    ...config.whitelist.standards.domains,
  ];

  return allDomains.some(({ domain }) => {
    if (domain.startsWith('*.')) {
      const suffix = domain.slice(1);
      return url.includes(suffix);
    }
    return url.includes(domain);
  });
}

function isBlacklistedDomain(url: string, config: AustralianSourcesConfig): { blacklisted: boolean; reason?: string; alternative?: string } {
  const match = config.blacklist.domains.find(({ domain }) => {
    if (domain.startsWith('*.')) {
      const suffix = domain.slice(1);
      return url.includes(suffix) && !url.includes('.gov.au') && !url.includes('.org.au');
    }
    return url.includes(domain);
  });

  if (match) {
    return {
      blacklisted: true,
      reason: match.reason,
      alternative: match.suggestedAlternative,
    };
  }

  return { blacklisted: false };
}

function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
  return text.match(urlRegex) || [];
}

function countOccurrences(text: string, term: string): number {
  const regex = new RegExp(`\\b${term}\\b`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

function validateSources(content: string, config: AustralianSourcesConfig): { errors: ValidationError[]; warnings: ValidationWarning[]; stats: Partial<ValidationStats> } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const urls = extractUrls(content);
  
  let govAuCount = 0;
  let totalSources = 0;

  for (const url of urls) {
    totalSources++;
    
    if (isGovAuDomain(url)) {
      govAuCount++;
      continue;
    }

    if (isWhitelistedDomain(url, config)) {
      continue;
    }

    const blacklistCheck = isBlacklistedDomain(url, config);
    if (blacklistCheck.blacklisted) {
      errors.push({
        type: 'source',
        message: `Blacklisted domain found: ${url}`,
        suggestion: blacklistCheck.alternative ? `Use ${blacklistCheck.alternative} instead` : 'Replace with Australian equivalent',
      });
    } else {
      warnings.push({
        type: 'source',
        message: `Non-Australian source (not in whitelist): ${url}`,
      });
    }
  }

  // Check minimum requirements
  if (govAuCount < config.validationRules.minimumGovAuSources) {
    errors.push({
      type: 'source',
      message: `Insufficient .gov.au sources: ${govAuCount} found, minimum ${config.validationRules.minimumGovAuSources} required`,
    });
  }

  if (totalSources < config.validationRules.minimumTotalSources) {
    errors.push({
      type: 'source',
      message: `Insufficient total sources: ${totalSources} found, minimum ${config.validationRules.minimumTotalSources} required`,
    });
  }

  return {
    errors,
    warnings,
    stats: {
      govAuSources: govAuCount,
      totalSources,
    },
  };
}

function validateTerminology(content: string, config: AustralianSourcesConfig): { errors: ValidationError[]; warnings: ValidationWarning[]; stats: Partial<ValidationStats> } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  let prohibitedCount = 0;
  let australianTermCount = 0;

  // Check for prohibited terms
  for (const term of config.validationRules.prohibitedTerms) {
    const count = countOccurrences(content, term);
    if (count > 0) {
      prohibitedCount += count;
      errors.push({
        type: 'terminology',
        message: `Prohibited US term found: "${term}" (${count} occurrence${count > 1 ? 's' : ''})`,
        suggestion: getAustralianAlternative(term),
      });
    }
  }

  // Check for required Australian terms
  for (const term of config.validationRules.requiredAustralianTerms) {
    const count = countOccurrences(content, term);
    if (count > 0) {
      australianTermCount += count;
    }
  }

  return {
    errors,
    warnings,
    stats: {
      prohibitedTerms: prohibitedCount,
      australianTerms: australianTermCount,
    },
  };
}

function getAustralianAlternative(usTerm: string): string {
  const alternatives: Record<string, string> = {
    'OSHA': 'WorkSafe Australia / OH&S / WHS',
    'EPA': 'State EPA (EPA NSW, EPA Victoria, etc.)',
    'Fahrenheit': 'Celsius',
    'inches': 'millimetres',
    'feet': 'metres',
    'gallons': 'litres',
    'pounds': 'kilograms',
    'miles': 'kilometres',
  };
  return alternatives[usTerm] || 'Australian equivalent';
}

function validateAustralianContext(content: string, config: AustralianSourcesConfig): { errors: ValidationError[]; warnings: ValidationWarning[]; stats: Partial<ValidationStats> } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  let locationCount = 0;

  // Check for required Australian locations
  for (const location of config.australianContext.requiredLocations) {
    const count = countOccurrences(content, location);
    if (count > 0) {
      locationCount += count;
    }
  }

  if (locationCount === 0) {
    warnings.push({
      type: 'context',
      message: `No Australian location references found (expected at least one of: ${config.australianContext.requiredLocations.join(', ')})`,
    });
  }

  // Check for ABS statistics
  const absCount = countOccurrences(content, 'abs.gov.au');
  if (absCount === 0) {
    warnings.push({
      type: 'statistics',
      message: 'No ABS (Australian Bureau of Statistics) references found',
    });
  }

  return {
    errors,
    warnings,
    stats: {
      locationReferences: locationCount,
    },
  };
}

function validateModuleStructure(content: string): { errors: ValidationError[]; warnings: ValidationWarning[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for required sections
  const requiredSections = [
    { name: 'Sources', pattern: /##?\s*Sources/i },
    { name: 'Australian Context', pattern: /##?\s*Australian\s*Context/i },
    { name: 'DR-NRPG Process', pattern: /##?\s*DR-NRPG\s*Process/i },
  ];

  for (const section of requiredSections) {
    if (!section.pattern.test(content)) {
      errors.push({
        type: 'structure',
        message: `Missing required section: "${section.name}"`,
        suggestion: `Add a "${section.name}" section to the module`,
      });
    }
  }

  return { errors, warnings };
}

// ============================================================================
// MAIN VALIDATION
// ============================================================================

function validateFile(filePath: string, config: AustralianSourcesConfig): ValidationResult {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const sourceValidation = validateSources(content, config);
  const terminologyValidation = validateTerminology(content, config);
  const contextValidation = validateAustralianContext(content, config);
  const structureValidation = validateModuleStructure(content);

  const allErrors = [
    ...sourceValidation.errors,
    ...terminologyValidation.errors,
    ...contextValidation.errors,
    ...structureValidation.errors,
  ];

  const allWarnings = [
    ...sourceValidation.warnings,
    ...terminologyValidation.warnings,
    ...contextValidation.warnings,
    ...structureValidation.warnings,
  ];

  return {
    valid: allErrors.length === 0,
    filePath,
    errors: allErrors,
    warnings: allWarnings,
    stats: {
      totalLines: lines.length,
      govAuSources: sourceValidation.stats.govAuSources || 0,
      totalSources: sourceValidation.stats.totalSources || 0,
      australianTerms: terminologyValidation.stats.australianTerms || 0,
      prohibitedTerms: terminologyValidation.stats.prohibitedTerms || 0,
      locationReferences: contextValidation.stats.locationReferences || 0,
    },
  };
}

// ============================================================================
// REPORTING
// ============================================================================

function printResult(result: ValidationResult): void {
  const status = result.valid ? '✅' : '❌';
  const relativePath = path.relative(process.cwd(), result.filePath);
  
  console.log(`\n${status} ${relativePath}`);
  console.log(`   Lines: ${result.stats.totalLines} | Gov.au: ${result.stats.govAuSources} | Sources: ${result.stats.totalSources} | Locations: ${result.stats.locationReferences}`);

  if (result.errors.length > 0) {
    console.log('   Errors:');
    for (const error of result.errors) {
      console.log(`     ❌ [${error.type.toUpperCase()}] ${error.message}`);
      if (error.suggestion) {
        console.log(`        💡 ${error.suggestion}`);
      }
    }
  }

  if (result.warnings.length > 0) {
    console.log('   Warnings:');
    for (const warning of result.warnings) {
      console.log(`     ⚠️  [${warning.type.toUpperCase()}] ${warning.message}`);
    }
  }
}

function printSummary(results: ValidationResult[]): void {
  const totalFiles = results.length;
  const validFiles = results.filter(r => r.valid).length;
  const invalidFiles = totalFiles - validFiles;
  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files checked: ${totalFiles}`);
  console.log(`Valid: ${validFiles} ✅`);
  console.log(`Invalid: ${invalidFiles} ❌`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  console.log('='.repeat(60));

  if (invalidFiles > 0) {
    console.log('\n❌ VALIDATION FAILED - Fix errors before committing');
    process.exit(1);
  } else {
    console.log('\n✅ ALL FILES VALID - Ready for commit');
    process.exit(0);
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  console.log('🇦🇺 DR-NRPG Australian Source Validator');
  console.log('=' .repeat(60));

  const config = loadConfig();
  const targetPath = process.argv[2] || MODULES_PATH;

  console.log(`Checking: ${targetPath}`);
  console.log(`Config: ${CONFIG_PATH}`);
  console.log('');

  // Find all markdown files
  const pattern = path.join(targetPath, '**', '*.md');
  const files = await glob(pattern);

  if (files.length === 0) {
    console.log('No markdown files found.');
    process.exit(0);
  }

  console.log(`Found ${files.length} markdown files to validate\n`);

  const results: ValidationResult[] = [];

  for (const file of files) {
    const result = validateFile(file, config);
    results.push(result);
    printResult(result);
  }

  printSummary(results);
}

main().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});
