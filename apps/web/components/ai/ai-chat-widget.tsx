'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sparkles,
  X,
  Send,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertTriangle,
  Phone,
  Lightbulb,
  Bot,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface AIChatWidgetProps {
  userId?: string;
  userType?: 'homeowner' | 'contractor' | 'admin' | 'guest';
  currentPage?: string;
  claimId?: string;
  bookingId?: string;
  onEscalate?: (conversation: ChatMessage[]) => void;
  className?: string;
}

// Quick action buttons
const QUICK_ACTIONS = [
  { label: 'Submit a claim', query: "How do I submit an insurance claim?" },
  { label: 'Find contractors', query: "Help me find a contractor for water damage" },
  { label: 'Check status', query: "How do I check my booking status?" },
  { label: 'Pricing info', query: "What are the typical costs for restoration services?" },
];

export default function AIChatWidget({
  userId,
  userType = 'guest',
  currentPage,
  claimId,
  bookingId,
  onEscalate,
  className,
}: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [escalationRequired, setEscalationRequired] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Initial greeting when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: ChatMessage = {
        id: 'greeting',
        role: 'assistant',
        content: `G'day! I'm your AI assistant for the Disaster Recovery platform. I can help you with:\n\n- Finding and booking contractors\n- Submitting insurance claims\n- Understanding the recovery process\n- Answering questions about our services\n\nHow can I assist you today?`,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Send message to AI
  const sendMessage = useCallback(
    async (messageContent?: string) => {
      const content = messageContent || inputValue.trim();
      if (!content || isLoading) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);
      setSuggestedActions([]);

      // Add placeholder for assistant message
      const assistantMessageId = `assistant_${Date.now()}`;
      const placeholderMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, placeholderMessage]);

      try {
        // Build conversation history
        const history = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp.toISOString(),
        }));

        // Call the AI chat API with streaming
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            conversationId,
            context: {
              userId,
              currentPage,
              userType,
              claimId,
              bookingId,
            },
            history,
            stream: true,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));

                  if (data.type === 'chunk') {
                    fullContent += data.content;
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: fullContent }
                          : msg
                      )
                    );
                  } else if (data.type === 'done') {
                    // Update conversation metadata
                    if (data.conversationId) {
                      setConversationId(data.conversationId);
                    }
                    if (data.escalationRequired) {
                      setEscalationRequired(true);
                    }
                    if (data.suggestedActions) {
                      setSuggestedActions(data.suggestedActions);
                    }
                  } else if (data.type === 'error') {
                    throw new Error(data.error);
                  }
                } catch {
                  // Ignore parse errors for incomplete chunks
                }
              }
            }
          }
        }

        // Mark message as no longer streaming
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
      } catch (error) {
        console.error('Chat error:', error);
        // Update placeholder with error message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content:
                    "I'm sorry, I encountered an error processing your request. Please try again or contact support@disasterrecovery.com.au for assistance.",
                  isStreaming: false,
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      inputValue,
      isLoading,
      messages,
      conversationId,
      userId,
      currentPage,
      userType,
      claimId,
      bookingId,
    ]
  );

  // Handle escalation
  const handleEscalate = useCallback(() => {
    if (onEscalate) {
      onEscalate(messages);
    }
    // Add escalation message
    const escalationMessage: ChatMessage = {
      id: `escalate_${Date.now()}`,
      role: 'assistant',
      content:
        "I've flagged this conversation for our human support team. A team member will review your query and get back to you shortly at the email address associated with your account. For urgent matters, please email support@disasterrecovery.com.au directly.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, escalationMessage]);
    setEscalationRequired(false);
  }, [messages, onEscalate]);

  // Handle quick action
  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  // Clear chat
  const handleClear = () => {
    setMessages([]);
    setConversationId(null);
    setEscalationRequired(false);
    setSuggestedActions([]);
  };

  return (
    <>
      {/* Floating AI Chat Button */}
      <div
        className={cn('fixed z-50', className)}
        style={{ bottom: '100px', right: '24px', zIndex: 9998 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20',
            isOpen
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED]'
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Sparkles className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div
          className="fixed z-50 w-96 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          style={{
            bottom: '170px',
            right: '24px',
            zIndex: 9998,
            maxHeight: isExpanded ? '80vh' : '550px',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Support</h3>
                  <p className="text-xs text-white/70">Powered by Claude</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea
            className="p-4 bg-gray-900"
            style={{ height: isExpanded ? 'calc(80vh - 180px)' : '350px' }}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-2',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3',
                      message.role === 'user'
                        ? 'bg-[#00BFA6] text-white rounded-br-md'
                        : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.isStreaming && (
                      <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                    )}
                    <p
                      className={cn(
                        'text-xs mt-2',
                        message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-[#00BFA6] rounded-full flex-shrink-0 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (shown when no messages or few messages) */}
            {messages.length <= 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Quick actions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.query)}
                      className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Actions */}
            {suggestedActions.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500">Suggested actions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedActions.map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Escalation Alert */}
            {escalationRequired && (
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-400">
                    Would you like to speak to a human?
                  </span>
                </div>
                <p className="text-xs text-yellow-200/70 mb-3">
                  Your query may benefit from human assistance.
                </p>
                <Button
                  size="sm"
                  onClick={handleEscalate}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Request Human Support
                </Button>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#3B82F6]"
                disabled={isLoading}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Press Enter to send
              </p>
              {messages.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="text-xs text-gray-500 hover:text-gray-300 h-6 px-2"
                >
                  Clear chat
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
