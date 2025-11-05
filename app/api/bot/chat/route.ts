/**
 * Disaster Recovery Bot Chat API Endpoint
 *
 * Handles chat requests using TypeScript bot (Vercel-compatible)
 * Project: Disaster Recovery & NRPG (NOT RestoreAssist)
 * Business: Phill McGurk - IICRC Master Restorer
 */

import { NextRequest, NextResponse } from 'next/server';
import { DisasterRecoveryBot } from '@/lib/bot/disaster-recovery-bot';

// Session storage (in-memory for now, later move to Redis)
const sessions = new Map<string, ChatSession>();

// Initialize bot instance
const bot = new DisasterRecoveryBot();

interface ChatSession {
  id: string;
  messages: Array<{
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }>;
  location?: string;
  createdAt: Date;
  lastActivity: Date;
}

interface BotRequest {
  sessionId?: string;
  message: string;
  location?: string;
}

interface BotResponse {
  sessionId: string;
  response: string;
  emergencyLevel: string;
  classification: {
    serviceType: string;
    emergencyLevel: string;
    confidence: number;
    keywordsMatched: string[];
  };
  routing: {
    routeTo: string;
    priority: string;
    responseTime: string;
    escalate: boolean;
    contactMethod: string;
  };
  areaValidation?: {
    isServiced: boolean;
    region: string;
    suburb: string;
  };
}

/**
 * Clean up old sessions (older than 30 minutes)
 */
function cleanupSessions() {
  const now = new Date();
  const timeout = 30 * 60 * 1000; // 30 minutes

  const sessionsToDelete: string[] = [];
  sessions.forEach((session, sessionId) => {
    if (now.getTime() - session.lastActivity.getTime() > timeout) {
      sessionsToDelete.push(sessionId);
    }
  });

  sessionsToDelete.forEach(sessionId => sessions.delete(sessionId));
}

/**
 * POST handler for bot chat
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: BotRequest = await request.json();
    const { sessionId, message, location } = body;

    // Validate message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Clean up old sessions periodically
    cleanupSessions();

    // Get or create session
    let session: ChatSession;
    if (sessionId && sessions.has(sessionId)) {
      session = sessions.get(sessionId)!;
    } else {
      session = {
        id: sessionId || `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        messages: [],
        createdAt: new Date(),
        lastActivity: new Date()
      };
      sessions.set(session.id, session);
    }

    // Update session location if provided
    if (location) {
      session.location = location;
    }

    // Add user message to session
    session.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });
    session.lastActivity = new Date();

    // Call TypeScript bot
    let botResult: any;
    try {
      botResult = await bot.processMessage(
        message,
        location || session.location
      );
    } catch (error) {
      console.error('Bot processing error:', error);
      return NextResponse.json(
        {
          error: 'Failed to process message',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Add bot response to session
    session.messages.push({
      role: 'bot',
      content: botResult.response,
      timestamp: new Date()
    });

    // Build response
    const response: BotResponse = {
      sessionId: session.id,
      response: botResult.response,
      emergencyLevel: botResult.classification.emergency_level,
      classification: {
        serviceType: botResult.classification.service_type,
        emergencyLevel: botResult.classification.emergency_level,
        confidence: botResult.classification.confidence,
        keywordsMatched: botResult.classification.keywords_matched
      },
      routing: {
        routeTo: botResult.routing.route_to,
        priority: botResult.routing.priority,
        responseTime: botResult.routing.response_time,
        escalate: botResult.routing.escalate,
        contactMethod: botResult.routing.contact_method
      }
    };

    // Add area validation if available
    if (botResult.area_validation) {
      response.areaValidation = {
        isServiced: botResult.area_validation.is_serviced,
        region: botResult.area_validation.region,
        suburb: botResult.area_validation.suburb
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Bot API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for session info
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    sessionId: session.id,
    messageCount: session.messages.length,
    location: session.location,
    createdAt: session.createdAt,
    lastActivity: session.lastActivity
  });
}
