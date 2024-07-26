'use client'

import { createContext, useContext } from 'react'

export type AuthUserInfo = {
  userId: string
  email: string
}

export interface AuthContextState {
  logged: boolean
  authUserInfo: AuthUserInfo | undefined | null
}

export interface AuthContextValue {
  state: AuthContextState
  signIn(formData: FormData): PromiseLike<AuthContextState | null | undefined>
  signUp(formData: FormData): PromiseLike<AuthContextState | null | undefined>
  signOut(): PromiseLike<void>
  getJwtToken(): PromiseLike<string | null>
  currentUserInfo(): PromiseLike<AuthUserInfo | null | undefined>
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
