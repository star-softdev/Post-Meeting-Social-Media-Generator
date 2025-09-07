// Demo data for client presentation
export const demoMeetings = [
  {
    id: '1',
    title: 'Product Strategy Meeting',
    startTime: new Date('2024-01-15T10:00:00Z'),
    endTime: new Date('2024-01-15T11:00:00Z'),
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    transcript: 'We discussed the new product roadmap for Q2. Key decisions: 1) Launch mobile app by March 2) Implement AI features 3) Expand to European markets. Next steps: Technical team to provide timeline estimates.',
    attendees: ['john.doe@company.com', 'jane.smith@company.com', 'mike.wilson@company.com'],
    status: 'completed',
    userId: 'demo-user',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T11:00:00Z'),
    posts: [
      {
        id: '1',
        content: '🚀 Exciting news from our Product Strategy Meeting! We\'re launching our mobile app in March and expanding to European markets. The future looks bright! #ProductStrategy #Innovation #Growth',
        platform: 'linkedin',
        status: 'published',
        userId: 'demo-user',
        meetingId: '1',
        automationId: '1',
        createdAt: new Date('2024-01-15T11:30:00Z'),
        updatedAt: new Date('2024-01-15T11:30:00Z'),
        automation: {
          id: '1',
          name: 'LinkedIn Post Generator',
          type: 'Generate post',
          platform: 'linkedin',
          description: 'Automatically generates LinkedIn posts from meeting transcripts',
          isActive: true,
          userId: 'demo-user',
          createdAt: new Date('2024-01-15T10:00:00Z'),
          updatedAt: new Date('2024-01-15T10:00:00Z')
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Client Onboarding Call',
    startTime: new Date('2024-01-16T14:00:00Z'),
    endTime: new Date('2024-01-16T15:00:00Z'),
    platform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/123456789',
    transcript: 'Welcome call with new client ABC Corp. Discussed their requirements: 1) Custom dashboard 2) API integration 3) 24/7 support. Timeline: 6 weeks for MVP. Budget approved for $50k.',
    attendees: ['client@abccorp.com', 'sales@ourcompany.com'],
    status: 'completed',
    userId: 'demo-user',
    createdAt: new Date('2024-01-16T14:00:00Z'),
    updatedAt: new Date('2024-01-16T15:00:00Z'),
    posts: []
  }
]

export const demoAutomations = [
  {
    id: '1',
    name: 'LinkedIn Post Generator',
    type: 'Generate post',
    platform: 'linkedin',
    description: 'Automatically generates LinkedIn posts from meeting transcripts',
    example: '🚀 Exciting news from our Product Strategy Meeting! We\'re launching our mobile app in March and expanding to European markets. The future looks bright! #ProductStrategy #Innovation #Growth',
    isActive: true,
    userId: 'demo-user',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    name: 'Twitter Summary',
    type: 'Generate post',
    platform: 'twitter',
    description: 'Creates concise Twitter summaries of key meeting points',
    example: 'Key takeaway from today\'s meeting: Mobile app launch in March! 🚀 #ProductUpdate',
    isActive: true,
    userId: 'demo-user',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  }
]

export const demoSocialAccounts = [
  {
    id: '1',
    platform: 'linkedin',
    accountId: 'demo-linkedin-account',
    accountName: 'Demo LinkedIn Account',
    accessToken: 'demo-token',
    refreshToken: 'demo-refresh-token',
    userId: 'demo-user',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  }
]
