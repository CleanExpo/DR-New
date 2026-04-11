/**
 * Top 20 languages spoken in Australia & New Zealand
 * Board-approved scope: DR-487 — Gemma 4 Multilingual
 */

export interface Language {
  code: string          // BCP-47 language tag
  name: string          // English name
  nativeName: string    // Name in that language
  region: string        // Primary region: AU | NZ | AU/NZ
  voiceEnabled: boolean // Voice input supported (top 8)
  rtl: boolean          // Right-to-left script
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'zh-CN', name: 'Mandarin Chinese',      nativeName: '普通话',          region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'ar',    name: 'Arabic',                 nativeName: 'العربية',         region: 'AU',    voiceEnabled: true,  rtl: true  },
  { code: 'vi',    name: 'Vietnamese',             nativeName: 'Tiếng Việt',      region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'hi',    name: 'Hindi',                  nativeName: 'हिन्दी',           region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'zh-HK', name: 'Cantonese',              nativeName: '廣東話',           region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'pa',    name: 'Punjabi',                nativeName: 'ਪੰਜਾਬੀ',          region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'el',    name: 'Greek',                  nativeName: 'Ελληνικά',        region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'it',    name: 'Italian',                nativeName: 'Italiano',        region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'es',    name: 'Spanish',                nativeName: 'Español',         region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'tl',    name: 'Tagalog / Filipino',     nativeName: 'Tagalog',         region: 'AU',    voiceEnabled: true,  rtl: false },
  { code: 'ko',    name: 'Korean',                 nativeName: '한국어',           region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'ta',    name: 'Tamil',                  nativeName: 'தமிழ்',           region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'ur',    name: 'Urdu',                   nativeName: 'اردو',            region: 'AU',    voiceEnabled: false, rtl: true  },
  { code: 'id',    name: 'Indonesian / Malay',     nativeName: 'Bahasa Indonesia', region: 'AU',   voiceEnabled: false, rtl: false },
  { code: 'tr',    name: 'Turkish',                nativeName: 'Türkçe',          region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'fa',    name: 'Persian / Dari / Farsi', nativeName: 'فارسی',           region: 'AU',    voiceEnabled: false, rtl: true  },
  { code: 'ne',    name: 'Nepali',                 nativeName: 'नेपाली',          region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'si',    name: 'Sinhalese',              nativeName: 'සිංහල',           region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'ja',    name: 'Japanese',               nativeName: '日本語',           region: 'AU',    voiceEnabled: false, rtl: false },
  { code: 'mi',    name: 'Māori',                  nativeName: 'Te Reo Māori',    region: 'NZ',    voiceEnabled: false, rtl: false },
  // Bonus NZ-specific
  { code: 'sm',    name: 'Samoan',                 nativeName: 'Gagana Samoa',    region: 'NZ',    voiceEnabled: false, rtl: false },
  { code: 'to',    name: 'Tongan',                 nativeName: 'Lea Fakatonga',   region: 'NZ',    voiceEnabled: false, rtl: false },
]

export const VOICE_LANGUAGES = SUPPORTED_LANGUAGES.filter(l => l.voiceEnabled)

export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(l => l.code === code)
}

export const DEFAULT_LANGUAGE = 'en'
