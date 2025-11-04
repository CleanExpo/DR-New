/**
 * Stripe Payment Status API
 * GET /api/stripe/payment-status/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { stripe } from '@/lib/stripe/config';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment ID is required',
        },
        { status: 400 }
      );
    }

    // Check if ID is a payment intent ID (starts with pi_)
    if (id.startsWith('pi_')) {
      const paymentIntent = await stripe.paymentIntents.retrieve(id);

      return NextResponse.json({
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
      });
    }

    // Check if ID is an invoice ID
    const invoice = await prisma.contractorInvoice.findUnique({
      where: { id },
      include: {
        subscription: {
          include: {
            payments: {
              where: {
                status: 'COMPLETED',
              },
              orderBy: {
                paidAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invoice not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        amount: invoice.amount,
        gst: invoice.gst,
        total: invoice.total,
        dueDate: invoice.dueDate,
        paidAt: invoice.paidAt,
      },
      payment: invoice.subscription.payments[0] || null,
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch payment status',
      },
      { status: 500 }
    );
  }
}
