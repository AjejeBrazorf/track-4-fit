export type Session = SessionPayload | null

export type SessionPayload = {
  userId: number
  email: string
  idToken: string
  expiresAt: string
}
