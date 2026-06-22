/**
 * Xero Financial Summary
 *
 * GET /api/xero/financials
 * Returns P&L summary and cash flow data from Xero.
 *
 * Required: ADMIN role
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getXeroClient, loadXeroTokens } from '@/lib/xero/client';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const xeroTenantId = await loadXeroTokens();
    if (!xeroTenantId) {
      return NextResponse.json(
        { error: 'Xero not connected', connected: false },
        { status: 401 }
      );
    }

    const xero = getXeroClient();

    // Fetch Profit & Loss report
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const fromDate = startOfMonth.toISOString().split('T')[0];
    const toDate = now.toISOString().split('T')[0];

    let profitAndLoss: { totalIncome: number; totalExpenses: number; netProfit: number; period: { from: string; to: string } } | null = null;
    try {
      const plResponse = await xero.accountingApi.getReportProfitAndLoss(
        xeroTenantId,
        fromDate,
        toDate,
        undefined, // periods
        undefined, // timeframe
        undefined, // trackingCategoryID
        undefined, // trackingCategoryID2
        undefined, // trackingOptionID
        undefined, // trackingOptionID2
        undefined, // standardLayout
      );

      const report = plResponse.body.reports?.[0];
      if (report?.rows) {
        const incomeRow = report.rows.find((r: any) => r.rowType === 'Section' && r.title === 'Income');
        const expenseRow = report.rows.find((r: any) => r.rowType === 'Section' && r.title === 'Expenses');
        const netProfitRow = report.rows.find((r: any) => r.rowType === 'Section' && r.title === 'Net Profit');

        const extractTotal = (section: any): number => {
          if (!section?.rows) return 0;
          const summaryRow = section.rows.find((r: any) => r.rowType === 'SummaryRow');
          return summaryRow?.cells?.[1]?.value ? parseFloat(summaryRow.cells[1].value) : 0;
        };

        profitAndLoss = {
          totalIncome: extractTotal(incomeRow),
          totalExpenses: extractTotal(expenseRow),
          netProfit: extractTotal(netProfitRow),
          period: { from: fromDate, to: toDate },
        };
      }
    } catch (plErr) {
      console.error('Failed to fetch Xero P&L:', plErr);
    }

    // Fetch bank account balances for cash flow indication
    let cashFlow: { bankAccounts: { name: any; code: any; type: any }[]; totalBankBalance: number } | null = null;
    try {
      const accountsResponse = await xero.accountingApi.getAccounts(
        xeroTenantId,
        undefined, // modifiedAfter
        'Type=="BANK"', // where
      );

      const bankAccounts = accountsResponse.body.accounts || [];
      const totalCash = bankAccounts.reduce(
        (sum: number, acc: any) => sum + (acc.bankAccountType ? 0 : 0),
        0
      );

      // Get bank summary report for actual balances
      const balanceSheet = await xero.accountingApi.getReportBalanceSheet(
        xeroTenantId,
        toDate,
      );

      let bankBalance = 0;
      const bsReport = balanceSheet.body.reports?.[0];
      if (bsReport?.rows) {
        const assetsSection = bsReport.rows.find(
          (r: any) => r.rowType === 'Section' && r.title === 'Assets'
        );
        if ((assetsSection as any)?.rows) {
          const bankRow = (assetsSection as any).rows.find(
            (r: any) => r.rowType === 'Section' && r.title === 'Bank'
          );
          if ((bankRow as any)?.rows) {
            const summaryRow = (bankRow as any).rows.find((r: any) => r.rowType === 'SummaryRow');
            bankBalance = summaryRow?.cells?.[1]?.value
              ? parseFloat(summaryRow.cells[1].value)
              : 0;
          }
        }
      }

      cashFlow = {
        bankAccounts: bankAccounts.map((acc: any) => ({
          name: acc.name,
          code: acc.code,
          type: acc.bankAccountType,
        })),
        totalBankBalance: bankBalance,
      };
    } catch (cfErr) {
      console.error('Failed to fetch Xero cash flow:', cfErr);
    }

    return NextResponse.json({
      success: true,
      connected: true,
      profitAndLoss,
      cashFlow,
      generatedAt: now.toISOString(),
    });
  } catch (error) {
    console.error('Xero financials error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch Xero financial data' },
      { status: 500 }
    );
  }
}
