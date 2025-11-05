/**
 * Disaster Recovery Bot Chat API Endpoint
 *
 * Handles chat requests and connects to the Python bot backend
 * Project: Disaster Recovery & NRPG (NOT RestoreAssist)
 * Business: Phill McGurk - IICRC Master Restorer
 */

import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import * as path from 'path';

// Session storage (in-memory for now, later move to Redis)
const sessions = new Map<string, ChatSession>();

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
 * Call Python bot handler and get response
 */
async function callPythonBot(
  message: string,
  location?: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonPath = process.env.PYTHON_PATH || 'python';
    const scriptPath = path.join(
      process.cwd(),
      'skills',
      'dr-voice-handler',
      'bot_cli.py'
    );

    // Spawn Python process with CLI arguments
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      '--message',
      message,
      ...(location ? ['--location', location] : [])
    ]);

    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python bot error:', errorData);
        reject(new Error(`Python bot exited with code ${code}: ${errorData}`));
        return;
      }

      try {
        // Parse JSON output from Python bot
        const result = JSON.parse(outputData);
        resolve(result);
      } catch (error) {
        console.error('Failed to parse bot response:', outputData);
        reject(new Error('Invalid bot response format'));
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      reject(error);
    });
  });
}

/**
 * Generate fallback response when bot is unavailable
 */
function generateFallbackResponse(message: string): BotResponse {
  return {
    sessionId: '',
    response: `Thank you for contacting Disaster Recovery Brisbane.

Your message has been received. For immediate emergency assistance, please call 1300 309 361.

Our service areas include Brisbane, Ipswich, and Logan. We provide 24/7 emergency response for:
- Water damage and flooding
- Fire and smoke damage
- Mould remediation
- Storm damage
- Sewage cleanup
- Biohazard and trauma cleaning

A team member will respond to your inquiry shortly.`,
    emergencyLevel: 'STANDARD',
    classification: {
      serviceType: 'general_inquiry',
      emergencyLevel: 'STANDARD',
      confidence: 0.5,
      keywordsMatched: []
    },
    routing: {
      routeTo: 'customer_service',
      priority: 'standard',
      responseTime: 'Within 1 business day',
      escalate: false,
      contactMethod: 'email'
    }
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

    // Call Python bot
    let botResult: any;
    try {
      botResult = await callPythonBot(
        message,
        location || session.location
      );
    } catch (error) {
      console.error('Bot call failed, using fallback:', error);
      // Use fallback response if bot fails
      const fallback = generateFallbackResponse(message);
      fallback.sessionId = session.id;

      session.messages.push({
        role: 'bot',
        content: fallback.response,
        timestamp: new Date()
      });

      return NextResponse.json(fallback);
    }

    // Add bot response to session
    session.messages.push({
      role: 'bot',
      content: botResult.suggested_response || botResult.response,
      timestamp: new Date()
    });

    // Build response
    const response: BotResponse = {
      sessionId: session.id,
      response: botResult.suggested_response || botResult.response || botResult.fallback_response,
      emergencyLevel: botResult.classification?.emergency_level || 'STANDARD',
      classification: {
        serviceType: botResult.classification?.service_type || 'general_inquiry',
        emergencyLevel: botResult.classification?.emergency_level || 'STANDARD',
        confidence: botResult.classification?.confidence || 0.5,
        keywordsMatched: botResult.classification?.keywords_matched || []
      },
      routing: {
        routeTo: botResult.routing?.route_to || 'customer_service',
        priority: botResult.routing?.priority || 'standard',
        responseTime: botResult.routing?.response_time || 'Within 1 business day',
        escalate: botResult.routing?.escalate || false,
        contactMethod: botResult.routing?.contact_method || 'email'
      }
    };

    // Add area validation if available
    if (botResult.area_validation) {
      response.areaValidation = {
        isServiced: botResult.area_validation.is_serviced || false,
        region: botResult.area_validation.region || 'unknown',
        suburb: botResult.area_validation.suburb || ''
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
