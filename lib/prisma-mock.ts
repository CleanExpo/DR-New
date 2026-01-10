/**
 * Mock Prisma Client for Development Testing
 * Used when Prisma cannot connect to database (Windows + Docker issue)
 */

// Mock users data
// Password for all users: Password123!
// Bcrypt hash: $2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa
const mockUsers = [
  {
    id: 'admin-001',
    email: 'admin@disasterrecovery.com',
    name: 'Admin User',
    password: '$2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa', // Password123!
    userType: 'ADMIN',
    isActive: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    googleId: null,
    avatar: null,
    tenantId: null
  },
  {
    id: 'client-001',
    email: 'client@example.com',
    name: 'John Client',
    password: '$2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa', // Password123!
    userType: 'CLIENT',
    isActive: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    googleId: null,
    avatar: null,
    tenantId: null
  },
  {
    id: 'contractor-001',
    email: 'contractor@example.com',
    name: 'Mike Contractor',
    password: '$2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa', // Password123!
    userType: 'CONTRACTOR',
    isActive: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    googleId: null,
    avatar: null,
    tenantId: null
  }
];

// Mock claims data
const mockClaims: any[] = [];

export const mockPrisma = {
  insuranceClaimAU: {
    create: async ({ data }: any) => {
      const claim = {
        id: `claim-${Date.now()}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockClaims.push(claim);
      return claim;
    },
    findUnique: async ({ where }: any) => {
      return mockClaims.find(c => c.id === where.id || c.claimNumber === where.claimNumber) || null;
    },
    findMany: async () => mockClaims,
    update: async ({ where, data }: any) => {
      const claim = mockClaims.find(c => c.id === where.id);
      if (claim) {
        Object.assign(claim, data, { updatedAt: new Date() });
        return claim;
      }
      return null;
    },
    delete: async ({ where }: any) => {
      const index = mockClaims.findIndex(c => c.id === where.id);
      if (index >= 0) {
        return mockClaims.splice(index, 1)[0];
      }
      return null;
    }
  },
  user: {
    findUnique: async ({ where }: any) => {
      if (where.email) {
        return mockUsers.find(u => u.email === where.email) || null;
      }
      if (where.id) {
        return mockUsers.find(u => u.id === where.id) || null;
      }
      return null;
    },
    findMany: async () => mockUsers,
    create: async ({ data }: any) => ({
      id: `user-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    update: async ({ where, data }: any) => {
      const user = mockUsers.find(u => u.id === where.id || u.email === where.email);
      return user ? { ...user, ...data, updatedAt: new Date() } : null;
    }
  },
  contractor: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async ({ data }: any) => data,
    update: async ({ data }: any) => data
  },
  serviceRequest: {
    findMany: async () => [],
    create: async ({ data }: any) => data
  },
  message: {
    findMany: async () => [],
    create: async ({ data }: any) => data
  },
  $disconnect: async () => {},
  $connect: async () => {}
};
