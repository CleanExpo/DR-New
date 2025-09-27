'use client';

import React, { useState, useEffect } from 'react';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

const AirtableTestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Deployment Status',
        endpoint: '/api/test-deployment'
      },
      {
        name: 'Airtable Leads API',
        endpoint: '/api/airtable/leads'
      },
      {
        name: 'Airtable Campaigns API',
        endpoint: '/api/airtable/campaigns'
      },
      {
        name: 'Automation Sequences API',
        endpoint: '/api/airtable/automation'
      }
    ];

    for (const test of tests) {
      try {
        const response = await fetch(test.endpoint);
        const data = await response.json();

        setTestResults(prev => [...prev, {
          success: response.ok,
          message: `${test.name}: ${response.ok ? 'SUCCESS' : 'FAILED'}`,
          data: data,
          error: response.ok ? undefined : `HTTP ${response.status}`
        }]);
      } catch (error) {
        setTestResults(prev => [...prev, {
          success: false,
          message: `${test.name}: ERROR`,
          error: error instanceof Error ? error.message : 'Unknown error'
        }]);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Airtable Integration Test</h1>
            <button
              onClick={runTests}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Run Tests'}
            </button>
          </div>

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  result.success
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xl ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                    {result.success ? '✅' : '❌'}
                  </span>
                  <h3 className="font-semibold text-gray-900">{result.message}</h3>
                </div>

                {result.error && (
                  <p className="text-red-600 text-sm mb-2">Error: {result.error}</p>
                )}

                {result.data && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>

          {testResults.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Click "Run Tests" to check the Airtable integration status</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Running integration tests...</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">About This Test</h3>
            <p className="text-blue-800 text-sm">
              This page tests the Airtable CRM integration by checking API endpoints and environment variables.
              All tests should pass if the Airtable credentials are correctly configured in Vercel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirtableTestPage;