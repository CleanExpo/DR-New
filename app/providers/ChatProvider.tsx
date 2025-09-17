'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useUserBehavior } from '@/components/chatbot/ProactiveEngagement';
import '@/lib/chatbot/translations';

// Dynamic imports to avoid SSR issues
const ChatWidget = dynamic(
  () => import('@/components/chatbot/ChatWidget'),
  { ssr: false }
);

const ProactiveEngagement = dynamic(
  () => import('@/components/chatbot/ProactiveEngagement'),
  { ssr: false }
);

interface ChatContextType {
  openChat: () => void;
  closeChat: () => void;
  isOpen: boolean;
}

const ChatContext = createContext<ChatContextType>({
  openChat: () => {},
  closeChat: () => {},
  isOpen: false
});

export const useChat = () => useContext(ChatContext);

interface ChatProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function ChatProvider({ children, enabled = true }: ChatProviderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const userBehavior = useUserBehavior();

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  // Don't render on admin pages
  const isAdminPage = pathname?.startsWith('/admin');
  const shouldRender = enabled && isMounted && !isAdminPage;

  return (
    <ChatContext.Provider value={{ openChat, closeChat, isOpen: isChatOpen }}>
      {children}
      {shouldRender && (
        <>
          <ChatWidget
            initialOpen={isChatOpen}
            position="bottom-right"
            theme="auto"
          />
          {/* ProactiveEngagement disabled - remove weather alerts */}
        </>
      )}
    </ChatContext.Provider>
  );
}