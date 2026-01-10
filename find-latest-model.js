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
    process.exit(1);
  }
}

async function findLatestModel() {
  const client = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  console.log('📋 Fetching available Gemini models...\n');
  
  try {
    // Create a simple request to get models
    const response = await client.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContentStream('test');
    console.log('✅ API is responsive');
  } catch (e) {
    // This will likely fail but we're just checking connectivity
  }

  // Try to infer available models by attempting known names
  const modelCandidates = [
    'gemini-3-pro',
    'gemini-3.0-pro',
    'gemini-3-vision',
    'gemini-3-turbo',
    'gemini-2.5-pro-vision',
    'gemini-2.5-pro',
    'gemini-2.5-flash-preview',
    'gemini-2.5-flash',
    'gemini-pro',
  ];

  console.log('Testing model availability:\n');
  
  for (const modelName of modelCandidates) {
    try {
      const model = client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('test');
      console.log(`✅ ${modelName} - AVAILABLE`);
    } catch (error) {
      const msg = error.message || String(error);
      if (msg.includes('not found') || msg.includes('404')) {
        console.log(`❌ ${modelName} - Not found`);
      } else if (msg.includes('not supported')) {
        console.log(`⚠️  ${modelName} - Exists but not supported for generateContent`);
      } else {
        // Might be an API key issue or other error
        console.log(`?  ${modelName} - Error: ${msg.substring(0, 50)}...`);
      }
    }
  }
}

findLatestModel();
