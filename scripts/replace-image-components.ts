#!/usr/bin/env node

/**
 * Replace Image Components Script
 * Automatically replaces HTML img tags and basic Image usage
 * with optimized OptimizedImage component
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface Replacement {
  file: string;
  line: number;
  original: string;
  replacement: string;
  type: 'img-to-Image' | 'Image-to-OptimizedImage' | 'add-dimensions' | 'add-alt';
}

interface ReplacementStats {
  filesProcessed: number;
  filesModified: number;
  replacements: Replacement[];
  errors: Array<{ file: string; error: string }>;
}

class ImageComponentReplacer {
  private projectRoot: string;
  private stats: ReplacementStats;
  private dryRun: boolean;

  constructor(projectRoot: string, dryRun: boolean = false) {
    this.projectRoot = projectRoot;
    this.dryRun = dryRun;
    this.stats = {
      filesProcessed: 0,
      filesModified: 0,
      replacements: [],
      errors: [],
    };
  }

  /**
   * Process all files
   */
  async processAll(): Promise<ReplacementStats> {
    console.log('🔄 Starting image component replacement...');
    console.log(`Mode: ${this.dryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (files will be modified)'}\n`);

    // Find all TypeScript/React files
    const files = await glob('**/*.{tsx,ts,jsx,js}', {
      cwd: this.projectRoot,
      ignore: [
        'node_modules/**',
        '.next/**',
        'out/**',
        'dist/**',
        'scripts/**',
        'lib/image-optimization/**',
        'components/image-optimization/**',
      ],
    });

    console.log(`📁 Found ${files.length} files to process\n`);

    for (const file of files) {
      await this.processFile(path.join(this.projectRoot, file));
    }

    this.printSummary();
    return this.stats;
  }

  /**
   * Process a single file
   */
  private async processFile(filePath: string): Promise<void> {
    this.stats.filesProcessed++;

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      let modified = content;
      let hasChanges = false;
      const lines = content.split('\n');

      // Check if already using OptimizedImage
      if (content.includes('from \'@/components/image-optimization\'') ||
          content.includes('from "@/components/image-optimization"')) {
        return; // Already using optimized images
      }

      // Step 1: Replace <img> tags with Image
      const imgRegex = /<img([^>]*)src=["']([^"']+)["']([^>]*)>/gi;
      let match;
      let lineNumber = 1;

      while ((match = imgRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const beforeSrc = match[1];
        const src = match[2];
        const afterSrc = match[3];

        // Extract attributes
        const altMatch = fullMatch.match(/alt=["']([^"']+)["']/i);
        const widthMatch = fullMatch.match(/width=["']?(\d+)["']?/i);
        const heightMatch = fullMatch.match(/height=["']?(\d+)["']?/i);
        const classMatch = fullMatch.match(/class(?:Name)?=["']([^"']+)["']/i);

        const alt = altMatch ? altMatch[1] : 'Image';
        const width = widthMatch ? widthMatch[1] : '800';
        const height = heightMatch ? heightMatch[1] : '600';
        const className = classMatch ? classMatch[1] : '';

        // Create replacement
        const replacement = `<OptimizedImage
          src="${src}"
          alt="${alt}"
          width={${width}}
          height={${height}}
          ${className ? `className="${className}"` : ''}
        />`;

        modified = modified.replace(fullMatch, replacement);
        hasChanges = true;

        this.stats.replacements.push({
          file: path.relative(this.projectRoot, filePath),
          line: lineNumber,
          original: fullMatch,
          replacement,
          type: 'img-to-Image',
        });
      }

      // Step 2: Add import if changes were made
      if (hasChanges) {
        // Check if there's already an Image import
        const hasImageImport = content.includes('from \'next/image\'') ||
                               content.includes('from "next/image"');

        if (!hasImageImport) {
          // Add import at the top (after 'use client' if present)
          const useClientMatch = content.match(/['"]use client['"]\s*;?\s*/);
          const importStatement = "import { OptimizedImage } from '@/components/image-optimization';\n";

          if (useClientMatch) {
            const insertPos = useClientMatch.index! + useClientMatch[0].length;
            modified = modified.slice(0, insertPos) + '\n' + importStatement + modified.slice(insertPos);
          } else {
            modified = importStatement + '\n' + modified;
          }
        } else {
          // Replace next/image import with OptimizedImage
          modified = modified.replace(
            /import\s+(?:\{[^}]*Image[^}]*\}|Image)\s+from\s+['"]next\/image['"]/g,
            "import { OptimizedImage } from '@/components/image-optimization'"
          );

          // Replace Image component usage with OptimizedImage
          modified = modified.replace(/<Image\s/g, '<OptimizedImage ');
          modified = modified.replace(/<\/Image>/g, '</OptimizedImage>');
        }
      }

      // Step 3: Fix images without alt text
      const imageWithoutAltRegex = /<(?:Optimized)?Image\s+(?![^>]*alt=)[^>]*src=["']([^"']+)["'][^>]*>/gi;
      modified = modified.replace(imageWithoutAltRegex, (match, src) => {
        const alt = this.generateAltText(src);
        hasChanges = true;
        return match.replace(/src=/, `alt="${alt}" src=`);
      });

      // Step 4: Add dimensions to images without them
      const imageWithoutDimensionsRegex = /<OptimizedImage\s+(?![^>]*(?:width|height|fill))[^>]*>/gi;
      modified = modified.replace(imageWithoutDimensionsRegex, (match) => {
        if (match.includes('fill')) return match;

        hasChanges = true;
        return match.replace(/<OptimizedImage/, '<OptimizedImage width={800} height={600}');
      });

      // Write changes if not dry run
      if (hasChanges && !this.dryRun) {
        fs.writeFileSync(filePath, modified, 'utf-8');
        this.stats.filesModified++;
        console.log(`✅ Modified: ${path.relative(this.projectRoot, filePath)}`);
      } else if (hasChanges) {
        this.stats.filesModified++;
        console.log(`🔍 Would modify: ${path.relative(this.projectRoot, filePath)}`);
      }
    } catch (error) {
      this.stats.errors.push({
        file: path.relative(this.projectRoot, filePath),
        error: error instanceof Error ? error.message : String(error),
      });
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  /**
   * Generate appropriate alt text from image path
   */
  private generateAltText(src: string): string {
    const filename = path.basename(src, path.extname(src));

    // Convert filename to readable text
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  }

  /**
   * Print summary
   */
  private printSummary(): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 REPLACEMENT SUMMARY');
    console.log('='.repeat(80));
    console.log(`\nFiles processed: ${this.stats.filesProcessed}`);
    console.log(`Files modified: ${this.stats.filesModified}`);
    console.log(`Total replacements: ${this.stats.replacements.length}`);
    console.log(`Errors: ${this.stats.errors.length}`);

    if (this.dryRun) {
      console.log('\n⚠️  DRY RUN MODE - No files were actually modified');
      console.log('Run without --dry-run to apply changes');
    }

    // Show replacement breakdown
    const typeCount = this.stats.replacements.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (Object.keys(typeCount).length > 0) {
      console.log('\n📈 Replacement breakdown:');
      for (const [type, count] of Object.entries(typeCount)) {
        console.log(`   ${type}: ${count}`);
      }
    }

    // Show errors
    if (this.stats.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.stats.errors.slice(0, 10).forEach((error) => {
        console.log(`   ${error.file}: ${error.error}`);
      });

      if (this.stats.errors.length > 10) {
        console.log(`   ... and ${this.stats.errors.length - 10} more`);
      }
    }

    console.log('\n' + '='.repeat(80) + '\n');
  }

  /**
   * Save detailed report
   */
  saveReport(outputPath: string): void {
    fs.writeFileSync(outputPath, JSON.stringify(this.stats, null, 2));
    console.log(`💾 Detailed report saved to: ${outputPath}`);
  }
}

/**
 * Main execution
 */
async function main() {
  const projectRoot = process.cwd();
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');

  const replacer = new ImageComponentReplacer(projectRoot, dryRun);
  const stats = await replacer.processAll();

  // Save report
  const reportPath = path.join(projectRoot, 'image-replacement-report.json');
  replacer.saveReport(reportPath);

  // Exit
  if (stats.errors.length > 0) {
    console.log('\n⚠️  Completed with errors');
    process.exit(1);
  } else {
    console.log('\n✅ Replacement completed successfully');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { ImageComponentReplacer };
