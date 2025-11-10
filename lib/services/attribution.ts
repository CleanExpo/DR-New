/**
 * Marketing Attribution Service
 *
 * Multi-touch attribution for understanding the customer journey
 */

export interface TouchPoint {
  timestamp: Date;
  source: string;
  medium: string;
  campaign?: string;
  page: string;
  eventType: 'pageview' | 'click' | 'form_submit' | 'call' | 'conversion';
  value?: number;
}

export interface AttributionModel {
  model: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'position_based';
  touchPoints: TouchPoint[];
  conversionValue: number;
  attribution: Array<{
    source: string;
    medium: string;
    campaign?: string;
    credit: number;
    creditPercentage: number;
  }>;
}

/**
 * Calculate attribution using specified model
 */
export function calculateAttribution(
  touchPoints: TouchPoint[],
  conversionValue: number,
  model: AttributionModel['model'] = 'linear'
): AttributionModel['attribution'] {
  if (touchPoints.length === 0) {
    return [];
  }

  switch (model) {
    case 'first_touch':
      return firstTouchAttribution(touchPoints, conversionValue);
    case 'last_touch':
      return lastTouchAttribution(touchPoints, conversionValue);
    case 'linear':
      return linearAttribution(touchPoints, conversionValue);
    case 'time_decay':
      return timeDecayAttribution(touchPoints, conversionValue);
    case 'position_based':
      return positionBasedAttribution(touchPoints, conversionValue);
    default:
      return linearAttribution(touchPoints, conversionValue);
  }
}

/**
 * First-touch attribution (100% credit to first interaction)
 */
function firstTouchAttribution(
  touchPoints: TouchPoint[],
  conversionValue: number
): AttributionModel['attribution'] {
  const first = touchPoints[0];
  if (!first) {
    return [];
  }

  return [
    {
      source: first.source,
      medium: first.medium,
      campaign: first.campaign,
      credit: conversionValue,
      creditPercentage: 100,
    },
  ];
}

/**
 * Last-touch attribution (100% credit to last interaction)
 */
function lastTouchAttribution(
  touchPoints: TouchPoint[],
  conversionValue: number
): AttributionModel['attribution'] {
  const last = touchPoints[touchPoints.length - 1];
  if (!last) {
    return [];
  }

  return [
    {
      source: last.source,
      medium: last.medium,
      campaign: last.campaign,
      credit: conversionValue,
      creditPercentage: 100,
    },
  ];
}

/**
 * Linear attribution (equal credit to all touchpoints)
 */
function linearAttribution(
  touchPoints: TouchPoint[],
  conversionValue: number
): AttributionModel['attribution'] {
  const creditPerPoint = conversionValue / touchPoints.length;
  const percentagePerPoint = 100 / touchPoints.length;

  const attributionMap: Record<
    string,
    {
      source: string;
      medium: string;
      campaign?: string;
      credit: number;
      creditPercentage: number;
    }
  > = {};

  for (const point of touchPoints) {
    const key = `${point.source}_${point.medium}_${point.campaign || 'none'}`;

    if (!attributionMap[key]) {
      attributionMap[key] = {
        source: point.source,
        medium: point.medium,
        campaign: point.campaign,
        credit: 0,
        creditPercentage: 0,
      };
    }

    attributionMap[key].credit += creditPerPoint;
    attributionMap[key].creditPercentage += percentagePerPoint;
  }

  return Object.values(attributionMap);
}

/**
 * Time-decay attribution (more recent interactions get more credit)
 */
