'use client';
'use client'

/**
 * DR-487: Gemma 4 Multilingual — QA Test Page
 *
 * Test all 22 board-approved languages via /api/translate.
 * Voice input available for top 8 languages.
 * Accessible at /translate for QA sign-off before Apr 15.
 */

import { useState } from 'react'
import { TranslateWidget } from '@/components/translation'
import { SUPPORTED_LANGUAGES } from '@/lib/translation/languages'

export default function TranslatePage() {
  const [log, setLog] = useState<Array<{ lang: string; original: string; translated: string }>>([])

  const handleTranslation = (original: string, translated: string, language: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === language)
    setLog(prev => [
      { lang: lang ? `${lang.nativeName} (${lang.name})` : language, original, translated },
      ...prev.slice(0, 9),
    ])
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Multilingual Translation — QA
          </h1>
          <p className="text-gray-400 text-sm">
            DR-487 · {SUPPORTED_LANGUAGES.length} languages · Gemini 1.5 Flash ·{' '}
            {SUPPORTED_LANGUAGES.filter(l => l.voiceEnabled).length} with voice input
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORTED_LANGUAGES.map(lang => (
              <span
                key={lang.code}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-800 text-gray-300"
              >
                {lang.voiceEnabled && <span title="Voice enabled">🎙️</span>}
                {lang.nativeName}
              </span>
            ))}
          </div>
        </div>

        <TranslateWidget
          onTranslation={handleTranslation}
          placeholder="Type disaster recovery text to translate... or use voice input for supported languages."
        />

        {log.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Translation Log (last 10)
            </h2>
            <div className="space-y-3">
              {log.map((entry, i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="text-xs text-blue-400 font-medium mb-1">{entry.lang}</div>
                  <div className="text-sm text-gray-400 mb-1">→ &ldquo;{entry.original}&rdquo;</div>
                  <div className="text-sm text-white">{entry.translated}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
