/**
 * Contractor Specialisation Pathways — DR-197
 *
 * Visual progression map showing certification levels and required credentials
 * per NRPG specialisation. Integrates with the 100-point certification system.
 *
 * Usage:
 *   <SpecialisationPathway specialisation="WATER_DAMAGE" currentPoints={72} />
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------

export type Specialisation =
  | 'WATER_DAMAGE'
  | 'MOULD'
  | 'FIRE_SMOKE'
  | 'TRAUMA'
  | 'CARPET'
  | 'COMMERCIAL'
  | 'STORM'
  | 'GENERAL';

interface CertificationNode {
  level: string;
  pointsRequired: number;
  credentials: string[];
  description: string;
  colour: string;
}

interface SpecialisationData {
  label: string;
  iicrcStandards: string[];
  pathway: CertificationNode[];
}

const PATHWAYS: Record<Specialisation, SpecialisationData> = {
  WATER_DAMAGE: {
    label: 'Water Damage Restoration',
    iicrcStandards: ['S500', 'WRT', 'ASD'],
    pathway: [
      {
        level: 'NRPG Associate',
        pointsRequired: 0,
        credentials: ['CARSI CSE', 'CARSI WRT Intro'],
        description: 'Foundation level — onboarding complete, training in progress.',
        colour: 'zinc',
      },
      {
        level: 'NRPG Certified Specialist',
        pointsRequired: 60,
        credentials: ['WRT Certification', 'CARSI WRT Complete', 'IICRC S500'],
        description: 'Core water damage restoration competency demonstrated.',
        colour: 'blue',
      },
      {
        level: 'NRPG Certified Professional',
        pointsRequired: 70,
        credentials: ['WRT', 'ASD Certification', '1+ Industry Association'],
        description: 'Advanced structural drying and moisture assessment capability.',
        colour: 'amber',
      },
      {
        level: 'NRPG Certified Expert',
        pointsRequired: 85,
        credentials: ['WRT', 'ASD', 'AMRT', '2+ Associations', 'Cert IV'],
        description: 'Full-spectrum water and microbial remediation expertise.',
        colour: 'orange',
      },
      {
        level: 'NRPG Certified Master',
        pointsRequired: 95,
        credentials: ['WRT', 'ASD', 'AMRT', '3+ Associations', 'Cert IV', '5+ Years'],
        description: 'Elite network member. Mentors associate contractors.',
        colour: 'gold',
      },
    ],
  },
  MOULD: {
    label: 'Mould Remediation',
    iicrcStandards: ['S520', 'S530', 'AMRT'],
    pathway: [
      {
        level: 'NRPG Associate',
        pointsRequired: 0,
        credentials: ['CARSI CSE', 'CARSI Mould Intro'],
        description: 'Foundation level — onboarding complete.',
        colour: 'zinc',
      },
      {
        level: 'NRPG Certified Specialist',
        pointsRequired: 60,
        credentials: ['AMRT Certification', 'IICRC S520'],
        description: 'Applied microbial remediation fundamentals.',
        colour: 'blue',
      },
      {
        level: 'NRPG Certified Professional',
        pointsRequired: 70,
        credentials: ['AMRT', 'IICRC S530', '1+ Association'],
        description: 'Full indoor environment assessment and containment.',
        colour: 'amber',
      },
      {
        level: 'NRPG Certified Expert',
        pointsRequired: 85,
        credentials: ['AMRT', 'WRT', 'S530', '2+ Associations', 'Cert IV'],
        description: 'Complex mould and co-occurring water damage expertise.',
        colour: 'orange',
      },
      {
        level: 'NRPG Certified Master',
        pointsRequired: 95,
        credentials: ['AMRT', 'WRT', 'ASD', '3+ Associations', 'Cert IV'],
        description: 'Elite remediator. Expert witness capable.',
        colour: 'gold',
      },
    ],
  },
  FIRE_SMOKE: {
    label: 'Fire & Smoke Restoration',
    iicrcStandards: ['S700', 'FSRT', 'OCT'],
    pathway: [
      { level: 'NRPG Associate', pointsRequired: 0, credentials: ['CARSI CSE'], description: 'Onboarding complete.', colour: 'zinc' },
      { level: 'NRPG Certified Specialist', pointsRequired: 60, credentials: ['FSRT', 'IICRC S700'], description: 'Fire and smoke damage fundamentals.', colour: 'blue' },
      { level: 'NRPG Certified Professional', pointsRequired: 70, credentials: ['FSRT', 'OCT', '1+ Association'], description: 'Advanced smoke residue and odour control.', colour: 'amber' },
      { level: 'NRPG Certified Expert', pointsRequired: 85, credentials: ['FSRT', 'OCT', 'WRT', '2+ Associations'], description: 'Multi-hazard restoration (fire + water).', colour: 'orange' },
      { level: 'NRPG Certified Master', pointsRequired: 95, credentials: ['FSRT', 'OCT', 'WRT', 'ASD', '3+ Associations', 'Cert IV'], description: 'Elite restorer. Structural and contents expertise.', colour: 'gold' },
    ],
  },
  TRAUMA: {
    label: 'Trauma & Biohazard Cleanup',
    iicrcStandards: ['S540'],
    pathway: [
      { level: 'NRPG Associate', pointsRequired: 0, credentials: ['CARSI CSE', 'CARSI Biohazard Intro'], description: 'Foundation — mandatory screening complete.', colour: 'zinc' },
      { level: 'NRPG Certified Specialist', pointsRequired: 60, credentials: ['IICRC S540', 'WHS Biohazard'], description: 'Core trauma and biohazard remediation.', colour: 'blue' },
      { level: 'NRPG Certified Professional', pointsRequired: 70, credentials: ['S540', 'Police Liaison', '1+ Association'], description: 'Complex trauma scenes, coroner coordination.', colour: 'amber' },
      { level: 'NRPG Certified Expert', pointsRequired: 85, credentials: ['S540', '2+ Associations', 'Cert IV'], description: 'Expert-level biohazard and chemical remediation.', colour: 'orange' },
      { level: 'NRPG Certified Master', pointsRequired: 95, credentials: ['S540', '3+ Associations', 'Cert IV', 'AHPRA liaison'], description: 'Elite — hospital and coroner certified.', colour: 'gold' },
    ],
  },
  CARPET: {
    label: 'Carpet & Upholstery Cleaning',
    iicrcStandards: ['S100', 'S300'],
    pathway: [
      { level: 'NRPG Associate', pointsRequired: 0, credentials: ['CARSI CSE'], description: 'Onboarding complete.', colour: 'zinc' },
      { level: 'NRPG Certified Specialist', pointsRequired: 60, credentials: ['IICRC S100', 'CCT'], description: 'Textile cleaning fundamentals.', colour: 'blue' },
      { level: 'NRPG Certified Professional', pointsRequired: 70, credentials: ['S100', 'S300', 'CCT'], description: 'Carpet and upholstery specialist.', colour: 'amber' },
      { level: 'NRPG Certified Expert', pointsRequired: 85, credentials: ['S100', 'S300', 'WRT', '2+ Associations'], description: 'Water-damaged textile recovery.', colour: 'orange' },
      { level: 'NRPG Certified Master', pointsRequired: 95, credentials: ['S100', 'S300', 'WRT', '3+ Associations', 'Cert IV'], description: 'Commercial specialist — large-scale projects.', colour: 'gold' },
    ],
  },
  COMMERCIAL: {
    label: 'Commercial Cleaning & Restoration',
    iicrcStandards: ['S400', 'S410'],
    pathway: [
      { level: 'NRPG Associate', pointsRequired: 0, credentials: ['CARSI CSE'], description: 'Onboarding complete.', colour: 'zinc' },
      { level: 'NRPG Certified Specialist', pointsRequired: 60, credentials: ['IICRC S400'], description: 'Commercial building cleaning fundamentals.', colour: 'blue' },
      { level: 'NRPG Certified Professional', pointsRequired: 70, credentials: ['S400', 'S410', '1+ Association'], description: 'Infection prevention and commercial restoration.', colour: 'amber' },
      { level: 'NRPG Certified Expert', pointsRequired: 85, credentials: ['S400', 'S410', 'WRT', '2+ Associations'], description: 'Complex commercial + water damage.', colour: 'orange' },
      { level: 'NRPG Certified Master', pointsRequired: 95, credentials: ['S400', 'S410', 'WRT', '3+ Associations', 'Cert IV'], description: 'Enterprise-level commercial contracts.', colour: 'gold' },
    ],
  },
  STORM: {
    label: 'Storm & Flood Damage',
    iicrcStandards: ['S500', 'WRT'],
    pathway: [
      { level: 'NRPG Associate', pointsRequired: 0, credentials: ['CARSI CSE', 'CARSI WRT Intro'], description: 'Foundation level.', colour: 'zinc' },
      { level: 'NRPG Certified Specialist', pointsRequired: 60, credentials: ['WRT', 'S500'], description: 'Storm water ingress and flood remediation.', colour: 'blue' },
      { level: 'NRPG Certified Professional', pointsRequired: 70, credentials: ['WRT', 'ASD', '1+ Association'], description: 'Structural drying post-storm.', colour: 'amber' },
      { level: 'NRPG Certified Expert', pointsRequired: 85, credentials: ['WRT', 'ASD', 'AMRT', '2+ Associations'], description: 'Large-scale storm event response.', colour: 'orange' },
      { level: 'NRPG Certified Master', pointsRequired: 95, credentials: ['WRT', 'ASD', 'AMRT', '3+ Associations', 'Cert IV'], description: 'SES/emergency services coordination.', colour: 'gold' },
    ],
  },
  GENERAL: {
    label: 'General Restoration',
    iicrcStandards: ['S500', 'WRT'],
    pathway: [
      { level: 'NRPG Associate', pointsRequired: 0, credentials: ['CARSI CSE', 'CARSI WRT Intro'], description: 'Foundation level.', colour: 'zinc' },
      { level: 'NRPG Certified Specialist', pointsRequired: 60, credentials: ['WRT', 'S500'], description: 'Core restoration fundamentals.', colour: 'blue' },
      { level: 'NRPG Certified Professional', pointsRequired: 70, credentials: ['WRT', '1+ Specialisation', '1+ Association'], description: 'Multi-service capability.', colour: 'amber' },
      { level: 'NRPG Certified Expert', pointsRequired: 85, credentials: ['2+ Specialisations', '2+ Associations', 'Cert IV'], description: 'Broad restoration expertise.', colour: 'orange' },
      { level: 'NRPG Certified Master', pointsRequired: 95, credentials: ['3+ Specialisations', '3+ Associations', 'Cert IV', '5+ Years'], description: 'Full-service restoration master.', colour: 'gold' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Colour map
// ---------------------------------------------------------------------------

const NODE_COLOURS: Record<string, { ring: string; bg: string; text: string; badge: string }> = {
  zinc:   { ring: 'border-zinc-700',   bg: 'bg-zinc-900',   text: 'text-zinc-400',   badge: 'bg-zinc-800 text-zinc-400' },
  blue:   { ring: 'border-blue-500/50', bg: 'bg-blue-950',   text: 'text-blue-300',   badge: 'bg-blue-900/50 text-blue-300' },
  amber:  { ring: 'border-amber-400/60', bg: 'bg-amber-950', text: 'text-amber-300', badge: 'bg-amber-900/40 text-amber-300' },
  orange: { ring: 'border-orange-400/60', bg: 'bg-orange-950', text: 'text-orange-300', badge: 'bg-orange-900/40 text-orange-300' },
  gold:   { ring: 'border-yellow-400/70', bg: 'bg-yellow-950', text: 'text-yellow-300', badge: 'bg-yellow-900/40 text-yellow-300' },
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export interface SpecialisationPathwayProps {
  specialisation: Specialisation;
  /** Current contractor certification points (0–100) */
  currentPoints?: number;
  className?: string;
}

