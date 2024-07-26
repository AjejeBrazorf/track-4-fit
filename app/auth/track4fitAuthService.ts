export type Credetianls = {
  email: string
  password: string
}

export type ProviderData = {
  providerId: string
  uid: string
  displayName: string | null
  email: string
  phoneNumber: string | null
  photoURL: string | null
}

export type StsTokenManager = {
  refreshToken: string
  accessToken: string
  expirationTime: number
}

export type User = {
  uid: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  providerData: ProviderData[]
  stsTokenManager: StsTokenManager
  createdAt: string
  lastLoginAt: string
  apiKey: string
  appName: string
}

export type TokenResponse = {
  kind: string
  localId: string
  email: string
  displayName: string
  idToken: string
  registered: boolean
  refreshToken: string
  expiresIn: string
}

export type UserCredential = {
  user: User
  providerId: string | null
  _tokenResponse: TokenResponse
  operationType: string
}

export type SignInResponse = {
  message: string
  userCredential: UserCredential
}

export const SignInT4F = async (credentials: Credetianls) => {
  const res = await fetch('/api/login-firebase', {
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
  }

  return (await res.json()) as SignInResponse
}
export const SignUpT4F = (credentials: Credetianls) => {}
export const SignOutT4F = () => {}
