'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary';
  color?: 'teal' | 'blue' | 'red' | 'yellow';
  disabled?: boolean;
}

interface QuickActionsPanelProps {
  actions: QuickAction[];
  title?: string;
  description?: string;
  className?: string;
}

const colorClasses = {
  teal: 'bg-semantic-contractor hover:bg-semantic-contractor/90 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  red: 'bg-dr-emergency hover:bg-dr-emergency-hover text-white',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
};

export function QuickActionsPanel({
  actions,
  title = 'Quick Actions',
  description,
  className = '',
}: QuickActionsPanelProps) {
  return (
    <Card
      className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-portal-muted mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const color = action.color || 'teal';
            const baseClasses =
              action.variant === 'outline'
                ? 'border-2 border-portal-border hover:border-semantic-contractor hover:bg-portal-hover text-gray-900'
                : action.variant === 'secondary'
                ? 'bg-portal-hover hover:bg-gray-300 text-gray-900'
                : colorClasses[color];

            return (
              <Button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`h-auto py-4 px-5 flex flex-col items-center gap-2 transition-all duration-200
                           hover:-translate-y-0.5 hover:shadow-md ${baseClasses}`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
