// @ts-nocheck
/**
 * Process List Component
 * Optimises content for HowTo schema and featured snippets
 * Displays step-by-step processes with structured data
 */

import { HowToStep, HowTo } from 'schema-dts';

interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
  duration?: string;
  tools?: string[];
  materials?: string[];
  warnings?: string[];
}

interface ProcessListProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
  totalTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  yield?: string; // e.g., "Restored property" or "Recovered items"
}

/**
 * Generate HowTo schema
 */
function generateHowToSchema(props: ProcessListProps): HowTo {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: props.title,
    description: props.description,
    totalTime: props.totalTime,
    estimatedCost: undefined,
    step: props.steps.map(step => ({
      '@type': 'HowToStep',
      position: step.stepNumber.toString(),
      name: step.title,
      text: step.description,
      image: step.image,
      url: undefined
    }))
  };
}

/**
 * Process List Component
 */
export function ProcessList({
  title,
  description,
  steps,
  totalTime,
  difficulty,
  yield: yieldResult
}: ProcessListProps) {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHowToSchema({
            title,
            description,
            steps,
            totalTime,
            difficulty,
            yield: yieldResult
          }))
        }}
      />

      {/* Process List */}
      <section className="process-list my-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm">
            {totalTime && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full text-blue-700">
                <span>⏱️</span>
                <span>Total time: {totalTime}</span>
              </div>
            )}
            {difficulty && (
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-full text-yellow-700">
                <span>📊</span>
                <span>Difficulty: {difficulty}</span>
              </div>
            )}
            {yieldResult && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full text-green-700">
                <span>✓</span>
                <span>Result: {yieldResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <ProcessStep key={step.stepNumber} step={step} />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            ✓ Process Complete
          </h3>
          <p className="text-gray-700">
            You have successfully completed all {steps.length} steps of this process.
            {yieldResult && ` Your ${yieldResult.toLowerCase()} is now ready.`}
          </p>
        </div>
      </section>
    </>
  );
}

/**
 * Individual Process Step Component
 */
function ProcessStep({ step }: { step: ProcessStep }) {
  return (
    <div className="process-step border-l-4 border-indigo-500 pl-6 py-4">
      {/* Step Header */}
      <div className="flex items-start gap-4">
        {/* Step Number Circle */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
            {step.stepNumber}
          </div>
        </div>

        {/* Step Title and Description */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {step.title}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            {step.description}
          </p>

          {/* Step Image */}
          {step.image && (
            <img
              src={step.image}
              alt={step.title}
              className="w-full max-w-md rounded-lg mb-4 border border-gray-200"
              loading="lazy"
            />
          )}

          {/* Step Duration */}
          {step.duration && (
            <div className="text-xs text-gray-400 mb-3">
              ⏱️ Estimated time: {step.duration}
            </div>
          )}

          {/* Tools */}
          {step.tools && step.tools.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Tools needed:
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                {step.tools.map((tool, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>🔧</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Materials */}
          {step.materials && step.materials.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Materials:
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                {step.materials.map((material, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>📦</span>
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {step.warnings && step.warnings.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm font-semibold text-red-700 mb-2">
                ⚠️ Important Notes:
              </p>
              <ul className="text-sm text-red-700 space-y-1">
                {step.warnings.map((warning, i) => (
                  <li key={i}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
