const fs = require('fs');
const path = require('path');

// Map of service pages to their specific meta descriptions and keywords
const serviceMetadata = {
  'water-damage': {
    title: 'Water Damage Restoration Services | 24/7 Emergency Response',
    description: 'Professional water damage restoration Brisbane, Ipswich & Logan. Rapid extraction, structural drying, mould prevention. IICRC certified. Insurance approved. Call 1300 309 361.',
    keywords: ['water damage restoration', 'flood damage repair', 'water extraction services', 'emergency water removal', 'structural drying', 'moisture control'],
  },
  'water-damage-restoration': {
    title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
    description: 'Expert water damage restoration Brisbane metro. IICRC certified rapid extraction, advanced drying, mould prevention. Insurance specialists. 24/7 emergency. Call 1300 309 361.',
    keywords: ['water damage restoration brisbane', 'flood recovery', 'burst pipe repair', 'water extraction', 'structural drying', 'dehumidification services'],
  },
  'fire-damage': {
    title: 'Fire Damage Restoration Services | Smoke & Soot Removal',
    description: 'Complete fire damage restoration Brisbane & surrounds. Smoke odour removal, soot cleaning, structural repairs. IICRC certified. Insurance approved. 24/7 response. Call 1300 309 361.',
    keywords: ['fire damage restoration', 'smoke damage cleanup', 'soot removal', 'odour elimination', 'fire restoration services', 'structural fire repair'],
  },
  'fire-damage-restoration': {
    title: 'Fire & Smoke Damage Restoration | 24/7 Emergency Services',
    description: 'Fire damage restoration specialists Brisbane, Ipswich & Logan. Expert smoke & soot removal, odour elimination, structural repairs. Insurance approved. Call 1300 309 361.',
    keywords: ['fire damage restoration', 'smoke odour removal', 'soot cleaning', 'content restoration', 'structural deodorisation', 'thermal fogging'],
  },
  'mould-remediation': {
    title: 'Mould Remediation Services | Professional Mould Removal',
    description: 'Expert mould remediation Brisbane & surrounds. Safe removal, moisture control, prevention strategies. IICRC certified technicians. Health-focused approach. Call 1300 309 361.',
    keywords: ['mould remediation', 'mould removal brisbane', 'black mould treatment', 'mould inspection', 'moisture control', 'antimicrobial treatment'],
  },
  'storm-damage': {
    title: 'Storm Damage Restoration | Emergency Tarping & Repairs',
    description: 'Storm damage restoration Brisbane region. Emergency roof tarping, water extraction, debris removal, structural repairs. 24/7 rapid response. Insurance experts. Call 1300 309 361.',
    keywords: ['storm damage restoration', 'emergency tarping', 'roof repairs', 'debris removal', 'fallen tree removal', 'storm recovery services'],
  },
  'biohazard': {
    title: 'Biohazard Cleaning Services | Trauma & Crime Scene Cleanup',
    description: 'Professional biohazard cleaning Brisbane & surrounds. Trauma cleanup, crime scene restoration, infectious disease control. Certified, discreet, compassionate. Call 1300 309 361.',
    keywords: ['biohazard cleaning', 'trauma cleanup', 'crime scene cleaning', 'infectious disease control', 'blood cleanup', 'bodily fluid removal'],
  },
  'biohazard-cleaning': {
    title: 'Biohazard & Trauma Cleaning | Certified Specialists',
    description: 'Certified biohazard cleaning specialists Brisbane metro. Trauma, crime scene, unattended death cleanup. Discreet, professional, compassionate service. Call 1300 309 361.',
    keywords: ['biohazard cleanup', 'trauma scene cleaning', 'unattended death', 'hoarding cleanup', 'sharps disposal', 'contamination control'],
  },
  'sewage': {
    title: 'Sewage Cleanup Services | Emergency Contamination Control',
    description: 'Emergency sewage cleanup Brisbane, Ipswich & Logan. Raw sewage removal, sanitisation, contamination control. Health-focused, insurance approved. 24/7 response. Call 1300 309 361.',
    keywords: ['sewage cleanup', 'raw sewage removal', 'black water damage', 'sewage backup', 'contamination control', 'sanitisation services'],
  },
  'commercial': {
    title: 'Commercial Disaster Recovery | Business Restoration Services',
    description: 'Commercial disaster recovery Brisbane. Offices, retail, industrial restoration. Minimal downtime, insurance expertise. Water, fire, mould specialists. 24/7. Call 1300 309 361.',
    keywords: ['commercial restoration', 'business disaster recovery', 'office water damage', 'retail restoration', 'industrial cleanup', 'warehouse restoration'],
  },
  'commercial-restoration': {
    title: 'Commercial Restoration Services | 24/7 Business Recovery',
    description: 'Expert commercial restoration Brisbane metro. Fast business recovery, minimal downtime. Office, retail, hospitality specialists. Insurance approved. Call 1300 309 361.',
    keywords: ['commercial water damage', 'business fire restoration', 'office flood recovery', 'retail store restoration', 'restaurant water damage', 'hotel restoration'],
  },
};

