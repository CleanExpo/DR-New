'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { RetakeCountdown } from './retake-countdown';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

// DR-892: the quiz payload is SEALED — questions carry no `correct` or
// `explanation`. Grading happens server-side in /api/onboarding/assessment;
// this component submits answers only and renders the server-graded result.
interface Question {
  id: string;
  question: string;
  options: string[];
  reference?: string;
}

interface QuestionResult {
  questionId: string;
  correct: boolean;
  correctAnswer: number;
  explanation: string;
}

// DR-894/DR-919: the server's retake policy state, returned with every graded
// submission (`retake`) and on 403 ATTEMPT_CAP / 429 RATE_LIMITED rejections.
interface RetakeState {
  maxAttempts: number;
  attemptsUsed: number;
  attemptsRemaining: number;
  locked: boolean;
  cooldownUntil: string | null;
}

interface SubmissionBlocked {
  reason: 'ATTEMPT_CAP' | 'COOLDOWN';
  retryAt: string | null;
  attemptsUsed?: number;
  maxAttempts?: number;
}

interface GradedResult {
  passed: boolean;
  score: number;
  passingScore: number;
  results: QuestionResult[];
  retake: RetakeState | null;
}

interface QuizInterfaceProps {
  moduleId: string;
  contractorId: string;
  onComplete: () => void;
  onCancel: () => void;
}

