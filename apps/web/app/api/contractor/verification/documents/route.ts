import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { getServerClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { ZodError, z } from 'zod';

// Validation schema for document upload
const documentUploadSchema = z.object({
  documentType: z.enum([
    'BUSINESS_LICENSE',
    'IICRC_CERTIFICATE',
    'PUBLIC_LIABILITY_INSURANCE',
    'WORKERS_COMPENSATION',
    'PROFESSIONAL_INDEMNITY',
    'ABN_REGISTRATION',
    'POLICE_CHECK',
    'TRADE_LICENSE',
    'COMPANY_LOGO',
    'INSURANCE_CLAIM_EXAMPLE',
    'OTHER'
  ]),
  documentNumber: z.string().optional().nullable(),
  issuingAuthority: z.string().optional().nullable(),
  stateIssued: z.string().optional().nullable(),
  issuedDate: z.string().optional().nullable(),
  expiryDate: z.string().optional().nullable(),
});

/**
 * GET /api/contractor/verification/documents
 * Retrieves all documents for authenticated contractor
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Fetch all documents
    const documents = await db.contractorDocument.findMany({
      where: { contractorId: contractor.id },
      orderBy: [
        { status: 'asc' }, // Show pending first
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}

/**
 * POST /api/contractor/verification/documents
 * Creates a document record after file upload
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = documentUploadSchema.parse(body);

    // Validate required fields from upload
    if (!body.fileUrl || !body.fileName || !body.fileSize || !body.mimeType) {
      return NextResponse.json({
        success: false,
        error: 'Missing required file information',
      }, { status: 400 });
    }

    // Create document record
    const document = await db.contractorDocument.create({
      data: {
        contractorId: contractor.id,
        documentType: validatedData.documentType,
        fileName: body.fileName,
        fileUrl: body.fileUrl,
        fileSize: body.fileSize,
        mimeType: body.mimeType,
        documentNumber: validatedData.documentNumber,
        issuingAuthority: validatedData.issuingAuthority,
        stateIssued: validatedData.stateIssued as any,
        issuedDate: validatedData.issuedDate ? new Date(validatedData.issuedDate) : null,
        expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
        status: 'PENDING',
      },
    });

    // Create verification history entry
    await db.contractorVerificationHistory.create({
      data: {
        contractorId: contractor.id,
        action: 'DOCUMENT_UPLOADED',
        previousStatus: contractor.verificationStatus as any,
        newStatus: contractor.verificationStatus as any,
        notes: `Uploaded ${validatedData.documentType}: ${body.fileName}`,
        performedBy: user.id,
        performedByName: user.name,
        isSystemAction: false,
      },
    });

    return NextResponse.json({
      success: true,
      document,
      message: 'Document uploaded successfully',
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * DELETE /api/contractor/verification/documents/[id]
 * Deletes a document (only if PENDING or REJECTED)
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get document ID from query
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json({
        success: false,
        error: 'Document ID is required',
      }, { status: 400 });
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Find document
    const document = await db.contractorDocument.findFirst({
      where: {
        id: documentId,
        contractorId: contractor.id,
      },
    });

    if (!document) {
      return NextResponse.json({
        success: false,
        error: 'Document not found',
      }, { status: 404 });
    }

    // Only allow deletion of PENDING or REJECTED documents
    if (!['PENDING', 'REJECTED'].includes(document.status)) {
      return NextResponse.json({
        success: false,
        error: 'Cannot delete approved or under review documents',
      }, { status: 403 });
    }

    // Delete from Supabase Storage if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = getServerClient();
        const pathMatch = document.fileUrl.match(/\/([^/]+\/[^?]+)/);
        if (pathMatch) {
          const filePath = pathMatch[1];
          await supabase.storage.from('documents').remove([filePath]);
        }
      } catch (storageError) {
        console.error('Failed to delete from storage:', storageError);
        // Continue with database deletion even if storage fails
      }
    }

    // Delete document record
    await db.contractorDocument.delete({
      where: { id: documentId },
    });

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
