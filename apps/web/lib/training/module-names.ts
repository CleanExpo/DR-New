/**
 * Client-safe module id -> human name mapping (DR-919).
 *
 * The checklist and training UI must never show a contractor a raw internal
 * module id ("cse-001", "NRP-007"). Names come from the same generated module
 * bank the training pipeline uses (all-modules-summary.json for CSE/WRT,
 * nrp-training-index.json for NRP-001..024) — no fs access, so this module is
 * importable from client components (unlike nrp-training.ts).
 */

import allModulesSummary from '../../src/lib/training/generated/all-modules-summary.json';
import nrpTrainingIndex from '../../src/lib/training/generated/nrp-training-index.json';

interface SummaryModule {
  moduleId: string;
  title: string;
}

interface IndexModule {
  moduleId: string;
  title: string;
}

function buildModuleNameMap(): Record<string, string> {
  const map: Record<string, string> = {};

  for (const mod of (allModulesSummary as { modulesList: SummaryModule[] }).modulesList) {
    map[mod.moduleId.toUpperCase()] = mod.title;
  }

  for (const mod of (nrpTrainingIndex as { modules: IndexModule[] }).modules) {
    // Index titles repeat the id ("NRP-002: Environmental Assessment & Testing")
    // and NRP-001 carries a "- Complete Training Module" suffix — strip both.
    const name = mod.title
      .replace(/^NRP-\d{3}:\s*/i, '')
      .replace(/\s*-\s*Complete Training Module$/i, '')
      .trim();
    if (name) map[mod.moduleId.toUpperCase()] = name;
  }

  // Course-level ids that appear as module ids in older onboarding rows.
  map['CSE-001'] = 'Customer Service Excellence';
  map['WRT-001'] = 'Water Damage Restoration';

  return map;
}

const MODULE_NAME_MAP: Record<string, string> = buildModuleNameMap();

/** Human name for a module id (case-insensitive), or null when unknown. */
export function getTrainingModuleName(moduleId: string): string | null {
  return MODULE_NAME_MAP[moduleId.trim().toUpperCase()] ?? null;
}

/** Human name for a module id, falling back to the raw id when unknown. */
export function formatTrainingModuleLabel(moduleId: string): string {
  return getTrainingModuleName(moduleId) ?? moduleId;
}
