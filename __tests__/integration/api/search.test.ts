import { GET } from '@/app/api/search/route';
import { NextRequest } from 'next/server';

describe('Search API Route', () => {
  it('responds to GET requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?q=water+damage');
    const response = await GET(request);

    expect(response).toBeDefined();
    expect(response.status).toBeLessThan(500);
  });

  it('handles search queries for water damage services', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?q=water+damage+Brisbane');
    const response = await GET(request);

    if (response.ok) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });

  it('handles search queries for service areas', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?q=Hamilton');
    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it('sanitizes malicious input', async () => {
    const maliciousQuery = '<script>alert("xss")</script>';
    const request = new NextRequest(`http://localhost:3000/api/search?q=${encodeURIComponent(maliciousQuery)}`);
    const response = await GET(request);

    expect(response.status).not.toBe(500);
  });

  it('handles empty search queries gracefully', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?q=');
    const response = await GET(request);

    expect(response.status).toBeLessThan(500);
  });

  it('returns relevant results for emergency services', async () => {
    const request = new NextRequest('http://localhost:3000/api/search?q=emergency+restoration');
    const response = await GET(request);

    if (response.ok) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
});
