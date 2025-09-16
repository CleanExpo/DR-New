'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import {
  ChatMessage,
  Conversation,
  ChatLanguage,
  Action,
  AgentInfo,
  WeatherAlert,
  QuoteInfo,
  BookingInfo,
  ConversationContext,
  CustomerInfo,
  DamageAssessment,
  InsuranceInfo
} from '@/lib/chatbot/types';
import { ChatbotEngine } from '@/lib/chatbot/engine';

interface UseChatbotReturn {
  messages: ChatMessage[];
  isConnected: boolean;
  isAgentConnected: boolean;
  agentInfo: AgentInfo | null;
  sendMessage: (content: string, language?: ChatLanguage) => Promise<void>;
  sendFile: (file: File) => Promise<void>;
  requestAgent: () => void;
  endConversation: () => void;
  rateConversation: (rating: number, feedback?: string) => void;
  weatherAlert: WeatherAlert | null;
  activeQuote: QuoteInfo | null;
  activeBooking: BookingInfo | null;
  suggestedActions: Action[];
  updateCustomerInfo: (info: CustomerInfo) => void;
  submitDamageAssessment: (assessment: DamageAssessment) => void;
  submitInsuranceInfo: (info: InsuranceInfo) => void;
  requestQuote: (serviceType: string) => void;
  scheduleBooking: (booking: BookingInfo) => void;
  getConversationHistory: () => Conversation | null;
}

