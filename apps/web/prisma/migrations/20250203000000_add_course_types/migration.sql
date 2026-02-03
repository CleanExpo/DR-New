-- Migration: Add Course Type Support for CSE/WRT Integration
-- Created: 2026-02-03
-- Purpose: Support NRPG, CSE, and WRT course types in training progress

-- ============================================================================
-- STEP 1: Create Course Type Enum
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'coursetype') THEN
        CREATE TYPE "CourseType" AS ENUM ('NRPG', 'CSE', 'WRT');
    END IF;
END$$;

-- ============================================================================
-- STEP 2: Add courseType column to nRPGTrainingProgress
-- ============================================================================

ALTER TABLE "nRPGTrainingProgress" 
ADD COLUMN IF NOT EXISTS "courseType" "CourseType" DEFAULT 'NRPG';

-- ============================================================================
-- STEP 3: Add courseType column to ContractorOnboarding
-- ============================================================================

ALTER TABLE "ContractorOnboarding" 
ADD COLUMN IF NOT EXISTS "courseType" "CourseType" DEFAULT 'NRPG';

-- ============================================================================
-- STEP 4: Create index for course type queries
-- ============================================================================

CREATE INDEX IF NOT EXISTS "idx_training_progress_course_type" 
ON "nRPGTrainingProgress"("courseType");

CREATE INDEX IF NOT EXISTS "idx_contractor_onboarding_course_type" 
ON "ContractorOnboarding"("courseType");

-- ============================================================================
-- STEP 5: Create combined index for contractor + course type lookups
-- ============================================================================

CREATE INDEX IF NOT EXISTS "idx_training_progress_contractor_course" 
ON "nRPGTrainingProgress"("contractorId", "courseType");

-- ============================================================================
-- STEP 6: Add certification level tracking
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'certificationlevel') THEN
        CREATE TYPE "CertificationLevel" AS ENUM ('NONE', 'BRONZE', 'SILVER', 'GOLD');
    END IF;
END$$;

ALTER TABLE "ContractorOnboarding" 
ADD COLUMN IF NOT EXISTS "certificationLevel" "CertificationLevel" DEFAULT 'NONE';

CREATE INDEX IF NOT EXISTS "idx_contractor_certification_level" 
ON "ContractorOnboarding"("certificationLevel");

-- ============================================================================
-- STEP 7: Create module completion tracking for all courses
-- ============================================================================

-- Table to track which modules are required for each certification level
CREATE TABLE IF NOT EXISTS "CertificationRequirements" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "certificationLevel" "CertificationLevel" NOT NULL,
    "courseType" "CourseType" NOT NULL,
    "moduleId" TEXT NOT NULL,
    "isRequired" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("certificationLevel", "courseType", "moduleId")
);

-- ============================================================================
-- STEP 8: Insert default certification requirements
-- ============================================================================

-- Bronze certification: Basic NRPG + CSE modules
INSERT INTO "CertificationRequirements" ("certificationLevel", "courseType", "moduleId", "isRequired")
VALUES 
    ('BRONZE', 'NRPG', 'NRP-001', true),
    ('BRONZE', 'NRPG', 'NRP-002', true),
    ('BRONZE', 'NRPG', 'NRP-003', true),
    ('BRONZE', 'CSE', 'CSE-M01', true),
    ('BRONZE', 'CSE', 'CSE-M02', true)
ON CONFLICT ("certificationLevel", "courseType", "moduleId") DO NOTHING;

-- Silver certification: Bronze + additional CSE + WRT basics
INSERT INTO "CertificationRequirements" ("certificationLevel", "courseType", "moduleId", "isRequired")
VALUES 
    ('SILVER', 'NRPG', 'NRP-004', true),
    ('SILVER', 'NRPG', 'NRP-005', true),
    ('SILVER', 'CSE', 'CSE-M03', true),
    ('SILVER', 'CSE', 'CSE-M04', true),
    ('SILVER', 'CSE', 'CSE-M05', true),
    ('SILVER', 'WRT', 'WRT-M01', true),
    ('SILVER', 'WRT', 'WRT-M02', true)
ON CONFLICT ("certificationLevel", "courseType", "moduleId") DO NOTHING;

