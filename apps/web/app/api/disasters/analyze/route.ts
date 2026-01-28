import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getDisasterRecoveryAgent } from '@/lib/services/disasterRecoveryAgent.service';

export async function POST(request: NextRequest) {
    try {
          const authResult = await authenticateRequest(request);
          if (!authResult.success) {
            return authResult.response;
          }

          const { user } = authResult.context;

          const {
                  disasterType,
                  severity,
                  description,
                  affectedAreas,
          } = await request.json();

      if (!disasterType || !severity || !description) {
              return NextResponse.json(
                {
                            error:
                                          'Missing required fields: disasterType, severity, description',
                },
                { status: 400 }
                      );
      }

      const agent = getDisasterRecoveryAgent();
          const result = await agent.analyzeDisaster(
            {
                      type: disasterType,
                      severity,
                      description,
                      affectedAreas: affectedAreas || [],
            },
                  user.id
                );

      return NextResponse.json({
              success: true,
              ...result,
      });
    } catch (error) {
          return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Analysis failed' },
            { status: 500 }
                );
    }
}
