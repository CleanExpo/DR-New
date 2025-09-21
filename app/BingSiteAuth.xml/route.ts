import { NextResponse } from 'next/server';

export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
  <user>DB030D197A83DF2F524BF0DFBACDC52C</user>
</users>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}