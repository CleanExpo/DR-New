import { NextResponse } from 'next/server';
import { perplexityAPI, checkPerplexityConnection } from '../../../../src/lib/perplexity-api';

export async function GET() {
  try {
    // Check if API is configured
    const isConfigured = perplexityAPI.isConfigured();

    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        message: 'Perplexity API key not configured. Please add PERPLEXITY_API_KEY to your .env file',
        configured: false
      }, { status: 400 });
    }

    // Test connection with a simple search
    const testQuery = 'What are the latest trends in disaster recovery services in Australia?';
    const result = await perplexityAPI.search(testQuery);

    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Perplexity API connected successfully',
        configured: true,
        testData: {
          query: testQuery,
          preview: result.substring(0, 200) + '...',
          length: result.length
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Perplexity API configured but unable to fetch data. Check your API key and permissions.',
        configured: true
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Perplexity API test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error testing Perplexity API connection'
    }, { status: 500 });
  }
}