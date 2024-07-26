export type Credentials = {
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

type SignInReturnType = { error?: string; data?: SignInResponse }
