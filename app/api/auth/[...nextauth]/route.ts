import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Create handler based on environment
const handler = process.env.DEMO_MODE === 'true' 
  ? NextAuth({
      providers: [],
      callbacks: {
        async session({ session }) {
          // Return a mock session for demo
          return {
            ...session,
            user: {
              ...session.user,
              id: 'demo-user',
              name: 'Demo User',
              email: 'demo@example.com'
            }
          }
        },
        async jwt({ token }) {
          // Return a mock token for demo
          return {
            ...token,
            sub: 'demo-user'
          }
        }
      },
      secret: 'demo-secret-for-presentation-only',
      pages: {
        signIn: '/demo',
        error: '/demo'
      }
    })
  : NextAuth(authOptions)

export { handler as GET, handler as POST }