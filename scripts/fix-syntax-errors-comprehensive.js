#!/usr/bin/env node

/**
 * Comprehensive Syntax Error Fixer
 * Fixes malformed try-catch blocks and syntax issues from bad refactoring
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing syntax errors comprehensively...\n');

// Files with known syntax issues
const filesToFix = {
  'src/lib/lead-assignment.ts': fixLeadAssignment,
  'src/lib/lead-management.ts': fixLeadManagement,
  'src/lib/mcp-management-agent.ts': fixMcpAgent,
  'src/lib/semrush-api.ts': fixSemrushApi,
  'src/lib/seo/content-generator.ts': fixContentGenerator,
  'src/utils/performance-monitor.ts': fixPerformanceMonitor,
};

function fixLeadAssignment(content) {
  // Fix: getPartnerDetails function
  content = content.replace(
    /export async function getPartnerDetails\(\.\.\.args: any\[\]\): Promise<void> \{\s*try \{\s*return await prisma\.partner\.findUnique\(\{\s*where: \{ id: partnerId\s*\} catch \(error\) \{[^}]+\}\},[\s\S]*?\}\);/g,
    `export async function getPartnerDetails(partnerId: string): Promise<any> {
  try {
    return await prisma.partner.findUnique({
      where: { id: partnerId },
      include: {
        leads: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        billing: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  } catch (error) {
    console.error('Error in getPartnerDetails:', error);
    throw error;
  }
}`
  );

  // Fix: updatePartnerCredits function
  content = content.replace(
    /export async function updatePartnerCredits\(\.\.\.args: any\[\]\): Promise<void> \{\s*try \{\s*return await prisma\.partner\.update\(\{\s*where: \{ id: partnerId\s*\} catch \(error\) \{[^}]+\}\},[\s\S]*?\}\);/g,
    `export async function updatePartnerCredits(partnerId: string, amount: number): Promise<any> {
  try {
    return await prisma.partner.update({
      where: { id: partnerId },
      data: {
        leadCredits: { increment: amount },
        accountBalance: { increment: amount }
      }
    });
  } catch (error) {
    console.error('Error in updatePartnerCredits:', error);
    throw error;
  }
}`
  );

  // Fix: getAvailablePartners function
  content = content.replace(
    /export async function getAvailablePartners\(\.\.\.args: any\[\]\): Promise<void> \{\s*try \{\s*const partners = await prisma\.partner\.findMany\(\{\s*where: \{\s*status: 'ACTIVE',\s*leadCredits: \{ gt: 0\s*\} catch \(error\) \{[^}]+\}\}[\s\S]*?\}/g,
    `export async function getAvailablePartners(location: string): Promise<any[]> {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        status: 'ACTIVE',
        leadCredits: { gt: 0 }
      }
    });
    return partners;
  } catch (error) {
    console.error('Error in getAvailablePartners:', error);
    throw error;
  }
}`
  );

  return content;
}

function fixLeadManagement(content) {
  // Fix: validateLeadQuality return type
  content = content.replace(
    /export async function validateLeadQuality\(data: unknown\): Promise<\{\s*try \{[\s\S]*?\} catch \(error\) \{[^}]+\}\}>/,
    `export async function validateLeadQuality(data: any): Promise<{
  isValid: boolean;
  reasons: string[];
}>`
  );

  // Fix: misplaced switch statement structure
  content = content.replace(
    /switch \([^)]+\) \{[\s\S]*?default:\s*\}/g,
    (match) => {
      if (!match.includes('console.log')) {
        return match.replace(/default:\s*\}/, "default:\n          console.log('Unknown command');\n      }");
      }
      return match;
    }
  );

  return content;
}

function fixMcpAgent(content) {
  // Fix: orphaned console.log closings in switch cases
  content = content.replace(/const (status|result|results|diagnostics) = await [^;]+;\s+\);/g,
    (match, varName) => match.replace(/\);$/, `;
          console.log(${varName});`));

  // Fix: empty default case
  content = content.replace(/default:\s+\}/g,
    `default:
          console.log('Unknown command');
      }`);

  return content;
}

function fixSemrushApi(content) {
  // Fix: misplaced catch blocks
  content = content.replace(
    /\s+\} catch \(error\) \{\s*console\.error\([^)]+\);\s*throw error;\s*\}\s*\}/g,
    (match) => {
      return `
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}`;
    }
  );

  return content;
}

function fixContentGenerator(content) {
  // Fix: malformed object/function closing
  content = content.replace(
    /,\s*\}\s*catch \(error\) \{[^}]+\}\s*\}/g,
    `
    };
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
}`
  );

  return content;
}

function fixPerformanceMonitor(content) {
  // Fix: object property syntax in class/object
  content = content.replace(
    /(\w+): (\w+);/g,
    (match, key, value) => {
      if (content.includes(`class `) || content.includes(`interface `)) {
        return `${key}: ${value};`;
      }
      return `${key}: ${value},`;
    }
  );

  return content;
}

// Process files
Object.entries(filesToFix).forEach(([file, fixFunction]) => {
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixFunction(content);

    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      console.log(`✅ Fixed ${file}`);
    } else {
      console.log(`✓  ${file} (no changes needed)`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('\n✅ Comprehensive syntax fixes complete!\n');
console.log('Next: npm run type-check');
