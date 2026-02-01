import { z } from 'zod';

/**
 * Rating Validation Schemas
 *
 * Validation schemas for the review/rating system.
 * Used to validate API requests for creating, updating, and querying ratings.
 */

/**
 * Schema for creating a new rating/review
 *
 * Requirements:
 * - bookingId: Must be a valid CUID
 * - rating: Integer between 1-5
 * - comment: Optional, but if provided must be 10-1000 characters
 * - wouldRecommend: Boolean, defaults to true
 */
export const createRatingSchema = z.object({
  bookingId: z.string().cuid('Invalid booking ID format'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment must be at most 1000 characters').optional(),
  wouldRecommend: z.boolean().default(true),
});

export type CreateRatingInput = z.infer<typeof createRatingSchema>;

/**
 * Schema for updating an existing rating/review
 *
 * All fields are optional, but at least one field must be provided.
 * This allows partial updates while preventing empty update requests.
 */
export const updateRatingSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').optional(),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment must be at most 1000 characters').optional(),
  wouldRecommend: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

export type UpdateRatingInput = z.infer<typeof updateRatingSchema>;

/**
 * Schema for querying/filtering ratings
 *
 * Supports filtering by:
 * - contractorId: Get all reviews for a specific contractor
 * - clientId: Get all reviews written by a specific client
 * - bookingId: Get the review for a specific booking
 * - page: Pagination page number (default: 1)
 * - limit: Results per page (default: 10, max: 50)
 */
export const queryRatingSchema = z.object({
  contractorId: z.string().cuid('Invalid contractor ID format').optional(),
  clientId: z.string().cuid('Invalid client ID format').optional(),
  bookingId: z.string().cuid('Invalid booking ID format').optional(),
  page: z.number().int().positive('Page must be positive').default(1),
  limit: z.number().int().positive('Limit must be positive').max(50, 'Limit cannot exceed 50').default(10),
});

export type QueryRatingInput = z.infer<typeof queryRatingSchema>;
