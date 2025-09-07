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

    const socialAccounts = await prisma.socialAccount.findMany({
      where: { userId: userId }
    })

    const linkedin = socialAccounts.some((account: any) => account.platform === 'linkedin')
    const facebook = socialAccounts.some((account: any) => account.platform === 'facebook')
    
    return NextResponse.json({ linkedin, facebook })
  } catch (error) {
    console.error('Error checking social status:', error)
    return NextResponse.json({ error: 'Failed to check social status' }, { status: 500 })
  }
}
