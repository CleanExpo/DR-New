import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  console.log('🚀 Running global test setup...')

  // Start browser for initial setup if needed
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    // Check if development server is running
    const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000'

    console.log(`📡 Checking if server is running at ${baseURL}...`)

    try {
      await page.goto(baseURL, { timeout: 5000 })
      console.log('✅ Server is running')
    } catch (error) {
      console.log('⚠️  Server not running. Tests may fail.')
      console.log('   Please run: npm run dev')
    }

    // Additional setup tasks can go here
    // - Create test database
    // - Seed test data
    // - Setup test users
    // - Clear cache

    console.log('✅ Global setup complete')
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup
