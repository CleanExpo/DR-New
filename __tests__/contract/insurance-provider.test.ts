/**
 * Insurance Provider Contract Tests
 *
 * Verifies that our application can communicate correctly with
 * insurance provider APIs using Pact contract testing.
 */

import { Pact, Matchers } from '@pact-foundation/pact';
import path from 'path';
import { quoteRequestFactory } from '@/__tests__/factories';

const { like, eachLike, term } = Matchers;

describe('Insurance Provider API Contract', () => {
  let provider: Pact;

  // Setup Pact provider before all tests
  beforeAll(async () => {
    provider = new Pact({
      consumer: 'DisasterRecoveryBrisbane',
      provider: 'InsuranceProviderAPI',
      port: 9001,
      log: path.resolve(process.cwd(), 'pact', 'logs', 'insurance.log'),
      dir: path.resolve(process.cwd(), 'pact', 'pacts'),
      logLevel: 'info',
    });

    await provider.setup();
  });

  afterAll(async () => {
    await provider.finalize();
  });

  afterEach(async () => {
    await provider.verify();
  });

  describe('Claim Validation', () => {
    it('should validate a valid claim number', async () => {
      // Define the expected interaction
      await provider.addInteraction({
        state: 'claim ABC12345678 exists',
        uponReceiving: 'a request to validate claim number',
        withRequest: {
          method: 'POST',
          path: '/api/validate-claim',
          headers: {
            'Content-Type': 'application/json',
            Authorization: like('Bearer token123'),
          },
          body: {
            claimNumber: 'ABC12345678',
            policyHolder: like('John Smith'),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            valid: true,
            claimNumber: 'ABC12345678',
            status: like('active'),
            coverage: {
              waterDamage: true,
              fireDamage: true,
              mouldRemediation: true,
            },
            excess: like(500),
            provider: like('AAMI'),
          },
        },
      });

      // Make the actual request to the mock provider
      const response = await fetch('http://localhost:9001/api/validate-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        body: JSON.stringify({
          claimNumber: 'ABC12345678',
          policyHolder: 'John Smith',
        }),
      });

      const data = await response.json();

      // Verify the response matches expectations
      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
      expect(data.claimNumber).toBe('ABC12345678');
      expect(data.status).toBe('active');
      expect(data.coverage).toHaveProperty('waterDamage');
      expect(data.coverage).toHaveProperty('fireDamage');
      expect(data.coverage).toHaveProperty('mouldRemediation');
    });

    it('should reject an invalid claim number', async () => {
      await provider.addInteraction({
        state: 'claim does not exist',
        uponReceiving: 'a request to validate invalid claim',
        withRequest: {
          method: 'POST',
          path: '/api/validate-claim',
          headers: {
            'Content-Type': 'application/json',
            Authorization: like('Bearer token123'),
          },
          body: {
            claimNumber: 'INVALID123',
            policyHolder: like('Jane Doe'),
          },
        },
        willRespondWith: {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            valid: false,
            error: like('Claim not found'),
            claimNumber: 'INVALID123',
          },
        },
      });

      const response = await fetch('http://localhost:9001/api/validate-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        body: JSON.stringify({
          claimNumber: 'INVALID123',
          policyHolder: 'Jane Doe',
        }),
      });

      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.valid).toBe(false);
      expect(data.error).toBeDefined();
    });
  });

  describe('Coverage Inquiry', () => {
    it('should return coverage details for a policy', async () => {
      await provider.addInteraction({
        state: 'policy POL123456 exists',
        uponReceiving: 'a request for coverage details',
        withRequest: {
          method: 'GET',
          path: '/api/coverage',
          query: {
            policyNumber: 'POL123456',
          },
          headers: {
            Authorization: like('Bearer token123'),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            policyNumber: 'POL123456',
            coverage: {
              waterDamage: {
                covered: true,
                limit: like(100000),
                excess: like(500),
              },
              fireDamage: {
                covered: true,
                limit: like(150000),
                excess: like(1000),
              },
              stormDamage: {
                covered: true,
                limit: like(50000),
                excess: like(500),
              },
            },
            policyHolder: {
              name: like('John Smith'),
              address: like('123 Main St, Hamilton, QLD 4007'),
            },
          },
        },
      });

      const response = await fetch(
        'http://localhost:9001/api/coverage?policyNumber=POL123456',
        {
          headers: {
            Authorization: 'Bearer token123',
          },
        }
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.policyNumber).toBe('POL123456');
      expect(data.coverage.waterDamage.covered).toBe(true);
      expect(data.coverage.fireDamage.covered).toBe(true);
    });
  });

  describe('Claim Submission', () => {
    it('should submit a new claim successfully', async () => {
      const quoteRequest = quoteRequestFactory.createInsuranceClaim();

      await provider.addInteraction({
        state: 'user can submit claim',
        uponReceiving: 'a request to submit a new claim',
        withRequest: {
          method: 'POST',
          path: '/api/claims',
          headers: {
            'Content-Type': 'application/json',
            Authorization: like('Bearer token123'),
          },
          body: {
            policyNumber: like(quoteRequest.insuranceProvider),
            claimType: like('water-damage'),
            description: like(quoteRequest.description),
            estimatedCost: like(5000),
            propertyAddress: like(quoteRequest.suburb),
          },
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            claimNumber: term({
              matcher: '[A-Z]{3}[0-9]{8}',
              generate: 'CLM12345678',
            }),
            status: 'submitted',
            submittedAt: term({
              matcher: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}',
              generate: '2025-01-15T10:30:00',
            }),
            assessor: {
              name: like('Jane Assessor'),
              phone: like('1300 555 666'),
            },
          },
        },
      });

      const response = await fetch('http://localhost:9001/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        body: JSON.stringify({
          policyNumber: quoteRequest.insuranceProvider,
          claimType: 'water-damage',
          description: quoteRequest.description,
          estimatedCost: 5000,
          propertyAddress: quoteRequest.suburb,
        }),
      });

      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.claimNumber).toMatch(/^[A-Z]{3}[0-9]{8}$/);
      expect(data.status).toBe('submitted');
      expect(data.assessor).toHaveProperty('name');
      expect(data.assessor).toHaveProperty('phone');
    });
  });

  describe('Claim Status', () => {
    it('should retrieve claim status', async () => {
      await provider.addInteraction({
        state: 'claim CLM12345678 exists',
        uponReceiving: 'a request for claim status',
        withRequest: {
          method: 'GET',
          path: '/api/claims/CLM12345678',
          headers: {
            Authorization: like('Bearer token123'),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            claimNumber: 'CLM12345678',
            status: like('in-progress'),
            updates: eachLike({
              date: term({
                matcher: '[0-9]{4}-[0-9]{2}-[0-9]{2}',
                generate: '2025-01-15',
              }),
              status: like('under-review'),
              note: like('Assessor assigned'),
            }),
          },
        },
      });

      const response = await fetch('http://localhost:9001/api/claims/CLM12345678', {
        headers: {
          Authorization: 'Bearer token123',
        },
      });

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.claimNumber).toBe('CLM12345678');
      expect(data.status).toBeDefined();
      expect(Array.isArray(data.updates)).toBe(true);
    });
  });
});
