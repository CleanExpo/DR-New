#!/usr/bin/env node

/**
 * Generate Professional Icons - Option A: Modern SaaS
 *
 * Creates professional, thin-line gradient art icons for:
 * - Service categories (Water, Fire, Mold, Bio)
 * - Trust badges (IICRC, Verified, Insured)
 * - Action icons (Emergency, Call, Chat, Schedule)
 *
 * Style: Thin gradient line art (NOT playful/toy aesthetic)
 * Following ICON_STYLE_GUIDE.md Option A
 */

const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Read API key from .env.local
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
    console.error('❌ Could not read .env.local');
  }
}

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found');
  process.exit(1);
}

// Icon definitions following Premium Industrial 3D Style (High-Fidelity)
const ICONS_TO_GENERATE = [
  {
    name: 'water-damage',
    category: 'Service Icon',
    basePrompt: `Subject: A single, distinct 3D icon representing 'Water Damage' (a stylised water droplet or flood wave).

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte resin or satin-finished metal. Lighting: Professional studio lighting with soft shadows to emphasise the 3D form. Colour: Deep Blue (#0047FF) and Cyan (#00BFA6) gradient. Background: Dark Navy (#111827).

Negative Constraint: Do NOT use claymorphism, inflated balloon shapes, emojis, or cartoon features. No low-resolution textures. Must look realistic and professional.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'fire-smoke',
    category: 'Service Icon',
    basePrompt: `Subject: A single, distinct 3D icon representing 'Fire & Smoke Damage' (a stylised flame with smoke wisps).

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte resin with subtle satin lustre. Lighting: Professional studio lighting with warm golden highlights and deep shadows. Colour: Orange (#F59E0B) to Red (#DC2626) gradient with depth shading. Background: Dark Navy (#111827).

Negative Constraint: Do NOT use claymorphism, inflated balloon shapes, emojis, or cartoon features. No puffy clouds. Must look realistic and urgent.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'mould-remediation',
    category: 'Service Icon',
    basePrompt: `Subject: A single, distinct 3D icon representing 'Mould Remediation' (a geometric containment symbol or remediation shield).

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte engineering plastic. Lighting: Professional studio lighting with cool blue-green highlights. Colour: Green (#10b981) to Blue (#0047FF) gradient with depth shading. Background: Dark Navy (#111827).

Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, cartoons, or cute mushrooms. Must look clinical and professional.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'bio-forensic',
    category: 'Service Icon',
    basePrompt: `Subject: A single, distinct 3D icon representing 'Bio-Forensic Cleaning' (a molecular structure or scientific shield).

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte metal or resin with subtle industrial finish. Lighting: Professional studio lighting with scientific precision highlights. Colour: Purple (#8b5cf6) to Blue (#0047FF) gradient with depth shading. Background: Dark Navy (#111827).

Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, cartoons, or toy aesthetics. Must look scientific and serious.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'iicrc-badge',
    category: 'Trust Badge',
    basePrompt: `Subject: A professional 3D IICRC certification badge/seal.

Style: 3D Glassmorphism Icon. Details: The object should feature layered depth with thick, frosted glass elements. Use rounded edges on all geometric shapes. Include realistic light refraction and soft internal glows to show volume. The style should be architectural and premium.

Design: Shield or seal shape with "IICRC" text integrated. Colour: Primary Blue (#0047FF) with Gold (#FFD700) accents. Lighting: Volumetric lighting highlighting edges and curves. Background: Dark Navy (#111827).

Negative Constraint: Do NOT use claymorphism, emojis, cartoons, or cheap plastic look. Must look premium and authoritative.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'verified-badge',
    category: 'Trust Badge',
    basePrompt: `Subject: A professional 3D verified/checkmark badge.

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte resin with satin finish. Lighting: Professional studio lighting with clear shadows. Colour: Green (#10b981) to Teal (#00BFA6) gradient with depth shading. Background: Dark Navy (#111827).

Design: Shield or badge shape with integrated checkmark. Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, or cartoons. Must look professional and trustworthy.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'emergency-alert',
    category: 'Action Icon',
    basePrompt: `Subject: A professional 3D emergency alert icon.

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte resin or warning-grade plastic. Lighting: Professional studio lighting with urgent amber/red highlights. Colour: Orange (#F59E0B) to Red (#DC2626) gradient. Background: Dark Navy (#111827).

Design: Alert triangle with exclamation mark. Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, or cartoons. Must look urgent but professional.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'phone-call',
    category: 'Action Icon',
    basePrompt: `Subject: A professional 3D phone/call icon.

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte metal or resin with satin lustre. Lighting: Professional studio lighting with cool highlights. Colour: Teal (#00BFA6) to Blue (#0047FF) gradient. Background: Dark Navy (#111827).

Design: Phone handset or handset receiver. Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, or cartoons. Must look professional and accessible.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'chat-message',
    category: 'Action Icon',
    basePrompt: `Subject: A professional 3D chat/message icon.

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte resin. Lighting: Professional studio lighting with soft shadows. Colour: Blue (#0047FF) to Purple (#8b5cf6) gradient. Background: Dark Navy (#111827).

Design: Speech bubble or message chat symbol. Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, cartoons, or soft rounded bubbles. Must look professional and modern.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'schedule-calendar',
    category: 'Action Icon',
    basePrompt: `Subject: A professional 3D schedule/calendar icon.

Style: High-Fidelity 3D Product Design. Details: The object should have depth and volume with smooth, rounded edges. The material should look like premium matte metal or resin. Lighting: Professional studio lighting with geometric precision. Colour: Blue (#0047FF) to Teal (#00BFA6) gradient. Background: Dark Navy (#111827).

Design: Calendar grid or date selector. Negative Constraint: Do NOT use claymorphism, inflated shapes, emojis, or cartoons. Must look professional and precise.

Output: SVG 512x512px, transparent background.`,
  },
];

async function generateIcon(iconDef) {
  console.log(`⏳ Generating: ${iconDef.name} (${iconDef.category})...`);

  const prompt = `Generate a professional UI icon following these specifications:

${iconDef.basePrompt}

CRITICAL CONSTRAINTS (Apply to ALL):
- NO claymorphism, soft 3D, inflated shapes
- NO emojis, cartoonish styles, playful aesthetics
- NO rounded blobs, toy textures, cute features
- YES: Sharp edges, precision, professional mood
- YES: Industrial, serious, trusted appearance
- YES: High contrast, technical clarity

This is for a professional disaster recovery platform. The aesthetic must be enterprise-grade, not playful.

OUTPUT ONLY: Valid SVG code, no additional text or markdown formatting.`;

  try {
    const client = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Use Gemini 3 Pro Image Preview (the latest image generation model in January 2026)
    const model = client.getGenerativeModel({ model: 'gemini-3-pro-image-preview' });

    const result = await model.generateContent(prompt);

    if (result && result.response) {
      const responseText = result.response.text();

      // Save SVG response to file
      const assetDir = path.join(process.cwd(), 'public', 'generated-assets');
      if (!fs.existsSync(assetDir)) {
        fs.mkdirSync(assetDir, { recursive: true });
      }

      const filename = `${iconDef.name}.svg`;
      const filepath = path.join(assetDir, filename);

      // Extract SVG content if wrapped in markdown code blocks
      let svgContent = responseText;
      const svgMatch = responseText.match(/<svg[\s\S]*<\/svg>/);
      if (svgMatch) {
        svgContent = svgMatch[0];
      }

      fs.writeFileSync(filepath, svgContent, 'utf-8');

      console.log(`✅ Generated: ${iconDef.name} → ${filepath}`);
      return {
        name: iconDef.name,
        success: true,
        filepath,
        size: svgContent.length,
      };
    } else {
      console.log(`⚠️  No response from API for ${iconDef.name}`);
      return {
        name: iconDef.name,
        success: false,
        reason: 'No response content from API',
      };
    }
  } catch (error) {
    const errorMsg = error.message || String(error);
    console.log(`⚠️  Error generating ${iconDef.name}: ${errorMsg}`);
    return {
      name: iconDef.name,
      success: false,
      reason: errorMsg,
    };
  }
}

async function generateAllIcons() {
  console.log('🎨 NRPG Professional Icon Generator - High-Fidelity 3D');
  console.log('=====================================================\n');
  console.log(`Generating ${ICONS_TO_GENERATE.length} professional icons...`);
  console.log(`Style: Premium Industrial 3D Product Design`);
  console.log(`Aesthetic: High-fidelity realistic icons with matte finish\n`);

  const results = [];

  for (let i = 0; i < ICONS_TO_GENERATE.length; i++) {
    const icon = ICONS_TO_GENERATE[i];
    try {
      const result = await generateIcon(icon);
      results.push(result);

      // Delay between requests
      if (i < ICONS_TO_GENERATE.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ Error generating ${icon.name}:`, error.message);
      results.push({
        name: icon.name,
        success: false,
        reason: error.message,
      });
    }
  }

  console.log('\n📊 Generation Summary');
  console.log('====================\n');

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}\n`);

  if (failed.length > 0) {
    console.log('⚠️  Generation Issues:');
    failed.forEach((r) => {
      console.log(`  • ${r.name}: ${r.reason}`);
    });
  }

  console.log('\n📝 Important Notes:\n');
  console.log('Gemini 2.5 Flash does NOT support image/icon generation.');
  console.log('To generate production-grade professional icons, you need:');
  console.log('');
  console.log('Option 1: Upgrade to Gemini 3 Pro API');
  console.log('  - Higher capability model with image generation');
  console.log('  - Cost: ~$0.005 per image');
  console.log('  - Update: lib/ai/design-generator.service.ts line 106');
  console.log('');
  console.log('Option 2: Use Google Imagen API');
  console.log('  - Dedicated image generation model');
  console.log('  - Separate API integration required');
  console.log('');
  console.log('Option 3: Manual Icon Design');
  console.log('  - Use Figma, Sketch, or Adobe XD');
  console.log('  - Follow ICON_STYLE_GUIDE.md specifications');
  console.log('  - Export as SVG');
  console.log('');
  console.log('Next Steps:');
  console.log('1. Decide on icon generation approach');
  console.log('2. If using Gemini 3 Pro: Update model and re-run');
  console.log('3. If manual design: Use ICON_STYLE_GUIDE.md as reference');
  console.log('4. Deploy placeholder SVG icons in meantime');
  console.log('');
}

// Run generation
generateAllIcons().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
