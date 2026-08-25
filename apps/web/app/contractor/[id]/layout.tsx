import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface ContractorProfileLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function ContractorProfileLayout(props: ContractorProfileLayoutProps) {
  const params = await props.params;

  const {
    children
  } = props;

  const [session, contractor] = await Promise.all([
    getServerSession(authOptions),
    prisma.contractorProfile.findUnique({
      where: { id: params.id },
      select: { userId: true },
    }),
  ])
  const sessionUser = session?.user as unknown as { id?: string; userType?: string } | undefined

  if (!sessionUser?.id) {
    redirect('/login')
  }

  if (!contractor) {
    notFound()
  }

  const isAdminUser = isAdmin(sessionUser.userType || '')
  const isOwner = contractor.userId === sessionUser.id

  // Contractor identities are private; only admins and the contractor themselves can view.
  if (!isAdminUser && !isOwner) {
    redirect('/dashboard')
  }

  return children
}

