import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Skip everything in demo mode to avoid build-time issues
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({ meetings: [] })
  }

  try {
    // Dynamic imports to avoid build-time issues
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const { prisma } = await import('@/lib/prisma')
    const { getUserId } = await import('@/lib/auth-utils')

    const session = await getServerSession(authOptions)
    
    const userId = getUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const meetings = await prisma.meeting.findMany({
      where: {
        userId: userId,
        status: 'completed'
      },
      include: {
        posts: {
          include: {
            automation: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })
    
    return NextResponse.json({ meetings })
  } catch (error) {
    console.error('Error fetching past meetings:', error)
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 })
  }
}
