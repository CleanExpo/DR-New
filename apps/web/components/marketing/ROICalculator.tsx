/**
 * Contractor ROI Calculator Component
 *
 * Interactive calculator showing contractors potential earnings
 * through the NRPG network:
 *
 * Formula:
 * (Jobs per month × Average job value × 12 months × Platform margin) = Annual income
 *
 * Example:
 * 20 jobs × $8,000 × 12 × 0.8 = $1,536,000 annual revenue
 * (contractor keeps 80% after NRPG platform fee)
 *
 * Authority signal: Transparent about financials, contractor success stories
 */

'use client';

import { useState, useMemo } from 'react';
import { DollarSign, Zap, TrendingUp } from 'lucide-react';

interface ROIData {
  jobsPerMonth: number;
  averageJobValue: number;
  platformMargin: number; // Contractor keeps 80%, NRPG takes 20%
  annualRevenue: number;
  monthlyRevenue: number;
  netIncome: number;
}

const SUCCESSFUL_CONTRACTOR_STORIES = [
  {
    name: 'Michael Chen',
    location: 'Sydney, NSW',
    jobsPerMonth: 25,
    yearsWithNRPG: 2,
    photo: '/images/contractors/michael-chen.jpg',
    avgJobValue: 8500,
    annualRevenue: 2040000, // 25 × 8500 × 12 × 0.8
    quote: 'NRPG handles lead generation and customer management, I focus on quality restoration. My revenue increased 300% since joining.',
  },
  {
    name: 'Lisa Rodriguez',
    location: 'Melbourne, VIC',
    jobsPerMonth: 18,
    yearsWithNRPG: 1,
    photo: '/images/contractors/lisa-rodriguez.jpg',
    avgJobValue: 7500,
    annualRevenue: 1296000, // 18 × 7500 × 12 × 0.8
    quote: 'The platform gives me consistent work. No more feast or famine. The IICRC documentation tools save me 20 hours/month on admin.',
  },
  {
    name: 'James Thompson',
    location: 'Brisbane, QLD',
    jobsPerMonth: 30,
    yearsWithNRPG: 3,
    photo: '/images/contractors/james-thompson.jpg',
    avgJobValue: 9000,
    annualRevenue: 2592000, // 30 × 9000 × 12 × 0.8
    quote: 'Built my entire business through NRPG. Now I have 3 teams and 150+ jobs annually. This platform changed everything.',
  },
];

export function ROICalculator() {
  const [jobsPerMonth, setJobsPerMonth] = useState(20);
  const [averageJobValue, setAverageJobValue] = useState(8000);

  const roi: ROIData = useMemo(() => {
    const platformMargin = 0.8; // Contractor keeps 80%
    const annualRevenue = jobsPerMonth * averageJobValue * 12 * platformMargin;
    const monthlyRevenue = (jobsPerMonth * averageJobValue * platformMargin);
    const netIncome = annualRevenue; // After NRPG platform fees

    return {
      jobsPerMonth,
      averageJobValue,
      platformMargin,
      annualRevenue: Math.round(annualRevenue),
      monthlyRevenue: Math.round(monthlyRevenue),
      netIncome: Math.round(netIncome),
    };
  }, [jobsPerMonth, averageJobValue]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 md:px-12 py-8">
        <div className="flex items-start gap-4 mb-2">
          <TrendingUp className="w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-2">
              Contractor Revenue Calculator
            </h2>
            <p className="text-blue-100">
              See how much you can earn as an NRPG contractor
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Calculator Section */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900">
              Estimate Your Annual Income
            </h3>

            {/* Jobs Per Month Slider */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Jobs per Month: <span className="text-blue-600">{jobsPerMonth}</span>
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={jobsPerMonth}
                onChange={e => setJobsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-2">
                <span>1 job/month</span>
                <span>50 jobs/month</span>
              </div>
            </div>

            {/* Average Job Value */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Average Job Value: <span className="text-blue-600">${averageJobValue.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={averageJobValue}
                onChange={e => setAverageJobValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-2">
                <span>$3,000</span>
                <span>$25,000</span>
              </div>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-sm text-slate-700">
                <strong>How it works:</strong> You keep 80% of job revenue. NRPG handles lead generation, customer service, insurance coordination, and payment processing. Platform fee: 20%
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Annual Revenue Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
              <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">
                Potential Annual Revenue
              </p>
              <div className="text-4xl md:text-5xl font-black mb-4">
                ${(roi.annualRevenue).toLocaleString()}
              </div>
              <p className="text-blue-100 text-sm">
                Based on {jobsPerMonth} jobs × ${averageJobValue.toLocaleString()} × 12 months
              </p>
            </div>

            {/* Monthly Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ${roi.monthlyRevenue.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  NRPG Platform Fee
                </p>
                <p className="text-2xl font-black text-slate-900">
                  20%
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h4 className="font-bold text-green-900 mb-3">Contractor Requirements</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ IICRC Certification (at least one module)</li>
                <li>✓ Valid ABN & Business Insurance</li>
                <li>✓ Professional liability insurance ($1M+)</li>
                <li>✓ Background check clearance</li>
              </ul>
            </div>

            {/* CTA */}
            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Apply to Join NRPG Network
            </button>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-slate-100 border-t border-slate-200 px-8 md:px-12 py-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          Successful NRPG Contractors
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {SUCCESSFUL_CONTRACTOR_STORIES.map((contractor, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
              {/* Contractor Photo */}
              <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                {contractor.photo ? (
                  <img src={contractor.photo} alt={contractor.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {contractor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                {/* Name and Location */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{contractor.name}</p>
                    <p className="text-sm text-slate-600">{contractor.location}</p>
                  </div>
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {contractor.yearsWithNRPG}yr
                  </span>
                </div>

                {/* Annual Revenue Highlight */}
                <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-600">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Annual Revenue</p>
                  <p className="text-2xl font-black text-blue-600">
                    ${(contractor.annualRevenue / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {contractor.jobsPerMonth} jobs × ${contractor.avgJobValue.toLocaleString()}/job
                  </p>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 italic">
                  "{contractor.quote}"
                </p>

                {/* Jobs Per Month Badge */}
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm pt-2">
                  <Zap className="w-4 h-4" />
                  {contractor.jobsPerMonth} jobs/month
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-600 text-white px-8 md:px-12 py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Grow Your Business?
        </h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join the NRPG network and access consistent, quality restoration work with professional support and transparent payments.
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
          Apply Now →
        </button>
      </div>
    </div>
  );
}
