/**
 * Connection Status Component
 * Displays SSE connection status indicator
 */

'use client';

import React from 'react';
import { useRealtime } from '@/lib/hooks/useRealtime';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ConnectionStatusProps {
  showText?: boolean;
  className?: string;
}

export function ConnectionStatus({
  showText = false,
  className = '',
}: ConnectionStatusProps) {
  const { status } = useRealtime();

  const getStatusIcon = () => {
    if (status.connected) {
      return <Wifi className="h-4 w-4" />;
    } else if (status.reconnecting) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    } else {
      return <WifiOff className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    if (status.connected) {
      return 'text-green-600 border-green-600';
    } else if (status.reconnecting) {
      return 'text-yellow-600 border-yellow-600';
    } else {
      return 'text-red-600 border-red-600';
    }
  };

  const getStatusText = () => {
    if (status.connected) {
      return 'Connected';
    } else if (status.reconnecting) {
      return 'Reconnecting';
    } else {
      return 'Disconnected';
    }
  };

  const getStatusDot = () => {
    if (status.connected) {
      return 'bg-green-600 animate-pulse';
    } else if (status.reconnecting) {
      return 'bg-yellow-600 animate-pulse';
    } else {
      return 'bg-red-600';
    }
  };

  if (showText) {
    return (
      <Badge variant="outline" className={`${getStatusColor()} ${className}`}>
        <span className={`h-2 w-2 rounded-full mr-2 ${getStatusDot()}`} />
        {getStatusText()}
      </Badge>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-centre gap-2 ${className}`}>
            <span className={`h-2 w-2 rounded-full ${getStatusDot()}`} />
            <span className={getStatusColor()}>{getStatusIcon()}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Real-time connection: {getStatusText()}</p>
          {status.error && (
            <p className="text-xs text-red-400 mt-1">{status.error}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
