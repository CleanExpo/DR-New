import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Airtable CRM integration deployment test',
    timestamp: new Date().toISOString(),
    commit: 'a2bde3c3',
    features: [
      'Airtable API integration',
      'Lead capture forms',
      'AI Marketing Generator',
      'CRM Dashboard',
      'Marketing automation'
    ],
    environment: {
      hasAirtableToken: !!process.env.AIRTABLE_ACCESS_TOKEN,
      hasAirtableBase: !!process.env.AIRTABLE_BASE_ID
    }
  });
}