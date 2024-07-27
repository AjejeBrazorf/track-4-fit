import { siteConfig } from '@/config/siteConfig'
import type {
  Credentials,
  SignInReturnType,
} from '@/app/plugin/AuthContext/types'

export async function SignIn(credentials: Credentials) {
  const res = await fetch(`${siteConfig.apiUrl}/login-firebase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })
  if (!res.ok) {
    const errorDetails = await res.text()
    return { error: errorDetails }
  }

  return { data: await res.json() } as SignInReturnType
}
