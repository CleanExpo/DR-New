import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search | NRPG Disaster Recovery Australia',
  description: 'Search the NRPG platform for disaster recovery services, certified contractors, resources and guides across Australia.',
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
