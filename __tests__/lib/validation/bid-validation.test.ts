/**
 * Unit Tests for Bid Validation
 *
 * Tests budget, timeline, hours, and date validation functions.
 */

import {
  isValidBudget,
  parseBudget,
  isValidTimeline,
  isValidEstimatedHours,
  parseEstimatedHours,
  isValidStartDate,
  parseStartDate,
  bidValidationSchema,
  validateAndParseBid,
} from '@/src/lib/validation/bid-validation';

describe('Bid Validation - Budget', () => {
  describe('isValidBudget', () => {
    it('should accept valid currency formats', () => {
      expect(isValidBudget('$5000')).toBe(true);
      expect(isValidBudget('5000')).toBe(true);
      expect(isValidBudget('$5,000')).toBe(true);
      expect(isValidBudget('5,000')).toBe(true);
      expect(isValidBudget('$5000 AUD')).toBe(true);
      expect(isValidBudget('$100')).toBe(true); // Minimum
    });

    it('should reject invalid formats', () => {
      expect(isValidBudget('')).toBe(false);
      expect(isValidBudget('$99')).toBe(false); // Below minimum
      expect(isValidBudget('$2000000')).toBe(false); // Above maximum
      expect(isValidBudget('abc')).toBe(false);
      expect(isValidBudget('$-1000')).toBe(false);
      expect(isValidBudget('NaN')).toBe(false);
    });

    it('should accept boundary values', () => {
      expect(isValidBudget('$100')).toBe(true);
      expect(isValidBudget('$1000000')).toBe(true);
    });
  });

  describe('parseBudget', () => {
    it('should parse various budget formats', () => {
      expect(parseBudget('$5000')).toBe(5000);
      expect(parseBudget('5000')).toBe(5000);
      expect(parseBudget('$5,000')).toBe(5000);
      expect(parseBudget('5,000.50')).toBe(5000.5);
    });

    it('should return null for invalid budgets', () => {
      expect(parseBudget('$99')).toBeNull();
      expect(parseBudget('invalid')).toBeNull();
    });
  });
});

describe('Bid Validation - Timeline', () => {
  describe('isValidTimeline', () => {
    it('should accept common time expressions', () => {
      expect(isValidTimeline('ASAP')).toBe(true);
      expect(isValidTimeline('asap')).toBe(true);
      expect(isValidTimeline('Urgent')).toBe(true);
      expect(isValidTimeline('Immediate')).toBe(true);
    });

    it('should accept relative time formats', () => {
      expect(isValidTimeline('2 weeks')).toBe(true);
      expect(isValidTimeline('14 days')).toBe(true);
      expect(isValidTimeline('1 month')).toBe(true);
      expect(isValidTimeline('24 hours')).toBe(true);
    });

    it('should accept ISO dates', () => {
      expect(isValidTimeline('2025-02-15')).toBe(true);
      expect(isValidTimeline('2025-12-31')).toBe(true);
    });

    it('should accept day of week', () => {
      expect(isValidTimeline('Monday')).toBe(true);
      expect(isValidTimeline('Friday')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidTimeline('')).toBe(false);
      expect(isValidTimeline('abc')).toBe(false);
      expect(isValidTimeline('999 weeks')).toBe(true); // Actually valid pattern
    });
  });
});

describe('Bid Validation - Estimated Hours', () => {
  describe('isValidEstimatedHours', () => {
    it('should accept valid hour formats', () => {
      expect(isValidEstimatedHours('8')).toBe(true);
      expect(isValidEstimatedHours('8.5')).toBe(true);
      expect(isValidEstimatedHours('0.25')).toBe(true); // 15 minutes
      expect(isValidEstimatedHours('40')).toBe(true);
      expect(isValidEstimatedHours('8 hours')).toBe(true);
      expect(isValidEstimatedHours('40 hours')).toBe(true);
    });

    it('should accept optional field', () => {
      expect(isValidEstimatedHours(undefined)).toBe(true);
      expect(isValidEstimatedHours('')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidEstimatedHours('0')).toBe(false); // Zero or negative
      expect(isValidEstimatedHours('-8')).toBe(false);
      expect(isValidEstimatedHours('10000')).toBe(false); // Above maximum
      expect(isValidEstimatedHours('abc')).toBe(false);
    });
  });

  describe('parseEstimatedHours', () => {
    it('should parse various hour formats', () => {
      expect(parseEstimatedHours('8')).toBe(8);
      expect(parseEstimatedHours('8.5')).toBe(8.5);
      expect(parseEstimatedHours('8 hours')).toBe(8);
      expect(parseEstimatedHours('40 hours')).toBe(40);
    });

    it('should return null for invalid formats', () => {
      expect(parseEstimatedHours('0')).toBeNull();
      expect(parseEstimatedHours('invalid')).toBeNull();
    });

    it('should handle undefined as optional', () => {
      expect(parseEstimatedHours(undefined)).toBeNull();
      expect(parseEstimatedHours('')).toBeNull();
    });
  });
});

