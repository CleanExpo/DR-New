/**
 * Job Estimator Service
 *
 * Provides detailed material and labor calculations for restoration jobs
 */

export interface JobEstimate {
  materials: MaterialEstimate[];
  labor: LaborEstimate[];
  equipment: EquipmentEstimate[];
  timeline: TimelineEstimate;
  totalCost: {
    materials: number;
    labor: number;
    equipment: number;
    subtotal: number;
    gst: number;
    total: number;
  };
}

export interface MaterialEstimate {
  category: string;
  item: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  supplier?: string;
}

export interface LaborEstimate {
  role: string;
  hours: number;
  rate: number;
  totalCost: number;
  certification?: string;
}

export interface EquipmentEstimate {
  equipment: string;
  quantity: number;
  days: number;
  dailyRate: number;
  totalCost: number;
}

export interface TimelineEstimate {
  phases: Array<{
    name: string;
    duration: string;
    dependencies?: string[];
  }>;
  totalDuration: string;
  criticalPath: string[];
}

/**
 * Material costs database
 */
const MATERIALS = {
  water: [
    { item: 'Antimicrobial solution', unit: 'litre', cost: 25 },
    { item: 'Dehumidifier desiccant', unit: 'kg', cost: 15 },
    { item: 'Moisture meter probes', unit: 'each', cost: 45 },
    { item: 'Plastic sheeting', unit: 'sqm', cost: 3.5 },
    { item: 'Disinfectant spray', unit: 'litre', cost: 18 },
    { item: 'Air scrubber filters', unit: 'each', cost: 65 },
    { item: 'Absorbent pads', unit: 'pack', cost: 35 },
  ],
  fire: [
    { item: 'HEPA vacuum filters', unit: 'each', cost: 85 },
    { item: 'Soot sponges', unit: 'pack', cost: 45 },
    { item: 'Odor neutralizer', unit: 'litre', cost: 55 },
    { item: 'Thermal fogging solution', unit: 'litre', cost: 75 },
    { item: 'Protective sheeting', unit: 'sqm', cost: 4.5 },
    { item: 'Smoke sealant', unit: 'litre', cost: 95 },
    { item: 'Cleaning solvents', unit: 'litre', cost: 35 },
  ],
  mould: [
    { item: 'Mould remediation solution', unit: 'litre', cost: 45 },
    { item: 'HEPA filter bags', unit: 'pack', cost: 55 },
    { item: 'Containment poles', unit: 'each', cost: 25 },
    { item: 'Negative air machine filters', unit: 'each', cost: 125 },
    { item: 'Antimicrobial coating', unit: 'litre', cost: 85 },
    { item: 'Mould test kits', unit: 'each', cost: 95 },
    { item: 'PPE suits', unit: 'each', cost: 15 },
  ],
  storm: [
    { item: 'Tarpaulin sheets', unit: 'sqm', cost: 8 },
    { item: 'Emergency boarding', unit: 'sqm', cost: 25 },
    { item: 'Waterproof membrane', unit: 'sqm', cost: 12 },
    { item: 'Drainage materials', unit: 'metre', cost: 18 },
    { item: 'Structural supports', unit: 'each', cost: 145 },
    { item: 'Sealing compounds', unit: 'litre', cost: 35 },
  ],
  biohazard: [
    { item: 'Biohazard disposal bags', unit: 'pack', cost: 65 },
    { item: 'Hospital-grade disinfectant', unit: 'litre', cost: 95 },
    { item: 'PPE Level 3 suits', unit: 'each', cost: 45 },
    { item: 'Sharps containers', unit: 'each', cost: 25 },
    { item: 'Enzyme cleaner', unit: 'litre', cost: 85 },
    { item: 'Ozone generator consumables', unit: 'pack', cost: 125 },
  ],
};

/**
 * Equipment rental rates
 */
const EQUIPMENT = {
  water: [
    { name: 'Industrial dehumidifier', dailyRate: 120 },
    { name: 'Air mover (large)', dailyRate: 45 },
    { name: 'Moisture meter', dailyRate: 25 },
    { name: 'Thermal camera', dailyRate: 85 },
    { name: 'Water extraction unit', dailyRate: 150 },
  ],
  fire: [
    { name: 'HEPA air scrubber', dailyRate: 175 },
    { name: 'Thermal fogger', dailyRate: 95 },
    { name: 'Ozone generator', dailyRate: 125 },
    { name: 'Hydroxyl generator', dailyRate: 145 },
    { name: 'Industrial vacuum', dailyRate: 65 },
  ],
  mould: [
    { name: 'Negative air machine', dailyRate: 155 },
    { name: 'HEPA vacuum', dailyRate: 75 },
    { name: 'Containment system', dailyRate: 95 },
    { name: 'Mould air sampling pump', dailyRate: 55 },
    { name: 'Dehumidifier', dailyRate: 85 },
  ],
  storm: [
    { name: 'Submersible pump', dailyRate: 95 },
    { name: 'Generator (10kW)', dailyRate: 185 },
    { name: 'Dehumidifier', dailyRate: 120 },
    { name: 'Air mover', dailyRate: 45 },
    { name: 'Structural drying system', dailyRate: 225 },
  ],
  biohazard: [
    { name: 'ULV fogger', dailyRate: 145 },
    { name: 'HEPA air scrubber', dailyRate: 175 },
    { name: 'Ozone generator', dailyRate: 125 },
    { name: 'Biohazard disposal unit', dailyRate: 95 },
    { name: 'ATP testing equipment', dailyRate: 65 },
  ],
};

