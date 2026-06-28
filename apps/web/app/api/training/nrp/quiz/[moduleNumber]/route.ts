import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getNrpgQuizModule, verifyTrainingSourcesPresent } from '@/lib/training/nrp-training';
import { authenticateRequest } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';

const PASSING_SCORE = 70;
const TIME_LIMIT_MINUTES = 30;

const paramsSchema = z.object({
  moduleNumber: z.string().regex(/^\d+$/),
});

/**
 * GET — deliver the quiz WITHOUT the answer key (DR-858 N-05).
 * `correct` and `explanation` are stripped; grading is server-side only.
 */
export async function GET(_request: NextRequest, context: { params: { moduleNumber: string } }) {
  try {
    await verifyTrainingSourcesPresent();

    const validation = paramsSchema.safeParse(context.params);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const moduleNumber = parseInt(validation.data.moduleNumber, 10);
    const quizModule = await getNrpgQuizModule(moduleNumber);

    if (!quizModule) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Quiz module not found', 404);
    }

    // Client-safe projection — never ship `correct`/`explanation`.
    const questions = quizModule.questions.map((q) => ({
      id: q.id,
      type: q.type,
      question: q.question,
      options: q.options,
      reference: q.reference,
    }));

    return NextResponse.json({
      success: true,
      quiz: {
        moduleNumber,
        name: quizModule.name,
        description: quizModule.description,
        timeLimitMinutes: TIME_LIMIT_MINUTES,
        passingScore: PASSING_SCORE,
        questions,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

const submitSchema = z.object({
  // Map of questionId -> selected option index. Any client-sent score is ignored.
  answers: z.record(z.string(), z.number().int().min(0)),
});

/**
 * POST — grade a submission server-side against the real answer key (DR-858 N-05).
 * The client submits only selected answers; the server computes the score.
 */
export async function POST(request: NextRequest, context: { params: { moduleNumber: string } }) {
  try {
    const auth = await authenticateRequest(request);
    if (!auth.success) return auth.response;

    await verifyTrainingSourcesPresent();

    const validation = paramsSchema.safeParse(context.params);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const body = await request.json();
    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      return handleValidationError(parsed.error);
    }

    const moduleNumber = parseInt(validation.data.moduleNumber, 10);
    const quizModule = await getNrpgQuizModule(moduleNumber);
    if (!quizModule) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Quiz module not found', 404);
    }

    const { answers } = parsed.data;
    const total = quizModule.questions.length;

    const results = quizModule.questions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correct;
      return {
        questionId: q.id,
        correct: isCorrect,
        // Revealed only AFTER a graded submission.
        correctAnswer: q.correct,
        explanation: q.explanation,
      };
    });

    const correctCount = results.filter((r) => r.correct).length;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = score >= PASSING_SCORE;

    return NextResponse.json({
      success: true,
      result: {
        moduleNumber,
        total,
        correctCount,
        score,
        passingScore: PASSING_SCORE,
        passed,
        results,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
