import React from 'react'
import { FileText } from 'lucide-react'
import {
  ICA_TITLE,
  ICA_SUBTITLE,
  ICA_INTRO,
  ICA_LAST_UPDATED,
  ICA_VERSION,
  ICA_ENTITY,
  ICA_SECTIONS,
  type IcaBlock,
} from '@/lib/legal/ica'

/**
 * Independent Contractor Agreement — display page (DR-885).
 *
 * Rendered entirely from the canonical source in `@/lib/legal/ica` so the
 * displayed text matches the hashed text and the generated PDF byte-for-byte.
 * Do not hard-code agreement text here.
 */

function IcaBlockView({ block }: { block: IcaBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="text-slate-300 leading-relaxed">{block.text}</p>
    case 'callout':
      return (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-amber-200 text-sm leading-relaxed">
            <strong>Important:</strong> {block.text}
          </p>
        </div>
      )
    case 'ul':
      return (
        <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal list-inside text-slate-300 space-y-2 ml-2">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )
  }
}

export default function ContractorAgreementPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b border-blue-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-500/20 rounded-lg p-3">
              <FileText className="h-8 w-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-50">
                {ICA_TITLE}
              </h1>
              <p className="text-slate-400 mt-1">{ICA_SUBTITLE}</p>
            </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed">{ICA_INTRO}</p>
          <p className="text-slate-500 text-sm mt-4">
            Last updated: {ICA_LAST_UPDATED} (version {ICA_VERSION})
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none space-y-12">
            {ICA_SECTIONS.map((section) => (
              <div key={section.number}>
                <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                  <span className="text-slate-500 text-lg font-mono">
                    {section.number}.
                  </span>
                  {section.title}
                </h2>
                <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                  {section.blocks.map((block, i) => (
                    <IcaBlockView key={i} block={block} />
                  ))}
                </div>
              </div>
            ))}

            {/* Entity Notice */}
            <div className="border-t border-blue-900/30 pt-8 mt-12">
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 text-center">
                <p className="text-slate-400 text-sm">
                  {ICA_ENTITY.legalName} | ABN: {ICA_ENTITY.abn} | ACN:{' '}
                  {ICA_ENTITY.acn}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  {ICA_ENTITY.footerNote}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Trading as: {ICA_ENTITY.tradingAs.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
