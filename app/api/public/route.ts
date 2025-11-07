import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      message: "Site is public - no authentication required",
      authenticated: false,
      public: true
    });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    return NextResponse.json({
      message: "Site is public - no authentication required",
      authenticated: false,
      public: true
    });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}