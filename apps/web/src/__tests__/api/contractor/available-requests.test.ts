/**
 * @jest-environment node
 *
 * Positive-control (cross-tenant BOLA) test for
 * GET /api/contractor/available-requests
 *
 * Proves a contractor authenticated in tenant A never receives another
 * tenant's ServiceRequest rows. Reproduces the leak: the route filtered
 * available requests by STATUS only, with no tenant predicate, because
 * ServiceRequest is absent from the scoped-client TENANT_MODELS set.
 *
 * The fake tenant-scoped db below faithfully replicates Prisma `findMany`
 * `where` semantics (honours whatever `tenantId` / `status.in` the route
 * passes), so the only variable under test is what the route asks for.
 *
 * auth-middleware and get-tenant-db are mocked so the real Prisma import
 * chain never loads (this suite exercises only the route's query shaping).
 * Mock state is `mock`-prefixed and read lazily so the jest hoist accepts it.
 */

import { describe, it, expect, beforeEach, beforeAll, jest } from '@jest/globals';

const MOCK_TENANT_A = 'tenant-a';
const MOCK_TENANT_B = 'tenant-b';

// Two tenants' service requests living in one table.
const mockRows = [
  {
    id: 'req-A',
    tenantId: MOCK_TENANT_A,
    userId: 'user-a',
    serviceCategory: 'WATER_DAMAGE',
    serviceTitle: 'Burst pipe in kitchen',
    description: 'Tenant A private description',
    urgency: 'High',
    location: 'Sydney 2000',
    budget: '$5,000',
    insurance: true,
    urgentResponse: false,
    status: 'PENDING',
    leadScore: 90,
    createdAt: new Date('2026-07-01T00:00:00Z'),
    user: { name: 'Client A', email: 'clienta@example.com' },
  },
  {
    id: 'req-B',
    tenantId: MOCK_TENANT_B,
    userId: 'user-b',
    serviceCategory: 'MOULD_REMEDIATION',
    serviceTitle: 'Mould in bathroom',
    description: 'Tenant B CONFIDENTIAL description',
    urgency: 'Emergency',
    location: 'Melbourne 3000',
    budget: '$12,000',
    insurance: true,
    urgentResponse: true,
    status: 'PENDING',
    leadScore: 99,
    createdAt: new Date('2026-07-02T00:00:00Z'),
    user: { name: 'Client B', email: 'clientb@example.com' },
  },
];

// Two distinct tenant sources, mutated per test and read lazily by the auth mock:
//  - mockUserTenantId    = the SERVER-TRUSTED user record's own tenant (user.tenantId)
//  - mockContextTenantId = context.tenantId, which the real auth middleware derives
//    from the client-supplied `x-tenant-id` header when the user has no own tenant.
// The route must resolve from mockUserTenantId ONLY; mockContextTenantId models the
// attacker-controllable header value and must never grant access.
let mockUserTenantId: string | null = MOCK_TENANT_A;
let mockContextTenantId: string | null = MOCK_TENANT_A;

const mockDb = {
  contractorProfile: {
    findUnique: jest.fn(async () => ({
      id: 'cp-1',
      businessName: 'Test Restoration Co',
      rating: 4.8,
      totalJobs: 12,
    })),
  },
  contractor: {
    findUnique: jest.fn(async () => ({ primaryPostcode: '2000' })),
  },
  serviceRequest: {
    // Faithful Prisma-like filter: applies tenantId + status.in from `where`.
    findMany: jest.fn(async ({ where }: any) => {
      return mockRows.filter((r) => {
        if (
          Object.prototype.hasOwnProperty.call(where, 'tenantId') &&
          r.tenantId !== where.tenantId
        ) {
          return false;
        }
        if (where.status?.in && !where.status.in.includes(r.status)) {
          return false;
        }
        return true;
      });
    }),
  },
};

// doMock (not the hoisted jest.mock) so the real Prisma-importing modules are
// intercepted before the route is required, regardless of transform ordering.
let GET: (req: any) => Promise<any>;

beforeAll(() => {
  jest.doMock('@/lib/auth-middleware', () => ({
    authenticateRequest: jest.fn(async () => ({
      success: true,
      context: {
        // user.tenantId is the server-trusted source the route must use.
        user: { id: 'user-contractor-a', userType: 'CONTRACTOR', tenantId: mockUserTenantId },
        // context.tenantId models the header-tainted value the route must NOT trust.
        tenantId: mockContextTenantId,
      },
    })),
    requireRole: () => true,
    unauthorizedRoleResponse: () => ({ status: 403 }),
  }));

  jest.doMock('@/lib/get-tenant-db', () => ({
    getTenantDb: () => mockDb,
  }));

  // api-errors transitively requires @sentry/nextjs (not installed in test env);
  // only the catch path uses it, which these happy-path assertions never hit.
  jest.doMock('@/lib/api-errors', () => ({
    handleUnexpectedError: (e: unknown) => {
      throw e;
    },
  }));

  // Required after mocks are registered.
  GET = require('@/app/api/contractor/available-requests/route').GET;
});

async function callRoute() {
  const res: any = await GET({} as any);
  return res.json();
}

describe('GET /api/contractor/available-requests — tenant isolation', () => {
  beforeEach(() => {
    mockUserTenantId = MOCK_TENANT_A;
    mockContextTenantId = MOCK_TENANT_A;
    mockDb.serviceRequest.findMany.mockClear();
  });

  it('returns only the calling tenant A rows, never tenant B', async () => {
    const body = await callRoute();

    const ids = body.data.map((r: any) => r.id);
    expect(ids).toContain('req-A');
    expect(ids).not.toContain('req-B');
    expect(body.total).toBe(1);

    // No tenant B confidential field may cross the boundary.
    const serialised = JSON.stringify(body);
    expect(serialised).not.toContain('Tenant B CONFIDENTIAL description');
    expect(serialised).not.toContain('Client B');
  });

  it('fails closed (zero rows) when the caller has no resolvable tenant', async () => {
    mockUserTenantId = null;
    mockContextTenantId = null;
    const body = await callRoute();

    expect(body.data).toEqual([]);
    expect(body.total).toBe(0);
  });

  it('denies a tenantless contractor forging x-tenant-id for tenant B (header not trusted)', async () => {
    // Attack: the authenticated user has NO own tenant, but the client sent
    // `x-tenant-id: tenant-b`, which the auth middleware surfaced as
    // context.tenantId. The route must resolve from user.tenantId (null here)
    // and deny, never return tenant B's rows.
    mockUserTenantId = null;
    mockContextTenantId = MOCK_TENANT_B;

    const body = await callRoute();

    expect(body.data).toEqual([]);
    expect(body.total).toBe(0);
    const serialised = JSON.stringify(body);
    expect(serialised).not.toContain('Tenant B CONFIDENTIAL description');
    expect(serialised).not.toContain('Client B');
  });

  it('ignores a header attempt to override an owning contractor (A user, B header → only A)', async () => {
    // Defence in depth: even a user WITH their own tenant must not be
    // redirected to another tenant by a forged header.
    mockUserTenantId = MOCK_TENANT_A;
    mockContextTenantId = MOCK_TENANT_B;

    const body = await callRoute();

    const ids = body.data.map((r: any) => r.id);
    expect(ids).toEqual(['req-A']);
    const serialised = JSON.stringify(body);
    expect(serialised).not.toContain('Tenant B CONFIDENTIAL description');
    expect(serialised).not.toContain('Client B');
  });
});
