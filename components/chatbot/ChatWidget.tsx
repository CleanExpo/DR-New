'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Phone,
  AlertTriangle,
  Camera,
  MapPin,
  Globe,
  User,
  Bot,
  Loader2,
  CheckCircle,
  Star,
  ChevronDown,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  FileText,
  Calendar,
  DollarSign,
  Shield,
  CloudRain,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChatMessage, ChatLanguage, Action, EmotionalState, UrgencyLevel } from '@/lib/chatbot/types';
import { useChatbot } from '@/hooks/useChatbot';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface ChatWidgetProps {
  initialOpen?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'full-screen';
  theme?: 'light' | 'dark' | 'auto';
}

export function ChatWidget({
  initialOpen = false,
  position = 'bottom-right',
  theme = 'auto'
}: ChatWidgetProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState<ChatLanguage>('en');
  const [isRecording, setIsRecording] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showLocationRequest, setShowLocationRequest] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [emotionalIndicator, setEmotionalIndicator] = useState<EmotionalState>('neutral');
  const [urgencyIndicator, setUrgencyIndicator] = useState<UrgencyLevel | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechRecognition = useRef<any>(null);

  const {
    messages,
    isConnected,
    isAgentConnected,
    agentInfo,
    sendMessage,
    sendFile,
    requestAgent,
    endConversation,
    rateConversation,
    weatherAlert,
    activeQuote,
    activeBooking,
    suggestedActions
  } = useChatbot();

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      speechRecognition.current = new SpeechRecognition();
      speechRecognition.current.continuous = false;
      speechRecognition.current.interimResults = true;
      speechRecognition.current.lang = language === 'zh' ? 'zh-CN' : language === 'ar' ? 'ar-SA' : 'en-AU';

      speechRecognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      speechRecognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      speechRecognition.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Language change handler
  const handleLanguageChange = (newLang: ChatLanguage) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  // Voice input handler
  const toggleVoiceRecording = () => {
    if (!speechRecognition.current) {
      alert(t('voiceNotSupported'));
      return;
    }

    if (isRecording) {
      speechRecognition.current.stop();
    } else {
      speechRecognition.current.start();
      setIsRecording(true);
    }
  };

  // File upload handler
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      await sendFile(file);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [sendFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10485760 // 10MB
  });

  // Send message handler
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue, language);
      setInputValue('');
      setIsTyping(false);
    }
  };

  // Emergency detection
  useEffect(() => {
    const emergencyKeywords = ['emergency', 'urgent', 'help', 'fire', 'flood'];
    if (emergencyKeywords.some(keyword => inputValue.toLowerCase().includes(keyword))) {
      setShowEmergencyAlert(true);
      setUrgencyIndicator({
        level: 'critical',
        reason: 'Emergency keywords detected',
        suggestedResponseTime: 0
      });
    }
  }, [inputValue]);

  // Action button handlers
  const handleAction = (action: Action) => {
    switch (action.type) {
      case 'call':
        window.location.href = `tel:${action.data?.phone || '1300309361'}`;
        break;
      case 'book':
        // Open booking modal
        break;
      case 'quote':
        // Open quote modal
        break;
      case 'upload':
        fileInputRef.current?.click();
        break;
      case 'escalate':
        requestAgent();
        break;
    }
  };

  // Chat widget classes
  const widgetClasses = cn(
    'fixed z-50 transition-all duration-300',
    {
      'bottom-4 right-4': position === 'bottom-right',
      'bottom-4 left-4': position === 'bottom-left',
      'inset-0': position === 'full-screen',
      'w-full h-full': position === 'full-screen',
      'w-96 h-[600px]': position !== 'full-screen' && isOpen && !isMinimized,
      'w-96 h-20': position !== 'full-screen' && isOpen && isMinimized,
      'w-16 h-16': !isOpen
    }
  );

  return (
    <>
      <AnimatePresence>
        {/* Emergency Alert */}
        {showEmergencyAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60]"
          >
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">{t('emergencyDetected')}</AlertTitle>
              <AlertDescription className="text-red-700">
                {t('emergency')}
                <Button
                  onClick={() => window.location.href = 'tel:1300309361'}
                  className="ml-2 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  {t('callNow')}
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Widget */}
      <div className={widgetClasses}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Closed state - floating button
            <motion.button
              key="chat-button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 relative"
            >
              <MessageCircle className="w-8 h-8 text-white" />
              {messages.filter(m => m.role === 'assistant' && !m.read).length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
              {weatherAlert && (
                <CloudRain className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-bounce" />
              )}
            </motion.button>
          ) : (
            // Open state - chat interface
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/images/chatbot-avatar.png" />
                      <AvatarFallback className="bg-blue-800">
                        {isAgentConnected ? <User /> : <Bot />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {isAgentConnected ? agentInfo?.name : 'DR Assistant'}
                      </h3>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          isConnected ? "bg-green-400" : "bg-red-400"
                        )} />
                        <span>{isConnected ? 'Online' : 'Connecting...'}</span>
                        {urgencyIndicator && (
                          <Badge variant="destructive" className="text-xs">
                            {urgencyIndicator.level.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-blue-800"
                            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                          >
                            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Toggle sound</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Select value={language} onValueChange={(val) => handleLanguageChange(val as ChatLanguage)}>
                      <SelectTrigger className="w-20 h-8 bg-blue-800 border-none text-white">
                        <SelectValue>
                          <Globe className="w-4 h-4" />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-blue-800"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      <ChevronDown className={cn("w-4 h-4 transition-transform", isMinimized && "rotate-180")} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Weather Alert */}
                {weatherAlert && (
                  <Alert className="bg-yellow-500/20 border-yellow-400 text-white p-2 mt-2">
                    <CloudRain className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {t('weatherAlert', { alert: weatherAlert.description })}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {!isMinimized && (
                <>
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive && (
                      <div className="absolute inset-0 bg-blue-50/90 dark:bg-blue-900/90 flex items-center justify-center z-10">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                          <p className="text-blue-600 font-semibold">Drop files here</p>
                        </div>
                      </div>
                    )}

                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 mb-4">{t('greeting')}</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {Object.entries(t('availableServices')).map(([key, label]) => (
                            <Button
                              key={key}
                              variant="outline"
                              size="sm"
                              onClick={() => setInputValue(`I need help with ${label}`)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <MessageBubble
                            key={message.id}
                            message={message}
                            isAgent={isAgentConnected && message.role === 'assistant'}
                            onActionClick={handleAction}
                          />
                        ))}
                        {isTyping && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">{t('typing')}</span>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Upload Progress */}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="px-4 py-2">
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {/* Suggested Actions */}
                  {suggestedActions.length > 0 && (
                    <div className="px-4 py-2 border-t">
                      <div className="flex gap-2 overflow-x-auto">
                        {suggestedActions.map((action, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleAction(action)}
                            className="whitespace-nowrap"
                          >
                            {getActionIcon(action.type)}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active Quote/Booking Display */}
                  {(activeQuote || activeBooking) && (
                    <div className="px-4 py-2 border-t bg-gray-50 dark:bg-gray-800">
                      {activeQuote && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">
                              {t('quoteGenerated', { id: activeQuote.id })}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-green-600">
                            ${activeQuote.total}
                          </span>
                        </div>
                      )}
                      {activeBooking && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">
                            {t('appointmentConfirmed', {
                              date: new Date(activeBooking.preferredDate || '').toLocaleDateString()
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Textarea
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsTyping(true);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder={t('sendMessage')}
                          className="resize-none"
                          rows={2}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <Paperclip className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('uploadPhoto')}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onDrop([file]);
                          }}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={isRecording ? 'destructive' : 'outline'}
                                size="icon"
                                onClick={toggleVoiceRecording}
                              >
                                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('voiceInput')}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowLocationRequest(true)}
                          className="text-xs"
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Location
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs"
                        >
                          <Camera className="w-3 h-3 mr-1" />
                          Photo
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.location.href = 'tel:1300309361'}
                          className="text-xs text-red-600"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        {!isAgentConnected && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={requestAgent}
                            className="text-xs"
                          >
                            <User className="w-3 h-3 mr-1" />
                            Agent
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  {showFeedback && (
                    <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm mb-2">{t('rateExperience')}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                rateConversation(rating);
                                setShowFeedback(false);
                              }}
                            >
                              <Star className={cn(
                                "w-4 h-4",
                                rating <= 3 ? "text-yellow-500" : "text-gray-300"
                              )} />
                            </Button>
                          ))}
                        </div>
                        <div className="flex gap-1 ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              rateConversation(5, 'positive');
                              setShowFeedback(false);
                            }}
                          >
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              rateConversation(1, 'negative');
                              setShowFeedback(false);
                            }}
                          >
                            <ThumbsDown className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// Message Bubble Component
function MessageBubble({
  message,
  isAgent,
  onActionClick
}: {
  message: ChatMessage;
  isAgent: boolean;
  onActionClick: (action: Action) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex gap-2", isUser && "flex-row-reverse")}>
      <Avatar className="w-8 h-8">
        <AvatarFallback className={cn(
          isUser ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
        )}>
          {isUser ? <User className="w-4 h-4 text-white" /> :
           isAgent ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      <div className={cn(
        "max-w-[80%] space-y-2",
        isUser && "items-end"
      )}>
        <div className={cn(
          "rounded-lg p-3",
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"
        )}>
          {message.type === 'text' ? (
            <ReactMarkdown className="text-sm prose dark:prose-invert max-w-none">
              {message.content}
            </ReactMarkdown>
          ) : message.type === 'image' ? (
            <img
              src={message.content}
              alt="Uploaded"
              className="rounded max-w-full"
            />
          ) : (
            <p className="text-sm">{message.content}</p>
          )}
        </div>

        {/* Message Actions */}
        {message.metadata?.suggestedActions && (
          <div className="flex flex-wrap gap-1">
            {message.metadata.suggestedActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => onActionClick(action)}
                className="text-xs"
              >
                {getActionIcon(action.type)}
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Metadata Display */}
        {message.metadata && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {message.metadata.urgency && (
              <Badge variant={
                message.metadata.urgency.level === 'critical' ? 'destructive' :
                message.metadata.urgency.level === 'high' ? 'default' : 'secondary'
              }>
                {message.metadata.urgency.level}
              </Badge>
            )}
            {message.emotionalState && message.emotionalState !== 'neutral' && (
              <span className="italic">{getEmotionEmoji(message.emotionalState)}</span>
            )}
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get action icons
function getActionIcon(type: string) {
  const icons: Record<string, React.ReactNode> = {
    call: <Phone className="w-3 h-3 mr-1" />,
    book: <Calendar className="w-3 h-3 mr-1" />,
    quote: <DollarSign className="w-3 h-3 mr-1" />,
    upload: <ImageIcon className="w-3 h-3 mr-1" />,
    escalate: <User className="w-3 h-3 mr-1" />,
    form: <FileText className="w-3 h-3 mr-1" />
  };
  return icons[type] || null;
}

// Helper function to get emotion emoji
function getEmotionEmoji(emotion: EmotionalState): string {
  const emojis: Record<EmotionalState, string> = {
    neutral: '😐',
    anxious: '😰',
    distressed: '😟',
    frustrated: '😤',
    satisfied: '😊',
    grateful: '🙏'
  };
  return emojis[emotion];
}

export default ChatWidget;