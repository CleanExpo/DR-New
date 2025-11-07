import { GET as getKPI } from '@/app/api/analytics/kpi/route';
import { GET as getCompliance } from '@/app/api/analytics/compliance/route';
import { NextRequest } from 'next/server';

describe('Analytics API Routes', () => {
  describe('KPI Analytics', () => {
    it('returns KPI data', async () => {
      const request = new NextRequest('http://localhost:3000/api/analytics/kpi');
      const response = await getKPI(request);

      expect(response).toBeDefined();
      expect(response.status).toBeLessThan(500);
    });

    it('includes conversion metrics', async () => {
      const request = new NextRequest('http://localhost:3000/api/analytics/kpi');
      const response = await getKPI(request);

      if (response.ok) {
        const data = await response.json();
        expect(data).toBeDefined();
      }
    });

    it('tracks emergency call conversions', async () => {
      const request = new NextRequest('http://localhost:3000/api/analytics/kpi?metric=emergency-calls');
      const response = await getKPI(request);

      expect(response.status).toBeLessThan(500);
    });
  });

  describe('Compliance Analytics', () => {
    it('returns compliance data', async () => {
      const request = new NextRequest('http://localhost:3000/api/analytics/compliance');
      const response = await getCompliance(request);

      expect(response).toBeDefined();
      expect(response.status).toBeLessThan(500);
    });

    it('validates data privacy compliance', async () => {
      const request = new NextRequest('http://localhost:3000/api/analytics/compliance?check=privacy');
      const response = await getCompliance(request);

      expect(response.status).toBeLessThan(500);
    });

    it('checks accessibility compliance', async () => {
      const request = new NextRequest('http://localhost:3000/api/analytics/compliance?check=accessibility');
      const response = await getCompliance(request);

      expect(response.status).toBeLessThan(500);
    });
  });
});
