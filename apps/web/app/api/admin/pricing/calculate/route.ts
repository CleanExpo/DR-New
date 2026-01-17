/**
 * Admin Dynamic Pricing API
 *
 * Phase D.2: AI-powered pricing calculations
 * - POST: Calculate dynamic price or optimise contractor bid
 * - GET: Get market rate analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  calculatePrice,
  optimiseContractorBid,
  getMarketRateAnalysis,
  PricingRequest,
} from '@/lib/services/dynamic-pricing.service';

export const dynamic = 'force-dynamic';

interface PricingApiRequest extends PricingRequest {
  mode?: 'calculate' | 'optimise-bid';
  contractorId?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (allow both admin and contractors)
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const body: PricingApiRequest = await request.json();
    const { mode = 'calculate', contractorId, ...pricingRequest } = body;

    // Validate required fields
    if (!pricingRequest.serviceType) {
      return NextResponse.json(
        { success: false, error: 'serviceType is required' },
        { status: 400 }
      );
    }

    if (!pricingRequest.location?.state) {
      return NextResponse.json(
        { success: false, error: 'location.state is required' },
        { status: 400 }
      );
    }

    // Handle bid optimization (contractors only)
    if (mode === 'optimise-bid') {
      if (!contractorId) {
        return NextResponse.json(
          { success: false, error: 'contractorId is required for bid optimization' },
          { status: 400 }
        );
      }

      // Verify contractor access
      if (
        session.user.userType !== 'ADMIN' &&
        session.user.userType !== 'CONTRACTOR'
      ) {
        return NextResponse.json(
          { success: false, error: 'Unauthorised - Contractor or Admin access required' },
          { status: 403 }
        );
      }

      const bidOptimization = await optimiseContractorBid(contractorId, {
        serviceType: pricingRequest.serviceType,
        location: pricingRequest.location,
        urgency: pricingRequest.urgency || 'STANDARD',
        estimatedSize: pricingRequest.estimatedSize,
        jobComplexity: pricingRequest.jobComplexity,
        clientId: pricingRequest.clientId,
        scheduledDate: pricingRequest.scheduledDate
          ? new Date(pricingRequest.scheduledDate)
          : undefined,
      });

      return NextResponse.json({
        success: true,
        mode: 'optimise-bid',
        optimization: {
          contractorId: bidOptimization.contractorId,
          suggestedBid: bidOptimization.suggestedBid,
          bidRange: bidOptimization.bidRange,
          winProbability: Math.round(bidOptimization.winProbability * 100),
          profitEstimate: bidOptimization.profitEstimate,
          competitivePosition: bidOptimization.competitivePosition,
          recommendations: bidOptimization.recommendations,
        },
        currency: 'AUD',
      });
    }

    // Handle standard price calculation
    const result = await calculatePrice({
      serviceType: pricingRequest.serviceType,
      location: pricingRequest.location,
      urgency: pricingRequest.urgency || 'STANDARD',
      estimatedSize: pricingRequest.estimatedSize,
      jobComplexity: pricingRequest.jobComplexity,
      clientId: pricingRequest.clientId,
      contractorId: pricingRequest.contractorId,
      insuranceProvider: pricingRequest.insuranceProvider,
      scheduledDate: pricingRequest.scheduledDate
        ? new Date(pricingRequest.scheduledDate)
        : undefined,
    });

    return NextResponse.json({
      success: true,
      mode: 'calculate',
      pricing: {
        basePrice: result.basePrice,
        adjustedPrice: result.adjustedPrice,
        priceRange: result.priceRange,
        breakdown: result.breakdown,
        confidence: Math.round(result.confidence * 100),
        recommendations: result.recommendations,
        reasoning: result.reasoning,
      },
      factors: {
        localDemand: result.factors.localDemand,
        clientTier: result.factors.clientTier,
        marketRate: result.factors.marketRate,
        surgeMultiplier: result.factors.surgeMultiplier,
        seasonalDemand: result.factors.seasonalDemand,
      },
      currency: 'AUD',
      calculatedAt: result.calculatedAt,
      processingTimeMs: result.processingTimeMs,
    });
  } catch (error) {
    console.error('Pricing API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Pricing calculation failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get('serviceType');
    const state = searchParams.get('state');
    const postcode = searchParams.get('postcode');

    // Validate required fields
    if (!serviceType) {
      return NextResponse.json(
        { success: false, error: 'serviceType query parameter is required' },
        { status: 400 }
      );
    }

    if (!state) {
      return NextResponse.json(
        { success: false, error: 'state query parameter is required' },
        { status: 400 }
      );
    }

    // Get market rate analysis
    const analysis = await getMarketRateAnalysis(serviceType, {
      state,
      postcode: postcode || undefined,
    });

    return NextResponse.json({
      success: true,
      serviceType,
      location: { state, postcode },
      marketAnalysis: {
        averageRate: analysis.averageRate,
        medianRate: analysis.medianRate,
        range: analysis.range,
        recentTrend: analysis.recentTrend,
        sampleSize: analysis.sampleSize,
        confidence:
          analysis.sampleSize >= 20
            ? 'HIGH'
            : analysis.sampleSize >= 5
              ? 'MEDIUM'
              : 'LOW',
      },
      currency: 'AUD',
      analysedAt: analysis.analysedAt,
    });
  } catch (error) {
    console.error('Pricing GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get market data',
      },
      { status: 500 }
    );
  }
}
