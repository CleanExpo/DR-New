'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, BookOpen, Award, Clock, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import { CourseCard } from '@/src/components/onboarding/CourseCard';

interface CourseProgress {
  courseId: string;
  completedModules: number;
  totalModules: number;
  percentComplete: number;
  averageScore: number;
  totalTimeMinutes: number;
  currentModuleId: string | null;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface Course {
  courseId: 'CSE' | 'WRT';
  courseName: string;
  description: string;
  totalModules: number;
  totalHours: number;
  progress: CourseProgress;
}

const CERT_TIERS = [
  {
    id: 'bronze',
    label: 'Bronze',
    subtitle: 'Certified Specialist',
    price: '$95',
    colour: '#cd7f32',
    href: '/store/bronze-certified-specialist',
    description: 'Essential field toolkit, branded workwear, and your Bronze certification badge to display on-site.',
  },
  {
    id: 'silver',
    label: 'Silver',
    subtitle: 'Certified Professional',
    price: '$185',
    colour: '#c0c0c0',
    href: '/store/silver-certified-professional',
    description: 'Everything in Bronze plus premium workwear, extended toolkit, and priority job-matching access.',
  },
  {
    id: 'gold',
    label: 'Gold',
    subtitle: 'Certified Expert',
    price: '$295',
    colour: '#ffd700',
    href: '/store/gold-certified-expert',
    description: 'Full elite pack — premium gear, exclusive Gold badge, dedicated account support, and first-pick jobs.',
  },
];

export default function TrainingPage() {
  const { data: session, status: authStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/onboarding/courses');
      const data = await res.json();

      if (data.success) {
        setCourses(data.data.courses);
      } else {
        setError(data.error || 'Failed to load courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load training courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchCourses();
    }
  }, [authStatus, fetchCourses]);

  // Calculate overall stats
  const totalModules = courses.reduce((sum, c) => sum + c.totalModules, 0);
  const completedModules = courses.reduce((sum, c) => sum + c.progress.completedModules, 0);
  const totalHours = courses.reduce((sum, c) => sum + c.totalHours, 0);
  const timeSpentMinutes = courses.reduce((sum, c) => sum + c.progress.totalTimeMinutes, 0);
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const trainingComplete = courses.length > 0 && overallProgress === 100;

  if (authStatus === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400 mb-4">Please sign in to view training courses</p>
            <Button className="bg-[#00BFA6] hover:bg-[#00A693]">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/contractor/onboarding/nrpg"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to NRPG Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Training Courses</h1>
            <p className="text-gray-400">
              Complete professional development modules to enhance your certification
            </p>
          </div>
          <Badge className="bg-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/20 text-sm px-3 py-1">
            NRPG Certified
          </Badge>
        </div>
      </div>

      {error && (
        <Card className="bg-red-500/10 border-red-500/20 mb-6">
          <CardContent className="py-4">
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress Stats */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardContent className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00BFA6]/10 mb-2">
                <BookOpen className="h-6 w-6 text-[#00BFA6]" />
              </div>
              <div className="text-2xl font-bold text-white">{completedModules}/{totalModules}</div>
              <div className="text-sm text-gray-400">Modules Complete</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-2">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{overallProgress}%</div>
              <div className="text-sm text-gray-400">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-2">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(timeSpentMinutes / 60)}h</div>
              <div className="text-sm text-gray-400">Time Invested</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 mb-2">
                <CheckCircle2 className="h-6 w-6 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {courses.filter(c => c.progress.status === 'completed').length}/{courses.length}
              </div>
              <div className="text-sm text-gray-400">Courses Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Available Courses</h2>
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseName={course.courseName}
            description={course.description}
            totalModules={course.totalModules}
            totalHours={course.totalHours}
            progress={course.progress}
          />
        ))}
      </div>

      {/* Learning Path Info */}
      <Card className="bg-gray-800 border-gray-700 mt-6">
        <CardHeader>
          <CardTitle className="text-base text-white">Recommended Learning Path</CardTitle>
          <CardDescription className="text-gray-400">
            Follow this sequence for optimal skill development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 font-medium">1</span>
              </div>
              <span className="text-gray-300">Customer Service Excellence</span>
            </div>
            <div className="h-px flex-1 bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-medium">2</span>
              </div>
              <span className="text-gray-300">Water Damage Restoration</span>
            </div>
            <div className="h-px flex-1 bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-gray-300">Certification</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Complete — Certification Pack Upsell */}
      {trainingComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="mt-8"
        >
          <div className="rounded-sm border border-teal-500/30 bg-[#050505] p-6 md:p-8">
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-6 w-6 text-[#FFB800]" />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Training Complete!
              </h2>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Ready to upgrade your certification pack? Choose the tier that fits your ambitions and take your NRPG career to the next level.
            </p>

            {/* Tier cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CERT_TIERS.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div
                    className="rounded-sm border bg-[#050505] p-5 flex flex-col gap-4 h-full hover:brightness-110 transition-[filter]"
                    style={{ borderColor: `${tier.colour}40` }}
                  >
                    {/* Tier label */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: tier.colour }}
                      >
                        {tier.label}
                      </span>
                      <span
                        className="text-xs rounded-sm px-2 py-0.5 font-medium"
                        style={{ backgroundColor: `${tier.colour}18`, color: tier.colour }}
                      >
                        {tier.subtitle}
                      </span>
                    </div>

                    {/* Price */}
                    <div
                      className="text-3xl font-extrabold"
                      style={{ color: tier.colour }}
                    >
                      {tier.price}
                      <span className="text-base font-normal text-gray-500 ml-1">AUD</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 flex-1">{tier.description}</p>

                    {/* CTA */}
                    <Link href={tier.href} className="mt-auto">
                      <Button
                        size="sm"
                        className="w-full rounded-sm font-semibold text-[#050505] transition-opacity hover:opacity-90"
                        style={{ backgroundColor: tier.colour }}
                      >
                        Get {tier.label} Pack
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
