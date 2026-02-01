'use client';

import { useState } from 'react';
import { StarRating } from '@/components/ui/star-rating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CheckCircle, MoreVertical, Pencil, Trash } from 'lucide-react';

export interface ReviewCardProps {
  /**
   * Review data to display
   */
  review: {
    id: string;
    rating: number;
    comment: string | null;
    wouldRecommend: boolean;
    createdAt: string;
    client: {
      firstName: string;
      lastName: string;
    };
    booking: {
      australianServiceType: string;
      completedAt: string | null;
    };
  };
  /**
   * Whether to show the client's name
   */
  showClientName?: boolean;
  /**
   * Callback when edit is requested
   */
  onEdit?: () => void;
  /**
   * Callback when delete is completed
   */
  onDelete?: () => void;
  /**
   * Whether the current user is the review owner
   */
  isOwner?: boolean;
}

/**
 * ReviewCard Component
 *
 * Displays a single review with all its details.
 * Supports owner actions (edit/delete) when isOwner is true.
 *
 * Features:
 * - Avatar with client initials
 * - Star rating display
 * - Service type badge
 * - Formatted date (Australian format)
 * - "Recommends" badge if applicable
 * - Edit/Delete actions for owner
 * - Delete confirmation dialog
 *
 * @example
 * <ReviewCard
 *   review={review}
 *   showClientName={true}
 *   isOwner={false}
 * />
 */
export function ReviewCard({
  review,
  showClientName = true,
  onEdit,
  onDelete,
  isOwner = false,
}: ReviewCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatServiceType = (type: string) => {
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/ratings/${review.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete review');
      }

      // Success - call callback
      onDelete?.();
    } catch (err) {
      console.error('Delete error:', err);
      // In a production app, you might want to show an error toast here
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] border-[#374151] hover:border-[#4B5563] transition-colors">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#00BFA6]/10 text-[#00BFA6] font-semibold">
                  {getInitials(review.client.firstName, review.client.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                {showClientName && (
                  <div className="font-medium text-[#F9FAFB]">
                    {review.client.firstName} {review.client.lastName}
                  </div>
                )}
                <div className="text-sm text-[#9CA3AF]">
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && onEdit && onDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#1F2937] border-[#374151]"
                >
                  <DropdownMenuItem
                    onClick={onEdit}
                    className="text-[#F9FAFB] hover:bg-[#374151] cursor-pointer"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Review
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-400 hover:bg-[#374151] cursor-pointer"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Rating */}
          <div className="mb-3">
            <StarRating value={review.rating} readonly size="md" showValue />
          </div>

          {/* Service Type Badge */}
          <Badge
            variant="outline"
            className="mb-3 border-[#374151] text-[#9CA3AF]"
          >
            {formatServiceType(review.booking.australianServiceType)}
          </Badge>

          {/* Comment */}
          {review.comment && (
            <p className="text-[#D1D5DB] mb-3 leading-relaxed">
              {review.comment}
            </p>
          )}

          {/* Would Recommend Badge */}
          {review.wouldRecommend && (
            <Badge className="bg-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/30 hover:bg-[#00BFA6]/20">
              <CheckCircle className="h-3 w-3 mr-1" />
              Recommends this contractor
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#1F2937] border-[#374151]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#F9FAFB]">
              Delete Review?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              Are you sure you want to delete this review? This action cannot be
              undone and will affect the contractor's average rating.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#374151] text-[#F9FAFB] hover:bg-[#374151]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
