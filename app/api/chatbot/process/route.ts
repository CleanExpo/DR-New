// API Route for processing chat messages with AI
import { NextRequest, NextResponse } from 'next/server';
import { ChatbotEngine } from '@/lib/chatbot/engine';
import { ChatLanguage } from '@/lib/chatbot/types';

const engine = new ChatbotEngine();

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, language, attachments } = await request.json();

    if (!message || !conversationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process message with AI engine
    const response = await engine.processMessage(
      message,
      conversationId,
      language as ChatLanguage || 'en',
      attachments
    );

    // Return processed response
    return NextResponse.json({
      response: response.response,
      metadata: response.metadata,
      suggestedActions: response.suggestedActions,
      requiresEscalation: response.requiresEscalation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Message processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}