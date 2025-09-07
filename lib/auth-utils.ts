import { Session } from 'next-auth'

export function getUserId(session: Session | null): string | null {
  if (!session?.user) {
    return null
  }
  
  // Type assertion to handle NextAuth session type issues
  return (session.user as any).id || null
}

export function requireAuth(session: Session | null): string {
  const userId = getUserId(session)
  if (!userId) {
    throw new Error('Unauthorized')
  }
  return userId
}
