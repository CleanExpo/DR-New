const fs = require('fs');
const path = require('path');

// Map of location pages to their specific meta descriptions and keywords
const locationMetadata = {
  'ascot': {
    title: 'Ascot Disaster Recovery | Emergency Restoration Services | 24/7',
    description: 'Ascot\'s trusted disaster restoration team. Water damage, fire & mould specialists servicing luxury homes & racing precincts. Insurance approved. Quick response. Call 1300 309 361.',
    keywords: ['disaster recovery ascot', 'water damage ascot', 'fire restoration ascot 4007', 'Eagle Farm flooding', 'luxury home restoration'],
  },
  'ashgrove': {
    title: 'Ashgrove Disaster Recovery | Emergency Restoration Services | 24/7',
    description: 'Ashgrove disaster restoration specialists. Water, fire & mould damage recovery for heritage homes & modern properties. IICRC certified. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery ashgrove', 'water damage ashgrove 4060', 'fire restoration ashgrove', 'heritage home restoration', 'storm damage ashgrove'],
  },
  'bardon': {
    title: 'Bardon Disaster Recovery | Emergency Restoration Services | 24/7',
    description: 'Bardon\'s expert disaster restoration service. Specialising in hillside properties, water damage & landslip recovery. Quick response, insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery bardon', 'water damage bardon 4065', 'landslip damage', 'hillside property restoration', 'storm damage bardon'],
  },
  'bowen-hills': {
    title: 'Bowen Hills Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Bowen Hills disaster restoration experts. Commercial & residential water, fire & mould recovery. RNA Showgrounds area specialists. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery bowen hills', 'water damage bowen hills 4006', 'commercial restoration', 'RNA showgrounds area', 'office restoration'],
  },
  'brisbane-cbd': {
    title: 'Brisbane CBD Disaster Recovery | Commercial Restoration | 24/7',
    description: 'Brisbane CBD\'s premier disaster restoration service. Office towers, retail & hospitality specialists. Water, fire & mould recovery. Insurance experts. Call 1300 309 361.',
    keywords: ['disaster recovery brisbane cbd', 'commercial water damage 4000', 'office restoration brisbane', 'retail restoration', 'hotel restoration'],
  },
  'brookfield': {
    title: 'Brookfield Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Brookfield disaster restoration specialists. Acreage properties, luxury homes, water & fire damage experts. Quick rural response, insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery brookfield', 'water damage brookfield 4069', 'acreage restoration', 'luxury home recovery', 'rural property restoration'],
  },
  'bulimba': {
    title: 'Bulimba Disaster Recovery | Emergency Restoration Services | 24/7',
    description: 'Bulimba\'s trusted flood & disaster restoration team. Riverside property specialists, water damage experts. Quick response, insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery bulimba', 'flood restoration bulimba 4171', 'riverside property damage', 'water damage bulimba', 'Oxford Street restoration'],
  },
  'carindale': {
    title: 'Carindale Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Carindale disaster restoration experts. Shopping centre area, residential & commercial water, fire & mould recovery. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery carindale', 'water damage carindale 4152', 'Westfield Carindale area', 'commercial restoration', 'residential recovery'],
  },
  'chapel-hill': {
    title: 'Chapel Hill Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Chapel Hill\'s disaster restoration specialists. Luxury homes, water damage & storm recovery experts. Quick response to elevated properties. Call 1300 309 361.',
    keywords: ['disaster recovery chapel hill', 'water damage chapel hill 4069', 'luxury home restoration', 'storm damage recovery', 'hillside properties'],
  },
  'chermside': {
    title: 'Chermside Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Chermside disaster restoration team. Westfield area, residential & commercial water, fire & mould specialists. Quick northside response. Call 1300 309 361.',
    keywords: ['disaster recovery chermside', 'water damage chermside 4032', 'Westfield Chermside area', 'northside restoration', 'commercial recovery'],
  },
  'clayfield': {
    title: 'Clayfield Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Clayfield\'s premier disaster restoration service. Heritage homes, luxury properties, water & fire damage experts. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery clayfield', 'water damage clayfield 4011', 'heritage home restoration', 'luxury property recovery', 'Eagle Junction area'],
  },
  'cleveland': {
    title: 'Cleveland Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Cleveland bayside disaster restoration specialists. Storm surge, water damage & mould experts. Redland Bay area coverage. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery cleveland', 'water damage cleveland 4163', 'bayside restoration', 'storm surge damage', 'Redland Bay recovery'],
  },
  'eagle-farm': {
    title: 'Eagle Farm Disaster Recovery | Industrial Restoration | 24/7',
    description: 'Eagle Farm industrial & commercial disaster recovery. Warehouse flooding, fire damage specialists. Airport precinct coverage. Insurance experts. Call 1300 309 361.',
    keywords: ['disaster recovery eagle farm', 'industrial restoration 4009', 'warehouse flooding', 'airport precinct', 'commercial recovery'],
  },
  'fortitude-valley': {
    title: 'Fortitude Valley Disaster Recovery | Commercial Restoration | 24/7',
    description: 'Fortitude Valley disaster restoration experts. Nightclub, restaurant & apartment specialists. Water, fire & biohazard recovery. 24/7 response. Call 1300 309 361.',
    keywords: ['disaster recovery fortitude valley', 'commercial restoration 4006', 'restaurant water damage', 'nightclub restoration', 'apartment recovery'],
  },
  'graceville': {
    title: 'Graceville Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Graceville flood & disaster restoration specialists. Riverside properties, heritage homes, water damage experts. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery graceville', 'flood restoration graceville 4075', 'riverside property damage', 'heritage restoration', 'water damage recovery'],
  },
  'hamilton': {
    title: 'Hamilton Disaster Recovery | Luxury Home Restoration | 24/7',
    description: 'Hamilton\'s premier disaster restoration service. Luxury riverside homes, commercial properties, water & fire experts. Insurance specialists. Call 1300 309 361.',
    keywords: ['disaster recovery hamilton', 'luxury home restoration 4007', 'riverside flooding', 'Portside Wharf area', 'commercial recovery'],
  },
  'hawthorne': {
    title: 'Hawthorne Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Hawthorne disaster restoration team. Riverside properties, cinema precinct, water & fire damage specialists. Quick response guaranteed. Call 1300 309 361.',
    keywords: ['disaster recovery hawthorne', 'water damage hawthorne 4171', 'riverside restoration', 'cinema precinct', 'flood recovery'],
  },
  'inala': {
    title: 'Inala Disaster Recovery | Emergency Restoration Services | 24/7',
    description: 'Inala\'s trusted disaster restoration specialists. High-density housing experts, water damage & mould recovery. Quick response from Wacol HQ. Call 1300 309 361.',
    keywords: ['disaster recovery inala', 'water damage inala 4077', 'mould remediation inala', 'storm damage recovery', 'affordable restoration'],
  },
  'kangaroo-point': {
    title: 'Kangaroo Point Disaster Recovery | High-Rise Restoration | 24/7',
    description: 'Kangaroo Point disaster restoration experts. High-rise apartments, cliff-side properties, water & fire specialists. CBD adjacent coverage. Call 1300 309 361.',
    keywords: ['disaster recovery kangaroo point', 'high-rise restoration 4169', 'apartment water damage', 'cliff-side properties', 'CBD area recovery'],
  },
  'kenmore': {
    title: 'Kenmore Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Kenmore disaster restoration specialists. Moggill Creek flooding experts, luxury homes, water & storm damage recovery. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery kenmore', 'flood restoration kenmore 4069', 'Moggill Creek flooding', 'luxury home recovery', 'storm damage'],
  },
  'manly': {
    title: 'Manly Disaster Recovery | Bayside Restoration Services | 24/7',
    description: 'Manly bayside disaster restoration team. Storm surge, water damage & salt damage specialists. Marina & waterfront property experts. Call 1300 309 361.',
    keywords: ['disaster recovery manly', 'bayside restoration manly 4179', 'storm surge damage', 'marina restoration', 'waterfront recovery'],
  },
  'milton': {
    title: 'Milton Disaster Recovery | Commercial Restoration | 24/7',
    description: 'Milton disaster restoration experts. Suncorp Stadium area, commercial & residential water, fire & flood specialists. Quick response. Call 1300 309 361.',
    keywords: ['disaster recovery milton', 'flood restoration milton 4064', 'Suncorp Stadium area', 'commercial water damage', 'office restoration'],
  },
  'morningside': {
    title: 'Morningside Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Morningside disaster restoration specialists. Seven Hills area, residential & commercial water, fire & mould recovery. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery morningside', 'water damage morningside 4170', 'Seven Hills restoration', 'residential recovery', 'mould remediation'],
  },
  'mt-gravatt': {
    title: 'Mount Gravatt Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Mount Gravatt disaster restoration team. Garden City area, university precinct, water & fire damage experts. Quick southside response. Call 1300 309 361.',
    keywords: ['disaster recovery mount gravatt', 'water damage mt gravatt 4122', 'Garden City area', 'university restoration', 'southside recovery'],
  },
  'new-farm': {
    title: 'New Farm Disaster Recovery | Heritage Restoration | 24/7',
    description: 'New Farm\'s premier disaster restoration service. Heritage homes, riverside properties, water & fire specialists. Insurance experts. Call 1300 309 361.',
    keywords: ['disaster recovery new farm', 'heritage restoration 4005', 'riverside flooding', 'Brunswick Street area', 'luxury home recovery'],
  },
  'newstead': {
    title: 'Newstead Disaster Recovery | Commercial Restoration | 24/7',
    description: 'Newstead disaster restoration experts. Gasworks precinct, commercial offices, residential towers. Water, fire & mould specialists. Call 1300 309 361.',
    keywords: ['disaster recovery newstead', 'commercial restoration 4006', 'Gasworks precinct', 'office tower restoration', 'apartment recovery'],
  },
  'norman-park': {
    title: 'Norman Park Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Norman Park disaster restoration team. Norman Creek flooding experts, residential water damage & mould specialists. Quick response. Call 1300 309 361.',
    keywords: ['disaster recovery norman park', 'flood restoration 4170', 'Norman Creek flooding', 'residential water damage', 'mould recovery'],
  },
  'paddington': {
    title: 'Paddington Disaster Recovery | Heritage Restoration | 24/7',
    description: 'Paddington\'s heritage property disaster restoration experts. Queenslander homes, water damage & storm recovery specialists. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery paddington', 'heritage restoration 4064', 'Queenslander restoration', 'Latrobe Terrace area', 'storm damage recovery'],
  },
  'spring-hill': {
    title: 'Spring Hill Disaster Recovery | CBD Edge Restoration | 24/7',
    description: 'Spring Hill disaster restoration specialists. Medical precinct, apartments & heritage buildings. Water, fire & mould experts. Quick CBD response. Call 1300 309 361.',
    keywords: ['disaster recovery spring hill', 'water damage 4000', 'medical precinct restoration', 'apartment recovery', 'heritage building restoration'],
  },
  'st-lucia': {
    title: 'St Lucia Disaster Recovery | University Area Restoration | 24/7',
    description: 'St Lucia disaster restoration team. UQ area, riverside properties, student accommodation specialists. Water & flood damage experts. Call 1300 309 361.',
    keywords: ['disaster recovery st lucia', 'flood restoration 4067', 'UQ area restoration', 'student accommodation', 'riverside recovery'],
  },
  'teneriffe': {
    title: 'Teneriffe Disaster Recovery | Riverside Restoration | 24/7',
    description: 'Teneriffe\'s premier disaster restoration service. Wool stores, luxury apartments, riverside properties. Water, fire & flood specialists. Call 1300 309 361.',
    keywords: ['disaster recovery teneriffe', 'riverside restoration 4005', 'wool store restoration', 'luxury apartment recovery', 'flood damage'],
  },
  'toowong': {
    title: 'Toowong Disaster Recovery | Emergency Restoration | 24/7',
    description: 'Toowong disaster restoration experts. Shopping village area, residential & commercial water, fire & mould recovery. Insurance approved. Call 1300 309 361.',
    keywords: ['disaster recovery toowong', 'water damage toowong 4066', 'Toowong Village area', 'commercial restoration', 'residential recovery'],
  },
  'west-end': {
    title: 'West End Disaster Recovery | Cultural Precinct Restoration | 24/7',
    description: 'West End disaster restoration team. Cultural precinct, riverside properties, cafes & apartments. Water, fire & flood specialists. Call 1300 309 361.',
    keywords: ['disaster recovery west end', 'flood restoration 4101', 'Boundary Street area', 'riverside recovery', 'commercial restoration'],
  },
  'wynnum': {
    title: 'Wynnum Disaster Recovery | Bayside Restoration | 24/7',
    description: 'Wynnum bayside disaster restoration specialists. Storm surge, tidal flooding, water & salt damage experts. Marina area coverage. Call 1300 309 361.',
    keywords: ['disaster recovery wynnum', 'bayside restoration 4178', 'storm surge damage', 'tidal flooding', 'marina restoration'],
  },
};

