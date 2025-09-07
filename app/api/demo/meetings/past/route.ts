import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Return empty meetings for demo
  return NextResponse.json({ meetings: [] })
}
