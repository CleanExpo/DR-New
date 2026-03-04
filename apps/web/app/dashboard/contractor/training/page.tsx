/**
 * NRPG Growth Portal - Growth & Training Page
 *
 * Professional development resources, training modules, and growth tools.
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  BookOpen,
  Video,
  Award,
  Clock,
  CheckCircle,
  Play,
  Lock,
  Star,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: 'certification' | 'skill' | 'business';
  duration: string;
  lessons: number;
  progress: number;
  status: 'completed' | 'in_progress' | 'locked';
  thumbnail: string;
  instructor: string;
  rating: number;
  description: string;
}

const categoryColors = {
  certification: 'bg-amber-100 text-amber-800 border-amber-300',
  skill: 'bg-nrpg-teal/10 text-nrpg-teal border-nrpg-teal/30',
  business: 'bg-purple-100 text-purple-800 border-purple-300',
};

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'IICRC WRT Certification Prep',
    category: 'certification',
    duration: '8 hours',
    lessons: 12,
    progress: 100,
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    instructor: 'Dr. Sarah Mitchell',
    rating: 4.9,
    description: 'Complete preparation course for IICRC Water Damage Restoration certification.',
  },
  {
    id: '2',
    title: 'Advanced Mould Remediation Techniques',
    category: 'skill',
    duration: '6 hours',
    lessons: 8,
    progress: 75,
    status: 'in_progress',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
    instructor: 'James Chen',
    rating: 4.8,
    description: 'Learn advanced techniques for complex mould remediation projects.',
  },
  {
    id: '3',
    title: 'Building Your Restoration Business',
    category: 'business',
    duration: '10 hours',
    lessons: 15,
    progress: 45,
    status: 'in_progress',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    instructor: 'Michael Torres',
    rating: 4.7,
    description: 'Strategies for scaling your restoration business to $1M+ revenue.',
  },
  {
    id: '4',
    title: 'Fire & Smoke Damage Assessment',
    category: 'certification',
    duration: '5 hours',
    lessons: 7,
    progress: 0,
    status: 'locked',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    instructor: 'Lisa Anderson',
    rating: 4.9,
    description: 'Master fire and smoke damage assessment for accurate restoration planning.',
  },
  {
    id: '5',
    title: 'Client Communication Excellence',
    category: 'skill',
    duration: '4 hours',
    lessons: 6,
    progress: 0,
    status: 'locked',
    thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&q=80',
    instructor: 'Emma Williams',
    rating: 4.6,
    description: 'Build stronger client relationships through effective communication.',
  },
];

export default function TrainingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const filteredCourses = courses.filter(
    (course) => selectedCategory === 'all' || course.category === selectedCategory
  );

  const completedCourses = courses.filter((c) => c.status === 'completed').length;
  const inProgressCourses = courses.filter((c) => c.status === 'in_progress').length;
  const totalHours = courses
    .filter((c) => c.status === 'completed')
    .reduce((sum, c) => sum + parseInt(c.duration), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nrpg-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-portal-text font-heading flex items-center gap-3">
            <GraduationCap className="size-8 text-earth-secondary" />
            Growth & Training
          </h1>
          <p className="text-portal-muted font-body mt-1">
            Professional development resources to grow your business
          </p>
        </div>
        <button className="px-4 py-2 bg-nrpg-teal hover:bg-nrpg-teal-dark text-white text-sm font-bold font-heading rounded-lg transition-colors">
          View Certificates
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-portal-card rounded-xl border border-portal-border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-portal-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="size-5 text-portal-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-portal-text font-heading">{completedCourses}</p>
              <p className="text-portal-muted text-sm font-body">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-portal-card rounded-xl border border-portal-border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Play className="size-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-portal-text font-heading">{inProgressCourses}</p>
              <p className="text-portal-muted text-sm font-body">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-portal-card rounded-xl border border-portal-border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-nrpg-teal/10 rounded-lg flex items-center justify-center">
              <Clock className="size-5 text-nrpg-teal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-portal-text font-heading">{totalHours}h</p>
              <p className="text-portal-muted text-sm font-body">Learning Hours</p>
            </div>
          </div>
        </div>
        <div className="bg-portal-card rounded-xl border border-portal-border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-earth-secondary/10 rounded-lg flex items-center justify-center">
              <Award className="size-5 text-earth-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-portal-text font-heading">{completedCourses}</p>
              <p className="text-portal-muted text-sm font-body">Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Courses' },
          { key: 'certification', label: 'Certifications' },
          { key: 'skill', label: 'Skills' },
          { key: 'business', label: 'Business' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={cn(
              'px-4 py-2 text-sm font-bold font-heading rounded-lg whitespace-nowrap transition-colors',
              selectedCategory === tab.key
                ? 'bg-earth-primary text-white'
                : 'bg-portal-card border border-portal-border text-portal-muted hover:text-portal-text hover:border-earth-primary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Continue Learning */}
      {inProgressCourses > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-portal-text font-heading">Continue Learning</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses
              .filter((c) => c.status === 'in_progress')
              .map((course) => (
                <div
                  key={course.id}
                  className="bg-portal-card rounded-xl border border-portal-border overflow-hidden shadow-sm hover:shadow-md hover:border-nrpg-teal/30 transition-[box-shadow,border-color,opacity] duration-200"
                >
                  <div className="flex">
                    <div
                      className="w-32 h-full bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url('${course.thumbnail}')` }}
                    />
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            'px-2 py-0.5 text-xs font-bold rounded border font-heading capitalize',
                            categoryColors[course.category]
                          )}
                        >
                          {course.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-portal-text font-heading mb-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-portal-muted font-body mb-3">
                        by {course.instructor}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-portal-muted">{course.progress}% complete</span>
                          <span className="text-portal-muted">{course.lessons} lessons</span>
                        </div>
                        <div className="w-full bg-portal-border rounded-full h-1.5">
                          <div
                            className="bg-nrpg-teal h-1.5 rounded-full transition-[width] duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <button className="mt-3 px-3 py-1.5 bg-nrpg-teal hover:bg-nrpg-teal-dark text-white text-xs font-bold font-heading rounded-lg transition-colors flex items-center gap-1">
                        <Play className="size-3" />
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Courses */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-portal-text font-heading">All Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={cn(
                'bg-portal-card rounded-xl border border-portal-border overflow-hidden shadow-sm transition-[box-shadow,border-color,opacity] duration-200',
                course.status === 'locked'
                  ? 'opacity-75'
                  : 'hover:shadow-md hover:border-nrpg-teal/30'
              )}
            >
              <div
                className="h-40 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${course.thumbnail}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {course.status === 'completed' && (
                  <div className="absolute top-3 right-3 size-8 bg-portal-success rounded-full flex items-center justify-center">
                    <CheckCircle className="size-5 text-white" />
                  </div>
                )}
                {course.status === 'locked' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="size-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Lock className="size-6 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs font-bold rounded border font-heading capitalize',
                      categoryColors[course.category]
                    )}
                  >
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h4 className="text-sm font-bold text-portal-text font-heading line-clamp-2">
                  {course.title}
                </h4>
                <p className="text-xs text-portal-muted font-body line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-xs text-portal-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="size-3" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3 text-amber-400 fill-current" />
                    {course.rating}
                  </span>
                </div>

                {course.status === 'in_progress' && (
                  <div className="space-y-1">
                    <div className="w-full bg-portal-border rounded-full h-1.5">
                      <div
                        className="bg-nrpg-teal h-1.5 rounded-full transition-[width] duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-portal-muted text-right">{course.progress}%</p>
                  </div>
                )}

                <button
                  disabled={course.status === 'locked'}
                  className={cn(
                    'w-full py-2 text-xs font-bold font-heading rounded-lg transition-colors flex items-center justify-center gap-2',
                    course.status === 'locked'
                      ? 'bg-portal-border text-portal-muted cursor-not-allowed'
                      : course.status === 'completed'
                      ? 'bg-portal-success/10 text-portal-success hover:bg-portal-success/20'
                      : 'bg-nrpg-teal hover:bg-nrpg-teal-dark text-white'
                  )}
                >
                  {course.status === 'completed' && (
                    <>
                      <CheckCircle className="size-4" />
                      Review Course
                    </>
                  )}
                  {course.status === 'in_progress' && (
                    <>
                      <Play className="size-4" />
                      Continue
                    </>
                  )}
                  {course.status === 'locked' && (
                    <>
                      <Lock className="size-4" />
                      Unlock Course
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Roadmap */}
      <div className="bg-earth-primary/5 rounded-xl border border-earth-primary/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-earth-primary/10 rounded-lg flex items-center justify-center">
              <Target className="size-6 text-earth-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-portal-text font-heading">
                Your Growth Roadmap
              </h3>
              <p className="text-portal-muted font-body text-sm">
                Personalised path to Elite Partner status
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-earth-primary hover:bg-earth-secondary text-white text-sm font-bold font-heading rounded-lg transition-colors flex items-center gap-2">
            View Roadmap
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
