import React from 'react';

export default function DeploymentTest() {
  // Check environment variables on the client side that are public
  const hasPublicUrl = typeof window !== 'undefined' && window.location.href.includes('dr-new-ten.vercel.app');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Deployment Test</h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <span className="font-medium">Page Loaded Successfully</span>
            <span className="text-green-600 text-xl">✅</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span className="font-medium">Vercel Domain</span>
            <span className={`text-xl ${hasPublicUrl ? 'text-green-600' : 'text-yellow-600'}`}>
              {hasPublicUrl ? '✅' : '⚠️'}
            </span>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Deployment Information:</h3>
            <ul className="text-sm space-y-1">
              <li>• Latest commit: 9caf507f (Health check endpoint)</li>
              <li>• Previous commit: 37bf018e (Test endpoints)</li>
              <li>• Main feature: a2bde3c3 (Airtable CRM integration)</li>
              <li>• Environment: Production on Vercel</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Next Steps:</h3>
            <ul className="text-sm space-y-1">
              <li>1. Verify Airtable environment variables in Vercel dashboard</li>
              <li>2. Check if API routes are deploying correctly</li>
              <li>3. Test Airtable integration once API routes are live</li>
              <li>4. Monitor deployment logs for any build errors</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            If you can see this page, the basic deployment is working.
            <br />
            API routes may take additional time to deploy.
          </p>
        </div>
      </div>
    </div>
  );
}