/**
 * Client API: Download Invoice
 *
 * GET /api/client/claims/[id]/invoice
 * Generates and returns invoice data for a booking.
 * Returns JSON invoice data for client-side PDF generation.
 *
 * Required role: CLIENT (must own the booking)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Verify client authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const bookingId = params.id;

    // 2. Get booking with payment details
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        contractor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        payments: {
          where: { status: 'COMPLETED' },
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            amountAUD: true,
            gstAUD: true,
            platformFeeAUD: true,
            netAmountAUD: true,
            invoiceNumber: true,
            processedAt: true,
            paymentMethod: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    if (booking.clientId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorised - You do not own this claim' },
        { status: 403 }
      );
    }

    // 3. Build invoice data
    const totalPaid = booking.payments.reduce(
      (sum, p) => sum + Number(p.amountAUD),
      0
    );
    const totalGST = booking.payments.reduce(
      (sum, p) => sum + Number(p.gstAUD),
      0
    );

    const invoice = {
      invoiceNumber: booking.payments[0]?.invoiceNumber || `INV-${bookingId.slice(0, 8).toUpperCase()}`,
      issueDate: booking.payments[0]?.processedAt || booking.createdAt,
      booking: {
        id: booking.id,
        serviceType: booking.australianServiceType,
        description: booking.description,
        address: `${booking.streetAddress}, ${booking.serviceSuburb} ${booking.serviceState} ${booking.servicePostcode}`,
        status: booking.status,
        emergencyLevel: booking.emergencyResponseLevel,
      },
      client: {
        name: booking.client.name,
        email: booking.client.email,
      },
      contractor: booking.contractor
        ? {
            businessName: booking.contractor.businessName,
            contactName: booking.contractor.user.name,
            email: booking.contractor.user.email,
            abn: booking.contractor.abnNumber || null,
          }
        : null,
      lineItems: booking.payments.map((p) => ({
        id: p.id,
        description: `${booking.australianServiceType.replace(/_/g, ' ')} - Disaster Recovery Service`,
        amount: Number(p.amountAUD),
        gst: Number(p.gstAUD),
        net: Number(p.netAmountAUD),
        paymentMethod: p.paymentMethod,
        date: p.processedAt,
        invoiceNumber: p.invoiceNumber,
      })),
      summary: {
        subtotal: totalPaid - totalGST,
        gst: totalGST,
        total: totalPaid,
        estimatedCost: Number(booking.estimatedCostAUD),
        finalCost: booking.finalCostAUD ? Number(booking.finalCostAUD) : null,
        currency: 'AUD',
      },
      company: {
        name: 'Disaster Recovery Australia',
        abn: '00 000 000 000',
        email: 'support@disasterrecovery.com.au',
        address: 'Australia',
      },
    };

    return NextResponse.json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.error('Error generating invoice:', error);

    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    );
  }
}
