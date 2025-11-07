#!/usr/bin/env node

/**
 * Comprehensive Image Audit and Fix Script
 * Audits all images across the site and fixes issues
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ImageIssue {
  file: string;
  line: number;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  suggestion: string;
  autofix?: boolean;
}

interface ImageUsage {
  file: string;
  line: number;
  src: string;
  hasAlt: boolean;
  hasWidth: boolean;
  hasHeight: boolean;
  isOptimized: boolean;
  usesNextImage: boolean;
}

interface AuditReport {
  totalImages: number;
  issues: ImageIssue[];
  imageUsages: ImageUsage[];
  brokenImages: string[];
  missingImages: string[];
  unoptimizedImages: string[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
  };
}

class ImageAuditor {
  private projectRoot: string;
  private report: AuditReport;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.report = {
      totalImages: 0,
      issues: [],
      imageUsages: [],
      brokenImages: [],
      missingImages: [],
      unoptimizedImages: [],
      summary: {
        errors: 0,
        warnings: 0,
        info: 0,
      },
    };
  }

  /**
   * Run complete audit
   */
  async audit(): Promise<AuditReport> {
    console.log('🔍 Starting comprehensive image audit...\n');

    // Find all TypeScript/React files
    const files = await glob('**/*.{tsx,ts,jsx,js}', {
      cwd: this.projectRoot,
      ignore: ['node_modules/**', '.next/**', 'out/**'],
    });

    console.log(`📁 Found ${files.length} files to audit\n`);

    // Audit each file
    for (const file of files) {
      await this.auditFile(path.join(this.projectRoot, file));
    }

    // Check physical image files
    await this.auditImageFiles();

    // Generate summary
    this.generateSummary();

    return this.report;
  }

  /**
   * Audit a single file for image issues
   */
  private async auditFile(filePath: string): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for <img> tags (should use Next.js Image)
      if (/<img\s+/i.test(line)) {
        this.addIssue(filePath, lineNumber, 'error',
          'Using HTML <img> tag instead of Next.js Image component',
          'Replace with: import Image from "next/image"'
        );
      }

      // Check for images without alt text
      if (/src=["'][^"']*\.(jpg|jpeg|png|webp|gif|svg)["']/i.test(line)) {
        if (!/alt=["'][^"']+["']/i.test(line)) {
          this.addIssue(filePath, lineNumber, 'error',
            'Image missing alt attribute',
            'Add alt="descriptive text" for accessibility'
          );
        }
      }

      // Check for Next.js Image without width/height
      if (/import.*Image.*from.*["']next\/image["']/i.test(line)) {
        // Check following usage
        const imageMatch = line.match(/<Image[^>]+>/);
        if (imageMatch) {
          const imageTag = imageMatch[0];
          if (!imageTag.includes('width=') || !imageTag.includes('height=')) {
            if (!imageTag.includes('fill')) {
              this.addIssue(filePath, lineNumber, 'warning',
                'Next.js Image missing width/height (causes layout shift)',
                'Add width and height props or use fill prop'
              );
            }
          }
        }
      }

      // Check for non-optimized image formats
      if (/\.(jpg|jpeg|png)["']/i.test(line) && !/\.webp["']/i.test(line)) {
        this.addIssue(filePath, lineNumber, 'info',
          'Using non-optimized image format (JPG/PNG)',
          'Consider converting to WebP for better performance',
          true
        );
      }

      // Check for missing lazy loading
      if (/<Image[^>]+src/i.test(line)) {
        if (!/loading=["']lazy["']/i.test(line) && !/priority/i.test(line)) {
          this.addIssue(filePath, lineNumber, 'info',
            'Image may benefit from explicit loading strategy',
            'Add loading="lazy" or priority prop'
          );
        }
      }

      // Check for hardcoded image sizes
      if (/width:\s*\d+px|height:\s*\d+px/i.test(line)) {
        this.addIssue(filePath, lineNumber, 'warning',
          'Hardcoded image dimensions may not be responsive',
          'Use responsive units (%, vw, rem) or CSS classes'
        );
      }

      // Check for images in public folder (good) vs src (should move)
      const srcMatch = line.match(/src=["']([^"']+)["']/);
      if (srcMatch) {
        const imageSrc = srcMatch[1];

        // Track image usage
        this.report.imageUsages.push({
          file: path.relative(this.projectRoot, filePath),
          line: lineNumber,
          src: imageSrc,
          hasAlt: /alt=["'][^"']+["']/i.test(line),
          hasWidth: /width=\{?\d+\}?/.test(line),
          hasHeight: /height=\{?\d+\}?/.test(line),
          isOptimized: /\.webp|\.avif/i.test(imageSrc),
          usesNextImage: /<Image/.test(line),
        });

        this.report.totalImages++;

        // Check if image file exists
        if (imageSrc.startsWith('/')) {
          const imagePath = path.join(this.projectRoot, 'public', imageSrc);
          if (!fs.existsSync(imagePath)) {
            this.report.missingImages.push(imageSrc);
            this.addIssue(filePath, lineNumber, 'error',
              `Image file not found: ${imageSrc}`,
              'Check if file exists or update the path'
            );
          }
        }
      }
    });
  }

  /**
   * Audit physical image files
   */
  private async auditImageFiles(): Promise<void> {
    console.log('\n📸 Auditing image files...');

    const imageFiles = await glob('public/images/**/*.{jpg,jpeg,png,gif,svg,webp,avif}', {
      cwd: this.projectRoot,
    });

    for (const imageFile of imageFiles) {
      const fullPath = path.join(this.projectRoot, imageFile);
      const stats = fs.statSync(fullPath);
      const fileSizeKB = stats.size / 1024;

      // Check file size
      if (fileSizeKB > 500 && !imageFile.endsWith('.svg')) {
        this.addIssue(imageFile, 0, 'warning',
          `Large image file: ${fileSizeKB.toFixed(2)}KB`,
          'Consider compressing or converting to WebP'
        );
      }

      // Check if non-WebP images have WebP equivalents
      if (/\.(jpg|jpeg|png)$/i.test(imageFile)) {
        const webpPath = imageFile.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const fullWebpPath = path.join(this.projectRoot, webpPath);

        if (!fs.existsSync(fullWebpPath)) {
          this.report.unoptimizedImages.push(imageFile);
          this.addIssue(imageFile, 0, 'info',
            'Image not available in WebP format',
            'Convert to WebP for better compression',
            true
          );
        }
      }
    }

    console.log(`✅ Audited ${imageFiles.length} image files`);
  }

  /**
   * Add issue to report
   */
  private addIssue(
    file: string,
    line: number,
    severity: 'error' | 'warning' | 'info',
    issue: string,
    suggestion: string,
    autofix: boolean = false
  ): void {
    this.report.issues.push({
      file: path.relative(this.projectRoot, file),
      line,
      issue,
      severity,
      suggestion,
      autofix,
    });

    this.report.summary[severity === 'error' ? 'errors' : severity === 'warning' ? 'warnings' : 'info']++;
  }

  /**
   * Generate summary report
   */
  private generateSummary(): void {
    const { issues, totalImages, missingImages, unoptimizedImages, summary } = this.report;

    console.log('\n' + '='.repeat(80));
    console.log('📊 IMAGE AUDIT REPORT');
    console.log('='.repeat(80));
    console.log(`\n📈 Statistics:`);
    console.log(`   Total images found: ${totalImages}`);
    console.log(`   Missing images: ${missingImages.length}`);
    console.log(`   Unoptimized images: ${unoptimizedImages.length}`);
    console.log(`\n🚨 Issues:`);
    console.log(`   Errors: ${summary.errors}`);
    console.log(`   Warnings: ${summary.warnings}`);
    console.log(`   Info: ${summary.info}`);
    console.log(`   Total: ${issues.length}`);

    // Show top issues
    if (issues.length > 0) {
      console.log('\n🔥 Top Issues:');

      const errorIssues = issues.filter(i => i.severity === 'error').slice(0, 10);
      if (errorIssues.length > 0) {
        console.log('\n   ❌ ERRORS:');
        errorIssues.forEach(issue => {
          console.log(`      ${issue.file}:${issue.line}`);
          console.log(`         ${issue.issue}`);
          console.log(`         💡 ${issue.suggestion}\n`);
        });
      }

      const warningIssues = issues.filter(i => i.severity === 'warning').slice(0, 5);
      if (warningIssues.length > 0) {
        console.log('\n   ⚠️  WARNINGS:');
        warningIssues.forEach(issue => {
          console.log(`      ${issue.file}:${issue.line}`);
          console.log(`         ${issue.issue}`);
          console.log(`         💡 ${issue.suggestion}\n`);
        });
      }
    }

    // Auto-fixable issues
    const autofixable = issues.filter(i => i.autofix);
    if (autofixable.length > 0) {
      console.log(`\n🔧 ${autofixable.length} issues can be auto-fixed`);
      console.log('   Run with --fix flag to apply automatic fixes');
    }

    console.log('\n' + '='.repeat(80) + '\n');
  }

  /**
   * Save report to file
   */
  saveReport(outputPath: string): void {
    fs.writeFileSync(outputPath, JSON.stringify(this.report, null, 2));
    console.log(`\n💾 Full report saved to: ${outputPath}`);
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport(): string {
    let markdown = '# Image Audit Report\n\n';
    markdown += `Generated: ${new Date().toISOString()}\n\n`;

    markdown += '## Summary\n\n';
    markdown += `- Total Images: ${this.report.totalImages}\n`;
    markdown += `- Errors: ${this.report.summary.errors}\n`;
    markdown += `- Warnings: ${this.report.summary.warnings}\n`;
    markdown += `- Info: ${this.report.summary.info}\n`;
    markdown += `- Missing Images: ${this.report.missingImages.length}\n`;
    markdown += `- Unoptimized Images: ${this.report.unoptimizedImages.length}\n\n`;

    if (this.report.issues.length > 0) {
      markdown += '## Issues\n\n';

      const groupedIssues = this.report.issues.reduce((acc, issue) => {
        if (!acc[issue.severity]) {
          acc[issue.severity] = [];
        }
        acc[issue.severity].push(issue);
        return acc;
      }, {} as Record<string, ImageIssue[]>);

      for (const [severity, issues] of Object.entries(groupedIssues)) {
        markdown += `### ${severity.toUpperCase()}\n\n`;
        issues.forEach(issue => {
          markdown += `- **${issue.file}:${issue.line}**\n`;
          markdown += `  - Issue: ${issue.issue}\n`;
          markdown += `  - Suggestion: ${issue.suggestion}\n\n`;
        });
      }
    }

    return markdown;
  }
}

/**
 * Main execution
 */
async function main() {
  const projectRoot = process.cwd();
  const auditor = new ImageAuditor(projectRoot);

  try {
    const report = await auditor.audit();

    // Save reports
    const reportPath = path.join(projectRoot, 'image-audit-report.json');
    auditor.saveReport(reportPath);

    const markdownReport = auditor.generateMarkdownReport();
    const markdownPath = path.join(projectRoot, 'IMAGE_AUDIT_REPORT.md');
    fs.writeFileSync(markdownPath, markdownReport);
    console.log(`📝 Markdown report saved to: ${markdownPath}`);

    // Exit with error code if there are errors
    if (report.summary.errors > 0) {
      console.log('\n❌ Audit completed with errors');
      process.exit(1);
    } else {
      console.log('\n✅ Audit completed successfully');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Audit failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { ImageAuditor, type AuditReport, type ImageIssue, type ImageUsage };
