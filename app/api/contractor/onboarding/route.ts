import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required data
    if (!data.account || !data.business || !data.services || !data.qualifications || !data.insurance || !data.coverage) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.account.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.account.password, 10);

    // Create user and contractor in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: data.account.email,
          password: hashedPassword,
          name: data.account.fullName,
          role: 'CONTRACTOR',
        },
      });

      // Create contractor profile
      const contractor = await tx.contractor.create({
        data: {
          userId: user.id,
          businessName: data.business.businessName,
          abn: data.business.abn,
          phone: data.business.businessPhone,
          address: `${data.business.address.street}, ${data.business.address.suburb}, ${data.business.address.state} ${data.business.address.postcode}`,
          yearsInBusiness: data.business.yearsInBusiness,
          employeeCount: data.business.employeeCount,
          services: data.services.services,
          qualifications: data.qualifications.qualifications,
          publicLiabilityInsurance: data.insurance.publicLiability,
          workersCompensation: data.insurance.workersCompensation,
          businessDocuments: data.insurance.businessDocuments,
          baseLocation: data.coverage.baseLocation,
          coverageRadius: parseInt(data.coverage.coverageRadius),
          subscriptionTier: data.coverage.tier,
          status: 'PENDING_VERIFICATION',
          verificationStatus: 'PENDING',
        },
      });

      return { user, contractor };
    });

    // Send verification email (implement email service)
    // await sendVerificationEmail(result.user.email, result.contractor.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        contractorId: result.contractor.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Onboarding submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
