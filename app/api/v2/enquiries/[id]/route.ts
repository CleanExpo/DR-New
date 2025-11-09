/**
 * API v2 - Enquiry Detail Endpoint
 * CQRS-based API with command/query separation
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';
import { GetEnquiryQuery } from '@/lib/use-cases/queries/GetEnquiryQuery';
import { RespondToEnquiryCommand } from '@/lib/use-cases/commands/RespondToEnquiryCommand';
import { AssignEnquiryCommand } from '@/lib/use-cases/commands/AssignEnquiryCommand';
import { EventDispatcher } from '@/lib/domain/events/EventDispatcher';
import { EventStore } from '@/lib/domain/events/EventStore';

const prisma = new PrismaClient();
const uow = new UnitOfWork(prisma);
const eventDispatcher = EventDispatcher.getInstance();
const eventStore = EventStore.getInstance();

// GET /api/v2/enquiries/:id - Get enquiry (Query)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const query = new GetEnquiryQuery(uow);
    const enquiry = await query.execute(params.id);

    if (!enquiry) {
      return NextResponse.json(
        {
          success: false,
          error: 'Enquiry not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Error getting enquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get enquiry',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/v2/enquiries/:id/respond - Respond to enquiry (Command)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const action = new URL(request.url).searchParams.get('action');

    if (action === 'respond') {
      const command = new RespondToEnquiryCommand(uow, eventDispatcher, eventStore);
      const enquiry = await command.execute({
        enquiryId: params.id,
        respondedBy: body.respondedBy,
        responseMessage: body.responseMessage,
      });

      return NextResponse.json({
        success: true,
        data: enquiry.toPlainObject(),
      });
    }

    if (action === 'assign') {
      const command = new AssignEnquiryCommand(uow, eventDispatcher, eventStore);
      const enquiry = await command.execute({
        enquiryId: params.id,
        userId: body.userId,
        assignedBy: body.assignedBy,
      });

      return NextResponse.json({
        success: true,
        data: enquiry.toPlainObject(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update enquiry',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