export function SpecialisationPathway({
  specialisation,
  currentPoints = 0,
  className,
}: SpecialisationPathwayProps) {
  const data = PATHWAYS[specialisation];
  if (!data) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <h3 className="text-sm font-bold text-white">{data.label}</h3>
        <div className="flex gap-1.5">
          {data.iicrcStandards.map((s) => (
            <span key={s} className="text-xs px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-full font-mono">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Points bar */}
      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(currentPoints, 100)}%` }}
        />
        {data.pathway.slice(1).map((node) => (
          <div
            key={node.level}
            className="absolute top-0 w-px h-full bg-zinc-600"
            style={{ left: `${node.pointsRequired}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-zinc-600">
        <span>0 pts</span>
        <span className="text-amber-400 font-bold">{currentPoints} pts</span>
        <span>100 pts</span>
      </div>

      {/* Pathway nodes */}
      <div className="space-y-3">
        {data.pathway.map((node) => {
          const achieved = currentPoints >= node.pointsRequired;
          const colours = NODE_COLOURS[node.colour] ?? NODE_COLOURS.zinc;
          return (
            <div
              key={node.level}
              className={cn(
                'border rounded-lg p-4 transition-all',
                achieved ? colours.ring : 'border-zinc-800',
                achieved ? colours.bg : 'bg-zinc-950/50',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('text-sm font-semibold', achieved ? colours.text : 'text-zinc-600')}>
                      {node.level}
                    </span>
                    {achieved && (
                      <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                        Achieved
                      </span>
                    )}
                  </div>
                  <p className={cn('text-xs mb-2', achieved ? 'text-zinc-400' : 'text-zinc-600')}>
                    {node.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {node.credentials.map((c) => (
                      <span key={c} className={cn('text-xs px-2 py-0.5 rounded border font-mono', achieved ? colours.badge : 'bg-zinc-900 text-zinc-600 border-zinc-800')}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={cn('text-lg font-bold font-mono', achieved ? colours.text : 'text-zinc-700')}>
                    {node.pointsRequired}
                  </span>
                  <span className="text-xs text-zinc-600 block">pts</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pathway selector — show all specialisations
// ---------------------------------------------------------------------------

export function SpecialisationPathwaySummary({
  currentSpecialisation,
  currentPoints = 0,
  className,
}: {
  currentSpecialisation?: Specialisation;
  currentPoints?: number;
  className?: string;
}) {
  const [selected, setSelected] = React.useState<Specialisation>(
    currentSpecialisation ?? 'WATER_DAMAGE',
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PATHWAYS) as Specialisation[]).map((s) => (
          <button
            key={s}
            onClick={() => setSelected(s)}
            className={cn(
              'text-xs px-3 py-1.5 rounded-md border transition-colors',
              selected === s
                ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                : 'border-zinc-800 text-zinc-500 hover:border-zinc-600',
            )}
          >
            {PATHWAYS[s].label}
          </button>
        ))}
      </div>
      <SpecialisationPathway
        specialisation={selected}
        currentPoints={selected === currentSpecialisation ? currentPoints : 0}
      />
    </div>
  );
}

export { PATHWAYS };
