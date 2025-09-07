import { redirect } from 'next/navigation'

export default function AuthErrorPage() {
  // In demo mode, redirect to demo page instead of showing error
  if (process.env.DEMO_MODE === 'true') {
    redirect('/demo')
  }
  
  // In production, show the actual error page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-4">
          There was an error with the authentication process. Please try again.
        </p>
        <a 
          href="/auth/signin" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </a>
      </div>
    </div>
  )
}
