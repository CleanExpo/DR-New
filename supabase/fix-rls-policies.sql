-- ============================================================================
-- FIX RLS POLICIES - Correct camelCase Column Names
-- ============================================================================
-- Run this in Supabase SQL Editor
--
-- Issue: Prisma uses camelCase column names (workspaceId, userId)
-- PostgreSQL requires double quotes for camelCase: "workspaceId"
-- ============================================================================

-- First, let's see what policies exist (for debugging)
SELECT tablename, policyname, cmd, qual::text
FROM pg_policies
WHERE tablename IN ('workspaces', 'workspace_members', 'contractor_rotation', 'workspace_audit_logs', 'User');

-- ============================================================================
-- DROP ALL EXISTING POLICIES (clean slate)
-- ============================================================================

-- Workspace Members
DROP POLICY IF EXISTS "Users can view their workspace members" ON workspace_members;
DROP POLICY IF EXISTS "Users can view workspace members" ON workspace_members;
DROP POLICY IF EXISTS "Workspace members are viewable by workspace members" ON workspace_members;
DROP POLICY IF EXISTS "workspace_members_select" ON workspace_members;
DROP POLICY IF EXISTS "workspace_members_insert" ON workspace_members;
DROP POLICY IF EXISTS "workspace_members_update" ON workspace_members;
DROP POLICY IF EXISTS "workspace_members_delete" ON workspace_members;

-- Workspaces
DROP POLICY IF EXISTS "Users can view their workspaces" ON workspaces;
DROP POLICY IF EXISTS "Owners can manage workspaces" ON workspaces;
DROP POLICY IF EXISTS "workspaces_select" ON workspaces;
DROP POLICY IF EXISTS "workspaces_insert" ON workspaces;
DROP POLICY IF EXISTS "workspaces_update" ON workspaces;
DROP POLICY IF EXISTS "workspaces_delete" ON workspaces;

-- Contractor Rotation
DROP POLICY IF EXISTS "contractor_rotation_select" ON contractor_rotation;
DROP POLICY IF EXISTS "contractor_rotation_insert" ON contractor_rotation;
DROP POLICY IF EXISTS "contractor_rotation_update" ON contractor_rotation;
DROP POLICY IF EXISTS "contractor_rotation_delete" ON contractor_rotation;

-- Workspace Audit Logs
DROP POLICY IF EXISTS "workspace_audit_logs_select" ON workspace_audit_logs;
DROP POLICY IF EXISTS "workspace_audit_logs_insert" ON workspace_audit_logs;

-- ============================================================================
-- ENABLE RLS ON TABLES
-- ============================================================================

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_rotation ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- WORKSPACE MEMBERS POLICIES
-- ============================================================================

-- SELECT: Users can view members of workspaces they belong to
CREATE POLICY "workspace_members_select" ON workspace_members
FOR SELECT USING (
  "userId" = auth.uid()::text
  OR "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
  )
);

-- INSERT: Only workspace owners/managers can add members
CREATE POLICY "workspace_members_insert" ON workspace_members
FOR INSERT WITH CHECK (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role IN ('OWNER', 'MANAGER')
  )
);

-- UPDATE: Only workspace owners/managers can update members
CREATE POLICY "workspace_members_update" ON workspace_members
FOR UPDATE USING (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role IN ('OWNER', 'MANAGER')
  )
);

-- DELETE: Only workspace owners can remove members
CREATE POLICY "workspace_members_delete" ON workspace_members
FOR DELETE USING (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role = 'OWNER'
  )
);

-- ============================================================================
-- WORKSPACES POLICIES
-- ============================================================================

-- SELECT: Users can view workspaces they are members of
CREATE POLICY "workspaces_select" ON workspaces
FOR SELECT USING (
  "ownerId" = auth.uid()::text
  OR id IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
  )
);

-- INSERT: Any authenticated user can create a workspace
CREATE POLICY "workspaces_insert" ON workspaces
FOR INSERT WITH CHECK (
  "ownerId" = auth.uid()::text
);

-- UPDATE: Only owners can update their workspace
CREATE POLICY "workspaces_update" ON workspaces
FOR UPDATE USING (
  "ownerId" = auth.uid()::text
);

-- DELETE: Only owners can delete their workspace
CREATE POLICY "workspaces_delete" ON workspaces
FOR DELETE USING (
  "ownerId" = auth.uid()::text
);

-- ============================================================================
-- CONTRACTOR ROTATION POLICIES
-- ============================================================================

-- SELECT: Workspace members can view their rotation data
CREATE POLICY "contractor_rotation_select" ON contractor_rotation
FOR SELECT USING (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
  )
);

-- INSERT: Workspace owners/managers can add rotation entries
CREATE POLICY "contractor_rotation_insert" ON contractor_rotation
FOR INSERT WITH CHECK (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role IN ('OWNER', 'MANAGER')
  )
);

-- UPDATE: Workspace owners/managers can update rotation
CREATE POLICY "contractor_rotation_update" ON contractor_rotation
FOR UPDATE USING (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role IN ('OWNER', 'MANAGER')
  )
);

-- DELETE: Workspace owners can delete rotation entries
CREATE POLICY "contractor_rotation_delete" ON contractor_rotation
FOR DELETE USING (
  "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role = 'OWNER'
  )
);

-- ============================================================================
-- WORKSPACE AUDIT LOGS POLICIES
-- ============================================================================

-- SELECT: Workspace members can view their audit logs
CREATE POLICY "workspace_audit_logs_select" ON workspace_audit_logs
FOR SELECT USING (
  "userId" = auth.uid()::text
  OR "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
    AND wm.role IN ('OWNER', 'MANAGER')
  )
);

-- INSERT: System can insert audit logs (via service role)
CREATE POLICY "workspace_audit_logs_insert" ON workspace_audit_logs
FOR INSERT WITH CHECK (
  "userId" = auth.uid()::text
  OR "workspaceId" IN (
    SELECT wm."workspaceId"
    FROM workspace_members wm
    WHERE wm."userId" = auth.uid()::text
  )
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check that policies were created correctly
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('workspaces', 'workspace_members', 'contractor_rotation', 'workspace_audit_logs')
ORDER BY tablename, policyname;

-- Test query (should work now)
-- SELECT * FROM workspace_members wm WHERE wm."workspaceId" IS NOT NULL LIMIT 1;
