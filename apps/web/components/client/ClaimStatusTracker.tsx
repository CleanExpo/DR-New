'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface ClaimStage {
  id: string;
  label: string;
  description?: string;
  status: 'completed' | 'current' | 'pending' | 'error';
  completedAt?: string;
  estimatedDuration?: string;
  icon?: LucideIcon;
}

interface ClaimStatusTrackerProps {
  stages: ClaimStage[];
  currentStageIndex: number;
  title?: string;
  showEstimates?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    iconClass: 'text-green-600 bg-green-100',
    lineClass: 'bg-green-500',
    badgeClass: 'bg-green-100 text-green-700',
    textClass: 'text-gray-900',
  },
  current: {
    icon: Clock,
    iconClass: 'text-semantic-contractor bg-semantic-contractor/10 animate-pulse',
    lineClass: 'bg-portal-border',
    badgeClass: 'bg-semantic-contractor text-white',
    textClass: 'text-gray-900 font-semibold',
  },
  pending: {
    icon: Circle,
    iconClass: 'text-portal-muted bg-portal-hover',
    lineClass: 'bg-portal-border',
    badgeClass: 'bg-portal-hover text-portal-muted',
    textClass: 'text-portal-muted',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-dr-emergency bg-dr-emergency/10',
    lineClass: 'bg-dr-emergency/30',
    badgeClass: 'bg-dr-emergency/10 text-dr-emergency',
    textClass: 'text-dr-emergency',
  },
};

export function ClaimStatusTracker({
  stages,
  currentStageIndex,
  title = 'Claim Progress',
  showEstimates = true,
  orientation = 'vertical',
  className = '',
}: ClaimStatusTrackerProps) {
  const getStageNumber = (index: number) => {
    return index + 1;
  };

  const getProgressPercentage = () => {
    if (stages.length === 0) return 0;
    const completedStages = stages.filter((s) => s.status === 'completed').length;
    return Math.round((completedStages / stages.length) * 100);
  };

  if (orientation === 'horizontal') {
    return (
      <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
        <CardHeader className="pb-3 border-b border-portal-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            <Badge variant="outline" className="border-semantic-contractor text-semantic-contractor">
              {getProgressPercentage()}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between relative">
            {/* Progress line (background) */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-portal-border -z-10" />

            {stages.map((stage, index) => {
              const config = statusConfig[stage.status];
              const Icon = stage.icon || config.icon;
              const isLast = index === stages.length - 1;

              return (
                <div key={stage.id} className="flex flex-col items-center flex-1 relative">
                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-1 ${
                        stage.status === 'completed' ? 'bg-green-500' : 'bg-portal-border'
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.iconClass} border-2 border-portal-card z-10`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-medium ${config.textClass}`}>
                      {stage.label}
                    </p>
                    {stage.completedAt && stage.status === 'completed' && (
                      <p className="text-xs text-portal-muted mt-1">
                        {new Date(stage.completedAt).toLocaleDateString('en-AU')}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vertical orientation (default)
  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          <Badge variant="outline" className="border-semantic-contractor text-semantic-contractor">
            {getProgressPercentage()}% Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-portal-border" />

          {/* Stages */}
          <div className="space-y-6">
            {stages.map((stage, index) => {
              const config = statusConfig[stage.status];
              const Icon = stage.icon || config.icon;
              const isLast = index === stages.length - 1;

              return (
                <div key={stage.id} className="relative flex items-start gap-4 group">
                  {/* Icon */}
                  <div className={`relative z-10 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${config.iconClass} border-2 border-portal-card transition-transform group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-base ${config.textClass}`}>
                            {getStageNumber(index)}. {stage.label}
                          </h4>
                          <Badge className={`${config.badgeClass} text-xs`}>
                            {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                          </Badge>
                        </div>

                        {stage.description && (
                          <p className="text-sm text-portal-muted leading-relaxed">
                            {stage.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-portal-muted">
                          {stage.completedAt && stage.status === 'completed' && (
                            <span>
                              Completed: {new Date(stage.completedAt).toLocaleDateString('en-AU', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          )}

                          {showEstimates && stage.estimatedDuration && stage.status !== 'completed' && (
                            <span>
                              Est. duration: {stage.estimatedDuration}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Current stage indicator */}
                      {stage.status === 'current' && (
                        <ChevronRight className="h-5 w-5 text-semantic-contractor animate-pulse flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
