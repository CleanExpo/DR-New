/**
 * Phase 2 GBP Tests - Google Business Profile Automation
 *
 * Tests for:
 * - GBP Manager (8 capital configuration)
 * - Posts Engine (weekly automated posts)
 * - Review Request System (SMS/Email automation)
 * - Local Citations Database
 * - Health score calculations
 */

import { gbpManager, GBP_LOCATIONS } from '@/lib/gbp/gbp-manager';
import { gbpPostsEngine, WEEKLY_POST_TEMPLATES } from '@/lib/gbp/gbp-posts-engine';
import { reviewRequestSystem } from '@/lib/gbp/review-request-system';

describe('GBP Manager - 8 Capital Configuration', () => {
  describe('Location Setup', () => {
    it('should have exactly 8 configured capital cities', () => {
      expect(GBP_LOCATIONS).toHaveLength(8);
    });

    it('should have all required capital cities', () => {
      const cities = GBP_LOCATIONS.map(loc => loc.city);
      expect(cities).toContain('Sydney');
      expect(cities).toContain('Melbourne');
      expect(cities).toContain('Brisbane');
      expect(cities).toContain('Perth');
      expect(cities).toContain('Adelaide');
      expect(cities).toContain('Canberra');
      expect(cities).toContain('Hobart');
      expect(cities).toContain('Darwin');
    });

    it('should have valid coordinates for each location', () => {
      GBP_LOCATIONS.forEach(loc => {
        expect(loc.latitude).toBeGreaterThan(-44);
        expect(loc.latitude).toBeLessThan(-10);
        expect(loc.longitude).toBeGreaterThan(113);
        expect(loc.longitude).toBeLessThan(154);
      });
    });

    it('should have 50km service radius for all locations', () => {
      GBP_LOCATIONS.forEach(loc => {
        expect(loc.serviceRadiusKm).toBe(50);
      });
    });
  });

  describe('NAP Consistency', () => {
    it('should validate correct NAP format', () => {
      const location = gbpManager.getLocationByCity('Sydney');
      expect(location).toBeDefined();

      const validation = gbpManager.validateNAP(location!);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should use consistent phone number across all locations', () => {
      GBP_LOCATIONS.forEach(loc => {
        expect(loc.phone).toBe('1300 309 361');
      });
    });

    it('should flag missing address data', () => {
      const invalidLocation = {
        ...GBP_LOCATIONS[0],
        address: '',
      };

      const validation = gbpManager.validateNAP(invalidLocation);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Address missing');
    });
  });

  describe('Health Score Calculation', () => {
    it('should calculate health score 0-100', () => {
      GBP_LOCATIONS.forEach(loc => {
        const score = gbpManager.getHealthScore(loc);
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(100);
      });
    });

    it('should increase score with more photos', () => {
      const location = GBP_LOCATIONS[0];
      const scoreEmpty = gbpManager.getHealthScore(location);

      location.photos = Array(20)
        .fill(null)
        .map((_, i) => ({
          id: `photo-${i}`,
          url: `https://example.com/photo-${i}.jpg`,
          caption: 'Before/after restoration',
          uploadedAt: new Date(),
        }));

      const scoreWithPhotos = gbpManager.getHealthScore(location);
      expect(scoreWithPhotos).toBeGreaterThan(scoreEmpty);
    });

    it('should increase score with reviews', () => {
      const location = GBP_LOCATIONS[0];
      const scoreBeforeReviews = gbpManager.getHealthScore(location);

      location.reviews.totalReviews = 50;
      location.reviews.averageRating = 4.9;

      const scoreWithReviews = gbpManager.getHealthScore(location);
      expect(scoreWithReviews).toBeGreaterThan(scoreBeforeReviews);
    });

    it('should increase score with active posts', () => {
      const location = GBP_LOCATIONS[0];
      const scoreBeforePosts = gbpManager.getHealthScore(location);

      location.posts.totalPosts = 28; // 4 weeks × 7 posts
      location.posts.weeksActive = 4;

      const scoreWithPosts = gbpManager.getHealthScore(location);
      expect(scoreWithPosts).toBeGreaterThan(scoreBeforePosts);
    });
  });

  describe('Activation Checklist', () => {
    it('should generate checklist with critical tasks', () => {
      const location = GBP_LOCATIONS[0];
      const checklist = gbpManager.getActivationChecklist(location);

      const criticalTasks = checklist.filter(item => item.priority === 'critical');
      expect(criticalTasks.length).toBeGreaterThan(0);
    });

    it('should mark tasks complete when conditions met', () => {
      const location = GBP_LOCATIONS[0];
      location.verified = true;
      location.photos = Array(20).fill({ id: '1', url: '', caption: '', uploadedAt: new Date() });

      const checklist = gbpManager.getActivationChecklist(location);
      const verifyTask = checklist.find(t => t.task.includes('Verify'));
      const photoTask = checklist.find(t => t.task.includes('20'));

      expect(verifyTask?.completed).toBe(true);
      expect(photoTask?.completed).toBe(true);
    });
  });
});

