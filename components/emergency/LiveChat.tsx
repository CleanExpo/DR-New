'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Phone } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const QUICK_REPLIES = [
  'Water damage emergency',
  'Fire damage emergency',
  'Mould problem',
  'Get a quote',
  'Insurance claim help',
];

const AUTO_RESPONSES: Record<string, string> = {
  default:
    "Thanks for contacting Disaster Recovery Brisbane. An emergency specialist will respond within 2 minutes. For immediate assistance, call 1300 309 361.",
  water:
    "Water damage requires immediate attention! Our team can be on-site within 60 minutes. We're checking available crews in your area now.",
  fire:
    "Fire damage emergencies are our priority. We'll dispatch our IICRC Master Restorer team immediately. Expected arrival: 45-60 minutes.",
  mould:
    "Mould remediation specialists are standing by. We can schedule an inspection within 24 hours or provide emergency service if needed.",
  quote:
    "I can help with a quote. Our pricing calculator is available on the site, or we can provide a detailed quote after a free inspection.",
  insurance:
    "We work directly with all major insurers. Our team can handle the entire claims process for you. Let me connect you with a claims specialist.",
};

export function LiveChat({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chat opens
      setTimeout(() => {
        addAgentMessage(
          "Hello! I'm here to help with your emergency restoration needs. How can I assist you today?"
        );
      }, 500);
    }
  }, [isOpen]);

  const addAgentMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: 'agent',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) {return;}

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    setInputValue('');

    // Determine response based on keywords
    let response = AUTO_RESPONSES.default;
    const lowerText = text.toLowerCase();

    if (lowerText.includes('water')) {response = AUTO_RESPONSES.water;}
    else if (lowerText.includes('fire')) {response = AUTO_RESPONSES.fire;}
    else if (lowerText.includes('mould') || lowerText.includes('mold'))
      {response = AUTO_RESPONSES.mould;}
    else if (lowerText.includes('quote') || lowerText.includes('price'))
      {response = AUTO_RESPONSES.quote;}
    else if (lowerText.includes('insurance') || lowerText.includes('claim'))
      {response = AUTO_RESPONSES.insurance;}

    addAgentMessage(response);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl p-4 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open live chat"
      >
        <MessageCircle className="w-6 h-6" />

        {/* Notification Badge */}
        <motion.div
          className="absolute -top-1 -right-1 bg-emergency-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          1
        </motion.div>

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-primary-400 rounded-full -z-10"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-140px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Emergency Chat</h3>
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                  <span>Online - Response in ~2 min</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-primary-100'
                          : 'text-neutral-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 py-3 bg-white border-t border-neutral-200">
                <p className="text-xs text-neutral-600 mb-2 font-semibold">
                  Quick responses:
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {handleSendMessage(inputValue);}
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border-2 border-neutral-300 rounded-full focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
                  aria-label="Chat message"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Emergency Call Option */}
              <a
                href="tel:1300309361"
                className="mt-3 flex items-center justify-center gap-2 w-full bg-emergency-50 text-emergency-700 hover:bg-emergency-100 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call for Immediate Help: 1300 309 361
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
