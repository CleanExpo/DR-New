import { Metadata } from 'next';
import Link from 'next/link';
import { PhoneIcon, ClockIcon, ShieldCheckIcon, DocumentCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Emergency Claim Submission | Brisbane Water & Fire Damage | IICRC Master Restorer',
  description: '24/7 emergency claim submission for water damage, fire damage, flood & storm restoration in Brisbane. IICRC Master Restorer Phill McGurk. Immediate response. Call 1300 309 361 now.',
  keywords: 'emergency claim brisbane, water damage claim, fire damage claim, flood insurance claim, storm damage claim, insurance restoration brisbane, emergency restoration claim, disaster recovery claim brisbane, iicrc master restorer claim',
  openGraph: {
    title: 'Emergency Claim Submission Brisbane | 24/7 Water & Fire Damage',
    description: 'Submit emergency restoration claim 24/7. IICRC Master Restorer serving Brisbane, Ipswich & Logan. Immediate response for water, fire & flood damage.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim'
  }
};

export default function ClaimPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-red-700 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <ExclamationTriangleIcon className="w-6 h-6 animate-pulse" />
            <span className="font-bold">EMERGENCY ACTIVE</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Call for Immediate Dispatch</span>
            <a href="tel:1300309361" className="font-bold underline ml-2">1300 309 361</a>
          </div>
        </div>
      </div>
      <section className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-block bg-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              24/7 EMERGENCY CLAIM SUBMISSION
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Submit Your Emergency
              <span className="block text-red-400 mt-2">
                Restoration Claim Now
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-10 py-5 rounded-lg font-bold text-xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105"
              >
                <PhoneIcon className="w-6 h-6" />
                Call 1300 309 361
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
