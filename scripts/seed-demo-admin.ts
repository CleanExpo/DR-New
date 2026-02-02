/**
 * Seed Demo Admin User
 *
 * Creates or updates a demo admin user for testing and demonstrations.
 * Can be run locally or in production via npm script.
 *
 * Usage:
 *   npm run seed:demo-admin
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_ADMIN = {
  email: 'demo.admin@disasterrecovery.com.au',
  name: 'Demo Admin',
  password: 'demo2026',
  userType: 'ADMIN' as const,
};

async function main() {
  console.log('🔄 Seeding demo admin user...');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}\n`);

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(DEMO_ADMIN.password, 10);
    console.log('✅ Password hashed successfully');

    // Create or update demo admin
    const admin = await prisma.user.upsert({
      where: { email: DEMO_ADMIN.email },
      update: {
        password: hashedPassword,
        isEmailVerified: true,
        isActive: true,
        isBlocked: false,
        lockedUntil: null,
      },
      create: {
        email: DEMO_ADMIN.email,
        name: DEMO_ADMIN.name,
        userType: DEMO_ADMIN.userType,
        password: hashedPassword,
        isEmailVerified: true,
        isActive: true,
        isBlocked: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    console.log('\n✅ Demo admin user created/updated successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 User Details:');
    console.log(`   ID:              ${admin.id}`);
    console.log(`   Email:           ${admin.email}`);
    console.log(`   Name:            ${admin.name}`);
    console.log(`   Type:            ${admin.userType}`);
    console.log(`   Active:          ${admin.isActive}`);
    console.log(`   Email Verified:  ${admin.isEmailVerified}`);
    console.log(`   Created:         ${admin.createdAt.toISOString()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔑 Login Credentials:');
    console.log(`   Email:    ${DEMO_ADMIN.email}`);
    console.log(`   Password: ${DEMO_ADMIN.password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.error('\n❌ Error seeding demo admin:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
