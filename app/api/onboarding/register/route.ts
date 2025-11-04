import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { registrationSchema } from '@/lib/validation/onboarding';

const JWT_SECRET = process.env.JWT_SECRET || 'disaster-recovery-secret-key-2024';

// Modified registration schema for contractor
const contractorRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  acceptedTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = contractorRegistrationSchema.parse(body);

    // Check if email already exists in User table
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'An account with this email already exists'
        },
        { status: 400 }
      );
    }

    // Check if email already exists in Contractor table
    const existingContractor = await prisma.contractor.findUnique({
      where: { email: validatedData.email }
    });

    if (existingContractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'A contractor account with this email already exists'
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create contractor account with initial onboarding status
    const contractor = await prisma.contractor.create({
      data: {
        email: validatedData.email,
        username: validatedData.email.split('@')[0], // Use email prefix as username initially
        passwordHash: hashedPassword,
        mobileNumber: '', // Will be collected in onboarding
        emailVerified: false,
        status: 'PENDING',
        onboardingStep: 1,
        onboardingCompleted: false,
      }
    });

    // Create initial onboarding draft
    const onboardingDraft = await prisma.onboardingDraft.create({
      data: {
        userId: contractor.id,
        step: 1,
        data: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          acceptedTerms: validatedData.acceptedTerms,
          registeredAt: new Date().toISOString()
        })
      }
    });

    // Create initial onboarding progress record
    const onboardingProgress = await prisma.onboardingProgress.create({
      data: {
        contractorId: contractor.id,
        currentStep: 1,
        totalSteps: 7,
        completed: false,
        metadata: JSON.stringify({
          steps: {
            account: true,
            business: false,
            services: false,
            qualifications: false,
            insurance: false,
            coverage: false,
            review: false
          }
        })
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: contractor.id,
        email: contractor.email,
        role: 'CONTRACTOR',
        type: 'contractor',
        permissions: []
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create audit log entry
    await prisma.auditLog.create({
      data: {
        userId: contractor.id,
        action: 'REGISTRATION',
        resource: 'CONTRACTOR',
        resourceId: contractor.id,
        details: JSON.stringify({
          email: validatedData.email,
          name: validatedData.name,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    // TODO: Send verification email
    // await sendVerificationEmail(contractor.email, contractor.id);

    return NextResponse.json({
      success: true,
      data: {
        userId: contractor.id,
        token,
        onboardingId: onboardingDraft.id,
        onboardingStep: 1,
        email: contractor.email,
        message: 'Registration successful. Please complete your onboarding.'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors
        },
        { status: 400 }
      );
    }

    // Log error
    await prisma.errorLog.create({
      data: {
        level: 'error',
        message: 'Contractor registration failed',
        stack: error instanceof Error ? error.stack : undefined,
        metadata: JSON.stringify({
          body: body,
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
        source: 'POST /api/onboarding/register',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || ''
      }
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: 'Registration failed. Please try again.'
      },
      { status: 500 }
    );
  }
}