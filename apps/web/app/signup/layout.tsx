import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | NRPG Disaster Recovery Platform',
  description: 'Create your NRPG account. Join Australia\'s leading disaster recovery marketplace to report claims, find certified contractors, and manage your restoration jobs.',
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
