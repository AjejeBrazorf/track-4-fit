import { siteConfig } from '@/config/siteConfig'
import type {
  Credetianls,
  SignInReturnType,
} from '@/app/plugin/AuthContext/types'

export async function SignUp(credentials: Credetianls) {
  const res = await fetch(`${siteConfig.apiUrl}/signup-firebase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })
  if (!res.ok) {
    console.error('Network response was not ok:', res.statusText)
    const errorDetails = await res.text()
    console.error('Error details:', errorDetails)
    return { error: errorDetails }
  }

  return { data: await res.json() } as SignInReturnType
}
