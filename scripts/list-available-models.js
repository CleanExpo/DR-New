#!/usr/bin/env node

const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const fs = require('fs');

// Read API key
let GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const envMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
    if (envMatch) {
      GEMINI_API_KEY = envMatch[1].trim();
    }
  } catch (err) {
    console.error('❌ Could not read .env.local');
    process.exit(1);
  }
}

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found');
  process.exit(1);
}

async function listModels() {
  try {
    const client = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // List all available models
    const models = await client.listModels();
    
    console.log('📋 Available Gemini Models:\n');
    
    const modelList = [];
    for await (const model of models) {
      modelList.push(model.name.replace('models/', ''));
    }
    
    // Sort by version (newest first)
    const sorted = modelList.sort().reverse();
    
    console.log('Available models:');
    sorted.forEach((model, idx) => {
      console.log(`  ${idx + 1}. ${model}`);
    });
    
    console.log('\n✅ Latest model:', sorted[0]);
    
    return sorted[0];
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

listModels();
