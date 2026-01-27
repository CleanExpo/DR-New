/**
 * Generate Hero Images for 27 Sub-Service Pages
 * Uses Gemini 2.5 Flash Image for realistic documentary-style images
 * Post-processes with Sharp for proper WebP conversion at 1920x1080
 *
 * Run: cd apps/web && npx tsx ../../scripts/generate-service-hero-images.ts
 * Force regenerate: cd apps/web && npx tsx ../../scripts/generate-service-hero-images.ts --force
 * Requires: GEMINI_API_KEY in apps/web/.env.local
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import sharp from 'sharp';
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

// CLI flags
const forceRegenerate = process.argv.includes('--force');

// Base output directory
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'services');

interface ImageSpec {
  category: string;
  slug: string;
  filename: string;
  prompt: string;
}

// Documentary realism style - informed by real restoration photography
const NEGATIVE_PROMPT = 'faces, identifiable people, close-up portraits, gore, blood, text, watermarks, logos, cartoon, illustration, 3D render, CGI, stock photo aesthetic, overly clean, showroom, white background, product photography';

const STYLE_BASE = 'Documentary-style editorial photograph of Australian disaster recovery work. Realistic lighting, real job site environment, professional but gritty. Shot on full-frame DSLR with natural colour grading. Wide-angle perspective showing the full scene.';

// All 27 sub-service image specifications - REALISTIC DOCUMENTARY STYLE
const IMAGE_SPECS: ImageSpec[] = [
  // ═══════════════════════════════════════════
  // WATER DAMAGE (7)
  // ═══════════════════════════════════════════
  {
    category: 'water-damage',
    slug: 'basement-flooding',
    filename: 'basement-flooding-hero.webp',
    prompt: `Flooded concrete basement with 10cm of standing water reflecting harsh portable work lights. Orange industrial submersible pump sitting in the water with a thick discharge hose running up the stairs. Water line marks visible on the rendered block walls at knee height. Damp cardboard boxes on metal shelving above the water line. Raw concrete floor, exposed pipes overhead. The scene feels urgent and industrial.
CAMERA: 24mm wide-angle, low angle from near water level, f/5.6. Cool blue-teal tones from the water with warm tungsten work light contrast.
LIGHTING: Two portable halogen work lights on tripods casting harsh shadows, reflecting off the standing water surface.`,
  },
  {
    category: 'water-damage',
    slug: 'burst-pipe-repair',
    filename: 'burst-pipe-repair-hero.webp',
    prompt: `Interior wall with a section of plasterboard cut away exposing a burst copper water pipe with green corrosion and water staining spreading across the timber framing. Plumber's tools scattered on drop sheets below - pipe cutter, soldering torch, flux tin. Two industrial dehumidifiers running nearby with indicator lights glowing green. Damp plasterboard dust on the floor. A distant worker in hi-vis vest crouched examining the pipe damage.
CAMERA: 35mm lens, f/4, eye-level shot focused on the exposed pipe section. Warm amber tones from the work light mixing with cool daylight from a window.
LIGHTING: Single LED panel work light illuminating the wall cavity, natural window light from the side.`,
  },
  {
    category: 'water-damage',
    slug: 'flood-restoration',
    filename: 'flood-restoration-hero.webp',
    prompt: `Post-flood residential living room undergoing restoration. Carpet and underlay ripped out revealing damp concrete slab. Mud tide marks on the lower 30cm of the walls. Six yellow high-velocity air movers positioned across the room blowing at the walls. Two large blue commercial dehumidifiers with hoses running to a drain. Furniture pushed to the centre of the room covered in plastic sheeting. The room is stripped back and industrial despite being a family home.
CAMERA: 20mm ultra-wide from doorway looking into the room, f/5.6. Slightly desaturated natural colour grading showing the brown mud tones.
LIGHTING: Overcast daylight through windows mixed with fluorescent strip lights on the ceiling.`,
  },
  {
    category: 'water-damage',
    slug: 'ceiling-water-damage',
    filename: 'ceiling-water-damage-hero.webp',
    prompt: `Residential room looking upward at a water-damaged ceiling with bubbling paint, brown water stains spreading from the centre, and a section of plasterboard sagging with moisture weight. A plastic bucket on the floor catching slow drips. A FLIR thermal imaging camera mounted on a tripod aimed at the ceiling showing a colourful heat map on its screen. Portable LED work light illuminating the damage from below. Paint chips and plaster dust on the carpet.
CAMERA: 24mm looking slightly upward to show ceiling damage and thermal camera, f/4. Cool fluorescent tones mixed with warm thermal camera display.
LIGHTING: Harsh upward-facing LED work light creating dramatic shadows on the damaged ceiling.`,
  },
  {
    category: 'water-damage',
    slug: 'carpet-water-damage',
    filename: 'carpet-water-damage-hero.webp',
    prompt: `Waterlogged residential carpet being extracted by a professional carpet extraction wand connected to a truck-mounted unit via a thick vacuum hose running out the front door. The carpet is dark with saturation, with a clear wet/dry line visible where extraction has been completed. Furniture pushed back against the walls. A pin-type moisture metre lying on the drier section of carpet. Industrial yellow air mover positioned near the wall ready to start drying.
CAMERA: 35mm lens, f/4, low angle showing the extraction wand at work on the carpet. Warm indoor lighting with daylight coming through the open front door.
LIGHTING: Mixed overhead room lights and natural daylight from the doorway creating depth.`,
  },
  {
    category: 'water-damage',
    slug: 'commercial-water-damage',
    filename: 'commercial-water-damage-hero.webp',
    prompt: `Large open-plan commercial office space undergoing water damage restoration. Ceiling tiles removed exposing metal grid framework and wet insulation. Rows of industrial air movers spaced evenly across the commercial tile floor. Two large commercial desiccant dehumidifiers with silver ducting running up to the ceiling void. Office desks and chairs pushed to one side covered in plastic. Fluorescent office lighting mixed with harsh portable work lights.
CAMERA: 20mm ultra-wide angle showing the scale of the commercial space, f/5.6. Neutral commercial lighting colour grading.
LIGHTING: Overhead fluorescent office lights supplemented by portable LED panels.`,
  },
  {
    category: 'water-damage',
    slug: 'structural-drying',
    filename: 'structural-drying-hero.webp',
    prompt: `Interior wall with Injectidry drying panels mounted in a grid pattern, connected via clear tubing to a large desiccant dehumidifier with silver flex ducting. A digital moisture monitoring system with multiple probes inserted into the wall at different heights, LCD screens showing declining moisture readings. A distant technician in company polo shirt checking a tablet with moisture mapping data. Industrial drying setup in a residential hallway.
CAMERA: 35mm lens, f/4, side angle showing the wall panels, ducting, and monitoring equipment. Cool blue-green tones from the equipment LED displays.
LIGHTING: Mixed hallway downlights and blue LED indicator lights from equipment creating a technical atmosphere.`,
  },

  // ═══════════════════════════════════════════
  // FIRE & SMOKE DAMAGE (5)
  // ═══════════════════════════════════════════
  {
    category: 'fire-smoke-damage',
    slug: 'fire-damage-restoration',
    filename: 'fire-damage-restoration-hero.webp',
    prompt: `Fire-damaged residential room with charred timber framing exposed where plasterboard has been removed. Blackened ceiling joists visible overhead. Soot deposits on remaining wall surfaces. Two orange industrial HEPA air scrubbers positioned on the floor with their intake grilles facing the damaged area. Portable halogen work lights on tripods illuminating the space. Clear poly containment sheeting partially installed on one wall. Debris cleared from the floor showing fire-damaged hardwood.
CAMERA: 24mm wide-angle from the doorway looking into the fire-damaged room, f/5.6. Warm amber tones from the charring contrasted with cool work light.
LIGHTING: Harsh portable halogen work lights creating strong shadows against the charred surfaces.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'smoke-damage-restoration',
    filename: 'smoke-damage-restoration-hero.webp',
    prompt: `Smoke-damaged living room undergoing restoration. Walls and ceiling coated in grey-brown smoke film with visible wipe marks where chemical sponge cleaning has started, showing the contrast between cleaned and uncleaned surfaces. HEPA air scrubbers running in the corner with blue indicator lights. Professional cleaning supplies staged on a folding table - chemical sponges, spray bottles of cleaning solution, microfibre cloths. Protective plastic sheeting on the floor. The room has a hazy, grimy atmosphere.
CAMERA: 28mm lens, f/4, showing the half-cleaned wall as the focal point. Slightly warm, smoky colour grading.
LIGHTING: Overhead room light diffused through smoke residue, supplemented by a portable LED panel.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'smoke-odor-removal',
    filename: 'smoke-odor-removal-hero.webp',
    prompt: `Interior room with a thermal fogger machine producing visible dense white fog filling the space for smoke odour treatment. A hydroxyl radical generator positioned near the wall with its blue UV indicator light glowing. Air quality monitoring device on a small table showing readings on its digital display. Windows sealed with plastic sheeting and tape. The fog creates a dramatic atmospheric effect throughout the room, obscuring the far wall.
CAMERA: 35mm lens, f/2.8, shallow depth showing the fogger in the foreground with fog filling the room behind. Cool blue-white tones from the fog.
LIGHTING: Single overhead light creating a halo effect through the fog, plus the blue glow from the hydroxyl generator.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'soot-removal',
    filename: 'soot-removal-hero.webp',
    prompt: `Close-up scene of soot removal in progress. A professional HEPA vacuum with a specialised brush nozzle positioned near a heavily soot-coated wall surface. Chemical dry-cleaning sponge marks visible on the wall showing clean streaks through the black soot layer. Protective drop sheets on the floor covered in black soot dust. A tray of cleaning sponges and professional soot removal chemicals on a nearby step ladder. The contrast between the deep black soot and cleaned areas is stark.
CAMERA: 50mm lens, f/4, focused on the soot-covered surface and cleaning marks. Dark moody colour grading with the black soot dominating.
LIGHTING: Side-angled portable LED light raking across the wall surface to highlight the soot texture and cleaning progress.`,
  },
  {
    category: 'fire-smoke-damage',
    slug: 'commercial-fire-damage',
    filename: 'commercial-fire-damage-hero.webp',
    prompt: `Large commercial building interior showing significant fire damage. Steel structural beams visible with fire-scale discolouration. Multiple industrial HEPA air scrubbers and negative air machines arranged across the concrete floor, connected to flex ducting running to exterior exhausts. Heavy-duty containment barriers dividing the space into work zones. Portable industrial lighting rigs on tall stands. The scale is impressive - high ceilings, wide floor area, serious industrial restoration operation.
CAMERA: 20mm ultra-wide angle showing the scale of the commercial operation, f/5.6. Cool industrial colour grading with warm fire-damage tones.
LIGHTING: Multiple portable industrial light rigs creating pools of harsh white light in the large dark space.`,
  },

  // ═══════════════════════════════════════════
  // MOULD REMEDIATION (5)
  // ═══════════════════════════════════════════
  {
    category: 'mould-remediation',
    slug: 'black-mould-removal',
    filename: 'black-mould-removal-hero.webp',
    prompt: `Residential bathroom wall and ceiling junction showing extensive black mould growth spreading in dark patches across the damp surface. Condensation beads visible on the tiles. Full poly containment sheeting installed with zipped entry flap. A negative air machine with HEPA filter running just outside the containment zone, connected via flex duct through the poly barrier. Yellow caution tape and biohazard warning signs on the containment barrier. The damp, enclosed atmosphere is palpable.
CAMERA: 28mm lens from just outside the containment zone looking through the poly sheeting, f/4. Cool greenish-grey tones emphasising the damp, mouldy environment.
LIGHTING: Harsh fluorescent bathroom light diffused through the translucent poly sheeting creating a clinical atmosphere.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-inspection',
    filename: 'mould-inspection-hero.webp',
    prompt: `Professional mould inspection in progress in a damp residential subfloor or basement space. A thermal imaging camera on a tripod showing a colourful moisture map on its flip-out screen revealing hidden moisture patterns behind the wall. A pin-type moisture metre inserted into the wall lining with its LCD showing a high reading. Digital hygrometer on a nearby surface showing humidity percentage. Inspection clipboard with data sheet. The environment is clearly damp with some visible moisture staining on surfaces.
CAMERA: 35mm lens, f/2.8, focused on the thermal camera screen with the damp room behind in soft focus. Cool technical colour grading with the warm thermal display as a focal point.
LIGHTING: Overhead room light with the thermal camera screen providing the brightest element in the frame.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-testing',
    filename: 'mould-testing-hero.webp',
    prompt: `Professional air quality testing setup in a room with suspected mould contamination. A calibrated air sampling pump on a tripod with bio-cassette attached, drawing air at measured flow rate. Surface sampling swab kits open on a folding table showing individual swabs in sterile packaging. Sample containers with handwritten labels and chain-of-custody form. A portable particle counter displaying readings. The scientific, methodical nature of professional testing is emphasised.
CAMERA: 50mm lens, f/4, medium shot showing the sampling equipment arranged on the table with the air pump in the background. Neutral clinical colour grading.
LIGHTING: Even room lighting with slight emphasis on the scientific equipment.`,
  },
  {
    category: 'mould-remediation',
    slug: 'mould-prevention',
    filename: 'mould-prevention-hero.webp',
    prompt: `Modern Australian bathroom with preventative ventilation and moisture control. A ceiling-mounted exhaust ventilation fan with indicator light running. A compact residential dehumidifier in the corner with its water tank visible through the clear window. A digital humidity monitor mounted on the wall showing a healthy 45% reading. Clean white tiles, proper ventilation gaps under the door, and a window slightly open. The space looks well-maintained and properly ventilated. Bright and clean atmosphere.
CAMERA: 28mm lens, f/5.6, showing the full bathroom with prevention equipment visible. Bright warm natural colour grading.
LIGHTING: Bright natural daylight through the window mixed with overhead bathroom light. Clean and airy feeling.`,
  },
  {
    category: 'mould-remediation',
    slug: 'commercial-mould-remediation',
    filename: 'commercial-mould-remediation-hero.webp',
    prompt: `Large-scale commercial mould remediation setup. Full-height poly containment barriers creating an isolated work zone within a commercial building. Multiple HEPA air filtration units arranged inside the containment area with flex ducting running to exhaust points. A decontamination staging area visible outside the containment zone with PPE (Tyvek suits, respirators) hanging on a portable rack. Antimicrobial treatment sprayer equipment staged and ready. The professional, systematic approach to large-scale remediation is clear.
CAMERA: 20mm ultra-wide showing the scale of the containment setup and equipment, f/5.6. Cool industrial colour grading.
LIGHTING: Harsh temporary lighting inside the containment creating a bright work zone against the darker surrounding area.`,
  },

  // ═══════════════════════════════════════════
  // STORM DAMAGE (5)
  // ═══════════════════════════════════════════
  {
    category: 'storm-damage',
    slug: 'roof-storm-damage',
    filename: 'roof-storm-damage-hero.webp',
    prompt: `Storm-damaged residential roof in a Queensland suburban setting. Several terracotta roof tiles missing or cracked exposing the timber battens and sarking underneath. Ridge capping displaced. Gutter hanging loose from the fascia. Tree branch debris scattered on the remaining tiles. Dark grey overcast storm sky as the backdrop. An aluminium extension ladder leaned against the side of the house. The house is a typical Australian brick-and-tile home. The damage tells the story of a severe weather event.
CAMERA: 35mm lens, f/5.6, shot from ground level looking up at the damaged roof against the dramatic sky. Natural moody colour grading with the dark sky.
LIGHTING: Overcast diffused daylight with dramatic grey storm clouds creating a moody atmosphere.`,
  },
  {
    category: 'storm-damage',
    slug: 'wind-damage-restoration',
    filename: 'wind-damage-restoration-hero.webp',
    prompt: `Wind-damaged single-storey commercial building exterior. Metal cladding panels peeled back by strong winds exposing the steel frame structure. Temporary structural bracing installed with timber props. Orange safety mesh barriers around the damaged area. Building materials staged nearby - new Colorbond sheets, self-tapping screws, flashing rolls. A skip bin with damaged building materials. The building is partially secured but clearly shows the force of the wind damage.
CAMERA: 28mm lens, f/5.6, showing the full extent of the wind damage to the building facade. Natural outdoor colour grading.
LIGHTING: Bright Australian daylight, slightly overcast, showing the damage clearly without harsh shadows.`,
  },
  {
    category: 'storm-damage',
    slug: 'hail-damage-repair',
    filename: 'hail-damage-repair-hero.webp',
    prompt: `Australian suburban rooftop showing hail damage. Colorbond metal roof panels with multiple visible dent marks from large hailstones. Some panels buckled and deformed. New replacement roofing sheets in a stack beside the house in their packaging. Professional roofing tools laid out - pop rivet gun, tin snips, screw gun with hex head driver. Safety harness and anchor point visible on the roof ridge. Typical Australian suburban setting with eucalyptus trees in the background.
CAMERA: 35mm lens, f/5.6, shot from roof level showing the hail-dented panels with replacement materials nearby. Bright natural outdoor colour grading.
LIGHTING: Clear Australian sunlight showing the hail dent patterns clearly with good shadow definition.`,
  },
  {
    category: 'storm-damage',
    slug: 'tree-damage-cleanup',
    filename: 'tree-damage-cleanup-hero.webp',
    prompt: `Large fallen eucalyptus tree that has crashed through a residential fence and damaged a garden shed in a typical Queensland suburban backyard. The tree trunk is thick and the canopy spreads across the yard. A professional chainsaw sitting on a stump with wood chips scattered around. Arborist safety equipment nearby - helmet with visor and ear muffs, chaps, high-vis vest. Cut sections of the trunk stacked to one side. The scene shows active cleanup in progress with the mess of branches and leaves everywhere.
CAMERA: 24mm wide-angle showing the full extent of the fallen tree and damage, f/5.6. Natural green and brown outdoor colour grading.
LIGHTING: Dappled sunlight filtering through remaining trees, natural outdoor Queensland light.`,
  },
  {
    category: 'storm-damage',
    slug: 'emergency-roof-tarping',
    filename: 'emergency-roof-tarping-hero.webp',
    prompt: `Emergency roof tarping in progress on a storm-damaged Australian home. A large blue UV-stabilised heavy-duty tarp secured over a damaged section of the roof with timber battens screwed through the tarp into the roof structure. The tarp edges are neatly folded and battened down. Metal strapping visible. An aluminium extension ladder in position against the eaves. More rolls of blue tarp and timber battens staged on the ground below. Dark stormy sky suggesting more weather on the way. A distant worker on the roof in hi-vis and hard hat securing the last section.
CAMERA: 28mm lens, f/5.6, shot from ground level looking up at the tarped roof. Blue tarp prominent against the grey storm sky. Moody natural colour grading.
LIGHTING: Overcast storm light with the bright blue tarp as the dominant colour element.`,
  },

  // ═══════════════════════════════════════════
  // BIOHAZARD CLEANUP (5)
  // ═══════════════════════════════════════════
  {
    category: 'biohazard-cleanup',
    slug: 'crime-scene-cleanup',
    filename: 'crime-scene-cleanup-hero.webp',
    prompt: `Professional biohazard containment area set up in a residential room. Full poly containment barriers creating an isolated work zone. White Tyvek protective suits hanging on a portable clothes rack near the entry. Full-face P100 respirators on a folding table alongside chemical-resistant gloves and boot covers. Red biohazard waste bags in a bin with the biohazard symbol clearly visible. The clinical, methodical staging area emphasises professional preparedness. Harsh white lighting from portable LED panels.
CAMERA: 35mm lens, f/4, showing the PPE staging area with the containment barrier behind. Clinical white and red colour grading.
LIGHTING: Harsh portable LED panels creating bright, clinical white light with hard shadows.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'trauma-cleanup',
    filename: 'trauma-cleanup-hero.webp',
    prompt: `Professional trauma cleanup staging area. A negative air machine running with HEPA filter, connected via flex duct to the contained work zone behind poly barriers. Decontamination supplies organised in labelled plastic containers - enzyme cleaners, disinfectants, odour neutralisers. PPE laid out ready - Tyvek suit, respirator, goggles, gloves. A clipboard with a site assessment form and pen. Red sharps container and biohazard bags. Everything is organised and methodical, ready for professional deployment.
CAMERA: 35mm lens, f/4, medium shot showing the organised staging area with equipment ready. Neutral clinical colour grading.
LIGHTING: Overhead room light supplemented by a portable LED panel creating even, clinical illumination.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'meth-lab-decontamination',
    filename: 'meth-lab-decontamination-hero.webp',
    prompt: `Clandestine drug lab decontamination testing in progress. A chemical surface testing kit deployed on a benchtop with individual swab sticks in labelled slots showing colour-change reagent results. A portable air quality monitor with digital LCD readout showing contamination levels. Full PPE staged nearby - chemical-resistant coveralls, full-face respirator with organic vapour cartridges, nitrile gloves. The room is sealed with tape around door frames and vents. Warning signage posted. The scientific, evidence-based approach to assessment is emphasised.
CAMERA: 50mm lens, f/4, focused on the testing kit and air monitor with the sealed room visible behind. Clinical neutral colour grading.
LIGHTING: Harsh overhead fluorescent lighting typical of a residential kitchen or bathroom being tested.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'sewage-cleanup',
    filename: 'sewage-cleanup-hero.webp',
    prompt: `Sewage-affected residential laundry or bathroom with a large industrial wet vacuum positioned on the damp concrete floor, its thick extraction hose disappearing into a floor drain area. An antimicrobial treatment pump sprayer with wand attachment ready for use. Heavy-duty PPE equipment nearby - rubber boots, waterproof coveralls, respirator. The floor shows water staining and residue. A dehumidifier starting the drying process. Industrial harsh lighting from a portable work light. The environment is clearly affected by contaminated water.
CAMERA: 24mm wide-angle from doorway looking into the affected room, f/5.6. Slightly desaturated, gritty colour grading emphasising the contaminated environment.
LIGHTING: Single harsh portable halogen work light creating stark shadows, emphasising the wet floor surface.`,
  },
  {
    category: 'biohazard-cleanup',
    slug: 'hoarding-cleanup',
    filename: 'hoarding-cleanup-hero.webp',
    prompt: `A room in transition during professional hoarding cleanup. One half still cluttered with stacked boxes, papers, and household items piled to shoulder height. The other half has been cleared, cleaned, and organised with items sorted into labelled plastic bins - Keep, Donate, Dispose. An industrial HEPA vacuum cleaner and a steam cleaner positioned in the cleared section. Black heavy-duty garbage bags partially filled. The before-and-during contrast tells the story of systematic professional cleanup in progress.
CAMERA: 24mm wide-angle from the cleared side showing the contrast, f/5.6. Natural indoor colour grading showing the dusty, cluttered atmosphere.
LIGHTING: Overhead room light struggling to illuminate through the clutter, brighter in the cleared section.`,
  },
];

async function generateImage(spec: ImageSpec, index: number, total: number): Promise<boolean> {
  const outputDir = path.join(OUTPUT_DIR, spec.category);
  const outputPath = path.join(outputDir, spec.filename);

  // Skip if already exists (unless --force)
  if (fs.existsSync(outputPath) && !forceRegenerate) {
    console.log(`  [${index + 1}/${total}] SKIP ${spec.slug} (already exists, use --force to regenerate)`);
    return true;
  }

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fullPrompt = `
Generate a professional photograph with 16:9 aspect ratio.

STYLE: ${STYLE_BASE}

SCENE: ${spec.prompt}

AVOID: ${NEGATIVE_PROMPT}

TECHNICAL REQUIREMENTS:
- High detail and clarity
- Professional colour grading as specified
- Proper lighting and composition
- Sharp focus on main subject
- Realistic textures and materials
- Australian context and setting where applicable
- Documentary/editorial photography feel, NOT stock photography
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
        const rawBuffer = Buffer.from(part.inlineData.data, 'base64');

        // Post-process with Sharp: resize to 1920x1080 and convert to proper WebP
        const processedBuffer = await sharp(rawBuffer)
          .resize(1920, 1080, { fit: 'cover', position: 'centre' })
          .webp({ quality: 85 })
          .toBuffer();

        fs.writeFileSync(outputPath, processedBuffer);
        const rawSizeKB = Math.round(rawBuffer.length / 1024);
        const finalSizeKB = Math.round(processedBuffer.length / 1024);
        console.log(`    OK: ${spec.filename} (raw: ${rawSizeKB} KB -> webp: ${finalSizeKB} KB, 1920x1080)`);
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
  console.log('=== NRPG Service Hero Image Generator (v2 - Documentary Realism) ===');
  console.log(`Model: gemini-2.5-flash-image`);
  console.log(`Images: ${IMAGE_SPECS.length} sub-service hero images`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Force: ${forceRegenerate ? 'YES - regenerating all' : 'NO - skipping existing'}`);
  console.log(`Post-processing: Sharp resize 1920x1080, WebP quality 85`);
  console.log('');

  // Group by category
  const categories = [...new Set(IMAGE_SPECS.map((s) => s.category))];
  let completed = 0;
  let failed = 0;
  let skipped = 0;

  for (const category of categories) {
    const specs = IMAGE_SPECS.filter((s) => s.category === category);
    console.log(`\n--- ${category.toUpperCase()} (${specs.length} images) ---`);

    for (const spec of specs) {
      const index = IMAGE_SPECS.indexOf(spec);

      // Check if it will be skipped
      const outputPath = path.join(OUTPUT_DIR, spec.category, spec.filename);
      if (fs.existsSync(outputPath) && !forceRegenerate) {
        skipped++;
        console.log(`  [${index + 1}/${IMAGE_SPECS.length}] SKIP ${spec.slug} (exists)`);
        continue;
      }

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
  console.log(`Generated: ${completed}/${IMAGE_SPECS.length}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