export function useChatbot(): UseChatbotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const [agentInfo, setAgentInfo] = useState<AgentInfo | null>(null);
  const [weatherAlert, setWeatherAlert] = useState<WeatherAlert | null>(null);
  const [activeQuote, setActiveQuote] = useState<QuoteInfo | null>(null);
  const [activeBooking, setActiveBooking] = useState<BookingInfo | null>(null);
  const [suggestedActions, setSuggestedActions] = useState<Action[]>([]);
  const [conversationId, setConversationId] = useState<string>('');
  const [context, setContext] = useState<ConversationContext>({});

  const socketRef = useRef<Socket | null>(null);
  const engineRef = useRef<ChatbotEngine | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize connection
  useEffect(() => {
    initializeConnection();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Initialize WebSocket connection and chatbot engine
  const initializeConnection = useCallback(() => {
    // Initialize chatbot engine
    engineRef.current = new ChatbotEngine();

    // Create conversation ID
    const convId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(convId);

    // Initialize Socket.IO connection
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    socketRef.current = socket;

    // Socket event handlers
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to chat server');

      // Join conversation room
      socket.emit('join-conversation', { conversationId: convId });

      // Send initial greeting
      sendBotMessage({
        content: 'Hello! I\'m here to help with your disaster recovery needs. How can I assist you today?',
        type: 'text',
        language: 'en'
      });

      // Check for weather alerts
      fetchWeatherAlerts();
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from chat server');

      // Attempt to reconnect
      reconnectTimeoutRef.current = setTimeout(() => {
        initializeConnection();
      }, 5000);
    });

    // Message handlers
    socket.on('message', (message: ChatMessage) => {
      setMessages(prev => [...prev, { ...message, read: false }]);

      // Update suggested actions if present
      if (message.metadata?.suggestedActions) {
        setSuggestedActions(message.metadata.suggestedActions);
      }

      // Play notification sound if enabled
      playNotificationSound();
    });

    socket.on('agent-joined', (agent: AgentInfo) => {
      setIsAgentConnected(true);
      setAgentInfo(agent);
      sendSystemMessage(`${agent.name} has joined the conversation`);
    });

    socket.on('agent-left', () => {
      setIsAgentConnected(false);
      setAgentInfo(null);
      sendSystemMessage('Agent has left the conversation');
    });

    socket.on('typing', ({ isTyping }: { isTyping: boolean }) => {
      // Handle typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          // Clear typing after 3 seconds
        }, 3000);
      }
    });

    socket.on('quote-generated', (quote: QuoteInfo) => {
      setActiveQuote(quote);
      sendSystemMessage(`Quote #${quote.id} has been generated: $${quote.total}`);
    });

    socket.on('booking-confirmed', (booking: BookingInfo) => {
      setActiveBooking(booking);
      sendSystemMessage(`Appointment confirmed for ${new Date(booking.preferredDate || '').toLocaleDateString()}`);
    });

    socket.on('weather-alert', (alert: WeatherAlert) => {
      setWeatherAlert(alert);
      sendSystemMessage(`Weather Alert: ${alert.description}`);
    });
  }, []);

  // Send message
  const sendMessage = useCallback(async (content: string, language: ChatLanguage = 'en') => {
    if (!content.trim() || !engineRef.current) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: generateId(),
      conversationId,
      role: 'user',
      type: 'text',
      content,
      timestamp: new Date(),
      language
    };

    // Add to messages
    setMessages(prev => [...prev, userMessage]);

    // Send to server if connected
    if (socketRef.current?.connected) {
      socketRef.current.emit('message', userMessage);
    }

    // Process with AI engine
    try {
      const response = await engineRef.current.processMessage(
        content,
        conversationId,
        language
      );

      // Create assistant message
      const assistantMessage: ChatMessage = {
        id: generateId(),
        conversationId,
        role: 'assistant',
        type: 'text',
        content: response.response,
        metadata: response.metadata,
        timestamp: new Date(),
        language,
        emotionalState: response.metadata.sentiment?.emotion
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Update suggested actions
      if (response.suggestedActions) {
        setSuggestedActions(response.suggestedActions);
      }

      // Check if escalation is needed
      if (response.requiresEscalation) {
        requestAgent();
      }

      // Send to server
      if (socketRef.current?.connected) {
        socketRef.current.emit('message', assistantMessage);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      sendErrorMessage('I apologize, but I\'m having trouble processing your request. Please try again.');
    }
  }, [conversationId]);

  // Send file
  const sendFile = useCallback(async (file: File) => {
    if (!file || !socketRef.current?.connected) return;

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversationId', conversationId);

    try {
      // Upload file to server
      const response = await fetch('/api/chatbot/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();

      // Create message with file
      const fileMessage: ChatMessage = {
        id: generateId(),
        conversationId,
        role: 'user',
        type: file.type.startsWith('image/') ? 'image' : 'file',
        content: data.url,
        attachments: [{
          id: data.id,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: data.url,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          analysis: data.analysis
        }],
        timestamp: new Date(),
        language: 'en'
      };

      setMessages(prev => [...prev, fileMessage]);
      socketRef.current.emit('message', fileMessage);

      // Process damage assessment if it's an image
      if (file.type.startsWith('image/') && data.analysis) {
        sendBotMessage({
          content: `I've analyzed the damage in your photo. ${data.analysis.recommendations?.join(' ')} The estimated repair cost is between $${data.analysis.estimatedCost?.min || 0} and $${data.analysis.estimatedCost?.max || 0}.`,
          type: 'text',
          language: 'en'
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      sendErrorMessage('Failed to upload file. Please try again.');
    }
  }, [conversationId]);

  // Request agent
  const requestAgent = useCallback(() => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('request-agent', { conversationId });
    sendSystemMessage('Connecting you to a specialist...');
  }, [conversationId]);

  // End conversation
  const endConversation = useCallback(() => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('end-conversation', { conversationId });

    // Show feedback request
    setTimeout(() => {
      sendBotMessage({
        content: 'Thank you for chatting with us. Would you mind rating your experience?',
        type: 'text',
        language: 'en'
      });
    }, 500);
  }, [conversationId]);

  // Rate conversation
  const rateConversation = useCallback((rating: number, feedback?: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('rate-conversation', {
      conversationId,
      rating,
      feedback
    });

    sendBotMessage({
      content: 'Thank you for your feedback! We appreciate your time.',
      type: 'text',
      language: 'en'
    });
  }, [conversationId]);

  // Update customer info
  const updateCustomerInfo = useCallback((info: CustomerInfo) => {
    setContext(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info }
    }));

    if (socketRef.current?.connected) {
      socketRef.current.emit('update-context', {
        conversationId,
        context: { customerInfo: info }
      });
    }
  }, [conversationId]);

  // Submit damage assessment
  const submitDamageAssessment = useCallback((assessment: DamageAssessment) => {
    setContext(prev => ({
      ...prev,
      damageAssessment: assessment
    }));

    if (socketRef.current?.connected) {
      socketRef.current.emit('submit-assessment', {
        conversationId,
        assessment
      });
    }

    sendBotMessage({
      content: `I've recorded your damage assessment. Based on the ${assessment.severity} ${assessment.type} damage, I recommend immediate action. Would you like to schedule an emergency visit?`,
      type: 'text',
      language: 'en'
    });
  }, [conversationId]);

  // Submit insurance info
  const submitInsuranceInfo = useCallback((info: InsuranceInfo) => {
    setContext(prev => ({
      ...prev,
      insuranceInfo: info
    }));

    if (socketRef.current?.connected) {
      socketRef.current.emit('submit-insurance', {
        conversationId,
        insurance: info
      });
    }

    sendBotMessage({
      content: 'I\'ve recorded your insurance information. We can work directly with your insurance provider to streamline the claims process.',
      type: 'text',
      language: 'en'
    });
  }, [conversationId]);

  // Request quote
  const requestQuote = useCallback((serviceType: string) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('request-quote', {
      conversationId,
      serviceType,
      context
    });

    sendSystemMessage('Generating quote...');
  }, [conversationId, context]);

  // Schedule booking
  const scheduleBooking = useCallback((booking: BookingInfo) => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit('schedule-booking', {
      conversationId,
      booking
    });

    sendSystemMessage('Processing your booking...');
  }, [conversationId]);

  // Get conversation history
  const getConversationHistory = useCallback((): Conversation | null => {
    if (!conversationId || messages.length === 0) return null;

    return {
      id: conversationId,
      status: isAgentConnected ? 'agent_handoff' : 'active',
      language: 'en',
      messages,
      context,
      startTime: messages[0]?.timestamp || new Date(),
      agentId: agentInfo?.id
    };
  }, [conversationId, messages, context, isAgentConnected, agentInfo]);

  // Helper functions
  const sendBotMessage = (params: { content: string; type: string; language: ChatLanguage }) => {
    const message: ChatMessage = {
      id: generateId(),
      conversationId,
      role: 'assistant',
      type: params.type as any,
      content: params.content,
      timestamp: new Date(),
      language: params.language
    };
    setMessages(prev => [...prev, message]);
  };

  const sendSystemMessage = (content: string) => {
    const message: ChatMessage = {
      id: generateId(),
      conversationId,
      role: 'system',
      type: 'text',
      content,
      timestamp: new Date(),
      language: 'en'
    };
    setMessages(prev => [...prev, message]);
  };

  const sendErrorMessage = (content: string) => {
    sendBotMessage({
      content,
      type: 'text',
      language: 'en'
    });
  };

  const playNotificationSound = () => {
    if (typeof window !== 'undefined' && 'Audio' in window) {
      try {
        const audio = new Audio('/sounds/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch {}
    }
  };

  const fetchWeatherAlerts = async () => {
    try {
      const response = await fetch('/api/weather/alerts');
      if (response.ok) {
        const alerts = await response.json();
        if (alerts.length > 0) {
          setWeatherAlert(alerts[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
    }
  };

  const generateId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  return {
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
    suggestedActions,
    updateCustomerInfo,
    submitDamageAssessment,
    submitInsuranceInfo,
    requestQuote,
    scheduleBooking,
    getConversationHistory
  };
}