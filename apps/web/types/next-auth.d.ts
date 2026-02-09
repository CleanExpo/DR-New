import 'next-auth';
import 'next-auth/jwt';
import { UserType } from '@prisma/client';

/**
 * NextAuth Type Augmentation
 *
 * Extends the default NextAuth types to include custom fields
 * used throughout the DR-NRPG platform.
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      avatar?: string | null;
      role?: UserType;
      userType?: UserType;
      tenantId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    avatar?: string | null;
    role?: UserType;
    userType?: UserType;
    tenantId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    avatar?: string | null;
    role?: UserType;
    userType?: UserType;
    tenantId?: string | null;
  }
}
