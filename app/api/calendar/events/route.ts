import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Skip everything in demo mode to avoid build-time issues
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({ events: [] })
  }

  try {
    // Dynamic imports to avoid build-time issues
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { getUpcomingEvents } = await import('@/lib/google-calendar')
    const { prisma } = await import('@/lib/prisma')
    const { getUserId } = await import('@/lib/auth-utils')

    const session = await getServerSession(authOptions)
    
    const userId = getUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's Google account
    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
        provider: 'google'
      }
    })

    if (!account?.access_token) {
      return NextResponse.json({ error: 'Google account not connected' }, { status: 400 })
    }

    const events = await getUpcomingEvents(account.access_token, 20)
    
    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}
