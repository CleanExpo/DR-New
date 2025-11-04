import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'success',
    message: 'Basic API test working',
    timestamp: new Date().toISOString(),
    deployment: 'vercel'
  });
}