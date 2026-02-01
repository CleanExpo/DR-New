'use client';

import { useState, FormEvent } from 'react';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export interface ReviewFormProps {
  /**
   * ID of the booking being reviewed
   */
  bookingId: string;
  /**
   * Name of the contractor for display purposes
   */
  contractorName: string;
  /**
   * If provided, form is in edit mode with pre-filled values
   */
  existingReview?: {
    id: string;
    rating: number;
    comment: string | null;
    wouldRecommend: boolean;
  };
  /**
   * Callback when review is successfully submitted
   */
  onSuccess?: () => void;
  /**
   * Callback when user cancels the form
   */
  onCancel?: () => void;
}

/**
 * ReviewForm Component
 *
 * A comprehensive form for submitting and editing contractor reviews.
 * Handles validation, API submission, and error states.
 *
 * Features:
 * - Star rating input (1-5, required)
 * - Comment textarea (optional, 10-1000 chars)
 * - "Would recommend" toggle
 * - Loading states during submission
 * - Error display with user-friendly messages
 * - Character counter for comment
 * - Support for both create and edit modes
 *
 * @example
 * // Create new review
 * <ReviewForm
 *   bookingId={booking.id}
 *   contractorName="ABC Restoration"
 *   onSuccess={() => router.push('/dashboard')}
 * />
 *
 * @example
 * // Edit existing review
 * <ReviewForm
 *   bookingId={booking.id}
 *   contractorName="ABC Restoration"
 *   existingReview={review}
 *   onSuccess={handleSuccess}
 *   onCancel={handleCancel}
 * />
 */
export function ReviewForm({
  bookingId,
  contractorName,
  existingReview,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [comment, setComment] = useState(existingReview?.comment ?? '');
  const [wouldRecommend, setWouldRecommend] = useState(
    existingReview?.wouldRecommend ?? true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate rating
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    // Validate comment length if provided
    if (comment && comment.length < 10) {
      setError('Comment must be at least 10 characters');
      return;
    }

    if (comment && comment.length > 1000) {
      setError('Comment must not exceed 1000 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = existingReview
        ? `/api/ratings/${existingReview.id}`
        : '/api/ratings';

      const method = existingReview ? 'PATCH' : 'POST';

      const body = existingReview
        ? {
            rating,
            comment: comment || undefined,
            wouldRecommend,
          }
        : {
            bookingId,
            rating,
            comment: comment || undefined,
            wouldRecommend,
          };

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      // Success - call callback
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEdit = !!existingReview;
  const commentLength = comment.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">
          {isEdit ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        <p className="text-sm text-[#9CA3AF]">
          Share your experience with {contractorName}
        </p>
      </div>

      {/* Star Rating */}
      <div>
        <Label htmlFor="rating" className="text-[#F9FAFB] mb-2 block">
          Rating <span className="text-red-500">*</span>
        </Label>
        <StarRating value={rating} onChange={setRating} size="lg" showValue />
        {rating === 0 && (
          <p className="text-xs text-[#6B7280] mt-1">
            Please select a rating from 1 to 5 stars
          </p>
        )}
      </div>

      {/* Comment */}
      <div>
        <Label htmlFor="comment" className="text-[#F9FAFB] mb-2 block">
          Your Review (optional)
        </Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience... What did the contractor do well? What could be improved?"
          className="min-h-[120px] bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:border-[#00BFA6] focus:ring-[#00BFA6]"
          maxLength={1000}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-[#6B7280]">
            {commentLength < 10 && commentLength > 0
              ? `Minimum 10 characters (${10 - commentLength} more needed)`
              : commentLength > 0
              ? 'Optional but helps other clients'
              : 'Minimum 10 characters if provided'}
          </p>
          <p
            className={`text-xs ${
              commentLength > 900 ? 'text-yellow-500' : 'text-[#6B7280]'
            }`}
          >
            {commentLength}/1000
          </p>
        </div>
      </div>

      {/* Would Recommend */}
      <div className="flex items-center space-x-3 p-4 bg-[#0F1115] rounded-lg border border-[#374151]">
        <Switch
          id="would-recommend"
          checked={wouldRecommend}
          onCheckedChange={setWouldRecommend}
        />
        <Label
          htmlFor="would-recommend"
          className="text-[#F9FAFB] cursor-pointer flex-1"
        >
          I would recommend this contractor to others
        </Label>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="flex-1 bg-[#00BFA6] hover:bg-[#00A693] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Submitting...'
            : isEdit
            ? 'Update Review'
            : 'Submit Review'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-[#374151] text-[#F9FAFB] hover:bg-[#1F2937]"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