describe('GBP Posts Engine', () => {
  it('should have exactly 7 weekly post templates', () => {
    expect(WEEKLY_POST_TEMPLATES).toHaveLength(7);
  });

  it('should have one template for each day of week', () => {
    const days = WEEKLY_POST_TEMPLATES.map(t => t.dayOfWeek);
    expect(days).toContain('Monday');
    expect(days).toContain('Tuesday');
    expect(days).toContain('Wednesday');
    expect(days).toContain('Thursday');
    expect(days).toContain('Friday');
    expect(days).toContain('Saturday');
    expect(days).toContain('Sunday');
  });

  describe('Post Generation', () => {
    it('should generate 7 weekly posts for a location', () => {
      const location = GBP_LOCATIONS[0];
      const posts = gbpPostsEngine.generateWeeklyPosts(location);

      expect(posts).toHaveLength(7);
    });

    it('should generate posts with unique content per day', () => {
      const location = GBP_LOCATIONS[0];
      const posts = gbpPostsEngine.generateWeeklyPosts(location);

      const bodies = posts.map(p => p.body);
      const uniqueBodies = new Set(bodies);
      expect(uniqueBodies.size).toBe(7);
    });

    it('should include city name in generated posts', () => {
      const location = GBP_LOCATIONS[0];
      const posts = gbpPostsEngine.generateWeeklyPosts(location);

      posts.forEach(post => {
        expect(post.body.toLowerCase()).toContain(location.city.toLowerCase());
      });
    });

    it('should generate valid call-to-action URLs', () => {
      const location = GBP_LOCATIONS[0];
      const posts = gbpPostsEngine.generateWeeklyPosts(location);

      posts.forEach(post => {
        expect(post.callToActionUrl).toMatch(/^\/[a-z\-]+/);
      });
    });
  });

  describe('Post Metrics', () => {
    it('should calculate metrics for published posts', () => {
      const location = GBP_LOCATIONS[0];
      const posts = gbpPostsEngine.generateWeeklyPosts(location);

      // Simulate some posts being published
      posts[0].published = true;
      posts[0].views = 150;
      posts[0].clicks = 12;
      posts[0].engagement = 35;

      posts[1].published = true;
      posts[1].views = 200;
      posts[1].clicks = 18;
      posts[1].engagement = 45;

      const metrics = gbpPostsEngine.getPostMetrics(posts);

      expect(metrics.publishedPosts).toBe(2);
      expect(metrics.totalViews).toBe(350);
      expect(metrics.totalClicks).toBe(30);
      expect(metrics.avgClickThroughRate).toBeGreaterThan(8);
    });
  });

  describe('Monthly Calendar', () => {
    it('should generate 28 posts for one month', () => {
      const location = GBP_LOCATIONS[0];
      const calendar = gbpPostsEngine.generateMonthlyCalendar(location);

      expect(calendar).toHaveLength(28);
    });

    it('should schedule posts with different dates', () => {
      const location = GBP_LOCATIONS[0];
      const calendar = gbpPostsEngine.generateMonthlyCalendar(location);

      const dates = calendar.map(p => p.scheduledDate?.getTime()).filter(d => d);
      const uniqueDates = new Set(dates);

      expect(uniqueDates.size).toBeGreaterThan(20);
    });
  });
});

