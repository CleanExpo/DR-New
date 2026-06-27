/**
 * Lead → CRM bridge
 *
 * Public lead-intake routes historically persisted to their own tables but never
 * created a CRM record, so inbound leads were invisible to the customer-lifecycle
 * / opportunity pipeline. This helper closes that gap: it get-or-creates a User by
 * email, ensures a CustomerLifecycle exists, and (when a service postcode is known)
 * opens an Opportunity.
 *
 * Call it best-effort AFTER the lead itself has been persisted, and never let it
 * block or fail the user-facing response — it catches its own errors and returns
 * null on failure.
 */

import { Prisma, type AustralianServiceType } from '@prisma/client';
import { basePrisma } from '@/lib/prisma';
import { customerLifecycleService } from './customer-lifecycle.service';

const AUS_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'] as const;
type AusState = (typeof AUS_STATES)[number];

function asState(value?: string | null): AusState | undefined {
  if (!value) return undefined;
  const upper = value.toUpperCase();
  return (AUS_STATES as readonly string[]).includes(upper) ? (upper as AusState) : undefined;
}

function mapServiceType(input?: string | null): AustralianServiceType {
  const v = (input || '').toLowerCase();
  if (v.includes('water') || v.includes('flood')) return 'WATER_DAMAGE';
  if (v.includes('fire')) return 'FIRE_DAMAGE';
  if (v.includes('smoke')) return 'SMOKE_DAMAGE';
  if (v.includes('mould') || v.includes('mold')) return 'MOULD_REMEDIATION';
  if (v.includes('odour') || v.includes('odor')) return 'ODOUR_REMEDIATION';
  if (v.includes('biohazard') || v.includes('trauma')) return 'BIOHAZARD_REMEDIATION';
  if (v.includes('hoard')) return 'HOARDING_CLEANUP';
  if (v.includes('carpet')) return 'CARPET_CLEANING';
  return 'GENERAL_RESTORATION';
}

export interface LeadBridgeInput {
  email: string;
  name: string;
  phone?: string | null;
  /** Where the lead came from, e.g. 'lead_capture', 'contact_form', 'service_request'. */
  source: string;
  state?: string | null;
  postcode?: string | null;
  suburb?: string | null;
  /** Free-text service/damage descriptor; mapped to the AustralianServiceType enum. */
  serviceType?: string | null;
  estimatedValueAUD?: number | null;
}

export interface LeadBridgeResult {
  userId: string;
  lifecycleId: string;
  opportunityId?: string;
}

export async function bridgeLeadToCrm(
  input: LeadBridgeInput,
): Promise<LeadBridgeResult | null> {
  try {
    const email = input.email.toLowerCase();
    const state = asState(input.state);

    let user = await basePrisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await basePrisma.user.create({
        data: {
          email,
          name: input.name,
          userType: 'CLIENT',
          isEmailVerified: false,
          isActive: true,
          ...(state ? { australianState: state } : {}),
          ...(input.postcode ? { australianPostcode: input.postcode } : {}),
          ...(input.suburb ? { suburb: input.suburb } : {}),
        },
      });
    }

    const lifecycle = await customerLifecycleService.getOrCreateLifecycle(user.id);

    let opportunityId: string | undefined;
    // An Opportunity needs a service postcode + service type; only damage/service
    // leads carry those. Generic enquiries (e.g. contact form) just seed the
    // lifecycle so the customer is visible to ops.
    if (input.postcode) {
      const opportunity = await basePrisma.opportunity.create({
        data: {
          customerLifecycleId: lifecycle.id,
          name: `${input.serviceType || 'Restoration enquiry'}${
            input.suburb ? ` - ${input.suburb}` : ''
          }`,
          stage: 'DISCOVERY',
          estimatedValueAUD: new Prisma.Decimal(input.estimatedValueAUD ?? 5000),
          probabilityPercent: 30,
          australianServiceType: mapServiceType(input.serviceType),
          servicePostcode: input.postcode,
          ...(state ? { serviceState: state } : {}),
        },
      });
      opportunityId = opportunity.id;
    }

    return { userId: user.id, lifecycleId: lifecycle.id, opportunityId };
  } catch (error) {
    // Never surface to the lead submitter — the lead is already persisted.
    console.error('[lead-bridge] failed to bridge lead to CRM:', error);
    return null;
  }
}
