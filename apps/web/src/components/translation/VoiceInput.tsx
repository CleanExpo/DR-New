'use client'

import { useState, useRef, useCallback } from 'react'
import { VOICE_LANGUAGES } from '@/lib/translation/languages'

interface VoiceInputProps {
  languageCode: string
  onTranscript: (text: string) => void
  onError?: (error: string) => void
  className?: string
}

// Web Speech API type declarations
interface ISpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  onstart: (() => void) | null
  onend: (() => void) | null
  onresult: ((event: ISpeechRecognitionEvent) => void) | null
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null
}

interface ISpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface ISpeechRecognitionErrorEvent {
  error: string
  message: string
}

interface ISpeechRecognitionConstructor {
  new(): ISpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognitionConstructor
    webkitSpeechRecognition: ISpeechRecognitionConstructor
  }
}

export function VoiceInput({ languageCode, onTranscript, onError, className = '' }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<ISpeechRecognition | null>(null)

  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  const isVoiceLanguage = VOICE_LANGUAGES.some(l => l.code === languageCode) || languageCode === 'en'

  const startListening = useCallback(() => {
    if (!isSupported) {
      onError?.('Voice input is not supported in this browser. Please use Chrome or Edge.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    // Map our BCP-47 codes to Web Speech API lang codes
    const speechLang = languageCode === 'zh-HK' ? 'zh-HK' : languageCode
    recognition.lang = speechLang
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const results = Array.from(event.results)
      const latest = results[results.length - 1]
      const text = latest[0].transcript
      setTranscript(text)

      if (latest.isFinal) {
        onTranscript(text)
      }
    }

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      setIsListening(false)
      if (event.error !== 'no-speech') {
        onError?.(`Voice recognition error: ${event.error}`)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [languageCode, isSupported, onTranscript, onError])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  if (!isVoiceLanguage) return null

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        disabled={!isSupported}
        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all shadow-md
          ${isListening
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
          ${!isSupported ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {isListening ? (
          // Stop icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          // Mic icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}

        {/* Ripple animation while listening */}
        {isListening && (
          <span className="absolute inset-0 rounded-full bg-red-400 opacity-40 animate-ping" />
        )}
      </button>

      {/* Live transcript preview */}
      {transcript && (
        <p className="text-sm text-gray-600 italic text-center max-w-xs px-2">
          &ldquo;{transcript}&rdquo;
        </p>
      )}

      <p className="text-xs text-gray-400">
        {isListening ? 'Listening... tap to stop' : 'Tap to speak'}
      </p>
    </div>
  )
}

/**
 * TranslateWidget — combines language selector + voice input + translation
 * Drop-in widget for any form field that needs multilingual input
 */
interface TranslateWidgetProps {
  sourceLanguage?: string
  onTranslation?: (original: string, translated: string, language: string) => void
  placeholder?: string
}

export function TranslateWidget({ sourceLanguage = 'en', onTranslation, placeholder }: TranslateWidgetProps) {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLang, setTargetLang] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = useCallback(async (text: string) => {
    if (!text.trim() || targetLang === 'en') return

    setIsTranslating(true)
    setError('')

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: targetLang, sourceLanguage, context: 'disaster' }),
      })

      if (!res.ok) throw new Error('Translation failed')

      const data = await res.json()
      setTranslatedText(data.translatedText)
      onTranslation?.(text, data.translatedText, targetLang)
    } catch (err) {
      setError('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }, [targetLang, sourceLanguage, onTranslation])

  const handleVoiceTranscript = useCallback((text: string) => {
    setInputText(text)
    handleTranslate(text)
  }, [handleTranslate])

  return (
    <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <textarea
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onBlur={() => handleTranslate(inputText)}
        placeholder={placeholder || 'Enter text to translate...'}
        rows={3}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
      />

      {translatedText && (
        <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
          {isTranslating ? (
            <span className="text-gray-400 italic">Translating...</span>
          ) : (
            <span>{translatedText}</span>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex items-center justify-between">
        <VoiceInput
          languageCode={targetLang}
          onTranscript={handleVoiceTranscript}
          onError={setError}
        />
        <button
          type="button"
          onClick={() => handleTranslate(inputText)}
          disabled={!inputText.trim() || isTranslating || targetLang === 'en'}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {isTranslating ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  )
}
