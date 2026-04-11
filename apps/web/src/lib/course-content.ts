/**
 * NRPG Course Content Registry — DR-187 + DR-188
 *
 * Structured data for all CSE (10 modules) and WRT (12 modules) courses.
 * Used by onboarding portal, CARSI sync, and contractor dashboard.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CourseModule {
  id: string;
  title: string;
  duration: number; // minutes
  description: string;
  learningOutcomes: string[];
  assessmentType: 'quiz' | 'practical' | 'written' | 'observation';
  iicrcStandard?: string;
}

export interface Course {
  code: string;
  name: string;
  totalModules: number;
  totalHours: number;
  description: string;
  modules: CourseModule[];
}

// ---------------------------------------------------------------------------
// CSE — Customer Service Excellence (10 modules, 10 hours)
// ---------------------------------------------------------------------------

export const CSE_COURSE: Course = {
  code: 'CSE',
  name: 'Customer Service Excellence',
  totalModules: 10,
  totalHours: 10,
  description:
    'Foundation course covering customer communication, crisis management, insurance liaison, and professional service delivery in the disaster recovery industry.',
  modules: [
    {
      id: 'CSE-M01',
      title: 'Understanding Customer Psychology in Crisis',
      duration: 45,
      description:
        'How property owners respond emotionally to disaster events. Trauma-informed communication. Managing expectations during high-stress situations.',
      learningOutcomes: [
        'Identify the 5 stages of crisis response in property owners',
        'Apply trauma-informed communication techniques',
        'De-escalate emotionally charged interactions',
      ],
      assessmentType: 'quiz',
    },
    {
      id: 'CSE-M02',
      title: 'First Contact Excellence',
      duration: 60,
      description:
        'Making a professional first impression. Phone etiquette. Initial property assessment communication. Setting realistic timelines.',
      learningOutcomes: [
        'Deliver a professional first contact experience',
        'Communicate scope of work clearly to non-technical clients',
        'Set realistic timelines and manage expectations from day one',
      ],
      assessmentType: 'quiz',
    },
    {
      id: 'CSE-M03',
      title: 'Communication During Restoration',
      duration: 75,
      description:
        'Keeping clients informed throughout the restoration process. Daily updates. Photo documentation sharing. Explaining technical processes in plain language.',
      learningOutcomes: [
        'Establish a daily communication cadence with clients',
        'Translate technical restoration terminology for property owners',
        'Use photo documentation as a communication tool',
      ],
      assessmentType: 'practical',
    },
    {
      id: 'CSE-M04',
      title: 'Difficult Conversations',
      duration: 90,
      description:
        'Delivering bad news (extended timelines, additional damage discovered). Handling complaints. Conflict resolution. Escalation procedures.',
      learningOutcomes: [
        'Deliver unwelcome news with empathy and professionalism',
        'Resolve client complaints using the LAST framework (Listen, Apologise, Solve, Thank)',
        'Know when and how to escalate to NRPG management',
      ],
      assessmentType: 'written',
    },
    {
      id: 'CSE-M05',
      title: 'Insurance Communication',
      duration: 60,
      description:
        'Working with loss assessors and insurance companies. Documentation requirements. Scope of work submissions. Avoiding common disputes.',
      learningOutcomes: [
        'Prepare insurance-grade documentation and reports',
        'Communicate scope changes to assessors promptly',
        'Avoid the top 5 causes of insurance claim disputes',
      ],
      assessmentType: 'quiz',
    },
    {
      id: 'CSE-M06',
      title: 'Quality Assurance & Follow-up',
      duration: 45,
      description:
        'Post-restoration client satisfaction checks. Warranty communication. Building long-term client relationships. Referral generation.',
      learningOutcomes: [
        'Conduct a professional post-restoration walkthrough',
        'Explain warranty terms and ongoing maintenance',
        'Generate referrals through exceptional follow-up',
      ],
      assessmentType: 'quiz',
    },
    {
      id: 'CSE-M07',
      title: 'Crisis Intervention',
      duration: 60,
      description:
        'Emergency response communication. Coordinating with emergency services. Client safety communication. After-hours contact protocols.',
      learningOutcomes: [
        'Communicate safety instructions to distressed property owners',
        'Coordinate with SES, fire, and police at disaster sites',
        'Follow NRPG after-hours emergency response protocols',
      ],
      assessmentType: 'observation',
    },
    {
      id: 'CSE-M08',
      title: 'Technology & Customer Service',
      duration: 45,
      description:
        'Using RestoreAssist for client-facing documentation. Digital moisture mapping walkthrough. Automated progress notifications.',
      learningOutcomes: [
        'Use RestoreAssist to generate client-facing reports',
        'Walk clients through digital moisture maps',
        'Configure automated progress notifications',
      ],
      assessmentType: 'practical',
    },
    {
      id: 'CSE-M09',
      title: 'Cultural Competency in Australian Service',
      duration: 60,
      description:
        'Serving Australia\'s diverse communities. Language barriers. Cultural sensitivities around property and personal belongings. Working with interpreters.',
      learningOutcomes: [
        'Adapt communication style for culturally diverse clients',
        'Access interpreter services when needed',
        'Handle culturally significant items with appropriate respect',
      ],
      assessmentType: 'quiz',
    },
    {
      id: 'CSE-M10',
      title: 'Professional Brand Representation',
      duration: 60,
      description:
        'Representing the NRPG brand. Uniform and vehicle standards. Social media guidelines. Client confidentiality. Clean Claims documentation integration.',
      learningOutcomes: [
        'Represent the NRPG brand according to standards',
        'Maintain client confidentiality at all times',
        'Integrate Clean Claims documentation into daily workflow',
      ],
      assessmentType: 'quiz',
    },
  ],
};

// ---------------------------------------------------------------------------
// WRT — Water Restoration Technician (12 modules, 24 hours)
// ---------------------------------------------------------------------------

export const WRT_COURSE: Course = {
  code: 'WRT',
  name: 'Water Restoration Technician',
  totalModules: 12,
  totalHours: 24,
  description:
    'Comprehensive water damage restoration training aligned with IICRC S500 standards. Covers assessment, extraction, drying science, antimicrobial application, and documentation.',
  modules: [
    {
      id: 'WRT-M01',
      title: 'Introduction to Water Damage Restoration',
      duration: 45,
      description:
        'Industry overview. Australian restoration landscape. IICRC standards framework. NRPG quality expectations. Safety fundamentals.',
      learningOutcomes: [
        'Describe the Australian restoration industry structure',
        'Identify the key IICRC standards applicable to water damage',
        'Apply basic safety protocols on a water damage site',
      ],
      assessmentType: 'quiz',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M02',
      title: 'Psychrometry and Drying Science',
      duration: 60,
      description:
        'Temperature, humidity, and vapour pressure relationships. Psychrometric chart reading. Dew point calculation. How materials absorb and release moisture.',
      learningOutcomes: [
        'Read and interpret a psychrometric chart',
        'Calculate dew point and grains per pound',
        'Explain the physics of evaporation in structural drying',
      ],
      assessmentType: 'quiz',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M03',
      title: 'Inspection and Moisture Detection',
      duration: 90,
      description:
        'Moisture meter types (pin, pinless, thermo-hygrometer). Infrared camera usage. Developing moisture maps. Documenting affected areas per IICRC S500.',
      learningOutcomes: [
        'Select the correct moisture meter for each material type',
        'Create a comprehensive moisture map of an affected property',
        'Document inspection findings to IICRC S500 standards',
      ],
      assessmentType: 'practical',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M04',
      title: 'Water Extraction Equipment',
      duration: 75,
      description:
        'Truck-mount extractors. Portable extractors. Submersible pumps. Weighted extraction tools. Choosing the right equipment for the water category and volume.',
      learningOutcomes: [
        'Select appropriate extraction equipment for the job',
        'Operate truck-mount and portable extraction units safely',
        'Calculate extraction efficiency and document water removed',
      ],
      assessmentType: 'practical',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M05',
      title: 'Structural Drying Equipment',
      duration: 90,
      description:
        'Desiccant vs refrigerant dehumidifiers. Low grain refrigerant (LGR). Air movers — centrifugal vs axial. Air scrubbers. Equipment placement strategies.',
      learningOutcomes: [
        'Explain the difference between desiccant and LGR dehumidifiers',
        'Calculate the number of air movers needed per square metre',
        'Deploy equipment for optimal drying efficiency',
      ],
      assessmentType: 'practical',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M06',
      title: 'Drying Goals and Strategies',
      duration: 60,
      description:
        'Setting drying goals per material type. Open vs closed drying systems. Heat injection. Daily monitoring and adjustment. When to declare drying complete.',
      learningOutcomes: [
        'Set measurable drying goals for common building materials',
        'Choose between open and closed drying systems',
        'Determine when structural drying is complete to S500 standard',
      ],
      assessmentType: 'written',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M07',
      title: 'Antimicrobial Application',
      duration: 45,
      description:
        'When antimicrobials are required. Product selection (APVMA-registered in Australia). Application methods. PPE requirements. Category 2 and 3 water protocols.',
      learningOutcomes: [
        'Identify when antimicrobial application is required',
        'Select APVMA-registered products appropriate to the situation',
        'Apply antimicrobials safely with correct PPE',
      ],
      assessmentType: 'quiz',
      iicrcStandard: 'S520',
    },
    {
      id: 'WRT-M08',
      title: 'Contents Processing',
      duration: 60,
      description:
        'Pack-out procedures. Inventory documentation. Cleaning and restoring contents. When to recommend replacement vs restoration. Client communication about personal items.',
      learningOutcomes: [
        'Execute a professional pack-out with full inventory',
        'Determine restorability of common household contents',
        'Document contents condition for insurance purposes',
      ],
      assessmentType: 'practical',
    },
    {
      id: 'WRT-M09',
      title: 'Water Category and Class Classification',
      duration: 90,
      description:
        'Category 1 (clean), 2 (grey), 3 (black) water. Class 1–4 water damage extent. How classification affects scope, PPE, and protocols. Re-classification triggers.',
      learningOutcomes: [
        'Correctly classify water damage by category and class',
        'Adjust restoration protocols based on classification',
        'Identify re-classification triggers (e.g. time elapsed, temperature)',
      ],
      assessmentType: 'quiz',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M10',
      title: 'Documentation & Clean Claims Integration',
      duration: 120,
      description:
        'Professional documentation standards. Clean Claims platform usage. Photo documentation requirements. Drying log maintenance. Report generation for insurers.',
      learningOutcomes: [
        'Produce IICRC-standard documentation for every job',
        'Use Clean Claims for real-time photo and data capture',
        'Generate insurer-ready reports from field documentation',
      ],
      assessmentType: 'practical',
      iicrcStandard: 'S500',
    },
    {
      id: 'WRT-M11',
      title: 'Australian Standards and Regulations',
      duration: 60,
      description:
        'AS/NZS standards applicable to restoration. State licensing requirements. WHS obligations. Environmental disposal requirements. Asbestos awareness.',
      learningOutcomes: [
        'Identify AS/NZS standards that apply to water damage restoration',
        'Comply with state-specific licensing requirements',
        'Follow correct environmental disposal procedures',
      ],
      assessmentType: 'quiz',
    },
    {
      id: 'WRT-M12',
      title: 'Capstone: Simulated Water Damage Scenario',
      duration: 180,
      description:
        'Full scenario: Category 2 water loss in a residential property. Inspect, classify, extract, set up drying, document, and produce a complete report.',
      learningOutcomes: [
        'Execute a complete water damage restoration from inspection to completion',
        'Produce documentation meeting IICRC S500 and NRPG standards',
        'Demonstrate professional client communication throughout',
      ],
      assessmentType: 'practical',
      iicrcStandard: 'S500',
    },
  ],
};

// ---------------------------------------------------------------------------
// All courses registry
// ---------------------------------------------------------------------------

export const ALL_COURSES: Record<string, Course> = {
  CSE: CSE_COURSE,
  WRT: WRT_COURSE,
};

/**
 * Get modules for a specific course
 */
export function getCourseModules(courseCode: string): CourseModule[] {
  return ALL_COURSES[courseCode]?.modules ?? [];
}

/**
 * Get a specific module by ID (e.g. 'CSE-M04' or 'WRT-M10')
 */
export function getModule(moduleId: string): CourseModule | undefined {
  for (const course of Object.values(ALL_COURSES)) {
    const mod = course.modules.find((m) => m.id === moduleId);
    if (mod) return mod;
  }
  return undefined;
}

/**
 * Get total training hours for all mandatory courses
 */
export function getTotalTrainingHours(): number {
  return Object.values(ALL_COURSES).reduce((sum, c) => sum + c.totalHours, 0);
}
