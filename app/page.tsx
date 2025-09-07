import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Dashboard from '@/components/Dashboard'
import StaticDemo from '@/components/StaticDemo'
import { isDemoMode } from '@/lib/demo-mode'

export default async function Home() {
  // Use static demo in demo mode
  if (isDemoMode()) {
    return <StaticDemo />
  }

  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return <Dashboard />
}
