import NextAuth from 'next-auth'

// Always use demo configuration to bypass all auth for client presentation
const handler = NextAuth({
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

export { handler as GET, handler as POST }