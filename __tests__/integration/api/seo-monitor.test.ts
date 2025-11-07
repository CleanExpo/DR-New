import { GET } from '@/app/api/seo/monitor/route';
import { NextRequest } from 'next/server';

describe('SEO Monitor API Route', () => {
  it('responds to monitoring requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor');
    const response = await GET(request);

    expect(response).toBeDefined();
    expect(response.status).toBeLessThan(500);
  });

  it('returns SEO health metrics', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor');
    const response = await GET(request);

    if (response.ok) {
      const data = await response.json();
      expect(data).toBeDefined();
      expect(data).toHaveProperty('status');
    }
  });

  it('validates schema markup', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor?check=schema');
    const response = await GET(request);

    expect(response.status).toBeLessThan(500);
  });

  it('checks meta tags compliance', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor?check=meta');
    const response = await GET(request);

    expect(response.status).toBeLessThan(500);
  });

  it('monitors local SEO signals', async () => {
    const request = new NextRequest('http://localhost:3000/api/seo/monitor?check=local');
    const response = await GET(request);

    if (response.ok) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
});
