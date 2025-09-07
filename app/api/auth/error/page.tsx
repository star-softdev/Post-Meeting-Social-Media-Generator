import { redirect } from 'next/navigation'

export default function AuthErrorPage() {
  // Always redirect to demo page to bypass all auth
  redirect('/demo')
}
