'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X, ExternalLink } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Alert {
  id: string;
  type: 'emergency' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  link?: {
    label: string;
    href: string;
  };
  dismissible?: boolean;
  timestamp?: string;
}

interface EmergencyAlertBannerProps {
  alerts: Alert[];
  onDismiss?: (alertId: string) => void;
  className?: string;
}

const alertConfig: Record<Alert['type'], {
  icon: LucideIcon;
  bgClass: string;
  borderClass: string;
  iconClass: string;
  textClass: string;
  badgeClass: string;
}> = {
  emergency: {
    icon: AlertCircle,
    bgClass: 'bg-dr-emergency/10 border-l-4 border-l-dr-emergency',
    borderClass: 'border-dr-emergency/20',
    iconClass: 'text-dr-emergency',
    textClass: 'text-dr-emergency',
    badgeClass: 'bg-dr-emergency text-white',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-yellow-50 border-l-4 border-l-yellow-500',
    borderClass: 'border-yellow-200',
    iconClass: 'text-yellow-600',
    textClass: 'text-yellow-900',
    badgeClass: 'bg-yellow-500 text-white',
  },
  info: {
    icon: Info,
    bgClass: 'bg-blue-50 border-l-4 border-l-blue-500',
    borderClass: 'border-blue-200',
    iconClass: 'text-blue-600',
    textClass: 'text-blue-900',
    badgeClass: 'bg-blue-500 text-white',
  },
  success: {
    icon: CheckCircle,
    bgClass: 'bg-green-50 border-l-4 border-l-green-500',
    borderClass: 'border-green-200',
    iconClass: 'text-green-600',
    textClass: 'text-green-900',
    badgeClass: 'bg-green-500 text-white',
  },
};

export function EmergencyAlertBanner({
  alerts,
  onDismiss,
  className = '',
}: EmergencyAlertBannerProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts((prev) => new Set(prev).add(alertId));
    onDismiss?.(alertId);
  };

  const visibleAlerts = alerts.filter((alert) => !dismissedAlerts.has(alert.id));

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {visibleAlerts.map((alert) => {
        const config = alertConfig[alert.type];
        const Icon = config.icon;

        return (
          <Card
            key={alert.id}
            className={`${config.bgClass} border ${config.borderClass} rounded-xl shadow-lg
                       transition-all duration-300 hover:shadow-xl
                       ${alert.type === 'emergency' ? 'animate-pulse-slow' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 ${alert.type === 'emergency' ? 'animate-bounce-slow' : ''}`}>
                  <div className={`w-10 h-10 rounded-full bg-white/80 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${config.iconClass}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className={`font-bold text-lg ${config.textClass}`}>
                        {alert.title}
                      </h4>
                      <Badge className={`${config.badgeClass} uppercase text-xs font-semibold`}>
                        {alert.type}
                      </Badge>
                    </div>

                    {/* Dismiss button */}
                    {alert.dismissible !== false && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`flex-shrink-0 hover:bg-white/50 ${config.iconClass}`}
                        onClick={() => handleDismiss(alert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <p className="text-gray-900 text-sm leading-relaxed mb-3">
                    {alert.message}
                  </p>

                  {/* Timestamp */}
                  {alert.timestamp && (
                    <p className="text-xs text-portal-muted mb-3">
                      {new Date(alert.timestamp).toLocaleString('en-AU', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  )}

                  {/* Actions */}
                  {(alert.action || alert.link) && (
                    <div className="flex flex-wrap items-center gap-3">
                      {alert.action && (
                        <Button
                          size="sm"
                          className={`${config.badgeClass} hover:opacity-90`}
                          onClick={alert.action.onClick}
                        >
                          {alert.action.label}
                        </Button>
                      )}

                      {alert.link && (
                        <a
                          href={alert.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium ${config.textClass} hover:underline flex items-center gap-1`}
                        >
                          {alert.link.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