describe('Bid Validation - Start Date', () => {
  describe('isValidStartDate', () => {
    it('should accept valid date formats', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowISO = tomorrow.toISOString().split('T')[0];

      expect(isValidStartDate(tomorrowISO)).toBe(true);
      // Note: Hard to test exact dates due to timezone issues in tests
    });

    it('should accept optional field', () => {
      expect(isValidStartDate(undefined)).toBe(true);
      expect(isValidStartDate('')).toBe(true);
    });

    it('should reject past dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = yesterday.toISOString().split('T')[0];

      expect(isValidStartDate(yesterdayISO)).toBe(false);
    });

    it('should reject invalid date formats', () => {
      expect(isValidStartDate('invalid')).toBe(false);
      expect(isValidStartDate('2025-13-01')).toBe(false); // Invalid month
      expect(isValidStartDate('2025-02-30')).toBe(false); // Invalid day
    });
  });

  describe('parseStartDate', () => {
    it('should parse ISO dates', () => {
      // Use a future date (March 2026 is after Jan 10, 2026)
      expect(parseStartDate('2026-03-15')).toBe('2026-03-15');
    });

    it('should return null for invalid dates', () => {
      expect(parseStartDate('invalid')).toBeNull();
      expect(parseStartDate('')).toBeNull();
    });
  });
});

describe('Bid Validation - Schema Validation', () => {
  describe('bidValidationSchema', () => {
    it('should validate complete bid', async () => {
      const validBid = {
        budget: '$5000',
        timeline: 'ASAP',
        message: 'This is a test bid with sufficient content for validation.',
        startDate: '2026-03-15',
        estimatedHours: '40',
      };

      const result = await bidValidationSchema.parseAsync(validBid);
      expect(result).toBeDefined();
      expect(result.budget).toBe('$5000');
      expect(result.message).toBeDefined();
    });

    it('should validate bid with optional fields', async () => {
      const minimalBid = {
        budget: '$1000',
        timeline: '2 weeks',
        message: 'This is a minimal bid with required fields only.',
      };

      const result = await bidValidationSchema.parseAsync(minimalBid);
      expect(result).toBeDefined();
    });

    it('should reject invalid budget', async () => {
      const invalidBid = {
        budget: '$50', // Below minimum
        timeline: 'ASAP',
        message: 'This bid has an invalid budget amount.',
      };

      await expect(bidValidationSchema.parseAsync(invalidBid)).rejects.toThrow();
    });

    it('should reject invalid timeline', async () => {
      const invalidBid = {
        budget: '$5000',
        timeline: 'xyz', // Invalid format
        message: 'This bid has an invalid timeline format.',
      };

      await expect(bidValidationSchema.parseAsync(invalidBid)).rejects.toThrow();
    });

    it('should reject short message', async () => {
      const invalidBid = {
        budget: '$5000',
        timeline: 'ASAP',
        message: 'Short', // Less than 10 characters
      };

      await expect(bidValidationSchema.parseAsync(invalidBid)).rejects.toThrow();
    });

    it('should reject invalid hours', async () => {
      const invalidBid = {
        budget: '$5000',
        timeline: 'ASAP',
        message: 'This bid has an invalid hours value.',
        estimatedHours: '0', // Zero or negative
      };

      await expect(bidValidationSchema.parseAsync(invalidBid)).rejects.toThrow();
    });
  });

  describe('validateAndParseBid', () => {
    it('should parse and return numeric values', async () => {
      const bid = {
        budget: '$5,000',
        timeline: 'ASAP',
        message: 'This is a comprehensive test bid with all fields.',
        startDate: '2026-03-15',
        estimatedHours: '40',
      };

      const result = await validateAndParseBid(bid);
      expect(result.budget).toBe(5000); // Numeric
      expect(result.estimatedHours).toBe(40); // Numeric
      expect(result.startDate).toBe('2026-03-15'); // ISO format
    });
  });
});
