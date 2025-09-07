import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Dashboard from '@/components/Dashboard'
import { isDemoMode } from '@/lib/demo-mode'

export default async function Home() {
  // Skip authentication in demo mode
  if (isDemoMode()) {
    return <Dashboard />
  }

  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return <Dashboard />
}