// Function to update a service page file
function updateServicePage(filePath, serviceKey) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const metadata = serviceMetadata[serviceKey];

    if (!metadata) {
      console.log(`No metadata configuration for ${serviceKey}, skipping...`);
      return;
    }

    // Check if the file already has Metadata import
    if (!content.includes("import { Metadata } from 'next'") && !content.includes('import type { Metadata } from "next"')) {
      // Check for existing import statements
      if (content.includes('import ')) {
        // Add after the last import
        const lastImportIndex = content.lastIndexOf('import ');
        const endOfLine = content.indexOf('\n', lastImportIndex);
        if (!content.includes('{ Metadata }')) {
          content = content.slice(0, endOfLine + 1) + "import { Metadata } from 'next';\n" + content.slice(endOfLine + 1);
        }
      } else {
        // Add at the beginning
        content = "import { Metadata } from 'next';\n" + content;
      }
    }

    // Create the new metadata object with proper escaping
    const escapedDescription = metadata.description.replace(/'/g, "\\'");
    const newMetadata = `export const metadata: Metadata = {
  title: '${metadata.title}',
  description: '${escapedDescription}',
  keywords: ${JSON.stringify(metadata.keywords)},
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/${serviceKey}',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/services/${serviceKey}',
    },
  },
  openGraph: {
    title: '${metadata.title}',
    description: '${escapedDescription.substring(0, 150)}...',
    url: 'https://disasterrecovery.com.au/services/${serviceKey}',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/${serviceKey}.jpg',
        width: 1200,
        height: 630,
        alt: '${metadata.title}',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${metadata.title}',
    description: '${escapedDescription.substring(0, 150)}...',
    images: ['https://disasterrecovery.com.au/images/services/${serviceKey}.jpg'],
  },
};`;

    // Replace the existing metadata - handle various formats
    const metadataPatterns = [
      /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{[\s\S]*?^};/gm,
      /export\s+const\s+metadata\s*=\s*{[\s\S]*?^};/gm,
    ];

    let replaced = false;
    for (const pattern of metadataPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, newMetadata);
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      // If no metadata exists, add it after imports
      const lastImportMatch = content.match(/import[^;]+;?\n/g);
      if (lastImportMatch) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        const insertIndex = content.lastIndexOf(lastImport) + lastImport.length;
        content = content.slice(0, insertIndex) + '\n' + newMetadata + '\n' + content.slice(insertIndex);
      }
    }

    // Update any old domain references
    content = content.replace(/https:\/\/disasterrecoverybrisbane\.com\.au/g, 'https://disasterrecovery.com.au');
    content = content.replace(/"Disaster Recovery Brisbane"/g, '"Disaster Recovery"');
    content = content.replace(/'Disaster Recovery Brisbane'/g, "'Disaster Recovery'");

    // Fix any instances of "odor" to Australian "odour"
    content = content.replace(/\bodor\b/gi, (match) => {
      return match.charAt(0) === match.charAt(0).toUpperCase() ? 'Odour' : 'odour';
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated ${serviceKey}`);
  } catch (error) {
    console.error(`✗ Error updating ${serviceKey}: ${error.message}`);
  }
}

// Process all service pages
const servicesDir = path.join(__dirname, '..', 'app', 'services');

// Get all subdirectories and files in the services folder
const items = fs.readdirSync(servicesDir);

console.log(`Found ${items.length} items in services directory...`);

// Process subdirectories with page.tsx
items.forEach(item => {
  const itemPath = path.join(servicesDir, item);
  const stat = fs.statSync(itemPath);

  if (stat.isDirectory()) {
    const pagePath = path.join(itemPath, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      updateServicePage(pagePath, item);
    } else {
      console.log(`✗ No page.tsx found for ${item}`);
    }
  } else if (item === 'page.tsx') {
    // Handle the main services page if it exists
    console.log(`Found main services page.tsx`);
  }
});

console.log('\nService metadata update complete!');
console.log('Remember to run npm run build to verify all changes compile correctly.');