/**
 * IICRC Certification Requirements Mapping
 *
 * Maps disaster types to required IICRC certification levels.
 * Used for contractor filtering with fallback mechanism:
 * - Round 1: Match contractors WITH required certifications
 * - Round 2 (Fallback): If no contractors have cert, offer to ANY in rotation
 */

import { IICRCCertificationLevel } from '@prisma/client';

/**
 * Disaster Type → Required IICRC Certifications Mapping
 *
 * Each disaster type specifies which IICRC certifications are REQUIRED.
 * Contractors without these certifications will be skipped in Round 1 matching.
 */
export const CERT_REQUIREMENTS: Record<string, IICRCCertificationLevel[]> = {
  // ============================================================================
  // Water-Related Disasters
  // ============================================================================

  'Water Damage': ['WRT', 'ASD'],
  // WRT (Water Restoration Technician) - Core water damage restoration
  // ASD (Applied Structural Drying Technician) - Structural drying expertise

  Flood: ['WRT', 'ASD', 'AMRT'],
  // WRT - Water extraction and restoration
  // ASD - Structural drying
  // AMRT (Applied Microbial Remediation Technician) - Mould prevention

  'Storm Damage': ['WRT', 'ASD'],
  // WRT - Water damage from storms
  // ASD - Structural drying

  'Leak Detection': ['WRT'],
  // WRT - Water damage assessment

  'Burst Pipe': ['WRT', 'ASD'],
  // WRT - Water restoration
  // ASD - Structural drying

  // ============================================================================
  // Fire-Related Disasters
  // ============================================================================

  'Fire Damage': ['FSRT'],
  // FSRT (Fire and Smoke Restoration Technician) - Fire restoration specialist

  'Smoke Damage': ['FSRT', 'OCT'],
  // FSRT - Smoke damage restoration
  // OCT (Odor Control Technician) - Smoke odour removal

  // ============================================================================
  // Mould-Related Disasters
  // ============================================================================

  'Mould Remediation': ['AMRT'],
  // AMRT - Microbial remediation specialist

  'Mould Inspection': ['AMRT'],
  // AMRT - Mould assessment and remediation

  'Mould Assessment': ['AMRT'],
  // AMRT - Mould testing and evaluation

  // ============================================================================
  // Specialized Disasters
  // ============================================================================

  'Sewage Backup': ['WRT', 'AMRT'],
  // WRT - Water extraction
  // AMRT - Biohazard and microbial remediation

  'Biohazard Cleanup': ['AMRT'],
  // AMRT - Biohazard remediation

  'Contents Restoration': ['CCT', 'UFT'],
  // CCT (Carpet Cleaning Technician) - Textile restoration
  // UFT (Upholstery and Fabric Cleaning Technician) - Fabric restoration

  'Odour Removal': ['OCT'],
  // OCT - Specialized odour control

  'Carpet Cleaning': ['CCT'],
  // CCT - Carpet restoration

  'Upholstery Cleaning': ['UFT'],
  // UFT - Upholstery restoration

  // ============================================================================
  // General/No Certification Required
  // ============================================================================

  'General Cleaning': [],
  // No specific certification required

  'Emergency Board Up': [],
  // No specific certification required

  'Debris Removal': [],
  // No specific certification required

  'Temporary Repairs': [],
  // No specific certification required

  'Tarpaulin Installation': [],
  // No specific certification required

  'Tree Removal': [],
  // No specific certification required

  'Roof Damage': [],
  // No specific IICRC cert (specialized roofing license required)

  'Structural Damage': [],
  // No specific IICRC cert (structural engineering may be required)
};

/**
 * Get required IICRC certifications for a disaster type
 *
 * @param disasterType - The type of disaster (e.g., "Water Damage", "Flood")
 * @returns Array of required IICRC certification levels, or empty array if none required
 *
 * @example
 * getRequiredCerts('Flood') → ['WRT', 'ASD', 'AMRT']
 * getRequiredCerts('General Cleaning') → []
 * getRequiredCerts('Unknown Type') → []
 */
export function getRequiredCerts(disasterType: string): IICRCCertificationLevel[] {
  return CERT_REQUIREMENTS[disasterType] || [];
}

/**
 * Check if a disaster type requires IICRC certifications
 *
 * @param disasterType - The type of disaster
 * @returns True if certifications are required, false otherwise
 *
 * @example
 * requiresCertification('Flood') → true
 * requiresCertification('General Cleaning') → false
 */
export function requiresCertification(disasterType: string): boolean {
  const certs = getRequiredCerts(disasterType);
  return certs.length > 0;
}

/**
 * Get human-readable certification names
 *
 * @param certLevel - IICRC certification level enum
 * @returns Full certification name
 */
export function getCertificationName(certLevel: IICRCCertificationLevel): string {
  const certNames: Record<IICRCCertificationLevel, string> = {
    WRT: 'Water Restoration Technician',
    AMRT: 'Applied Microbial Remediation Technician',
    ASD: 'Applied Structural Drying Technician',
    FSRT: 'Fire and Smoke Restoration Technician',
    OCT: 'Odor Control Technician',
    CCT: 'Carpet Cleaning Technician',
    UFT: 'Upholstery and Fabric Cleaning Technician',
  };

  return certNames[certLevel] || certLevel;
}

/**
 * Validate if contractor has required certifications for disaster type
 *
 * @param contractorCerts - Array of contractor's active certification levels
 * @param disasterType - The type of disaster
 * @returns True if contractor has ALL required certifications, false otherwise
 *
 * @example
 * hasRequiredCerts(['WRT', 'ASD'], 'Water Damage') → true
 * hasRequiredCerts(['WRT'], 'Flood') → false (missing ASD and AMRT)
 * hasRequiredCerts([], 'General Cleaning') → true (no certs required)
 */
export function hasRequiredCerts(
  contractorCerts: IICRCCertificationLevel[],
  disasterType: string
): boolean {
  const requiredCerts = getRequiredCerts(disasterType);

  // If no certs required, contractor is qualified
  if (requiredCerts.length === 0) {
    return true;
  }

  // Check if contractor has ALL required certifications
  return requiredCerts.every((cert) => contractorCerts.includes(cert));
}

/**
 * Get missing certifications for a contractor
 *
 * @param contractorCerts - Array of contractor's active certification levels
 * @param disasterType - The type of disaster
 * @returns Array of missing certification levels
 *
 * @example
 * getMissingCerts(['WRT'], 'Flood') → ['ASD', 'AMRT']
 * getMissingCerts(['WRT', 'ASD', 'AMRT'], 'Flood') → []
 */
export function getMissingCerts(
  contractorCerts: IICRCCertificationLevel[],
  disasterType: string
): IICRCCertificationLevel[] {
  const requiredCerts = getRequiredCerts(disasterType);
  return requiredCerts.filter((cert) => !contractorCerts.includes(cert));
}
