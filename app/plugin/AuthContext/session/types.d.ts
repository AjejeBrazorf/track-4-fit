import type { UserInfo } from '@/app/plugin/AuthContext/types'

export type Session = SessionPayload | null

export type SessionPayload = UserInfo
