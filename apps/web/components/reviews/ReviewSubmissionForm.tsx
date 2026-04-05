'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewSubmissionFormProps {
  contractorId: string;
  bookingId: string;
  onSubmitted?: () => void;
}

export default function ReviewSubmissionForm({
  contractorId,
  bookingId,
  onSubmitted
}: ReviewSubmissionFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    wouldRecommend: true,
    professionalism: 0,
    qualityOfWork: 0,
    timeliness: 0,
    communication: 0,
    valueForMoney: 0,
  });

  const handleRatingClick = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error('Please select an overall rating');
      return;
    }

    if (!formData.comment || formData.comment.length < 10) {
      toast.error('Please write a comment (at least 10 characters)');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/contractors/${contractorId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          rating: formData.rating,
          title: formData.title || null,
          comment: formData.comment,
          wouldRecommend: formData.wouldRecommend,
          professionalism: formData.professionalism || null,
          qualityOfWork: formData.qualityOfWork || null,
          timeliness: formData.timeliness || null,
          communication: formData.communication || null,
          valueForMoney: formData.valueForMoney || null,
          photoUrls: [],
          videoUrl: null,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success('Review submitted successfully!');
        if (onSubmitted) {
          onSubmitted();
        }
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStarRating = (field: string, label: string, required: boolean = false) => {
    const value = formData[field as keyof typeof formData] as number;
    return (
      <div>
        <Label className="text-gray-300 mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(field, star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= value
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-400 hover:text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="py-12">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400">
              Your review has been submitted successfully and will be visible to others.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Write a Review</CardTitle>
        <CardDescription className="text-gray-400">
          Share your experience to help others make informed decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div>
            {renderStarRating('rating', 'Overall Rating', true)}
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="title" className="text-gray-300">
              Review Title (optional)
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sum up your experience in one sentence"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              maxLength={100}
            />
          </div>

          {/* Review Comment */}
          <div>
            <Label htmlFor="comment" className="text-gray-300">
              Your Review <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Tell others about your experience with this contractor..."
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              rows={6}
              required
              minLength={10}
              maxLength={2000}
            />
            <p className="text-sm text-gray-400 mt-1">
              {formData.comment.length}/2000 characters
              {formData.comment.length < 10 && ' (minimum 10 characters)'}
            </p>
          </div>

          {/* Detailed Attribute Ratings */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="font-medium text-white">Rate Specific Aspects (optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderStarRating('professionalism', 'Professionalism')}
              {renderStarRating('qualityOfWork', 'Quality of Work')}
              {renderStarRating('timeliness', 'Timeliness')}
              {renderStarRating('communication', 'Communication')}
              {renderStarRating('valueForMoney', 'Value for Money')}
            </div>
          </div>

          {/* Would Recommend */}
          <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
            <input
              type="checkbox"
              id="wouldRecommend"
              checked={formData.wouldRecommend}
              onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.checked })}
              className="rounded border-gray-600 bg-gray-700"
            />
            <Label htmlFor="wouldRecommend" className="text-gray-300 cursor-pointer">
              I would recommend this contractor to others
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting || formData.rating === 0}
            className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting Review...
              </>
            ) : (
              'Submit Review'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
