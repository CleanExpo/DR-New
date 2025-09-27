#!/usr/bin/env node

/**
 * Airtable Connection Test Script
 * Run with: node scripts/test-airtable-connection.js
 */

require('dotenv').config({ path: '.env.local' });

const REQUIRED_ENV_VARS = [
  'AIRTABLE_ACCESS_TOKEN',
  'AIRTABLE_BASE_ID',
  'AIRTABLE_LEADS_TABLE',
  'AIRTABLE_CAMPAIGNS_TABLE',
  'AIRTABLE_CONTACTS_TABLE'
];

async function testAirtableConnection() {
  console.log('🧪 Testing Airtable Connection...\n');

  // Check environment variables
  console.log('📋 Checking Environment Variables:');
  const missingVars = [];

  REQUIRED_ENV_VARS.forEach(varName => {
    const value = process.env[varName];
    if (!value || value.includes('your_')) {
      missingVars.push(varName);
      console.log(`❌ ${varName}: Not set or placeholder value`);
    } else {
      const maskedValue = varName.includes('TOKEN') ?
        value.substring(0, 8) + '...' : value;
      console.log(`✅ ${varName}: ${maskedValue}`);
    }
  });

  if (missingVars.length > 0) {
    console.log('\n🚨 Missing required environment variables!');
    console.log('Please update your .env.local file with your actual Airtable credentials.');
    console.log('See AIRTABLE_SETUP.md for detailed instructions.');
    return;
  }

  console.log('\n🌐 Testing API Connection:');

  try {
    // Test basic API connectivity
    const baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
    const headers = {
      'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };

    // Test fetching leads table
    console.log('📊 Testing Leads table access...');
    const leadsResponse = await fetch(`${baseUrl}/${encodeURIComponent(process.env.AIRTABLE_LEADS_TABLE)}?maxRecords=1`, {
      headers
    });

    if (!leadsResponse.ok) {
      const errorData = await leadsResponse.text();
      console.log(`❌ Leads table error (${leadsResponse.status}):`, errorData);
    } else {
      const leadsData = await leadsResponse.json();
      console.log(`✅ Leads table: Connected (${leadsData.records?.length || 0} records found)`);
    }

    // Test fetching campaigns table
    console.log('📈 Testing Campaigns table access...');
    const campaignsResponse = await fetch(`${baseUrl}/${encodeURIComponent(process.env.AIRTABLE_CAMPAIGNS_TABLE)}?maxRecords=1`, {
      headers
    });

    if (!campaignsResponse.ok) {
      const errorData = await campaignsResponse.text();
      console.log(`❌ Campaigns table error (${campaignsResponse.status}):`, errorData);
    } else {
      const campaignsData = await campaignsResponse.json();
      console.log(`✅ Campaigns table: Connected (${campaignsData.records?.length || 0} records found)`);
    }

    // Test fetching contacts table
    console.log('👥 Testing Contacts table access...');
    const contactsResponse = await fetch(`${baseUrl}/${encodeURIComponent(process.env.AIRTABLE_CONTACTS_TABLE)}?maxRecords=1`, {
      headers
    });

    if (!contactsResponse.ok) {
      const errorData = await contactsResponse.text();
      console.log(`❌ Contacts table error (${contactsResponse.status}):`, errorData);
    } else {
      const contactsData = await contactsResponse.json();
      console.log(`✅ Contacts table: Connected (${contactsData.records?.length || 0} records found)`);
    }

    console.log('\n🎉 Airtable connection test completed!');
    console.log('\nNext steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Visit http://localhost:3000/crm to see the CRM dashboard');
    console.log('3. Try creating a test lead to verify data sync');

  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your Airtable Personal Access Token');
    console.log('2. Verify your Base ID is correct');
    console.log('3. Ensure table names match exactly (case-sensitive)');
    console.log('4. Check your internet connection');
  }
}

// Add fetch polyfill for Node.js if needed
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

testAirtableConnection().catch(console.error);