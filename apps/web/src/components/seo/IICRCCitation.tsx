/**
 * IICRC Citation Components — DR-257
 *
 * Inline and block citations for IICRC standards on content pages.
 *
 * Usage:
 *   <IICRCCitation standard="S500" section="12.3" />
 *   → renders: "Per IICRC S500 §12.3"
 *
 *   <IICRCCitationBlock standard="S500" section="12.3">
 *     Water extraction must begin within 24–48 hours to prevent secondary damage.
 *   </IICRCCitationBlock>
 */

'use client';

import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Standard metadata
// ---------------------------------------------------------------------------

export type IICRCStandardCode = 'S500' | 'S520' | 'S530' | 'S540' | 'S700' | 'S800' | 'S900';

interface StandardMeta {
  name: string;
  topic: string;
  year: number;
  description: string;
}

const STANDARDS: Record<IICRCStandardCode, StandardMeta> = {
  S500: {
    name: 'IICRC S500',
    topic: 'Water Damage Restoration',
    year: 2015,
    description:
      'The international standard for assessment, classification, and restorative drying of water-damaged structures.',
  },
  S520: {
    name: 'IICRC S520',
    topic: 'Mould Remediation',
    year: 2015,
    description:
      'Defines professional mould remediation procedures including containment, removal, and post-remediation verification.',
  },
  S530: {
    name: 'IICRC S530',
    topic: 'Indoor Environment Assessment for Mould',
    year: 2022,
    description:
      'Governs assessment protocols for suspected mould-contaminated structures, including sampling methodologies.',
  },
  S540: {
    name: 'IICRC S540',
    topic: 'Trauma and Crime Scene Cleanup',
    year: 2009,
    description:
      'Sets standards for biohazard remediation, decontamination, and personal protective equipment requirements.',
  },
  S700: {
    name: 'IICRC S700',
    topic: 'Fire and Smoke Damage Restoration',
    year: 2015,
    description:
      'Covers fire damage assessment, smoke residue classification, cleaning procedures, and odour control.',
  },
  S800: {
    name: 'IICRC S800',
    topic: 'Textile Floor Coverings Inspection',
    year: 2012,
    description:
      'Standard for professional inspection of carpet and textile floor coverings.',
  },
  S900: {
    name: 'IICRC S900',
    topic: 'Drug Residue and Chemical Waste Remediation',
    year: 2023,
    description:
      'Governs professional remediation of methamphetamine precursors, drug residues, and associated chemical waste.',
  },
};

// ---------------------------------------------------------------------------
// Section display helper
// ---------------------------------------------------------------------------

function formatSection(section?: string): string {
  if (!section) return '';
  // Already has a prefix like "12.3" — return as §12.3
  return ` §${section}`;
}

// ---------------------------------------------------------------------------
// IICRCCitation — inline reference
// ---------------------------------------------------------------------------

export interface IICRCCitationProps {
  standard: IICRCStandardCode;
  /** Optional section reference, e.g. "12.3" or "4.2.1" */
  section?: string;
  /** Display variant */
  variant?: 'default' | 'subtle' | 'prominent';
  className?: string;
}

/**
 * Inline citation that renders "Per IICRC S500 §12.3" with a tooltip
 * showing full standard name + description.
 */
export function IICRCCitation({
  standard,
  section,
  variant = 'default',
  className,
}: IICRCCitationProps) {
  const meta = STANDARDS[standard];
  if (!meta) return null;

  const label = `Per ${meta.name}${formatSection(section)}`;

  const variantClasses: Record<NonNullable<IICRCCitationProps['variant']>, string> = {
    default:
      'inline-flex items-center gap-1 text-xs font-medium text-amber-400 border border-amber-400/30 bg-amber-400/8 rounded px-1.5 py-0.5 cursor-help hover:bg-amber-400/15 transition-colors',
    subtle:
      'inline text-xs text-amber-500/70 cursor-help hover:text-amber-400 transition-colors underline decoration-dotted',
    prominent:
      'inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 border border-amber-400/40 bg-amber-400/10 rounded-md px-2 py-1 cursor-help hover:bg-amber-400/20 transition-colors',
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn(variantClasses[variant], className)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3 w-3 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 bg-zinc-900 border border-zinc-700">
          <p className="text-xs font-bold text-amber-400 mb-1">
            {meta.name} ({meta.year}) — {meta.topic}
          </p>
          <p className="text-xs text-zinc-300">{meta.description}</p>
          {section && (
            <p className="text-xs text-zinc-500 mt-2">Section {section}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ---------------------------------------------------------------------------
// IICRCCitationBlock — callout / blockquote style
// ---------------------------------------------------------------------------

export interface IICRCCitationBlockProps {
  standard: IICRCStandardCode;
  section?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Block-level callout. Wrap a quoted statement with full citation footer.
 *
 * Example:
 *   <IICRCCitationBlock standard="S500" section="12.3">
 *     Category 3 water damage requires immediate containment and may require
 *     occupant relocation during remediation.
 *   </IICRCCitationBlock>
 */
export function IICRCCitationBlock({
  standard,
  section,
  children,
  className,
}: IICRCCitationBlockProps) {
  const meta = STANDARDS[standard];
  if (!meta) return null;

  const cite = section
    ? `${meta.name} §${section} — ${meta.topic}`
    : `${meta.name} — ${meta.topic}`;

  return (
    <blockquote
      className={cn(
        'relative border-l-2 border-amber-400/60 bg-amber-400/5 pl-4 pr-4 py-3 rounded-r-md my-4',
        className,
      )}
    >
      <p className="text-sm text-zinc-200 leading-relaxed">{children}</p>
      <footer className="mt-2 flex items-center gap-1.5 text-xs text-amber-400/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-3 w-3 shrink-0"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <cite className="not-italic">{cite}</cite>
      </footer>
    </blockquote>
  );
}

// ---------------------------------------------------------------------------
// IICRCCitationList — renders a reference list at page bottom
// ---------------------------------------------------------------------------

export interface IICRCCitationListProps {
  standards: IICRCStandardCode[];
  className?: string;
}

/**
 * Renders a "References" section listing all IICRC standards cited on the page.
 * Place at the bottom of service pages.
 */
export function IICRCCitationList({ standards, className }: IICRCCitationListProps) {
  const unique = [...new Set(standards)];

  return (
    <aside
      className={cn(
        'border border-zinc-800 rounded-md p-4 bg-zinc-900/50 text-xs text-zinc-400',
        className,
      )}
      aria-label="IICRC Standards References"
    >
      <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-3">
        Industry Standards Referenced
      </h3>
      <ul className="space-y-1.5">
        {unique.map((code) => {
          const meta = STANDARDS[code];
          if (!meta) return null;
          return (
            <li key={code} className="flex gap-2">
              <span className="font-mono text-amber-400 shrink-0 w-12">{code}</span>
              <span>
                <span className="text-zinc-200">{meta.topic}</span>
                {' '}
                <span className="text-zinc-500">({meta.name}, {meta.year})</span>
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Re-export standard metadata for external use
// ---------------------------------------------------------------------------

export { STANDARDS };
export type { StandardMeta };
