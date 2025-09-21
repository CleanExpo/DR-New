import { NextResponse } from 'next/server';

export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
  <user>F73BE1B1E698FD592FE2EA8D27992837</user>
</users>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}