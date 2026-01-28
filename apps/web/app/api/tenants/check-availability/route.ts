import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';

const checkAvailabilitySchema = z.object({
  subdomain: z.string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(63, 'Subdomain must be at most 63 characters')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens')
    .regex(/^[a-z0-9]/, 'Subdomain must start with a letter or number')
    .regex(/[a-z0-9]$/, 'Subdomain must end with a letter or number'),
});

/**
 * UNI-160: Subdomain Availability Checker
 *
 * Public endpoint to check if a subdomain is available for registration.
 * Returns availability status and suggested alternatives if taken.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subdomain = searchParams.get('subdomain');

    if (!subdomain) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Subdomain parameter is required',
        400
      );
    }

    // Validate subdomain format
    try {
      checkAvailabilitySchema.parse({ subdomain });
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        return handleValidationError(validationError);
      }
    }

    // Check if subdomain is already taken
    const existingTenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { subdomain },
          { domain: `${subdomain}.${process.env.BASE_DOMAIN || 'disasterrecovery.com.au'}` }
        ]
      }
    });

    const available = !existingTenant;

    // If taken, suggest alternatives
    const suggestions: string[] = [];
    if (!available) {
      suggestions.push(...await generateSubdomainSuggestions(subdomain));
    }

    return NextResponse.json({
      subdomain,
      available,
      suggestions,
      fullDomain: available ? `${subdomain}.${process.env.BASE_DOMAIN || 'disasterrecovery.com.au'}` : null,
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

/**
 * Generate alternative subdomain suggestions
 */
async function generateSubdomainSuggestions(baseSubdomain: string): Promise<string[]> {
  const suggestions: string[] = [];
  const suffixes = ['au', 'pro', 'hq', 'group', 'team', 'services'];
  const numbers = ['2', '3', '10', '24', '365'];

  // Try suffixes
  for (const suffix of suffixes) {
    const suggestion = `${baseSubdomain}-${suffix}`;
    const exists = await prisma.tenant.findFirst({
      where: {
        OR: [
          { subdomain: suggestion },
          { domain: `${suggestion}.${process.env.BASE_DOMAIN || 'disasterrecovery.com.au'}` }
        ]
      }
    });
    if (!exists) {
      suggestions.push(suggestion);
      if (suggestions.length >= 5) break;
    }
  }

  // Try numbers if we don't have enough suggestions
  if (suggestions.length < 5) {
    for (const num of numbers) {
      const suggestion = `${baseSubdomain}${num}`;
      const exists = await prisma.tenant.findFirst({
        where: {
          OR: [
            { subdomain: suggestion },
            { domain: `${suggestion}.${process.env.BASE_DOMAIN || 'disasterrecovery.com.au'}` }
          ]
        }
      });
      if (!exists) {
        suggestions.push(suggestion);
        if (suggestions.length >= 5) break;
      }
    }
  }

  return suggestions.slice(0, 5);
}