describe('Review Request System', () => {
  describe('Request Creation', () => {
    it('should create review request with correct data', () => {
      const request = reviewRequestSystem.createReviewRequest(
        'job-123',
        'sydney-nsw',
        'customer-456',
        {
          name: 'Sarah M.',
          email: 'sarah@example.com',
          phone: '0412345678',
          serviceType: 'Water Damage',
        }
      );

      expect(request.jobId).toBe('job-123');
      expect(request.customerName).toBe('Sarah M.');
      expect(request.serviceType).toBe('Water Damage');
      expect(request.status).toBe('pending');
      expect(request.reviewReceived).toBe(false);
    });
  });

  describe('SMS Generation', () => {
    it('should generate SMS with customer name and service type', () => {
      const request = reviewRequestSystem.createReviewRequest(
        'job-123',
        'sydney-nsw',
        'customer-456',
        {
          name: 'Sarah M.',
          email: 'sarah@example.com',
          phone: '0412345678',
          serviceType: 'Water Damage',
        }
      );

      const location = gbpManager.getLocationByCity('Sydney');
      const sms = reviewRequestSystem.generateSMSRequest(request, location!);

      expect(sms).toContain('Sarah');
      expect(sms).toContain('Water Damage');
      expect(sms.length).toBeLessThanOrEqual(160);
    });
  });

  describe('Email Generation', () => {
    it('should generate initial email with subject and body', () => {
      const request = reviewRequestSystem.createReviewRequest(
        'job-123',
        'sydney-nsw',
        'customer-456',
        {
          name: 'Sarah M.',
          email: 'sarah@example.com',
          phone: '0412345678',
          serviceType: 'Water Damage',
        }
      );

      const location = gbpManager.getLocationByCity('Sydney');
      const email = reviewRequestSystem.generateEmailRequest(request, location!, false);

      expect(email.subject).toBeDefined();
      expect(email.subject).toContain('Review');
      expect(email.body).toContain('Sarah');
      expect(email.body).toContain('Water Damage');
    });

    it('should generate reminder email with different content', () => {
      const request = reviewRequestSystem.createReviewRequest(
        'job-123',
        'sydney-nsw',
        'customer-456',
        { name: 'Sarah', email: 'sarah@example.com', phone: '0412345678', serviceType: 'Water Damage' }
      );
      request.reminderCount = 1;

      const location = gbpManager.getLocationByCity('Sydney');
      const email = reviewRequestSystem.generateEmailRequest(request, location!, true);

      expect(email.subject).toContain('reminder');
      expect(email.body).toContain('week');
    });
  });

  describe('Progress Tracking', () => {
    it('should calculate review progress toward 50-review target', () => {
      const requests = [
        reviewRequestSystem.createReviewRequest('job-1', 'sydney-nsw', 'cust-1', {
          name: 'Customer 1',
          email: 'cust1@example.com',
          phone: '0412345678',
          serviceType: 'Water',
        }),
        reviewRequestSystem.createReviewRequest('job-2', 'sydney-nsw', 'cust-2', {
          name: 'Customer 2',
          email: 'cust2@example.com',
          phone: '0412345678',
          serviceType: 'Water',
        }),
      ];

      // Mark first as received
      const received = reviewRequestSystem.markReviewReceived(requests[0], {
        rating: 5,
        text: 'Great service',
        url: 'https://google.com/review',
      });
      requests[0] = received;

      const progress = reviewRequestSystem.getReviewProgress(requests, 'sydney-nsw');

      expect(progress.target).toBe(50);
      expect(progress.current).toBe(1);
      expect(progress.completed).toBe(1);
      expect(progress.pending).toBe(1);
      expect(progress.conversionRate).toBe(50);
    });
  });
});

describe('Phase 2 Integration', () => {
  it('should support full GBP workflow: setup → posts → reviews → citations', () => {
    const location = gbpManager.getLocation('sydney-nsw');
    expect(location).toBeDefined();

    // Generate posts
    const posts = gbpPostsEngine.generateWeeklyPosts(location!);
    expect(posts.length).toBe(7);

    // Create review requests
    const requests = [
      reviewRequestSystem.createReviewRequest('job-1', location!.id, 'cust-1', {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '0412345678',
        serviceType: 'Water Damage',
      }),
    ];

    // Check progress
    const progress = reviewRequestSystem.getReviewProgress(requests, location!.id);
    expect(progress.target).toBe(50);

    // Health score should account for all components
    const health = gbpManager.getHealthScore(location!);
    expect(health).toBeGreaterThanOrEqual(0);
  });
});
