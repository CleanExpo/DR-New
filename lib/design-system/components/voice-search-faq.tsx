'use client'

import React, { useState } from 'react'
import { Search, Mic, ChevronDown, HelpCircle, AlertCircle, Phone } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  keywords: string[]
  urgent?: boolean
  relatedQuestions?: string[]
}

interface VoiceSearchFAQProps {
  faqs?: FAQItem[]
  categories?: string[]
  showVoiceSearch?: boolean
  showEmergencyPrompt?: boolean
  phoneNumber?: string
  className?: string
}

/**
 * Voice Search Optimized FAQ Component
 * Designed for natural language queries and emergency scenarios
 * Optimized for "Hey Google" and "Hey Siri" voice searches
 */
export const VoiceSearchFAQ: React.FC<VoiceSearchFAQProps> = ({
  faqs = defaultFAQs,
  categories = defaultCategories,
  showVoiceSearch = true,
  showEmergencyPrompt = true,
  phoneNumber = '1300 309 361',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [isListening, setIsListening] = useState(false)

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  // Group FAQs by urgency
  const urgentFAQs = filteredFAQs.filter(faq => faq.urgent)
  const regularFAQs = filteredFAQs.filter(faq => !faq.urgent)

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser')
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'en-AU'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchQuery(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  return (
    <div className={`${className}`}>
      {/* Search Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Try "water damage cost" or "insurance claim process"'
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search FAQs"
              />
            </div>

            {showVoiceSearch && (
              <button
                onClick={handleVoiceSearch}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  isListening
                    ? 'bg-red-600 text-white border-red-600 animate-pulse'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                aria-label="Voice search"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Voice Search Schema Hints */}
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
            <span>Popular voice searches:</span>
            <button
              onClick={() => setSearchQuery('flood damage emergency Brisbane')}
              className="text-blue-600 hover:underline"
            >
              "Hey Google, flood damage emergency Brisbane"
            </button>
            <button
              onClick={() => setSearchQuery('water extraction cost')}
              className="text-blue-600 hover:underline"
            >
              "How much does water extraction cost?"
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Prompt */}
      {showEmergencyPrompt && urgentFAQs.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-red-900">Need immediate assistance?</p>
              <p className="text-sm text-red-700 mt-1">
                For emergency water damage, flooding, or fire restoration, call us now.
              </p>
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {/* Urgent FAQs */}
        {urgentFAQs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider">
              Urgent Questions
            </h3>
            {urgentFAQs.map((faq) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                isExpanded={expandedItems.has(faq.id)}
                onToggle={() => toggleExpanded(faq.id)}
                phoneNumber={phoneNumber}
              />
            ))}
          </div>
        )}

        {/* Regular FAQs */}
        {regularFAQs.length > 0 && (
          <div className="space-y-4">
            {urgentFAQs.length > 0 && (
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mt-6">
                General Questions
              </h3>
            )}
            {regularFAQs.map((faq) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                isExpanded={expandedItems.has(faq.id)}
                onToggle={() => toggleExpanded(faq.id)}
                phoneNumber={phoneNumber}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">
              No FAQs found matching your search.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Try different keywords or contact us directly for assistance.
            </p>
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call {phoneNumber}
            </a>
          </div>
        )}
      </div>

      {/* Schema Markup for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: filteredFAQs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
    </div>
  )
}

// FAQ Item Component
const FAQItemComponent: React.FC<{
  faq: FAQItem
  isExpanded: boolean
  onToggle: () => void
  phoneNumber: string
}> = ({ faq, isExpanded, onToggle, phoneNumber }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
        faq.urgent ? 'border-2 border-red-200' : 'border border-gray-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-gray-900">
              {faq.urgent && (
                <span className="inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded mr-2">
                  URGENT
                </span>
              )}
              {faq.question}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{faq.category}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-4 border-t border-gray-100">
          <div className="pt-4 prose prose-sm max-w-none text-gray-700">
            <p>{faq.answer}</p>

            {faq.urgent && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-semibold text-red-900 mb-2">
                  Need immediate help?
                </p>
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call {phoneNumber} now
                </a>
              </div>
            )}

            {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700">Related questions:</p>
                <ul className="mt-2 space-y-1">
                  {faq.relatedQuestions.map((question, index) => (
                    <li key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Default FAQ Data
const defaultFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'How quickly can you respond to water damage emergencies in Brisbane?',
    answer: 'We guarantee a 1-hour emergency response time for water damage across Brisbane, Ipswich, Logan, Gold Coast, and Sunshine Coast. Our 24/7 emergency teams are strategically located to reach you quickly, minimizing damage and starting the restoration process immediately.',
    category: 'Emergency Response',
    keywords: ['water damage', 'emergency', 'response time', 'Brisbane', '24/7'],
    urgent: true,
    relatedQuestions: ['What areas do you service?', 'Do you work on weekends?']
  },
  {
    id: '2',
    question: 'Will my insurance cover water damage restoration?',
    answer: 'Most home insurance policies cover sudden water damage from burst pipes, storms, or appliance failures. We work directly with all major insurers including QBE, IAG, RACQ, and Allianz. Our team handles the entire claims process, providing detailed documentation and working with adjusters to ensure maximum coverage.',
    category: 'Insurance',
    keywords: ['insurance', 'coverage', 'claim', 'QBE', 'IAG', 'RACQ', 'Allianz'],
    urgent: false,
    relatedQuestions: ['How do I file a claim?', 'What documentation do you provide?']
  },
  {
    id: '3',
    question: 'What should I do immediately after discovering flood damage?',
    answer: 'First, ensure safety - turn off electricity if safe to do so and avoid standing water. Call us immediately at 1300 309 361. Document damage with photos, move valuables to dry areas if possible, and don't throw away damaged items before insurance assessment. Our team will guide you through each step when we arrive.',
    category: 'Emergency Response',
    keywords: ['flood', 'immediate', 'first steps', 'safety', 'emergency'],
    urgent: true,
    relatedQuestions: ['Is flood water dangerous?', 'Can I start cleaning myself?']
  },
  {
    id: '4',
    question: 'How much does water damage restoration cost?',
    answer: 'Costs vary based on the extent of damage, affected area size, and required services. Minor water extraction might start from $500, while extensive flood restoration can range from $3,000 to $15,000+. We provide free assessments and work with your insurance to minimize out-of-pocket expenses. All quotes are transparent with no hidden fees.',
    category: 'Pricing',
    keywords: ['cost', 'price', 'quote', 'estimate', 'fees'],
    urgent: false,
    relatedQuestions: ['Do you offer payment plans?', 'Is the assessment free?']
  }
]

const defaultCategories = [
  'Emergency Response',
  'Insurance',
  'Pricing',
  'Services',
  'Process'
]