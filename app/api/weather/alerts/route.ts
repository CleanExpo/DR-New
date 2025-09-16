// Weather Alerts API for Brisbane area
import { NextRequest, NextResponse } from 'next/server';

interface WeatherAlert {
  id: string;
  type: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  title: string;
  description: string;
  areas: string[];
  startTime: string;
  endTime?: string;
  recommendations: string[];
}

// Mock weather data - In production, integrate with BOM (Bureau of Meteorology) API
const mockAlerts: WeatherAlert[] = [
  {
    id: 'alert_001',
    type: 'severe_storm',
    severity: 'severe',
    title: 'Severe Storm Warning',
    description: 'Severe thunderstorms with damaging winds and heavy rainfall expected',
    areas: ['Brisbane', 'Ipswich', 'Logan'],
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    recommendations: [
      'Secure loose outdoor items',
      'Move vehicles under cover',
      'Stay indoors during the storm',
      'Keep emergency kit ready'
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'Brisbane';
    const severity = searchParams.get('severity');

    // Filter alerts based on location and severity
    let alerts = mockAlerts.filter(alert =>
      alert.areas.some(area =>
        area.toLowerCase().includes(location.toLowerCase())
      )
    );

    if (severity) {
      alerts = alerts.filter(alert => alert.severity === severity);
    }

    // In production, fetch from Bureau of Meteorology API
    // const response = await fetch(`http://www.bom.gov.au/warnings/qld/${location}`);

    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Weather alerts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather alerts' },
      { status: 500 }
    );
  }
}