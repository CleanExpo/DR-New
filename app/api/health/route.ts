import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      airtable_configured: {
        token: !!process.env.AIRTABLE_ACCESS_TOKEN,
        base_id: !!process.env.AIRTABLE_BASE_ID
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: 'Health check failed'
    }, { status: 500 });
  }
}