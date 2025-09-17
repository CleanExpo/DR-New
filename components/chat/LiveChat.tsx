'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: Date;
  name?: string;
  isTyping?: boolean;
}

const quickResponses = [
  'I need emergency help',
  'Water damage in my property',
  'Get a quote',
  'Check service availability',
  'Insurance claim assistance'
];

const botResponses: { [key: string]: string } = {
  'emergency': 'I understand this is an emergency. Please call our 24/7 hotline at 1300 309 361 for immediate assistance. A response team can be at your location within 60 minutes.',
  'water': 'Water damage requires immediate attention to prevent further damage and mould growth. Our certified technicians can begin water extraction within 1 hour. Would you like to schedule emergency service?',
  'quote': 'I can help you get a quote. Please provide: 1) Type of damage, 2) Approximate affected area, 3) Your location. For immediate assessment, call 1300 309 361.',
  'insurance': 'We work directly with all major insurance companies and can manage your claim from start to finish. We document everything and ensure you get maximum coverage.',
  'mould': 'Mould can be hazardous to health and requires professional remediation. Our IICRC certified team uses HEPA filtration and containment procedures. Schedule a free inspection today.',
  'fire': 'Fire and smoke damage requires specialized cleaning and restoration. We handle soot removal, odor elimination, and structural repairs. Available 24/7 for emergency response.'
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your Disaster Recovery Assistant. How can I help you today?',
      timestamp: new Date(),
      name: 'DR Assistant'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [agentOnline, setAgentOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Simulate agent status changes
    const interval = setInterval(() => {
      setAgentOnline(prev => Math.random() > 0.3 ? true : prev);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show welcome notification after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let responseText = 'Thank you for your message. ';

      const lowerText = messageText.toLowerCase();
      if (lowerText.includes('emergency') || lowerText.includes('urgent')) {
        responseText = botResponses.emergency;
      } else if (lowerText.includes('water') || lowerText.includes('flood')) {
        responseText = botResponses.water;
      } else if (lowerText.includes('quote') || lowerText.includes('price') || lowerText.includes('cost')) {
        responseText = botResponses.quote;
      } else if (lowerText.includes('insurance') || lowerText.includes('claim')) {
        responseText = botResponses.insurance;
      } else if (lowerText.includes('mould') || lowerText.includes('mold')) {
        responseText = botResponses.mould;
      } else if (lowerText.includes('fire') || lowerText.includes('smoke')) {
        responseText = botResponses.fire;
      } else {
        responseText += 'A specialist will be with you shortly. For immediate assistance, please call 1300 309 361.';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: responseText,
        timestamp: new Date(),
        name: 'DR Assistant'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Unread Badge */}
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold"
              >
                {unreadCount}
              </motion.span>
            )}

            {/* Online Indicator */}
            <span className="absolute top-0 right-0">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${agentOnline ? 'bg-green-400' : 'bg-yellow-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${agentOnline ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              </span>
            </span>

            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>

            {/* Hover Text */}
            <span className="absolute right-full mr-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with us
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 ${agentOnline ? 'bg-green-500' : 'bg-yellow-500'} rounded-full border-2 border-white`}></span>
                </div>
                <div>
                  <div className="font-semibold">Disaster Recovery Support</div>
                  <div className="text-xs text-white/80">
                    {agentOnline ? 'We\'re online' : 'Leave a message'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Messages with ARIA live region for screen readers */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  role="article"
                  aria-label={`${message.type === 'user' ? 'You' : message.name || 'Assistant'}: ${message.text}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.name && message.type !== 'user' && (
                      <div className="text-xs text-gray-500 mb-1 px-2">{message.name}</div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : message.type === 'bot'
                        ? 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                        : 'bg-green-100 text-gray-800 border border-green-200 rounded-bl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator with ARIA announcement */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                  role="status"
                  aria-live="polite"
                  aria-label="Assistant is typing"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            <div className="px-4 py-2 border-t border-gray-200 bg-white">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(response)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full whitespace-nowrap transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  aria-label="Type your message"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  disabled={!inputMessage.trim()}
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}