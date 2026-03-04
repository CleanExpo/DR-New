/**
 * Agent Orchestration API Route
 * POST /api/agents/orchestrate - Execute an agent workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { z } from 'zod';
import { getOrchestrator } from '@/lib/agents/core/orchestrator';
import { WorkflowType } from '@/lib/agents/types';

// Import workflows to register them
import '@/lib/agents/workflows/disaster-analysis';

// Request validation schema
const orchestrateRequestSchema = z.object({
  workflow: z.enum([
    'DISASTER_ANALYSIS',
    'CLAIM_PROCESSING',
    'CONTRACTOR_MATCHING',
    'INSPECTION_REPORT',
    'CUSTOMER_SUPPORT',
    'CUSTOM',
  ]),
  input: z.record(z.unknown()),
  stream: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Parse and validate request body
    const body = await request.json();
    const validationResult = orchestrateRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Invalid request body',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { workflow, input, stream } = validationResult.data;

    // Get the orchestrator
    const orchestrator = getOrchestrator();

    // Get user ID from auth context
    const userId = user.id;

    // Execute the workflow
    if (stream) {
      // Streaming response using Server-Sent Events
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of orchestrator.stream({
              workflowType: workflow as WorkflowType,
              input,
              userId,
            })) {
              const data = `data: ${JSON.stringify(event)}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
            controller.close();
          } catch (error) {
            const errorEvent = {
              type: 'error',
              data: {
                error: 'Agent execution failed',
              },
              timestamp: new Date(),
            };
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`)
            );
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Non-streaming response
    const result = await orchestrator.execute({
      workflowType: workflow as WorkflowType,
      input,
      userId,
    });

    return NextResponse.json({
      success: result.status === 'COMPLETED',
      jobId: result.jobId,
      status: result.status,
      output: result.output,
      error: result.error,
      metrics: result.metrics,
    });
  } catch (error) {
    console.error('Agent orchestration error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// GET method for API documentation
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/agents/orchestrate',
    method: 'POST',
    description: 'Execute an AI agent workflow',
    authentication: 'Required (NextAuth session)',
    requestBody: {
      workflow: {
        type: 'string',
        enum: [
          'DISASTER_ANALYSIS',
          'CLAIM_PROCESSING',
          'CONTRACTOR_MATCHING',
          'INSPECTION_REPORT',
          'CUSTOMER_SUPPORT',
          'CUSTOM',
        ],
        description: 'The workflow type to execute',
      },
      input: {
        type: 'object',
        description: 'Workflow-specific input data',
      },
      stream: {
        type: 'boolean',
        optional: true,
        default: false,
        description: 'Enable Server-Sent Events streaming',
      },
    },
    responses: {
      200: {
        success: 'boolean',
        jobId: 'string',
        status: 'COMPLETED | FAILED',
        output: 'object (workflow results)',
        metrics: {
          totalTokens: 'number',
          totalCost: 'number',
          iterations: 'number',
          durationMs: 'number',
        },
      },
      401: { error: 'Unauthorized' },
      400: { error: 'Validation Error' },
      500: { error: 'Internal Server Error' },
    },
    examples: {
      disasterAnalysis: {
        workflow: 'DISASTER_ANALYSIS',
        input: {
          scenario: {
            type: 'flood',
            severity: 7,
            description: 'Kitchen flooding from burst pipe under sink',
            affectedAreas: ['kitchen', 'dining room'],
            location: {
              state: 'NSW',
              suburb: 'Sydney',
              postcode: '2000',
            },
          },
        },
      },
    },
  });
}
