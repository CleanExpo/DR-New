'use client';

import React, { useState } from 'react';
import { Phone, AlertTriangle, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface PriorityLevel {
  level: 'critical' | 'urgent' | 'standard';
  title: string;
  description: string;
  timeframe: string;
  examples: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

const priorityLevels: PriorityLevel[] = [
  {
    level: 'critical',
    title: 'Critical Priority',
    description: 'Immediate danger to property or safety',
    timeframe: '1-2 hours response',
    examples: [
      'Ceiling collapse imminent from water damage',
      'Active flooding threatening structural integrity',
      'Electrical hazards from water infiltration',
      'Sewage overflow in living areas'
    ],
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-500'
  },
  {
    level: 'urgent',
    title: 'Urgent Priority',
    description: 'Significant ongoing damage or health concerns',
    timeframe: '4-6 hours response',
    examples: [
      'Multiple rooms affected by water damage',
      'Mould growth in occupied areas',
      'Significant smoke damage affecting air quality',
      'Damaged flooring creating trip hazards'
    ],
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500'
  },
  {
    level: 'standard',
    title: 'Standard Priority',
    description: 'Contained damage requiring professional attention',
    timeframe: '24-48 hours response',
    examples: [
      'Single room water damage, leak stopped',
      'Minor smoke damage to walls',
      'Carpet water damage in non-critical areas',
      'Preventive mould treatment needed'
    ],
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500'
  }
];

export function TriageInfoCard(...args: any[]): void {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl shadow-lg p-6 my-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Priority Triage System
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Our phone-based triage assessment ensures those in greatest danger receive immediate help.
            When you call, our Brisbane-based team will assess your situation and assign the appropriate priority level.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white border-2 border-blue-300 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-blue-600 animate-pulse" />
            <div>
              <p className="font-semibold text-gray-900">Call for Immediate Assessment</p>
              <p className="text-sm text-gray-600">Available 24/7 across Brisbane, Ipswich & Logan</p>
            </div>
          </div>
          <a
            href="tel:1300956502"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            <Phone className="h-5 w-5" />
            1300 956 502
          </a>
        </div>
      </div>

      {/* Priority Levels */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Priority Levels Explained
        </h3>

        {priorityLevels.map((priority) => (
          <div
            key={priority.level}
            className={`${priority.bgColor} border-l-4 ${priority.borderColor} rounded-r-lg p-4 transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-bold text-lg ${priority.color} mb-1`}>
                  {priority.title}
                </h4>
                <p className="text-gray-700 mb-2">{priority.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{priority.timeframe}</span>
                </div>
              </div>
            </div>

            {expanded && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Common scenarios:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {priority.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show Less Details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show More Details
            </>
          )}
        </button>
      </div>

      {/* Why Triage */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2">Why We Use Triage</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Ensures critical situations like Kedron Brook flooding get immediate response</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Efficiently allocates resources across Greater Brisbane area</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Prevents property damage escalation through timely intervention</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Provides realistic timeframes based on actual urgency</span>
          </li>
        </ul>
      </div>

      {/* Learn More Link */}
      <div className="mt-4 text-center">
        <a
          href="/triage-system"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          Learn more about our triage system
          <ChevronDown className="h-4 w-4 rotate-270" />
        </a>
      </div>
    </div>
  );
}

export default TriageInfoCard;