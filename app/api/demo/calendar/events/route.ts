import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Return empty events for demo
  return NextResponse.json({ events: [] })
}
