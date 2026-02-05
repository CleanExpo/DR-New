/**
 * Training Module Image Generation Script
 *
 * Generates professional images for all 24 NRP training modules using
 * Google Gemini Nano Banana Pro (gemini-3-pro-image-preview)
 *
 * Estimated: 92 images total (~$12-22 AUD)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load GEMINI_API_KEY from .env.local
function loadGeminiApiKey(): string {
  const envPath = path.join(process.cwd(), '.env.local');

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY\s*=\s*["']?([^"'\n\r]+)["']?/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return process.env.GEMINI_API_KEY || '';
}

const GEMINI_API_KEY = loadGeminiApiKey();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface ImageSpec {
  filename: string;
  prompt: string;
  module: string;
  description: string;
}

// ============================================================================
// Training Module Image Specifications
// ============================================================================

const TRAINING_IMAGES: ImageSpec[] = [
  // NRP-001: Membership Registration
  {
    module: 'NRP-001',
    filename: 'membership-registration-process.jpg',
    description: 'Membership registration workflow diagram',
    prompt: `Professional infographic illustration of a membership registration process workflow.

SCENE: Clean, modern business diagram showing 4 steps:
1. Application submission (document icon)
2. Verification process (checklist icon)
3. Approval (thumbs up icon)
4. Membership activation (badge icon)

STYLE: Professional business infographic, flat design, Australian color scheme (blue/green)
LAYOUT: Horizontal workflow with arrows connecting steps
DETAILS: Icons, text labels for each step, clean white background
QUALITY: 2K resolution, sharp edges, professional typography

AVOID: People's faces, specific company logos, cluttered design`,
  },
  {
    module: 'NRP-001',
    filename: 'professional-certifications.jpg',
    description: 'IICRC certification badges and standards',
    prompt: `Professional photograph of IICRC certification documentation and training materials.

SCENE: Flat lay of professional certification documents, training manuals, and safety standards
DETAILS: Generic certification badges (no specific logos), professional binders, safety documentation
SETTING: Clean white desk surface, natural overhead lighting
CAMERA: Top-down view, 50mm lens, f/4 for clarity throughout
STYLE: Professional documentation photography, crisp and clean

AVOID: Specific company names, real people, trademarked logos`,
  },
  {
    module: 'NRP-001',
    filename: 'australian-compliance-checklist.jpg',
    description: 'Australian regulatory compliance requirements',
    prompt: `Professional illustration of Australian business compliance checklist.

SCENE: Modern checklist design with Australian regulatory requirements
ELEMENTS: ABN registration, insurance certificates, licenses, safety compliance
STYLE: Clean infographic design, professional color palette (blue/gray)
LAYOUT: Vertical checklist with checkboxes, organized sections
QUALITY: 2K, high contrast, readable typography

AVOID: Real ABN numbers, specific company details, people`,
  },

  // NRP-002: Environmental Assessment & Testing
  {
    module: 'NRP-002',
    filename: 'moisture-testing-equipment.jpg',
    description: 'Professional moisture detection equipment',
    prompt: `Professional product photography of moisture detection and testing equipment.

EQUIPMENT: Moisture meters, infrared thermal cameras, hygrometers, moisture probes
SETTING: Clean professional workspace, equipment arranged on white surface
LIGHTING: Professional studio lighting, clear visibility of all equipment details
CAMERA: 35mm lens, f/5.6, sharp focus throughout
STYLE: Technical product photography, industrial-grade professional equipment

AVOID: Brand names/logos, people operating equipment, cluttered background`,
  },
  {
    module: 'NRP-002',
    filename: 'environmental-testing-process.jpg',
    description: 'Environmental assessment in Australian home',
    prompt: `Professional photograph of environmental testing being conducted in Australian residential property.

SCENE: Modern Australian home interior with moisture testing in progress
DETAILS: Professional equipment visible (moisture meter against wall), testing documentation
SETTING: Clean residential interior, natural lighting from windows
ATMOSPHERE: Professional inspection environment, organized and systematic
CAMERA: 24mm wide angle, f/4, showing room context and equipment
STYLE: Professional documentation photography

AVOID: People's faces visible, specific brand equipment, extreme damage`,
  },
  {
    module: 'NRP-002',
    filename: 'moisture-mapping-diagram.jpg',
    description: 'Moisture mapping floor plan illustration',
    prompt: `Professional technical illustration of moisture mapping on a floor plan.

SCENE: Clean floor plan diagram with color-coded moisture readings
ELEMENTS: Room layout, moisture zones marked in colors (blue=dry, yellow=elevated, red=wet)
DETAILS: Measurement points, moisture percentage readings, legend
STYLE: Technical architectural drawing, professional CAD-style illustration
QUALITY: 2K, clear lines, professional typography

AVOID: Real addresses, people, photographs (this is an illustration)`,
  },

  // NRP-003: Insurance Claims Management
  {
    module: 'NRP-003',
    filename: 'insurance-claim-documentation.jpg',
    description: 'Insurance claim forms and documentation',
    prompt: `Professional flat lay photograph of insurance claim documentation process.

SCENE: Organized desk surface with claim forms, photos, receipts, and documentation
DETAILS: Generic insurance forms, damage assessment photos, calculator, professional pen
SETTING: Clean office desk, natural overhead lighting
CAMERA: Top-down view, 50mm lens, f/4
STYLE: Professional business documentation photography
ATMOSPHERE: Organized, professional, trustworthy

AVOID: Real claim numbers, personal information, specific insurer names, people's faces in photos`,
  },
  {
    module: 'NRP-003',
    filename: 'claims-process-workflow.jpg',
    description: 'Insurance claims workflow diagram',
    prompt: `Professional infographic showing insurance claim processing workflow.

SCENE: Step-by-step workflow diagram for insurance claims
STEPS: Initial contact → Assessment → Documentation → Quote → Approval → Restoration → Completion
STYLE: Professional business process infographic, clean design
COLORS: Blue and green professional color scheme
LAYOUT: Horizontal timeline with icons for each step
QUALITY: 2K, crisp graphics, clear typography

AVOID: Specific insurer logos, people, cluttered design`,
  },
  {
    module: 'NRP-003',
    filename: 'damage-assessment-photos.jpg',
    description: 'Professional damage documentation photography',
    prompt: `Professional photograph showing proper damage documentation technique.

SCENE: Water-damaged Australian residential interior being photographed professionally
DETAILS: Camera on tripod (no operator visible), measuring tape visible for scale, damage documentation checklist
SETTING: Residential room with visible but not extreme water damage
LIGHTING: Natural window light plus professional work lights
CAMERA: Wide angle view showing documentation process, f/4
STYLE: Professional insurance documentation methodology

AVOID: People's faces, extreme damage, horror aesthetic, specific addresses`,
  },

  // NRP-004: Professional Documentation & Reporting
  {
    module: 'NRP-004',
    filename: 'professional-report-template.jpg',
    description: 'Professional restoration report layout',
    prompt: `Professional screenshot of a well-formatted restoration report template.

SCENE: Clean, professional report layout on computer screen or printed document
SECTIONS: Executive summary, scope of work, findings, recommendations, cost estimate
STYLE: Professional business document design, clear typography
QUALITY: 2K, readable text (generic placeholders), organized layout
COLORS: Professional blue/gray color scheme, clean white background

AVOID: Real client names, actual addresses, specific dollar amounts, company logos`,
  },
  {
    module: 'NRP-004',
    filename: 'photo-documentation-best-practices.jpg',
    description: 'Before/during/after documentation examples',
    prompt: `Professional triptych showing documentation progression (before/during/after restoration).

SCENE: Three side-by-side photos of same Australian residential room
LEFT: Water damage visible (wet floor, damaged walls)
CENTER: Restoration in progress (equipment visible, drying)
RIGHT: Restoration complete (clean, dry, repaired)

STYLE: Professional insurance documentation photography
QUALITY: 2K, consistent lighting across all three images, clear progression
CAMERA: Same angle for all three shots, 24mm wide angle, f/5.6

AVOID: People's faces, extreme damage, brand logos on equipment`,
  },
  {
    module: 'NRP-004',
    filename: 'field-notes-documentation.jpg',
    description: 'Professional field notes and sketches',
    prompt: `Professional photograph of restoration contractor's field notes and documentation.

SCENE: Flat lay of field notebook, technical sketches, measurement notes, moisture readings
DETAILS: Hand-drawn floor plan sketches, moisture readings logged, professional notes
SETTING: Clean desk surface, natural lighting
CAMERA: Top-down view, 50mm lens, f/4
STYLE: Professional work documentation photography
ATMOSPHERE: Organized, technical, professional

AVOID: Real addresses, personal information, illegible handwriting, people`,
  },

  // NRP-005: Health & Safety Compliance
  {
    module: 'NRP-005',
    filename: 'ppe-safety-equipment.jpg',
    description: 'Personal protective equipment (PPE) display',
    prompt: `Professional product photography of complete PPE safety equipment set.

EQUIPMENT: Hard hat, safety glasses, respirator, gloves, steel-toe boots, high-vis vest
ARRANGEMENT: Clean display on white surface, all equipment visible and organized
LIGHTING: Professional studio lighting, clear visibility of all safety features
CAMERA: 50mm lens, f/5.6, sharp focus throughout
STYLE: Safety equipment product photography, industrial-grade quality
QUALITY: 2K, high detail showing equipment specifications

AVOID: Brand logos, people wearing equipment, cluttered background`,
  },
  {
    module: 'NRP-005',
    filename: 'worksite-safety-setup.jpg',
    description: 'Professional job site safety protocols',
    prompt: `Professional photograph of properly set up restoration job site with safety measures.

SCENE: Australian residential restoration site with professional safety setup
DETAILS: Safety barriers, warning signs, equipment organized, proper ventilation, safety protocols visible
SETTING: Clean professional job site, natural lighting
ATMOSPHERE: Safety-first professional environment, organized and systematic
CAMERA: Wide angle 24mm, f/5.6, showing full site setup
STYLE: Professional safety documentation photography

AVOID: People's faces, unsafe practices, cluttered workspace, extreme damage`,
  },
  {
    module: 'NRP-005',
    filename: 'australian-safety-standards.jpg',
    description: 'Australian WH&S standards and regulations',
    prompt: `Professional infographic of Australian workplace health and safety standards.

SCENE: Clean infographic showing key Australian WH&S requirements
ELEMENTS: Safe Work Australia logo placeholder, key safety standards, compliance checklist
STYLE: Professional safety infographic, red/yellow warning colors with blue accents
LAYOUT: Organized sections with icons, clear hierarchy
QUALITY: 2K, professional design, readable typography

AVOID: Specific company names, real certification numbers, people`,
  },

  // NRP-006: Structural Drying & Dehumidification
  {
    module: 'NRP-006',
    filename: 'dehumidification-equipment.jpg',
    description: 'Industrial dehumidifiers and air movers',
    prompt: `Professional product photography of industrial structural drying equipment.

EQUIPMENT: Large commercial dehumidifiers, high-velocity air movers, moisture extraction units
ARRANGEMENT: Equipment displayed professionally, showing industrial scale and capacity
SETTING: Clean professional environment or Australian home showing equipment in use
LIGHTING: Professional lighting showing equipment details clearly
CAMERA: 35mm lens, f/4, clear focus on equipment features
STYLE: Industrial equipment product photography

AVOID: Brand logos, operators, cluttered background, extreme damage`,
  },
  {
    module: 'NRP-006',
    filename: 'psychrometric-chart.jpg',
    description: 'Psychrometric chart for drying calculations',
    prompt: `Professional technical illustration of a psychrometric chart used in structural drying.

SCENE: Clean, professional psychrometric chart diagram
ELEMENTS: Temperature/humidity curves, drying zones marked, example measurements plotted
STYLE: Technical engineering diagram, clear lines and labels
COLORS: Professional color coding (blue for wet, green for target, red for monitoring)
QUALITY: 2K, sharp lines, readable axis labels and numbers

AVOID: Overly complex data, real project data, people`,
  },
  {
    module: 'NRP-006',
    filename: 'drying-chamber-setup.jpg',
    description: 'Professional drying chamber containment',
    prompt: `Professional photograph of structural drying chamber setup in Australian home.

SCENE: Room converted to drying chamber with professional containment
DETAILS: Clear plastic sheeting containment, multiple dehumidifiers, air movers strategically placed, moisture monitoring equipment
SETTING: Australian residential interior, professional setup
LIGHTING: Natural light plus work lights, clear visibility of all equipment
CAMERA: Wide angle 24mm, f/5.6, showing complete setup
STYLE: Professional restoration documentation photography

AVOID: People's faces, brand logos, extreme damage, unsafe setups`,
  },

  // NRP-007: Mold Remediation Protocols
  {
    module: 'NRP-007',
    filename: 'mould-containment-setup.jpg',
    description: 'Professional mold containment barriers',
    prompt: `Professional photograph of mold remediation containment setup.

SCENE: Professional containment barriers using clear plastic sheeting and zipper doors
DETAILS: HEPA filtration units, negative air machines, proper sealing, professional setup
SETTING: Australian residential property, contained work area
ATMOSPHERE: Professional safety-first environment, organized containment
CAMERA: Wide angle 24mm, f/5.6, showing complete containment system
STYLE: Professional safety documentation photography

AVOID: Visible mold growth (health hazard), people's faces, unsafe practices, brand logos`,
  },
  {
    module: 'NRP-007',
    filename: 'hepa-filtration-equipment.jpg',
    description: 'HEPA air scrubbers and filtration',
    prompt: `Professional product photography of HEPA air filtration and negative air machines.

EQUIPMENT: Professional HEPA air scrubbers, negative air machines, air quality monitors
ARRANGEMENT: Equipment displayed showing industrial capacity and professional grade
SETTING: Clean professional environment with equipment clearly visible
LIGHTING: Professional studio lighting, clear view of filtration features
CAMERA: 35mm lens, f/5.6, sharp detail throughout
STYLE: Industrial safety equipment product photography

AVOID: Brand names/logos, operators, cluttered background`,
  },
  {
    module: 'NRP-007',
    filename: 'mould-testing-samples.jpg',
    description: 'Mold testing and sample collection',
    prompt: `Professional photograph of mold testing equipment and sample collection materials.

EQUIPMENT: Air quality testing devices, swab testing kits, sample containers, testing documentation
ARRANGEMENT: Organized flat lay on clean surface, professional presentation
SETTING: Clean laboratory or professional workspace
LIGHTING: Natural overhead lighting, clear visibility of all testing materials
CAMERA: Top-down view, 50mm lens, f/4
STYLE: Professional laboratory/testing photography

AVOID: Actual mold samples (health hazard), people, brand logos, real test results`,
  },

  // NRP-008: Fire & Smoke Damage Restoration
  {
    module: 'NRP-008',
    filename: 'fire-damage-assessment.jpg',
    description: 'Fire and smoke damage in commercial setting',
    prompt: `Professional photograph of fire and smoke damage in Australian commercial office.

SCENE: Modern office interior with smoke damage (soot on walls/ceiling, water from sprinklers)
DETAILS: Visible smoke damage but not extreme destruction, recoverable situation
ATMOSPHERE: Serious but professional documentation, not horror aesthetic
SETTING: Clean-lined Australian office space, natural and emergency lighting
CAMERA: Wide angle 24mm, f/4, showing extent of damage professionally
STYLE: Professional insurance documentation photography

AVOID: Active flames, people, extreme destruction, horror aesthetic, unsafe conditions`,
  },
  {
    module: 'NRP-008',
    filename: 'air-scrubber-operation.jpg',
    description: 'Air scrubbers for smoke odor removal',
    prompt: `Professional photograph of industrial air scrubbers operating in smoke-damaged space.

EQUIPMENT: Multiple professional air scrubbers with HEPA filters, thermal foggers for odor neutralization
SCENE: Equipment operating in smoke-damaged Australian commercial space
DETAILS: Professional equipment placement, organized restoration setup
LIGHTING: Work lights showing equipment operation, natural ambient light
CAMERA: 35mm lens, f/4, showing equipment and setting
STYLE: Professional restoration documentation photography

AVOID: Brand logos, operators' faces, active fire, extreme damage`,
  },
  {
    module: 'NRP-008',
    filename: 'soot-cleaning-techniques.jpg',
    description: 'Professional soot and smoke residue cleaning',
    prompt: `Professional photograph showing professional soot cleaning methodology.

SCENE: Wall being professionally cleaned of soot damage using dry sponges and cleaning techniques
DETAILS: Cleaning supplies, dry chemical sponges, HEPA vacuum, protective coverings, professional technique
SETTING: Australian commercial interior, organized work area
ATMOSPHERE: Professional restoration in progress, systematic cleaning approach
CAMERA: Close-up to mid-range, 50mm lens, f/4, showing cleaning detail
STYLE: Professional restoration process documentation

AVOID: People's faces clearly visible, brand names, unsafe practices, finished result (this is mid-process)`,
  },

  // Continue for remaining modules...
  // NRP-009 through NRP-024 would follow similar patterns

  // NRP-009: Biohazard Cleanup & Decontamination
  {
    module: 'NRP-009',
    filename: 'biohazard-ppe-full-suit.jpg',
    description: 'Full biohazard protective equipment',
    prompt: `Professional photograph of complete biohazard personal protective equipment.

EQUIPMENT: Full hazmat suit, respirator, double gloves, boot covers, all professional-grade
ARRANGEMENT: Equipment displayed on mannequin or laid out professionally, no person inside
SETTING: Clean professional environment with proper safety context
LIGHTING: Professional studio lighting, clear visibility of all safety features
CAMERA: Full-body view if on mannequin, or flat lay if arranged, 50mm lens, f/5.6
STYLE: Safety equipment product photography, industrial healthcare grade

AVOID: Real people's faces, actual biohazard materials, brand logos, unsafe demonstrations`,
  },
  {
    module: 'NRP-009',
    filename: 'decontamination-equipment.jpg',
    description: 'Biohazard decontamination tools and supplies',
    prompt: `Professional product photography of biohazard decontamination equipment and supplies.

EQUIPMENT: EPA-registered disinfectants, spray applicators, biohazard waste containers, decontamination solutions
ARRANGEMENT: Organized professional display showing complete decontamination kit
SETTING: Clean professional workspace, medical-grade presentation
LIGHTING: Professional studio lighting, clear product visibility
CAMERA: 35mm lens, f/5.6, sharp focus throughout
STYLE: Medical/industrial product photography

AVOID: Brand names, actual biohazard materials, people, unsafe handling`,
  },
  {
    module: 'NRP-009',
    filename: 'biohazard-waste-disposal.jpg',
    description: 'Proper biohazard waste handling procedures',
    prompt: `Professional photograph of biohazard waste disposal containers and protocols.

SCENE: Professional biohazard waste containers (red bags, sharps containers, sealed bins)
DETAILS: Proper labeling (generic biohazard symbols), secure sealing, organized staging area
SETTING: Clean industrial or professional facility, proper containment area
ATMOSPHERE: Safety-first professional environment, systematic waste management
CAMERA: 24mm wide angle, f/5.6, showing complete waste handling setup
STYLE: Professional safety documentation photography

AVOID: Actual biohazard waste visible, people, brand names, real facility identifiers`,
  },

  // NRP-010: Reconstruction & Repairs
  {
    module: 'NRP-010',
    filename: 'reconstruction-tools-equipment.jpg',
    description: 'Professional reconstruction tools and equipment',
    prompt: `Professional photograph of construction and reconstruction tools for restoration work.

EQUIPMENT: Power tools (drill, saw, nail gun), hand tools, safety equipment, professional-grade construction tools
ARRANGEMENT: Organized tool display showing complete reconstruction capability
SETTING: Clean professional workspace or job site, tools arranged professionally
LIGHTING: Professional lighting showing tool details clearly
CAMERA: 35mm lens, f/5.6, clear focus on all tools
STYLE: Professional construction equipment photography

AVOID: Brand logos, operators, cluttered workspace, unsafe tool handling`,
  },
  {
    module: 'NRP-010',
    filename: 'wall-reconstruction-progress.jpg',
    description: 'Wall reconstruction in progress',
    prompt: `Professional photograph of wall reconstruction during restoration.

SCENE: Australian residential interior showing wall reconstruction in progress
DETAILS: Drywall installation, professional framing, organized work area, systematic approach
SETTING: Clean job site, natural lighting from windows plus work lights
ATMOSPHERE: Professional construction in progress, organized and safe
CAMERA: Wide angle 24mm, f/4, showing reconstruction context
STYLE: Professional construction documentation photography

AVOID: People's faces clearly visible, unsafe practices, cluttered workspace, extreme mess`,
  },

  // NRP-011: Carpet & Upholstery Cleaning
  {
    module: 'NRP-011',
    filename: 'carpet-cleaning-equipment.jpg',
    description: 'Professional carpet extraction and cleaning equipment',
    prompt: `Professional product photography of carpet cleaning and extraction equipment.

EQUIPMENT: Commercial carpet extractor, truck-mount system visible in van, cleaning wands, specialty tools
ARRANGEMENT: Professional equipment display showing industrial cleaning capacity
SETTING: Clean professional environment or Australian service van
LIGHTING: Professional lighting showing equipment details clearly
CAMERA: 35mm lens, f/5.6, sharp focus on equipment features
STYLE: Industrial cleaning equipment product photography

AVOID: Brand logos, operators, cluttered background, residential-grade equipment`,
  },
  {
    module: 'NRP-011',
    filename: 'upholstery-cleaning-process.jpg',
    description: 'IICRC UFT-compliant upholstery steam cleaning with proper hand wand',
    prompt: `Professional photograph of upholstery steam cleaning in progress on Australian furniture.

SCENE: Professional technician's hands using an UPHOLSTERY STEAM CLEANING HAND WAND on a fabric sofa

CRITICAL EQUIPMENT (IICRC UFT STANDARD):
- UPHOLSTERY HAND WAND: Compact upholstery-specific tool with soft bristle head (10-15cm wide, NOT carpet wand)
- Steam extraction hose connected to hand wand
- Pre-spray solution bottle visible nearby
- Portable extractor or truck-mount connection visible

TECHNIQUE (IICRC UFT STANDARD):
- Hand wand held at proper 15-30 degree angle against fabric
- Systematic overlapping stroke pattern visible on upholstery
- Light moisture indicating active steam extraction
- Technician wearing nitrile gloves (blue or black)
- Hands and arms visible, face NOT visible

SETTING: Clean Australian residential interior, natural lighting, protective sheeting under furniture
FURNITURE: Modern Australian-style fabric sofa, light-coloured upholstery showing cleaned vs uncleaned areas
CAMERA: Mid-range 50mm, f/4, sharp focus on upholstery hand wand and technique
STYLE: IICRC UFT-compliant professional upholstery cleaning service documentation

ABSOLUTE REQUIREMENTS:
- MUST show compact UPHOLSTERY-SPECIFIC hand tool (NOT wide 30-40cm carpet wand)
- MUST show steam extraction method with visible hose
- MUST show proper 15-30 degree wand angle technique

AVOID: Wide carpet wands, dry cleaning methods, brand logos, faces visible, amateur technique`,
  },
  {
    module: 'NRP-011',
    filename: 'stain-removal-techniques.jpg',
    description: 'Professional stain removal methodology',
    prompt: `Professional photograph showing professional carpet stain removal technique.

SCENE: Close-up of professional stain treatment on carpet
DETAILS: Specialty stain removal chemicals, spot cleaning tools, testing methodology, before/after comparison
SETTING: Australian residential carpet, professional work setup
LIGHTING: Clear lighting showing stain treatment detail
CAMERA: Macro to mid-range, 50mm-100mm, f/4, showing treatment process
STYLE: Professional restoration technique documentation

AVOID: Extreme stains, people's faces, brand names on products, horror aesthetic`,
  },
  {
    module: 'NRP-011',
    filename: 'carpet-drying-setup.jpg',
    description: 'Air movers positioned for carpet drying',
    prompt: `Professional photograph of proper carpet drying setup in Australian home.

SCENE: Multiple high-velocity air movers strategically positioned over cleaned carpet
DETAILS: Professional air mover placement, protective runners, organized drying setup
SETTING: Australian residential room, carpet freshly cleaned and drying
LIGHTING: Natural room lighting, equipment clearly visible
CAMERA: Wide angle 24mm, f/5.6, showing complete drying setup
STYLE: Professional restoration documentation photography

AVOID: Brand logos on equipment, people, cluttered space, unsafe cord management`,
  },

  // NRP-012: Contents Restoration
  {
    module: 'NRP-012',
    filename: 'contents-pack-out.jpg',
    description: 'Professional contents packing and inventory process',
    prompt: `Professional photograph of contents pack-out and inventory process.

SCENE: Organized packing operation in Australian home with damaged contents
DETAILS: Professional moving boxes, inventory lists, barcode labels, systematic packing
SETTING: Australian residential interior, organized work area
ATMOSPHERE: Professional restoration service, careful handling of belongings
CAMERA: Wide angle 24mm, f/4, showing packing operation context
STYLE: Professional restoration documentation photography

AVOID: People's faces, personal belongings clearly identifiable, extreme damage, brand logos`,
  },
  {
    module: 'NRP-012',
    filename: 'contents-cleaning-facility.jpg',
    description: 'Commercial contents restoration facility',
    prompt: `Professional photograph of commercial contents restoration cleaning facility.

SCENE: Large professional facility with contents cleaning stations, storage racks, equipment areas
DETAILS: Organized work zones, professional cleaning equipment, systematic storage
SETTING: Industrial warehouse-style facility, clean and organized
LIGHTING: Commercial facility lighting, clear visibility throughout
CAMERA: Wide angle 16mm, f/5.6, showing facility scale and organization
STYLE: Commercial facility documentation photography

AVOID: Identifiable client contents, people's faces, specific company branding, cluttered areas`,
  },
  {
    module: 'NRP-012',
    filename: 'electronics-restoration.jpg',
    description: 'Electronic equipment restoration and cleaning',
    prompt: `Professional photograph of electronics restoration process.

SCENE: Professional electronics cleaning and restoration workstation
DETAILS: Specialty cleaning tools, anti-static equipment, organized workspace, electronics being serviced
SETTING: Professional restoration facility, clean technical workspace
LIGHTING: Professional work lighting, clear visibility of delicate process
CAMERA: Mid-range 50mm, f/4, showing restoration process detail
STYLE: Professional technical restoration photography

AVOID: Identifiable devices with personal data, brand logos, people's faces, messy workspace`,
  },
  {
    module: 'NRP-012',
    filename: 'textile-restoration.jpg',
    description: 'Professional textile cleaning and restoration',
    prompt: `Professional photograph of textile restoration cleaning process.

SCENE: Commercial textile cleaning operation for damaged fabrics and garments
DETAILS: Professional washing equipment, hanging racks, specialty cleaning chemicals, organized workflow
SETTING: Professional restoration facility, clean textile processing area
LIGHTING: Commercial facility lighting, clear view of textile processing
CAMERA: 35mm lens, f/5.6, showing textile restoration operation
STYLE: Professional restoration facility photography

AVOID: Identifiable personal clothing, brand logos on equipment, people's faces, cluttered workspace`,
  },

  // NRP-013: Odor Control & Deodorization
  {
    module: 'NRP-013',
    filename: 'odor-control-equipment.jpg',
    description: 'Ozone generators, hydroxyl generators, thermal foggers',
    prompt: `Professional product photography of odor control and deodorization equipment.

EQUIPMENT: Ozone generators, hydroxyl generators, thermal foggers, air scrubbers
ARRANGEMENT: Professional equipment display showing complete odor control capability
SETTING: Clean professional environment, equipment clearly visible
LIGHTING: Professional studio lighting, clear view of all equipment features
CAMERA: 35mm lens, f/5.6, sharp focus throughout
STYLE: Industrial odor control equipment product photography

AVOID: Brand logos, operators, cluttered background, active operation in occupied spaces`,
  },
  {
    module: 'NRP-013',
    filename: 'air-quality-testing.jpg',
    description: 'Air quality testing and monitoring equipment',
    prompt: `Professional photograph of air quality testing equipment and monitoring devices.

EQUIPMENT: Air quality monitors, particle counters, gas detectors, testing documentation
ARRANGEMENT: Professional testing equipment display, organized presentation
SETTING: Clean professional workspace or Australian property testing location
LIGHTING: Professional lighting showing equipment details and displays
CAMERA: 35mm lens, f/4, clear focus on testing equipment
STYLE: Professional environmental testing photography

AVOID: Brand names, people, extreme contamination visible, real test data with identifiers`,
  },
  {
    module: 'NRP-013',
    filename: 'deodorization-process.jpg',
    description: 'Professional deodorization in progress',
    prompt: `Professional photograph of deodorization process in Australian property.

SCENE: Hydroxyl generator or ozone machine operating in treated space
DETAILS: Professional setup, safety protocols visible, unoccupied space during treatment
SETTING: Australian residential or commercial interior being deodorized
ATMOSPHERE: Professional treatment environment, systematic odor control
CAMERA: Wide angle 24mm, f/5.6, showing treatment setup
STYLE: Professional restoration documentation photography

AVOID: Occupied spaces during ozone treatment (unsafe), people, brand logos, extreme damage`,
  },

  // NRP-014: Crawl Space Restoration
  {
    module: 'NRP-014',
    filename: 'crawl-space-assessment.jpg',
    description: 'Professional crawl space inspection',
    prompt: `Professional photograph of crawl space inspection in Australian home.

SCENE: Clean crawl space being professionally inspected with proper lighting
DETAILS: Inspection equipment, moisture meters, documentation tools, professional approach
SETTING: Australian residential crawl space, organized inspection
LIGHTING: Professional work lights illuminating crawl space clearly
CAMERA: Wide angle 16mm, f/4, showing crawl space context
STYLE: Professional inspection documentation photography

AVOID: People's faces clearly visible, extreme contamination, unsafe conditions, horror aesthetic`,
  },
  {
    module: 'NRP-014',
    filename: 'crawl-space-encapsulation.jpg',
    description: 'Crawl space vapor barrier installation',
    prompt: `Professional photograph of crawl space vapor barrier encapsulation.

SCENE: Clean crawl space with professional vapor barrier installation in progress
DETAILS: Heavy-duty plastic sheeting, professional sealing, support pillars wrapped, systematic installation
SETTING: Australian residential crawl space, transformation visible
LIGHTING: Professional work lighting showing installation quality
CAMERA: Wide angle 16mm, f/5.6, showing encapsulation extent
STYLE: Professional construction documentation photography

AVOID: People's faces, unsafe practices, incomplete/sloppy work, extreme mess`,
  },
  {
    module: 'NRP-014',
    filename: 'crawl-space-dehumidification.jpg',
    description: 'Dehumidification system in crawl space',
    prompt: `Professional photograph of crawl space dehumidification system installation.

SCENE: Commercial dehumidifier installed in encapsulated Australian crawl space
DETAILS: Professional dehumidifier, drainage system, monitoring equipment, organized setup
SETTING: Clean, encapsulated crawl space with professional environmental control
LIGHTING: Work lighting showing equipment and installation quality
CAMERA: 24mm wide angle, f/4, showing dehumidification system context
STYLE: Professional restoration installation photography

AVOID: Brand logos on equipment, people, unsafe installations, cluttered crawl space`,
  },

  // NRP-015: Equipment Operation & Maintenance
  {
    module: 'NRP-015',
    filename: 'equipment-fleet-overview.jpg',
    description: 'Complete restoration equipment fleet display',
    prompt: `Professional photograph of complete restoration equipment fleet.

SCENE: Organized display or service vehicle/trailer with complete equipment array
EQUIPMENT: Dehumidifiers, air movers, extractors, moisture meters, air scrubbers, hand tools
ARRANGEMENT: Professional fleet display showing full service capability
SETTING: Clean warehouse or professional service vehicle
LIGHTING: Professional lighting showing all equipment clearly
CAMERA: Wide angle 24mm, f/8, everything in focus
STYLE: Professional equipment fleet photography

AVOID: Brand logos, operators, cluttered presentation, damaged equipment`,
  },
  {
    module: 'NRP-015',
    filename: 'equipment-maintenance-schedule.jpg',
    description: 'Maintenance checklist and schedule infographic',
    prompt: `Professional infographic showing equipment maintenance schedule and checklist.

SCENE: Clean maintenance schedule design with preventive maintenance timeline
ELEMENTS: Daily, weekly, monthly, annual maintenance tasks, equipment categories, checkbox system
STYLE: Professional maintenance management infographic, organized design
COLORS: Professional blue/gray scheme with safety yellow highlights
LAYOUT: Calendar-style or checklist format, clear hierarchy
QUALITY: 2K, readable typography, professional layout

AVOID: Specific company names, real equipment serial numbers, people`,
  },
  {
    module: 'NRP-015',
    filename: 'equipment-operation-safety.jpg',
    description: 'Safe equipment operation demonstration',
    prompt: `Professional photograph demonstrating safe equipment operation practices.

SCENE: Professional equipment setup showing proper safety protocols
DETAILS: Proper cord management, safety signage, organized workspace, professional practices
SETTING: Australian job site or training facility
ATMOSPHERE: Safety-first professional environment, educational demonstration
CAMERA: Wide angle 24mm, f/5.6, showing complete safety setup
STYLE: Professional safety training photography

AVOID: People's faces clearly visible, unsafe practices, brand logos, cluttered workspace`,
  },
  {
    module: 'NRP-015',
    filename: 'equipment-calibration.jpg',
    description: 'Professional equipment calibration and testing',
    prompt: `Professional photograph of equipment calibration and testing process.

SCENE: Moisture meter or testing equipment being calibrated with reference standards
DETAILS: Calibration tools, reference materials, testing documentation, professional process
SETTING: Clean professional workspace or laboratory environment
LIGHTING: Professional lighting showing calibration process clearly
CAMERA: Mid-range 50mm, f/4, showing calibration detail
STYLE: Professional technical documentation photography

AVOID: Brand names, people's faces, real calibration data with identifiers, messy workspace`,
  },

  // NRP-016: Advanced Structural Drying
  {
    module: 'NRP-016',
    filename: 'advanced-drying-techniques.jpg',
    description: 'Specialty drying methods and equipment',
    prompt: `Professional photograph of advanced specialty drying techniques and equipment.

SCENE: Specialty drying setup using advanced methods (cavity drying, injectidry systems, heat drying)
DETAILS: Advanced drying equipment, specialty attachments, professional installation
SETTING: Australian property with complex drying challenge being addressed
ATMOSPHERE: Technical expertise, systematic approach to difficult drying situation
CAMERA: Wide angle 24mm, f/4, showing advanced drying setup
STYLE: Professional advanced restoration documentation

AVOID: Brand logos, operators' faces, extreme damage, unsafe setups`,
  },
  {
    module: 'NRP-016',
    filename: 'thermal-imaging-analysis.jpg',
    description: 'Thermal imaging camera showing moisture patterns',
    prompt: `Professional photograph of thermal imaging moisture detection.

SCENE: Thermal imaging camera display showing moisture patterns in Australian building
DETAILS: Thermal image on camera/tablet screen showing temperature differentials indicating moisture
SETTING: Australian property interior, professional moisture investigation
COLORS: Thermal image color scale (blue=cool/wet, red/orange=warm/dry)
CAMERA: Mid-range 50mm, f/4, showing thermal imaging device and display
STYLE: Professional building diagnostic photography

AVOID: Brand names on equipment, people's faces, real property addresses, extreme damage`,
  },
  {
    module: 'NRP-016',
    filename: 'cavity-drying-setup.jpg',
    description: 'Specialty drying equipment for wall cavities',
    prompt: `Professional photograph of wall cavity drying system installation.

SCENE: Wall cavity drying system with injection ports and hoses installed
DETAILS: Drying ports installed in wall, professional hose connections, dehumidifier attachment, systematic setup
SETTING: Australian residential interior, wall cavity drying in progress
ATMOSPHERE: Technical expertise, specialized restoration methodology
CAMERA: Mid-range 35mm, f/4, showing cavity drying system detail
STYLE: Professional specialty restoration photography

AVOID: Brand logos, people's faces, extensive wall damage, messy installation`,
  },
  {
    module: 'NRP-016',
    filename: 'drying-monitoring-dashboard.jpg',
    description: 'Digital moisture monitoring system display',
    prompt: `Professional screenshot or photograph of digital moisture monitoring system dashboard.

SCENE: Tablet or computer display showing moisture monitoring software interface
ELEMENTS: Moisture readings graph over time, multiple room monitoring, alert thresholds, professional data presentation
STYLE: Professional software interface design, clean dashboard layout
COLORS: Professional blue/gray interface with data visualization
QUALITY: 2K, clear interface, readable charts and numbers

AVOID: Real property addresses, client names, specific dates, brand names of software`,
  },

  // NRP-017: Job Costing & Estimating
  {
    module: 'NRP-017',
    filename: 'estimating-software-interface.jpg',
    description: 'Professional estimating software dashboard',
    prompt: `Professional screenshot of restoration estimating software interface.

SCENE: Clean software dashboard showing job costing and estimating tools
ELEMENTS: Project overview, cost categories, labor rates, materials pricing, estimate generation
STYLE: Professional business software interface, organized layout
COLORS: Professional blue/white color scheme, clear data presentation
QUALITY: 2K, readable text and numbers, modern UI design

AVOID: Real client names, actual project addresses, specific dollar amounts, brand names`,
  },
  {
    module: 'NRP-017',
    filename: 'cost-breakdown-chart.jpg',
    description: 'Visual cost breakdown by category (labor, materials, equipment)',
    prompt: `Professional infographic showing restoration job cost breakdown visualization.

SCENE: Clean pie chart or bar chart showing cost distribution
CATEGORIES: Labor (largest), Materials, Equipment rental, Disposal, Overhead, Profit margin
STYLE: Professional business infographic, data visualization
COLORS: Professional color-coded categories, clear legend
QUALITY: 2K, sharp graphics, readable labels and percentages

AVOID: Specific dollar amounts, real company data, people, cluttered design`,
  },
  {
    module: 'NRP-017',
    filename: 'pricing-calculator.jpg',
    description: 'Interactive pricing calculator interface',
    prompt: `Professional screenshot of interactive pricing calculator tool interface.

SCENE: Clean calculator interface for restoration job pricing
ELEMENTS: Input fields (square footage, category of loss, material types), calculation engine, price output
STYLE: Professional web application design, user-friendly interface
COLORS: Professional blue/white scheme, clear call-to-action buttons
QUALITY: 2K, modern UI design, clear typography

AVOID: Real calculations, specific pricing, company branding, cluttered interface`,
  },
  {
    module: 'NRP-017',
    filename: 'profit-margin-analysis.jpg',
    description: 'Profit margin analysis chart and graphs',
    prompt: `Professional infographic showing profit margin analysis for restoration business.

SCENE: Dashboard with profit margin graphs and charts
ELEMENTS: Profit margin percentage over time, job type comparison, target vs actual margins
STYLE: Professional business analytics visualization, clear data presentation
COLORS: Professional color scheme (green=good margins, yellow=acceptable, red=low)
QUALITY: 2K, sharp graphs, readable axes and legends

AVOID: Real business data, specific company names, people, actual dollar amounts`,
  },

  // NRP-018: Safety Management Systems
  {
    module: 'NRP-018',
    filename: 'safety-management-workflow.jpg',
    description: 'Complete safety management system workflow',
    prompt: `Professional infographic of safety management system workflow.

SCENE: Comprehensive workflow diagram showing safety management process
STEPS: Risk assessment → Controls → Training → Monitoring → Incident response → Continuous improvement
STYLE: Professional safety management infographic, systematic flow design
COLORS: Safety color scheme (red/yellow warnings, green compliance)
LAYOUT: Circular or linear workflow with clear connections
QUALITY: 2K, professional design, clear typography

AVOID: Specific company processes, real incident data, people, cluttered design`,
  },
  {
    module: 'NRP-018',
    filename: 'incident-reporting-form.jpg',
    description: 'Professional incident reporting documentation',
    prompt: `Professional photograph or screenshot of incident reporting form template.

SCENE: Clean, professional incident report form layout
SECTIONS: Incident details, personnel involved, immediate actions, root cause, corrective actions
STYLE: Professional business form design, organized sections
COLORS: Professional document design, clear section headers
QUALITY: 2K, readable text, professional layout

AVOID: Real incident data, personal information, specific company names, actual incidents described`,
  },
  {
    module: 'NRP-018',
    filename: 'safety-training-materials.jpg',
    description: 'Safety training manuals and materials',
    prompt: `Professional photograph of safety training materials and manuals.

SCENE: Flat lay of professional safety training materials
ITEMS: Training manuals, safety guides, PPE reference materials, Australian standards documents
SETTING: Clean surface, organized professional presentation
LIGHTING: Natural overhead lighting, clear visibility of materials
CAMERA: Top-down view, 50mm lens, f/4
STYLE: Professional training materials photography

AVOID: Specific company names, trademarked content, real personal data, people`,
  },
  {
    module: 'NRP-018',
    filename: 'safety-audit-checklist.jpg',
    description: 'Comprehensive safety audit checklist',
    prompt: `Professional screenshot or photograph of safety audit checklist template.

SCENE: Comprehensive safety audit checklist form
CATEGORIES: PPE compliance, equipment safety, workplace hazards, documentation, training records
STYLE: Professional audit form design, checkbox system
LAYOUT: Multi-section checklist, clear categories, rating system
QUALITY: 2K, readable text, professional form layout

AVOID: Real audit data, specific facility names, people, actual compliance scores`,
  },

  // NRP-019: Quality Assurance & Control
  {
    module: 'NRP-019',
    filename: 'quality-control-checklist.jpg',
    description: 'Multi-point quality control inspection checklist',
    prompt: `Professional screenshot or document of quality control inspection checklist.

SCENE: Comprehensive QC checklist for restoration project completion
SECTIONS: Structural drying verification, cleanliness, repairs quality, documentation complete, customer walkthrough
STYLE: Professional quality management form design
LAYOUT: Multi-point checklist with pass/fail criteria
QUALITY: 2K, clear typography, organized sections

AVOID: Real project data, client names, specific addresses, actual inspection results`,
  },
  {
    module: 'NRP-019',
    filename: 'quality-documentation.jpg',
    description: 'Professional quality assurance documentation',
    prompt: `Professional photograph of quality assurance documentation package.

SCENE: Flat lay of complete QA documentation set
ITEMS: Quality inspection forms, photographic evidence, moisture readings logs, completion certificates
SETTING: Clean professional desk, organized presentation
LIGHTING: Natural overhead lighting, clear document visibility
CAMERA: Top-down view, 50mm lens, f/4
STYLE: Professional business documentation photography

AVOID: Real client data, personal information, specific addresses, identifiable projects`,
  },
  {
    module: 'NRP-019',
    filename: 'customer-satisfaction-survey.jpg',
    description: 'Customer satisfaction survey and feedback form',
    prompt: `Professional screenshot or photograph of customer satisfaction survey template.

SCENE: Clean, professional customer satisfaction survey form
ELEMENTS: Rating scales (1-5 stars), feedback sections, net promoter score, improvement suggestions
STYLE: Professional survey design, user-friendly layout
COLORS: Professional color scheme, clear rating visualizations
QUALITY: 2K, readable text, modern form design

AVOID: Real customer feedback, names, specific company branding, actual survey results`,
  },
  {
    module: 'NRP-019',
    filename: 'quality-metrics-dashboard.jpg',
    description: 'Quality metrics tracking dashboard',
    prompt: `Professional screenshot of quality metrics tracking dashboard.

SCENE: Business intelligence dashboard showing quality KPIs
METRICS: Customer satisfaction score, first-time fix rate, rework percentage, inspection pass rate
STYLE: Professional analytics dashboard, data visualization
COLORS: Color-coded metrics (green=good, yellow=monitor, red=action needed)
QUALITY: 2K, clear graphs and charts, modern dashboard design

AVOID: Real company data, specific performance numbers, company names, time periods`,
  },

  // NRP-020: Customer Service Excellence
  {
    module: 'NRP-020',
    filename: 'customer-communication-channels.jpg',
    description: 'Multi-channel customer communication infographic',
    prompt: `Professional infographic showing customer communication channels.

SCENE: Modern multi-channel communication strategy diagram
CHANNELS: Phone, email, SMS, portal, in-person, mobile app icons
STYLE: Professional marketing infographic, clean modern design
COLORS: Professional brand-neutral colors, consistent iconography
LAYOUT: Hub-and-spoke or grid layout showing all channels
QUALITY: 2K, sharp graphics, clear channel labels

AVOID: Specific phone numbers, real company branding, people, cluttered design`,
  },
  {
    module: 'NRP-020',
    filename: 'customer-journey-map.jpg',
    description: 'Customer experience journey mapping',
    prompt: `Professional infographic of customer journey mapping for restoration services.

SCENE: Customer journey timeline from emergency call to project completion
STAGES: Emergency contact → Assessment → Approval → Restoration → Quality check → Follow-up
ELEMENTS: Touchpoints, emotions curve, pain points, opportunities
STYLE: Professional customer experience design, journey mapping methodology
QUALITY: 2K, clear visualization, professional layout

AVOID: Specific company processes, real customer data, people photos, brand names`,
  },
  {
    module: 'NRP-020',
    filename: 'complaint-resolution-workflow.jpg',
    description: 'Professional complaint resolution process',
    prompt: `Professional infographic showing complaint resolution workflow.

SCENE: Systematic complaint handling and resolution process flow
STEPS: Complaint received → Acknowledgment → Investigation → Resolution plan → Implementation → Follow-up
STYLE: Professional customer service process infographic
COLORS: Calm professional colors (blue/green), clear step progression
LAYOUT: Linear workflow with decision points
QUALITY: 2K, professional design, clear typography

AVOID: Real complaints, customer names, specific incidents, company branding`,
  },
  {
    module: 'NRP-020',
    filename: 'customer-feedback-system.jpg',
    description: 'Customer feedback collection and analysis system',
    prompt: `Professional screenshot of customer feedback management system dashboard.

SCENE: Software dashboard showing feedback collection and analysis
ELEMENTS: Feedback sources, sentiment analysis, trending issues, response tracking
STYLE: Professional CRM-style interface, organized data presentation
COLORS: Professional software UI colors, clear data visualization
QUALITY: 2K, modern interface design, readable dashboards

AVOID: Real customer feedback text, names, specific company software, actual data`,
  },

  // NRP-021: Marketing & Business Development
  {
    module: 'NRP-021',
    filename: 'marketing-channels-overview.jpg',
    description: 'Digital and traditional marketing channels infographic',
    prompt: `Professional infographic showing marketing channels for restoration business.

SCENE: Comprehensive marketing channels overview
CHANNELS: Digital (website, SEO, social media, email) + Traditional (referrals, signage, vehicle wraps, networking)
STYLE: Professional marketing strategy infographic, balanced design
COLORS: Modern professional color palette, distinct channel categories
LAYOUT: Grid or hub design showing all channels
QUALITY: 2K, clean graphics, professional presentation

AVOID: Specific company names, real campaign data, people, brand logos`,
  },
  {
    module: 'NRP-021',
    filename: 'social-media-strategy.jpg',
    description: 'Social media marketing strategy framework',
    prompt: `Professional infographic of social media marketing strategy for restoration services.

SCENE: Social media strategy framework diagram
ELEMENTS: Platform selection (Facebook, LinkedIn, Instagram), content types, posting schedule, engagement tactics
STYLE: Professional digital marketing infographic, modern design
COLORS: Platform-themed colors (blue, professional), organized layout
QUALITY: 2K, sharp graphics, clear strategy visualization

AVOID: Real social media accounts, specific posts, people's faces, company branding`,
  },
  {
    module: 'NRP-021',
    filename: 'lead-generation-funnel.jpg',
    description: 'Lead generation and conversion funnel diagram',
    prompt: `Professional infographic showing lead generation funnel for restoration business.

SCENE: Marketing funnel visualization from awareness to conversion
STAGES: Awareness (wide top) → Interest → Consideration → Intent → Purchase (narrow bottom)
METRICS: Traffic, leads, quotes, conversions shown at each stage
STYLE: Professional sales funnel infographic, data-driven design
COLORS: Gradient or color-coded funnel stages
QUALITY: 2K, clear visualization, professional layout

AVOID: Real conversion data, specific numbers, company names, people`,
  },
  {
    module: 'NRP-021',
    filename: 'branding-guidelines.jpg',
    description: 'Professional branding and visual identity guide',
    prompt: `Professional layout showing branding guidelines template.

SCENE: Brand guidelines page layout showing identity elements
ELEMENTS: Logo variations (generic/placeholder), color palette, typography, imagery style, brand voice
STYLE: Professional brand identity document design
COLORS: Example brand colors (professional/neutral for template)
QUALITY: 2K, clean layout, professional design standards

AVOID: Real company logos, specific brand names, trademarked elements, actual brands`,
  },
  {
    module: 'NRP-021',
    filename: 'marketing-analytics-dashboard.jpg',
    description: 'Marketing performance metrics dashboard',
    prompt: `Professional screenshot of marketing analytics dashboard.

SCENE: Marketing KPI dashboard showing campaign performance
METRICS: Website traffic, lead sources, conversion rates, ROI by channel, campaign performance
STYLE: Professional analytics dashboard, clear data visualization
COLORS: Professional dashboard colors, color-coded metrics
QUALITY: 2K, modern dashboard design, readable graphs

AVOID: Real company data, specific campaign names, actual performance numbers, date ranges`,
  },

  // NRP-022: Project Management
  {
    module: 'NRP-022',
    filename: 'project-timeline-gantt.jpg',
    description: 'Gantt chart showing project timeline and milestones',
    prompt: `Professional Gantt chart visualization for restoration project management.

SCENE: Clean Gantt chart showing typical restoration project phases
PHASES: Assessment, Mitigation, Drying, Reconstruction, Quality check
ELEMENTS: Task bars, dependencies, milestones, critical path
STYLE: Professional project management visualization
COLORS: Professional color-coded phases, clear timeline
QUALITY: 2K, clear bars and text, readable timeline

AVOID: Real project data, client names, specific dates, actual addresses`,
  },
  {
    module: 'NRP-022',
    filename: 'resource-allocation-chart.jpg',
    description: 'Resource allocation and scheduling diagram',
    prompt: `Professional resource allocation chart for restoration projects.

SCENE: Resource scheduling visualization showing team and equipment allocation
ELEMENTS: Personnel schedule, equipment assignments, project timelines, capacity planning
STYLE: Professional resource management chart, organized layout
COLORS: Color-coded resources (team members, equipment types)
QUALITY: 2K, clear visualization, professional project management design

AVOID: Real employee names, specific project details, actual dates, company names`,
  },
  {
    module: 'NRP-022',
    filename: 'project-communication-plan.jpg',
    description: 'Communication plan and stakeholder management',
    prompt: `Professional infographic showing project communication and stakeholder management plan.

SCENE: Communication strategy diagram for restoration project
ELEMENTS: Stakeholder matrix (client, insurer, subcontractors), communication frequency, methods, key messages
STYLE: Professional project communication infographic
COLORS: Professional business colors, clear stakeholder categories
QUALITY: 2K, organized layout, clear communication flows

AVOID: Real stakeholder names, specific companies, actual contact details, people`,
  },
  {
    module: 'NRP-022',
    filename: 'risk-management-matrix.jpg',
    description: 'Risk assessment and mitigation matrix',
    prompt: `Professional risk management matrix for restoration projects.

SCENE: Risk matrix showing likelihood vs impact grid
ELEMENTS: Common project risks plotted (weather delays, scope creep, safety incidents), mitigation strategies
STYLE: Professional risk management visualization, matrix format
COLORS: Risk heat map colors (green=low, yellow=medium, red=high)
QUALITY: 2K, clear grid, readable risk labels

AVOID: Real project risks, specific incidents, company names, actual case data`,
  },
  {
    module: 'NRP-022',
    filename: 'project-closeout-checklist.jpg',
    description: 'Comprehensive project closeout checklist',
    prompt: `Professional project closeout checklist template.

SCENE: Comprehensive closeout checklist for restoration project completion
SECTIONS: Final inspection, documentation delivery, customer approval, invoicing, warranties, feedback
STYLE: Professional project management form design
LAYOUT: Multi-section checklist with sign-off areas
QUALITY: 2K, clear typography, organized sections

AVOID: Real project data, client signatures, specific addresses, actual completion dates`,
  },

  // NRP-023: Financial Management
  {
    module: 'NRP-023',
    filename: 'cash-flow-projection.jpg',
    description: '12-month cash flow projection chart',
    prompt: `Professional cash flow projection chart for restoration business.

SCENE: 12-month cash flow graph showing inflows and outflows
ELEMENTS: Revenue line, expenses line, net cash flow, cumulative balance
STYLE: Professional financial chart, business analytics visualization
COLORS: Green for positive cash flow, red for negative, blue for revenue
QUALITY: 2K, clear axes and labels, professional chart design

AVOID: Real financial data, specific amounts, company names, actual dates`,
  },
  {
    module: 'NRP-023',
    filename: 'profit-loss-statement.jpg',
    description: 'Professional P&L statement template',
    prompt: `Professional profit and loss statement template layout.

SCENE: Clean P&L statement format showing financial performance
SECTIONS: Revenue, Cost of goods sold, Gross profit, Operating expenses, Net profit
STYLE: Professional accounting document design, organized layout
COLORS: Professional financial document colors, clear section headers
QUALITY: 2K, readable numbers (generic placeholders), accounting standard format

AVOID: Real financial data, specific company names, actual amounts, identifiable businesses`,
  },
  {
    module: 'NRP-023',
    filename: 'financial-kpi-dashboard.jpg',
    description: 'Key financial performance indicators dashboard',
    prompt: `Professional financial KPI dashboard for restoration business.

SCENE: Business intelligence dashboard showing key financial metrics
METRICS: Gross profit margin, net profit margin, revenue per employee, average job value, collection period
STYLE: Professional finance dashboard, clear data visualization
COLORS: Professional dashboard colors, gauge charts, trend lines
QUALITY: 2K, modern dashboard design, readable metrics

AVOID: Real company data, specific financial numbers, actual performance data, company names`,
  },
  {
    module: 'NRP-023',
    filename: 'invoice-template.jpg',
    description: 'Professional invoice template design',
    prompt: `Professional invoice template layout for restoration services.

SCENE: Clean, professional invoice design
SECTIONS: Header with company details (generic), invoice number, date, services rendered, amounts, payment terms
STYLE: Professional business invoice design, organized layout
COLORS: Professional blue/white color scheme, clear sections
QUALITY: 2K, readable text, professional layout

AVOID: Real company names, specific addresses, actual amounts, real client data`,
  },
  {
    module: 'NRP-023',
    filename: 'financial-reporting-system.jpg',
    description: 'Financial reporting and analysis system',
    prompt: `Professional screenshot of financial reporting software dashboard.

SCENE: Accounting software dashboard showing financial reporting capabilities
ELEMENTS: Report types (P&L, balance sheet, cash flow), date ranges, export options, chart visualization
STYLE: Professional accounting software interface
COLORS: Professional software UI colors, clear data presentation
QUALITY: 2K, modern interface design, organized layout

AVOID: Real company data, specific software brands, actual financial numbers, client names`,
  },

  // NRP-024: Advanced Business Strategies
  {
    module: 'NRP-024',
    filename: 'business-growth-strategy.jpg',
    description: 'Strategic business growth planning framework',
    prompt: `Professional infographic showing business growth strategy framework.

SCENE: Strategic growth planning visualization for restoration business
ELEMENTS: Market expansion, service diversification, operational efficiency, strategic partnerships
STYLE: Professional business strategy infographic, strategic planning design
COLORS: Professional color scheme, clear strategy categories
LAYOUT: Matrix or quadrant layout showing growth vectors
QUALITY: 2K, professional design, clear strategic elements

AVOID: Specific company strategies, real business data, people, actual company names`,
  },
  {
    module: 'NRP-024',
    filename: 'competitive-analysis-matrix.jpg',
    description: 'Competitive analysis and market positioning',
    prompt: `Professional competitive analysis matrix for restoration industry.

SCENE: Competitive positioning matrix showing market analysis
AXES: Service quality (vertical) vs Price (horizontal), competitor positioning plotted
ELEMENTS: Generic competitor positions (A, B, C, D), market gaps, strategic positioning
STYLE: Professional competitive analysis visualization, strategy framework
COLORS: Professional color-coded competitors, clear quadrants
QUALITY: 2K, clear matrix, readable labels

AVOID: Real competitor names, specific companies, actual market data, brand logos`,
  },
  {
    module: 'NRP-024',
    filename: 'strategic-partnerships.jpg',
    description: 'Partnership development and ecosystem diagram',
    prompt: `Professional infographic showing strategic partnership ecosystem.

SCENE: Business ecosystem map showing partnership relationships
PARTNERS: Insurance companies, property managers, plumbers, builders, suppliers (generic categories)
STYLE: Professional business ecosystem visualization, network diagram
COLORS: Professional color-coded partnership types
LAYOUT: Hub-and-spoke or network diagram showing connections
QUALITY: 2K, clear relationships, professional design

AVOID: Real company names, specific partnerships, actual contracts, brand logos`,
  },
  {
    module: 'NRP-024',
    filename: 'scaling-operations.jpg',
    description: 'Operations scaling and expansion strategy',
    prompt: `Professional infographic showing operations scaling strategy.

SCENE: Operational scaling framework for restoration business growth
ELEMENTS: Process systemization, technology adoption, team expansion, geographic expansion
STYLE: Professional operations strategy infographic, growth framework
COLORS: Progressive color scheme showing growth stages
LAYOUT: Phased approach or maturity model visualization
QUALITY: 2K, clear strategy stages, professional design

AVOID: Specific company plans, real expansion data, people, actual timelines`,
  },
  {
    module: 'NRP-024',
    filename: 'succession-planning.jpg',
    description: 'Business succession and continuity planning',
    prompt: `Professional infographic showing business succession planning framework.

SCENE: Succession planning process and business continuity strategy
ELEMENTS: Leadership development, knowledge transfer, ownership transition, continuity protocols
STYLE: Professional succession planning infographic, strategic framework
COLORS: Professional business colors, clear planning stages
LAYOUT: Timeline or process flow showing succession phases
QUALITY: 2K, professional design, clear planning elements

AVOID: Real people names, specific company succession plans, actual family businesses, photos`,
  },
];

// ============================================================================
// Image Generation Functions
// ============================================================================

async function generateImage(spec: ImageSpec, outputDir: string, skipExisting: boolean = true): Promise<boolean> {
  // Check if file already exists
  const moduleDir = path.join(outputDir, spec.module);
  const outputPath = path.join(moduleDir, spec.filename);

  if (skipExisting && fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`\n⏭️  Skipping: ${spec.module}/${spec.filename}`);
    console.log(`   Already exists: ${outputPath} (${sizeKB} KB)`);
    return true; // Count as success since image exists
  }

  console.log(`\n🎨 Generating: ${spec.module}/${spec.filename}`);
  console.log(`   Description: ${spec.description}`);

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-pro-image-preview', // Nano Banana Pro - from YOUR documentation
    });

    const result = await model.generateContent(spec.prompt);

    // Extract image data
    for (const part of result.response.candidates![0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');

        // Create module subdirectory if needed
        if (!fs.existsSync(moduleDir)) {
          fs.mkdirSync(moduleDir, { recursive: true });
        }

        // Save image
        fs.writeFileSync(outputPath, buffer);

        const sizeKB = (buffer.length / 1024).toFixed(2);
        console.log(`   ✅ Saved: ${outputPath} (${sizeKB} KB)`);
        return true;
      }
    }

    throw new Error('No image data in response');
  } catch (error) {
    console.error(`   ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

async function generateAllImages(): Promise<void> {
  console.log('🚀 Training Module Image Generation');
  console.log('=====================================\n');
  console.log(`Total images to generate: ${TRAINING_IMAGES.length}`);
  console.log(`Estimated cost: ~$${(TRAINING_IMAGES.length * 0.139).toFixed(2)} AUD\n`);

  const outputDir = path.join(process.cwd(), 'apps', 'web', 'public', 'training-sources', 'images');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${outputDir}\n`);
  }

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  // Generate images with rate limiting (8 seconds between requests)
  for (let i = 0; i < TRAINING_IMAGES.length; i++) {
    const spec = TRAINING_IMAGES[i];

    // Check if file already exists BEFORE generation
    const moduleDir = path.join(outputDir, spec.module);
    const outputPath = path.join(moduleDir, spec.filename);
    const fileExistedBefore = fs.existsSync(outputPath);

    const success = await generateImage(spec, outputDir, true);

    if (success) {
      successCount++;
      if (fileExistedBefore) {
        skippedCount++;
      }
    } else {
      failCount++;
      console.error(`Failed to generate ${spec.filename}`);
    }

    // Rate limiting: wait 8 seconds between NEW generations (skip wait if file already existed)
    if (i < TRAINING_IMAGES.length - 1 && !fileExistedBefore && success) {
      console.log('   ⏳ Waiting 8 seconds (rate limit)...');
      await new Promise(resolve => setTimeout(resolve, 8000));
    }
  }

  console.log('\n=====================================');
  console.log('✅ Generation Complete!');
  console.log(`   Total: ${TRAINING_IMAGES.length} images`);
  console.log(`   Generated: ${successCount - skippedCount} new images`);
  console.log(`   Skipped (already exist): ${skippedCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Output: ${outputDir}`);
  console.log('=====================================\n');
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  if (!GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY not found in environment variables');
    console.error('   Please ensure .env.local contains: GEMINI_API_KEY=your_api_key');
    console.error(`   Checked path: ${path.join(process.cwd(), '.env.local')}`);
    process.exit(1);
  }

  console.log(`✅ GEMINI_API_KEY loaded: ${GEMINI_API_KEY.substring(0, 10)}...`);

  try {
    await generateAllImages();
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateAllImages, TRAINING_IMAGES };