/**
 * Labor rates by role
 */
const LABOR_RATES = {
  'IICRC Master Restorer': 110,
  'IICRC Certified Technician': 85,
  'Senior Technician': 75,
  'Technician': 65,
  'Apprentice': 45,
  'Project Manager': 95,
};

/**
 * Generate comprehensive job estimate
 */
export function generateJobEstimate(input: {
  serviceType: 'water' | 'fire' | 'mould' | 'storm' | 'biohazard';
  affectedArea: number;
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  floors?: number;
  requiresContainment?: boolean;
  requiresAsbestos?: boolean;
}): JobEstimate {
  const materials = estimateMaterials(input);
  const labor = estimateLabor(input);
  const equipment = estimateEquipment(input);
  const timeline = estimateTimeline(input);

  const materialsCost = materials.reduce((sum, m) => sum + m.totalCost, 0);
  const laborCost = labor.reduce((sum, l) => sum + l.totalCost, 0);
  const equipmentCost = equipment.reduce((sum, e) => sum + e.totalCost, 0);

  const subtotal = materialsCost + laborCost + equipmentCost;
  const gst = subtotal * 0.1;
  const total = subtotal + gst;

  return {
    materials,
    labor,
    equipment,
    timeline,
    totalCost: {
      materials: materialsCost,
      labor: laborCost,
      equipment: equipmentCost,
      subtotal,
      gst,
      total,
    },
  };
}

/**
 * Estimate materials required
 */
function estimateMaterials(input: {
  serviceType: string;
  affectedArea: number;
  severity: string;
  requiresContainment?: boolean;
}): MaterialEstimate[] {
  const serviceMaterials = MATERIALS[input.serviceType as keyof typeof MATERIALS] || [];
  const estimates: MaterialEstimate[] = [];

  const severityMultiplier = {
    minor: 0.8,
    moderate: 1.0,
    severe: 1.5,
    catastrophic: 2.0,
  }[input.severity] || 1.0;

  for (const material of serviceMaterials) {
    let quantity = 0;

    // Calculate quantity based on affected area
    if (material.unit === 'sqm') {
      quantity = input.affectedArea;
    } else if (material.unit === 'litre') {
      quantity = Math.ceil((input.affectedArea / 20) * severityMultiplier);
    } else if (material.unit === 'each' || material.unit === 'pack') {
      quantity = Math.ceil((input.affectedArea / 50) * severityMultiplier);
    } else if (material.unit === 'kg') {
      quantity = Math.ceil((input.affectedArea / 30) * severityMultiplier);
    } else if (material.unit === 'metre') {
      quantity = Math.ceil(input.affectedArea * 0.4);
    }

    quantity = Math.max(quantity, 1); // Minimum 1 unit

    estimates.push({
      category: input.serviceType,
      item: material.item,
      quantity,
      unit: material.unit,
      unitCost: material.cost,
      totalCost: quantity * material.cost,
    });
  }

  // Add containment materials if required
  if (input.requiresContainment) {
    estimates.push({
      category: 'Containment',
      item: 'Containment barrier system',
      quantity: input.affectedArea,
      unit: 'sqm',
      unitCost: 15,
      totalCost: input.affectedArea * 15,
    });
  }

  return estimates;
}

/**
 * Estimate labor requirements
 */
