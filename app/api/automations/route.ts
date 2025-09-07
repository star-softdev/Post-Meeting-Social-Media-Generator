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

    const automations = await prisma.automation.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ automations })
  } catch (error) {
    console.error('Error fetching automations:', error)
    return NextResponse.json({ error: 'Failed to fetch automations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const userId = getUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, type, platform, description, example } = await request.json()

    const automation = await prisma.automation.create({
      data: {
        name,
        type,
        platform,
        description,
        example,
        userId: userId
      }
    })
    
    return NextResponse.json({ automation })
  } catch (error) {
    console.error('Error creating automation:', error)
    return NextResponse.json({ error: 'Failed to create automation' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const userId = getUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, name, type, platform, description, example } = await request.json()

    const automation = await prisma.automation.update({
      where: { 
        id,
        userId: userId // Ensure user owns this automation
      },
      data: {
        name,
        type,
        platform,
        description,
        example
      }
    })
    
    return NextResponse.json({ automation })
  } catch (error) {
    console.error('Error updating automation:', error)
    return NextResponse.json({ error: 'Failed to update automation' }, { status: 500 })
  }
}