// Function to update a location page file
function updateLocationPage(filePath, locationKey) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const metadata = locationMetadata[locationKey];

    if (!metadata) {
      console.log(`No metadata configuration for ${locationKey}, skipping...`);
      return;
    }

    // Check if the file already has Metadata import
    if (!content.includes("import { Metadata } from 'next'") && !content.includes('import type { Metadata } from "next"')) {
      // Add the import if it's missing
      if (content.includes('import ')) {
        // Add after the last import
        const lastImportIndex = content.lastIndexOf('import ');
        const endOfLine = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, endOfLine + 1) + "import { Metadata } from 'next';\n" + content.slice(endOfLine + 1);
      } else {
        // Add at the beginning
        content = "import { Metadata } from 'next';\n" + content;
      }
    }

    // Create the new metadata object
    const newMetadata = `export const metadata: Metadata = {
  title: '${metadata.title}',
  description: '${metadata.description}',
  keywords: ${JSON.stringify(metadata.keywords)},
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/${locationKey}',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/locations/${locationKey}',
    },
  },
  openGraph: {
    title: '${metadata.title.replace(' | 24/7', '')}',
    description: '${metadata.description.substring(0, 150)}...',
    url: 'https://disasterrecovery.com.au/locations/${locationKey}',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  },
};`;

    // Replace the existing metadata
    const metadataRegex = /export\s+const\s+metadata\s*[:=]\s*(?:Metadata\s*)?{[\s\S]*?^};/gm;

    if (metadataRegex.test(content)) {
      content = content.replace(metadataRegex, newMetadata);
    } else {
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

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated ${locationKey}`);
  } catch (error) {
    console.error(`✗ Error updating ${locationKey}: ${error.message}`);
  }
}

// Process all location pages
const locationsDir = path.join(__dirname, '..', 'app', 'locations');

// Get all subdirectories in the locations folder
const locations = fs.readdirSync(locationsDir).filter(file => {
  return fs.statSync(path.join(locationsDir, file)).isDirectory();
});

console.log(`Found ${locations.length} location pages to update...`);

locations.forEach(location => {
  const pagePath = path.join(locationsDir, location, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    updateLocationPage(pagePath, location);
  } else {
    console.log(`✗ No page.tsx found for ${location}`);
  }
});

console.log('\nLocation metadata update complete!');
console.log('Remember to run npm run build to verify all changes compile correctly.');