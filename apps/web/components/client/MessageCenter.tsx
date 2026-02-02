'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Search, MoreVertical, Check, CheckCheck } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  read?: boolean;
  delivered?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  }>;
  lastMessage?: Message;
  unreadCount: number;
  messages: Message[];
}

interface MessageCenterProps {
  threads: Thread[];
  currentUserId: string;
  onSendMessage: (threadId: string, content: string) => Promise<void>;
  onThreadSelect?: (threadId: string) => void;
  title?: string;
  className?: string;
}

export function MessageCenter({
  threads,
  currentUserId,
  onSendMessage,
  onThreadSelect,
  title = 'Messages',
  className = '',
}: MessageCenterProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    threads.length > 0 ? threads[0].id : null
  );
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedThread?.messages]);

  const handleThreadClick = (threadId: string) => {
    setSelectedThreadId(threadId);
    onThreadSelect?.(threadId);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedThreadId || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(selectedThreadId, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.participants.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          <Badge variant="outline" className="border-semantic-contractor text-semantic-contractor">
            {threads.reduce((sum, t) => sum + t.unreadCount, 0)} Unread
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          {/* Thread list */}
          <div className="md:col-span-1 border-r border-portal-border flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-portal-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-portal-muted" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-portal-border focus:border-semantic-contractor"
                />
              </div>
            </div>

            {/* Thread list */}
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-portal-muted text-sm">No conversations found</p>
                </div>
              ) : (
                filteredThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => handleThreadClick(thread.id)}
                    className={`w-full p-4 text-left hover:bg-portal-hover transition-colors border-b border-portal-border
                               ${selectedThreadId === thread.id ? 'bg-semantic-contractor/5 border-l-4 border-l-semantic-contractor' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={thread.participants[0]?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 text-semantic-contractor font-semibold">
                          {thread.participants[0]?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {thread.title}
                          </p>
                          {thread.lastMessage && (
                            <span className="text-xs text-portal-muted whitespace-nowrap">
                              {formatTimestamp(thread.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        {thread.lastMessage && (
                          <p className="text-sm text-portal-muted truncate">
                            {thread.lastMessage.content}
                          </p>
                        )}
                        {thread.unreadCount > 0 && (
                          <Badge className="mt-1 bg-semantic-contractor text-white text-xs">
                            {thread.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message area */}
          <div className="md:col-span-2 flex flex-col">
            {selectedThread ? (
              <>
                {/* Thread header */}
                <div className="p-4 border-b border-portal-border bg-portal-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedThread.participants[0]?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 text-semantic-contractor font-semibold">
                          {selectedThread.participants[0]?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedThread.title}</p>
                        <p className="text-xs text-portal-muted">
                          {selectedThread.participants.map((p) => p.name).join(', ')}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5 text-portal-muted" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedThread.messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUserId;

                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                      >
                        {!isCurrentUser && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={message.senderAvatar} />
                            <AvatarFallback className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 text-semantic-contractor text-xs">
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                          {!isCurrentUser && (
                            <p className="text-xs text-portal-muted mb-1">{message.senderName}</p>
                          )}
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              isCurrentUser
                                ? 'bg-semantic-contractor text-white'
                                : 'bg-portal-hover text-gray-900'
                            }`}
                          >
                            <p className="text-sm leading-relaxed break-words">{message.content}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-portal-muted">
                              {formatTimestamp(message.timestamp)}
                            </span>
                            {isCurrentUser && (
                              <>
                                {message.read ? (
                                  <CheckCheck className="h-3 w-3 text-blue-600" />
                                ) : message.delivered ? (
                                  <CheckCheck className="h-3 w-3 text-portal-muted" />
                                ) : (
                                  <Check className="h-3 w-3 text-portal-muted" />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-portal-border bg-portal-hover">
                  <div className="flex items-end gap-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isSending}
                      className="flex-1 border-portal-border focus:border-semantic-contractor"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isSending}
                      className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="text-center">
                  <p className="text-portal-muted">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
