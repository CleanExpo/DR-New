/**
 * Emergency Booking API Endpoint
 *
 * Handles immediate dispatch of emergency restoration jobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  dispatchEmergencyJob,
  type EmergencyJobRequest,
} from '@/lib/services/emergency-dispatcher';
import { sendEmergencyJobAlert } from '@/lib/services/sms-notification';
import { sendEmergencyJobNotification } from '@/lib/services/email-notification';
import { createJobAppointment } from '@/lib/services/calendar-integration';
import { trackConversion } from '@/lib/services/conversion-tracking';

// Request validation schema
const EmergencyBookingSchema = z.object({
  serviceType: z.enum(['water', 'fire', 'mould', 'storm', 'biohazard']),
  location: z.object({
    address: z.string().min(1),
    suburb: z.string().min(1),
    postcode: z.string().regex(/^\d{4}$/),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  urgencyLevel: z.enum(['critical', 'urgent', 'standard']),
  propertyType: z.enum(['residential', 'commercial']),
  damageDescription: z.string().min(10),
  estimatedArea: z.number().positive().optional(),
  hasInsurance: z.boolean(),
  insuranceCompany: z.string().optional(),
  contactName: z.string().min(1),
  contactPhone: z.string().regex(/^(\+61|0)[4-5]\d{8}$/),
  contactEmail: z.string().email(),
  preferredResponseTime: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = EmergencyBookingSchema.parse(body);

    // Dispatch the emergency job
    const dispatchResult = await dispatchEmergencyJob(validatedData as EmergencyJobRequest);

    if (!dispatchResult.success) {
      return NextResponse.json(
        {
          error: 'DISPATCH_FAILED',
          message: dispatchResult.error || 'Unable to dispatch emergency job',
          jobId: dispatchResult.jobId,
        },
        { status: 500 }
      );
    }

    // Send notifications asynchronously (don't await)
    if (dispatchResult.assignedContractor) {
      const jobDetails = {
        jobId: dispatchResult.jobId!,
        serviceType: validatedData.serviceType,
        location: validatedData.location.address,
        urgency: validatedData.urgencyLevel,
        customerName: validatedData.contactName,
        customerPhone: validatedData.contactPhone,
        damageDescription: validatedData.damageDescription,
        estimatedValue: 5000, // Placeholder - should be calculated
      };

      // Send SMS to contractor
      sendEmergencyJobAlert(dispatchResult.assignedContractor.phone, {
        jobId: dispatchResult.jobId!,
        serviceType: validatedData.serviceType,
        location: `${validatedData.location.suburb}, ${validatedData.location.postcode}`,
        urgency: validatedData.urgencyLevel,
        estimatedValue: 5000,
      }).catch((error) => console.error('[API] SMS send error:', error));

      // Send email to contractor
      sendEmergencyJobNotification(
        `${dispatchResult.assignedContractor.phone.replace(/^\+?61/, '0')  }@disasterrecovery.com.au`, // Placeholder email
        jobDetails
      ).catch((error) => console.error('[API] Email send error:', error));

      // Create calendar appointment
      const scheduledTime = new Date();
      scheduledTime.setMinutes(scheduledTime.getMinutes() + 30); // 30 minutes from now

      createJobAppointment({
        jobId: dispatchResult.jobId!,
        serviceType: validatedData.serviceType,
        customerName: validatedData.contactName,
        customerEmail: validatedData.contactEmail,
        customerPhone: validatedData.contactPhone,
        location: validatedData.location.address,
        scheduledTime,
        estimatedDuration: 120, // 2 hours
      }).catch((error) => console.error('[API] Calendar error:', error));
    }

    // Track conversion
    trackConversion({
      conversionType: 'emergency_call',
      value: 5000, // Estimated value
      source: validatedData.source || 'direct',
      medium: 'organic',
      page: '/emergency',
      serviceType: validatedData.serviceType,
      serviceArea: validatedData.location.suburb,
      suburb: validatedData.location.suburb,
      urgencyLevel: validatedData.urgencyLevel === 'critical' ? 'emergency' : 'urgent',
      leadQuality: 'high',
      deviceType: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    }).catch((error) => console.error('[API] Tracking error:', error));

    return NextResponse.json({
      success: true,
      jobId: dispatchResult.jobId,
      contractor: dispatchResult.assignedContractor
        ? {
            name: dispatchResult.assignedContractor.name,
            phone: dispatchResult.assignedContractor.phone,
            estimatedArrival: dispatchResult.assignedContractor.estimatedArrival,
          }
        : undefined,
      message: dispatchResult.assignedContractor
        ? `Job dispatched to ${dispatchResult.assignedContractor.name}. ETA: ${new Date(dispatchResult.assignedContractor.estimatedArrival).toLocaleTimeString()}`
        : 'Job created. Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('[API] Emergency booking error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Route segment configuration
export const runtime = 'nodejs';
export const maxDuration = 30;
