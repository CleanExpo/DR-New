'use client';

/**
 * Emergency Chatbot Component
 * AI-powered chat interface for emergency triage and support
 */

import { useState, useRef, useEffect } from 'react';
import { Send, X, Phone, AlertCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  urgency?: 'critical' | 'high' | 'medium' | 'low';
  actions?: Array<{
    label: string;
    action: 'call' | 'form' | 'link';
    value: string;
  }>;
}

export function EmergencyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm here to help with your disaster recovery emergency. Please describe your situation and I'll assess the urgency and guide you to the right help.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) {return;}

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        urgency: data.urgency,
        actions: data.suggestedActions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I'm having trouble processing your request. For immediate emergency assistance, please call 1300 309 361.",
        timestamp: new Date(),
        urgency: 'high',
        actions: [
          {
            label: 'Call Now',
            action: 'call',
            value: '1300309361',
          },
        ],
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (action: {
    label: string;
    action: 'call' | 'form' | 'link';
    value: string;
  }) => {
    switch (action.action) {
      case 'call':
        window.location.href = `tel:${action.value}`;
        break;
      case 'link':
        window.location.href = action.value;
        break;
      case 'form':
        window.location.href = action.value;
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
          aria-label="Open emergency chat"
        >
          <Bot className="h-8 w-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-lg bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-red-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Emergency Assistant</h3>
                <p className="text-xs text-red-100">24/7 AI-Powered Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 flex-shrink-0">
                    <Bot className="h-5 w-5" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.urgency === 'critical' && (
                    <div className="mb-2 flex items-center gap-2 text-red-600 font-semibold">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">CRITICAL EMERGENCY</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>

                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      {message.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(action)}
                          className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                            action.action === 'call'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {action.action === 'call' && (
                            <Phone className="h-4 w-4" />
                          )}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-1 text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 flex-shrink-0">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your emergency..."
                className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white transition-colors hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed self-end"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center">
              For immediate emergencies, call{' '}
              <a
                href="tel:1300309361"
                className="font-semibold text-red-600 hover:underline"
              >
                1300 309 361
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
