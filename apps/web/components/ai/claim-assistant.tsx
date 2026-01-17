'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, AlertTriangle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimAssistantProps {
  description: string;
  damageType?: string;
  location?: { suburb?: string; state?: string };
  insuranceProvider?: string;
  onSuggestion?: (field: string, value: unknown) => void;
  className?: string;
}

interface AIAnalysis {
  damageType?: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence?: number;
  suggestedFields?: {
    australianServiceType?: string;
    emergencyLevel?: string;
    estimatedCost?: { min: number; max: number };
  };
  warnings?: string[];
  suggestions?: string[];
  validation?: {
    isComplete: boolean;
    missingFields: string[];
    recommendations: string[];
  };
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ClaimAssistant({
  description,
  damageType,
  location,
  insuranceProvider,
  onSuggestion,
  className,
}: ClaimAssistantProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Debounce description to avoid too many API calls
  const debouncedDescription = useDebounce(description, 800);

  // Analyze description
  const analyzeDescription = useCallback(async (desc: string) => {
    if (!desc || desc.length < 10) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/claim-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze_description',
          data: {
            description: desc,
            damageType,
            location,
            insuranceProvider,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze description');
      }

      const result = await response.json();

      if (result.success) {
        setAnalysis(result.result);
      } else {
        setError(result.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze');
    } finally {
      setIsAnalyzing(false);
    }
  }, [damageType, location, insuranceProvider]);

  // Get cost estimate
  const getCostEstimate = useCallback(async () => {
    if (!description || description.length < 20) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/ai/claim-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'estimate_cost',
          data: {
            description,
            damageType: analysis?.damageType || damageType,
            location,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.result?.suggestedFields?.estimatedCost) {
          setAnalysis((prev) => ({
            ...prev,
            suggestedFields: {
              ...prev?.suggestedFields,
              estimatedCost: result.result.suggestedFields.estimatedCost,
            },
          }));
        }
      }
    } catch (err) {
      console.error('Cost estimate error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [description, damageType, location, analysis?.damageType]);

  // Auto-analyze when description changes
  useEffect(() => {
    if (debouncedDescription && debouncedDescription.length >= 10) {
      analyzeDescription(debouncedDescription);
    }
  }, [debouncedDescription, analyzeDescription]);

  // Apply suggestion
  const applySuggestion = (field: string, value: unknown) => {
    if (onSuggestion) {
      onSuggestion(field, value);
    }
  };

  // Severity badge colors
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-600 text-white';
      case 'HIGH':
        return 'bg-orange-500 text-white';
      case 'MEDIUM':
        return 'bg-yellow-500 text-black';
      case 'LOW':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Confidence indicator
  const getConfidenceIndicator = (confidence?: number) => {
    if (!confidence) return null;
    const pct = Math.round(confidence * 100);

    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">{pct}% confident</span>
      </div>
    );
  };

  // Service type display names
  const SERVICE_TYPE_NAMES: Record<string, string> = {
    WATER_DAMAGE: 'Water Damage',
    FIRE_DAMAGE: 'Fire Damage',
    STORM_DAMAGE: 'Storm Damage',
    MOULD_REMEDIATION: 'Mould Remediation',
    BIOHAZARD: 'Biohazard Cleanup',
    STRUCTURAL: 'Structural Damage',
    CARPET_CLEANING: 'Carpet Cleaning',
    CONTENT_RESTORATION: 'Content Restoration',
  };

  if (!description || description.length < 10) {
    return (
      <Card className={cn('bg-gray-800/50 border-gray-700', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#00BFA6]" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            Start typing your damage description to get AI-powered suggestions...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('bg-gray-800/50 border-gray-700', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#00BFA6] flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Claim Assistant
            {isAnalyzing && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white h-6 px-2"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}

          {analysis && (
            <>
              {/* Detected Damage Type */}
              {analysis.damageType && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Detected Damage Type</span>
                    {getConfidenceIndicator(analysis.confidence)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#00BFA6]/20 text-[#00BFA6] border-[#00BFA6]/30">
                      {SERVICE_TYPE_NAMES[analysis.damageType] || analysis.damageType}
                    </Badge>
                    {analysis.severity && (
                      <Badge className={getSeverityColor(analysis.severity)}>
                        {analysis.severity} Severity
                      </Badge>
                    )}
                    {onSuggestion && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs text-[#00BFA6] hover:text-[#00BFA6]/80"
                        onClick={() => applySuggestion('damageType', analysis.damageType)}
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Emergency Level */}
              {analysis.suggestedFields?.emergencyLevel && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Urgency Level</span>
                  <Badge
                    className={cn(
                      analysis.suggestedFields.emergencyLevel === 'URGENT'
                        ? 'bg-red-500/20 text-red-400'
                        : analysis.suggestedFields.emergencyLevel === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-blue-500/20 text-blue-400'
                    )}
                  >
                    {analysis.suggestedFields.emergencyLevel}
                  </Badge>
                </div>
              )}

              {/* Cost Estimate */}
              {analysis.suggestedFields?.estimatedCost ? (
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-[#00BFA6]" />
                    <span className="text-sm font-medium text-white">Estimated Cost Range</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    ${analysis.suggestedFields.estimatedCost.min.toLocaleString()} - $
                    {analysis.suggestedFields.estimatedCost.max.toLocaleString()} AUD
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Based on damage type, severity, and location
                  </p>
                  {onSuggestion && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 h-7 text-xs border-[#00BFA6]/30 text-[#00BFA6] hover:bg-[#00BFA6]/10"
                      onClick={() =>
                        applySuggestion(
                          'totalClaimAmountAUD',
                          Math.round(
                            (analysis.suggestedFields!.estimatedCost!.min +
                              analysis.suggestedFields!.estimatedCost!.max) /
                              2
                          ).toString()
                        )
                      }
                    >
                      Use Average as Claim Amount
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCostEstimate}
                  disabled={isAnalyzing}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-2" />
                  )}
                  Get Cost Estimate
                </Button>
              )}

              {/* Warnings */}
              {analysis.warnings && analysis.warnings.length > 0 && (
                <div className="p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-400">Important Notes</span>
                  </div>
                  <ul className="text-sm text-yellow-100 space-y-1">
                    {analysis.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-500">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Suggestions</span>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {analysis.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Validation Status */}
              {analysis.validation && (
                <div
                  className={cn(
                    'p-3 rounded-lg border',
                    analysis.validation.isComplete
                      ? 'bg-green-900/20 border-green-600/30'
                      : 'bg-gray-700/50 border-gray-600'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {analysis.validation.isComplete ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-400">
                          Claim looks complete!
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Missing Information</span>
                      </>
                    )}
                  </div>
                  {analysis.validation.missingFields.length > 0 && (
                    <ul className="text-sm text-gray-400 space-y-1">
                      {analysis.validation.missingFields.map((field, i) => (
                        <li key={i}>• {field}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </>
          )}

          {/* Refresh button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => analyzeDescription(description)}
            disabled={isAnalyzing}
            className="w-full text-gray-400 hover:text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Re-analyze Description
              </>
            )}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
