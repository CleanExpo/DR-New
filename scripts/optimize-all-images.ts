#!/usr/bin/env node

/**
 * Master Image Optimization Script
 * Runs all image optimization tasks in sequence
 */

import { spawn } from 'child_process';
import path from 'path';

interface TaskResult {
  name: string;
  success: boolean;
  duration: number;
  error?: string;
}

class ImageOptimizationOrchestrator {
  private projectRoot: string;
  private results: TaskResult[] = [];

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  /**
   * Run all optimization tasks
   */
  async runAll(): Promise<void> {
    console.log('🚀 Starting comprehensive image optimization...\n');
    console.log('='.repeat(80));
    console.log('MASTER IMAGE OPTIMIZATION PIPELINE');
    console.log('='.repeat(80) + '\n');

    const tasks = [
      {
        name: 'Image Audit',
        script: 'audit-and-fix-images.ts',
        description: 'Auditing all images across the site',
      },
      {
        name: 'WebP Conversion',
        script: 'convert-to-webp.ts',
        description: 'Converting images to WebP format',
      },
      {
        name: 'Component Replacement (Dry Run)',
        script: 'replace-image-components.ts',
        args: ['--dry-run'],
        description: 'Checking component replacements (dry run)',
      },
      {
        name: 'Component Replacement',
        script: 'replace-image-components.ts',
        description: 'Replacing image components with optimized versions',
        confirm: true,
      },
    ];

    for (const task of tasks) {
      // Ask for confirmation if required
      if (task.confirm) {
        const shouldRun = await this.askConfirmation(
          `\n❓ Run ${task.name}? This will modify files. (y/n): `
        );

        if (!shouldRun) {
          console.log(`⏭️  Skipping ${task.name}\n`);
          continue;
        }
      }

      await this.runTask(task.name, task.script, task.description, task.args);
    }

    this.printFinalSummary();
  }

  /**
   * Run a single task
   */
  private async runTask(
    name: string,
    script: string,
    description: string,
    args: string[] = []
  ): Promise<void> {
    console.log(`\n${'▶'.repeat(3)} ${name}`);
    console.log(`   ${description}\n`);

    const startTime = Date.now();
    const scriptPath = path.join(this.projectRoot, 'scripts', script);

    try {
      await this.execScript(scriptPath, args);
      const duration = Date.now() - startTime;

      this.results.push({
        name,
        success: true,
        duration,
      });

      console.log(`\n✅ ${name} completed in ${(duration / 1000).toFixed(2)}s\n`);
    } catch (error) {
      const duration = Date.now() - startTime;

      this.results.push({
        name,
        success: false,
        duration,
        error: error instanceof Error ? error.message : String(error),
      });

      console.error(`\n❌ ${name} failed:`, error);
      console.log(`   Duration: ${(duration / 1000).toFixed(2)}s\n`);
    }
  }

  /**
   * Execute script
   */
  private execScript(scriptPath: string, args: string[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn('tsx', [scriptPath, ...args], {
        cwd: this.projectRoot,
        stdio: 'inherit',
        shell: true,
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Script exited with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Ask for user confirmation
   */
  private async askConfirmation(question: string): Promise<boolean> {
    return new Promise((resolve) => {
      process.stdout.write(question);

      process.stdin.once('data', (data) => {
        const answer = data.toString().trim().toLowerCase();
        resolve(answer === 'y' || answer === 'yes');
      });
    });
  }

  /**
   * Print final summary
   */
  private printFinalSummary(): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL OPTIMIZATION SUMMARY');
    console.log('='.repeat(80));

    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);
    const successCount = this.results.filter((r) => r.success).length;
    const failCount = this.results.filter((r) => !r.success).length;

    console.log(`\nTotal tasks: ${this.results.length}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Total time: ${(totalDuration / 1000).toFixed(2)}s`);

    console.log('\n📋 Task Results:\n');

    this.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const time = (result.duration / 1000).toFixed(2);

      console.log(`${index + 1}. ${status} ${result.name} (${time}s)`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });

    console.log('\n' + '='.repeat(80));

    if (failCount === 0) {
      console.log('\n🎉 All image optimization tasks completed successfully!');
      console.log('\n📝 Next steps:');
      console.log('   1. Review the generated reports');
      console.log('   2. Test image loading on the site');
      console.log('   3. Run lighthouse audit to verify improvements');
      console.log('   4. Commit the optimized images and code changes\n');
    } else {
      console.log('\n⚠️  Some tasks failed. Review the errors above.');
      console.log('   You may need to fix errors and re-run specific tasks.\n');
    }
  }

  /**
   * Run specific task by name
   */
  async runSpecific(taskName: string): Promise<void> {
    console.log(`🎯 Running specific task: ${taskName}\n`);

    const taskMap: Record<string, { script: string; description: string }> = {
      audit: {
        script: 'audit-and-fix-images.ts',
        description: 'Audit all images',
      },
      convert: {
        script: 'convert-to-webp.ts',
        description: 'Convert to WebP',
      },
      replace: {
        script: 'replace-image-components.ts',
        description: 'Replace components',
      },
      'replace-dry': {
        script: 'replace-image-components.ts',
        description: 'Replace components (dry run)',
      },
    };

    const task = taskMap[taskName];
    if (!task) {
      console.error(`❌ Unknown task: ${taskName}`);
      console.log('\nAvailable tasks:');
      Object.keys(taskMap).forEach((key) => {
        console.log(`   - ${key}`);
      });
      process.exit(1);
    }

    const args = taskName === 'replace-dry' ? ['--dry-run'] : [];
    await this.runTask(taskName, task.script, task.description, args);
  }
}

/**
 * Main execution
 */
async function main() {
  const projectRoot = process.cwd();
  const args = process.argv.slice(2);

  const orchestrator = new ImageOptimizationOrchestrator(projectRoot);

  if (args.length > 0 && args[0] !== '--all') {
    // Run specific task
    await orchestrator.runSpecific(args[0]);
  } else {
    // Run all tasks
    await orchestrator.runAll();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { ImageOptimizationOrchestrator };
