/**
 * Instant Quote API Endpoint
 *
 * Provides real-time pricing calculations
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculatePricing, type PricingInput } from '@/lib/services/pricing-engine';
import { generateJobEstimate } from '@/lib/services/job-estimator';
import { sendQuoteReadyEmail } from '@/lib/services/email-notification';
import { trackConversion } from '@/lib/services/conversion-tracking';

const QuoteRequestSchema = z.object({
  serviceType: z.enum(['water', 'fire', 'mould', 'storm', 'biohazard']),
  propertyType: z.enum(['residential', 'commercial']),
  propertySize: z.number().positive().optional(),
  affectedArea: z.number().positive(),
  damageSeverity: z.enum(['minor', 'moderate', 'severe', 'catastrophic']),
  urgencyLevel: z.enum(['critical', 'urgent', 'standard']),
  hasInsurance: z.boolean(),
  requiresAsbestos: z.boolean().optional(),
  requiresContainment: z.boolean().optional(),
  requiresDehumidification: z.boolean().optional(),
  requiresOdorRemoval: z.boolean().optional(),
  floors: z.number().int().positive().optional(),
  rooms: z.number().int().positive().optional(),
  contactEmail: z.string().email().optional(),
  contactName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = QuoteRequestSchema.parse(body);

    // Calculate pricing
    const pricing = calculatePricing(validatedData as PricingInput);

    // Generate detailed estimate
    const estimate = generateJobEstimate({
      serviceType: validatedData.serviceType,
      affectedArea: validatedData.affectedArea,
      severity: validatedData.damageSeverity,
      floors: validatedData.floors,
      requiresContainment: validatedData.requiresContainment,
      requiresAsbestos: validatedData.requiresAsbestos,
    });

    // If contact details provided, send quote via email
    if (validatedData.contactEmail && validatedData.contactName) {
      const quoteId = `QUOTE_${Date.now()}`;

      sendQuoteReadyEmail(validatedData.contactEmail, {
        quoteId,
        customerName: validatedData.contactName,
        serviceType: validatedData.serviceType.toUpperCase(),
        totalAmount: pricing.total,
        validUntil: pricing.validUntil.toLocaleDateString(),
      }).catch((error) => console.error('[API] Quote email error:', error));

      // Track conversion
      trackConversion({
        conversionType: 'quote_request',
        value: pricing.total,
        source: 'website',
        medium: 'organic',
        page: '/instant-quote',
        serviceType: validatedData.serviceType,
        leadQuality: pricing.total > 10000 ? 'high' : 'medium',
        urgencyLevel: validatedData.urgencyLevel === 'critical' ? 'emergency' : 'urgent',
        deviceType: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
      }).catch((error) => console.error('[API] Tracking error:', error));
    }

    return NextResponse.json({
      success: true,
      pricing: {
        subtotal: pricing.subtotal,
        gst: pricing.gst,
        total: pricing.total,
        estimatedDuration: pricing.estimatedDuration,
        validUntil: pricing.validUntil,
        breakdown: pricing.breakdown,
      },
      estimate: {
        materials: estimate.materials,
        labor: estimate.labor,
        equipment: estimate.equipment,
        timeline: estimate.timeline,
        totalCost: estimate.totalCost,
      },
      message: 'Quote generated successfully. This is an estimate and may vary based on final assessment.',
    });
  } catch (error) {
    console.error('[API] Quote generation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid quote request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Failed to generate quote',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get quick price range estimate
  const searchParams = request.nextUrl.searchParams;
  const serviceType = searchParams.get('serviceType');
  const severity = searchParams.get('severity');

  if (!serviceType || !severity) {
    return NextResponse.json(
      {
        error: 'MISSING_PARAMETERS',
        message: 'serviceType and severity parameters are required',
      },
      { status: 400 }
    );
  }

  try {
    const { generatePriceRange } = await import('@/lib/services/pricing-engine');

    const range = generatePriceRange(
      serviceType as PricingInput['serviceType'],
      severity as PricingInput['damageSeverity']
    );

    return NextResponse.json({
      success: true,
      serviceType,
      severity,
      priceRange: {
        min: range.min,
        typical: range.typical,
        max: range.max,
      },
      disclaimer: 'Actual cost may vary based on detailed assessment',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'CALCULATION_ERROR',
        message: 'Unable to generate price range',
      },
      { status: 500 }
    );
  }
}

// Route segment configuration
export const runtime = 'nodejs';
export const maxDuration = 15;
