/**
 * CARSI Progress Webhook — DR-193
 *
 * POST /api/nrpg/carsi-sync/webhook
 *
 * Receives progress events from CARSI and updates:
 *   - ContractorModuleProgress
 *   - NRPGCertificationPoints.carsiCoursePoints
 *   - NRPGCertScore (via certification-scoring-engine)
 *
 * Signature verification: CARSI sends X-CARSI-Signature: sha256=<hmac>
 * Secret: CARSI_WEBHOOK_SECRET env var (optional in dev)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  verifyCarsiWebhookSignature,
  handleCarsiWebhook,
  type CarsiWebhookPayload,
} from '@/lib/carsi-sync';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-carsi-signature');

  if (!verifyCarsiWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }

  let payload: CarsiWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as CarsiWebhookPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const validEvents = ['course.started', 'course.progress', 'course.completed', 'course.failed'];
  if (!validEvents.includes(payload.event)) {
    // Unknown event type — acknowledge without processing
    return NextResponse.json({ received: true, processed: false });
  }

  if (!payload.studentId || !payload.courseId) {
    return NextResponse.json(
      { error: 'Webhook payload missing required fields: studentId, courseId' },
      { status: 422 }
    );
  }

  await handleCarsiWebhook(payload);

  return NextResponse.json({ received: true, processed: true });
}
