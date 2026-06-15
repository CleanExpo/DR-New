jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

import { GET } from '@/app/api/health/route';

describe('GET /api/health monitoring status', () => {
  const originalDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  afterEach(() => {
    if (originalDsn === undefined) {
      delete process.env.NEXT_PUBLIC_SENTRY_DSN;
    } else {
      process.env.NEXT_PUBLIC_SENTRY_DSN = originalDsn;
    }
  });

  it('reports Sentry monitoring as configured when DSN is present', async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'https://examplePublicKey@o0.ingest.sentry.io/0';

    const response = await GET({} as never);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('healthy');
    expect(body.checks.monitoring).toEqual({
      status: 'configured',
      provider: 'sentry',
    });
  });

  it('reports Sentry monitoring as not configured when DSN is absent', async () => {
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;

    const response = await GET({} as never);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.checks.monitoring).toEqual({
      status: 'not_configured',
      provider: 'sentry',
    });
  });
});
