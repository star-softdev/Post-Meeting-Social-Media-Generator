'use client'

import { useState } from 'react'
import { Calendar, Settings, MessageSquare, Users, ExternalLink, Bot, Zap, Clock, Video, RefreshCw } from 'lucide-react'

// Static demo data matching the mockup images
const upcomingMeetings = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    startTime: '2025-09-07T10:00:00Z',
    platform: 'Google Meet',
    attendees: ['John Doe', 'Jane Smith', 'Mike Wilson'],
    attendeeCount: 3,
    notetakerEnabled: true,
    icon: '🟢'
  },
  {
    id: '2',
    title: 'Product Strategy Review',
    startTime: '2025-09-07T14:00:00Z',
    platform: 'Zoom',
    attendees: ['Sarah Johnson', 'David Brown', 'Lisa Garcia', 'Tom Lee'],
    attendeeCount: 4,
    notetakerEnabled: true,
    icon: '🔵'
  },
  {
    id: '3',
    title: 'Client Demo Session',
    startTime: '2025-09-08T11:00:00Z',
    platform: 'Teams',
    attendees: ['Client Team', 'Demo Lead'],
    attendeeCount: 2,
    notetakerEnabled: false,
    icon: '🔷'
  }
]

const pastMeetings = [
  {
    id: '1',
    title: 'Sprint Planning Meeting',
    startTime: '2025-09-05T09:00:00Z',
    platform: 'Zoom',
    attendees: ['John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Johnson'],
    attendeeCount: 4,
    transcriptAvailable: true
  },
  {
    id: '2',
    title: 'Client Feedback Session',
    startTime: '2025-09-04T14:00:00Z',
    platform: 'Microsoft Teams',
    attendees: ['Client Team', 'Demo Lead', 'Product Manager'],
    attendeeCount: 3,
    transcriptAvailable: true
  },
  {
    id: '3',
    title: 'Technical Architecture Design',
    startTime: '2025-09-03T10:00:00Z',
    platform: 'Google Meet',
    attendees: ['Tech Lead', 'Senior Developer', 'Architect'],
    attendeeCount: 3,
    transcriptAvailable: true
  }
]

const demoAutomations = [
  {
    id: '1',
    name: 'LinkedIn Post Generator',
    platform: 'linkedin',
    description: 'Automatically generates professional LinkedIn posts from meeting transcripts',
    isActive: true,
    example: '🚀 Exciting news from our Product Strategy Meeting! We\'re launching our mobile app in March and expanding to European markets. The future looks bright! #ProductStrategy #Innovation #Growth'
  },
  {
    id: '2',
    name: 'Twitter Summary',
    platform: 'twitter',
    description: 'Creates concise Twitter summaries of key meeting points',
    isActive: true,
    example: 'Key takeaway from today\'s meeting: Mobile app launch in March! 🚀 #ProductUpdate'
  },
  {
    id: '3',
    name: 'Facebook Update',
    platform: 'facebook',
    description: 'Generates engaging Facebook posts for team updates',
    isActive: false,
    example: 'Team update: We\'re making great progress on our new features! Stay tuned for more updates. #TeamWork #Innovation'
  }
]

export default function StaticDemo() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'settings'>('upcoming')

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Meetings', icon: Calendar },
    { id: 'past', label: 'Past Meetings', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium">
          🎯 Demo Mode - Post-Meeting Social Media Generator
        </p>
        <p className="text-xs mt-1 opacity-90">
          This is a demonstration showing how AI automatically generates social media posts from meeting transcripts
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Post-Meeting Social Media Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
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
        {activeTab === 'past' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg border-2 border-dashed border-gray-300">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Past Meetings</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
              <div className="p-6 space-y-4">
                {pastMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(meeting.startTime)}
                          </span>
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-1" />
                            {meeting.platform}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {meeting.attendeeCount} attendees
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Attendees: {meeting.attendees.join(', ')}
                        </p>
                        <div className="mt-3 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 font-medium">Transcript</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg border-2 border-dashed border-gray-300">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Meetings</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
              <div className="p-6 space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-2xl">{meeting.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatDate(meeting.startTime)}
                            </span>
                            <span className="flex items-center">
                              <Video className="h-4 w-4 mr-1" />
                              {meeting.platform}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {meeting.attendeeCount} attendees
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            Attendees: {meeting.attendees.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <div className="text-sm font-medium text-gray-900">Notetaker</div>
                        <div className={`text-sm ${meeting.notetakerEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                          {meeting.notetakerEnabled ? 'Enabled' : 'Disabled'}
                        </div>
                        <div className={`mt-2 relative inline-flex h-6 w-11 items-center rounded-full ${
                          meeting.notetakerEnabled ? 'bg-green-600' : 'bg-gray-200'
                        }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              meeting.notetakerEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Automation Settings</h2>
                <p className="text-sm text-gray-600 mt-1">Configure how AI generates social media posts from your meetings</p>
              </div>
              <div className="divide-y divide-gray-200">
                {demoAutomations.map((automation) => (
                  <div key={automation.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">{automation.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            automation.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {automation.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{automation.description}</p>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Example Output:</strong> {automation.example}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center">
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            automation.isActive ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              automation.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Integration Status</h2>
                <p className="text-sm text-gray-600 mt-1">Connect your accounts to enable automatic post generation</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">L</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">LinkedIn</h3>
                        <p className="text-xs text-gray-500">Professional networking</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">T</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Twitter</h3>
                        <p className="text-xs text-gray-500">Real-time updates</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">F</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Facebook</h3>
                        <p className="text-xs text-gray-500">Social media platform</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Not Connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
