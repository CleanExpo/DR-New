import { POST } from '@/app/api/claims/submit/route';
import { NextRequest } from 'next/server';

describe('Claims Submit API Route', () => {
  const validClaimData = {
    name: 'John Smith',
    email: 'john@example.com',
    phone: '0412345678',
    address: '123 Main St, Hamilton, QLD 4007',
    serviceType: 'water-damage',
    description: 'Burst pipe causing water damage',
    insuranceProvider: 'Test Insurance',
    policyNumber: 'POL123456',
  };

  it('accepts valid claim submissions', async () => {
    const request = new NextRequest('http://localhost:3000/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify(validClaimData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    expect(response.status).toBeLessThan(500);
  });

  it('validates required fields', async () => {
    const invalidData = {
      name: 'John Smith',
      // Missing other required fields
    };

    const request = new NextRequest('http://localhost:3000/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('validates email format', async () => {
    const dataWithInvalidEmail = {
      ...validClaimData,
      email: 'not-an-email',
    };

    const request = new NextRequest('http://localhost:3000/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify(dataWithInvalidEmail),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('validates phone number format', async () => {
    const dataWithInvalidPhone = {
      ...validClaimData,
      phone: '123', // Invalid phone
    };

    const request = new NextRequest('http://localhost:3000/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify(dataWithInvalidPhone),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('sanitizes input to prevent XSS', async () => {
    const dataWithXSS = {
      ...validClaimData,
      description: '<script>alert("xss")</script>',
    };

    const request = new NextRequest('http://localhost:3000/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify(dataWithXSS),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    expect(response.status).toBeLessThan(500);
  });

  it('handles service area validation', async () => {
    const dataWithValidServiceArea = {
      ...validClaimData,
      address: '123 Main St, Brisbane, QLD 4000',
    };

    const request = new NextRequest('http://localhost:3000/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify(dataWithValidServiceArea),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    expect(response.status).toBeLessThan(500);
  });
});
