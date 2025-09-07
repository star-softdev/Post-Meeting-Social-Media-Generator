import { redirect } from 'next/navigation'

// Check demo mode at build time
const DEMO_MODE = process.env.DEMO_MODE === 'true' || 
                  process.env.NEXTAUTH_SECRET === 'demo-secret-key-for-presentation-only-32-chars'

export default async function Home() {
  // Redirect to demo page in demo mode - completely bypass NextAuth
  if (DEMO_MODE) {
    redirect('/demo')
  }

  // In production mode, redirect to signin
  redirect('/auth/signin')
}
