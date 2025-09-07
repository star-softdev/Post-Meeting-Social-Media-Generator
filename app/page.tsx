import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Dashboard from '@/components/Dashboard'
import StaticDemo from '@/components/StaticDemo'

// Check demo mode at build time
const DEMO_MODE = process.env.DEMO_MODE === 'true' || 
                  process.env.NEXTAUTH_SECRET === 'demo-secret-key-for-presentation-only-32-chars'

export default async function Home() {
  // Use static demo in demo mode - completely bypass NextAuth
  if (DEMO_MODE) {
    return <StaticDemo />
  }

  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return <Dashboard />
}
