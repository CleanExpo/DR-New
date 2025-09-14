import { NextRequest, NextResponse } from 'next/server';

// IndexNow API endpoint for instant search engine notification
// Supports Bing, Yandex, Seznam, and IndexNow-compatible engines

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'your-indexnow-key-here';
const INDEXNOW_HOST = 'https://disaster-recovery-seven.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs array required' },
        { status: 400 }
      );
    }

    // Submit to IndexNow API
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });

    if (!response.ok) {
      throw new Error(`IndexNow API error: ${response.status}`);
    }

    // Also submit to Bing directly
    const bingResponse = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });

    return NextResponse.json({
      success: true,
      message: 'URLs submitted to IndexNow',
      indexNowStatus: response.status,
      bingStatus: bingResponse.status,
      urlsSubmitted: urls.length
    });

  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URLs to IndexNow' },
      { status: 500 }
    );
  }
}

// GET endpoint to verify IndexNow setup
export async function GET() {
  return NextResponse.json({
    status: 'IndexNow API endpoint active',
    host: INDEXNOW_HOST,
    keyConfigured: !!INDEXNOW_KEY,
    supportedEngines: ['Bing', 'Yandex', 'Seznam', 'IndexNow.org']
  });
}