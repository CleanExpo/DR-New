// Quote Calculator Web Worker
// Performs heavy calculations for quote generation off the main thread

self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  try {
    switch (type) {
      case 'CALCULATE_QUOTE':
        const quote = calculateQuote(data);
        self.postMessage({ type: 'QUOTE_RESULT', data: quote });
        break;

      case 'CALCULATE_BULK_QUOTES':
        const quotes = data.requests.map(calculateQuote);
        self.postMessage({ type: 'BULK_QUOTES_RESULT', data: quotes });
        break;

      case 'VALIDATE_QUOTE':
        const validation = validateQuote(data);
        self.postMessage({ type: 'VALIDATION_RESULT', data: validation });
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
});

/**
 * Calculate quote based on service type and parameters
 */
function calculateQuote(params) {
  const {
    serviceType,
    area,
    urgency = 'standard',
    insuranceCovered = false,
    location,
  } = params;

  // Base rates per service type (in AUD)
  const baseRates = {
    'water-damage': 150,
    'fire-damage': 200,
    'mould-remediation': 180,
    'storm-damage': 160,
    'emergency-response': 250,
  };

  // Area multipliers (per square meter)
  const areaRate = {
    'water-damage': 15,
    'fire-damage': 25,
    'mould-remediation': 20,
    'storm-damage': 18,
    'emergency-response': 30,
  };

  // Urgency multipliers
  const urgencyMultiplier = {
    standard: 1.0,
    urgent: 1.3,
    emergency: 1.6,
  };

  // Location premium (high net worth suburbs)
  const premiumLocations = [
    'hamilton',
    'ascot',
    'new-farm',
    'toowong',
    'karalee',
    'brookwater',
    'springfield-lakes',
  ];
  const locationMultiplier = premiumLocations.includes(
    location?.toLowerCase()
  )
    ? 1.1
    : 1.0;

  // Calculate base cost
  const baseRate = baseRates[serviceType] || 150;
  const areaCost = (areaRate[serviceType] || 15) * (area || 50);
  const urgencyCost =
    (baseRate + areaCost) * (urgencyMultiplier[urgency] - 1);

  // Subtotal
  const subtotal = baseRate + areaCost + urgencyCost;

  // Apply location premium
  const withLocationPremium = subtotal * locationMultiplier;

  // Insurance discount (if applicable)
  const insuranceDiscount = insuranceCovered ? withLocationPremium * 0.05 : 0;

  // Calculate GST
  const beforeGST = withLocationPremium - insuranceDiscount;
  const gst = beforeGST * 0.1;

  // Final total
  const total = beforeGST + gst;

  return {
    serviceType,
    breakdown: {
      baseRate,
      areaCost: Math.round(areaCost * 100) / 100,
      urgencyCost: Math.round(urgencyCost * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100,
      locationPremium: Math.round(
        (withLocationPremium - subtotal) * 100
      ) / 100,
      insuranceDiscount: Math.round(insuranceDiscount * 100) / 100,
      gst: Math.round(gst * 100) / 100,
    },
    total: Math.round(total * 100) / 100,
    estimatedDuration: calculateDuration(serviceType, area),
    calculatedAt: new Date().toISOString(),
  };
}

/**
 * Estimate job duration based on service type and area
 */
function calculateDuration(serviceType, area) {
  const baseHours = {
    'water-damage': 4,
    'fire-damage': 8,
    'mould-remediation': 6,
    'storm-damage': 5,
    'emergency-response': 2,
  };

  const hoursPerSqm = {
    'water-damage': 0.1,
    'fire-damage': 0.15,
    'mould-remediation': 0.12,
    'storm-damage': 0.11,
    'emergency-response': 0.05,
  };

  const base = baseHours[serviceType] || 4;
  const additional = (hoursPerSqm[serviceType] || 0.1) * (area || 50);

  const totalHours = Math.ceil(base + additional);

  return {
    hours: totalHours,
    days: Math.ceil(totalHours / 8),
    description: `Estimated ${totalHours} hours (${Math.ceil(totalHours / 8)} working days)`,
  };
}

/**
 * Validate quote parameters
 */
function validateQuote(params) {
  const errors = [];

  if (!params.serviceType) {
    errors.push('Service type is required');
  }

  if (!params.area || params.area <= 0) {
    errors.push('Area must be greater than 0');
  }

  if (params.area && params.area > 10000) {
    errors.push('Area seems unreasonably large. Please contact us directly.');
  }

  const validUrgencies = ['standard', 'urgent', 'emergency'];
  if (params.urgency && !validUrgencies.includes(params.urgency)) {
    errors.push(`Urgency must be one of: ${validUrgencies.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Signal worker is ready
self.postMessage({ type: 'READY' });
