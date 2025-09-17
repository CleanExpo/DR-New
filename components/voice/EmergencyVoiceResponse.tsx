'use client';

import React from 'react';
import Link from 'next/link';

interface EmergencyStep {
  action: string;
  detail: string;
  warning?: string;
}

interface EmergencyVoiceResponseProps {
  emergencyType: 'flooding' | 'fire' | 'storm' | 'sewage' | 'mould';
  suburb?: string;
}

export default function EmergencyVoiceResponse({
  emergencyType,
  suburb = 'Brisbane'
}: EmergencyVoiceResponseProps) {

  const emergencySteps: Record<string, EmergencyStep[]> = {
    flooding: [
      {
        action: "Turn off electricity at the main switch",
        detail: "Find your meter box. Switch off the main breaker straight away.",
        warning: "Never touch electrical switches with wet hands"
      },
      {
        action: "Stop the water source if possible",
        detail: "Turn off your water main. It's usually near your water meter.",
      },
      {
        action: "Move valuables to higher ground",
        detail: "Lift furniture, electronics, and documents above water level.",
      },
      {
        action: "Ring Disaster Recovery now",
        detail: "Call 1300 309 361. We're in Wacol. We can be there within an hour.",
      }
    ],
    fire: [
      {
        action: "Ensure everyone is safe first",
        detail: "Get everyone outside. Don't go back in for belongings.",
        warning: "Never enter a fire-damaged building until cleared"
      },
      {
        action: "Ring 000 if there's still smoke or fire",
        detail: "Fire brigade must clear the property first.",
      },
      {
        action: "Don't touch anything",
        detail: "Soot and smoke residue can cause more damage if disturbed.",
      },
      {
        action: "Ring Disaster Recovery",
        detail: "Call 1300 309 361. We start cleaning straight away to prevent permanent damage.",
      }
    ],
    storm: [
      {
        action: "Check for immediate dangers",
        detail: "Look for damaged power lines, broken glass, unstable structures.",
        warning: "Stay away from fallen power lines"
      },
      {
        action: "Cover broken windows and roof damage",
        detail: "Use tarps or plastic sheets. Stop more water getting in.",
      },
      {
        action: "Document the damage",
        detail: "Take photos for your insurance claim.",
      },
      {
        action: "Ring Disaster Recovery",
        detail: "Call 1300 309 361. We do emergency tarping and full restoration.",
      }
    ],
    sewage: [
      {
        action: "Keep everyone away from the area",
        detail: "Sewage contains dangerous bacteria and viruses.",
        warning: "This is a serious health hazard"
      },
      {
        action: "Turn off water supply",
        detail: "Stop using all toilets, sinks, and drains.",
      },
      {
        action: "Open windows for ventilation",
        detail: "But don't enter the contaminated area.",
      },
      {
        action: "Ring Disaster Recovery immediately",
        detail: "Call 1300 309 361. We have proper protective equipment and sanitization methods.",
      }
    ],
    mould: [
      {
        action: "Don't try to clean it yourself",
        detail: "Disturbing mould spreads spores through your home.",
        warning: "Mould can cause serious health problems"
      },
      {
        action: "Reduce moisture",
        detail: "Use fans and dehumidifiers if you have them. Open windows.",
      },
      {
        action: "Keep people with health conditions away",
        detail: "Especially those with asthma or allergies.",
      },
      {
        action: "Ring Disaster Recovery",
        detail: "Call 1300 309 361. We're IICRC certified for safe mould removal.",
      }
    ]
  };

  const steps = emergencySteps[emergencyType] || emergencySteps.flooding;

  // Generate HowTo schema for voice assistants
  const generateHowToSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `What to do for ${emergencyType} damage in ${suburb}`,
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.action,
        "text": step.detail,
        "warning": step.warning
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };

  return (
    <>
      {generateHowToSchema()}

      <section className="py-8 bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="max-w-4xl mx-auto px-6">
          {/* Immediate Answer for Voice Queries */}
          <div className="voice-answer mb-6">
            <h1 className="text-2xl font-bold text-red-900 mb-2">
              {emergencyType.charAt(0).toUpperCase() + emergencyType.slice(1)} Emergency in {suburb}?
            </h1>
            <p className="text-xl text-red-800 font-semibold">
              Ring Disaster Recovery now: 1300 309 361. We're in Wacol. We can be there within an hour.
            </p>
          </div>

          {/* Step by Step Instructions */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What to Do Right Now:
            </h2>

            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </span>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">
                      {step.action}
                    </h3>
                    <p className="text-gray-700 mt-1">
                      {step.detail}
                    </p>
                    {step.warning && (
                      <p className="text-red-600 font-medium mt-2 flex items-start">
                        <svg className="w-5 h-5 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {step.warning}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Ring 1300 309 361 Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors text-lg"
            >
              Get Emergency Help Online
            </Link>
          </div>

          {/* Local Service Assurance */}
          <div className="mt-6 text-sm text-gray-700 bg-blue-50 rounded p-3">
            <p className="font-semibold">We're local to {suburb}:</p>
            <p>Office: 4/17 Tile St, Wacol • 24/7 Emergency Response • IICRC Certified • Insurance Approved</p>
          </div>
        </div>
      </section>
    </>
  );
}