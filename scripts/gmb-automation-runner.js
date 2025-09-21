#!/usr/bin/env node

/**
 * GMB Automation Runner
 * Executes daily GMB optimization tasks
 * Run: node scripts/gmb-automation-runner.js
 */

const schedule = require('node-schedule');
const { GMBApiClient } = require('../lib/gmb/gmb-api-client');

// Daily automation tasks
const DAILY_TASKS = {
  // Morning: Check reviews and respond
  '08:00': async () => {
    console.log('🔍 Checking for new reviews...');
    await checkAndRespondToReviews();
  },

  // Mid-morning: Create daily post
  '10:00': async () => {
    console.log('📝 Creating daily GMB post...');
    await createDailyPost();
  },

  // Afternoon: Upload new photos
  '14:00': async () => {
    console.log('📸 Uploading optimization photos...');
    await uploadDailyPhotos();
  },

  // Evening: Generate insights report
  '18:00': async () => {
    console.log('📊 Generating daily insights...');
    await generateInsightsReport();
  }
};

// Review monitoring and auto-response
async function checkAndRespondToReviews() {
  const client = new GMBApiClient();
  const locationId = process.env.GMB_LOCATION_ID;

  try {
    const reviews = await client.getReviews(locationId);

    for (const review of reviews) {
      if (!review.reviewReply) {
        // No reply exists, generate and post one
        const response = generateReviewResponse(review);
        await client.replyToReview(review.name, response);
        console.log(`✅ Replied to review from ${review.reviewer.displayName}`);
      }
    }
  } catch (error) {
    console.error('Error processing reviews:', error);
  }
}

