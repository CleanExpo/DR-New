#!/usr/bin/env node

/**
 * Script to update all recharts imports to use dynamic imports
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'components/analytics/CustomerDashboard.tsx',
  'components/analytics/ExecutiveDashboard.tsx',
  'components/analytics/FinancialDashboard.tsx',
  'components/analytics/MarketingDashboard.tsx',
  'components/analytics/OperationsDashboard.tsx',
  'components/analytics/SEODashboard.tsx',
  'components/analytics/TeamDashboard.tsx',
];

const oldImportPattern = /import\s*{[^}]+}\s*from\s*['"]recharts['"]/g;
const newImport = `import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from '@/components/charts/DynamicCharts'`;

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);

  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');

    // Check if file imports from recharts
    if (content.includes("from 'recharts'")) {
      // Replace the import
      content = content.replace(oldImportPattern, newImport);

      fs.writeFileSync(fullPath, content);
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  Skipped: ${filePath} (no recharts import found)`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('\n✨ All dashboard files updated!');