-- Gold certification: Silver + advanced WRT
INSERT INTO "CertificationRequirements" ("certificationLevel", "courseType", "moduleId", "isRequired")
VALUES 
    ('GOLD', 'NRPG', 'NRP-006', true),
    ('GOLD', 'NRPG', 'NRP-007', true),
    ('GOLD', 'CSE', 'CSE-M06', true),
    ('GOLD', 'CSE', 'CSE-M07', true),
    ('GOLD', 'CSE', 'CSE-M08', true),
    ('GOLD', 'WRT', 'WRT-M03', true),
    ('GOLD', 'WRT', 'WRT-M04', true),
    ('GOLD', 'WRT', 'WRT-M05', true)
ON CONFLICT ("certificationLevel", "courseType", "moduleId") DO NOTHING;

-- ============================================================================
-- STEP 9: Create view for certification progress
-- ============================================================================

CREATE OR REPLACE VIEW "ContractorCertificationProgress" AS
SELECT 
    c.id as "contractorId",
    c."certificationLevel",
    cr."certificationLevel" as "targetLevel",
    cr."courseType",
    cr."moduleId",
    cr."isRequired",
    CASE 
        WHEN tp.status = 'COMPLETED' THEN true 
        ELSE false 
    END as "isCompleted",
    tp."bestQuizScore",
    tp."completedAt"
FROM "ContractorOnboarding" c
CROSS JOIN "CertificationRequirements" cr
LEFT JOIN "nRPGTrainingProgress" tp 
    ON c.id = tp."contractorId" 
    AND cr."moduleId" = tp."moduleId"
WHERE cr."isRequired" = true;

-- ============================================================================
-- STEP 10: Add trigger to auto-update certification level
-- ============================================================================

CREATE OR REPLACE FUNCTION update_certification_level()
RETURNS TRIGGER AS $$
DECLARE
    bronze_complete BOOLEAN;
    silver_complete BOOLEAN;
    gold_complete BOOLEAN;
BEGIN
    -- Check Bronze requirements
    SELECT COUNT(*) = 0 INTO bronze_complete
    FROM "CertificationRequirements" cr
    LEFT JOIN "nRPGTrainingProgress" tp 
        ON cr."moduleId" = tp."moduleId" 
        AND tp."contractorId" = NEW."contractorId"
    WHERE cr."certificationLevel" = 'BRONZE' 
        AND cr."isRequired" = true
        AND (tp.status IS NULL OR tp.status != 'COMPLETED');

    -- Check Silver requirements
    SELECT COUNT(*) = 0 INTO silver_complete
    FROM "CertificationRequirements" cr
    LEFT JOIN "nRPGTrainingProgress" tp 
        ON cr."moduleId" = tp."moduleId" 
        AND tp."contractorId" = NEW."contractorId"
    WHERE cr."certificationLevel" = 'SILVER' 
        AND cr."isRequired" = true
        AND (tp.status IS NULL OR tp.status != 'COMPLETED');

    -- Check Gold requirements
    SELECT COUNT(*) = 0 INTO gold_complete
    FROM "CertificationRequirements" cr
    LEFT JOIN "nRPGTrainingProgress" tp 
        ON cr."moduleId" = tp."moduleId" 
        AND tp."contractorId" = NEW."contractorId"
    WHERE cr."certificationLevel" = 'GOLD' 
        AND cr."isRequired" = true
        AND (tp.status IS NULL OR tp.status != 'COMPLETED');

    -- Update certification level
    IF gold_complete THEN
        UPDATE "ContractorOnboarding" 
        SET "certificationLevel" = 'GOLD' 
        WHERE id = NEW."contractorId";
    ELSIF silver_complete THEN
        UPDATE "ContractorOnboarding" 
        SET "certificationLevel" = 'SILVER' 
        WHERE id = NEW."contractorId";
    ELSIF bronze_complete THEN
        UPDATE "ContractorOnboarding" 
        SET "certificationLevel" = 'BRONZE' 
        WHERE id = NEW."contractorId";
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS trg_update_certification ON "nRPGTrainingProgress";

-- Create trigger
CREATE TRIGGER trg_update_certification
    AFTER INSERT OR UPDATE ON "nRPGTrainingProgress"
    FOR EACH ROW
    EXECUTE FUNCTION update_certification_level();

-- ============================================================================
-- STEP 11: Migration complete
-- ============================================================================

COMMENT ON TABLE "CertificationRequirements" IS 'Defines which modules are required for each certification level';
COMMENT ON COLUMN "ContractorOnboarding"."certificationLevel" IS 'Current certification level: NONE, BRONZE, SILVER, GOLD';
COMMENT ON COLUMN "nRPGTrainingProgress"."courseType" IS 'Course type: NRPG, CSE, or WRT';
