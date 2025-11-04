import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { businessDetailsSchema, validateABN } from '@/lib/validation/onboarding';

// Modified business details schema for API
const apiBusinessDetailsSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  tradingName: z.string().optional(),
  abn: z.string()
    .transform(val => val.replace(/\s/g, ''))
    .refine(val => /^\d{11}$/.test(val), 'ABN must be 11 digits')
    .refine(val => validateABN(val), 'Invalid ABN'),
  acn: z.string().optional(),
  phone: z.string()
    .transform(val => val.replace(/[\s()-]/g, ''))
    .refine(val => /^(\+61|0)[2-9]\d{8}$/.test(val), 'Invalid Australian phone number'),
  email: z.string().email('Invalid email address').optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']),
    postcode: z.string().regex(/^\d{4}$/, 'Invalid postcode'),
  }),
  mailingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']),
    postcode: z.string().regex(/^\d{4}$/),
  }).optional(),
  yearsInBusiness: z.number().min(0).max(100),
  employeeCount: z.number().min(1),
  companyStructure: z.enum(['SOLE_TRADER', 'PARTNERSHIP', 'PTY_LTD', 'TRUST']),
  directors: z.array(z.object({
    name: z.string().min(2),
    position: z.string().min(2),
    email: z.string().email().optional(),
  })).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate business details
    const validatedData = apiBusinessDetailsSchema.parse(body);

    // Check if ABN is already registered
    const existingABN = await prisma.contractorCompany.findUnique({
      where: { abn: validatedData.abn }
    });

    if (existingABN && existingABN.contractorId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'This ABN is already registered to another contractor'
        },
        { status: 400 }
      );
    }

    // Get contractor record
    const contractor = await prisma.contractor.findUnique({
      where: { id: user.id }
    });

    if (!contractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor profile not found'
        },
        { status: 404 }
      );
    }

    // Update contractor mobile number if provided
    if (validatedData.phone) {
      await prisma.contractor.update({
        where: { id: user.id },
        data: {
          mobileNumber: validatedData.phone
        }
      });
    }

    // Check if company profile exists
    const existingCompany = await prisma.contractorCompany.findUnique({
      where: { contractorId: user.id }
    });

    if (existingCompany) {
      // Update existing company profile
      await prisma.contractorCompany.update({
        where: { contractorId: user.id },
        data: {
          companyName: validatedData.businessName,
          tradingName: validatedData.tradingName,
          abn: validatedData.abn,
          acn: validatedData.acn,
          companyStructure: validatedData.companyStructure,
          registeredAddress: validatedData.address.street,
          registeredCity: validatedData.address.city,
          registeredState: validatedData.address.state,
          registeredPostcode: validatedData.address.postcode,
          mailingAddress: validatedData.mailingAddress?.street,
          mailingCity: validatedData.mailingAddress?.city,
          mailingState: validatedData.mailingAddress?.state,
          mailingPostcode: validatedData.mailingAddress?.postcode,
          officePhone: validatedData.phone,
          companyEmail: validatedData.email,
          website: validatedData.website,
          directors: validatedData.directors ? JSON.stringify(validatedData.directors) : null,
        }
      });
    } else {
      // Create new company profile
      await prisma.contractorCompany.create({
        data: {
          contractorId: user.id,
          companyName: validatedData.businessName,
          tradingName: validatedData.tradingName,
          abn: validatedData.abn,
          acn: validatedData.acn,
          companyStructure: validatedData.companyStructure,
          registeredAddress: validatedData.address.street,
          registeredCity: validatedData.address.city,
          registeredState: validatedData.address.state,
          registeredPostcode: validatedData.address.postcode,
          mailingAddress: validatedData.mailingAddress?.street,
          mailingCity: validatedData.mailingAddress?.city,
          mailingState: validatedData.mailingAddress?.state,
          mailingPostcode: validatedData.mailingAddress?.postcode,
          officePhone: validatedData.phone,
          companyEmail: validatedData.email,
          website: validatedData.website,
          directors: validatedData.directors ? JSON.stringify(validatedData.directors) : '[]',
        }
      });
    }

    // Update onboarding step
    await prisma.contractor.update({
      where: { id: user.id },
      data: {
        onboardingStep: Math.max(contractor.onboardingStep, 2)
      }
    });

    // Update draft
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (draft) {
      const draftData = JSON.parse(draft.data);
      await prisma.onboardingDraft.update({
        where: { userId: user.id },
        data: {
          data: JSON.stringify({
            ...draftData,
            businessDetails: validatedData,
            lastUpdated: new Date().toISOString()
          }),
          step: Math.max(draft.step, 2)
        }
      });
    }

    // Update progress
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    if (progress) {
      const metadata = JSON.parse(progress.metadata || '{}');
      await prisma.onboardingProgress.update({
        where: { contractorId: user.id },
        data: {
          currentStep: Math.max(progress.currentStep, 2),
          metadata: JSON.stringify({
            ...metadata,
            steps: {
              ...metadata.steps,
              business: true
            }
          })
        }
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE_BUSINESS_DETAILS',
        resource: 'CONTRACTOR',
        resourceId: user.id,
        details: JSON.stringify({
          businessName: validatedData.businessName,
          abn: validatedData.abn,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    // TODO: Verify ABN with ABN Lookup API if configured
    // if (process.env.ABN_LOOKUP_API_KEY) {
    //   await verifyABN(validatedData.abn);
    // }

    return NextResponse.json({
      success: true,
      message: 'Business details saved successfully',
      data: {
        nextStep: 3,
        completedStep: 2
      }
    });

  } catch (error) {
    console.error('Business details error:', error);

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

    await prisma.errorLog.create({
      data: {
        level: 'error',
        message: 'Failed to save business details',
        stack: error instanceof Error ? error.stack : undefined,
        metadata: JSON.stringify({
          userId: user?.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
        source: 'POST /api/onboarding/business',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || ''
      }
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save business details'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve business details
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const companyProfile = await prisma.contractorCompany.findUnique({
      where: { contractorId: user.id }
    });

    if (!companyProfile) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No business details found'
      });
    }

    // Parse directors if stored as JSON
    let directors = [];
    if (companyProfile.directors) {
      try {
        directors = JSON.parse(companyProfile.directors);
      } catch {
        directors = [];
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        businessName: companyProfile.companyName,
        tradingName: companyProfile.tradingName,
        abn: companyProfile.abn,
        acn: companyProfile.acn,
        phone: companyProfile.officePhone,
        email: companyProfile.companyEmail,
        website: companyProfile.website,
        companyStructure: companyProfile.companyStructure,
        address: {
          street: companyProfile.registeredAddress,
          city: companyProfile.registeredCity,
          state: companyProfile.registeredState,
          postcode: companyProfile.registeredPostcode,
        },
        mailingAddress: companyProfile.mailingAddress ? {
          street: companyProfile.mailingAddress,
          city: companyProfile.mailingCity,
          state: companyProfile.mailingState,
          postcode: companyProfile.mailingPostcode,
        } : undefined,
        directors,
        abnVerified: companyProfile.abnVerified,
        abnVerifiedAt: companyProfile.abnVerifiedAt,
      }
    });

  } catch (error) {
    console.error('Get business details error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve business details'
      },
      { status: 500 }
    );
  }
}