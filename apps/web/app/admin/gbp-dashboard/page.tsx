/**
 * GBP Analytics Dashboard
 *
 * Real-time monitoring of Google Business Profile performance across 8 capitals:
 * - Profile health scores
 * - Review metrics & sentiment
 * - Post engagement
 * - Photo performance
 * - Citation coverage
 * - Action items & prioritization
 */

import { Metadata } from 'next';
import { BarChart3, TrendingUp, MessageSquare, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { GBP_LOCATIONS, gbpManager } from '@/lib/gbp/gbp-manager';

// Force dynamic rendering to avoid build-time timeout
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'GBP Analytics Dashboard | NRPG Admin',
  description: 'Real-time monitoring of Google Business Profile performance across all Australian capitals',
};

export default function GBPDashboardPage() {
  const locations = gbpManager.getLocations();
  const priorityOrder = gbpManager.getPriorityOrder();

  // Calculate aggregate metrics
  const totalHealthScore = locations.reduce((sum, loc) => sum + gbpManager.getHealthScore(loc), 0);
  const avgHealthScore = Math.round(totalHealthScore / locations.length);

  const totalReviews = locations.reduce((sum, loc) => sum + loc.reviews.totalReviews, 0);
  const avgRating = (locations.reduce((sum, loc) => sum + loc.reviews.averageRating, 0) / locations.length).toFixed(2);

  const totalPosts = locations.reduce((sum, loc) => sum + loc.posts.totalPosts, 0);
  const totalPhotos = locations.reduce((sum, loc) => sum + loc.photos.length, 0);

  return (
    <main className="bg-slate-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-2">GBP Analytics Dashboard</h1>
          <p className="text-slate-400">Real-time monitoring across 8 Australian capitals</p>
        </div>

        {/* Aggregate Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-slate-400">Avg Health Score</p>
            </div>
            <p className="text-3xl font-black">{avgHealthScore}/100</p>
            <p className="text-xs text-slate-500 mt-2">Across all 8 cities</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-slate-400">Total Reviews</p>
            </div>
            <p className="text-3xl font-black">{totalReviews}</p>
            <p className="text-xs text-slate-500 mt-2">Target: 400 (50 per city)</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <p className="text-sm text-slate-400">Avg Rating</p>
            </div>
            <p className="text-3xl font-black">{avgRating}⭐</p>
            <p className="text-xs text-slate-500 mt-2">Target: 4.8+</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-red-400" />
              <p className="text-sm text-slate-400">Posts & Photos</p>
            </div>
            <p className="text-3xl font-black">{totalPosts + totalPhotos}</p>
            <p className="text-xs text-slate-500 mt-2">
              {totalPosts} posts, {totalPhotos} photos
            </p>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Priority Actions</h2>

          <div className="space-y-4">
            {priorityOrder.slice(0, 3).map(location => {
              const healthScore = gbpManager.getHealthScore(location);
              const checklist = gbpManager.getActivationChecklist(location);
              const incompleteItems = checklist.filter(item => !item.completed && item.priority === 'critical');

              return (
                <div
                  key={location.id}
                  className="bg-slate-800 rounded-xl p-6 border-l-4 border-red-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{location.city}, {location.state}</h3>
                      <p className="text-sm text-slate-400">Health Score: {healthScore}/100</p>
                    </div>
                    <div className="flex gap-2">
                      {incompleteItems.length > 0 && (
                        <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-bold">
                          {incompleteItems.length} critical items
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Critical items */}
                  <div className="space-y-2">
                    {incompleteItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* City-by-City Breakdown */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">City-by-City Performance</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {locations.map(location => {
              const healthScore = gbpManager.getHealthScore(location);
              const photoStatus = gbpManager.getPhotoStatus(location);
              const reviewStatus = gbpManager.getReviewStatus(location);
              const postStatus = gbpManager.getPostStatus(location);
              const napStatus = gbpManager.validateNAP(location);

              return (
                <div key={location.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{location.city}</h3>
                      <p className="text-sm text-slate-400">{location.state}</p>
                    </div>
                    <div
                      className={`text-2xl font-black ${
                        healthScore >= 80 ? 'text-green-400' : healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}
                    >
                      {healthScore}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="space-y-3">
                    {/* Verification */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Profile Verified</span>
                      <span className="flex items-center gap-2">
                        {location.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                        )}
                        {location.verified ? 'Yes' : 'Pending'}
                      </span>
                    </div>

                    {/* Photos */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Photos</span>
                      <span>
                        {photoStatus.count}/20
                        <span className="text-xs text-slate-500 ml-2">
                          (
                          <span className={photoStatus.isSufficient ? 'text-green-400' : 'text-yellow-400'}>
                            {photoStatus.needed > 0 ? `${photoStatus.needed} needed` : '✓'}
                          </span>
                          )
                        </span>
                      </span>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Reviews</span>
                      <span>
                        {reviewStatus.totalReviews}/{reviewStatus.target} ({Math.round(reviewStatus.progress)}%)
                      </span>
                    </div>

                    {/* Posts */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Posts</span>
                      <span>{postStatus.totalPosts} posts</span>
                    </div>

                    {/* NAP Consistency */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">NAP Consistency</span>
                      <span className="flex items-center gap-2">
                        {napStatus.isValid ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Valid</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400">{napStatus.errors.length} issues</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Health Bar */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-end gap-2 h-8">
                      <div className="flex-1 bg-slate-700 rounded overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            healthScore >= 80 ? 'bg-green-500' : healthScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${healthScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-bold">{healthScore}%</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold transition-colors">
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activation Checklist */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6">Overall Activation Checklist</h2>

          <div className="space-y-3">
            {[
              { task: 'Create & verify all 8 GBP profiles', completed: false, priority: 'critical' },
              { task: 'Upload 20+ photos per location', completed: false, priority: 'critical' },
              { task: 'Fix NAP consistency across all cities', completed: false, priority: 'critical' },
              { task: 'Set service radius & attributes', completed: false, priority: 'high' },
              { task: 'Schedule weekly automated posts', completed: false, priority: 'high' },
              { task: 'Generate 50+ reviews per city', completed: false, priority: 'high' },
              { task: 'Submit to 100+ local citations', completed: false, priority: 'high' },
              { task: 'Set up review request automation', completed: false, priority: 'medium' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer">
                <input type="checkbox" checked={item.completed} onChange={() => {}} className="w-5 h-5 cursor-pointer" />
                <span className="flex-1">{item.task}</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.priority === 'critical'
                      ? 'bg-red-500/20 text-red-300'
                      : item.priority === 'high'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
