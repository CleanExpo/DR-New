import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Site is public - no authentication required",
    authenticated: false,
    public: true
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Site is public - no authentication required",
    authenticated: false,
    public: true
  });
}