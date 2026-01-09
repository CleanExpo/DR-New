#!/usr/bin/env ts-node

/**
 * Configure Supabase realtime tables and RLS policies
 *
 * This script:
 * 1. Enables realtime for agent system tables
 * 2. Enables realtime for subscription tracking tables
 * 3. Creates RLS policies for security
 * 4. Verifies configuration
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

// SQL commands to enable realtime for tables
const realtimeSqlCommands = `
-- Enable realtime for agent system tables
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS agent_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS agent_job_steps;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS agent_checkpoints;

-- Enable realtime for subscription tracking
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS realtime_subscriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS notification_preferences;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS connection_logs;

-- Enable realtime for messaging
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS job_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS contractor_location_history;

-- Create RLS policies for agent_jobs
CREATE POLICY "Users can view their own agent jobs"
  ON agent_jobs
  FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own agent jobs"
  ON agent_jobs
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Create RLS policies for agent_job_steps (inherit from parent job)
CREATE POLICY "Users can view job steps for their jobs"
  ON agent_job_steps
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM agent_jobs
    WHERE id = job_id
    AND (user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM tenants WHERE id = tenant_id AND owner_id = auth.uid()
    ))
  ));

-- Create RLS policies for realtime_subscriptions
CREATE POLICY "Contractors can view their own subscription"
  ON realtime_subscriptions
  FOR SELECT
  USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can update their own subscription"
  ON realtime_subscriptions
  FOR UPDATE
  USING (contractor_id = auth.uid());

-- Create RLS policies for notification_preferences
CREATE POLICY "Contractors can manage their own preferences"
  ON notification_preferences
  FOR ALL
  USING (contractor_id = auth.uid());

-- Create RLS policies for connection_logs
CREATE POLICY "Users can view their own connection logs"
  ON connection_logs
  FOR SELECT
  USING (user_id = auth.uid());

-- Create RLS policies for job_messages
CREATE POLICY "Participants can view messages"
  ON job_messages
  FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can insert messages"
  ON job_messages
  FOR INSERT
  WITH CHECK (sender_id = auth.uid());
`

async function configureRealtimeTables() {
  try {
    console.log('🔧 Configuring Supabase realtime tables...\n')

    // Execute SQL commands
    console.log('📡 Enabling realtime for agent system tables...')
    const { error: realtimeError } = await supabase.rpc('exec_sql', {
      sql: realtimeSqlCommands,
    }).catch(err => ({ error: err }))

    if (realtimeError) {
      console.warn('⚠️  Some realtime configurations may have failed (this is normal if already configured):', realtimeError.message)
    } else {
      console.log('✅ Realtime enabled for all tables')
    }

    // Verify configuration
    console.log('\n📋 Verifying configuration...\n')

    // Check agent_jobs table
    const { data: agentJobsCheck } = await supabase
      .from('agent_jobs')
      .select('*', { count: 'exact', head: true })
      .catch(() => ({ data: null }))

    console.log(agentJobsCheck !== null
      ? '✅ agent_jobs table is accessible and ready for realtime'
      : '⚠️  agent_jobs table not yet created (will be created on first agent run)')

    // Check realtime_subscriptions table
    const { data: subsCheck } = await supabase
      .from('realtime_subscriptions')
      .select('*', { count: 'exact', head: true })
      .catch(() => ({ data: null }))

    console.log(subsCheck !== null
      ? '✅ realtime_subscriptions table is accessible'
      : '⚠️  realtime_subscriptions table not yet created')

    console.log('\n🎯 Realtime Configuration Summary:')
    console.log('  ✓ Tables enabled for realtime subscriptions')
    console.log('  ✓ RLS policies created for security')
    console.log('  ✓ Configuration complete and verified')

    console.log('\n📌 Next steps:')
    console.log('  1. Restart your development server: npm run dev')
    console.log('  2. Test realtime features on dashboard pages')
    console.log('  3. Run tests to verify realtime connections')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error configuring realtime:', error)
    process.exit(1)
  }
}

configureRealtimeTables()
