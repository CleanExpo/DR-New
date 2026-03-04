'use client';

import { useState, useEffect, useMemo } from 'react';
import { ReviewCard } from './review-card';
import { ReviewForm } from './review-form';
import { StarRating } from '@/components/ui/star-rating';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Star } from 'lucide-react';

export interface ReviewListProps {
  /**
   * Filter reviews by contractor ID
   */
  contractorId?: string;
  /**
   * Filter reviews by client ID (only own reviews unless admin)
   */
  clientId?: string;
  /**
   * Whether to show client names on reviews
   */
  showClientNames?: boolean;
  /**
   * Whether reviews are editable by the current user
   */
  editable?: boolean;
  /**
   * Number of reviews per page
   */
  limit?: number;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  wouldRecommend: boolean;
  createdAt: string;
  bookingId: string;
  client: {
    firstName: string;
    lastName: string;
  };
  contractor: {
    businessName: string;
  };
  booking: {
    australianServiceType: string;
    completedAt: string | null;
  };
}

/**
 * ReviewList Component
 *
 * A comprehensive review list component with:
 * - Rating statistics summary
 * - Rating breakdown visualization
 * - Paginated review cards
 * - Edit functionality for owned reviews
 * - Empty state handling
 * - Loading skeletons
 *
 * @example
 * // Show all reviews for a contractor
 * <ReviewList
 *   contractorId={contractor.id}
 *   showClientNames={true}
 *   editable={false}
 *   limit={5}
 * />
 *
 * @example
 * // Show editable reviews for current user
 * <ReviewList
 *   clientId={user.id}
 *   showClientNames={false}
 *   editable={true}
 *   limit={10}
 * />
 */
export function ReviewList({
  contractorId,
  clientId,
  showClientNames = true,
  editable = false,
  limit = 10,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Calculate rating breakdown
  const ratingBreakdown = useMemo(() => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      breakdown[r.rating as keyof typeof breakdown]++;
    });

    return Object.entries(breakdown)
      .reverse()
      .map(([stars, count]) => ({
        stars: parseInt(stars),
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }));
  }, [reviews, total]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, [contractorId, clientId, page]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (contractorId) params.append('contractorId', contractorId);
      if (clientId) params.append('clientId', clientId);

      const response = await fetch(`/api/ratings?${params}`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.data);
        setTotal(data.pagination.total);
        setTotalPages(data.pagination.pages);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
  };

  const handleEditSuccess = () => {
    setEditingReview(null);
    fetchReviews(); // Refresh list
  };

  const handleEditCancel = () => {
    setEditingReview(null);
  };

  const handleDelete = () => {
    fetchReviews(); // Refresh list after delete
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full bg-[#1F2937]" />
        ))}
      </div>
    );
  }

  // Empty state
  if (reviews.length === 0 && page === 1) {
    return (
      <Card className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] border-[#374151]">
        <CardContent className="p-12 text-center">
          <Star className="h-12 w-12 mx-auto text-[#6B7280] mb-4" />
          <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">
            No reviews yet
          </h3>
          <p className="text-[#9CA3AF]">
            {contractorId
              ? 'Be the first to leave a review for this contractor!'
              : 'You haven\'t written any reviews yet.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      {total > 0 && (
        <Card className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] border-[#374151]">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Overall Rating */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-5xl font-bold text-[#FFD700]">
                    {averageRating.toFixed(1)}
                  </span>
                  <div>
                    <StarRating
                      value={Math.round(averageRating)}
                      readonly
                      size="md"
                    />
                    <p className="text-sm text-[#9CA3AF] mt-1">
                      {total} {total === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {ratingBreakdown.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm text-[#9CA3AF] w-8">
                      {stars} ★
                    </span>
                    <div className="flex-1 h-2 bg-[#374151] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFD700] transition-[width] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#9CA3AF] w-12 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            showClientName={showClientNames}
            isOwner={editable}
            onEdit={editable ? () => handleEditClick(review) : undefined}
            onDelete={editable ? handleDelete : undefined}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={
                    page === 1
                      ? 'pointer-events-none opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-[#374151] text-[#F9FAFB]'
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Show first, last, current, and adjacent pages
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - page) <= 1
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className={
                          page === pageNum
                            ? 'bg-[#00BFA6] text-white'
                            : 'cursor-pointer hover:bg-[#374151] text-[#F9FAFB]'
                        }
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                // Show ellipsis
                if (pageNum === page - 2 || pageNum === page + 2) {
                  return (
                    <PaginationItem key={i}>
                      <span className="px-3 text-[#9CA3AF]">...</span>
                    </PaginationItem>
                  );
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={
                    page >= totalPages
                      ? 'pointer-events-none opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-[#374151] text-[#F9FAFB]'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Dialog */}
      {editingReview && (
        <Dialog open={!!editingReview} onOpenChange={() => setEditingReview(null)}>
          <DialogContent className="bg-[#1F2937] border-[#374151] max-w-2xl">
            <ReviewForm
              bookingId={editingReview.bookingId}
              contractorName={editingReview.contractor.businessName}
              existingReview={{
                id: editingReview.id,
                rating: editingReview.rating,
                comment: editingReview.comment,
                wouldRecommend: editingReview.wouldRecommend,
              }}
              onSuccess={handleEditSuccess}
              onCancel={handleEditCancel}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
