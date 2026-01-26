/**
 * Generate Hero Images for 27 Sub-Service Pages
 * Uses Gemini 2.5 Flash Image (Nano Banana Pro) for high-quality 2K images
 *
 * Run: cd apps/web && npx tsx ../../scripts/generate-service-hero-images.ts
 * Requires: GEMINI_API_KEY in apps/web/.env.local
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load environment variables from all available .env.local files
const envPaths = [
  path.join(process.cwd(), '..', '..', '.env.local'), // Root first
  path.join(process.cwd(), '.env.local'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^([^#=]+)=["']?([^"'\n]*)["']?$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    });
    console.log(`Loaded env from: ${envPath}`);
  }
}

if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found. Add it to .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });

// Base output directory
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'services');

interface ImageSpec {
  category: string;
  slug: string;
  filename: string;
  prompt: string;
}

const NEGATIVE_PROMPT = 'people, faces, gore, blood, text, watermarks, logos, cartoon, illustration, 3D render, CGI, unrealistic';

const STYLE_BASE = 'Professional commercial photography of restoration service equipment. Clean, bright, modern, high-detail, sharp focus.';

// All 27 sub-service image specifications - EQUIPMENT FOCUSED
const IMAGE_SPECS: ImageSpec[] = [
  // ═══════════════════════════════════════════
  // WATER DAMAGE (7)
  // ═══════════════════════════════════════════
  {
    category: 'water-damage',
    slug: 'basement-flooding',
    filename: 'basement-flooding-hero.webp',
    prompt: `Professional product photography of industrial water extraction equipment in a clean warehouse setting.
SCENE: Orange industrial submersible pump with heavy-duty extraction hoses coiled neatly. Equipment displayed on clean concrete floor. Professional lighting. Modern restoration equipment showroom aesthetic.
CAMERA: 35mm lens, f/4, product photography style. Cool blue-teal colour grading.
LIGHTING: Professional studio lighting with soft shadows.`,
  },
  {
    category: 'water-damage',
    slug: 'burst-pipe-repair',
    filename: 'burst-pipe-repair-hero.webp',
    prompt: `Professional product photography of industrial dehumidifiers and air movers in a clean showroom.
SCENE: Row of blue industrial dehumidifiers and yellow high-velocity air movers arranged professionally. Clean white background. Professional equipment display. Modern restoration technology showcase.
CAMERA: 28mm lens, f/5.6, commercial product photography. Bright clean colour grading.
LIGHTING: Bright even professional lighting.`,
  },
  {
    category: 'water-damage',
    slug: 'flood-restoration',
    filename: 'flood-restoration-hero.webp',
    prompt: `Professional photograph of large-scale industrial drying equipment fleet in a warehouse.
SCENE: Multiple commercial dehumidifiers, air movers, and extraction units arranged in organised rows. Clean warehouse floor. Professional equipment ready for deployment. Fleet of restoration machinery.
CAMERA: Wide angle 24mm, f/5.6. Professional commercial photography.
LIGHTING: Bright warehouse lighting showing equipment scale.`,
  },
  {
    category: 'water-damage',
    slug: 'ceiling-water-damage',
    filename: 'ceiling-water-damage-hero.webp',
    prompt: `Professional product photography of thermal imaging camera and moisture detection equipment.
SCENE: Professional FLIR thermal imaging camera on tripod with colourful display screen. Digital moisture metres arranged on clean white table. Professional inspection tools. Technical equipment showcase.
CAMERA: 50mm lens, f/2.8, sharp focus on thermal camera screen. Technical product photography.
LIGHTING: Professional studio lighting with equipment screens visible.`,
  },
  {
    category: 'water-damage',
    slug: 'carpet-water-damage',
    filename: 'carpet-water-damage-hero.webp',
    prompt: `Professional product photography of carpet cleaning and extraction equipment.
SCENE: Professional carpet extraction machine with wand attachment. Industrial wet vacuum and carpet stretching tools displayed. Clean showroom setting. Professional floor care equipment.
CAMERA: 35mm lens, f/4, product photography style. Warm professional colour grading.
LIGHTING: Bright professional lighting with soft shadows.`,
  },
  {
    category: 'water-damage',
    slug: 'commercial-water-damage',
    filename: 'commercial-water-damage-hero.webp',
    prompt: `Professional photograph of commercial-scale restoration equipment in large warehouse.
SCENE: Large commercial desiccant dehumidifiers and industrial air movers arranged in warehouse. Multiple units showing scale of commercial operation capability. Professional fleet of equipment. Clean organised staging.
CAMERA: Wide angle 20mm, f/5.6, showing equipment scale. Commercial photography style.
LIGHTING: Bright commercial warehouse lighting.`,
  },
  {
    category: 'water-damage',
    slug: 'structural-drying',
    filename: 'structural-drying-hero.webp',
    prompt: `Professional product photography of structural drying systems and monitoring equipment.
SCENE: Industrial desiccant dehumidifier with ducting connections. Digital moisture monitoring system with display. Injectidry wall drying panels. Professional drying technology on display.
CAMERA: 35mm lens, f/4, technical product photography. Cool blue-teal colour grading.
LIGHTING: Professional technical lighting with equipment details sharp.`,
  },

  // ═══════════════════════════════════════════
  // FIRE & SMOKE DAMAGE (5)
  // ═══════════════════════════════════════════
  {
    category: 'fire-smoke-damage',
    slug: 'fire-damage-restoration',
    filename: 'fire-damage-restoration-hero.webp',
    prompt: `Professional product photography of industrial air scrubbers and HEPA filtration equipment.
SCENE: Large industrial HEPA air scrubbers with bright orange housings. Negative air machines with ducting. Professional air cleaning technology displayed in clean warehouse. Modern restoration equipment.
CAMERA: 35mm lens, f/4, product photography. Warm amber accent lighting.
LIGHTING: Professional studio lighting with dramatic accents.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'smoke-damage-restoration',
    filename: 'smoke-damage-restoration-hero.webp',
    prompt: `Professional product photography of HEPA air purification and cleaning equipment.
SCENE: Row of industrial HEPA air scrubbers with blue and silver housings. Professional cleaning supplies organised neatly - sponges, solutions in spray bottles. Clean staging area with equipment ready.
CAMERA: 28mm lens, f/5.6, commercial product photography. Clean professional colour grading.
LIGHTING: Bright professional even lighting.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'smoke-odor-removal',
    filename: 'smoke-odor-removal-hero.webp',
    prompt: `Professional product photography of odour removal equipment and air treatment technology.
SCENE: Industrial ozone generator, hydroxyl radical generator, and thermal fogger displayed professionally. Modern air treatment equipment with digital controls. Clean white showroom setting.
CAMERA: 35mm lens, f/4, technical product photography. Clean modern colour grading.
LIGHTING: Professional studio lighting with equipment details visible.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'soot-removal',
    filename: 'soot-removal-hero.webp',
    prompt: `Professional product photography of industrial HEPA vacuum and cleaning equipment.
SCENE: Professional HEPA vacuum with specialised attachments. Chemical dry-cleaning sponges and professional cleaning solutions arranged neatly. Clean supplies on white background. Professional cleaning toolkit.
CAMERA: 50mm lens, f/2.8, product photography style. Neutral professional colour grading.
LIGHTING: Bright even professional product lighting.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'commercial-fire-damage',
    filename: 'commercial-fire-damage-hero.webp',
    prompt: `Professional photograph of large-scale commercial air filtration equipment fleet.
SCENE: Multiple large industrial air scrubbers and negative air machines in warehouse. Commercial-scale restoration equipment showing operational capability. Orange and silver industrial equipment.
CAMERA: Wide angle 20mm, f/5.6, showing equipment scale. Commercial photography.
LIGHTING: Bright warehouse lighting.`,
  },

  // ═══════════════════════════════════════════
  // MOULD REMEDIATION (5)
  // ═══════════════════════════════════════════
  {
    category: 'mould-remediation',
    slug: 'black-mould-removal',
    filename: 'black-mould-removal-hero.webp',
    prompt: `Professional product photography of containment and HEPA filtration equipment.
SCENE: Professional negative air machine with HEPA filter. Rolls of polyethylene containment sheeting. Antimicrobial treatment sprayers. Clean white equipment on clean background. Professional remediation tools.
CAMERA: 35mm lens, f/4, product photography. Clean teal-green accent colour grading.
LIGHTING: Professional clean bright lighting.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-inspection',
    filename: 'mould-inspection-hero.webp',
    prompt: `Professional product photography of inspection and testing equipment.
SCENE: Professional thermal imaging camera with colourful display. Digital moisture metres with probes. Hygrometer. Air quality monitoring device. Technical inspection equipment arranged on clean table.
CAMERA: 50mm lens, f/2.8, sharp focus on equipment screens. Technical photography style.
LIGHTING: Professional lighting with visible equipment displays.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-testing',
    filename: 'mould-testing-hero.webp',
    prompt: `Professional product photography of laboratory air sampling equipment.
SCENE: Professional air sampling pump with bio-cassettes. Surface sampling swab kits. Calibrated flow metres. Laboratory sample containers with labels. Clean scientific equipment display.
CAMERA: 50mm lens, f/4, scientific product photography. Clean clinical colour grading.
LIGHTING: Bright even professional lighting for scientific documentation.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-prevention',
    filename: 'mould-prevention-hero.webp',
    prompt: `Professional photograph of modern ventilation and dehumidification equipment.
SCENE: Modern exhaust ventilation fan. Compact home dehumidifier. Air quality monitor with digital display. Clean modern home improvement products. Fresh clean aesthetic.
CAMERA: 35mm lens, f/4, lifestyle product photography. Bright warm colour grading.
LIGHTING: Bright natural-looking professional lighting.`,
  },
  {
    category: 'mould-remediation',
    slug: 'commercial-mould-remediation',
    filename: 'commercial-mould-remediation-hero.webp',
    prompt: `Professional photograph of commercial HEPA filtration fleet in warehouse.
SCENE: Multiple large commercial HEPA air filtration units. Industrial negative air machines. Commercial dehumidifiers. Large-scale professional equipment fleet ready for deployment.
CAMERA: Wide angle 20mm, f/5.6, showing equipment scale. Commercial photography.
LIGHTING: Bright commercial warehouse lighting.`,
  },

  // ═══════════════════════════════════════════
  // STORM DAMAGE (5)
  // ═══════════════════════════════════════════
  {
    category: 'storm-damage',
    slug: 'roof-storm-damage',
    filename: 'roof-storm-damage-hero.webp',
    prompt: `Professional photograph of roofing repair equipment and safety gear.
SCENE: Professional roofing tools arranged neatly - safety harness, tool belt, replacement tiles stacked. Extension ladder. Professional roofing equipment on clean background. Blue sky backdrop.
CAMERA: 35mm lens, f/5.6, product photography with outdoor feel. Natural colour grading.
LIGHTING: Bright natural daylight aesthetic.`,
  },
  {
    category: 'storm-damage',
    slug: 'wind-damage-restoration',
    filename: 'wind-damage-restoration-hero.webp',
    prompt: `Professional photograph of building restoration tools and equipment.
SCENE: Professional construction tools - power tools, structural bracing equipment, safety barriers. Professional restoration equipment staged in clean organised manner. Building repair toolkit.
CAMERA: 28mm lens, f/5.6, commercial product photography. Professional colour grading.
LIGHTING: Bright professional lighting.`,
  },
  {
    category: 'storm-damage',
    slug: 'hail-damage-repair',
    filename: 'hail-damage-repair-hero.webp',
    prompt: `Professional photograph of roofing materials and repair equipment.
SCENE: Stack of new terracotta roof tiles. Colorbond metal roofing sheets. Professional roofing tools and safety equipment. Building materials display. Clean professional staging.
CAMERA: 50mm lens, f/4, product photography style. Natural outdoor colour grading.
LIGHTING: Clear bright natural lighting.`,
  },
  {
    category: 'storm-damage',
    slug: 'tree-damage-cleanup',
    filename: 'tree-damage-cleanup-hero.webp',
    prompt: `Professional photograph of arborist equipment and safety gear.
SCENE: Professional chainsaw and arborist tools. Safety helmet with visor and ear protection. High-visibility vest. Professional tree service equipment arranged neatly. Clean outdoor setting.
CAMERA: 35mm lens, f/4, outdoor product photography. Natural green colour grading.
LIGHTING: Bright natural daylight.`,
  },
  {
    category: 'storm-damage',
    slug: 'emergency-roof-tarping',
    filename: 'emergency-roof-tarping-hero.webp',
    prompt: `Professional photograph of emergency tarping materials and supplies.
SCENE: Large blue UV-stabilised tarpaulin folded neatly. Timber battens and strapping. Professional roofing access equipment. Emergency response supplies organised professionally. Blue tarp prominent.
CAMERA: 35mm lens, f/4, product photography. Blue accent colour grading.
LIGHTING: Bright professional lighting with blue colour accents.`,
  },

  // ═══════════════════════════════════════════
  // BIOHAZARD CLEANUP (5)
  // ═══════════════════════════════════════════
  {
    category: 'biohazard-cleanup',
    slug: 'crime-scene-cleanup',
    filename: 'crime-scene-cleanup-hero.webp',
    prompt: `Professional product photography of PPE and safety equipment.
SCENE: White Tyvek protective suits displayed neatly. Full-face P100 respirators. Chemical-resistant gloves. Professional safety equipment arranged on clean white background. Clinical presentation.
CAMERA: 50mm lens, f/4, clean product photography. Clinical white colour grading.
LIGHTING: Bright professional studio lighting.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'trauma-cleanup',
    filename: 'trauma-cleanup-hero.webp',
    prompt: `Professional product photography of decontamination equipment and supplies.
SCENE: Professional negative air machine with HEPA filter. Containment barrier materials. Decontamination supplies in organised containers. Clean professional equipment staging. Clinical aesthetic.
CAMERA: 35mm lens, f/4, product photography. Neutral clinical colour grading.
LIGHTING: Professional clean bright lighting.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'meth-lab-decontamination',
    filename: 'meth-lab-decontamination-hero.webp',
    prompt: `Professional product photography of testing equipment and protective gear.
SCENE: Chemical testing kit with swabs and sample containers. Full chemical-resistant PPE suite displayed. Air monitoring equipment with digital display. Professional scientific equipment.
CAMERA: 50mm lens, f/4, technical product photography. Clean scientific colour grading.
LIGHTING: Professional even lighting with equipment details sharp.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'sewage-cleanup',
    filename: 'sewage-cleanup-hero.webp',
    prompt: `Professional product photography of industrial extraction equipment.
SCENE: Large industrial wet vacuum with extraction hoses. Professional antimicrobial treatment sprayer. Heavy-duty PPE equipment. Industrial cleaning equipment fleet. Clean professional staging.
CAMERA: 35mm lens, f/4, commercial product photography. Professional colour grading.
LIGHTING: Bright professional warehouse lighting.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'hoarding-cleanup',
    filename: 'hoarding-cleanup-hero.webp',
    prompt: `Professional photograph of professional cleaning and sorting equipment.
SCENE: Organised sorting containers with labels. Industrial steam cleaner. HEPA vacuum. Professional cleaning supplies arranged neatly. Systematic organisation equipment display.
CAMERA: 28mm lens, f/5.6, commercial product photography. Warm professional colour grading.
LIGHTING: Bright professional lighting.`,
  },
];

async function generateImage(spec: ImageSpec, index: number, total: number): Promise<boolean> {
  const outputDir = path.join(OUTPUT_DIR, spec.category);
  const outputPath = path.join(outputDir, spec.filename);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`  [${index + 1}/${total}] SKIP ${spec.slug} (already exists)`);
    return true;
  }

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fullPrompt = `
Generate a professional 2K photograph with 16:9 aspect ratio.

STYLE: ${STYLE_BASE}

SCENE: ${spec.prompt}

AVOID: ${NEGATIVE_PROMPT}

TECHNICAL REQUIREMENTS:
- High detail and clarity, 2K resolution
- Professional colour grading
- Proper lighting and composition
- Sharp focus on main subject
- Realistic textures and materials
- Australian context and setting
`;

  try {
    console.log(`  [${index + 1}/${total}] Generating ${spec.slug}...`);
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!response.response.candidates?.[0]?.content?.parts) {
      console.error(`    FAIL: No candidates in response for ${spec.slug}`);
      return false;
    }

    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(outputPath, buffer);
        const sizeKB = Math.round(buffer.length / 1024);
        console.log(`    OK: ${spec.filename} (${sizeKB} KB)`);
        return true;
      }
    }

    // If we get text response but no image, log it
    for (const part of response.response.candidates[0].content.parts) {
      if (part.text) {
        console.error(`    FAIL: Text response instead of image for ${spec.slug}: ${part.text.substring(0, 100)}`);
      }
    }
    return false;
  } catch (error: any) {
    console.error(`    FAIL: ${spec.slug} - ${error.message || error}`);

    // Rate limit handling
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      console.log('    Waiting 60s for rate limit...');
      await new Promise((r) => setTimeout(r, 60000));
    }
    return false;
  }
}

async function main() {
  console.log('');
  console.log('=== NRPG Service Hero Image Generator ===');
  console.log(`Model: gemini-2.5-flash-image`);
  console.log(`Images: ${IMAGE_SPECS.length} sub-service hero images`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  // Group by category
  const categories = [...new Set(IMAGE_SPECS.map((s) => s.category))];
  let completed = 0;
  let failed = 0;

  for (const category of categories) {
    const specs = IMAGE_SPECS.filter((s) => s.category === category);
    console.log(`\n--- ${category.toUpperCase()} (${specs.length} images) ---`);

    for (const spec of specs) {
      const index = IMAGE_SPECS.indexOf(spec);
      const success = await generateImage(spec, index, IMAGE_SPECS.length);
      if (success) completed++;
      else failed++;

      // Rate limit: wait between requests
      if (index < IMAGE_SPECS.length - 1) {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }

  console.log('');
  console.log('=== Generation Complete ===');
  console.log(`Completed: ${completed}/${IMAGE_SPECS.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
