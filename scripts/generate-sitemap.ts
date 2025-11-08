/**
 * Generate sitemap.xml file
 * Run with: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateSitemapXML, getSitemapStats } from '../lib/seo/sitemap-generator';

function main() {
  console.log('Generating sitemap.xml...\n');

  // Generate sitemap XML
  const sitemapXML = generateSitemapXML();

  // Get statistics
  const stats = getSitemapStats();

  // Write to public folder
  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemapXML, 'utf-8');

  console.log('✅ Sitemap generated successfully!');
  console.log(`📁 Location: ${outputPath}\n`);

  console.log('📊 SITEMAP STATISTICS:');
  console.log('─'.repeat(50));
  console.log(`Total Pages: ${stats.totalPages}`);
  console.log('\nBy Priority:');
  console.log(`  High (0.8-1.0):   ${stats.byPriority.high} pages`);
  console.log(`  Medium (0.5-0.7): ${stats.byPriority.medium} pages`);
  console.log(`  Low (0.0-0.4):    ${stats.byPriority.low} pages`);
  console.log('\nBy Change Frequency:');
  console.log(`  Daily:   ${stats.byChangeFreq.daily} pages`);
  console.log(`  Weekly:  ${stats.byChangeFreq.weekly} pages`);
  console.log(`  Monthly: ${stats.byChangeFreq.monthly} pages`);
  console.log(`  Yearly:  ${stats.byChangeFreq.yearly} pages`);
  console.log('\nBy Category:');
  console.log(`  Services:  ${stats.categories.services} pages`);
  console.log(`  Locations: ${stats.categories.locations} pages`);
  console.log(`  Emergency: ${stats.categories.emergency} pages`);
  console.log(`  FAQ:       ${stats.categories.faq} pages`);
  console.log(`  Insurance: ${stats.categories.insurance} pages`);
  console.log(`  Guides:    ${stats.categories.guides} pages`);
  console.log('─'.repeat(50));

  console.log('\n✅ Sitemap generation complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Submit sitemap to Google Search Console');
  console.log('2. Submit sitemap to Bing Webmaster Tools');
  console.log('3. Add sitemap URL to robots.txt');
  console.log('4. Verify sitemap at: https://disasterrecovery.com.au/sitemap.xml\n');
}

main();
