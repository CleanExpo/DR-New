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

// Icon definitions following Option A: Modern SaaS style
const ICONS_TO_GENERATE = [
  {
    name: 'water-damage',
    category: 'Service Icon',
    basePrompt: `Professional UI icon for water damage restoration.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Geometric water droplet with wave.
Lines: Precise thin strokes (1-2px), sharp edges.
Fill: Gradient from teal #00BFA6 to blue #0047FF.
Mood: Professional, technical, engineered.
Constraints: NO rounded blobs, NO playful, NO 3D.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'fire-smoke',
    category: 'Service Icon',
    basePrompt: `Professional UI icon for fire and smoke restoration.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Geometric flame shape with angular edges.
Lines: Precise thin strokes (1-2px), sharp geometry.
Fill: Gradient from orange #F59E0B to red #DC2626.
Mood: Urgent but professional, technical.
Constraints: NO soft curves, NO playful, NO rounded.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'mold-remediation',
    category: 'Service Icon',
    basePrompt: `Professional UI icon for mold remediation.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Geometric growth pattern with clean lines.
Lines: Precise thin strokes (1-2px), mathematical.
Fill: Gradient from green #10b981 to blue #0047FF.
Mood: Clinical, professional, remediation-focused.
Constraints: NO cute mushrooms, NO playful, NO organic curves.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'bio-forensic',
    category: 'Service Icon',
    basePrompt: `Professional UI icon for bio and forensic cleaning.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Clean checkmark or molecular structure.
Lines: Precise thin strokes (1-2px), technical precision.
Fill: Gradient from purple #8b5cf6 to blue #0047FF.
Mood: Serious, professional, scientific.
Constraints: NO cartoons, NO playful, NO simplified.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'iicrc-badge',
    category: 'Trust Badge - Option B (Glassmorphism)',
    basePrompt: `Professional certification badge for IICRC.
Style: Frosted glass (Glassmorphism aesthetic).
Design: Shield or seal shape.
Material: Translucent matte glass appearance.
Lighting: Rim light, subtle subsurface scattering.
Geometry: Sharp, angular (NOT rounded).
Text: "IICRC" integrated into design.
Colors: Primary blue #0047FF with gold accents.
Mood: Premium, authoritative, earned credential.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'verified-badge',
    category: 'Trust Badge',
    basePrompt: `Professional verified badge for contractor.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Checkmark with geometric precision.
Lines: Precise thin strokes (1-2px).
Fill: Gradient from green #10b981 to teal #00BFA6.
Mood: Professional, verified, trustworthy.
Constraints: NO playful, NO rounded, NO 3D.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'emergency-alert',
    category: 'Action Icon',
    basePrompt: `Professional emergency alert icon.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Alert triangle with exclamation.
Lines: Precise thin strokes (1-2px), sharp geometry.
Fill: Gradient from orange #F59E0B to red #DC2626.
Mood: Urgent, professional, clear.
Constraints: NO rounded, NO playful, NO soft.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'phone-call',
    category: 'Action Icon',
    basePrompt: `Professional phone/call icon.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Phone handset with geometric precision.
Lines: Precise thin strokes (1-2px).
Fill: Gradient from teal #00BFA6 to blue #0047FF.
Mood: Professional, accessible, clear.
Constraints: NO bubbly, NO playful, NO rounded.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'chat-message',
    category: 'Action Icon',
    basePrompt: `Professional chat/message icon.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Speech bubble with geometric precision.
Lines: Precise thin strokes (1-2px).
Fill: Gradient from blue #0047FF to purple #8b5cf6.
Mood: Professional communication, accessible.
Constraints: NO rounded bubbles, NO playful, NO soft.
Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'schedule-calendar',
    category: 'Action Icon',
    basePrompt: `Professional schedule/calendar icon.
Style: Thin gradient line art (Modern SaaS aesthetic).
Design: Calendar grid with geometric precision.
Lines: Precise thin strokes (1-2px).
Fill: Gradient from blue #0047FF to teal #00BFA6.
Mood: Professional, technical, precise.
Constraints: NO playful, NO rounded, NO simplified.
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

This is for a professional disaster recovery platform. The aesthetic must be enterprise-grade, not playful.`;

  try {
    const client = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Use Gemini 3 Pro Image Preview (the latest image generation model in January 2026)
    const model = client.getGenerativeModel({ model: 'gemini-3-pro-image-preview' });

    const result = await model.generateContent(prompt);

    if (result && result.response) {
      console.log(`✅ Generated: ${iconDef.name}`);
      return {
        name: iconDef.name,
        success: true,
        content: result.response.text(),
      };
    } else {
      console.log(`⚠️  No response from API for ${iconDef.name}`);
      resolve({
        name: iconDef.name,
        success: false,
        reason: 'No response content from API',
      });
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
  console.log('🎨 NRPG Professional Icon Generator');
  console.log('=====================================\n');
  console.log(`Generating ${ICONS_TO_GENERATE.length} professional icons...`);
  console.log(`Style: Option A - Modern SaaS (thin gradient line art)`);
  console.log(`Aesthetic: Enterprise-grade (NO playful/toy styles)\n`);

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
