'use client'

import { useState } from 'react'
import { Calendar, Settings, MessageSquare, Users, ExternalLink, Bot, Zap } from 'lucide-react'

// Static demo data
const demoMeetings = [
  {
    id: '1',
    title: 'Product Strategy Meeting',
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T11:00:00Z',
    platform: 'Google Meet',
    transcript: 'We discussed the new product roadmap for Q2. Key decisions: 1) Launch mobile app by March 2) Implement AI features 3) Expand to European markets. Next steps: Technical team to provide timeline estimates.',
    attendees: ['john.doe@company.com', 'jane.smith@company.com', 'mike.wilson@company.com'],
    status: 'completed',
    posts: [
      {
        id: '1',
        content: '🚀 Exciting news from our Product Strategy Meeting! We\'re launching our mobile app in March and expanding to European markets. The future looks bright! #ProductStrategy #Innovation #Growth',
        platform: 'linkedin',
        status: 'published',
        createdAt: '2024-01-15T11:30:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Client Onboarding Call',
    startTime: '2024-01-16T14:00:00Z',
    endTime: '2024-01-16T15:00:00Z',
    platform: 'Zoom',
    transcript: 'Welcome call with new client ABC Corp. Discussed their requirements: 1) Custom dashboard 2) API integration 3) 24/7 support. Timeline: 6 weeks for MVP. Budget approved for $50k.',
    attendees: ['client@abccorp.com', 'sales@ourcompany.com'],
    status: 'completed',
    posts: []
  },
  {
    id: '3',
    title: 'Team Standup',
    startTime: '2024-01-17T09:00:00Z',
    endTime: '2024-01-17T09:30:00Z',
    platform: 'Microsoft Teams',
    transcript: 'Daily standup: Frontend team completed user dashboard, backend team working on API endpoints, QA team testing new features. Blockers: None. Next: Continue development sprint.',
    attendees: ['dev1@company.com', 'dev2@company.com', 'qa@company.com'],
    status: 'completed',
    posts: [
      {
        id: '2',
        content: 'Great progress in today\'s standup! Frontend dashboard complete, backend APIs in progress. Team is firing on all cylinders! 💪 #TeamWork #Agile #Development',
        platform: 'twitter',
        status: 'published',
        createdAt: '2024-01-17T09:45:00Z'
      }
    ]
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
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'settings'>('past')

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Meetings', icon: Calendar },
    { id: 'past', label: 'Past Meetings', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
              <p className="text-gray-600">Demo Mode - Sample Data</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700 font-medium">Demo Active</span>
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
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Past Meetings & Generated Posts</h2>
                <p className="text-sm text-gray-600 mt-1">AI automatically generates social media content from your meeting transcripts</p>
              </div>
              <div className="divide-y divide-gray-200">
                {demoMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(meeting.startTime)}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {meeting.attendees.length} attendees
                          </span>
                          <span className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            {meeting.platform}
                          </span>
                        </div>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Transcript:</strong> {meeting.transcript}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Generated Posts */}
                    {meeting.posts.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                          <Bot className="h-4 w-4 mr-1 text-blue-500" />
                          AI Generated Posts
                        </h4>
                        <div className="space-y-3">
                          {meeting.posts.map((post) => (
                            <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {post.platform === 'linkedin' ? 'LinkedIn' : 'Twitter'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(post.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{post.content}</p>
                              <div className="mt-2 flex items-center space-x-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  ✓ Published
                                </span>
                                <span className="text-xs text-gray-500">Auto-generated</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {meeting.posts.length === 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          No posts generated yet. Enable automation to automatically create social media content from this meeting.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Meetings</h2>
                <p className="text-sm text-gray-600 mt-1">Meetings scheduled for automatic post generation</p>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming meetings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect your calendar to see upcoming meetings that will automatically generate social media posts.
                  </p>
                </div>
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
