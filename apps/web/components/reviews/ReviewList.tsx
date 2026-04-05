'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag,
  Edit,
  Loader2,
  CheckCircle,
  Calendar,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  wouldRecommend: boolean;
  professionalism?: number;
  qualityOfWork?: number;
  timeliness?: number;
  communication?: number;
  valueForMoney?: number;
  photoUrls: string[];
  videoUrl?: string;
  contractorReply?: string;
  repliedAt?: string;
  isPublished: boolean;
  isPinned: boolean;
  isVerified: boolean;
  isEdited: boolean;
  editedAt?: string;
  helpfulVotes: number;
  unhelpfulVotes: number;
  isFlagged: boolean;
  createdAt: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
  };
  booking?: {
    id: string;
    serviceType?: string;
    completedAt?: string;
  };
}

interface ReviewListProps {
  contractorId: string;
  canReply?: boolean;
}

export default function ReviewList({ contractorId, canReply = false }: ReviewListProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [contractorId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/contractors/${contractorId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
        setStatistics(data.statistics || null);
      } else {
        toast.error('Failed to load reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim() || replyText.length < 10) {
      toast.error('Reply must be at least 10 characters');
      return;
    }

    setSubmittingReply(true);
    try {
      const response = await fetch(`/api/reviews/${reviewId}/reply?action=reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply: replyText }),
      });

      if (response.ok) {
        toast.success('Reply posted successfully!');
        setReplyingTo(null);
        setReplyText('');
        await fetchReviews();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error('Failed to post reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleVote = async (reviewId: string, voteType: 'helpful' | 'unhelpful') => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/reply?action=vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      });

      if (response.ok) {
        await fetchReviews();
      } else {
        toast.error('Failed to record vote');
      }
    } catch (error) {
      console.error('Error recording vote:', error);
      toast.error('Failed to record vote');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      {statistics && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Review Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Rating */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-bold text-white">
                    {statistics.averageRating.toFixed(1)}
                  </div>
                  <div>
                    {renderStars(Math.round(statistics.averageRating))}
                    <p className="text-sm text-gray-400 mt-1">
                      {statistics.totalReviews} review{statistics.totalReviews !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = statistics.distribution[rating] || 0;
                    const percentage = statistics.totalReviews > 0
                      ? (count / statistics.totalReviews) * 100
                      : 0;
                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full transition-[width] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attribute Ratings */}
              {statistics.averageAttributes && (
                <div className="space-y-3">
                  <h3 className="font-medium text-white mb-3">Average Ratings by Category</h3>
                  {Object.entries(statistics.averageAttributes).map(([key, value]: [string, any]) => {
                    if (!value || value === 0) return null;
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{label}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.round(value)
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-white font-medium w-8">
                            {value.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="py-12 text-center text-gray-400">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No reviews yet</p>
              <p className="text-sm mt-2">Be the first to leave a review!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={review.client.avatar} />
                      <AvatarFallback className="bg-gray-700 text-white">
                        {review.client.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{review.client.name}</p>
                        {review.isVerified && (
                          <Badge variant="outline" className="border-green-500 text-green-500 gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {review.isPinned && (
                          <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6]">
                            Pinned
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(review.createdAt)}</span>
                        {review.isEdited && <span>(edited)</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Review Title */}
                {review.title && (
                  <h3 className="font-semibold text-white text-lg">{review.title}</h3>
                )}

                {/* Review Comment */}
                {review.comment && (
                  <p className="text-gray-300">{review.comment}</p>
                )}

                {/* Would Recommend */}
                {review.wouldRecommend && (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Recommends this contractor
                  </Badge>
                )}

                {/* Contractor Reply */}
                {review.contractorReply && (
                  <div className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-[#00BFA6]">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-[#00BFA6]" />
                      <span className="font-medium text-white">Contractor Response</span>
                      <span className="text-xs text-gray-400">
                        {review.repliedAt && formatDate(review.repliedAt)}
                      </span>
                    </div>
                    <p className="text-gray-300">{review.contractorReply}</p>
                  </div>
                )}

                {/* Reply Form (for contractors) */}
                {canReply && !review.contractorReply && replyingTo === review.id && (
                  <div className="space-y-2">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your response..."
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReply(review.id)}
                        disabled={submittingReply}
                        className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                      >
                        {submittingReply ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          'Post Reply'
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText('');
                        }}
                        className="border-gray-600 text-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-700">
                  {/* Helpful Votes */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(review.id, 'helpful')}
                    className="text-gray-400 hover:text-green-500"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {review.helpfulVotes > 0 && review.helpfulVotes}
                  </Button>

                  {/* Unhelpful Votes */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(review.id, 'unhelpful')}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    {review.unhelpfulVotes > 0 && review.unhelpfulVotes}
                  </Button>

                  {/* Reply Button (for contractors) */}
                  {canReply && !review.contractorReply && replyingTo !== review.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(review.id)}
                      className="text-gray-400 hover:text-[#00BFA6]"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  )}

                  {/* Flag Button */}
                  {!review.isFlagged && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-orange-500 ml-auto"
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
