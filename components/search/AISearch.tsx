'use client';

/**
 * AI-Powered Semantic Search Component
 * Intelligent search with query understanding and semantic matching
 */

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, TrendingUp, MapPin, Wrench } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  category: string;
  excerpt: string;
  score: number;
  relevanceReason: string;
}

interface SearchProps {
  placeholder?: string;
  popularSearches?: string[];
  onResultClick?: (result: SearchResult) => void;
}

export function AISearch({
  placeholder = 'Search for services, locations, or help...',
  popularSearches = [
    'water damage restoration Brisbane',
    'emergency flood help',
    'mould removal cost',
    '24/7 emergency service',
  ],
  onResultClick,
}: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      setDidYouMean(null);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      setResults(data.results || []);
      setSuggestions(data.suggestions || []);
      setDidYouMean(data.didYouMean || null);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to empty results
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else {
      window.location.href = result.url;
    }
    setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service':
        return <Wrench className="h-4 w-4 text-blue-600" />;
      case 'location':
        return <MapPin className="h-4 w-4 text-green-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service':
        return 'bg-blue-50 text-blue-700';
      case 'location':
        return 'bg-green-50 text-green-700';
      case 'emergency':
        return 'bg-red-50 text-red-700';
      case 'faq':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const showDropdown = isFocused && (query.length > 0 || popularSearches.length > 0);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}

        {isLoading && (
          <div className="absolute inset-y-0 right-12 flex items-center pr-2">
            <Loader2 className="h-5 w-5 text-red-600 animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto">
          {/* Did You Mean? */}
          {didYouMean && (
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm text-gray-600">
                Did you mean:{' '}
                <button
                  onClick={() => handleSuggestionClick(didYouMean)}
                  className="font-semibold text-red-600 hover:underline"
                >
                  {didYouMean}
                </button>
                ?
              </p>
            </div>
          )}

          {/* Popular Searches (when no query) */}
          {!query && popularSearches.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Popular Searches
              </p>
              <div className="space-y-1">
                {popularSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Suggestions
              </p>
              <div className="space-y-1">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 text-sm text-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getCategoryIcon(result.category)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {result.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(
                            result.category
                          )}`}
                        >
                          {result.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {result.excerpt}
                      </p>
                      {result.relevanceReason && (
                        <p className="text-xs text-gray-500 mt-1">
                          {result.relevanceReason}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && !isLoading && (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-600 mb-2">No results found for "{query}"</p>
              <p className="text-sm text-gray-500">
                Try searching for services like "water damage" or locations like
                "Brisbane"
              </p>
              <div className="mt-4">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                >
                  Call 1300 309 361 for immediate help
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
