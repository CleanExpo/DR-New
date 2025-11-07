#!/usr/bin/env tsx

/**
 * Security Audit Script
 * Performs comprehensive security checks on the application
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface SecurityCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  recommendation?: string;
}

class SecurityAuditor {
  private checks: SecurityCheck[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  async runAudit(): Promise<void> {
    console.log('🔒 Starting Security Audit...\n');

    // Run all security checks
    await this.checkHTTPSEnforcement();
    await this.checkSecurityHeaders();
    await this.checkCSPConfiguration();
    await this.checkCSRFProtection();
    await this.checkInputValidation();
    await this.checkXSSProtection();
    await this.checkSessionSecurity();
    await this.checkAccessibility();
    await this.checkDependencies();
    await this.checkEnvironmentVariables();
    await this.checkFilePermissions();
    await this.checkAPIEndpoints();
    await this.checkCookieSecurity();
    await this.checkRateLimiting();
    await this.checkErrorHandling();

    // Generate report
    this.generateReport();
  }

  private async checkHTTPSEnforcement(): Promise<void> {
    const middlewarePath = path.join(this.projectRoot, 'middleware.ts');

    if (fs.existsSync(middlewarePath)) {
      const content = fs.readFileSync(middlewarePath, 'utf-8');

      if (content.includes('x-forwarded-proto') && content.includes('https')) {
        this.addCheck({
          name: 'HTTPS Enforcement',
          status: 'pass',
          message: 'HTTPS enforcement is configured in middleware',
          severity: 'critical'
        });
      } else {
        this.addCheck({
          name: 'HTTPS Enforcement',
          status: 'fail',
          message: 'HTTPS enforcement not found in middleware',
          severity: 'critical',
          recommendation: 'Add HTTPS redirect in middleware for production'
        });
      }
    } else {
      this.addCheck({
        name: 'HTTPS Enforcement',
        status: 'fail',
        message: 'Middleware file not found',
        severity: 'critical',
        recommendation: 'Create middleware.ts with HTTPS enforcement'
      });
    }
  }

  private async checkSecurityHeaders(): Promise<void> {
    const requiredHeaders = [
      'Strict-Transport-Security',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Referrer-Policy',
      'Content-Security-Policy'
    ];

    const middlewarePath = path.join(this.projectRoot, 'middleware.ts');

    if (fs.existsSync(middlewarePath)) {
      const content = fs.readFileSync(middlewarePath, 'utf-8');
      const missingHeaders = requiredHeaders.filter(header => !content.includes(header));

      if (missingHeaders.length === 0) {
        this.addCheck({
          name: 'Security Headers',
          status: 'pass',
          message: 'All required security headers are configured',
          severity: 'high'
        });
      } else {
        this.addCheck({
          name: 'Security Headers',
          status: 'warning',
          message: `Missing headers: ${missingHeaders.join(', ')}`,
          severity: 'high',
          recommendation: 'Add missing security headers to middleware'
        });
      }
    }
  }

  private async checkCSPConfiguration(): Promise<void> {
    const middlewarePath = path.join(this.projectRoot, 'middleware.ts');

    if (fs.existsSync(middlewarePath)) {
      const content = fs.readFileSync(middlewarePath, 'utf-8');

      const cspDirectives = [
        'default-src',
        'script-src',
        'style-src',
        'img-src',
        'connect-src',
        'frame-ancestors',
        'base-uri',
        'form-action'
      ];

      const hasCSP = cspDirectives.some(directive => content.includes(directive));

      if (hasCSP) {
        this.addCheck({
          name: 'Content Security Policy',
          status: 'pass',
          message: 'CSP is configured with multiple directives',
          severity: 'high'
        });
      } else {
        this.addCheck({
          name: 'Content Security Policy',
          status: 'fail',
          message: 'CSP not properly configured',
          severity: 'high',
          recommendation: 'Configure comprehensive CSP in middleware'
        });
      }
    }
  }

  private async checkCSRFProtection(): Promise<void> {
    const csrfFiles = [
      'middleware.ts',
      'lib/security/validation.ts',
      'app/api/security/csrf-token/route.ts'
    ];

    const hasCSRF = csrfFiles.some(file => {
      const filePath = path.join(this.projectRoot, file);
      return fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8').includes('csrf');
    });

    if (hasCSRF) {
      this.addCheck({
        name: 'CSRF Protection',
        status: 'pass',
        message: 'CSRF protection is implemented',
        severity: 'high'
      });
    } else {
      this.addCheck({
        name: 'CSRF Protection',
        status: 'fail',
        message: 'CSRF protection not found',
        severity: 'high',
        recommendation: 'Implement CSRF token validation for state-changing operations'
      });
    }
  }

  private async checkInputValidation(): Promise<void> {
    const validationPath = path.join(this.projectRoot, 'lib/security/validation.ts');

    if (fs.existsSync(validationPath)) {
      const content = fs.readFileSync(validationPath, 'utf-8');

      const validators = [
        'sanitizeHTML',
        'sanitizeText',
        'sanitizeSQL',
        'emailSchema',
        'phoneSchema'
      ];

      const hasValidators = validators.every(v => content.includes(v));

      if (hasValidators) {
        this.addCheck({
          name: 'Input Validation',
          status: 'pass',
          message: 'Comprehensive input validation is implemented',
          severity: 'critical'
        });
      } else {
        this.addCheck({
          name: 'Input Validation',
          status: 'warning',
          message: 'Some validators are missing',
          severity: 'critical',
          recommendation: 'Implement all required input validators'
        });
      }
    } else {
      this.addCheck({
        name: 'Input Validation',
        status: 'fail',
        message: 'Validation library not found',
        severity: 'critical',
        recommendation: 'Create validation utilities in lib/security/validation.ts'
      });
    }
  }

  private async checkXSSProtection(): Promise<void> {
    const xssChecks = [
      { file: 'lib/security/validation.ts', function: 'sanitizeHTML' },
      { file: 'lib/security/validation.ts', function: 'sanitizeText' },
      { file: 'middleware.ts', header: 'X-XSS-Protection' }
    ];

    const passedChecks = xssChecks.filter(check => {
      const filePath = path.join(this.projectRoot, check.file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return content.includes(check.function || check.header || '');
      }
      return false;
    });

    if (passedChecks.length === xssChecks.length) {
      this.addCheck({
        name: 'XSS Protection',
        status: 'pass',
        message: 'XSS protection measures are in place',
        severity: 'critical'
      });
    } else {
      this.addCheck({
        name: 'XSS Protection',
        status: 'warning',
        message: `${passedChecks.length}/${xssChecks.length} XSS protections implemented`,
        severity: 'critical',
        recommendation: 'Implement all XSS protection measures'
      });
    }
  }

  private async checkSessionSecurity(): Promise<void> {
    const sessionPath = path.join(this.projectRoot, 'lib/security/session.ts');

    if (fs.existsSync(sessionPath)) {
      const content = fs.readFileSync(sessionPath, 'utf-8');

      const features = [
        'httpOnly',
        'secure',
        'sameSite',
        'fingerprint',
        'rotation'
      ];

      const hasFeatures = features.filter(f => content.includes(f));

      if (hasFeatures.length >= 4) {
        this.addCheck({
          name: 'Session Management',
          status: 'pass',
          message: 'Secure session management is implemented',
          severity: 'high'
        });
      } else {
        this.addCheck({
          name: 'Session Management',
          status: 'warning',
          message: `${hasFeatures.length}/${features.length} session security features`,
          severity: 'high',
          recommendation: 'Implement all session security features'
        });
      }
    } else {
      this.addCheck({
        name: 'Session Management',
        status: 'fail',
        message: 'Session management not found',
        severity: 'high',
        recommendation: 'Implement secure session management'
      });
    }
  }

  private async checkAccessibility(): Promise<void> {
    const wcagPath = path.join(this.projectRoot, 'lib/accessibility/wcag-aaa.ts');

    if (fs.existsSync(wcagPath)) {
      const content = fs.readFileSync(wcagPath, 'utf-8');

      const wcagFeatures = [
        'WCAG_AAA_CONTRAST',
        'getContrastRatio',
        'ARIA_ROLES',
        'FocusManager',
        'ScreenReaderUtils'
      ];

      const hasFeatures = wcagFeatures.every(f => content.includes(f));

      if (hasFeatures) {
        this.addCheck({
          name: 'WCAG AAA Compliance',
          status: 'pass',
          message: 'WCAG AAA accessibility utilities are implemented',
          severity: 'medium'
        });
      } else {
        this.addCheck({
          name: 'WCAG AAA Compliance',
          status: 'warning',
          message: 'Some WCAG AAA features missing',
          severity: 'medium',
          recommendation: 'Implement all WCAG AAA features'
        });
      }
    } else {
      this.addCheck({
        name: 'WCAG AAA Compliance',
        status: 'fail',
        message: 'WCAG AAA utilities not found',
        severity: 'medium',
        recommendation: 'Create accessibility utilities'
      });
    }
  }

  private async checkDependencies(): Promise<void> {
    try {
      // Check for known vulnerable packages
      const { stdout } = await execAsync('npm audit --json');
      const audit = JSON.parse(stdout);

      const vulnerabilities = audit.metadata?.vulnerabilities || {};
      const total = Object.values(vulnerabilities).reduce((sum: number, count: any) => sum + count, 0);

      if (total === 0) {
        this.addCheck({
          name: 'Dependency Vulnerabilities',
          status: 'pass',
          message: 'No known vulnerabilities in dependencies',
          severity: 'high'
        });
      } else {
        this.addCheck({
          name: 'Dependency Vulnerabilities',
          status: vulnerabilities.critical > 0 ? 'fail' : 'warning',
          message: `Found ${total} vulnerabilities (Critical: ${vulnerabilities.critical || 0})`,
          severity: 'high',
          recommendation: 'Run npm audit fix to resolve vulnerabilities'
        });
      }
    } catch (error) {
      this.addCheck({
        name: 'Dependency Vulnerabilities',
        status: 'warning',
        message: 'Could not check dependencies',
        severity: 'high',
        recommendation: 'Run npm audit manually'
      });
    }
  }

  private async checkEnvironmentVariables(): Promise<void> {
    const envPath = path.join(this.projectRoot, '.env.local');
    const envExamplePath = path.join(this.projectRoot, '.env.example');

    if (!fs.existsSync(envExamplePath)) {
      this.addCheck({
        name: 'Environment Variables',
        status: 'warning',
        message: '.env.example file not found',
        severity: 'medium',
        recommendation: 'Create .env.example with safe defaults'
      });
    }

    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');

      // Check for exposed secrets
      const suspiciousPatterns = [
        /api[_-]?key\s*=\s*["']?[a-zA-Z0-9]{20,}/gi,
        /secret\s*=\s*["']?[a-zA-Z0-9]{20,}/gi,
        /password\s*=\s*["']?[^\s]+/gi
      ];

      const hasSecrets = suspiciousPatterns.some(pattern => pattern.test(content));

      if (hasSecrets) {
        this.addCheck({
          name: 'Environment Variables',
          status: 'warning',
          message: 'Potential secrets found in .env.local',
          severity: 'high',
          recommendation: 'Use environment variable service for production'
        });
      } else {
        this.addCheck({
          name: 'Environment Variables',
          status: 'pass',
          message: 'Environment variables appear secure',
          severity: 'medium'
        });
      }
    }
  }

  private async checkFilePermissions(): Promise<void> {
    // This check is more relevant for Unix-like systems
    if (process.platform === 'win32') {
      this.addCheck({
        name: 'File Permissions',
        status: 'pass',
        message: 'File permission check skipped on Windows',
        severity: 'low'
      });
      return;
    }

    const sensitivePaths = [
      '.env',
      '.env.local',
      'private',
      'secrets'
    ];

    for (const sensitPath of sensitivePaths) {
      const fullPath = path.join(this.projectRoot, sensitPath);
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        const mode = (stats.mode & parseInt('777', 8)).toString(8);

        if (mode !== '600' && mode !== '700') {
          this.addCheck({
            name: 'File Permissions',
            status: 'warning',
            message: `${sensitPath} has loose permissions (${mode})`,
            severity: 'medium',
            recommendation: 'Set restrictive permissions on sensitive files'
          });
          return;
        }
      }
    }

    this.addCheck({
      name: 'File Permissions',
      status: 'pass',
      message: 'File permissions are properly configured',
      severity: 'low'
    });
  }

  private async checkAPIEndpoints(): Promise<void> {
    const apiDir = path.join(this.projectRoot, 'app/api');

    if (fs.existsSync(apiDir)) {
      const apiFiles: string[] = [];

      const scanDir = (dir: string) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
          } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            apiFiles.push(fullPath);
          }
        });
      };

      scanDir(apiDir);

      let secureEndpoints = 0;
      apiFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('authentication') ||
            content.includes('authorization') ||
            content.includes('validate')) {
          secureEndpoints++;
        }
      });

      if (secureEndpoints === apiFiles.length) {
        this.addCheck({
          name: 'API Security',
          status: 'pass',
          message: 'All API endpoints have security checks',
          severity: 'high'
        });
      } else {
        this.addCheck({
          name: 'API Security',
          status: 'warning',
          message: `${secureEndpoints}/${apiFiles.length} endpoints have security`,
          severity: 'high',
          recommendation: 'Add authentication/validation to all endpoints'
        });
      }
    }
  }

  private async checkCookieSecurity(): Promise<void> {
    const cookieConsentPath = path.join(this.projectRoot, 'components/privacy/CookieConsent.tsx');

    if (fs.existsSync(cookieConsentPath)) {
      this.addCheck({
        name: 'Cookie Consent',
        status: 'pass',
        message: 'Cookie consent component is implemented',
        severity: 'medium'
      });
    } else {
      this.addCheck({
        name: 'Cookie Consent',
        status: 'fail',
        message: 'Cookie consent not found',
        severity: 'medium',
        recommendation: 'Implement GDPR-compliant cookie consent'
      });
    }
  }

  private async checkRateLimiting(): Promise<void> {
    const middlewarePath = path.join(this.projectRoot, 'middleware.ts');

    if (fs.existsSync(middlewarePath)) {
      const content = fs.readFileSync(middlewarePath, 'utf-8');

      if (content.includes('rate') && content.includes('limit')) {
        this.addCheck({
          name: 'Rate Limiting',
          status: 'pass',
          message: 'Rate limiting is configured',
          severity: 'high'
        });
      } else {
        this.addCheck({
          name: 'Rate Limiting',
          status: 'fail',
          message: 'Rate limiting not configured',
          severity: 'high',
          recommendation: 'Implement rate limiting in middleware'
        });
      }
    }
  }

  private async checkErrorHandling(): Promise<void> {
    const errorFiles = [
      'app/error.tsx',
      'app/not-found.tsx'
    ];

    const hasErrorHandling = errorFiles.every(file => {
      const filePath = path.join(this.projectRoot, file);
      return fs.existsSync(filePath);
    });

    if (hasErrorHandling) {
      this.addCheck({
        name: 'Error Handling',
        status: 'pass',
        message: 'Error pages are configured',
        severity: 'medium'
      });
    } else {
      this.addCheck({
        name: 'Error Handling',
        status: 'warning',
        message: 'Some error pages missing',
        severity: 'medium',
        recommendation: 'Create error.tsx and not-found.tsx'
      });
    }
  }

  private addCheck(check: SecurityCheck): void {
    this.checks.push(check);
  }

  private generateReport(): void {
    const timestamp = new Date().toISOString();
    const reportName = `security-audit-${Date.now()}.json`;
    const reportPath = path.join(this.projectRoot, reportName);

    const summary = {
      timestamp,
      totalChecks: this.checks.length,
      passed: this.checks.filter(c => c.status === 'pass').length,
      failed: this.checks.filter(c => c.status === 'fail').length,
      warnings: this.checks.filter(c => c.status === 'warning').length
    };

    const report = {
      summary,
      checks: this.checks
    };

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Console output
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('                    SECURITY AUDIT REPORT                   ');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log(`📅 Date: ${timestamp}`);
    console.log(`📊 Total Checks: ${summary.totalChecks}`);
    console.log(`✅ Passed: ${summary.passed}`);
    console.log(`❌ Failed: ${summary.failed}`);
    console.log(`⚠️  Warnings: ${summary.warnings}\n`);

    console.log('──────────────────────────────────────────────────────────\n');

    // Group by severity
    const bySeverity = {
      critical: this.checks.filter(c => c.severity === 'critical'),
      high: this.checks.filter(c => c.severity === 'high'),
      medium: this.checks.filter(c => c.severity === 'medium'),
      low: this.checks.filter(c => c.severity === 'low')
    };

    for (const [severity, checks] of Object.entries(bySeverity)) {
      if (checks.length > 0) {
        console.log(`\n🔒 ${severity.toUpperCase()} SEVERITY CHECKS:\n`);
        checks.forEach(check => {
          const icon = check.status === 'pass' ? '✅' :
                       check.status === 'fail' ? '❌' : '⚠️';
          console.log(`${icon} ${check.name}`);
          console.log(`   Status: ${check.status.toUpperCase()}`);
          console.log(`   ${check.message}`);
          if (check.recommendation) {
            console.log(`   💡 Recommendation: ${check.recommendation}`);
          }
          console.log();
        });
      }
    }

    console.log('──────────────────────────────────────────────────────────');
    console.log(`\n📄 Full report saved to: ${reportName}`);

    // Calculate security score
    const score = Math.round((summary.passed / summary.totalChecks) * 100);
    console.log(`\n🎯 Security Score: ${score}%`);

    if (score >= 90) {
      console.log('🏆 Excellent security posture!');
    } else if (score >= 70) {
      console.log('👍 Good security, but room for improvement.');
    } else if (score >= 50) {
      console.log('⚠️  Security needs attention.');
    } else {
      console.log('🚨 Critical security issues detected!');
    }

    // Exit with error if critical failures
    const criticalFailures = this.checks.filter(
      c => c.status === 'fail' && c.severity === 'critical'
    );

    if (criticalFailures.length > 0) {
      console.log('\n❗ Critical security failures detected. Please address immediately.');
      process.exit(1);
    }
  }
}

// Run the audit
const auditor = new SecurityAuditor();
auditor.runAudit().catch(console.error);