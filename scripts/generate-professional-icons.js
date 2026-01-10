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

// Icon definitions following "Pop-Out" Layered 3D Style (High-Fidelity)
const ICONS_TO_GENERATE = [
  {
    name: 'water-damage',
    category: 'Service Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Water Damage'.

Composition: A stacked, layered composition.

Front Layer: A clean, minimalist architectural structure of a building foundation (white matte finish, geometric).

Middle Layer: Stylised, intense cyan and deep blue water waves surging from behind the building structure, with realistic water splash geometry.

Back Layer: Volumetric water droplets and mist extending upwards.

The 'Pop-out' Effect: The large water droplets and splash should extend slightly outside the imaginary upper border of the icon's bounding box, creating a depth effect where the flood element breaks the frame.

Style: Engineered 3D. Use a premium matte material with satin lustre. No glossy plastic. Hard, defined edges with slight filleting (rounded corners). Colour: Deep Blue (#0047FF) and Cyan (#00BFA6) gradient. Lighting: Cinematic rim lighting to separate the layers, cool blue volumetric light. Background: Dark Navy (#111827).

Constraint: No cartoon features, no low-poly shapes, no clay texture. Must look like a serious SaaS interface element.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'fire-smoke',
    category: 'Service Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Fire Damage'.

Composition: A stacked, layered composition.

Front Layer: A clean, minimalist architectural structure of a house (white matte finish).

Middle Layer: Stylised, intense orange and amber flames rising from behind the house structure with realistic fire geometry and crackling edges.

Back Layer: Volumetric dark grey smoke billowing upwards with turbulent, organic volumetric movement.

The 'Pop-out' Effect: The dark smoke should extend slightly outside the imaginary upper border of the icon's bounding box, creating a depth effect where the element breaks the frame.

Style: Engineered 3D. Use a premium matte material with satin lustre. No glossy plastic. Hard, defined edges with slight filleting (rounded corners). Colour: Orange (#F59E0B) to Red (#DC2626) gradient. Lighting: Cinematic rim lighting with warm golden highlights to separate the layers. Background: Dark Navy (#111827).

Constraint: No cartoon eyes, no low-poly shapes, no clay texture. Must look like a serious SaaS interface element.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'mould-remediation',
    category: 'Service Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Mould Remediation'.

Composition: A stacked, layered composition.

Front Layer: A clean, minimalist architectural wall structure (white matte finish, geometric).

Middle Layer: Stylised mould growth pattern spreading across the wall in dark green, with crystalline geometric structures representing contamination spreading.

Back Layer: Volumetric containment/remediation shield or barrier with light containment rays breaking through.

The 'Pop-out' Effect: The mould growth and remediation barrier should extend slightly outside the imaginary border, creating a depth effect where the hazard and solution break the frame.

Style: Engineered 3D. Use a premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Green (#10b981) to Blue (#0047FF) gradient with clinical teal accents. Lighting: Cinematic rim lighting with cool blue-green volumetric highlights. Background: Dark Navy (#111827).

Constraint: No cute mushrooms, no cartoon features, no organic blobs. Must look clinical and professional.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'bio-forensic',
    category: 'Service Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Bio-Forensic Cleaning'.

Composition: A stacked, layered composition.

Front Layer: A minimalist geometric shield or containment structure (white matte finish, protective shape).

Middle Layer: Stylised biohazard/contamination pattern with geometric molecular structures or hazmat symbols, represented in deep purple and violet.

Back Layer: Volumetric cleaning/remediation rays or sterilization light breaking through from behind, with energy-like geometric patterns.

The 'Pop-out' Effect: The sterilization rays and cleaning energy should extend slightly outside the icon's borders, breaking the frame to create depth.

Style: Engineered 3D. Use a premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Purple (#8b5cf6) to Blue (#0047FF) gradient with white sterilization accents. Lighting: Cinematic rim lighting with scientific precision, volumetric light rays. Background: Dark Navy (#111827).

Constraint: No cartoon biohazard symbols, no low-poly shapes, no playful elements. Must look scientific and serious.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'iicrc-badge',
    category: 'Trust Badge',
    basePrompt: `Generate a professional 3D UI icon for 'IICRC Certification'.

Composition: A stacked, layered composition.

Front Layer: A minimalist shield or seal shape with clean geometric edges (white matte finish).

Middle Layer: Layered certification ribbons and security patterns in Gold (#FFD700) wrapping around the shield, with official certification markings.

Back Layer: Volumetric light rays emanating from behind the shield, suggesting authority and trust.

The 'Pop-out' Effect: The certification light rays and ribbon should extend slightly outside the icon's borders, creating a depth effect where the authority symbol breaks the frame.

Style: Engineered 3D with Glassmorphism elements. Premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Primary Blue (#0047FF) with Gold (#FFD700) accents. Lighting: Cinematic rim lighting with volumetric trust rays. Background: Dark Navy (#111827).

Constraint: No cheap plastic look, no cartoon features, no emojis. Must look premium, authoritative, and trustworthy.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'verified-badge',
    category: 'Trust Badge',
    basePrompt: `Generate a professional 3D UI icon for 'Verified Professional'.

Composition: A stacked, layered composition.

Front Layer: A minimalist shield or badge shape with clean geometric lines (white matte finish).

Middle Layer: A large checkmark with geometric precision, rendered in vibrant green and teal, appearing to emerge from the shield.

Back Layer: Volumetric verification light or energy rays bursting outward, suggesting confirmation and trust.

The 'Pop-out' Effect: The checkmark and verification rays should extend slightly outside the icon's borders, breaking the frame to emphasize validation.

Style: Engineered 3D. Premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Green (#10b981) to Teal (#00BFA6) gradient. Lighting: Cinematic rim lighting with bright verification highlights. Background: Dark Navy (#111827).

Constraint: No cartoon features, no inflated shapes, no emojis. Must look professional and trustworthy.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'emergency-alert',
    category: 'Action Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Emergency Alert'.

Composition: A stacked, layered composition with urgency.

Front Layer: A minimalist geometric alert triangle with sharp, defined edges (white matte finish).

Middle Layer: Intense warning patterns and exclamation marks in orange and red, radiating from the triangle with crackling energy geometry.

Back Layer: Volumetric danger waves or alert pulses bursting outward in dark red, suggesting immediate urgency.

The 'Pop-out' Effect: The alert waves and danger pulses should extend significantly outside the icon's borders, breaking the frame to convey urgency and draw attention.

Style: Engineered 3D with angular precision. Premium matte material. Hard, defined edges with minimal filleting (angular corners). Colour: Orange (#F59E0B) to Red (#DC2626) gradient. Lighting: Cinematic rim lighting with urgent amber highlights. Background: Dark Navy (#111827).

Constraint: No cartoon features, no rounded softness, no emojis. Must look urgent and serious.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'phone-call',
    category: 'Action Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Phone Support'.

Composition: A stacked, layered composition.

Front Layer: A minimalist phone handset or receiver shape with geometric precision (white matte finish).

Middle Layer: Communication waves or signal rings emanating from the phone in teal and blue, suggesting active communication.

Back Layer: Volumetric connection rays or sound waves bursting outward from the handset in lighter blue tones.

The 'Pop-out' Effect: The communication waves and connection rays should extend slightly outside the icon's borders, breaking the frame to suggest outreach and connectivity.

Style: Engineered 3D. Premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Teal (#00BFA6) to Blue (#0047FF) gradient. Lighting: Cinematic rim lighting with cool communication highlights. Background: Dark Navy (#111827).

Constraint: No cartoon features, no inflated shapes, no emojis. Must look professional and accessible.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'chat-message',
    category: 'Action Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Chat Support'.

Composition: A stacked, layered composition.

Front Layer: A minimalist speech bubble or message shape with clean geometric lines (white matte finish).

Middle Layer: Message text lines or communication patterns inside and around the bubble in blue and purple, suggesting conversation flow.

Back Layer: Volumetric conversation rays or interactive energy bursting from behind the bubble in lighter purple tones.

The 'Pop-out' Effect: The conversation rays and communication energy should extend slightly outside the icon's borders, breaking the frame to suggest active dialogue.

Style: Engineered 3D. Premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Blue (#0047FF) to Purple (#8b5cf6) gradient. Lighting: Cinematic rim lighting with interactive communication highlights. Background: Dark Navy (#111827).

Constraint: No cartoon features, no inflated bubbles, no emojis. Must look professional and modern.

Output: SVG 512x512px, transparent background.`,
  },
  {
    name: 'schedule-calendar',
    category: 'Action Icon',
    basePrompt: `Generate a professional 3D UI icon for 'Schedule Appointment'.

Composition: A stacked, layered composition.

Front Layer: A minimalist calendar grid or date selector with geometric precision (white matte finish).

Middle Layer: Date indicators, check marks, or time elements rendered in blue and teal, showing scheduling information.

Back Layer: Volumetric time rays or scheduling energy emanating outward in lighter teal tones, suggesting time and organization.

The 'Pop-out' Effect: The time rays and scheduling energy should extend slightly outside the icon's borders, breaking the frame to suggest planning and forward movement.

Style: Engineered 3D. Premium matte material with satin lustre. Hard, defined edges with slight filleting. Colour: Blue (#0047FF) to Teal (#00BFA6) gradient. Lighting: Cinematic rim lighting with time-precision highlights. Background: Dark Navy (#111827).

Constraint: No cartoon features, no inflated shapes, no emojis. Must look professional and precise.

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
  console.log('🎨 NRPG Professional Icon Generator - "Pop-Out" Layered 3D');
  console.log('=========================================================\n');
  console.log(`Generating ${ICONS_TO_GENERATE.length} professional icons...`);
  console.log(`Style: "Pop-Out" Layered 3D Composition`);
  console.log(`Aesthetic: Multi-layered SaaS icons with frame-breaking depth effects\n`);

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
