// Analytics API Testing Suite
// This file demonstrates how to interact with the analytics API endpoints

import { generateToken, createMockUser } from '@/lib/middleware/auth';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Test users for different roles
const testUsers = {
  admin: createMockUser({
    id: 'admin-001',
    email: 'admin@disasterrecovery.com.au',
    role: 'ADMIN'
  }),
  manager: createMockUser({
    id: 'manager-001',
    email: 'manager@disasterrecovery.com.au',
    role: 'MANAGER'
  }),
  operator: createMockUser({
    id: 'operator-001',
    email: 'operator@disasterrecovery.com.au',
    role: 'OPERATOR'
  }),
  contractor: createMockUser({
    id: 'contractor-001',
    email: 'contractor@disasterrecovery.com.au',
    role: 'CONTRACTOR'
  }),
  viewer: createMockUser({
    id: 'viewer-001',
    email: 'viewer@disasterrecovery.com.au',
    role: 'VIEWER'
  })
};

// Helper function to make API requests
async function makeApiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string
) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return response.json();
}

// Test Dashboard Metrics API
export async function testDashboardMetrics() {
  console.log('\n=== Testing Dashboard Metrics API ===');

  const token = generateToken(testUsers.admin);

  // Test basic dashboard metrics
  const metrics = await makeApiRequest(
    '/api/analytics/dashboard',
    'GET',
    undefined,
    token
  );

  console.log('Dashboard Metrics:', JSON.stringify(metrics, null, 2));

  // Test with date range
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 30);
  const dateTo = new Date();

  const metricsWithDates = await makeApiRequest(
    `/api/analytics/dashboard?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`,
    'GET',
    undefined,
    token
  );

  console.log('Metrics with date range:', JSON.stringify(metricsWithDates, null, 2));

  return { metrics, metricsWithDates };
}

// Test Revenue Analytics API
export async function testRevenueAnalytics() {
  console.log('\n=== Testing Revenue Analytics API ===');

  const token = generateToken(testUsers.manager);

  // Test different periods
  const periods = ['day', 'week', 'month', 'quarter', 'year'];

  for (const period of periods) {
    const revenue = await makeApiRequest(
      `/api/analytics/revenue?period=${period}`,
      'GET',
      undefined,
      token
    );

    console.log(`Revenue for ${period}:`, JSON.stringify(revenue.data?.total, null, 2));
  }

  // Test with groupBy parameter
  const groupedRevenue = await makeApiRequest(
    '/api/analytics/revenue?period=month&groupBy=service',
    'GET',
    undefined,
    token
  );

  console.log('Revenue grouped by service:', JSON.stringify(groupedRevenue, null, 2));

  // Test with forecasts (admin only)
  const adminToken = generateToken(testUsers.admin);
  const revenueWithForecasts = await makeApiRequest(
    '/api/analytics/revenue?period=month&includeForecasts=true',
    'GET',
    undefined,
    adminToken
  );

  console.log('Revenue with forecasts:', JSON.stringify(revenueWithForecasts, null, 2));

  return { groupedRevenue, revenueWithForecasts };
}

// Test Contractor Performance API
export async function testContractorPerformance() {
  console.log('\n=== Testing Contractor Performance API ===');

  const token = generateToken(testUsers.manager);

  // Test different sort options
  const sortOptions = ['rating', 'completionRate', 'responseTime', 'revenue'];

  for (const sortBy of sortOptions) {
    const contractors = await makeApiRequest(
      `/api/analytics/contractors?sortBy=${sortBy}`,
      'GET',
      undefined,
      token
    );

    console.log(`Contractors sorted by ${sortBy}:`, contractors.data?.length, 'contractors');
  }

  // Test with filters
  const filteredContractors = await makeApiRequest(
    '/api/analytics/contractors?minRating=4.5&active=true',
    'GET',
    undefined,
    token
  );

  console.log('Filtered contractors:', JSON.stringify(filteredContractors, null, 2));

  // Test contractor view (contractor can only see their own data)
  const contractorToken = generateToken(testUsers.contractor);
  const ownPerformance = await makeApiRequest(
    '/api/analytics/contractors',
    'GET',
    undefined,
    contractorToken
  );

  console.log('Contractor own performance:', JSON.stringify(ownPerformance, null, 2));

  return { filteredContractors, ownPerformance };
}

