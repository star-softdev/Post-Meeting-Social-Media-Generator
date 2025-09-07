import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Return demo social status
  return NextResponse.json({ linkedin: true, facebook: false })
}
