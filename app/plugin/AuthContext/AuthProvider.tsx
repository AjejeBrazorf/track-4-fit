'use client'

import type { ReactNode } from 'react'
import React, { useCallback, useMemo, useState } from 'react'

import { SignIn } from '@/app/api/auth/signIn'
import { SignOut } from '@/app/api/auth/signOut'
import { SignUp } from '@/app/api/auth/signUp'
import type { Credentials, User } from '@/app/plugin/AuthContext/types'
import { createSession, deleteSession } from '@/app/plugin/AuthContext/session'

import type { AuthContextState } from './AuthContext'
import { AuthContext } from './AuthContext'

const AuthProvider = ({
  value: initialValue,
  children,
}: {
  value: AuthContextState
  children: ReactNode
}) => {
  const [state, setState] = useState<AuthContextState>(initialValue)

  const signIn = useCallback(
    async (credentials: Credentials): Promise<AuthContextState> => {
      const { data, error } = await SignIn(credentials)
      if (error || !data) {
        return new Promise((resolve) => {
          resolve(state)
        })
      }
      const session = await createSession({
        ...data.userCredential,
        token: data.userCredential._tokenResponse,
      })
      if (!session) {
        throw new Error('error while creating the session')
      }

      const newState = {
        logged: true,
        authUserInfo: session.user!,
      }
      setState(newState)
      return new Promise((resolve) => {
        resolve(newState)
      })
    },
    [state]
  )

  // Mock sign-out function
  const signOut = useCallback(async () => {
    await SignOut()
    await deleteSession()
    setState({
      logged: false,
      authUserInfo: null,
    })
  }, [])

  // Mock sign-up function
  const signUp = useCallback(
    async (credentials: Credentials): Promise<AuthContextState> => {
      const { data, error } = await SignUp(credentials)
      if (error || !data) {
        return new Promise((resolve) => {
          resolve(state)
        })
      }

      return signIn(credentials)
    },
    [signIn, state]
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
    signIn: (credentials: Credentials) => Promise<AuthContextState>
    currentUserInfo: () => Promise<User | undefined | null>
    signOut: () => Promise<void>
    getJwtToken: () => Promise<string>
    state: AuthContextState
    signUp: (credentials: Credentials) => Promise<AuthContextState>
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
