// Demo mode configuration
export const DEMO_MODE = process.env.DEMO_MODE === 'true' || 
                        process.env.NODE_ENV === 'development' ||
                        process.env.NEXTAUTH_SECRET === 'demo-secret-key-for-presentation-only-32-chars'

export const getDemoMessage = () => {
  if (DEMO_MODE) {
    return {
      title: '🎯 Demo Mode Active',
      message: 'This is a demonstration of the Post-Meeting Social Media Generator. All data shown is sample data for presentation purposes.',
      type: 'info' as const
    }
  }
  return null
}

export const isDemoMode = () => DEMO_MODE
