'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  CloudRain,
  HelpCircle,
  MessageCircle,
  X,
  ChevronRight,
  Phone,
  Clock,
  Shield,
  DollarSign,
  FileText,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProactiveMessage {
  id: string;
  type: 'weather' | 'assistance' | 'service' | 'insurance' | 'tip';
  title: string;
  message: string;
  icon: React.ReactNode;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

interface ProactiveEngagementProps {
  onOpenChat: () => void;
  currentPage?: string;
  userBehavior?: {
    timeOnPage: number;
    scrollDepth: number;
    exitIntent: boolean;
    errorCount: number;
  };
}

export function ProactiveEngagement({
  onOpenChat,
  currentPage = '/',
  userBehavior
}: ProactiveEngagementProps) {
  const [messages, setMessages] = useState<ProactiveMessage[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Trigger conditions
  useEffect(() => {
    const triggers: ProactiveMessage[] = [];

    // Time-based trigger (user on page for 30 seconds)
    if (userBehavior?.timeOnPage && userBehavior.timeOnPage > 30000) {
      triggers.push({
        id: 'time_trigger',
        type: 'assistance',
        title: 'Need Help?',
        message: 'I noticed you\'ve been browsing. Can I help you find specific disaster recovery services?',
        icon: <HelpCircle className="w-5 h-5" />,
        priority: 'low',
        action: {
          label: 'Chat Now',
          onClick: onOpenChat
        },
        dismissible: true
      });
    }

    // Scroll depth trigger (user scrolled 80% of page)
    if (userBehavior?.scrollDepth && userBehavior.scrollDepth > 0.8) {
      triggers.push({
        id: 'scroll_trigger',
        type: 'service',
        title: 'Get Instant Quote',
        message: 'Ready to get a quote? Our AI can provide an estimate in seconds.',
        icon: <DollarSign className="w-5 h-5" />,
        priority: 'medium',
        action: {
          label: 'Get Quote',
          onClick: onOpenChat
        },
        dismissible: true
      });
    }

    // Exit intent trigger
    if (userBehavior?.exitIntent) {
      triggers.push({
        id: 'exit_trigger',
        type: 'assistance',
        title: 'Wait! Emergency Service Available',
        message: '24/7 emergency response available. Call 1300 309 361 or chat with us now.',
        icon: <AlertTriangle className="w-5 h-5" />,
        priority: 'high',
        action: {
          label: 'Get Help Now',
          onClick: onOpenChat
        },
        dismissible: false
      });
    }

    // Error detection trigger
    if (userBehavior?.errorCount && userBehavior.errorCount > 2) {
      triggers.push({
        id: 'error_trigger',
        type: 'assistance',
        title: 'Having Trouble?',
        message: 'It seems you\'re experiencing some issues. Let me help you directly.',
        icon: <MessageCircle className="w-5 h-5" />,
        priority: 'high',
        action: {
          label: 'Get Support',
          onClick: onOpenChat
        },
        dismissible: true
      });
    }

    // Page-specific triggers
    if (currentPage.includes('water-damage')) {
      triggers.push({
        id: 'water_page_trigger',
        type: 'service',
        title: 'Water Damage Emergency?',
        message: '1-hour response time for water damage. Upload photos for instant assessment.',
        icon: <Home className="w-5 h-5" />,
        priority: 'high',
        action: {
          label: 'Start Assessment',
          onClick: onOpenChat
        },
        dismissible: true
      });
    }

    if (currentPage.includes('insurance')) {
      triggers.push({
        id: 'insurance_trigger',
        type: 'insurance',
        title: 'Insurance Claim Assistance',
        message: 'We work directly with insurers. Let us handle your claim documentation.',
        icon: <Shield className="w-5 h-5" />,
        priority: 'medium',
        action: {
          label: 'Get Help',
          onClick: onOpenChat
        },
        dismissible: true
      });
    }

    // Filter out dismissed messages
    const activeMessages = triggers.filter(msg => !dismissed.has(msg.id));
    setMessages(activeMessages);

    // Show messages if there are any
    if (activeMessages.length > 0) {
      setIsVisible(true);
    }
  }, [userBehavior, currentPage, dismissed, onOpenChat]);

  // Weather alert check
  useEffect(() => {
    const checkWeatherAlerts = async () => {
      try {
        const response = await fetch('/api/weather/alerts?location=Brisbane');
        const alerts = await response.json();

        if (alerts.length > 0) {
          const weatherMessage: ProactiveMessage = {
            id: 'weather_alert',
            type: 'weather',
            title: 'Weather Alert',
            message: alerts[0].description,
            icon: <CloudRain className="w-5 h-5" />,
            priority: 'urgent',
            action: {
              label: 'Prepare Now',
              onClick: onOpenChat
            },
            dismissible: false
          };

          setMessages(prev => [weatherMessage, ...prev]);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error fetching weather alerts:', error);
      }
    };

    checkWeatherAlerts();
    const interval = setInterval(checkWeatherAlerts, 300000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [onOpenChat]);

  // Auto-rotate messages
  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex(prev => (prev + 1) % messages.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [messages.length]);

  const handleDismiss = (messageId: string) => {
    setDismissed(prev => new Set(prev).add(messageId));
    const remaining = messages.filter(m => m.id !== messageId);
    if (remaining.length === 0) {
      setIsVisible(false);
    }
  };

  const currentMessage = messages[currentMessageIndex];

  if (!isVisible || !currentMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 right-4 z-40 max-w-sm"
      >
        <Card className={cn(
          "shadow-lg border-2",
          currentMessage.priority === 'urgent' && "border-red-500 animate-pulse",
          currentMessage.priority === 'high' && "border-orange-500",
          currentMessage.priority === 'medium' && "border-yellow-500",
          currentMessage.priority === 'low' && "border-blue-500"
        )}>
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-full",
                  currentMessage.priority === 'urgent' && "bg-red-100 text-red-600",
                  currentMessage.priority === 'high' && "bg-orange-100 text-orange-600",
                  currentMessage.priority === 'medium' && "bg-yellow-100 text-yellow-600",
                  currentMessage.priority === 'low' && "bg-blue-100 text-blue-600"
                )}>
                  {currentMessage.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{currentMessage.title}</h4>
                  <Badge
                    variant={
                      currentMessage.priority === 'urgent' ? 'destructive' :
                      currentMessage.priority === 'high' ? 'default' :
                      'secondary'
                    }
                    className="text-xs mt-1"
                  >
                    {currentMessage.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
              {currentMessage.dismissible && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleDismiss(currentMessage.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Message */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {currentMessage.message}
            </p>

            {/* Action Button */}
            {currentMessage.action && (
              <Button
                onClick={currentMessage.action.onClick}
                className={cn(
                  "w-full",
                  currentMessage.priority === 'urgent' && "bg-red-600 hover:bg-red-700",
                  currentMessage.priority === 'high' && "bg-orange-600 hover:bg-orange-700"
                )}
              >
                {currentMessage.action.label}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {/* Message Navigation (if multiple) */}
            {messages.length > 1 && (
              <div className="flex items-center justify-center gap-1 mt-3">
                {messages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMessageIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentMessageIndex
                        ? "bg-blue-600 w-6"
                        : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Bar */}
        {currentMessage.priority === 'urgent' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-2"
          >
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-700">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-semibold">Emergency Line</span>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => window.location.href = 'tel:1300309361'}
                  >
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// User behavior tracking hook
export function useUserBehavior() {
  const [behavior, setBehavior] = useState({
    timeOnPage: 0,
    scrollDepth: 0,
    exitIntent: false,
    errorCount: 0
  });

  useEffect(() => {
    // Track time on page
    const startTime = Date.now();
    const interval = setInterval(() => {
      setBehavior(prev => ({
        ...prev,
        timeOnPage: Date.now() - startTime
      }));
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollDepth = scrollHeight > 0 ? scrollPosition / scrollHeight : 0;

      setBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollDepth)
      }));
    };

    // Track exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setBehavior(prev => ({ ...prev, exitIntent: true }));
      }
    };

    // Track errors
    const handleError = () => {
      setBehavior(prev => ({ ...prev, errorCount: prev.errorCount + 1 }));
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('error', handleError);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return behavior;
}

export default ProactiveEngagement;