/**
 * @jest-environment node
 */

import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/api/error-handler';

/**
 * Regression: withErrorHandler was typed `(req: Request) => ...` and invoked the
 * wrapped handler as `handler(req)`. Next passes the route context - the object
 * holding `params` - as the SECOND argument, so every wrapped handler on a dynamic
 * route received `undefined` and threw "Cannot destructure property 'params' of
 * 'undefined'" before any of its own code ran.
 *
 * These assert the forwarding itself. A test that only checked the happy path of a
 * non-dynamic route passes either way and would not have caught this.
 */
describe('withErrorHandler', () => {
  const req = () => new Request('https://example.test/api/thing/abc123');

  it('forwards the route context to the handler', async () => {
    type Ctx = { params: Promise<{ id: string }> };
    const handler = jest.fn(async (_req: Request, _ctx: Ctx) =>
      NextResponse.json({ ok: true })
    );
    const wrapped = withErrorHandler(handler);

    const context: Ctx = { params: Promise.resolve({ id: 'abc123' }) };
    await wrapped(req(), context);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][1]).toBe(context);
  });

  it('lets a dynamic-route handler read its params', async () => {
    const wrapped = withErrorHandler(
      async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
        const { id } = await params;
        return NextResponse.json({ id });
      }
    );

    const res = await wrapped(req(), { params: Promise.resolve({ id: 'abc123' }) });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ id: 'abc123' });
  });

  it('still works for a route with no dynamic segment', async () => {
    const wrapped = withErrorHandler(async () => NextResponse.json({ ok: true }));

    const res = await wrapped(req());

    expect(res.status).toBe(200);
  });

  it('converts a thrown error into a response instead of propagating', async () => {
    const wrapped = withErrorHandler(async () => {
      throw new Error('boom');
    });

    const res = await wrapped(req());

    expect(res.status).toBe(500);
  });
});
