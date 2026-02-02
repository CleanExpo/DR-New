/**
 * Test script for AI Image Enhancement
 *
 * This script will:
 * 1. Create a test InspectionPhoto record
 * 2. Enhance it with AI-generated description
 * 3. Display the results
 *
 * Usage: npm run test-enhancement
 */

import { AIImageEnhancementService } from '../lib/services/ai-image-enhancement.service';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('🚀 Starting AI Image Enhancement Test...\n');

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    console.log('\n📝 To fix this:');
    console.log('1. Add to your .env file:');
    console.log('   OPENAI_API_KEY=sk-proj-...\n');
    console.log('2. Get your key from: https://platform.openai.com/api-keys\n');
    process.exit(1);
  }

  try {
    // 1. Find or create test data
    console.log('📋 Step 1: Setting up test data...');

    // Find an existing inspection photo (or we'll create test data)
    let testPhoto = await prisma.inspectionPhoto.findFirst({
      where: {
        photoUrl: { not: null },
        aiEnhanced: false,
      },
      include: {
        damageArea: true,
        report: {
          include: {
            booking: {
              include: {
                auClaims: true,
              },
            },
          },
        },
      },
    });

    if (!testPhoto) {
      console.log('⚠️  No unenhanced photos found in database.');
      console.log('📝 Creating test data...\n');

      // Get or create a test user
      let testUser = await prisma.user.findFirst({
        where: { userType: 'ADMIN' },
      });

      if (!testUser) {
        testUser = await prisma.user.create({
          data: {
            email: 'test-admin@disasterrecovery.com.au',
            name: 'Test Admin',
            userType: 'ADMIN',
            password: 'hashed-password-placeholder',
          },
        });
      }

      // Create test booking
      const testBooking = await prisma.booking.create({
        data: {
          clientId: testUser.id,
          australianServiceType: 'WATER_DAMAGE_RESTORATION',
          servicePostcode: '2000',
          serviceState: 'NSW',
          serviceSuburb: 'Sydney',
          streetAddress: '123 Test St',
          description: 'Water damage restoration - test case',
          estimatedCostAUD: 5000,
          status: 'IN_PROGRESS',
        },
      });

      // Create test inspection report
      const testReport = await prisma.inspectionReport.create({
        data: {
          reportNumber: `TEST-${Date.now()}`,
          bookingId: testBooking.id,
          inspectionDate: new Date(),
          inspectorId: testUser.id,
          jurisdiction: 'NSW',
          applicableCodes: ['AS 3959', 'AS/NZS 3760'],
          iicrcStandards: ['S500_WATER'],
          status: 'IN_PROGRESS',
          scopeOfWork: 'Water damage assessment and remediation planning',
          findings: 'Significant water damage to timber flooring and wall cavities',
          recommendations: 'Immediate drying and dehumidification required',
          createdBy: testUser.id,
        },
      });

      // Create test damage area
      const testDamageArea = await prisma.damageArea.create({
        data: {
          reportId: testReport.id,
          areaName: 'Living Room',
          floor: 'Ground Floor',
          roomType: 'Living Area',
          damageCategory: 'WATER_DAMAGE',
          affectedArea: 25.5,
          affectedMaterials: ['Timber flooring', 'Plasterboard walls', 'Carpet underlay'],
          description: 'Water damage from burst pipe affecting timber flooring',
          severity: 'Major',
          requiredActions: [
            'Water extraction',
            'Dehumidification',
            'Moisture monitoring',
            'Structural drying',
          ],
          equipmentNeeded: ['Dehumidifier', 'Air mover', 'Moisture meter'],
          estimatedDryingTime: 5,
        },
      });

      // Create test photo with the actual image URL
      // Using a Cloudinary test URL (you can replace this with your actual Cloudinary upload)
      testPhoto = await prisma.inspectionPhoto.create({
        data: {
          reportId: testReport.id,
          damageAreaId: testDamageArea.id,
          photoUrl:
            'https://res.cloudinary.com/demo/image/upload/sample.jpg', // Replace with actual URL
          filename: 'test-water-damage.jpg',
          fileSize: 1024000,
          mimeType: 'image/jpeg',
          photoType: 'evidence',
          caption: 'Water damage restoration equipment setup',
          capturedAt: new Date(),
          sortOrder: 1,
        },
        include: {
          damageArea: true,
          report: {
            include: {
              booking: {
                include: {
                  auClaims: true,
                },
              },
            },
          },
        },
      });

      console.log('✅ Test data created successfully\n');
    }

    console.log('📸 Photo Details:');
    console.log(`   ID: ${testPhoto.id}`);
    console.log(`   URL: ${testPhoto.photoUrl}`);
    console.log(`   Type: ${testPhoto.photoType}`);
    console.log(`   Current Description: ${testPhoto.description || '(none)'}\n`);

    // 2. Initialize the AI service
    console.log('🤖 Step 2: Initializing AI Image Enhancement Service...');
    const service = new AIImageEnhancementService();
    console.log('✅ Service initialized\n');

    // 3. Enhance the image
    console.log('✨ Step 3: Enhancing image with GPT-4 Vision...');
    console.log('⏳ This may take 3-5 seconds...\n');

    const startTime = Date.now();
    const result = await service.enhanceSingleImage(testPhoto.id);
    const duration = Date.now() - startTime;

    // 4. Display results
    if (result.success) {
      console.log('✅ Enhancement Successful!\n');
      console.log('═══════════════════════════════════════════════════════');
      console.log('📝 AI-GENERATED DESCRIPTION:');
      console.log('═══════════════════════════════════════════════════════');
      console.log(result.description);
      console.log('═══════════════════════════════════════════════════════\n');

      console.log('📊 Performance Metrics:');
      console.log(`   ⏱️  Processing Time: ${(duration / 1000).toFixed(2)}s`);
      console.log(`   💰 Cost: $${result.cost.toFixed(4)}`);
      console.log(`   📏 Description Length: ${result.description?.length || 0} characters\n`);

      // Check for E.E.A.T. elements
      const description = result.description || '';
      const hasIICRC = /IICRC/i.test(description);
      const hasAustralianCode = /AS[\s\/]?\d{4}|AS\/NZS/i.test(description);
      const hasTechnicalTerms = /(moisture|saturation|extraction|remediation)/i.test(
        description
      );
      const hasAustralianSpelling = /(colour|mould|metre)/i.test(description);

      console.log('🎯 E.E.A.T. Quality Check:');
      console.log(`   ${hasIICRC ? '✅' : '❌'} IICRC Standards Referenced`);
      console.log(`   ${hasAustralianCode ? '✅' : '❌'} Australian Building Codes`);
      console.log(`   ${hasTechnicalTerms ? '✅' : '❌'} Technical Terminology`);
      console.log(`   ${hasAustralianSpelling ? '✅' : '❌'} Australian English Spelling\n`);

      // Fetch updated photo from database
      const updatedPhoto = await prisma.inspectionPhoto.findUnique({
        where: { id: testPhoto.id },
        select: {
          aiEnhanced: true,
          aiEnhancedAt: true,
          aiModel: true,
          description: true,
        },
      });

      console.log('💾 Database Updated:');
      console.log(`   AI Enhanced: ${updatedPhoto?.aiEnhanced ? 'Yes' : 'No'}`);
      console.log(`   Model: ${updatedPhoto?.aiModel}`);
      console.log(
        `   Enhanced At: ${updatedPhoto?.aiEnhancedAt?.toLocaleString() || 'N/A'}\n`
      );

      // Fetch enhancement log
      const log = await prisma.aIImageEnhancementLog.findFirst({
        where: { photoId: testPhoto.id },
        orderBy: { createdAt: 'desc' },
      });

      if (log) {
        console.log('📋 Enhancement Log:');
        console.log(`   Log ID: ${log.id}`);
        console.log(`   Tokens Used: ${log.tokensUsed}`);
        console.log(`   Processing Time: ${log.processingMs}ms`);
        console.log(`   Success: ${log.success ? 'Yes' : 'No'}\n`);
      }

      console.log('🎉 Test completed successfully!');
      console.log('\n📍 Next Steps:');
      console.log('   1. View in admin dashboard: /dashboard/admin/ai-enhancement');
      console.log('   2. Try batch processing with filters');
      console.log('   3. Check enhancement stats API\n');
    } else {
      console.error('❌ Enhancement Failed!\n');
      console.error('Error:', result.error);
      console.error('\n🔍 Troubleshooting:');
      console.error('   1. Check OpenAI API key is valid');
      console.error('   2. Verify image URL is accessible');
      console.error('   3. Check OpenAI API quota/billing');
      console.error('   4. Review error logs\n');
    }
  } catch (error: any) {
    console.error('❌ Test failed with error:\n');
    console.error(error);
    console.error('\n🔍 Common Issues:');
    console.error('   1. Database connection issues');
    console.error('   2. OpenAI API key invalid or expired');
    console.error('   3. Image URL not accessible');
    console.error('   4. Network connectivity problems\n');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
