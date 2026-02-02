'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'teal' | 'blue' | 'green' | 'yellow' | 'red';
}

interface StatsOverviewProps {
  stats: StatItem[];
  className?: string;
}

const colorClasses = {
  teal: {
    icon: 'text-semantic-contractor',
    bg: 'from-semantic-contractor/20 to-[#3B82F6]/20',
  },
  blue: {
    icon: 'text-blue-500',
    bg: 'from-blue-500/20 to-[#3B82F6]/20',
  },
  green: {
    icon: 'text-green-600',
    bg: 'from-green-500/20 to-emerald-500/20',
  },
  yellow: {
    icon: 'text-yellow-500',
    bg: 'from-yellow-500/20 to-orange-500/20',
  },
  red: {
    icon: 'text-dr-emergency',
    bg: 'from-dr-emergency/20 to-red-500/20',
  },
};

export function StatsOverview({ stats, className = '' }: StatsOverviewProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const color = stat.color || 'teal';
        const colorClass = colorClasses[color];

        return (
          <Card
            key={index}
            className="bg-portal-card rounded-xl border border-portal-border shadow-lg
                       transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-portal-muted text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>

                  {stat.change && (
                    <div className="flex items-center gap-2 mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : stat.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : null}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === 'up'
                            ? 'text-green-600'
                            : stat.trend === 'down'
                            ? 'text-red-600'
                            : 'text-portal-muted'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className={`bg-gradient-to-br ${colorClass.bg} p-3 rounded-lg`}
                >
                  <Icon className={`w-6 h-6 ${colorClass.icon}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
