import { redirect } from 'next/navigation'

export default async function Home() {
  // Always redirect to demo page to bypass all auth for client presentation
  redirect('/demo')
}
