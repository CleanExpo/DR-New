const fs = require('fs');
const path = require('path');

const htmlFilenames = {
  'NRP-003': 'NRP-003-INSURANCE-CLAIMS-MANAGEMENT.html',
  'NRP-004': 'NRP-004-PROFESSIONAL-DOCUMENTATION-REPORTING.html',
  'NRP-005': 'NRP-005-HEALTH-SAFETY-COMPLIANCE.html',
  'NRP-006': 'NRP-006-STRUCTURAL-DRYING-DEHUMIDIFICATION.html',
  'NRP-007': 'NRP-007-MOLD-REMEDIATION-PROTOCOLS.html',
  'NRP-008': 'NRP-008-FIRE-SMOKE-DAMAGE-RESTORATION.html',
  'NRP-009': 'NRP-009-CONTENTS-RESTORATION-PACK-OUT.html',
  'NRP-010': 'NRP-010-BIOHAZARD-TRAUMA-CLEANUP.html',
  'NRP-011': 'NRP-011-CARPET-UPHOLSTERY-CLEANING.html',
  'NRP-012': 'NRP-012-ODOUR-CONTROL-DEODORISATION.html',
  'NRP-013': 'NRP-013-EMERGENCY-RESPONSE-PROCEDURES.html',
  'NRP-014': 'NRP-014-EQUIPMENT-MANAGEMENT-MAINTENANCE.html',
  'NRP-015': 'NRP-015-CUSTOMER-SERVICE-EXCELLENCE.html',
  'NRP-016': 'NRP-016-PROJECT-MANAGEMENT-SCHEDULING.html',
  'NRP-017': 'NRP-017-COST-ESTIMATION-PRICING.html',
  'NRP-018': 'NRP-018-QUALITY-ASSURANCE-CONTROL.html',
  'NRP-019': 'NRP-019-BUSINESS-DEVELOPMENT-MARKETING.html',
  'NRP-020': 'NRP-020-ADVANCED-RESTORATION-TECHNOLOGIES.html',
  'NRP-021': 'NRP-021-DR-NRPG-PLATFORM-OPERATIONS.html',
  'NRP-022': 'NRP-022-CONTINUAL-EDUCATION-CREDITS.html',
  'NRP-023': 'NRP-023-ASSOCIATION-MEMBERSHIPS-BENEFITS.html',
  'NRP-024': 'NRP-024-MEMBERS-GATHERINGS-NETWORKING.html',
};

const filePath = path.join(__dirname, 'integrate-training-images.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// For each module, add htmlFilename after the module declaration
for (const [module, filename] of Object.entries(htmlFilenames)) {
  const pattern = new RegExp(`(module: '${module}',)\\n(\\s+images:)`, 'g');
  const replacement = `$1\n    htmlFilename: '${filename}',\n$2`;
  content = content.replace(pattern, replacement);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ Patched all module mappings with htmlFilename');
