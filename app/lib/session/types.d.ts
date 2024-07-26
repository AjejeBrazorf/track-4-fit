export type Session = SessionPayload | null

export type SessionPayload = {
  userId: string
  email: string
  idToken: string
  expiresIn: string
}
