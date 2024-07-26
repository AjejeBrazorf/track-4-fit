import type { TokenResponse, User } from '@/app/plugin/AuthContext/types'

export type Session = SessionPayload | null

export type SessionPayload = {
  user: User
  token: TokenResponse
}
