/**
 * Admin Fraud Analysis API
 *
 * Phase D.1: AI-powered fraud detection for claims, bookings, payments
 * - POST: Analyse entity for fraud indicators
 * - GET: Get pending alerts, stats, or specific alert details
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  analyseFraud,
  analyseFraudBatch,
  getPendingAlerts,
  getAlert,
  updateAlertStatus,
  getFraudStats,
  EntityType,
  AlertStatus,
} from '@/lib/services/fraud-detection.service';

export const dynamic = 'force-dynamic';

interface AnalyseRequest {
  entityType: EntityType;
  entityId?: string;
  entityIds?: string[];
  options?: {
    depth?: 'quick' | 'thorough';
    concurrency?: number;
  };
}

interface UpdateAlertRequest {
  alertId: string;
  status: AlertStatus;
  reviewNotes?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorised - Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Check if this is an alert status update
    if (body.alertId && body.status) {
      const updateRequest = body as UpdateAlertRequest;

      const updatedAlert = updateAlertStatus(
        updateRequest.alertId,
        updateRequest.status,
        session.user.id,
        updateRequest.reviewNotes
      );

      if (!updatedAlert) {
        return NextResponse.json(
          { success: false, error: 'Alert not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        alert: {
          id: updatedAlert.id,
          entityType: updatedAlert.entityType,
          entityId: updatedAlert.entityId,
          alertType: updatedAlert.alertType,
          riskScore: updatedAlert.riskScore,
          status: updatedAlert.status,
          reviewedBy: updatedAlert.reviewedBy,
          reviewNotes: updatedAlert.reviewNotes,
          reviewedAt: updatedAlert.reviewedAt,
        },
      });
    }

    // Handle fraud analysis request
    const analyseRequest = body as AnalyseRequest;
    const { entityType, entityId, entityIds, options } = analyseRequest;

    // Validate entity type
    const validTypes: EntityType[] = ['CLAIM', 'BOOKING', 'PAYMENT', 'CONTRACTOR', 'CLIENT'];
    if (!validTypes.includes(entityType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid entityType. Must be one of: ${validTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate input
    if (!entityId && (!entityIds || entityIds.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'entityId or entityIds is required' },
        { status: 400 }
      );
    }

    // Handle single entity analysis
    if (entityId) {
      const result = await analyseFraud(entityType, entityId, options);

      return NextResponse.json({
        success: true,
        analysis: {
          entityType: result.entityType,
          entityId: result.entityId,
          overallRiskScore: result.overallRiskScore,
          riskLevel: result.riskLevel,
          recommendation: result.recommendation,
          indicatorCount: result.indicators.length,
          indicators: result.indicators.map((i) => ({
            type: i.type,
            confidence: i.confidence,
            description: i.description,
            suggestedAction: i.suggestedAction,
          })),
          similarEntities: result.similarEntities.slice(0, 5),
          reasoning: result.reasoning,
          analysedAt: result.analysedAt,
          processingTimeMs: result.processingTimeMs,
        },
      });
    }

    // Handle batch analysis
    if (entityIds && entityIds.length > 0) {
      // Limit batch size
      if (entityIds.length > 50) {
        return NextResponse.json(
          { success: false, error: 'Maximum batch size is 50 entities' },
          { status: 400 }
        );
      }

      const entities = entityIds.map((id) => ({ entityType, entityId: id }));
      const batchResult = await analyseFraudBatch(entities, options);

      return NextResponse.json({
        success: true,
        batch: {
          totalProcessed: batchResult.results.length,
          highRiskCount: batchResult.highRiskCount,
          processingTimeMs: batchResult.processingTimeMs,
        },
        results: batchResult.results.map((r) => ({
          entityId: r.entityId,
          riskScore: r.overallRiskScore,
          riskLevel: r.riskLevel,
          recommendation: r.recommendation,
          indicatorCount: r.indicators.length,
          topIndicators: r.indicators.slice(0, 3).map((i) => i.type),
        })),
        riskDistribution: {
          critical: batchResult.results.filter((r) => r.riskLevel === 'CRITICAL').length,
          high: batchResult.results.filter((r) => r.riskLevel === 'HIGH').length,
          medium: batchResult.results.filter((r) => r.riskLevel === 'MEDIUM').length,
          low: batchResult.results.filter((r) => r.riskLevel === 'LOW').length,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Fraud analysis API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Analysis failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorised - Admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'alerts';
    const alertId = searchParams.get('alertId');
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Get specific alert
    if (alertId) {
      const alert = getAlert(alertId);

      if (!alert) {
        return NextResponse.json({
          success: true,
          alertId,
          found: false,
          message: 'Alert not found',
        });
      }

      return NextResponse.json({
        success: true,
        alertId,
        found: true,
        alert: {
          id: alert.id,
          entityType: alert.entityType,
          entityId: alert.entityId,
          alertType: alert.alertType,
          riskScore: alert.riskScore,
          indicators: alert.indicators,
          status: alert.status,
          reviewedBy: alert.reviewedBy,
          reviewNotes: alert.reviewNotes,
          reviewedAt: alert.reviewedAt,
          createdAt: alert.createdAt,
        },
      });
    }

    // Get fraud statistics
    if (mode === 'stats') {
      const stats = getFraudStats();

      return NextResponse.json({
        success: true,
        mode: 'stats',
        stats: {
          totalAlerts: stats.totalAlerts,
          pendingAlerts: stats.pendingAlerts,
          confirmedAlerts: stats.confirmedAlerts,
          dismissedAlerts: stats.dismissedAlerts,
          averageRiskScore: Math.round(stats.averageRiskScore * 10) / 10,
          alertsByType: stats.alertsByType,
        },
      });
    }

    // Get pending alerts (default)
    const pendingAlerts = getPendingAlerts({ limit });

    return NextResponse.json({
      success: true,
      mode: 'alerts',
      alerts: pendingAlerts.map((a) => ({
        id: a.id,
        entityType: a.entityType,
        entityId: a.entityId,
        alertType: a.alertType,
        riskScore: a.riskScore,
        indicatorCount: a.indicators.length,
        status: a.status,
        createdAt: a.createdAt,
      })),
      total: pendingAlerts.length,
    });
  } catch (error) {
    console.error('Fraud analysis GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get fraud data',
      },
      { status: 500 }
    );
  }
}
