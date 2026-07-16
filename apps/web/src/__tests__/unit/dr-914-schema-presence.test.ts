/**
 * @jest-environment node
 *
 * DR-914 Evidence Audit — verification ledger (runnable form)
 *
 * Cross-checks the two suspect "Done" tickets in the DR-NRPG Contractor Go-Live
 * project against the code surfaces (Prisma schema + baseline migration) that
 * back the "exists in prod DB" claims. These claims were labelled
 * `unverified-complete`; this test converts the manual audit into a regression
 * guard so a future schema edit that drops any asserted table/column fails CI.
 *
 * DR-863 — Assert the 9 contractor/NRPG lifecycle tables exist.
 * DR-864 — Assert previously-missing columns exist (User.lockedUntil,
 *          payout-settings fields).
 *
 * The tests read the schema/migration from disk (no live DB) and assert
 * presence at both the ORM layer (schema.prisma) and the DDL layer
 * (00000000000000_init_baseline/migration.sql — what actually creates the
 * prod tables).
 */

import { readFileSync } from 'fs'
import { join } from 'path'

const PRISMA_DIR = join(__dirname, '../../../prisma')
const schema = readFileSync(join(PRISMA_DIR, 'schema.prisma'), 'utf8')
const migration = readFileSync(
  join(PRISMA_DIR, 'migrations/00000000000000_init_baseline/migration.sql'),
  'utf8',
)

// DR-863: Prisma model -> actual relname (resolved via introspection of @@map;
// models without an @@map keep their PascalCase model name as the table name).
const DR863_MODELS: Record<string, string> = {
  Contractor: 'Contractor',
  ContractorOnboarding: 'contractor_onboarding',
  NRPGOnboardingPhase: 'nrpg_onboarding_phases',
  NRPGCommitment: 'nrpg_commitments',
  NRPGTrainingProgress: 'nrpg_training_progress',
  ContractorModuleProgress: 'contractor_module_progress',
  ContractorAssessment: 'contractor_assessments',
  ContractorDocument: 'ContractorDocument',
  ContractorVerificationHistory: 'ContractorVerificationHistory',
}

describe('DR-863 — 9 contractor/NRPG lifecycle tables exist', () => {
  it.each(Object.keys(DR863_MODELS))(
    'schema.prisma declares model %s',
    (model) => {
      expect(schema).toMatch(new RegExp(`^model ${model} \\{`, 'm'))
    },
  )

  it.each(Object.entries(DR863_MODELS))(
    'baseline migration creates the table for %s (%s)',
    (_model, table) => {
      expect(migration).toMatch(
        new RegExp(`CREATE TABLE "${table}" \\(`),
      )
    },
  )
})

// DR-864: previously-missing columns. Format: [label, model, column].
// User.lockedUntil + the account-lockout companion column, and the
// payout-settings fields (Stripe Connect) that live on the ContractorProfile
// (contractor_profiles) surface.
const DR864_COLUMNS: Array<[string, string, string]> = [
  ['User.lockedUntil', 'User', 'lockedUntil'],
  ['User.failedLoginAttempts', 'User', 'failedLoginAttempts'],
  ['payout-settings.stripeConnectAccountId', 'contractor_profiles', 'stripeConnectAccountId'],
  ['payout-settings.stripePayoutsEnabled', 'contractor_profiles', 'stripePayoutsEnabled'],
]

/** Slice a model's body out of schema.prisma (from `model X {` to the next `}`). */
function modelBody(modelName: string): string {
  const start = schema.search(new RegExp(`^model ${modelName} \\{`, 'm'))
  if (start === -1) return ''
  const end = schema.indexOf('\n}', start)
  return schema.slice(start, end === -1 ? undefined : end)
}

describe('DR-864 — previously-missing columns exist', () => {
  it.each(DR864_COLUMNS)('schema.prisma declares %s', (_label, model, column) => {
    // contractor_profiles is the relname; its Prisma model is ContractorProfile.
    const modelName = model === 'contractor_profiles' ? 'ContractorProfile' : model
    const body = modelBody(modelName)
    expect(body).not.toBe('')
    expect(body).toMatch(new RegExp(`\\b${column}\\b`))
  })

  it.each(DR864_COLUMNS)(
    'baseline migration includes column %s',
    (_label, _model, column) => {
      expect(migration).toMatch(new RegExp(`"${column}"`))
    },
  )
})
