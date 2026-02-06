import { NextResponse } from 'next/server';
import { getNrpgCalloutSplit } from '@/lib/pricing/nrpg-callout';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pricing = getNrpgCalloutSplit();
    return NextResponse.json({
      success: true,
      pricing,
      currency: 'AUD',
    });
  } catch (error) {
    console.error('[API] Error fetching callout pricing:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch pricing information',
      },
      { status: 500 }
    );
  }
}
