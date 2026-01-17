'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Sparkles,
  Loader2,
  MapPin,
  AlertTriangle,
  Zap,
  X,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParsedFilters {
  serviceTypes: string[];
  urgencyLevel: 'EMERGENCY' | 'URGENT' | 'HIGH' | 'STANDARD' | 'FLEXIBLE';
  location: {
    suburb?: string;
    state?: string;
    postcode?: string;
    city?: string;
  };
  keywords: string[];
}

interface ParsedQuery {
  intent: 'find_contractor' | 'get_quote' | 'emergency_help' | 'general_inquiry';
  serviceType: string | null;
  urgency: string;
  location: ParsedFilters['location'];
  confidence: number;
  originalQuery: string;
}

interface SemanticSearchInputProps {
  onSearch: (query: string, filters: ParsedFilters, parsed: ParsedQuery) => void;
  placeholder?: string;
  className?: string;
  showFiltersPreview?: boolean;
}

// Service type display names
const SERVICE_TYPE_NAMES: Record<string, string> = {
  WATER_DAMAGE: 'Water Damage',
  FIRE_DAMAGE: 'Fire Damage',
  STORM_DAMAGE: 'Storm Damage',
  MOULD_REMEDIATION: 'Mould Remediation',
  BIOHAZARD: 'Biohazard',
  STRUCTURAL: 'Structural',
  CARPET_CLEANING: 'Carpet Cleaning',
  CONTENT_RESTORATION: 'Content Restoration',
  EMERGENCY_RESPONSE: 'Emergency Response',
};

// Urgency colors
const URGENCY_COLORS: Record<string, string> = {
  EMERGENCY: 'bg-red-500/20 text-red-400 border-red-500/30',
  URGENT: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  HIGH: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  STANDARD: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  FLEXIBLE: 'bg-green-500/20 text-green-400 border-green-500/30',
};

// Example queries
const EXAMPLE_QUERIES = [
  'Water damage in Sydney, need help today',
  'Fire restoration Melbourne urgent',
  'Mould removal Brisbane',
  'Emergency flood cleanup 2000',
];

export default function SemanticSearchInput({
  onSearch,
  placeholder = 'Describe what you need, e.g., "Water damage in Sydney, need help today"',
  className,
  showFiltersPreview = true,
}: SemanticSearchInputProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [parsedResult, setParsedResult] = useState<{
    parsed: ParsedQuery;
    filters: ParsedFilters;
    suggestions?: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search parsing
  const parseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parse the query using the semantic search API
  const parseQuery = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setParsedResult(null);
      return;
    }

    try {
      const response = await fetch('/api/ai/semantic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse query');
      }

      const result = await response.json();

      if (result.success) {
        setParsedResult({
          parsed: result.parsed,
          filters: result.filters,
          suggestions: result.suggestions,
        });
        setError(null);
      } else {
        setError(result.error || 'Failed to parse query');
      }
    } catch (err) {
      console.error('Semantic search parse error:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse query');
    }
  }, []);

  // Auto-parse as user types (debounced)
  useEffect(() => {
    if (parseTimeoutRef.current) {
      clearTimeout(parseTimeoutRef.current);
    }

    if (query.trim().length >= 3) {
      parseTimeoutRef.current = setTimeout(() => {
        parseQuery(query);
      }, 500);
    } else {
      setParsedResult(null);
    }

    return () => {
      if (parseTimeoutRef.current) {
        clearTimeout(parseTimeoutRef.current);
      }
    };
  }, [query, parseQuery]);

  // Handle search submission
  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      // If we have parsed results, use them
      if (parsedResult) {
        onSearch(query, parsedResult.filters, parsedResult.parsed);
      } else {
        // Parse first if no results yet
        const response = await fetch('/api/ai/semantic-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Failed to search');
        }

        const result = await response.json();

        if (result.success) {
          onSearch(query, result.filters, result.parsed);
          setParsedResult({
            parsed: result.parsed,
            filters: result.filters,
            suggestions: result.suggestions,
          });
        } else {
          setError(result.error || 'Search failed');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  }, [query, parsedResult, onSearch]);

  // Handle example query click
  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
    setShowExamples(false);
    inputRef.current?.focus();
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setParsedResult(null);
    setError(null);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#00BFA6]" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => !query && setShowExamples(true)}
              onBlur={() => setTimeout(() => setShowExamples(false), 200)}
              placeholder={placeholder}
              className="pl-10 pr-10 h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-lg"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="h-12 px-6 bg-gradient-to-r from-[#00BFA6] to-[#3B82F6] hover:from-[#00A693] hover:to-[#2E7FD6] text-white font-semibold"
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        {/* Example Queries Dropdown */}
        {showExamples && !query && (
          <Card className="absolute z-10 w-full mt-2 bg-gray-800 border-gray-700">
            <CardContent className="p-3">
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Try searching for:
              </p>
              <div className="space-y-1">
                {EXAMPLE_QUERIES.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors"
                  >
                    &quot;{example}&quot;
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Parsed Filters Preview */}
      {showFiltersPreview && parsedResult && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#00BFA6]" />
                AI understood your query as:
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {Math.round(parsedResult.parsed.confidence * 100)}% confident
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {/* Service Types */}
              {parsedResult.filters.serviceTypes.map((type) => (
                <Badge
                  key={type}
                  className="bg-[#00BFA6]/20 text-[#00BFA6] border-[#00BFA6]/30"
                >
                  {SERVICE_TYPE_NAMES[type] || type}
                </Badge>
              ))}

              {/* Urgency */}
              {parsedResult.filters.urgencyLevel && (
                <Badge className={URGENCY_COLORS[parsedResult.filters.urgencyLevel] || ''}>
                  <Zap className="h-3 w-3 mr-1" />
                  {parsedResult.filters.urgencyLevel}
                </Badge>
              )}

              {/* Location */}
              {(parsedResult.filters.location.city ||
                parsedResult.filters.location.state ||
                parsedResult.filters.location.postcode) && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <MapPin className="h-3 w-3 mr-1" />
                  {[
                    parsedResult.filters.location.city,
                    parsedResult.filters.location.state,
                    parsedResult.filters.location.postcode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </Badge>
              )}

              {/* Intent */}
              {parsedResult.parsed.intent === 'emergency_help' && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Emergency Request
                </Badge>
              )}
            </div>

            {/* Suggestions */}
            {parsedResult.suggestions && parsedResult.suggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500 mb-2">Suggestions:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  {parsedResult.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
