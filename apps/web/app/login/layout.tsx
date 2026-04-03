import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In | NRPG Disaster Recovery Platform',
  description: 'Log in to your NRPG account to manage disaster recovery claims, track restoration progress and connect with certified contractors across Australia.',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
