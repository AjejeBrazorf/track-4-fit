'use client'

import type { ReactNode } from 'react'
import React, { useCallback, useMemo, useState } from 'react'

import { SignIn } from '@/app/api/auth/signIn'
import { SignOut } from '@/app/api/auth/signOut'
import { SignUp } from '@/app/api/auth/signUp'
import type { Credentials, UserInfo } from '@/app/plugin/AuthContext/types'
import {
  createSession,
  deleteSession,
  verifySession,
} from '@/app/plugin/AuthContext/session'

import type { AuthContextState, AuthResponse } from './AuthContext'
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
    async (credentials: Credentials): Promise<AuthResponse> => {
      const { data, error } = await SignIn(credentials)
      if (error || !data) {
        return new Promise((resolve) => {
          resolve({ data: state, error: { message: error ?? 'unknown error' } })
        })
      }
      const session = await createSession(data.userCredential._tokenResponse)
      if (!session) {
        throw new Error('error while creating the session')
      }

      const newState = {
        logged: true,
        authUserInfo: data.userCredential._tokenResponse,
      }
      setState(newState)
      return new Promise((resolve) => {
        resolve({ data: newState })
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
    async (credentials: Credentials): Promise<AuthResponse> => {
      const { data, error } = await SignUp(credentials)
      if (error || !data) {
        return new Promise((resolve) => {
          resolve({ data: state, error: { message: error ?? 'unknown error' } })
        })
      }

      return signIn(credentials)
    },
    [signIn, state]
  )

  const getJwtToken = useCallback(async () => {
    return (await verifySession())?.idToken
  }, [])

  // Mock current user info function
  const currentUserInfo = useCallback(async () => {
    // Mock implementation
    return state.authUserInfo
  }, [state.authUserInfo])

  const value: {
    signIn: (credentials: Credentials) => Promise<AuthResponse>
    currentUserInfo: () => Promise<UserInfo | undefined | null>
    signOut: () => Promise<void>
    getJwtToken: () => Promise<string | undefined>
    state: AuthContextState
    signUp: (credentials: Credentials) => Promise<AuthResponse>
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
