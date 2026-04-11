'use client';
'use client'

import { useState, useRef, useEffect } from 'react'
import { SUPPORTED_LANGUAGES, Language, DEFAULT_LANGUAGE } from '@/lib/translation/languages'

interface LanguageSelectorProps {
  value?: string
  onChange: (languageCode: string) => void
  compact?: boolean
  className?: string
}

const GLOBE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const ENGLISH: Language = {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  region: 'AU/NZ',
  voiceEnabled: true,
  rtl: false,
}

const ALL_LANGUAGES = [ENGLISH, ...SUPPORTED_LANGUAGES]

export function LanguageSelector({ value = DEFAULT_LANGUAGE, onChange, compact = false, className = '' }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const selected = ALL_LANGUAGES.find(l => l.code === value) || ENGLISH

  const filtered = ALL_LANGUAGES.filter(l =>
    !search ||
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  )

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${selected.name}`}
      >
        {GLOBE_ICON}
        {compact ? (
          <span>{selected.nativeName}</span>
        ) : (
          <>
            <span>{selected.nativeName}</span>
            <span className="text-gray-400 text-xs">({selected.name})</span>
          </>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-72 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              autoFocus
            />
          </div>

          {/* Language list */}
          <ul
            role="listbox"
            className="max-h-64 overflow-y-auto"
            aria-label="Select language"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No languages found</li>
            )}
            {filtered.map(lang => (
              <li
                key={lang.code}
                role="option"
                aria-selected={lang.code === value}
                onClick={() => {
                  onChange(lang.code)
                  setOpen(false)
                  setSearch('')
                }}
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors
                  ${lang.code === value
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium" dir={lang.rtl ? 'rtl' : 'ltr'}>{lang.nativeName}</span>
                  <span className="text-xs text-gray-400">{lang.name}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {lang.voiceEnabled && (
                    <span className="text-xs bg-green-100 text-green-700 rounded px-1.5 py-0.5" title="Voice input supported">
                      🎙️
                    </span>
                  )}
                  <span className="text-xs text-gray-300">{lang.region}</span>
                  {lang.code === value && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-600">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            {SUPPORTED_LANGUAGES.length + 1} languages • Powered by Gemma 4
          </div>
        </div>
      )}
    </div>
  )
}
