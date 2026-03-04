'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Search,
  User,
  Clock,
  ChevronRight,
  Paperclip,
  Check,
  CheckCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Thread {
  id: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  isOwn: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CommunicationsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showThreadList, setShowThreadList] = useState(true);

  useEffect(() => {
    async function fetchThreads() {
      try {
        const res = await fetch(`/api/client/properties/${id}/communications`);
        if (res.ok) {
          const data = await res.json();
          setThreads(data.threads || []);
        }
      } catch (err) {
        console.error('Failed to fetch communications:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchThreads();

    if (process.env.NODE_ENV === 'development') {
      const demoThreads: Thread[] = [
        {
          id: 'thread-1',
          participantName: 'Metro Plumbing',
          participantRole: 'Contractor',
          lastMessage: 'We\'ll be there Saturday morning between 8-10am. Please ensure access to the main bathroom.',
          lastMessageAt: '2025-03-04T14:30:00Z',
          unreadCount: 1,
          messages: [
            {
              id: 'msg-1',
              senderId: 'user-1',
              senderName: 'You',
              content: 'Hi, I submitted a maintenance request for a leaking tap in the bathroom. When can you come to fix it?',
              createdAt: '2025-03-03T10:00:00Z',
              isRead: true,
              isOwn: true,
            },
            {
              id: 'msg-2',
              senderId: 'contractor-1',
              senderName: 'Metro Plumbing',
              content: 'Hello! Thanks for reaching out. We\'ve reviewed your request and can schedule a visit this Saturday. Would morning or afternoon work better?',
              createdAt: '2025-03-03T11:15:00Z',
              isRead: true,
              isOwn: false,
            },
            {
              id: 'msg-3',
              senderId: 'user-1',
              senderName: 'You',
              content: 'Morning would be great. I\'ll be home all day Saturday.',
              createdAt: '2025-03-03T11:30:00Z',
              isRead: true,
              isOwn: true,
            },
            {
              id: 'msg-4',
              senderId: 'contractor-1',
              senderName: 'Metro Plumbing',
              content: 'We\'ll be there Saturday morning between 8-10am. Please ensure access to the main bathroom.',
              createdAt: '2025-03-04T14:30:00Z',
              isRead: false,
              isOwn: false,
            },
          ],
        },
        {
          id: 'thread-2',
          participantName: 'CleanAir Solutions',
          participantRole: 'Contractor',
          lastMessage: 'The initial mould assessment is complete. We recommend a full remediation treatment. I\'ll send the quote shortly.',
          lastMessageAt: '2025-03-02T16:00:00Z',
          unreadCount: 0,
          messages: [
            {
              id: 'msg-5',
              senderId: 'contractor-2',
              senderName: 'CleanAir Solutions',
              content: 'Good afternoon. We\'ve completed the initial assessment of the mould in your bedroom ceiling.',
              createdAt: '2025-03-02T15:00:00Z',
              isRead: true,
              isOwn: false,
            },
            {
              id: 'msg-6',
              senderId: 'contractor-2',
              senderName: 'CleanAir Solutions',
              content: 'The initial mould assessment is complete. We recommend a full remediation treatment. I\'ll send the quote shortly.',
              createdAt: '2025-03-02T16:00:00Z',
              isRead: true,
              isOwn: false,
            },
          ],
        },
        {
          id: 'thread-3',
          participantName: 'NRPG Support',
          participantRole: 'Platform Support',
          lastMessage: 'Your insurance claim documentation has been received. We\'ll process it within 2 business days.',
          lastMessageAt: '2025-02-28T09:00:00Z',
          unreadCount: 0,
          messages: [
            {
              id: 'msg-7',
              senderId: 'user-1',
              senderName: 'You',
              content: 'I\'ve uploaded the insurance claim documents for the water damage repair. Can you confirm receipt?',
              createdAt: '2025-02-27T14:00:00Z',
              isRead: true,
              isOwn: true,
            },
            {
              id: 'msg-8',
              senderId: 'support-1',
              senderName: 'NRPG Support',
              content: 'Your insurance claim documentation has been received. We\'ll process it within 2 business days.',
              createdAt: '2025-02-28T09:00:00Z',
              isRead: true,
              isOwn: false,
            },
          ],
        },
      ];
      setThreads(demoThreads);
      setLoading(false);
    }
  }, [id]);

  const filteredThreads = threads.filter((t) =>
    t.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectThread = (thread: Thread) => {
    setSelectedThread(thread);
    setShowThreadList(false);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedThread) return;
    setSending(true);

    const optimisticMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user-1',
      senderName: 'You',
      content: newMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
      isOwn: true,
    };

    setSelectedThread({
      ...selectedThread,
      messages: [...selectedThread.messages, optimisticMessage],
      lastMessage: newMessage,
      lastMessageAt: new Date().toISOString(),
    });
    setNewMessage('');

    try {
      await fetch(`/api/client/properties/${id}/communications/${selectedThread.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) {
      return date.toLocaleDateString('en-AU', { weekday: 'short' });
    }
    return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  };

  const totalUnread = threads.reduce((sum, t) => sum + t.unreadCount, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => {
            if (selectedThread && !showThreadList) {
              setShowThreadList(true);
              setSelectedThread(null);
            } else {
              router.push(`/dashboard/property/${id}`);
            }
          }}
          className="text-white/50 hover:text-white mb-6 -ml-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {selectedThread && !showThreadList ? 'All Messages' : 'Property Details'}
        </Button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Communications</h1>
          <p className="text-sm text-white/50 mt-1">
            {threads.length} {threads.length === 1 ? 'conversation' : 'conversations'}
            {totalUnread > 0 && ` \u00B7 ${totalUnread} unread`}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[500px]">
            {/* Thread List */}
            <div className={cn(
              'md:col-span-4',
              !showThreadList && selectedThread ? 'hidden md:block' : 'block'
            )}>
              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/[0.06] text-white placeholder:text-white/30 rounded-sm text-sm"
                />
              </div>

              {filteredThreads.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-10 w-10 text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/40">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredThreads.map((thread) => (
                    <div
                      key={thread.id}
                      onClick={() => selectThread(thread)}
                      className={cn(
                        'p-3 rounded-sm cursor-pointer transition-colors',
                        selectedThread?.id === thread.id
                          ? 'bg-teal-500/10 border border-teal-500/20'
                          : 'bg-white/[0.02] border border-transparent hover:border-white/[0.06]'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-white truncate">
                              {thread.participantName}
                            </p>
                            <span className="text-[10px] text-white/30 shrink-0">
                              {formatTime(thread.lastMessageAt)}
                            </span>
                          </div>
                          <p className="text-xs text-white/30 mt-0.5">{thread.participantRole}</p>
                          <p className="text-xs text-white/40 mt-1 line-clamp-2">{thread.lastMessage}</p>
                        </div>
                        {thread.unreadCount > 0 && (
                          <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-white">{thread.unreadCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Area */}
            <div className={cn(
              'md:col-span-8',
              showThreadList && !selectedThread ? 'hidden md:flex' : 'flex',
              'flex-col'
            )}>
              {!selectedThread ? (
                <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-sm border border-white/[0.06]">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-white/10 mx-auto mb-3" />
                    <p className="text-sm text-white/30">Select a conversation to view messages</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col bg-white/[0.01] rounded-sm border border-white/[0.06] min-h-[500px]">
                  {/* Thread Header */}
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-sm bg-white/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-white/50" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{selectedThread.participantName}</p>
                        <p className="text-[10px] text-white/40">{selectedThread.participantRole}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                    {selectedThread.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn('flex', msg.isOwn ? 'justify-end' : 'justify-start')}
                      >
                        <div
                          className={cn(
                            'max-w-[80%] rounded-sm px-3 py-2',
                            msg.isOwn
                              ? 'bg-teal-600/20 border border-teal-500/20'
                              : 'bg-white/5 border border-white/[0.06]'
                          )}
                        >
                          {!msg.isOwn && (
                            <p className="text-[10px] text-white/40 mb-1">{msg.senderName}</p>
                          )}
                          <p className="text-sm text-white/80 whitespace-pre-wrap">{msg.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[10px] text-white/20">{formatTime(msg.createdAt)}</span>
                            {msg.isOwn && (
                              msg.isRead
                                ? <CheckCheck className="h-3 w-3 text-teal-400" />
                                : <Check className="h-3 w-3 text-white/20" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-white/[0.06]">
                    <div className="flex items-end gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        rows={1}
                        className="flex-1 bg-white/5 border-white/[0.06] text-white rounded-sm resize-none text-sm min-h-[40px] max-h-[120px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!newMessage.trim() || sending}
                        className="bg-teal-600 hover:bg-teal-700 text-white rounded-sm h-10 w-10 p-0 shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
