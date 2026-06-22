import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { messageSchema } from '@/lib/validation-schemas';
import { handleValidationError, handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: user.id },
          { receiverId: user.id },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return handleValidationError(result.error);
    }

    const message = await db.message.create({
      data: {
        senderId: user.id,
        receiverId: result.data.receiverId,
        content: result.data.content,
      },
    });

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