// Test Job Metrics API
export async function testJobMetrics() {
  console.log('\n=== Testing Job Metrics API ===');

  const token = generateToken(testUsers.operator);

  // Test basic job metrics
  const jobMetrics = await makeApiRequest(
    '/api/analytics/jobs',
    'GET',
    undefined,
    token
  );

  console.log('Job Metrics:', JSON.stringify(jobMetrics.data?.totalJobs, null, 2));
  console.log('Completion Rate:', JSON.stringify(jobMetrics.data?.completionRate, null, 2));

  // Test with filters
  const filteredMetrics = await makeApiRequest(
    '/api/analytics/jobs?serviceTypes=Water%20Damage,Fire%20Damage&priorities=EMERGENCY,HIGH',
    'GET',
    undefined,
    token
  );

  console.log('Filtered job metrics:', JSON.stringify(filteredMetrics, null, 2));

  // Test with date range
  const dateFrom = new Date();
  dateFrom.setMonth(dateFrom.getMonth() - 3);
  const dateTo = new Date();

  const metricsWithDates = await makeApiRequest(
    `/api/analytics/jobs?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}&includeDelayed=true`,
    'GET',
    undefined,
    token
  );

  console.log('Job metrics with date range and delayed jobs:', JSON.stringify(metricsWithDates, null, 2));

  return { jobMetrics, filteredMetrics, metricsWithDates };
}

// Test Report Export API
export async function testReportExport() {
  console.log('\n=== Testing Report Export API ===');

  const token = generateToken(testUsers.manager);

  // Get available report types
  const reportTypes = await makeApiRequest(
    '/api/analytics/reports/export',
    'GET',
    undefined,
    token
  );

  console.log('Available report types:', JSON.stringify(reportTypes, null, 2));

  // Export financial report as JSON
  const dateFrom = new Date();
  dateFrom.setMonth(dateFrom.getMonth() - 1);
  const dateTo = new Date();

  const financialReport = await makeApiRequest(
    '/api/analytics/reports/export',
    'POST',
    {
      type: 'financial',
      format: 'json',
      dateRange: {
        from: dateFrom.toISOString(),
        to: dateTo.toISOString()
      },
      filters: {
        serviceTypes: ['Water Damage', 'Fire Damage'],
        locations: ['Brisbane CBD', 'Ipswich']
      }
    },
    token
  );

  console.log('Financial report exported:', JSON.stringify(financialReport.meta, null, 2));

  // Export operational report as CSV
  const operationalReport = await makeApiRequest(
    '/api/analytics/reports/export',
    'POST',
    {
      type: 'operational',
      format: 'csv',
      dateRange: {
        from: dateFrom.toISOString(),
        to: dateTo.toISOString()
      }
    },
    token
  );

  console.log('Operational report exported as CSV');

  return { reportTypes, financialReport };
}

// Test Real-time Analytics Stream
export async function testRealtimeStream() {
  console.log('\n=== Testing Real-time Analytics Stream ===');

  const token = generateToken(testUsers.viewer);

  // Create EventSource for SSE
  if (typeof window !== 'undefined') {
    const eventSource = new EventSource(
      `${API_BASE_URL}/api/analytics/realtime`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } as any // EventSource doesn't support headers in standard API
    );

    eventSource.addEventListener('connected', (event) => {
      console.log('Connected to real-time stream:', event.data);
    });

    eventSource.addEventListener('metrics', (event) => {
      const data = JSON.parse(event.data);
      console.log('Real-time metrics update:', data);
    });

    eventSource.addEventListener('alert', (event) => {
      const data = JSON.parse(event.data);
      console.log('System alert:', data);
    });

    eventSource.addEventListener('error', (event) => {
      console.error('Stream error:', event);
      eventSource.close();
    });

    // Close after 30 seconds
    setTimeout(() => {
      eventSource.close();
      console.log('Real-time stream closed');
    }, 30000);
  } else {
    console.log('Real-time stream testing requires browser environment');
  }
}

// Run all tests
export async function runAllAnalyticsTests() {
  console.log('Starting Analytics API Test Suite...\n');

  try {
    await testDashboardMetrics();
    await testRevenueAnalytics();
    await testContractorPerformance();
    await testJobMetrics();
    await testReportExport();
    // testRealtimeStream(); // Uncomment in browser environment

    console.log('\n✅ All analytics API tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Analytics API test failed:', error);
  }
}

// Export for use in other modules
export const analyticsApiTests = {
  testDashboardMetrics,
  testRevenueAnalytics,
  testContractorPerformance,
  testJobMetrics,
  testReportExport,
  testRealtimeStream,
  runAllTests: runAllAnalyticsTests
};