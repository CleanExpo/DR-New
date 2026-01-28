/**
 * Admin Dispute Prediction API
 *
 * Phase C.3: Predictive dispute prevention for proactive risk management
 * - POST: Predict dispute risk for booking(s)
 * - GET: Get at-risk bookings and prediction history
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import {
  predictDisputeRisk,
  predictDisputeRiskBatch,
  getAtRiskBookings,
  DisputePrediction,
} from '@/lib/services/dispute-prediction.service';

export const dynamic = 'force-dynamic';

interface PredictRequest {
  bookingId?: string;
  bookingIds?: string[];
  options?: {
    concurrency?: number;
  };
}

// In-memory cache for prediction history (in production, use Redis or database)
const predictionHistory = new Map<
  string,
  {
    bookingId: string;
    prediction: DisputePrediction;
    createdAt: Date;
  }
>();

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const body: PredictRequest = await request.json();
    const { bookingId, bookingIds, options } = body;

    // Validate input
    if (!bookingId && (!bookingIds || bookingIds.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'bookingId or bookingIds is required' },
        { status: 400 }
      );
    }

    // Handle single booking prediction
    if (bookingId) {
      const prediction = await predictDisputeRisk(bookingId);

      // Store in history
      predictionHistory.set(bookingId, {
        bookingId,
        prediction,
        createdAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        prediction: {
          bookingId: prediction.bookingId,
          riskScore: prediction.riskScore,
          riskLevel: prediction.riskLevel,
          confidence: prediction.confidence,
          riskBreakdown: prediction.riskBreakdown,
          primaryRiskFactors: prediction.primaryRiskFactors,
          interventions: prediction.interventions,
          qualityChecksRequired: prediction.qualityChecksRequired,
          reasoning: prediction.reasoning,
          predictedAt: prediction.predictedAt,
          processingTimeMs: prediction.processingTimeMs,
        },
      });
    }

    // Handle batch prediction
    if (bookingIds && bookingIds.length > 0) {
      // Limit batch size
      if (bookingIds.length > 50) {
        return NextResponse.json(
          { success: false, error: 'Maximum batch size is 50 bookings' },
          { status: 400 }
        );
      }

      const batchResult = await predictDisputeRiskBatch(bookingIds, options);

      // Store all predictions in history
      batchResult.predictions.forEach((prediction) => {
        predictionHistory.set(prediction.bookingId, {
          bookingId: prediction.bookingId,
          prediction,
          createdAt: new Date(),
        });
      });

      return NextResponse.json({
        success: true,
        batch: {
          totalProcessed: batchResult.predictions.length,
          highRiskCount: batchResult.highRiskCount,
          averageRiskScore: batchResult.averageRiskScore,
          processingTimeMs: batchResult.processingTimeMs,
        },
        predictions: batchResult.predictions.map((p) => ({
          bookingId: p.bookingId,
          riskScore: p.riskScore,
          riskLevel: p.riskLevel,
          primaryRiskFactors: p.primaryRiskFactors.slice(0, 3),
        })),
        riskDistribution: {
          critical: batchResult.predictions.filter((p) => p.riskLevel === 'CRITICAL')
            .length,
          high: batchResult.predictions.filter((p) => p.riskLevel === 'HIGH').length,
          medium: batchResult.predictions.filter((p) => p.riskLevel === 'MEDIUM')
            .length,
          low: batchResult.predictions.filter((p) => p.riskLevel === 'LOW').length,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Dispute prediction API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Prediction failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const mode = searchParams.get('mode') || 'history';
    const minRiskScore = parseInt(searchParams.get('minRisk') || '50', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Get prediction for a specific booking
    if (bookingId) {
      const cached = predictionHistory.get(bookingId);

      if (!cached) {
        // Generate new prediction if not cached
        try {
          const prediction = await predictDisputeRisk(bookingId);

          predictionHistory.set(bookingId, {
            bookingId,
            prediction,
            createdAt: new Date(),
          });

          return NextResponse.json({
            success: true,
            bookingId,
            cached: false,
            prediction: {
              riskScore: prediction.riskScore,
              riskLevel: prediction.riskLevel,
              confidence: prediction.confidence,
              riskBreakdown: prediction.riskBreakdown,
              primaryRiskFactors: prediction.primaryRiskFactors,
              interventions: prediction.interventions,
              qualityChecksRequired: prediction.qualityChecksRequired,
              reasoning: prediction.reasoning,
              predictedAt: prediction.predictedAt,
            },
          });
        } catch (err) {
          return NextResponse.json({
            success: true,
            bookingId,
            hasPrediction: false,
            message: 'No prediction available for this booking',
            error: err instanceof Error ? err.message : 'Prediction failed',
          });
        }
      }

      return NextResponse.json({
        success: true,
        bookingId,
        cached: true,
        cachedAt: cached.createdAt,
        prediction: {
          riskScore: cached.prediction.riskScore,
          riskLevel: cached.prediction.riskLevel,
          confidence: cached.prediction.confidence,
          riskBreakdown: cached.prediction.riskBreakdown,
          primaryRiskFactors: cached.prediction.primaryRiskFactors,
          interventions: cached.prediction.interventions,
          qualityChecksRequired: cached.prediction.qualityChecksRequired,
          reasoning: cached.prediction.reasoning,
          predictedAt: cached.prediction.predictedAt,
        },
      });
    }

    // Get at-risk bookings
    if (mode === 'at-risk') {
      const atRiskResult = await getAtRiskBookings({
        minRiskScore,
        status: ['IN_PROGRESS', 'CONFIRMED'],
        limit,
      });

      return NextResponse.json({
        success: true,
        mode: 'at-risk',
        minRiskScore,
        bookings: atRiskResult.bookings,
        total: atRiskResult.totalCount,
        summary: {
          criticalCount: atRiskResult.bookings.filter(
            (b) => b.riskLevel === 'CRITICAL'
          ).length,
          highCount: atRiskResult.bookings.filter((b) => b.riskLevel === 'HIGH')
            .length,
          averageRiskScore:
            atRiskResult.bookings.length > 0
              ? Math.round(
                  (atRiskResult.bookings.reduce((sum, b) => sum + b.riskScore, 0) /
                    atRiskResult.bookings.length) *
                    10
                ) / 10
              : 0,
        },
      });
    }

    // Get prediction history (default mode)
    const recentHistory = Array.from(predictionHistory.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);

    // Group by risk level
    const byRiskLevel = recentHistory.reduce(
      (acc, entry) => {
        const level = entry.prediction.riskLevel;
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      success: true,
      mode: 'history',
      history: recentHistory.map((entry) => ({
        bookingId: entry.bookingId,
        riskScore: entry.prediction.riskScore,
        riskLevel: entry.prediction.riskLevel,
        primaryRiskFactors: entry.prediction.primaryRiskFactors.slice(0, 3),
        interventionCount: entry.prediction.interventions.length,
        predictedAt: entry.prediction.predictedAt,
        cachedAt: entry.createdAt,
      })),
      total: predictionHistory.size,
      distribution: {
        critical: byRiskLevel['CRITICAL'] || 0,
        high: byRiskLevel['HIGH'] || 0,
        medium: byRiskLevel['MEDIUM'] || 0,
        low: byRiskLevel['LOW'] || 0,
      },
    });
  } catch (error) {
    console.error('Dispute prediction GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get prediction data',
      },
      { status: 500 }
    );
  }
}
