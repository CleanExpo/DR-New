import { NextRequest, NextResponse } from 'next/server';
import { securityLogger, SecurityEventType, SecuritySeverity } from '@/lib/security/security-logger';
import { getClientIp } from '@/lib/security/rate-limiter';

// CSP violation report interface
interface CSPReport {
  'csp-report': {
    'document-uri': string;
    'referrer'?: string;
    'violated-directive': string;
    'effective-directive': string;
    'original-policy': string;
    'disposition': string;
    'blocked-uri'?: string;
    'line-number'?: number;
    'column-number'?: number;
    'source-file'?: string;
    'status-code'?: number;
    'script-sample'?: string;
  };
}

// Store CSP violations (in production, use a proper logging service)
const violations: CSPReport[] = [];

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const contentType = request.headers.get('content-type');

    // CSP reports are sent as application/csp-report
    if (!contentType?.includes('application/csp-report') &&
        !contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    const report: CSPReport = await request.json();

    // Log the violation
    console.warn('CSP Violation:', {
      documentUri: report['csp-report']['document-uri'],
      violatedDirective: report['csp-report']['violated-directive'],
      blockedUri: report['csp-report']['blocked-uri'],
      sourceFile: report['csp-report']['source-file'],
      lineNumber: report['csp-report']['line-number']
    });

    // Log to security logger
    securityLogger.log({
      type: SecurityEventType.SUSPICIOUS_ACTIVITY,
      severity: SecuritySeverity.MEDIUM,
      ipAddress: clientIp,
      resource: report['csp-report']['document-uri'],
      details: {
        blockedUri: report['csp-report']['blocked-uri'],
        violatedDirective: report['csp-report']['violated-directive'],
        effectiveDirective: report['csp-report']['effective-directive'],
        sourceFile: report['csp-report']['source-file'],
        lineNumber: report['csp-report']['line-number'],
      },
      success: false,
    });

    // Store violation (limit to 100 to prevent memory issues)
    if (violations.length < 100) {
      violations.push(report);
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // await sendToMonitoringService(report);
    }

    // Return 204 No Content as per CSP reporting spec
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('CSP report processing error:', error);
    return new NextResponse(null, { status: 204 });
  }
}

// Get CSP violations (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Return recent violations
    return NextResponse.json({
      violations: violations.slice(-50), // Last 50 violations
      count: violations.length
    });
  } catch (error) {
    console.error(`Error in GET:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}