function timeDecayAttribution(
  touchPoints: TouchPoint[],
  conversionValue: number
): AttributionModel['attribution'] {
  const halfLife = 7; // 7 days half-life
  const lastPoint = touchPoints[touchPoints.length - 1];
  if (!lastPoint) {
    return [];
  }
  const now = lastPoint.timestamp.getTime();

  // Calculate weights using exponential decay
  const weights = touchPoints.map((point) => {
    const daysSince = (now - point.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    return Math.pow(2, -daysSince / halfLife);
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  const attributionMap: Record<
    string,
    {
      source: string;
      medium: string;
      campaign?: string;
      credit: number;
      creditPercentage: number;
    }
  > = {};

  touchPoints.forEach((point, index) => {
    const key = `${point.source}_${point.medium}_${point.campaign || 'none'}`;

    if (!attributionMap[key]) {
      attributionMap[key] = {
        source: point.source,
        medium: point.medium,
        campaign: point.campaign,
        credit: 0,
        creditPercentage: 0,
      };
    }

    const weight = weights[index] ?? 0;
    const credit = (weight / totalWeight) * conversionValue;
    const percentage = (weight / totalWeight) * 100;

    attributionMap[key].credit += credit;
    attributionMap[key].creditPercentage += percentage;
  });

  return Object.values(attributionMap);
}

/**
 * Position-based attribution (40% first, 40% last, 20% middle)
 */
function positionBasedAttribution(
  touchPoints: TouchPoint[],
  conversionValue: number
): AttributionModel['attribution'] {
  if (touchPoints.length === 1) {
    return firstTouchAttribution(touchPoints, conversionValue);
  }

  if (touchPoints.length === 2) {
    const first = touchPoints[0];
    const second = touchPoints[1];
    if (!first || !second) {
      return [];
    }
    return [
      {
        source: first.source,
        medium: first.medium,
        campaign: first.campaign,
        credit: conversionValue * 0.5,
        creditPercentage: 50,
      },
      {
        source: second.source,
        medium: second.medium,
        campaign: second.campaign,
        credit: conversionValue * 0.5,
        creditPercentage: 50,
      },
    ];
  }

  const attributionMap: Record<
    string,
    {
      source: string;
      medium: string;
      campaign?: string;
      credit: number;
      creditPercentage: number;
    }
  > = {};

  // First touch: 40%
  const first = touchPoints[0];
  if (!first) {
    return [];
  }
  const firstKey = `${first.source}_${first.medium}_${first.campaign || 'none'}`;
  attributionMap[firstKey] = {
    source: first.source,
    medium: first.medium,
    campaign: first.campaign,
    credit: conversionValue * 0.4,
    creditPercentage: 40,
  };

  // Last touch: 40%
  const last = touchPoints[touchPoints.length - 1];
  if (!last) {
    return [];
  }
  const lastKey = `${last.source}_${last.medium}_${last.campaign || 'none'}`;

  if (attributionMap[lastKey]) {
    attributionMap[lastKey].credit += conversionValue * 0.4;
    attributionMap[lastKey].creditPercentage += 40;
  } else {
    attributionMap[lastKey] = {
      source: last.source,
      medium: last.medium,
      campaign: last.campaign,
      credit: conversionValue * 0.4,
      creditPercentage: 40,
    };
  }

  // Middle touches: 20% split evenly
  const middlePoints = touchPoints.slice(1, -1);
  if (middlePoints.length > 0) {
    const creditPerMiddle = (conversionValue * 0.2) / middlePoints.length;
    const percentagePerMiddle = 20 / middlePoints.length;

    for (const point of middlePoints) {
      const key = `${point.source}_${point.medium}_${point.campaign || 'none'}`;

      if (attributionMap[key]) {
        attributionMap[key].credit += creditPerMiddle;
        attributionMap[key].creditPercentage += percentagePerMiddle;
      } else {
        attributionMap[key] = {
          source: point.source,
          medium: point.medium,
          campaign: point.campaign,
          credit: creditPerMiddle,
          creditPercentage: percentagePerMiddle,
        };
      }
    }
  }

  return Object.values(attributionMap);
}

/**
 * Compare attribution models
 */
export function compareAttributionModels(
  touchPoints: TouchPoint[],
  conversionValue: number
): Record<AttributionModel['model'], AttributionModel['attribution']> {
  const models: AttributionModel['model'][] = [
    'first_touch',
    'last_touch',
    'linear',
    'time_decay',
    'position_based',
  ];

  const comparison: Record<AttributionModel['model'], AttributionModel['attribution']> = {
    first_touch: [],
    last_touch: [],
    linear: [],
    time_decay: [],
    position_based: [],
  };

  for (const model of models) {
    comparison[model] = calculateAttribution(touchPoints, conversionValue, model);
  }

  return comparison;
}

/**
 * Get channel performance with attribution
 */
export function getChannelPerformance(
  conversions: Array<{
    touchPoints: TouchPoint[];
    value: number;
  }>,
  model: AttributionModel['model'] = 'linear'
): Array<{
  source: string;
  medium: string;
  attributedRevenue: number;
  conversions: number;
  averageValue: number;
}> {
  const channelMap: Record<
    string,
    {
      source: string;
      medium: string;
      attributedRevenue: number;
      conversions: number;
    }
  > = {};

  for (const conversion of conversions) {
    const attribution = calculateAttribution(
      conversion.touchPoints,
      conversion.value,
      model
    );

    for (const attr of attribution) {
      const key = `${attr.source}_${attr.medium}`;

      if (!channelMap[key]) {
        channelMap[key] = {
          source: attr.source,
          medium: attr.medium,
          attributedRevenue: 0,
          conversions: 0,
        };
      }

      channelMap[key].attributedRevenue += attr.credit;
      channelMap[key].conversions++;
    }
  }

  return Object.values(channelMap).map((channel) => ({
    ...channel,
    averageValue: channel.attributedRevenue / channel.conversions,
  }));
}
