/**
 * Seed Demo Admin User with Demo Tenant
 *
 * Creates:
 * 1. Demo tenant (if doesn't exist)
 * 2. Demo admin user (if doesn't exist)
 * 3. Associates user with tenant
 *
 * Usage:
 *   npm run seed:demo-admin-full
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_TENANT = {
  name: 'Demo Tenant',
  subdomain: 'demo',
  industry: 'Disaster Recovery',
  isActive: true,
};

const DEMO_ADMIN = {
  email: 'demo.admin@disasterrecovery.com.au',
  name: 'Demo Admin',
  password: 'demo2026',
  userType: 'ADMIN' as const,
};

async function main() {
  console.log('🔄 Seeding demo tenant and admin user...');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}\n`);

  try {
    // Step 1: Create or get demo tenant
    console.log('📦 Creating/finding demo tenant...');
    const tenant = await prisma.tenant.upsert({
      where: { subdomain: DEMO_TENANT.subdomain },
      update: {
        name: DEMO_TENANT.name,
        industry: DEMO_TENANT.industry,
        isActive: DEMO_TENANT.isActive,
      },
      create: {
        name: DEMO_TENANT.name,
        subdomain: DEMO_TENANT.subdomain,
        industry: DEMO_TENANT.industry,
        isActive: DEMO_TENANT.isActive,
      },
    });
    console.log(`✅ Tenant: ${tenant.name} (ID: ${tenant.id})`);

    // Step 2: Hash password
    const hashedPassword = await bcrypt.hash(DEMO_ADMIN.password, 10);
    console.log('✅ Password hashed successfully');

    // Step 3: Create or update demo admin with tenant
    console.log('\n👤 Creating/updating demo admin user...');
    const admin = await prisma.user.upsert({
      where: { email: DEMO_ADMIN.email },
      update: {
        password: hashedPassword,
        isEmailVerified: true,
        isActive: true,
        isBlocked: false,
        lockedUntil: null,
        tenantId: tenant.id, // Associate with tenant
      },
      create: {
        email: DEMO_ADMIN.email,
        name: DEMO_ADMIN.name,
        userType: DEMO_ADMIN.userType,
        password: hashedPassword,
        isEmailVerified: true,
        isActive: true,
        isBlocked: false,
        tenantId: tenant.id, // Associate with tenant
      },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        isActive: true,
        isEmailVerified: true,
        tenantId: true,
        createdAt: true,
        tenant: {
          select: {
            id: true,
            name: true,
            subdomain: true,
          },
        },
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
    console.log(`   Tenant ID:       ${admin.tenantId}`);
    console.log(`   Tenant Name:     ${admin.tenant?.name}`);
    console.log(`   Tenant Subdomain: ${admin.tenant?.subdomain}`);
    console.log(`   Created:         ${admin.createdAt.toISOString()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔑 Login Credentials:');
    console.log(`   Email:    ${DEMO_ADMIN.email}`);
    console.log(`   Password: ${DEMO_ADMIN.password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✅ Authentication should now work on production!');
  } catch (error) {
    console.error('\n❌ Error seeding demo admin with tenant:');
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
