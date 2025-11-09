/**
 * Lead Management API Endpoint
 *
 * Handles lead capture, scoring, and routing
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateLeadScore, type LeadScoringInput } from '@/lib/services/lead-scoring';
import { routeLead, type LeadRoutingInput } from '@/lib/services/lead-router';
import { getFollowUpSequence } from '@/lib/services/follow-up-automation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LeadCaptureSchema = z.object({
  // Contact Information
  fullName: z.string().min(1),
  phone: z.string().regex(/^(\+61|0)[4-5]\d{8}$/),
  email: z.string().email(),

  // Property Information
  propertyType: z.enum(['residential', 'commercial']),
  propertyAddress: z.string().min(1),
  suburb: z.string().min(1),
  postcode: z.string().regex(/^\d{4}$/),

  // Service Information
  serviceType: z.enum(['water', 'fire', 'mould', 'storm', 'biohazard']),
  damageDescription: z.string().min(10),
  urgencyLevel: z.enum(['critical', 'urgent', 'standard']),
  estimatedArea: z.number().positive().optional(),

  // Insurance
  hasInsurance: z.boolean(),
  insuranceCompany: z.string().optional(),

  // Lead Quality Indicators
  budget: z.string().optional(),
  readyToStart: z.string().optional(),
  decisionMaker: z.boolean().default(true),
  hasPhotos: z.boolean().default(false),

  // Source tracking
  source: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

/**
 * POST - Create new lead
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = LeadCaptureSchema.parse(body);

    // Calculate lead score
    const scoringInput: LeadScoringInput = {
      serviceType: validatedData.serviceType,
      urgencyLevel: validatedData.urgencyLevel,
      propertyType: validatedData.propertyType,
      hasInsurance: validatedData.hasInsurance,
      insuranceCompany: validatedData.insuranceCompany,
      estimatedArea: validatedData.estimatedArea,
      budget: validatedData.budget,
      readyToStart: validatedData.readyToStart,
      decisionMaker: validatedData.decisionMaker,
      hasPhotos: validatedData.hasPhotos,
      source: validatedData.source,
    };

    const leadScore = calculateLeadScore(scoringInput);

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        fullName: validatedData.fullName,
        phone: validatedData.phone,
        email: validatedData.email,
        propertyType: validatedData.propertyType,
        propertyAddress: validatedData.propertyAddress,
        suburb: validatedData.suburb,
        state: 'QLD',
        postcode: validatedData.postcode,
        damageType: JSON.stringify([validatedData.serviceType]),
        damageDate: new Date(),
        damageDescription: validatedData.damageDescription,
        estimatedAreaAffected: validatedData.estimatedArea?.toString() || 'Unknown',
        hasInsurance: validatedData.hasInsurance,
        insuranceCompany: validatedData.insuranceCompany,
        urgencyLevel: validatedData.urgencyLevel.toUpperCase(),
        propertyValue: 'Unknown',
        isBusinessProperty: validatedData.propertyType === 'commercial',
        requiresAccommodation: false,
        leadScore: leadScore.score,
        leadValue: leadScore.estimatedValue,
        hasPhotos: validatedData.hasPhotos,
        readyToStart: validatedData.readyToStart || 'Unknown',
        budget: validatedData.budget,
        decisionMaker: validatedData.decisionMaker,
        qualityStatus: leadScore.classification === 'hot' ? 'QUALIFIED' : 'STANDARD',
        status: 'NEW',
        source: validatedData.source,
        ipAddress: validatedData.ipAddress,
        userAgent: validatedData.userAgent,
      },
    });

    // Route lead to appropriate team member
    const routingInput: LeadRoutingInput = {
      leadId: lead.id,
      serviceType: validatedData.serviceType,
      location: {
        suburb: validatedData.suburb,
        postcode: validatedData.postcode,
      },
      urgencyLevel: validatedData.urgencyLevel,
      leadScore: leadScore.score,
      source: validatedData.source,
    };

    const routing = await routeLead(routingInput);

    // Get follow-up sequence
    const followUpSequence = getFollowUpSequence(
      leadScore.classification,
      'new'
    );

    // Track lead creation event
    await prisma.leadTracking.create({
      data: {
        leadId: lead.id,
        event: 'CREATED',
        metadata: JSON.stringify({
          score: leadScore.score,
          classification: leadScore.classification,
          source: validatedData.source,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      score: {
        value: leadScore.score,
        classification: leadScore.classification,
        priority: leadScore.priority,
        estimatedValue: leadScore.estimatedValue,
      },
      routing: routing.success
        ? {
            assignedTo: routing.assignedTo?.name,
            estimatedResponseTime: routing.estimatedResponseTime,
          }
        : {
            message: 'Lead captured but requires manual assignment',
          },
      followUp: {
        nextSteps: followUpSequence.slice(0, 3).map((step) => ({
          action: step.template,
          timing: `${step.delayHours} hours`,
          channel: step.channel,
        })),
      },
      message: leadScore.recommendedAction,
    });
  } catch (error) {
    console.error('[API] Lead capture error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid lead data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Failed to capture lead',
      },
      { status: 500 }
    );
  }
}

/**
 * GET - Retrieve leads
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const classification = searchParams.get('classification');
    const limit = parseInt(searchParams.get('limit') || '50');

    const leads = await prisma.lead.findMany({
      where: {
        ...(status && { status }),
        ...(classification && { qualityStatus: classification.toUpperCase() }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      include: {
        partner: {
          select: {
            businessName: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads: leads.map((lead) => ({
        id: lead.id,
        name: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        serviceType: JSON.parse(lead.damageType)[0],
        suburb: lead.suburb,
        urgency: lead.urgencyLevel,
        score: lead.leadScore,
        value: lead.leadValue,
        status: lead.status,
        classification: lead.qualityStatus,
        assignedTo: lead.partner?.businessName,
        createdAt: lead.createdAt,
      })),
    });
  } catch (error) {
    console.error('[API] Lead retrieval error:', error);

    return NextResponse.json(
      {
        error: 'RETRIEVAL_ERROR',
        message: 'Failed to retrieve leads',
      },
      { status: 500 }
    );
  }
}

// Route segment configuration
export const runtime = 'nodejs';
export const maxDuration = 20;
