/**
 * Pricing Engine
 *
 * Dynamic pricing calculation based on service type, property size,
 * damage severity, urgency, and insurance status
 */

export interface PricingInput {
  serviceType: 'water' | 'fire' | 'mould' | 'storm' | 'biohazard';
  propertyType: 'residential' | 'commercial';
  propertySize?: number; // square meters
  affectedArea: number; // square meters
  damageSeverity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  urgencyLevel: 'critical' | 'urgent' | 'standard';
  hasInsurance: boolean;
  requiresAsbestos?: boolean;
  requiresContainment?: boolean;
  requiresDehumidification?: boolean;
  requiresOdorRemoval?: boolean;
  floors?: number;
  rooms?: number;
}

export interface PricingBreakdown {
  basePrice: number;
  laborCost: number;
  materialsCost: number;
  equipmentCost: number;
  additionalServices: number;
  urgencySurcharge: number;
  subtotal: number;
  gst: number;
  total: number;
  estimatedDuration: string; // e.g., "3-5 days"
  validUntil: Date;
  breakdown: Array<{
    item: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

/**
 * Base pricing rates per service type
 */
const BASE_RATES = {
  water: {
    baseRate: 150, // per sqm
    minCharge: 2500,
    laborRate: 85, // per hour
    equipmentDaily: 350,
    materialMultiplier: 1.0,
  },
  fire: {
    baseRate: 200,
    minCharge: 5000,
    laborRate: 95,
    equipmentDaily: 450,
    materialMultiplier: 1.3,
  },
  mould: {
    baseRate: 120,
    minCharge: 2000,
    laborRate: 80,
    equipmentDaily: 300,
    materialMultiplier: 1.1,
  },
  storm: {
    baseRate: 175,
    minCharge: 3500,
    laborRate: 90,
    equipmentDaily: 400,
    materialMultiplier: 1.2,
  },
  biohazard: {
    baseRate: 250,
    minCharge: 6000,
    laborRate: 110,
    equipmentDaily: 500,
    materialMultiplier: 1.5,
  },
};

/**
 * Severity multipliers
 */
const SEVERITY_MULTIPLIERS = {
  minor: 1.0,
  moderate: 1.3,
  severe: 1.7,
  catastrophic: 2.2,
};

/**
 * Urgency surcharges
 */
const URGENCY_SURCHARGES = {
  critical: 0.5, // 50% surcharge
  urgent: 0.25, // 25% surcharge
  standard: 0.0, // No surcharge
};

/**
 * Calculate instant quote pricing
 */
export function calculatePricing(input: PricingInput): PricingBreakdown {
  const rates = BASE_RATES[input.serviceType];
  const breakdown: PricingBreakdown['breakdown'] = [];

  // 1. Base price calculation
  const affectedArea = Math.max(input.affectedArea, 10); // Minimum 10 sqm
  const basePrice = Math.max(
    affectedArea * rates.baseRate * SEVERITY_MULTIPLIERS[input.damageSeverity],
    rates.minCharge
  );

  breakdown.push({
    item: 'Base Service Fee',
    description: `${input.serviceType.toUpperCase()} restoration - ${affectedArea}m² affected area`,
    quantity: affectedArea,
    unitPrice: rates.baseRate * SEVERITY_MULTIPLIERS[input.damageSeverity],
    total: basePrice,
  });

  // 2. Labor cost calculation
  const estimatedHours = calculateLaborHours(input);
  const laborCost = estimatedHours * rates.laborRate;

  breakdown.push({
    item: 'Labor',
    description: `IICRC certified technicians - ${estimatedHours} hours`,
    quantity: estimatedHours,
    unitPrice: rates.laborRate,
    total: laborCost,
  });

  // 3. Materials cost
  const materialsCost =
    affectedArea * 25 * rates.materialMultiplier * SEVERITY_MULTIPLIERS[input.damageSeverity];

  breakdown.push({
    item: 'Materials',
    description: 'Cleaning agents, disinfectants, protective materials',
    quantity: affectedArea,
    unitPrice: 25 * rates.materialMultiplier,
    total: materialsCost,
  });

  // 4. Equipment cost
  const estimatedDays = calculateEstimatedDays(input);
  const equipmentCost = estimatedDays * rates.equipmentDaily;

  breakdown.push({
    item: 'Equipment Rental',
    description: `Professional restoration equipment - ${estimatedDays} days`,
    quantity: estimatedDays,
    unitPrice: rates.equipmentDaily,
    total: equipmentCost,
  });

  // 5. Additional services
  let additionalServices = 0;

  if (input.requiresAsbestos) {
    const asbestosCost = 3500;
    additionalServices += asbestosCost;
    breakdown.push({
      item: 'Asbestos Testing & Handling',
      description: 'Licensed asbestos inspection and removal',
      quantity: 1,
      unitPrice: asbestosCost,
      total: asbestosCost,
    });
  }

  if (input.requiresContainment) {
    const containmentCost = affectedArea * 35;
    additionalServices += containmentCost;
    breakdown.push({
      item: 'Containment Setup',
      description: 'Negative air pressure containment system',
      quantity: affectedArea,
      unitPrice: 35,
      total: containmentCost,
    });
  }

  if (input.requiresDehumidification) {
    const dehumCost = estimatedDays * 250;
    additionalServices += dehumCost;
    breakdown.push({
      item: 'Dehumidification',
      description: 'Industrial dehumidifiers and moisture monitoring',
      quantity: estimatedDays,
      unitPrice: 250,
      total: dehumCost,
    });
  }

  if (input.requiresOdorRemoval) {
    const odorCost = 1500;
    additionalServices += odorCost;
    breakdown.push({
      item: 'Odor Removal',
      description: 'Thermal fogging and ozone treatment',
      quantity: 1,
      unitPrice: odorCost,
      total: odorCost,
    });
  }

  // Commercial property multiplier
  const propertyMultiplier = input.propertyType === 'commercial' ? 1.4 : 1.0;

  // Subtotal before urgency
  const subtotalBeforeUrgency =
    (basePrice + laborCost + materialsCost + equipmentCost + additionalServices) *
    propertyMultiplier;

  // 6. Urgency surcharge
  const urgencySurcharge =
    subtotalBeforeUrgency * URGENCY_SURCHARGES[input.urgencyLevel];

  if (urgencySurcharge > 0) {
    breakdown.push({
      item: `${input.urgencyLevel.toUpperCase()} Response`,
      description: `${input.urgencyLevel === 'critical' ? '30-minute' : '60-minute'} emergency response`,
      quantity: 1,
      unitPrice: urgencySurcharge,
      total: urgencySurcharge,
    });
  }

  // Calculate totals
  const subtotal = subtotalBeforeUrgency + urgencySurcharge;
  const gst = subtotal * 0.1; // 10% GST
  const total = subtotal + gst;

  // Estimated duration
  const estimatedDuration = `${estimatedDays}-${estimatedDays + 2} days`;

  // Quote valid for 14 days
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14);

  return {
    basePrice,
    laborCost,
    materialsCost,
    equipmentCost,
    additionalServices,
    urgencySurcharge,
    subtotal,
    gst,
    total,
    estimatedDuration,
    validUntil,
    breakdown,
  };
}

/**
 * Calculate estimated labor hours
 */
function calculateLaborHours(input: PricingInput): number {
  const baseHours = input.affectedArea * 0.5; // 0.5 hours per sqm

  const severityMultiplier = {
    minor: 0.8,
    moderate: 1.0,
    severe: 1.5,
    catastrophic: 2.0,
  };

  const serviceMultiplier = {
    water: 1.0,
    fire: 1.3,
    mould: 0.9,
    storm: 1.1,
    biohazard: 1.5,
  };

  const hours =
    baseHours *
    severityMultiplier[input.damageSeverity] *
    serviceMultiplier[input.serviceType];

  return Math.ceil(Math.max(hours, 8)); // Minimum 8 hours
}

/**
 * Calculate estimated project duration in days
 */
function calculateEstimatedDays(input: PricingInput): number {
  const baseDays = Math.ceil(input.affectedArea / 30); // 30 sqm per day base rate

  const severityDays = {
    minor: 1,
    moderate: 2,
    severe: 3,
    catastrophic: 5,
  };

  const serviceDays = {
    water: 0,
    fire: 2,
    mould: 1,
    storm: 1,
    biohazard: 2,
  };

  const totalDays =
    baseDays + severityDays[input.damageSeverity] + serviceDays[input.serviceType];

  return Math.max(totalDays, 2); // Minimum 2 days
}

/**
 * Calculate insurance excess recommendation
 */
export function calculateInsuranceExcess(total: number): number {
  // Standard excess tiers
  if (total < 5000) return 500;
  if (total < 10000) return 1000;
  if (total < 20000) return 1500;
  if (total < 50000) return 2500;
  return 5000;
}

/**
 * Generate price range estimate (for quick quotes)
 */
export function generatePriceRange(
  serviceType: PricingInput['serviceType'],
  severity: PricingInput['damageSeverity']
): { min: number; max: number; typical: number } {
  const rates = BASE_RATES[serviceType];
  const multiplier = SEVERITY_MULTIPLIERS[severity];

  const min = rates.minCharge;
  const typical = rates.minCharge * multiplier * 1.5;
  const max = rates.minCharge * multiplier * 3;

  return {
    min: Math.round(min),
    max: Math.round(max),
    typical: Math.round(typical),
  };
}

/**
 * Apply discount (for insurance partners, loyalty, etc.)
 */
export function applyDiscount(
  pricing: PricingBreakdown,
  discountPercent: number
): PricingBreakdown {
  const discountAmount = pricing.subtotal * (discountPercent / 100);
  const newSubtotal = pricing.subtotal - discountAmount;
  const newGst = newSubtotal * 0.1;
  const newTotal = newSubtotal + newGst;

  return {
    ...pricing,
    subtotal: newSubtotal,
    gst: newGst,
    total: newTotal,
    breakdown: [
      ...pricing.breakdown,
      {
        item: 'Discount',
        description: `${discountPercent}% discount applied`,
        quantity: 1,
        unitPrice: -discountAmount,
        total: -discountAmount,
      },
    ],
  };
}
