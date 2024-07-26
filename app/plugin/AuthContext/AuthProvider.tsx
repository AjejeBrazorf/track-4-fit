'use client'

import type { ReactNode } from 'react'
import React, { useCallback, useMemo, useState } from 'react'

import { createSession, deleteSession } from '@/lib/session'
import { SignInT4F } from '@/app/auth/track4fitAuthService'

import type { AuthContextState, AuthUserInfo } from './AuthContext'
import { AuthContext } from './AuthContext'

const AuthProvider = ({
  value: initialValue,
  children,
}: {
  value: AuthContextState
  children: ReactNode
}) => {
  const [state, setState] = useState<AuthContextState>(initialValue)

  // Mock sign-in function
  const signIn = useCallback(
    async (formData: FormData): Promise<AuthContextState> => {
      const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }

      const res = await SignInT4F(credentials)
      // Mock implementation: authenticate and retrieve user info
      const userInfo = {
        userId: res.userCredential.user.uid as string,
        email: res.userCredential.user.email,
        idToken: res.userCredential._tokenResponse.idToken,
        expiresIn: res.userCredential._tokenResponse.expiresIn,
      }
      await createSession({ ...credentials, ...userInfo })

      const newState = {
        logged: true,
        authUserInfo: userInfo,
      }
      setState(newState)
      return new Promise((resolve) => {
        resolve(newState)
      })
    },
    []
  )

  // Mock sign-out function
  const signOut = useCallback(async () => {
    // Mock implementation: sign out
    await deleteSession()
    setState({
      logged: false,
      authUserInfo: null,
    })
  }, [])

  // Mock sign-up function
  const signUp = useCallback(
    async (formData: FormData): Promise<AuthContextState> => {
      const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      // Mock implementation: create and retrieve user info
      const userInfo: AuthUserInfo & {
        idToken: string
        expiresAt: string
      } = {
        userId: '1',
        email: credentials.email,
        idToken: 'mock-id-token',
        expiresAt: 'mock-expires-at',
      }
      if (!userInfo) {
        throw new Error('Failed to sign up')
      }

      return signIn(formData)
    },
    [signIn]
  )

  // Mock get JWT token function
  const getJwtToken = useCallback(async () => {
    // Mock implementation

    return 'mock-jwt-token'
  }, [])

  // Mock current user info function
  const currentUserInfo = useCallback(async () => {
    // Mock implementation
    return state.authUserInfo
  }, [state.authUserInfo])

  const value: {
    signIn: (formData: FormData) => Promise<AuthContextState>
    currentUserInfo: () => Promise<AuthUserInfo | undefined | null>
    signOut: () => Promise<void>
    getJwtToken: () => Promise<string>
    state: AuthContextState
    signUp: (formData: FormData) => Promise<AuthContextState>
  } = useMemo(
    () => ({
      state,
      signIn,
      signOut,
      signUp,
      getJwtToken,
      currentUserInfo,
    }),
    [state, signIn, signOut, signUp, getJwtToken, currentUserInfo]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
