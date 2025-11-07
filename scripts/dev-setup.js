#!/usr/bin/env node

/**
 * Development Setup Script
 * Ensures all dependencies and configurations are properly set up
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
};

function checkNodeVersion() {
  const version = process.version;
  const major = parseInt(version.slice(1).split('.')[0]);

  if (major < 18) {
    log.error(`Node.js version ${version} is not supported. Please use Node.js 18 or higher.`);
    process.exit(1);
  }

  log.success(`Node.js version ${version} is compatible`);
}

function checkEnvFile() {
  const envFile = path.join(process.cwd(), '.env');
  const envExampleFile = path.join(process.cwd(), '.env.example');

  if (!fs.existsSync(envFile)) {
    log.warning('.env file not found');

    if (fs.existsSync(envExampleFile)) {
      log.info('Copying .env.example to .env');
      fs.copyFileSync(envExampleFile, envFile);
      log.success('Created .env file from .env.example');
      log.warning('Please update .env with your actual values');
    } else {
      log.error('No .env or .env.example file found');
      log.info('Please create a .env file with required environment variables');
    }
  } else {
    log.success('.env file exists');
  }
}

function checkDependencies() {
  log.info('Checking dependencies...');

  try {
    execSync('npm list --depth=0', { stdio: 'ignore' });
    log.success('All dependencies are installed');
  } catch (error) {
    log.warning('Some dependencies are missing');
    log.info('Running npm install...');
    execSync('npm install', { stdio: 'inherit' });
    log.success('Dependencies installed');
  }
}

function setupGitHooks() {
  log.info('Setting up Git hooks...');

  try {
    execSync('npx husky install', { stdio: 'ignore' });
    log.success('Git hooks configured');
  } catch (error) {
    log.warning('Failed to setup Git hooks');
  }
}

function checkPrisma() {
  const schemaFile = path.join(process.cwd(), 'prisma', 'schema.prisma');

  if (fs.existsSync(schemaFile)) {
    log.info('Generating Prisma client...');
    try {
      execSync('npx prisma generate', { stdio: 'inherit' });
      log.success('Prisma client generated');
    } catch (error) {
      log.error('Failed to generate Prisma client');
    }
  }
}

function printNextSteps() {
  console.log('\n' + colors.green + '='.repeat(60) + colors.reset);
  console.log(colors.green + 'Setup Complete!' + colors.reset);
  console.log(colors.green + '='.repeat(60) + colors.reset + '\n');

  console.log('Next steps:');
  console.log('  1. Update your .env file with actual values');
  console.log('  2. Run database migrations: npm run db:migrate');
  console.log('  3. Start development server: npm run dev');
  console.log('  4. Open http://localhost:3000 in your browser\n');

  console.log('Useful commands:');
  console.log('  npm run dev          - Start development server');
  console.log('  npm run build        - Build for production');
  console.log('  npm run test         - Run tests');
  console.log('  npm run lint         - Run linter');
  console.log('  npm run db:studio    - Open Prisma Studio\n');
}

async function main() {
  console.log('\n' + colors.blue + '='.repeat(60) + colors.reset);
  console.log(colors.blue + 'Development Environment Setup' + colors.reset);
  console.log(colors.blue + '='.repeat(60) + colors.reset + '\n');

  checkNodeVersion();
  checkEnvFile();
  checkDependencies();
  setupGitHooks();
  checkPrisma();
  printNextSteps();
}

main().catch((error) => {
  log.error('Setup failed:');
  console.error(error);
  process.exit(1);
});
