#!/usr/bin/env node

/**
 * Environment Variable Validator
 * Ensures all required environment variables are properly configured
 */

const fs = require('fs');
const path = require('path');

// Environment variable schema
const ENV_SCHEMA = {
  // Core application
  NEXT_PUBLIC_APP_URL: { required: true, type: 'url', description: 'Application URL' },
  NEXT_PUBLIC_SITE_URL: { required: true, type: 'url', description: 'Site URL' },
  NEXTAUTH_URL: { required: true, type: 'url', description: 'NextAuth URL' },

  // Security
  NEXTAUTH_SECRET: { required: true, type: 'string', minLength: 32, description: 'NextAuth secret key' },

  // Database
  DATABASE_URL: { required: true, type: 'string', description: 'Database connection string' },

  // Optional but recommended
  NEXT_PUBLIC_GA_MEASUREMENT_ID: { required: false, type: 'string', description: 'Google Analytics ID' },
  NEXT_PUBLIC_CLARITY_PROJECT_ID: { required: false, type: 'string', description: 'Microsoft Clarity ID' },

  // Build optimization
  NODE_ENV: { required: false, type: 'enum', values: ['development', 'production', 'test'], description: 'Node environment' },
  NEXT_TELEMETRY_DISABLED: { required: false, type: 'boolean', description: 'Disable Next.js telemetry' },

  // Business information
  NEXT_PUBLIC_BUSINESS_PHONE: { required: false, type: 'string', description: 'Business phone number' },
  NEXT_PUBLIC_BUSINESS_EMAIL: { required: false, type: 'email', description: 'Business email' }
};

class EnvValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  validateUrl(value, key) {
    try {
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol)) {
        this.errors.push(`${key}: Invalid protocol (must be http or https)`);
        return false;
      }
      return true;
    } catch (error) {
      this.errors.push(`${key}: Invalid URL format`);
      return false;
    }
  }

  validateEmail(value, key) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      this.errors.push(`${key}: Invalid email format`);
      return false;
    }
    return true;
  }

  validateEnum(value, values, key) {
    if (!values.includes(value)) {
      this.errors.push(`${key}: Must be one of [${values.join(', ')}]`);
      return false;
    }
    return true;
  }

  validateBoolean(value, key) {
    if (!['true', 'false', '1', '0'].includes(value.toLowerCase())) {
      this.warnings.push(`${key}: Should be a boolean value (true/false or 1/0)`);
      return false;
    }
    return true;
  }

  validateVariable(key, schema, value) {
    // Check if required
    if (schema.required && !value) {
      this.errors.push(`${key}: Required but not set - ${schema.description}`);
      return false;
    }

    // Skip validation if not set and not required
    if (!value && !schema.required) {
      this.info.push(`${key}: Optional variable not set - ${schema.description}`);
      return true;
    }

    // Type validation
    switch (schema.type) {
      case 'url':
        return this.validateUrl(value, key);

      case 'email':
        return this.validateEmail(value, key);

      case 'enum':
        return this.validateEnum(value, schema.values, key);

      case 'boolean':
        return this.validateBoolean(value, key);

      case 'string':
        if (schema.minLength && value.length < schema.minLength) {
          this.errors.push(`${key}: Must be at least ${schema.minLength} characters`);
          return false;
        }
        if (schema.maxLength && value.length > schema.maxLength) {
          this.warnings.push(`${key}: Longer than recommended ${schema.maxLength} characters`);
        }
        return true;

      default:
        return true;
    }
  }

  validate(env = process.env) {
    console.log('🔍 Validating environment variables...\n');

    // Validate all schema variables
    for (const [key, schema] of Object.entries(ENV_SCHEMA)) {
      const value = env[key];
      this.validateVariable(key, schema, value);
    }

    // Check for production-specific requirements
    if (env.NODE_ENV === 'production') {
      if (!env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        this.warnings.push('NEXT_PUBLIC_GA_MEASUREMENT_ID: Recommended for production analytics');
      }
    }

    // Report results
    this.printResults();

    return this.errors.length === 0;
  }

  printResults() {
    if (this.errors.length > 0) {
      console.log('❌ ERRORS:');
      this.errors.forEach(error => console.log(`   ${error}`));
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(`   ${warning}`));
      console.log('');
    }

    if (this.info.length > 0 && process.argv.includes('--verbose')) {
      console.log('ℹ️  INFO:');
      this.info.forEach(info => console.log(`   ${info}`));
      console.log('');
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All required environment variables are properly configured\n');
    }

    console.log('📊 Validation Summary:');
    console.log(`   Errors: ${this.errors.length}`);
    console.log(`   Warnings: ${this.warnings.length}`);
    console.log(`   Info: ${this.info.length}\n`);
  }

  generateEnvTemplate() {
    console.log('📝 Generating .env.template...\n');

    let template = '# Environment Configuration Template\n';
    template += '# Generated: ' + new Date().toISOString() + '\n\n';

    for (const [key, schema] of Object.entries(ENV_SCHEMA)) {
      template += `# ${schema.description}\n`;
      if (schema.required) {
        template += `# REQUIRED\n`;
      } else {
        template += `# OPTIONAL\n`;
      }
      if (schema.type) {
        template += `# Type: ${schema.type}\n`;
      }
      template += `${key}=\n\n`;
    }

    const templatePath = path.join(process.cwd(), '.env.template');
    fs.writeFileSync(templatePath, template);
    console.log(`✅ Template written to: ${templatePath}\n`);
  }
}

// Main execution
async function main() {
  const command = process.argv[2];
  const validator = new EnvValidator();

  if (command === 'generate-template') {
    validator.generateEnvTemplate();
    return;
  }

  const isValid = validator.validate();
  process.exit(isValid ? 0 : 1);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation error:', error);
    process.exit(1);
  });
}

module.exports = { EnvValidator, ENV_SCHEMA };
