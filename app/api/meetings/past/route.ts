import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getUserId } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
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