// Generate contextual review responses
function generateReviewResponse(review) {
  const rating = review.starRating;
  const reviewerName = review.reviewer.displayName.split(' ')[0];

  if (rating >= 4) {
    const responses = [
      `Thank you ${reviewerName} for your 5-star review! As one of Queensland's limited Master Restorers, we're committed to excellence in disaster recovery.`,
      `We appreciate your trust, ${reviewerName}! Our IICRC certified team is proud to serve Brisbane with 24/7 emergency response.`,
      `Thank you for choosing Disaster Recovery Qld, ${reviewerName}! Your recommendation means everything to us.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  } else {
    return `Thank you for your feedback, ${reviewerName}. We'd like to understand your experience better. Please call our management team at 1300 309 361.`;
  }
}

// Create automated daily posts
async function createDailyPost() {
  const client = new GMBApiClient();
  const locationId = process.env.GMB_LOCATION_ID;
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const posts = {
    monday: {
      summary: '🚨 Start your week protected! Hamilton & Ascot residents - Free water damage assessments available.',
      callToAction: { actionType: 'CALL', url: 'tel:1300309361' }
    },
    tuesday: {
      summary: '💼 Commercial property managers - Minimize downtime with our 60-minute emergency response.',
      callToAction: { actionType: 'LEARN_MORE', url: 'https://disasterrecovery.com.au/services/commercial' }
    },
    wednesday: {
      summary: '🏆 Master Restorer Certified - One of a limited number in Queensland. Excellence in every restoration.',
      media: [{ mediaFormat: 'PHOTO', sourceUrl: 'https://disasterrecovery.com.au/images/phil-mcgurk-iicrc-certification.png' }]
    },
    thursday: {
      summary: '🏠 Protecting Brisbane homes 24/7. Water damage, fire damage, mould - we handle it all.',
      callToAction: { actionType: 'CALL', url: 'tel:1300309361' }
    },
    friday: {
      summary: '📞 Weekend emergency? We\'re here! 24/7 response throughout Brisbane, Ipswich & Logan.',
      callToAction: { actionType: 'CALL', url: 'tel:1300309361' }
    },
    saturday: {
      summary: '⛈️ Storm damage? Our Master Restorer team is on standby for immediate response.',
      callToAction: { actionType: 'CALL', url: 'tel:1300309361' }
    },
    sunday: {
      summary: '✅ Insurance approved & direct billing available. We handle the paperwork, you focus on recovery.',
      callToAction: { actionType: 'LEARN_MORE', url: 'https://disasterrecovery.com.au' }
    }
  };

  try {
    const todaysPost = posts[dayOfWeek];
    await client.createPost(locationId, {
      languageCode: 'en-AU',
      summary: todaysPost.summary,
      callToAction: todaysPost.callToAction,
      media: todaysPost.media,
      topicType: 'UPDATE'
    });
    console.log(`✅ Created ${dayOfWeek} post successfully`);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Upload optimization photos
async function uploadDailyPhotos() {
  const client = new GMBApiClient();
  const locationId = process.env.GMB_LOCATION_ID;

  const photos = [
    {
      mediaFormat: 'PHOTO',
      locationAssociation: { category: 'ADDITIONAL' },
      sourceUrl: 'https://disasterrecovery.com.au/images/commercial-management-brisbane.png',
      description: 'Commercial property restoration specialists'
    },
    {
      mediaFormat: 'PHOTO',
      locationAssociation: { category: 'ADDITIONAL' },
      sourceUrl: 'https://disasterrecovery.com.au/images/phil-mcgurk-iicrc-certification.png',
      description: 'Master Restorer certification - One of limited few in Queensland'
    }
  ];

  try {
    for (const photo of photos) {
      await client.uploadPhoto(locationId, photo);
      console.log(`✅ Uploaded photo: ${photo.description}`);
    }
  } catch (error) {
    console.error('Error uploading photos:', error);
  }
}

// Generate insights report
async function generateInsightsReport() {
  const client = new GMBApiClient();
  const locationId = process.env.GMB_LOCATION_ID;

  try {
    const insights = await client.getInsights(locationId);

    console.log('📊 Daily GMB Performance Report:');
    console.log('================================');
    console.log(`Direct searches: ${insights.metricValues?.find(m => m.metric === 'QUERIES_DIRECT')?.totalValue?.value || 0}`);
    console.log(`Discovery searches: ${insights.metricValues?.find(m => m.metric === 'QUERIES_INDIRECT')?.totalValue?.value || 0}`);
    console.log(`Website clicks: ${insights.metricValues?.find(m => m.metric === 'ACTIONS_WEBSITE')?.totalValue?.value || 0}`);
    console.log(`Phone calls: ${insights.metricValues?.find(m => m.metric === 'ACTIONS_PHONE')?.totalValue?.value || 0}`);
    console.log(`Direction requests: ${insights.metricValues?.find(m => m.metric === 'ACTIONS_DRIVING_DIRECTIONS')?.totalValue?.value || 0}`);

    // Alert if performance is exceptional
    const phoneCalls = insights.metricValues?.find(m => m.metric === 'ACTIONS_PHONE')?.totalValue?.value || 0;
    if (phoneCalls > 10) {
      console.log('🎉 EXCEPTIONAL PERFORMANCE: High call volume detected!');
    }
  } catch (error) {
    console.error('Error generating insights:', error);
  }
}

// Schedule all daily tasks
function scheduleDailyTasks() {
  Object.entries(DAILY_TASKS).forEach(([time, task]) => {
    const [hour, minute] = time.split(':');
    const rule = new schedule.RecurrenceRule();
    rule.hour = parseInt(hour);
    rule.minute = parseInt(minute);

    schedule.scheduleJob(rule, task);
    console.log(`⏰ Scheduled task for ${time}`);
  });
}

// Manual execution for testing
async function runAllTasks() {
  console.log('🚀 Running all GMB automation tasks...\n');

  for (const [time, task] of Object.entries(DAILY_TASKS)) {
    console.log(`\n⏰ Executing ${time} task...`);
    await task();
  }

  console.log('\n✅ All tasks completed!');
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args[0] === '--now') {
    // Run all tasks immediately
    runAllTasks();
  } else if (args[0] === '--schedule') {
    // Schedule tasks to run at specified times
    console.log('🤖 GMB Automation Scheduler Started');
    scheduleDailyTasks();
    console.log('Automation is running. Press Ctrl+C to stop.');
  } else {
    console.log(`
GMB Automation Runner
=====================

Usage:
  node scripts/gmb-automation-runner.js --now      Run all tasks immediately
  node scripts/gmb-automation-runner.js --schedule  Schedule daily automation

Tasks:
  08:00 - Check and respond to reviews
  10:00 - Create daily GMB post
  14:00 - Upload optimization photos
  18:00 - Generate insights report
    `);
  }
}

module.exports = {
  checkAndRespondToReviews,
  createDailyPost,
  uploadDailyPhotos,
  generateInsightsReport,
  runAllTasks
};