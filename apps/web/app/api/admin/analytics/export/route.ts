/**
 * POST /api/admin/analytics/export
 * Export analytics data in various formats
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb, TenantPrismaClient } from '@/lib/get-tenant-db';
import {
  generateCSVExport,
  generateExcelExport,
  formatCurrency,
  formatDate,
  formatPercentage,
} from '@/lib/analytics/export-generator';

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { format = 'csv', reportType = 'financial', startDate, endDate } = body;

    const start = startDate ? new Date(startDate) : new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const end = endDate ? new Date(endDate) : new Date();

    let exportData: any[] = [];
    let filename = '';

    switch (reportType) {
      case 'financial':
        exportData = await generateFinancialExport(db, start, end);
        filename = `financial-report-${start.toISOString().slice(0, 10)}-to-${end.toISOString().slice(0, 10)}`;
        break;

      case 'operational':
        exportData = await generateOperationalExport(db, start, end);
        filename = `operational-report-${start.toISOString().slice(0, 10)}-to-${end.toISOString().slice(0, 10)}`;
        break;

      case 'revenue':
        exportData = await generateRevenueExport(db, start, end);
        filename = `revenue-report-${start.toISOString().slice(0, 10)}-to-${end.toISOString().slice(0, 10)}`;
        break;

      case 'contractors':
        exportData = await generateContractorExport(db, start, end);
        filename = `contractor-report-${start.toISOString().slice(0, 10)}-to-${end.toISOString().slice(0, 10)}`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        );
    }

    let content = '';
    let mimeType = 'text/csv';
    const fileExtension = format === 'csv' ? 'csv' : format === 'excel' ? 'xlsx' : 'pdf';

    if (format === 'csv') {
      content = generateCSVExport(exportData, { format: 'csv', filename, includeTimestamp: false });
      mimeType = 'text/csv';
    } else if (format === 'excel') {
      content = generateExcelExport(exportData, { format: 'excel', filename, includeTimestamp: false });
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (format === 'pdf') {
      // For PDF, return JSON that client will handle
      return NextResponse.json({
        success: true,
        format: 'pdf',
        filename: `${filename}.pdf`,
        data: exportData,
        message: 'PDF export ready - download via client',
      });
    }

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}.${fileExtension}"`,
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error exporting data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to export analytics data',
        details: message,
      },
      { status: 500 }
    );
  }
}

async function generateFinancialExport(db: TenantPrismaClient, start: Date, end: Date): Promise<any[]> {
  const payments = await db.payment.findMany({
    where: {
      status: 'COMPLETED',
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
  const platformFees = totalRevenue * 0.2;
  const contractorPayouts = totalRevenue * 0.8;

  return [
    {
      'Report Type': 'Financial Summary',
      'Period': `${formatDate(start)} to ${formatDate(end)}`,
      'Total Revenue': formatCurrency(totalRevenue),
      'Platform Fees': formatCurrency(platformFees),
      'Contractor Payouts': formatCurrency(contractorPayouts),
      'Transaction Count': payments.length,
      'Success Rate': formatPercentage(100),
      'Generated': formatDate(new Date()),
    },
  ];
}

async function generateOperationalExport(db: TenantPrismaClient, start: Date, end: Date): Promise<any[]> {
  const bookings = await db.booking.findMany({
    where: {
      completedAt: {
        gte: start,
        lte: end,
      },
    },
  });

  const serviceRequests = await db.serviceRequest.count({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  return [
    {
      'Report Type': 'Operational Summary',
      'Period': `${formatDate(start)} to ${formatDate(end)}`,
      'Jobs Completed': bookings.length,
      'Service Requests': serviceRequests,
      'Completion Rate': formatPercentage((bookings.length / (serviceRequests || 1)) * 100),
      'Generated': formatDate(new Date()),
    },
  ];
}

async function generateRevenueExport(db: TenantPrismaClient, start: Date, end: Date): Promise<any[]> {
  const byServiceType = await db.booking.groupBy({
    by: ['australianServiceType'],
    _sum: {
      finalCostAUD: true,
    },
    _count: true,
    where: {
      completedAt: {
        gte: start,
        lte: end,
      },
    },
  });

  return byServiceType.map((item) => ({
    'Service Type': item.australianServiceType,
    'Revenue': formatCurrency(Number(item._sum.finalCostAUD || 0)),
    'Jobs Count': item._count,
    'Avg Job Value': formatCurrency(Number(item._sum.finalCostAUD || 0) / item._count),
  }));
}

async function generateContractorExport(db: TenantPrismaClient, start: Date, end: Date): Promise<any[]> {
  const contractors = await db.contractor.findMany({
    where: {
      isVerified: true,
    },
    select: {
      id: true,
      businessName: true,
      _count: {
        select: {
          bookings: {
            where: {
              completedAt: {
                gte: start,
                lte: end,
              },
            },
          },
        },
      },
    },
  });

  return contractors
    .filter((c) => c._count.bookings > 0)
    .map((c) => ({
      'Contractor': c.businessName,
      'Jobs Completed': c._count.bookings,
      'ID': c.id,
    }))
    .sort((a, b) => b['Jobs Completed'] - a['Jobs Completed'])
    .slice(0, 50);
}