export function QuizInterface({ moduleId, contractorId, onComplete, onCancel }: QuizInterfaceProps) {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [graded, setGraded] = useState<GradedResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // DR-919: submission rejected by the DR-894 retake policy (attempt cap /
  // cooldown) BEFORE grading — rendered distinctly from a transport failure.
  const [blocked, setBlocked] = useState<SubmissionBlocked | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/onboarding/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, contractorId }),
      });

      const data = await response.json();

      if (data.success) {
        setQuiz(data.quiz);
        setTimeRemaining(data.quiz.timeLimit * 60); // Convert minutes to seconds
      }
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoading(false);
    }
  }, [moduleId, contractorId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  useEffect(() => {
    if (!graded && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [graded, timeRemaining]);

  const handleAnswerSelect = (answerIndex: string) => {
    const parsed = Number.parseInt(answerIndex, 10);
    if (!Number.isFinite(parsed)) return;
    setAnswers({ ...answers, [currentQuestion]: parsed });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit ANSWERS to the server for grading — the client never computes or
  // sends a score (DR-892).
  const handleSubmit = useCallback(async () => {
    if (!quiz || submitting) return;

    const answersById: Record<string, number> = {};
    quiz.questions.forEach((q: Question, index: number) => {
      if (typeof answers[index] === 'number') {
        answersById[q.id] = answers[index];
      }
    });

    try {
      setSubmitting(true);
      setSubmitError(null);
      setBlocked(null);
      const response = await fetch('/api/onboarding/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId,
          moduleId,
          answers: answersById,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        // DR-894 policy rejections (403 ATTEMPT_CAP / 429 RATE_LIMITED) carry
        // structured details — render them as a policy state, not a raw error.
        const details = data?.details;
        if (details?.reason === 'ATTEMPT_CAP' || details?.reason === 'COOLDOWN') {
          setBlocked({
            reason: details.reason,
            retryAt: typeof details.retryAt === 'string' ? details.retryAt : null,
            attemptsUsed: typeof details.attemptsUsed === 'number' ? details.attemptsUsed : undefined,
            maxAttempts: typeof details.maxAttempts === 'number' ? details.maxAttempts : undefined,
          });
          return;
        }
        throw new Error(data.message || 'Failed to submit quiz');
      }

      setGraded({
        passed: data.passed,
        score: data.score,
        passingScore: data.passingScore,
        results: data.result?.results ?? [],
        retake: data.retake ?? null,
      });
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setSubmitError('Failed to submit your quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [quiz, answers, contractorId, moduleId, submitting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Generating your personalized quiz...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Not Available</CardTitle>
            <CardDescription>Unable to load quiz. Please try again later.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={onCancel}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (graded) {
    const { passed, score, passingScore } = graded;
    const resultByQuestionId = new Map(graded.results.map((r) => [r.questionId, r]));
    const correctCount = graded.results.filter((r) => r.correct).length;

    return (
      <div className="container mx-auto py-8">
        <Card className={passed ? 'border-green-500' : 'border-yellow-500'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {passed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  )}
                  Quiz {passed ? 'Passed' : 'Incomplete'}
                </CardTitle>
                <CardDescription className="mt-2">
                  {moduleId}
                </CardDescription>
              </div>
              <Badge
                variant={passed ? 'default' : 'secondary'}
                className={passed ? 'bg-green-600' : ''}
              >
                {score}%
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <Award className={`h-20 w-20 mx-auto mb-4 ${passed ? 'text-green-600' : 'text-yellow-600'}`} />
              <h3 className="text-2xl font-bold mb-2">Your Score: {score}%</h3>
              <p className="text-muted-foreground">
                {passed
                  ? `Congratulations! You've passed with a score of ${score}%.`
                  : `You scored ${score}%. You need ${passingScore}% to pass. Keep learning!`}
              </p>
            </div>

            {/* DR-919: surface the DR-894 retake policy state after a failed submission */}
            {!passed && graded.retake && (
              <div
                className={`rounded-md border p-4 ${
                  graded.retake.locked
                    ? 'border-red-500/20 bg-red-500/10'
                    : 'border-yellow-500/20 bg-yellow-500/10'
                }`}
              >
                <p className={`text-sm font-semibold flex items-center gap-1.5 ${graded.retake.locked ? 'text-red-500' : 'text-yellow-600'}`}>
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {graded.retake.locked
                    ? 'No attempts remaining — module locked'
                    : `${graded.retake.attemptsRemaining} of ${graded.retake.maxAttempts} attempts remaining`}
                </p>
                {graded.retake.locked ? (
                  <p className="text-sm text-muted-foreground mt-1">
                    You&apos;ve used all {graded.retake.maxAttempts} attempts for this module. It&apos;s
                    locked pending admin review —{' '}
                    <Link href="/contact" className="underline text-red-500">
                      contact our support team
                    </Link>{' '}
                    to request a reset.
                  </p>
                ) : graded.retake.cooldownUntil ? (
                  <p className="text-sm text-muted-foreground mt-1">
                    You can retake this quiz in <RetakeCountdown until={graded.retake.cooldownUntil} />.
                    Use the time to review the module content.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    Review the module content, then retake the quiz when you&apos;re ready.
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {correctCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {quiz.questions.length - correctCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Incorrect Answers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{quiz.questions.length}</p>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </CardContent>
              </Card>
            </div>

            {/* Review Answers — key material comes from the server's graded result */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Review Your Answers</h4>
              {quiz.questions.map((q: Question, index: number) => {
                const result = resultByQuestionId.get(q.id);
                const userAnswer = answers[index];
                const isCorrect = result?.correct ?? false;
                const userAnswerText =
                  typeof userAnswer === 'number' ? (q.options[userAnswer] ?? '') : '';
                const correctAnswerText =
                  result ? (q.options[result.correctAnswer] ?? '') : '';

                return (
                  <Card key={q.id} className={isCorrect ? 'border-green-500' : 'border-red-500'}>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Question {index + 1}: {q.question}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Your answer: </span>
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {userAnswerText || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && correctAnswerText && (
                            <p className="text-sm mt-1">
                              <span className="text-muted-foreground">Correct answer: </span>
                              <span className="text-green-600">{correctAnswerText}</span>
                            </p>
                          )}
                          {q.reference && (
                            <p className="text-xs text-muted-foreground mt-1">Reference: {q.reference}</p>
                          )}
                          {result?.explanation && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              {result.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            {/* DR-919: the retake CTA only renders when the DR-894 policy allows a
                retake — never while locked or inside the cooldown window. */}
            {!passed && !graded.retake?.locked && !graded.retake?.cooldownUntil && (
              <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
                Retake Quiz
              </Button>
            )}
            {!passed && graded.retake?.locked && (
              <Button asChild variant="outline" className="flex-1">
                <Link href="/contact">Contact Support</Link>
              </Button>
            )}
            <Button onClick={onComplete} className="flex-1">
              {passed ? 'Continue to Next Module' : 'Return to Dashboard'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allAnswered = Object.keys(answers).length === quiz.questions.length;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{moduleId} Assessment</CardTitle>
              <CardDescription className="mt-1">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{formatTime(timeRemaining)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

            <RadioGroup
              value={typeof answers[currentQuestion] === 'number' ? String(answers[currentQuestion]) : ''}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {question.options.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}

          {/* DR-919: DR-894 policy rejections (403 attempt cap / 429 cooldown) */}
          {blocked && (
            <div
              className={`rounded-md border p-4 ${
                blocked.reason === 'ATTEMPT_CAP'
                  ? 'border-red-500/20 bg-red-500/10'
                  : 'border-yellow-500/20 bg-yellow-500/10'
              }`}
            >
              {blocked.reason === 'ATTEMPT_CAP' ? (
                <p className="text-sm text-red-600 flex items-start gap-1.5">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Maximum attempts reached
                    {typeof blocked.maxAttempts === 'number' ? ` (${blocked.maxAttempts})` : ''} — this
                    module is locked pending admin review.{' '}
                    <Link href="/contact" className="underline">
                      Contact our support team
                    </Link>{' '}
                    to request a reset.
                  </span>
                </p>
              ) : (
                <p className="text-sm text-yellow-700 flex items-start gap-1.5">
                  <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Retake cooldown is still active — you can submit again in{' '}
                    {blocked.retryAt ? <RetakeCountdown until={blocked.retryAt} /> : 'a little while'}.
                  </span>
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {Object.keys(answers).length} of {quiz.questions.length} answered
            </div>
            <div className="flex gap-2">
              {quiz.questions.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index === currentQuestion
                      ? 'bg-primary'
                      : typeof answers[index] === 'number'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
              <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
