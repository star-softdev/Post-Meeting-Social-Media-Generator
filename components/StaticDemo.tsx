'use client'

import { useState } from 'react'
import { Calendar, Settings, MessageSquare, Users, ExternalLink, Bot, Zap, Clock, Video, RefreshCw, Eye, Copy, Send, Edit, Trash2, Plus, X } from 'lucide-react'

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
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)
  const [modalTab, setModalTab] = useState<'transcript' | 'email' | 'posts'>('transcript')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [notetakerStates, setNotetakerStates] = useState<{[key: string]: boolean}>({
    '1': true,
    '2': true,
    '3': false
  })
  const [automationStates, setAutomationStates] = useState<{[key: string]: boolean}>({
    '1': true,
    '2': true,
    '3': false
  })
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

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
                <button 
                  onClick={() => showToast('Meetings refreshed successfully!')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                >
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
                        <button 
                          onClick={() => setSelectedMeeting(meeting)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
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
                <button 
                  onClick={() => showToast('Meetings refreshed successfully!')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                >
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
                        <div className={`text-sm ${notetakerStates[meeting.id] ? 'text-green-600' : 'text-gray-500'}`}>
                          {notetakerStates[meeting.id] ? 'Enabled' : 'Disabled'}
                        </div>
                        <button
                          onClick={() => {
                            setNotetakerStates(prev => ({
                              ...prev,
                              [meeting.id]: !prev[meeting.id]
                            }))
                            showToast(`Notetaker ${!notetakerStates[meeting.id] ? 'enabled' : 'disabled'} for ${meeting.title}`)
                          }}
                          className={`mt-2 relative inline-flex h-6 w-11 items-center rounded-full ${
                            notetakerStates[meeting.id] ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              notetakerStates[meeting.id] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
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
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Automation Settings</h2>
                  <p className="text-sm text-gray-600 mt-1">Configure how AI generates social media posts from your meetings</p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Automation</span>
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {demoAutomations.map((automation) => (
                  <div key={automation.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">{automation.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            automationStates[automation.id]
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {automationStates[automation.id] ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{automation.description}</p>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Example Output:</strong> {automation.example}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setAutomationStates(prev => ({
                              ...prev,
                              [automation.id]: !prev[automation.id]
                            }))
                            showToast(`${automation.name} ${!automationStates[automation.id] ? 'activated' : 'deactivated'}`)
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            automationStates[automation.id] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              automationStates[automation.id] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => showToast(`Editing ${automation.name}`)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => showToast(`${automation.name} deleted`, 'error')}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">📋</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedMeeting.title}</h2>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedMeeting.startTime)} • {selectedMeeting.platform} • {selectedMeeting.attendeeCount} attendees
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex border-b">
              {[
                { id: 'transcript', label: 'Transcript', icon: MessageSquare },
                { id: 'email', label: 'Follow-up Email', icon: Send },
                { id: 'posts', label: 'Social Posts', icon: ExternalLink }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setModalTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium ${
                      modalTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {modalTab === 'transcript' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Meeting Transcript</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Key Discussion Points:</h4>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>• Reviewed previous sprint achievements and challenges</li>
                        <li>• Planned upcoming features for Q1 2024</li>
                        <li>• Discussed resource allocation for new projects</li>
                        <li>• Set priorities for the next two weeks</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Action Items:</h4>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>• John to finalize API documentation by Friday</li>
                        <li>• Jane to prepare user stories for the new dashboard feature</li>
                        <li>• Mike to coordinate with design team on UI mockups</li>
                        <li>• Sarah to schedule follow-up meeting with stakeholders</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'email' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Follow-up Email</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      Subject: Follow-up on {selectedMeeting.title}
                    </p>
                    <p className="text-sm text-gray-700">
                      Hi team,<br/><br/>
                      Thank you for the productive {selectedMeeting.title} today. Here's a summary of our discussion and next steps:<br/><br/>
                      <strong>Key Takeaways:</strong><br/>
                      • Reviewed sprint progress and identified areas for improvement<br/>
                      • Planned new features for the upcoming quarter<br/>
                      • Allocated resources for priority projects<br/><br/>
                      <strong>Action Items:</strong><br/>
                      • John: API documentation by Friday<br/>
                      • Jane: User stories for dashboard feature<br/>
                      • Mike: UI mockup coordination<br/>
                      • Sarah: Stakeholder follow-up meeting<br/><br/>
                      Let's keep the momentum going!<br/><br/>
                      Best regards,<br/>
                      Team Lead
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Follow-up email generated successfully!')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Generate Follow-up Email
                  </button>
                </div>
              )}

              {modalTab === 'posts' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Social Media Posts</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">LinkedIn Post</span>
                        <span className="text-xs text-gray-500">LinkedIn</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        Great sprint planning session today! 🚀 Key takeaways: improved API performance, new dashboard features coming soon. Excited about the upcoming releases! #Agile #ProductDevelopment #TeamWork
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => showToast('LinkedIn post copied to clipboard!')}
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                        <button
                          onClick={() => showToast('LinkedIn post published successfully!')}
                          className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          <Send className="h-3 w-3" />
                          <span>Post</span>
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Facebook Post</span>
                        <span className="text-xs text-gray-500">Facebook</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        Team update: Just wrapped up an amazing sprint planning! 🎉 Our new features are getting rave reviews. Thanks to our incredible team for making it happen! #TeamWork #Innovation #SprintPlanning
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => showToast('Facebook post copied to clipboard!')}
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                        <button
                          onClick={() => showToast('Facebook post published successfully!')}
                          className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          <Send className="h-3 w-3" />
                          <span>Post</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Automation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Create Automation</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="e.g., Generate LinkedIn post"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Generate post</option>
                  <option>Send email</option>
                  <option>Create summary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>LinkedIn</option>
                  <option>Facebook</option>
                  <option>Twitter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Describe how the post should be generated..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Example (Optional)</label>
                <textarea
                  placeholder="Provide an example of the desired output..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  showToast('Automation created successfully!')
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-4 py-2 rounded-md shadow-lg ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}
