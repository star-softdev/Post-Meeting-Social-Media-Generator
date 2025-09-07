'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Calendar, Settings, MessageSquare, Users } from 'lucide-react'
import UpcomingMeetings from './UpcomingMeetings'
import PastMeetings from './PastMeetings'
import SettingsPage from './SettingsPage'
import { isDemoMode, getDemoMessage } from '@/lib/demo-mode'
import { demoMeetings } from '@/lib/demo-data'
// Local type definition since Prisma client is not generated
type Meeting = {
  id: string
  title: string
  startTime: Date
  endTime: Date
  platform: string
  meetingUrl?: string | null
  transcript?: string | null
  attendees: string[]
  botId?: string | null
  status: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'settings'>('upcoming')
  const [meetings, setMeetings] = useState<Meeting[]>([])

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Meetings', icon: Calendar },
    { id: 'past', label: 'Past Meetings', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  // Use demo data in demo mode
  useEffect(() => {
    if (isDemoMode()) {
      setMeetings(demoMeetings as any)
    }
  }, [])

  const demoMessage = getDemoMessage()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Banner */}
      {demoMessage && (
        <div className="bg-blue-600 text-white py-2 px-4 text-center">
          <p className="text-sm font-medium">
            {demoMessage.title} - {demoMessage.message}
          </p>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Post-Meeting Social Media Generator
              </h1>
              <p className="text-gray-600">
                {isDemoMode() ? 'Demo Mode - Sample Data' : `Welcome back, ${session?.user?.name}`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!isDemoMode() && (
                <img
                  src={session?.user?.image || ''}
                  alt={session?.user?.name || ''}
                  className="h-10 w-10 rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'upcoming' && <UpcomingMeetings />}
        {activeTab === 'past' && <PastMeetings />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}
