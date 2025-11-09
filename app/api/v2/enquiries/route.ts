/**
 * API v2 - Enquiries Endpoint
 * CQRS-based API with command/query separation
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';
import { CreateEnquiryCommand } from '@/lib/use-cases/commands/CreateEnquiryCommand';
import { ListEnquiriesQuery } from '@/lib/use-cases/queries/ListEnquiriesQuery';
import { EventDispatcher } from '@/lib/domain/events/EventDispatcher';
import { EventStore } from '@/lib/domain/events/EventStore';

const prisma = new PrismaClient();
const uow = new UnitOfWork(prisma);
const eventDispatcher = EventDispatcher.getInstance();
const eventStore = EventStore.getInstance();

// GET /api/v2/enquiries - List enquiries (Query)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = new ListEnquiriesQuery(uow);
    const enquiries = await query.execute({
      status: searchParams.get('status') || undefined,
      urgency: searchParams.get('urgency') as any,
      service: searchParams.get('service') || undefined,
      onlyUnresponded: searchParams.get('onlyUnresponded') === 'true',
      onlyEmergency: searchParams.get('onlyEmergency') === 'true',
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    console.error('Error listing enquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list enquiries',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/v2/enquiries - Create enquiry (Command)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const command = new CreateEnquiryCommand(uow, eventDispatcher, eventStore);
    const enquiry = await command.execute({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      urgency: body.urgency,
      source: body.source,
    });

    return NextResponse.json(
      {
        success: true,
        data: enquiry.toPlainObject(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create enquiry',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
