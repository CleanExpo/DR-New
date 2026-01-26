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

// Load environment variables
const envPaths = [
  path.join(process.cwd(), '.env.local'),
  path.join(process.cwd(), '..', '..', '.env.local'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    });
    console.log(`Loaded env from: ${envPath}`);
    break;
  }
}

if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found. Add it to .env.local');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

// Base output directory
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'services');

interface ImageSpec {
  category: string;
  slug: string;
  filename: string;
  prompt: string;
}

const NEGATIVE_PROMPT = 'people, faces, gore, blood, text, watermarks, logos, cartoon, illustration, 3D render, CGI, unrealistic, dark horror aesthetic';

const STYLE_BASE = 'Professional Australian disaster recovery photographic documentation. High-detail, sharp focus, natural colour grading, professional composition.';

// All 27 sub-service image specifications
const IMAGE_SPECS: ImageSpec[] = [
  // ═══════════════════════════════════════════
  // WATER DAMAGE (7)
  // ═══════════════════════════════════════════
  {
    category: 'water-damage',
    slug: 'basement-flooding',
    filename: 'basement-flooding-hero.webp',
    prompt: `Professional photograph of basement flooding restoration in progress at an Australian home.
SCENE: Partially flooded basement with industrial submersible pump actively extracting standing water. Industrial-grade extraction hoses visible. Wet concrete floor with water line marks on walls. Natural daylight from small windows. Clean but damaged setting - not catastrophic. Professional water extraction equipment prominently displayed.
CAMERA: Wide angle 24mm lens, f/4, sharp focus on pump and water surface. Cool blue-toned colour grading. Eye-level perspective showing scale of flooding.
LIGHTING: Natural window light supplemented by work lights. Realistic water reflections. Professional documentation quality.`,
  },
  {
    category: 'water-damage',
    slug: 'burst-pipe-repair',
    filename: 'burst-pipe-repair-hero.webp',
    prompt: `Professional photograph of emergency burst pipe water damage restoration in an Australian home.
SCENE: Interior hallway or kitchen showing water damage from burst copper pipe. Water extraction fans and dehumidifiers deployed along walls. Moisture detection equipment visible. Wet plasterboard showing water staining. Professional drying equipment prominently staged.
CAMERA: 35mm lens, f/4, focus on drying equipment in foreground with water-damaged wall in background. Neutral professional colour grading.
LIGHTING: Interior ambient lighting mixed with work lights. Even professional illumination showing extent of damage clearly.`,
  },
  {
    category: 'water-damage',
    slug: 'flood-restoration',
    filename: 'flood-restoration-hero.webp',
    prompt: `Professional photograph of large-scale flood restoration operation at an Australian property.
SCENE: Open-plan living area with industrial flood restoration equipment deployed. Multiple commercial dehumidifiers, air movers, and extraction units working. Flood-damaged hardwood flooring partially removed. Moisture meters and monitoring equipment visible. Professional staging of restoration equipment.
CAMERA: Ultra-wide 20mm lens, f/5.6 for full depth of field. Slightly elevated angle to show scale of operation. Professional documentation colour grading.
LIGHTING: Bright professional work lighting throughout. Clear visibility of all equipment and damage areas.`,
  },
  {
    category: 'water-damage',
    slug: 'ceiling-water-damage',
    filename: 'ceiling-water-damage-hero.webp',
    prompt: `Professional photograph of ceiling water damage assessment in an Australian home.
SCENE: Room interior looking up at water-damaged plasterboard ceiling. Visible water staining, bubbling paint, and sagging areas. Professional thermal imaging camera on tripod pointed at ceiling. Moisture detection equipment on table below. Drop cloths protecting furniture. Professional assessment setup.
CAMERA: 28mm lens angled upward, f/4, focus on damaged ceiling area with equipment below. Professional documentation style.
LIGHTING: Interior room lighting showing water stains and damage patterns clearly. Professional even illumination.`,
  },
  {
    category: 'water-damage',
    slug: 'carpet-water-damage',
    filename: 'carpet-water-damage-hero.webp',
    prompt: `Professional photograph of carpet water damage restoration in an Australian home.
SCENE: Living room with carpet partially lifted for drying. Industrial carpet cleaning and extraction equipment visible. High-velocity air movers positioned under lifted carpet. Dehumidifiers running along walls. Professional carpet stretching tools nearby. Clean professional work setup.
CAMERA: 35mm lens, low angle, f/4, focus on lifted carpet with drying equipment underneath. Warm residential colour grading.
LIGHTING: Natural window light combined with professional work lighting. Clear detail of carpet condition and equipment.`,
  },
  {
    category: 'water-damage',
    slug: 'commercial-water-damage',
    filename: 'commercial-water-damage-hero.webp',
    prompt: `Professional photograph of commercial water damage restoration in an Australian office building.
SCENE: Open-plan commercial office interior with multiple industrial drying units deployed. Commercial dehumidifiers and air movers arranged across office floor. Wet commercial carpet tiles. Cubicle dividers and office furniture protected with plastic sheeting. Drop ceiling tiles removed for cavity drying. Professional large-scale operation.
CAMERA: Wide angle 24mm lens, f/5.6 for full depth of field. Elevated angle showing scale. Professional commercial documentation style.
LIGHTING: Overhead commercial LED lighting. Professional bright even illumination throughout the large space.`,
  },
  {
    category: 'water-damage',
    slug: 'structural-drying',
    filename: 'structural-drying-hero.webp',
    prompt: `Professional photograph of structural drying operation with industrial dehumidification equipment.
SCENE: Large room with rows of industrial desiccant dehumidifiers and high-velocity air movers positioned strategically. Injectidry panels mounted on walls for cavity drying. Moisture monitoring equipment with digital displays. Ducting and hoses connecting equipment. Bare walls with baseboards removed for drying access. Professional systematic setup.
CAMERA: 28mm lens, f/4, focus on dehumidifier array with monitoring equipment. Technical documentation style with slightly cool blue tones.
LIGHTING: Professional work lighting. Equipment indicator lights visible. Clear technical documentation illumination.`,
  },

  // ═══════════════════════════════════════════
  // FIRE & SMOKE DAMAGE (5)
  // ═══════════════════════════════════════════
  {
    category: 'fire-smoke-damage',
    slug: 'fire-damage-restoration',
    filename: 'fire-damage-restoration-hero.webp',
    prompt: `Professional photograph of fire damage restoration assessment at an Australian property.
SCENE: Interior room showing fire damage - charred timber framing exposed, smoke-blackened walls, damaged but structurally intact ceiling. Professional assessment equipment visible - structural moisture metre, thermal camera. Emergency board-up on windows with plywood. Restoration staging area with professional equipment ready for deployment.
CAMERA: 28mm lens, f/4, focus on damage area with restoration equipment in foreground. Dramatic but professional colour grading with warm amber tones.
LIGHTING: Mix of natural light through damaged openings and professional work lights. Clear documentation of damage extent.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'smoke-damage-restoration',
    filename: 'smoke-damage-restoration-hero.webp',
    prompt: `Professional photograph of smoke damage restoration operation in an Australian home.
SCENE: Room interior with visible smoke staining on white walls and ceiling. HEPA air scrubbers deployed and running with visible filtration units. Professional cleaning equipment staged - chemical sponges, specialised cleaning solutions. Some walls partially cleaned showing contrast between treated and untreated surfaces. Plastic sheeting protecting unaffected areas.
CAMERA: 35mm lens, f/4, focus on HEPA scrubbers with smoke-stained walls as backdrop. Desaturated professional colour grading.
LIGHTING: Professional work lighting showing smoke staining patterns clearly. Even illumination for documentation.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'smoke-odor-removal',
    filename: 'smoke-odor-removal-hero.webp',
    prompt: `Professional photograph of smoke odour removal equipment deployed in an Australian home.
SCENE: Living room with professional odour removal equipment - industrial ozone generator, hydroxyl radical generator, thermal fogging machine, and HEPA air purifiers. Equipment positioned strategically around room. Room sealed with plastic sheeting on windows. Professional setup for comprehensive odour treatment.
CAMERA: 35mm lens, f/4, focus on ozone and hydroxyl equipment. Clean professional colour grading.
LIGHTING: Professional interior work lighting. Equipment indicator lights visible. Clear technical documentation quality.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'soot-removal',
    filename: 'soot-removal-hero.webp',
    prompt: `Professional photograph of soot removal cleaning operation in progress.
SCENE: Room wall and ceiling showing heavy soot deposits being professionally cleaned. HEPA vacuum with specialised nozzle visible. Chemical dry-cleaning sponges staged on protective drop cloth. Section of wall showing contrast between soot-covered and cleaned areas. Professional cleaning supplies arranged neatly. Air scrubber running in background.
CAMERA: 50mm lens, f/2.8, sharp focus on cleaning process with soot contrast. Professional documentation colour grading.
LIGHTING: Professional work lighting illuminating soot deposits and clean areas. Clear visibility of cleaning progress.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'commercial-fire-damage',
    filename: 'commercial-fire-damage-hero.webp',
    prompt: `Professional photograph of commercial fire damage restoration at an Australian office or warehouse.
SCENE: Large commercial space showing fire and smoke damage restoration in progress. Multiple industrial air scrubbers and negative air machines deployed. Commercial ceiling grid partially removed. Structural assessment markings on walls. Large-scale professional restoration operation with equipment scaled for commercial space. Containment barriers visible.
CAMERA: Ultra-wide 20mm lens, f/5.6, showing full scale of commercial operation. Elevated angle. Professional documentation style.
LIGHTING: Commercial overhead lighting supplemented by professional work lights. Bright even illumination showing scale.`,
  },

  // ═══════════════════════════════════════════
  // MOULD REMEDIATION (5)
  // ═══════════════════════════════════════════
  {
    category: 'mould-remediation',
    slug: 'black-mould-removal',
    filename: 'black-mould-removal-hero.webp',
    prompt: `Professional photograph of mould remediation containment setup ready for black mould removal.
SCENE: Room with professional 6-mil polyethylene containment barriers installed floor to ceiling. Negative air machine with HEPA filtration running - visible ducting exhausting to outside. Decontamination chamber entrance visible. Professional antimicrobial treatment equipment staged. Clean white containment plastic contrasting with professional equipment.
CAMERA: 28mm lens, f/5.6, focus on containment barriers and HEPA filtration. Clean clinical colour grading with slight green-teal tones.
LIGHTING: Bright professional work lighting inside containment. Clean clinical illumination. Safety-focused visibility.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-inspection',
    filename: 'mould-inspection-hero.webp',
    prompt: `Professional photograph of mould inspection equipment and thermal imaging assessment.
SCENE: Professional thermal imaging camera on tripod displaying colourful heat map on screen, pointed at wall showing moisture patterns. Digital moisture metres with probe attachments on table. Professional inspection report clipboard. Hygrometer displaying humidity readings. Air quality sampling equipment with cassettes. Professional technical assessment setup.
CAMERA: 50mm lens, f/2.8, sharp focus on thermal camera display showing moisture map. Technical documentation style with cool blue tones.
LIGHTING: Professional interior lighting. Thermal camera screen clearly visible. Equipment details well-lit and sharp.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-testing',
    filename: 'mould-testing-hero.webp',
    prompt: `Professional photograph of mould testing and air sampling equipment in use.
SCENE: Professional air sampling pump with bio-cassettes positioned in room for spore sampling. Surface sampling swab kits laid out on clean surface. Calibrated air sampling equipment with flow metres. Laboratory sample containers properly labelled. Bulk sampling tools. Professional testing documentation forms. Clean technical laboratory-quality setup.
CAMERA: 50mm lens, f/4, sharp focus on air sampling equipment. Clean scientific colour grading.
LIGHTING: Professional bright even lighting for scientific documentation. Equipment details crisp and clear.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-prevention',
    filename: 'mould-prevention-hero.webp',
    prompt: `Professional photograph of mould prevention systems installed in an Australian home.
SCENE: Modern bathroom or laundry showing professional mould prevention installations - high-quality exhaust ventilation fan, commercial dehumidifier unit, anti-mould coated walls (clean white finish). Moisture monitoring sensor on wall. Well-ventilated space with modern fixtures. Clean preventative setup showing best-practice installations.
CAMERA: 28mm lens, f/5.6, showing installed prevention systems. Bright clean colour grading with warm tones.
LIGHTING: Bright natural and artificial lighting showing clean, mould-free environment. Professional real estate photography quality.`,
  },
  {
    category: 'mould-remediation',
    slug: 'commercial-mould-remediation',
    filename: 'commercial-mould-remediation-hero.webp',
    prompt: `Professional photograph of commercial mould remediation operation in large Australian facility.
SCENE: Large commercial or warehouse space with industrial-scale containment barriers. Multiple commercial HEPA air filtration units deployed. Negative air machines with ducting. Industrial dehumidifiers. Large-scale professional remediation operation showing scope and capability. WorkSafe compliance signage visible.
CAMERA: Ultra-wide 20mm lens, f/5.6, elevated angle showing scale of commercial operation. Professional documentation style.
LIGHTING: Commercial overhead lighting. Bright professional work lights. Full visibility throughout large space.`,
  },

  // ═══════════════════════════════════════════
  // STORM DAMAGE (5)
  // ═══════════════════════════════════════════
  {
    category: 'storm-damage',
    slug: 'roof-storm-damage',
    filename: 'roof-storm-damage-hero.webp',
    prompt: `Professional photograph of storm-damaged roof on an Australian home with assessment in progress.
SCENE: Australian terracotta or Colorbond roof with storm damage - displaced tiles, damaged ridge capping, visible water ingress points. Professional roof assessment ladder and safety equipment in position. Damaged section clearly visible against intact sections. Blue sky with dramatic cloud backdrop. Typical Australian suburban home exterior.
CAMERA: 35mm lens, f/5.6, shot from ground level looking up at damaged roof section. Natural outdoor colour grading with dramatic sky.
LIGHTING: Natural daylight. Dramatic but clear sky lighting. Damage details clearly visible in natural light.`,
  },
  {
    category: 'storm-damage',
    slug: 'wind-damage-restoration',
    filename: 'wind-damage-restoration-hero.webp',
    prompt: `Professional photograph of wind damage to Australian property with restoration equipment staged.
SCENE: Australian home or commercial building showing wind damage - displaced cladding panels, damaged fascia and guttering, debris on ground. Structural bracing equipment staged nearby. Professional restoration equipment ready for deployment. Temporary protective measures in place. Overcast dramatic sky suggesting recent storm.
CAMERA: 28mm lens, f/5.6, showing full extent of wind damage with restoration equipment. Professional documentation colour grading.
LIGHTING: Overcast natural daylight providing even illumination. Clear visibility of damage extent and equipment staging.`,
  },
  {
    category: 'storm-damage',
    slug: 'hail-damage-repair',
    filename: 'hail-damage-repair-hero.webp',
    prompt: `Professional photograph of hail damage on an Australian roof with repair assessment.
SCENE: Close-up of hail-damaged Colorbond or terracotta roof showing cracked and broken tiles, dented metal panels, damaged skylights. New replacement tiles stacked nearby ready for installation. Professional roofing tools and safety equipment visible. Clear contrast between damaged and undamaged sections.
CAMERA: 50mm lens, f/4, detailed shot showing hail impact damage with repair materials. Natural outdoor colour grading.
LIGHTING: Clear natural daylight showing hail damage details sharply. Professional documentation quality.`,
  },
  {
    category: 'storm-damage',
    slug: 'tree-damage-cleanup',
    filename: 'tree-damage-cleanup-hero.webp',
    prompt: `Professional photograph of fallen tree damage on an Australian property with cleanup in progress.
SCENE: Large fallen eucalyptus tree on Australian suburban property - branches across roof or fence. Professional arborist chainsaw equipment staged nearby. Safety barriers and exclusion zone tape. Damaged section of roof or structure visible under tree. Wood chips and debris. Professional cleanup operation in early stages.
CAMERA: 28mm wide angle, f/5.6, showing full extent of tree damage and cleanup staging. Natural outdoor colour grading.
LIGHTING: Natural daylight. Clear sky. Even outdoor illumination showing damage scale and equipment.`,
  },
  {
    category: 'storm-damage',
    slug: 'emergency-roof-tarping',
    filename: 'emergency-roof-tarping-hero.webp',
    prompt: `Professional photograph of emergency roof tarping operation on an Australian home.
SCENE: Australian suburban home with large UV-stabilised blue tarpaulin professionally secured over damaged roof section. Tarp mechanically fastened with timber battens and straps. Professional roofing access equipment - industrial ladder, safety harness anchor points visible on ridge. Blue tarp contrasting with terracotta or Colorbond roof. Clean professional emergency response deployment.
CAMERA: 35mm lens, f/5.6, looking up at tarped roof from ground level. Natural outdoor colour grading with blue sky.
LIGHTING: Clear natural daylight. Professional outdoor documentation lighting. Blue tarp visible against sky.`,
  },

  // ═══════════════════════════════════════════
  // BIOHAZARD CLEANUP (5)
  // ═══════════════════════════════════════════
  {
    category: 'biohazard-cleanup',
    slug: 'crime-scene-cleanup',
    filename: 'crime-scene-cleanup-hero.webp',
    prompt: `Professional photograph of biohazard cleanup equipment and PPE staged for deployment.
SCENE: Professional staging area showing Level A hazmat protective equipment - white Tyvek suits, full-face P100 respirators, chemical-resistant gloves and boot covers. Biohazard waste containers (red bags, sharps containers) neatly arranged. ATP testing device and UV detection equipment. Professional decontamination supplies. All equipment clean, organised, ready for deployment. White or light grey staging background.
CAMERA: 50mm lens, f/4, professional product photography showing equipment detail. Clean clinical colour grading.
LIGHTING: Professional studio-quality even lighting. Equipment details crisp and clear. Safety-focused professional presentation.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'trauma-cleanup',
    filename: 'trauma-cleanup-hero.webp',
    prompt: `Professional photograph of trauma scene cleanup containment and decontamination setup.
SCENE: Professional containment barriers (clear polyethylene sheeting) installed in doorway. Negative air machine with HEPA filtration running. Biohazard waste containers staged. Professional PPE suits hanging ready for use. Decontamination supplies organised on clean surface. Professional, respectful, clinical setup - no disturbing content.
CAMERA: 35mm lens, f/4, focus on containment barriers and professional equipment. Clinical colour grading with neutral tones.
LIGHTING: Professional work lighting. Clean clinical illumination. All safety equipment clearly visible.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'meth-lab-decontamination',
    filename: 'meth-lab-decontamination-hero.webp',
    prompt: `Professional photograph of chemical decontamination testing equipment and protective gear.
SCENE: Professional methamphetamine testing kit with surface swabs and chemical analysis equipment. NATA-accredited laboratory sampling containers. Full chemical-resistant PPE suite displayed - hood, respirator with organic vapour cartridges, chemical-resistant suit, double gloves. Air monitoring equipment. All equipment clean, professional, organised for deployment.
CAMERA: 50mm lens, f/4, product photography of testing and PPE equipment. Clean technical colour grading.
LIGHTING: Professional even lighting. Equipment details sharp and clear. Technical documentation quality.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'sewage-cleanup',
    filename: 'sewage-cleanup-hero.webp',
    prompt: `Professional photograph of sewage cleanup extraction equipment staged for deployment.
SCENE: Industrial sewage extraction equipment - truck-mounted extraction unit with large hoses, industrial wet vacuum, antimicrobial treatment sprayer, PPE equipment. Professional staging area showing capability and equipment scale. Commercial dehumidifiers and air scrubbers in background. Clean organised professional setup - equipment only, no contamination visible.
CAMERA: 35mm lens, f/4, showing extraction equipment scale and capability. Professional documentation colour grading.
LIGHTING: Professional outdoor or warehouse lighting. Equipment clearly visible. Clean professional presentation.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'hoarding-cleanup',
    filename: 'hoarding-cleanup-hero.webp',
    prompt: `Professional photograph of professional cleanup and sorting equipment staged for hoarding remediation.
SCENE: Professional sorting station with labelled containers - Keep, Donate, Dispose, Biohazard. Industrial cleaning equipment - steam cleaner, HEPA vacuum, antimicrobial sprayer. Professional PPE equipment. Large-scale waste removal containers. Organised professional setup showing systematic approach. Clean staging area.
CAMERA: 28mm lens, f/5.6, showing full professional sorting and cleaning setup. Warm professional colour grading.
LIGHTING: Bright professional lighting. Clear visibility of all equipment and sorting system. Professional documentation quality.`,
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
    const response = await model.generateContent(fullPrompt);

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
  console.log(`Model: gemini-2.0-flash-exp`);
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