function estimateLabor(input: {
  serviceType: string;
  affectedArea: number;
  severity: string;
}): LaborEstimate[] {
  const estimates: LaborEstimate[] = [];

  const baseHours = input.affectedArea * 0.5;
  const severityMultiplier = {
    minor: 0.8,
    moderate: 1.0,
    severe: 1.5,
    catastrophic: 2.0,
  }[input.severity] || 1.0;

  // Master Restorer (initial assessment + oversight)
  const masterHours = Math.ceil(Math.max(4, baseHours * 0.2));
  estimates.push({
    role: 'IICRC Master Restorer',
    hours: masterHours,
    rate: LABOR_RATES['IICRC Master Restorer'],
    totalCost: masterHours * LABOR_RATES['IICRC Master Restorer'],
    certification: 'IICRC Master Restorer',
  });

  // Certified Technicians
  const techHours = Math.ceil(baseHours * severityMultiplier);
  estimates.push({
    role: 'IICRC Certified Technician',
    hours: techHours,
    rate: LABOR_RATES['IICRC Certified Technician'],
    totalCost: techHours * LABOR_RATES['IICRC Certified Technician'],
    certification: 'IICRC WRT/FST/AMRT',
  });

  // Additional technicians for large jobs
  if (input.affectedArea > 100) {
    const seniorHours = Math.ceil(baseHours * 0.6);
    estimates.push({
      role: 'Senior Technician',
      hours: seniorHours,
      rate: LABOR_RATES['Senior Technician'],
      totalCost: seniorHours * LABOR_RATES['Senior Technician'],
    });
  }

  // Project manager for complex jobs
  if (input.severity === 'severe' || input.severity === 'catastrophic') {
    const pmHours = Math.ceil(baseHours * 0.3);
    estimates.push({
      role: 'Project Manager',
      hours: pmHours,
      rate: LABOR_RATES['Project Manager'],
      totalCost: pmHours * LABOR_RATES['Project Manager'],
    });
  }

  return estimates;
}

/**
 * Estimate equipment requirements
 */
function estimateEquipment(input: {
  serviceType: string;
  affectedArea: number;
  severity: string;
}): EquipmentEstimate[] {
  const serviceEquipment = EQUIPMENT[input.serviceType as keyof typeof EQUIPMENT] || [];
  const estimates: EquipmentEstimate[] = [];

  const estimatedDays = Math.max(
    2,
    Math.ceil(input.affectedArea / 30) +
      ({ minor: 1, moderate: 2, severe: 3, catastrophic: 5 }[input.severity] || 2)
  );

  for (const equip of serviceEquipment) {
    let quantity = 1;

    // Scale equipment quantity based on area
    if (input.affectedArea > 100) {
      quantity = Math.ceil(input.affectedArea / 100);
    }

    // Air movers and dehumidifiers need more units
    if (equip.name.includes('Air mover') || equip.name.includes('Dehumidifier')) {
      quantity = Math.ceil(input.affectedArea / 50);
    }

    estimates.push({
      equipment: equip.name,
      quantity,
      days: estimatedDays,
      dailyRate: equip.dailyRate,
      totalCost: quantity * estimatedDays * equip.dailyRate,
    });
  }

  return estimates;
}

/**
 * Estimate project timeline
 */
function estimateTimeline(input: {
  serviceType: string;
  affectedArea: number;
  severity: string;
}): TimelineEstimate {
  const phases = [
    {
      name: 'Initial Assessment & Documentation',
      duration: '1 day',
      dependencies: [],
    },
    {
      name: 'Emergency Response & Stabilization',
      duration: '1 day',
      dependencies: ['Initial Assessment & Documentation'],
    },
  ];

  // Service-specific phases
  if (input.serviceType === 'water') {
    phases.push(
      {
        name: 'Water Extraction',
        duration: '1-2 days',
        dependencies: ['Emergency Response & Stabilization'],
      },
      {
        name: 'Drying & Dehumidification',
        duration: '3-5 days',
        dependencies: ['Water Extraction'],
      }
    );
  } else if (input.serviceType === 'fire') {
    phases.push(
      {
        name: 'Soot & Smoke Removal',
        duration: '2-3 days',
        dependencies: ['Emergency Response & Stabilization'],
      },
      {
        name: 'Odor Elimination',
        duration: '2-4 days',
        dependencies: ['Soot & Smoke Removal'],
      }
    );
  } else if (input.serviceType === 'mould') {
    phases.push(
      {
        name: 'Containment Setup',
        duration: '1 day',
        dependencies: ['Emergency Response & Stabilization'],
      },
      {
        name: 'Mould Remediation',
        duration: '3-5 days',
        dependencies: ['Containment Setup'],
      }
    );
  }

  phases.push(
    {
      name: 'Cleaning & Sanitization',
      duration: '2-3 days',
      dependencies: [phases[phases.length - 1].name],
    },
    {
      name: 'Final Inspection & Clearance Testing',
      duration: '1 day',
      dependencies: ['Cleaning & Sanitization'],
    }
  );

  const baseDays = Math.ceil(input.affectedArea / 30);
  const severityDays = { minor: 1, moderate: 2, severe: 3, catastrophic: 5 }[input.severity] || 2;
  const totalDays = Math.max(2, baseDays + severityDays);

  return {
    phases,
    totalDuration: `${totalDays}-${totalDays + 2} days`,
    criticalPath: phases.map((p) => p.name),
  };
}
