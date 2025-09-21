import { NextAuthOptions } from "next-auth"

// DUMMY AUTH - ALWAYS ALLOWS PUBLIC ACCESS
export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    async session() {
      return {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        user: null
      }
    },
    async jwt() {
      return {}
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "dummy-secret-for-public-site",
  pages: undefined, // No auth pages needed
  debug: false
}