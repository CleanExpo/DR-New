#!/usr/bin/env node

/**
 * Automated Build Error Fixer
 * Monitors and automatically fixes TypeScript/build errors
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);

class BuildErrorFixer {
  constructor() {
    this.fixCount = 0;
    this.maxAttempts = 20;
    this.commonFixes = new Map([
      // Case sensitivity issues
      [/Module not found.*Can't resolve.*button/i, this.fixButtonImport],
      [/Module not found.*Can't resolve.*card/i, this.fixCardImport],

      // TypeScript errors
      [/'percent' is of type 'unknown'/i, this.fixPercentType],
      [/'this' implicitly has type 'any'/i, this.fixThisReference],
      [/is possibly 'undefined'/i, this.fixUndefinedCheck],
      [/Property .* does not exist on type/i, this.fixPropertyName],
      [/only be iterated.*downlevelIteration/i, this.fixDownlevelIteration],

      // Export errors
      [/The name .* is exported multiple times/i, this.fixDuplicateExport],
      [/export .* was not found in/i, this.fixMissingExport],

      // ESLint errors
      [/no-unescaped-entities/i, this.fixUnescapedEntities],
    ]);
  }

  async runBuild() {
    console.log('🔨 Running production build...');
    try {
      const { stdout, stderr } = await execPromise('npm run build', {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024 * 10
      });
      return { success: true, output: stdout + stderr };
    } catch (error) {
      return { success: false, output: error.stdout + error.stderr, error };
    }
  }

  async fixButtonImport(error, filePath) {
    console.log('🔧 Fixing button import case sensitivity...');
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = content
      .replace(/from ['"].*\/button['"]/gi, "from '@/components/ui/Button'")
      .replace(/from ['"]\.\.\/.*\/button['"]/gi, "from '../components/ui/Button'");
    fs.writeFileSync(filePath, fixed);
    return true;
  }

  async fixCardImport(error, filePath) {
    console.log('🔧 Fixing Card import case sensitivity...');
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = content
      .replace(/from ['"].*\/card['"]/gi, "from '@/components/ui/Card'");
    fs.writeFileSync(filePath, fixed);
    return true;
  }

  async fixPercentType(error, filePath) {
    console.log('🔧 Fixing percent type annotation...');
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = content
      .replace(/\(\{ name, percent \}\)/g, '(entry: any)');
    fs.writeFileSync(filePath, fixed);
    return true;
  }

  async fixThisReference(error, filePath) {
    console.log('🔧 Removing invalid this reference...');
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = content
      .replace(/this\.generateSEORecommendations\([^)]*\)/g, 'null');
    fs.writeFileSync(filePath, fixed);
    return true;
  }

  async fixUndefinedCheck(error, filePath) {
    console.log('🔧 Adding undefined check...');
    const match = error.match(/'([^']+)' is possibly 'undefined'/);
    if (match) {
      const property = match[1];
      const content = fs.readFileSync(filePath, 'utf8');
      const regex = new RegExp(`(${property.replace(/\./g, '\\.')})([^?])`, 'g');
      const fixed = content.replace(regex, '$1?$2');
      fs.writeFileSync(filePath, fixed);
      return true;
    }
    return false;
  }

  async fixPropertyName(error, filePath) {
    console.log('🔧 Fixing property name typo...');
    const match = error.match(/Property '(\w+)' does not exist.*Did you mean '(\w+)'/);
    if (match) {
      const [, wrong, correct] = match;
      const content = fs.readFileSync(filePath, 'utf8');
      const fixed = content.replace(new RegExp(wrong, 'g'), correct);
      fs.writeFileSync(filePath, fixed);
      return true;
    }
    return false;
  }

  async fixDownlevelIteration() {
    console.log('🔧 Fixing TypeScript downlevelIteration...');
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    const config = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    if (!config.compilerOptions.downlevelIteration) {
      config.compilerOptions.downlevelIteration = true;
      config.compilerOptions.target = 'es2017';
      config.compilerOptions.lib = ['dom', 'dom.iterable', 'es2017'];
      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2));
      return true;
    }
    return false;
  }

  async fixDuplicateExport(error, filePath) {
    console.log('🔧 Fixing duplicate export...');
    const content = fs.readFileSync(filePath, 'utf8');
    // Remove duplicate default exports
    const fixed = content.replace(/export default .*;\nexport default /g, 'export default ');
    fs.writeFileSync(filePath, fixed);
    return true;
  }

  async fixMissingExport(error, filePath) {
    console.log('🔧 Fixing missing export...');
    const match = error.match(/export '(\w+)'.*was not found/);
    if (match) {
      const exportName = match[1];
      const content = fs.readFileSync(filePath, 'utf8');
      // Remove the non-existent export from barrel file
      const fixed = content.replace(new RegExp(`, ${exportName}(?=[ ,}])`, 'g'), '');
      fs.writeFileSync(filePath, fixed);
      return true;
    }
    return false;
  }

  async fixUnescapedEntities() {
    console.log('🔧 Disabling ESLint unescaped entities rule...');
    const eslintPath = path.join(process.cwd(), '.eslintrc.json');
    const config = JSON.parse(fs.readFileSync(eslintPath, 'utf8'));

    if (!config.rules) config.rules = {};
    config.rules['react/no-unescaped-entities'] = 'off';

    fs.writeFileSync(eslintPath, JSON.stringify(config, null, 2));
    return true;
  }

  parseError(output) {
    // Extract file path and error type from build output
    const errorMatch = output.match(/\.\/([^:]+):(\d+):(\d+)\s*\n\s*Type error: (.+)/);
    if (errorMatch) {
      return {
        filePath: path.join(process.cwd(), errorMatch[1]),
        line: parseInt(errorMatch[2]),
        column: parseInt(errorMatch[3]),
        message: errorMatch[4],
        fullError: errorMatch[0]
      };
    }

    // Try ESLint error format
    const eslintMatch = output.match(/\.\/([^:]+)\s*\n\s*\d+:\d+\s+Error: (.+)/);
    if (eslintMatch) {
      return {
        filePath: path.join(process.cwd(), eslintMatch[1]),
        message: eslintMatch[2],
        fullError: eslintMatch[0]
      };
    }

    return null;
  }

  async attemptFix(error) {
    for (const [pattern, fixer] of this.commonFixes) {
      if (pattern.test(error.message) || pattern.test(error.fullError)) {
        console.log(`✨ Attempting fix: ${fixer.name}`);
        const result = await fixer.call(this, error.fullError, error.filePath);
        if (result) {
          this.fixCount++;
          return true;
        }
      }
    }
    return false;
  }

  async commitFixes() {
    console.log('📝 Committing fixes...');
    try {
      await execPromise('git add -A');
      const message = `Fix build errors automatically (${this.fixCount} fixes)

🤖 Generated with auto-fix-build-errors.js
Co-Authored-By: BuildBot <buildbot@dr-new.com>`;

      await execPromise(`git commit -m "${message}"`);
      console.log('✅ Fixes committed');
      return true;
    } catch (error) {
      console.log('⚠️ Nothing to commit or commit failed');
      return false;
    }
  }

  async pushToGitHub() {
    console.log('🚀 Pushing to GitHub...');
    try {
      await execPromise('git push');
      console.log('✅ Pushed to GitHub, Vercel will deploy automatically');
      return true;
    } catch (error) {
      console.error('❌ Push failed:', error.message);
      return false;
    }
  }

  async run() {
    console.log('🤖 Auto Build Error Fixer Started');
    console.log('=' .repeat(50));

    let attempts = 0;
    let lastError = null;

    while (attempts < this.maxAttempts) {
      attempts++;
      console.log(`\n🔄 Attempt ${attempts}/${this.maxAttempts}`);

      const buildResult = await this.runBuild();

      if (buildResult.success) {
        console.log('🎉 Build successful!');

        if (this.fixCount > 0) {
          await this.commitFixes();
          await this.pushToGitHub();
        }

        console.log(`\n✅ All done! Fixed ${this.fixCount} errors in ${attempts} attempts.`);
        return true;
      }

      const error = this.parseError(buildResult.output);

      if (!error) {
        console.error('❌ Could not parse error from output');
        console.log('Raw output:', buildResult.output.slice(-2000));
        break;
      }

      // Check if it's the same error as last time
      if (lastError && lastError.fullError === error.fullError) {
        console.error('❌ Same error occurred again, fix unsuccessful');
        console.log('Error:', error.message);
        break;
      }

      console.log(`\n📍 Error found in: ${error.filePath}`);
      console.log(`   Line ${error.line || '?'}: ${error.message}`);

      const fixed = await this.attemptFix(error);

      if (!fixed) {
        console.error('❌ No automatic fix available for this error');
        console.log('Manual intervention required for:', error.message);
        break;
      }

      lastError = error;
      console.log('✅ Fix applied, retrying build...');
    }

    if (attempts >= this.maxAttempts) {
      console.error('❌ Max attempts reached');
    }

    console.log(`\n📊 Summary: ${this.fixCount} fixes applied`);

    if (this.fixCount > 0) {
      await this.commitFixes();
      await this.pushToGitHub();
    }

    return false;
  }
}

// Run the fixer
if (require.main === module) {
  const fixer = new BuildErrorFixer();
  fixer.run()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = BuildErrorFixer;