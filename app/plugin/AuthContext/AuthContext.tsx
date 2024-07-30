'use client'

import { createContext, useContext } from 'react'

import type { Credentials, UserInfo } from '@/app/plugin/AuthContext/types'

export type AuthContextError = {
  message: string
}

export interface AuthContextState {
  logged: boolean
  authUserInfo: UserInfo | undefined | null
}

export interface AuthResponse {
  data: AuthContextState
  error?: AuthContextError
}

export interface AuthContextValue {
  state: AuthContextState
  signIn(formData: Credentials): PromiseLike<AuthResponse>
  signUp(formData: Credentials): PromiseLike<AuthResponse>
  signOut(): PromiseLike<void>
  getJwtToken(): PromiseLike<string | null>
  currentUserInfo: () => Promise<UserInfo | undefined | null>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }

  return context
}

export { AuthContext, useAuth }
