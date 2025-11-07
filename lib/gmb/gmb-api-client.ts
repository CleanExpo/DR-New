// Secure GMB API Client
// This handles all Google My Business API interactions

import { google } from 'googleapis';

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://disasterrecovery.com.au/api/auth/callback'
);

// Set credentials if refresh token exists
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

export class GMBApiClient {
  private mybusiness: unknown;

  constructor() {
    this.mybusiness = google.mybusinessbusinessinformation({
      version: 'v1',
      auth: oauth2Client
    });
  }

  // Get account information
  async getAccount() {
    try {
      const res = await this.mybusiness.accounts.list();
      return res.data.accounts?.[0];
    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  }

  // Get location details
  async getLocation(locationId: string) {
    try {
      const res = await this.mybusiness.locations.get({
        name: locationId
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }

  // Create a new post
  async createPost(locationId: string, post: unknown) {
    try {
      const mybusinessposts = google.mybusinessposts({
        version: 'v1',
        auth: oauth2Client
      });

      const res = await mybusinessposts.localPosts.create({
        parent: locationId,
        requestBody: post
      });
      return res.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get reviews
  async getReviews(locationId: string) {
    try {
      const mybusinessreviews = google.mybusiness({
        version: 'v4',
        auth: oauth2Client
      });

      const res = await mybusinessreviews.accounts.locations.reviews.list({
        parent: locationId
      });
      return res.data.reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  // Reply to a review
  async replyToReview(reviewName: string, comment: string) {
    try {
      const mybusinessreviews = google.mybusiness({
        version: 'v4',
        auth: oauth2Client
      });

      const res = await mybusinessreviews.accounts.locations.reviews.updateReply({
        name: reviewName,
        requestBody: {
          comment: comment
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error replying to review:', error);
      throw error;
    }
  }

  // Upload a photo
  async uploadPhoto(locationId: string, photoData: unknown) {
    try {
      const mybusinessmedia = google.mybusiness({
        version: 'v4',
        auth: oauth2Client
      });

      const res = await mybusinessmedia.accounts.locations.media.create({
        parent: locationId,
        requestBody: photoData
      });
      return res.data;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  }

  // Get insights
  async getInsights(locationId: string) {
    try {
      const mybusinessinsights = google.mybusiness({
        version: 'v4',
        auth: oauth2Client
      });

      const res = await mybusinessinsights.accounts.locations.reportInsights({
        name: `${locationId}/reportInsights`,
        requestBody: {
          locationNames: [locationId],
          basicRequest: {
            metricRequests: [
              { metric: 'QUERIES_DIRECT' },
              { metric: 'QUERIES_INDIRECT' },
              { metric: 'VIEWS_MAPS' },
              { metric: 'VIEWS_SEARCH' },
              { metric: 'ACTIONS_WEBSITE' },
              { metric: 'ACTIONS_PHONE' },
              { metric: 'ACTIONS_DRIVING_DIRECTIONS' }
            ],
            timeRange: {
              startTime: '2024-01-01T00:00:00Z',
              endTime: new Date().toISOString()
            }
          }
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }
}

// Automated posting schedules
export const AUTO_POST_TEMPLATES = {
  monday: {
    topicType: 'OFFER',
    summary: '🚨 Hamilton & Ascot Water Damage Special',
    callToAction: {
      actionType: 'CALL',
      url: 'tel:1300309361'
    },
    event: {
      title: 'Free Assessment - Hamilton & Ascot',
      schedule: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    }
  },

  wednesday: {
    topicType: 'UPDATE',
    summary: '🏆 Master Restorer Certification - One of Limited Few in QLD',
    media: [{
      mediaFormat: 'PHOTO',
      sourceUrl: 'https://disasterrecovery.com.au/images/phil-mcgurk-iicrc-certification.png'
    }]
  },

  friday: {
    topicType: 'PRODUCT',
    summary: '💼 Commercial Property Restoration - Brisbane CBD Specialists',
    callToAction: {
      actionType: 'LEARN_MORE',
      url: 'https://disasterrecovery.com.au/services/commercial'
    }
  },

  sunday: {
    topicType: 'UPDATE',
    summary: '📞 24/7 Emergency Response Active - Master Restorer Team on Standby',
    callToAction: {
      actionType: 'CALL',
      url: 'tel:1300309361'
    }
  }
};

// Review response templates
export const REVIEW_RESPONSES = {
  positive: (reviewerName: string, location: string) => [
    `Thank you ${reviewerName} for trusting us with your ${location} property restoration. As one of Queensland's limited Master Restorers, we're committed to excellence.`,
    `We appreciate your kind words, ${reviewerName}! Our Master Restorer team is proud to serve ${location}.`,
    `Thank you for this wonderful review, ${reviewerName}! We're honored to be your trusted restoration partner in ${location}.`
  ],

  neutral: (reviewerName: string) => [
    `Thank you for your feedback, ${reviewerName}. We're always working to improve our service. Please call 1300 309 361 if you'd like to discuss your experience.`,
    `We appreciate your honest review, ${reviewerName}. Your feedback helps us maintain our Master Restorer standards.`
  ],

  negative: (reviewerName: string) => [
    `Thank you for your feedback, ${reviewerName}. This doesn't reflect our Master Restorer standards. Please call 1300 309 361 so we can make this right.`,
    `We sincerely apologize for your experience, ${reviewerName}. Our management team would like to discuss this personally. Please call 1300 309 361.`
  ]
};