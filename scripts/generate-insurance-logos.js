#!/usr/bin/env node

/**
 * Generate Insurance Partner Logos via Gemini AI
 * Creates SVG-style logos for: NRMA, RACV, AAMI, Suncorp, Allianz
 * Output: public/logos/[company]-logo.svg
 * Cost: ~$0.001 per logo (5 logos = $0.005)
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load API key from .env.local if not in process.env
let GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const envMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
    if (envMatch) {
      GEMINI_API_KEY = envMatch[1].trim();
    }
  } catch (err) {
    // Silently ignore if .env.local doesn't exist
  }
}

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment or .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });

const INSURANCE_COMPANIES = [
  {
    name: 'NRMA',
    industry: 'Australian Motor & Home Insurance',
    style: 'Bold blue and white corporate logo',
  },
  {
    name: 'RACV',
    industry: 'Victoria Motor & Road Services',
    style: 'Dark blue and white professional badge',
  },
  {
    name: 'AAMI',
    industry: 'Car, Home & Contents Insurance',
    style: 'Orange and blue modern corporate logo',
  },
  {
    name: 'Suncorp',
    industry: 'General Insurance Provider',
    style: 'Multi-color modern insurance logo',
  },
  {
    name: 'Allianz',
    industry: 'Global Insurance Company',
    style: 'Blue and white triangle corporate logo',
  },
];

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

async function generateLogo(company) {
  const prompt = `
Create a professional vector-style logo for ${company.name} insurance company.

COMPANY DETAILS:
- Name: ${company.name}
- Industry: ${company.industry}
- Logo Style: ${company.style}

DESIGN REQUIREMENTS:
- Corporate professional aesthetic
- Clean, modern design
- Australian insurance industry standards
- Suitable for web and print
- Transparent background (implied by design)
- Color harmony with NRPG blue (#0047FF)
- Scalable vector-compatible design

TECHNICAL SPECIFICATIONS:
- 500x500px canvas
- High contrast for readability
- Professional quality suitable for institutional trust signals
- Corporate trustworthiness

OUTPUT: Professional insurance company logo that would appear on a disaster recovery platform.
AVOID: Cartoons, text-heavy designs, outdated styles, unrealistic graphics.
`;

  console.log(`\n🎨 Generating logo for ${company.name}...`);

  try {
    const response = await model.generateContent(prompt);

    // Extract image from response
    let imageData = null;
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data;
        break;
      }
    }

    if (!imageData) {
      throw new Error('No image data in response');
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(imageData, 'base64');

    // Create directory if it doesn't exist
    if (!fs.existsSync(LOGOS_DIR)) {
      fs.mkdirSync(LOGOS_DIR, { recursive: true });
    }

    // Save as PNG
    const outputPath = path.join(LOGOS_DIR, `${company.name.toLowerCase()}-logo.png`);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Logo saved: ${outputPath}`);
    console.log(`📊 Size: ${(buffer.length / 1024).toFixed(2)} KB`);

    return { company: company.name, success: true, path: outputPath };
  } catch (error) {
    console.error(`❌ Error generating ${company.name} logo:`, error.message);
    return { company: company.name, success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Insurance Logo Generation Script');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📁 Output directory: ${LOGOS_DIR}`);
  console.log(`🏢 Companies: ${INSURANCE_COMPANIES.map((c) => c.name).join(', ')}`);
  console.log(`💰 Estimated cost: $0.005 (5 logos × $0.001 each)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];

  for (const company of INSURANCE_COMPANIES) {
    const result = await generateLogo(company);
    results.push(result);

    // Small delay between API calls
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Summary
  console.log('\n📋 Generation Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const successful = results.filter((r) => r.success).length;
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${results.length - successful}/${results.length}`);

  results.forEach((r) => {
    const status = r.success ? '✅' : '❌';
    console.log(`${status} ${r.company}: ${r.success ? r.path : r.error}`);
  });

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (successful === results.length) {
    console.log('\n🎉 All logos generated successfully!');
    console.log(`📍 Logos are ready at: public/logos/`);
    console.log(`\n✨ Next step: Update InsurancePartners component to reference new logos`);
    process.exit(0);
  } else {
    console.error('\n⚠️  Some logos failed to generate');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
