/**
 * Validate all schema implementations
 * Run with: npx tsx scripts/validate-schemas.ts
 */

import {
  generateLocalBusinessSchema,
  generatePersonSchema,
  SERVICE_SCHEMAS,
  LOCATION_SCHEMAS,
  generateFAQPageSchema,
  generateBreadcrumbSchema
} from '../lib/seo/comprehensive-schema';

import {
  validateSchema,
  printValidationResult
} from '../lib/seo/schema-validator';

function main() {
  console.log('🔍 SCHEMA VALIDATION REPORT');
  console.log('='.repeat(60));

  // Validate LocalBusiness schema
  const localBusiness = generateLocalBusinessSchema();
  const localBusinessResult = validateSchema(localBusiness);
  printValidationResult('LocalBusiness Schema', localBusinessResult);

  // Validate Person schema
  const person = generatePersonSchema();
  const personResult = validateSchema(person);
  printValidationResult('Person Schema (Phill McGurk)', personResult);

  // Validate Service schemas
  console.log('\n\n📋 SERVICE SCHEMAS:');
  console.log('='.repeat(60));

  const serviceSchemas = [
    { name: 'Water Damage Restoration', schema: SERVICE_SCHEMAS.waterDamage() },
    { name: 'Fire Damage Restoration', schema: SERVICE_SCHEMAS.fireDamage() },
    { name: 'Mould Remediation', schema: SERVICE_SCHEMAS.mouldRemediation() },
    { name: 'Storm Damage Restoration', schema: SERVICE_SCHEMAS.stormDamage() },
    { name: 'Flood Recovery', schema: SERVICE_SCHEMAS.floodRecovery() },
    { name: 'Commercial Services', schema: SERVICE_SCHEMAS.commercialServices() },
    { name: 'Biohazard Cleanup', schema: SERVICE_SCHEMAS.biohazardCleanup() }
  ];

  serviceSchemas.forEach(({ name, schema }) => {
    const result = validateSchema(schema);
    printValidationResult(name, result);
  });

  // Validate Location schemas
  console.log('\n\n📍 LOCATION SCHEMAS:');
  console.log('='.repeat(60));

  const locationSchemas = [
    { name: 'Hamilton', schema: LOCATION_SCHEMAS.hamilton() },
    { name: 'Ascot', schema: LOCATION_SCHEMAS.ascot() },
    { name: 'New Farm', schema: LOCATION_SCHEMAS.newFarm() },
    { name: 'Toowong', schema: LOCATION_SCHEMAS.toowong() },
    { name: 'Karalee', schema: LOCATION_SCHEMAS.karalee() },
    { name: 'Brookwater', schema: LOCATION_SCHEMAS.brookwater() },
    { name: 'Springfield Lakes', schema: LOCATION_SCHEMAS.springfieldLakes() }
  ];

  locationSchemas.forEach(({ name, schema }) => {
    const result = validateSchema(schema);
    printValidationResult(name, result);
  });

  // Validate FAQ schema
  console.log('\n\n❓ FAQ SCHEMA:');
  console.log('='.repeat(60));

  const faqSchema = generateFAQPageSchema([
    {
      question: 'How quickly can you respond to emergencies in Brisbane?',
      answer: 'We respond within 60 minutes to Brisbane CBD and inner suburbs.'
    },
    {
      question: 'Do you work with insurance companies?',
      answer: 'Yes, we work with all major Australian insurance companies.'
    }
  ]);

  const faqResult = validateSchema(faqSchema);
  printValidationResult('FAQPage Schema', faqResult);

  // Validate Breadcrumb schema
  console.log('\n\n🍞 BREADCRUMB SCHEMA:');
  console.log('='.repeat(60));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://disasterrecovery.com.au' },
    { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
    { name: 'Water Damage', url: 'https://disasterrecovery.com.au/services/water-damage' }
  ]);

  const breadcrumbResult = validateSchema(breadcrumbSchema);
  printValidationResult('BreadcrumbList Schema', breadcrumbResult);

  // Summary
  console.log('\n\n📊 VALIDATION SUMMARY:');
  console.log('='.repeat(60));

  const allResults = [
    localBusinessResult,
    personResult,
    ...serviceSchemas.map(s => validateSchema(s.schema)),
    ...locationSchemas.map(l => validateSchema(l.schema)),
    faqResult,
    breadcrumbResult
  ];

  const totalSchemas = allResults.length;
  const validSchemas = allResults.filter(r => r.valid).length;
  const totalErrors = allResults.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = allResults.reduce((sum, r) => sum + r.warnings.length, 0);

  console.log(`Total Schemas Validated: ${totalSchemas}`);
  console.log(`Valid Schemas: ${validSchemas} ✅`);
  console.log(`Invalid Schemas: ${totalSchemas - validSchemas} ❌`);
  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);

  if (validSchemas === totalSchemas) {
    console.log('\n✅ ALL SCHEMAS VALID!');
  } else {
    console.log('\n❌ SOME SCHEMAS HAVE ERRORS - PLEASE REVIEW ABOVE');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Test schemas with Google Rich Results Test:');
  console.log('   https://search.google.com/test/rich-results');
  console.log('2. Test with Schema Markup Validator:');
  console.log('   https://validator.schema.org/');
  console.log('3. Monitor Google Search Console for structured data issues');
  console.log('4. Use Schema.org validator for comprehensive testing\n');
}

main();
