import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Skip everything in demo mode to avoid build-time issues
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({ linkedin: true, facebook: false })
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
