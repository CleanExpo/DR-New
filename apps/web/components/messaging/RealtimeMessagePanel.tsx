'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import {
  SupabaseRealtimeManager,
  type JobMessage,
  type TypingIndicator,
} from '@/lib/realtime/supabase-realtime';

interface RealtimeMessagePanelProps {
  jobId: string;
  userId: string;
  userName: string;
  userRole: 'client' | 'contractor';
  contractorName?: string;
  className?: string;
  initialCollapsed?: boolean;
}

export function RealtimeMessagePanel({
  jobId,
  userId,
  userName,
  userRole,
  contractorName,
  className = '',
  initialCollapsed = false,
}: RealtimeMessagePanelProps) {
  const [messages, setMessages] = useState<JobMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSending, setSending] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const realtimeManagerRef = useRef<SupabaseRealtimeManager | null>(null);

  // Initialize realtime manager
  useEffect(() => {
    const manager = new SupabaseRealtimeManager(userId);
    realtimeManagerRef.current = manager;

    // Subscribe to job channel
    const channel = manager.subscribeToJob(jobId, {
      onMessage: (message) => {
        // Add message to list
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.some((m) => m.id === message.id)) {
            return prev;
          }
          return [...prev, message];
        });

        // Increment unread count if message is from other user and panel is collapsed
        if (message.senderId !== userId && isCollapsed) {
          setUnreadCount((prev) => prev + 1);
        }

        // Auto-scroll to bottom
        setTimeout(() => scrollToBottom(), 100);
      },

      onTyping: (indicator) => {
        // Show typing indicator for other users
        if (indicator.userId !== userId) {
          setIsTyping(indicator.isTyping);
          setTypingUser(indicator.isTyping ? indicator.userName : null);

          // Auto-hide typing indicator after 3 seconds
          if (indicator.isTyping) {
            setTimeout(() => {
              setIsTyping(false);
              setTypingUser(null);
            }, 3000);
          }
        }
      },
    });

    if (channel) {
      setIsConnected(true);
    }

    // Cleanup on unmount
    return () => {
      manager.unsubscribeAll();
    };
  }, [jobId, userId, isCollapsed]);

  // Load initial messages from database
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}/messages`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
          setTimeout(() => scrollToBottom(), 100);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [jobId]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle typing indicator
  const handleTyping = () => {
    const manager = realtimeManagerRef.current;
    if (!manager) return;

    // Send typing indicator
    manager.sendTypingIndicator(jobId, {
      userId,
      userName,
      isTyping: true,
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      manager.sendTypingIndicator(jobId, {
        userId,
        userName,
        isTyping: false,
      });
    }, 3000);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!messageText.trim() || isSending) return;

    const manager = realtimeManagerRef.current;
    if (!manager) return;

    setSending(true);

    try {
      // Create message object
      const message: JobMessage = {
        id: `${userId}-${Date.now()}`,
        jobId,
        senderId: userId,
        senderName: userName,
        senderRole: userRole,
        message: messageText.trim(),
        timestamp: new Date().toISOString(),
        read: false,
      };

      // Save to database
      const response = await fetch(`/api/jobs/${jobId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error('Failed to save message');
      }

      // Send via realtime channel
      await manager.sendMessage(jobId, message);

      // Add to local state
      setMessages((prev) => [...prev, message]);

      // Clear input
      setMessageText('');

      // Stop typing indicator
      manager.sendTypingIndicator(jobId, {
        userId,
        userName,
        isTyping: false,
      });

      // Scroll to bottom
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      // Clear unread count when expanding
      setUnreadCount(0);
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleString('en-AU', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      {/* Header */}
      <CardHeader
        className="pb-3 border-b border-portal-border cursor-pointer hover:bg-portal-hover transition-colors"
        onClick={toggleCollapsed}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-semantic-contractor" />
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Messages
                {contractorName && userRole === 'client' && (
                  <span className="text-sm text-portal-muted font-normal ml-2">
                    with {contractorName}
                  </span>
                )}
              </CardTitle>
              {isTyping && typingUser && (
                <p className="text-xs text-portal-muted">
                  {typingUser} is typing<span className="animate-pulse">...</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && isCollapsed && (
              <Badge className="bg-dr-emergency text-white">{unreadCount}</Badge>
            )}
            {!isConnected && (
              <Loader2 className="h-4 w-4 text-portal-muted animate-spin" />
            )}
            {isCollapsed ? (
              <ChevronDown className="h-5 w-5 text-portal-muted" />
            ) : (
              <ChevronUp className="h-5 w-5 text-portal-muted" />
            )}
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      {!isCollapsed && (
        <>
          <CardContent className="p-4 h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="h-12 w-12 text-portal-muted mb-3" />
                <p className="text-gray-900 font-medium mb-1">No messages yet</p>
                <p className="text-sm text-portal-muted">Start the conversation</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isOwnMessage = message.senderId === userId;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isOwnMessage
                            ? 'bg-semantic-contractor text-white'
                            : 'bg-portal-hover text-gray-900 border border-portal-border'
                        }`}
                      >
                        {!isOwnMessage && (
                          <p className="text-xs font-semibold mb-1 opacity-80">
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                        <div className="flex items-center justify-end gap-2 mt-2">
                          <span
                            className={`text-xs ${
                              isOwnMessage ? 'text-white/70' : 'text-portal-muted'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </span>
                          {isOwnMessage && (
                            <span className="text-white/70">
                              {message.read ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>

          {/* Message Input */}
          <CardFooter className="border-t border-portal-border p-4">
            <div className="flex gap-2 w-full">
              <Textarea
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  handleTyping();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="resize-none flex-1"
                rows={2}
                maxLength={1000}
                disabled={!isConnected}
              />
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || isSending || !isConnected}
                  className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
                  size="icon"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-portal-border"
                  disabled
                  title="File attachments coming soon"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-portal-muted mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
