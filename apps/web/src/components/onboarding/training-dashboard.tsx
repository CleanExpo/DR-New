'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTrainingModules } from '@/hooks/useTrainingModules';
import type { TrainingModule, TrainingCourse } from '@/hooks/useTrainingModules';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Award,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface TrainingDashboardProps {
  /** JWT bearer token for the authenticated contractor */
  token: string;
}

function StatusBadge({ status }: { status: TrainingModule['status'] }) {
  switch (status) {
    case 'COMPLETED':
      return <Badge className="bg-green-600 text-white">Completed</Badge>;
    case 'IN_PROGRESS':
      return <Badge variant="default">In Progress</Badge>;
    case 'FAILED':
      return <Badge variant="destructive">Needs Review</Badge>;
    default:
      return <Badge variant="secondary">Not Started</Badge>;
  }
}

function StatusIcon({ status }: { status: TrainingModule['status'] }) {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'IN_PROGRESS':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'FAILED':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <PlayCircle className="h-5 w-5 text-gray-400" />;
  }
}

interface ModuleRowProps {
  module: TrainingModule;
  onStart: (moduleId: string) => Promise<boolean>;
  onComplete: (moduleId: string) => Promise<boolean>;
  busy: boolean;
}

function ModuleRow({ module, onStart, onComplete, busy }: ModuleRowProps) {
  const [acting, setActing] = useState(false);

  const handleStart = async () => {
    setActing(true);
    await onStart(module.moduleId);
    setActing(false);
  };

  const handleComplete = async () => {
    setActing(true);
    await onComplete(module.moduleId);
    setActing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <StatusIcon status={module.status} />
        <div className="min-w-0">
          <p className="font-medium truncate">{module.title}</p>
          <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
            <span>{module.moduleId}</span>
            <span>·</span>
            <Clock className="h-3 w-3" />
            <span>{module.duration}</span>
          </div>
          {module.status === 'IN_PROGRESS' && (
            <div className="mt-2 w-40">
              <Progress value={module.progress} className="h-1.5" />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 shrink-0">
        <StatusBadge status={module.status} />
        {module.status === 'NOT_STARTED' && (
          <Button size="sm" onClick={handleStart} disabled={busy || acting}>
            <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
            Start
          </Button>
        )}
        {module.status === 'IN_PROGRESS' && (
          <Button size="sm" onClick={handleComplete} disabled={busy || acting}>
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
}

interface CourseCardProps {
  course: TrainingCourse;
  onStart: (moduleId: string) => Promise<boolean>;
  onComplete: (moduleId: string) => Promise<boolean>;
  busy: boolean;
}

function CourseCard({ course, onStart, onComplete, busy }: CourseCardProps) {
  const pct = course.totalModules > 0
    ? Math.round((course.completedCount / course.totalModules) * 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {course.title}
            </CardTitle>
            <CardDescription className="mt-1">{course.description}</CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0 ml-4">
            {course.completedCount}/{course.totalModules} modules
          </Badge>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Course completion</span>
            <span className="font-medium">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {course.modules.map((mod) => (
          <ModuleRow
            key={mod.moduleId}
            module={mod}
            onStart={onStart}
            onComplete={onComplete}
            busy={busy}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export function TrainingDashboard({ token }: TrainingDashboardProps) {
  const { data, loading, error, fetchModules, startModule, completeModule } =
    useTrainingModules(token);
  const [busy, setBusy] = useState(false);

  const handleStart = async (moduleId: string) => {
    setBusy(true);
    const ok = await startModule(moduleId);
    setBusy(false);
    return ok;
  };

  const handleComplete = async (moduleId: string) => {
    setBusy(true);
    const ok = await completeModule(moduleId);
    setBusy(false);
    return ok;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={fetchModules} className="ml-4">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) return null;

  const { summary, courses } = data;
  const allDone = summary.completed === summary.total && summary.total > 0;

  return (
    <div className="space-y-6">
      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold">{summary.percentComplete}%</p>
            <p className="text-sm text-muted-foreground mt-0.5">Overall complete</p>
            <Progress value={summary.percentComplete} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold text-green-600">{summary.completed}</p>
            <p className="text-sm text-muted-foreground mt-0.5">Modules done</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold text-blue-600">{summary.inProgress}</p>
            <p className="text-sm text-muted-foreground mt-0.5">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold">{summary.totalDuration}</p>
            <p className="text-sm text-muted-foreground mt-0.5">Total training time</p>
          </CardContent>
        </Card>
      </div>

      {/* Completion banner */}
      {allDone && (
        <Card className="border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center shrink-0">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-green-900 dark:text-green-100">All training complete</p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-0.5">
                22 of 22 modules finished across both courses. Certification is now available.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses */}
      {courses.map((course) => (
        <CourseCard
          key={course.courseId}
          course={course}
          onStart={handleStart}
          onComplete={handleComplete}
          busy={busy}
        />
      ))}
    </div>
  );
}
